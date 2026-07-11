import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Settings, Sparkles, Key, Check, AlertCircle } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hi! I'm Naveen's AI agent. Ask me anything about his projects, skills, education, or achievements. (You can also unlock full Gemini LLM replies in the settings gear above!)", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('naveen_portfolio_gemini_key') || '');
  const [keySaved, setKeySaved] = useState(!!localStorage.getItem('naveen_portfolio_gemini_key'));

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const saveApiKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('naveen_portfolio_gemini_key', apiKey.trim());
      setKeySaved(true);
      setShowSettings(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "✨ API Key saved! I am now powered directly by Gemini 2.5 Flash. Go ahead, ask me anything!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } else {
      localStorage.removeItem('naveen_portfolio_gemini_key');
      setKeySaved(false);
      setShowSettings(false);
    }
  };

  const removeApiKey = () => {
    localStorage.removeItem('naveen_portfolio_gemini_key');
    setApiKey('');
    setKeySaved(false);
    setMessages(prev => [
      ...prev,
      {
        sender: 'bot',
        text: "API Key removed. Switched back to my local keyword model.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Profile context for Gemini system prompt
  const profileContext = `
  You are the AI Assistant representing Ramavath Naveen. Answer questions about him professionally and concisely.
  
  Personal Details:
  - Name: Ramavath Naveen
  - Email: naveenramavath559@gmail.com
  - Address: Hyderabad, Telangana
  - LinkedIn: linkedin.com/in/ramavath-naveen-049460324
  - GitHub: github.com/naveen-ramavath
  - LeetCode: leetcode.com/u/naveenramavath4203 (Solved 300+ problems, strong in DSA)
  
  Summary:
  Information Technology undergraduate at CBIT (CGPA: 9.17) with strong DSA foundations (300+ LeetCode problems). Experienced in building AI-powered applications using Python, TensorFlow, LLMs, and RAG pipelines, along with scalable backend systems on AWS. Interested in Generative AI, Machine Learning, and Backend Engineering.
  
  Education:
  - B.E. in Information Technology, Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad. Expected Graduation: May 2027. CGPA: 9.17.
  
  Technical Skills:
  - Languages: Java, Python, JavaScript, SQL
  - AI/ML: Machine Learning, Deep Learning, TensorFlow, LLMs, RAG, Prompt Engineering, Vector Databases
  - Web Development: React.js, Node.js, Express.js, REST APIs, HTML, CSS
  - Cloud & Big Data: AWS (EC2, S3, Lambda), Google Cloud Platform, Apache Spark, Apache Kafka, Apache Hive, Pig
  - Databases: MySQL, MongoDB, SQLite, JDBC
  - Core CS: DSA, OOP, OS, DBMS
  - Developer Tools: Git, GitHub Actions, Postman, VS Code
  
  Projects:
  1. AuraWork Workspace Companion (GitHub: github.com/naveen-ramavath/AuraWork): FastAPI, Gemini/Groq/DeepSeek APIs, Meta Graph API, OAuth 2.0, Fernet Cryptography, SQLite. Agentic WhatsApp companion automating tasks in Slack, Jira, and Google Workspace, featuring a multi-model routing engine and sequential fallback chain.
  2. Agri AI Advisory System (GitHub: github.com/MiniProjectII/agri-ai-advisory-system): MERN stack, ResNet50 soil classification (95% accuracy), crop recommendation, multi-agent RAG chatbot via Gemini 2.5 Flash API/Weather API/Reddit API, Python entity-extraction pipelines.
  3. Digital Health Portfolio (GitHub: github.com/naveen-ramavath/Digital-Health-portfolio): MERN stack deployed on AWS EC2/S3, AWS ALB and ASG handling 300+ concurrent requests (99.9% uptime), vector-search RAG pipeline via Gemini API.
  4. AWS CI/CD Blog Auto-Deploy (GitHub: github.com/naveen-ramavath/blog-auto-deploy): CI/CD pipeline using GitHub Actions, EC2, Nginx reverse proxy, SSL/TLS, SSH, automated bash script deployment.
  5. AeroGuard Airplane Collision Detection: Spatial collision detection under 1.2s latency on aircraft GPS streams using Kafka and PySpark, rendering on a Flask WebSocket dashboard.
  6. Emotion Music Generator: Facial mood CNN classifier (88% accuracy) via TensorFlow/Keras & OpenCV, dynamically recommending playlists via Spotify/YouTube APIs.
  
  Certifications & Internships:
  - Salesforce Certified Agentforce Specialist (2025)
  - Salesforce Certified AI Associate (2025)
  - AI & Prompt Engineering Intern - Vault of Codes (2025)
  - Cloud Computing Intern - InternPro (2025)
  - MongoDB Certified Associate Developer - Python (2025)
  - Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (2025)
  - Google Cloud Computing Fundamentals - NPTEL (2024)
  `;

  // Local Mock Responder (Keyword Matcher)
  const getMockResponse = (query) => {
    const q = query.toLowerCase();
    
    if (/\b(hello|hi|hey|greetings|yo)\b/i.test(q)) {
      return "Hello! I am Naveen's assistant. You can ask me about his skills, education, certifications, or projects like 'AuraWork', 'Agri-AI Advisory System', and 'AeroGuard'.";
    }
    
    if (q.includes('project') || q.includes('portfolio') || q.includes('build')) {
      return "Naveen has built several notable projects:\n\n1. **AuraWork Workspace Companion**: Agentic WhatsApp companion automating Slack, Jira, Gmail & Calendar.\n2. **Agri AI Advisory System**: Crop recommendations and soil CNN classifier, plus multi-agent RAG.\n3. **Digital Health Portfolio**: AWS-deployed MERN app with secure medical records and Gemini search.\n4. **AWS CI/CD Auto-Deploy**: Automated actions/deployment on EC2 using GitHub Actions and Nginx.\n5. **AeroGuard**: Real-time airplane collision alerting using PySpark and Kafka.\n6. **Emotion Music Generator**: CNN expression classifier recommending Spotify tracks.\n\nWhich of these would you like to hear more about?";
    }

    if (q.includes('aurawork') || q.includes('whatsapp') || q.includes('companion') || q.includes('workspace')) {
      return "💬 **AuraWork Workspace Companion**\n• *Stack*: FastAPI, Gemini API, Meta Graph API, OAuth 2.0, SQLite, Cryptography, Python\n• Built an agentic workspace companion enabling control of Slack, Jira, Gmail, and Calendar via WhatsApp.\n• Integrated a multi-model routing engine (Gemini, Groq, OpenRouter, DeepSeek) with a sequential fallback chain.\n• Secured credentials and tokens using AES-128 Fernet cryptography.\n• GitHub: github.com/naveen-ramavath/AuraWork";
    }
    
    if (q.includes('agri') || q.includes('soil') || q.includes('crop') || q.includes('agriculture')) {
      return "🌱 **Agri AI Advisory System**\n• *Stack*: React.js, Node.js, MongoDB, RAG, TensorFlow\n• Trained a ResNet50 CNN and TensorFlow ANN for soil and crop recommendation (95%+ accuracy).\n• Integrated a multi-agent Gemini RAG chatbot, routing farmer queries to virtual domain experts.\n• GitHub: github.com/MiniProjectII/agri-ai-advisory-system";
    }

    if (q.includes('health') || q.includes('medical') || q.includes('doctor') || q.includes('clinic')) {
      return "🏥 **Digital Health Portfolio**\n• *Stack*: MERN, AWS, RAG, Gemini API\n• Deployed on AWS EC2 and S3, scaling backend for 300+ concurrent requests using Auto Scaling and Application Load Balancer.\n• Created a Gemini vector search RAG pipeline generating patient recommendations.\n• GitHub: github.com/naveen-ramavath/Digital-Health-portfolio";
    }

    if (q.includes('blog') || q.includes('ci/cd') || q.includes('cicd') || q.includes('deploy')) {
      return "🚀 **AWS CI/CD Blog Auto-Deploy**\n• *Stack*: AWS EC2, GitHub Actions, Nginx, Linux, Bash\n• Automated production deployments, reducing manual upload times by 80%.\n• Maintained 99.9% uptime by configuring Nginx reverse proxy, SSH keys, and SSL certificates.\n• GitHub: github.com/naveen-ramavath/blog-auto-deploy";
    }

    if (q.includes('collision') || q.includes('airplane') || q.includes('aeroguard') || q.includes('flight') || q.includes('aircraft')) {
      return "✈️ **AeroGuard Collision Detection**\n• *Stack*: Apache Kafka, PySpark, Flask, WebSocket, Python\n• Processes live aircraft GPS coordinates to trigger collision alerts under 1.2 seconds latency.\n• Renders real-time flight paths on a WebSockets-powered dashboard.";
    }

    if (q.includes('music') || q.includes('emotion') || q.includes('facial') || q.includes('expression')) {
      return "🎵 **Emotion Music Generator**\n• *Stack*: TensorFlow, Keras, OpenCV, Spotify API, Python\n• Built a CNN classifying facial expressions with 88% accuracy.\n• Integrates Spotify and YouTube APIs to automatically feed playlist recommendations based on detected emotion.";
    }

    if (q.includes('skill') || q.includes('languages') || q.includes('tech') || q.includes('framework')) {
      return "💻 **Technical Skills**\n• *Languages*: Java, Python, JavaScript, SQL\n• *AI/ML*: Machine Learning, Deep Learning, TensorFlow, RAG, Prompt Eng, Vector DBs\n• *Web*: React.js, Node.js, Express.js, REST APIs\n• *Cloud/Data*: AWS (EC2/S3/Lambda), GCP, Spark, Kafka, Hive, Pig\n• *Databases*: MongoDB, MySQL, SQLite";
    }

    if (q.includes('education') || q.includes('cbit') || q.includes('college') || q.includes('gpa') || q.includes('cgpa')) {
      return "🎓 **Education**\n• Pursuing B.E. in Information Technology at **Chaitanya Bharathi Institute of Technology (CBIT)**, Hyderabad.\n• CGPA: **9.17**\n• Expected Graduation: **May 2027**";
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('social') || q.includes('linkedin') || q.includes('github') || q.includes('reach') || q.includes('contack')) {
      return "📞 **Contact Details**\n• *Email*: naveenramavath559@gmail.com\n• *LinkedIn*: linkedin.com/in/ramavath-naveen-049460324\n• *GitHub*: github.com/naveen-ramavath\n• *LeetCode*: leetcode.com/u/naveenramavath4203\n• *Location*: Hyderabad, India";
    }

    if (q.includes('leetcode') || q.includes('dsa') || q.includes('coding') || q.includes('problem')) {
      return "🏆 **DSA & LeetCode**\nNaveen has solved **300+ coding problems on LeetCode**, focusing on advanced data structures, algorithms, and logical problem solving.";
    }

    if (q.includes('cert') || q.includes('certification') || q.includes('internship')) {
      return "📜 **Certifications & Internships**\n• Salesforce Certified Agentforce Specialist (2025)\n• Salesforce Certified AI Associate (2025)\n• AI & Prompt Engineering Internship (Vault of Codes, 2025)\n• Cloud Computing Internship Certificate (InternPro, 2025)\n• MongoDB Certified Associate Developer - Python (2025)\n• Oracle Cloud Infrastructure Certified AI Foundations Associate (2025)\n• Google Cloud Computing Fundamentals (NPTEL, 2024)";
    }

    return "I can help you with questions about Naveen's projects (AuraWork, Agri-AI, AeroGuard), technical skills, contact details, or education history. \n\n*Tip: Click the Settings gear in the header to enter a Gemini API key and chat with a real LLM model!*";
  };

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // If using real Gemini API
    if (keySaved && apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${profileContext}\n\nUser Question: ${textToSend}\nAnswer:`
              }]
            }]
          })
        });

        const data = await response.json();
        const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a proper reply from Gemini. Please check your network or API key settings.";

        setIsTyping(false);
        setMessages(prev => [
          ...prev, 
          {
            sender: 'bot',
            text: botText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } catch (error) {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: "🔴 Error calling Gemini API. Falling back to local responder.\n\n" + getMockResponse(textToSend),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } else {
      // Offline local responder
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: getMockResponse(textToSend),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 700);
    }
  };

  const presetQuestions = [
    "Tell me about AuraWork",
    "What are his skills?",
    "Show me certifications",
    "How to contact him?"
  ];

  return (
    <>
      {/* Floating Button */}
      <div className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        {!isOpen && <span className="chatbot-trigger-badge"></span>}
      </div>

      {/* Chat Window */}
      <div className={`glass-panel chatbot-window ${isOpen ? 'open' : ''}`}>
        
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-identity">
            <div className="chatbot-avatar">
              <Sparkles size={18} />
            </div>
            <div className="chatbot-meta">
              <span className="chatbot-name">Naveen's AI Agent</span>
              <span className="chatbot-status">
                {keySaved ? "Gemini 2.5 Flash Active" : "Online"}
              </span>
            </div>
          </div>
          
          <div className="chatbot-actions">
            <button 
              className="chatbot-action-btn"
              onClick={() => setShowSettings(!showSettings)}
              title="LLM Settings"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
            <button 
              className="chatbot-action-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Settings Overlay */}
        {showSettings && (
          <div className="chatbot-settings-panel">
            <div className="settings-header">
              <h4 className="settings-title">Configure Gemini LLM</h4>
              <button 
                className="chatbot-action-btn"
                onClick={() => setShowSettings(false)}
                aria-label="Close settings"
              >
                <X size={16} />
              </button>
            </div>
            <div className="settings-body">
              <p className="settings-desc">
                By default, this chatbot uses local keyword-matching. To test dynamic, natural language replies, provide your Gemini API Key.
              </p>
              
              {keySaved ? (
                <div className="settings-key-status">
                  <Check size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> 
                  API Key is configured and saved.
                </div>
              ) : (
                <div className="settings-key-status missing">
                  <AlertCircle size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> 
                  Using offline local mock.
                </div>
              )}

              <form onSubmit={saveApiKey} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="form-group">
                  <label htmlFor="apiKey" style={{ fontSize: '0.75rem' }}>Gemini API Key</label>
                  <div style={{ position: 'relative' }}>
                    <Key size={14} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
                    <input 
                      type="password" 
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      style={{ paddingLeft: '2rem', width: '100%' }}
                    />
                  </div>
                </div>
                <button type="submit" className="gradient-btn" style={{ fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}>
                  Save Key
                </button>
                {keySaved && (
                  <button 
                    type="button" 
                    onClick={removeApiKey}
                    className="secondary-btn" 
                    style={{ fontSize: '0.85rem', width: '100%', justifyContent: 'center', borderColor: '#f87171', color: '#f87171' }}
                  >
                    Disconnect Key
                  </button>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="chatbot-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <div className="chat-bubble">
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <span className="chat-message-time">{msg.time}</span>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message bot">
              <div className="chat-bubble" style={{ display: 'inline-block' }}>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Presets and Input */}
        <div style={{ background: 'rgba(13, 17, 29, 0.95)' }}>
          <div className="chatbot-presets">
            {presetQuestions.map((q, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSend(q)}
                className="chatbot-preset-btn"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input 
              type="text" 
              className="chatbot-input" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Naveen..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              className="chatbot-send-btn" 
              onClick={() => handleSend()}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
