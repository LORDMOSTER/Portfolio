import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SystemThread.css';

const navItems = [
  { id: 'Thread_01', path: '/', label: 'Root' },
  { id: 'Thread_02', path: '/arsenal', label: 'Arsenal' },
  { id: 'Thread_03', path: '/contact', label: 'Comm-Link' }
];

const SystemThread: React.FC = () => {
  const location = useLocation();

  return (
    <div className="system-thread-container">
      <div className="nav-header mono-text">[ NAVIGATION ]</div>
      <div className="thread-line">
        <div className="thread-rail"></div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
          
          return (
            <Link key={item.id} to={item.path} className={`thread-node ${isActive ? 'active' : ''}`}>
              <div className="node-marker">
                {isActive && (
                  <motion.div 
                    className="active-glow"
                    layoutId="activeGlow"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <div className="node-label mono-text">
                <span className="node-id">{item.id}</span>
                <span className="node-separator">//</span>
                <span className="node-text">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SystemThread;
