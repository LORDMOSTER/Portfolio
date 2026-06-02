import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Medal } from 'lucide-react';
import './Trophies.css';

/* ── Data ───────────────────────────────────────────────────────── */
const apexAchievements = [
  {
    id: 1,
    title: '[ BEST PERFORMER OF THE YEAR : 2025-26 ]',
    detail: 'Awarded by the College Administration for outstanding overarching academic and technical excellence.',
    Icon: Crown,
  },
  {
    id: 2,
    title: '[ NPTEL INSTITUTIONAL TOPPER ]',
    detail: 'Elite institutional recognition for maintaining top-tier academic standing across national NPTEL assessments.',
    Icon: Medal,
  },
];

type Seal = 'GOLD' | 'SILVER' | 'ELITE' | 'COMPLETED' | null;

interface CertData {
  id: number;
  title: string;
  issuer: string;
  detail?: string;
  seal: Seal;
}

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
];

interface AwardEntry {
  title: string;
  prize?: string;
}

interface YearGroup {
  year: string;
  entries: AwardEntry[];
}

const combatLog: YearGroup[] = [
  {
    year: '2026',
    entries: [
      { title: 'VIDYAM \'26 (Vidyaa Vikas)', prize: 'Winner — Paper Presentation' },
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

/* ── Geometric Seal Component ───────────────────────────────────── */
const GeoSeal: React.FC<{ seal: Seal }> = ({ seal }) => {
  if (!seal) return null;

  const configs: Record<NonNullable<Seal>, { points: string; stroke: string; fill: string; cls: string; label: string }> = {
    GOLD: {
      // Hexagon
      points: '25,4 46,14.5 46,35.5 25,46 4,35.5 4,14.5',
      stroke: '#D4AF37', fill: 'rgba(212,175,55,0.12)',
      cls: 'seal-gold', label: 'GOLD',
    },
    SILVER: {
      // Diamond
      points: '25,4 46,25 25,46 4,25',
      stroke: '#C0C0C0', fill: 'rgba(192,192,192,0.10)',
      cls: 'seal-silver', label: 'SLVR',
    },
    ELITE: {
      // Octagon
      points: '16,4 34,4 46,16 46,34 34,46 16,46 4,34 4,16',
      stroke: '#a855f7', fill: 'rgba(168,85,247,0.12)',
      cls: 'seal-elite', label: 'ELITE',
    },
    COMPLETED: {
      // Square
      points: '6,6 44,6 44,44 6,44',
      stroke: '#3a3a3a', fill: 'rgba(50,50,50,0.3)',
      cls: 'seal-done', label: 'DONE',
    },
  };

  const { points, stroke, fill, cls, label } = configs[seal];
  const glowColor = seal === 'GOLD' ? 'rgba(212,175,55,0.4)' : seal === 'SILVER' ? 'rgba(192,192,192,0.3)' : seal === 'ELITE' ? 'rgba(168,85,247,0.4)' : 'none';

  return (
    <div className={`geo-seal ${cls}`}>
      <svg viewBox="0 0 50 50" fill="none">
        <polygon points={points} stroke={stroke} strokeWidth="1.5" fill={fill}
          style={glowColor !== 'none' ? { filter: `drop-shadow(0 0 4px ${glowColor})` } : undefined} />
      </svg>
      <span>{label}</span>
    </div>
  );
};

/* ── Custom Matrix Trophy Component ───────────────────────────────── */
const TrophyPieces: React.FC<{ color: string; state: string }> = ({ color, state }) => {
  const pieceVariants = {
    idle: { x: 0, y: 0 },
    glitch: { x: 0, y: 0 }, // Handled by container
    hover: (i: number) => ({
      x: [0, i * 2.5, i * -1.5, i * 2],
      y: [0, i * -2, i * 1.5, i * -1],
      transition: { duration: 0.15, repeat: Infinity, repeatType: "mirror" as const }
    })
  };

  return (
    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <motion.path custom={-1} variants={pieceVariants} animate={state} d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <motion.path custom={1} variants={pieceVariants} animate={state} d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <motion.path custom={1.5} variants={pieceVariants} animate={state} d="M4 22h16" />
      <motion.path custom={-1.5} variants={pieceVariants} animate={state} d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <motion.path custom={1.5} variants={pieceVariants} animate={state} d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <motion.path custom={0} variants={pieceVariants} animate={state} d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
};

const MatrixTrophy: React.FC = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [glitching, setGlitching] = React.useState(false);

  React.useEffect(() => {
    if (isHovered) return;
    const fire = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    };
    let timeoutId: ReturnType<typeof setTimeout>;
    const loop = () => {
      timeoutId = setTimeout(() => {
        fire();
        loop();
      }, 2000 + Math.random() * 2000);
    };
    loop();
    return () => clearTimeout(timeoutId);
  }, [isHovered]);

  const state = isHovered ? 'hover' : glitching ? 'glitch' : 'idle';

  const baseVariants = {
    idle: { x: 0, y: 0, skewX: 0 },
    glitch: {
      x: [0, -2, 2, -1, 0],
      y: [0, 1, -1, 1, 0],
      skewX: [0, -5, 5, -2, 0],
      transition: { duration: 0.2 }
    },
    hover: {
      x: [0, -1, 1, -1, 1],
      y: [0, 1, -1, 1, -1],
      skewX: [0, -3, 3, -3, 3],
      transition: { duration: 0.15, repeat: Infinity, repeatType: "mirror" as const }
    }
  };

  const cyanVariants = {
    idle: { x: 0, y: 0, opacity: 0 },
    glitch: {
      x: [0, -4, 0, -2, 0],
      y: [0, -2, 0, -1, 0],
      opacity: [0, 0.8, 0, 0.5, 0],
      transition: { duration: 0.2 }
    },
    hover: {
      x: [-2, -4, -1, -3],
      y: [-1, -3, 0, -2],
      opacity: [0.8, 0.4, 0.8, 0.6],
      transition: { duration: 0.15, repeat: Infinity, repeatType: "mirror" as const }
    }
  };

  const redVariants = {
    idle: { x: 0, y: 0, opacity: 0 },
    glitch: {
      x: [0, 4, 0, 2, 0],
      y: [0, 2, 0, 1, 0],
      opacity: [0, 0.8, 0, 0.5, 0],
      transition: { duration: 0.2 }
    },
    hover: {
      x: [2, 4, 1, 3],
      y: [1, 3, 0, 2],
      opacity: [0.8, 0.4, 0.8, 0.6],
      transition: { duration: 0.15, repeat: Infinity, repeatType: "mirror" as const }
    }
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
      onPointerDown={() => setIsHovered(true)}
      onPointerUp={() => setIsHovered(false)}
      onPointerCancel={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '72px',
        height: '72px',
        cursor: 'pointer',
        zIndex: 10
      }}
    >
      <motion.div
        style={{ position: 'relative', width: '100%', height: '100%' }}
        animate={{ filter: isHovered ? 'drop-shadow(0 0 20px #D4AF37)' : 'drop-shadow(0 0 0px rgba(212,175,55,0))' }}
        transition={{ duration: 0.2 }}
      >
        <motion.div variants={baseVariants} animate={state} style={{ position: 'absolute', inset: 0 }}>
          {/* Cyan Glitch Layer */}
          <motion.div variants={cyanVariants} animate={state} style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen' }}>
            <TrophyPieces color="#00FFFF" state={state} />
          </motion.div>
          
          {/* Red Glitch Layer */}
          <motion.div variants={redVariants} animate={state} style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen' }}>
            <TrophyPieces color="#FF003C" state={state} />
          </motion.div>
          
          {/* Base Gold Layer */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <TrophyPieces color="#D4AF37" state={state} />
          </div>
        </motion.div>

        {/* Floating Pixels */}
        {pixels.map(p => (
          <motion.div
            key={p.id}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: '#D4AF37',
              borderRadius: '1px'
            }}
            variants={{
              idle: { 
                y: [0, -8, 0], 
                x: [0, 4, 0],
                opacity: 0.5,
                transition: { duration: 3 + p.id * 0.5, repeat: Infinity, ease: 'easeInOut' } 
              },
              glitch: {
                x: [0, p.id * 3, -p.id * 2, 0],
                y: [0, -p.id * 2, p.id * 3, 0],
                opacity: [0.5, 1, 0.5],
                transition: { duration: 0.2 }
              },
              hover: {
                x: [0, p.id * 8 * (p.id % 2 === 0 ? 1 : -1), p.id * 12 * (p.id % 2 === 0 ? -1 : 1)],
                y: [0, p.id * -6, p.id * 8],
                opacity: [1, 0.3, 1],
                scale: [1, 1.5, 1],
                transition: { duration: 0.15 + p.id * 0.05, repeat: Infinity, repeatType: "mirror" as const }
              }
            }}
            animate={state}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

/* ── Main Component ─────────────────────────────────────────────── */
const Trophies: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Hall of Records | SRIHARI PV';
  }, []);

  return (
    <div className="trophies-page">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <div className="trophies-hero">
        <div className="trophies-hero-text">
          <h1 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">&gt;&gt; HALL_OF_RECORDS</h1>
          <p>
            Compiled telemetry of validated credentials, continuous learning matrices,
            and competitive podiums.
          </p>
        </div>

        <MatrixTrophy />
      </div>

      {/* ── Apex Achievements ────────────────────────────────────── */}
      <p className="section-header text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">// APEX_ACHIEVEMENTS</p>
      <div className="apex-grid">
        {apexAchievements.map(({ id, title, detail, Icon }) => (
          <div key={id} className="apex-card">
            <div className="apex-icon-wrap">
              <Icon size={22} color="#D4AF37" strokeWidth={1.5} />
            </div>
            <div>
              <p className="apex-title">{title}</p>
              <p className="apex-detail">{detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Certifications ───────────────────────────────────────── */}
      <p className="section-header text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">// VALIDATED_CREDENTIALS</p>
      <div className="cert-grid">
        {certifications.map((cert) => (
          <div key={cert.id} className="cert-card">
            <GeoSeal seal={cert.seal} />
            <div className="cert-issuer-badge">{cert.issuer}</div>
            <p className="cert-title">{cert.title}</p>
            {cert.detail && <p className="cert-detail">{cert.detail}</p>}
          </div>
        ))}
      </div>

      {/* ── Combat Log ───────────────────────────────────────────── */}
      <p className="section-header text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text mt-16">// COMPETITIVE_PODIUMS</p>
      <div className="combat-log">
        {combatLog.map((group) => (
          <div key={group.year} className="combat-year-group">
            <div className="combat-year-header">[ {group.year} ]</div>
            {group.entries.map((entry, i) => (
              <div key={i} className="combat-entry">
                <div className="combat-connector" />
                <div className="combat-block">
                  <p className="combat-title">
                    {entry.title}
                    {entry.prize && <span className="combat-prize">{entry.prize}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Trophies;
