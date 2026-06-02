import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Map, Coffee, MessageSquare, Brain, Terminal, Smile, Gamepad2, Palette, X, Music } from 'lucide-react';
import './Arsenal.css';

const projects = [
  {
    id: 1,
    title: "Gestodrive",
    icon: Gamepad2,
    tech: ["Python", "OpenCV", "MediaPipe"],
    pitch: "Play racing games with your bare hands.",
    problem: "Hardware racing wheels are expensive, and playing car games with keyboard arrows feels clunky and unrealistic.",
    solution: "Made a computer vision tool that lets you steer a virtual car simply by holding invisible steering wheels in the air in front of your webcam.",
    engineeringChoice: "**MediaPipe & Geometry.** OpenCV grabs the webcam feed, and Google's MediaPipe instantly maps 21 3D coordinates on your hands. By calculating the mathematical slope between your left and right knuckles, the program translates the angle of your hands into smooth left/right keyboard inputs.",
    flow: "Webcam -> OpenCV -> MediaPipe Hand Tracking -> Slope Geometry Math -> Pynput Emulation",
    github: "https://github.com/LORDMOSTER/Gestodrive",
    category: "Computer Vision"
  },
  {
    id: 2,
    title: "Viso Vibe",
    icon: Music,
    tech: ["Python", "DeepFace", "Spotify Web API", "OAuth"],
    pitch: "An AI music player that reads your facial expressions.",
    problem: "People spend too much time scrolling through playlists trying to find the perfect music to match their current mood.",
    solution: "Built an AI application that looks at your webcam, instantly figures out if you are happy, sad, angry, or neutral, and automatically streams the perfect Spotify playlist to match.",
    engineeringChoice: "**DeepFace & Spotify Web API.** I utilized DeepFace for zero-training, real-time emotion detection because it is highly optimized for facial analysis. I then linked it via OAuth to Spotify's Web API to trigger secure, instant audio playback without making the user leave the application.",
    flow: "Webcam -> OpenCV -> DeepFace Emotion Inference -> Spotify API OAuth -> Play Track",
    github: "https://github.com/LORDMOSTER/Viso-Vibe",
    category: "AI/ML"
  },
  {
    id: 3,
    title: "SentimentAnalyser",
    icon: Smile,
    tech: ["NLP", "Hugging Face", "PyTorch", "Streamlit"],
    pitch: "An AI that instantly reads the emotional tone of a text.",
    problem: "Businesses get thousands of text reviews daily and cannot read them all manually to figure out if customers are generally happy or angry.",
    solution: "Designed a web tool where you paste text, and the AI instantly flags it as positive or negative with a mathematical confidence score.",
    engineeringChoice: "**Bidirectional LSTM.** Standard AI reads sentences left-to-right. I built a Bi-LSTM network because it reads the sentence forward and backward simultaneously. This allows the AI to catch tricky emotions like sarcasm or double meanings by understanding full context.",
    flow: "Raw Text -> Tokenization -> Bidirectional LSTM Network -> Sigmoid Activation -> Probability Score",
    github: "https://github.com/LORDMOSTER/SentimentAnalyser",
    category: "AI/ML"
  },
  {
    id: 4,
    title: "Coloré",
    icon: Palette,
    tech: ["Python", "Streamlit", "Pandas"],
    pitch: "The ultimate pixel-level color extractor.",
    problem: "Graphic designers often see a specific color in a photo and spend ages trying to guess its exact RGB code or official name.",
    solution: "Built a one-click web tool. You upload an image, click any pixel, and it instantly gives you the RGB code and the closest official color name.",
    engineeringChoice: "**The Euclidean Distance Algorithm.** When a pixel is clicked, I grab the RGB numbers and use the 3D Euclidean distance formula to mathematically measure the \"distance\" between that pixel and 800+ known colors in my database to find the exact match instantly.",
    flow: "Image -> Click Coordinate -> RGB Extraction -> Euclidean Distance Match -> Output Color Name",
    github: "https://github.com/LORDMOSTER/Color-Detection",
    category: "Computer Vision"
  },
  {
    id: 5,
    title: "MiraX",
    icon: Terminal,
    tech: ["Batch Scripting (.BAT)"],
    pitch: "A mini Operating System inside Windows.",
    problem: "Windows Command Prompt is boring, and I wanted to prove I could engineer complex software logic even in the oldest, most limited programming languages.",
    solution: "Coded a completely custom terminal environment featuring a multi-user login system, file managers, and productivity tools.",
    engineeringChoice: "**Pure Batch Scripting.** It forces deep thinking about core computer science logic. I manually engineered basic security—like a Caesar Cipher algorithm to lock and encrypt text files—using nothing but 130KB of raw, low-level Windows batch commands.",
    flow: "Boot.bat -> Authentication Array -> Main Memory Loop -> File I/O & Cipher Cryptography",
    github: "https://github.com/LORDMOSTER/MiraX-",
    category: "Low-Level"
  },
  {
    id: 6,
    title: "Chat-Space",
    icon: MessageSquare,
    tech: ["FastAPI", "WebRTC", "Socket.IO", "SQLAlchemy"],
    pitch: "A custom-built WhatsApp/Zoom hybrid.",
    problem: "Video calling apps usually require heavy, expensive central servers to pass video data back and forth between users, causing lag.",
    solution: "Built a real-time messaging and video calling platform where users can chat securely and share their screens.",
    engineeringChoice: "**WebRTC & STUN Servers.** I implemented WebRTC to create a direct \"peer-to-peer\" pipeline. Because the heavy video data flows directly between the users and completely bypasses my backend server, the video quality is lag-free and costs $0 to host.",
    flow: "Client 1 -> Socket.io (Handshake) -> Google STUN (Bypass Firewalls) -> Direct P2P Video -> Client 2",
    github: "https://github.com/LORDMOSTER/Chat-Space",
    category: "Full-Stack"
  },
  {
    id: 7,
    title: "MindX",
    icon: Brain,
    tech: ["FastAPI", "Streamlit", "LangChain", "ChromaDB", "Ollama"],
    pitch: "Chat with your private documents, completely offline.",
    problem: "Companies want to use AI to search through their private PDFs, but uploading sensitive company documents to public clouds like ChatGPT is a massive security risk.",
    solution: "Created an AI document reader that runs entirely offline. You upload a PDF, and you can ask the AI questions about it without the data ever touching the internet.",
    engineeringChoice: "**ChromaDB Vectorization.** Traditional databases search for exact word matches. I used ChromaDB to slice the PDF into mathematical \"vectors\". This allows the local AI to search for the meaning behind a question rather than just keyword matching.",
    flow: "PDF Upload -> Recursive Text Splitter -> Nomic Vector Embeddings -> ChromaDB -> Local Llama3 AI -> UI",
    github: "https://github.com/LORDMOSTER/MindX",
    category: "AI/ML"
  },
  {
    id: 8,
    title: "Campus Canteen System",
    icon: Coffee,
    tech: ["Node.js", "WebSockets", "SQLite", "Razorpay"],
    pitch: "A digital ordering system with live inventory and AI budget tips.",
    problem: "Students waste their breaks standing in long canteen lines, and vendors have no idea what food is in demand, leading to food waste.",
    solution: "A dual-app system. Students get an app that suggests meal combos based on their budget, and vendors get a live dashboard that automatically deducts ingredients.",
    engineeringChoice: "**WebSockets & SQLite.** I used Socket.io so the exact millisecond a student pays, the order pops up on the vendor's screen without refreshing. I chose SQLite because it runs directly on the local machine without an external network, making it lightning-fast.",
    flow: "Student Phone -> REST API & Socket.io -> Express.js Server -> Local SQLite -> Vendor Kitchen Screen",
    github: "https://github.com/LORDMOSTER/Campus-Canteen",
    category: "Full-Stack"
  },
  {
    id: 9,
    title: "Krishi-Route",
    icon: Map,
    tech: ["MERN Stack", "Leaflet.js", "Geospatial", "JWT"],
    pitch: "\"Uber for crops.\" A profit-routing engine for Indian farmers.",
    problem: "Farmers often lose money to middlemen and pay too much for transport because they don't know which specific market has the best prices today.",
    solution: "Created a platform that scans 140 regional markets, calculates travel costs, and automatically matches farmers together so they can split the cost of a truck.",
    engineeringChoice: "**The Haversine Formula.** Instead of relying on expensive third-party map APIs to calculate distance, I mathematically coded the Haversine formula from scratch. It uses spherical geometry to calculate the exact straight-line distance between GPS coordinates to instantly calculate fuel costs.",
    flow: "Farmer GPS -> Haversine Distance Engine -> Profit Algorithm (Price*Yield - Fuel) -> Shared Truck Matchmaker",
    github: "https://github.com/LORDMOSTER/Krishi-Route",
    category: "Full-Stack"
  },
  {
    id: 10,
    title: "AI-Receptionist",
    icon: Mic,
    tech: ["Python", "OpenAI Realtime API", "LiveKit", "SIP"],
    pitch: "A voice AI agent that actually talks like a human.",
    problem: "Most AI voice bots are slow and sound robotic because they have to convert your speech to text, think, and then convert text back to speech before answering.",
    solution: "Built a completely self-hosted, direct speech-to-speech AI phone bot that skips the text conversion completely and answers in under a second.",
    engineeringChoice: "**OpenAI Realtime API & LiveKit.** By streaming the audio bytes directly into the LLM rather than translating it to text first, I cut the response delay to milliseconds. This makes it feel like a real human phone call while dropping the hosting cost to pennies per minute.",
    flow: "SIP Phone Trunk -> LiveKit Audio Server -> Python Agent -> OpenAI Realtime Audio -> Caller",
    github: "https://github.com/LORDMOSTER/AI-Receptionist",
    category: "AI/ML"
  }
];

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
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const filteredProjects = projects;
  const selectedProject = projects.find(p => p.id === selectedId);


  React.useEffect(() => {
    document.body.style.overflow = selectedId ? 'hidden' : 'auto';
  }, [selectedId]);

  return (
    <div className="arsenal-page">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="arsenal-hero">

        {/* Left: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h1 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">
            &gt;&gt; PROJECT_ARSENAL
          </h1>

          <p
            className="mono-text"
            style={{ color: '#EAEAEA', fontWeight: 700, fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}
          >
            ENGINEERED SYSTEMS
          </p>

          {/* Static status tags */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <span className="mono-text" style={{
              border: '1px solid #D4AF37',
              color: '#D4AF37',
              padding: '4px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              background: 'rgba(212,175,55,0.08)',
              borderRadius: '2px',
            }}>
              [ LIVE DEPLOYMENTS ]
            </span>
            <span className="mono-text" style={{ color: '#888', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
              // FULL-STACK &amp; AI
            </span>
          </div>

          <p className="hero-description">
            A collection of software I have built to solve real-world problems. From sub-second voice AI agents to logistics platforms for farmers, these projects showcase my focus on writing clean code, building scalable backends, and designing fast, user-friendly experiences. Select any project below to see how it works under the hood.
          </p>

        </div>

        {/* Right: Reactor Core */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SystemCore />
        </div>
      </div>

      {/* ── Roadmap intro ─────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 16px' }}>
        <p className="mono-text" style={{ color: '#888', fontSize: '0.85rem', letterSpacing: '0.06em' }}>
          // THE_EVOLUTION: Chronological deployment log &mdash; from local scripts to cloud-native systems.
        </p>
      </div>

      {/* ── Year-Grouped Winding Roadmap ────────────────────────────── */}
      {(() => {
        const ROW_H   = 220;   // px per project row
        const YEAR_H  = 68;    // height of year-label rows
        const SVG_W   = 1100;
        const LEFT_X  = 220;   // SVG x for left-side nodes
        const RIGHT_X = 880;   // SVG x for right-side nodes
        const CX      = 550;   // SVG center x
        const TOP_PAD = 40;
        const BOT_PAD = 120;

        // Year groups — determines which projects belong to each year
        const YEARS: { label: string; ids: number[] }[] = [
          { label: '2024', ids: [0, 1, 2, 3] },
          { label: '2025', ids: [4, 5] },
          { label: '2026', ids: [6, 7, 8, 9] },
        ];

        // Compute Y positions dynamically (accounts for year header rows)
        const nodeY: number[] = new Array(10).fill(0);
        let cy = TOP_PAD;
        for (const grp of YEARS) {
          cy += YEAR_H; // year header row
          for (const id of grp.ids) {
            nodeY[id] = cy + ROW_H / 2;
            cy += ROW_H;
          }
        }
        const totalH = cy + BOT_PAD;

        // Build SVG path — only through VISIBLE (filtered) projects in order
        const visibleItems = filteredProjects.map(p => {
          const origIdx = projects.indexOf(p);
          return { project: p, origIdx, isLeft: origIdx % 2 === 0, x: origIdx % 2 === 0 ? LEFT_X : RIGHT_X, y: nodeY[origIdx] };
        });

        let d = `M ${CX},0`;
        if (visibleItems.length > 0) {
          const f = visibleItems[0];
          d += ` C ${CX},${f.y * 0.45} ${f.x},${f.y * 0.45} ${f.x},${f.y}`;
        }
        for (let i = 0; i < visibleItems.length - 1; i++) {
          const a = visibleItems[i], b = visibleItems[i + 1];
          const mid = (a.y + b.y) / 2;
          d += ` C ${a.x},${mid} ${b.x},${mid} ${b.x},${b.y}`;
        }
        if (visibleItems.length > 0) {
          const last = visibleItems[visibleItems.length - 1];
          d += ` C ${last.x},${totalH - BOT_PAD * 0.4} ${CX},${totalH - BOT_PAD * 0.4} ${CX},${totalH}`;
        }

        return (
          <div style={{ position: 'relative', maxWidth: `${SVG_W}px`, margin: '0 auto', paddingBottom: '40px' }}>

            {/* SVG road — absolute, behind everything */}
            <svg width="100%" height={totalH} viewBox={`0 0 ${SVG_W} ${totalH}`}
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none', overflow: 'visible' }}
              fill="none"
            >
              <path d={d} stroke="rgba(212,175,55,0.06)" strokeWidth="88" strokeLinecap="round" strokeLinejoin="round"/>
              <path d={d} stroke="#111"   strokeWidth="70" strokeLinecap="round" strokeLinejoin="round"/>
              <path d={d} stroke="#1A1A1A" strokeWidth="68" strokeLinecap="round" strokeLinejoin="round"/>
              <path d={d} stroke="#0D0D0D" strokeWidth="64" strokeLinecap="round" strokeLinejoin="round"/>
              <path d={d} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeLinecap="round" transform="translate(-32,0)"/>
              <path d={d} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeLinecap="round" transform="translate(32,0)"/>
              <path d={d} stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeDasharray="18 24" opacity="0.55"/>
            </svg>

            {/* DOM layout: year groups + project rows */}
            <div style={{ height: `${TOP_PAD}px` }}/>

            {YEARS.map(grp => {
              const grpItems = grp.ids
                .map(id => visibleItems.find(v => v.origIdx === id))
                .filter(Boolean) as typeof visibleItems;

              if (grpItems.length === 0) return null;

              return (
                <div key={grp.label}>
                  {/* Year label row */}
                  <div style={{ height: `${YEAR_H}px`, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2, paddingLeft: '12px' }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      background: 'rgba(8,8,8,0.92)',
                      border: '1px solid rgba(212,175,55,0.28)',
                      borderRadius: '4px', padding: '5px 14px',
                      backdropFilter: 'blur(6px)',
                    }}>
                      <span className="mono-text" style={{ color: 'rgba(212,175,55,0.5)', fontSize: '0.65rem' }}>// YEAR</span>
                      <span className="mono-text" style={{ color: '#D4AF37', fontSize: '1.35rem', fontWeight: 900, lineHeight: 1 }}>{grp.label}</span>
                    </div>
                  </div>

                  {/* Project rows */}
                  {grpItems.map(({ project, isLeft }) => {
                    const Icon = project.icon;

                    return (
                      <div key={project.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', height: `${ROW_H}px`, alignItems: 'center', position: 'relative', zIndex: 1 }}>
                        
                        {/* Left card slot */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '18px' }}>
                          {isLeft && (
                            <div className="arsenal-card" onClick={() => setSelectedId(project.id)} style={{ width: '100%', maxWidth: '380px', cursor: 'pointer' }}>
                              <div className="card-header" style={{ marginBottom: '8px' }}>
                                <Icon className="project-icon" size={22}/>
                                <h3 className="project-title">{project.title}</h3>
                              </div>
                              <p className="project-pitch">{project.pitch}</p>
                              <div className="tech-scroll-container">
                                <div className="tech-pills">
                                  {project.tech.map((t, i) => (
                                    <span key={i} className="tech-pill mono-text">{t}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Center: empty spacer (no dots) */}
                        <div />

                        {/* Right card slot */}
                        <div style={{ paddingLeft: '18px' }}>
                          {!isLeft && (
                            <div className="arsenal-card" onClick={() => setSelectedId(project.id)} style={{ width: '100%', maxWidth: '380px', cursor: 'pointer' }}>
                              <div className="card-header" style={{ marginBottom: '8px' }}>
                                <Icon className="project-icon" size={22}/>
                                <h3 className="project-title">{project.title}</h3>
                              </div>
                              <p className="project-pitch">{project.pitch}</p>
                              <div className="tech-scroll-container">
                                <div className="tech-pills">
                                  {project.tech.map((t, i) => (
                                    <span key={i} className="tech-pill mono-text">{t}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Walking figure */}
            <div style={{ height: `${BOT_PAD}px`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1, gap: '14px' }}>
              <div className="walker-figure">
                <svg width="64" height="108" viewBox="0 0 72 120" fill="none">
                  <ellipse cx="36" cy="115" rx="20" ry="4" fill="rgba(212,175,55,0.18)"/>
                  <ellipse cx="36" cy="11" rx="9.5" ry="10" fill="#D4AF37" opacity="0.95"/>
                  <rect x="32" y="20" width="8" height="5" rx="2.5" fill="#C8A028"/>
                  <path d="M 24 25 C 21 38 21 52 24 62 L 48 62 C 51 52 51 38 48 25 Z" fill="#C8A028" opacity="0.92"/>
                  <path d="M 28 25 C 26 36 26 48 28 56 L 36 56 L 36 25 Z" fill="rgba(212,175,55,0.12)"/>
                  <rect x="24" y="60" width="24" height="5" rx="2" fill="#A07820" opacity="0.8"/>
                  <g className="human-arm-l" style={{ transformBox: 'fill-box' as const, transformOrigin: '50% 0%' }}>
                    <rect x="12" y="26" width="11" height="22" rx="5.5" fill="#D4AF37" opacity="0.88"/>
                    <g className="human-forearm-l" style={{ transformBox: 'fill-box' as const, transformOrigin: '50% 0%' }}>
                      <rect x="13" y="47" width="9" height="18" rx="4.5" fill="#B89020" opacity="0.82"/>
                    </g>
                  </g>
                  <g className="human-arm-r" style={{ transformBox: 'fill-box' as const, transformOrigin: '50% 0%' }}>
                    <rect x="49" y="26" width="11" height="22" rx="5.5" fill="#D4AF37" opacity="0.88"/>
                    <g className="human-forearm-r" style={{ transformBox: 'fill-box' as const, transformOrigin: '50% 0%' }}>
                      <rect x="50" y="47" width="9" height="18" rx="4.5" fill="#B89020" opacity="0.82"/>
                    </g>
                  </g>
                  <g className="human-thigh-l" style={{ transformBox: 'fill-box' as const, transformOrigin: '50% 0%' }}>
                    <rect x="25" y="65" width="11" height="26" rx="5.5" fill="#D4AF37" opacity="0.9"/>
                    <g className="human-shin-l" style={{ transformBox: 'fill-box' as const, transformOrigin: '50% 0%' }}>
                      <rect x="25" y="90" width="10" height="22" rx="4.5" fill="#B89020" opacity="0.85"/>
                    </g>
                  </g>
                  <g className="human-thigh-r" style={{ transformBox: 'fill-box' as const, transformOrigin: '50% 0%' }}>
                    <rect x="36" y="65" width="11" height="26" rx="5.5" fill="#D4AF37" opacity="0.9"/>
                    <g className="human-shin-r" style={{ transformBox: 'fill-box' as const, transformOrigin: '50% 0%' }}>
                      <rect x="36" y="90" width="10" height="22" rx="4.5" fill="#B89020" opacity="0.85"/>
                    </g>
                  </g>
                </svg>
              </div>
              <p className="mono-text" style={{ color: '#D4AF37', fontSize: '0.95rem', fontWeight: 700, textAlign: 'center' }}>
                The road doesn't end here.
              </p>
              <p style={{ color: '#888', fontSize: '0.82rem', fontFamily: 'Space Grotesk, sans-serif', textAlign: 'center' }}>
                Still building &mdash; Next system loading...
              </p>
            </div>
          </div>
        );
      })()}

      {/* ── Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedId(null)}>
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedId(null)}>
                <X size={24} />
              </button>

              <div className="modal-header">
                <div className="modal-title-group">
                  <selectedProject.icon className="project-icon" size={32} />
                  <h2 className="modal-title">{selectedProject.title}</h2>
                </div>
                <div className="tech-pills modal-tech">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="tech-pill mono-text">{t}</span>
                  ))}
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <h4 className="mono-text section-header">// THE_PROBLEM</h4>
                  <p className="section-text">{selectedProject.problem}</p>
                </div>
                <div className="modal-section">
                  <h4 className="mono-text section-header">// THE_SOLUTION</h4>
                  <p className="section-text">{selectedProject.solution}</p>
                </div>
                <div className="modal-section">
                  <h4 className="mono-text section-header">// THE_ENGINEERING_CHOICE</h4>
                  <p
                    className="section-text"
                    dangerouslySetInnerHTML={{
                      __html: selectedProject.engineeringChoice.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                </div>
                <div className="modal-section">
                  <h4 className="mono-text section-header">// SYSTEM_FLOW</h4>
                  <div className="system-flow-box mono-text">{selectedProject.flow}</div>
                </div>
              </div>

              <div className="modal-footer">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-btn mono-text"
                >
                  &gt; VIEW_SOURCE_CODE
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Arsenal;
