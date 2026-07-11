import React from 'react';
import { ArrowRight } from 'lucide-react';

// Custom inline SVG for GitHub (since newer Lucide versions removed brand icons)
export function GithubIcon({ size = 20, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Custom inline SVG for LinkedIn
export function LinkedinIcon({ size = 20, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Hero({ setActiveSection }) {
  const handleScrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-subtitle">WELCOME TO MY PORTFOLIO</span>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Ramavath Naveen</span>
            <br />
            <span className="gradient-text-alt">GenAI & Backend Dev</span>
          </h1>
          <p className="hero-description">
            Information Technology undergraduate at <strong>CBIT (CGPA: 9.17)</strong> with a strong foundation in DSA (<strong>400+ LeetCode solved</strong>).
            Specialized in architecting agentic GenAI systems (Multi-Agent RAG & Multi-Model AI Routing), building event-driven streaming pipelines (Kafka, PySpark), and deploying scalable, secure backend infrastructure on AWS.
          </p>

          <div className="hero-actions">
            <button onClick={() => handleScrollTo('projects')} className="gradient-btn">
              View Projects <ArrowRight size={16} />
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
            >
              View Resume
            </a>
            <button onClick={() => handleScrollTo('contact')} className="secondary-btn">
              Get In Touch
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">400+</span>
              <span className="stat-label">LeetCode Solved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">9.17</span>
              <span className="stat-label">CBIT CGPA</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Production Repos</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="profile-circle-container animate-float">
            <div className="profile-glow"></div>
            <div className="profile-avatar">
              <img
                src="/profile.png"
                alt="Ramavath Naveen Profile Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
