import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
} from 'framer-motion';
import './Trophies.css';

const IS_TOUCH = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
type Seal = 'GOLD' | 'SILVER' | 'ELITE' | 'COMPLETED' | 'VERIFIED' | null;

interface CertData {
  id: number;
  title: string;
  issuer: string;
  detail?: string;
  seal: Seal;
}

interface AwardEntry {
  title: string;
  prize?: string;
}

interface YearGroup {
  year: string;
  entries: AwardEntry[];
}

interface ApexAchievement {
  id: number;
  title: string;
  detail: string;
}

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const apexAchievements: ApexAchievement[] = [
  {
    id: 1,
    title: '[ BEST PERFORMER OF THE YEAR : 2025-26 ]',
    detail: 'Awarded by the College Administration for outstanding overarching academic and technical excellence.',
  },
  {
    id: 2,
    title: '[ NPTEL INSTITUTIONAL TOPPER ]',
    detail: 'Elite institutional recognition for maintaining top-tier academic standing across national NPTEL assessments.',
  },
];

const certifications: CertData[] = [
  {
    id: 1,
    title: 'Beginning C++ Programming – From Beginner to Beyond',
    issuer: 'Udemy',
    detail: '46 Total Hours · Tim Buchalka & Dr. Frank Mitropoulos',
    seal: null,
  },
  { id: 2, title: 'Programming in Java',       issuer: 'NPTEL', seal: 'GOLD' },
  { id: 3, title: 'Joy of Computing in Python', issuer: 'NPTEL', seal: 'SILVER' },
  { id: 4, title: 'Data Analytics with Python', issuer: 'NPTEL', seal: 'ELITE' },
  { id: 5, title: 'Database Management Systems',issuer: 'NPTEL', seal: 'COMPLETED' },
  {
    id: 6,
    title: 'Certificate of Consistency',
    issuer: 'INSTITUTIONAL',
    detail: 'Awarded by college administration for maintaining a flawless 100% academic attendance record across three consecutive semesters (Sem 3, 4, & 5).',
    seal: 'VERIFIED',
  },
];

