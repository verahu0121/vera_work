import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";

import type { AiProductFeaturedProject } from "../data/aiProductPage";

const AI_PROJECT_OVERVIEW_HEADING_SRC = "/figma-assets/ai-project-overview-heading.svg";
const AI_PROJECT_OVERVIEW_DIVIDER_SRC = "/figma-assets/ai-project-overview-divider.svg";
const AI_PROJECT_SECTION_TITLE_CARET_SRC = "/figma-assets/ai-project-section-title-caret.svg";
const AI_PROJECT_OPPORTUNITY_METRIC_SPACER_SRC = "/figma-assets/ai-project-opportunity-metric-spacer.svg";
const AI_PROJECT_OPPORTUNITY_CONCLUSION_SPACER_SRC = "/figma-assets/ai-project-opportunity-conclusion-spacer.svg";
const AI_PROJECT_MARKET_SEO_IMAGE_SRC = "/figma-assets/ai-project-market-seo.png";
const AI_PROJECT_MARKET_GEO_IMAGE_SRC = "/figma-assets/ai-project-market-geo.png";
const AI_PROJECT_MARKET_TAB_CORNER_SRC = "/figma-assets/ai-project-market-tab-corner.svg";
const AI_PROJECT_MARKET_TAB_CORNER_FLIPPED_SRC = "/figma-assets/ai-project-market-tab-corner-flipped.svg";
const AI_PROJECT_MARKET_GOAL_ACCENT_SRC = "/figma-assets/ai-project-market-goal-accent.svg";
const AI_PROJECT_FULFILLMENT_LABEL_ACCENT_SRC = "/figma-assets/ai-project-fulfillment-label-accent.svg";
const AI_PROJECT_FULFILLMENT_AGENCY_ICON_SRC = "/figma-assets/ai-project-fulfillment-agency-icon.svg";
const AI_PROJECT_FULFILLMENT_ENTERPRISE_ICON_SRC = "/figma-assets/ai-project-fulfillment-enterprise-icon.svg";
const AI_PROJECT_FULFILLMENT_CREATOR_ICON_SRC = "/figma-assets/ai-project-fulfillment-creator-icon.svg";
const AI_PROJECT_FULFILLMENT_TAG_DOT_SRC = "/figma-assets/ai-project-fulfillment-tag-dot.svg";
const AI_PROJECT_FULFILLMENT_FLOW_ARROW_SRC = "/figma-assets/ai-project-fulfillment-flow-arrow.svg";
const AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC = "/figma-assets/ai-project-opportunity-person-icon.svg";
const AI_PROJECT_OPPORTUNITY_ENTERPRISE_ICON_SRC = "/figma-assets/ai-project-opportunity-enterprise-icon.svg";
const AI_PROJECT_OPPORTUNITY_ENTERPRISE_SOFT_ICON_SRC = "/figma-assets/ai-project-opportunity-enterprise-soft-icon.svg";
const AI_PROJECT_OPPORTUNITY_CREATOR_ICON_SRC = "/figma-assets/ai-project-opportunity-creator-icon.svg";
const AI_PROJECT_OPPORTUNITY_CREATOR_PLAIN_ICON_SRC = "/figma-assets/ai-project-opportunity-creator-plain-icon.svg";
const AI_PROJECT_OPPORTUNITY_CREATOR_SOFT_ICON_SRC = "/figma-assets/ai-project-opportunity-creator-soft-icon.svg";
const AI_PROJECT_OPPORTUNITY_ARROW_RIGHT_SRC = "/figma-assets/ai-project-opportunity-arrow-right.svg";
const AI_PROJECT_OPPORTUNITY_ARROW_DOWN_SRC = "/figma-assets/ai-project-opportunity-arrow-down.svg";
const AI_PROJECT_OPPORTUNITY_CREATION_ACCENT_SRC = "/figma-assets/ai-project-opportunity-creation-accent.svg";
const AI_PROJECT_OPPORTUNITY_WORKFLOW_DOT_SRC = "/figma-assets/ai-project-opportunity-workflow-dot.svg";
const AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_SRC = "/figma-assets/ai-project-opportunity-workflow-arrow.svg";
const AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_BACK_SRC = "/figma-assets/ai-project-opportunity-workflow-arrow-back.svg";
const AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_DOWN_SRC = "/figma-assets/ai-project-opportunity-workflow-arrow-down.svg";
const AI_PROJECT_ARCHITECTURE_METRIC_SPACER_SRC = "/figma-assets/ai-project-architecture-metric-spacer.svg";
const AI_PROJECT_ITERATION_METRIC_SPACER_SRC = "/figma-assets/ai-project-iteration-metric-spacer.svg";
const AI_PROJECT_ITERATION_WORKFLOW_ROW_ARROW_SRC = "/figma-assets/ai-project-iteration-workflow-row-arrow.svg";
const AI_PROJECT_ITERATION_WORKFLOW_TITLE_DOT_SRC = "/figma-assets/ai-project-iteration-workflow-title-dot.svg";
const AI_PROJECT_ITERATION_WORKFLOW_TABS_DIVIDER_SRC = "/figma-assets/ai-project-iteration-workflow-tabs-divider.svg";
const AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_GREEN_SRC = "/figma-assets/ai-project-iteration-workflow-tag-arrow-green.svg";
const AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_TEAL_SRC = "/figma-assets/ai-project-iteration-workflow-tag-arrow-teal.svg";
const AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_BLUE_SRC = "/figma-assets/ai-project-iteration-workflow-tag-arrow-blue.svg";
const AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_PURPLE_SRC = "/figma-assets/ai-project-iteration-workflow-tag-arrow-purple.svg";
const AI_PROJECT_CLOSED_LOOP_ICON_TASK_SRC = "/figma-assets/ai-project-closed-loop-icon-task.svg";
const AI_PROJECT_CLOSED_LOOP_ICON_CREATE_SRC = "/figma-assets/ai-project-closed-loop-icon-create.svg";
const AI_PROJECT_CLOSED_LOOP_ICON_AI_SRC = "/figma-assets/ai-project-closed-loop-icon-ai.svg";
const AI_PROJECT_CLOSED_LOOP_LABEL_ARROW_SRC = "/figma-assets/ai-project-closed-loop-label-arrow.svg";
const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_01_ACTIVE_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-01-active.svg";
const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_01_MUTED_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-01-muted.svg";
const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02A_ACTIVE_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-02a-active.svg";
const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02A_MUTED_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-02a-muted.svg";
const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02B_ACTIVE_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-02b-active.svg";
const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02B_MUTED_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-02b-muted.svg";
const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_03_ACTIVE_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-03-active.svg";
const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_03_MUTED_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-03-muted.svg";
const AI_PROJECT_STRATEGY_TOP_DIVIDER_SRC = "/figma-assets/ai-project-strategy-top-divider.svg";
const AI_PROJECT_STRATEGY_SECTION_DIVIDER_SRC = "/figma-assets/ai-project-strategy-section-divider.svg";
const AI_PROJECT_STRATEGY_SIDE_DIVIDER_SRC = "/figma-assets/ai-project-strategy-side-divider.svg";
const AI_PROJECT_STRATEGY_COLUMN_DIVIDER_SRC = "/figma-assets/ai-project-strategy-column-divider.svg";
const AI_PROJECT_STRATEGY_COLUMN_DIVIDER_AI_SRC = "/figma-assets/ai-project-strategy-column-divider-ai.svg";
const AI_PROJECT_STRATEGY_BULLET_SRC = "/figma-assets/ai-project-strategy-bullet.svg";
const AI_PROJECT_STRATEGY_TASK_ICON_VECTOR_SRC = "/figma-assets/ai-project-strategy-task-icon-vector.svg";
const AI_PROJECT_STRATEGY_STEP_DOT_SRC = "/figma-assets/ai-project-strategy-step-dot.svg";
const AI_PROJECT_STRATEGY_MVP_TRANSITION = { duration: 0.5, ease: [0.52, 0.54, 0.04, 1] } as const;
const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_TRANSITION = { duration: 0.5, ease: [0.52, 0.54, 0.04, 1] } as const;
const AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_OFF_LEADING_SRC = "/figma-assets/ai-project-strategy-preview-switch-handle-off-leading.svg";
const AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_OFF_TRAILING_SRC = "/figma-assets/ai-project-strategy-preview-switch-handle-off-trailing.svg";
const AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_ON_LEADING_SRC = "/figma-assets/ai-project-strategy-preview-switch-handle-on-leading.svg";
const AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_ON_TRAILING_SRC = "/figma-assets/ai-project-strategy-preview-switch-handle-on-trailing.svg";
const AI_PROJECT_STRATEGY_TAB_GROUP_BACKGROUND =
  "linear-gradient(90deg, rgba(210, 210, 210, 0.25) 0%, #D2D2D2 var(--strategy-gradient-stop), rgba(210, 210, 210, 0.25) 100%), #E6E6E6";

const PROJECT_NUMBER_BY_ID: Record<AiProductFeaturedProject["id"], string> = {
  "geo-platform": "01",
  "pet-saas": "02",
};

const AI_PROJECT_NAV_ITEMS = [
  {
    id: "overview",
    num: "00",
    title: "项目概览",
    subtitle: "project overview",
    figmaNodeId: "706:12949",
  },
  {
    id: "opportunity",
    num: "01",
    title: "产品机会",
    subtitle: "project opportunity",
    figmaNodeId: "1789:13764",
  },
  {
    id: "strategy",
    num: "02",
    title: "产品策略",
    subtitle: "product strategy",
    figmaNodeId: "1789:14060",
  },
  {
    id: "architecture",
    num: "03",
    title: "MVP 架构",
    subtitle: "mvp architecture",
    figmaNodeId: "1789:14063",
  },
  {
    id: "closedLoop",
    num: "04",
    title: "闭环验证",
    subtitle: "Closed-loop",
    figmaNodeId: "1789:14196",
  },
  {
    id: "iteration",
    num: "05",
    title: "落地迭代",
    subtitle: "Iterative optimization",
    figmaNodeId: "1789:14299",
  },
] as const;

type AIProjectDetailSectionId = (typeof AI_PROJECT_NAV_ITEMS)[number]["id"];
type AIProjectNavItemData = (typeof AI_PROJECT_NAV_ITEMS)[number];
type AIProjectDetailContentSectionId = Exclude<AIProjectDetailSectionId, "overview">;
type AIProjectContentNavItemData = Extract<AIProjectNavItemData, { id: AIProjectDetailContentSectionId }>;

type AIProjectSectionTitleAsset = {
  src: string;
  width: number;
  sectionNodeId: string;
  contentNodeId: string;
  titleRowNodeId: string;
  titleNodeId: string;
  caretNodeId: string;
  descriptionNodeId: string;
  unionNodeId: string;
};

const AI_PROJECT_SECTION_TITLE_ASSETS: Record<AIProjectDetailContentSectionId, AIProjectSectionTitleAsset> = {
  opportunity: {
    src: "/figma-assets/ai-project-section-title-opportunity.svg",
    width: 338,
    sectionNodeId: "1836:16442",
    contentNodeId: "1836:16443",
    titleRowNodeId: "1836:16444",
    titleNodeId: "1836:16445",
    caretNodeId: "1836:16446",
    descriptionNodeId: "1836:16447",
    unionNodeId: "1836:16477",
  },
  strategy: {
    src: "/figma-assets/ai-project-section-title-strategy.svg",
    width: 491,
    sectionNodeId: "1837:16478",
    contentNodeId: "1837:16479",
    titleRowNodeId: "1837:16480",
    titleNodeId: "1837:16481",
    caretNodeId: "1837:16482",
    descriptionNodeId: "1837:16483",
    unionNodeId: "1837:16504",
  },
  architecture: {
    src: "/figma-assets/ai-project-section-title-architecture.svg",
    width: 483,
    sectionNodeId: "1837:16505",
    contentNodeId: "1837:16506",
    titleRowNodeId: "1837:16507",
    titleNodeId: "1837:16508",
    caretNodeId: "1837:16509",
    descriptionNodeId: "1837:16510",
    unionNodeId: "1837:16531",
  },
  closedLoop: {
    src: "/figma-assets/ai-project-section-title-validation.svg",
    width: 765,
    sectionNodeId: "1837:16532",
    contentNodeId: "1837:16533",
    titleRowNodeId: "1837:16534",
    titleNodeId: "1837:16535",
    caretNodeId: "1837:16536",
    descriptionNodeId: "1837:16537",
    unionNodeId: "1837:16566",
  },
  iteration: {
    src: "/figma-assets/ai-project-section-title-iteration.svg",
    width: 838,
    sectionNodeId: "1837:16567",
    contentNodeId: "1837:16568",
    titleRowNodeId: "1837:16569",
    titleNodeId: "1837:16570",
    caretNodeId: "1837:16571",
    descriptionNodeId: "1837:16572",
    unionNodeId: "1837:16608",
  },
};

const OVERVIEW_META = AI_PROJECT_NAV_ITEMS[0];
const OPPORTUNITY_META = AI_PROJECT_NAV_ITEMS[1];
const STRATEGY_META = AI_PROJECT_NAV_ITEMS[2];
const ARCHITECTURE_META = AI_PROJECT_NAV_ITEMS[3];
const CLOSED_LOOP_META = AI_PROJECT_NAV_ITEMS[4];
const ITERATION_META = AI_PROJECT_NAV_ITEMS[5];

function AIProjectNavItem({
  item,
  active,
  onClick,
}: {
  item: AIProjectNavItemData;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      aria-current={active ? "true" : undefined}
      className={`group flex w-full cursor-pointer items-start rounded-[7px] text-left transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-white/45 ${
        active ? "opacity-100" : "opacity-45 hover:opacity-80"
      }`}
      data-figma-node-id={item.figmaNodeId}
    >
      <span className="relative flex size-[56px] shrink-0 items-center justify-center rounded-[7px]">
        <span
          className={`font-['DINOT:Bold',sans-serif] text-center text-[21px] leading-[24.5px] ${
            active ? "text-white/80" : "text-[#c6c6c6]/55"
          }`}
        >
          {item.num}
        </span>
      </span>
      <span className="flex min-w-px flex-1 flex-col items-start py-[8px] leading-none">
        <span
          className={`font-['OPPOSans:Bold',sans-serif] text-[16px] leading-[24px] ${
            active ? "text-white" : "text-white/50"
          }`}
        >
          {item.title}
        </span>
        <span
          className={`font-['Inter:Regular',sans-serif] text-[12px] leading-[16px] ${
            active ? "text-white/50" : "text-white/30"
          } ${item.id === "strategy" || item.id === "architecture" ? "" : "tracking-[-0.35px]"}`}
        >
          {item.subtitle}
        </span>
      </span>
    </button>
  );
}

function PlaceholderPanel({ height }: { height: number }) {
  return <div className="w-full rounded-[8px] bg-[#f4f4f4] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]" style={{ height }} aria-hidden="true" />;
}

function QuoteBlock({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full gap-[18px]">
      <span className="mt-[4px] h-auto w-[4px] shrink-0 rounded-full bg-[#4f6258]/70" />
      <div className="flex min-w-0 flex-col gap-[10px]">
        {title ? <h3 className="font-['OPPOSans:Bold',sans-serif] text-[18px] leading-[28px] text-[#3f3f3f]">{title}</h3> : null}
        <div className="font-['OPPOSans:Regular',sans-serif] text-[14px] leading-[30px] text-[#626262]">{children}</div>
      </div>
    </div>
  );
}

