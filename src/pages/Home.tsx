import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Terminal, Cpu, Database, Cloud, Briefcase, FileCode, BookOpen, FileText } from 'lucide-react';
import heroImage from '../../Image/GIT.png';
import CorePhilosophy from '../components/CorePhilosophy';
import LiveTelemetry from '../components/LiveTelemetry';
import WorkExperience from '../components/WorkExperience';
import KineticRibbon from '../components/KineticRibbon';
import './Home.css';

/* Touch device detection — evaluated once at module level for performance */
const IS_TOUCH = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/* ─────────────────────────────────────────────────────────────────
   SPOTLIGHT HANDLERS (chromatic aberration)
───────────────────────────────────────────────────────────────── */
const spotHandlers = IS_TOUCH
  ? {}
  : {
      onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
        el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
        el.style.setProperty('--mouse-x', `${(e.clientX - r.left) / r.width}`);
      },
      onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.setProperty('--spot-x', '-999px');
        e.currentTarget.style.setProperty('--spot-y', '-999px');
      },
    };

/* ─────────────────────────────────────────────────────────────────
   GHOST HINT — triggers the command terminal via custom event
───────────────────────────────────────────────────────────────── */
const GhostHint: React.FC = () => {
  const fireTerminal = () => {
    window.dispatchEvent(new CustomEvent('terminal:open'));
  };

  return (
    <button
      className="ghost-hint mono-text"
      onClick={fireTerminal}
      title="Open Command Terminal"
      aria-label="Open command terminal"
    >
      <span className="ghost-hint-key">[ Ctrl ]</span>
      <span className="ghost-hint-sep">+</span>
      <span className="ghost-hint-key">[ K ]</span>
      <span className="ghost-hint-label">TO OVERRIDE SYSTEM</span>
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────────
   ELIXIR FLASK — CoC Elixir Storage × Dark Souls Estus Flask
   Animated canvas: cork, neck, round body, bubbling gold liquid.
───────────────────────────────────────────────────────────────── */

// Flask geometry (canvas 90 × 175)
const FW = 90, FH = 175;
// Cork
const CK = { x: 27, y: 3, w: 36, h: 13 };
// Neck
const NK = { x: 32, y: CK.y + CK.h, w: 26, h: 33 };
// Body
const BD = { x: 7, y: NK.y + NK.h - 1, w: 76, h: 108, r: 17 };

function arcTo4(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y,     x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x,     y + h, r);
  ctx.arcTo(x,     y + h, x,     y,     r);
  ctx.arcTo(x,     y,     x + w, y,     r);
  ctx.closePath();
}

// Full flask silhouette (neck + body as one shape)
function flaskPath(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(NK.x, NK.y);
  ctx.lineTo(NK.x + NK.w, NK.y);
  ctx.lineTo(NK.x + NK.w, NK.y + NK.h);
  // Right shoulder
  ctx.bezierCurveTo(
    NK.x + NK.w + 6, NK.y + NK.h + 8,
    BD.x + BD.w,     BD.y - 6,
    BD.x + BD.w,     BD.y,
  );
  // Body right → bottom-right → bottom → bottom-left → body left
  ctx.lineTo(BD.x + BD.w, BD.y + BD.h - BD.r);
  ctx.arcTo(BD.x + BD.w, BD.y + BD.h, BD.x + BD.w - BD.r, BD.y + BD.h, BD.r);
  ctx.lineTo(BD.x + BD.r, BD.y + BD.h);
  ctx.arcTo(BD.x, BD.y + BD.h, BD.x, BD.y + BD.h - BD.r, BD.r);
  ctx.lineTo(BD.x, BD.y);
  // Left shoulder
  ctx.bezierCurveTo(
    BD.x, BD.y - 6,
    NK.x - 6, NK.y + NK.h + 8,
    NK.x, NK.y + NK.h,
  );
  ctx.closePath();
}

interface FBubble { x: number; y: number; r: number; spd: number; a: number }

const FlaskCanvas: React.FC<{ fillValue: number; displayLabel: string }> = ({
  fillValue, displayLabel,
}) => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const bubblesRef  = useRef<FBubble[]>([]);

  useEffect(() => {
    const bdBot = BD.y + BD.h;
    const bubbleCount = IS_TOUCH ? 6 : 12;
    bubblesRef.current = Array.from({ length: bubbleCount }, () => ({
      x:   BD.x + 10 + Math.random() * (BD.w - 20),
      y:   bdBot - 4 - Math.random() * (BD.h * 0.7),
      r:   1.0 + Math.random() * 2.0,
      spd: 0.22 + Math.random() * 0.30,
      a:   0.20 + Math.random() * 0.40,
    }));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, FW, FH);
      const isLight = document.body.classList.contains('light-mode');
      const bdBot   = BD.y + BD.h;

      /* ── Glass body ── */
      flaskPath(ctx);
      ctx.fillStyle = isLight ? 'rgba(240,234,212,0.9)' : 'rgba(10,7,1,0.95)';
      ctx.fill();

      /* ── Liquid (clipped inside flask) ── */
      ctx.save();
      flaskPath(ctx);
      ctx.clip();

      // Volume-to-Height mapping: Flasks are wide at bottom, narrow at neck.
      // Higher percentages rise disproportionately high in the narrow neck.
      let visualPct = Math.pow(fillValue / 100, 1.8) * 1.2;
      visualPct = Math.min(visualPct, 0.90); // Cap slightly lower in the neck

      const innerTop = NK.y + 2;          // just below cork cap
      const innerBot = bdBot - 5;         // just above body base
      const innerH   = innerBot - innerTop;
      const surfY    = innerBot - visualPct * innerH;

      // Catmull-Rom wave surface — spans full canvas width (clipped by flask shape)
      const N = 60;
      const pts: [number, number][] = [];
      for (let i = 0; i <= N; i++) {
        const nx = i / N;
        const x  = nx * FW;     // full canvas width so neck clips correctly
        const wy =
          Math.sin(nx * Math.PI * 2.5 + t * 0.85) * 3.0 +
          Math.sin(nx * Math.PI * 5.1 + t * 0.60) * 1.6 +
          Math.sin(nx * Math.PI * 1.3 + t * 1.15) * 2.2;
        pts.push([x, surfY + wy]);
      }

      ctx.beginPath();
      ctx.moveTo(-2, bdBot + 4);                   // full-width bottom-left
      ctx.lineTo(pts[0][0], pts[0][1]);
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(pts.length - 1, i + 2)];
        ctx.bezierCurveTo(
          p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
          p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6,
          p2[0], p2[1],
        );
      }
      ctx.lineTo(FW + 2, bdBot + 4);               // full-width bottom-right
      ctx.closePath();

      const liq = ctx.createLinearGradient(0, surfY, 0, bdBot);
      if (isLight) {
        liq.addColorStop(0,   'rgba(210,175,44,0.93)');
        liq.addColorStop(0.3, 'rgba(184,134,11,0.98)');
        liq.addColorStop(0.7, 'rgba(148,105,8,1)');
        liq.addColorStop(1,   'rgba(90,60,4,1)');
      } else {
        liq.addColorStop(0,   'rgba(232,202,74,0.97)');
        liq.addColorStop(0.26,'rgba(212,175,55,1)');
        liq.addColorStop(0.60,'rgba(172,135,25,1)');
        liq.addColorStop(1,   'rgba(108,80,10,1)');
      }
      ctx.fillStyle = liq;
      ctx.fill();

      // Surface shimmer
      ctx.save();
      ctx.globalAlpha = 0.20;
      const sh = ctx.createLinearGradient(0, surfY - 5, 0, surfY + 12);
      sh.addColorStop(0,   'rgba(255,242,100,0)');
      sh.addColorStop(0.5, 'rgba(255,242,100,1)');
      sh.addColorStop(1,   'rgba(255,242,100,0)');
      ctx.fillStyle = sh;
      ctx.fill();
      ctx.restore();

      // Bubbles
      bubblesRef.current.forEach(b => {
        if (b.y > surfY + b.r * 2) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          // Tiny white highlight inside bubble
          const bg = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, 0, b.x, b.y, b.r);
          bg.addColorStop(0, `rgba(255,252,200,${b.a + 0.2})`);
          bg.addColorStop(1, `rgba(255,230,80,${b.a * 0.4})`);
          ctx.fillStyle = bg;
          ctx.fill();
          ctx.restore();
          b.y -= b.spd;
        } else {
          b.x   = BD.x + 12 + Math.random() * (BD.w - 24);
          b.y   = innerBot - Math.random() * 6;
          b.spd = 0.22 + Math.random() * 0.30;
          b.a   = 0.20 + Math.random() * 0.40;
        }
      });

      ctx.restore(); // end liquid clip

      /* ── Flask outline stroke ── */
      flaskPath(ctx);
      ctx.strokeStyle = isLight ? 'rgba(184,134,11,0.70)' : 'rgba(212,175,55,0.60)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      /* ── Glass highlights ── */
      ctx.save();
      ctx.globalAlpha = isLight ? 0.22 : 0.26;
      ctx.fillStyle   = '#fff';
      // Body left-edge gleam
      ctx.beginPath();
      ctx.ellipse(BD.x + 11, BD.y + BD.h * 0.32, 3.5, BD.h * 0.24, -0.15, 0, Math.PI * 2);
      ctx.fill();
      // Neck gleam
      ctx.fillRect(NK.x + 2, NK.y + 3, 5, NK.h - 6);
      ctx.restore();

      /* ── Cork ── */
      ctx.save();
      // Cork body
      ctx.fillStyle = isLight ? '#7B5512' : '#5C3F0A';
      ctx.beginPath();
      arcTo4(ctx, CK.x, CK.y + 5, CK.w, CK.h - 5, 2);
      ctx.fill();
      // Cork cap
      ctx.fillStyle = isLight ? '#9A6E1A' : '#7A5510';
      ctx.beginPath();
      arcTo4(ctx, CK.x + 3, CK.y, CK.w - 6, CK.h * 0.5 + 2, 3);
      ctx.fill();
      // Cork grain lines
      ctx.strokeStyle = isLight ? 'rgba(90,58,5,0.45)' : 'rgba(60,38,3,0.45)';
      ctx.lineWidth = 0.7;
      for (let k = 1; k < 3; k++) {
        ctx.beginPath();
        ctx.moveTo(CK.x + 2, CK.y + 5 + (CK.h - 5) * (k / 3));
        ctx.lineTo(CK.x + CK.w - 2, CK.y + 5 + (CK.h - 5) * (k / 3));
        ctx.stroke();
      }
      ctx.restore();

      /* ── % label in body centre ── */
      ctx.save();
      ctx.font         = '700 16px "Fira Code", monospace';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor  = isLight ? 'rgba(120,84,4,0.95)' : 'rgba(212,175,55,1)';
      ctx.shadowBlur   = 12;
      ctx.fillStyle    = '#fff';
      ctx.fillText(displayLabel, FW / 2, BD.y + BD.h * 0.52);
      ctx.restore();

      t += 0.016;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [fillValue, displayLabel]); // eslint-disable-line

  return (
    <canvas
      ref={canvasRef}
      width={IS_TOUCH ? FW * 0.5 : FW}
      height={IS_TOUCH ? FH * 0.5 : FH}
      style={{
        display: 'block',
        width: IS_TOUCH ? `${FW * 0.5}px` : `${FW}px`,
        height: IS_TOUCH ? `${FH * 0.5}px` : `${FH}px`,
        filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.45)) drop-shadow(0 0 4px rgba(212,175,55,0.3))'
      }}
    />
  );
};

