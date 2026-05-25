import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  RESUME_INFORMATION_HOME_MODULE_KEYS,
  type ResumeContentData,
  type ResumeInformationHomeModule,
  type ResumeInformationHomeModuleKey,
  type ResumeInformationItem,
} from "../data/resumeContent";

type InformationEditorSection = "home" | "contact" | "copyright";

function cloneResumeContent(content: ResumeContentData): ResumeContentData {
  return JSON.parse(JSON.stringify(content)) as ResumeContentData;
}

function createStableId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function moveItem<T>(items: T[], index: number, direction: "up" | "down") {
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= items.length) return items;
  const nextItems = [...items];
  const [movedItem] = nextItems.splice(index, 1);
  nextItems.splice(targetIndex, 0, movedItem);
  return nextItems;
}

function InformationNavButton({
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

const MODULE_LABELS: Record<ResumeInformationHomeModuleKey, string> = {
  center: "Center Module",
  left: "Left Module",
  right: "Right Module",
};

export function InformationModuleEditor({
  resumeContent,
  onPersistResumeContent,
}: {
  resumeContent: ResumeContentData;
  onPersistResumeContent: (nextContent: ResumeContentData) => Promise<ResumeContentData>;
}) {
  const [activeSection, setActiveSection] = useState<InformationEditorSection>("home");
  const [activeHomeModuleKey, setActiveHomeModuleKey] =
    useState<ResumeInformationHomeModuleKey>("center");
  const [draftContent, setDraftContent] = useState<ResumeContentData>(cloneResumeContent(resumeContent));
  const [isPersisting, setIsPersisting] = useState(false);

  useEffect(() => {
    setDraftContent(cloneResumeContent(resumeContent));
  }, [resumeContent]);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(resumeContent) !== JSON.stringify(draftContent),
    [draftContent, resumeContent],
  );

  const activeHomeModule =
    draftContent.information.home.modules.find((module) => module.key === activeHomeModuleKey) ??
    draftContent.information.home.modules[0];

  const updateDraft = (updater: (current: ResumeContentData) => ResumeContentData) => {
    setDraftContent((current) => updater(cloneResumeContent(current)));
  };

  const updateHomeModule = (
    key: ResumeInformationHomeModuleKey,
    updater: (module: ResumeInformationHomeModule) => ResumeInformationHomeModule,
  ) => {
    updateDraft((current) => ({
      ...current,
      information: {
        ...current.information,
        home: {
          ...current.information.home,
          modules: current.information.home.modules.map((module) =>
            module.key === key ? updater(module) : module,
          ),
        },
      },
    }));
  };

  const handleSave = async () => {
    setIsPersisting(true);
    try {
      const savedContent = await onPersistResumeContent(draftContent);
      setDraftContent(cloneResumeContent(savedContent));
      toast.success("Information saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save information.");
    } finally {
      setIsPersisting(false);
    }
  };

  const handleCancel = () => {
    setDraftContent(cloneResumeContent(resumeContent));
  };

  const handleUpdateInformationLine = (lineIndex: number, value: string) => {
    updateHomeModule(activeHomeModuleKey, (module) => ({
      ...module,
      information: Array.from({ length: 3 }, (_, index) =>
        index === lineIndex ? value : module.information[index] ?? "",
      ),
    }));
  };

  const handleAddItem = () => {
    updateHomeModule(activeHomeModuleKey, (module) => {
      if (module.items.length >= 5) return module;
      return {
        ...module,
        items: [
          ...module.items,
          {
            stableId: createStableId("information-item"),
            label: "",
            value: "",
          },
        ],
      };
    });
  };

  const handleUpdateItem = (
    stableId: string,
    updater: (item: ResumeInformationItem) => ResumeInformationItem,
  ) => {
    updateHomeModule(activeHomeModuleKey, (module) => ({
      ...module,
      items: module.items.map((item) => (item.stableId === stableId ? updater(item) : item)),
    }));
  };

  const handleMoveItem = (stableId: string, direction: "up" | "down") => {
    updateHomeModule(activeHomeModuleKey, (module) => {
      const currentIndex = module.items.findIndex((item) => item.stableId === stableId);
      return {
        ...module,
        items: moveItem(module.items, currentIndex, direction),
      };
    });
  };

  const handleRemoveItem = (stableId: string) => {
    updateHomeModule(activeHomeModuleKey, (module) => ({
      ...module,
      items: module.items.filter((item) => item.stableId !== stableId),
    }));
  };

  const handleUpdateContact = (field: "wechat" | "email", value: string) => {
    updateDraft((current) => ({
      ...current,
      information: {
        ...current.information,
        contact: {
          ...current.information.contact,
          [field]: value,
        },
      },
    }));
  };

  const handleUpdateCopyright = (value: string) => {
    updateDraft((current) => ({
      ...current,
      information: {
        ...current.information,
        copyright: {
          ...current.information.copyright,
          text: value,
        },
      },
    }));
  };

  return (
    <section className="grid min-h-0 flex-1 grid-cols-[240px_minmax(0,1fr)] gap-6">
      <aside className="flex min-h-0 flex-col rounded-[36px] border border-black/6 bg-white/88 p-5 shadow-[0_24px_72px_rgba(26,28,28,0.06)]">
        <div className="space-y-3">
          <InformationNavButton
            label="首页信息"
            active={activeSection === "home"}
            onClick={() => setActiveSection("home")}
          />
          <InformationNavButton
            label="联系信息"
            active={activeSection === "contact"}
            onClick={() => setActiveSection("contact")}
          />
          <InformationNavButton
            label="版权信息"
            active={activeSection === "copyright"}
            onClick={() => setActiveSection("copyright")}
          />
        </div>
        <div className="mt-auto space-y-3 pt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPersisting || !hasUnsavedChanges}
            className="w-full rounded-full bg-[#1a1c1c] px-5 py-3 text-[11px] uppercase tracking-[2px] text-white transition-transform hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPersisting ? "Saving..." : "Save Information"}
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
        {activeSection === "home" ? (
          <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto pr-1">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div>
                <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Information</div>
                <div className="mt-2 font-['Quantum',sans-serif] text-[26px] uppercase text-[#1a1c1c]">
                  Home Information
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                {RESUME_INFORMATION_HOME_MODULE_KEYS.map((key) => (
                  <InlineTabButton
                    key={key}
                    label={MODULE_LABELS[key]}
                    active={activeHomeModuleKey === key}
                    onClick={() => setActiveHomeModuleKey(key)}
                  />
                ))}
              </div>
            </div>

            {activeHomeModule ? (
              <div className="grid content-start gap-5">
                <section className="rounded-[24px] border border-black/7 bg-[#fbfaf7] p-4">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,0.86fr)_1px_minmax(0,1.14fr)] lg:items-start">
                    <div className="grid content-start gap-4">
                      <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">
                        Content Information
                      </div>
                      {Array.from({ length: 3 }, (_, index) => (
                        <div key={`${activeHomeModule.key}-information-${index}`} className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3">
                          <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <FieldInput
                            value={activeHomeModule.information[index] ?? ""}
                            onChange={(event) => handleUpdateInformationLine(index, event.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="hidden self-stretch bg-black/8 lg:block" aria-hidden="true" />
                    <div className="grid content-start gap-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">
                          Content Items
                        </div>
                        <button
                          type="button"
                          onClick={handleAddItem}
                          disabled={activeHomeModule.items.length >= 5}
                          className="rounded-full bg-[#effbfa] px-4 py-2 text-[10px] uppercase tracking-[2px] text-[#039f9a] transition-colors hover:bg-[#def7f5] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Add Item
                        </button>
                      </div>

                      <div className="grid gap-3">
                        {activeHomeModule.items.map((item, index, items) => (
                          <div
                            key={item.stableId}
                            className="grid grid-cols-[34px_minmax(0,1fr)_minmax(0,1.2fr)_auto] items-center gap-3"
                          >
                            <div className="text-[10px] uppercase tracking-[2px] text-[#7d7d84]">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <FieldInput
                              placeholder="TWITTER"
                              value={item.label}
                              onChange={(event) =>
                                handleUpdateItem(item.stableId, (current) => ({
                                  ...current,
                                  label: event.target.value,
                                }))
                              }
                            />
                            <FieldInput
                              placeholder="-@vera_ui-"
                              value={item.value}
                              onChange={(event) =>
                                handleUpdateItem(item.stableId, (current) => ({
                                  ...current,
                                  value: event.target.value,
                                }))
                              }
                            />
                            <div className="flex items-center gap-2">
                              <CircleActionButton
                                label="Move item up"
                                disabled={index === 0}
                                onClick={() => handleMoveItem(item.stableId, "up")}
                              >
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                  <path d="M7 3L3 7H11L7 3Z" fill="currentColor" />
                                </svg>
                              </CircleActionButton>
                              <CircleActionButton
                                label="Move item down"
                                disabled={index === items.length - 1}
                                onClick={() => handleMoveItem(item.stableId, "down")}
                              >
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                  <path d="M7 11L11 7H3L7 11Z" fill="currentColor" />
                                </svg>
                              </CircleActionButton>
                              <CircleActionButton label="Delete item" onClick={() => handleRemoveItem(item.stableId)}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                  <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                              </CircleActionButton>
                            </div>
                          </div>
                        ))}

                        {activeHomeModule.items.length === 0 ? (
                          <div className="rounded-[18px] border border-dashed border-black/10 bg-white p-5 text-center text-[11px] uppercase tracking-[2px] text-[#a0a0a6]">
                            No content items yet
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : null}
          </div>
        ) : activeSection === "contact" ? (
          <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto pr-1">
            <div>
              <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Information</div>
              <div className="mt-2 font-['Quantum',sans-serif] text-[26px] uppercase text-[#1a1c1c]">
                Contact Information
              </div>
            </div>

            <section className="grid content-start gap-5 rounded-[24px] border border-black/7 bg-[#fbfaf7] p-4">
              <div className="grid gap-5 lg:grid-cols-2">
                <label className="grid gap-2">
                  <FieldLabel>WECHAT</FieldLabel>
                  <FieldInput
                    value={draftContent.information.contact.wechat}
                    onChange={(event) => handleUpdateContact("wechat", event.target.value)}
                  />
                </label>
                <label className="grid gap-2">
                  <FieldLabel>E-MAIL</FieldLabel>
                  <FieldInput
                    type="email"
                    value={draftContent.information.contact.email}
                    onChange={(event) => handleUpdateContact("email", event.target.value)}
                  />
                </label>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto pr-1">
            <div>
              <div className="text-[11px] uppercase tracking-[2px] text-[#7d7d84]">Information</div>
              <div className="mt-2 font-['Quantum',sans-serif] text-[26px] uppercase text-[#1a1c1c]">
                Copyright Information
              </div>
            </div>

            <section className="grid content-start gap-5 rounded-[24px] border border-black/7 bg-[#fbfaf7] p-4">
              <label className="grid gap-2">
                <FieldLabel>Copyright Text</FieldLabel>
                <FieldInput
                  value={draftContent.information.copyright.text}
                  onChange={(event) => handleUpdateCopyright(event.target.value)}
                />
              </label>
            </section>
          </div>
        )}
      </main>
    </section>
  );
}
