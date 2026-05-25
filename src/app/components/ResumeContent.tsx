import React, { useEffect, useRef } from "react";
import { BentoGrid } from "./BentoGrid";
import { AiProducts } from "./AiProducts";
import { UxCase } from "./UxCase";
import { Education } from "./Education";
import imgVeraPortrait from "figma:asset/c2a725be084d36e42b2de03b1df60b14cc7638a2.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { type ResumeContentData } from "../data/resumeContent";

function VeraPortrait({ src }: { src?: string }) {
  return (
    <div className="relative size-full overflow-hidden" data-name="Vera portrait">
      <ImageWithFallback
        alt=""
        className="absolute inset-0 size-full object-cover object-center"
        src={src || imgVeraPortrait}
      />
    </div>
  );
}

function Background({ portraitImage }: { portraitImage?: string }) {
  return (
    <div
      className="relative h-[384px] w-[288px] shrink-0 overflow-hidden bg-[#eee]"
      data-name="Background"
    >
      <VeraPortrait src={portraitImage} />
    </div>
  );
}

function Heading({ chineseName, englishName }: { chineseName: string; englishName: string }) {
  return (
    <div className="content-stretch flex gap-[8px] items-start leading-[0] relative shrink-0 text-[48px] text-black w-full whitespace-nowrap" data-name="Heading 2">
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[48px]">{chineseName}</p>
      </div>
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[48px]">·</p>
      </div>
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center relative shrink-0">
        <p className="leading-[48px]">{englishName}</p>
      </div>
    </div>
  );
}

function Container1({ roleSubtitle }: { roleSubtitle: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[18px] tracking-[1.8px] uppercase w-full">
        <p className="leading-[28px]">{roleSubtitle}</p>
      </div>
    </div>
  );
}

function Frame({
  chineseName,
  englishName,
  roleSubtitle,
}: {
  chineseName: string;
  englishName: string;
  roleSubtitle: string;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Heading chineseName={chineseName} englishName={englishName} />
      <Container1 roleSubtitle={roleSubtitle} />
    </div>
  );
}

function Heading1({ aboutLabel }: { aboutLabel: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[11px] tracking-[3.3px] uppercase w-full">
        <p className="leading-[16.5px]">{aboutLabel}</p>
      </div>
    </div>
  );
}

function Container3({ aboutTextEn }: { aboutTextEn: string }) {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] text-justify w-full">
        <p className="leading-[24px]">{aboutTextEn}</p>
      </div>
    </div>
  );
}

function Container4({ aboutTextZh }: { aboutTextZh: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[14px] text-justify uppercase w-full">
        <p className="leading-[24px]">{aboutTextZh}</p>
      </div>
    </div>
  );
}

function Container2({
  aboutLabel,
  aboutTextEn,
  aboutTextZh,
}: {
  aboutLabel: string;
  aboutTextEn: string;
  aboutTextZh: string;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[14.8px] items-start pt-[39px] relative shrink-0 w-full" data-name="Container">
      <Heading1 aboutLabel={aboutLabel} />
      <Container3 aboutTextEn={aboutTextEn} />
      <Container4 aboutTextZh={aboutTextZh} />
    </div>
  );
}

function Container({ profile }: { profile: ResumeContentData["profile"] }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start justify-between py-[16px] relative size-full">
        <Frame
          chineseName={profile.chineseName}
          englishName={profile.englishName}
          roleSubtitle={profile.roleSubtitle}
        />
        <Container2
          aboutLabel={profile.aboutLabel}
          aboutTextEn={profile.aboutTextEn}
          aboutTextZh={profile.aboutTextZh}
        />
      </div>
    </div>
  );
}

function ProfileHeaderSection({ profile }: { profile: ResumeContentData["profile"] }) {
  return (
    <div className="flex flex-col lg:flex-row gap-[64px] items-start max-w-[1024px] min-w-full lg:min-w-[864px] relative shrink-0 w-full" data-name="Profile Header Section">
      <Background portraitImage={profile.portraitImage} />
      <Container profile={profile} />
    </div>
  );
}

