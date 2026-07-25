import React, { useEffect, useRef } from "react";

import headingAi from "../../assets/ai-product-page/heading-ai.svg";
import headingHow from "../../assets/ai-product-page/heading-how.svg";
import headingProductize from "../../assets/ai-product-page/heading-productize.svg";
import businessLoopBullet from "../../assets/ai-product-page/business-loop-bullet.svg";
import businessLoopCornerBack from "../../assets/ai-product-page/business-loop-corner-back.svg";
import businessLoopCornerBackAlt from "../../assets/ai-product-page/business-loop-corner-back-alt.svg";
import businessLoopCornerFront from "../../assets/ai-product-page/business-loop-corner-front.svg";
import businessLoopDivider from "../../assets/ai-product-page/business-loop-divider.svg";
import businessLoopDividerStroke from "../../assets/ai-product-page/business-loop-divider-stroke.svg";
import businessLoopTagMark from "../../assets/ai-product-page/business-loop-tag-mark.svg";
import aiInteractionConversationalImage from "../../assets/ai-product-page/ai-interaction-conversational.png";
import aiInteractionTaskDrivenImage from "../../assets/ai-product-page/ai-interaction-task-driven.png";
import footerArrow from "../../assets/ai-product-page/footer-arrow.svg";
import flowArrow from "../../assets/ai-product-page/flow-arrow.svg";
import headerDivider from "../../assets/ai-product-page/header-divider.svg";
import projectGeoImage from "../../assets/ai-product-page/project-geo.png";
import projectPetImage from "../../assets/ai-product-page/project-pet.png";
import productLoopFlowArrow from "../../assets/ai-product-page/product-loop-flow-arrow.svg";
import productLoopMediumStepDivider from "../../assets/ai-product-page/product-loop-medium-step-divider.svg";
import productLoopMetricSpacer from "../../assets/ai-product-page/product-loop-metric-spacer.svg";
import productLoopMetricSpacerAlt from "../../assets/ai-product-page/product-loop-metric-spacer-alt.svg";
import productLoopNarrowStepDivider from "../../assets/ai-product-page/product-loop-narrow-step-divider.svg";
import productLoopSectionDivider from "../../assets/ai-product-page/product-loop-section-divider.svg";
import productLoopStepDivider from "../../assets/ai-product-page/product-loop-step-divider.svg";
import principlesGeoImage from "../../assets/ai-product-page/principles-geo.jpg";
import principlesHorizontalDivider from "../../assets/ai-product-page/principles-horizontal-divider.svg";
import principlesMediaDivider from "../../assets/ai-product-page/principles-media-divider.svg";
import principlesPetImage from "../../assets/ai-product-page/principles-pet.jpg";
import principlesVerticalDivider from "../../assets/ai-product-page/principles-vertical-divider.svg";
import tagMark from "../../assets/ai-product-page/tag-mark.svg";
import viewArrow from "../../assets/ai-product-page/view-arrow.svg";
import {
  AI_PRODUCT_PAGE_CONTENT,
  hasAiProductDetail,
  type AiProductAiInteractionCard,
  type AiProductBusinessLoopCard,
  type AiProductFeaturedProject,
  type AiProductLoopMetric,
  type AiProductLoopStep,
  type AiProductPrinciple,
} from "../data/aiProductPage";
import type { PortfolioProject } from "../data/portfolioProjects";

type ProjectData = PortfolioProject;

const FEATURED_IMAGE_BY_ID: Record<AiProductFeaturedProject["id"], string> = {
  "geo-platform": projectGeoImage,
  "pet-saas": projectPetImage,
};

const FEATURED_IMAGE_CLASS_BY_ID: Record<AiProductFeaturedProject["id"], string> = {
  "geo-platform": "absolute h-[128.35%] left-[-4.99%] max-w-none top-[-15.41%] w-[111.24%]",
  "pet-saas": "absolute inset-0 size-full object-cover",
};

const PRINCIPLES_MEDIA_IMAGE_BY_ID: Record<AiProductFeaturedProject["id"], string> = {
  "geo-platform": principlesGeoImage,
  "pet-saas": principlesPetImage,
};

const PRINCIPLES_MEDIA_IMAGE_CLASS_BY_ID: Record<AiProductFeaturedProject["id"], string> = {
  "geo-platform": "absolute h-[137.1%] left-[-5.02%] max-w-none top-[-21.37%] w-[110.03%]",
  "pet-saas": "absolute inset-0 size-full max-w-none rounded-[8px] object-cover pointer-events-none",
};

const CAPABILITY_STEP_BACKGROUNDS = [
  "bg-[rgba(94,94,94,0.06)]",
  "bg-[rgba(94,94,94,0.05)]",
  "bg-[rgba(94,94,94,0.04)]",
  "bg-[rgba(94,94,94,0.03)]",
  "bg-[rgba(94,94,94,0.02)]",
] as const;

const BUSINESS_LOOP_CORNER_BACK_BY_VARIANT: Record<AiProductBusinessLoopCard["cornerVariant"], string> = {
  back: businessLoopCornerBack,
  "back-alt": businessLoopCornerBackAlt,
};

const AI_INTERACTION_IMAGE_BY_ID: Record<AiProductAiInteractionCard["id"], string> = {
  conversational: aiInteractionConversationalImage,
  "task-driven": aiInteractionTaskDrivenImage,
};

