import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // ===== STATE =====
  const [isScrolled, setIsScrolled] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const resultRef = useRef(null);

  // ===== SCROLL EFFECT =====
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 // ===== ANALYZE RESUME =====
 const analyzeResume = async () => {
  if (!resumeFile || !jobDescription) {
    alert("Upload resume and add job description");
    return;
  }

  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("jobDescription", jobDescription);

  try {
    setLoading(true);

    const response = await fetch(
  "https://ai-resume-job-matcher-wzc6.onrender.com/api/match",
  {
    method: "POST",
    body: formData,
  }
);

    const data = await response.json();
    setResult(data);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};



  // ===== FEATURES =====
  const features = [
    {
      icon: "📄",
      title: "Upload Resume",
      description:
        "Upload your resume in PDF, DOC, or DOCX format with ease.",
      highlight: false,
    },
    {
      icon: "🔑",
      title: "AI Keyword Suggestions",
      description:
        "Discover missing skills & keywords to improve resume ranking.",
      highlight: false,
    },
    {
      icon: "🎯",
      title: "Resume–Job Matching",
      description:
        "AI scans resume against job descriptions and shows match score.",
      highlight: true,
    },
    {
      icon: "✅",
      title: "ATS-Friendly Score",
      description:
        "Check ATS compatibility and optimize for recruiter systems.",
      highlight: false,
    },
  ];

  // ===== STATS (UPDATED) =====
  const stats = [
    { number: "AI Powered", label: "Smart Resume Analysis" },
    { number: "ATS Aware", label: "Industry Screening Ready" },
    { number: "Student Focused", label: "Built for Freshers" },
    { number: "Fast & Free", label: "Instant Results" },
  ];

  return (
    <div className="app">
      {/* BACKGROUND */}
      <div className="bg-animation">
        <div className="bg-gradient"></div>
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
        <div className="bg-glow glow-3"></div>
      </div>

      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">ResumeAI</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it Works</a>
          </div>
          <button className="nav-btn">Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>AI-Powered Resume Analysis</span>
            </div>

            <h1 className="hero-title">
              AI Resume <span className="gradient-text">& Job Matcher</span>
            </h1>

            <p className="hero-description">
              Analyze your resume against job descriptions using AI and improve
              your chances of getting shortlisted.
            </p>

            {/* INPUTS */}
            <div className="upload-section">
              <label className="file-upload">
                📄 Upload Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files[0];
                   setResumeFile(file);
          }}
          
/>

                {resumeFile && (
  <p className="uploaded-file">
    📄 Uploaded: <strong>{resumeFile.name}</strong>
  </p>
)}
 </label>


<textarea
  className="job-textarea"
  placeholder="Paste Job Description here..."
  value={jobDescription}
  onChange={(e) => setJobDescription(e.target.value)}
/>

             <button className="btn-primary" onClick={analyzeResume} disabled={loading}>
  {loading ? "⏳ Analyzing..." : "🔍 Scan My Resume"}
</button>

            </div>

            {/* TRUST */}
            <div className="trust-section">
              <p className="trust-text">Built for modern job seekers:</p>
              <div className="trust-logos">
                <span className="trust-logo">🧠 AI Driven</span>
                <span className="trust-logo">📊 ATS Focused</span>
                <span className="trust-logo">🎓 Student Friendly</span>
                <span className="trust-logo">⚡ Fast Results</span>
              </div>
            </div>
          </div>

          {/* RIGHT UI */}
          <div className="hero-image">
            <div className="image-container">
              <div className="floating-card card-1">
                <span>📊</span>
                <div>
                  <p className="card-label">Match Score</p>
                  <p className="card-value">92%</p>
                </div>
              </div>

              <div className="floating-card card-2">
                <span>✅</span>
                <div>
                  <p className="card-label">ATS</p>
                  <p className="card-value">Passed</p>
                </div>
              </div>

              <div className="floating-card card-3">
                <span>🔑</span>
                <div>
                  <p className="card-label">Keywords</p>
                  <p className="card-value">15/18</p>
                </div>
              </div>

              <div className="main-illustration">
                <div className="illustration-content">
                  <div className="resume-preview">
                    <div className="resume-header"></div>
                    <div className="resume-line"></div>
                    <div className="resume-line short"></div>
                    <div className="resume-line"></div>
                    <div className="resume-line medium"></div>
                    <div className="resume-section"></div>
                    <div className="resume-line"></div>
                  </div>
                  <div className="ai-scanner">
                    <div className="scanner-line"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <h3 className="stat-number">{s.number}</h3>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features-section">
        <div className="features-container">
          <div className="section-header">
            <span className="section-badge">🛠 Features</span>
              <h2 className="value-title">
  Make your resume <span className="highlight-text">80% stronger</span> 
  <br />using our AI-powered tool
