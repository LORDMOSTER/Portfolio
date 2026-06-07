import React from 'react';

export interface ProjectData {
  id: number | string;
  title: string;
  icon?: React.ReactNode;
  tech: string[];
  description: string;
  github?: string;
}

interface Props {
  project: ProjectData;
}

const TacticalProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="flex flex-col justify-between h-full w-full p-6 md:p-8 bg-[#121212]/90 backdrop-blur-md border border-[#1A1A1A] rounded-2xl hover:border-[#D4AF37]/50 transition-colors duration-300 group shadow-lg">
      
      {/* Top Content */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          {project.icon && <span className="text-xl">{project.icon}</span>}
          <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
            {project.title}
          </h3>
        </div>
        
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tech Tags Container */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag: string) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-md whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 pt-4 border-t border-[#1A1A1A]/50">
        <a 
          href={project.github} 
          target="_blank" 
          rel="noreferrer"
          className="text-xs font-mono text-gray-500 group-hover:text-[#D4AF37] transition-colors flex items-center gap-2 w-max"
        >
          &gt; OPEN_DOSSIER
        </a>
      </div>
      
    </div>
  );
};

export default TacticalProjectCard;
