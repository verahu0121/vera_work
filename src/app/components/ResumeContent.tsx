import React, { useEffect, useRef } from "react";
import { BentoGrid } from "./BentoGrid";
import { AiProducts } from "./AiProducts";
import { UxCase } from "./UxCase";
import { Education } from "./Education";
import imgVeraPortrait from "figma:asset/c2a725be084d36e42b2de03b1df60b14cc7638a2.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function VeraPortrait() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Vera portrait">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback alt="" className="absolute h-full left-[-16.67%] max-w-none top-0 w-[133.33%]" src={imgVeraPortrait} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#eee] content-stretch flex flex-col h-[384px] items-start justify-center overflow-clip relative shrink-0 w-[288px]" data-name="Background">
      <VeraPortrait />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex gap-[8px] items-start leading-[0] relative shrink-0 text-[48px] text-black w-full whitespace-nowrap" data-name="Heading 2">
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[48px]">胡雨琪</p>
      </div>
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[48px]">·</p>
      </div>
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center relative shrink-0">
        <p className="leading-[48px]">VERA</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[18px] tracking-[1.8px] uppercase w-full">
        <p className="leading-[28px]">{`AI Product Manager & Experience Designer`}</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Heading />
      <Container1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[11px] tracking-[3.3px] uppercase w-full">
        <p className="leading-[16.5px]">About Me</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] text-justify w-full">
        <p className="leading-[24px]">{`As an AI Product Manager & Experience Designer, I don’t just build products or design interfaces. I translate complex intelligence into human-centered experiences, turning technical possibilities into real, gentle value for people.`}</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[14px] text-justify uppercase w-full">
        <p className="leading-[24px]">作为 AI 产品经理与体验设计师，我不只是构建产品、设计界面。我用产品逻辑梳理复杂的脉络，用体验设计打磨每一个细节，将ai能力转化为以人为中心、可感易用的产品，把技术的可能性，变成真正贴近人、服务人、温暖人的实用价值。</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[14.8px] items-start pt-[39px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start justify-between py-[16px] relative size-full">
        <Frame />
        <Container2 />
      </div>
    </div>
  );
}

function ProfileHeaderSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-[64px] items-start max-w-[1024px] min-w-full lg:min-w-[864px] relative shrink-0 w-full" data-name="Profile Header Section">
      <Background />
      <Container />
    </div>
  );
}

export function ResumeContent({ activeTab, onActiveSectionChange }: { activeTab: string, onActiveSectionChange?: (tab: string) => void }) {
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
          <ProfileHeaderSection />
          <div className="flex flex-col items-stretch relative w-full">
            <BentoGrid />
          </div>
        </div>
      </div>
      <div ref={aiProductsRef} className="w-full">
        <AiProducts />
      </div>
      <div ref={uxCaseRef} className="w-full">
        <UxCase />
      </div>
      <div ref={educationRef} className="w-full">
        <Education />
      </div>
    </div>
  );
}