</h2>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div
                key={i}
                className={`feature-card ${
                  f.highlight ? "feature-highlight" : ""
                }`}
              >
                {f.highlight && (
                  <div className="feature-badge">⭐ Main Feature</div>
                )}
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-description">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      {/* ====== AUTO-SUGGESTED JOB MATCH SECTION ====== */}
<section className="auto-match-section">
  <div className="auto-match-container">
    <h2 className="auto-match-title">
      Find Matching Jobs for Your Resume
    </h2>
    <p className="auto-match-description">
      Our AI will automatically suggest job descriptions that best match your resume content. Discover roles you might not have considered!
    </p>
  </div>
  
</section>
      {/* ====== HOW IT WORKS SECTION ====== */}
<section id="how-it-works" className="how-section">
  <div className="how-container">
    <div className="section-header">
      <span className="section-badge">📋 How It Works</span>
      <h2 className="section-title">
        Three simple steps to
        <span className="gradient-text"> get started</span>
      </h2>
    </div>

    <div className="steps-container">
      <div className="step-card">
        <div className="step-number">01</div>
        <div className="step-icon">📤</div>
        <h3 className="step-title">Upload Resume</h3>
        <p className="step-description">
          Upload your resume in PDF, DOC, or DOCX format.
        </p>
      </div>

      <div className="step-connector">
        <div className="connector-line"></div>
        <div className="connector-arrow">→</div>
      </div>

      <div className="step-card">
        <div className="step-number">02</div>
        <div className="step-icon">📝</div>
        <h3 className="step-title">Add Job Description</h3>
        <p className="step-description">
          Paste the job description you are targeting.
        </p>
      </div>

      <div className="step-connector">
        <div className="connector-line"></div>
        <div className="connector-arrow">→</div>
      </div>

      <div className="step-card">
        <div className="step-number">03</div>
        <div className="step-icon">🎯</div>
        <h3 className="step-title">Get Results</h3>
        <p className="step-description">
          Instantly receive AI match score and insights.
        </p>
      </div>
    </div>
  </div>
</section>
 {/* RESULT */}
{result && typeof result.matchScore === "number" && (
  <section className="results-section" ref={resultRef}>
    <h2>📊 Resume Analysis Result</h2>

    <h3>{result.matchScore}% Match</h3>

    <p>
      ATS Status:{" "}
      {result.atsFriendly ? "ATS Friendly ✅" : "Needs Improvement ❌"}
    </p>

    <h4>Matched Keywords</h4>
    <div className="chips">
      {(result.keywordsFound || []).map((k, i) => (
        <span key={i} className="chip good">{k}</span>
      ))}
    </div>

    <h4>Missing Keywords</h4>
    <div className="chips">
      {(result.missingKeywords || []).map((k, i) => (
        <span key={i} className="chip bad">{k}</span>
      ))}
    </div>
  </section>
)}

{/* USP: Automatic Job Recommendations (OUTSIDE RESULT) */}
{result?.recommendedJobs?.length > 0 && (
  <section className="recommend-section">
    <h3 className="recommend-title">
      🚀 Smart Job Recommendations <span>(AI Suggested)</span>
    </h3>

    <p className="recommend-subtitle">
      Your resume matches these roles better than the selected job
    </p>

    <div className="recommend-grid">
      {result.recommendedJobs.map((job, index) => (
        <div key={index} className="recommend-card">
          <div className="rank-badge">#{index + 1}</div>

          <h4>{job.title}</h4>

          <div className="match-badge">
            {job.matchScore}% Match
          </div>
        </div>
      ))}
    </div>
  </section>
)}


{/* ====== CTA SECTION ====== */}
<section className="cta-section">
  <div className="cta-container">
    <div className="cta-content">
      <h2 className="cta-title">
        Ready to land your dream internship?
      </h2>
      <p className="cta-description">
        Start your free AI-powered resume analysis now.
      </p>

      <div className="cta-buttons">
        <button className="btn-primary btn-large">
          🚀 Start Free Analysis
        </button>
        <p className="cta-note">No signup required • 100% Free</p>
      </div>
    </div>
  </div>
</section>


      {/* ====== FOOTER ====== */}
<footer className="footer">
  <div className="footer-container">
    <div className="footer-top">
      <div className="footer-brand">
        <div className="footer-logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">ResumeAI</span>
        </div>
        <p className="footer-tagline">
          AI-powered resume analysis for students and fresh graduates.
        </p>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#">Pricing</a>
        </div>

        <div className="footer-column">
          <h4>Resources</h4>
          <a href="#">Blog</a>
          <a href="#">Resume Tips</a>
          <a href="#">Career Guide</a>
        </div>

        <div className="footer-column">
          <h4>Connect</h4>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2025 Built with ❤️ for Students.Build by Vrinda Oberoi</p>
      <p>ResumeAI • Student Internship Project</p>
    </div>
  </div>
</footer>

    </div>
  );
}

export default App;
