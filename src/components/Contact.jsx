import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Code } from 'lucide-react';

// Custom inline SVG for GitHub
function GithubIcon({ size = 20, ...props }) {
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
function LinkedinIcon({ size = 20, ...props }) {
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

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const contactDetails = [
    {
      icon: <Mail size={22} />,
      label: "Email",
      value: "naveenramavath559@gmail.com",
      link: "mailto:naveenramavath559@gmail.com"
    },
    {
      icon: <MapPin size={22} />,
      label: "Location",
      value: "Hyderabad, Telangana",
      link: "https://maps.google.com/?q=Hyderabad"
    }
  ];

  const socialLinks = [
    {
      icon: <GithubIcon size={20} />,
      name: "GitHub",
      url: "https://github.com/naveen-ramavath"
    },
    {
      icon: <LinkedinIcon size={20} />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ramavath-naveen-049460324/"
    },
    {
      icon: <Code size={20} />,
      name: "LeetCode",
      url: "https://leetcode.com/u/naveenramavath4203/"
    }
  ];

  return (
    <section id="contact">
      <h2 className="section-title">
        <Mail size={28} className="gradient-text" style={{ verticalAlign: 'middle' }} /> Get In Touch
      </h2>

      <div className="contact-container">
        <div className="contact-info-list">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            I am open to summer internships, backend roles, and collaborative GenAI projects. Feel free to reach out directly through email, phone, or connect with me on professional profiles!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {contactDetails.map((detail, idx) => (
              <a
                href={detail.link}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="glass-panel contact-card"
              >
                <div className="contact-icon">{detail.icon}</div>
                <div className="contact-details">
                  <span className="contact-label">{detail.label}</span>
                  <span className="contact-value">{detail.value}</span>
                </div>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            {socialLinks.map((social, idx) => (
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="secondary-btn"
                style={{ flexGrow: 1, justifyContent: 'center' }}
              >
                {social.icon} {social.name}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel contact-form" style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1rem' }}>Send a Message</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="gradient-btn"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            disabled={submitted}
          >
            {submitted ? "Message Sent!" : <><Send size={16} /> Send Message</>}
          </button>
        </form>
      </div>
    </section>
  );
}
