import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/* Core components */
import FloatingNav     from './components/FloatingNav';
import CustomCursor    from './components/CustomCursor';
import CommandTerminal from './components/CommandTerminal';
import SystemLogFooter from './components/SystemLogFooter';

/* Pages */
import Home     from './pages/Home';
import Arsenal  from './pages/Arsenal';
import Contact  from './pages/Contact';
import Trophies from './pages/Trophies';

/* Contexts */
import { SystemLogProvider, useSystemLog } from './contexts/SystemLogContext';

import './index.css';

/* ─────────────────────────────────────────────────────────────────
   SCROLL TO TOP + TITLE + ROUTE LOGGING
───────────────────────────────────────────────────────────────── */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const { pushLog }  = useSystemLog();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';

    const titleMap: Record<string, string> = {
      '/':        'Home | SRIHARI PV',
      '/arsenal': 'Arsenal | SRIHARI PV',
      '/contact': 'Contact | SRIHARI PV',
      '/trophies':'Trophies | SRIHARI PV',
    };
    document.title = titleMap[pathname] || 'SRIHARI PV';
    pushLog(`[ROUTER] Navigated to ${pathname}`);
  }, [pathname]); // eslint-disable-line

  return null;
};

/* ─────────────────────────────────────────────────────────────────
   DOM MOUNT EVENT LOGGER
───────────────────────────────────────────────────────────────── */
const DomMountLogger: React.FC = () => {
  const { pushLog } = useSystemLog();

  useEffect(() => {
    pushLog('[SYS] DOM Mounted — Living Telemetry Engine v3.0 ready');
    pushLog('[SYS] CustomCursor initialized');
    pushLog('[SYS] FloatingNav docked');
  }, []); // eslint-disable-line

  return null;
};

/* ─────────────────────────────────────────────────────────────────
   TAB TELEMETRY HOOK — Document Visibility API
───────────────────────────────────────────────────────────────── */
const useTabTelemetry = (defaultTitle: string) => {
  const { pushLog } = useSystemLog();

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        document.title = '[SYS.SLEEP] Connection Lost...';
        pushLog('[WARN] User telemetry disconnected — tab hidden');
      } else {
        document.title = defaultTitle;
        pushLog('[INFO] Connection re-established — user returned');
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [defaultTitle]); // eslint-disable-line
};

/* ─────────────────────────────────────────────────────────────────
   TAB TELEMETRY MOUNT COMPONENT
───────────────────────────────────────────────────────────────── */
const TabTelemetry: React.FC = () => {
  const { pathname } = useLocation();
  const titleMap: Record<string, string> = {
    '/':        'Home | SRIHARI PV',
    '/arsenal': 'Arsenal | SRIHARI PV',
    '/contact': 'Contact | SRIHARI PV',
    '/trophies':'Trophies | SRIHARI PV',
  };
  useTabTelemetry(titleMap[pathname] || 'SRIHARI PV');
  return null;
};

/* ─────────────────────────────────────────────────────────────────
   PAGE TRANSITIONS
───────────────────────────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in:      { opacity: 1, x: 0  },
  out:     { opacity: 0, x: -50 },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.5,
};

const pageStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  padding: '2rem 4rem',
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const { pushLog } = useSystemLog();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition}
              style={pageStyle}
              onAnimationStart={() => pushLog('[RENDER] Home page mounted')}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/arsenal"
          element={
            <motion.div
              initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition}
              style={pageStyle}
              onAnimationStart={() => pushLog('[RENDER] Arsenal page mounted')}
            >
              <Arsenal />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition}
              style={pageStyle}
              onAnimationStart={() => pushLog('[RENDER] Contact page mounted')}
            >
              <Contact />
            </motion.div>
          }
        />
        <Route
          path="/trophies"
          element={
            <motion.div
              initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition}
              style={pageStyle}
              onAnimationStart={() => pushLog('[RENDER] Trophies — Hall of Records mounted')}
            >
              <Trophies />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────────── */
function App() {
  return (
    <SystemLogProvider>
      <Router>
        <ScrollToTop />
        <DomMountLogger />
        <TabTelemetry />
        <div className="app-container">
          <CustomCursor />
          <FloatingNav />
          {/* Global easter egg terminal */}
          <CommandTerminal />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
          {/* Fixed system log footer */}
          <SystemLogFooter />
        </div>
      </Router>
    </SystemLogProvider>
  );
}

export default App;
