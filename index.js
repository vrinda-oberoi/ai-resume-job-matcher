// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const natural = require("natural");
const jobsData = require("./jobsdata");


// ================= APP SETUP =================
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully 🚀");
});

// ================= HELPER FUNCTION =================
function cleanText(text) {
 const stopWords = [
  "the","and","with","for","are","this","that","will","have","has","from",
  "your","you","looking","experience","knowledge","skills",
  "responsibilities","required","preferred","role","job","candidate","ability",
  "title","description","hiring","join","our","team","ideal","should",
  "seeking","who","solid","foundation","practical","exposure","strong"
];


  return text
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
}

function calculateTfidfSimilarity(resumeText, jobDescription) {
  try {
    const tfidf = new natural.TfIdf();

    tfidf.addDocument(resumeText);
    tfidf.addDocument(jobDescription);

    let score = 0;

    tfidf.tfidfs(jobDescription, function (i, measure) {
      if (i === 0) score = measure;
    });

    return score || 0.75; // fallback for safety
  } catch (err) {
    console.error("TF-IDF error:", err);
    return 0.75; // SAFE fallback
  }
}


// ================= MATCH API =================
app.post("/api/match", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    const { jobDescription } = req.body;

    if (!file || !jobDescription) {
      return res.status(400).json({
        error: "Resume file and Job Description are required",
      });
    }

    let resumeText = "";

    // ===== Resume Extraction =====
    if (file.mimetype === "application/pdf") {
      const data = await pdfParse(file.buffer);
      resumeText = data.text;
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const data = await mammoth.extractRawText({ buffer: file.buffer });
      resumeText = data.value;
    } else {
      return res.status(400).json({
        error: "Unsupported file format",
      });
    }

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({
        error: "Unable to extract resume text",
      });
    }
    

    // ===== Clean Text =====
    const resumeWords = cleanText(resumeText);
    const jobWords = cleanText(jobDescription);

    const resumeSet = new Set(resumeWords);
    // ===== STEP 2: Compare Resume with All Jobs =====
const jobMatchResults = [];

jobsData.forEach(job => {
  const jobDescWords = cleanText(job.description);
  const jobSet = new Set(jobDescWords);

  if (jobSet.size === 0) return;

  const matchedCount = jobDescWords.filter(word =>
    resumeSet.has(word)
  ).length;

  const score = Math.round(
    (matchedCount / jobSet.size) * 100
  );

  jobMatchResults.push({
    title: job.title,
    matchScore: score,
  });
});

    const jobSet = new Set(jobWords);
    // ===== STEP 3: Filter & Rank Recommended Jobs =====
const recommendedJobs = jobMatchResults
  .filter(job => job.matchScore >= 40) // allow partial matches
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 3);


    // ===== Skill Synonyms Map =====
const skillMap = {
  react: ["reactjs", "frontend"],
  javascript: ["js"],
  api: ["rest", "restapi"],
  component: ["components", "componentbased"],
  state: ["statemanagement"],
  hooks: ["reacthooks"],
};

// ===== Expand Resume Skills =====
const expandedResumeSet = new Set(resumeSet);

for (let skill in skillMap) {
  if (resumeSet.has(skill)) {
    skillMap[skill].forEach(synonym => {
      expandedResumeSet.add(synonym);
    });
  }
}

// ===== Matching Logic (FIXED) =====
const matchedKeywords = [...jobSet].filter(word =>
  expandedResumeSet.has(word)
);

const missingKeywords = [...jobSet].filter(word =>
  !expandedResumeSet.has(word)
);


    // ===== CORE SKILLS (HIGH WEIGHT) =====
    const coreSkills = [
      "html","css","javascript","react",
      "components","state","props","hooks","api"
    ];

  const matchedCore = coreSkills.filter(skill =>
  jobSet.has(skill) && expandedResumeSet.has(skill)
);

const missingCore = coreSkills.filter(skill =>
  jobSet.has(skill) && !expandedResumeSet.has(skill)
);

    // ===== SCORE CALCULATION =====
 // ===== MAIN JOB SCORE (KEYWORD + CORE SKILLS BASED) =====
const keywordScore = jobSet.size > 0
  ? (matchedKeywords.length / jobSet.size) * 60   // weight keywords
  : 0;

const coreSkillBonus = matchedCore.length * 8;     // core skills matter more
const resumeStrengthBonus = resumeSet.size > 50 ? 10 : 0;

let matchScore = Math.round(
  keywordScore + coreSkillBonus + resumeStrengthBonus
);

// bounds
if (matchScore > 95) matchScore = 95;
if (matchScore < 15) matchScore = matchScore;


// realistic bounds
if (matchScore > 95) matchScore = 95;
if (matchScore < 20) matchScore = matchScore; // allow low scores

const atsFriendly = matchScore >= 60;


    // ===== RESPONSE =====
   res.json({
  matchScore: isNaN(matchScore) ? 0 : matchScore,
  atsFriendly,
  keywordsFound: matchedKeywords.slice(0, 10),
  missingKeywords: missingKeywords.slice(0, 10),
  recommendedJobs
});


  }
   catch (error) {
  console.error("❌ Server Error:", error);

res.status(500).json({
  error: "Internal server error"
});

}
});

// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
