import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { MainSidebar, Footer, Frame6, Frame5, Icon } from "../imports/VerasLibertisle/VerasLibertisle";
import { ContactPopup } from "./components/ContactPopup";
import { ResumeContent } from "./components/ResumeContent";
import { AIProductContent } from "./components/AIProductContent";
import { UXDesignContent } from "./components/UXDesignContent";
import { AdminDashboard } from "./components/AdminDashboard";
import { PasswordAccessCard } from "./components/PasswordAccessCard";
import { ResumeProjectDetailView } from "./components/ResumeProjectDetailView";
import { Toaster, toast } from "sonner";
import {
  sortPortfolioProjects,
  type PortfolioProject,
} from "./data/portfolioProjects";
import {
  DEFAULT_AUTH_SETTINGS,
  type AuthSettings,
} from "./data/authSettings";
import {
  DEFAULT_RESUME_CONTENT,
  normalizeResumeContent,
  type ResumeContentData,
  type ResumeInformationHomeModule,
  type ResumeInformationHomeModuleKey,
} from "./data/resumeContent";

const SITE_SUCCESS_TRANSITION_MS = 850;
const SITE_WELCOME_EXIT_START_MS = 80;
const SITE_LOGOUT_TRANSITION_MS = 520;
const SITE_WELCOME_FADE_DURATION = 0.72;
const SITE_WELCOME_GRID_ITEMS = Array.from({ length: 30 }, (_, index) => index);
type AppView = 'home' | 'resume' | 'ai-product' | 'ux-design' | 'admin-dashboard';

const VIEW_PATHS: Record<AppView, string> = {
  home: '/',
  resume: '/resume',
  'ai-product': '/ai-product',
  'ux-design': '/ux-design',
  'admin-dashboard': '/admin',
};

function getViewFromPath(pathname: string): AppView {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const matchedView = (Object.entries(VIEW_PATHS) as Array<[AppView, string]>).find(
    ([, path]) => path === normalizedPath,
  )?.[0];

  return matchedView ?? 'home';
}

function normalizePasswordInput(value: string) {
  return value
    .trim()
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\u3000/g, " ");
}

