# 🚀 AI Interview Simulator  

This project is built for **OpenxAI Global AI Accelerator Hackathon 2025**.  
It contains a **Flask backend** (Python + OpenAI API) and a **Next.js frontend** (provided as a zip file in root).  

---

## 👥 Project Info  

- **Team Name**: Lassiii Coder  
- **Project Name**: AI Interview Simulator  
- **Description**:  
  An AI-powered interview preparation tool that:  
  - Generates professional interview questions  
  - Scores candidate answers with constructive feedback  
  - Encourages learners with tips for improvement  

- **Track**: AI + Productivity  

---

## ⚙️ Getting Started  

### 🔹 1. Backend (Flask API)  

#### Install dependencies  
```bash
pip install -r requirements.txt
Configure environment
Copy .env.example → .env

Add your own OpenAI API key (⚠️ each user must create their own key at OpenAI)

env
Copy code
OPENAI_API_KEY=your_api_key_here
Run backend
bash
Copy code
python run.py
Backend runs at http://localhost:5000

🔹 2. Frontend (Next.js)
Unzip
bash
Copy code
unzip nextjs-app.zip -d nextjs-app
cd nextjs-app
Install dependencies
bash
Copy code
npm install
Run frontend
bash
Copy code
npm run dev
Frontend runs at http://localhost:3000

🔗 API Endpoints
POST /generate
Request body:

json
Copy code
{ "job_role": "Software Engineer", "job_description": "Build APIs" }
Response:

json
Copy code
{ "questions": ["Q1 ...", "Q2 ..."] }
POST /score
Request body:

json
Copy code
{ "question": "Explain OOP", "answer": "Object-oriented programming..." }
Response:

json
Copy code
{
  "score": 8,
  "feedback": ["Good explanation", "Covered examples"],
  "improvements": ["Add more real-world use cases"]
}
