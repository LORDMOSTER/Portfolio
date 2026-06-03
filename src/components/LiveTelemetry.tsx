import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LiveTelemetry.css';

interface LeetCodeData {
  user: string;
  peakRating: string;
  solved: string;
  rank: string;
}

interface GitHubData {
  totalCommits: string;
  activeRepos: string;
  languages: { name: string; percentage: number; color: string }[];
}

const LiveTelemetry: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [ghData, setGhData] = useState<GitHubData | null>(null);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const [lcSolvedRes, lcContestRes, ghProfileRes, ghReposRes] = await Promise.all([
          fetch('https://alfa-leetcode-api.onrender.com/SRIHARIPV/solved').catch(() => null),
          fetch('https://alfa-leetcode-api.onrender.com/SRIHARIPV/contest').catch(() => null),
          fetch('https://api.github.com/users/LORDMOSTER').catch(() => null),
          fetch('https://api.github.com/users/LORDMOSTER/repos?per_page=100&sort=updated').catch(() => null)
        ]);

        // Parse Leetcode Data
        let solved = '500+ (Cached)';
        let peakRating = '2,345 (Cached)';
        let rank = 'Top 0.42% (Cached)';

        if (lcSolvedRes && lcSolvedRes.ok) {
          const solvedData = await lcSolvedRes.json();
          if (solvedData && solvedData.solvedProblem !== undefined) {
            solved = String(solvedData.solvedProblem);
          }
        }
        
        if (lcContestRes && lcContestRes.ok) {
          const contestData = await lcContestRes.json();
          if (contestData && contestData.contestRating) {
            peakRating = String(Math.round(contestData.contestRating));
          }
          if (contestData && contestData.contestGlobalRanking) {
            rank = `Top ${contestData.contestGlobalRanking}`;
          }
        }

        setLcData({
          user: 'SRIHARIPV',
          peakRating,
          solved,
          rank
        });

        // Parse Github Data
        let activeRepos = '15+ (Cached)';
        let languagesArr = [
          { name: 'Python', percentage: 60, color: 'var(--accent-gold)' },
          { name: 'TypeScript', percentage: 25, color: '#F5F5F5' },
          { name: 'Java', percentage: 15, color: 'rgba(212, 175, 55, 0.4)' }
        ];

        if (ghProfileRes && ghProfileRes.ok) {
          const profileData = await ghProfileRes.json();
          if (profileData && profileData.public_repos !== undefined) {
            activeRepos = String(profileData.public_repos);
          }
        }

        if (ghReposRes && ghReposRes.ok) {
          const reposData = await ghReposRes.json();
          if (Array.isArray(reposData) && reposData.length > 0) {
            const langCounts: Record<string, number> = {};
            let totalLangs = 0;
            
            reposData.forEach((repo: any) => {
              if (repo.language) {
                langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
                totalLangs++;
              }
            });

            if (totalLangs > 0) {
              const sortedLangs = Object.entries(langCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);
                
              const colors = ['var(--accent-gold)', '#F5F5F5', 'rgba(212, 175, 55, 0.4)'];
              
              languagesArr = sortedLangs.map(([name, count], index) => ({
                name,
                percentage: Math.round((count / totalLangs) * 100),
                color: colors[index] || colors[0]
              }));
            }
          }
        }

        setGhData({
          totalCommits: '450+', // Cannot easily fetch via REST without GraphQL
          activeRepos,
          languages: languagesArr
        });

      } catch (err) {
        console.error("Telemetry fetch error:", err);
        // Fallbacks are handled by initial state declarations or cached assignments above
      } finally {
        setIsLoading(false);
      }
    };

    fetchTelemetry();
  }, []);

  return (
    <div className="telemetry-section">
      <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">[ LIVE_TELEMETRY ]</h3>
      
      <div className="telemetry-grid flex flex-col md:flex-row gap-6 w-full">
        {/* LEETCODE COLUMN */}
        <div className="telemetry-card premium-card w-full p-5 md:p-6"
          onMouseMove={e => { const el = e.currentTarget; const r = el.getBoundingClientRect(); el.style.setProperty('--spot-x', `${e.clientX - r.left}px`); el.style.setProperty('--spot-y', `${e.clientY - r.top}px`); }}
          onMouseLeave={e => { e.currentTarget.style.setProperty('--spot-x', '-999px'); e.currentTarget.style.setProperty('--spot-y', '-999px'); }}
        >
          <div className="t-card-header">
            <span className="mono-text">&gt;_ LeetCode_Metrics</span>
          </div>
          
          <div className="t-card-body">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading-lc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="loading-text mono-text"
                >
                  [ Fetching Telemetry Data... ]
                </motion.div>
              ) : (
                <motion.div 
                  key="content-lc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
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
                      <span className="stat-key break-words">User:</span>
                      <span className="stat-val break-words">{lcData?.user}</span>
                    </div>
                    <div className="stat-line">
                      <span className="stat-key break-words">Peak Rating:</span>
                      <span className="stat-val break-words">{lcData?.peakRating}</span>
                    </div>
                    <div className="stat-line">
                      <span className="stat-key break-words">Problems Solved:</span>
                      <span className="stat-val break-words">{lcData?.solved}</span>
                    </div>
                    <div className="stat-line">
                      <span className="stat-key break-words">Global Rank:</span>
                      <span className="stat-val gold-text break-words">{lcData?.rank}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* GITHUB COLUMN */}
        <div className="telemetry-card premium-card relative w-full p-5 md:p-6"
          onMouseMove={e => { const el = e.currentTarget; const r = el.getBoundingClientRect(); el.style.setProperty('--spot-x', `${e.clientX - r.left}px`); el.style.setProperty('--spot-y', `${e.clientY - r.top}px`); }}
          onMouseLeave={e => { e.currentTarget.style.setProperty('--spot-x', '-999px'); e.currentTarget.style.setProperty('--spot-y', '-999px'); }}
        >
          <div className="t-card-header flex-between">
            <span className="mono-text">&gt;_ GitHub_Contributions</span>
            <div className="live-status mono-text">
              <span className="status-dot"></span>
              Connected
            </div>
          </div>
          
          <div className="t-card-body">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading-gh"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="loading-text mono-text"
                >
                  [ Fetching Telemetry Data... ]
                </motion.div>
              ) : (
                <motion.div 
                  key="content-gh"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="gh-content"
                >
                  <div className="gh-stats mono-text">
                    <div className="stat-line">
                      <span className="stat-key">Total Commits (2025):</span>
                      <span className="stat-val">{ghData?.totalCommits}</span>
                    </div>
                    <div className="stat-line">
                      <span className="stat-key">Active Repos:</span>
                      <span className="stat-val">{ghData?.activeRepos}</span>
                    </div>
                  </div>

                  <div className="gh-languages">
                    <div className="lang-labels mono-text">
                      Top Languages
                    </div>
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
                              animate={{ width: `${lang.percentage}%` }}
                              transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
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
        </div>
      </div>
    </div>
  );
};

export default LiveTelemetry;