const primarySectionTransition = {
  initial: { opacity: 0, y: 18, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(10px)" },
  transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
} as const;

function SiteWelcomeTransition({
  lines = ["Welcome To", "Vera’s Libertisle"],
  fadeOnly = false,
  fadeDuration = 0.48,
}: {
  lines?: string[];
  fadeOnly?: boolean;
  fadeDuration?: number;
}) {
  return (
    <motion.div
      key="site-welcome"
      initial={fadeOnly ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
      animate={fadeOnly ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      exit={fadeOnly ? { opacity: 0 } : { opacity: 0, scale: 0.995, filter: "blur(8px)" }}
      transition={{ duration: fadeOnly ? fadeDuration : 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#e6e6e6]"
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="grid"
          style={{
            width: "1257.667px",
            height: "850px",
            rowGap: "120px",
            columnGap: "142px",
            gridTemplateRows: "repeat(5,minmax(0,1fr))",
            gridTemplateColumns: "repeat(6,minmax(0,1fr))",
          }}
        >
          {SITE_WELCOME_GRID_ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center"
              style={{
                backgroundImage: "url('/islandVector.svg')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "92px 65px",
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.58)_0%,rgba(230,230,230,0.18)_34%,rgba(230,230,230,0)_68%)]" />
      <div className="relative z-10 -translate-y-[8px] text-center font-['Manrope:ExtraBold',sans-serif] text-[64px] font-extrabold uppercase tracking-[5.12px] text-[#004e8d]">
        {lines.map((line) => (
          <p key={line} className="leading-[84px]">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

function getHomeLabelLines(
  modules: ResumeInformationHomeModule[],
  key: ResumeInformationHomeModuleKey,
) {
  const module = modules.find((item) => item.key === key);
  return Array.from({ length: 3 }, (_, index) => module?.information[index] ?? "");
}

const HOME_MODULE_KEYS_BY_ACTIVE_INDEX: ResumeInformationHomeModuleKey[] = ["right", "left", "center"];

function getHomeItemsByActiveIndex(
  modules: ResumeInformationHomeModule[],
  activeIndex: number,
) {
  const key = HOME_MODULE_KEYS_BY_ACTIVE_INDEX[activeIndex] ?? "right";
  return (
    modules
      .find((item) => item.key === key)
      ?.items.map((item) => ({
        label: item.label,
        value: item.value,
      })) ?? []
  );
}

function Labels({
  activeIndex,
  onHover,
  onLeave,
  homeModules,
}: {
  activeIndex: number;
  onHover: (index: number) => void;
  onLeave: () => void;
  homeModules: ResumeInformationHomeModule[];
}) {
  const customCursor = `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='6' fill='%23004997'/%3E%3C/svg%3E") 6 6, auto`;
  const rightLines = getHomeLabelLines(homeModules, "right");
  const leftLines = getHomeLabelLines(homeModules, "left");
  const centerLines = getHomeLabelLines(homeModules, "center");

  return (
    <>
      <div
        onMouseEnter={() => onHover(0)}
        onMouseLeave={onLeave}
        className={`transition-all duration-500 ease-in-out -translate-y-1/2 absolute content-stretch flex flex-col gap-[4px] items-end right-[395.17px] top-[calc(50%+18.5px)] w-[181px] origin-right ${activeIndex === 0 ? 'opacity-100 scale-110' : 'opacity-20 scale-100'}`}
        style={{ cursor: customCursor }}
      >
        <div className="content-stretch flex flex-col font-['Quantum',sans-serif] gap-[6px] items-end leading-[0] not-italic relative shrink-0 text-[#004997] text-[16px] text-right tracking-[-1px] uppercase w-full">
          <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
            <p className="leading-[16px]">{rightLines[0]}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
            <p className="leading-[16px]">{rightLines[1]}</p>
          </div>
        </div>
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-end size-full">
            <div className="content-stretch flex items-center justify-end px-[2px] relative w-full">
              <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#96a1b6] text-[10px] text-right uppercase whitespace-nowrap">
                <p className="leading-[15px]">{rightLines[2]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onMouseEnter={() => onHover(1)}
        onMouseLeave={onLeave}
        className={`transition-all duration-500 ease-in-out absolute content-stretch flex flex-col gap-[4px] items-start justify-center right-[864.17px] top-[553px] w-[181px] origin-left ${activeIndex === 1 ? 'opacity-100 scale-110' : 'opacity-20 scale-100'}`}
        style={{ cursor: customCursor }}
      >
        <div className="content-stretch flex flex-col font-['Quantum',sans-serif] gap-[6px] items-start justify-center leading-[0] not-italic relative shrink-0 text-[#004997] text-[16px] tracking-[-1px] uppercase w-full">
          <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
            <p className="leading-[16px]">{leftLines[0]}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
            <p className="leading-[16px]">{leftLines[1]}</p>
          </div>
        </div>
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center px-[2px] relative w-full">
              <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#96a1b6] text-[10px] text-right uppercase whitespace-nowrap">
                <p className="leading-[15px]">{leftLines[2]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onMouseEnter={() => onHover(2)}
        onMouseLeave={onLeave}
        className={`transition-all duration-500 ease-in-out -translate-x-1/2 absolute content-stretch flex flex-col gap-[4px] items-center left-[calc(50%-79.5px)] top-[91px] w-[181px] origin-top ${activeIndex === 2 ? 'opacity-100 scale-110' : 'opacity-20 scale-100'}`}
        style={{ cursor: customCursor }}
      >
        <div className="content-stretch flex flex-col font-['Quantum',sans-serif] gap-[6px] items-center leading-[0] not-italic relative shrink-0 text-[#004997] text-[16px] text-center tracking-[-1px] uppercase w-full">
          <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
            <p className="leading-[16px]">{centerLines[0]}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
            <p className="leading-[16px]">{centerLines[1]}</p>
          </div>
        </div>
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[2px] relative w-full">
              <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#96a1b6] text-[10px] text-right uppercase whitespace-nowrap">
                <p className="leading-[15px]">{centerLines[2]}</p>
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
  const [isSiteUnlocked, setIsSiteUnlocked] = useState(false);
  const [siteSessionChecked, setSiteSessionChecked] = useState(false);
  const [sitePassword, setSitePassword] = useState("");
  const [sitePasswordError, setSitePasswordError] = useState(false);
  const [isSitePasswordFocused, setIsSitePasswordFocused] = useState(false);
  const [siteGatePhase, setSiteGatePhase] = useState<"locked" | "welcome" | "welcome-exit" | "goodbye">("locked");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(() =>
    typeof window === 'undefined' ? 'home' : getViewFromPath(window.location.pathname),
  );
  const [activeResumeSubItem, setActiveResumeSubItem] = useState<string>('about me');
  const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [projectsHydrated, setProjectsHydrated] = useState(false);
  const [authSettings, setAuthSettings] = useState<AuthSettings>(DEFAULT_AUTH_SETTINGS);
  const [resumeContent, setResumeContent] = useState<ResumeContentData>(DEFAULT_RESUME_CONTENT);
  const [resumeLinkedProjectId, setResumeLinkedProjectId] = useState<string | null>(null);

  const refreshResumeContent = useCallback(async () => {
    const response = await fetch("/api/admin/resume", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch resume content.");
    }

    const nextContent = (await response.json()) as ResumeContentData;
    const normalizedContent = normalizeResumeContent(nextContent);
    setResumeContent(normalizedContent);
    return normalizedContent;
  }, []);

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

  const handleSiteUnlock = async () => {
    const normalizedPassword = normalizePasswordInput(sitePassword);

    try {
      const response = await fetch("/api/admin/verify-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target: "platform",
          password: normalizedPassword,
        }),
      });

      if (!response.ok) {
        setSitePasswordError(true);
        return;
      }

      setSitePasswordError(false);
      setIsSitePasswordFocused(false);
      setSiteGatePhase("welcome");
    } catch (error) {
      console.error("Failed to verify platform password", error);
      setSitePasswordError(true);
    }
  };

  useEffect(() => {
    if (siteGatePhase === "welcome") {
      const unlockTimer = window.setTimeout(() => {
        setIsSiteUnlocked(true);
        setSiteGatePhase("welcome-exit");
      }, SITE_SUCCESS_TRANSITION_MS);

      return () => window.clearTimeout(unlockTimer);
    }

    if (siteGatePhase === "welcome-exit") {
      const exitTimer = window.setTimeout(() => {
        setSiteGatePhase("locked");
      }, SITE_WELCOME_EXIT_START_MS);

      return () => window.clearTimeout(exitTimer);
    }

    if (siteGatePhase === "goodbye") {
      const lockTimer = window.setTimeout(() => {
        setIsSiteUnlocked(false);
        setSiteGatePhase("locked");
      }, SITE_LOGOUT_TRANSITION_MS);

      return () => window.clearTimeout(lockTimer);
    }
  }, [siteGatePhase]);

  useEffect(() => {
    let cancelled = false;

    const loadPlatformSession = async () => {
      try {
        const response = await fetch("/api/admin/session");
        if (!response.ok) {
          throw new Error("Failed to fetch session state.");
        }

        const payload = (await response.json()) as {
          platformAuthenticated?: boolean;
        };

        if (!cancelled && payload.platformAuthenticated) {
          setIsSiteUnlocked(true);
        }
      } catch (error) {
        console.error("Failed to read platform session", error);
      } finally {
        if (!cancelled) {
          setSiteSessionChecked(true);
        }
      }
    };

    loadPlatformSession();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadResumeContent = async () => {
      try {
        const normalizedContent = await refreshResumeContent();
        if (!cancelled) {
          setResumeContent(normalizedContent);
        }
      } catch (error) {
        console.error("Failed to read resume content from backend", error);
      }
    };

    loadResumeContent();

    return () => {
      cancelled = true;
    };
  }, [refreshResumeContent]);

  useEffect(() => {
    let cancelled = false;

    const loadAuthSettings = async () => {
      try {
        const response = await fetch("/api/admin/auth-settings");
        if (!response.ok) {
          throw new Error("Failed to fetch auth settings.");
        }

        const nextSettings = (await response.json()) as AuthSettings;
        if (!cancelled) {
          setAuthSettings({
            ...DEFAULT_AUTH_SETTINGS,
            ...nextSettings,
          });
        }
      } catch (error) {
        console.error("Failed to read auth settings from backend", error);
      }
    };

    loadAuthSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      try {
        const response = await fetch("/api/admin/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio projects.");
        }

        const nextProjects = sortPortfolioProjects((await response.json()) as PortfolioProject[]);

        if (!cancelled) {
          setPortfolioProjects(nextProjects);
          setProjectsHydrated(true);
        }
      } catch (error) {
        console.error("Failed to read portfolio projects from backend", error);
        if (!cancelled) {
          setProjectsHydrated(true);
        }
      }
    };

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const persistProjects = useCallback(async (nextProjects: PortfolioProject[]) => {
    const response = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projects: sortPortfolioProjects(nextProjects),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to persist portfolio projects.");
    }

    const savedProjects = sortPortfolioProjects((await response.json()) as PortfolioProject[]);
    setPortfolioProjects(savedProjects);
    return savedProjects;
  }, []);

  const persistResumeContent = useCallback(async (nextContent: ResumeContentData) => {
    const response = await fetch("/api/admin/resume", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: nextContent,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to persist resume content.");
    }

    const savedContent = (await response.json()) as ResumeContentData;
    const normalizedContent = normalizeResumeContent(savedContent);
    setResumeContent(normalizedContent);
    return normalizedContent;
  }, []);

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

  const viewOrder: Record<AppView, number> = {
    home: 0,
    resume: 1,
    'ai-product': 2,
    'ux-design': 3,
    'admin-dashboard': 4,
  };

  const navigateToView = (nextView: AppView, options?: { replace?: boolean }) => {
    if (nextView !== currentView) {
      setTransitionDirection(viewOrder[nextView] >= viewOrder[currentView] ? 1 : -1);
      setCurrentView(nextView);
    }

    const nextPath = VIEW_PATHS[nextView];
    if (window.location.pathname !== nextPath) {
      const updateHistory = options?.replace ? window.history.replaceState : window.history.pushState;
      updateHistory.call(window.history, null, '', nextPath);
    }

    setIsContactPopupOpen(false);
    if (nextView !== 'home') {
      setIsIconHovered(false);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextView = getViewFromPath(window.location.pathname);

      setCurrentView((previousView) => {
        setTransitionDirection(viewOrder[nextView] >= viewOrder[previousView] ? 1 : -1);
        return nextView;
      });
      setIsContactPopupOpen(false);
      if (nextView !== 'home') {
        setIsIconHovered(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openAdminDashboard = () => {
    navigateToView('admin-dashboard');
  };

  const handleSiteLogout = () => {
    setIsContactPopupOpen(false);
    setResumeLinkedProjectId(null);
    navigateToView("home", { replace: true });
    setActiveResumeSubItem("about me");
    setSitePassword("");
    setSitePasswordError(false);
    setIsSitePasswordFocused(false);
    setSiteGatePhase("goodbye");

    void fetch("/api/admin/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: "platform",
      }),
    })
      .catch((error) => {
        console.error("Failed to logout platform session", error);
      });
  };

  const openAIProductFromHome = () => {
    navigateToView('ai-product');
    setActiveIndex(0);
  };

  const toggleContactPopup = () => {
    if (isContactPopupOpen) {
      setIsContactPopupOpen(false);
      return;
    }

    void refreshResumeContent()
      .catch((error) => {
        console.error("Failed to refresh contact information", error);
      })
      .finally(() => {
        setIsContactPopupOpen(true);
      });
  };

  const refreshSidebarContact = () =>
    refreshResumeContent().catch((error) => {
      console.error("Failed to refresh contact information", error);
    });

  const openLinkedResumeProject = (projectId: string) => {
    const targetProject = portfolioProjects.find(
      (project) => project.id === projectId && project.status === "published",
    );

    if (!targetProject) {
      toast.error("Linked project unavailable");
      return;
    }

    setResumeLinkedProjectId(projectId);
  };

  const returnHomeFromAdmin = () => {
    navigateToView('home');
  };

  if (!siteSessionChecked) {
    return <div className="h-screen w-full bg-[#e6e6e6]" />;
  }

  if (!isSiteUnlocked || siteGatePhase === "goodbye") {
    const inputStateClass = sitePasswordError
      ? "border-[#d78ea0]/55 bg-[rgba(255,107,138,0.06)] shadow-[inset_0_0_0_1px_rgba(255,107,138,0.18)]"
      : isSitePasswordFocused
        ? "border-[#004e8d]/30 bg-[rgba(0,0,0,0.05)] shadow-[inset_0_0_0_1px_rgba(0,78,141,0.12)]"
        : "border-transparent bg-[rgba(0,0,0,0.05)]";

    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#e6e6e6] text-[#1a1c1c]">
        <AnimatePresence mode="wait" initial={false}>
          {siteGatePhase === "locked" ? (
            <motion.div
              key="site-password"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[832px] w-[1280px] shrink-0 origin-center overflow-hidden"
              style={{ transform: `scale(${scale})` }}
            >
              <Frame6 isHovered={false} className="absolute left-[-72px] top-[-41px]" />
              <Icon
                isHovered={false}
                isActive={false}
                className="absolute left-[317px] top-[348px] pointer-events-none"
              />

              <div className="absolute right-[100px] top-[320px]">
                <PasswordAccessCard
                  title={authSettings.platformWelcomeText}
                  value={sitePassword}
                  placeholder="Please Enter Your Password"
                  helperText=""
                  panelClassName="border-[#004e8d] bg-[#e6e6e6]/96 shadow-[8px_8px_24px_0_rgba(0,105,209,0.1)]"
                  titleClassName="leading-[14px] whitespace-nowrap"
                  inputClassName={inputStateClass}
                  inputFieldClassName={
                    sitePassword.trim().length > 0
                      ? "leading-[14px] text-[#6c6c6c] placeholder:text-transparent"
                      : "leading-[14px] text-[#6c6c6c]/50 placeholder:text-[#6c6c6c]/50"
                  }
                  onChange={(value) => {
                    setSitePassword(value);
                    if (sitePasswordError) setSitePasswordError(false);
                  }}
                  onFocus={() => setIsSitePasswordFocused(true)}
                  onBlur={() => setIsSitePasswordFocused(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSiteUnlock();
                    }
                  }}
                />
              </div>
            </motion.div>
          ) : siteGatePhase === "goodbye" ? (
            <SiteWelcomeTransition key="site-goodbye-shell" lines={["GOODBYE"]} fadeOnly />
          ) : (
            <SiteWelcomeTransition key="site-welcome-shell" fadeOnly />
          )}
        </AnimatePresence>
      </div>
    );
  }

  const resumeLinkedProject =
    resumeLinkedProjectId == null
      ? null
      : portfolioProjects.find(
        (project) => project.id === resumeLinkedProjectId && project.status === "published",
      ) ?? null;

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
        {siteGatePhase === "welcome-exit" && (
          <SiteWelcomeTransition
            key="site-welcome-overlay"
            fadeOnly
            fadeDuration={SITE_WELCOME_FADE_DURATION}
          />
        )}
      </AnimatePresence>
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
                navigateToView(view as 'home' | 'resume' | 'ai-product' | 'ux-design' | 'admin-dashboard');
              }}
              isContactActive={isContactPopupOpen}
              onContactClick={refreshSidebarContact}
              contact={resumeContent.information.contact}
              onHomeClick={() => {
                navigateToView('home');
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
        <ContactPopup
          isOpen={isContactPopupOpen}
          contact={resumeContent.information.contact}
        />

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
                <Footer
                  onAdminDashboardClick={openAdminDashboard}
                  onLogoutClick={handleSiteLogout}
                  copyright={resumeContent.information.copyright}
                />
                <Frame6 isHovered={isIconHovered || isContactPopupOpen} />
                <div
                  className={`absolute inset-0 z-20 pointer-events-none transition-opacity bg-[rgba(230,230,230,0.5)] ${(isIconHovered || isContactPopupOpen) ? 'opacity-100 duration-300' : 'opacity-0 duration-[600ms] ease-[cubic-bezier(0.68,0,0.82,0.55)]'}`}
                  aria-hidden="true"
                />
                <Labels
                  activeIndex={activeIndex}
                  onHover={handleHover}
                  onLeave={handleLeave}
                  homeModules={resumeContent.information.home.modules}
                />
                <Frame5
                  activeIndex={activeIndex}
                  items={getHomeItemsByActiveIndex(resumeContent.information.home.modules, activeIndex)}
                />
                <Icon
                  isHovered={isIconHovered}
                  isActive={isContactPopupOpen}
                  hoverTextLines={["EXPLORE"]}
                  onMouseEnter={() => setIsIconHovered(true)}
                  onMouseLeave={() => setIsIconHovered(false)}
                  onClick={() => {
                    if (isIconHovered) {
                      openAIProductFromHome();
                    }
                  }}
                />
              </div>
            </motion.div>
          ) : currentView === 'resume' ? (
            <motion.div
              key="resume"
              initial={primarySectionTransition.initial}
              animate={primarySectionTransition.animate}
              exit={primarySectionTransition.exit}
              transition={primarySectionTransition.transition}
              className="absolute inset-0 z-10 pl-[256px] bg-[#e6e6e6]"
            >
              <ResumeContent
                activeTab={activeResumeSubItem}
                onActiveSectionChange={setActiveResumeSubItem}
                content={resumeContent}
                onOpenLinkedProject={openLinkedResumeProject}
                onNavigateToAiProduct={() => navigateToView('ai-product')}
              />
            </motion.div>
          ) : currentView === 'ai-product' ? (
            <motion.div
              key="ai-product"
              initial={primarySectionTransition.initial}
              animate={primarySectionTransition.animate}
              exit={primarySectionTransition.exit}
              transition={primarySectionTransition.transition}
              className="absolute inset-0 z-10 pl-[256px] overflow-y-auto scrollbar-hide bg-[#e6e6e6]"
            >
              <AIProductContent projects={aiProductProjects} />
            </motion.div>
          ) : currentView === 'ux-design' ? (
            <motion.div
              key="ux-design"
              initial={primarySectionTransition.initial}
              animate={primarySectionTransition.animate}
              exit={primarySectionTransition.exit}
              transition={primarySectionTransition.transition}
              className="absolute inset-0 z-10 pl-[256px] overflow-y-auto scrollbar-hide bg-[#e6e6e6]"
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
              {projectsHydrated ? (
                <AdminDashboard
                  onBack={returnHomeFromAdmin}
                  projects={portfolioProjects}
                  onProjectsChange={setPortfolioProjects}
                  onPersistProjects={persistProjects}
                  authSettings={authSettings}
                  onAuthSettingsChange={setAuthSettings}
                  resumeContent={resumeContent}
                  onPersistResumeContent={persistResumeContent}
                />
              ) : (
                <div className="flex h-screen w-full items-center justify-center bg-[#f3efe7] text-[12px] uppercase tracking-[2px] text-[#7d7d84]">
                  Loading project data...
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {resumeLinkedProject && (
        <ResumeProjectDetailView
          project={resumeLinkedProject}
          onClose={() => setResumeLinkedProjectId(null)}
        />
      )}
    </div>
  );
}
