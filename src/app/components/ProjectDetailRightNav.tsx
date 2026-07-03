import React, { useEffect, useMemo, useRef } from "react";

const BACK_ICON = (
  <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
    <path
      d="M6.24595 12L0 6L6.24595 0H8.89968L3.60841 5.04935H15V6.96623H3.60841L8.89968 12H6.24595Z"
      fill="white"
      fillOpacity="0.7"
    />
  </svg>
);

export const PROJECT_DETAIL_RIGHT_NAV_LAYOUT = {
  sidebarClassName:
    "flex h-full min-h-0 w-[256px] shrink-0 flex-col bg-[rgba(0,0,0,0.01)] p-8 backdrop-blur-[24px]",
  backButtonClassName: "group flex w-full shrink-0 cursor-pointer items-start gap-4 text-left",
  dividerClassName: "h-px w-full shrink-0 bg-white/10",
  navViewportClassName: "relative min-h-0 flex-1",
  navListClassName:
    "scrollbar-hide flex h-full min-h-0 flex-col gap-4 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  activeItemScrollOptions: {
    block: "nearest",
    behavior: "smooth",
  } satisfies ScrollIntoViewOptions,
} as const;

export interface ProjectDetailRightNavItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  active?: boolean;
  onClick?: () => void;
}

interface ProjectDetailRightNavProps {
  items: ProjectDetailRightNavItem[];
  onBack: () => void;
}

function RightNavLink({
  item,
  activeItemRef,
}: {
  item: ProjectDetailRightNavItem;
  activeItemRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <button
      ref={item.active ? activeItemRef : undefined}
      type="button"
      onClick={item.onClick}
      className={`group flex cursor-pointer items-start gap-4 text-left ${item.active ? "opacity-100" : "opacity-50 transition-opacity hover:opacity-80"}`}
    >
      <div className="flex h-[56px] w-[56px] items-center justify-center text-[21px] font-bold text-white/80">
        {item.num}
      </div>
      <div className="py-2">
        <div className={`text-[16px] font-bold ${item.active ? "text-white" : "text-white/50"}`}>{item.title}</div>
        <div className={`text-[12px] ${item.active ? "text-white/50" : "text-white/30"}`}>{item.subtitle}</div>
      </div>
    </button>
  );
}

export function ProjectDetailRightNav({ items, onBack }: ProjectDetailRightNavProps) {
  const activeItemRef = useRef<HTMLButtonElement>(null);
  const activeItemId = useMemo(() => items.find((item) => item.active)?.id ?? "", [items]);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView(PROJECT_DETAIL_RIGHT_NAV_LAYOUT.activeItemScrollOptions);
  }, [activeItemId]);

  return (
    <div className={PROJECT_DETAIL_RIGHT_NAV_LAYOUT.sidebarClassName}>
      <button onClick={onBack} className={PROJECT_DETAIL_RIGHT_NAV_LAYOUT.backButtonClassName}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/20 transition-colors group-hover:bg-white/30">
          {BACK_ICON}
        </div>
        <div className="py-1">
          <div className="text-[16px] font-bold text-white/50 transition-colors group-hover:text-white/80">返回</div>
          <div className="text-[12px] uppercase tracking-tighter text-white/30">GO BACK</div>
        </div>
      </button>

      <div className="my-9 shrink-0">
        <div className={PROJECT_DETAIL_RIGHT_NAV_LAYOUT.dividerClassName} />
      </div>

      <div className={PROJECT_DETAIL_RIGHT_NAV_LAYOUT.navViewportClassName}>
        <div className={PROJECT_DETAIL_RIGHT_NAV_LAYOUT.navListClassName}>
          {items.map((item) => (
            <RightNavLink key={item.id} item={item} activeItemRef={activeItemRef} />
          ))}
        </div>
      </div>
    </div>
  );
}