/* ─────────────────────────────────────────────────────────────────
   LIQUID GAUGE — elixir flask wrapper (no drag)
───────────────────────────────────────────────────────────────── */
const LiquidGauge = ({
  fillValue,
  displayLabel,
  label,
  subLabel,
}: {
  fillValue: number;
  displayLabel: string;
  label: string;
  subLabel: string;
}) => (
  <div className="liquid-gauge-item min-w-0">
    <div className="flask-vial-wrap">
      <FlaskCanvas fillValue={fillValue} displayLabel={displayLabel} />
    </div>
    <div className="liquid-gauge-info">
      <span className="liquid-gauge-name">{label}</span>
      <span className="liquid-gauge-sub">{subLabel}</span>
    </div>
  </div>
);



/* ─────────────────────────────────────────────────────────────────
   MAGNETIC SKILL TAG — draggable with spring snap-back
───────────────────────────────────────────────────────────────── */
const MagneticSkillTag: React.FC<{ item: string; idx: number }> = ({ item, idx }) => (
  <motion.div
    className="skill-node"
    drag={IS_TOUCH ? false : true}
    dragSnapToOrigin
    dragElastic={0.18}
    dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
    whileDrag={IS_TOUCH ? undefined : { scale: 1.12, zIndex: 50, cursor: 'grabbing' }}
    whileTap={{ scale: 0.95 }}
    style={{ cursor: IS_TOUCH ? 'default' : 'grab', touchAction: IS_TOUCH ? 'auto' : 'none', position: 'relative', zIndex: idx }}
  >
    <span className="node-bracket">[</span>
    <span className="skill-name">{item}</span>
    <span className="node-bracket">]</span>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────────── */
const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('languages');

  const arsenalData = {
    languages: {
      icon: <Terminal size={18} />,
      title: 'Languages',
      items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
    },
    frontend: {
      icon: <ExternalLink size={18} />,
      title: 'Frontend',
      items: ['React.js', 'HTML5', 'CSS3', 'Material UI'],
    },
    backend: {
      icon: <Cpu size={18} />,
      title: 'Backend',
      items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets (Socket.io)'],
    },
    databases: {
      icon: <Database size={18} />,
      title: 'Databases',
      items: ['MongoDB', 'MySQL', 'SQLite'],
    },
    cloud: {
      icon: <Cloud size={18} />,
      title: 'Cloud & Tools',
      items: ['Google Cloud Platform (GCP)', 'Firebase', 'Git', 'GitHub', 'Vercel', 'LiveKit'],
    },
  };

  return (
    <div className="home-container px-4 md:px-8 overflow-x-hidden w-full">

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="status-badge mono-text">
            <span className="pulse-dot" /> SYSTEM ONLINE
          </div>

          {/* ② GHOST HINT — immediately below the badge */}
          <GhostHint />

          <h1 className="hero-title text-3xl md:text-5xl">
            SRIHARI <span className="gold-text">P V</span>
          </h1>
          <p className="hero-subtitle">
            <span className="mono-text">//</span> Full-Stack &amp; Backend Systems Developer
          </p>

          <motion.div
            className="typing-summary text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="mono-text typing-text">
              "Hey, I'm Srihari. A final-year CS student who loves turning caffeine into
              low-latency backend architectures and pixel-perfect user interfaces.
              Always building, always learning."
            </span>
            <span className="cursor-blink">|</span>
          </motion.div>

          <div className="hero-actions flex flex-wrap gap-3">
            <a href="https://github.com/LORDMOSTER" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <Code size={16} /><span className="mono-text">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/srihari-p-v-bb8560341/" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <Briefcase size={16} /><span className="mono-text">LinkedIn</span>
            </a>
            <a href="https://leetcode.com/u/SRIHARIPV/" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <FileCode size={16} /><span className="mono-text">LeetCode</span>
            </a>
            <a href="https://dev.to/srihari_pv_36ab3b53fa27e" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <BookOpen size={16} /><span className="mono-text">Dev.to</span>
            </a>
            <a href="https://drive.google.com/file/d/1yX403sYRQMWXH0QZ89Ku_3R2HKL0mosW/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="pill-btn">
              <FileText size={16} /><span className="mono-text">Resume</span>
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
              <circle className="track-base" cx="100" cy="100" r="96" fill="none" stroke="var(--border-color)" strokeWidth="2" />
              <circle className="track-moving" cx="100" cy="100" r="96" fill="none" stroke="url(#goldGradient)" strokeWidth="4" strokeLinecap="round" strokeDasharray="150 450" />
              <circle className="track-moving-secondary" cx="100" cy="100" r="88" fill="none" stroke="var(--accent-gold)" strokeWidth="1" strokeDasharray="50 300" />
            </svg>
            <div className="avatar-image">
              <img src={heroImage} alt="Srihari P V" />
            </div>
          </div>
        </div>
      </section>

      {/* ── KINETIC RIBBON DIVIDER ────────────────────────── */}
      <div className="kinetic-ribbon-section">
        <KineticRibbon />
      </div>

      {/* ── 3. IDENTITY & SKILLS ────────────────────────────── */}
      <section className="identity-section">
        <div className="section-header">
          <h2 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">
            // ENGINEER_PROFILE
          </h2>
          <div className="header-line" />
        </div>

        <div className="telemetry-dashboard">
          <div
            className="card identity-card premium-card"
            {...spotHandlers}
          >
            <h3 className="card-title mono-text">What I Build</h3>
            <p className="identity-text">
              Targeting high-scale, real-time architectures. Focused on reducing query
              latency and optimizing multi-user processing pipelines.
            </p>
          </div>

          <div
            className="card baseline-card premium-card"
            {...spotHandlers}
          >
            <h3 className="card-title mono-text mb-6">Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Degree</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>B.E. CSE</span>
                </div>
                <div>
                  <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Batch</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>2023 - 2027</span>
                </div>
              </div>
              <div>
                <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Institution</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>Nandha College of Technology</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>CGPA</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>7.8</span>
                </div>
                <div>
                  <span className="mono-text" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Arrears</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TECH ARSENAL ─────────────────────────────────── */}
        <div className="arsenal-module">
          <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">
            &gt;&gt; TECH_ARSENAL
          </h3>
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
              {/*
                AnimatePresence key change triggers enter/exit animation.
                Each skill tag is now draggable with spring snap-back.
              */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="skills-grid flex flex-wrap gap-3 justify-start"
              >
                {arsenalData[activeTab as keyof typeof arsenalData].items.map((item, idx) => (
                  <MagneticSkillTag key={`${activeTab}-${idx}`} item={item} idx={idx} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── LANGUAGES ────────────────────────────────────── */}
        <div className="languages-section">
          <h2 className="languages-header">&gt;&gt; LANGUAGES</h2>
          <div className="liquid-gauges-row w-full flex flex-wrap">
            <LiquidGauge fillValue={75} displayLabel="75%" label="English" subLabel="Professional Working Proficiency" />
            <LiquidGauge fillValue={90} displayLabel="90%" label="Tamil (Native)" subLabel="Full Duplex — Verbal & Written" />
          </div>
        </div>

        {/* ── SOFT SKILLS ──────────────────────────────────── */}
        <div className="soft-skills-section">
          <h2 className="soft-skills-header">&gt;&gt; SOFT SKILLS</h2>
          <div className="soft-skills-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <div className="skill-float-card premium-card p-4 md:p-6" {...spotHandlers}>
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

        <WorkExperience />
        <LiveTelemetry />
        <CorePhilosophy />
      </section>
    </div>
  );
};

export default Home;