const PRODUCT_LOOP_STEP_BACKGROUND_BY_TONE: Record<AiProductLoopStep["tone"], string> = {
  "white-subtle": "bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)),linear-gradient(90deg,#e6e6e6,#e6e6e6)]",
  "white-bright": "bg-[linear-gradient(90deg,rgba(255,255,255,0.25),rgba(255,255,255,0.25)),linear-gradient(90deg,#e6e6e6,#e6e6e6)]",
  "gray-muted": "bg-[linear-gradient(90deg,rgba(223,223,223,0.5),rgba(223,223,223,0.5)),linear-gradient(90deg,#e6e6e6,#e6e6e6)]",
  "gray-solid": "bg-[linear-gradient(90deg,#dfdfdf,#dfdfdf),linear-gradient(90deg,#e6e6e6,#e6e6e6)]",
};

const PRODUCT_LOOP_WIDTH_CLASS_BY_SIZE: Record<AiProductLoopStep["width"], string> = {
  fluid: "min-w-px flex-1",
  medium: "w-[220px] shrink-0",
  narrow: "w-[208px] shrink-0",
};

const PRODUCT_LOOP_DIVIDER_BY_SIZE: Record<AiProductLoopStep["width"], string> = {
  fluid: productLoopStepDivider,
  medium: productLoopMediumStepDivider,
  narrow: productLoopNarrowStepDivider,
};

type AiProductSectionId = "共同命题" | "路径连接" | "AI 产品方法";

