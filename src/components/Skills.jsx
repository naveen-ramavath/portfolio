import React from 'react';
import { Cpu, Code2, Globe, Cloud, Database, BookOpen, Settings } from 'lucide-react';

export default function Skills() {
  const skillsData = [
    {
      category: "Programming Languages",
      icon: <Code2 size={20} />,
      skills: ["Java", "Python", "JavaScript", "SQL"]
    },
    {
      category: "Generative AI & ML",
      icon: <Cpu size={20} />,
      skills: ["Machine Learning", "Deep Learning", "TensorFlow", "LLMs", "RAG", "Prompt Engineering", "Vector Databases"]
    },
    {
      category: "Web Development",
      icon: <Globe size={20} />,
      skills: ["React.js", "Node.js", "Express.js", "REST APIs", "HTML5", "CSS3"]
    },
    {
      category: "Cloud & Big Data",
      icon: <Cloud size={20} />,
      skills: ["AWS (EC2, S3, Lambda)", "Apache Spark", "Apache Kafka", "Apache Hive", "Pig"]
    },
    {
      category: "Databases",
      icon: <Database size={20} />,
      skills: ["MySQL", "MongoDB", "SQLite", "JDBC"]
    },
    {
      category: "Core Computer Science",
      icon: <BookOpen size={20} />,
      skills: ["DSA (400+ LeetCode)", "OOP", "Operating Systems", "DBMS"]
    },
    {
      category: "Developer Tools",
      icon: <Settings size={20} />,
      skills: ["Git", "GitHub Actions", "Postman", "VS Code"]
    }
  ];

  return (
    <section id="skills">
      <h2 className="section-title">
        <Code2 size={28} className="gradient-text" style={{ verticalAlign: 'middle' }} /> Tech Stack
      </h2>

      <div className="skills-container">
        {skillsData.map((categoryObj, index) => (
          <div key={index} className="glass-panel skill-category-card">
            <h3 className="skill-category-title">
              <span className="gradient-text" style={{ display: 'inline-flex' }}>{categoryObj.icon}</span>
              {categoryObj.category}
            </h3>
            <div className="skill-pills">
              {categoryObj.skills.map((skill, idx) => (
                <span key={idx} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
