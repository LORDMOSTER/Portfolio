import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Terminal, Cpu, Database, Cloud, Briefcase, FileCode, BookOpen } from 'lucide-react';
import heroImage from '../../Image/hero.jpg';
import CorePhilosophy from '../components/CorePhilosophy';
import LiveTelemetry from '../components/LiveTelemetry';
import WorkExperience from '../components/WorkExperience';
import './Home.css';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('languages');

  const arsenalData = {
    languages: {
      icon: <Terminal size={18} />,
      title: 'Languages',
      items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL']
    },
    frontend: {
      icon: <ExternalLink size={18} />,
      title: 'Frontend',
      items: ['React.js', 'HTML5', 'CSS3', 'Material UI']
    },
    backend: {
      icon: <Cpu size={18} />,
      title: 'Backend',
      items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets (Socket.io)']
    },
    databases: {
      icon: <Database size={18} />,
      title: 'Databases',
      items: ['MongoDB', 'MySQL', 'SQLite']
    },
    cloud: {
      icon: <Cloud size={18} />,
      title: 'Cloud & Tools',
      items: ['Google Cloud Platform (GCP)', 'Firebase', 'Git', 'GitHub', 'Vercel', 'LiveKit']
    }
  };

  return (
    <div className="home-container">
      {/* 1. LANDING HERO & AVATAR COMPONENT */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="status-badge mono-text">
            <span className="pulse-dot"></span> SYSTEM ONLINE
          </div>
          <h1 className="hero-title">
            SRIHARI <span className="gold-text">P V</span>
          </h1>
          <p className="hero-subtitle">
            <span className="mono-text">//</span> Full-Stack & Backend Systems Developer
          </p>

          <motion.div 
            className="typing-summary text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="mono-text typing-text">
              "Hey, I'm Srihari. A final-year CS student who loves turning caffeine into low-latency backend architectures and pixel-perfect user interfaces. Always building, always learning."
            </span>
            <span className="cursor-blink">|</span>
          </motion.div>

          <div className="hero-actions">
            <a href="https://github.com/LORDMOSTER" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <Code size={16} />
              <span className="mono-text">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/srihari-p-v-bb8560341/" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <Briefcase size={16} />
              <span className="mono-text">LinkedIn</span>
            </a>
            <a href="https://leetcode.com/u/SRIHARIPV/" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <FileCode size={16} />
              <span className="mono-text">LeetCode</span>
            </a>
            <a href="https://dev.to/srihari_pv_36ab3b53fa27e" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <BookOpen size={16} />
              <span className="mono-text">Dev.to</span>
            </a>
          </div>
        </div>
        
        <div className="hero-avatar">
          <div className="avatar-container">
            <svg className="avatar-track" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-gold)" />
                  <stop offset="100%" stopColor="var(--accent-gold-dark)" />
                </linearGradient>
              </defs>
              <circle 
                className="track-base"
                cx="100" cy="100" r="96" 
                fill="none" stroke="var(--border-color)" strokeWidth="2"
              />
              <circle 
                className="track-moving"
                cx="100" cy="100" r="96" 
                fill="none" stroke="url(#goldGradient)" strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="150 450"
              />
              <circle 
                className="track-moving-secondary"
                cx="100" cy="100" r="88" 
                fill="none" stroke="var(--accent-gold)" strokeWidth="1"
                strokeDasharray="50 300"
              />
            </svg>
            <div className="avatar-image">
              <img src={heroImage} alt="Srihari P V" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE IDENTITY LAYER & CORE SKILLS */}
      <section className="identity-section">
        <div className="section-header">
          <h2 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">// ENGINEER_PROFILE</h2>
          <div className="header-line"></div>
        </div>
        
        <div className="telemetry-dashboard">
          <div className="card identity-card">
            <h3 className="card-title mono-text">What I Build</h3>
            <p className="identity-text">
              Targeting high-scale, real-time architectures. Focused on reducing query latency and optimizing multi-user processing pipelines.
            </p>
          </div>
          
          <div className="card baseline-card">
            <h3 className="card-title mono-text">Education</h3>
            <div className="baseline-stats">
              <div className="stat-item">
                <span className="stat-label">Degree</span>
                <span className="stat-value">B.E. CSE</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Institution</span>
                <span className="stat-value">Nandha College of Technology</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">GPA</span>
                <span className="stat-value">7.8</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Arrears</span>
                <span className="stat-value">0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="arsenal-module">
          <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">&gt;&gt; TECH_ARSENAL</h3>
          <div className="arsenal-container card">
            <div className="arsenal-tabs">
              {Object.entries(arsenalData).map(([key, data]) => (
                <button
                  key={key}
                  className={`tab-btn mono-text ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {data.icon}
                  {data.title}
                </button>
              ))}
            </div>
            
            <div className="arsenal-content">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="skills-grid"
              >
                {arsenalData[activeTab as keyof typeof arsenalData].items.map((item, idx) => (
                  <div key={idx} className="skill-node">
                    <span className="node-bracket">[</span>
                    <span className="skill-name">{item}</span>
                    <span className="node-bracket">]</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Inject Work Experience under Tech Arsenal */}
        <WorkExperience />

        {/* Inject Live Telemetry */}
        <LiveTelemetry />

        {/* Inject Core Philosophy */}
        <CorePhilosophy />
      </section>
    </div>
  );
};

export default Home;
