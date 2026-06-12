import React from 'react';
import { Sun, Moon, Terminal } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection, theme, toggleTheme }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
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
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => handleNavClick('home')}>
        <Terminal size={22} className="gradient-text" style={{ strokeWidth: 2.5 }} />
        <span>Naveen<span>.dev</span></span>
      </div>
      <ul className="navbar-links">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleNavClick(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', font: 'inherit' }}
            >
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </li>
      </ul>
    </nav>
  );
}
