from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import json, re

app = Flask(__name__)
CORS(app)

# =======================
# OpenAI client
# =======================
client = OpenAI(api_key="Your_API_Key_Here")  # replace with your key

# =======================
# AI Interview Simulator
# =======================
class AIInterviewSimulator:
    def __init__(self, model="gpt-4o-mini"):
        self.model = model

    def generate_questions(self, job_role, job_description, n_questions=5):
        prompt = f"""
You are an encouraging interviewer. Generate {n_questions} professional interview questions
for this role.

Job Role: {job_role}
Job Description: {job_description}

Include:
- Technical/functional questions relevant to the role.
- The first question for a software engineer should be a simple coding problem like create a function to print elements of an array.
- If the role is for labour or roles like that ask questions about whether he is ok with the wages, ok to travel and related questions only.
- Behavioral questions about teamwork, leadership, problem-solving, ethics.
- Return as a numbered list only.
"""
        response = client.responses.create(model=self.model, input=prompt)
        questions_text = response.output_text
        questions = [q.strip() for q in questions_text.split("\n") if q.strip() and q[0].isdigit()]
        return questions[:n_questions]

    def score_answer(self, question, answer):
        prompt = f"""
You are an encouraging interviewer.

Question: {question}
Candidate Answer: {answer}

Evaluate and provide:
- A score from 1 to 10
- Detailed feedback (1-2 bullet points)
- Improvements/tips (1-2 bullet points)
- Even if the answer is not perfect, encourage the candidate by giving it some extra marks

Output ONLY JSON in this format:
{{"score": number, "feedback": ["...", "..."], "improvements": ["...", "..."]}}
"""
        response = client.responses.create(model=self.model, input=prompt)
        raw_output = response.output_text
        match = re.search(r"\{.*\}", raw_output, re.DOTALL)
        if match:
            try:
                data = json.loads(match.group())
                data["score"] = max(1, min(10, int(data.get("score", 5))))
                return data
            except:
                pass
        return {
            "score": 5,
            "feedback": ["AI output could not be parsed."],
            "improvements": ["Keep trying! Answer more clearly and provide examples."]
        }

simulator = AIInterviewSimulator()

# =======================
# Backend routes
# =======================
@app.route("/generate", methods=["POST"])
def generate_questions():
    data = request.json
    job_role = data.get("job_role", "")
    job_description = data.get("job_description", "")
    questions = simulator.generate_questions(job_role, job_description)
    return jsonify({"questions": questions})

@app.route("/score", methods=["POST"])
def score_answer():
    data = request.json
    question = data.get("question", "")
    answer = data.get("answer", "")
    result = simulator.score_answer(question, answer)
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
