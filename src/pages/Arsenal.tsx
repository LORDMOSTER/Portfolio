import React, { useState, useEffect } from 'react';
import { Mic, Map, Coffee, MessageSquare, Brain, Terminal, Smile, Gamepad2, Palette, Music } from 'lucide-react';
import './Arsenal.css';

/* ─── Mathematical Reactor Core ──────────────────────────────────────
   Physics: 4 rings tilted in 3D space, projected to 2D via parametric
   equations. Each particle's (x,y) is computed every frame using:
     x = cx + a·cos(θ)·cos(φ) − b·sin(θ)·sin(φ)
     y = cy + a·cos(θ)·sin(φ) + b·sin(θ)·cos(φ)
   where a,b = semi-axes (b = a·cos(inclination)), φ = in-plane angle
────────────────────────────────────────────────────────────────────── */
const ReactorCore: React.FC = () => {
  const [t, setT] = useState(0);

  useEffect(() => {
    let id: number;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      setT((ts - t0) / 1000);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const cx = 150, cy = 150, PI = Math.PI;

  // point on rotated ellipse (semi-axes a,b rotated phi in-plane, at angle theta)
  const pt = (a: number, b: number, phi: number, theta: number) => ({
    x: cx + a * Math.cos(theta) * Math.cos(phi) - b * Math.sin(theta) * Math.sin(phi),
    y: cy + a * Math.cos(theta) * Math.sin(phi) + b * Math.sin(theta) * Math.cos(phi),
  });

  // 4 orbital rings: inclination => b = a * cos(inc)
  const rings = [
    { a: 118, inc: 0,  phi: 0,       omP: 0.18,  omR: 0.04,  n: 3, color: '#D4AF37', sw: 1.5, dash: '' },
    { a: 105, inc: 62, phi: 0,       omP: -0.45, omR: 0,     n: 2, color: '#D4AF37', sw: 1,   dash: '10 8' },
    { a: 105, inc: 62, phi: PI / 2,  omP: 0.40,  omR: 0,     n: 2, color: '#7A6835', sw: 1,   dash: '10 8' },
    { a: 80,  inc: 50, phi: PI / 4,  omP: -0.65, omR: 0.07,  n: 1, color: '#D4AF37', sw: 1,   dash: '6 9' },
  ];

  // outer 12-gon vertices (static reference frame)
  const dodecagon = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 - 90) * PI / 180;
    return `${cx + 136 * Math.cos(a)},${cy + 136 * Math.sin(a)}`;
  }).join(' ');

  // rotating core diamond
  const dAngle = t * 20 * PI / 180;
  const diamond = [0, 90, 180, 270].map(d => {
    const a = (d * PI / 180) + dAngle;
    return `${cx + 28 * Math.cos(a)},${cy + 28 * Math.sin(a)}`;
  }).join(' ');

  // core pulse
  const pulse = 7 + 2 * Math.sin(t * PI * 1.4);

  return (
    <svg viewBox="0 0 300 300" style={{ width: '100%', height: 'auto', maxWidth: '340px', display: 'block' }} fill="none">
      {/* Reference dodecagon */}
      <polygon points={dodecagon} stroke="#1E1E1E" strokeWidth="1" />
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
        const a = (i * 30 - 90) * PI / 180;
        const r1 = 136, r2 = 128;
        return <line key={i}
          x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
          x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)}
          stroke="#D4AF37" strokeWidth="1.5" opacity="0.5" />;
      })}

      {/* Orbital rings + particles */}
      {rings.map((r, ri) => {
        const b = r.a * Math.cos(r.inc * PI / 180);
        const phi = r.phi + t * r.omR; // ring itself slowly rotates in-plane
        const phiDeg = phi * 180 / PI;
        const particles = Array.from({ length: r.n }, (_, i) => {
          const theta = t * r.omP * 2 * PI + (i * 2 * PI / r.n);
          return pt(r.a, b, phi, theta);
        });
        return (
          <g key={ri}>
            <ellipse cx={cx} cy={cy} rx={r.a} ry={Math.max(b, 1)}
              stroke={r.color} strokeWidth={r.sw} opacity={0.65}
              strokeDasharray={r.dash || undefined}
              transform={`rotate(${phiDeg}, ${cx}, ${cy})`} />
            {particles.map((p, pi) => (
              <g key={pi}>
                <circle cx={p.x} cy={p.y} r="6" fill={r.color} opacity="0.12" />
                <circle cx={p.x} cy={p.y} r="3.5" fill={r.color} opacity="0.95" />
              </g>
            ))}
          </g>
        );
      })}

      {/* Inner chamber wall */}
      <circle cx={cx} cy={cy} r="44" stroke="#111" strokeWidth="10" />
      <circle cx={cx} cy={cy} r="44" stroke="#D4AF37" strokeWidth="1" opacity="0.35" />

      {/* Rotating diamond core */}
      <polygon points={diamond}
        stroke="#D4AF37" strokeWidth="1.5"
        fill="#D4AF37" fillOpacity="0.12" />

      {/* Pulsing center */}
      <circle cx={cx} cy={cy} r={pulse + 4} fill="#D4AF37" opacity="0.1" />
      <circle cx={cx} cy={cy} r={pulse} fill="#D4AF37" opacity="0.85" />
      <circle cx={cx} cy={cy} r="3" fill="#fff" opacity="0.95" />
    </svg>
  );
};
// alias so JSX below still works
const SystemCore = ReactorCore;

