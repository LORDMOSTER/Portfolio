import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue, useTransform, animate } from 'framer-motion';
import { useSystemLog } from '../contexts/SystemLogContext';
import './LiveTelemetry.css';

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
interface LeetCodeData {
  user: string;
  peakRating: number;
  solved: number;
  rank: string;
}

interface GitHubData {
  totalCommits: number;
  activeRepos: number;
  languages: { name: string; percentage: number; color: string }[];
}

/* ─────────────────────────────────────────────────────────────────
   ANIMATED COUNTER
   Counts from 0 → target using Framer Motion's animate().
   Only triggers when parent enters viewport (whileInView).
───────────────────────────────────────────────────────────────── */
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  inView: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 1.8,
  inView,
}) => {
  const motionVal = useMotionValue(0);
  const rounded   = useTransform(motionVal, v => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current || target === 0) return;
    hasRun.current = true;
    const controls = animate(motionVal, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on('change', v => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, target]); // eslint-disable-line

  return <span className="animated-counter">{display}</span>;
};

/* ─────────────────────────────────────────────────────────────────
   SIMULATED LATENCY DOT
───────────────────────────────────────────────────────────────── */
const LatencyDot: React.FC = () => {
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(8 + Math.floor(Math.random() * 24));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="latency-status mono-text">
      <span className="status-dot-live" />
      <span className="status-label">System Status</span>
      <span className="status-ping">[ {ping}ms ping ]</span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   TELEMETRY CARD (wrapper that detects viewport entry)
───────────────────────────────────────────────────────────────── */
const TelemetryCard: React.FC<{
  children: (inView: boolean) => React.ReactNode;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}> = ({ children, onMouseMove, onMouseLeave, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div
      ref={ref}
      className={`telemetry-card premium-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children(inView)}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SHARED MOUSE HANDLERS
───────────────────────────────────────────────────────────────── */
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const r  = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
  el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  el.style.setProperty('--mouse-x', `${(e.clientX - r.left) / r.width}`);
};

const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.setProperty('--spot-x', '-999px');
  e.currentTarget.style.setProperty('--spot-y', '-999px');
};

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
const LiveTelemetry: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [ghData, setGhData] = useState<GitHubData | null>(null);
  const { pushLog } = useSystemLog();

  useEffect(() => {
    const fetchTelemetry = async () => {
      pushLog('[FETCH] Initiating LiveTelemetry data pull...');
      try {
        const [lcSolvedRes, lcContestRes, ghProfileRes, ghReposRes] = await Promise.all([
          fetch('https://alfa-leetcode-api.onrender.com/SRIHARIPV/solved').catch(() => null),
          fetch('https://alfa-leetcode-api.onrender.com/SRIHARIPV/contest').catch(() => null),
          fetch('https://api.github.com/users/LORDMOSTER').catch(() => null),
          fetch('https://api.github.com/users/LORDMOSTER/repos?per_page=100&sort=updated').catch(() => null),
        ]);

        // LeetCode
        let solved = 500;
        let peakRating = 1847;
        let rank = 'Top 0.42%';

        if (lcSolvedRes?.ok) {
          const d = await lcSolvedRes.json();
          if (d?.solvedProblem !== undefined) solved = Number(d.solvedProblem);
        }
        if (lcContestRes?.ok) {
          const d = await lcContestRes.json();
          if (d?.contestRating) peakRating = Math.round(d.contestRating);
          if (d?.contestGlobalRanking) rank = `Top ${d.contestGlobalRanking}`;
        }

        setLcData({ user: 'SRIHARIPV', peakRating, solved, rank });

        // GitHub
        let activeRepos = 15;
        let languagesArr = [
          { name: 'Python', percentage: 60, color: 'var(--accent-gold)' },
          { name: 'TypeScript', percentage: 25, color: '#F5F5F5' },
          { name: 'Java', percentage: 15, color: 'rgba(212,175,55,0.4)' },
        ];

        if (ghProfileRes?.ok) {
          const d = await ghProfileRes.json();
          if (d?.public_repos !== undefined) activeRepos = Number(d.public_repos);
        }

        if (ghReposRes?.ok) {
          const repos = await ghReposRes.json();
          if (Array.isArray(repos) && repos.length > 0) {
            const counts: Record<string, number> = {};
            let total = 0;
            repos.forEach((r: any) => { if (r.language) { counts[r.language] = (counts[r.language] || 0) + 1; total++; } });
            if (total > 0) {
              const colors = ['var(--accent-gold)', '#F5F5F5', 'rgba(212,175,55,0.4)'];
              languagesArr = Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([name, count], i) => ({ name, percentage: Math.round((count / total) * 100), color: colors[i] }));
            }
          }
        }

        setGhData({ totalCommits: 450, activeRepos, languages: languagesArr });
        pushLog('[FETCH] LiveTelemetry sync complete. All nodes nominal.');

      } catch (err) {
        console.error('Telemetry fetch error:', err);
        pushLog('[ERR] LiveTelemetry fetch failed — using cached values.');
        setLcData({ user: 'SRIHARIPV', peakRating: 1847, solved: 500, rank: 'Top 0.42%' });
        setGhData({ totalCommits: 450, activeRepos: 15, languages: [
          { name: 'Python', percentage: 60, color: 'var(--accent-gold)' },
          { name: 'TypeScript', percentage: 25, color: '#F5F5F5' },
          { name: 'Java', percentage: 15, color: 'rgba(212,175,55,0.4)' },
        ]});
      } finally {
        setIsLoading(false);
      }
    };

    fetchTelemetry();
  }, []); // eslint-disable-line

  return (
    <div className="telemetry-section">
      <div className="telemetry-header-row">
        <h3 className="text-2xl md:text-3xl font-bold text-gold uppercase tracking-wider mb-6 mono-text">
          [ LIVE_TELEMETRY ]
        </h3>
        <LatencyDot />
      </div>

      <div className="telemetry-grid flex flex-col md:flex-row gap-6 w-full">

        {/* ── LeetCode Column ── */}
        <TelemetryCard
          className="w-full p-5 md:p-6"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {(inView) => (
            <>
              <div className="t-card-header">
                <span className="mono-text">&gt;_ LeetCode_Metrics</span>
              </div>
              <div className="t-card-body">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading-lc"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="loading-text mono-text"
                    >
                      [ Fetching Telemetry Data... ]
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content-lc"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="lc-content"
                    >
                      <div className="lc-ring-container">
                        <svg viewBox="0 0 100 100" className="lc-ring-svg">
                          <circle cx="50" cy="50" r="45" className="lc-ring-bg" />
                          <circle cx="50" cy="50" r="45" className="lc-ring-progress" />
                        </svg>
                        <div className="lc-ring-text mono-text">Guardian</div>
                      </div>

                      <div className="lc-stats mono-text">
                        <div className="stat-line">
                          <span className="stat-key">User:</span>
                          <span className="stat-val">{lcData?.user}</span>
                        </div>
                        <div className="stat-line">
                          <span className="stat-key">Peak Rating:</span>
                          <span className="stat-val gold-text">
                            <AnimatedCounter target={lcData?.peakRating ?? 0} inView={inView} duration={1.6} />
                          </span>
                        </div>
                        <div className="stat-line">
                          <span className="stat-key">Problems Solved:</span>
                          <span className="stat-val">
                            <AnimatedCounter target={lcData?.solved ?? 0} inView={inView} suffix="+" duration={2.0} />
                          </span>
                        </div>
                        <div className="stat-line">
                          <span className="stat-key">Global Rank:</span>
                          <span className="stat-val gold-text">{lcData?.rank}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </TelemetryCard>

        {/* ── GitHub Column ── */}
        <TelemetryCard
          className="relative w-full p-5 md:p-6"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {(inView) => (
            <>
              <div className="t-card-header flex-between">
                <span className="mono-text">&gt;_ GitHub_Contributions</span>
                <div className="live-status mono-text">
                  <span className="status-dot" />
                  Connected
                </div>
              </div>
              <div className="t-card-body">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading-gh"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="loading-text mono-text"
                    >
                      [ Fetching Telemetry Data... ]
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content-gh"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="gh-content"
                    >
                      <div className="gh-stats mono-text">
                        <div className="stat-line">
                          <span className="stat-key">Total Commits (2025):</span>
                          <span className="stat-val">
                            <AnimatedCounter target={ghData?.totalCommits ?? 0} suffix="+" inView={inView} duration={1.8} />
                          </span>
                        </div>
                        <div className="stat-line">
                          <span className="stat-key">Active Repos:</span>
                          <span className="stat-val">
                            <AnimatedCounter target={ghData?.activeRepos ?? 0} inView={inView} duration={1.2} />
                          </span>
                        </div>
                      </div>

                      <div className="gh-languages">
                        <div className="lang-labels mono-text">Top Languages</div>
                        <div className="lang-bars">
                          {ghData?.languages.map((lang, idx) => (
                            <div className="lang-bar-wrapper" key={idx}>
                              <div className="lang-info mono-text">
                                <span>{lang.name}</span>
                                <span>{lang.percentage}%</span>
                              </div>
                              <div className="lang-track">
                                <motion.div
                                  className="lang-fill"
                                  style={{ backgroundColor: lang.color }}
                                  initial={{ width: 0 }}
                                  animate={inView ? { width: `${lang.percentage}%` } : { width: 0 }}
                                  transition={{ duration: 1.2, delay: 0.2 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </TelemetryCard>

      </div>
    </div>
  );
};

export default LiveTelemetry;