function HeaderSection() {
  return (
    <header className="flex w-[864px] max-w-full flex-col items-start gap-[24px]">
      <div className="flex h-[72px] w-full items-center gap-[24px]" aria-label={AI_PRODUCT_PAGE_CONTENT.title}>
        <div className="relative h-[68.771px] w-[209.608px] shrink-0">
          <img alt="" className="absolute inset-0 size-full max-w-none" src={headingHow} />
        </div>
        <div className="relative h-[57.6px] w-[72.289px] shrink-0">
          <img alt="" className="absolute inset-0 size-full max-w-none" src={headingAi} />
        </div>
        <div className="relative h-[69.984px] w-[352.976px] shrink-0">
          <img alt="" className="absolute inset-0 size-full max-w-none" src={headingProductize} />
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-[8px]">
        <p className="font-['OPPOSans:Light',sans-serif] text-[18px] leading-[32px] text-[#474747]">
          {AI_PRODUCT_PAGE_CONTENT.intro}
        </p>
        <div className="flex flex-wrap items-start gap-[8px]">
          {AI_PRODUCT_PAGE_CONTENT.expertiseTags.map((tag) => (
            <div
              key={tag}
              className="flex h-[28px] shrink-0 items-center justify-center rounded-[4px] bg-[rgba(221,221,221,0.8)] py-[4px] pl-[16px] pr-[12px]"
            >
              <span className="font-['OPPOSans:Light',sans-serif] text-[10px] leading-[15px] tracking-[1px] text-[#474747]">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function SectionStatement({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex h-[32px] items-center justify-center gap-[8px] px-[4px]">
        <span className="font-['DINOT:Bold',sans-serif] text-center text-[20px] leading-[24px] text-[#474747] opacity-50 whitespace-nowrap">
          {number}
        </span>
        <img alt="" className="size-[4px] shrink-0" src={headerDivider} />
        <span className="font-['OPPOSans:Medium',sans-serif] text-center text-[20px] leading-[24px] text-[#474747] opacity-75 whitespace-nowrap">
          {label}
        </span>
      </div>
      <h2 className="font-['OPPOSans:Heavy',sans-serif] text-center text-[36px] leading-[64px] text-[#181818] opacity-85 whitespace-nowrap">
        {title}
      </h2>
      <p className="min-w-full w-[min-content] font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] uppercase">
        {description}
      </p>
    </div>
  );
}

function ViewLink({
  disabled,
  onClick,
  label = "VIEW",
}: {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-[23px] items-center gap-[8px] px-[8px] transition-opacity ${
        disabled ? "cursor-default" : "cursor-pointer hover:opacity-70"
      }`}
      aria-disabled={disabled}
    >
      <span className="font-['OPPOSans:Bold',sans-serif] text-[10px] leading-[20px] text-[#474747] uppercase">
        {label}
      </span>
      <img alt="" className="size-[9.333px] shrink-0" src={viewArrow} />
    </button>
  );
}

function FeaturedProjectCard({
  project,
  onOpenProjectDetail,
}: {
  project: AiProductFeaturedProject;
  onOpenProjectDetail?: (projectId: AiProductFeaturedProject["id"]) => void;
}) {
  const imageSrc = FEATURED_IMAGE_BY_ID[project.id];
  const imageClassName = FEATURED_IMAGE_CLASS_BY_ID[project.id];
  const canOpenProjectDetail = Boolean(onOpenProjectDetail) && hasAiProductDetail(project.id);

  const handleOpenProjectDetail = () => {
    if (!canOpenProjectDetail) return;
    onOpenProjectDetail?.(project.id);
  };

  const handleProjectKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!canOpenProjectDetail || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    handleOpenProjectDetail();
  };

  return (
    <section className="flex w-full flex-col items-start gap-[20px]">
      <div className="flex items-start gap-[12px] pt-[8px]">
        <div className="flex h-[48px] shrink-0 items-center">
          <div className="h-[26px] w-[6px] shrink-0 bg-[#474747] opacity-25" />
        </div>
        <div className="flex shrink-0 items-end gap-[4px] whitespace-nowrap text-[#474747]">
          <div className="flex shrink-0 flex-col justify-center font-['OPPOSans:Medium',sans-serif] text-[32px]">
            <p className="leading-[48px]">{project.pathLabel}</p>
          </div>
          <div className="flex shrink-0 flex-col justify-center font-['OPPOSans:Regular',sans-serif] text-[16px]">
            <p className="leading-[34px]">｜</p>
          </div>
          <div className="flex shrink-0 flex-col justify-center font-['OPPOSans:Regular',sans-serif] text-[16px]">
            <p className="leading-[34px]">{project.title}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-[12px]">
        <div
          className={`ai-product-project-card-frame relative h-[452px] w-[864px] shrink-0 ${canOpenProjectDetail ? "cursor-pointer" : ""}`}
          role={canOpenProjectDetail ? "button" : undefined}
          tabIndex={canOpenProjectDetail ? 0 : undefined}
          aria-label={`Open ${project.matchTitle} project detail`}
          onClick={canOpenProjectDetail ? handleOpenProjectDetail : undefined}
          onKeyDown={handleProjectKeyDown}
        >
          <div
            aria-hidden="true"
            className="ai-product-project-card-shadow absolute left-0 top-0 h-[452px] w-[864px] bg-[#474747] opacity-10"
          />
          <div
            className="ai-product-project-card-surface absolute left-0 top-0 w-[864px] border border-transparent border-solid shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)]"
            style={{
              borderImageSlice: 1,
              borderImageSource:
                "linear-gradient(180deg, rgba(173, 173, 173, 0.1), rgba(71, 71, 71, 0.1))",
            }}
          >
            <div className="flex w-full items-start gap-[64px] py-[32px] pl-[48px] pr-[32px]">
              <div className="flex w-[400px] shrink-0 flex-col justify-center gap-[16px] py-[12px]">
                <div className="flex flex-col gap-[4px]">
                  <p className="font-['OPPOSans:Regular',sans-serif] text-[12px] leading-[16px] tracking-[2px] text-[#474747] uppercase opacity-75">
                    {project.eyebrow}
                  </p>
                  <h4 className="font-['OPPOSans:Heavy',sans-serif] text-[24px] leading-[40px] text-[#474747]">
                    {project.matchTitle}
                  </h4>
                </div>
                <div className="flex flex-col gap-[12px] font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#1a1c1c]">
                  {project.description.map((paragraph) => (
                    <p key={paragraph} className="text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="relative min-w-px flex-1 self-stretch">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img alt={project.imageAlt} className={imageClassName} src={imageSrc} />
                </div>
              </div>
            </div>
            <div className="ai-product-project-card-tag-rail flex w-full items-start justify-between py-[16px] pl-[40px] pr-[32px]">
              <div className="flex items-start gap-[16px]">
                {project.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-[8px] self-stretch rounded-[4px] bg-[#e2e2e2] px-[8px] py-[4px]">
                    <span className="font-['OPPOSans:Medium',sans-serif] text-[10px] leading-[16px] tracking-[1px] text-[#474747] uppercase">
                      {tag}
                    </span>
                    <img alt="" className="size-[8px]" src={tagMark} />
                  </div>
                ))}
              </div>
              <ViewLink
                disabled={!canOpenProjectDetail}
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenProjectDetail();
                }}
              />
            </div>
            <div className="flex w-full items-start gap-[64px] pb-[28px] pl-[48px] pr-[32px] pt-[24px] text-[#1a1c1c]">
              <div className="flex w-[400px] shrink-0 flex-col items-start">
                <p className="w-[336px] font-['OPPOSans:Medium',sans-serif] text-[12px] leading-[24px]">
                  {project.insightTitle}
                </p>
                <p className="min-w-full w-[min-content] font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-justify">
                  {project.insight}
                </p>
              </div>
              <div className="flex min-w-px flex-1 flex-col items-start">
                <p className="font-['OPPOSans:Medium',sans-serif] text-[12px] leading-[24px]">
                  {project.outputTitle}
                </p>
                <p className="font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-justify">
                  {project.output}
                </p>
              </div>
            </div>
          </div>
        </div>
        {project.note ? (
          <p className="w-full font-['OPPOSans:Light',sans-serif] text-[10px] leading-[24px] text-[#5e5e5e] opacity-80">
            {project.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function LabeledSubsection({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="border-l-[2.4px] border-[rgba(71,71,71,0.35)] pl-[12px]">
        <h3 className="font-['OPPOSans:Medium',sans-serif] text-[20px] leading-[32px] text-[#474747]">
          {title}
        </h3>
      </div>
      {description ? (
        <p className="max-w-[760px] font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CapabilityFlow() {
  const { capabilityFlow } = AI_PRODUCT_PAGE_CONTENT;

  return (
    <section className="flex w-full flex-col gap-[20px]">
      <div className="flex gap-[12px] items-start relative w-full">
        <div className="flex h-[48px] items-center shrink-0">
          <div className="h-[26px] opacity-25 w-[6px] shrink-0 bg-[#474747]" />
        </div>
        <div className="flex min-w-px flex-1 flex-col items-start">
          <h3 className="w-full font-['OPPOSans:Medium',sans-serif] text-[32px] leading-[48px] text-[#474747]">
            {capabilityFlow.title}
          </h3>
          <div className="flex w-full items-center justify-center px-[4px]">
            <p className="min-w-px flex-1 font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] uppercase">
              {capabilityFlow.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-[23px] bg-[#e2e2e2] px-[48px] py-[32px]">
        <p className="w-full font-['OPPOSans:Medium',sans-serif] text-[12px] leading-[24px] text-[#474747] opacity-65">
          {capabilityFlow.intro}
        </p>
        <div className="flex w-full gap-[16px] items-center justify-center">
        {capabilityFlow.steps.map((step, index) => (
          <React.Fragment key={step}>
              <div
                className={`flex h-[40px] w-[108px] shrink-0 items-center justify-center rounded-[8px] border border-[rgba(94,94,94,0.25)] border-solid ${
                  CAPABILITY_STEP_BACKGROUNDS[index] ?? CAPABILITY_STEP_BACKGROUNDS[CAPABILITY_STEP_BACKGROUNDS.length - 1]
                } px-[12px] py-[8px]`}
              >
                <span className="font-['OPPOSans:Medium',sans-serif] text-[12px] leading-[24px] text-[#474747] uppercase whitespace-nowrap">
                {step}
              </span>
            </div>
              {index < capabilityFlow.steps.length - 1 ? <FlowConnector /> : null}
          </React.Fragment>
        ))}
        </div>
        <p className="w-full font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] text-justify uppercase">
          {capabilityFlow.conclusion}
        </p>
      </div>
    </section>
  );
}

function FlowConnector() {
  return (
    <div className="flex h-[14px] w-[25px] shrink-0 gap-px items-center opacity-15 relative">
      <div className="h-[6px] min-w-px flex-1 bg-[#5e5e5e]" />
      <div className="h-[6px] min-w-px flex-1 bg-[#5e5e5e]" />
      <div className="h-[6px] min-w-px flex-1 bg-[#5e5e5e]" />
      <div className="relative h-[14px] w-[8px] shrink-0">
        <div className="absolute inset-[6.87%_5.19%_6.87%_0]">
          <img alt="" className="block max-w-none size-full" src={flowArrow} />
        </div>
      </div>
    </div>
  );
}

function BusinessLoop() {
  const { businessLoop } = AI_PRODUCT_PAGE_CONTENT;
  const cardRows = [businessLoop.cards.slice(0, 2), businessLoop.cards.slice(2, 4)];

  return (
    <section className="flex h-[1024px] w-full flex-col gap-[20px]">
      <div className="flex gap-[12px] items-start relative w-full">
        <div className="flex h-[48px] items-center shrink-0">
          <div className="h-[26px] opacity-25 w-[6px] shrink-0 bg-[#474747]" />
        </div>
        <div className="flex min-w-px flex-1 flex-col items-start">
          <h3 className="w-full font-['OPPOSans:Medium',sans-serif] text-[32px] leading-[48px] text-[#474747]">
            {businessLoop.title}
          </h3>
          <div className="flex w-full items-center justify-center px-[4px]">
            <p className="min-w-px flex-1 font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] uppercase">
              {businessLoop.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-[932px] w-full flex-col gap-[32px]">
        {cardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex h-[422px] w-full gap-[32px]">
            {row.map((card) => (
              <BusinessLoopCard key={card.title} card={card} />
            ))}
          </div>
        ))}
        <p className="font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] text-center uppercase w-full">
          {businessLoop.conclusion}
        </p>
      </div>
    </section>
  );
}

function BusinessLoopCard({ card }: { card: AiProductBusinessLoopCard }) {
  return (
    <article
      className={`relative flex h-[422px] min-w-px flex-1 flex-col items-start pb-[12px] ${
        card.tone === "muted"
          ? "bg-[rgba(221,221,221,0.5)] overflow-clip"
          : "bg-[rgba(255,255,255,0.25)]"
      }`}
    >
      <div className="flex h-[88px] w-full shrink-0 items-center justify-center py-[20px]">
        <h4 className="min-w-px flex-1 font-['OPPOSans:Medium',sans-serif] text-[24px] text-center leading-[48px] text-[#474747]">
          {card.title}
        </h4>
      </div>
      <div className="relative h-[3px] w-full shrink-0">
        <img alt="" className="absolute inset-0 block max-w-none size-full" src={businessLoopDividerStroke} />
      </div>
      <div className="flex h-[108px] w-full shrink-0 flex-col items-start pb-[16px] pt-[20px] px-[48px]">
        <BusinessLoopLabel label="GEO项目中的边界" uppercase />
        <p className="h-[48px] w-full shrink-0 font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] text-justify uppercase">
          {card.geoBoundary}
        </p>
      </div>
      <BusinessLoopDivider />
      <div className="flex h-[72px] w-full shrink-0 flex-col items-start px-[48px] py-[24px]">
        <p className="w-full shrink-0 font-['OPPOSans:Medium',sans-serif] text-[16px] leading-[24px] text-[#5e5e5e] uppercase">
          {card.shift}
        </p>
      </div>
      <BusinessLoopDivider />
      <div className="flex h-[136px] w-full shrink-0 flex-col items-start px-[48px] py-[16px]">
        <BusinessLoopLabel label="宠物SaaS中的重构" />
        <div className="flex h-[80px] w-full shrink-0 flex-col items-start gap-[8px]">
          <p className="min-w-full w-[min-content] font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] text-justify uppercase">
            {card.saasRestructure}
          </p>
          <div className="flex shrink-0 items-start gap-[8px]">
            {card.tags.map((tag) => (
              <BusinessLoopChip key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-0.02px] flex h-[24px] w-[25px] items-center justify-center right-0">
        <div className="flex-none rotate-180">
          <div className="relative h-[24px] w-[25px]">
            <img
              alt=""
              className="absolute inset-0 block max-w-none size-full"
              src={BUSINESS_LOOP_CORNER_BACK_BY_VARIANT[card.cornerVariant]}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-0.02px] h-[24px] right-0 w-[25px]">
        <img alt="" className="absolute inset-0 block max-w-none size-full" src={businessLoopCornerFront} />
      </div>
    </article>
  );
}

function BusinessLoopLabel({ label, uppercase = false }: { label: string; uppercase?: boolean }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-[8px]">
      <div className="relative size-[8px] shrink-0">
        <img alt="" className="absolute inset-0 block max-w-none size-full" src={businessLoopBullet} />
      </div>
      <p
        className={`w-[336px] shrink-0 font-['OPPOSans:Medium',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] ${
          uppercase ? "uppercase" : ""
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function BusinessLoopDivider() {
  return (
    <div className="relative h-0 w-full shrink-0">
      <div className="absolute inset-[-0.5px_0]">
        <img alt="" className="block max-w-none size-full" src={businessLoopDivider} />
      </div>
    </div>
  );
}

function BusinessLoopChip({ label }: { label: string }) {
  return (
    <div className="flex h-[24px] shrink-0 items-center gap-[8px] rounded-[4px] bg-[#e6e6e6] px-[8px] py-[4px]">
      <span className="font-['OPPOSans:Medium',sans-serif] text-[10px] leading-[16px] tracking-[1px] text-[#474747] uppercase whitespace-nowrap">
        {label}
      </span>
      <img alt="" className="size-[8px] shrink-0" src={businessLoopTagMark} />
    </div>
  );
}

function AiInteraction() {
  const { aiInteraction } = AI_PRODUCT_PAGE_CONTENT;

  return (
    <section className="flex h-[820px] w-full flex-col gap-[24px]">
      <div className="flex gap-[12px] items-start relative w-full">
        <div className="flex h-[48px] items-center shrink-0">
          <div className="h-[26px] opacity-25 w-[6px] shrink-0 bg-[#474747]" />
        </div>
        <div className="flex min-w-px flex-1 flex-col items-start">
          <h3 className="w-full font-['OPPOSans:Medium',sans-serif] text-[32px] leading-[48px] text-[#474747]">
            {aiInteraction.title}
          </h3>
          <div className="flex w-full items-center justify-center px-[4px]">
            <p className="min-w-px flex-1 font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] uppercase">
              {aiInteraction.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-[724px] w-full gap-[32px]">
        {aiInteraction.cards.map((card) => (
          <AiInteractionCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

function AiInteractionCard({ card }: { card: AiProductAiInteractionCard }) {
  return (
    <div className="flex h-full min-w-px flex-1 flex-col items-start justify-center gap-[10px]">
      <div className="relative min-h-px w-[416px] flex-1 rounded-tl-[36px] rounded-tr-[36px] rounded-bl-[24px] rounded-br-[24px]">
        <img
          alt={card.imageAlt}
          className="absolute inset-0 size-full max-w-none rounded-tl-[36px] rounded-tr-[36px] rounded-bl-[24px] rounded-br-[24px] object-cover pointer-events-none"
          src={AI_INTERACTION_IMAGE_BY_ID[card.id]}
        />
      </div>
      <p className="min-w-full font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#181818] text-center uppercase w-[min-content]">
        {card.caption}
      </p>
    </div>
  );
}

function ProductLoop() {
  const { productLoop } = AI_PRODUCT_PAGE_CONTENT;

  return (
    <section className="flex h-[625px] w-full flex-col gap-[20px]">
      <div className="flex gap-[12px] items-start relative w-full">
        <div className="flex h-[48px] items-center shrink-0">
          <div className="h-[26px] opacity-25 w-[6px] shrink-0 bg-[#474747]" />
        </div>
        <div className="flex min-w-px flex-1 flex-col items-start">
          <h3 className="w-full font-['OPPOSans:Medium',sans-serif] text-[32px] leading-[48px] text-[#474747]">
            {productLoop.title}
          </h3>
          <div className="flex w-full items-center justify-center px-[4px]">
            <p className="min-w-px flex-1 font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] uppercase">
              {productLoop.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-[533px] w-full shrink-0 flex-col items-start bg-[rgba(221,221,221,0.5)]">
        <div className="flex flex-col gap-[20px] items-end pb-[36px] pt-[28px] px-[48px] relative w-full">
          <p className="w-full font-['OPPOSans:Medium',sans-serif] text-[12px] leading-[24px] text-[#474747] opacity-65">
            {productLoop.intro}
          </p>
          <div className="flex flex-col gap-[20px] items-start w-full">
            <div className="flex gap-[12px] items-center justify-center w-full">
              <ProductLoopStepCard step={productLoop.topSteps[0]} />
              <ProductLoopConnector opacityClass="opacity-25" />
              <ProductLoopStepCard step={productLoop.topSteps[1]} />
              <ProductLoopConnector opacityClass="opacity-20" />
              <ProductLoopStepCard step={productLoop.topSteps[2]} />
            </div>
            <div className="flex w-full items-start justify-between">
              <div className="flex min-w-px flex-1 gap-[12px] items-center">
                <div className="flex shrink-0 items-center justify-center pl-[93px]">
                  <ProductLoopVerticalConnector direction="up" opacityClass="opacity-30" />
                </div>
                <p className="min-w-px flex-1 font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#5e5e5e] uppercase">
                  {productLoop.feedback}
                </p>
              </div>
              <div className="flex w-[200px] shrink-0 items-center justify-center">
                <ProductLoopVerticalConnector direction="down" opacityClass="opacity-15" />
              </div>
            </div>
            <div className="flex gap-[12px] items-center justify-center w-full">
              <ProductLoopStepCard step={productLoop.bottomSteps[0]} />
              <div className="flex shrink-0 items-center justify-center">
                <div className="-scale-y-100 flex-none rotate-180">
                  <ProductLoopConnector opacityClass="opacity-25" />
                </div>
              </div>
              <ProductLoopStepCard step={productLoop.bottomSteps[1]} />
              <div className="flex shrink-0 items-center justify-center">
                <div className="-scale-y-100 flex-none rotate-180">
                  <ProductLoopConnector opacityClass="opacity-20" />
                </div>
              </div>
              <ProductLoopStepCard step={productLoop.bottomSteps[2]} />
            </div>
          </div>
        </div>
        <ProductLoopSectionDivider />
        <div className="flex w-full flex-col gap-[20px] items-start justify-center pb-[36px] pt-[28px] px-[48px]">
          <p className="w-full font-['OPPOSans:Medium',sans-serif] text-[12px] leading-[24px] text-[#474747] opacity-65 uppercase">
            {productLoop.metricsLabel}
          </p>
          <div className="flex w-full gap-[12px] items-center">
            <ProductLoopMetricCard metric={productLoop.metrics[0]} />
            <div className="relative h-[8px] w-[32px] shrink-0">
              <img alt="" className="absolute inset-0 block max-w-none size-full" src={productLoopMetricSpacer} />
            </div>
            <ProductLoopMetricCard metric={productLoop.metrics[1]} />
            <div className="relative h-[8px] w-[32px] shrink-0">
              <img alt="" className="absolute inset-0 block max-w-none size-full" src={productLoopMetricSpacerAlt} />
            </div>
            <ProductLoopMetricCard metric={productLoop.metrics[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductLoopStepCard({ step }: { step: AiProductLoopStep }) {
  const widthClassName = PRODUCT_LOOP_WIDTH_CLASS_BY_SIZE[step.width];
  const dividerSrc = PRODUCT_LOOP_DIVIDER_BY_SIZE[step.width];

  return (
    <div
      className={`flex h-[84px] ${widthClassName} flex-col items-start rounded-[8px] border border-[rgba(94,94,94,0.15)] border-solid ${PRODUCT_LOOP_STEP_BACKGROUND_BY_TONE[step.tone]}`}
    >
      <div className="flex shrink-0 items-center pl-[16px] py-[8px]">
        <div className="flex shrink-0 flex-col justify-center font-['OPPOSans:Medium',sans-serif] text-[14px] text-[#474747] uppercase whitespace-nowrap">
          <ul>
            <li className="list-disc ms-[21px]">
              <span className="leading-[28px]">{step.title}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative h-0 w-full shrink-0">
        <div className="absolute inset-[-0.5px_0]">
          <img alt="" className="block max-w-none size-full" src={dividerSrc} />
        </div>
      </div>
      <div className="flex w-full items-center px-[16px] py-[8px]">
        <p className="min-w-px flex-1 font-['OPPOSans:Regular',sans-serif] text-[12px] leading-[24px] text-[#474747] opacity-65 uppercase whitespace-nowrap">
          {step.description}
        </p>
      </div>
    </div>
  );
}

function ProductLoopConnector({ opacityClass }: { opacityClass: string }) {
  return (
    <div className={`flex w-[32px] shrink-0 gap-px items-center ${opacityClass}`}>
      <div className="h-[6px] min-w-px flex-1 bg-[#5e5e5e]" />
      <div className="h-[6px] min-w-px flex-1 bg-[#5e5e5e]" />
      <div className="h-[6px] min-w-px flex-1 bg-[#5e5e5e]" />
      <div className="relative h-[14px] w-[8px] shrink-0">
        <div className="absolute inset-[6.87%_5.19%_6.87%_0]">
          <img alt="" className="block max-w-none size-full" src={productLoopFlowArrow} />
        </div>
      </div>
    </div>
  );
}

function ProductLoopVerticalConnector({
  direction,
  opacityClass,
}: {
  direction: "up" | "down";
  opacityClass: string;
}) {
  const transformClassName = direction === "up" ? "-rotate-90 -scale-y-100" : "rotate-90";

  return (
    <div className="flex h-[24.667px] w-[14px] shrink-0 items-center justify-center">
      <div className={`flex-none ${transformClassName}`}>
        <div className={`flex items-center gap-px ${opacityClass}`}>
          <div className="h-[6px] w-[7.333px] shrink-0 bg-[#5e5e5e]" />
          <div className="h-[6px] w-[7.333px] shrink-0 bg-[#5e5e5e]" />
          <div className="relative h-[14px] w-[8px] shrink-0">
            <div className="absolute inset-[6.87%_5.19%_6.87%_0]">
              <img alt="" className="block max-w-none size-full" src={productLoopFlowArrow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductLoopSectionDivider() {
  return (
    <div className="relative h-0 w-full shrink-0">
      <div className="absolute inset-[-0.5px_0]">
        <img alt="" className="block max-w-none size-full" src={productLoopSectionDivider} />
      </div>
    </div>
  );
}

function ProductLoopMetricCard({ metric }: { metric: AiProductLoopMetric }) {
  const widthClassName = PRODUCT_LOOP_WIDTH_CLASS_BY_SIZE[metric.width];
  const dividerSrc = PRODUCT_LOOP_DIVIDER_BY_SIZE[metric.width];
  const backgroundClassName =
    metric.tone === "soft"
      ? "bg-[rgba(94,94,94,0.02)]"
      : metric.tone === "medium"
        ? "bg-[rgba(94,94,94,0.04)]"
        : "bg-[rgba(94,94,94,0.06)]";

  return (
    <div
      className={`flex h-[84px] ${widthClassName} flex-col items-start rounded-[8px] border border-[rgba(94,94,94,0.15)] border-dashed ${backgroundClassName}`}
    >
      <div className="flex w-full shrink-0 items-center justify-center px-[16px] py-[8px]">
        <p className="font-['OPPOSans:Medium',sans-serif] text-[14px] leading-[28px] text-[#474747] uppercase whitespace-nowrap">
          {metric.title}
        </p>
      </div>
      <div className="relative h-0 w-full shrink-0">
        <div className="absolute inset-[-0.5px_0]">
          <img alt="" className="block max-w-none size-full" src={dividerSrc} />
        </div>
      </div>
      <div className="flex w-full items-center justify-center px-[16px] py-[8px]">
        <p className="min-w-px flex-1 font-['OPPOSans:Regular',sans-serif] text-[12px] leading-[24px] text-center text-[#474747] opacity-65 uppercase whitespace-nowrap">
          {metric.description}
        </p>
      </div>
    </div>
  );
}

function PrincipleCard({ principle }: { principle: AiProductPrinciple }) {
  return (
    <div className="flex flex-1 gap-[20px] items-start min-w-px pb-[20px] pt-[24px] px-[24px]">
      <div className="flex size-[28px] shrink-0 items-center justify-center rounded-[4px] opacity-50">
        <span className="translate-y-[2px] font-['DINOT:Bold',sans-serif] text-center text-[18px] leading-[20px] tracking-[2px] text-[#474747] whitespace-nowrap">
          {principle.number}
        </span>
      </div>
      <div className="flex min-w-px flex-1 flex-col items-start text-[#474747]">
        <span className="font-['OPPOSans:Medium',sans-serif] text-[16px] leading-[28px]">{principle.strongText}</span>
        <span className="font-['OPPOSans:Light',sans-serif] text-[14px] leading-[28px]">{principle.lightText}</span>
      </div>
    </div>
  );
}

function PrinciplesGrid() {
  const [firstRow, secondRow] = [
    AI_PRODUCT_PAGE_CONTENT.principles.slice(0, 2),
    AI_PRODUCT_PAGE_CONTENT.principles.slice(2, 4),
  ];

  return (
    <div className="flex w-full flex-col items-start bg-[rgba(221,221,221,0.5)]">
      <div className="flex w-full shrink-0 items-start">
        <PrincipleCard principle={firstRow[0]} />
        <PrinciplesDividerVertical />
        <PrincipleCard principle={firstRow[1]} />
      </div>
      <PrinciplesDividerHorizontal />
      <div className="flex w-full shrink-0 items-start">
        <PrincipleCard principle={secondRow[0]} />
        <PrinciplesDividerVertical />
        <PrincipleCard principle={secondRow[1]} />
      </div>
    </div>
  );
}

function PrinciplesDividerVertical() {
  return (
    <div className="relative self-stretch shrink-0 w-0">
      <div className="absolute inset-[0_-0.5px]">
        <img alt="" className="block max-w-none size-full" src={principlesVerticalDivider} />
      </div>
    </div>
  );
}

function PrinciplesDividerHorizontal() {
  return (
    <div className="relative h-0 w-full shrink-0">
      <div className="absolute inset-[-0.5px_0]">
        <img alt="" className="block max-w-none size-full" src={principlesHorizontalDivider} />
      </div>
    </div>
  );
}

function PrinciplesMedia({
  featuredProjects,
  onOpenProjectDetail,
}: {
  featuredProjects: readonly AiProductFeaturedProject[];
  onOpenProjectDetail?: (projectId: AiProductFeaturedProject["id"]) => void;
}) {
  return (
    <div className="flex gap-[16px] items-start relative shrink-0 w-[864px]">
      {featuredProjects.map((project, index) => {
        const canOpenProjectDetail = Boolean(onOpenProjectDetail) && hasAiProductDetail(project.id);

        return (
          <React.Fragment key={project.id}>
            <div className="flex min-w-px flex-1 flex-col items-center gap-[12px]">
              <div className="relative h-[248px] w-full shrink-0 overflow-hidden rounded-[8px]">
                <img
                  alt={project.imageAlt}
                  className={PRINCIPLES_MEDIA_IMAGE_CLASS_BY_ID[project.id]}
                  src={PRINCIPLES_MEDIA_IMAGE_BY_ID[project.id]}
                />
              </div>
              <div className="flex w-full shrink-0 items-center justify-between">
                <p
                  className={`font-['OPPOSans:Light',sans-serif] text-[12px] leading-[24px] text-[#181818] ${
                    project.id === "geo-platform" ? "text-center uppercase whitespace-nowrap" : "text-center w-[336px]"
                  }`}
                >
                  {project.id === "geo-platform"
                    ? "GEO平台：展示AI能力如何被组织为可复用的产品机制"
                    : "宠物AI经营中枢 PetMind：展示这些产品机制如何进入垂直行业工作流"}
                </p>
                <ViewLink
                  disabled={!canOpenProjectDetail}
                  onClick={() => {
                    if (!canOpenProjectDetail) return;
                    onOpenProjectDetail?.(project.id);
                  }}
                />
              </div>
            </div>
            {index === 0 ? (
              <div className="relative h-[248px] w-[8px] shrink-0">
                <img alt="" className="absolute inset-0 block max-w-none size-full" src={principlesMediaDivider} />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function FooterNavigation({
  onNavigateToUxDesign,
  onNavigateToResume,
}: {
  onNavigateToUxDesign?: () => void;
  onNavigateToResume?: () => void;
}) {
  const handlers = {
    "ux-design": onNavigateToUxDesign,
    resume: onNavigateToResume,
  } as const;

  return (
    <nav className="ai-product-footer-nav flex h-[250px] w-[864px] max-w-full flex-col pt-[64px]">
      {AI_PRODUCT_PAGE_CONTENT.footerLinks.map((link) => {
        const onClick = handlers[link.view as keyof typeof handlers];

        return (
          <button
            key={link.label}
            type="button"
            onClick={onClick}
            className="ai-product-footer-row flex h-[93px] w-full items-center justify-between bg-transparent px-[16px] pb-[33px] pt-[32px] text-left"
          >
            <span className="flex items-center gap-[24px]">
              <span className="flex size-[28px] shrink-0 items-center justify-center rounded-[4px] opacity-50">
                <span className="font-['DINOT:Bold',sans-serif] text-center text-[18px] leading-[20px] tracking-[1px] text-[#474747] whitespace-nowrap">
                  {link.number}
                </span>
              </span>
              <span className="font-['OPPOSans:Bold',sans-serif] text-[20px] leading-[28px] text-[#474747] opacity-75">
                {link.label}
              </span>
            </span>
            <span className="flex items-center gap-[47.99px]">
              <span className="font-['OPPOSans:Regular',sans-serif] text-[12px] leading-[16px] tracking-[1.2px] text-[#474747] uppercase">
                {link.helper}
              </span>
              <img alt="" className="size-[8.75px]" src={footerArrow} />
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function AIProductContent({
  projects,
  externalOpenRequest,
  onExternalOpenHandled,
  onNavigateToUxDesign,
  onNavigateToResume,
  onActiveSectionChange,
  onOpenProjectDetail,
}: {
  projects: ProjectData[];
  externalOpenRequest?: { projectId: string; requestKey: number } | null;
  onExternalOpenHandled?: () => void;
  onNavigateToUxDesign?: () => void;
  onNavigateToResume?: () => void;
  onActiveSectionChange?: (section: AiProductSectionId) => void;
  onOpenProjectDetail?: (projectId: AiProductFeaturedProject["id"]) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const thesisRef = useRef<HTMLDivElement>(null);
  const abstractionRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const lastReportedSection = useRef<AiProductSectionId>("共同命题");
  const isClickScrolling = useRef(false);

  useEffect(() => {
    if (!externalOpenRequest) return;
    onExternalOpenHandled?.();
  }, [externalOpenRequest, onExternalOpenHandled, projects]);

  useEffect(() => {
    const getScrollContainer = () => rootRef.current?.parentElement ?? null;
    const sectionRefs: Record<AiProductSectionId, React.RefObject<HTMLDivElement | null>> = {
      "共同命题": thesisRef,
      "路径连接": abstractionRef,
      "AI 产品方法": principlesRef,
    };

    const getSectionTop = (section: HTMLDivElement, container: HTMLElement) => {
      return section.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
    };

    const scrollToSection = (sectionId: AiProductSectionId) => {
      const container = getScrollContainer();
      const section = sectionRefs[sectionId]?.current;

      if (!container || !section) {
        return;
      }

      isClickScrolling.current = true;
      container.scrollTo({
        top: getSectionTop(section, container),
        behavior: "smooth",
      });

      window.setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    };

    const handleNavClick = (event: Event) => {
      const targetSection = (event as CustomEvent<{ tab?: AiProductSectionId }>).detail?.tab ?? lastReportedSection.current;
      scrollToSection(targetSection);
    };

    const handleScroll = () => {
      const container = getScrollContainer();
      if (!container || isClickScrolling.current) {
        return;
      }

      const viewportTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const viewportBottom = viewportTop + viewportHeight;
      let bestSection = lastReportedSection.current;
      let maxOccupancy = 0;

      Object.entries(sectionRefs).forEach(([id, ref]) => {
        const section = ref.current;
        if (!section) {
          return;
        }

        const sectionTop = getSectionTop(section, container);
        const sectionBottom = sectionTop + section.offsetHeight;
        const visibleTop = Math.max(viewportTop, sectionTop);
        const visibleBottom = Math.min(viewportBottom, sectionBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const occupancy = visibleHeight / viewportHeight;

        if (occupancy > maxOccupancy) {
          maxOccupancy = occupancy;
          bestSection = id as AiProductSectionId;
        }
      });

      if (bestSection !== lastReportedSection.current && maxOccupancy > 0.1) {
        lastReportedSection.current = bestSection;
        onActiveSectionChange?.(bestSection);
      }
    };

    const container = getScrollContainer();
    window.addEventListener("ai-product-nav-click", handleNavClick);
    container?.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("ai-product-nav-click", handleNavClick);
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [onActiveSectionChange]);

  return (
    <div ref={rootRef} className="flex w-full flex-col items-center gap-[128px] bg-[#e6e6e6] py-[128px]" data-name="五版select cases">
      <HeaderSection />

      <main ref={thesisRef} className="flex w-[864px] max-w-full flex-col items-start gap-[96px] py-[24px]">
        <SectionStatement {...AI_PRODUCT_PAGE_CONTENT.thesis} />
        {AI_PRODUCT_PAGE_CONTENT.featuredProjects.map((featuredProject) => (
            <FeaturedProjectCard
              key={featuredProject.id}
              project={featuredProject}
              onOpenProjectDetail={onOpenProjectDetail}
            />
        ))}
      </main>

      <section ref={abstractionRef} className="flex w-[864px] max-w-full flex-col items-start gap-[96px] py-[24px]">
        <SectionStatement {...AI_PRODUCT_PAGE_CONTENT.abstraction} />
        <CapabilityFlow />
        <BusinessLoop />
        <AiInteraction />
        <ProductLoop />
      </section>

      <section ref={principlesRef} className="flex w-[864px] max-w-full flex-col items-start gap-[96px] py-[24px]">
        <SectionStatement {...AI_PRODUCT_PAGE_CONTENT.principlesSection} />
        <PrinciplesGrid />
        <PrinciplesMedia
          featuredProjects={AI_PRODUCT_PAGE_CONTENT.featuredProjects}
          onOpenProjectDetail={onOpenProjectDetail}
        />
      </section>

      <div className="w-[864px] max-w-full font-['OPPOSans:Light',sans-serif] text-[24px] leading-[48px] text-[#474747] text-center">
        {AI_PRODUCT_PAGE_CONTENT.closing.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <FooterNavigation
        onNavigateToResume={onNavigateToResume}
        onNavigateToUxDesign={onNavigateToUxDesign}
      />
    </div>
  );
}
