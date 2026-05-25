import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Frame6, Icon } from "../../imports/VerasLibertisle/VerasLibertisle";
import { PasswordAccessCard } from "./PasswordAccessCard";
import {
  getProjectDetailHero,
  getProjectSectionImageSrc,
  getProjectSectionImages,
  sortPortfolioProjects,
  type PortfolioProject,
  type ProjectCategory,
  type ProjectSection,
  type ProjectSectionImage,
  type ProjectStatus,
} from "../data/portfolioProjects";
import { DEFAULT_AUTH_SETTINGS, type AuthSettings } from "../data/authSettings";
import { type ResumeContentData } from "../data/resumeContent";
import { ResumeModuleEditor } from "./ResumeModuleEditor";
import { InformationModuleEditor } from "./InformationModuleEditor";

const SUCCESS_TRANSITION_MS = 3000;

type FilterCategory = ProjectCategory;
type DashboardModule = "security" | "projects" | "resume" | "info";

function normalizePasswordInput(value: string) {
  return value
    .trim()
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\u3000/g, " ");
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
    <div className="flex h-full flex-col rounded-[28px] border border-black/6 bg-white/90 px-5 py-3 shadow-[0_18px_50px_rgba(26,28,28,0.06)]">
      <div className="text-[11px] uppercase tracking-[2.4px] text-[#7d7d84]">{label}</div>
      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <div className="font-['Quantum',sans-serif] text-[28px] tracking-[-1px] text-[#1a1c1c]">{value}</div>
        <div className={`h-[10px] w-[52px] rounded-full ${accent}`} />
      </div>
    </div>
  );
}

