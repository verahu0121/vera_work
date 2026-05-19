import React, { useEffect, useMemo, useState } from "react";
import { Frame6, Icon } from "../../imports/VerasLibertisle/VerasLibertisle";
import {
  getProjectDetailHero,
  sortPortfolioProjects,
  type PortfolioProject,
  type ProjectCategory,
  type ProjectSection,
  type ProjectStatus,
} from "../data/portfolioProjects";

const ADMIN_PASSWORD = "hyq980121";
const SUCCESS_TRANSITION_MS = 3000;

type FilterCategory = "all" | ProjectCategory;

function CornerDecoration({ className, transform }: { className?: string; transform?: string }) {
  return (
    <div className={`absolute size-[33px] ${className ?? ""}`}>
      <div className="size-full" style={{ transform }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
          <path
            d="M33 22.041C27.1702 22.522 22.523 27.1702 22.042 33H18.0322C18.5281 24.96 24.96 18.5271 33 18.0312V22.041Z"
            fill="#03FFF7"
          />
        </svg>
      </div>
    </div>
  );
}

function LightDiffuseSweep({ active }: { active: boolean }) {
  return (
    <div className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div
        className={`absolute inset-0 transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f8f5ef_0%,#f4efe7_68%,#efe8de_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_48%,rgba(255,255,255,0.72),transparent_18%),radial-gradient(circle_at_38%_36%,rgba(255,255,255,0.38),transparent_22%),radial-gradient(circle_at_62%_58%,rgba(240,100,73,0.12),transparent_20%),radial-gradient(circle_at_78%_34%,rgba(3,255,247,0.10),transparent_18%)]" />
        <div className="absolute inset-0 backdrop-blur-[16px]" />
      </div>

      <div
        className={`absolute inset-y-[-12%] left-[-8%] w-[60%] rounded-[999px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.34)_42%,rgba(255,255,255,0)_72%)] blur-[34px] transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? "opacity-100 scale-100" : "opacity-0 scale-[0.82]"
        }`}
      />
      <div
        className={`absolute inset-y-[8%] right-[-10%] w-[38%] rounded-[999px] bg-[radial-gradient(circle_at_center,rgba(248,245,239,0.78)_0%,rgba(248,245,239,0.24)_46%,rgba(248,245,239,0)_74%)] blur-[42px] transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? "opacity-100 scale-100" : "opacity-0 scale-[0.8]"
        }`}
      />
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.08)_36%,transparent_72%)] blur-[18px] transition-opacity duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="rounded-[28px] border border-black/6 bg-white/90 px-5 py-4 shadow-[0_18px_50px_rgba(26,28,28,0.06)]">
      <div className="text-[11px] uppercase tracking-[2.4px] text-[#7d7d84]">{label}</div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="font-['Quantum',sans-serif] text-[28px] tracking-[-1px] text-[#1a1c1c]">{value}</div>
        <div className={`h-[10px] w-[52px] rounded-full ${accent}`} />
      </div>
    </div>
  );
}

function EditorActionButton({
  label,
  onClick,
  disabled,
  tone = "default",
  children,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "danger"
      ? "border-[#f06449]/24 bg-[#fff3ef] text-[#f06449] hover:bg-[#ffe6de]"
      : "border-black/8 bg-white text-[#1a1c1c] hover:bg-[#f7f3ee]";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex size-[48px] items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${toneClass}`}
    >
      {children}
    </button>
  );
}

