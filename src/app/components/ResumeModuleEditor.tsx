import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  type ResumeAiProjectGroup,
  type ResumeUxCardGroupBlock,
  type ResumeUxGroupCard,
  type ResumeUxLargeCard,
  type ResumeUxLargeCardBlock,
  type ResumeUxProjectBlock,
  type ResumeContentData,
  type ResumeEducationAward,
  type ResumeExperienceItem,
  type ResumeExperienceProjectItem,
  type ResumeExperienceProjectSet,
} from "../data/resumeContent";
import { type PortfolioProject } from "../data/portfolioProjects";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgVeraPortrait from "figma:asset/c2a725be084d36e42b2de03b1df60b14cc7638a2.png";

type ResumeEditorSection = "profile" | "experience" | "ai-products" | "ux-case" | "education";
type ResumeAiProductsEditorTab = "meta" | "projects" | "cta";
type ResumeUxCaseEditorTab = "meta" | "projects";
type ResumeEducationEditorTab = "meta" | "school" | "award";

function cloneResumeContent(content: ResumeContentData): ResumeContentData {
  return JSON.parse(JSON.stringify(content)) as ResumeContentData;
}

function createStableId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function normalizeExperiences(experiences: ResumeExperienceItem[]) {
  return experiences.map((experience, index) => ({
    ...experience,
    numberLabel: String(index + 1).padStart(2, "0"),
  }));
}

function moveItem<T>(items: T[], index: number, direction: "up" | "down") {
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= items.length) return items;
  const nextItems = [...items];
  const [movedItem] = nextItems.splice(index, 1);
  nextItems.splice(targetIndex, 0, movedItem);
  return nextItems;
}

function ResumeNavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[20px] border px-4 py-3 text-left text-[11px] uppercase tracking-[2px] transition-colors ${
        active
          ? "border-[#03c9c3]/24 bg-[#eefbf9] text-[#1a1c1c]"
          : "border-black/6 bg-white text-[#6d6d73] hover:bg-[#f7f3ee]"
      }`}
    >
      {label}
    </button>
  );
}

function InlineTabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[2px] transition-colors ${
        active
          ? "border-[#03c9c3]/24 bg-[#eefbf9] text-[#039f9a]"
          : "border-black/6 bg-white text-[#7d7d84] hover:bg-[#f7f3ee]"
      }`}
    >
      {label}
    </button>
  );
}

function CircleActionButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex size-[32px] items-center justify-center rounded-full border border-black/8 bg-white text-[#1a1c1c] transition-colors hover:bg-[#f7f3ee] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] uppercase tracking-[1.8px] text-[#7d7d84]">{children}</span>;
}

function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] text-[#1a1c1c] outline-none transition-colors focus:border-[#03c9c3]/50 ${props.className ?? ""}`}
    />
  );
}

function FieldTextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[112px] rounded-[16px] border border-black/8 bg-white px-4 py-3 text-[14px] leading-[24px] text-[#1a1c1c] outline-none transition-colors focus:border-[#03c9c3]/50 ${props.className ?? ""}`}
    />
  );
}

function FieldSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`h-[50px] w-full appearance-none rounded-[16px] border border-black/8 bg-white px-4 pr-12 text-[14px] text-[#1a1c1c] outline-none transition-colors focus:border-[#03c9c3]/50 ${props.className ?? ""}`}
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1a1c1c]"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export function ResumeModuleEditor({
  resumeContent,
  onPersistResumeContent,
  publishedPortfolioProjects,
}: {
  resumeContent: ResumeContentData;
  onPersistResumeContent: (nextContent: ResumeContentData) => Promise<ResumeContentData>;
  publishedPortfolioProjects: PortfolioProject[];
}) {
  const [activeSection, setActiveSection] = useState<ResumeEditorSection>("profile");
  const [activeAiProductsTab, setActiveAiProductsTab] = useState<ResumeAiProductsEditorTab>("projects");
  const [activeUxCaseTab, setActiveUxCaseTab] = useState<ResumeUxCaseEditorTab>("projects");
  const [activeEducationTab, setActiveEducationTab] = useState<ResumeEducationEditorTab>("meta");
  const [draftContent, setDraftContent] = useState<ResumeContentData>(cloneResumeContent(resumeContent));
  const [selectedExperienceId, setSelectedExperienceId] = useState(
    resumeContent.experienceGrid.experiences[0]?.stableId ?? "",
  );
  const [isPersisting, setIsPersisting] = useState(false);
  const [isUploadingPortrait, setIsUploadingPortrait] = useState(false);
  const [uploadingAiProjectImageId, setUploadingAiProjectImageId] = useState<string | null>(null);
  const [uploadingUxMediaId, setUploadingUxMediaId] = useState<string | null>(null);
  const [uploadingEducationAwardImageId, setUploadingEducationAwardImageId] = useState<string | null>(null);
  const portraitInputRef = useRef<HTMLInputElement | null>(null);
  const aiProjectImageInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const uxMediaInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const educationAwardImageInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const educationAwardFieldsRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const profileFieldsRef = useRef<HTMLDivElement | null>(null);
  const [portraitCardHeight, setPortraitCardHeight] = useState<number | null>(null);
  const [educationAwardImageSizes, setEducationAwardImageSizes] = useState<Record<string, { height: number; width: number }>>({});

  useEffect(() => {
    setDraftContent(cloneResumeContent(resumeContent));
  }, [resumeContent]);

  useEffect(() => {
    const firstId = draftContent.experienceGrid.experiences[0]?.stableId ?? "";
    if (!selectedExperienceId || !draftContent.experienceGrid.experiences.some((item) => item.stableId === selectedExperienceId)) {
      setSelectedExperienceId(firstId);
    }
  }, [draftContent.experienceGrid.experiences, selectedExperienceId]);

  useEffect(() => {
    if (activeSection !== "profile") return;

    const element = profileFieldsRef.current;
    if (!element) return;

    let frameId = 0;
    const syncHeight = () => {
      frameId = window.requestAnimationFrame(() => {
        const nextHeight = Math.round(element.getBoundingClientRect().height);
        setPortraitCardHeight((current) => (current === nextHeight ? current : nextHeight));
      });
    };

    syncHeight();

    const observer = new ResizeObserver(() => {
      syncHeight();
    });

    observer.observe(element);
    window.addEventListener("resize", syncHeight);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, [activeSection, draftContent.profile.aboutLabel, draftContent.profile.chineseName, draftContent.profile.englishName, draftContent.profile.roleSubtitle]);

  useEffect(() => {
    if (activeSection !== "education" || activeEducationTab !== "award") return;

    let frameId = 0;
    const awardIds = draftContent.education.awards.map((award) => award.stableId);

    const syncSizes = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const nextSizes = awardIds.reduce<Record<string, { height: number; width: number }>>((sizes, stableId) => {
          const element = educationAwardFieldsRefs.current[stableId];
          if (!element) return sizes;
          const height = Math.round(element.getBoundingClientRect().height);
          if (height > 0) {
            sizes[stableId] = {
              height,
              width: Math.round(height * 1.5),
            };
          }
          return sizes;
        }, {});

        setEducationAwardImageSizes((current) =>
          JSON.stringify(current) === JSON.stringify(nextSizes) ? current : nextSizes,
        );
      });
    };

    syncSizes();

    const observers = awardIds
      .map((stableId) => {
        const element = educationAwardFieldsRefs.current[stableId];
        if (!element) return null;
        const observer = new ResizeObserver(syncSizes);
        observer.observe(element);
        return observer;
      })
      .filter((observer): observer is ResizeObserver => Boolean(observer));

    window.addEventListener("resize", syncSizes);

    return () => {
      window.cancelAnimationFrame(frameId);
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("resize", syncSizes);
    };
  }, [activeEducationTab, activeSection, draftContent.education.awards]);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(resumeContent) !== JSON.stringify(draftContent),
    [draftContent, resumeContent],
  );

  const selectedExperience = draftContent.experienceGrid.experiences.find(
    (item) => item.stableId === selectedExperienceId,
  );

  const selectedProjectSet =
    draftContent.experienceGrid.projectSets.find(
      (projectSet) => projectSet.experienceStableId === selectedExperienceId,
    ) ??
    draftContent.experienceGrid.projectSets[0];
  const selectedProjectPageCount = Math.max(
    1,
    Math.ceil((selectedProjectSet?.items.length ?? 0) / 3),
  );
  const linkedProjectOptions = useMemo(
    () =>
      publishedPortfolioProjects.map((project) => ({
        value: project.id,
        label: `${project.category === "ai-product" ? "[AI]" : "[UX]"} ${project.title}`,
      })),
    [publishedPortfolioProjects],
  );

  const updateDraft = (updater: (current: ResumeContentData) => ResumeContentData) => {
    setDraftContent((current) => updater(cloneResumeContent(current)));
  };

  const handleSave = async () => {
    setIsPersisting(true);
    try {
      const savedContent = await onPersistResumeContent(draftContent);
      setDraftContent(cloneResumeContent(savedContent));
      toast.success("Resume saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save resume.");
    } finally {
      setIsPersisting(false);
    }
  };

  const handleCancel = () => {
    setDraftContent(cloneResumeContent(resumeContent));
  };

  const handlePortraitUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsUploadingPortrait(true);
    try {
      const response = await fetch("/api/admin/upload-resume-profile-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Failed to upload portrait image.");
      }

      const payload = (await response.json()) as { src?: string };
      if (!payload.src) {
        throw new Error("Portrait upload did not return an image URL.");
      }

      updateProfileField("portraitImage", payload.src);
      toast.success("Portrait uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload portrait image.");
    } finally {
      setIsUploadingPortrait(false);
      if (portraitInputRef.current) {
        portraitInputRef.current.value = "";
      }
    }
  };

  const handleAiProjectCoverUpload = async (groupStableId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploadingAiProjectImageId(groupStableId);
    try {
      const response = await fetch("/api/admin/upload-resume-ai-project-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Failed to upload cover image.");
      }

      const payload = (await response.json()) as { src?: string };
      if (!payload.src) {
        throw new Error("Cover image upload did not return an image URL.");
      }

      updateAiProjectGroup(groupStableId, (current) => ({ ...current, coverImage: payload.src }));
      toast.success("Cover image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload cover image.");
    } finally {
      setUploadingAiProjectImageId((current) => (current === groupStableId ? null : current));
      const input = aiProjectImageInputRefs.current[groupStableId];
      if (input) input.value = "";
    }
  };

  const handleUxCaseMediaUpload = async (
    mediaStableId: string,
    file: File,
    target:
      | { type: "large-card"; blockStableId: string }
      | { type: "group-card"; blockStableId: string; side: "left" | "right" },
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploadingUxMediaId(mediaStableId);
    try {
      const response = await fetch("/api/admin/upload-resume-ux-case-media", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Failed to upload UX case media.");
      }

      const payload = (await response.json()) as { src?: string; mimeType?: string };
      if (!payload.src) {
        throw new Error("UX case media upload did not return a media URL.");
      }

      if (target.type === "large-card") {
        updateUxProjectBlock(target.blockStableId, (block) => {
          if (block.type !== "large-card") return block;
          return {
            ...block,
            card: {
              ...block.card,
              mediaUrl: payload.src ?? "",
              mediaType: payload.mimeType?.startsWith("video/") ? "video" : "image",
            },
          };
        });
      } else {
        updateUxProjectBlock(target.blockStableId, (block) => {
          if (block.type !== "card-group") return block;
          const field = target.side === "left" ? "leftCard" : "rightCard";
          return {
            ...block,
            [field]: {
              ...block[field],
              image: payload.src ?? "",
            },
          };
        });
      }

      toast.success("UX case media uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload UX case media.");
    } finally {
      setUploadingUxMediaId((current) => (current === mediaStableId ? null : current));
      const input = uxMediaInputRefs.current[mediaStableId];
      if (input) input.value = "";
    }
  };

  const handleEducationAwardImageUpload = async (awardStableId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploadingEducationAwardImageId(awardStableId);
    try {
      const response = await fetch("/api/admin/upload-resume-education-award-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Failed to upload award image.");
      }

      const payload = (await response.json()) as { src?: string };
      if (!payload.src) {
        throw new Error("Award image upload did not return an image URL.");
      }

      handleUpdateAward(awardStableId, (currentAward) => ({
        ...currentAward,
        image: payload.src ?? "",
      }));
      toast.success("Award image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload award image.");
    } finally {
      setUploadingEducationAwardImageId((current) => (current === awardStableId ? null : current));
      const input = educationAwardImageInputRefs.current[awardStableId];
      if (input) input.value = "";
    }
  };

  const updateProfileField = <K extends keyof ResumeContentData["profile"]>(
    key: K,
    value: ResumeContentData["profile"][K],
  ) => {
    updateDraft((current) => ({
      ...current,
      profile: {
        ...current.profile,
        [key]: value,
      },
    }));
  };

  const updateEducationField = <K extends keyof ResumeContentData["education"]>(
    key: K,
    value: ResumeContentData["education"][K],
  ) => {
    updateDraft((current) => ({
      ...current,
      education: {
        ...current.education,
        [key]: value,
      },
    }));
  };

  const updateAiProductsField = <K extends keyof ResumeContentData["aiProducts"]>(
    key: K,
    value: ResumeContentData["aiProducts"][K],
  ) => {
    updateDraft((current) => ({
      ...current,
      aiProducts: {
        ...current.aiProducts,
        [key]: value,
      },
    }));
  };

  const updateUxCaseField = <K extends keyof ResumeContentData["uxCase"]>(
    key: K,
    value: ResumeContentData["uxCase"][K],
  ) => {
    updateDraft((current) => ({
      ...current,
      uxCase: {
        ...current.uxCase,
        [key]: value,
      },
    }));
  };

  const updateExperience = (stableId: string, updater: (item: ResumeExperienceItem) => ResumeExperienceItem) => {
    updateDraft((current) => ({
      ...current,
      experienceGrid: {
        ...current.experienceGrid,
        experiences: normalizeExperiences(
          current.experienceGrid.experiences.map((experience) =>
            experience.stableId === stableId ? updater(experience) : experience,
          ),
        ),
      },
    }));
  };

  const updateSelectedProjectItems = (
    updater: (items: ResumeExperienceProjectItem[]) => ResumeExperienceProjectItem[],
  ) => {
    if (!selectedProjectSet) return;
    updateDraft((current) => ({
      ...current,
      experienceGrid: {
        ...current.experienceGrid,
        projectSets: current.experienceGrid.projectSets.map((projectSet) =>
          projectSet.stableId === selectedProjectSet.stableId
            ? {
                ...projectSet,
                items: updater(projectSet.items),
              }
            : projectSet,
        ),
      },
    }));
  };

  const handleAddExperience = () => {
    const nextStableId = createStableId("resume-exp");
    updateDraft((current) => ({
      ...current,
      experienceGrid: {
        experiences: normalizeExperiences([
          ...current.experienceGrid.experiences,
          {
            stableId: nextStableId,
            numberLabel: "",
            company: "新经历公司",
            role: "ROLE TITLE",
            period: "2026 — PRESENT",
          },
        ]),
        projectSets: [
          ...current.experienceGrid.projectSets,
          {
            stableId: createStableId("resume-project-set"),
            experienceStableId: nextStableId,
            items: [
              {
                stableId: createStableId("resume-project-item"),
                title: "新项目标题",
                description: "在这里填写和这段经历关联的项目说明。",
              },
            ],
          },
        ],
      },
    }));
    setSelectedExperienceId(nextStableId);
  };

  const handleRemoveExperience = (stableId: string) => {
    updateDraft((current) => ({
      ...current,
      experienceGrid: {
        experiences: normalizeExperiences(
          current.experienceGrid.experiences.filter((experience) => experience.stableId !== stableId),
        ),
        projectSets: current.experienceGrid.projectSets.filter(
          (projectSet) => projectSet.experienceStableId !== stableId,
        ),
      },
    }));
  };

  const handleMoveExperience = (stableId: string, direction: "up" | "down") => {
    updateDraft((current) => {
      const currentIndex = current.experienceGrid.experiences.findIndex(
        (experience) => experience.stableId === stableId,
      );
      if (currentIndex === -1) return current;

      return {
        ...current,
        experienceGrid: {
          ...current.experienceGrid,
          experiences: normalizeExperiences(
            moveItem(current.experienceGrid.experiences, currentIndex, direction),
          ),
        },
      };
    });
  };

  const handleAddProjectItem = () => {
    updateSelectedProjectItems((items) => [
      ...items,
      {
        stableId: createStableId("resume-project-item"),
        title: "新项目标题",
        description: "在这里填写项目说明。",
      },
    ]);
  };

  const handleMoveProjectItem = (stableId: string, direction: "up" | "down") => {
    updateSelectedProjectItems((items) => {
      const currentIndex = items.findIndex((item) => item.stableId === stableId);
      return moveItem(items, currentIndex, direction);
    });
  };

  const handleRemoveProjectItem = (stableId: string) => {
    updateSelectedProjectItems((items) => items.filter((item) => item.stableId !== stableId));
  };

  const handleUpdateProjectItem = (
    stableId: string,
    updater: (item: ResumeExperienceProjectItem) => ResumeExperienceProjectItem,
  ) => {
    updateSelectedProjectItems((items) =>
      items.map((item) => (item.stableId === stableId ? updater(item) : item)),
    );
  };

  const handleAddAward = () => {
    updateDraft((current) => ({
      ...current,
      education: {
        ...current.education,
        awards: [
          ...current.education.awards,
          {
            stableId: createStableId("resume-award"),
            date: "2026年1月",
            title: "新增奖项",
            description: "在这里填写奖项描述。",
            image: "",
          },
        ],
      },
    }));
  };

  const handleUpdateAward = (
    stableId: string,
    updater: (award: ResumeEducationAward) => ResumeEducationAward,
  ) => {
    updateDraft((current) => ({
      ...current,
      education: {
        ...current.education,
        awards: current.education.awards.map((award) =>
          award.stableId === stableId ? updater(award) : award,
        ),
      },
    }));
  };

  const handleMoveAward = (stableId: string, direction: "up" | "down") => {
    updateDraft((current) => {
      const currentIndex = current.education.awards.findIndex((award) => award.stableId === stableId);
      return {
        ...current,
        education: {
          ...current.education,
          awards: moveItem(current.education.awards, currentIndex, direction),
        },
      };
    });
  };

  const handleRemoveAward = (stableId: string) => {
    updateDraft((current) => ({
      ...current,
      education: {
        ...current.education,
        awards: current.education.awards.filter((award) => award.stableId !== stableId),
      },
    }));
  };

  const updateAiProjectGroup = (
    stableId: string,
    updater: (group: ResumeAiProjectGroup) => ResumeAiProjectGroup,
  ) => {
    updateDraft((current) => ({
      ...current,
      aiProducts: {
        ...current.aiProducts,
        projectGroups: current.aiProducts.projectGroups.map((group) =>
          group.stableId === stableId ? updater(group) : group,
        ),
      },
    }));
  };

  const handleAddAiProjectGroup = () => {
    updateDraft((current) => ({
      ...current,
      aiProducts: {
        ...current.aiProducts,
        projectGroups: [
          ...current.aiProducts.projectGroups,
          {
            stableId: createStableId("resume-ai-group"),
            roleLabel: "AI 产品经理",
            projectTitle: "新项目标题",
            highlightText: "",
            coverMeta: "项目元信息",
            coverImage: "",
            detailTabs: ["who", "what", "why", "how"],
            detailTitle: "角色定位",
            detailDescription: "一句话描述角色定位",
            detailFooterLabel: "Algorithm • Beta",
          },
        ],
      },
    }));
  };

  const handleMoveAiProjectGroup = (stableId: string, direction: "up" | "down") => {
    updateDraft((current) => {
      const currentIndex = current.aiProducts.projectGroups.findIndex((group) => group.stableId === stableId);
      return {
        ...current,
        aiProducts: {
          ...current.aiProducts,
          projectGroups: moveItem(current.aiProducts.projectGroups, currentIndex, direction),
        },
      };
    });
  };

  const handleRemoveAiProjectGroup = (stableId: string) => {
    updateDraft((current) => ({
      ...current,
      aiProducts: {
        ...current.aiProducts,
        projectGroups: current.aiProducts.projectGroups.filter((group) => group.stableId !== stableId),
      },
    }));
  };

  const updateUxProjectBlock = (
    stableId: string,
    updater: (block: ResumeUxProjectBlock) => ResumeUxProjectBlock,
  ) => {
    updateDraft((current) => ({
      ...current,
      uxCase: {
        ...current.uxCase,
        projectBlocks: current.uxCase.projectBlocks.map((block) =>
          block.stableId === stableId ? updater(block) : block,
        ),
      },
    }));
  };

  const handleAddUxLargeCard = () => {
    const nextBlockStableId = createStableId("resume-ux-block");
    const nextCardStableId = createStableId("resume-ux-large");

    updateDraft((current) => ({
      ...current,
      uxCase: {
        ...current.uxCase,
        projectBlocks: [
          ...current.uxCase.projectBlocks,
          {
            stableId: nextBlockStableId,
            type: "large-card",
            card: {
              stableId: nextCardStableId,
              idLabel: "",
              title: "新大型项目",
              description: "在这里填写大型 UX 项目描述。",
              category: "用户体验设计",
              tags: "PC端  |  SaaS平台",
              mediaUrl: "",
              mediaType: "image",
              linkedPortfolioProjectId: "",
            },
          } satisfies ResumeUxLargeCardBlock,
        ],
      },
    }));
  };

  const handleAddUxCardGroup = () => {
    const nextBlockStableId = createStableId("resume-ux-block");
    updateDraft((current) => ({
      ...current,
      uxCase: {
        ...current.uxCase,
        projectBlocks: [
          ...current.uxCase.projectBlocks,
          {
            stableId: nextBlockStableId,
            type: "card-group",
            leftCard: {
              stableId: createStableId("resume-ux-group-left"),
              idLabel: "",
              title: "新中卡项目",
              description: "在这里填写左侧中卡项目描述。",
              category: "产品经理 & UX设计",
              image: "",
              actionLabel: "VIEW PROTOTYPE",
              linkedPortfolioProjectId: "",
            },
            rightCard: {
              stableId: createStableId("resume-ux-group-right"),
              idLabel: "",
              title: "新小卡项目",
              description: "在这里填写右侧小卡项目描述。",
              category: "用户体验设计",
              image: "",
              actionLabel: "VIEW PROTOTYPE",
              linkedPortfolioProjectId: "",
            },
          } satisfies ResumeUxCardGroupBlock,
        ],
      },
    }));
  };

  const handleMoveUxProjectBlock = (stableId: string, direction: "up" | "down") => {
    updateDraft((current) => {
      const currentIndex = current.uxCase.projectBlocks.findIndex((block) => block.stableId === stableId);
      return {
        ...current,
        uxCase: {
          ...current.uxCase,
          projectBlocks: moveItem(current.uxCase.projectBlocks, currentIndex, direction),
        },
      };
    });
  };

  const handleRemoveUxProjectBlock = (stableId: string) => {
    updateDraft((current) => ({
      ...current,
      uxCase: {
        ...current.uxCase,
        projectBlocks: current.uxCase.projectBlocks.filter((block) => block.stableId !== stableId),
      },
    }));
  };

  const updateUxLargeCardInBlock = (
    blockStableId: string,
    updater: (card: ResumeUxLargeCard) => ResumeUxLargeCard,
  ) => {
    updateUxProjectBlock(blockStableId, (block) =>
      block.type === "large-card"
        ? {
            ...block,
            card: updater(block.card),
          }
        : block,
    );
  };

  const updateUxGroupCardInBlock = (
    blockStableId: string,
    side: "left" | "right",
    updater: (card: ResumeUxGroupCard) => ResumeUxGroupCard,
  ) => {
    updateUxProjectBlock(blockStableId, (block) => {
      if (block.type !== "card-group") return block;
      const field = side === "left" ? "leftCard" : "rightCard";
      return {
        ...block,
        [field]: updater(block[field]),
      };
    });
  };

  return (
    <section className="grid min-h-0 flex-1 grid-cols-[240px_minmax(0,1fr)] gap-6">
      <aside className="flex min-h-0 flex-col rounded-[36px] border border-black/6 bg-white/88 p-5 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
        <div className="space-y-3">
          <ResumeNavButton label="Profile" active={activeSection === "profile"} onClick={() => setActiveSection("profile")} />
          <ResumeNavButton label="Experience Grid" active={activeSection === "experience"} onClick={() => setActiveSection("experience")} />
          <ResumeNavButton label="AI Products" active={activeSection === "ai-products"} onClick={() => setActiveSection("ai-products")} />
          <ResumeNavButton label="UX Case" active={activeSection === "ux-case"} onClick={() => setActiveSection("ux-case")} />
          <ResumeNavButton label="Education" active={activeSection === "education"} onClick={() => setActiveSection("education")} />
        </div>
        <div className="mt-auto space-y-3 pt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPersisting || !hasUnsavedChanges}
            className="w-full rounded-full bg-[#1a1c1c] px-5 py-3 text-[11px] uppercase tracking-[2px] text-white transition-transform hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPersisting ? "Saving..." : "Save Resume"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={!hasUnsavedChanges || isPersisting}
            className="w-full rounded-full border border-black/8 bg-white px-5 py-3 text-[11px] uppercase tracking-[2px] text-[#1a1c1c] transition-colors hover:bg-[#f7f3ee] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cancel Changes
          </button>
        </div>
      </aside>

      <main className="min-h-0 overflow-hidden rounded-[36px] border border-black/6 bg-white/88 p-6 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
        {activeSection === "profile" ? (
          <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto pr-1">
            <div>
              <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Profile</div>
              <div className="mt-2 font-['Quantum',sans-serif] text-[26px] uppercase text-[#1a1c1c]">About Me</div>
            </div>
            <div className="grid items-stretch gap-5 xl:grid-cols-[max-content_minmax(0,1fr)]">
              <div className="flex self-stretch">
                <input
                  ref={portraitInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    void handlePortraitUpload(file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => portraitInputRef.current?.click()}
                  disabled={isUploadingPortrait}
                  style={portraitCardHeight ? { height: `${portraitCardHeight}px` } : undefined}
                  className="group relative block aspect-[3/4] w-auto max-w-[320px] overflow-hidden rounded-[28px] border border-black/8 bg-[#f1eeea] disabled:cursor-not-allowed"
                >
                  <ImageWithFallback
                    alt={draftContent.profile.englishName || "Resume portrait"}
                    src={draftContent.profile.portraitImage || imgVeraPortrait}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,28,28,0.04)_0%,rgba(26,28,28,0.18)_100%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex size-[56px] items-center justify-center rounded-full bg-white/88 text-[#1a1c1c] backdrop-blur-sm">
                      {isUploadingPortrait ? (
                        <div className="size-[18px] animate-spin rounded-full border-2 border-[#1a1c1c]/20 border-t-[#1a1c1c]" />
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              </div>
              <div ref={profileFieldsRef} className="grid content-start gap-4 self-stretch">
                <label className="flex flex-col gap-2">
                  <FieldLabel>About Label</FieldLabel>
                  <FieldInput
                    value={draftContent.profile.aboutLabel}
                    onChange={(event) => updateProfileField("aboutLabel", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Chinese Name</FieldLabel>
                  <FieldInput
                    value={draftContent.profile.chineseName}
                    onChange={(event) => updateProfileField("chineseName", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>English Name</FieldLabel>
                  <FieldInput
                    value={draftContent.profile.englishName}
                    onChange={(event) => updateProfileField("englishName", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Role Subtitle</FieldLabel>
                  <FieldInput
                    value={draftContent.profile.roleSubtitle}
                    onChange={(event) => updateProfileField("roleSubtitle", event.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <FieldLabel>About Text EN</FieldLabel>
                <FieldTextArea
                  value={draftContent.profile.aboutTextEn}
                  onChange={(event) => updateProfileField("aboutTextEn", event.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2">
                <FieldLabel>About Text ZH</FieldLabel>
                <FieldTextArea
                  value={draftContent.profile.aboutTextZh}
                  onChange={(event) => updateProfileField("aboutTextZh", event.target.value)}
                />
              </label>
            </div>
          </div>
        ) : activeSection === "experience" ? (
          <div className="grid h-full min-h-0 grid-cols-[340px_minmax(0,1fr)] gap-5">
            <section className="flex min-h-0 flex-col rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Experiences</div>
                  <div className="mt-2 font-['Quantum',sans-serif] text-[20px] uppercase text-[#1a1c1c]">Timeline</div>
                </div>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="rounded-full bg-[#effbfa] px-4 py-2 text-[10px] uppercase tracking-[2px] text-[#039f9a] transition-colors hover:bg-[#def7f5]"
                >
                  Add
                </button>
              </div>
              <div className="min-h-0 space-y-3 overflow-y-auto pr-1">
                {draftContent.experienceGrid.experiences.map((experience, index) => {
                  const active = experience.stableId === selectedExperienceId;
                  return (
                    <button
                      type="button"
                      key={experience.stableId}
                      onClick={() => setSelectedExperienceId(experience.stableId)}
                      className={`w-full rounded-[24px] border p-4 text-left transition-all ${
                        active
                          ? "border-[#03c9c3]/28 bg-[#eefbf9] shadow-[0_18px_36px_rgba(3,201,195,0.12)]"
                          : "border-black/6 bg-white hover:border-black/12 hover:bg-[#fefdfb]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">
                            {`Experience ${String(index + 1).padStart(2, "0")}`}
                          </div>
                          <div className="mt-2 font-['OPPOSans:Bold',sans-serif] text-[14px] leading-[20px] text-[#1a1c1c]">
                            {experience.company}
                          </div>
                          <div className="mt-1 text-[11px] uppercase tracking-[1.4px] text-[#5f5f65]">
                            {experience.role}
                          </div>
                          <div className="mt-2 text-[11px] text-[#8a8a90]">{experience.period}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <CircleActionButton label="Move experience up" disabled={index === 0} onClick={(event) => {
                            event.stopPropagation();
                            handleMoveExperience(experience.stableId, "up");
                          }}>
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                              <path d="M7 3L3 7H11L7 3Z" fill="currentColor" />
                            </svg>
                          </CircleActionButton>
                          <CircleActionButton label="Move experience down" disabled={index === draftContent.experienceGrid.experiences.length - 1} onClick={(event) => {
                            event.stopPropagation();
                            handleMoveExperience(experience.stableId, "down");
                          }}>
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                              <path d="M7 11L11 7H3L7 11Z" fill="currentColor" />
                            </svg>
                          </CircleActionButton>
                          <CircleActionButton label="Delete experience" disabled={draftContent.experienceGrid.experiences.length === 1} onClick={(event) => {
                            event.stopPropagation();
                            handleRemoveExperience(experience.stableId);
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                              <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                          </CircleActionButton>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="flex min-h-0 flex-col rounded-[28px] border border-black/7 bg-[#fbfaf7] p-5">
              {selectedExperience ? (
                <div className="grid min-h-0 h-full gap-5 overflow-y-auto pr-1">
                  <div>
                    <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">
                      {`Experience ${selectedExperience.numberLabel}`}
                    </div>
                    <div className="mt-2 font-['Quantum',sans-serif] text-[20px] uppercase text-[#1a1c1c]">
                      Linked Projects
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <FieldLabel>Company</FieldLabel>
                      <FieldInput
                        value={selectedExperience.company}
                        onChange={(event) =>
                          updateExperience(selectedExperience.stableId, (item) => ({
                            ...item,
                            company: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <FieldLabel>Role</FieldLabel>
                      <FieldInput
                        value={selectedExperience.role}
                        onChange={(event) =>
                          updateExperience(selectedExperience.stableId, (item) => ({
                            ...item,
                            role: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <label className="flex flex-col gap-2 md:col-span-2">
                      <FieldLabel>Period</FieldLabel>
                      <FieldInput
                        value={selectedExperience.period}
                        onChange={(event) =>
                          updateExperience(selectedExperience.stableId, (item) => ({
                            ...item,
                            period: event.target.value,
                          }))
                        }
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Projects</div>
                      <div className="mt-1 text-[11px] text-[#8a8a90]">
                        Auto pagination: 3 projects per page · {selectedProjectPageCount} page{selectedProjectPageCount > 1 ? "s" : ""}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddProjectItem}
                      className="rounded-full bg-[#effbfa] px-4 py-2 text-[10px] uppercase tracking-[2px] text-[#039f9a] transition-colors hover:bg-[#def7f5]"
                    >
                      Add Project
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(selectedProjectSet?.items ?? []).map((item, index, items) => (
                      <div key={item.stableId} className="rounded-[24px] border border-black/7 bg-white p-4">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">
                            {`Project ${String(index + 1).padStart(2, "0")}`}
                          </div>
                          <div className="flex items-center gap-2">
                            <CircleActionButton label="Move project up" disabled={index === 0} onClick={() => handleMoveProjectItem(item.stableId, "up")}>
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M7 3L3 7H11L7 3Z" fill="currentColor" />
                              </svg>
                            </CircleActionButton>
                            <CircleActionButton label="Move project down" disabled={index === items.length - 1} onClick={() => handleMoveProjectItem(item.stableId, "down")}>
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M7 11L11 7H3L7 11Z" fill="currentColor" />
                              </svg>
                            </CircleActionButton>
                            <CircleActionButton label="Delete project item" disabled={items.length === 1} onClick={() => handleRemoveProjectItem(item.stableId)}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                              </svg>
                            </CircleActionButton>
                          </div>
                        </div>
                        <div className="grid gap-4">
                          <label className="flex flex-col gap-2">
                            <FieldLabel>Title</FieldLabel>
                            <FieldInput
                              value={item.title}
                              onChange={(event) =>
                                handleUpdateProjectItem(item.stableId, (currentItem) => ({
                                  ...currentItem,
                                  title: event.target.value,
                                }))
                              }
                            />
                          </label>
                          <label className="flex flex-col gap-2">
                            <FieldLabel>Description</FieldLabel>
                            <FieldTextArea
                              value={item.description}
                              onChange={(event) =>
                                handleUpdateProjectItem(item.stableId, (currentItem) => ({
                                  ...currentItem,
                                  description: event.target.value,
                                }))
                              }
                              className="min-h-[96px]"
                            />
                          </label>
                          <label className="flex flex-col gap-2">
                            <FieldLabel>Linked Portfolio Project</FieldLabel>
                            <FieldSelect
                              value={item.linkedPortfolioProjectId ?? ""}
                              onChange={(event) =>
                                handleUpdateProjectItem(item.stableId, (currentItem) => ({
                                  ...currentItem,
                                  linkedPortfolioProjectId: event.target.value,
                                }))
                              }
                            >
                              <option value="">No linked project</option>
                              {linkedProjectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </FieldSelect>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-[14px] text-[#7d7d84]">
                  请先新增一条经历。
                </div>
              )}
            </section>
          </div>
        ) : activeSection === "ai-products" ? (
          <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto pr-1">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div>
                <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">AI Products</div>
                <div className="mt-2 font-['Quantum',sans-serif] text-[26px] uppercase text-[#1a1c1c]">AI Products Section</div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <InlineTabButton label="Section Meta" active={activeAiProductsTab === "meta"} onClick={() => setActiveAiProductsTab("meta")} />
                <InlineTabButton label="Project Groups" active={activeAiProductsTab === "projects"} onClick={() => setActiveAiProductsTab("projects")} />
                <InlineTabButton label="Get In Touch" active={activeAiProductsTab === "cta"} onClick={() => setActiveAiProductsTab("cta")} />
              </div>
            </div>

            {activeAiProductsTab === "meta" ? (
              <div className="grid content-start auto-rows-max gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <FieldLabel>Quote Line 1</FieldLabel>
                  <FieldInput value={draftContent.aiProducts.quoteLine1} onChange={(event) => updateAiProductsField("quoteLine1", event.target.value)} />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Quote Line 2</FieldLabel>
                  <FieldInput value={draftContent.aiProducts.quoteLine2} onChange={(event) => updateAiProductsField("quoteLine2", event.target.value)} />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Timeline Label</FieldLabel>
                  <FieldInput value={draftContent.aiProducts.timelineLabel} onChange={(event) => updateAiProductsField("timelineLabel", event.target.value)} />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Section Number</FieldLabel>
                  <FieldInput value={draftContent.aiProducts.sectionNumber} onChange={(event) => updateAiProductsField("sectionNumber", event.target.value)} />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Section Title</FieldLabel>
                  <FieldInput value={draftContent.aiProducts.sectionTitle} onChange={(event) => updateAiProductsField("sectionTitle", event.target.value)} />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Section Subtitle</FieldLabel>
                  <FieldInput value={draftContent.aiProducts.sectionSubtitle} onChange={(event) => updateAiProductsField("sectionSubtitle", event.target.value)} />
                </label>
              </div>
            ) : null}

            {activeAiProductsTab === "projects" ? (
              <div className="space-y-4">
                {draftContent.aiProducts.projectGroups.map((group, index, items) => (
                  <div key={group.stableId} className="rounded-[24px] border border-black/7 bg-[#fbfaf7] p-4">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">{`Project Group ${String(index + 1).padStart(2, "0")} · ${index % 2 === 0 ? "Image Left / Detail Right" : "Detail Left / Image Right"}`}</div>
                      <div className="flex items-center gap-2">
                        <CircleActionButton label="Move project up" disabled={index === 0} onClick={() => handleMoveAiProjectGroup(group.stableId, "up")}><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 3L3 7H11L7 3Z" fill="currentColor" /></svg></CircleActionButton>
                        <CircleActionButton label="Move project down" disabled={index === items.length - 1} onClick={() => handleMoveAiProjectGroup(group.stableId, "down")}><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 11L11 7H3L7 11Z" fill="currentColor" /></svg></CircleActionButton>
                        <CircleActionButton label="Delete project group" disabled={items.length === 1} onClick={() => handleRemoveAiProjectGroup(group.stableId)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></CircleActionButton>
                      </div>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:items-start">
                      <div className="grid content-start gap-4">
                        <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">Image Side</div>
                        <label className="flex flex-col gap-2"><FieldLabel>Role Label</FieldLabel><FieldInput value={group.roleLabel} onChange={(event) => updateAiProjectGroup(group.stableId, (current) => ({ ...current, roleLabel: event.target.value }))} /></label>
                        <label className="flex flex-col gap-2"><FieldLabel>Project Title</FieldLabel><FieldInput value={group.projectTitle} onChange={(event) => updateAiProjectGroup(group.stableId, (current) => ({ ...current, projectTitle: event.target.value }))} /></label>
                        <label className="flex flex-col gap-2"><FieldLabel>Cover Meta</FieldLabel><FieldInput value={group.coverMeta} onChange={(event) => updateAiProjectGroup(group.stableId, (current) => ({ ...current, coverMeta: event.target.value }))} /></label>
                        <div className="grid gap-4 md:grid-cols-[174px_minmax(0,1fr)] md:items-start">
                          <div className="flex flex-col gap-2">
                            <FieldLabel>Cover Image</FieldLabel>
                            <input
                              ref={(node) => {
                                aiProjectImageInputRefs.current[group.stableId] = node;
                              }}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                  void handleAiProjectCoverUpload(group.stableId, file);
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => aiProjectImageInputRefs.current[group.stableId]?.click()}
                              className="group relative w-full overflow-hidden rounded-[20px] border border-black/7 bg-white text-left transition-colors hover:border-[#03c9c3]/24"
                            >
                              {group.coverImage ? (
                                <ImageWithFallback
                                  alt={group.projectTitle || "AI Products cover preview"}
                                  src={group.coverImage}
                                  className="aspect-[4/3] w-full object-cover"
                                />
                              ) : (
                                <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#f7f3ee] text-[11px] uppercase tracking-[2px] text-[#a0a0a6]">
                                  No Image
                                </div>
                              )}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/8">
                                <div className="flex size-12 items-center justify-center rounded-full bg-white/92 text-[#1a1c1c] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-opacity group-hover:opacity-100">
                                  {uploadingAiProjectImageId === group.stableId ? (
                                    <span className="text-[10px] uppercase tracking-[1.5px] text-[#7d7d84]">...</span>
                                  ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                      <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </button>
                          </div>
                          <label className="flex flex-col gap-2">
                            <FieldLabel>Linked Portfolio Project</FieldLabel>
                            <FieldSelect
                              value={group.linkedPortfolioProjectId ?? ""}
                              onChange={(event) =>
                                updateAiProjectGroup(group.stableId, (current) => ({
                                  ...current,
                                  linkedPortfolioProjectId: event.target.value,
                                }))
                              }
                            >
                              <option value="">No linked project</option>
                              {linkedProjectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </FieldSelect>
                          </label>
                        </div>
                      </div>
                      <div className="hidden self-stretch bg-black/8 lg:block" aria-hidden="true" />
                      <div className="grid content-start gap-4">
                        <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">Detail Side</div>
                        <label className="flex flex-col gap-2"><FieldLabel>Detail Tabs</FieldLabel><FieldInput value={group.detailTabs.join(" | ")} onChange={(event) => updateAiProjectGroup(group.stableId, (current) => ({ ...current, detailTabs: event.target.value.split("|").map((item) => item.trim()).filter(Boolean) }))} /></label>
                        <label className="flex flex-col gap-2"><FieldLabel>Detail Title</FieldLabel><FieldInput value={group.detailTitle} onChange={(event) => updateAiProjectGroup(group.stableId, (current) => ({ ...current, detailTitle: event.target.value }))} /></label>
                        <label className="flex flex-col gap-2"><FieldLabel>Detail Footer Label</FieldLabel><FieldInput value={group.detailFooterLabel} onChange={(event) => updateAiProjectGroup(group.stableId, (current) => ({ ...current, detailFooterLabel: event.target.value }))} /></label>
                        <label className="flex flex-col gap-2"><FieldLabel>Detail Description</FieldLabel><FieldTextArea className="min-h-[96px]" value={group.detailDescription} onChange={(event) => updateAiProjectGroup(group.stableId, (current) => ({ ...current, detailDescription: event.target.value }))} /></label>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAiProjectGroup}
                  className="rounded-full bg-[#effbfa] px-4 py-2 text-[10px] uppercase tracking-[2px] text-[#039f9a] transition-colors hover:bg-[#def7f5]"
                >
                  Add Project
                </button>
              </div>
            ) : null}

            {activeAiProductsTab === "cta" ? (
              <div className="grid content-start auto-rows-max gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <FieldLabel>Brand Title</FieldLabel>
                  <FieldInput
                    value={draftContent.aiProducts.ctaCard.brandTitle}
                    onChange={(event) =>
                      updateAiProductsField("ctaCard", {
                        ...draftContent.aiProducts.ctaCard,
                        brandTitle: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Button Label</FieldLabel>
                  <FieldInput
                    value={draftContent.aiProducts.ctaCard.buttonLabel}
                    onChange={(event) =>
                      updateAiProductsField("ctaCard", {
                        ...draftContent.aiProducts.ctaCard,
                        buttonLabel: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <FieldLabel>Description</FieldLabel>
                  <FieldTextArea
                    className="min-h-[96px]"
                    value={draftContent.aiProducts.ctaCard.description}
                    onChange={(event) =>
                      updateAiProductsField("ctaCard", {
                        ...draftContent.aiProducts.ctaCard,
                        description: event.target.value,
                      })
                    }
                  />
                </label>
              </div>
            ) : null}
          </div>
        ) : activeSection === "ux-case" ? (
          <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto pr-1">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div>
                <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">UX Case</div>
                <div className="mt-2 font-['Quantum',sans-serif] text-[26px] uppercase text-[#1a1c1c]">UX Case Section</div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <InlineTabButton label="Section Meta" active={activeUxCaseTab === "meta"} onClick={() => setActiveUxCaseTab("meta")} />
                <InlineTabButton label="Project Card" active={activeUxCaseTab === "projects"} onClick={() => setActiveUxCaseTab("projects")} />
              </div>
            </div>

            {activeUxCaseTab === "meta" ? (
              <div className="grid content-start auto-rows-max gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2"><FieldLabel>Quote Line 1</FieldLabel><FieldInput value={draftContent.uxCase.quoteLine1} onChange={(event) => updateUxCaseField("quoteLine1", event.target.value)} /></label>
                <label className="flex flex-col gap-2"><FieldLabel>Quote Line 2</FieldLabel><FieldInput value={draftContent.uxCase.quoteLine2} onChange={(event) => updateUxCaseField("quoteLine2", event.target.value)} /></label>
                <label className="flex flex-col gap-2"><FieldLabel>Timeline Label</FieldLabel><FieldInput value={draftContent.uxCase.timelineLabel} onChange={(event) => updateUxCaseField("timelineLabel", event.target.value)} /></label>
                <label className="flex flex-col gap-2"><FieldLabel>Section Number</FieldLabel><FieldInput value={draftContent.uxCase.sectionNumber} onChange={(event) => updateUxCaseField("sectionNumber", event.target.value)} /></label>
                <label className="flex flex-col gap-2"><FieldLabel>Section Title</FieldLabel><FieldInput value={draftContent.uxCase.sectionTitle} onChange={(event) => updateUxCaseField("sectionTitle", event.target.value)} /></label>
                <label className="flex flex-col gap-2"><FieldLabel>Section Subtitle</FieldLabel><FieldInput value={draftContent.uxCase.sectionSubtitle} onChange={(event) => updateUxCaseField("sectionSubtitle", event.target.value)} /></label>
              </div>
            ) : null}

            {activeUxCaseTab === "projects" ? (
              <div className="space-y-4">
                {draftContent.uxCase.projectBlocks.map((block, index, items) => (
                  <div key={block.stableId} className="rounded-[24px] border border-black/7 bg-[#fbfaf7] p-4">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">
                          {`Block ${String(index + 1).padStart(2, "0")} · ${block.type === "large-card" ? "Large Card" : "Card Group"}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleActionButton label="Move block up" disabled={index === 0} onClick={() => handleMoveUxProjectBlock(block.stableId, "up")}><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 3L3 7H11L7 3Z" fill="currentColor" /></svg></CircleActionButton>
                        <CircleActionButton label="Move block down" disabled={index === items.length - 1} onClick={() => handleMoveUxProjectBlock(block.stableId, "down")}><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 11L11 7H3L7 11Z" fill="currentColor" /></svg></CircleActionButton>
                        <CircleActionButton label="Delete block" onClick={() => handleRemoveUxProjectBlock(block.stableId)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></CircleActionButton>
                      </div>
                    </div>

                    {block.type === "large-card" ? (
                      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="flex flex-col gap-2"><FieldLabel>Category</FieldLabel><FieldInput value={block.card.category} onChange={(event) => updateUxLargeCardInBlock(block.stableId, (current) => ({ ...current, category: event.target.value }))} /></label>
                          <label className="flex flex-col gap-2"><FieldLabel>Title</FieldLabel><FieldInput value={block.card.title} onChange={(event) => updateUxLargeCardInBlock(block.stableId, (current) => ({ ...current, title: event.target.value }))} /></label>
                          <label className="flex flex-col gap-2"><FieldLabel>Tags</FieldLabel><FieldInput value={block.card.tags} onChange={(event) => updateUxLargeCardInBlock(block.stableId, (current) => ({ ...current, tags: event.target.value }))} /></label>
                          <label className="flex flex-col gap-2">
                            <FieldLabel>Linked Portfolio Project</FieldLabel>
                            <FieldSelect
                              value={block.card.linkedPortfolioProjectId ?? ""}
                              onChange={(event) =>
                                updateUxLargeCardInBlock(block.stableId, (current) => ({
                                  ...current,
                                  linkedPortfolioProjectId: event.target.value,
                                }))
                              }
                            >
                              <option value="">No linked project</option>
                              {linkedProjectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </FieldSelect>
                          </label>
                          <label className="flex flex-col gap-2 md:col-span-2"><FieldLabel>Description</FieldLabel><FieldTextArea className="min-h-[112px]" value={block.card.description} onChange={(event) => updateUxLargeCardInBlock(block.stableId, (current) => ({ ...current, description: event.target.value }))} /></label>
                        </div>

                        <div className="grid content-start gap-3">
                          <FieldLabel>Media Upload</FieldLabel>
                          <input
                            ref={(node) => {
                              uxMediaInputRefs.current[block.card.stableId] = node;
                            }}
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (!file) return;
                              void handleUxCaseMediaUpload(block.card.stableId, file, {
                                type: "large-card",
                                blockStableId: block.stableId,
                              });
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => uxMediaInputRefs.current[block.card.stableId]?.click()}
                            className="group relative overflow-hidden rounded-[20px] border border-black/7 bg-white text-left transition-colors hover:border-[#03c9c3]/24"
                          >
                            {block.card.mediaUrl ? (
                              block.card.mediaType === "video" ? (
                                <video
                                  src={block.card.mediaUrl}
                                  className="aspect-[4/3] w-full bg-black object-cover"
                                  controls
                                  muted
                                  playsInline
                                />
                              ) : (
                                <ImageWithFallback
                                  alt={block.card.title || "UX large card preview"}
                                  src={block.card.mediaUrl}
                                  className="aspect-[4/3] w-full object-cover"
                                />
                              )
                            ) : (
                              <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#f7f3ee] text-[11px] uppercase tracking-[2px] text-[#a0a0a6]">
                                Upload Image Or Video
                              </div>
                            )}
                            <div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[10px] uppercase tracking-[1.8px] text-[#1a1c1c] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                              {block.card.mediaType}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/8">
                              <div className="flex size-12 items-center justify-center rounded-full bg-white/92 text-[#1a1c1c] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-opacity group-hover:opacity-100">
                                {uploadingUxMediaId === block.card.stableId ? (
                                  <span className="text-[10px] uppercase tracking-[1.5px] text-[#7d7d84]">...</span>
                                ) : (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-6 lg:grid-cols-2">
                        {([
                          { side: "left", title: "Left · Medium Card", card: block.leftCard },
                          { side: "right", title: "Right · Small Card", card: block.rightCard },
                        ] as const).map(({ side, title, card }) => (
                          <div key={card.stableId} className="grid content-start gap-4 rounded-[20px] border border-black/6 bg-white p-4">
                            <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">{title}</div>
                            <div className="grid gap-4 md:grid-cols-2">
                              <label className="flex flex-col gap-2"><FieldLabel>Category</FieldLabel><FieldInput value={card.category} onChange={(event) => updateUxGroupCardInBlock(block.stableId, side, (current) => ({ ...current, category: event.target.value }))} /></label>
                              <label className="flex flex-col gap-2"><FieldLabel>Title</FieldLabel><FieldInput value={card.title} onChange={(event) => updateUxGroupCardInBlock(block.stableId, side, (current) => ({ ...current, title: event.target.value }))} /></label>
                              <label className="flex flex-col gap-2"><FieldLabel>Action Label</FieldLabel><FieldInput value={card.actionLabel} onChange={(event) => updateUxGroupCardInBlock(block.stableId, side, (current) => ({ ...current, actionLabel: event.target.value }))} /></label>
                              <label className="flex flex-col gap-2">
                                <FieldLabel>Linked Portfolio Project</FieldLabel>
                                <FieldSelect
                                  value={card.linkedPortfolioProjectId ?? ""}
                                  onChange={(event) =>
                                    updateUxGroupCardInBlock(block.stableId, side, (current) => ({
                                      ...current,
                                      linkedPortfolioProjectId: event.target.value,
                                    }))
                                  }
                                >
                                  <option value="">No linked project</option>
                                  {linkedProjectOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </FieldSelect>
                              </label>
                              <label className="flex flex-col gap-2 md:col-span-2"><FieldLabel>Description</FieldLabel><FieldTextArea className="min-h-[112px]" value={card.description} onChange={(event) => updateUxGroupCardInBlock(block.stableId, side, (current) => ({ ...current, description: event.target.value }))} /></label>
                            </div>
                            <div className="grid gap-3">
                              <FieldLabel>Image Upload</FieldLabel>
                              <input
                                ref={(node) => {
                                  uxMediaInputRefs.current[card.stableId] = node;
                                }}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  if (!file) return;
                                  void handleUxCaseMediaUpload(card.stableId, file, {
                                    type: "group-card",
                                    blockStableId: block.stableId,
                                    side,
                                  });
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => uxMediaInputRefs.current[card.stableId]?.click()}
                                className="group relative overflow-hidden rounded-[20px] border border-black/7 bg-white text-left transition-colors hover:border-[#03c9c3]/24"
                              >
                                {card.image ? (
                                  <ImageWithFallback
                                    alt={card.title || `${title} preview`}
                                    src={card.image}
                                    className="aspect-[4/3] w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#f7f3ee] text-[11px] uppercase tracking-[2px] text-[#a0a0a6]">
                                    Upload Image
                                  </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/8">
                                  <div className="flex size-12 items-center justify-center rounded-full bg-white/92 text-[#1a1c1c] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-opacity group-hover:opacity-100">
                                    {uploadingUxMediaId === card.stableId ? (
                                      <span className="text-[10px] uppercase tracking-[1.5px] text-[#7d7d84]">...</span>
                                    ) : (
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleAddUxLargeCard}
                    className="rounded-full bg-[#effbfa] px-4 py-2 text-[10px] uppercase tracking-[2px] text-[#039f9a] transition-colors hover:bg-[#def7f5]"
                  >
                    Add Large Card
                  </button>
                  <button
                    type="button"
                    onClick={handleAddUxCardGroup}
                    className="rounded-full border border-black/8 bg-white px-4 py-2 text-[10px] uppercase tracking-[2px] text-[#1a1c1c] transition-colors hover:bg-[#f7f3ee]"
                  >
                    Add Card Group
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto pr-1">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div>
                <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Education</div>
                <div className="mt-2 font-['Quantum',sans-serif] text-[26px] uppercase text-[#1a1c1c]">Education Section</div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <InlineTabButton label="Section Meta" active={activeEducationTab === "meta"} onClick={() => setActiveEducationTab("meta")} />
                <InlineTabButton label="School" active={activeEducationTab === "school"} onClick={() => setActiveEducationTab("school")} />
                <InlineTabButton label="Award" active={activeEducationTab === "award"} onClick={() => setActiveEducationTab("award")} />
              </div>
            </div>

            {activeEducationTab === "meta" ? (
              <div className="grid content-start auto-rows-max gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <FieldLabel>Quote Line 1</FieldLabel>
                  <FieldInput
                    value={draftContent.education.quoteLine1}
                    onChange={(event) => updateEducationField("quoteLine1", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Quote Line 2</FieldLabel>
                  <FieldInput
                    value={draftContent.education.quoteLine2}
                    onChange={(event) => updateEducationField("quoteLine2", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Graduated Label</FieldLabel>
                  <FieldInput
                    value={draftContent.education.graduatedLabel}
                    onChange={(event) => updateEducationField("graduatedLabel", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Section Number</FieldLabel>
                  <FieldInput
                    value={draftContent.education.sectionNumber}
                    onChange={(event) => updateEducationField("sectionNumber", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Section Title</FieldLabel>
                  <FieldInput
                    value={draftContent.education.sectionTitle}
                    onChange={(event) => updateEducationField("sectionTitle", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Section Subtitle</FieldLabel>
                  <FieldInput
                    value={draftContent.education.sectionSubtitle}
                    onChange={(event) => updateEducationField("sectionSubtitle", event.target.value)}
                  />
                </label>
              </div>
            ) : null}

            {activeEducationTab === "school" ? (
              <div className="grid content-start auto-rows-max gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <FieldLabel>School Period</FieldLabel>
                  <FieldInput
                    value={draftContent.education.schoolPeriod}
                    onChange={(event) => updateEducationField("schoolPeriod", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>School Name</FieldLabel>
                  <FieldInput
                    value={draftContent.education.schoolName}
                    onChange={(event) => updateEducationField("schoolName", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Major</FieldLabel>
                  <FieldInput
                    value={draftContent.education.major}
                    onChange={(event) => updateEducationField("major", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Class Name</FieldLabel>
                  <FieldInput
                    value={draftContent.education.className}
                    onChange={(event) => updateEducationField("className", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Degree Type</FieldLabel>
                  <FieldInput
                    value={draftContent.education.degreeType}
                    onChange={(event) => updateEducationField("degreeType", event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <FieldLabel>Degree Level</FieldLabel>
                  <FieldInput
                    value={draftContent.education.degreeLevel}
                    onChange={(event) => updateEducationField("degreeLevel", event.target.value)}
                  />
                </label>
              </div>
            ) : null}

            {activeEducationTab === "award" ? (
              <div className="grid gap-4">
                <div className="space-y-4">
                  {draftContent.education.awards.map((award, index, awards) => {
                    const awardImageSize = educationAwardImageSizes[award.stableId];
                    return (
                    <div key={award.stableId} className="rounded-[24px] border border-black/7 bg-[#fbfaf7] p-4">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">
                          {`Award ${String(index + 1).padStart(2, "0")}`}
                        </div>
                        <div className="flex items-center gap-2">
                          <CircleActionButton label="Move award up" disabled={index === 0} onClick={() => handleMoveAward(award.stableId, "up")}>
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                              <path d="M7 3L3 7H11L7 3Z" fill="currentColor" />
                            </svg>
                          </CircleActionButton>
                          <CircleActionButton label="Move award down" disabled={index === awards.length - 1} onClick={() => handleMoveAward(award.stableId, "down")}>
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                              <path d="M7 11L11 7H3L7 11Z" fill="currentColor" />
                            </svg>
                          </CircleActionButton>
                          <CircleActionButton label="Delete award" disabled={awards.length === 1} onClick={() => handleRemoveAward(award.stableId)}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                              <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                          </CircleActionButton>
                        </div>
                      </div>
                      <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
                        <div
                          ref={(node) => {
                            educationAwardFieldsRefs.current[award.stableId] = node;
                          }}
                          className="grid w-full min-w-0 content-start auto-rows-max gap-4"
                        >
                          <label className="flex flex-col gap-2">
                            <FieldLabel>Date</FieldLabel>
                            <FieldInput
                              value={award.date}
                              onChange={(event) =>
                                handleUpdateAward(award.stableId, (currentAward) => ({
                                  ...currentAward,
                                  date: event.target.value,
                                }))
                              }
                            />
                          </label>
                          <label className="flex flex-col gap-2">
                            <FieldLabel>Title</FieldLabel>
                            <FieldInput
                              value={award.title}
                              onChange={(event) =>
                                handleUpdateAward(award.stableId, (currentAward) => ({
                                  ...currentAward,
                                  title: event.target.value,
                                }))
                              }
                            />
                          </label>
                          <label className="flex flex-col gap-2">
                            <FieldLabel>Description</FieldLabel>
                            <FieldTextArea
                              className="resize-none"
                              style={{
                                height: 112,
                                minHeight: 112,
                                maxHeight: 112,
                              }}
                              value={award.description}
                              onChange={(event) =>
                                handleUpdateAward(award.stableId, (currentAward) => ({
                                  ...currentAward,
                                  description: event.target.value,
                                }))
                              }
                            />
                          </label>
                        </div>
                        <div className="flex justify-end lg:items-start">
                          <input
                            ref={(node) => {
                              educationAwardImageInputRefs.current[award.stableId] = node;
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (!file) return;
                              void handleEducationAwardImageUpload(award.stableId, file);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => educationAwardImageInputRefs.current[award.stableId]?.click()}
                            aria-label="Upload award image"
                            className="group relative shrink-0 overflow-hidden rounded-[20px] border border-black/7 bg-white text-left transition-colors hover:border-[#03c9c3]/24"
                            style={{
                              height: awardImageSize?.height ?? 220,
                              width: awardImageSize?.width ?? 330,
                            }}
                          >
                            {award.image ? (
                              <ImageWithFallback
                                alt={award.title || "Award image"}
                                src={award.image}
                                className="absolute inset-0 size-full object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-[#f7f3ee] text-[11px] uppercase tracking-[2px] text-[#a0a0a6]">
                                Upload Image
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/8">
                              <div className="flex size-12 items-center justify-center rounded-full bg-white/92 text-[#1a1c1c] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-opacity group-hover:opacity-100">
                                {uploadingEducationAwardImageId === award.stableId ? (
                                  <span className="text-[10px] uppercase tracking-[1.5px] text-[#7d7d84]">...</span>
                                ) : (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleAddAward}
                    className="rounded-full bg-[#effbfa] px-4 py-2 text-[10px] uppercase tracking-[2px] text-[#039f9a] transition-colors hover:bg-[#def7f5]"
                  >
                    Add Award
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </section>
  );
}
