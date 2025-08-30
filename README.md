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
unzip nextjs-app.zip -d nextjs-app
cd nextjs-app
npm install
npm run dev
# runs on http://localhost:3000
{ "job_role": "Software Engineer", "job_description": "Build APIs" }
{ "questions": ["Q1 ...", "Q2 ..."] }
{ "question": "Explain OOP", "answer": "Object-oriented programming..." }
{
  "score": 8,
  "feedback": ["Good explanation"],
  "improvements": ["Add more real-world use cases"]
}
