import React, { useEffect, useState } from 'react';
import svgPaths from "../../imports/SelectCases-2/svg-dzdmc49l85";
import { ProjectDetailModal, ProjectData } from "./ProjectDetailModal";

function Heading() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="h-[57.6px] relative shrink-0 w-[72.289px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.2894 57.6">
          <g id="Vector">
            <path d={svgPaths.p9261b72} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1768f880} fill="var(--fill-0, black)" />
          </g>
        </svg>
      </div>
      <div className="h-[68.976px] relative shrink-0 w-[141.192px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 141.192 68.976">
          <g id="Vector">
            <path d={svgPaths.p5cf8700} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2b5e9300} fill="var(--fill-0, black)" />
          </g>
        </svg>
      </div>
      <div className="h-[70.704px] relative shrink-0 w-[285.48px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 285.48 70.704">
          <g id="Vector">
            <path d={svgPaths.p2fb9af00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p312a75c0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3a7c200} fill="var(--fill-0, black)" />
            <path d={svgPaths.p37fb1cf0} fill="var(--fill-0, black)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[18px] w-full">
        <p className="leading-[32px]">以实践丰盈阅历，以成长奔赴热爱，在 AI 赛道慢慢沉淀，步步生辉。</p>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start min-w-[864px] relative shrink-0 w-[864px]" data-name="Header Section">
      <Heading />
      <Container />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#ddd] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[12px] py-[4px] relative">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">{children}</p>
        </div>
      </div>
    </div>
  );
}

function LinkIcon() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.pce77c00} fill="var(--fill-0, #1A1C1C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="content-stretch flex gap-[8px] items-center pb-[5px] relative shrink-0 group" 
      data-name="Link" 
      onClick={onClick}
      style={{ cursor: `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7' cy='7' r='6.5' fill='%231A1C1C' stroke='%23E6E6E6'/%3E%3C/svg%3E") 7 7, pointer` }}
    >
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none group-hover:border-[#5e5e5e] transition-colors duration-300" />
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[13px] uppercase whitespace-nowrap group-hover:text-[#5e5e5e] transition-colors duration-300">
        <p className="leading-[20px]">VIEW CASE STUDY</p>
      </div>
      <LinkIcon />
    </div>
  );
}

function ProjectItem({ project, reverse, onOpen }: { project: ProjectData, reverse?: boolean, onOpen: (id: string) => void }) {
  const content = (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[12px] tracking-[2.4px] uppercase w-full">
        <p className="leading-[16px]">{`PROJECT ${project.id} / ${project.date.split('-')[0]}`}</p>
      </div>
      <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black w-full">
        <p className="leading-[40px]">{project.title}</p>
      </div>
      <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#1a1c1c] text-[14px] w-[min-content]">
        <p className="leading-[32px]">{project.description}</p>
      </div>
      <div className="content-stretch flex gap-[8px] h-[23px] items-start relative shrink-0 w-full pt-[8px]">
        {project.tags.slice(0, 3).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="pt-[16px]">
        <Link onClick={() => onOpen(project.id)} />
      </div>
    </div>
  );

  const image = (
    <div className="h-[290px] overflow-clip relative rounded-[2px] shrink-0 w-[464px] bg-[#f5f5f5]">
      <img alt={project.title} className="absolute inset-0 max-w-none object-cover size-full" src={project.coverImage || project.images[0]} />
    </div>
  );

  return (
    <div className="content-stretch flex gap-[64px] items-start pt-[32px] relative shrink-0 w-full">
      {reverse ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </div>
  );
}

export function AIProductContent({
  projects,
  externalOpenRequest,
  onExternalOpenHandled,
}: {
  projects: ProjectData[];
  externalOpenRequest?: { projectId: string; requestKey: number } | null;
  onExternalOpenHandled?: () => void;
}) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (!externalOpenRequest) return;
    if (!projects.some((project) => project.id === externalOpenRequest.projectId)) return;

    setSelectedProjectId(externalOpenRequest.projectId);
    onExternalOpenHandled?.();
  }, [externalOpenRequest, onExternalOpenHandled, projects]);

  return (
    <div className="bg-[#e6e6e6] content-stretch flex flex-col gap-[108px] items-center px-[80px] py-[128px] relative w-full" data-name="select cases">
      <div className="flex flex-col gap-[108px] items-start w-full max-w-[864px]">
        <HeaderSection />
        
        <div className="content-stretch flex flex-col gap-[128px] items-start min-w-[864px] relative shrink-0 w-full">
          {projects.map((project, idx) => (
            <ProjectItem 
              key={project.id} 
              project={project} 
              reverse={idx % 2 !== 0} 
              onOpen={setSelectedProjectId} 
            />
          ))}
        </div>
      </div>

      {selectedProjectId && (
        <ProjectDetailModal 
          projects={projects} 
          initialProjectId={selectedProjectId} 
          onClose={() => {
            setSelectedProjectId(null);
            onExternalOpenHandled?.();
          }} 
        />
      )}
    </div>
  );
}
