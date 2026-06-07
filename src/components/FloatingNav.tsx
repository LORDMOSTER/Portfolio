import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Folder, Trophy, Mail, TerminalSquare } from 'lucide-react';
import './FloatingNav.css';

const navItems = [
  { id: 'nav-home',     path: '/',        label: 'Home',     icon: <Home     size={18} /> },
  { id: 'nav-projects', path: '/arsenal', label: 'Projects', icon: <Folder   size={18} /> },
  { id: 'nav-trophies', path: '/trophies',label: 'Trophies', icon: <Trophy   size={18} /> },
  { id: 'nav-contact',  path: '/contact', label: 'Contact',  icon: <Mail     size={18} /> },
];

const FloatingNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="floating-nav-container">
      <nav className="floating-nav">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (location.pathname.startsWith(item.path) && item.path !== '/');

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-label mono-text">{item.label}</span>
              {isActive && <div className="nav-indicator" />}
            </Link>
          );
        })}
      </nav>
        <button
          onClick={() => window.dispatchEvent(new Event('terminal:open'))}
          className="terminal-launch-btn"
          title="Open Terminal"
        >
          <TerminalSquare size={18} />
          <span className="nav-label mono-text">Terminal</span>
        </button>
      </div>
  );
};

export default FloatingNav;
