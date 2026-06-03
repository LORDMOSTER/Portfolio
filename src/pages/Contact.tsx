import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, AlertCircle, Send, Mail, Phone } from 'lucide-react';
import './Contact.css';

const spotHandlers = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
  el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
};

const spotLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  el.style.setProperty('--spot-x', `-999px`);
  el.style.setProperty('--spot-y', `-999px`);
};

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-grid">
        {/* LEFT COLUMN: Direct Comms */}
        <div className="contact-info">
          <h1 className="contact-header">Let's Connect.</h1>
          <p className="contact-subtext text-muted">
            Currently open to backend and full-stack opportunities. Whether you have a question or just want to say hi, my inbox is open.
          </p>
          
          <div className="direct-contacts">
            <a href="mailto:hsri59145@gmail.com" className="contact-link">
              <Mail size={20} />
              <span className="mono-text">hsri59145@gmail.com</span>
            </a>
            <a href="tel:+918610581760" className="contact-link">
              <Phone size={20} />
              <span className="mono-text">+91 86105 81760</span>
            </a>
          </div>

          <div className="status-bento premium-card" onMouseMove={spotHandlers} onMouseLeave={spotLeave}>
            <h3 className="bento-title mono-text">Availability & Status</h3>
            <ul className="bento-list">
              <li>
                <span className="bento-icon">🟢</span>
                <span>Actively interviewing for Backend & Full-Stack roles.</span>
              </li>
              <li>
                <span className="bento-icon">📍</span>
                <span>Perundurai, Tamil Nadu (Open to Relocation)</span>
              </li>
              <li>
                <span className="bento-icon">🕒</span>
                <span>IST (UTC +5:30)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: The Simplified Form */}
        <div className="terminal-container premium-card mx-4 md:mx-0 w-auto md:w-full" onMouseMove={spotHandlers} onMouseLeave={spotLeave}>
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="t-btn close"></span>
              <span className="t-btn minimize"></span>
              <span className="t-btn expand"></span>
            </div>
            <div className="terminal-title mono-text">
              <Terminal size={14} className="terminal-icon" />
              SECURE_COMM_LINK.exe
            </div>
          </div>

          <div className="terminal-body">
            <p className="mono-text" style={{ color: '#A0A0A0', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              // INSTRUCTION: Use this terminal to route a direct message to my inbox. I typically respond within 24 hours.
            </p>
            <form 
              className="contact-form" 
              action="https://formspree.io/f/mrednodl" 
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="input-group">
                <label htmlFor="name" className="mono-text">Name</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="terminal-input mono-text w-full p-3 mb-4" 
                    placeholder="Enter your name..."
                    required 
                    disabled={status === 'submitting'}
                  />
                  <span className="cursor-blink">|</span>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="email" className="mono-text">Email</label>
                <div className="input-wrapper">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="terminal-input mono-text w-full p-3 mb-4" 
                    placeholder="Enter your email..."
                    required 
                    disabled={status === 'submitting'}
                  />
                  <span className="cursor-blink">|</span>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="message" className="mono-text">Message</label>
                <div className="input-wrapper">
                  <textarea 
                    id="message" 
                    name="message" 
                    className="terminal-input mono-text w-full min-h-[120px] p-3 text-base resize-y" 
                    rows={4}
                    placeholder="Type your message..."
                    required
                    disabled={status === 'submitting'}
                  ></textarea>
                  <span className="cursor-blink">|</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="execute-btn mono-text w-full md:w-auto mt-4"
                disabled={status === 'submitting'}
              >
                <Send size={16} />
                &gt; SEND_MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            className="toast success-toast"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <CheckCircle2 size={20} />
            <div className="toast-content mono-text">
              <strong>TRANSMISSION_SUCCESS</strong>
              <p>Payload delivered securely.</p>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div 
            className="toast error-toast"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <AlertCircle size={20} />
            <div className="toast-content mono-text">
              <strong>TRANSMISSION_FAILED</strong>
              <p>Connection lost. Try again.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
