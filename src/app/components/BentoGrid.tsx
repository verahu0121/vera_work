import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type ResumeExperienceGrid } from "../data/resumeContent";

export function BentoGrid({
  content,
  onOpenLinkedProject,
}: {
  content: ResumeExperienceGrid;
  onOpenLinkedProject?: (projectId: string) => void;
}) {
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
  const [activeProjectPage, setActiveProjectPage] = useState(0);
  const experiences = content.experiences;
  const activeExperience = experiences[activeExperienceIndex];
  const activeProjectSet =
    content.projectSets.find((projectSet) => projectSet.experienceStableId === activeExperience?.stableId) ??
    content.projectSets[0];
  const activeProjects = activeProjectSet?.items ?? [];
  const projectPages = useMemo(() => {
    const pages = [];
    for (let index = 0; index < activeProjects.length; index += 3) {
      pages.push(activeProjects.slice(index, index + 3));
    }
    return pages;
  }, [activeProjects]);
  const visibleProjects = projectPages[activeProjectPage] ?? [];

  useEffect(() => {
    setActiveProjectPage(0);
  }, [activeExperience?.stableId]);

  useEffect(() => {
    if (activeProjectPage > Math.max(projectPages.length - 1, 0)) {
      setActiveProjectPage(0);
    }
  }, [activeProjectPage, projectPages.length]);

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[426px] items-stretch justify-center max-w-[864px] mx-auto relative w-full overflow-hidden rounded-[2px] border border-[rgba(198,198,198,0.1)]">
      {/* Experience Section */}
      <div className="bg-[#ededed] flex-1 min-w-[320px] lg:min-w-[426px] h-full relative" data-name="Experience">
        <div className="flex flex-col gap-[32px] pt-[48px] px-[48px] pb-[24px] h-full">
          {/* Label Header */}
          <div className="shrink-0">
            <p className="font-['Manrope:Regular',sans-serif] text-[11px] tracking-[3.3px] uppercase text-[#5e5e5e] leading-[16.5px]">
              Experience
            </p>
          </div>
          {/* Experience List */}
          <div className="flex flex-col items-start relative w-full">
            {experiences.map((item, idx) => {
              const isActive = activeExperienceIndex === idx;
              return (
                <div 
                  key={item.stableId} 
                  onClick={() => {
                    setActiveExperienceIndex(idx);
                    setActiveProjectPage(0);
                  }}
                  className="flex gap-[16px] items-start pb-[36px] relative shrink-0 w-full cursor-pointer group"
                >
                  <div className={`flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[24px] w-[32px] transition-colors duration-300 ${isActive ? 'text-[#969696]' : 'text-[#c6c6c6]'}`}>
                    <p className="leading-[32px]">{item.numberLabel}</p>
                  </div>
                  <div className="flex flex-1 flex-col gap-[4px] items-start pb-[25px] relative">
                    {idx < experiences.length - 1 && (
                      <div aria-hidden="true" className="absolute border-b border-solid border-[rgba(198,198,198,0.2)] inset-0 pointer-events-none" />
                    )}
                    <div className="relative shrink-0 w-full">
                      <div className="flex items-baseline justify-between relative w-full whitespace-nowrap">
                        <div className={`flex flex-col font-['OPPOSans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[14px] transition-colors duration-300 ${isActive ? 'text-[#1a1c1c]' : 'text-[#969696]'}`}>
                          <p className="leading-[20px]">{item.company}</p>
                        </div>
                        <div className={`flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[10px] text-right uppercase transition-colors duration-300 ${isActive ? 'text-[#5e5e5e]' : 'text-[#969696]'}`}>
                          <p className="leading-[15px]">{item.period}</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative shrink-0 w-full">
                      <div className="flex flex-col items-start relative w-full">
                        <div className={`flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[11px] tracking-[0.55px] uppercase w-full transition-colors duration-300 ${isActive ? 'text-[#474747]' : 'text-[#a8a8a8]'}`}>
                          <p className="leading-[16.5px]">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Section */}
      <div className="bg-[#f2f2f2] flex-1 min-w-[320px] lg:min-w-[426px] h-full relative" data-name="Project">
        <div className="flex flex-col gap-[32px] pt-[48px] px-[48px] pb-[24px] h-full">
          {/* Label Header */}
          <div className="shrink-0">
            <p className="font-['Manrope:Regular',sans-serif] text-[11px] tracking-[3.3px] uppercase text-[#5e5e5e] leading-[16.5px]">
              Project
            </p>
          </div>
          {/* Project List */}
          <div className="flex flex-col gap-[24px] items-start relative w-full flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProjectSet?.stableId ?? activeExperienceIndex}-${activeProjectPage}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-[32px] w-full"
              >
                {visibleProjects.map((proj) => {
                  const isLinked = Boolean(proj.linkedPortfolioProjectId);

                  return (
                    <div
                      key={proj.stableId}
                      role={isLinked ? "button" : undefined}
                      tabIndex={isLinked ? 0 : undefined}
                      aria-label={isLinked ? `Open linked project for ${proj.title}` : undefined}
                      title={isLinked ? "Open linked project" : undefined}
                      onClick={() => {
                        if (proj.linkedPortfolioProjectId) {
                          onOpenLinkedProject?.(proj.linkedPortfolioProjectId);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (!isLinked) return;
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onOpenLinkedProject?.(proj.linkedPortfolioProjectId!);
                        }
                      }}
                      className={`group relative flex w-full shrink-0 flex-col items-start gap-[5px] text-left ${
                        isLinked ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <div className="relative flex w-full shrink-0 items-center justify-between">
                        <div
                          className={`relative flex shrink-0 flex-col justify-center whitespace-nowrap font-['OPPOSans:Bold',sans-serif] text-[14px] font-bold uppercase tracking-[-0.35px] text-[#5e5e5e] ${
                            isLinked ? "transition-transform group-hover:translate-x-1" : ""
                          }`}
                        >
                          <p className="leading-[20px]">{proj.title}</p>
                        </div>
                        {isLinked && (
                          <div className="relative size-[20px] shrink-0 transition-transform group-hover:translate-x-1">
                            <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                              <path d="M14.5034 6.5L13.8114 7.19204L16.0973 9.47792L11.5255 9.47792L11 10.0034L11.5255 10.5289H16.0836L13.8045 12.808L14.4966 13.5L18 9.99657L14.5034 6.5Z" fill="#1A1C1C" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="relative flex w-full shrink-0 flex-col items-start">
                        <div
                          className={`relative flex min-h-[39px] w-full shrink-0 flex-col justify-center font-['OPPOSans:Regular',sans-serif] text-[12px] text-justify ${
                            isLinked ? "text-[#363838]" : "text-[#888888]"
                          }`}
                        >
                          <p className="leading-[20px]">{proj.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Pagination dots */}
          <div className="mt-auto flex gap-[12px] items-center justify-center relative w-full pb-[8px]">
            {projectPages.map((_, idx) => (
              <button
                key={`${activeExperience?.stableId ?? "experience"}-page-${idx}`}
                onClick={() => setActiveProjectPage(idx)}
                className="block cursor-pointer relative shrink-0 size-[8px] outline-none group"
              >
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" fill={activeProjectPage === idx ? "#1A1C1C" : "#D9D9D9"} className="transition-colors duration-300 group-hover:fill-[#1A1C1C]" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
