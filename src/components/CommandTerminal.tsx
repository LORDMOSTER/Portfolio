import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './CommandTerminal.css';

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'stream' | 'system';
  content: string;
}

/* ─────────────────────────────────────────────────────────────────
   MATRIX RAIN CANVAS
───────────────────────────────────────────────────────────────── */
const MatrixRain: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let frame: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      frame = requestAnimationFrame(draw);
    };

    draw();
    const timer = setTimeout(() => {
      cancelAnimationFrame(frame);
      onDone();
    }, 3200);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <motion.div
      className="matrix-rain-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <canvas ref={canvasRef} className="matrix-canvas" />
      <div className="matrix-hire-text">ACCESS GRANTED — REDIRECTING...</div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   GOLD RAIN — digital wealth cascade
───────────────────────────────────────────────────────────────── */
const GoldRain: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 15;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const chars = '₿Ξ◆▲★⊕∞∑∆∇01ABCDEF⬡✦∏';

    let frame: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop, i) => {
        const alpha = Math.random() > 0.88 ? 1 : 0.55;
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.font = `${fontSize}px "Fira Code", monospace`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drop * fontSize);
        if (drop * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      frame = requestAnimationFrame(draw);
    };

    draw();
    const timer = setTimeout(() => { cancelAnimationFrame(frame); onDone(); }, 4500);
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [onDone]);

  return (
    <motion.div
      className="gold-rain-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <canvas ref={canvasRef} className="gold-rain-canvas" />
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   GLITCH OVERLAY — RGB-split scanline distortion
───────────────────────────────────────────────────────────────── */
const GlitchOverlay: React.FC = () => (
  <div className="glitch-overlay" aria-hidden="true">
    <div className="glitch-layer glitch-layer--red" />
    <div className="glitch-layer glitch-layer--cyan" />
    <div className="glitch-scanlines" />
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   TYPEWRITER STREAM
───────────────────────────────────────────────────────────────── */
const WHOAMI_LINES = [
  '> User: Srihari P V',
  '> Role: Full-Stack & AI Engineer',
  '> Stack: React · TypeScript · Python · Java',
  '> Experience: 2+ years · Active since 2024',
  '> LeetCode: Guardian · 1800+ Rating',
  '> NPTEL: Institutional Topper · Gold Medalist',
  '> Focus: AI-powered products · Systems thinking',
  '> Status: AVAILABLE_FOR_HIRE',
];

const SKILLS_LINES = [
  '> FRONTEND  : React · TypeScript · Tailwind · Framer Motion',
  '> BACKEND   : Node.js · FastAPI · Express · Socket.IO',
  '> AI/ML     : LangChain · ChromaDB · PyTorch · Ollama · RAG',
  '> DATABASES : MongoDB · PostgreSQL · SQLite · Redis',
  '> DEVOPS    : Docker · GitHub Actions · Vercel · AWS basics',
  '> TOOLS     : Git · VS Code · Postman · Figma',
];

function useTypewriterStream(lines: string[], active: boolean, onDone: () => void) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const iRef = useRef(0);
  const jRef = useRef(0);

  useEffect(() => {
    if (!active) { setDisplayed([]); iRef.current = 0; jRef.current = 0; return; }

    const tick = setInterval(() => {
      const line = lines[iRef.current];
      if (!line) { clearInterval(tick); onDone(); return; }

      jRef.current++;
      setDisplayed(prev => {
        const next = [...prev];
        next[iRef.current] = line.slice(0, jRef.current);
        return next;
      });

      if (jRef.current >= line.length) {
        iRef.current++;
        jRef.current = 0;
      }
    }, 22);

    return () => clearInterval(tick);
  }, [active]); // eslint-disable-line

  return displayed;
}

/* ─────────────────────────────────────────────────────────────────
   COMMAND TERMINAL COMPONENT
───────────────────────────────────────────────────────────────── */
let lineCounter = 0;

const CommandTerminal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [streamTarget, setStreamTarget] = useState<'whoami' | 'skills'>('whoami');
  const [showMatrix, setShowMatrix] = useState(false);
  const [xrayMode, setXrayMode] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [showGoldRain, setShowGoldRain] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /* ── X-Ray mode body class sync ─────────────────────── */
  useEffect(() => {
    document.body.classList.toggle('xray-mode', xrayMode);
  }, [xrayMode]);

  /* ── Glitch mode body class sync ────────────────────── */
  useEffect(() => {
    document.body.classList.toggle('glitch-mode', glitchMode);
  }, [glitchMode]);

  /* ── Global keyboard handler + custom event ─────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`' || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const openHandler = () => setOpen(prev => !prev);

    window.addEventListener('keydown', handler);
    window.addEventListener('terminal:open', openHandler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('terminal:open', openHandler);
    };
  }, []);

  /* ── Focus input when opened ────────────────────────── */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      pushSystem('[SYS] Terminal initialized. Type "help" for all commands.');
    }
  }, [open]); // eslint-disable-line

  /* ── Auto-scroll ────────────────────────────────────── */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  /* ── Helpers ────────────────────────────────────────── */
  const pushLine = useCallback((type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, { id: lineCounter++, type, content }]);
  }, []);

  const pushSystem = useCallback((msg: string) => pushLine('system', msg), [pushLine]);

  /* ── Typewriter stream (whoami / skills) ─────────────── */
  const activeLines = streamTarget === 'skills' ? SKILLS_LINES : WHOAMI_LINES;
  const streamLines = useTypewriterStream(
    activeLines,
    streaming,
    () => {
      setStreaming(false);
      pushLine('output', '');
      pushLine('system', streamTarget === 'skills'
        ? '[SYS] Skill matrix loaded successfully.'
        : '[SYS] Stream complete. Identity verified.');
    }
  );

  useEffect(() => {
    if (streaming && streamLines.length > 0) {
      setLines(prev => {
        const base = prev.filter(l => l.type !== 'stream');
        return [
          ...base,
          ...streamLines.map((c, i) => ({ id: -1000 - i, type: 'stream' as const, content: c })),
        ];
      });
    }
  }, [streamLines, streaming]);

  /* ── Matrix redirect ────────────────────────────────── */
  const handleMatrixDone = useCallback(() => {
    setShowMatrix(false);
    setOpen(false);
    navigate('/contact');
  }, [navigate]);

  /* ── Command parser ─────────────────────────────────── */
  const parseCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    pushLine('input', `> ${raw}`);

    switch (true) {

      /* ── whoami ── */
      case cmd === 'whoami': {
        pushLine('output', '');
        setStreamTarget('whoami');
        setStreaming(true);
        break;
      }

      /* ── fetch --resume ── */
      case cmd === 'fetch --resume': {
        pushLine('output', '[FETCH] Locating resume package...');
        pushLine('output', '[FETCH] Found: SRIHARI P V - RESUME.pdf');
        const a = document.createElement('a');
        a.href = '/Image/SRIHARI P V - RESUME.pdf';
        a.download = 'SRIHARI_PV_Resume.pdf';
        a.click();
        setTimeout(() => {
          pushLine('system', '[SYS] Resume dispatched to download queue. ✓');
        }, 600);
        break;
      }

      /* ── clear ── */
      case cmd === 'clear': {
        setLines([]);
        break;
      }

      /* ── sudo hire ── */
      case cmd === 'sudo hire': {
        pushLine('output', '');
        pushLine('output', 'Authenticating credentials...');
        pushLine('output', '████████████████████████ 100%');
        setTimeout(() => {
          pushLine('system', '[AUTH] ACCESS GRANTED. Initiating hire sequence...');
          setTimeout(() => setShowMatrix(true), 600);
        }, 800);
        break;
      }

      /* ── X-Ray Mode ── */
      case cmd === 'sudo view --xray': {
        setXrayMode(true);
        pushLine('output', '');
        pushLine('system', '[XRAY] Architectural blueprint mode — ENABLED');
        pushLine('output', '  All backgrounds transparent. DOM structure revealed.');
        pushLine('output', '  Type "sudo view --default" to restore.');
        pushLine('output', '');
        break;
      }
      case cmd === 'sudo view --default': {
        setXrayMode(false);
        pushLine('system', '[XRAY] Restoring default render state...');
        pushLine('output', '  Normal UI mode — RESTORED');
        break;
      }

      /* ── skills ── */
      case cmd === 'skills': {
        pushLine('output', '');
        setStreamTarget('skills');
        setStreaming(true);
        break;
      }

      /* ── projects ── */
      case cmd === 'ls --projects': {
        pushLine('output', '');
        pushLine('output', '  [T1] AI-Receptionist     — Voice agent, sub-second latency');
        pushLine('output', '  [T1] Krishi-Route         — Geospatial logistics engine');
        pushLine('output', '  [T1] Campus Canteen       — Real-time POS + WebSockets');
        pushLine('output', '  [T1] MindX                — Local RAG pipeline, ChromaDB');
        pushLine('output', '  [T1] Chat-Space           — P2P WebRTC communications');
        pushLine('output', '  [T2] MiraX · Coloré · SentimentAnalyser · Viso Vibe · Gestodrive');
        pushLine('output', '');
        pushLine('system', '[SYS] Navigate to /arsenal for full project dossiers.');
        break;
      }

      /* ── contact ── */
      case cmd === 'contact': {
        pushLine('output', '');
        pushLine('output', '  Email  : sriharipv2005@gmail.com');
        pushLine('output', '  GitHub : github.com/LORDMOSTER');
        pushLine('output', '  LinkedIn: linkedin.com/in/srihari-p-v');
        pushLine('output', '');
        pushLine('system', '[SYS] Or type "sudo hire" to initiate contact sequence.');
        break;
      }

      /* ── github ── */
      case cmd === 'open --github': {
        pushLine('output', '[LAUNCH] Opening GitHub profile...');
        setTimeout(() => window.open('https://github.com/LORDMOSTER', '_blank'), 400);
        setTimeout(() => pushLine('system', '[SYS] External link opened in new tab.'), 600);
        break;
      }

      /* ── linkedin ── */
      case cmd === 'open --linkedin': {
        pushLine('output', '[LAUNCH] Opening LinkedIn profile...');
        setTimeout(() => window.open('https://www.linkedin.com/in/srihari-p-v-bb8560341/', '_blank'), 400);
        setTimeout(() => pushLine('system', '[SYS] External link opened in new tab.'), 600);
        break;
      }

      /* ── ◆ GLITCH MODE ─────────────────────────────────────── */
      case cmd === 'glitch --enable': {
        setGlitchMode(true);
        pushLine('output', '');
        pushLine('system', '[GLITCH] RGB-split distortion mode — ENABLED ⚡');
        pushLine('output', '  Scanline interference + chromatic aberration active.');
        pushLine('output', '  Type "glitch --disable" to restore clean render.');
        pushLine('output', '');
        break;
      }
      case cmd === 'glitch --disable': {
        setGlitchMode(false);
        pushLine('system', '[GLITCH] Distortion cleared. Render — RESTORED.');
        break;
      }

      /* ── ◆ GOLD RAIN ──────────────────────────────────────────── */
      case cmd === 'rain --gold': {
        pushLine('output', '');
        pushLine('system', '[RAIN] Initiating gold cascade... 4.5s runtime.');
        pushLine('output', '  ₿ Ξ ◆ ▲ ★  deploying digital wealth...');
        setTimeout(() => setShowGoldRain(true), 400);
        break;
      }

      /* ── ◆ PORTFOLIO SCAN ─────────────────────────────────────── */
      case cmd === 'scan --portfolio': {
        pushLine('output', '');
        pushLine('system', '[SCAN] Initializing portfolio diagnostics...');
        const scanSeq: Array<{ delay: number; type: TerminalLine['type']; content: string }> = [
          { delay: 250, type: 'output', content: '  [████░░░░░░░░░░░░░░░░] 20% — Identity matrix...' },
          { delay: 650, type: 'output', content: '  [████████░░░░░░░░░░░░] 40% — Project dossiers...' },
          { delay: 1050, type: 'output', content: '  [████████████░░░░░░░░] 60% — Skill graph...' },
          { delay: 1450, type: 'output', content: '  [████████████████░░░░] 80% — Achievement index...' },
          { delay: 1850, type: 'output', content: '  [████████████████████] 100% — SCAN COMPLETE ✓' },
          { delay: 2050, type: 'output', content: '' },
          { delay: 2150, type: 'system', content: '[RESULT] ──────────────────────────────────────────' },
          { delay: 2300, type: 'output', content: '  ENTITY         : Srihari P V' },
          { delay: 2450, type: 'output', content: '  STACK           : React · TypeScript · Python · Java' },
          { delay: 2600, type: 'output', content: '  PROJECTS        : 10 deployed · 2 in production' },
          { delay: 2750, type: 'output', content: '  CERTIFICATIONS  : 5 · Gold ×2 · Silver ×1 · Elite ×1' },
          { delay: 2900, type: 'output', content: '  LEETCODE        : Guardian · 1800+ rating' },
          { delay: 3050, type: 'output', content: '  AWARDS          : 12 competitive podiums secured' },
          { delay: 3200, type: 'output', content: '  THREAT LEVEL    : ZERO — friendly unit confirmed' },
          { delay: 3350, type: 'output', content: '' },
          { delay: 3450, type: 'system', content: '[SYS] Integrity check passed. Status: OPTIMAL ✓' },
        ];
        scanSeq.forEach(({ delay, type, content }) => {
          setTimeout(() => pushLine(type, content), delay);
        });
        break;
      }

      /* ── achievements ── */
      case cmd === 'cat achievements': {
        pushLine('output', '');
        pushLine('output', '  ★ LeetCode Guardian — 1800+ Rating');
        pushLine('output', '  ★ NPTEL Institutional Topper — Gold Medalist');
        pushLine('output', '  ★ Hackathon Winner — Smart India Hackathon');
        pushLine('output', '  ★ 100+ DSA problems solved (Arrays, Trees, DP)');
        pushLine('output', '');
        break;
      }

      /* ── system status ── */
      case cmd === 'status': {
        pushLine('output', '');
        pushLine('system', '[SYS] Portfolio Engine v3.0 — ONLINE');
        pushLine('output', `  Uptime    : ${Math.floor(performance.now() / 1000)}s`);
        pushLine('output', `  Timestamp : ${new Date().toLocaleString()}`);
        pushLine('output', '  Renderer  : React 18 + Framer Motion');
        pushLine('output', '  Mode      : PRODUCTION');
        pushLine('output', '');
        break;
      }

      /* ── theme toggle ── */
      case cmd === 'theme --light': {
        document.body.classList.add('light-mode');
        pushLine('system', '[THEME] Light mode engaged. Warm ivory palette active.');
        pushLine('output', '  Type "theme --dark" to restore dark mode.');
        break;
      }
      case cmd === 'theme --dark': {
        document.body.classList.remove('light-mode');
        pushLine('system', '[THEME] Dark mode restored. As it should be. 🌑');
        break;
      }

      /* ── fun / easter egg ── */
      case cmd === 'sudo rm -rf /': {
        pushLine('error', '[PERMISSION DENIED] Nice try. This system cannot be destroyed.');
        pushLine('system', '[SEC] Intrusion attempt logged. 😏');
        break;
      }

      case cmd === 'echo hello': {
        pushLine('output', 'Hello, world! — from SRIHARI_PV system shell 👋');
        break;
      }

      case cmd === 'uptime': {
        const s = Math.floor(performance.now() / 1000);
        pushLine('output', `System uptime: ${s}s — running smooth since page load.`);
        break;
      }

      /* ── help ── */
      case cmd === 'help': {
        pushLine('output', '');
        pushLine('output', '  ── SPECIAL OPS ─────────────────────────────────────');
        pushLine('output', '  glitch --enable      — RGB-split distortion overlay');
        pushLine('output', '  glitch --disable     — Restore clean render');
        pushLine('output', '  rain --gold          — Gold cascade sequence  [4.5s]');
        pushLine('output', '  scan --portfolio     — Run full diagnostic scan');
        pushLine('output', '  sudo view --xray     — Toggle wireframe mode');
        pushLine('output', '  sudo view --default  — Restore normal render');
        pushLine('output', '');
        pushLine('output', '  ── EXTERNAL ───────────────────────────────────────');
        pushLine('output', '  open --github        — Open GitHub profile');
        pushLine('output', '  open --linkedin      — Open LinkedIn profile');
        pushLine('output', '  contact              — Show contact details');
        pushLine('output', '');
        pushLine('output', '  ── SYSTEM ─────────────────────────────────────────');
        pushLine('output', '  status               — Show system status');
        pushLine('output', '  uptime               — Show session uptime');
        pushLine('output', '  theme --light        — Toggle light mode');
        pushLine('output', '  theme --dark         — Restore dark mode');
        pushLine('output', '  sudo hire            — [CLASSIFIED]');
        pushLine('output', '  clear                — Clear terminal');
        pushLine('output', '');
        break;
      }

      default: {
        pushLine('error', `[ERR] Command not found: "${raw}". Type "help" for available commands.`);
      }
    }
  }, [pushLine, navigate]); // eslint-disable-line

  /* ── Submit ─────────────────────────────────────────── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setStreaming(false);
    parseCommand(input);
    setInput('');
  };

  /* ── Render ─────────────────────────────────────────── */
  return (
    <>
      <AnimatePresence>
        {showMatrix && <MatrixRain key="matrix" onDone={handleMatrixDone} />}
        {showGoldRain && <GoldRain key="gold-rain" onDone={() => setShowGoldRain(false)} />}
      </AnimatePresence>
      {glitchMode && <GlitchOverlay />}

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="terminal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Terminal Panel */}
            <motion.div
              className="terminal-panel"
              initial={{ y: -32, opacity: 0, scaleY: 0.92 }}
              animate={{ y: 0, opacity: 1, scaleY: 1 }}
              exit={{ y: -32, opacity: 0, scaleY: 0.92 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header bar */}
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="t-dot red" onClick={() => setOpen(false)} />
                  <span className="t-dot yellow" />
                  <span className="t-dot green" />
                </div>
                <span className="terminal-title mono-text">SRIHARI_PV — SYSTEM_SHELL v3.0</span>
                <span className="terminal-hint mono-text">ESC to close</span>
                <button
                  className="terminal-close-mobile"
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                >✕</button>
              </div>

              {/* Output area */}
              <div className="terminal-output" ref={scrollRef}>
                {lines.map(line => (
                  <div key={line.id} className={`t-line t-line--${line.type}`}>
                    {line.content}
                  </div>
                ))}
                {streaming && <span className="t-cursor" />}
              </div>

              {/* Input */}
              <form className="terminal-input-row" onSubmit={handleSubmit}>
                <span className="terminal-prompt mono-text">root@portfolio:~$</span>
                <input
                  ref={inputRef}
                  className="terminal-input mono-text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="type a command... (try 'help')"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export { CommandTerminal as default };
export const openTerminal = () => window.dispatchEvent(new Event('terminal:open'));
