import React from 'react';
import { motion } from 'framer-motion';
import './WorkExperience.css';

const experiences = [
  {
    id: 1,
    company: "Google Developers Group (GDG On Campus)",
    role: "Software Lead & Cloud Team Lead (GCP)",
    duration: "[ OCT 2025 - PRESENT ]",
    details: "Leading technical architecture and cloud deployments. Directing a team to build and scale serverless applications on the Google Cloud Platform, while managing core software infrastructure."
  },
  {
    id: 2,
    company: "Indian Institute of Technology (IIT), Ropar",
    role: "MERN Stack Engineering Intern",
    duration: "[ DEC 2025 - JAN 2026 ]",
    details: "Engineered full-stack web architectures utilizing MongoDB, Express.js, React, and Node.js. Optimized backend REST APIs and integrated responsive front-end components for high-performance applications."
  },
  {
    id: 3,
    company: "EANS Technologies",
    role: "Backend Developer Intern",
    duration: "[ JUN 2025 ]",
    details: "Architected and maintained low-latency backend systems. Handled database schemas, server-side routing, and optimized query execution for enterprise applications."
  }
];

const WorkExperience: React.FC = () => {
  return (
    <div className="work-experience-section">
      <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] uppercase tracking-wider mb-6 mono-text">&gt;&gt; WORK_EXPERIENCE</h3>

      <div className="work-experience-stack flex flex-col space-y-10 md:space-y-12 w-full">
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            className="experience-card premium-card"
            onMouseMove={e => { const el = e.currentTarget; const r = el.getBoundingClientRect(); el.style.setProperty('--spot-x', `${e.clientX - r.left}px`); el.style.setProperty('--spot-y', `${e.clientY - r.top}px`); }}
            onMouseLeave={e => { e.currentTarget.style.setProperty('--spot-x', '-999px'); e.currentTarget.style.setProperty('--spot-y', '-999px'); }}
            style={{ padding: '24px' }}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3 w-full">
              <h4 className="exp-company">{exp.company}</h4>
              <span className="exp-duration mono-text shrink-0">{exp.duration}</span>
            </div>
            <h5 className="exp-role leading-relaxed text-sm md:text-base">{exp.role}</h5>
            <p className="exp-details pl-4 md:pl-0 text-sm leading-relaxed text-justify">{exp.details}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
