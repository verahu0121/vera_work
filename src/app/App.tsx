import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { MainSidebar, Footer, Frame6, Frame5, Icon } from "../imports/VerasLibertisle/VerasLibertisle";
import { ContactPopup } from "./components/ContactPopup";
import { ResumeContent } from "./components/ResumeContent";
import { AIProductContent } from "./components/AIProductContent";
import { UXDesignContent } from "./components/UXDesignContent";
import { AdminDashboard } from "./components/AdminDashboard";
import { Toaster } from "sonner";
import {
  PORTFOLIO_PROJECTS_STORAGE_KEY,
  SEED_PORTFOLIO_PROJECTS,
  sortPortfolioProjects,
  type PortfolioProject,
} from "./data/portfolioProjects";

function Labels({ activeIndex, onHover, onLeave }: { activeIndex: number, onHover: (index: number) => void, onLeave: () => void }) {
  const customCursor = `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='6' fill='%23004997'/%3E%3C/svg%3E") 6 6, auto`;

  return (
    <>
      <div 
        onMouseEnter={() => onHover(0)}
        onMouseLeave={onLeave}
        className={`transition-all duration-500 ease-in-out -translate-y-1/2 absolute content-stretch flex flex-col gap-[10px] items-end right-[395.17px] top-[calc(50%+18.5px)] w-[181px] origin-right ${activeIndex === 0 ? 'opacity-100 scale-110' : 'opacity-20 scale-100'}`}
        style={{ cursor: customCursor }}
      >
        <div className="content-stretch flex flex-col font-['Quantum',sans-serif] gap-[6px] items-end leading-[0] not-italic relative shrink-0 text-[#004997] text-[16px] text-right tracking-[-1px] uppercase w-full">
          <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
            <p className="leading-[16px]">AI Product</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
            <p className="leading-[16px]">ProductAI Product</p>
          </div>
        </div>
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-end size-full">
            <div className="content-stretch flex items-center justify-end px-[2px] relative w-full">
              <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#96a1b6] text-[10px] text-right uppercase whitespace-nowrap">
                <p className="leading-[15px]">ux设计项目</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        onMouseEnter={() => onHover(1)}
        onMouseLeave={onLeave}
        className={`transition-all duration-500 ease-in-out absolute content-stretch flex flex-col gap-[10px] items-start justify-center right-[864.17px] top-[553px] w-[181px] origin-left ${activeIndex === 1 ? 'opacity-100 scale-110' : 'opacity-20 scale-100'}`}
        style={{ cursor: customCursor }}
      >
        <div className="content-stretch flex flex-col font-['Quantum',sans-serif] gap-[6px] items-start justify-center leading-[0] not-italic relative shrink-0 text-[#004997] text-[16px] tracking-[-1px] uppercase w-full">
          <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
            <p className="leading-[16px]">AI Product</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
            <p className="leading-[16px]">ProductAI Product</p>
          </div>
        </div>
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center px-[2px] relative w-full">
              <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#96a1b6] text-[10px] text-right uppercase whitespace-nowrap">
                <p className="leading-[15px]">ux设计项目</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        onMouseEnter={() => onHover(2)}
        onMouseLeave={onLeave}
        className={`transition-all duration-500 ease-in-out -translate-x-1/2 absolute content-stretch flex flex-col gap-[10px] items-center left-[calc(50%-79.5px)] top-[91px] w-[181px] origin-top ${activeIndex === 2 ? 'opacity-100 scale-110' : 'opacity-20 scale-100'}`}
        style={{ cursor: customCursor }}
      >
        <div className="content-stretch flex flex-col font-['Quantum',sans-serif] gap-[6px] items-center leading-[0] not-italic relative shrink-0 text-[#004997] text-[16px] text-center tracking-[-1px] uppercase w-full">
          <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
            <p className="leading-[16px]">AI Product</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
            <p className="leading-[16px]">ProductAI Product</p>
          </div>
        </div>
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[2px] relative w-full">
              <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#96a1b6] text-[10px] text-right uppercase whitespace-nowrap">
                <p className="leading-[15px]">ux设计项目</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [scale, setScale] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'resume' | 'ai-product' | 'ux-design' | 'admin-dashboard'>('home');
  const [activeResumeSubItem, setActiveResumeSubItem] = useState<string>('about me');
  const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(SEED_PORTFOLIO_PROJECTS);

  useEffect(() => {
    if (isHovering || (currentView !== 'home')) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, [isHovering, currentView]);

  const handleHover = (index: number) => {
    setActiveIndex(index);
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = Math.max(0, window.innerWidth - 256);
      const widthScale = availableWidth / 1024;
      const heightScale = window.innerHeight / 832;
      setScale(Math.min(widthScale, heightScale, 1.2));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PORTFOLIO_PROJECTS_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setPortfolioProjects(sortPortfolioProjects(parsed));
      }
    } catch (error) {
      console.error("Failed to read portfolio projects from storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        PORTFOLIO_PROJECTS_STORAGE_KEY,
        JSON.stringify(sortPortfolioProjects(portfolioProjects)),
      );
    } catch (error) {
      console.error("Failed to persist portfolio projects", error);
    }
  }, [portfolioProjects]);

  const aiProductProjects = useMemo(
    () =>
      sortPortfolioProjects(
        portfolioProjects.filter(
          (project) => project.category === 'ai-product' && project.status === 'published',
        ),
      ),
    [portfolioProjects],
  );

  const uxDesignProjects = useMemo(
    () =>
      sortPortfolioProjects(
        portfolioProjects.filter(
          (project) => project.category === 'ux-design' && project.status === 'published',
        ),
      ),
    [portfolioProjects],
  );

  const openAdminDashboard = () => {
    setTransitionDirection(1);
    setCurrentView('admin-dashboard');
    setIsContactPopupOpen(false);
  };

  const returnHomeFromAdmin = () => {
    setTransitionDirection(-1);
    setCurrentView('home');
    setIsContactPopupOpen(false);
  };

  return (
    <div className="w-full h-screen flex overflow-hidden relative transition-colors duration-500 bg-[#E6E6E6]">
      <Toaster 
        position="top-left" 
        expand={false} 
        visibleToasts={1} 
        toastOptions={{
          style: {
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            width: 'auto',
          },
        }}
        containerStyle={{
          top: '48px',
          left: '128px',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      />
      <AnimatePresence initial={false}>
        {currentView !== 'admin-dashboard' && (
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -36 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="w-[256px] h-full absolute top-0 left-0 z-40 overflow-y-auto overflow-x-hidden transition-all duration-500 bg-[rgba(230,230,230,0.5)] backdrop-blur-[2px]"
          >
            <MainSidebar 
              currentView={currentView}
              onViewChange={(view) => {
                setCurrentView(view as any);
                setIsContactPopupOpen(false); // Close popup when switching views
              }}
              isContactActive={isContactPopupOpen} 
              onContactClick={() => setIsContactPopupOpen(!isContactPopupOpen)} 
              onHomeClick={() => {
                setCurrentView('home');
                setIsContactPopupOpen(false); // Ensure closed on home click
              }}
              activeResumeSubItem={activeResumeSubItem}
              onResumeSubItemClick={setActiveResumeSubItem}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        onClick={() => {
          if (isContactPopupOpen) setIsContactPopupOpen(false);
        }}
      >
        <ContactPopup isOpen={isContactPopupOpen} />

        <AnimatePresence initial={false} mode="sync" custom={transitionDirection}>
          {currentView === 'home' ? (
            <motion.div
              key="home"
              custom={transitionDirection}
              initial={(direction) => ({
                x: direction < 0 ? -128 : 0,
                opacity: direction < 0 ? 0.88 : 1,
              })}
              animate={{ x: 0, opacity: 1 }}
              exit={(direction) => ({
                x: direction > 0 ? -128 : 0,
                opacity: direction > 0 ? 0.88 : 1,
              })}
              transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="relative w-[1280px] h-[832px] shrink-0 origin-center"
                style={{ transform: `scale(${scale})` }}
              >
                <Footer onAdminDashboardClick={openAdminDashboard} />
                <Frame6 isHovered={isIconHovered || isContactPopupOpen} />
                <div 
                  className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 bg-[rgba(230,230,230,0.72)] ${(isIconHovered || isContactPopupOpen) ? 'opacity-100' : 'opacity-0'}`} 
                  aria-hidden="true" 
                />
                <Labels activeIndex={activeIndex} onHover={handleHover} onLeave={handleLeave} />
                <Frame5 activeIndex={activeIndex} />
                <Icon 
                  isHovered={isIconHovered} 
                  isActive={isContactPopupOpen}
                  onMouseEnter={() => setIsIconHovered(true)} 
                  onMouseLeave={() => setIsIconHovered(false)} 
                  onClick={() => setIsContactPopupOpen(!isContactPopupOpen)}
                />
              </div>
            </motion.div>
          ) : currentView === 'resume' ? (
            <motion.div
              key="resume"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 h-full w-full relative z-10 pl-[256px]"
            >
              <ResumeContent 
                activeTab={activeResumeSubItem} 
                onActiveSectionChange={setActiveResumeSubItem}
              />
            </motion.div>
          ) : currentView === 'ai-product' ? (
            <motion.div
              key="ai-product"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 h-full w-full relative z-10 pl-[256px] overflow-y-auto scrollbar-hide bg-[#e6e6e6]"
            >
               <AIProductContent projects={aiProductProjects} />
            </motion.div>
          ) : currentView === 'ux-design' ? (
            <motion.div
              key="ux-design"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 h-full w-full relative z-10 pl-[256px] overflow-y-auto scrollbar-hide bg-[#e6e6e6]"
            >
               <UXDesignContent projects={uxDesignProjects} />
            </motion.div>
          ) : (
            <motion.div
              key="admin-dashboard"
              custom={transitionDirection}
              initial={(direction) => ({
                x: direction > 0 ? 168 : 0,
                opacity: direction > 0 ? 0.92 : 1,
              })}
              animate={{ x: 0, opacity: 1 }}
              exit={(direction) => ({
                x: direction < 0 ? 168 : 0,
                opacity: direction < 0 ? 0.9 : 1,
              })}
              transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-10"
            >
              <AdminDashboard
                onBack={returnHomeFromAdmin}
                projects={portfolioProjects}
                onProjectsChange={setPortfolioProjects}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
