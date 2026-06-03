import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Terminal, Cpu, Database, Cloud, Briefcase, FileCode, BookOpen, FileText } from 'lucide-react';
import heroImage from '../../Image/hero.jpg';
import CorePhilosophy from '../components/CorePhilosophy';
import LiveTelemetry from '../components/LiveTelemetry';
import WorkExperience from '../components/WorkExperience';
import './Home.css';

// Spotlight helper — call on any card div to track cursor
const spotHandlers = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
  el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
};
const spotLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.setProperty('--spot-x', '-999px');
  e.currentTarget.style.setProperty('--spot-y', '-999px');
};


const LiquidGauge = ({ fillValue, displayLabel, label, subLabel }: { fillValue: number, displayLabel: string, label: string, subLabel: string }) => {
  return (
    <div className="liquid-gauge-item min-w-0">
      {/* ring wrapper provides the double gold halo */}
      <div className="liquid-orb-ring">
        <div className="liquid-orb">
          <div className="liquid-fill" style={{ top: `${100 - fillValue}%` }}>
            <div className="liquid-wave" />
            <div className="liquid-wave-back" />
          </div>
          {/* glare highlight */}
          <div className="liquid-glare" />
          {/* percentage label */}
          <div className="liquid-label-pct">{displayLabel}</div>
        </div>
      </div>
      <div className="liquid-gauge-info">
        <span className="liquid-gauge-name">{label}</span>
        <span className="liquid-gauge-sub">{subLabel}</span>
      </div>
    </div>
  );
};

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
    <div className="home-container px-4 md:px-8 overflow-x-hidden w-full">
      {/* 1. LANDING HERO & AVATAR COMPONENT */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="status-badge mono-text">
            <span className="pulse-dot"></span> SYSTEM ONLINE
          </div>
          <h1 className="hero-title text-3xl md:text-5xl">
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

          <div className="hero-actions flex flex-wrap gap-3">
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
            <a href="https://drive.google.com/file/d/1yX403sYRQMWXH0QZ89Ku_3R2HKL0mosW/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <FileText size={16} />
              <span className="mono-text">Resume</span>
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
          <div className="card identity-card premium-card"
            onMouseMove={e => { const el = e.currentTarget; const r = el.getBoundingClientRect(); el.style.setProperty('--spot-x', `${e.clientX - r.left}px`); el.style.setProperty('--spot-y', `${e.clientY - r.top}px`); }}
            onMouseLeave={e => { e.currentTarget.style.setProperty('--spot-x', '-999px'); e.currentTarget.style.setProperty('--spot-y', '-999px'); }}
          >
            <h3 className="card-title mono-text">What I Build</h3>
            <p className="identity-text">
              Targeting high-scale, real-time architectures. Focused on reducing query latency and optimizing multi-user processing pipelines.
            </p>
          </div>

          <div className="card baseline-card premium-card"
            style={{ backgroundColor: 'rgba(18, 18, 18, 0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
            onMouseMove={e => { const el = e.currentTarget; const r = el.getBoundingClientRect(); el.style.setProperty('--spot-x', `${e.clientX - r.left}px`); el.style.setProperty('--spot-y', `${e.clientY - r.top}px`); }}
            onMouseLeave={e => { e.currentTarget.style.setProperty('--spot-x', '-999px'); e.currentTarget.style.setProperty('--spot-y', '-999px'); }}
          >
            <h3 className="card-title mono-text mb-6">Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Degree</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>B.E. CSE</span>
                </div>
                <div>
                  <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Batch</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>2023 - 2027</span>
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Institution</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>Nandha College of Technology</span>
              </div>

              {/* Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>CGPA</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>7.8</span>
                </div>
                <div>
                  <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Arrears</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="arsenal-module">
          <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">&gt;&gt; TECH_ARSENAL</h3>
          <div className="arsenal-container card premium-card">
            <div className="arsenal-tabs flex overflow-x-auto whitespace-nowrap scrollbar-hide w-full">
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
                className="skills-grid flex flex-wrap gap-3 justify-start"
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

        <div className="languages-section">
          <h2 className="languages-header">&gt;&gt; LANGUAGES</h2>
          <div className="liquid-gauges-row w-full flex flex-wrap">
            <LiquidGauge
              fillValue={55}
              displayLabel="75%"
              label="English"
              subLabel="Professional Working Proficiency"
            />
            <LiquidGauge
              fillValue={70}
              displayLabel="90%"
              label="Tamil (Native)"
              subLabel="Full Duplex — Verbal & Written"
            />
          </div>
        </div>

        {/* >> SOFT SKILLS */}
        <div className="soft-skills-section">
          <h2 className="soft-skills-header">&gt;&gt; SOFT SKILLS</h2>
          <div className="soft-skills-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <div className="skill-float-card premium-card p-4 md:p-6" onMouseMove={spotHandlers} onMouseLeave={spotLeave}>
              <h3 className="skill-float-title">Problem Solving</h3>
              <p className="skill-float-desc">Independent block-unblocking and deep documentation parsing.</p>
            </div>
            <div className="skill-float-card premium-card p-4 md:p-6">
              <h3 className="skill-float-title">Technical Leadership</h3>
              <p className="skill-float-desc">Experience driving team deployments and cloud architecture.</p>
            </div>
            <div className="skill-float-card premium-card p-4 md:p-6">
              <h3 className="skill-float-title">Clean Architecture</h3>
              <p className="skill-float-desc">Strict adherence to modularity, scalability, and DRY principles.</p>
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
