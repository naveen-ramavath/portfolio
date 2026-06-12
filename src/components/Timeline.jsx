import React, { useState } from 'react';
import { GraduationCap, Award, Calendar, BookOpen, Briefcase } from 'lucide-react';

export default function Timeline() {
  const [activeTab, setActiveTab] = useState('education');

  const educationData = [
    {
      role: "B.E., Information Technology",
      org: "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
      date: "Expected Graduation: May 2027",
      desc: "Currently maintaining an academic CGPA of 9.17. Actively engaged in core computer science subjects and AI/ML research.",
      details: [
        "CGPA: 9.17",
        "Key Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Cloud Computing",
        "Active member of the college coding and development clubs"
      ]
    }
  ];

  const certificationData = [
    {
      title: "Cloud Computing Intern",
      issuer: "InternPro",
      date: "2025",
      icon: <Briefcase size={18} />
    },
    {
      title: "MongoDB Certified Associate Developer (Python)",
      issuer: "MongoDB",
      date: "2025",
      icon: <Award size={18} />
    },
    {
      title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer: "Oracle",
      date: "2025",
      icon: <Award size={18} />
    },
    {
      title: "Google Cloud Computing Fundamentals",
      issuer: "NPTEL",
      date: "2024",
      icon: <Award size={18} />
    },
    {
      title: "LeetCode Ongoing Milestone (300+ DSA Solved)",
      issuer: "LeetCode",
      date: "Ongoing",
      icon: <BookOpen size={18} />
    }
  ];

  return (
    <section id="education">
      <h2 className="section-title">
        <GraduationCap size={28} className="gradient-text" style={{ verticalAlign: 'middle' }} /> Education & Credentials
      </h2>

      <div className="timeline-tabs">
        <button
          className={`timeline-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
        <button
          className={`timeline-tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('certifications')}
        >
          Certifications & Internships
        </button>
      </div>

      {activeTab === 'education' ? (
        <div className="timeline">
          {educationData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="glass-panel timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <span className="timeline-org">{item.org}</span>
                  </div>
                  <span className="timeline-date">{item.date}</span>
                </div>
                <p className="timeline-desc">{item.desc}</p>
                <ul className="timeline-desc-list">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="timeline-desc-item">{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cert-grid">
          {certificationData.map((cert, index) => (
            <div key={index} className="glass-panel cert-card">
              <div className="cert-icon-box">
                {cert.icon}
              </div>
              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <span className="cert-issuer">{cert.issuer} • <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{cert.date}</span></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
