import React from 'react';
import { FolderGit2, ExternalLink, ShieldCheck, HeartPulse, Cpu, Cloud, Music } from 'lucide-react';

export default function Projects() {
  const projectsData = [
    {
      title: "Agri AI Advisory System",
      description: "A full-stack agricultural platform utilizing machine learning for soil classification and crop recommendations, paired with a multi-agent RAG chatbot routing queries to digital experts.",
      bullets: [
        "Trained a TensorFlow ANN and ResNet50 CNN to recommend crops and classify soil images with over 95% accuracy.",
        "Integrated a multi-agent RAG chatbot using the Gemini 2.5 Flash API, Weather API, and Reddit API to route agricultural queries, reducing response latency by 25%.",
        "Engineered automated entity-extraction pipelines in Python and Node.js to build dynamic user memory profiles in MongoDB, increasing user query personalization by 40%."
      ],
      tags: ["React.js", "Node.js", "MongoDB", "RAG", "TensorFlow", "Gemini API"],
      github: "https://github.com/MiniProjectII/agri-ai-advisory-system",
      icon: <Cpu size={22} />
    },
    {
      title: "Digital Health Portfolio",
      description: "AWS-deployed full-stack healthcare web application providing secure medical record management and intelligent health predictions based on historical patient records.",
      bullets: [
        "Deployed full-stack MERN application on AWS EC2 with S3 for secure, encrypted storage of medical records, prescriptions, and health history.",
        "Scaled the backend to handle 300+ concurrent requests using AWS Auto Scaling Groups and Application Load Balancer, achieving 99.9% uptime.",
        "Integrated a RAG pipeline using vector search and the Gemini API to retrieve records and generate context-aware patient health insights, matching 10+ patient conditions per query."
      ],
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "AWS EC2/S3", "RAG", "Gemini API"],
      github: "https://github.com/naveen-ramavath/Digital-Health-portfolio",
      icon: <HeartPulse size={22} />
    },
    {
      title: "AWS CI/CD Blog Auto-Deploy",
      description: "An automated infrastructure and deployment pipeline using CI/CD practices to publish blog updates with zero downtime and built-in security protocols.",
      bullets: [
        "Engineered an automated CI/CD pipeline using GitHub Actions and AWS EC2, reducing manual production code deployment time by 80%.",
        "Configured Nginx reverse proxy, SSL/TLS certificates, and SSH authentication, securing application traffic and achieving 99.9% uptime.",
        "Automated testing and bash script deployment processes, reducing integration and release-related issues by 45%."
      ],
      tags: ["AWS EC2", "GitHub Actions", "Nginx", "SSL/TLS", "Linux", "Bash Scripting"],
      github: "https://github.com/naveen-ramavath/blog-auto-deploy",
      icon: <Cloud size={22} />
    },
    {
      title: "AeroGuard Airplane Collision Detection",
      description: "A real-time big data streaming analytics pipeline for collision alert detection, monitoring coordinate paths of active flights.",
      bullets: [
        "Architected an event-driven streaming pipeline using Apache Kafka and PySpark to process aircraft GPS coordinate streams.",
        "Executed spatial collision detection algorithms under 1.2 seconds latency, triggering immediate warnings for close-proximity paths.",
        "Rendered live flight paths and proximity alerts on a Flask-based interactive dashboard with WebSocket streaming."
      ],
      tags: ["Apache Kafka", "PySpark", "Flask", "WebSocket", "Python", "Data Streaming"],
      github: "https://github.com/naveen-ramavath/aeroguard", // Placeholder URL based on request
      icon: <ShieldCheck size={22} />
    },
    {
      title: "Emotion Music Generator using DL",
      description: "A deep learning visual emotion detection system that recommends custom Spotify and YouTube playlists matching the user's current facial expressions.",
      bullets: [
        "Developed a real-time facial expression emotion recognition system using a CNN trained in TensorFlow/Keras and OpenCV.",
        "Classified facial expressions into 7 primary emotions (Happy, Sad, Angry, Neutral, etc.) with 88% model accuracy.",
        "Integrated Spotify and YouTube APIs to dynamically recommend and generate custom music playlists matching the user's current mood."
      ],
      tags: ["TensorFlow", "Keras", "OpenCV", "Python", "CNN", "Spotify API", "YouTube API"],
      github: "https://github.com/naveen-ramavath/emotion-music-generator", // Placeholder URL based on request
      icon: <Music size={22} />
    }
  ];

  return (
    <section id="projects">
      <h2 className="section-title">
        <FolderGit2 size={28} className="gradient-text" style={{ verticalAlign: 'middle' }} /> Projects
      </h2>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <div key={index} className="glass-panel project-card">
            <div className="project-card-header">
              <div className="project-icon-wrapper">
                {project.icon}
              </div>
              <div className="project-links">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                  aria-label={`GitHub link for ${project.title}`}
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <ul className="project-bullets">
              {project.bullets.map((bullet, idx) => (
                <li key={idx} className="project-bullet-item">{bullet}</li>
              ))}
            </ul>
            <div className="project-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