function SectionHeading({
  titleAsset,
  title,
  description,
}: {
  titleAsset: AIProjectSectionTitleAsset;
  title: string;
  description: string;
}) {
  return (
    <header className="relative flex w-full items-end gap-[24px] pt-[28px]" data-node-id={titleAsset.sectionNodeId} data-name="Section Divider">
      <div className="pointer-events-none absolute left-0 top-[8px] h-[32px]" style={{ width: titleAsset.width }} data-node-id={titleAsset.unionNodeId} data-name="Union">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={titleAsset.src} />
      </div>
      <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start justify-end gap-[16px] opacity-80" data-node-id={titleAsset.contentNodeId}>
        <div className="relative flex shrink-0 items-end gap-[12px]" data-node-id={titleAsset.titleRowNodeId}>
          <h2
            className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['Alibaba_PuHuiTi_2.0:115_Black'] text-[36px] leading-[0] text-[#181818] not-italic uppercase whitespace-nowrap"
            data-node-id={titleAsset.titleNodeId}
          >
            <span className="leading-[30px]">{title}</span>
          </h2>
          <div className="relative flex shrink-0 items-center justify-center" data-node-id={titleAsset.caretNodeId}>
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="relative size-[18px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_SECTION_TITLE_CARET_SRC} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="[word-break:break-word] relative flex min-w-full w-[min-content] shrink-0 flex-col justify-center font-['OPPOSans:Light'] text-[12px] leading-[0] text-justify text-[#1a1c1c] not-italic"
          data-node-id={titleAsset.descriptionNodeId}
        >
          <p className="leading-[20px]">{description}</p>
        </div>
      </div>
    </header>
  );
}

function DetailSection({
  meta,
  title,
  description,
  sectionRef,
  children,
}: {
  meta: AIProjectContentNavItemData;
  title: string;
  description: string;
  sectionRef: (node: HTMLElement | null) => void;
  children: React.ReactNode;
}) {
  const titleAsset = AI_PROJECT_SECTION_TITLE_ASSETS[meta.id];

  return (
    <section
      id={`ai-project-detail-section-${meta.id}`}
      ref={sectionRef}
      className="flex w-full scroll-mt-0 flex-col items-center px-[64px] pt-[128px]"
      data-section-id={meta.id}
      data-node-id={meta.figmaNodeId}
      data-name={`Section Container ${meta.num}`}
    >
      <div className="flex w-[864px] max-w-full flex-col gap-[40px]">
        <SectionHeading titleAsset={titleAsset} title={title} description={description} />
        <div className="flex w-full flex-col gap-[32px]">{children}</div>
      </div>
    </section>
  );
}

function ProjectOverviewMetric({
  ghostLabel,
  title,
  value,
  valueTrackingClass,
  ghostTrackingClass = "tracking-[2px]",
  nodeId,
}: {
  ghostLabel: string;
  title: string;
  value: string;
  valueTrackingClass: string;
  ghostTrackingClass?: string;
  nodeId: string;
}) {
  return (
    <div className="flex shrink-0 flex-col items-start gap-[8px]" data-node-id={nodeId}>
      <div className="flex w-[84px] shrink-0 flex-col items-start px-[2px] text-[20px] leading-[0] whitespace-nowrap">
        <div
          className={`mb-[-16px] flex shrink-0 flex-col justify-center font-['Alimama_ShuHeiTi:Bold'] uppercase ${ghostTrackingClass}`}
        >
          <p className="ai-project-outline-text leading-[31.965px]">{ghostLabel}</p>
        </div>
        <div className="flex shrink-0 flex-col justify-center font-['Manrope:ExtraBold'] font-extrabold tracking-[1.2px] text-[#474747]">
          <p className="leading-[24px]">{title}</p>
        </div>
      </div>
      <div className="flex w-[148px] shrink-0 flex-col items-start justify-center rounded-[4px] bg-gradient-to-r from-[rgba(221,221,221,0)] to-[rgba(221,221,221,0.8)] px-[4px] py-[6px]">
        <div className={`flex shrink-0 flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] text-[#474747] opacity-80 whitespace-nowrap ${valueTrackingClass}`}>
          <p className="leading-[16px]">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectOverviewTimelineNumber({ value }: { value: string }) {
  return (
    <div className="flex h-[20px] w-[24px] shrink-0 items-center justify-center rounded-[4px] bg-[#d9d9d9]">
      <div className="flex shrink-0 flex-col justify-center font-['DINOT:Bold'] text-[10px] leading-[0] tracking-[1px] text-[#474747] whitespace-nowrap">
        <p className="leading-[24px]">{value}</p>
      </div>
    </div>
  );
}

function ProjectOverviewDetailItem({
  nodeId,
  title,
  details,
}: {
  nodeId: string;
  title: string;
  details: string[];
}) {
  return (
    <div className="flex shrink-0 flex-col items-start" data-node-id={nodeId} data-name="Role Item Container">
      <div className="flex shrink-0 flex-col justify-center font-['OPPOSans:Regular'] text-[#474747] opacity-80">
        <p className="leading-[24px]">{title}</p>
      </div>
      <div className="flex shrink-0 flex-col justify-center font-['OPPOSans:Light'] text-[#474747] opacity-80">
        {details.map((detail) => (
          <p key={detail} className="leading-[24px]">
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
}

function ProjectOverviewSection({ sectionRef }: { sectionRef: (node: HTMLElement | null) => void }) {
  return (
    <section
      id={`ai-project-detail-section-${OVERVIEW_META.id}`}
      ref={sectionRef}
      className="w-full scroll-mt-0 overflow-hidden rounded-bl-[48px] rounded-br-[48px] bg-gradient-to-b from-[#e6e6e6] from-50% to-[#e2e2e2] px-[64px] pb-[84px] pt-[128px]"
      data-section-id={OVERVIEW_META.id}
      data-node-id="1789:13700"
      data-mapped-node-id={OVERVIEW_META.figmaNodeId}
      data-name="Section - Project List: Nebula Financial"
    >
      <div className="mx-auto flex w-[864px] max-w-full shrink-0 flex-col items-start gap-[64px]" data-node-id="1789:13701" data-name="Header Section">
        <header className="flex w-full shrink-0 flex-col items-start gap-[16px]" data-node-id="1789:13702" data-name="Header Container">
          <div className="h-[72px] relative shrink-0 w-[585px]" data-node-id="1789:13703" data-name="Heading 1">
            <img alt="GEO 共享创作平台" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_OVERVIEW_HEADING_SRC} />
          </div>
          <div
            className="flex w-[585px] shrink-0 items-center justify-between px-[2px] font-['Manrope:Light'] text-[16px] font-light leading-[0] text-[#474747] whitespace-nowrap"
            data-node-id="1789:13706"
            data-name="Subheader Container"
          >
            <div className="flex shrink-0 flex-col justify-center tracking-[4px]" data-node-id="1789:13707">
              <p className="leading-[32px]">AI PLATFORM</p>
            </div>
            <div className="flex shrink-0 flex-col justify-center tracking-[2px]" data-node-id="1789:13708">
              <p className="leading-[32px]">|</p>
            </div>
            <div className="flex shrink-0 flex-col justify-center tracking-[8px]" data-node-id="1789:13709">
              <p className="leading-[32px]">0→1</p>
            </div>
            <div className="flex shrink-0 flex-col justify-center tracking-[2px]" data-node-id="1789:13710">
              <p className="leading-[32px]">|</p>
            </div>
            <div className="flex shrink-0 flex-col justify-center tracking-[1.6px]" data-node-id="1789:13711">
              <p className="leading-[32px]">从企业营销需求到创作者内容履约</p>
            </div>
          </div>
        </header>

        <div className="flex w-full shrink-0 flex-col items-start gap-[48px]" data-node-id="1789:13712" data-name="Content Container">
          <div className="flex w-full shrink-0 items-start justify-between" data-node-id="1789:13713" data-name="Icon Container">
            <ProjectOverviewMetric ghostLabel="Project Type" title="项目性质" value="AI内容与履约平台" valueTrackingClass="tracking-[3px]" nodeId="752:12822" />
            <ProjectOverviewMetric ghostLabel="Project Status" title="项目状态" value="MVP跑通主业务流程" valueTrackingClass="tracking-[2px]" nodeId="1789:13715" />
            <ProjectOverviewMetric ghostLabel="Team Model" title="团队形式" value="5人跨职能AI团队" valueTrackingClass="tracking-[4.5px]" nodeId="1789:13716" />
            <ProjectOverviewMetric
              ghostLabel="Lifecycle"
              title="项目周期"
              value="2026.01 - 2026.05"
              valueTrackingClass="tracking-[1.5px]"
              ghostTrackingClass="tracking-[3px]"
              nodeId="1789:13717"
            />
          </div>

          <div className="relative h-0 w-full shrink-0" data-node-id="1789:13718">
            <div className="absolute inset-[-0.5px_0]">
              <img alt="" className="block size-full max-w-none" src={AI_PROJECT_OVERVIEW_DIVIDER_SRC} />
            </div>
          </div>

          <div className="flex w-full shrink-0 items-center gap-[92px] rounded-br-[100px] rounded-tr-[100px]" data-node-id="1789:13719" data-name="Detailed Report Container">
            <div className="flex h-[180px] shrink-0 flex-col items-start gap-[20px] pt-[8px]" data-node-id="1789:13720" data-name="Role Description Container">
              <div className="flex h-[60px] shrink-0 flex-col items-start justify-end gap-[8px]" data-node-id="1789:13721" data-name="Icon">
                <ProjectOverviewMetric
                  ghostLabel="my role"
                  title="项目角色"
                  value="产品与体验负责人"
                  valueTrackingClass="tracking-[3px]"
                  ghostTrackingClass="tracking-[4px]"
                  nodeId="I1789:13721;752:12814"
                />
              </div>
              <div className="flex min-w-full w-[min-content] shrink-0 flex-col justify-center font-['OPPOSans:Regular'] text-[10px] leading-[0] text-justify text-[#474747] opacity-80" data-node-id="1789:13722">
                <p className="leading-[24px]">独立负责双平台的产品定义与核心体验，并协同研发、运营推动MVP上线与持续迭代</p>
              </div>
            </div>

            <div className="relative h-[180px] min-w-px flex-[1_0_0]" data-node-id="1789:13723" data-name="Project List">
              <div className="absolute left-[25.5px] top-[22px] flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] tracking-[1px] text-center text-[#474747] opacity-80 whitespace-nowrap" data-node-id="1789:13725">
                <p className="leading-[28px]">业务建模</p>
              </div>
              <div className="absolute left-[193px] top-[22px] flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] tracking-[1px] text-center text-[#474747] opacity-80 whitespace-nowrap" data-node-id="1789:13726">
                <p className="leading-[28px]">MVP定义</p>
              </div>
              <div className="absolute left-[374.5px] top-[22px] flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] tracking-[1px] text-center text-[#474747] opacity-80 whitespace-nowrap" data-node-id="1789:13727">
                <p className="leading-[28px]">体验落地</p>
              </div>
              <div className="absolute left-[579.5px] top-[22px] flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] tracking-[1px] text-center text-[#474747] opacity-80 whitespace-nowrap" data-node-id="1789:13728">
                <p className="leading-[28px]">上线迭代</p>
              </div>

              <div className="absolute left-0 top-[44px] flex w-[624px] items-center" data-node-id="1789:13729" data-name="Quote Container">
                <div className="flex w-[51px] shrink-0 items-center" data-node-id="1789:13730" data-name="Quote Item Container">
                  <ProjectOverviewTimelineNumber value="01" />
                  <div className="h-[2px] min-w-px flex-[1_0_0] bg-[#d9d9d9]" data-node-id="1789:13733" data-name="Divider" />
                </div>
                <div className="h-[2px] w-[114px] shrink-0 bg-[#d9d9d9]" data-node-id="1789:13734" data-name="Divider" />
                <div className="flex w-[56px] shrink-0 items-center" data-node-id="1789:13735" data-name="Quote Item Container">
                  <ProjectOverviewTimelineNumber value="02" />
                  <div className="h-[2px] min-w-px flex-[1_0_0] bg-[#d9d9d9]" data-node-id="1789:13738" data-name="Divider" />
                </div>
                <div className="h-[2px] w-[128px] shrink-0 bg-[#d9d9d9]" data-node-id="1789:13739" data-name="Divider" />
                <div className="flex w-[51px] shrink-0 items-center" data-node-id="1789:13740" data-name="Quote Item Container">
                  <ProjectOverviewTimelineNumber value="03" />
                  <div className="h-[2px] min-w-px flex-[1_0_0] bg-[#d9d9d9]" data-node-id="1789:13743" data-name="Divider" />
                </div>
                <div className="h-[2px] w-[154px] shrink-0 bg-[#d9d9d9]" data-node-id="1789:13744" data-name="Divider" />
                <div className="flex w-[51px] shrink-0 items-center" data-node-id="1789:13745" data-name="Quote Item Container">
                  <ProjectOverviewTimelineNumber value="04" />
                  <div className="h-[2px] min-w-px flex-[1_0_0] bg-[#d9d9d9]" data-node-id="1789:13748" data-name="Divider" />
                </div>
                <div className="h-[2px] min-w-px flex-[1_0_0] bg-[#d9d9d9]" data-node-id="1789:13749" data-name="Divider" />
              </div>

              <div className="absolute left-0 top-[84px] flex w-[624px] items-center justify-between text-[10px] leading-[0] text-[#474747] whitespace-nowrap" data-node-id="1789:13751" data-name="Role Details Container">
                <ProjectOverviewDetailItem nodeId="1789:13752" title="明确多角色与双平台边界" details={["角色职责体系", "核心业务对象", "主链路与边界"]} />
                <ProjectOverviewDetailItem nodeId="1789:13755" title="将业务链路转化为可开发版本" details={["双平台产品架构", "MVP功能范围", "任务同步机制"]} />
                <ProjectOverviewDetailItem nodeId="1789:13758" title="完成关键任务体验并推动研发实现" details={["关键任务流程", "核心交互原型", "研发交付与验收"]} />
                <ProjectOverviewDetailItem nodeId="1789:13761" title="跑通主业务流程" details={["MVP上线", "主链路跑通", "迭代清单"]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpportunityQuoteHeader({
  nodeId,
  title,
  description,
  stretchDescription = false,
}: {
  nodeId: string;
  title: string;
  description: string;
  stretchDescription?: boolean;
}) {
  return (
    <div className="relative flex w-full shrink-0 items-start gap-[12px]" data-node-id={nodeId} data-name="Quote Container">
      <div className="relative flex h-[32px] shrink-0 items-center" data-name="Divider Icon Container">
        <div className="relative h-[16px] w-[4px] shrink-0 bg-[#474747] opacity-25" data-name="Divider Icon" />
      </div>
      <div
        className={`[word-break:break-word] relative flex flex-col items-start justify-center gap-[2px] leading-[0] text-[#414141] not-italic ${
          stretchDescription ? "min-w-px flex-[1_0_0]" : "shrink-0 whitespace-nowrap"
        }`}
      >
        <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[20px]">
          <p className="leading-[32px]">{title}</p>
        </div>
        <div
          className={`relative flex shrink-0 flex-col justify-center font-['OPPOSans:Regular'] text-[12px] leading-[0] text-justify opacity-65 ${
            stretchDescription ? "min-w-full w-[min-content]" : ""
          }`}
        >
          <p className="leading-[20px]">{description}</p>
        </div>
      </div>
    </div>
  );
}

function OpportunityPlaceholder({
  nodeId,
  height,
  name,
}: {
  nodeId: string;
  height: number;
  name: "Quote Details" | "Quote Detail";
}) {
  return <div className="relative w-full shrink-0 rounded-[8px] bg-white" style={{ height }} data-node-id={nodeId} data-name={name} aria-hidden="true" />;
}

function MarketEraTab({ label }: { label: string }) {
  return (
    <div className="relative flex shrink-0 items-start">
      <div className="relative size-[10px] shrink-0" data-name="Subtract">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_MARKET_TAB_CORNER_SRC} />
      </div>
      <div className="relative flex h-[18px] shrink-0 items-center justify-center rounded-bl-[8px] rounded-br-[8px] bg-[#d2d2d2] px-[16px]">
        <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Medium'] text-[10px] leading-[0] text-white not-italic whitespace-nowrap">
          <p className="leading-[20px]">{label}</p>
        </div>
      </div>
      <div className="relative flex shrink-0 items-center justify-center">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="relative size-[10px]" data-name="Subtract">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_MARKET_TAB_CORNER_FLIPPED_SRC} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketGoalBar({
  goal,
  detail,
  goalNodeId,
}: {
  goal: string;
  detail: string;
  goalNodeId: string;
}) {
  return (
    <div className="relative h-[48px] w-full shrink-0 overflow-hidden bg-[rgba(255,255,255,0.15)]">
      <div className="absolute left-px top-0 h-[47px] w-[145px]" data-name="Intersect">
        <div className="absolute inset-[-2.13%_-1%_-2.13%_-0.69%]">
          <img alt="" className="block size-full max-w-none" src={AI_PROJECT_MARKET_GOAL_ACCENT_SRC} />
        </div>
      </div>
      <div className="absolute left-0 top-[16px] flex items-center gap-[12px] px-[16px]">
        <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[11px] leading-[0] text-[#9f9f9f] not-italic whitespace-nowrap">
          <p className="leading-[16px]">目标</p>
        </div>
        <div className="relative h-[8px] w-px shrink-0 bg-[#b8b8b8]" data-name="Quote Title" />
        <div className="[word-break:break-word] relative flex shrink-0 items-end gap-[4px] text-[#474747] leading-[0] not-italic whitespace-nowrap">
          <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[11px]" data-node-id={goalNodeId}>
            <p className="leading-[16px]">{goal}</p>
          </div>
          <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Regular'] text-[10px] leading-[0] text-[#6c6c6c] text-justify tracking-[0.4px]">
            <p className="leading-[14px]">{detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketChangePanelBorder() {
  return <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[20] box-border rounded-[8px] border border-[#d2d2d2]" />;
}

function MarketChangeQuoteDetails() {
  return (
    <div className="relative flex h-[317px] w-full shrink-0 items-center gap-[12px]" data-node-id="780:12954" data-name="Quote Details">
      <div className="relative flex h-full w-[272px] shrink-0 box-border flex-col items-center overflow-hidden rounded-[8px] bg-[#e2e2e2]" data-node-id="778:12873" data-name="交互">
        <MarketEraTab label="搜索时代 (SEO)" />
        <div className="[word-break:break-word] relative flex w-full shrink-0 items-start py-[12px] text-center font-['OPPOSans:Bold'] text-[9px] leading-[0] text-[#474747] not-italic" data-node-id="786:12739">
          {["内容", "搜索", "被动曝光"].map((label) => (
            <div key={label} className="relative flex min-w-px flex-[1_0_0] flex-col justify-center">
              <p className="leading-[12px]">{label}</p>
            </div>
          ))}
        </div>
        <div className="relative h-[214px] w-full shrink-0" data-node-id="782:13488">
          <img alt="" className="absolute inset-0 size-full max-w-none object-cover pointer-events-none" src={AI_PROJECT_MARKET_SEO_IMAGE_SRC} />
        </div>
        <div className="relative h-px w-full shrink-0 bg-[#d2d2d2]" data-node-id="782:13507" />
        <MarketGoalBar goal="被用户搜索到" detail="关键词排名/搜索结果曝光" goalNodeId="782:12961" />
        <MarketChangePanelBorder />
      </div>

      <div className="relative h-[8px] w-[24px] shrink-0" data-node-id="782:12987" data-name="Metric Spacer">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_OPPORTUNITY_METRIC_SPACER_SRC} />
      </div>

      <div className="flex min-w-px flex-[1_0_0] flex-row items-center self-stretch" data-node-id="782:12977">
        <div className="relative flex h-full min-w-px flex-[1_0_0] box-border flex-col items-center overflow-hidden rounded-[8px] bg-[#e2e2e2]" data-name="交互">
          <MarketEraTab label="AI问答时代 (GEO)" />
          <div className="[word-break:break-word] relative flex w-full shrink-0 items-start py-[12px] pl-[16px] text-center font-['OPPOSans:Bold'] text-[9px] leading-[0] text-[#474747] not-italic" data-node-id="786:12736">
            <div className="relative flex w-[112px] shrink-0 flex-col justify-center">
              <p className="leading-[12px]">理解</p>
            </div>
            <div className="relative flex min-w-px flex-[1_0_0] flex-col justify-center">
              <p className="leading-[12px]">引用</p>
            </div>
            <div className="relative flex w-[376px] shrink-0 flex-col justify-center uppercase">
              <p className="leading-[12px]">AI主动推荐</p>
            </div>
          </div>
          <div className="relative min-h-px w-full flex-[1_0_0]" data-node-id="782:13596">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover pointer-events-none" src={AI_PROJECT_MARKET_GEO_IMAGE_SRC} />
          </div>
          <div className="relative h-px w-full shrink-0 bg-[#d2d2d2]" data-node-id="782:13594" />
          <MarketGoalBar goal="被AI理解、引用和推荐" detail="进入AI回答/成为可信来源/获得推荐机会" goalNodeId="1448:12610" />
          <MarketChangePanelBorder />
        </div>
      </div>
    </div>
  );
}

function FulfillmentRoleIcon({ src }: { src: string }) {
  return (
    <div className="relative size-[32px] shrink-0">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src={src} />
    </div>
  );
}

function FulfillmentGoalTag({
  text,
  tone = "blue",
}: {
  text: string;
  tone?: "blue" | "purple";
}) {
  return (
    <div className={`relative flex shrink-0 items-center gap-[4px] rounded-[4px] px-[6px] py-[5px] ${tone === "purple" ? "bg-[#ece8f4]" : "bg-[#e4e8f1]"}`} data-name="Background">
      <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Medium'] text-[10px] leading-[0] text-[#474747] not-italic opacity-80 whitespace-nowrap">
        <p className="leading-[16px]">{text}</p>
      </div>
      <div className="relative size-[8px] shrink-0" data-name="Vector">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_FULFILLMENT_TAG_DOT_SRC} />
      </div>
    </div>
  );
}

function FulfillmentLabelCell({
  zh,
  en,
  accented,
}: {
  zh: string;
  en: string;
  accented?: boolean;
}) {
  return (
    <div className={`relative flex h-[56px] w-[144px] shrink-0 items-center justify-center gap-[12px] px-[24px] py-[12px] ${accented ? "bg-[#e6e6e6]" : "bg-[#e0e0e0]"}`}>
      {accented ? (
        <div className="absolute bottom-0 left-[calc(50%+24px)] h-[56px] w-[192px] -translate-x-1/2" data-name="Intersect">
          <div className="absolute inset-[-1.79%_-0.67%_-1.79%_-0.7%]">
            <img alt="" className="block size-full max-w-none" src={AI_PROJECT_FULFILLMENT_LABEL_ACCENT_SRC} />
          </div>
        </div>
      ) : null}
      {[zh, "｜", en].map((label) => (
        <div key={label} className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[11px] leading-[0] text-[#474747] not-italic uppercase whitespace-nowrap">
          <p className="leading-[16px]">{label}</p>
        </div>
      ))}
    </div>
  );
}

function FulfillmentRolesQuoteDetail() {
  return (
    <div className="relative flex h-[113px] w-full shrink-0 items-start overflow-hidden rounded-[8px] border border-[#d2d2d2] bg-[#e6e6e6]" data-node-id="1496:13025" data-name="Quote Detail">
      <div className="relative flex h-full shrink-0 flex-col items-start justify-center">
        <FulfillmentLabelCell zh="角色" en="user" accented />
        <div className="relative h-px w-full shrink-0 bg-[#d2d2d2]" />
        <FulfillmentLabelCell zh="目标" en="goal" />
      </div>
      <div className="relative flex h-full shrink-0 flex-col items-start justify-center">
        <div className="relative flex min-h-px w-full flex-[1_0_0] items-center gap-[24px] px-[16px] py-[12px]">
          <div className="relative flex shrink-0 items-center gap-[12px]">
            <FulfillmentRoleIcon src={AI_PROJECT_FULFILLMENT_AGENCY_ICON_SRC} />
            <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[11px] leading-[0] text-[#474747] not-italic uppercase whitespace-nowrap">
              <p className="leading-[16px]">代理商（代理多企业）</p>
            </div>
          </div>
          <div className="relative flex shrink-0 items-center gap-[12px]">
            <FulfillmentRoleIcon src={AI_PROJECT_FULFILLMENT_ENTERPRISE_ICON_SRC} />
            <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[11px] leading-[0] text-[#474747] not-italic uppercase whitespace-nowrap">
              <p className="leading-[16px]">入驻企业（单企业）</p>
            </div>
          </div>
        </div>
        <div className="relative h-px w-full shrink-0 bg-[#d2d2d2]" />
        <div className="relative flex min-h-px flex-[1_0_0] items-center gap-[7px] bg-[#e0e0e0] px-[16px] py-[12px]">
          <FulfillmentGoalTag text="企业&品牌资料维护" />
          <FulfillmentGoalTag text="需求整理&派发&归档" />
          <FulfillmentGoalTag text="履约追踪&验收结算" />
        </div>
      </div>
      <div className="relative flex h-full min-w-px flex-[1_0_0] flex-col items-start justify-center">
        <div className="relative flex min-h-px w-full flex-[1_0_0] items-center gap-[12px] px-[16px] py-[12px]">
          <FulfillmentRoleIcon src={AI_PROJECT_FULFILLMENT_CREATOR_ICON_SRC} />
          <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[11px] leading-[0] text-[#474747] not-italic uppercase whitespace-nowrap">
            <p className="leading-[16px]">创作者</p>
          </div>
        </div>
        <div className="relative h-px w-full shrink-0 bg-[#d2d2d2]" />
        <div className="relative flex min-h-px w-full flex-[1_0_0] items-center justify-between bg-[#e0e0e0] px-[16px] py-[12px]">
          {["内容创作", "素材调用", "进度回传", "验收结算跟踪"].map((tag) => (
            <FulfillmentGoalTag key={tag} text={tag} tone="purple" />
          ))}
        </div>
      </div>
    </div>
  );
}

function FulfillmentStageHeader({ title, widthClass }: { title: string; widthClass: string }) {
  return (
    <div className={`relative flex h-[36px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-tl-[4px] rounded-tr-[4px] bg-[#f1f1f1] ${widthClass}`} data-name="交互">
      <p className="[word-break:break-word] relative shrink-0 font-['OPPOSans:Bold'] text-[12px] leading-[20px] tracking-[1.44px] text-[#474747] text-justify not-italic whitespace-nowrap">
        {title}
      </p>
    </div>
  );
}

function FulfillmentBreakpointCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className: string;
}) {
  return (
    <div className={`relative flex flex-col items-start gap-[2px] self-stretch overflow-hidden bg-[#e9e9e9] px-[16px] py-[8px] text-[11px] text-[#474747] ${className}`} data-name="交互">
      <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Medium'] leading-[0] whitespace-nowrap">
        <p className="leading-[20px]">{title}</p>
      </div>
      <p className="relative w-full shrink-0 font-['OPPOSans:Regular'] text-[rgba(71,71,71,0.8)] leading-[18px] tracking-[0.44px] text-justify">
        {description}
      </p>
    </div>
  );
}

function FulfillmentFlowArrow() {
  return (
    <div className="relative h-[14px] w-[24px] shrink-0">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_FULFILLMENT_FLOW_ARROW_SRC} />
    </div>
  );
}

function FulfillmentBreakpointsQuoteDetail() {
  const stages = [
    { title: "内容投放", widthClass: "w-[136px]" },
    { title: "任务定义", widthClass: "w-[132px]" },
    { title: "内容生产", widthClass: "min-w-px flex-[1_0_0]" },
    { title: "内容分发", widthClass: "min-w-px flex-[1_0_0]" },
    { title: "生命周期管理", widthClass: "w-[136px]" },
  ];

  const breakpoints = [
    { title: "信息分散", description: "资料散落在文档、第三方聊天工具中", className: "w-[136px] shrink-0 rounded-bl-[4px] rounded-br-[4px] pb-[8px] pt-[10px]" },
    { title: "需求表达不标准", description: "无法形成标准化的统一任务包", className: "w-[132px] shrink-0" },
    { title: "创作者理解成本高", description: "反复沟通，执行偏差大", className: "min-w-px flex-[1_0_0]" },
    { title: "进度&质量 监管困难", description: "执行过程无可视化，结果质量难以控制", className: "min-w-px flex-[1_0_0]" },
    { title: "验收&结算低效", description: "结果回收慢，履约闭环不完整", className: "w-[136px] shrink-0" },
  ];

  return (
    <div className="relative flex h-[142px] w-full shrink-0 flex-col items-start overflow-hidden rounded-[8px] border border-[#d2d2d2] bg-[#e2e2e2] p-[16px]" data-node-id="1496:13103" data-name="Quote Detail">
      <div className="relative flex w-full shrink-0 items-center gap-[4px]">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.title}>
            <FulfillmentStageHeader title={stage.title} widthClass={stage.widthClass} />
            {index < stages.length - 1 ? <FulfillmentFlowArrow /> : null}
          </React.Fragment>
        ))}
      </div>
      <div className="relative flex w-full shrink-0 items-start justify-center gap-[32px] overflow-hidden text-[11px] not-italic" data-name="交互">
        {breakpoints.map((item) => (
          <FulfillmentBreakpointCard key={item.title} title={item.title} description={item.description} className={item.className} />
        ))}
      </div>
    </div>
  );
}

type OpportunityStepCardTone = "plain" | "soft" | "light";

type OpportunityStepCardData = {
  title: string;
  description: string;
  step: string;
  widthClass: string;
  tone?: OpportunityStepCardTone;
  icons: string[];
};

function OpportunityRoleIcon({ icon, overlapped }: { icon: string; overlapped: boolean }) {
  const needsInset = icon !== AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC;

  return (
    <div className={`relative size-[32px] shrink-0 ${overlapped ? "ml-[-8px]" : ""}`}>
      {needsInset ? (
        <div className="absolute inset-[-9.38%]">
          <img alt="" className="block size-full max-w-none" src={icon} />
        </div>
      ) : (
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
      )}
    </div>
  );
}

function OpportunityStepCard({ card }: { card: OpportunityStepCardData }) {
  return (
    <div
      className={`relative flex shrink-0 flex-col items-start gap-[8px] overflow-hidden rounded-[8px] px-[16px] py-[12px] ${
        card.tone === "light" ? "bg-[#f1f1f1]" : card.tone === "soft" ? "bg-[linear-gradient(90deg,rgba(241,241,241,0.5),rgba(241,241,241,0.5)),linear-gradient(90deg,#e9e9e9,#e9e9e9)]" : "bg-[#e9e9e9]"
      } ${card.widthClass}`}
      data-name="交互"
    >
      <div className="[word-break:break-word] relative flex w-full shrink-0 flex-col items-start text-[11px] text-[#474747] not-italic">
        <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] leading-[0] whitespace-nowrap">
          <p className="leading-[20px]">{card.title}</p>
        </div>
        <p className="relative min-w-full w-[min-content] shrink-0 font-['OPPOSans:Regular'] text-[rgba(71,71,71,0.8)] leading-[16px] text-justify">
          {card.description}
        </p>
      </div>
      <div className="relative flex w-full shrink-0 items-center justify-between rounded-br-[16px] rounded-tr-[16px]" style={{ backgroundImage: "linear-gradient(270deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)" }}>
        <div className="relative mr-[-12px] flex shrink-0 items-center">
          {card.icons.map((icon, index) => (
            <OpportunityRoleIcon key={`${card.title}-${icon}-${index}`} icon={icon} overlapped={index > 0} />
          ))}
        </div>
        <div className="relative flex shrink-0 items-center gap-[8px]">
          <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[10px] leading-[0] text-[#474747] not-italic opacity-20 whitespace-nowrap">
            <p className="leading-[20px]">STEP</p>
          </div>
          <div className="relative flex size-[32px] shrink-0 flex-col items-center justify-center rounded-[16px] border-l border-[#cecece] bg-[rgba(255,255,255,0.15)]">
            <div className="[word-break:break-word] relative w-full shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-center text-[10px] leading-[0] tracking-[2px] text-[#474747] not-italic opacity-40">
              <p className="leading-[20px]">{card.step}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpportunityArrow({ flipped = false, down = false }: { flipped?: boolean; down?: boolean }) {
  const src = down ? AI_PROJECT_OPPORTUNITY_ARROW_DOWN_SRC : AI_PROJECT_OPPORTUNITY_ARROW_RIGHT_SRC;

  return (
    <div className={`relative flex shrink-0 items-center justify-center ${down ? "h-[36px] w-[264px]" : "h-[14px] w-[24px]"}`}>
      <img alt="" className={`absolute inset-0 block size-full max-w-none ${flipped ? "rotate-180" : ""} ${down ? "-rotate-90" : ""}`} src={src} />
    </div>
  );
}

function ProductOpportunityWorkflow() {
  const topFlow = ["接收任务需求包", "关键词拓展", "内容AI创作"];
  const bottomFlow = ["跟踪验收结算", "任务进度回传", "内容分发"];

  return (
    <div className="relative flex min-h-px w-full flex-[1_0_0] flex-col items-end justify-between overflow-hidden p-[14px]" data-name="交互">
      <div className="absolute left-0 top-[72px] h-[64px] w-[272px]" data-name="Intersect">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_OPPORTUNITY_CREATION_ACCENT_SRC} />
      </div>
      <div className="absolute left-[14px] top-[calc(50%+23px)] -translate-y-1/2 flex flex-col justify-center font-['OPPOSans:Bold'] text-[19px] leading-[0] text-[rgba(255,255,255,0.5)] mix-blend-multiply uppercase whitespace-nowrap">
        <p className="leading-[20px]">Creation</p>
      </div>
      <div className="absolute left-[135px] top-[91px] -translate-y-1/2 flex flex-col justify-center font-['OPPOSans:Bold'] text-[19px] leading-[0] text-[rgba(255,255,255,0.5)] mix-blend-multiply uppercase whitespace-nowrap">
        <p className="leading-[20px]">Workflow</p>
      </div>
      <div className="relative flex w-full shrink-0 items-center justify-between">
        <div className="relative size-[8px] shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_OPPORTUNITY_WORKFLOW_DOT_SRC} />
        </div>
        {topFlow.map((label, index) => (
          <React.Fragment key={label}>
            <p className={`[word-break:break-word] relative shrink-0 font-['OPPOSans:Regular'] text-[11px] leading-[16px] text-[rgba(71,71,71,0.8)] not-italic ${index === 2 ? "w-[56px] text-center" : "text-justify whitespace-nowrap"}`}>
              {label}
            </p>
            {index < topFlow.length - 1 ? (
              <div className="relative h-[3px] w-[8px] shrink-0" data-name="→">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_SRC} />
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <div className="relative h-[8px] w-[48px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_DOWN_SRC} />
      </div>
      <p className="[word-break:break-word] relative w-[56px] shrink-0 text-center font-['OPPOSans:Regular'] text-[11px] leading-[16px] text-[rgba(71,71,71,0.8)] not-italic">
        自检与优化
      </p>
      <div className="relative h-[8px] w-[48px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_DOWN_SRC} />
      </div>
      <div className="relative flex w-full shrink-0 items-center justify-between">
        {bottomFlow.map((label, index) => (
          <React.Fragment key={label}>
            {index > 0 ? (
              <div className="relative h-[3px] w-[8px] shrink-0" data-name="→">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_BACK_SRC} />
              </div>
            ) : (
              <div className="relative h-[3px] w-[8px] shrink-0" data-name="→">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_BACK_SRC} />
              </div>
            )}
            <p className={`[word-break:break-word] relative shrink-0 font-['OPPOSans:Regular'] text-[11px] leading-[16px] text-[rgba(71,71,71,0.8)] not-italic ${index === 2 ? "text-right whitespace-nowrap" : "text-justify whitespace-nowrap"}`}>
              {label}
            </p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ProductOpportunityQuoteDetail() {
  const leftTop: OpportunityStepCardData[] = [
    {
      title: "维护企业信息库",
      description: "沉淀品牌资料、产品素材、卖点信息等",
      step: "1",
      widthClass: "w-[236px]",
      icons: [AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC, AI_PROJECT_OPPORTUNITY_ENTERPRISE_ICON_SRC],
    },
    {
      title: "标准化任务包",
      description: "整理目标、关键词、内容边界、交付要求",
      step: "2",
      widthClass: "w-[244px]",
      tone: "soft",
      icons: [AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC, AI_PROJECT_OPPORTUNITY_ENTERPRISE_SOFT_ICON_SRC],
    },
  ];

  const leftBottom: OpportunityStepCardData[] = [
    {
      title: "验收&结算任务",
      description: "结果验收、结算确认、归档沉淀",
      step: "5",
      widthClass: "w-[236px]",
      icons: [AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC, AI_PROJECT_OPPORTUNITY_ENTERPRISE_ICON_SRC, AI_PROJECT_OPPORTUNITY_CREATOR_PLAIN_ICON_SRC],
    },
    {
      title: "跟踪履约进度&回传执行成果",
      description: "执行进度回传、修改协同、过程追踪",
      step: "4",
      widthClass: "w-[244px]",
      tone: "soft",
      icons: [AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC, AI_PROJECT_OPPORTUNITY_ENTERPRISE_SOFT_ICON_SRC, AI_PROJECT_OPPORTUNITY_CREATOR_SOFT_ICON_SRC],
    },
  ];

  const creationCard: OpportunityStepCardData = {
    title: "执行内容创作",
    description: "创作者接入关键词、素材、指令和文章创作工具",
    step: "3",
    widthClass: "w-full h-[100px]",
    tone: "light",
    icons: [AI_PROJECT_OPPORTUNITY_CREATOR_ICON_SRC],
  };

  return (
    <div
      className="relative flex h-[268px] w-[864px] max-w-full shrink-0 items-start gap-[8px] overflow-hidden rounded-[8px] border border-[#d2d2d2] bg-[#e2e2e2] p-[16px]"
      style={{ boxSizing: "border-box" }}
      data-node-id="1491:12561"
      data-name="Quote Detail"
    >
      <div className="relative flex shrink-0 flex-col items-start">
        <div className="relative flex w-full shrink-0 items-center gap-[8px]">
          <OpportunityStepCard card={leftTop[0]} />
          <OpportunityArrow />
          <OpportunityStepCard card={leftTop[1]} />
          <OpportunityArrow />
        </div>
        <OpportunityArrow down />
        <div className="relative flex w-full shrink-0 items-center gap-[8px]">
          <OpportunityStepCard card={leftBottom[0]} />
          <OpportunityArrow flipped />
          <OpportunityStepCard card={leftBottom[1]} />
          <OpportunityArrow flipped />
        </div>
      </div>
      <div className="relative flex w-[272px] shrink-0 self-stretch flex-col items-start overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,#e2e2e2_0%,rgba(226,226,226,0)_100%),linear-gradient(90deg,#e9e9e9,#e9e9e9)]">
        <OpportunityStepCard card={creationCard} />
        <ProductOpportunityWorkflow />
      </div>
    </div>
  );
}

function OpportunityMetricLine({
  nodeId,
  text,
  conclusion = false,
}: {
  nodeId: string;
  text: string;
  conclusion?: boolean;
}) {
  return (
    <div
      className={`relative flex shrink-0 justify-center gap-[4px] ${
        conclusion ? "w-full items-start pr-[8px]" : "items-center"
      }`}
      data-node-id={nodeId}
      data-name="Quote Item Container"
    >
      <div className={`relative shrink-0 ${conclusion ? "size-[24px]" : "h-[8px] w-[24px]"}`} data-name="Metric Spacer">
        <img
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          src={conclusion ? AI_PROJECT_OPPORTUNITY_CONCLUSION_SPACER_SRC : AI_PROJECT_OPPORTUNITY_METRIC_SPACER_SRC}
        />
      </div>
      <div
        className={`[word-break:break-word] relative flex flex-col justify-center font-['OPPOSans:Light'] text-[12px] leading-[0] text-[#474747] not-italic uppercase ${
          conclusion ? "min-w-px flex-[1_0_0] text-justify" : "shrink-0 whitespace-nowrap"
        }`}
      >
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}

function OpportunityBlockquote({
  nodeId,
  children,
}: {
  nodeId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-full shrink-0 flex-col items-start gap-[24px]" data-node-id={nodeId} data-name="Blockquote">
      {children}
    </div>
  );
}

function OpportunitySection({ sectionRef }: { sectionRef: (node: HTMLElement | null) => void }) {
  return (
    <section
      id={`ai-project-detail-section-${OPPORTUNITY_META.id}`}
      ref={sectionRef}
      className="flex w-full scroll-mt-0 flex-col items-center px-[64px] py-[48px]"
      data-section-id={OPPORTUNITY_META.id}
      data-node-id="1789:13764"
      data-name="Section Container 01"
    >
      <div className="flex w-[864px] max-w-full flex-col items-start gap-[84px]">
        <SectionHeading
          titleAsset={AI_PROJECT_SECTION_TITLE_ASSETS.opportunity}
          title="01 · 为什么 GEO 内容需要“履约系统化”"
          description="如何从一个新兴市场变化中，识别出一个真实的协作型产品机会。"
        />

        <OpportunityBlockquote nodeId="1789:13766">
          <OpportunityQuoteHeader
            nodeId="778:12915"
            title="市场变化"
            description="AI 搜索改变品牌内容目标：从“被用户搜索到”，转向“被 AI 理解、引用和推荐”"
          />
          <MarketChangeQuoteDetails />
        </OpportunityBlockquote>

        <OpportunityBlockquote nodeId="1789:13918">
          <OpportunityQuoteHeader
            nodeId="1789:13919"
            title="内容履约链路与断点"
            description="在 GEO 场景下，内容不再是单一生产行为，而是一条跨角色的履约链路"
          />
          <div className="relative flex w-full shrink-0 flex-col items-start gap-[12px]" data-node-id="1789:13920" data-name="Quote Details Container">
            <OpportunityMetricLine nodeId="1789:13921" text="链路中的关键角色与行为目标：" />
            <FulfillmentRolesQuoteDetail />
            <OpportunityMetricLine nodeId="1789:13977" text="在传统协作流程中的履约流程：" />
            <FulfillmentBreakpointsQuoteDetail />
            <OpportunityMetricLine nodeId="1789:14006" text="结论:困境在于信息层之间的传递误差，导致协作链路断裂。" />
          </div>
        </OpportunityBlockquote>

        <OpportunityBlockquote nodeId="1789:14010">
          <OpportunityQuoteHeader
            nodeId="1789:14011"
            title="产品机会"
            description="GEO 内容生产的核心问题，不是“写内容”，而是“如何让内容在完整履约链路中稳定流转”。"
            stretchDescription
          />
          <div className="relative flex shrink-0 flex-col items-start gap-[12px]" data-node-id="1789:14012" data-name="Quote Details Container">
            <OpportunityMetricLine nodeId="1789:14013" text="当这一链路的所有角色，都在具有标准化信息链路的统一平台中，共同执行的履约闭环：" />
            <ProductOpportunityQuoteDetail />
            <OpportunityMetricLine
              nodeId="1789:14056"
              text="产品机会不是 AI 写作工具，而是一个结构化协作平台，降低企业、代理商与创作者之间的信息传递误差，把 GEO 内容生产从分散协作转化为可追踪、可复用、可结算的履约流程。"
              conclusion
            />
          </div>
        </OpportunityBlockquote>
      </div>
    </section>
  );
}

type AIProjectStrategyTabId = "strategy01" | "strategy02" | "strategy03";
type AIProjectStrategyViewMode = "strategy" | "preview";

const DEFAULT_STRATEGY_VIEW_MODES: Record<AIProjectStrategyTabId, AIProjectStrategyViewMode> = {
  strategy01: "strategy",
  strategy02: "strategy",
  strategy03: "strategy",
};

type AIProjectStrategyTextBlock = {
  title: string;
  paragraphs: string[];
  layoutClass?: string;
  spacious?: boolean;
};

type AIProjectStrategyFeature = {
  title: string;
  description: string;
  layoutClass?: string;
  trackingClass?: string;
};

type AIProjectStrategyTab = {
  id: AIProjectStrategyTabId;
  label: string;
  title: string;
  variantNodeId: string;
  previewVariantNodeId: string;
  tabGroupNodeId: string;
  gradientStop: string;
  contentHeightClass: string;
  leftColumnBackgroundClass: string;
  leftTitlePaddingClass: string;
  columnDividerSrc: string;
  blocks: AIProjectStrategyTextBlock[];
  features: AIProjectStrategyFeature[];
};

const AI_PROJECT_STRATEGY_TABS: AIProjectStrategyTab[] = [
  {
    id: "strategy01",
    label: "标准化 vs 多样化",
    title: "产品策略01：模块化任务协议",
    variantNodeId: "1788:14123",
    previewVariantNodeId: "1788:14295",
    tabGroupNodeId: "1788:13624",
    gradientStop: "0.01%",
    contentHeightClass: "h-[560px]",
    leftColumnBackgroundClass: "",
    leftTitlePaddingClass: "pl-[92px]",
    columnDividerSrc: AI_PROJECT_STRATEGY_COLUMN_DIVIDER_SRC,
    blocks: [
      {
        title: "问题发现：统一表单无法覆盖不同 GEO 任务复杂度",
        layoutClass: "shrink-0 h-[192px] gap-[4px] px-[24px] pb-[16px] pt-[24px]",
        paragraphs: [
          "起初，我将需求包设计为统一的标准表单，希望降低代理商、企业和创作者之间的信息传递误差。但在搭建最小流程 Demo 后，我发现 GEO 任务的差异非常大：不同企业的产品复杂度、目标关键词、地域限制、AI 平台要求、验收标准和补充素材都不同，单一模板会让简单任务变得冗长，也无法充分表达复杂客户需求。",
        ],
      },
      {
        title: "产品策略：从标准表单转为模块化任务协议",
        layoutClass: "shrink-0 h-[144px] gap-[4px] px-[24px] pb-[16px] pt-[24px]",
        paragraphs: [
          "因此，我将需求包策略从“单一标准表单”调整为“模块化任务协议”：保留企业、产品、目标、关键词、交付要求、验收标准等核心字段作为统一底层对象，同时根据任务类型、行业场景和客户成熟度动态加载补充模块。",
        ],
      },
      {
        title: "设计策略：核心字段固定，补充模块按任务动态加载",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[24px]",
        paragraphs: [
          "用“固定底层对象 + 可变任务模块”的方式，让平台既能标准化协作，又能适配不同客户需求。",
        ],
      },
    ],
    features: [
      {
        title: "企业信库 / 产品档案引用",
        description: "让需求包不是从空白开始填写，而是从企业资料中继承基础信息。",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]",
      },
      {
        title: "需求打包",
        description: "把原始需求整理成可派发、可执行、可验收的任务包。",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]",
      },
      {
        title: "远程需求包",
        description: "当需求信息不完整时，让企业或指定填写人补充关键字段。",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]",
      },
      {
        title: "任务包状态",
        description: "建包中、本地填写、远程分包、待核对、待发包，降低需求交接混乱",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]",
      },
    ],
  },
  {
    id: "strategy02",
    label: "生成效率 vs 内容质量",
    title: "产品策略02：质量方法资产化",
    variantNodeId: "1788:14200",
    previewVariantNodeId: "1788:14357",
    tabGroupNodeId: "1788:13966",
    gradientStop: "50%",
    contentHeightClass: "h-[560px]",
    leftColumnBackgroundClass: "",
    leftTitlePaddingClass: "pl-[92px]",
    columnDividerSrc: AI_PROJECT_STRATEGY_COLUMN_DIVIDER_SRC,
    blocks: [
      {
        title: "问题发现：AI 提升产量，但内容质量不可控",
        layoutClass: "shrink-0 h-[192px] gap-[4px] px-[24px] pb-[16px] pt-[24px]",
        paragraphs: [
          "在创作者侧，最初的核心链路是让创作者接收任务、读取企业资料、扩展关键词并生成文章。但在 Demo 梳理过程中，我发现单纯依赖 AI 生成的确会迅速提升内容产出数量，但内容质量仍然依赖创作者对行业、产品卖点、标题结构、转化表达和平台语境的理解。因此，从而可以推断 GEO 内容生产的难点并不只是“写出来”，而是“写得稳定、可控、可复用”。",
        ],
      },
      {
        title: "产品策略：从生成文章转为沉淀可复用创作方法",
        layoutClass: "shrink-0 h-[144px] gap-[4px] px-[24px] pb-[16px] pt-[24px]",
        paragraphs: [
          "我在创作端增加了爆款文库、爆款反推和指令仓库，让高质量文稿内容不只是参考素材，而是可以被反推为可复用的写作结构和创作指令。",
        ],
      },
      {
        title: "设计策略：参考内容可反推，反推结果可沉淀为指令",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[24px]",
        paragraphs: [
          "把高质量内容从“个人经验”转化为“可复用的创作方法”，让创作者不只是生成文章，而是能调用参考内容、反推结构、沉淀指令，再回到创作流程中复用。",
        ],
      },
    ],
    features: [
      {
        title: "文库收藏",
        description: "保存爆款文章、参考文章和可复用素材。",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]",
      },
      {
        title: "爆款反推",
        description: "从高表现内容中提取标题结构、开头方式、卖点展开方式和转化引导。",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]",
      },
      {
        title: "指令仓库",
        description: "把反推结果沉淀为可复用创作指令。",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]",
      },
      {
        title: "文章创作",
        description: "在任务要求、关键词、企业信库、产品档案和指令的约束下生成内容。",
        layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]",
      },
    ],
  },
  {
    id: "strategy03",
    label: "传统平台 vs AI 原生",
    title: "产品策略03：AI 原生履约流",
    variantNodeId: "1788:14201",
    previewVariantNodeId: "1788:14419",
    tabGroupNodeId: "1788:14049",
    gradientStop: "99.99%",
    contentHeightClass: "h-[560px]",
    leftColumnBackgroundClass: "",
    leftTitlePaddingClass: "pl-[92px]",
    columnDividerSrc: AI_PROJECT_STRATEGY_COLUMN_DIVIDER_AI_SRC,
    blocks: [
      {
        title: "问题发现：传统平台只能管理任务，不能降低链路摩擦",
        layoutClass: "shrink-0 gap-[4px] px-[24px] pb-[20px] pt-[24px]",
        paragraphs: [
          "在最小流程 Demo 中，我发现如果仅按照传统平台逻辑设计，系统会变成“任务发布 + 接单 + 编辑器 + 进度管理”的组合，AI 只停留在文章生成环节。",
          "但 GEO 内容生产的高摩擦点恰恰分布在整条链路中：客户需求需要被结构化，产品资料需要被提炼，关键词需要被扩展，创作者需要获得写作方向，文章需要被检查是否符合品牌与任务要求，进度也需要自动同步给需求侧。",
        ],
        spacious: true,
      },
      {
        title: "产品策略：让 AI 参与整条履约链路，而不是只参与写作",
        layoutClass: "shrink-0 gap-[4px] px-[24px] pb-[20px] pt-[24px]",
        paragraphs: [
          "我将产品策略调整为 AI 原生化工作流：让 AI 参与需求解析、缺失信息提示、关键词拓展、创作 brief 生成、文章生成、质量自检和任务进度回传，而不是只作为单点写作工具存在。",
        ],
        spacious: true,
      },
      {
        title: "设计策略：AI 嵌入需求解析、关键词拓展、质量自检和进度同步",
        layoutClass: "shrink-0 gap-[4px] px-[24px] pb-[20px] pt-[24px]",
        paragraphs: [
          "让 AI 不只出现在文章生成环节，而是作为流程节点参与需求理解、任务结构化、创作辅助、质量自检和进度回传。",
        ],
        spacious: true,
      },
    ],
    features: [
      {
        title: "AI需求解析",
        description: "将企业或代理商输入的原始需求转化为结构化字段。",
        layoutClass: "shrink-0 px-[24px] py-[12px]",
      },
      {
        title: "缺失信息提示",
        description: "主动发现任务包中缺少的产品、关键词、地域、平台要求或验收标准等信息。",
        layoutClass: "shrink-0 px-[24px] py-[12px]",
      },
      {
        title: "关键词拓展",
        description: "根据目标转化词生成主词、长尾词和行业词。",
        layoutClass: "shrink-0 px-[24px] py-[12px]",
      },
      {
        title: "创作brief生成",
        description: "把任务包、企业信库、产品档案转化为创作者可执行说明。",
        layoutClass: "shrink-0 pl-[24px] pr-[20px] py-[12px]",
        trackingClass: "tracking-[-0.2px]",
      },
      {
        title: "质量自检",
        description: "检查文章是否符合品牌资料、任务目标和验收标准。",
        layoutClass: "shrink-0 px-[24px] py-[12px]",
      },
      {
        title: "进度回传",
        description: "将创作者侧的执行状态同步回 AITIME-TASK 平台，以支持需求侧监管。",
        layoutClass: "shrink-0 px-[24px] py-[12px]",
      },
    ],
  },
];

type StrategyPreviewToggleState = "off" | "on";

const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_TRACK_MOTION: Record<StrategyPreviewToggleState, { backgroundColor: string }> = {
  off: { backgroundColor: "#dadada" },
  on: { backgroundColor: "#85b7fe" },
};

const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_AXIS_MOTION: Record<StrategyPreviewToggleState, { x: number }> = {
  off: { x: -15.6 },
  on: { x: 3.6 },
};

const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_MOTION: Record<StrategyPreviewToggleState, { x: number }> = {
  off: { x: 2.55 },
  on: { x: 22.65 },
};

const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_STROKE_BACKGROUND = "linear-gradient(180deg, #FFFFFF 0%, #C4C4C4 100%)";
const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_SHADOW = "0px 0.6px 1.2px -0.45px rgba(0,0,0,0.54), 0.45px 4.2px 4.05px 0.75px rgba(0,0,0,0.22)";

function StrategyPreviewToggleButton({
  mode,
  onToggle,
}: {
  mode: AIProjectStrategyViewMode;
  onToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const toggleMotionTransition = shouldReduceMotion ? { duration: 0 } : AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_TRANSITION;
  const toggleState: StrategyPreviewToggleState = mode === "preview" ? "on" : "off";
  const leadingSwitchHandleSrc = toggleState === "on" ? AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_ON_LEADING_SRC : AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_OFF_LEADING_SRC;
  const trailingSwitchHandleSrc = toggleState === "on" ? AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_ON_TRAILING_SRC : AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_OFF_TRAILING_SRC;

  return (
    <motion.button
      type="button"
      className="group/strategy-preview-toggle relative block h-[24px] w-[44.1px] shrink-0 overflow-clip rounded-[16.8px] border-0 bg-transparent p-0 outline-none"
      data-node-id="1958:14441"
      data-preview-mode={mode}
      data-preview-toggle-state={toggleState}
      aria-pressed={mode === "preview"}
      aria-label={mode === "preview" ? "切换到策略内容" : "切换到预览内容"}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[16.8px]"
        animate={AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_TRACK_MOTION[toggleState]}
        transition={toggleMotionTransition}
        data-name="Button Container"
      />
      <motion.div
        className="absolute left-0 top-[4.5px] flex w-[56.1px] items-center justify-between"
        animate={AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_AXIS_MOTION[toggleState]}
        transition={toggleMotionTransition}
        data-name="移动轴"
      >
        <div className="relative size-[15px] shrink-0" data-name="Switch Handle">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={leadingSwitchHandleSrc} />
        </div>
        <div className="relative size-[15px] shrink-0" data-name="Switch Handle">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={trailingSwitchHandleSrc} />
        </div>
      </motion.div>
      <motion.div
        className="absolute left-0 top-[2.55px] size-[18.9px] overflow-hidden rounded-[13.2px] bg-[#e2e2e2]"
        animate={AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_MOTION[toggleState]}
        transition={toggleMotionTransition}
        style={{ boxShadow: AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_SHADOW }}
        data-node-id={toggleState === "on" ? "1958:14455" : "1958:14448"}
        data-name="按钮"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_STROKE_BACKGROUND }} data-name="按钮渐变描边" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[12.2px] bg-[#e2e2e2]" data-name="按钮填充" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0.3px_0px_1.8px_-0.45px_rgba(0,0,0,0.22),inset_0px_2.25px_1.35px_-1.05px_rgba(0,0,0,0.2)]" />
    </motion.button>
  );
}

function StrategyPreviewPill({
  mode,
  onToggle,
}: {
  mode: AIProjectStrategyViewMode;
  onToggle: () => void;
}) {
  return <StrategyPreviewToggleButton mode={mode} onToggle={onToggle} />;
}

function StrategyBullet() {
  return (
    <div className="relative size-[8px] shrink-0">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_STRATEGY_BULLET_SRC} />
    </div>
  );
}

function StrategyTabButton({
  tab,
  isActive,
  activeTabId,
  onClick,
  previewMode,
  onPreviewToggle,
  strategyPanelMotionTransition,
}: {
  tab: AIProjectStrategyTab;
  isActive: boolean;
  activeTabId: AIProjectStrategyTabId;
  onClick: () => void;
  previewMode: AIProjectStrategyViewMode;
  onPreviewToggle: () => void;
  strategyPanelMotionTransition: typeof AI_PROJECT_STRATEGY_MVP_TRANSITION | { duration: number };
}) {
  const isFixedInactiveWidth = activeTabId === "strategy01" && tab.id === "strategy02";

  return (
    <motion.div
      layout
      transition={strategyPanelMotionTransition}
      className={`group relative flex cursor-pointer items-center overflow-hidden bg-transparent pl-[32px] pr-[20px] py-[16px] text-left outline-none focus-visible:ring-1 focus-visible:ring-[#7b7b7b]/40 ${
        isActive ? "min-w-px flex-[1_0_0] justify-between" : `shrink-0 justify-center ${isFixedInactiveWidth ? "w-[220px]" : ""}`
      }`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      data-node-id={isActive ? "1788:13709" : "1788:13711"}
      data-name="Quote Container"
    >
      <motion.div
        layout="position"
        transition={strategyPanelMotionTransition}
        className={`relative flex min-w-px shrink-0 items-center bg-transparent p-0 text-left outline-none ${isActive ? "flex-[1_0_0]" : "w-full justify-center"}`}
      >
        <motion.span
          layout="position"
          transition={strategyPanelMotionTransition}
          className={`[word-break:break-word] relative shrink-0 text-[16px] leading-[24px] text-[#414141] not-italic transition-opacity duration-300 whitespace-nowrap ${
            isActive ? "font-['OPPOSans:Bold']" : "font-['OPPOSans:Medium'] opacity-30 group-hover:opacity-60"
          }`}
        >
          {tab.label}
        </motion.span>
      </motion.div>
      {isActive ? (
        <motion.div layout="position" layoutId="ai-project-strategy-preview-control" transition={strategyPanelMotionTransition} className="relative flex shrink-0 items-center gap-[12px]" data-node-id="1958:14368">
          <motion.p layout="position" transition={strategyPanelMotionTransition} className="[word-break:break-word] relative shrink-0 font-['OPPOSans:Regular'] text-[8px] leading-[12px] tracking-[0.32px] text-[#7b7b7b] not-italic uppercase whitespace-nowrap">
            原型预览
          </motion.p>
          <StrategyPreviewPill mode={previewMode} onToggle={onPreviewToggle} />
        </motion.div>
      ) : null}
    </motion.div>
  );
}

function StrategyHorizontalDivider({ side = false }: { side?: boolean }) {
  return (
    <div className="relative h-0 w-full shrink-0">
      <div className="absolute inset-[-0.5px_0]">
        <img alt="" className="block size-full max-w-none" src={side ? AI_PROJECT_STRATEGY_SIDE_DIVIDER_SRC : AI_PROJECT_STRATEGY_SECTION_DIVIDER_SRC} />
      </div>
    </div>
  );
}

function StrategyServiceBlock({
  block,
  side = false,
}: {
  block: AIProjectStrategyTextBlock;
  side?: boolean;
}) {
  const spacious = block.spacious;
  const layoutClass = block.layoutClass ?? `shrink-0 px-[24px] ${spacious ? "gap-[4px] pb-[20px] pt-[24px]" : side ? "gap-[4px] pb-[16px] pt-[18px]" : "gap-[4px] pb-[16px] pt-[24px]"}`;

  return (
    <div className={`relative flex w-full flex-col items-start opacity-80 ${layoutClass}`} data-name="Service Container">
      <div className="relative flex w-full shrink-0 items-center gap-[8px]" data-name="Description Container">
        <StrategyBullet />
        <div className="relative flex min-w-px flex-[1_0_0] flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] text-[#5e5e5e] not-italic uppercase">
          <p className="leading-[24px]">{block.title}</p>
        </div>
      </div>
      <div className="[word-break:break-word] relative w-full shrink-0 font-['OPPOSans:Light'] text-[12px] text-justify leading-[0] text-[#5e5e5e] not-italic uppercase">
        {block.paragraphs.map((paragraph, index) => (
          <p key={paragraph} className={`${spacious ? "leading-[24px]" : "leading-[20px]"} ${index < block.paragraphs.length - 1 ? "mb-0" : ""}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

function StrategyFeatureBlock({
  feature,
  compact,
}: {
  feature: AIProjectStrategyFeature;
  compact: boolean;
}) {
  const layoutClass = feature.layoutClass ?? (compact ? "shrink-0 px-[24px] py-[12px]" : "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]");

  return (
    <div className={`relative flex w-full flex-col items-start opacity-80 ${layoutClass}`} data-name="Service Container">
      <div className="relative flex w-full shrink-0 items-center gap-[8px]" data-name="Description Container">
        <StrategyBullet />
        <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] text-[#5e5e5e] not-italic uppercase whitespace-nowrap">
          <p className="leading-[24px]">{feature.title}</p>
        </div>
      </div>
      <div className="relative flex w-full shrink-0 flex-col items-start justify-center" data-name="Service Step Description">
        <p className={`[word-break:break-word] relative w-full shrink-0 font-['OPPOSans:Light'] text-[12px] leading-[20px] text-justify text-[#5e5e5e] not-italic uppercase ${feature.trackingClass ?? ""}`}>
          {feature.description}
        </p>
      </div>
    </div>
  );
}

function StrategyAnalysisContent({ activeStrategyTab }: { activeStrategyTab: AIProjectStrategyTab }) {
  const isAiNative = activeStrategyTab.id === "strategy03";

  return (
    <div className={`relative flex w-full shrink-0 items-start ${activeStrategyTab.contentHeightClass}`} data-name="Content Container">
      <div className={`relative flex h-full min-w-px flex-[1_0_0] flex-col items-start overflow-hidden pb-[12px] ${activeStrategyTab.leftColumnBackgroundClass}`} data-name="Info Container">
        <div className={`relative flex w-full shrink-0 items-center pb-[20px] pt-[24px] ${activeStrategyTab.leftTitlePaddingClass}`} data-name="Service Title">
          <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Medium'] text-[24px] leading-[0] text-center text-[#474747] not-italic whitespace-nowrap">
            <p className="leading-[48px]">{activeStrategyTab.title}</p>
          </div>
        </div>
        <StrategyHorizontalDivider />
        {activeStrategyTab.blocks.map((block, index) => (
          <React.Fragment key={block.title}>
            <StrategyServiceBlock block={block} />
            {index < activeStrategyTab.blocks.length - 1 ? <StrategyHorizontalDivider /> : null}
          </React.Fragment>
        ))}
      </div>
      <div className="relative self-stretch w-px shrink-0" data-name="Vector 1137 (Stroke)">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={activeStrategyTab.columnDividerSrc} />
      </div>
      <div className="relative flex w-[352px] shrink-0 self-stretch flex-col items-start bg-[rgba(255,255,255,0.25)] pb-[12px]" data-name="Info Container">
        <div className="relative flex w-full shrink-0 items-center justify-center pb-[20px] pt-[24px]" data-name="Service Title">
          <div className="[word-break:break-word] relative flex min-w-px flex-[1_0_0] flex-col justify-center font-['OPPOSans:Medium'] text-[24px] leading-[0] text-center text-[#474747] not-italic">
            <p className="leading-[48px]">系统功能落点</p>
          </div>
        </div>
        <StrategyHorizontalDivider side />
        {activeStrategyTab.features.map((feature, index) => (
          <React.Fragment key={feature.title}>
            <StrategyFeatureBlock feature={feature} compact={isAiNative} />
            {index < activeStrategyTab.features.length - 1 ? <StrategyHorizontalDivider side /> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function StrategyPreviewStep({
  step,
  active = false,
}: {
  step: string;
  active?: boolean;
}) {
  if (active) {
    return (
      <div className="relative flex w-full shrink-0 items-start gap-[6px] pb-[4px] pl-[14px] pr-[16px] pt-[12px]" data-name="Description Container">
        <div className="relative h-[20px] w-[4px] shrink-0" data-name="Task Icon Vector">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_STRATEGY_TASK_ICON_VECTOR_SRC} />
        </div>
        <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start justify-center leading-[0] not-italic" data-name="Task Description">
          <div className="relative flex shrink-0 flex-col justify-center font-['DINOT:Bold'] text-[10px] text-[#5e5e5e] uppercase whitespace-nowrap">
            <p className="leading-[20px]">{step}</p>
          </div>
          <div className="relative flex min-w-full shrink-0 flex-col justify-center font-['OPPOSans:Regular'] text-[8px] text-justify text-[#414141] opacity-65 w-[min-content]">
            <p className="leading-[16px]">单一需求包无法覆盖不同客户场景策略：将需</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full shrink-0 items-center gap-[6px] pb-[4px] pl-[14px] pr-[16px] pt-[12px] opacity-50" data-name="Description Container">
      <div className="relative size-[4px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_STRATEGY_STEP_DOT_SRC} />
      </div>
      <div className="relative flex shrink-0 flex-col justify-center font-['DINOT:Bold'] text-[10px] leading-[0] text-[#5e5e5e] not-italic uppercase whitespace-nowrap">
        <p className="leading-[20px]">{step}</p>
      </div>
    </div>
  );
}

function StrategyPreviewSideItem({ label, rounded = false }: { label: string; rounded?: boolean }) {
  return (
    <div className={`relative flex w-full shrink-0 flex-col items-start justify-center bg-[#e2e2e2] px-[24px] py-[12px] opacity-80 ${rounded ? "rounded-bl-[8px] rounded-br-[8px]" : ""}`} data-name="Service Container">
      <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Light'] text-[12px] leading-[0] text-[#5e5e5e] not-italic uppercase whitespace-nowrap">
        <p className="leading-[24px]">{label}</p>
      </div>
    </div>
  );
}

function StrategyPreviewContent({ activeTab }: { activeTab: AIProjectStrategyTab }) {
  return (
    <div
      className="relative flex h-[560px] w-full shrink-0 items-start"
      data-node-id="1788:14294"
      data-preview-variant-node-id={activeTab.previewVariantNodeId}
      data-name="从理想闭环到可落地 MVP-原型"
    >
      <div className="relative flex h-full w-[117px] shrink-0 flex-col items-start" data-name="Info Container">
        <div className="relative flex min-h-px w-full flex-[1_0_0] flex-col items-center bg-[#dbdbdb] opacity-80" data-name="Service Container">
          <div className="relative flex w-full shrink-0 items-center px-[24px] py-[12px]" data-name="Task Icon">
            <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] text-[#414141] not-italic uppercase whitespace-nowrap">
              <p className="leading-[24px]">企业信库</p>
            </div>
          </div>
          <StrategyHorizontalDivider side />
          <StrategyPreviewStep step="step 01" active />
          <StrategyPreviewStep step="step 02" />
          <StrategyPreviewStep step="step 03" />
          <StrategyPreviewStep step="step 04" />
        </div>
        <StrategyHorizontalDivider side />
        <StrategyPreviewSideItem label="需求打包" />
        <StrategyHorizontalDivider side />
        <StrategyPreviewSideItem label="远程填单" />
        <StrategyHorizontalDivider side />
        <StrategyPreviewSideItem label="打包状态" rounded />
      </div>
      <div className="relative h-full w-px shrink-0" data-name="Vector 1137 (Stroke)">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={activeTab.columnDividerSrc} />
      </div>
      <div className="relative h-full min-w-px flex-[1_0_0] bg-[rgba(255,255,255,0.25)]" data-name="Info Container" />
    </div>
  );
}

type StrategyMvpContentLayer = {
  key: string;
  activeStrategyTab: AIProjectStrategyTab;
  strategyViewMode: AIProjectStrategyViewMode;
  exiting: boolean;
};

function StrategyMvpContentFrame({
  activeStrategyTab,
  strategyViewMode,
  strategyPanelMotionTransition,
}: {
  activeStrategyTab: AIProjectStrategyTab;
  strategyViewMode: AIProjectStrategyViewMode;
  strategyPanelMotionTransition: typeof AI_PROJECT_STRATEGY_MVP_TRANSITION | { duration: number };
}) {
  const contentLayerKey = `${activeStrategyTab.id}-${strategyViewMode}`;
  const currentContentLayer: StrategyMvpContentLayer = {
    key: contentLayerKey,
    activeStrategyTab,
    strategyViewMode,
    exiting: false,
  };
  const previousContentLayerRef = useRef<StrategyMvpContentLayer>(currentContentLayer);
  const [exitingContentLayer, setExitingContentLayer] = useState<StrategyMvpContentLayer | null>(null);

  useLayoutEffect(() => {
    const previousContentLayer = previousContentLayerRef.current;

    if (previousContentLayer.key !== contentLayerKey) {
      setExitingContentLayer({ ...previousContentLayer, exiting: true });
    }

    previousContentLayerRef.current = currentContentLayer;
  }, [activeStrategyTab, contentLayerKey, strategyViewMode]);

  useEffect(() => {
    if (!exitingContentLayer) {
      return;
    }

    const exitTimeout = window.setTimeout(() => {
      setExitingContentLayer(null);
    }, strategyPanelMotionTransition.duration * 1000);

    return () => window.clearTimeout(exitTimeout);
  }, [exitingContentLayer, strategyPanelMotionTransition.duration]);

  const contentLayers = exitingContentLayer ? [exitingContentLayer, currentContentLayer] : [currentContentLayer];

  return (
    <div
      className="relative h-[560px] w-full shrink-0 overflow-hidden"
      data-name="Smart Animate Content Frame"
    >
      <AnimatePresence initial={false}>
        {contentLayers.map((layer) => {
          const isStrategyPreviewMode = layer.strategyViewMode === "preview";

          return (
            <motion.div
              key={layer.key}
              className="absolute inset-0"
              initial={{ opacity: layer.exiting ? 1 : 0 }}
              animate={{ opacity: layer.exiting ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={strategyPanelMotionTransition}
              style={{ pointerEvents: layer.exiting ? "none" : "auto" }}
            >
              {isStrategyPreviewMode ? <StrategyPreviewContent activeTab={layer.activeStrategyTab} /> : <StrategyAnalysisContent activeStrategyTab={layer.activeStrategyTab} />}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function StrategyMvpPanel({
  activeTabId,
  onTabChange,
  strategyViewMode,
  onStrategyViewToggle,
}: {
  activeTabId: AIProjectStrategyTabId;
  onTabChange: (tabId: AIProjectStrategyTabId) => void;
  strategyViewMode: AIProjectStrategyViewMode;
  onStrategyViewToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const strategyPanelMotionTransition = shouldReduceMotion ? { duration: 0 } : AI_PROJECT_STRATEGY_MVP_TRANSITION;
  const activeStrategyTab = AI_PROJECT_STRATEGY_TABS.find((tab) => tab.id === activeTabId) ?? AI_PROJECT_STRATEGY_TABS[0];
  const strategyTabGroupStyle = {
    '--strategy-gradient-stop': activeStrategyTab.gradientStop,
    background: AI_PROJECT_STRATEGY_TAB_GROUP_BACKGROUND,
  } as React.CSSProperties & { "--strategy-gradient-stop": string };

  return (
    <div
      className="relative w-[864px] max-w-full overflow-hidden rounded-[8px] border border-[#d2d2d2] bg-[#e2e2e2]"
      data-node-id="1788:14286"
      data-active-variant-node-id={activeStrategyTab.variantNodeId}
      data-active-preview-variant-node-id={activeStrategyTab.previewVariantNodeId}
      data-name="MVP"
    >
      <LayoutGroup id="ai-project-strategy-mvp-tabs">
        <motion.div
          layout
          transition={strategyPanelMotionTransition}
          className="relative flex w-full shrink-0 items-start overflow-hidden transition-[--strategy-gradient-stop] duration-500 ease-[cubic-bezier(0.52,0.54,0.04,1)]"
          style={strategyTabGroupStyle}
          data-node-id={activeStrategyTab.tabGroupNodeId}
          data-name="Tab Group"
        >
          {AI_PROJECT_STRATEGY_TABS.map((tab, index) => {
            const isActive = tab.id === activeStrategyTab.id;

            return (
              <React.Fragment key={tab.id}>
                {index > 0 ? <motion.div layout transition={strategyPanelMotionTransition} className="relative self-stretch w-[3px] shrink-0 bg-[#e6e6e6]" data-name="Divider Icon" /> : null}
                <StrategyTabButton
                  tab={tab}
                  isActive={isActive}
                  activeTabId={activeStrategyTab.id}
                  onClick={() => onTabChange(tab.id)}
                  previewMode={strategyViewMode}
                  onPreviewToggle={onStrategyViewToggle}
                  strategyPanelMotionTransition={strategyPanelMotionTransition}
                />
              </React.Fragment>
            );
          })}
        </motion.div>
      </LayoutGroup>
      <div className="relative h-px w-full shrink-0" data-name="Vector 1137 (Stroke)">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_STRATEGY_TOP_DIVIDER_SRC} />
      </div>
      <StrategyMvpContentFrame activeStrategyTab={activeStrategyTab} strategyViewMode={strategyViewMode} strategyPanelMotionTransition={strategyPanelMotionTransition} />
    </div>
  );
}

function StrategySection({ sectionRef }: { sectionRef: (node: HTMLElement | null) => void }) {
  const [activeStrategyTabId, setActiveStrategyTabId] = useState<AIProjectStrategyTabId>("strategy01");
  const [strategyViewModesByTab, setStrategyViewModesByTab] = useState<Record<AIProjectStrategyTabId, AIProjectStrategyViewMode>>(DEFAULT_STRATEGY_VIEW_MODES);
  const strategyViewMode = strategyViewModesByTab[activeStrategyTabId];

  return (
    <section
      id={`ai-project-detail-section-${STRATEGY_META.id}`}
      ref={sectionRef}
      className="flex w-full scroll-mt-0 flex-col items-center px-[64px] py-[48px]"
      data-section-id={STRATEGY_META.id}
      data-node-id="1789:14060"
      data-name="Section Container 02"
    >
      <div className="flex w-[864px] max-w-full flex-col items-start gap-[84px]">
        <SectionHeading
          titleAsset={AI_PROJECT_SECTION_TITLE_ASSETS.strategy}
          title="02 · 从理想闭环到可落地 MVP"
          description="在搭建「需求打包 → 任务派发 → 创作执行 → 进度回传」的最小流程 Demo 后，我没有直接追求完整履约闭环，而是先识别出影响 MVP 可落地性的三个核心矛盾，并将它们转化为对应的系统功能与原型验证。"
        />
        <StrategyMvpPanel
          activeTabId={activeStrategyTabId}
          onTabChange={setActiveStrategyTabId}
          strategyViewMode={strategyViewMode}
          onStrategyViewToggle={() =>
            setStrategyViewModesByTab((currentModes) => ({
              ...currentModes,
              [activeStrategyTabId]: currentModes[activeStrategyTabId] === "strategy" ? "preview" : "strategy",
            }))
          }
        />
      </div>
    </section>
  );
}

type ArchitectureHoverTarget = "task" | "data" | "create";

type ArchitecturePlatformFeature = {
  label: string;
  className?: string;
};

type ArchitecturePlatform = {
  hoverTarget: Exclude<ArchitectureHoverTarget, "data">;
  className: string;
  widthClassName: string;
  title: string;
  definition: string;
  lifecycle: string;
  business: string;
  chipTone: "task" | "create";
  featureRows: ArchitecturePlatformFeature[][];
};

const ARCHITECTURE_PLATFORMS: ArchitecturePlatform[] = [
  {
    hoverTarget: "task",
    className: "left-[12px] top-0",
    widthClassName: "w-[300px]",
    title: "AITIME TASK",
    definition: "平台定义：任务市场与履约平台",
    lifecycle: "承接需求侧的任务生命周期：从企业资料、需求打包、任务派发到进度监管与验收结算。",
    business: "负责需求侧的任务市场与履约管理",
    chipTone: "task",
    featureRows: [
      [{ label: "企业信库" }, { label: "产品档案" }, { label: "需求打包" }],
      [{ label: "任务派发" }, { label: "进度监管" }, { label: "验收结算" }],
    ],
  },
  {
    hoverTarget: "create",
    className: "left-[528px] top-0",
    widthClassName: "w-[324px]",
    title: "AITIME CREATE",
    definition: "平台定义：创作者执行工作台",
    lifecycle: "承接创作者接单后的执行流程：从同步任务、关键词处理、素材调用到文章创作、指令沉淀与进度回传。",
    business: "负责创作者侧的内容生产与交付执行",
    chipTone: "create",
    featureRows: [
      [{ label: "同步任务", className: "w-[82px]" }, { label: "关键词集", className: "w-[82px]" }, { label: "企业素材调用", className: "min-w-px flex-1" }],
      [{ label: "文章创作", className: "w-[82px]" }, { label: "指令沉淀", className: "w-[82px]" }, { label: "进度回传", className: "min-w-px flex-1" }],
    ],
  },
];

function ArchitectureRail({
  className,
  mirrored = false,
  hoverTargets,
}: {
  className: string;
  mirrored?: boolean;
  hoverTargets?: ArchitectureHoverTarget[];
}) {
  const gradientId = useId().replaceAll(":", "");
  const railHoverTarget = hoverTargets?.join(" ");
  const topHoverGradientId = `${gradientId}-architecture-rail-top-hover`;
  const bottomHoverGradientId = `${gradientId}-architecture-rail-bottom-hover`;
  const topDataGradientId = `${gradientId}-architecture-rail-top-data`;
  const bottomDataGradientId = `${gradientId}-architecture-rail-bottom-data`;
  const topPath = "M 0 0 L 12 40 L 0 40 L 0 0 Z";
  const bottomPath = "M 0 40 L 12 0 L 0 0 L 0 40 Z";
  const renderHoverGradient = (id: string) => (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="12" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#000000" />
        <stop offset="1" stopColor="#666666" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
  const renderDataGradient = (id: string) => (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="12" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#000000" />
        <stop offset="1" stopColor="#ffffff" stopOpacity={0.25} />
      </linearGradient>
    </defs>
  );

  return (
    <div
      className={`ai-project-architecture-rail absolute h-[343px] w-[12px] ${mirrored ? "scale-x-[-1]" : ""} ${className}`}
      data-architecture-rail-hover-target={railHoverTarget}
      data-name="Frame 1321319167"
    >
      <svg className="absolute left-0 top-0 block h-[40px] w-[12px]" viewBox="0 0 12 40" aria-hidden="true">
        {renderHoverGradient(topHoverGradientId)}
        {renderDataGradient(topDataGradientId)}
        <path d={topPath} fill="currentColor" />
        <path className="ai-project-architecture-rail-hover-gradient" d={topPath} fill={`url(#${topHoverGradientId})`} />
        <path className="ai-project-architecture-rail-data-gradient" d={topPath} fill={`url(#${topDataGradientId})`} fillOpacity={0.1} />
      </svg>
      <div className="absolute left-0 top-[40px] h-[263px] w-[12px] bg-current">
        <span className="ai-project-architecture-rail-hover-gradient pointer-events-none absolute inset-0 block" />
        <span className="ai-project-architecture-rail-data-gradient pointer-events-none absolute inset-0 block" />
      </div>
      <svg className="absolute left-0 top-[303px] block h-[40px] w-[12px]" viewBox="0 0 12 40" aria-hidden="true">
        {renderHoverGradient(bottomHoverGradientId)}
        {renderDataGradient(bottomDataGradientId)}
        <path d={bottomPath} fill="currentColor" />
        <path className="ai-project-architecture-rail-hover-gradient" d={bottomPath} fill={`url(#${bottomHoverGradientId})`} />
        <path className="ai-project-architecture-rail-data-gradient" d={bottomPath} fill={`url(#${bottomDataGradientId})`} fillOpacity={0.1} />
      </svg>
    </div>
  );
}

function ArchitectureBulletIcon() {
  return (
    <span
      className="relative size-[8px] shrink-0 text-[#5e5e5e]"
      data-figma-src={AI_PROJECT_ARCHITECTURE_METRIC_SPACER_SRC}
      data-name="Vector 1123"
    >
      <svg className="absolute inset-0 block size-full" viewBox="0 0 8 8" aria-hidden="true">
        <path
          d="M0.99899 7.9267L7.6029 4.6545C8.1324 4.3921 8.1324 3.6079 7.6029 3.3455L0.99899 0.07332C0.40065 -0.22316 -0.21997 0.43517 0.0764 1.05195L1.33721 3.6758C1.43527 3.8799 1.43527 4.1201 1.33721 4.3242L0.0764 6.948C-0.21997 7.5648 0.40065 8.2232 0.99899 7.9267Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function ArchitectureBulletLabel({
  children,
  className = "",
  textWidthClassName = "min-w-px flex-1",
}: {
  children: React.ReactNode;
  className?: string;
  textWidthClassName?: string;
}) {
  return (
    <div className={`flex h-[24px] items-center gap-[8px] overflow-visible ${className}`} data-architecture-description-row>
      <ArchitectureBulletIcon />
      <div
        className={`[word-break:break-word] flex h-[24px] flex-col justify-center overflow-visible whitespace-nowrap font-['OPPOSans:Medium'] text-[12px] leading-[0] tracking-[0px] text-[#5e5e5e] uppercase ${textWidthClassName}`}
      >
        <p className="leading-[24px]">{children}</p>
      </div>
    </div>
  );
}

function ArchitectureFeatureChip({ feature, tone }: { feature: ArchitecturePlatformFeature; tone: "task" | "create" }) {
  const widthClassName = feature.className ?? "min-w-px flex-1";
  const backgroundClassName = tone === "task" ? "bg-[#e4e4e4]" : "bg-[#e2e2e2]";

  return (
    <div className={`ai-project-architecture-feature-chip ${backgroundClassName} flex h-[24px] ${widthClassName} items-center justify-between rounded-[4px] px-[8px] py-[4px]`}>
      <span className="font-['OPPOSans:Medium'] text-[10px] leading-[16px] tracking-[1px] text-[#474747] uppercase whitespace-nowrap">
        {feature.label}
      </span>
      <span className="relative size-[8px] shrink-0 rounded-full bg-[#d8d8d8]">
        <span className="absolute left-1/2 top-1/2 size-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9c9c9]" />
      </span>
    </div>
  );
}

function ArchitecturePlatformPanel({ platform }: { platform: ArchitecturePlatform }) {
  const businessTextWidthClassName = platform.hoverTarget === "task" ? "w-[240px] shrink-0" : "w-[260px] shrink-0";

  return (
    <article
      className={`ai-project-architecture-platform-surface absolute ${platform.className} h-[343px] ${platform.widthClassName} overflow-hidden bg-[#ececec] pb-[12px]`}
      data-architecture-panel={platform.hoverTarget}
      data-name="Info Container"
    >
      <div className="absolute left-0 top-0 flex h-[80px] w-full items-center justify-center px-[24px] py-[16px]" data-name="Service Title">
        <h3 className="min-w-px flex-1 font-['OPPOSans:Medium'] text-[24px] leading-[48px] tracking-[2px] text-[#474747] uppercase">
          {platform.title}
        </h3>
      </div>
      <div className="absolute left-0 top-[80px] h-[3px] w-full bg-[#e6e6e6]" data-name="Vector 1130 (Stroke)" />
      <div className="absolute left-0 top-[83px] h-[120px] w-full opacity-80" data-name="Service Container">
        <ArchitectureBulletLabel className="absolute left-[24px] top-[24px] h-[24px] w-[calc(100%-48px)]">{platform.definition}</ArchitectureBulletLabel>
        <p className="[word-break:break-word] absolute left-[24px] top-[52px] h-[48px] w-[calc(100%-48px)] font-['OPPOSans:Light'] text-[12px] leading-[24px] text-justify text-[#5e5e5e] uppercase">
          {platform.lifecycle}
        </p>
      </div>
      <div className="absolute left-0 top-[203px] h-0 w-full border-t border-dashed border-[#5e5e5e] opacity-15" data-name="Vector 1130" />
      <div className="absolute left-0 top-[203px] h-[128px] w-full opacity-80" data-name="Service Container">
        <ArchitectureBulletLabel
          className="absolute left-[24px] top-[24px] h-[24px] w-[calc(100%-48px)]"
          textWidthClassName={businessTextWidthClassName}
        >
          {`核心业务：${platform.business}`}
        </ArchitectureBulletLabel>
        <div className="absolute left-[24px] top-[52px] flex h-[56px] w-[calc(100%-48px)] shrink-0 flex-col items-start gap-[8px]">
          {platform.featureRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex w-full shrink-0 items-start gap-[8px]">
              {row.map((feature) => (
                <ArchitectureFeatureChip key={feature.label} feature={feature} tone={platform.chipTone} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function ArchitectureDataPill({
  label,
  arrow,
  className = "",
}: {
  label: string;
  arrow: "left" | "right";
  className?: string;
}) {
  return (
    <div className={`flex h-[16px] w-[101px] shrink-0 items-center justify-center gap-[4px] rounded-[4px] bg-[#aeaeae] px-[6px] ${className}`}>
      {arrow === "left" ? (
        <span className="relative size-[6px] shrink-0 text-[#ececec]" data-name="Vector 1123">
          <svg className="absolute inset-0 block size-full scale-x-[-1]" viewBox="0 0 6 6" aria-hidden="true">
            <path d="M0.75 5.95L5.7 3.49C6.1 3.29 6.1 2.71 5.7 2.51L0.75 0.05C0.3 -0.17 -0.16 0.33 0.06 0.79L1 2.76C1.08 2.91 1.08 3.09 1 3.24L0.06 5.21C-0.16 5.67 0.3 6.17 0.75 5.95Z" fill="currentColor" />
          </svg>
        </span>
      ) : null}
      <span className="font-['OPPOSans:Medium'] text-[10px] leading-[16px] text-[#ececec] uppercase whitespace-nowrap">
        {label}
      </span>
      {arrow === "right" ? (
        <span className="relative size-[6px] shrink-0 text-[#ececec]" data-name="Vector 1123">
          <svg className="absolute inset-0 block size-full" viewBox="0 0 6 6" aria-hidden="true">
            <path d="M0.75 5.95L5.7 3.49C6.1 3.29 6.1 2.71 5.7 2.51L0.75 0.05C0.3 -0.17 -0.16 0.33 0.06 0.79L1 2.76C1.08 2.91 1.08 3.09 1 3.24L0.06 5.21C-0.16 5.67 0.3 6.17 0.75 5.95Z" fill="currentColor" />
          </svg>
        </span>
      ) : null}
    </div>
  );
}

function ArchitectureDashedDataBox({
  rows,
  variant,
}: {
  rows: string[][];
  variant: "top" | "bottom";
}) {
  const verticalPaddingClassName = variant === "top" ? "pt-[14px] pb-[8px]" : "pt-[8px] pb-[14px]";
  const firstRowWidthClassName = variant === "top" ? "w-[131px]" : "w-[132px]";

  return (
    <div className={`flex h-[58px] w-[160px] shrink-0 flex-col items-start gap-[4px] rounded-[4px] border-[0.6px] border-dashed border-[#aeaeae] ${verticalPaddingClassName}`}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex h-[16px] shrink-0 items-center gap-[8px] px-[12px] font-['OPPOSans:Medium'] text-[10px] leading-[16px] text-[#5e5e5e] uppercase whitespace-nowrap ${
            rowIndex === 0 ? firstRowWidthClassName : "w-[160px]"
          }`}
        >
          {row.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function ArchitectureFlowLine({ direction }: { direction: "left" | "right" }) {
  const segments = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div className="flex h-[14px] w-[38px] shrink-0 items-center gap-px">
      {direction === "left" ? (
        <span className="h-0 w-0 shrink-0 border-y-[7px] border-r-[8px] border-y-transparent border-r-[#d5d5d5]" />
      ) : null}
      {segments.map((segment) => (
        <span key={segment} className="h-[6px] w-[6.5px] shrink-0 bg-[#5e5e5e] opacity-12" />
      ))}
      {direction === "right" ? (
        <span className="h-0 w-0 shrink-0 border-y-[7px] border-l-[8px] border-y-transparent border-l-[#d5d5d5]" />
      ) : null}
    </div>
  );
}

function ArchitectureDataLayer() {
  return (
    <div
      className="ai-project-architecture-data-layer absolute left-[324px] top-[40px] h-[263px] w-[192px] overflow-hidden bg-[#e2e2e2]"
      data-architecture-panel="data"
      data-name="Info Container"
    >
      <div className="absolute left-[16px] top-[24px] h-[66px] w-[160px]" data-name="Frame 1321319174">
        <ArchitectureDataPill className="absolute left-[29.5px] top-0 z-[2]" label="同步 | 需求包内容" arrow="right" />
        <div className="absolute left-0 top-[8px] z-[1]">
          <ArchitectureDashedDataBox variant="top" rows={[["企业信库 (含产品档案）"], ["创作要求", "附件素材", "验收标准"]]} />
        </div>
      </div>
      <div className="absolute left-0 top-[119.5px] flex h-[24px] w-[192px] shrink-0 items-center gap-[4px] px-[24px]">
        <ArchitectureFlowLine direction="left" />
        <span className="shrink-0 font-['OPPOSans:Light'] text-[12px] leading-[16px] text-[#aeaeae] uppercase whitespace-nowrap">
          信息同步流
        </span>
        <ArchitectureFlowLine direction="right" />
      </div>
      <div className="absolute left-[16px] top-[173px] h-[66px] w-[160px]" data-name="Frame 1321319175">
        <div className="absolute left-0 top-0 z-[1]">
          <ArchitectureDashedDataBox variant="bottom" rows={[["接单状态", "执行节点动态"], ["自检结果", "分发质量", "验收状态"]]} />
        </div>
        <ArchitectureDataPill className="absolute left-[29.5px] top-[50px] z-[2]" label="回传 | 任务数据包" arrow="left" />
      </div>
    </div>
  );
}

function ArchitectureHotspot({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  "data-architecture-active"?: "true";
  "data-architecture-hover-target": ArchitectureHoverTarget;
}) {
  return <div className={`absolute z-10 ${className}`} {...props} />;
}

function ArchitectureDualPlatformDiagram() {
  const [activeHoverTarget, setActiveHoverTarget] = useState<ArchitectureHoverTarget | null>(null);
  const getHoverTargetProps = (
    target: ArchitectureHoverTarget,
    label: string,
  ): React.HTMLAttributes<HTMLDivElement> & {
    "data-architecture-active"?: "true";
    "data-architecture-hover-target": ArchitectureHoverTarget;
  } => ({
    "aria-label": label,
    "data-architecture-active": activeHoverTarget === target ? "true" : undefined,
    "data-architecture-hover-target": target,
    onBlur: () => setActiveHoverTarget((currentTarget) => (currentTarget === target ? null : currentTarget)),
    onClick: () => setActiveHoverTarget(target),
    onFocus: () => setActiveHoverTarget(target),
    onPointerEnter: () => setActiveHoverTarget(target),
    onPointerLeave: () => setActiveHoverTarget((currentTarget) => (currentTarget === target ? null : currentTarget)),
    role: "group",
    tabIndex: 0,
  });

  return (
    <div
      className="ai-project-architecture-shell relative h-[343px] w-[864px] max-w-full shrink-0 overflow-hidden"
      data-node-id="1850:16609"
      data-name="Quote Detail"
    >
      <ArchitectureHotspot className="left-0 top-0 h-full w-[324px]" {...getHoverTargetProps("task", "AITIME TASK hover state")} />
      <ArchitectureHotspot className="left-[324px] top-0 h-full w-[192px]" {...getHoverTargetProps("data", "数据层 hover state")} />
      <ArchitectureHotspot className="left-[516px] top-0 h-full w-[348px]" {...getHoverTargetProps("create", "AITIME CREATE hover state")} />
      <div className="ai-project-architecture-platforms absolute inset-0 z-0" aria-hidden="false">
        <ArchitectureRail className="left-0 top-0" hoverTargets={["task"]} mirrored />
        <ArchitectureRail className="left-[312px] top-0" hoverTargets={["task", "data"]} />
        <ArchitectureRail className="left-[516px] top-0" hoverTargets={["data", "create"]} mirrored />
        <ArchitectureRail className="left-[852px] top-0" hoverTargets={["create"]} />
        {ARCHITECTURE_PLATFORMS.map((platform) => (
          <ArchitecturePlatformPanel key={platform.hoverTarget} platform={platform} />
        ))}
        <ArchitectureDataLayer />
      </div>
    </div>
  );
}

function ArchitectureSection({ sectionRef }: { sectionRef: (node: HTMLElement | null) => void }) {
  return (
    <section
      id={`ai-project-detail-section-${ARCHITECTURE_META.id}`}
      ref={sectionRef}
      className="flex w-full scroll-mt-0 flex-col items-center px-[64px] py-[48px]"
      data-section-id={ARCHITECTURE_META.id}
      data-node-id="1789:14063"
      data-name="Section Container 03"
    >
      <div className="flex w-[864px] max-w-full flex-col items-start gap-[84px]">
        <SectionHeading
          titleAsset={AI_PROJECT_SECTION_TITLE_ASSETS.architecture}
          title="03 · 双平台协同架构"
          description="基于 MVP 的最小履约闭环，我将平台拆解为「任务市场与履约平台」与「创作者执行工作台」两层系统：前者承接需求发布、任务派发、进度监管与结算，后者承接接单后的关键词处理、素材调用、内容创作、方法沉淀与进度回传。"
        />
        <div className="relative flex w-[864px] max-w-full shrink-0 flex-col items-start gap-[20px]" data-node-id="1789:14065" data-name="Blockquote">
          <div className="relative flex w-full shrink-0 items-start gap-[4px]" data-node-id="1789:14066" data-name="Quote Item Container">
            <div className="relative size-[24px] shrink-0" data-node-id="1789:14067" data-name="Metric Spacer">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_ARCHITECTURE_METRIC_SPACER_SRC} />
            </div>
            <div className="[word-break:break-word] relative flex min-w-px flex-[1_0_0] flex-col justify-center font-['OPPOSans:Light'] text-[12px] leading-[0] text-[#474747] not-italic uppercase" data-node-id="1789:14069">
              <p className="mb-0">
                <span className="leading-[24px]">在最小流程 Demo 中，我发现 GEO 内容履约同时包含两类目标：</span>
                <span className="[word-break:break-word] font-['OPPOSans:Medium'] leading-[24px] not-italic">需求侧</span>
                <span className="leading-[24px]">的</span>
                <span className="[word-break:break-word] font-['OPPOSans:Light'] leading-[24px] not-italic">任务管理目标</span>
                <span className="leading-[24px]">{` & `}</span>
                <span className="[word-break:break-word] font-['OPPOSans:Medium'] leading-[24px] not-italic">创作侧</span>
                <span className="leading-[24px]">的生产执行目标。</span>
              </p>
              <p>
                <span className="leading-[24px]">如果将两类目标放在同一个系统中，平台会变成一个复杂后台，既增加企业/代理商的任务管理成本，也削弱创作者侧的生产效率。</span>
                <span className="[word-break:break-word] font-['OPPOSans:Light'] leading-[24px] not-italic">因此，我将这套流程拆成两个协同系统。</span>
              </p>
            </div>
          </div>
          <div className="relative w-[864px] max-w-full shrink-0" data-node-id="1789:14771" data-name="Quote Detail">
            <ArchitectureDualPlatformDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

type ClosedLoopFlowId = "01" | "02" | "03";
type ClosedLoopStepId = "requirements" | "dispatch" | "sync" | "creation" | "progress";
type ClosedLoopArrowId = "requirements-to-dispatch" | "dispatch-to-sync" | "sync-to-creation" | "creation-to-progress";
type ClosedLoopStepTone = "green" | "teal" | "blue";
type ClosedLoopPlatformBadgeTone = "task" | "create" | "ai";
type ClosedLoopFlowCardVariant = "selected" | "hovered" | "idle";

type ClosedLoopFlowStep = {
  id: ClosedLoopStepId;
  nodeId: string;
  flowId: ClosedLoopFlowId;
  number: string;
  title: string;
  lines: [string, string];
  widthClassName: string;
  tone: ClosedLoopStepTone;
  platformLabel: string;
  badges: ClosedLoopPlatformBadgeTone[];
};

type ClosedLoopFlowArrowItem = {
  id: ClosedLoopArrowId;
  nodeId: string;
  flowId: ClosedLoopFlowId;
  activeSrc: string;
  mutedSrc: string;
};

type ClosedLoopFlowGroupItem =
  | { type: "step"; stepId: ClosedLoopStepId }
  | { type: "arrow"; arrowId: ClosedLoopArrowId };

type ClosedLoopFlowGroup = {
  id: ClosedLoopFlowId;
  nodeId: string;
  items: ClosedLoopFlowGroupItem[];
  label: string;
  className?: string;
};

type ClosedLoopFlowQuote = {
  title: string;
  description: string;
  tone: ClosedLoopStepTone;
  metricNodeIds: string[];
  metrics: string[];
};

const CLOSED_LOOP_STEP_TONE_STYLES: Record<
  ClosedLoopStepTone,
  {
    headerClassName: string;
    bodyClassName: string;
    bodyActiveClassName: string;
    numberClassName: string;
    shadowClassName: string;
  }
> = {
  green: {
    headerClassName: "bg-[#d0e1cc]",
    bodyClassName: "bg-[#e2e8e1]",
    bodyActiveClassName: "bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.2)_100%),linear-gradient(90deg,#e2e8e1_0%,#e2e8e1_100%)]",
    numberClassName: "text-[#57814d]",
    shadowClassName: "drop-shadow-[4px_4px_0px_rgba(87,129,77,0.2)]",
  },
  teal: {
    headerClassName: "bg-[#cce1db]",
    bodyClassName: "bg-[#e1e8e6]",
    bodyActiveClassName: "bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.2)_100%),linear-gradient(90deg,#e1e8e6_0%,#e1e8e6_100%)]",
    numberClassName: "text-[#4d8179]",
    shadowClassName: "drop-shadow-[4px_4px_0px_rgba(77,129,121,0.2)]",
  },
  blue: {
    headerClassName: "bg-[#ccd9e1]",
    bodyClassName: "bg-[#e1e5e8]",
    bodyActiveClassName: "bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.2)_100%),linear-gradient(90deg,#e1e5e8_0%,#e1e5e8_100%)]",
    numberClassName: "text-[#586b99]",
    shadowClassName: "drop-shadow-[4px_4px_0px_rgba(88,107,153,0.2)]",
  },
};

const CLOSED_LOOP_PLATFORM_BADGE_STYLES: Record<
  ClosedLoopPlatformBadgeTone,
  {
    src: string;
    imageClassName: string;
  }
> = {
  task: {
    src: AI_PROJECT_CLOSED_LOOP_ICON_TASK_SRC,
    imageClassName: "absolute inset-0 block size-full max-w-none",
  },
  create: {
    src: AI_PROJECT_CLOSED_LOOP_ICON_CREATE_SRC,
    imageClassName: "absolute inset-[-9.38%] block h-[118.75%] w-[118.75%] max-w-none",
  },
  ai: {
    src: AI_PROJECT_CLOSED_LOOP_ICON_AI_SRC,
    imageClassName: "absolute inset-[-9.38%] block h-[118.75%] w-[118.75%] max-w-none",
  },
};

const CLOSED_LOOP_FLOW_STEPS: ClosedLoopFlowStep[] = [
  {
    id: "requirements",
    nodeId: "1785:13431",
    flowId: "01",
    number: "1",
    title: "需求打包",
    lines: ["原始需求 → 结构化需求包", "产出：待核对 / 待发包任务包"],
    widthClassName: "w-[154px]",
    tone: "green",
    platformLabel: "TASK",
    badges: ["task", "create"],
  },
  {
    id: "dispatch",
    nodeId: "1625:12589",
    flowId: "01",
    number: "2",
    title: "任务派发",
    lines: ["需求包 → 可接单创作任务", "产出：已发布任务 / 接单入口"],
    widthClassName: "w-[154px]",
    tone: "green",
    platformLabel: "TASK",
    badges: ["task", "create", "ai"],
  },
  {
    id: "sync",
    nodeId: "1625:12590",
    flowId: "02",
    number: "3",
    title: "任务同步",
    lines: ["已接单任务 → 创作者 Brief", "产出：同步任务上下文"],
    widthClassName: "w-[145px]",
    tone: "teal",
    platformLabel: "TASK → CREATE",
    badges: ["ai"],
  },
  {
    id: "creation",
    nodeId: "1625:12591",
    flowId: "02",
    number: "4",
    title: "创作执行",
    lines: ["任务 Brief → 内容交付物", "产出：文章草稿 / 自检结果"],
    widthClassName: "w-[144px]",
    tone: "teal",
    platformLabel: "CREATE",
    badges: ["ai"],
  },
  {
    id: "progress",
    nodeId: "1625:12592",
    flowId: "03",
    number: "5",
    title: "进度回传",
    lines: ["执行动作 → 可监管状态", "产出：进度事件 / 验收结算入口"],
    widthClassName: "w-[164px]",
    tone: "blue",
    platformLabel: "CREATE → TASK",
    badges: ["task", "create", "ai"],
  },
];

const CLOSED_LOOP_FLOW_ARROWS: ClosedLoopFlowArrowItem[] = [
  {
    id: "requirements-to-dispatch",
    nodeId: "1625:12593",
    flowId: "01",
    activeSrc: AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_01_ACTIVE_SRC,
    mutedSrc: AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_01_MUTED_SRC,
  },
  {
    id: "dispatch-to-sync",
    nodeId: "1625:12595",
    flowId: "02",
    activeSrc: AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02A_ACTIVE_SRC,
    mutedSrc: AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02A_MUTED_SRC,
  },
  {
    id: "sync-to-creation",
    nodeId: "1625:12598",
    flowId: "02",
    activeSrc: AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02B_ACTIVE_SRC,
    mutedSrc: AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02B_MUTED_SRC,
  },
  {
    id: "creation-to-progress",
    nodeId: "1625:12601",
    flowId: "03",
    activeSrc: AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_03_ACTIVE_SRC,
    mutedSrc: AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_03_MUTED_SRC,
  },
];

const CLOSED_LOOP_FLOW_GROUPS: ClosedLoopFlowGroup[] = [
  {
    id: "01",
    nodeId: "2093:21880",
    label: "Flow 01：需求打包与任务派发",
    items: [
      { type: "step", stepId: "requirements" },
      { type: "arrow", arrowId: "requirements-to-dispatch" },
      { type: "step", stepId: "dispatch" },
    ],
  },
  {
    id: "02",
    nodeId: "2093:21989",
    label: "Flow 02：任务同步与创作执行",
    className: "gap-px",
    items: [
      { type: "arrow", arrowId: "dispatch-to-sync" },
      { type: "step", stepId: "sync" },
      { type: "arrow", arrowId: "sync-to-creation" },
      { type: "step", stepId: "creation" },
    ],
  },
  {
    id: "03",
    nodeId: "2093:22096",
    label: "Flow 03：进度回传",
    items: [
      { type: "arrow", arrowId: "creation-to-progress" },
      { type: "step", stepId: "progress" },
    ],
  },
];

const CLOSED_LOOP_FLOW_QUOTES: Record<ClosedLoopFlowId, ClosedLoopFlowQuote> = {
  "01": {
    title: "Flow 01：需求打包与任务派发",
    description: "验证企业/代理商能否把分散、不完整、不标准的营销需求，整理成创作者可以接单、理解、执行和验收的任务包。",
    tone: "green",
    metricNodeIds: ["1789:14288", "1789:14290"],
    metrics: ["1", "2"],
  },
  "02": {
    title: "Flow 02：创作者执行与内容生产",
    description: "验证创作者接单后，能否基于同步过来的任务上下文、企业素材、关键词和创作指令完成内容生产。",
    tone: "teal",
    metricNodeIds: ["2094:22298", "2094:22300"],
    metrics: ["3", "4"],
  },
  "03": {
    title: "Flow 03：进度回传与履约监管",
    description: "验证创作者侧的执行状态能否回传到 AITIME TASK，让企业/代理商不进入创作者工作台，也能看到任务推进情况。",
    tone: "blue",
    metricNodeIds: ["2094:22278"],
    metrics: ["5"],
  },
};

function getClosedLoopFlowVisualState(
  flowId: ClosedLoopFlowId,
  selectedFlow: ClosedLoopFlowId,
  hoveredFlow: ClosedLoopFlowId | null,
): ClosedLoopFlowCardVariant {
  if (flowId === selectedFlow) return "selected";
  return flowId === hoveredFlow ? "hovered" : "idle";
}

function getClosedLoopStep(stepId: ClosedLoopStepId) {
  return CLOSED_LOOP_FLOW_STEPS.find((step) => step.id === stepId)!;
}

function getClosedLoopArrow(arrowId: ClosedLoopArrowId) {
  return CLOSED_LOOP_FLOW_ARROWS.find((arrow) => arrow.id === arrowId)!;
}

function ClosedLoopPlatformBadge({ tone, overlap }: { tone: ClosedLoopPlatformBadgeTone; overlap?: boolean }) {
  const badgeStyle = CLOSED_LOOP_PLATFORM_BADGE_STYLES[tone];

  return (
    <span
      className={`relative size-[14px] shrink-0 overflow-visible ${overlap ? "ml-[-3px]" : ""}`}
      aria-hidden={true}
    >
      <img alt="" className={badgeStyle.imageClassName} src={badgeStyle.src} />
    </span>
  );
}

function ClosedLoopPlatformLabel({ label }: { label: string }) {
  const [sourceLabel, targetLabel] = label.split(" → ");

  if (!targetLabel) {
    return (
      <p className="[word-break:break-word] shrink-0 font-['OPPOSans:Regular'] text-[10px] leading-[18px] text-center text-white uppercase whitespace-nowrap">
        {label}
      </p>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-[3px] font-['OPPOSans:Regular'] text-[10px] leading-[18px] text-center text-white uppercase whitespace-nowrap">
      <p className="[word-break:break-word] shrink-0">{sourceLabel}</p>
      <span className="relative h-[2px] w-[6px] shrink-0" aria-hidden={true}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_CLOSED_LOOP_LABEL_ARROW_SRC} />
      </span>
      <p className="[word-break:break-word] shrink-0">{targetLabel}</p>
    </div>
  );
}

function ClosedLoopPlatformStrip({ badges, label }: { badges: ClosedLoopPlatformBadgeTone[]; label: string }) {
  return (
    <div className="flex h-[26px] w-full shrink-0 items-center gap-[12px] overflow-hidden rounded-bl-[4px] rounded-br-[4px] bg-[#aeaeae] px-[12px] py-[4px]">
      <div className="flex shrink-0 items-center">
        {badges.map((badge, index) => (
          <ClosedLoopPlatformBadge key={`${badge}-${index}`} tone={badge} overlap={index > 0} />
        ))}
      </div>
      <ClosedLoopPlatformLabel label={label} />
    </div>
  );
}

function ClosedLoopFlowStepCard({
  step,
  variant,
}: {
  step: ClosedLoopFlowStep;
  variant: ClosedLoopFlowCardVariant;
}) {
  const toneStyle = CLOSED_LOOP_STEP_TONE_STYLES[step.tone];
  const isSelected = variant === "selected";
  const cardStateClassName = variant === "selected" ? toneStyle.shadowClassName : variant === "hovered" ? "opacity-90" : "opacity-65";

  return (
    <div
      className={`relative flex shrink-0 flex-col items-start overflow-hidden rounded-[8px] transition-[filter,opacity] duration-200 ${step.widthClassName} ${cardStateClassName}`}
      data-node-id={step.nodeId}
      data-name="Container"
    >
      <div className={`flex h-[36px] w-full shrink-0 items-center gap-[12px] overflow-hidden rounded-tl-[4px] rounded-tr-[4px] ${toneStyle.headerClassName}`}>
        <div className="flex h-full shrink-0 items-center">
          <div className="flex size-[36px] shrink-0 flex-col items-center justify-center">
            <p className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['DINOT:Bold'] text-[12px] leading-[20px] tracking-[1.44px] text-justify whitespace-nowrap ${toneStyle.numberClassName}`}>
              {step.number}
            </p>
          </div>
          <div className="h-full w-px shrink-0 bg-[#474747] opacity-10" />
        </div>
        <p className="[word-break:break-word] shrink-0 font-['OPPOSans:Bold'] text-[12px] leading-[20px] tracking-[0.48px] text-justify text-[#474747] whitespace-nowrap">
          {step.title}
        </p>
      </div>
      <div
        className={`flex h-[54px] w-full shrink-0 flex-col items-start overflow-hidden px-[12px] py-[8px] font-['OPPOSans:Regular'] text-[10px] leading-[18px] text-[rgba(71,71,71,0.8)] whitespace-nowrap ${
          isSelected ? toneStyle.bodyActiveClassName : toneStyle.bodyClassName
        }`}
        data-name="交互"
      >
        {step.lines.map((line) => (
          <p key={line} className="relative shrink-0">
            {line}
          </p>
        ))}
      </div>
      <ClosedLoopPlatformStrip badges={step.badges} label={step.platformLabel} />
    </div>
  );
}

function ClosedLoopFlowQuote({ flowId }: { flowId: ClosedLoopFlowId }) {
  const quote = CLOSED_LOOP_FLOW_QUOTES[flowId];
  const toneStyle = CLOSED_LOOP_STEP_TONE_STYLES[quote.tone];

  return (
    <div className="relative flex w-full shrink-0 items-start gap-[12px]" data-node-id="1789:14281" data-name="Quote Container">
      <div className="relative flex h-[32px] shrink-0 items-center" data-node-id="1789:14282" data-name="Divider Icon Container">
        <div className="relative h-[16px] w-[4px] shrink-0 bg-[#474747] opacity-25" data-node-id="1789:14283" data-name="Divider Icon" />
      </div>
      <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start justify-center gap-[2px]" data-node-id="1789:14284" data-name="Quote Details">
        <div className="relative flex shrink-0 items-center gap-[12px]" data-node-id="1789:14285" data-name="Quote Item Container">
          <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[20px] leading-[0] text-[#414141] not-italic whitespace-nowrap" data-node-id="1789:14286">
            <p className="leading-[32px]">{quote.title}</p>
          </div>
          <div className="relative flex shrink-0 items-center gap-[8px]" data-node-id="1789:14287" data-name="Quote Metric">
            {quote.metrics.map((metric, index) => (
              <div
                key={metric}
                className={`relative flex size-[20px] shrink-0 flex-col items-center justify-center rounded-[2px] ${toneStyle.headerClassName}`}
                data-node-id={quote.metricNodeIds[index]}
                data-name="Quote Metric Item"
              >
                <p className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] relative shrink-0 font-['DINOT:Bold'] text-[12px] leading-[20px] tracking-[1.44px] text-justify not-italic whitespace-nowrap ${toneStyle.numberClassName}`}>
                  {metric}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="[word-break:break-word] relative flex min-w-full w-[min-content] shrink-0 flex-col justify-center font-['OPPOSans:Regular'] text-[12px] leading-[0] text-justify text-[#414141] opacity-65 not-italic" data-node-id="1789:14292">
          <p className="leading-[20px]">{quote.description}</p>
        </div>
      </div>
    </div>
  );
}

function ClosedLoopFlowArrow({
  arrow,
  isArrowActive,
}: {
  arrow: ClosedLoopFlowArrowItem;
  isArrowActive: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-[25px] shrink-0 items-start justify-center pt-[12px] transition-opacity duration-200 ${
        isArrowActive ? "opacity-100" : "opacity-75"
      }`}
      data-node-id={arrow.nodeId}
      data-name="Arrow Icon"
    >
      <span className="relative h-[12px] w-[7px] shrink-0" aria-hidden={true}>
        <span className="absolute inset-[9.77%_7.67%_9.77%_0]">
          <img alt="" className="block size-full max-w-none" src={isArrowActive ? arrow.activeSrc : arrow.mutedSrc} />
        </span>
      </span>
    </div>
  );
}

function ClosedLoopFlowValidation({
  selectedFlow,
  onSelectFlow,
}: {
  selectedFlow: ClosedLoopFlowId;
  onSelectFlow: (flowId: ClosedLoopFlowId) => void;
}) {
  const [hoveredFlow, setHoveredFlow] = useState<ClosedLoopFlowId | null>(null);

  return (
    <div
      className="relative flex h-[116px] w-[864px] max-w-full shrink-0 items-start justify-between overflow-visible"
      data-node-id="2093:21988"
      data-name="Root Frame"
      aria-label="MVP 功能范围与流程验证关键任务流"
      onMouseLeave={() => setHoveredFlow(null)}
    >
      {CLOSED_LOOP_FLOW_GROUPS.map((flow) => (
        <div
          key={flow.id}
          className={`relative flex cursor-pointer self-stretch outline-none ${flow.className ?? ""}`}
          data-node-id={flow.nodeId}
          data-name={`flow ${flow.id}`}
          data-flow-active={selectedFlow === flow.id ? "true" : undefined}
          data-flow-selected={selectedFlow === flow.id ? "true" : undefined}
          data-flow-hovered={hoveredFlow === flow.id ? "true" : undefined}
          aria-label={flow.label}
          role="group"
          tabIndex={0}
          onBlur={() => setHoveredFlow(null)}
          onClick={() => onSelectFlow(flow.id)}
          onFocus={() => setHoveredFlow(flow.id)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            onSelectFlow(flow.id);
          }}
          onMouseEnter={() => setHoveredFlow(flow.id)}
        >
          {flow.items.map((item) => {
            if (item.type === "step") {
              const step = getClosedLoopStep(item.stepId);
              return (
                <ClosedLoopFlowStepCard
                  key={step.id}
                  step={step}
                  variant={getClosedLoopFlowVisualState(step.flowId, selectedFlow, hoveredFlow)}
                />
              );
            }

            const arrow = getClosedLoopArrow(item.arrowId);
            return <ClosedLoopFlowArrow key={arrow.id} arrow={arrow} isArrowActive={selectedFlow === arrow.flowId} />;
          })}
        </div>
      ))}
    </div>
  );
}

function ClosedLoopSection({ sectionRef }: { sectionRef: (node: HTMLElement | null) => void }) {
  const [selectedFlow, setSelectedFlow] = useState<ClosedLoopFlowId>("01");

  return (
    <section
      id={`ai-project-detail-section-${CLOSED_LOOP_META.id}`}
      ref={sectionRef}
      className="flex w-full scroll-mt-0 flex-col items-center px-[64px] py-[48px]"
      data-section-id={CLOSED_LOOP_META.id}
      data-node-id="1789:14196"
      data-name="Section Container 04"
    >
      <div className="flex w-[864px] max-w-full flex-col items-start gap-[84px]">
        <SectionHeading
          titleAsset={AI_PROJECT_SECTION_TITLE_ASSETS.closedLoop}
          title="04 · MVP 功能范围与流程验证"
          description="在明确双平台边界后，我进一步将 MVP 范围收敛到三条关键任务流中，用可点击 Demo 验证最小履约闭环是否成立。"
        />
        <div className="relative h-[116px] w-[864px] max-w-full shrink-0 rounded-[8px]" data-node-id="1789:14775" data-name="Section Details">
          <ClosedLoopFlowValidation selectedFlow={selectedFlow} onSelectFlow={setSelectedFlow} />
        </div>
        <div className="relative flex w-[864px] max-w-full shrink-0 flex-col items-start gap-[20px]" data-node-id="1789:14280" data-name="Blockquote">
          <ClosedLoopFlowQuote flowId={selectedFlow} />
          <div
            className="relative h-[596px] w-[864px] max-w-full shrink-0 overflow-clip rounded-[8px] border border-solid border-[#d2d2d2] bg-[#e2e2e2]"
            data-node-id="1789:14777"
            data-name="Quote Details"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

type AiWorkflowAlignmentItem = {
  nodeId: string;
  ghostTitle: string;
  title: string;
  description: string;
  paddingClassName: string;
  titleTrackingClassName?: string;
  overlapClassName?: string;
};

const AI_WORKFLOW_ALIGNMENT_ITEMS: AiWorkflowAlignmentItem[] = [
  {
    nodeId: "1637:12731",
    ghostTitle: "Business",
    title: "业务 / 运营口径",
    description: "GEO 任务怎么定义？什么算合格内容？什么状态可以验收？异常任务怎么处理？",
    paddingClassName: "px-[44px]",
    overlapClassName: "mr-[-32px]",
  },
  {
    nodeId: "1637:12732",
    ghostTitle: "LLM",
    title: "AI 介入边界",
    description: "AI 在哪些节点介入？读取什么上下文？输出什么格式？哪些结果需要人工确认？失败时如何兜底？",
    paddingClassName: "px-[44px]",
    overlapClassName: "mr-[-32px]",
  },
  {
    nodeId: "1637:12735",
    ghostTitle: "R&D Team",
    title: "研发",
    description: "两个平台之间传什么数据？任务状态怎么流转？进度事件什么时候回传？AI 输出如何保存和复用？",
    paddingClassName: "px-[44px]",
    titleTrackingClassName: "tracking-[4px]",
    overlapClassName: "mr-[-32px]",
  },
  {
    nodeId: "1642:12850",
    ghostTitle: "TEST",
    title: "测试 / 上线验证",
    description: "哪些流程必须跑通？哪些 AI 结果需要人工确认？上线后观察哪些效率、质量和履约指标？",
    paddingClassName: "px-[44px]",
  },
];

function AiWorkflowAlignmentCard({ item }: { item: AiWorkflowAlignmentItem }) {
  return (
    <div
      className={`ai-project-workflow-card relative flex h-[240px] w-[240px] flex-none shrink-0 flex-col items-start gap-[16px] rounded-[200px] bg-[#e2e2e2] pt-[54px] ${item.paddingClassName} ${item.overlapClassName ?? ""}`}
      data-node-id={item.nodeId}
      data-name="Workflow Alignment Item"
    >
      <div className="relative flex w-full shrink-0 flex-col items-center justify-center px-[8px] text-[18px] leading-[0] whitespace-nowrap">
        <div className="relative mb-[-16px] flex shrink-0 flex-col justify-center font-['Alimama_ShuHeiTi:Bold'] tracking-[4px] uppercase opacity-[0.15]">
          <p className="ai-project-workflow-ghost-text leading-[28px]">{item.ghostTitle}</p>
        </div>
        <div data-workflow-title className={`relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[#474747] ${item.titleTrackingClassName ?? "tracking-[1.2px]"}`}>
          <p className="leading-[24px]">{item.title}</p>
        </div>
      </div>
      <div data-workflow-description className="relative flex w-full shrink-0 flex-col justify-center font-['OPPOSans:Regular'] text-[12px] leading-[0] text-justify text-[#474747]">
        <p className="leading-[20px]">{item.description}</p>
      </div>
    </div>
  );
}

function AiWorkflowAlignmentDetails() {
  return (
    <div
      className="relative flex h-[240px] w-[864px] max-w-full shrink-0 items-start overflow-visible leading-[0]"
      data-node-id="1637:12734"
      data-name="AI Workflow Alignment Details"
    >
      {AI_WORKFLOW_ALIGNMENT_ITEMS.map((item) => (
        <AiWorkflowAlignmentCard key={item.nodeId} item={item} />
      ))}
    </div>
  );
}

type AiWorkflowPhaseId = "phase-01" | "phase-02" | "phase-03";
type AiWorkflowTagTone = "green" | "teal" | "blue" | "purple";
type AiWorkflowKeyPointTableMode = "fill" | "hug";

type AiWorkflowTag = {
  label: string;
  tone: AiWorkflowTagTone;
};

type AiWorkflowCutoutRow = {
  label: string;
  value: string;
  valueClassName?: string;
};

type AiWorkflowCutoutLayout = {
  expandedHeight: number;
  collapsedHeight: number;
  bodyHeight: number;
  collapsedPaddingClassName: string;
};

type AiWorkflowCutoutItem = {
  id: string;
  nodeId: string;
  index: string;
  title: string;
  headerNote?: string;
  tags: AiWorkflowTag[];
  layout: AiWorkflowCutoutLayout;
  keyPointTableMode?: AiWorkflowKeyPointTableMode;
  currentMvp: string;
  iterationGoal: string;
  rows: AiWorkflowCutoutRow[];
};

type AiWorkflowPhase = {
  id: AiWorkflowPhaseId;
  label: string;
  cutouts: AiWorkflowCutoutItem[];
};

const AI_WORKFLOW_ITERATION_PANEL_HEIGHT = 637;
const AI_WORKFLOW_ITERATION_CONTENT_HEIGHT = 580;
const AI_WORKFLOW_ITERATION_EXPANDED_STANDARD_HEIGHT = 376;
const AI_WORKFLOW_ITERATION_EXPANDED_COMPACT_HEIGHT = 356;
const AI_WORKFLOW_ITERATION_BODY_STANDARD_HEIGHT = 308;
const AI_WORKFLOW_ITERATION_BODY_COMPACT_HEIGHT = 288;
const AI_WORKFLOW_ITERATION_COLLAPSED_STANDARD_HEIGHT = 68;
const AI_WORKFLOW_ITERATION_COLLAPSED_COMPACT_HEIGHT = 56;

const AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT: AiWorkflowCutoutLayout = {
  expandedHeight: AI_WORKFLOW_ITERATION_EXPANDED_STANDARD_HEIGHT,
  collapsedHeight: AI_WORKFLOW_ITERATION_COLLAPSED_STANDARD_HEIGHT,
  bodyHeight: AI_WORKFLOW_ITERATION_BODY_STANDARD_HEIGHT,
  collapsedPaddingClassName: "px-[16px] pb-[28px] pt-[16px]",
};

const AI_WORKFLOW_ITERATION_COMPACT_CUTOUT_LAYOUT: AiWorkflowCutoutLayout = {
  expandedHeight: AI_WORKFLOW_ITERATION_EXPANDED_COMPACT_HEIGHT,
  collapsedHeight: AI_WORKFLOW_ITERATION_COLLAPSED_COMPACT_HEIGHT,
  bodyHeight: AI_WORKFLOW_ITERATION_BODY_COMPACT_HEIGHT,
  collapsedPaddingClassName: "p-[16px]",
};

const AI_WORKFLOW_ITERATION_TAG_STYLES: Record<
  AiWorkflowTagTone,
  {
    topClassName: string;
    bottomClassName: string;
    textClassName: string;
    iconSrc: string;
  }
> = {
  green: {
    topClassName: "bg-[#57814d]",
    bottomClassName: "bg-[#d0e1cc]",
    textClassName: "text-[rgba(255,255,255,0.8)]",
    iconSrc: AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_GREEN_SRC,
  },
  teal: {
    topClassName: "bg-[#4d8179]",
    bottomClassName: "bg-[#cce1db]",
    textClassName: "text-[#e1e8e6]",
    iconSrc: AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_TEAL_SRC,
  },
  blue: {
    topClassName: "bg-[#586b99]",
    bottomClassName: "bg-[#ccd9e1]",
    textClassName: "text-[#e1e5e8]",
    iconSrc: AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_BLUE_SRC,
  },
  purple: {
    topClassName: "bg-[#755899]",
    bottomClassName: "bg-[#ddcce1]",
    textClassName: "text-[#e5e1e8]",
    iconSrc: AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_PURPLE_SRC,
  },
};

const AI_WORKFLOW_ITERATION_PHASES: AiWorkflowPhase[] = [
  {
    id: "phase-01",
    label: "Phase 01｜低风险无感辅助",
    cutouts: [
      {
        id: "cutout-01",
        nodeId: "1774:13042",
        index: "无感切口 01",
        title: "需求包无感预填",
        tags: [{ label: "需求打包", tone: "green" }],
        layout: AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT,
        currentMvp: "用户创建需求包，引用企业信库和产品档案。",
        iterationGoal: "让用户不用从空白开始填写任务包，在建包阶段自动整理企业资料和历史任务，生成可确认的字段建议。从而降低需求整理成本。",
        rows: [
          { label: "什么时候触发", value: "用户选择企业 / 产品档案后；或新建需求包、上传原始需求文档时触发。" },
          { label: "读取什么数据", value: "企业信库、产品档案、历史任务包、套餐模板、行业关键词、代理商输入的原始需求。" },
          { label: "输出什么结果", value: "预填需求包字段，包括产品卖点、目标用户、关键词方向、禁用表达、交付要求、验收建议。" },
          { label: "用户怎么确认", value: "用户逐项确认、编辑或清空；高置信字段可默认填入，低置信字段以“建议”形式展示。" },
          { label: "失败时怎么办", value: "不自动填入关键字段；保留空字段，并转为引导式问题，例如“是否有地域限制？”、“是否有目标转化词？” 等等。" },
          { label: "结果回传到哪里", value: "写入 AITIME TASK 的需求包草稿，同时记录哪些字段来自 AI、哪些字段经过人工确认。" },
        ],
      },
      {
        id: "cutout-02",
        nodeId: "2075:16225",
        index: "无感切口 02",
        title: "缺失信息与风险无感提示",
        tags: [
          { label: "需求打包", tone: "green" },
          { label: "任务派发", tone: "green" },
        ],
        layout: AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT,
        keyPointTableMode: "fill",
        currentMvp: "需求包核对、任务包预览、发布配置。",
        iterationGoal: "在任务派发前暴露可能造成执行偏差的信息缺口，减少创作者接单后的反复沟通。",
        rows: [
          { label: "什么时候触发", value: "用户保存需求包、进入任务预览、点击发布任务前触发；字段变更后也可重新检查。" },
          { label: "读取什么数据", value: "当前需求包、任务类型、必填字段规则、企业信库、产品档案、验收标准、平台发布规则。" },
          { label: "输出什么结果", value: "缺失字段、冲突信息、模糊表达和履约风险清单，例如“缺少验收标准”“关键词目标过宽”。" },
          { label: "用户怎么确认", value: "用户可以立即补充、忽略并填写原因，或生成远程需求包让企业补充。" },
          { label: "失败时怎么办", value: "低置信提示不阻断发布；高风险缺失可标为“建议补充”，但最终由用户决定。" },
          { label: "结果回传到哪里", value: "回到需求包状态、任务包核对页和远程补充任务中，形成待处理问题列表。" },
        ],
      },
      {
        id: "cutout-03",
        nodeId: "2075:18046",
        index: "无感切口 03",
        title: "创作者 BRIEF 自动生成",
        tags: [{ label: "任务同步", tone: "teal" }],
        layout: AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT,
        keyPointTableMode: "hug",
        currentMvp: "任务同步、任务上下文同步、创作者任务详情。",
        iterationGoal: "AI 将需求包转译为执行说明(即创作者 Brief) 。让创作者不需要逐项阅读字段，也能快速理解执行方向。",
        rows: [
          { label: "什么时候触发", value: "创作者接单后；任务从 AITIME TASK 同步到 AITIME CREATE 时自动触发。" },
          { label: "读取什么数据", value: "需求包、企业信库快照、产品档案快照、关键词要求、交付数量、截止时间、验收标准、附件素材" },
          { label: "输出什么结果", value: "创作者Brief,包括任务目标、写作方向、产品卖点、关键词要求、禁用表达、交付标准和注意事项" },
          { label: "用户怎么确认", value: "创作者进入任务详情时查看Brief, 可标记已读、手动补充备注,或请求重新生成摘要。" },
          { label: "失败时怎么办", value: "回退到原始任务包展示,不影响创作者接单和执行; Brief区提示“摘要生成失败,可查看原始任务信息”" },
          { label: "结果回传到哪里", value: "保存到AITIME CREATE的同步任务详情中, 并可将“Brief已生成/已查看”作为进度事件回传到AITIMETASK" },
        ],
      },
      {
        id: "cutout-04",
        nodeId: "2075:18329",
        index: "无感切口 04",
        title: "进度自动摘要",
        tags: [{ label: "任务同步", tone: "teal" }],
        layout: AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT,
        keyPointTableMode: "fill",
        currentMvp: "任务状态回传、任务监管看板、阶段进度。",
        iterationGoal: "AI 将创作者侧的执行动作转化为需求侧可快速理解的进度摘要，而不是只回传一个冷冰冰的状态标签。降低人工追问和跨平台查看成本。",
        rows: [
          { label: "什么时候触发", value: "创作者完成关键词、生成文章、自检完成、提交结果、任务各延期或状态长时间未变化时触发。" },
          { label: "读取什么数据", value: "进度事件、任务状态、关键词完成情况、文章草稿状态、自检结果、截止时间、提交记录。" },
          { label: "输出什么结果", value: "面向代理商/企业的进度摘要, 例如：“已完成关键词整理,文章草稿生成中,预计今日提交”。" },
          { label: "用户怎么确认", value: "低风险进度摘要可自动展示;涉及异常、延期、质量风险时时由创作者或运营确认后回传。" },
          { label: "失败时怎么办", value: "回退为原始状态标签, 例如“创作中/待提交/待验收”, 不影前任务监管。" },
          { label: "结果回传到哪里", value: "展示在AITIMETASK的任务监管页、任务时间线和消息通知中。" },
        ],
      },
    ],
  },
  {
    id: "phase-02",
    label: "Phase 02｜创作过程增强",
    cutouts: [
      {
        id: "cutout-05",
        nodeId: "2075:18672",
        index: "无感切口 05",
        title: "创作上下文主动浮出",
        tags: [{ label: "创作执行", tone: "teal" }],
        layout: AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT,
        keyPointTableMode: "fill",
        currentMvp: "企业素材调用、产品档案调用、文章创作。",
        iterationGoal: "在写作场景中主动浮出当前段落最相关的企业素材和创作方法，从而减少创作者在任务、企业资料、素材库和编辑器之间来回切换。",
        rows: [
          { label: "什么时候触发", value: "创作者打开文章编辑器、选择关键词、输入标题、选中文章段落或停留在某个小节时触发。" },
          { label: "读取什么数据", value: "当前文章内容、任务 Brief、关键词集、企业信库（含产品档案）、素材库、指令仓库、参考文库。" },
          { label: "输出什么结果", value: "相关产品卖点、可用素材、参考表达、禁用提醒、适合当前段落的指令或案例。" },
          { label: "用户怎么确认", value: "创作者可以插入、引用、收藏、忽略或关闭推荐；AI 不自动改写正文。" },
          { label: "失败时怎么办", value: "不展示推荐或仅展示基础任务信息，避免干扰创作者。" },
          { label: "结果回传到哪里", value: "记录在文章草稿的素材引用、指令使用和创作行为日志中，用于后续质量复盘。" },
        ],
      },
      {
        id: "cutout-06",
        nodeId: "2075:18696",
        index: "无感切口 06",
        title: "关键词方向推荐",
        tags: [{ label: "创作执行", tone: "teal" }],
        layout: AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT,
        keyPointTableMode: "fill",
        currentMvp: "关键词集、目标转化词、文章选题。",
        iterationGoal: "帮助创作者从关键词堆叠转向有选题策略的关键词方向规划。",
        rows: [
          { label: "什么时候触发", value: "创作者进入关键词集；输入目标转化词；准备生成文章选题或文章草稿前触发。" },
          { label: "读取什么数据", value: "目标转化词、主词、长尾词、行业词、任务目标、产品卖点、历史高表现关键词、平台要求。" },
          { label: "输出什么结果", value: "关键词分组、优先级、内容角度、标题方向和覆盖建议，例如“测评型 / 对比型 / 选购指南型”。" },
          { label: "用户怎么确认", value: "创作者选择加入关键词集、修改词组、标记不相关或保存为本任务关键词策略。" },
          { label: "失败时怎么办", value: "保留人工关键词管理；系统不强制改动已有关键词。" },
          { label: "结果回传到哪里", value: "写入 AITIME CREATE 的关键词集，并可回传“关键词已完成”进度到 AITIME TASK。" },
        ],
      },
      {
        id: "cutout-07",
        nodeId: "2075:18720",
        index: "无感切口 07",
        title: "实时质量守护",
        tags: [{ label: "创作执行", tone: "teal" }],
        layout: AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT,
        keyPointTableMode: "fill",
        currentMvp: "文章创作、质量自检、任务验收标准。",
        iterationGoal: "在提交前发现并提醒创作者可能影响验收的问题，减少返工和验收失败。",
        rows: [
          { label: "什么时候触发", value: "文章生成后、编辑过程中定时触发、创作者点击提交前触发。" },
          { label: "读取什么数据", value: "文章草稿、任务 Brief、关键词要求、企业信库快照、产品档案快照、禁用表达、验收标准。" },
          { label: "输出什么结果", value: "质量问题清单和修改建议，包括关键词遗漏、品牌表达冲突、卖点缺失、禁用表达、转化引导不足" },
          { label: "用户怎么确认", value: "创作者可以采纳建议、手动修改、忽略并填写原因；高风险问题提交前再次提醒。" },
          { label: "失败时怎么办", value: "不阻断提交；回退为人工自检清单。涉及品牌风险或禁用表达时可进入人工复核。" },
          { label: "结果回传到哪里", value: "自检报告随文章提交到 AITIME TASK，作为需求侧验收参考。" },
        ],
      },
      {
        id: "cutout-08",
        nodeId: "2075:18744",
        index: "无感切口 08",
        title: "指令智能推荐",
        tags: [{ label: "创作执行", tone: "teal" }],
        layout: AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT,
        keyPointTableMode: "fill",
        currentMvp: "指令仓库、爆款反推、文章创作。",
        iterationGoal: "把沉淀下来的指令仓库从静态资产变成动态辅助能力，主动推荐给合适任务。降低创作者手动翻找指令频率。",
        rows: [
          { label: "什么时候触发", value: "创作者选择文章类型、生成大纲、打开编辑器、选中段落或准备改写时触发。" },
          { label: "读取什么数据", value: "任务类型、关键词方向、文章目标、指令仓库、爆款反推结果、历史指令使用效果、当前草稿。" },
          { label: "输出什么结果", value: "推荐指令卡片，包括适用场景、推荐原因、可预期效果和可一键套用的生成方式。" },
          { label: "用户怎么确认", value: "创作者选择应用、改写后应用、保存为常用指令，或标记“不适合本任务”。" },
          { label: "失败时怎么办", value: "使用默认通用指令，或让创作者手动选择指令。" },
          { label: "结果回传到哪里", value: "记录到文章草稿的指令使用记录，并反哺指令仓库的推荐排序。" },
        ],
      },
    ],
  },
  {
    id: "phase-03",
    label: "Phase 03｜履约智能化",
    cutouts: [
      {
        id: "cutout-09",
        nodeId: "2075:20005",
        index: "无感切口 09",
        title: "任务风险预测",
        tags: [
          { label: "任务派发", tone: "green" },
          { label: "进度回传", tone: "blue" },
        ],
        layout: AI_WORKFLOW_ITERATION_COMPACT_CUTOUT_LAYOUT,
        currentMvp: "任务监管、任务状态、进度事件。",
        iterationGoal: "AI 从事后监管升级为事前预警，帮助平台提前发现可能延期、返工、无人接单或验收失败的任务。",
        rows: [
          { label: "什么时候触发", value: "任务发布前、创作者接单后、任务长时间无进展、临近截止时间、状态异常时触发。" },
          { label: "读取什么数据", value: "任务复杂度、需求包完整度、交付数量、截止时间、创作者历史表现、当前进度事件、历史延期任务", valueClassName: "!text-[10.5px] whitespace-nowrap" },
          { label: "输出什么结果", value: "风险等级、风险原因和建议动作，例如“建议补充资料”“建议催办”“建议更换创作者”。" },
          { label: "用户怎么确认", value: "代理商 / 运营确认是否调整任务、补充资料、延长周期、催办或换人。" },
          { label: "失败时怎么办", value: "低置信预测不展示或仅作为运营内部提示；不自动改变任务状态。" },
          { label: "结果回传到哪里", value: "回传到 AITIME TASK 的任务监管页、异常任务列表和运营处理队列。" },
        ],
      },
      {
        id: "cutout-10",
        nodeId: "2075:20029",
        index: "无感切口 10",
        title: "创作者匹配建议",
        tags: [{ label: "任务派发", tone: "green" }],
        layout: AI_WORKFLOW_ITERATION_COMPACT_CUTOUT_LAYOUT,
        currentMvp: "指定创作者、接单大厅、任务市场。",
        iterationGoal: "提供可解释的创作者匹配建议，提高任务需求与创作者能力之间的匹配度，减少无人接单和低质量交付。",
        rows: [
          { label: "什么时候触发", value: "用户配置任务派发时；任务发布后长时间无人接单时；需要更换创作者时。" },
          { label: "读取什么数据", value: "任务详细信息、创作者历史接单信息、验收率、擅长领域、接单速度、当前负载。" },
          { label: "输出什么结果", value: "推荐创作者或创作者池，并解释匹配原因和潜在风险。" },
          { label: "用户怎么确认", value: "代理商 / 企业 / 运营选择推荐对象、手动更换，或仍发布到接单大厅。" },
          { label: "失败时怎么办", value: "回退为规则筛选或开放接单大厅；AI 不自动强制分配任务。" },
          { label: "结果回传到哪里", value: "写入 AITIME TASK 的任务派发记录，并在任务完成后用真实结果反哺匹配策略。" },
        ],
      },
      {
        id: "cutout-11",
        nodeId: "2075:20054",
        index: "无感切口 11",
        title: "内容质量评分",
        tags: [
          { label: "创作执行", tone: "teal" },
          { label: "进度回传", tone: "blue" },
        ],
        layout: AI_WORKFLOW_ITERATION_COMPACT_CUTOUT_LAYOUT,
        currentMvp: "文章提交、质量自检、结果验收。",
        iterationGoal: "让内容验收从主观判断变成可解释的多维度质量评估。",
        rows: [
          { label: "什么时候触发", value: "文章提交时、需求侧验收前、文章修改后重新提交时。" },
          { label: "读取什么数据", value: "文章正文、任务 Brief、关键词要求、企业资料、产品档案、验收标准、历史通过文章。" },
          { label: "输出什么结果", value: "多维评分和解释，包括任务匹配度、关键词覆盖、品牌一致性、表达质量、转化引导、风险项。" },
          { label: "用户怎么确认", value: "创作者可按建议修改；需求侧或运营做最终验收判断。" },
          { label: "失败时怎么办", value: "低置信评分仅作为参考，不作为自动驳回依据；进入人工复核。" },
          { label: "结果回传到哪里", value: "回传到 AITIME TASK 的验收页，也可沉淀到创作者质量记录和内容质量数据集中。" },
        ],
      },
      {
        id: "cutout-12",
        nodeId: "2075:20079",
        index: "无感切口 12",
        title: "结算异常识别",
        tags: [{ label: "验收结算", tone: "blue" }],
        layout: AI_WORKFLOW_ITERATION_COMPACT_CUTOUT_LAYOUT,
        currentMvp: "回传到文库收藏、爆款反推、指令仓库、企业任务复盘和下一次需求包建议中。",
        iterationGoal: "提前发现交付、验收和结算之间的状态冲突，降低人工排查成本。",
        rows: [
          { label: "什么时候触发", value: "任务进入验收、准备结算、出现延期、被驳回、重复提交、状态冲突或争议时触发。" },
          { label: "读取什么数据", value: "任务协议、交付结果、验收记录、修改记录、进度事件、支付记录、结算规则、异常历史。" },
          { label: "输出什么结果", value: "异常原因、风险等级和处理建议，例如“交付物缺失”“状态未闭合”“验收未确认但进入结算”。" },
          { label: "用户怎么确认", value: "运营、财务或代理商确认继续结算、返回修改、人工介入或进入争议处理。" },
          { label: "失败时怎么办", value: "回退人工审核；AI 不自动完成扣款、冻结或驳回结算。" },
          { label: "结果回传到哪里", value: "回传到 AITIME TASK 的结算状态、异常任务队列和运营风控记录。" },
        ],
      },
      {
        id: "cutout-13",
        nodeId: "2075:20915",
        index: "无感切口 13",
        title: "分发效果回流",
        headerNote: "基于真实任务数据的智能化延展 | 已经超出最小 MVP 主链路，是上线后的履约闭环延展。",
        tags: [{ label: "履约延展", tone: "purple" }],
        layout: AI_WORKFLOW_ITERATION_COMPACT_CUTOUT_LAYOUT,
        currentMvp: "内容提交、文库收藏、指令沉淀。",
        iterationGoal: "将真实分发效果反哺关键词、内容结构、文库和指令体系，让平台从一次性交付转向持续优化。",
        rows: [
          { label: "什么时候触发", value: "内容发布后达到观察周期；平台拿到曝光、点击、收录、AI 引用或推荐等效果数据后触发。" },
          { label: "读取什么数据", value: "发布平台数据、文章内容、关键词、任务目标、创作者、企业行业、内容结构、历史表现数据。" },
          { label: "输出什么结果", value: "效果摘要、有效写法、低效原因、关键词调整建议、可沉淀指令或参考案例。" },
          { label: "用户怎么确认", value: "运营或创作者确认是否将高表现内容加入文库、是否反推为指令、是否用于下一轮任务。" },
          { label: "失败时怎么办", value: "数据不足时只标记“暂无足够效果数据”，不做结论；允许人工补充效果反馈。" },
          { label: "结果回传到哪里", value: "回传到文库收藏、爆款反推、指令仓库、企业任务复盘和下一次需求包建议中。" },
        ],
      },
    ],
  },
];

const AI_WORKFLOW_ITERATION_DEFAULT_CUTOUT_ID_BY_PHASE: Record<AiWorkflowPhaseId, string> = {
  "phase-01": "cutout-01",
  "phase-02": "cutout-05",
  "phase-03": "cutout-09",
};

function AiWorkflowTagPill({ tag }: { tag: AiWorkflowTag }) {
  const styles = AI_WORKFLOW_ITERATION_TAG_STYLES[tag.tone];

  return (
    <span className="relative inline-flex shrink-0 flex-col items-stretch justify-center">
      <span
        className={`relative z-[2] mb-[-16px] flex h-[17px] shrink-0 items-center justify-center gap-[4px] rounded-[4px] pl-[8px] pr-[6px] pt-px shadow-[inset_0px_0px_6px_0px_rgba(255,255,255,0.5),inset_0px_0px_7.5px_0px_rgba(255,255,255,0.3)] ${styles.topClassName}`}
      >
        <span className={`relative shrink-0 font-['OPPOSans:Bold'] text-[8px] leading-none whitespace-nowrap ${styles.textClassName}`}>{tag.label}</span>
        <img alt="" className="relative size-[6px] shrink-0" src={styles.iconSrc} />
      </span>
      <span className={`relative z-[1] h-[17px] shrink-0 rounded-[4px] shadow-[inset_0px_0px_7.5px_0px_rgba(255,255,255,0.3)] ${styles.bottomClassName}`} />
    </span>
  );
}

function AiWorkflowCutoutHeader({ cutout, isExpanded, onActivate }: { cutout: AiWorkflowCutoutItem; isExpanded: boolean; onActivate: () => void }) {
  return (
    <button
      type="button"
      aria-expanded={isExpanded}
      className="group/header relative flex w-full shrink-0 items-center justify-between gap-[16px] px-[4px] text-left"
      onClick={onActivate}
      onFocus={onActivate}
    >
      <span className="relative flex min-w-0 shrink-0 items-center gap-[12px]">
        <img alt="" className="relative size-[8px] shrink-0" src={AI_PROJECT_ITERATION_WORKFLOW_ROW_ARROW_SRC} />
        <span className="relative flex min-w-0 shrink-0 items-center gap-[8px]">
          <span className="[word-break:break-word] relative flex w-[68px] shrink-0 flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] text-[#414141] not-italic uppercase">
            <span className="leading-[24px]">{cutout.index}</span>
          </span>
          <img alt="" className="relative size-[2px] shrink-0" src={AI_PROJECT_ITERATION_WORKFLOW_TITLE_DOT_SRC} />
          <span className="[word-break:break-word] relative flex min-w-0 shrink flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] text-[#414141] not-italic uppercase whitespace-nowrap">
            <span className="leading-[24px]">{cutout.title}</span>
          </span>
        </span>
        {cutout.headerNote ? (
          <span className="[word-break:break-word] relative flex min-w-0 shrink flex-col justify-center font-['OPPOSans:Light'] text-[12px] leading-[0] text-[#5e5e5e] not-italic uppercase opacity-0 transition-opacity duration-150 group-hover/header:opacity-100 group-focus-visible/header:opacity-100 whitespace-nowrap">
            <span className="leading-[16px]">{cutout.headerNote}</span>
          </span>
        ) : null}
      </span>
      <span className="relative flex shrink-0 items-center gap-[4px]">
        <span className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Medium'] text-[12px] leading-[0] text-[#414141] not-italic uppercase whitespace-nowrap">
          <span className="leading-[24px]">主链路节点：</span>
        </span>
        {cutout.tags.map((tag) => (
          <AiWorkflowTagPill key={`${cutout.id}-${tag.label}`} tag={tag} />
        ))}
      </span>
    </button>
  );
}

function AiWorkflowKeyPointTable({ rows, mode }: { rows: AiWorkflowCutoutRow[]; mode: AiWorkflowKeyPointTableMode }) {
  return (
    <div className={`relative flex w-full flex-col items-start overflow-hidden rounded-[4px] outline outline-1 outline-[#d2d2d2] ${mode === "fill" ? "min-h-px flex-[1_0_0]" : "shrink-0"}`}>
      {[{ label: "思考维度", value: "设计关键" }, ...rows].map((row, index) => {
        const isHeader = index === 0;
        const isLast = index === rows.length;
        const rowClassName = isHeader ? "shrink-0" : mode === "fill" ? "min-h-px flex-[1_0_0]" : "shrink-0";
        const cellStretchClassName = isHeader || mode !== "fill" ? "self-stretch" : "h-full";

        return (
          <div key={row.label} className={`relative flex w-full items-start ${rowClassName}`}>
            <div className={`relative flex w-[100px] shrink-0 items-center px-[12px] py-[6px] shadow-[inset_-1px_0_0_0_#d2d2d2] ${cellStretchClassName} ${isHeader ? "bg-[#e0e0e0]" : ""}`}>
              <p className="[word-break:break-word] relative shrink-0 font-['OPPOSans:Medium'] text-[11px] leading-[20px] text-justify text-[rgba(71,71,71,0.8)] not-italic whitespace-nowrap">{row.label}</p>
            </div>
            <div className={`relative flex min-w-0 flex-[1_0_0] items-center px-[12px] py-[6px] ${cellStretchClassName} ${isHeader ? "bg-[#e0e0e0]" : ""}`}>
              <p className={`[word-break:break-word] relative min-w-0 flex-[1_0_0] text-[11px] leading-[20px] text-justify text-[rgba(71,71,71,0.8)] not-italic ${isHeader ? "font-['OPPOSans:Medium']" : "font-['OPPOSans:Regular']"} ${row.valueClassName ?? ""}`}>{row.value}</p>
            </div>
            {isLast ? null : <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-px bg-[#d2d2d2]" />}
          </div>
        );
      })}
    </div>
  );
}

function AiWorkflowCutoutBody({ cutout }: { cutout: AiWorkflowCutoutItem }) {
  return (
    <>
      <div className="relative flex w-full shrink-0 items-stretch overflow-hidden rounded-[8px] bg-[#e2e2e2]" style={{ height: cutout.layout.bodyHeight }}>
        <div className="[word-break:break-word] relative flex w-[188px] shrink-0 flex-col items-start self-stretch text-[12px] not-italic">
          <div className="relative flex w-full shrink-0 flex-col items-start gap-[4px] bg-[rgba(0,0,0,0.02)] px-[20px] pb-[20px] pt-[16px]">
            <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] leading-[0] text-[#474747] whitespace-nowrap">
              <p className="leading-[20px]">当前 MVP 能力</p>
            </div>
            <p className="relative min-w-full w-[min-content] shrink-0 font-['OPPOSans:Regular'] leading-[24px] text-justify text-[rgba(71,71,71,0.8)]">{cutout.currentMvp}</p>
          </div>
          <div className="relative flex min-h-px w-full flex-[1_0_0] flex-col items-start gap-[4px] bg-[#ececec] px-[20px] pb-[20px] pt-[16px]">
            <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[11px] leading-[0] text-[#474747] whitespace-nowrap">
              <p className="leading-[20px]">迭代目标</p>
            </div>
            <p className="relative min-w-full w-[min-content] shrink-0 font-['OPPOSans:Regular'] text-[12px] leading-[24px] text-justify text-[rgba(71,71,71,0.8)]">{cutout.iterationGoal}</p>
          </div>
        </div>
        <div className="relative flex min-w-0 flex-[1_0_0] flex-col items-start gap-[8px] px-[20px] pb-[20px] pt-[16px]">
          <div className="[word-break:break-word] relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[11px] leading-[0] text-[#474747] not-italic whitespace-nowrap">
            <p className="leading-[20px]">AI 落地关键点</p>
          </div>
          <AiWorkflowKeyPointTable rows={cutout.rows} mode={cutout.keyPointTableMode ?? "hug"} />
        </div>
      </div>
    </>
  );
}

function AiWorkflowCutoutItem({ cutout, isExpanded, onActivate }: { cutout: AiWorkflowCutoutItem; isExpanded: boolean; onActivate: () => void }) {
  return (
    <article
      className={`relative flex w-full shrink-0 flex-col items-start overflow-hidden ${isExpanded ? "gap-[12px] p-[16px]" : `justify-center ${cutout.layout.collapsedPaddingClassName}`}`}
      data-node-id={cutout.nodeId}
      data-name="Info Section"
      data-figma-expanded-height={cutout.layout.expandedHeight}
      data-figma-collapsed-height={cutout.layout.collapsedHeight}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      style={{ height: isExpanded ? cutout.layout.expandedHeight : cutout.layout.collapsedHeight }}
    >
      <AiWorkflowCutoutHeader cutout={cutout} isExpanded={isExpanded} onActivate={onActivate} />
      {isExpanded ? <AiWorkflowCutoutBody cutout={cutout} /> : null}
    </article>
  );
}

function AiWorkflowPhaseTab({ phase, isSelected, onActivate }: { phase: AiWorkflowPhase; isSelected: boolean; onActivate: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={`ai-workflow-phase-tab relative flex h-[56px] flex-1 shrink-0 items-center justify-center px-[16px] py-[16px] font-['OPPOSans:Bold'] text-[16px] leading-[24px] text-[#414141] transition-[background-color,opacity] duration-200 ${isSelected ? "bg-[#d2d2d2] opacity-100" : "opacity-50 hover:opacity-80 focus-visible:opacity-80"}`}
      onClick={onActivate}
    >
      <span className="whitespace-nowrap">{phase.label}</span>
    </button>
  );
}

function AiWorkflowIterationRoadmap() {
  const [activePhaseId, setActivePhaseId] = useState<AiWorkflowPhaseId>("phase-01");
  const [activeCutoutIdByPhase, setActiveCutoutIdByPhase] = useState<Record<AiWorkflowPhaseId, string>>(AI_WORKFLOW_ITERATION_DEFAULT_CUTOUT_ID_BY_PHASE);
  const activePhase = AI_WORKFLOW_ITERATION_PHASES.find((phase) => phase.id === activePhaseId) ?? AI_WORKFLOW_ITERATION_PHASES[0];
  const activeCutoutId = activeCutoutIdByPhase[activePhase.id] ?? activePhase.cutouts[0].id;

  const activateCutout = (cutoutId: string) => {
    setActiveCutoutIdByPhase((current) => {
      if (current[activePhase.id] === cutoutId) {
        return current;
      }

      return { ...current, [activePhase.id]: cutoutId };
    });
  };

  return (
    <div className="relative flex w-[864px] max-w-full shrink-0 flex-col items-start overflow-hidden rounded-[8px] bg-transparent outline outline-1 outline-[#d2d2d2]" data-node-id="1761:12627" data-name="AI Workflow Iteration Details" style={{ height: AI_WORKFLOW_ITERATION_PANEL_HEIGHT }}>
      <div className="relative flex h-[56px] w-full shrink-0 items-start" role="tablist" aria-label="AI 工作流迭代阶段">
        {AI_WORKFLOW_ITERATION_PHASES.map((phase) => (
          <AiWorkflowPhaseTab key={phase.id} phase={phase} isSelected={phase.id === activePhase.id} onActivate={() => setActivePhaseId(phase.id)} />
        ))}
      </div>
      <div className="relative h-px w-full shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_ITERATION_WORKFLOW_TABS_DIVIDER_SRC} />
      </div>
      <div className="relative flex w-full shrink-0 flex-col items-start overflow-hidden" style={{ height: AI_WORKFLOW_ITERATION_CONTENT_HEIGHT }}>
        {activePhase.cutouts.map((cutout) => (
          <AiWorkflowCutoutItem key={cutout.id} cutout={cutout} isExpanded={cutout.id === activeCutoutId} onActivate={() => activateCutout(cutout.id)} />
        ))}
      </div>
    </div>
  );
}

function IterationSection({ sectionRef }: { sectionRef: (node: HTMLElement | null) => void }) {
  return (
    <section
      id={`ai-project-detail-section-${ITERATION_META.id}`}
      ref={sectionRef}
      className="flex w-full scroll-mt-0 flex-col items-center px-[64px] py-[48px]"
      data-section-id={ITERATION_META.id}
      data-node-id="1789:14299"
      data-name="Section Container 05"
    >
      <div className="flex w-[864px] max-w-full flex-col items-start gap-[84px]">
        <SectionHeading
          titleAsset={AI_PROJECT_SECTION_TITLE_ASSETS.iteration}
          title="05 · 研发落地与上线迭代"
          description="在双平台架构和 MVP 主链路确认后，项目进入开发落地与上线准备阶段。我的工作从流程原型延伸到上线交付：将关键产品判断沉淀为研发、运营可以对齐的产品方案，并围绕真实任务数据规划上线后的验证指标和迭代优先级。"
        />
        <div className="relative flex w-[864px] max-w-full shrink-0 flex-col items-start gap-[20px]" data-node-id="1789:14301" data-name="Blockquote">
          <div className="relative flex w-full shrink-0 items-start gap-[12px]" data-node-id="1789:14302" data-name="Quote Container">
            <div className="relative flex h-[32px] shrink-0 items-center" data-node-id="I1789:14302;775:12779" data-name="Divider Icon Container">
              <div className="relative h-[16px] w-[4px] shrink-0 bg-[#474747] opacity-25" data-node-id="I1789:14302;775:12780" data-name="Divider Icon" />
            </div>
            <div className="[word-break:break-word] relative flex min-w-px flex-[1_0_0] flex-col items-start justify-center gap-[2px] leading-[0] text-[#414141] not-italic" data-node-id="I1789:14302;778:12939">
              <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[20px] whitespace-nowrap" data-node-id="I1789:14302;775:12781">
                <p className="leading-[32px]">AI 工作流上线对齐</p>
              </div>
              <div className="relative flex min-w-full w-[min-content] shrink-0 flex-col justify-center font-['OPPOSans:Regular'] text-[12px] text-justify opacity-65" data-node-id="I1789:14302;778:12935">
                <p className="leading-[20px]">进入开发上线阶段后，我的工作重点转向 AI 工作流落地：将业务验收口径、AI 介入边界、研发实现规则和上线验证方式对齐到同一条履约链路中，确保系统不仅能跑通页面，也能被真实任务验证。</p>
              </div>
            </div>
          </div>
          <div className="relative w-[864px] max-w-full shrink-0" data-node-id="1789:14779" data-name="Quote Details">
            <AiWorkflowAlignmentDetails />
          </div>
          <div className="relative flex w-full shrink-0 items-start gap-[4px]" data-node-id="1789:14308" data-name="Quote Item Container">
            <div className="relative size-[24px] shrink-0" data-node-id="1789:14309" data-name="Metric Spacer">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_ITERATION_METRIC_SPACER_SRC} />
            </div>
            <div className="[word-break:break-word] relative flex min-w-px flex-[1_0_0] flex-col justify-center font-['OPPOSans:Light'] text-[12px] leading-[0] text-[#474747] not-italic uppercase" data-node-id="1789:14311">
              <p className="leading-[24px]">最终沉淀为：AI 工作流节点说明、任务状态与同步规则、AI 输出确认机制、上线验收与迭代指标。</p>
            </div>
          </div>
        </div>
        <div className="relative flex w-[864px] max-w-full shrink-0 flex-col items-start gap-[48px]" data-node-id="1789:14312" data-name="Blockquote">
          <div className="relative flex w-full shrink-0 items-start gap-[12px]" data-node-id="1789:14313" data-name="Quote Container">
            <div className="relative flex h-[32px] shrink-0 items-center" data-node-id="I1789:14313;775:12779" data-name="Divider Icon Container">
              <div className="relative h-[16px] w-[4px] shrink-0 bg-[#474747] opacity-25" data-node-id="I1789:14313;775:12780" data-name="Divider Icon" />
            </div>
            <div className="[word-break:break-word] relative flex min-w-px flex-[1_0_0] flex-col items-start justify-center gap-[2px] leading-[0] text-[#414141] not-italic" data-node-id="I1789:14313;778:12939">
              <div className="relative flex shrink-0 flex-col justify-center font-['OPPOSans:Bold'] text-[20px] whitespace-nowrap" data-node-id="I1789:14313;775:12781">
                <p className="leading-[32px]">迭代：从显性 AI 工具到无感 AI 工作流</p>
              </div>
              <div className="relative flex min-w-full w-[min-content] shrink-0 flex-col justify-center font-['OPPOSans:Regular'] text-[12px] text-justify opacity-65" data-node-id="I1789:14313;778:12935">
                <p>
                  <span className="leading-[20px]">上线后的 AI 迭代不会继续堆叠独立的生成按钮，而是沿着 MVP 主链路逐步让 AI 更无感地嵌入需求打包、任务同步、创作执行和进度回传中。</span>
                  <span className="[word-break:break-word] font-['OPPOSans:Regular'] leading-[20px] not-italic">为了让这些 AI 能力真正进入开发，每个切口都需要定义触发时机、上下文来源、输出形式、人工确认机制、失败兜底方案和结果回传位置，确保 AI 能力不是单点功能，而是可以嵌入双平台协作链路的流程能力。</span>
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-[864px] max-w-full shrink-0" data-node-id="1789:14781" data-name="Quote Details">
            <AiWorkflowIterationRoadmap />
          </div>
          <div className="relative flex w-full shrink-0 items-start gap-[4px]" data-node-id="1789:14324" data-name="Quote Item Container">
            <div className="relative size-[24px] shrink-0" data-node-id="1789:14325" data-name="Metric Spacer">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={AI_PROJECT_ITERATION_METRIC_SPACER_SRC} />
            </div>
            <div className="[word-break:break-word] relative flex min-w-px flex-[1_0_0] flex-col justify-center font-['OPPOSans:Light'] text-[12px] leading-[0] text-[#474747] not-italic uppercase" data-node-id="1789:14327">
              <p className="leading-[24px]">AI 不直接替用户完成高风险决策，而是在关键节点完成整理、提示、推荐、检查和摘要。涉及任务发布、创作者匹配、内容验收和结算判断的结果，仍需要人工确认后进入下一步流程。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AIProjectDetailOverlay({
  projectId,
  onClose,
}: {
  projectId: AiProductFeaturedProject["id"];
  onClose: () => void;
}) {
  const projectNumber = PROJECT_NUMBER_BY_ID[projectId] ?? "01";
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Partial<Record<AIProjectDetailSectionId, HTMLElement | null>>>({});
  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef<number | null>(null);
  const lastActiveSectionId = useRef<AIProjectDetailSectionId>("overview");
  const [activeSectionId, setActiveSectionId] = useState<AIProjectDetailSectionId>("overview");

  const setActiveSection = (sectionId: AIProjectDetailSectionId) => {
    lastActiveSectionId.current = sectionId;
    setActiveSectionId(sectionId);
  };

  const setSectionRef = (sectionId: AIProjectDetailSectionId) => (node: HTMLElement | null) => {
    sectionRefs.current[sectionId] = node;
  };

  const scrollToSection = (sectionId: AIProjectDetailSectionId) => {
    const section = sectionRefs.current[sectionId];
    if (!section) return;

    isClickScrolling.current = true;
    setActiveSection(sectionId);
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    if (clickScrollTimeout.current) {
      window.clearTimeout(clickScrollTimeout.current);
    }

    clickScrollTimeout.current = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 900);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (clickScrollTimeout.current) {
        window.clearTimeout(clickScrollTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const getSectionTop = (section: HTMLElement) => {
      return section.getBoundingClientRect().top - content.getBoundingClientRect().top + content.scrollTop;
    };

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const viewportTop = content.scrollTop;
      const viewportBottom = viewportTop + content.clientHeight;
      let bestSectionId = lastActiveSectionId.current;
      let maxOccupancy = 0;

      AI_PROJECT_NAV_ITEMS.forEach((item) => {
        const section = sectionRefs.current[item.id];
        if (!section) return;

        const sectionTop = getSectionTop(section);
        const sectionBottom = sectionTop + section.offsetHeight;
        const visibleTop = Math.max(viewportTop, sectionTop);
        const visibleBottom = Math.min(viewportBottom, sectionBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const occupancy = visibleHeight / Math.max(content.clientHeight, 1);

        if (occupancy > maxOccupancy) {
          maxOccupancy = occupancy;
          bestSectionId = item.id;
        }
      });

      if (bestSectionId !== lastActiveSectionId.current && maxOccupancy > 0.1) {
        setActiveSection(bestSectionId);
      }
    };

    content.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => content.removeEventListener("scroll", handleScroll);
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex bg-[#e6e6e6]"
      role="dialog"
      aria-modal="true"
      aria-label={`AI PROJECT ${projectNumber}`}
      data-name="AI PROJECT 01 Detail Overlay"
    >
      <aside
        className="flex h-full w-[256px] min-w-[256px] max-w-[320px] shrink-0 flex-col gap-[32px] overflow-hidden bg-[#8a8a8a] px-[32px] pb-[32px] pt-[72px] backdrop-blur-[24px]"
        data-name="Navigation Section"
      >
        <button
          type="button"
          onClick={onClose}
          onMouseDown={(event) => event.preventDefault()}
          className="group flex w-full items-start gap-[4px] rounded-[7px] pr-[32px] text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/45"
        >
          <span className="relative flex size-[56px] shrink-0 items-center justify-center rounded-[7px]">
            <span className="flex size-[40px] items-center justify-center rounded-[2px] bg-white/15 text-white/70 transition-colors group-hover:bg-white/25 group-hover:text-white">
              <ArrowLeft size={18} strokeWidth={1.8} />
            </span>
          </span>
          <span className="flex min-w-px flex-1 flex-col items-start py-[8px] leading-none">
            <span className="font-['OPPOSans:Bold',sans-serif] text-[16px] leading-[24px] text-white/50 transition-colors group-hover:text-white/80">
              返回
            </span>
            <span className="font-['Inter:Regular',sans-serif] text-[12px] uppercase leading-[16px] tracking-[2px] text-white/30">
              go back
            </span>
          </span>
        </button>

        <div className="h-px w-full shrink-0 bg-white/10" />

        <nav className="flex w-full shrink-0 flex-col items-start gap-[28px]" aria-label={`AI PROJECT ${projectNumber} navigation`}>
          {AI_PROJECT_NAV_ITEMS.map((item) => (
            <AIProjectNavItem key={item.id} item={item} active={activeSectionId === item.id} onClick={() => scrollToSection(item.id)} />
          ))}
        </nav>
      </aside>

      <main
        id="ai-project-detail-content"
        ref={contentRef}
        className="min-w-0 flex-1 overflow-y-auto overflow-x-auto bg-[#e6e6e6] scroll-smooth scrollbar-hide [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="AI PROJECT 01 content"
      >
        <div className="flex min-w-[992px] flex-col items-center bg-[#e6e6e6] pb-[128px]" data-name="project 3">
          <ProjectOverviewSection sectionRef={setSectionRef("overview")} />
          <OpportunitySection sectionRef={setSectionRef("opportunity")} />
          <StrategySection sectionRef={setSectionRef("strategy")} />
          <ArchitectureSection sectionRef={setSectionRef("architecture")} />
          <ClosedLoopSection sectionRef={setSectionRef("closedLoop")} />
          <IterationSection sectionRef={setSectionRef("iteration")} />
        </div>
      </main>
    </div>,
    document.body,
  );
}
