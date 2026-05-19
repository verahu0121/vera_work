import React, { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getProjectDetailHero, type PortfolioProject } from "../data/portfolioProjects";

// Icons are passed as paths or raw SVG strings
const ICONS = {
  PREV: (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
      <path d="M6.24595 12L0 6L6.24595 0H8.89968L3.60841 5.04935H15V6.96623H3.60841L8.89968 12H6.24595Z" fill="white" fillOpacity="0.7" />
    </svg>
  ),
  NEXT: (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
      <path d="M8.75405 12L15 6L8.75405 0H6.10032L11.3916 5.04935H-4.61411e-07V6.96623H11.3916L6.10032 12H8.75405Z" fill="white" fillOpacity="0.7" />
    </svg>
  )
};

export type ProjectData = PortfolioProject;

interface ProjectDetailModalProps {
  projects: ProjectData[];
  initialProjectId: string;
  onClose: () => void;
}

function ProjectInfo({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-col gap-[36px] w-full">
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] font-bold text-white/90">{project.title}</h2>
        <p className="text-[12px] text-white/30 uppercase tracking-wider">{project.date}</p>
      </div>
      <div className="h-px bg-white/10 w-full" />
      <p className="text-[14px] leading-[32px] text-white/50 text-justify">
        {project.description}
      </p>
    </div>
  );
}

function GalleryNav({ current, total, onPrev, onNext }: { current: number, total: number, onPrev: () => void, onNext: () => void }) {
  return (
    <div className="flex items-center justify-between w-full mt-auto">
      <button 
        onClick={onPrev}
        className="p-3 bg-white/10 rounded hover:bg-white/20 transition-colors cursor-pointer"
      >
        {ICONS.PREV}
      </button>
      <span className="text-white/50 text-[16px] font-bold tracking-[4px]">{current + 1}/{total}</span>
      <button 
        onClick={onNext}
        className="p-3 bg-white/10 rounded hover:bg-white/20 transition-colors cursor-pointer"
      >
        {ICONS.NEXT}
      </button>
    </div>
  );
}

function RightNavLink({ num, title, subtitle, active }: { num: string, title: string, subtitle: string, active?: boolean }) {
  return (
    <div className={`flex items-start gap-4 cursor-pointer group ${active ? 'opacity-100' : 'opacity-50 hover:opacity-80 transition-opacity'}`}>
      <div className="w-[56px] h-[56px] flex items-center justify-center text-[21px] font-bold text-white/80">
        {num}
      </div>
      <div className="py-2">
        <div className={`text-[16px] font-bold ${active ? 'text-white' : 'text-white/50'}`}>{title}</div>
        <div className={`text-[12px] ${active ? 'text-white/50' : 'text-white/30'}`}>{subtitle}</div>
      </div>
    </div>
  );
}

export function ProjectDetailModal({ projects, initialProjectId, onClose }: ProjectDetailModalProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = projects.findIndex(p => p.id === initialProjectId);
    return idx === -1 ? 0 : idx;
  });

  const currentProject = projects[currentIndex];
  const detailHero = getProjectDetailHero(currentProject);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  // Reset scroll position when project changes
  useEffect(() => {
    const contentArea = document.getElementById('project-modal-content');
    if (contentArea) contentArea.scrollTop = 0;
  }, [currentIndex]);

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex bg-[rgba(0,0,0,0.49)] animate-in fade-in duration-300">
      {/* Left Sidebar */}
      <div className="w-[256px] shrink-0 h-full bg-[rgba(0,0,0,0.01)] backdrop-blur-[24px] p-8 flex flex-col">
        <ProjectInfo project={currentProject} />
        <GalleryNav 
          current={currentIndex} 
          total={projects.length} 
          onPrev={handlePrev} 
          onNext={handleNext} 
        />
      </div>

      {/* Main Content Area */}
      <div id="project-modal-content" className="flex-1 min-w-[768px] h-full overflow-y-auto bg-[#e6e6e6] scrollbar-hide scroll-smooth">
        {/* Header inside content */}
        <div className="px-12 py-24" style={{ backgroundColor: detailHero.backgroundColor }}>
          <div className="text-[10px] tracking-[3px] mb-2 uppercase" style={{ color: detailHero.eyebrowColor }}>
            {detailHero.eyebrowText}
          </div>
          <h1 className="text-[64px] font-extrabold tracking-[-3.6px] leading-tight mb-2" style={{ color: detailHero.titleColor }}>
            {detailHero.titleText}
          </h1>
          <div className="text-[14px] tracking-[2px] uppercase" style={{ color: detailHero.subtitleColor }}>
            {detailHero.subtitleText}
          </div>
        </div>

        {/* Project Images */}
        <div className="flex flex-col">
          {currentProject.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${currentProject.title} ${idx + 1}`} className="w-full h-auto" />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[256px] shrink-0 h-full bg-[rgba(0,0,0,0.01)] backdrop-blur-[24px] p-8 flex flex-col gap-9">
        {/* Back Button */}
        <button 
          onClick={onClose}
          className="flex items-start gap-4 group cursor-pointer text-left w-full"
        >
          <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center group-hover:bg-white/30 transition-colors shrink-0">
            {ICONS.PREV}
          </div>
          <div className="py-1">
            <div className="text-[16px] font-bold text-white/50 group-hover:text-white/80 transition-colors">返回</div>
            <div className="text-[12px] text-white/30 uppercase tracking-tighter">GO BACK</div>
          </div>
        </button>

        <div className="h-px bg-white/10 w-full" />

        {/* Module Navigation */}
        <div className="flex flex-col gap-4">
          {currentProject.sections.map((section, idx) => (
            <RightNavLink 
              key={section.id} 
              num={section.id} 
              title={section.title} 
              subtitle={section.subtitle} 
              active={idx === 0} 
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
