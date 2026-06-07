import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
export interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
}

interface SystemLogContextValue {
  logs: LogEntry[];
  pushLog: (message: string) => void;
}

/* ─────────────────────────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────────────────────────── */
const SystemLogContext = createContext<SystemLogContextValue>({
  logs: [],
  pushLog: () => {},
});

const MAX_LOGS = 40;

const getTimestamp = (): string => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
};

/* ─────────────────────────────────────────────────────────────────
   PROVIDER
───────────────────────────────────────────────────────────────── */
export const SystemLogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const idRef = useRef(0);

  const pushLog = useCallback((message: string) => {
    const entry: LogEntry = {
      id: idRef.current++,
      timestamp: getTimestamp(),
      message,
    };
    setLogs(prev => {
      const next = [...prev, entry];
      return next.length > MAX_LOGS ? next.slice(next.length - MAX_LOGS) : next;
    });
  }, []);

  return (
    <SystemLogContext.Provider value={{ logs, pushLog }}>
      {children}
    </SystemLogContext.Provider>
  );
};

/* ─────────────────────────────────────────────────────────────────
   HOOK
───────────────────────────────────────────────────────────────── */
export const useSystemLog = (): SystemLogContextValue => useContext(SystemLogContext);
