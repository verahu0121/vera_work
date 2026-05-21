import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  getProjectDetailHero,
  getProjectSectionImageSrc,
  getProjectSectionImages,
  getProjectSectionStableId,
  type PortfolioProject,
} from "../data/portfolioProjects";

const ICONS = {
  PREV: (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
      <path d="M6.24595 12L0 6L6.24595 0H8.89968L3.60841 5.04935H15V6.96623H3.60841L8.89968 12H6.24595Z" fill="white" fillOpacity="0.7" />
    </svg>
  ),
};

function ProjectInfo({ project }: { project: PortfolioProject }) {
  return (
    <div className="flex w-full flex-col gap-[36px]">
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] font-bold text-white/90">{project.title}</h2>
        <p className="text-[12px] uppercase tracking-wider text-white/30">{project.date}</p>
      </div>
      <div className="h-px w-full bg-white/10" />
      <p className="text-[14px] leading-[32px] text-justify text-white/50">
        {project.description}
      </p>
    </div>
  );
}

function RightNavLink({
  num,
  title,
  subtitle,
  active,
  onClick,
}: {
  num: string;
  title: string;
  subtitle: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex cursor-pointer items-start gap-4 text-left ${active ? "opacity-100" : "opacity-50 transition-opacity hover:opacity-80"}`}
    >
      <div className="flex h-[56px] w-[56px] items-center justify-center text-[21px] font-bold text-white/80">
        {num}
      </div>
      <div className="py-2">
        <div className={`text-[16px] font-bold ${active ? "text-white" : "text-white/50"}`}>{title}</div>
        <div className={`text-[12px] ${active ? "text-white/50" : "text-white/30"}`}>{subtitle}</div>
      </div>
    </button>
  );
}

export function ResumeProjectDetailView({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  const detailHero = getProjectDetailHero(project);
  const gallerySections = useMemo(() => {
    const sectionsWithImages = project.sections
      .map((section, index) => ({
        ...section,
        stableId: getProjectSectionStableId(project, index),
        images: getProjectSectionImages(project, index),
      }))
      .filter((section) => section.images.length > 0);

    if (sectionsWithImages.length > 0) {
      return sectionsWithImages;
    }

    return project.sections.slice(0, 1).map((section) => ({
      ...section,
      stableId: section.stableId || section.id,
      images: [],
    }));
  }, [project]);

  useEffect(() => {
    const contentArea = document.getElementById("resume-project-detail-content");
    if (contentArea) contentArea.scrollTop = 0;
  }, [project.id]);

  useEffect(() => {
    setActiveSectionId(gallerySections[0]?.stableId ?? gallerySections[0]?.id ?? "");
  }, [gallerySections, project.id]);

  useEffect(() => {
    const contentArea = document.getElementById("resume-project-detail-content");
    if (!contentArea || gallerySections.length === 0) return;

    const handleScroll = () => {
      const containerTop = contentArea.getBoundingClientRect().top;
      const nextActiveSection =
        gallerySections
          .map((section) => {
            const sectionId = section.stableId ?? section.id;
            const element = document.getElementById(`resume-project-section-${project.id}-${sectionId}`);
            if (!element) return null;

            return {
              id: sectionId,
              offset: element.getBoundingClientRect().top - containerTop,
            };
          })
          .filter((section): section is { id: string; offset: number } => Boolean(section))
          .filter((section) => section.offset <= 120)
          .sort((a, b) => b.offset - a.offset)[0]?.id ?? (gallerySections[0].stableId ?? gallerySections[0].id);

      setActiveSectionId(nextActiveSection);
    };

    handleScroll();
    contentArea.addEventListener("scroll", handleScroll, { passive: true });
    return () => contentArea.removeEventListener("scroll", handleScroll);
  }, [gallerySections, project.id]);

  const handleSectionClick = (sectionStableId: string) => {
    const sectionElement = document.getElementById(`resume-project-section-${project.id}-${sectionStableId}`);
    if (!sectionElement) return;

    sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSectionId(sectionStableId);
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex animate-in fade-in duration-300 bg-[rgba(0,0,0,0.49)]">
      <div className="flex h-full w-[256px] shrink-0 flex-col bg-[rgba(0,0,0,0.01)] p-8 backdrop-blur-[24px]">
        <ProjectInfo project={project} />
      </div>

      <div
        id="resume-project-detail-content"
        className="min-w-[768px] flex-1 overflow-y-auto bg-[#e6e6e6] scrollbar-hide scroll-smooth"
      >
        <div className="px-12 py-24" style={{ backgroundColor: detailHero.backgroundColor }}>
          <div className="mb-2 text-[10px] uppercase tracking-[3px]" style={{ color: detailHero.eyebrowColor }}>
            {detailHero.eyebrowText}
          </div>
          <h1 className="mb-2 text-[64px] font-extrabold leading-tight tracking-[-3.6px]" style={{ color: detailHero.titleColor }}>
            {detailHero.titleText}
          </h1>
          <div className="text-[14px] uppercase tracking-[2px]" style={{ color: detailHero.subtitleColor }}>
            {detailHero.subtitleText}
          </div>
        </div>

        <div className="flex flex-col">
          {gallerySections.map((section) => {
            const sectionId = section.stableId ?? section.id;
            return (
              <section
                key={`${project.id}-${sectionId}`}
                id={`resume-project-section-${project.id}-${sectionId}`}
                className="scroll-mt-6"
              >
                <div className="flex flex-col">
                  {section.images.map((image) => (
                    <img
                      key={image.id}
                      src={getProjectSectionImageSrc(image)}
                      alt={image.alt || `${project.title} ${section.id}`}
                      className="h-auto w-full"
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <div className="flex h-full w-[256px] shrink-0 flex-col gap-9 bg-[rgba(0,0,0,0.01)] p-8 backdrop-blur-[24px]">
        <button onClick={onClose} className="group flex w-full cursor-pointer items-start gap-4 text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/20 transition-colors group-hover:bg-white/30">
            {ICONS.PREV}
          </div>
          <div className="py-1">
            <div className="text-[16px] font-bold text-white/50 transition-colors group-hover:text-white/80">返回</div>
            <div className="text-[12px] uppercase tracking-tighter text-white/30">GO BACK</div>
          </div>
        </button>

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-col gap-4">
          {gallerySections.map((section, sectionIndex) => {
            const sectionId = section.stableId ?? section.id;
            return (
              <RightNavLink
                key={sectionId}
                num={String(sectionIndex + 1).padStart(2, "0")}
                title={section.title}
                subtitle={section.subtitle}
                active={activeSectionId === sectionId}
                onClick={() => handleSectionClick(sectionId)}
              />
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