export function ResumeContent({
  activeTab,
  onActiveSectionChange,
  content,
  onOpenLinkedProject,
  onNavigateToAiProduct,
  onNavigateToUxDesign,
}: {
  activeTab: string,
  onActiveSectionChange?: (tab: string) => void
  content: ResumeContentData
  onOpenLinkedProject?: (projectId: string) => void
  onNavigateToAiProduct?: () => void
  onNavigateToUxDesign?: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const aiProductsRef = useRef<HTMLDivElement>(null);
  const uxCaseRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  
  // Highlighting logic refs
  const lastReportedTab = useRef(activeTab);
  const isInternalUpdate = useRef(false);
  const isClickScrolling = useRef(false);

  // Scroll to section function
  const scrollToSection = (tab: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      'about me': aboutMeRef,
      'AI Products': aiProductsRef,
      'UX Case': uxCaseRef,
      'education': educationRef,
    };

    const targetRef = refs[tab];
    if (targetRef?.current && containerRef.current) {
      isClickScrolling.current = true;
      const top = targetRef.current.offsetTop;
      containerRef.current.scrollTo({ top, behavior: 'smooth' });
      
      // Clear the "programmatic scroll" state after animation finishes
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    }
  };

  // 1. External trigger: Handle clicks from sidebar
  // We use a custom event because state might not change if clicking the same item
  useEffect(() => {
    const handleNavClick = (e: any) => {
      const targetTab = e.detail?.tab || activeTab;
      scrollToSection(targetTab);
    };

    window.addEventListener('resume-nav-click', handleNavClick);
    return () => window.removeEventListener('resume-nav-click', handleNavClick);
  }, [activeTab]);

  // 2. Highlighting Logic: Scroll Listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Don't update highlight while we are scrolling due to a click
      if (isClickScrolling.current) return;

      const viewportTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const viewportBottom = viewportTop + viewportHeight;

      const sections = [
        { id: 'about me', ref: aboutMeRef },
        { id: 'AI Products', ref: aiProductsRef },
        { id: 'UX Case', ref: uxCaseRef },
        { id: 'education', ref: educationRef },
      ];

      let bestSection = lastReportedTab.current;
      let maxOccupancy = 0;

      sections.forEach(section => {
        if (!section.ref.current) return;
        
        const rectTop = section.ref.current.offsetTop;
        const rectHeight = section.ref.current.offsetHeight;
        const rectBottom = rectTop + rectHeight;

        // Calculate how many pixels of this section are visible in the viewport
        const visibleTop = Math.max(viewportTop, rectTop);
        const visibleBottom = Math.min(viewportBottom, rectBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Occupancy = fraction of the viewport height taken by this section
        const occupancy = visibleHeight / viewportHeight;

        if (occupancy > maxOccupancy) {
          maxOccupancy = occupancy;
          bestSection = section.id;
        }
      });

      // User's rule: If a section occupies > 80% of screen height, it must be the one.
      // If none occupy 80%, we just took the max occupancy one above.
      
      if (bestSection !== lastReportedTab.current && maxOccupancy > 0.1) {
        lastReportedTab.current = bestSection;
        if (onActiveSectionChange) {
          // Tell parent to update the sidebar highlight
          onActiveSectionChange(bestSection);
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to sync highlight
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [onActiveSectionChange]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        <div className="flex flex-col gap-[72px] items-start px-[40px] md:px-[80px] py-[72px] relative w-full lg:w-[1024px]" ref={aboutMeRef}>
          <ProfileHeaderSection profile={content.profile} />
          <div className="flex flex-col items-stretch relative w-full">
            <BentoGrid content={content.experienceGrid} onOpenLinkedProject={onOpenLinkedProject} />
          </div>
        </div>
      </div>
      <div ref={aiProductsRef} className="w-full">
        <AiProducts
          content={content.aiProducts}
          onNavigateToAiProduct={onNavigateToAiProduct}
          onNavigateToUxDesign={onNavigateToUxDesign}
          onOpenLinkedProject={onOpenLinkedProject}
        />
      </div>
      <div ref={uxCaseRef} className="w-full">
        <UxCase content={content.uxCase} onOpenLinkedProject={onOpenLinkedProject} />
      </div>
      <div ref={educationRef} className="w-full">
        <Education content={content.education} />
      </div>
    </div>
  );
}