function SectionCard({
  section,
  index,
  onChange,
  onRemove,
}: {
  section: ProjectSection;
  index: number;
  onChange: (nextSection: ProjectSection) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[24px] border border-black/7 bg-[#fbfaf7] p-4 shadow-[0_12px_32px_rgba(26,28,28,0.04)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[2.2px] text-[#8a8a90]">Section {index + 1}</div>
          <div className="mt-1 font-['Quantum',sans-serif] text-[18px] text-[#1a1c1c]">{section.id}</div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full border border-[#f06449]/20 bg-[#fff3ef] px-3 py-2 text-[11px] uppercase tracking-[1.8px] text-[#f06449] transition-colors hover:bg-[#ffe6de]"
        >
          Remove
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Section ID</span>
          <input
            value={section.id}
            onChange={(event) => onChange({ ...section, id: event.target.value })}
            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[13px] text-[#1a1c1c] outline-none transition-colors focus:border-[#03c9c3]/50"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Title</span>
          <input
            value={section.title}
            onChange={(event) => onChange({ ...section, title: event.target.value })}
            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[13px] text-[#1a1c1c] outline-none transition-colors focus:border-[#03c9c3]/50"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Subtitle</span>
          <input
            value={section.subtitle}
            onChange={(event) => onChange({ ...section, subtitle: event.target.value })}
            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[13px] text-[#1a1c1c] outline-none transition-colors focus:border-[#03c9c3]/50"
          />
        </label>
      </div>
    </div>
  );
}

function createEmptyProject(projects: PortfolioProject[]): PortfolioProject {
  const now = new Date().toISOString();
  return {
    id: `project-${Date.now()}`,
    category: "ai-product",
    status: "draft",
    order: projects.length + 1,
    title: "新项目标题",
    englishTitle: "NEW PROJECT TITLE",
    date: "2026.01-2026.12",
    description: "在这里填写项目的中文简介说明，建议控制在 2-4 句话，兼顾信息量与阅读节奏。",
    coverImage: "",
    images: [],
    tags: ["NEW", "CASE"],
    sections: [
      { id: "01", title: "项目背景", subtitle: "background" },
      { id: "02", title: "设计过程", subtitle: "process" },
      { id: "03", title: "最终产出", subtitle: "outcome" },
    ],
    createdAt: now,
    updatedAt: now,
  };
}

function getTextAreaValue(values: string[]) {
  return values.join("\n");
}

function parseLineList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function cloneProject(project: PortfolioProject) {
  return {
    ...project,
    tags: [...project.tags],
    images: [...project.images],
    sections: project.sections.map((section) => ({ ...section })),
    detailHero: { ...getProjectDetailHero(project) },
  };
}

export function AdminDashboard({
  onBack,
  projects,
  onProjectsChange,
}: {
  onBack?: () => void;
  projects: PortfolioProject[];
  onProjectsChange: React.Dispatch<React.SetStateAction<PortfolioProject[]>>;
}) {
  const [scale, setScale] = useState(1);
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [shouldShake, setShouldShake] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");
  const [draftProject, setDraftProject] = useState<PortfolioProject | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const widthScale = window.innerWidth / 1440;
      const heightScale = window.innerHeight / 960;
      setScale(Math.min(widthScale, heightScale, 1));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!selectedProjectId && projects[0]?.id) {
      setSelectedProjectId(projects[0].id);
      return;
    }

    if (selectedProjectId && !projects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(projects[0]?.id ?? "");
    }
  }, [projects, selectedProjectId]);

  useEffect(() => {
    if (status !== "success") return;

    const unlockTimer = window.setTimeout(() => {
      setIsUnlocked(true);
    }, SUCCESS_TRANSITION_MS);

    return () => window.clearTimeout(unlockTimer);
  }, [status]);

  const filteredProjects = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return sortPortfolioProjects(
      projects.filter((project) => {
        const matchesCategory = filterCategory === "all" || project.category === filterCategory;
        const matchesKeyword =
          keyword.length === 0 ||
          project.title.toLowerCase().includes(keyword) ||
          project.englishTitle.toLowerCase().includes(keyword);
        return matchesCategory && matchesKeyword;
      }),
    );
  }, [filterCategory, projects, search]);

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? filteredProjects[0] ?? projects[0] ?? null;

  useEffect(() => {
    setDraftProject(selectedProject ? cloneProject(selectedProject) : null);
    setIsDeleteConfirmOpen(false);
  }, [selectedProject]);

  const handleSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setStatus("success");
      setShouldShake(false);
      return;
    }

    setStatus("error");
    setShouldShake(true);
    window.setTimeout(() => setShouldShake(false), 450);
  };

  const updateDraftProject = (updater: (project: PortfolioProject) => PortfolioProject) => {
    setDraftProject((currentProject) => (currentProject ? updater(cloneProject(currentProject)) : currentProject));
  };

  const handleCategoryChange = (value: ProjectCategory) => {
    updateDraftProject((project) => ({
      ...project,
      category: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleStatusChange = (value: ProjectStatus) => {
    updateDraftProject((project) => ({
      ...project,
      status: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleFieldChange = <K extends keyof PortfolioProject>(key: K, value: PortfolioProject[K]) => {
    updateDraftProject((project) => ({
      ...project,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleDetailHeroChange = (
    key: keyof ReturnType<typeof getProjectDetailHero>,
    value: string,
  ) => {
    updateDraftProject((project) => ({
      ...project,
      detailHero: {
        ...getProjectDetailHero(project),
        [key]: value,
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleAddProject = () => {
    const nextProject = createEmptyProject(projects);
    onProjectsChange((currentProjects) => sortPortfolioProjects([...currentProjects, nextProject]));
    setSelectedProjectId(nextProject.id);
    setFilterCategory("all");
    setSearch("");
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;
    onProjectsChange((currentProjects) =>
      currentProjects.filter((project) => project.id !== selectedProject.id),
    );
    setIsDeleteConfirmOpen(false);
  };

  const totalPublished = projects.filter((project) => project.status === "published").length;
  const totalDrafts = projects.filter((project) => project.status === "draft").length;
  const totalAI = projects.filter((project) => project.category === "ai-product").length;
  const totalUX = projects.filter((project) => project.category === "ux-design").length;
  const dashboardProject = selectedProject ?? filteredProjects[0] ?? projects[0] ?? null;
  const editableProject = draftProject ?? dashboardProject;
  const previewCards = Array.from({ length: 4 }, (_, index) => index);
  const previewSections = Array.from({ length: 3 }, (_, index) => index);
  const showPreviewSkeleton = false;
  const hasUnsavedChanges = useMemo(() => {
    if (!selectedProject || !draftProject) return false;
    return JSON.stringify(selectedProject) !== JSON.stringify(draftProject);
  }, [draftProject, selectedProject]);

  const handleCancelChanges = () => {
    if (!selectedProject) return;
    setDraftProject(cloneProject(selectedProject));
    setIsDeleteConfirmOpen(false);
  };

  const handleSaveChanges = () => {
    if (!selectedProject || !draftProject) return;

    onProjectsChange((currentProjects) =>
      sortPortfolioProjects(
        currentProjects.map((project) =>
          project.id === selectedProject.id
            ? {
                ...cloneProject(draftProject),
                updatedAt: new Date().toISOString(),
              }
            : project,
        ),
      ),
    );
  };

  const renderDashboardShell = (preview = false) => (
    <div
      aria-hidden={preview || undefined}
      className={
        preview
          ? `absolute inset-0 z-0 flex items-center justify-center pointer-events-none transition-all duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              status === "success" ? "opacity-100" : "opacity-0"
            }`
          : "flex h-screen w-full items-center justify-center overflow-hidden bg-[#f3efe7] text-[#1a1c1c]"
      }
    >
      <div
        className="relative h-[960px] w-[1440px] shrink-0 origin-center overflow-hidden px-[40px] py-[32px]"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(3,255,247,0.12),transparent_22%),radial-gradient(circle_at_90%_0%,rgba(240,100,73,0.10),transparent_16%),linear-gradient(180deg,#f8f5ef_0%,#f2ede5_100%)]" />
        <div className={`relative z-10 flex h-full flex-col gap-6 transition-opacity duration-700 ${preview ? "opacity-[0.96]" : "opacity-100"}`}>
          <header className="grid grid-cols-[1.2fr_1fr] gap-6">
            <div className="rounded-[36px] border border-black/6 bg-white/88 p-7 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-[11px] uppercase tracking-[3px] text-[#7d7d84]">Admin Dashboard</div>
                  {showPreviewSkeleton ? (
                    <div className="mt-3 space-y-4">
                      <div className="h-[42px] w-[420px] rounded-full bg-black/10" />
                      <div className="h-[14px] w-[560px] rounded-full bg-black/7" />
                      <div className="h-[14px] w-[500px] rounded-full bg-black/6" />
                    </div>
                  ) : (
                    <>
                      <h1 className="mt-3 font-['Quantum',sans-serif] text-[42px] uppercase leading-[44px] tracking-[-1px] text-[#1a1c1c]">
                        Project Control Center
                      </h1>
                      <p className="mt-4 max-w-[620px] font-['OPPOSans:Light',sans-serif] text-[15px] leading-[30px] text-[#474747]">
                        统一维护 AI Product 与 UX Design 项目资料。这里编辑的标题、说明、封面图、详情图与章节结构会直接驱动前台展示。
                      </p>
                    </>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={preview}
                    onClick={onBack}
                    className="rounded-full bg-[#1a1c1c] px-5 py-3 text-[11px] uppercase tracking-[2px] text-white shadow-[0_18px_32px_rgba(26,28,28,0.16)] transition-transform hover:-translate-y-[1px] disabled:pointer-events-none"
                  >
                    Back To Site
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {showPreviewSkeleton ? (
                <>
                  {["Published", "Drafts", "AI Product", "UX Design"].map((label, index) => (
                    <div key={label} className="rounded-[28px] border border-black/6 bg-white/90 px-5 py-4 shadow-[0_18px_50px_rgba(26,28,28,0.06)]">
                      <div className="text-[11px] uppercase tracking-[2.4px] text-[#7d7d84]">{label}</div>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div className="h-[28px] w-[44px] rounded-full bg-black/10" />
                        <div className={`h-[10px] w-[52px] rounded-full ${index % 2 === 0 ? "bg-[#03c9c3]/45" : "bg-[#f3a67d]/55"}`} />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <MetricCard label="Published" value={totalPublished} accent="bg-[#03c9c3]" />
                  <MetricCard label="Drafts" value={totalDrafts} accent="bg-[#f3a67d]" />
                  <MetricCard label="AI Product" value={totalAI} accent="bg-[#03fff7]" />
                  <MetricCard label="UX Design" value={totalUX} accent="bg-[#f06449]" />
                </>
              )}
            </div>
          </header>

          <div className="grid min-h-0 flex-1 grid-cols-[320px_minmax(0,1fr)_320px] gap-6">
            <aside className="flex min-h-0 flex-col rounded-[36px] border border-black/6 bg-white/88 p-5 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Project List</div>
                  <div className="mt-2 font-['Quantum',sans-serif] text-[24px] uppercase text-[#1a1c1c]">Cases</div>
                </div>
                <button
                  type="button"
                  disabled={preview}
                  onClick={handleAddProject}
                  className="rounded-full bg-[#1a1c1c] px-4 py-2 text-[11px] uppercase tracking-[2px] text-white transition-transform hover:-translate-y-[1px] disabled:pointer-events-none"
                >
                  New
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  value={search}
                  readOnly={preview}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search project title..."
                  className="rounded-[18px] border border-black/8 bg-[#faf8f4] px-4 py-3 text-[13px] outline-none transition-colors focus:border-[#03c9c3]/45"
                />
                <div className="grid grid-cols-3 gap-2">
                  {(["all", "ai-product", "ux-design"] as const).map((category) => (
                    <button
                      key={category}
                      type="button"
                      disabled={preview}
                      onClick={() => setFilterCategory(category)}
                      className={`rounded-full px-3 py-2 text-[10px] uppercase tracking-[1.8px] transition-colors disabled:pointer-events-none ${
                        filterCategory === category
                          ? "bg-[#1a1c1c] text-white"
                          : "bg-[#f4efe8] text-[#6d6d73] hover:bg-[#ece6de]"
                      }`}
                    >
                      {category === "all" ? "All" : category === "ai-product" ? "AI" : "UX"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                {showPreviewSkeleton
                  ? previewCards.map((index) => (
                      <div
                        key={`preview-list-${index}`}
                        className={`w-full rounded-[24px] border p-4 text-left ${
                          index === 0
                            ? "border-[#03c9c3]/28 bg-[#eefbf9] shadow-[0_18px_36px_rgba(3,201,195,0.12)]"
                            : "border-black/6 bg-[#fbfaf7]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="h-[10px] w-[82px] rounded-full bg-black/10" />
                          <div className="h-[20px] w-[62px] rounded-full bg-black/8" />
                        </div>
                        <div className="mt-3 h-[18px] w-[78%] rounded-full bg-black/12" />
                        <div className="mt-3 h-[10px] w-[92%] rounded-full bg-black/7" />
                        <div className="mt-2 h-[10px] w-[76%] rounded-full bg-black/6" />
                      </div>
                    ))
                  : filteredProjects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        disabled={preview}
                        onClick={() => setSelectedProjectId(project.id)}
                        className={`w-full rounded-[24px] border p-4 text-left transition-all disabled:pointer-events-none ${
                          dashboardProject?.id === project.id
                            ? "border-[#03c9c3]/28 bg-[#eefbf9] shadow-[0_18px_36px_rgba(3,201,195,0.12)]"
                            : "border-black/6 bg-[#fbfaf7] hover:border-black/12 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">
                            {project.category === "ai-product" ? "AI Product" : "UX Design"}
                          </div>
                          <div
                            className={`rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[1.8px] ${
                              project.status === "published"
                                ? "bg-[#effbfa] text-[#039f9a]"
                                : "bg-[#fff3ef] text-[#f06449]"
                            }`}
                          >
                            {project.status}
                          </div>
                        </div>
                        <div className="mt-3 font-['Quantum',sans-serif] text-[18px] uppercase leading-[22px] text-[#1a1c1c]">
                          {project.title}
                        </div>
                        <div className="mt-2 line-clamp-2 font-['OPPOSans:Light',sans-serif] text-[12px] leading-[22px] text-[#5f5f65]">
                          {project.description}
                        </div>
                      </button>
                    ))}
              </div>
            </aside>

            <main className="min-h-0 rounded-[36px] border border-black/6 bg-white/88 p-6 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
              {showPreviewSkeleton ? (
                <div className="flex h-full min-h-0 flex-col">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Editor</div>
                      <div className="mt-2 h-[28px] w-[280px] rounded-full bg-black/10" />
                    </div>
                    <div className="h-[44px] w-[132px] rounded-full bg-[#fff3ef]" />
                  </div>

                  <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-2">
                    <section className="rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
                      <div className="mb-4 text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Basic Information</div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="h-[66px] rounded-[16px] bg-white" />
                        <div className="h-[66px] rounded-[16px] bg-white" />
                        <div className="h-[66px] rounded-[16px] bg-white md:col-span-2" />
                        <div className="h-[66px] rounded-[16px] bg-white md:col-span-2" />
                        <div className="h-[66px] rounded-[16px] bg-white" />
                        <div className="h-[66px] rounded-[16px] bg-white" />
                        <div className="h-[156px] rounded-[20px] bg-white md:col-span-2" />
                      </div>
                    </section>

                    <section className="rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
                      <div className="mb-4 text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Media & Tags</div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="h-[66px] rounded-[16px] bg-white md:col-span-2" />
                        <div className="h-[66px] rounded-[16px] bg-white" />
                        <div className="h-[156px] rounded-[20px] bg-white" />
                      </div>
                    </section>

                    <section className="rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
                      <div className="mb-4 text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Case Study Hero</div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Top Label Text</span>
                          <input
                            value={getProjectDetailHero(editableProject).eyebrowText}
                            readOnly={preview}
                            onChange={(event) => handleDetailHeroChange("eyebrowText", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Background Color</span>
                          <input
                            value={getProjectDetailHero(editableProject).backgroundColor}
                            readOnly={preview}
                            onChange={(event) => handleDetailHeroChange("backgroundColor", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                            placeholder="#070621"
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Top Label Color</span>
                          <input
                            value={getProjectDetailHero(editableProject).eyebrowColor}
                            readOnly={preview}
                            onChange={(event) => handleDetailHeroChange("eyebrowColor", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                            placeholder="#e0e0e0"
                          />
                        </label>
                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Hero Title Text</span>
                          <input
                            value={getProjectDetailHero(editableProject).titleText}
                            readOnly={preview}
                            onChange={(event) => handleDetailHeroChange("titleText", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Hero Title Color</span>
                          <input
                            value={getProjectDetailHero(editableProject).titleColor}
                            readOnly={preview}
                            onChange={(event) => handleDetailHeroChange("titleColor", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                            placeholder="#fd6d59"
                          />
                        </label>
                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Hero Subtitle Text</span>
                          <input
                            value={getProjectDetailHero(editableProject).subtitleText}
                            readOnly={preview}
                            onChange={(event) => handleDetailHeroChange("subtitleText", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Hero Subtitle Color</span>
                          <input
                            value={getProjectDetailHero(editableProject).subtitleColor}
                            readOnly={preview}
                            onChange={(event) => handleDetailHeroChange("subtitleColor", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                            placeholder="#adadad"
                          />
                        </label>
                      </div>
                    </section>

                    <section className="rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Detail Sections</div>
                        <div className="h-[36px] w-[108px] rounded-full bg-[#effbfa]" />
                      </div>
                      <div className="space-y-4">
                        {previewSections.map((index) => (
                          <div key={`preview-section-${index}`} className="rounded-[24px] border border-black/7 bg-[#fbfaf7] p-4 shadow-[0_12px_32px_rgba(26,28,28,0.04)]">
                            <div className="mb-4 flex items-center justify-between gap-4">
                              <div className="space-y-2">
                                <div className="h-[10px] w-[64px] rounded-full bg-black/8" />
                                <div className="h-[18px] w-[96px] rounded-full bg-black/10" />
                              </div>
                              <div className="h-[36px] w-[86px] rounded-full bg-[#fff3ef]" />
                            </div>
                            <div className="grid gap-3 md:grid-cols-3">
                              <div className="h-[62px] rounded-[16px] bg-white" />
                              <div className="h-[62px] rounded-[16px] bg-white" />
                              <div className="h-[62px] rounded-[16px] bg-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              ) : editableProject ? (
                <div className="flex h-full min-h-0 flex-col">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Editor</div>
                      <div className="mt-2 font-['Quantum',sans-serif] text-[28px] uppercase text-[#1a1c1c]">
                        {editableProject.title}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <EditorActionButton
                        label="Save Changes"
                        onClick={handleSaveChanges}
                        disabled={preview || !hasUnsavedChanges}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 4.75H16.75L19.25 7.25V19.25H5V4.75Z" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M8 4.75V10H15V4.75" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M8.5 15H15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </EditorActionButton>
                      <EditorActionButton
                        label="Cancel Changes"
                        onClick={handleCancelChanges}
                        disabled={preview || !hasUnsavedChanges}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </EditorActionButton>
                      <div className="h-[28px] w-px bg-black/10" />
                      <EditorActionButton
                        label="Delete Project"
                        tone="danger"
                        onClick={() => setIsDeleteConfirmOpen(true)}
                        disabled={preview}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M4.75 7.25H19.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M9.25 4.75H14.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M8 7.25V18.25H16V7.25" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M10.5 10V15.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M13.5 10V15.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </EditorActionButton>
                    </div>
                  </div>

                  <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-2">
                    <section className="rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
                      <div className="mb-4 text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Basic Information</div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Category</span>
                          <select
                            value={editableProject.category}
                            disabled={preview}
                            onChange={(event) => handleCategoryChange(event.target.value as ProjectCategory)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[13px] outline-none focus:border-[#03c9c3]/50 disabled:pointer-events-none"
                          >
                            <option value="ai-product">AI Product</option>
                            <option value="ux-design">UX Design</option>
                          </select>
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Status</span>
                          <select
                            value={editableProject.status}
                            disabled={preview}
                            onChange={(event) => handleStatusChange(event.target.value as ProjectStatus)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[13px] outline-none focus:border-[#03c9c3]/50 disabled:pointer-events-none"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </label>
                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Title</span>
                          <input
                            value={editableProject.title}
                            readOnly={preview}
                            onChange={(event) => handleFieldChange("title", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">English Title</span>
                          <input
                            value={editableProject.englishTitle}
                            readOnly={preview}
                            onChange={(event) => handleFieldChange("englishTitle", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Date Range</span>
                          <input
                            value={editableProject.date}
                            readOnly={preview}
                            onChange={(event) => handleFieldChange("date", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Order</span>
                          <input
                            type="number"
                            value={editableProject.order}
                            readOnly={preview}
                            onChange={(event) => handleFieldChange("order", Number(event.target.value) || 0)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Description</span>
                          <textarea
                            value={editableProject.description}
                            readOnly={preview}
                            onChange={(event) => handleFieldChange("description", event.target.value)}
                            rows={5}
                            className="resize-none rounded-[20px] border border-black/8 bg-white px-4 py-4 text-[14px] leading-[28px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                      </div>
                    </section>

                    <section className="rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
                      <div className="mb-4 text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Media & Tags</div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Cover Image URL</span>
                          <input
                            value={editableProject.coverImage}
                            readOnly={preview}
                            onChange={(event) => handleFieldChange("coverImage", event.target.value)}
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Tags</span>
                          <input
                            value={editableProject.tags.join(", ")}
                            readOnly={preview}
                            onChange={(event) =>
                              handleFieldChange(
                                "tags",
                                event.target.value
                                  .split(",")
                                  .map((tag) => tag.trim())
                                  .filter(Boolean),
                              )
                            }
                            className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Gallery Images</span>
                          <textarea
                            value={getTextAreaValue(editableProject.images)}
                            readOnly={preview}
                            onChange={(event) => handleFieldChange("images", parseLineList(event.target.value))}
                            rows={5}
                            className="resize-none rounded-[20px] border border-black/8 bg-white px-4 py-4 text-[14px] leading-[24px] outline-none focus:border-[#03c9c3]/50"
                            placeholder="One image URL per line"
                          />
                        </label>
                      </div>
                    </section>

                    <section className="rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Detail Sections</div>
                        <button
                          type="button"
                          disabled={preview}
                          onClick={() =>
                            handleFieldChange("sections", [
                              ...editableProject.sections,
                              {
                                id: `0${editableProject.sections.length + 1}`,
                                title: "新增章节",
                                subtitle: "new section",
                              },
                            ])
                          }
                          className="rounded-full bg-[#effbfa] px-4 py-2 text-[10px] uppercase tracking-[2px] text-[#039f9a] transition-colors hover:bg-[#def7f5] disabled:pointer-events-none"
                        >
                          Add Section
                        </button>
                      </div>
                      <div className="space-y-4">
                        {editableProject.sections.map((section, index) => (
                          <SectionCard
                            key={`${editableProject.id}-${index}-${section.id}`}
                            section={section}
                            index={index}
                            onChange={(nextSection) => {
                              handleFieldChange(
                                "sections",
                                editableProject.sections.map((currentSection, currentIndex) =>
                                  currentIndex === index ? nextSection : currentSection,
                                ),
                              );
                            }}
                            onRemove={() => {
                              handleFieldChange(
                                "sections",
                                editableProject.sections.filter((_, currentIndex) => currentIndex !== index),
                              );
                            }}
                          />
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-[28px] border border-dashed border-black/10 bg-[#faf8f4] text-center text-[14px] text-[#7d7d84]">
                  Select or create a project to start editing.
                </div>
              )}
            </main>

            <aside className="min-h-0 rounded-[36px] border border-black/6 bg-white/88 p-5 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
              {showPreviewSkeleton ? (
                <div className="flex h-full min-h-0 flex-col">
                  <div className="mb-5">
                    <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Live Preview</div>
                    <div className="mt-2 font-['Quantum',sans-serif] text-[24px] uppercase text-[#1a1c1c]">Card Snapshot</div>
                  </div>

                  <div className="rounded-[30px] border border-black/7 bg-[#f7f3ed] p-4 shadow-[0_18px_40px_rgba(26,28,28,0.05)]">
                    <div className="h-[210px] overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(236,231,223,0.9)_100%)]" />
                    <div className="mt-4 h-[10px] w-[132px] rounded-full bg-black/8" />
                    <div className="mt-3 h-[24px] w-[78%] rounded-full bg-black/10" />
                    <div className="mt-3 h-[10px] w-[92%] rounded-full bg-black/6" />
                    <div className="mt-2 h-[10px] w-[84%] rounded-full bg-black/5" />
                    <div className="mt-4 flex gap-2">
                      <div className="h-[30px] w-[62px] rounded-full bg-white" />
                      <div className="h-[30px] w-[76px] rounded-full bg-white" />
                    </div>
                  </div>

                  <div className="mt-5 min-h-0 flex-1 rounded-[30px] border border-black/7 bg-[#fbfaf7] p-4">
                    <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Section Outline</div>
                    <div className="mt-4 space-y-3 overflow-y-auto pr-1">
                      {previewSections.map((index) => (
                        <div key={`preview-outline-${index}`} className="rounded-[20px] border border-black/7 bg-white p-4">
                          <div className="h-[10px] w-[48px] rounded-full bg-black/8" />
                          <div className="mt-2 h-[18px] w-[88px] rounded-full bg-black/10" />
                          <div className="mt-2 h-[10px] w-[72px] rounded-full bg-black/6" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : editableProject ? (
                <div className="flex h-full min-h-0 flex-col">
                  <div className="mb-5">
                    <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Live Preview</div>
                    <div className="mt-2 font-['Quantum',sans-serif] text-[24px] uppercase text-[#1a1c1c]">Card Snapshot</div>
                  </div>

                  <div className="rounded-[30px] border border-black/7 bg-[#f7f3ed] p-4 shadow-[0_18px_40px_rgba(26,28,28,0.05)]">
                    <div className="h-[210px] overflow-hidden rounded-[20px] bg-[#ece7df]">
                      {editableProject.coverImage || editableProject.images[0] ? (
                        <img
                          src={editableProject.coverImage || editableProject.images[0]}
                          alt={editableProject.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[12px] uppercase tracking-[2px] text-[#99979d]">
                          No Cover Image
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-[10px] uppercase tracking-[2px] text-[#7d7d84]">
                      {editableProject.category === "ai-product" ? "AI Product" : "UX Design"} / {editableProject.date}
                    </div>
                    <div className="mt-3 font-['Quantum',sans-serif] text-[24px] uppercase leading-[28px] text-[#1a1c1c]">
                      {editableProject.title}
                    </div>
                    <div className="mt-3 line-clamp-5 font-['OPPOSans:Light',sans-serif] text-[13px] leading-[24px] text-[#53535a]">
                      {editableProject.description}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {editableProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white px-3 py-2 text-[10px] uppercase tracking-[1.6px] text-[#5e5e64] shadow-[0_8px_20px_rgba(26,28,28,0.04)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 min-h-0 flex-1 rounded-[30px] border border-black/7 bg-[#fbfaf7] p-4">
                    <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Section Outline</div>
                    <div className="mt-4 space-y-3 overflow-y-auto pr-1">
                      {editableProject.sections.map((section) => (
                        <div key={`${editableProject.id}-${section.id}`} className="rounded-[20px] border border-black/7 bg-white p-4">
                          <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">{section.id}</div>
                          <div className="mt-2 font-['Quantum',sans-serif] text-[17px] text-[#1a1c1c]">{section.title}</div>
                          <div className="mt-1 text-[12px] uppercase tracking-[1.6px] text-[#8e8e94]">{section.subtitle}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </aside>
          </div>

          {!preview && isDeleteConfirmOpen && editableProject ? (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(26,28,28,0.18)] backdrop-blur-[6px]">
              <div className="w-[420px] rounded-[32px] border border-[#f06449]/14 bg-white/96 p-7 shadow-[0_28px_72px_rgba(26,28,28,0.12)]">
                <div className="text-[11px] uppercase tracking-[2.4px] text-[#8a8a90]">Confirm Delete</div>
                <div className="mt-3 font-['Quantum',sans-serif] text-[28px] uppercase leading-[30px] text-[#1a1c1c]">
                  Delete This Project?
                </div>
                <p className="mt-4 font-['OPPOSans:Light',sans-serif] text-[14px] leading-[24px] text-[#5f5f65]">
                  {editableProject.title} will be removed from the dashboard. This action is here to prevent accidental taps.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDeleteConfirmOpen(false)}
                    className="rounded-full border border-black/8 bg-white px-5 py-3 text-[11px] uppercase tracking-[2px] text-[#1a1c1c] transition-colors hover:bg-[#f7f3ee]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteProject}
                    className="rounded-full bg-[#f06449] px-5 py-3 text-[11px] uppercase tracking-[2px] text-white transition-colors hover:bg-[#de573e]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (!isUnlocked) {
    const panelStateClass =
      status === "success"
        ? "border-[#03fff7] shadow-[0_0_40px_0_rgba(3,255,247,0.16),8px_8px_24px_0_rgba(3,255,247,0.12),inset_4px_4px_8px_0_rgba(3,255,247,0.24)]"
        : status === "error"
        ? "border-[#ff6b8a] shadow-[0_0_24px_0_rgba(255,107,138,0.14),8px_8px_24px_0_rgba(3,255,247,0.08),inset_4px_4px_8px_0_rgba(3,255,247,0.18)]"
        : "border-[#00a6a1] shadow-[8px_8px_24px_0_rgba(3,255,247,0.1),inset_4px_4px_8px_0_rgba(3,255,247,0.2)]";

    const inputStateClass = isFocused
      ? "border-[#03fff7]/45 bg-[rgba(3,255,247,0.08)] shadow-[0_0_24px_0_rgba(3,255,247,0.12),inset_0_0_0_1px_rgba(3,255,247,0.08)]"
      : status === "success"
        ? "border-[#03fff7]/35 bg-[rgba(3,255,247,0.06)]"
        : status === "error"
        ? "border-[#ff6b8a]/45 bg-[rgba(255,107,138,0.06)]"
        : password.trim().length > 0
          ? "border-[#03fff7]/20 bg-[rgba(255,255,255,0.06)]"
          : "border-transparent bg-[rgba(255,255,255,0.05)]";

    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#151419] text-[#1a1c1c]">
        <LightDiffuseSweep active={status === "success"} />
        {renderDashboardShell(true)}
        <div
          className="relative z-10 h-[832px] w-[1280px] shrink-0 origin-center overflow-hidden"
          style={{ transform: `scale(${scale})` }}
        >
          <div
            className={`absolute left-[-72px] top-[-41px] h-[898px] w-[898px] transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              status === "success" ? "translate-x-[-190px] scale-[0.94] opacity-0" : "translate-x-0 scale-100 opacity-100"
            }`}
          >
            <div className="absolute inset-0">
              <Frame6 isHovered={false} className="absolute left-0 top-0" />
            </div>
            <Icon
              isHovered={status === "success" ? false : isBackHovered}
              onMouseEnter={() => {
                if (status !== "success") setIsBackHovered(true);
              }}
              onMouseLeave={() => setIsBackHovered(false)}
              onClick={onBack}
              hoverTextLines={["BACK"]}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <div
            className={`absolute right-[100px] top-[320px] h-[200px] w-[430px] overflow-hidden rounded-[32px] border bg-[rgba(21,20,25,0.5)] backdrop-blur-[24px] transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${panelStateClass} ${shouldShake ? "animate-[shake_0.45s_ease-in-out]" : ""} ${
              status === "success" ? "translate-x-[-24px] scale-[1.02] opacity-0" : "translate-x-0 scale-100 opacity-100"
            }`}
          >
            <CornerDecoration className="left-0 top-0" />
            <CornerDecoration className="bottom-0 left-0" transform="scaleY(-1)" />
            <CornerDecoration className="bottom-0 right-0" transform="rotate(180deg)" />
            <CornerDecoration className="right-0 top-0" transform="scaleY(-1) rotate(180deg)" />

            <div className="flex h-full flex-col items-start justify-center overflow-hidden pt-[24px]">
              <div className="flex h-[64px] w-full items-center justify-center px-[40px]">
                <p className={`font-['Manrope:Bold',sans-serif] text-[12px] font-bold uppercase tracking-[1.44px] transition-colors duration-500 ${
                  status === "success"
                    ? "text-[#c9fffd]"
                    : status === "error"
                      ? "text-[#ff9bb0]"
                      : "text-[#03fff7]"
                }`}>
                  {status === "success" ? "Welcome Back Home (#^.^#)" : "Welcome Back Home (#^.^#)"}
                </p>
              </div>

              <div className="flex min-h-0 flex-1 items-start justify-center px-[48px] pb-[48px] pt-[8px] w-full">
                <div className="flex w-full flex-col items-center gap-[12px]">
                  <div className={`flex h-[56px] w-full items-center rounded-[8px] border px-[16px] transition-all duration-300 ${inputStateClass}`}>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => {
                        if (status === "success") return;
                        setPassword(event.target.value);
                        if (status !== "idle") {
                          setStatus("idle");
                        }
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyDown={(event) => {
                        if (status === "success") return;
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleSubmit();
                        }
                      }}
                      placeholder="Please Enter Your Password"
                      readOnly={status === "success"}
                      className={`h-full w-full border-0 bg-transparent text-center font-['Manrope:Light',sans-serif] text-[12px] font-light tracking-[1.44px] outline-none transition-colors duration-300 placeholder:text-center ${
                        status === "success"
                          ? "text-[#d6ffff] placeholder:text-transparent"
                          : password.trim().length > 0
                          ? "text-[#e6ffff] placeholder:text-[#6f6f75]/0"
                          : "text-[#b1b1b1] placeholder:text-[#b1b1b1]/50"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-center font-['Manrope:Light',sans-serif] text-[10px] tracking-[1.2px] uppercase transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      status === "success"
                        ? "text-[#bafffc] opacity-0"
                        : status === "error"
                          ? "text-[#ff9bb0]"
                          : "text-[#7a7a80]"
                    }`}
                  >
                    {status === "success"
                      ? "Access granted. Welcome home."
                      : status === "error"
                        ? "Incorrect password. Press Enter to try again."
                        : "Press Enter to unlock the dashboard"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return renderDashboardShell(false);
}