const combatLog: YearGroup[] = [
  {
    year: '2026',
    entries: [
      { title: "VIDYAM '26 (Vidyaa Vikas)", prize: 'Winner — Paper Presentation' },
      { title: "Nandha's Innovation Day '26", prize: 'Winner — Project Presentation "ZING: The Smart Canteen"' },
    ],
  },
  {
    year: '2025',
    entries: [
      { title: "ASTA '25 (Selvam College)", prize: 'Winner — Paper Presentation & Snap With AI' },
      { title: 'National Tech Symposium (Sri Sai Ranganathan)', prize: 'Winner — Paper & Project Presentations' },
      { title: 'Verbal Vista Competition', prize: '2nd Prize' },
      { title: 'Project Idea Competition', prize: '1st Prize' },
      { title: 'INFEST 2K25 (INFO Institute)', prize: 'Winner — Paper Presentation' },
      { title: "GATEWAY '25 (PSG College)", prize: '1st Prize — Web Development' },
      { title: 'CRESCITA 2K25 (Kongu Eng College)', prize: 'Winner — Eduflash & Frame by Frame Coding' },
      { title: 'Tech Breeze 2025', prize: '100% Attendance Award (Multiple Semesters)' },
    ],
  },
  {
    year: '2024',
    entries: [
      { title: "syNECtics '24 (Nandha Engineering)", prize: 'Winner — Anime World' },
      { title: 'Intra-Department Meet', prize: '1st Prize — Paper Presentation · 3rd Prize — JAM' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────
   UPGRADED CRYPTO SCRAMBLE HOOK — v2
   Four-phase decryption sequence:
     0–25%  → Hex literals     (0x8F2, 0x1A4 …)
     25–50% → Binary glitches  (01101011 …)
     50–75% → System jargon   (SYS.ALLOC, AWAIT_DECRYPT …)
     75–100%→ Char-by-char real text reveal
───────────────────────────────────────────────────────────────── */
const HEX_CHARS   = '0123456789ABCDEF';
const BIN_CHARS   = '01';
const JARGON_POOL = [
  'SYS.ALLOC',
  'AWAITING_DECRYPT',
  'MEM_FAULT',
  'KERNEL_INIT',
  'BUFFER_FLUSH',
  'NULL_REF',
  'ACCESS_DENIED',
  'CHECKSUM',
  'STACK_TRACE',
  'SEGFAULT',
];

function randFrom(str: string) {
  return str[Math.floor(Math.random() * str.length)];
}

function useCryptoReveal(target: string, triggered: boolean) {
  const [display, setDisplay] = useState(() => target.replace(/[^ ]/g, '█'));
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef  = useRef(0);

  useEffect(() => {
    if (!triggered) return;
    iterRef.current = 0;

    // Total frames: each char gets ~5 frames to play with
    const totalIter = target.length * 5;

    const step = () => {
      iterRef.current++;
      const progress    = iterRef.current / totalIter;    // 0 → 1
      const revealedIdx = Math.floor(progress * target.length); // chars fully revealed

      setDisplay(
        target
          .split('')
          .map((char, idx) => {
            // Already revealed characters
            if (char === ' ') return ' ';
            if (idx < revealedIdx) return char;

            // Per-character local phase (0→1 within this char's "window")
            const charProgress = Math.min(1, (progress - idx / target.length) * target.length);

            if (charProgress < 0.25) {
              // Phase 1 — Hex: "0x" + 3 hex chars
              return `0x${randFrom(HEX_CHARS)}${randFrom(HEX_CHARS)}${randFrom(HEX_CHARS)}`.charAt(
                Math.floor(Math.random() * 5),
              );
            } else if (charProgress < 0.50) {
              // Phase 2 — Binary
              return randFrom(BIN_CHARS);
            } else if (charProgress < 0.75) {
              // Phase 3 — System jargon (pick a random char from a random word)
              const word = JARGON_POOL[Math.floor(Math.random() * JARGON_POOL.length)];
              return word[Math.floor(Math.random() * word.length)];
            } else {
              // Phase 4 — Random printable scatter before final reveal
              const SCATTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*_-+<>';
              return randFrom(SCATTER);
            }
          })
          .join(''),
      );

      if (iterRef.current < totalIter) {
        frameRef.current = setTimeout(step, 28);
      } else {
        // Final frame: show the real text
        setDisplay(target);
      }
    };

    step();
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [triggered, target]);

  return display;
}


/* ─────────────────────────────────────────────────────────────────
   GEOMETRIC SEAL
───────────────────────────────────────────────────────────────── */
const GeoSeal: React.FC<{ seal: Seal }> = ({ seal }) => {
  if (!seal) return null;

  const configs: Record<NonNullable<Seal>, { points: string; stroke: string; fill: string; cls: string; label: string }> = {
    GOLD: {
      points: '25,4 46,14.5 46,35.5 25,46 4,35.5 4,14.5',
      stroke: '#D4AF37', fill: 'rgba(212,175,55,0.12)',
      cls: 'seal-gold', label: 'GOLD',
    },
    SILVER: {
      points: '25,4 46,25 25,46 4,25',
      stroke: '#C0C0C0', fill: 'rgba(192,192,192,0.10)',
      cls: 'seal-silver', label: 'SLVR',
    },
    ELITE: {
      points: '16,4 34,4 46,16 46,34 34,46 16,46 4,34 4,16',
      stroke: '#a855f7', fill: 'rgba(168,85,247,0.12)',
      cls: 'seal-elite', label: 'ELITE',
    },
    COMPLETED: {
      points: '6,6 44,6 44,44 6,44',
      stroke: '#3a3a3a', fill: 'rgba(50,50,50,0.3)',
      cls: 'seal-done', label: 'DONE',
    },
    VERIFIED: {
      points: '25,4 46,25 25,46 4,25',
      stroke: '#4ade80', fill: 'rgba(74, 222, 128, 0.12)',
      cls: 'seal-verified', label: 'VRFD',
    },
  };

  const { points, stroke, fill, cls, label } = configs[seal];
  const glowColor =
    seal === 'GOLD' ? 'rgba(212,175,55,0.4)' :
    seal === 'SILVER' ? 'rgba(192,192,192,0.3)' :
    seal === 'ELITE' ? 'rgba(168,85,247,0.4)' :
    seal === 'VERIFIED' ? 'rgba(74,222,128,0.4)' : 'none';

  return (
    <div className={`geo-seal ${cls}`}>
      <svg viewBox="0 0 50 50" fill="none">
        <polygon
          points={points}
          stroke={stroke}
          strokeWidth="1.5"
          fill={fill}
          style={glowColor !== 'none' ? { filter: `drop-shadow(0 0 4px ${glowColor})` } : undefined}
        />
      </svg>
      <span>{label}</span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MATRIX TROPHY (unchanged)
───────────────────────────────────────────────────────────────── */
const TrophyPieces: React.FC<{ color: string; state: string }> = ({ color, state }) => {
  const pieceVariants = {
    idle: { x: 0, y: 0 },
    glitch: { x: 0, y: 0 },
    hover: (i: number) => ({
      x: [0, i * 2.5, i * -1.5, i * 2],
      y: [0, i * -2, i * 1.5, i * -1],
      transition: { duration: 0.15, repeat: Infinity, repeatType: 'mirror' as const },
    }),
  };

  return (
    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <motion.path custom={-1} variants={pieceVariants} animate={state} d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <motion.path custom={1}  variants={pieceVariants} animate={state} d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <motion.path custom={1.5} variants={pieceVariants} animate={state} d="M4 22h16" />
      <motion.path custom={-1.5} variants={pieceVariants} animate={state} d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <motion.path custom={1.5}  variants={pieceVariants} animate={state} d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <motion.path custom={0}    variants={pieceVariants} animate={state} d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
};

const MatrixTrophy: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const loop = () => {
      timeoutId = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 200);
        loop();
      }, 2000 + Math.random() * 2000);
    };
    loop();
    return () => clearTimeout(timeoutId);
  }, [isHovered]);

  const state = isHovered ? 'hover' : glitching ? 'glitch' : 'idle';

  const baseVariants = {
    idle: { x: 0, y: 0, skewX: 0 },
    glitch: { x: [0, -2, 2, -1, 0], y: [0, 1, -1, 1, 0], skewX: [0, -5, 5, -2, 0], transition: { duration: 0.2 } },
    hover:  { x: [0, -1, 1, -1, 1], y: [0, 1, -1, 1, -1], skewX: [0, -3, 3, -3, 3], transition: { duration: 0.15, repeat: Infinity, repeatType: 'mirror' as const } },
  };

  const cyanVariants = {
    idle:   { x: 0, y: 0, opacity: 0 },
    glitch: { x: [0, -4, 0, -2, 0], y: [0, -2, 0, -1, 0], opacity: [0, 0.8, 0, 0.5, 0], transition: { duration: 0.2 } },
    hover:  { x: [-2, -4, -1, -3], y: [-1, -3, 0, -2], opacity: [0.8, 0.4, 0.8, 0.6], transition: { duration: 0.15, repeat: Infinity, repeatType: 'mirror' as const } },
  };

  const redVariants = {
    idle:   { x: 0, y: 0, opacity: 0 },
    glitch: { x: [0, 4, 0, 2, 0], y: [0, 2, 0, 1, 0], opacity: [0, 0.8, 0, 0.5, 0], transition: { duration: 0.2 } },
    hover:  { x: [2, 4, 1, 3], y: [1, 3, 0, 2], opacity: [0.8, 0.4, 0.8, 0.6], transition: { duration: 0.15, repeat: Infinity, repeatType: 'mirror' as const } },
  };

  const pixels = [
    { id: 1, top: '10%', left: '-10%', size: 4 },
    { id: 2, top: '80%', left: '-20%', size: 6 },
    { id: 3, top: '-10%', left: '50%', size: 4 },
    { id: 4, top: '20%', left: '110%', size: 8 },
    { id: 5, top: '90%', left: '90%', size: 4 },
    { id: 6, top: '50%', left: '120%', size: 6 },
  ];

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 72, height: 72, cursor: 'pointer', zIndex: 10 }}
    >
      <motion.div
        style={{ position: 'relative', width: '100%', height: '100%' }}
        animate={{ filter: isHovered ? 'drop-shadow(0 0 20px #D4AF37)' : 'drop-shadow(0 0 0px rgba(212,175,55,0))' }}
        transition={{ duration: 0.2 }}
      >
        <motion.div variants={baseVariants} animate={state} style={{ position: 'absolute', inset: 0 }}>
          <motion.div variants={cyanVariants} animate={state} style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen' }}>
            <TrophyPieces color="#00FFFF" state={state} />
          </motion.div>
          <motion.div variants={redVariants} animate={state} style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen' }}>
            <TrophyPieces color="#FF003C" state={state} />
          </motion.div>
          <div style={{ position: 'absolute', inset: 0 }}>
            <TrophyPieces color="#D4AF37" state={state} />
          </div>
        </motion.div>
        {pixels.map(p => (
          <motion.div
            key={p.id}
            style={{ position: 'absolute', top: p.top, left: p.left, width: p.size, height: p.size, backgroundColor: '#D4AF37', borderRadius: 1 }}
            variants={{
              idle:   { y: [0, -8, 0], x: [0, 4, 0], opacity: 0.5, transition: { duration: 3 + p.id * 0.5, repeat: Infinity, ease: 'easeInOut' } },
              glitch: { x: [0, p.id * 3, -p.id * 2, 0], y: [0, -p.id * 2, p.id * 3, 0], opacity: [0.5, 1, 0.5], transition: { duration: 0.2 } },
              hover:  { x: [0, p.id * 8 * (p.id % 2 === 0 ? 1 : -1), p.id * 12 * (p.id % 2 === 0 ? -1 : 1)], y: [0, p.id * -6, p.id * 8], opacity: [1, 0.3, 1], scale: [1, 1.5, 1], transition: { duration: 0.15 + p.id * 0.05, repeat: Infinity, repeatType: 'mirror' as const } },
            }}
            animate={state}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   LOG POSE SVG WIREFRAME
─────────────────────────────────────────────────────────────────── */
const LogPoseIcon: React.FC<{ iconColor?: string }> = ({ iconColor = '#D4AF37' }) => (
  <svg className="log-pose-svg" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Log Pose compass">
    <circle cx="28" cy="28" r="24" stroke={iconColor} strokeWidth="1" opacity="0.6" />
    <ellipse cx="28" cy="28" rx="24" ry="10" stroke={iconColor} strokeWidth="0.7" opacity="0.35" />
    <ellipse cx="28" cy="28" rx="24" ry="18" stroke={iconColor} strokeWidth="0.7" opacity="0.25" />
    <ellipse cx="28" cy="28" rx="10" ry="24" stroke={iconColor} strokeWidth="0.7" opacity="0.35" />
    <line x1="28" y1="4" x2="28" y2="52" stroke={iconColor} strokeWidth="0.5" opacity="0.2" />
    <line x1="4" y1="28" x2="52" y2="28" stroke={iconColor} strokeWidth="0.5" opacity="0.2" />
    <g className="log-pose-needle">
      <line x1="28" y1="28" x2="28" y2="10" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="28,8 30,14 28,12 26,14" fill={iconColor} opacity="0.9" />
    </g>
    <circle cx="28" cy="28" r="3" fill={iconColor} opacity="0.85" />
    <circle cx="28" cy="28" r="1.2" fill="rgba(255,255,255,0.5)" />
    <line x1="28" y1="4" x2="28" y2="7" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="28" y1="49" x2="28" y2="52" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="4" y1="28" x2="7" y2="28" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="49" y1="28" x2="52" y2="28" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────
   GRAND LINE SEA
─────────────────────────────────────────────────────────────────── */
const GrandLineSea: React.FC = () => (
  <div className="grand-line-sea" aria-hidden="true">
    <svg className="grand-line-wave" viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path className="wave-path wave-path--1" d="M0,40 C150,10 300,70 450,40 C600,10 750,70 900,40 C1050,10 1150,60 1200,40 L1200,80 L0,80 Z" />
      <path className="wave-path wave-path--2" d="M0,50 C200,20 350,65 500,45 C650,25 800,65 950,45 C1050,30 1150,55 1200,50 L1200,80 L0,80 Z" />
      <path className="wave-path wave-path--3" d="M0,60 C100,45 250,72 400,58 C550,44 700,72 850,58 C1000,44 1100,65 1200,60 L1200,80 L0,80 Z" />
    </svg>
    <svg className="sea-particles" viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      {[70, 180, 290, 420, 540, 660, 780, 900, 1020, 1130].map((cx, i) => (
        <circle key={cx} className={`sea-dot sea-dot--${(i % 3) + 1}`} cx={cx} cy={30 + (i % 4) * 8} r="1.5" />
      ))}
    </svg>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   GRAND LINE CARD
─────────────────────────────────────────────────────────────────── */
const GrandLineCard: React.FC<{
  title: string;
  detail: string;
  floatIndex: number;
  triggered: boolean;
}> = ({ title, detail, floatIndex, triggered }) => {
  const revealed = useCryptoReveal(title, triggered);
  return (
    <div className={`grand-line-card-wrap grand-line-card-wrap--${floatIndex}`}>
      <div className="grand-line-card">
        {/* Rotating border beam */}
        <div className="gl-border-beam" />

        {/* Top-left corner accent */}
        <svg className="gl-corner-tl" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20 L0 0 L20 0" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" fill="none" />
        </svg>
        {/* Bottom-right corner accent */}
        <svg className="gl-corner-br" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0 L20 20 L0 20" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Scan-line overlay */}
        <div className="gl-scanlines" />

        {/* Card Content */}
        <div className="gl-content">
          {/* Log Pose icon wrapper — spins slowly */}
          <div className="gl-icon-wrap">
            <div className="gl-icon-ring" />
            <LogPoseIcon />
          </div>

          {/* Text group */}
          <div className="gl-text-group">
            {/* System-log prefix */}
            <span className="gl-sys-prefix">SYS.RECORD &gt;&gt;</span>
            <p className="gl-title crypto-text" style={{ mixBlendMode: triggered ? 'normal' : 'screen' }}>
              {revealed}
            </p>
            <p className="gl-detail">{detail}</p>
          </div>
        </div>

        {/* Bottom data-bar */}
        <div className="gl-data-bar">
          <span className="gl-data-tag">GRAND_LINE</span>
          <div className="gl-data-dots">
            <span /><span /><span />
          </div>
          <span className="gl-data-tag">VERIFIED</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   3D TILT CARD — reusable wrapper (used by cert & combat cards)
───────────────────────────────────────────────────────────────── */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (IS_TOUCH || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    const xPct = (e.clientX - rect.left) / rect.width;
    ref.current.style.setProperty('--mouse-x', `${xPct}`);
    ref.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    if (IS_TOUCH || !ref.current) return;
    x.set(0);
    y.set(0);
    ref.current.style.setProperty('--spot-x', '-999px');
    ref.current.style.setProperty('--spot-y', '-999px');
  }, [x, y]);

  if (IS_TOUCH) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={style}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d', willChange: 'transform', transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   TIMELINE NODE
   A section that sits on the vertical spine. Animates in when
   the scroll trace reaches it.
───────────────────────────────────────────────────────────────── */
interface TimelineNodeProps {
  label: string;
  index: number;
  children: React.ReactNode;
  onTriggered?: () => void;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ label, index, children, onTriggered }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

  useEffect(() => {
    if (isInView && onTriggered) onTriggered();
  }, [isInView, onTriggered]);

  return (
    <div ref={ref} className="timeline-node">
      {/* Spine dot */}
      <motion.div
        className="timeline-dot"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div
          className="timeline-dot-pulse"
          animate={isInView ? { scale: [1, 1.8, 1], opacity: [0.8, 0, 0] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
        />
      </motion.div>

      {/* Section label */}
      <motion.div
        className="timeline-node-header"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
      >
        <span className="timeline-label mono-text">{label}</span>
        <span className="timeline-index mono-text">[ {String(index + 1).padStart(2, '0')} ]</span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="timeline-content"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   CERT CARD with crypto reveal
───────────────────────────────────────────────────────────────── */
const CertCard: React.FC<{ cert: CertData; triggered: boolean }> = ({ cert, triggered }) => {
  const revealed = useCryptoReveal(cert.title, triggered);
  return (
    <TiltCard className="cert-card premium-card" style={{ perspective: 800 }}>
      <GeoSeal seal={cert.seal} />
      <div className="cert-issuer-badge">{cert.issuer}</div>
      <p className="cert-title crypto-text" style={{ mixBlendMode: triggered ? 'normal' : 'screen' }}>
        {revealed}
      </p>
      {cert.detail && <p className="cert-detail">{cert.detail}</p>}
    </TiltCard>
  );
};

/* ─────────────────────────────────────────────────────────────────
   COMBAT ENTRY with crypto reveal
───────────────────────────────────────────────────────────────── */
const CombatEntry: React.FC<{ entry: AwardEntry; triggered: boolean; delay: number }> = ({ entry, triggered, delay }) => {
  const revealed = useCryptoReveal(entry.title, triggered);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      className="combat-entry"
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay }}
    >
      <div className="combat-connector" />
      <TiltCard className="combat-block premium-card" style={{ perspective: 600 }}>
        <p className="combat-title">
          <span className="crypto-text" style={{ mixBlendMode: triggered ? 'normal' : 'screen' }}>
            {revealed}
          </span>
          {entry.prize && <span className="combat-prize">{entry.prize}</span>}
        </p>
      </TiltCard>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SCROLL TRACE — the animated gold line moving down the spine
───────────────────────────────────────────────────────────────── */
const ScrollTrace: React.FC<{ containerRef: React.RefObject<HTMLElement | null> }> = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const smoothHeight = useSpring(height, { stiffness: 60, damping: 25 });

  return (
    <div className="timeline-spine-wrap">
      <div className="timeline-spine" />
      <motion.div
        className="timeline-trace"
        style={{ height: smoothHeight }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
const Trophies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [apexTriggered, setApexTriggered]   = useState(false);
  const [certTriggered, setCertTriggered]   = useState(false);
  const [combatTriggered, setCombatTriggered] = useState(false);

  return (
    <div className="trophies-page px-4 md:px-0 w-full overflow-x-hidden" ref={containerRef}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="trophies-hero">
        <div className="trophies-hero-text">
          <motion.h1
            className="trophies-headline mono-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            &gt;&gt; HALL_OF_RECORDS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Compiled telemetry of validated credentials, continuous learning matrices,
            and competitive podiums.
          </motion.p>
        </div>
        <MatrixTrophy />
      </div>

      {/* ── Vertical Timeline ─────────────────────────────────── */}
      <div className="timeline-container">
        <ScrollTrace containerRef={containerRef} />

        <div className="timeline-nodes">

          {/* Node 01 — Apex Achievements */}
          <TimelineNode
            label="// APEX_ACHIEVEMENTS"
            index={0}
            onTriggered={useCallback(() => setApexTriggered(true), [])}
          >
            <div className="grand-line-sea-container">
              <div className="apex-grid">
                {apexAchievements.map(({ id, title, detail }, idx) => (
                  <GrandLineCard
                    key={id}
                    title={title}
                    detail={detail}
                    floatIndex={idx}
                    triggered={apexTriggered}
                  />
                ))}
              </div>
              <GrandLineSea />
            </div>
          </TimelineNode>

          {/* Node 02 — Certifications */}
          <TimelineNode
            label="// VALIDATED_CREDENTIALS"
            index={1}
            onTriggered={useCallback(() => setCertTriggered(true), [])}
          >
            <div className="cert-grid">
              {certifications.map(cert => (
                <CertCard key={cert.id} cert={cert} triggered={certTriggered} />
              ))}
            </div>
          </TimelineNode>

          {/* Node 03 — Competitive Podiums */}
          <TimelineNode
            label="// COMPETITIVE_PODIUMS"
            index={2}
            onTriggered={useCallback(() => setCombatTriggered(true), [])}
          >
            <div className="combat-log">
              {combatLog.map((group) => (
                <div key={group.year} className="combat-year-group">
                  <motion.div
                    className="combat-year-header"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    [ {group.year} ]
                  </motion.div>
                  {group.entries.map((entry, i) => (
                    <CombatEntry
                      key={i}
                      entry={entry}
                      triggered={combatTriggered}
                      delay={i * 0.06}
                    />
                  ))}
                </div>
              ))}
            </div>
          </TimelineNode>

        </div>
      </div>
    </div>
  );
};

export default Trophies;