function ModuleToggleCard({
  label,
  active,
  onClick,
  preview = false,
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
  preview?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={preview}
      onClick={onClick}
      className={`flex h-full w-full items-center justify-center rounded-[28px] border px-5 py-4 text-center shadow-[0_18px_50px_rgba(26,28,28,0.06)] transition-all disabled:pointer-events-none ${
        active
          ? "border-[#03c9c3]/28 bg-[#eefbf9] text-[#1a1c1c]"
          : "border-black/6 bg-white/90 text-[#6d6d73] hover:border-black/10 hover:bg-white"
      }`}
    >
      <span
        className={`font-['OPPOSans:Medium',sans-serif] text-[16px] uppercase tracking-[2px] ${
          active ? "text-[#1a1c1c]" : "text-[#6d6d73]"
        }`}
      >
        {label}
      </span>
    </button>
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
  projectId,
  section,
  index,
  uploading,
  onChange,
  onRemove,
  onUploadImage,
  onRemoveImage,
  onMoveImage,
}: {
  projectId: string;
  section: ProjectSection;
  index: number;
  uploading?: boolean;
  onChange: (nextSection: ProjectSection) => void;
  onRemove: () => void;
  onUploadImage: (file: File) => void;
  onRemoveImage: (imageId: string) => void;
  onMoveImage: (imageId: string, direction: "up" | "down") => void;
}) {
  const sectionImages = section.images ?? [];
  const displayOrder = String(index + 1).padStart(2, "0");

  return (
    <div className="rounded-[24px] border border-black/7 bg-[#fbfaf7] p-4 shadow-[0_12px_32px_rgba(26,28,28,0.04)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[2.2px] text-[#8a8a90]">
            {`SECTION ${displayOrder}`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label
            className={`flex size-[40px] cursor-pointer items-center justify-center rounded-full border transition-colors ${
              uploading
                ? "border-black/8 bg-[#f2f0eb] text-[#b1b1b7]"
                : "border-[#03c9c3]/18 bg-[#effbfa] text-[#039f9a] hover:bg-[#def7f5]"
            }`}
            aria-label={uploading ? "Uploading image" : "Add image"}
            title={uploading ? "Uploading image" : "Add image"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="hidden"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                onUploadImage(file);
                event.currentTarget.value = "";
              }}
            />
          </label>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full border border-[#f06449]/20 bg-[#fff3ef] px-3 py-2 text-[11px] uppercase tracking-[1.8px] text-[#f06449] transition-colors hover:bg-[#ffe6de]"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
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
      <div className="mt-4 flex flex-wrap gap-3">
        {sectionImages.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-black/10 bg-[#faf8f4] px-4 py-5 text-[12px] leading-[22px] text-[#8f8f96]">
            这个 section 还没有图片。上传后会直接进入前台详情页长图流。
          </div>
        ) : (
          sectionImages.map((image, imageIndex) => (
            <div key={image.id} className="group relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[18px] bg-[#f0ede8]">
              <img
                src={getProjectSectionImageSrc(image)}
                alt={image.alt || `${projectId} ${section.id} ${imageIndex + 1}`}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,28,28,0.04)_0%,rgba(26,28,28,0.12)_100%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <button
                type="button"
                aria-label="Remove image"
                title="Remove image"
                onClick={() => onRemoveImage(image.id)}
                className="absolute right-[8px] top-[8px] flex size-[24px] items-center justify-center rounded-full bg-[rgba(255,243,239,0.92)] text-[#f06449] opacity-0 transition-all duration-200 hover:bg-[#fff3ef] group-hover:translate-y-0 group-hover:opacity-100 translate-y-[-4px]"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <div className="absolute inset-x-[8px] bottom-[8px] flex items-center justify-center gap-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 translate-y-[6px]">
                <button
                  type="button"
                  aria-label="Move image left"
                  title="Move image left"
                  disabled={imageIndex === 0}
                  onClick={() => onMoveImage(image.id, "up")}
                  className="flex size-[24px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] text-[#4d4f52] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:bg-[rgba(255,255,255,0.45)] disabled:text-[#b9bcc0]"
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7L7 3V11L3 7Z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Move image right"
                  title="Move image right"
                  disabled={imageIndex === sectionImages.length - 1}
                  onClick={() => onMoveImage(image.id, "down")}
                  className="flex size-[24px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] text-[#4d4f52] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:bg-[rgba(255,255,255,0.45)] disabled:text-[#b9bcc0]"
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M11 7L7 11V3L11 7Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function createEmptyProject(projects: PortfolioProject[]): PortfolioProject {
  const now = new Date().toISOString();
  const nextAIOrder = projects.filter((project) => project.category === "ai-product").length + 1;
  return {
    id: `project-${Date.now()}`,
    category: "ai-product",
    status: "draft",
    order: nextAIOrder,
    title: "新项目标题",
    englishTitle: "NEW PROJECT TITLE",
    date: "2026.01-2026.12",
    description: "在这里填写项目的中文简介说明，建议控制在 2-4 句话，兼顾信息量与阅读节奏。",
    coverImage: "",
    images: [],
    tags: ["NEW", "CASE"],
    sections: [
      { stableId: createStableSectionId(), id: "01", title: "项目背景", subtitle: "background", images: [] },
      { stableId: createStableSectionId(), id: "02", title: "设计过程", subtitle: "process", images: [] },
      { stableId: createStableSectionId(), id: "03", title: "最终产出", subtitle: "outcome", images: [] },
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

function createStableSectionId() {
  return `section-${crypto.randomUUID()}`
}

function normalizeSectionIdsByOrder(sections: ProjectSection[]) {
  return sections.map((section, index) => ({
    ...section,
    stableId: section.stableId || createStableSectionId(),
    id: String(index + 1).padStart(2, "0"),
  }));
}

function cloneProject(project: PortfolioProject) {
  const normalizedSections = project.sections.map((section, sectionIndex) => ({
    ...section,
    stableId: section.stableId || section.id || createStableSectionId(),
    id: String(sectionIndex + 1).padStart(2, "0"),
    images: getProjectSectionImages(project, sectionIndex).map((image) => ({ ...image })),
  }));

  return {
    ...project,
    tags: [...project.tags],
    images: [...project.images],
    sections: normalizedSections,
    detailHero: { ...getProjectDetailHero(project) },
  };
}

async function uploadSectionImageAsset(projectId: string, sectionId: string, file: File) {
  const formData = new FormData();
  formData.append("projectId", projectId);
  formData.append("sectionId", sectionId);
  formData.append("file", file);

  const response = await fetch("/api/admin/upload-image", {
    method: "POST",
    body: formData,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error || "Upload failed.");
  }

  return payload as ProjectSectionImage;
}

export function AdminDashboard({
  onBack,
  projects,
  onProjectsChange,
  onPersistProjects,
  authSettings,
  onAuthSettingsChange,
  resumeContent,
  onPersistResumeContent,
}: {
  onBack?: () => void;
  projects: PortfolioProject[];
  onProjectsChange: React.Dispatch<React.SetStateAction<PortfolioProject[]>>;
  onPersistProjects: (nextProjects: PortfolioProject[]) => Promise<PortfolioProject[]>;
  authSettings: AuthSettings;
  onAuthSettingsChange: React.Dispatch<React.SetStateAction<AuthSettings>>;
  resumeContent: ResumeContentData;
  onPersistResumeContent: (nextContent: ResumeContentData) => Promise<ResumeContentData>;
}) {
  const [scale, setScale] = useState(1);
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [shouldShake, setShouldShake] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id ?? "");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("ai-product");
  const [activeModule, setActiveModule] = useState<DashboardModule>("projects");
  const [draftProject, setDraftProject] = useState<PortfolioProject | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [uploadingSectionIds, setUploadingSectionIds] = useState<string[]>([]);
  const [platformWelcomeDraft, setPlatformWelcomeDraft] = useState(authSettings.platformWelcomeText);
  const [platformOriginalPassword, setPlatformOriginalPassword] = useState("");
  const [platformNewPassword, setPlatformNewPassword] = useState("");
  const [adminWelcomeDraft, setAdminWelcomeDraft] = useState(authSettings.adminWelcomeText);
  const [adminOriginalPassword, setAdminOriginalPassword] = useState("");
  const [adminNewPassword, setAdminNewPassword] = useState("");
  const [isPersistingProjects, setIsPersistingProjects] = useState(false);

  const updateAuthSettings = async (payload: Record<string, string>) => {
    const response = await fetch("/api/admin/auth-settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof result?.error === "string" ? result.error : "Auth settings update failed.",
      );
    }

    onAuthSettingsChange({
      ...DEFAULT_AUTH_SETTINGS,
      ...(result as AuthSettings),
    });
  };

  useEffect(() => {
    let cancelled = false;

    const loadAdminSession = async () => {
      try {
        const response = await fetch("/api/admin/session");
        if (!response.ok) {
          throw new Error("Failed to fetch admin session.");
        }

        const payload = (await response.json()) as {
          adminAuthenticated?: boolean;
        };

        if (!cancelled && payload.adminAuthenticated) {
          setIsUnlocked(true);
        }
      } catch (error) {
        console.error("Failed to read admin session", error);
      } finally {
        if (!cancelled) {
          setSessionChecked(true);
        }
      }
    };

    loadAdminSession();

    return () => {
      cancelled = true;
    };
  }, []);

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
    setPlatformWelcomeDraft(authSettings.platformWelcomeText);
    setAdminWelcomeDraft(authSettings.adminWelcomeText);
  }, [authSettings.platformWelcomeText, authSettings.adminWelcomeText]);

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

  const filteredProjects = useMemo(
    () =>
      sortPortfolioProjects(
        projects.filter((project) => project.category === filterCategory),
      ),
    [filterCategory, projects],
  );

  useEffect(() => {
    if (filteredProjects.length === 0) {
      if (selectedProjectId) {
        setSelectedProjectId("");
      }
      return;
    }

    if (!filteredProjects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(filteredProjects[0].id);
    }
  }, [filteredProjects, selectedProjectId]);

  const selectedProject =
    filteredProjects.find((project) => project.id === selectedProjectId) ?? filteredProjects[0] ?? null;

  useEffect(() => {
    setDraftProject(selectedProject ? cloneProject(selectedProject) : null);
    setIsDeleteConfirmOpen(false);
  }, [selectedProject]);

  const handleSubmit = async () => {
    const normalizedPassword = normalizePasswordInput(password);

    try {
      const response = await fetch("/api/admin/verify-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target: "admin",
          password: normalizedPassword,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setShouldShake(false);
        return;
      }
    } catch (error) {
      console.error("Failed to verify admin password", error);
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
    const nextProjects = sortPortfolioProjects([...projects, nextProject]);

    setIsPersistingProjects(true);
    onPersistProjects(nextProjects)
      .then(() => {
        setSelectedProjectId(nextProject.id);
        setFilterCategory(nextProject.category);
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Failed to create project.");
      })
      .finally(() => setIsPersistingProjects(false));
  };

  const handleMoveProject = (projectId: string, direction: "up" | "down") => {
    if (!projectId) return;

    const categoryProjects = sortPortfolioProjects(
      projects.filter((project) => project.category === filterCategory),
    );
    const currentIndex = categoryProjects.findIndex((project) => project.id === projectId);
    if (currentIndex === -1) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= categoryProjects.length) return;

    const reorderedProjects = [...categoryProjects];
    const [movedProject] = reorderedProjects.splice(currentIndex, 1);
    reorderedProjects.splice(targetIndex, 0, movedProject);

    const nextOrderById = new Map(
      reorderedProjects.map((project, index) => [project.id, index + 1] as const),
    );
    const now = new Date().toISOString();
    const nextProjects = sortPortfolioProjects(
      projects.map((project) =>
        project.category === filterCategory
          ? {
              ...project,
              order: nextOrderById.get(project.id) ?? project.order,
              updatedAt: project.id === projectId ? now : project.updatedAt,
            }
          : project,
      ),
    );

    setIsPersistingProjects(true);
    onPersistProjects(nextProjects)
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Failed to reorder projects.");
      })
      .finally(() => setIsPersistingProjects(false));
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;
    const nextProjects = projects.filter((project) => project.id !== selectedProject.id);

    setIsPersistingProjects(true);
    onPersistProjects(nextProjects)
      .then(() => {
        setIsDeleteConfirmOpen(false);
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Failed to delete project.");
      })
      .finally(() => setIsPersistingProjects(false));
  };

  const handleUploadSectionImage = async (sectionIndex: number, file: File) => {
    if (!editableProject) return;

    const section = editableProject.sections[sectionIndex];
    if (!section) return;
    const sectionStorageId =
      (section.stableId || section.id).trim() || String(sectionIndex + 1).padStart(2, "0");

    const sectionUploadKey = `${editableProject.id}:${sectionStorageId}`;
    setUploadingSectionIds((current) => [...current, sectionUploadKey]);

    try {
      const uploadedImage = await uploadSectionImageAsset(
        editableProject.id,
        sectionStorageId,
        file,
      );
      updateDraftProject((project) => ({
        ...project,
        sections: project.sections.map((currentSection, currentIndex) =>
          currentIndex === sectionIndex
            ? {
                ...currentSection,
                images: [...(currentSection.images ?? []), uploadedImage],
              }
            : currentSection,
        ),
        updatedAt: new Date().toISOString(),
      }));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploadingSectionIds((current) => current.filter((item) => item !== sectionUploadKey));
    }
  };

  const handleRemoveSectionImage = (sectionIndex: number, imageId: string) => {
    updateDraftProject((project) => {
      const targetSection = project.sections[sectionIndex];
      const removedImage = (targetSection?.images ?? []).find((image) => image.id === imageId);
      const isLegacySectionImage = removedImage?.id.startsWith(`legacy-${project.id}-`);

      let nextProjectImages = [...project.images];
      if (isLegacySectionImage && removedImage?.src) {
        const legacyImageIndex = nextProjectImages.findIndex((src) => src === removedImage.src);
        if (legacyImageIndex !== -1) {
          nextProjectImages.splice(legacyImageIndex, 1);
        }
      }

      return {
        ...project,
        images: nextProjectImages,
        sections: project.sections.map((section, currentIndex) =>
          currentIndex === sectionIndex
            ? {
                ...section,
                images: (section.images ?? []).filter((image) => image.id !== imageId),
              }
            : section,
        ),
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const handleMoveSectionImage = (
    sectionIndex: number,
    imageId: string,
    direction: "up" | "down",
  ) => {
    updateDraftProject((project) => ({
      ...project,
      sections: project.sections.map((section, currentIndex) => {
        if (currentIndex !== sectionIndex) return section;

        const images = [...(section.images ?? [])];
        const imageIndex = images.findIndex((image) => image.id === imageId);
        if (imageIndex === -1) return section;

        const targetIndex = direction === "up" ? imageIndex - 1 : imageIndex + 1;
        if (targetIndex < 0 || targetIndex >= images.length) return section;

        const [movedImage] = images.splice(imageIndex, 1);
        images.splice(targetIndex, 0, movedImage);

        return {
          ...section,
          images,
        };
      }),
      updatedAt: new Date().toISOString(),
    }));
  };

  const totalDrafts = projects.filter((project) => project.status === "draft").length;
  const publishedAI = projects.filter((project) => project.category === "ai-product" && project.status === "published").length;
  const publishedUX = projects.filter((project) => project.category === "ux-design" && project.status === "published").length;
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

  const handleSaveChanges = async () => {
    if (!selectedProject || !draftProject) return;

    const nextProjects = sortPortfolioProjects(
      projects.map((project) =>
        project.id === selectedProject.id
          ? {
              ...cloneProject(draftProject),
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    );

    setIsPersistingProjects(true);
    try {
      await onPersistProjects(nextProjects);
      toast.success("Project saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save project.");
    } finally {
      setIsPersistingProjects(false);
    }
  };

  const moduleOptions: Array<{ key: DashboardModule; label: string }> = [
    { key: "security", label: "Security" },
    { key: "projects", label: "Project" },
    { key: "resume", label: "Resume" },
    { key: "info", label: "Information" },
  ];

  const handleSavePlatformSettings = async () => {
    const trimmedNewPassword = platformNewPassword.trim();

    if (!trimmedNewPassword) {
      toast.error("请输入新的平台登录密码。");
      return;
    }

    try {
      await updateAuthSettings({
        target: "platform",
        field: "password",
        originalPassword: platformOriginalPassword,
        newPassword: trimmedNewPassword,
      });
      setPlatformOriginalPassword("");
      setPlatformNewPassword("");
      toast.success("Platform Login 密码已更新。");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Platform Login 密码更新失败。");
    }
  };

  const handleSaveAdminSettings = async () => {
    const trimmedNewPassword = adminNewPassword.trim();

    if (!trimmedNewPassword) {
      toast.error("请输入新的后台登录密码。");
      return;
    }

    try {
      await updateAuthSettings({
        target: "admin",
        field: "password",
        originalPassword: adminOriginalPassword,
        newPassword: trimmedNewPassword,
      });
      setAdminOriginalPassword("");
      setAdminNewPassword("");
      toast.success("Admin Login 密码已更新。");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Admin Login 密码更新失败。");
    }
  };

  const handleSavePlatformWelcomeText = async () => {
    const trimmedWelcome = platformWelcomeDraft.trim();
    if (!trimmedWelcome) {
      toast.error("请填写 Platform Login 欢迎文字。");
      return;
    }

    try {
      await updateAuthSettings({
        target: "platform",
        field: "welcomeText",
        welcomeText: trimmedWelcome,
      });
      toast.success("Platform Login 欢迎语已更新。");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Platform Login 欢迎语更新失败。");
    }
  };

  const handleSaveAdminWelcomeText = async () => {
    const trimmedWelcome = adminWelcomeDraft.trim();
    if (!trimmedWelcome) {
      toast.error("请填写 Admin Login 欢迎文字。");
      return;
    }

    try {
      await updateAuthSettings({
        target: "admin",
        field: "welcomeText",
        welcomeText: trimmedWelcome,
      });
      toast.success("Admin Login 欢迎语已更新。");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Admin Login 欢迎语更新失败。");
    }
  };

  const renderDashboardShell = (preview = false) => {
    return (
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
          <header className="grid grid-cols-[minmax(0,1fr)_460px] items-start gap-6">
            <div className="rounded-[36px] border border-black/6 bg-white/88 p-7 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] uppercase tracking-[3px] text-[#7d7d84]">Admin Dashboard</div>
                  {showPreviewSkeleton ? (
                    <div className="mt-3 space-y-4">
                      <div className="h-[42px] w-[420px] rounded-full bg-black/10" />
                      <div className="h-[14px] w-[560px] rounded-full bg-black/7" />
                      <div className="h-[14px] w-[500px] rounded-full bg-black/6" />
                    </div>
                  ) : (
                    <>
                      <h1 className="mt-3 whitespace-nowrap font-['Quantum',sans-serif] text-[42px] uppercase leading-[44px] tracking-[-1px] text-[#1a1c1c]">
                        Admin Dashboard
                      </h1>
                      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 font-['OPPOSans:Light',sans-serif] text-[15px] leading-[30px] text-[#474747]">
                        <p>AI Product: {publishedAI}</p>
                        <p>UX Design: {publishedUX}</p>
                        <p>Drafts: {totalDrafts}</p>
                      </div>
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

            <div className="grid h-full w-full self-stretch grid-cols-2 gap-4">
              {showPreviewSkeleton ? (
                <>
                  {["安全设置", "项目配置", "简历配置", "信息配置"].map((label, index) => (
                    <div key={label} className="flex h-full flex-col rounded-[28px] border border-black/6 bg-white/90 px-5 py-4 shadow-[0_18px_50px_rgba(26,28,28,0.06)]">
                      <div className="text-[11px] uppercase tracking-[2.4px] text-[#7d7d84]">{label}</div>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                        <div className="h-[28px] w-[44px] rounded-full bg-black/10" />
                        <div className={`h-[10px] w-[52px] rounded-full ${index % 2 === 0 ? "bg-[#03c9c3]/45" : "bg-[#f3a67d]/55"}`} />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="col-span-2 grid h-full min-h-0 grid-cols-2 gap-4">
                  {moduleOptions.map((module) => (
                    <ModuleToggleCard
                      key={module.key}
                      label={module.label}
                      active={activeModule === module.key}
                      preview={preview}
                      onClick={() => setActiveModule(module.key)}
                    />
                  ))}
                </div>
              )}
            </div>
          </header>

          {activeModule === "projects" ? (
          <div className="grid min-h-0 flex-1 grid-cols-[320px_minmax(0,1fr)] gap-6">
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
                <div className="grid grid-cols-2 gap-2">
                  {(["ai-product", "ux-design"] as const).map((category) => (
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
                      {category === "ai-product" ? "AI" : "UX"}
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
                      <div
                        key={project.id}
                        role="button"
                        tabIndex={preview ? -1 : 0}
                        onClick={() => {
                          if (!preview) setSelectedProjectId(project.id);
                        }}
                        onKeyDown={(event) => {
                          if (preview) return;
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedProjectId(project.id);
                          }
                        }}
                        className={`w-full rounded-[24px] border p-4 text-left transition-all disabled:pointer-events-none ${
                          dashboardProject?.id === project.id
                            ? "border-[#03c9c3]/28 bg-[#eefbf9] shadow-[0_18px_36px_rgba(3,201,195,0.12)]"
                            : "border-black/6 bg-[#fbfaf7] hover:border-black/12 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
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
                          </div>
                          <div className="flex shrink-0 self-stretch flex-col justify-center gap-2">
                            <button
                              type="button"
                              aria-label="Move up"
                              title="Move up"
                              disabled={preview || filteredProjects[0]?.id === project.id}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleMoveProject(project.id, "up");
                              }}
                              className="flex size-[34px] items-center justify-center rounded-full border border-black/8 bg-white text-[#7d7d84] transition-colors hover:bg-[#f4efe8] disabled:cursor-not-allowed disabled:border-black/6 disabled:bg-[#f4efe8] disabled:text-[#b2b2b8]"
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M7 3L11 7H3L7 3Z" fill="currentColor" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              aria-label="Move down"
                              title="Move down"
                              disabled={preview || filteredProjects[filteredProjects.length - 1]?.id === project.id}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleMoveProject(project.id, "down");
                              }}
                              className="flex size-[34px] items-center justify-center rounded-full border border-black/8 bg-white text-[#7d7d84] transition-colors hover:bg-[#f4efe8] disabled:cursor-not-allowed disabled:border-black/6 disabled:bg-[#f4efe8] disabled:text-[#b2b2b8]"
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M7 11L3 7H11L7 11Z" fill="currentColor" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
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
                        disabled={preview || !hasUnsavedChanges || isPersistingProjects}
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

                  <div className="min-h-0 flex-1 overflow-hidden pr-2">
                    <div className="grid h-full min-h-0 gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
                      <div className="h-full min-h-0 space-y-5 overflow-y-auto pr-2">
                        <section className="rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
                          <div className="mb-4 text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Basic Information</div>
                          <div className="grid gap-4">
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
                            <label className="flex flex-col gap-2">
                              <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Title</span>
                              <input
                                value={editableProject.title}
                                readOnly={preview}
                                onChange={(event) => handleFieldChange("title", event.target.value)}
                                className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                              />
                            </label>
                            <label className="flex flex-col gap-2">
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
                          <div className="mb-4 text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Case Study Hero</div>
                          <div className="grid gap-4">
                            <label className="flex flex-col gap-2">
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
                            <label className="flex flex-col gap-2">
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
                            <label className="flex flex-col gap-2">
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

                      </div>

                      <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Detail Sections</div>
                          <button
                            type="button"
                            disabled={preview}
                            onClick={() =>
                              handleFieldChange("sections", [
                                ...normalizeSectionIdsByOrder(editableProject.sections),
                                {
                                  stableId: createStableSectionId(),
                                  id: String(editableProject.sections.length + 1).padStart(2, "0"),
                                  title: "新增章节",
                                  subtitle: "new section",
                                  images: [],
                                },
                              ])
                            }
                            className="rounded-full bg-[#effbfa] px-4 py-2 text-[10px] uppercase tracking-[2px] text-[#039f9a] transition-colors hover:bg-[#def7f5] disabled:pointer-events-none"
                          >
                            Add Section
                          </button>
                        </div>
                        <div className="min-h-0 space-y-4 overflow-y-auto pr-1">
                          {editableProject.sections.map((section, index) => (
                            <SectionCard
                              key={`${editableProject.id}-${section.stableId ?? section.id}`}
                              projectId={editableProject.id}
                              section={section}
                              index={index}
                              uploading={uploadingSectionIds.includes(`${editableProject.id}:${section.stableId ?? section.id}`)}
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
                                  normalizeSectionIdsByOrder(
                                    editableProject.sections.filter((_, currentIndex) => currentIndex !== index),
                                  ),
                                );
                              }}
                              onUploadImage={(file) => handleUploadSectionImage(index, file)}
                              onRemoveImage={(imageId) => handleRemoveSectionImage(index, imageId)}
                              onMoveImage={(imageId, direction) =>
                                handleMoveSectionImage(index, imageId, direction)
                              }
                            />
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-[28px] border border-dashed border-black/10 bg-[#faf8f4] text-center text-[14px] text-[#7d7d84]">
                  Select or create a project to start editing.
                </div>
              )}
            </main>

          </div>
          ) : activeModule === "security" ? (
            <section className="grid min-h-0 flex-1 grid-cols-2 gap-6">
              <div className="flex min-h-0 flex-col rounded-[36px] border border-black/6 bg-white/88 p-6 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
                <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Update: 2026.05.20</div>
                <div className="mt-2 font-['Quantum',sans-serif] text-[24px] uppercase text-[#1a1c1c]">Platform Login</div>
                <div className="mt-6 grid gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Welcome Text</span>
                    <div className="flex items-center gap-3">
                      <input
                        value={platformWelcomeDraft}
                        onChange={(event) => setPlatformWelcomeDraft(event.target.value)}
                        className="flex-1 rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                      />
                      <button
                        type="button"
                        onClick={handleSavePlatformWelcomeText}
                        aria-label="Confirm platform welcome text"
                        title="Confirm platform welcome text"
                        className="flex size-[44px] shrink-0 items-center justify-center rounded-full border border-black/8 bg-white text-[#1a1c1c] transition-colors hover:bg-[#f7f3ee]"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12.5L9.5 17L19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Current Password</span>
                    <input
                      type="password"
                      value={platformOriginalPassword}
                      onChange={(event) => setPlatformOriginalPassword(event.target.value)}
                      className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">New Password</span>
                    <input
                      type="password"
                      value={platformNewPassword}
                      onChange={(event) => setPlatformNewPassword(event.target.value)}
                      className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                    />
                  </label>
                </div>
                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={handleSavePlatformSettings}
                    className="rounded-full bg-[#1a1c1c] px-5 py-3 text-[11px] uppercase tracking-[2px] text-white transition-transform hover:-translate-y-[1px]"
                  >
                    Save Platform Login
                  </button>
                </div>
              </div>

              <div className="flex min-h-0 flex-col rounded-[36px] border border-black/6 bg-white/88 p-6 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
                <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Update: 2026.05.20</div>
                <div className="mt-2 font-['Quantum',sans-serif] text-[24px] uppercase text-[#1a1c1c]">Admin Login</div>
                <div className="mt-6 grid gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Welcome Text</span>
                    <div className="flex items-center gap-3">
                      <input
                        value={adminWelcomeDraft}
                        onChange={(event) => setAdminWelcomeDraft(event.target.value)}
                        className="flex-1 rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                      />
                      <button
                        type="button"
                        onClick={handleSaveAdminWelcomeText}
                        aria-label="Confirm admin welcome text"
                        title="Confirm admin welcome text"
                        className="flex size-[44px] shrink-0 items-center justify-center rounded-full border border-black/8 bg-white text-[#1a1c1c] transition-colors hover:bg-[#f7f3ee]"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12.5L9.5 17L19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">Current Password</span>
                    <input
                      type="password"
                      value={adminOriginalPassword}
                      onChange={(event) => setAdminOriginalPassword(event.target.value)}
                      className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">New Password</span>
                    <input
                      type="password"
                      value={adminNewPassword}
                      onChange={(event) => setAdminNewPassword(event.target.value)}
                      className="rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] outline-none focus:border-[#03c9c3]/50"
                    />
                  </label>
                </div>
                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={handleSaveAdminSettings}
                    className="rounded-full bg-[#1a1c1c] px-5 py-3 text-[11px] uppercase tracking-[2px] text-white transition-transform hover:-translate-y-[1px]"
                  >
                    Save Admin Login
                  </button>
                </div>
              </div>
            </section>
          ) : activeModule === "resume" ? (
            <ResumeModuleEditor
              resumeContent={resumeContent}
              onPersistResumeContent={onPersistResumeContent}
              publishedPortfolioProjects={projects.filter((project) => project.status === "published")}
            />
          ) : activeModule === "info" ? (
            <InformationModuleEditor
              resumeContent={resumeContent}
              onPersistResumeContent={onPersistResumeContent}
            />
          ) : (
            <section className="flex min-h-0 flex-1 items-center justify-center rounded-[36px] border border-black/6 bg-white/88 p-8 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">
                  {moduleOptions.find((module) => module.key === activeModule)?.label}
                </div>
                <div className="mt-3 font-['Quantum',sans-serif] text-[28px] uppercase text-[#1a1c1c]">
                  Coming Soon
                </div>
                <p className="mt-4 font-['OPPOSans:Light',sans-serif] text-[15px] leading-[28px] text-[#5f5f65]">
                  这个模块稍后补充具体配置内容，当前先保留占位展示。
                </p>
              </div>
            </section>
          )}

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
  };

  if (!sessionChecked) {
    return <div className="h-screen w-full bg-[#e6e6e6]" />;
  }

  if (!isUnlocked) {
    const panelStateClass =
      status === "success"
        ? "border-[#004e8d] shadow-[8px_8px_24px_0_rgba(0,105,209,0.1),inset_4px_4px_8px_0_rgba(0,105,209,0.1)]"
        : status === "error"
        ? "border-[#d78ea0] shadow-[8px_8px_24px_0_rgba(215,142,160,0.12),inset_4px_4px_8px_0_rgba(0,105,209,0.08)]"
        : "border-[#004e8d] shadow-[8px_8px_24px_0_rgba(0,105,209,0.1),inset_4px_4px_8px_0_rgba(0,105,209,0.1)]";

    const inputStateClass = isFocused
      ? "border-[#004e8d]/30 bg-[rgba(0,0,0,0.06)] shadow-[inset_0_0_0_1px_rgba(0,78,141,0.08)]"
      : status === "success"
        ? "border-[#004e8d]/24 bg-[rgba(0,78,141,0.04)]"
        : status === "error"
        ? "border-[#ff6b8a]/45 bg-[rgba(255,107,138,0.06)]"
        : password.trim().length > 0
          ? "border-[#004e8d]/16 bg-[rgba(0,0,0,0.04)]"
          : "border-transparent bg-[rgba(0,0,0,0.05)]";

    const inputFieldStateClass =
      status === "success"
        ? "text-[#6c6c6c] placeholder:text-transparent"
        : password.trim().length > 0
          ? "text-[#6c6c6c] placeholder:text-transparent"
          : "text-[#6c6c6c] placeholder:text-[#6c6c6c]/50";

    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#e6e6e6] text-[#1a1c1c]">
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
            className={`absolute right-[100px] top-[320px] transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              status === "success" ? "translate-x-[-24px] scale-[1.02] opacity-0" : "translate-x-0 scale-100 opacity-100"
            } ${shouldShake ? "animate-[shake_0.45s_ease-in-out]" : ""}`}
          >
            <PasswordAccessCard
              title={authSettings.adminWelcomeText}
              value={password}
              placeholder="Please Enter Your Password"
              helperText=""
              panelClassName={`backdrop-blur-[24px] ${panelStateClass}`}
              titleClassName={status === "error" ? "text-[#ff9bb0]" : "text-[#004e8d]"}
              inputClassName={inputStateClass}
              inputFieldClassName={inputFieldStateClass}
              inputReadOnly={status === "success"}
              onChange={(value) => {
                if (status === "success") return;
                setPassword(value);
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
            />
          </div>
        </div>
      </div>
    );
  }

  return renderDashboardShell(false);
}
