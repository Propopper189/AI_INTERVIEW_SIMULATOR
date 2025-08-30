# 🚀 AI Interview Simulator  

Built for **OpenxAI Global AI Accelerator Hackathon 2025** by **Team Lassiii Coder**.  
A tool that generates interview questions, scores answers with feedback, and helps users improve.  

---

## ⚙️ Setup  

### Backend (Flask)  
```bash
pip install -r requirements.txt
cp .env.example .env
# add your OpenAI API key inside .env
python run.py
# runs on http://localhost:5000
Frontend (Next.js)
bash
Copy code
unzip nextjs-app.zip -d nextjs-app
cd nextjs-app
npm install
npm run dev
# runs on http://localhost:3000
🔗 API Endpoints
POST /generate
Request:

json

{ "job_role": "Software Engineer", "job_description": "Build APIs" }
Response:

json
Copy code
{ "questions": ["Q1 ...", "Q2 ..."] }
POST /score
Request:

json
Copy code
{ "question": "Explain OOP", "answer": "Object-oriented programming..." }
Response:

json
Copy code
{ "score": 8, "feedback": ["Good explanation"], "improvements": ["Add more real-world use cases"] }
