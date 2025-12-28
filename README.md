# 🚀 AI Resume & Job Matcher

An AI-powered full stack application that analyzes resumes against job descriptions and **automatically recommends better-fit roles** using NLP techniques.

This project simulates how **Applicant Tracking Systems (ATS)** work in real companies.

---

## ✨ Features

### 📊 Resume vs Job Match Analysis
- Upload resume (PDF / DOCX)
- Paste any job description
- Get ATS-style match percentage
- See matched & missing keywords

### 🚀 Smart Job Recommendations (MAIN USP)
> Even if your resume does not match the selected job, the system finds **other roles where you fit better**.

- Resume compared with multiple job roles
- Jobs ranked by relevance
- Top 3 best-fit jobs suggested automatically

### 🧠 AI / NLP Logic
- Keyword extraction & normalization
- Core skill weighting
- Skill synonym mapping
- TF-IDF similarity scoring

---

## 🛠 Tech Stack

### Frontend
- React.js
- CSS (Custom UI)
- Fetch API

### Backend
- Node.js
- Express.js
- Multer (File Upload)
- pdf-parse / mammoth (Resume parsing)
- Natural (TF-IDF NLP)

### Tools
- Git & GitHub
- VS Code

---

## 🧩 System Flow

Resume Upload
↓
Text Extraction
↓
Keyword Processing
↓
ATS Match Score
↓
Job Recommendation Engine


---

## 📊 Job Recommendation Logic (USP)

1. Resume keywords extracted  
2. Compared against multiple job descriptions  
3. Match score calculated for each role  
4. Jobs ranked by relevance  
5. Best-fit jobs recommended automatically  

---

## 🚀 Run Locally

### Backend
```bash
npm install
node index.js

cd client
npm install
npm start
🎯 Future Enhancements

Resume improvement suggestions

Skill gap roadmap

Authentication system

Cloud deployment

👩‍💻 Author

Vrinda Oberoi
B.E. CSE (2nd Year)
Aspiring Software Engineer | FAANG Dreamer 🚀
