# 🚀 AI Interview Simulator  

Built for **OpenxAI Global AI Accelerator Hackathon 2025** by **Team Lassiii Coder**.  

---

## ⚙️ **Backend Setup (Flask)**  

```bash
pip install -r requirements.txt
cp .env.example .env
# add your OpenAI API key inside .env
python run.py
# runs on http://localhost:5000
```
## ⚙️ **Frontend Setup (Next.js)**
**unzip nextjs-app.zip -d nextjs-app**
```cd nextjs-app
npm install
npm run dev
```
runs on http://localhost:3000

## 🔗 **API Examples**

**Request – Generate Questions**
```
{ "job_role": "Software Engineer", "job_description": "Build APIs" }
```
**Response**
```
{ "questions": ["Q1 ...", "Q2 ..."] }
```

**Request – Score Answer**
```
{ "question": "Explain OOP", "answer": "Object-oriented programming..." }
```
**Response**
```
{
  "score": 8,
  "feedback": ["Good explanation"],
  "improvements": ["Add more real-world use cases"]
}
```
```
  "feedback": ["Good explanation"],
  "improvements": ["Add more real-world use cases"]
}
```