/* ─── Main Component ────────────────────────────────────────────────── */
const Arsenal: React.FC = () => {
  const tier1Projects = [
    {
      id: 10,
      title: "AI-Receptionist (Voice Agent)",
      icon: Mic,
      tech: ["WebRTC", "LiveKit", "Sub-Second Latency", "Python", "SIP"],
      description: "Engineered a sub-second, direct speech-to-speech voice agent bypassing standard STT-LLM-TTS latency. Implemented LiveKit for SIP trunk integration and Twilio routing, achieving human-like conversational fluidity with OpenAI's Realtime API.",
      github: "https://github.com/LORDMOSTER/AI-Receptionist"
    },
    {
      id: 9,
      title: "Krishi-Route (Logistics Engine)",
      icon: Map,
      tech: ["Geospatial Indexing", "MERN", "Leaflet.js", "Optimization"],
      description: "High-performance geospatial routing engine for agricultural supply chains. Leveraged MongoDB 2dsphere indexes and custom Haversine distance algorithms to dynamically pool transport cargo, cutting farmer logistics costs by up to 40%.",
      github: "https://github.com/LORDMOSTER/Krishi-Route"
    },
    {
      id: 8,
      title: "Campus Canteen (Real-Time POS)",
      icon: Coffee,
      tech: ["WebSockets", "Node.js", "SQLite", "Real-Time Sync"],
      description: "Dual-sided real-time ordering and POS system. Architected a Node.js/Express backend utilizing Socket.io for millisecond-latency order syncing, integrated with Razorpay, and augmented by a custom multilingual AI business advisor.",
      github: "https://github.com/LORDMOSTER/Campus-Canteen"
    },
    {
      id: 7,
      title: "MindX (Local RAG Pipeline)",
      icon: Brain,
      tech: ["RAG Pipeline", "ChromaDB", "FastAPI", "Local LLM"],
      description: "Privacy-first document analysis engine utilizing Retrieval-Augmented Generation (RAG). Built a local vector search pipeline using ChromaDB, LangChain, and Ollama to process PDFs and query data without external API calls.",
      github: "https://github.com/LORDMOSTER/MindX"
    },
    {
      id: 6,
      title: "Chat-Space (P2P Communications)",
      icon: MessageSquare,
      tech: ["FastAPI", "WebRTC", "Socket.IO", "SQLAlchemy"],
      description: "Scalable peer-to-peer communication backend featuring WebRTC SDP negotiation for video calling and JWT-secured Socket.IO rooms for real-time text threads.",
      github: "https://github.com/LORDMOSTER/Chat-Space"
    }
  ];

  const tier2Projects = [
    {
      id: 5,
      title: "MiraX",
      icon: Terminal,
      tech: ["Batch Scripting", "OS Simulation"],
      description: "Complete OS shell environment engineered entirely in Batch scripting, featuring custom user authentication, a Caesar cipher encryption module, and memory state tracking.",
      github: "https://github.com/LORDMOSTER/MiraX-"
    },
    {
      id: 4,
      title: "Coloré",
      icon: Palette,
      tech: ["Streamlit", "Euclidean Math", "Image Processing"],
      description: "Sub-100ms pixel-level color extraction tool utilizing Euclidean distance algorithms across a mapped vector space to identify specific color signatures.",
      github: "https://github.com/LORDMOSTER/Color-Detection"
    },
    {
      id: 3,
      title: "SentimentAnalyser",
      icon: Smile,
      tech: ["NLP", "PyTorch", "LSTM"],
      description: "NLP pipeline utilizing a bidirectional LSTM and Hugging Face transformer models to conduct real-time binary sentiment classification.",
      github: "https://github.com/LORDMOSTER/SentimentAnalyser"
    },
    {
      id: 2,
      title: "Viso Vibe",
      icon: Music,
      tech: ["Streamlit", "DeepFace", "Spotify API"],
      description: "AI-powered web application that bridges human emotion and music. Utilizes DeepFace for facial expression analysis to categorize moods and dynamically syncs Spotify playback with curated playlists.",
      github: "https://github.com/LORDMOSTER/Viso-Vibe"
    },
    {
      id: 1,
      title: "Gestodrive",
      icon: Gamepad2,
      tech: ["OpenCV", "MediaPipe", "Computer Vision"],
      description: "Low-latency human-computer interface tracking 11+ hand keypoints via MediaPipe and OpenCV to translate physical gestures into digital keystrokes.",
      github: "https://github.com/LORDMOSTER/Gestodrive"
    }
  ];

  return (
    <div className="arsenal-page">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="arsenal-hero">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h1 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">
            &gt;&gt; PROJECT_ARSENAL
          </h1>
          <p className="mono-text" style={{ color: '#EAEAEA', fontWeight: 700, fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
            ENGINEERED SYSTEMS
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <span className="mono-text" style={{ border: '1px solid #D4AF37', color: '#D4AF37', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', background: 'rgba(212,175,55,0.08)', borderRadius: '2px' }}>
              [ LIVE DEPLOYMENTS ]
            </span>
            <span className="mono-text" style={{ color: '#888', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
              // FULL-STACK &amp; AI
            </span>
          </div>
          <p className="hero-description">
            A collection of software I have built to solve real-world problems. From sub-second voice AI agents to logistics platforms for farmers, these projects showcase my focus on writing clean code, building scalable backends, and designing fast, user-friendly experiences.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SystemCore />
        </div>
      </div>

      {/* ── Grid Layout ─────────────────────────────────────────── */}
      <div className="tier-section">
        <h2 className="tier-header mb-8 text-2xl font-bold text-[#D4AF37] font-mono tracking-wider">&gt;&gt; TIER_1: CORE_SYSTEMS</h2>
        <div className="tier1-grid grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0 w-full mb-16">
          {tier1Projects.map(project => {
            const Icon = project.icon;
            return (
              <div key={project.id} className="premium-card bg-[#121212]/50 border border-white/10 p-5 md:p-6 rounded-xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col arsenal-grid-card">
                <div className="arsenal-card-title-group flex items-center mb-2 gap-3">
                  <Icon className="project-icon text-[#D4AF37]" size={24} />
                  <h3 className="arsenal-card-title text-white font-bold text-xl">{project.title}</h3>
                </div>
                <p className="arsenal-card-desc text-[#A0A0A0] text-sm mb-6 flex-grow">{project.description}</p>
                <div className="arsenal-card-tags flex flex-wrap gap-2 mt-3 mb-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="arsenal-card-tag text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded border border-[#D4AF37]/20">[{t}]</span>
                  ))}
                </div>
                <div className="arsenal-card-links flex flex-wrap gap-4 text-xs mt-4">
                  <a href={project.github} target="_blank" rel="noreferrer" className="arsenal-card-link font-mono text-xs hover:text-[#D4AF37] transition-colors">[ GitHub ]</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="tier-section">
        <h2 className="tier-header mb-8 text-2xl font-bold text-[#D4AF37] font-mono tracking-wider">&gt;&gt; TIER_2: UTILITIES &amp; SCRIPTS</h2>
        <div className="tier2-grid grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0 w-full">
          {tier2Projects.map(project => {
            const Icon = project.icon;
            return (
              <div key={project.id} className="premium-card bg-[#121212]/50 border border-white/10 p-5 md:p-6 rounded-xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col arsenal-grid-card">
                <div className="arsenal-card-title-group flex items-center mb-2 gap-3">
                  <Icon className="project-icon text-[#D4AF37]" size={20} />
                  <h3 className="arsenal-card-title text-white font-bold text-xl">{project.title}</h3>
                </div>
                <p className="arsenal-card-desc text-[#A0A0A0] text-sm mb-6 flex-grow">{project.description}</p>
                <div className="arsenal-card-tags flex flex-wrap gap-2 mt-3 mb-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="arsenal-card-tag text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded border border-[#D4AF37]/20">[{t}]</span>
                  ))}
                </div>
                <div className="arsenal-card-links flex flex-wrap gap-4 text-xs mt-4">
                  <a href={project.github} target="_blank" rel="noreferrer" className="arsenal-card-link font-mono text-xs hover:text-[#D4AF37] transition-colors">[ GitHub ]</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Arsenal;
