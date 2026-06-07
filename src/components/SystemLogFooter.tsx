import React, { useRef, useEffect } from 'react';
import { useSystemLog } from '../contexts/SystemLogContext';
import './SystemLogFooter.css';

const SystemLogFooter: React.FC = () => {
  const { logs } = useSystemLog();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest log
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [logs]);

  const latest = logs[logs.length - 1];

  return (
    <div className="syslog-footer" role="log" aria-live="polite" aria-label="System Log">
      <div className="syslog-badge">SYS_LOG</div>
      <div className="syslog-scroll" ref={scrollRef}>
        <div className="syslog-inner">
          {logs.map((entry, idx) => (
            <span key={entry.id} className={`syslog-entry ${idx === logs.length - 1 ? 'syslog-entry--latest' : ''}`}>
              <span className="syslog-ts">{entry.timestamp}</span>
              <span className="syslog-msg">{entry.message}</span>
              {idx < logs.length - 1 && <span className="syslog-sep">·</span>}
            </span>
          ))}
          {latest && <span className="syslog-cursor" />}
        </div>
      </div>
      <div className="syslog-status">
        <span className="syslog-dot" />
        <span className="syslog-online mono-text">LIVE</span>
      </div>
    </div>
  );
};

export default SystemLogFooter;
