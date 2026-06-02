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
      
      <div className="work-experience-stack">
        {experiences.map((exp) => (
          <motion.div 
            key={exp.id}
            className="experience-card"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="exp-top-row">
              <h4 className="exp-company">{exp.company}</h4>
              <span className="exp-duration mono-text">{exp.duration}</span>
            </div>
            <h5 className="exp-role">{exp.role}</h5>
            <p className="exp-details">{exp.details}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
