import React from "react";
import svgPaths from "../../imports/Frame1321318823-1/svg-gwftmbd6ul";
import {
  type ResumeUxCardGroupBlock,
  type ResumeUxCase as ResumeUxCaseContent,
  type ResumeUxGroupCard,
  type ResumeUxLargeCardBlock,
} from "../data/resumeContent";
import imgBackground from "figma:asset/ece298d0ec2c16f10310d45724b276a6035cb503.png";
import imgProject1 from "figma:asset/5ca464b2982af38ac9a7ea1866701ae60a833af0.png";
import imgProject2 from "figma:asset/b57462095e3076343086f74b716392073cba5aec.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function Blockquote({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="max-w-[768px] relative shrink-0 w-full" data-name="Blockquote">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center max-w-[inherit] relative size-full">
        <div className="flex flex-col font-['OPPOSans','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[30px] text-center">
          <p className="leading-[40px] mb-0 whitespace-nowrap">{line1}</p>
          <p className="leading-[40px] whitespace-nowrap">{line2}</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ content }: { content: ResumeUxCaseContent }) {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="HorizontalBorder">
      <div className="flex flex-col gap-[8px] items-start relative">
        <div className="flex flex-col font-['Manrope','Noto_Sans_JP','Noto_Sans_SC',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[30px] uppercase whitespace-nowrap">
          <p className="leading-[36px]">{content.sectionTitle}</p>
        </div>
        <div className="flex flex-col font-['OPPOSans','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">
          <p className="leading-[20px]">{content.sectionSubtitle}</p>
        </div>
      </div>
      <div className="flex flex-col font-['Manrope',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c6c6c6] text-[36px] text-right">
        <p className="leading-[40px]">{content.sectionNumber}</p>
      </div>
    </div>
  );
}

function ProjectCardLarge({
  title,
  description,
  category,
  tags,
  mediaUrl,
  mediaType,
  fallbackImage,
  id,
  linkedPortfolioProjectId,
  onOpenLinkedProject,
}: {
  title: string;
  description: string;
  category: string;
  tags: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  fallbackImage?: string;
  id: string;
  linkedPortfolioProjectId?: string;
  onOpenLinkedProject?: (projectId: string) => void;
}) {
  const linkedProjectId = linkedPortfolioProjectId?.trim();
  const isLinked = Boolean(linkedProjectId);

  return (
    <div
      className={`group content-stretch flex flex-col gap-[32px] items-start relative w-full ${
        isLinked ? "cursor-pointer" : ""
      }`}
      role={isLinked ? "button" : undefined}
      tabIndex={isLinked ? 0 : undefined}
      aria-label={isLinked ? `Open linked project for ${title}` : undefined}
      title={isLinked ? "Open linked project" : undefined}
      onClick={() => {
        if (linkedProjectId) {
          onOpenLinkedProject?.(linkedProjectId);
        }
      }}
      onKeyDown={(event) => {
        if (!linkedProjectId) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenLinkedProject?.(linkedProjectId);
        }
      }}
    >
      <div className="h-[370px] overflow-clip relative rounded-[2px] shrink-0 w-full bg-[#111]">
        {mediaUrl && mediaType === "video" ? (
            <video autoPlay className="absolute inset-0 max-w-none object-cover size-full" loop muted playsInline>
              <source src={mediaUrl} />
            </video>
        ) : (
            <ImageWithFallback alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={mediaUrl || fallbackImage} />
        )}
      </div>
      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
        <div className="flex flex-col gap-[12px] items-start max-w-[576px]">
          <div className="flex gap-[12px] items-center">
            <div className="bg-[#e2e2e2] px-[12px] py-[4px] rounded-[12px]">
                <p className="font-['Inter','Noto_Sans_JP','Noto_Sans_SC',sans-serif] font-bold text-[#474747] text-[10px] tracking-[1px] uppercase">{category}</p>
            </div>
            <p className="font-['Manrope',sans-serif] font-medium text-[#5e5e5e] text-[12px]">{id}</p>
          </div>
          <p className="font-['Manrope','Noto_Sans_JP','Noto_Sans_SC',sans-serif] font-bold text-[30px] text-black tracking-[-1px]">{title}</p>
          <p className="font-['OPPOSans','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-normal text-[15px] text-[rgba(26,28,28,0.7)] text-justify tracking-[1px] leading-[28px] pt-[4px]">{description}</p>
        </div>
        <div className="flex flex-col gap-[8px] items-end">
          <p className="font-['Manrope',sans-serif] font-bold text-[#777] text-[10px] uppercase">PC</p>
          <p className="font-['OPPOSans','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-medium text-[#1a1c1c] text-[12px] text-right uppercase">{tags}</p>
          <button
            type="button"
            disabled={!isLinked}
            className={`mt-[16px] flex gap-[8px] items-center border-0 bg-transparent p-0 text-left transition-colors ${
              isLinked ? "cursor-pointer group" : "cursor-not-allowed"
            }`}
            onClick={(event) => {
              event.stopPropagation();
              if (linkedProjectId) {
                onOpenLinkedProject?.(linkedProjectId);
              }
            }}
          >
            <p className={`font-['Inter',sans-serif] font-bold text-[12px] tracking-[1.2px] uppercase ${
              isLinked ? "text-[#1a1c1c] group-hover:underline" : "text-[#a8a8a8]"
            }`}>EXPLORE SYSTEM</p>
            <div className={`size-[9px] transition-transform duration-200 ease-out ${isLinked ? "group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" : ""}`}>
                <svg viewBox="0 0 10 10" fill="none">
                    <path d={svgPaths.pce77c00} fill={isLinked ? "#1A1C1C" : "#A8A8A8"} />
                </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectCardMedium({
  title,
  description,
  category,
  imgBg,
  id,
  actionLabel,
  imageClassName,
  descriptionClassName,
  linkedPortfolioProjectId,
  onOpenLinkedProject,
}: {
  title: string;
  description: string;
  category: string;
  imgBg: string;
  id: string;
  actionLabel: string;
  imageClassName: string;
  descriptionClassName?: string;
  linkedPortfolioProjectId?: string;
  onOpenLinkedProject?: (projectId: string) => void;
}) {
  const linkedProjectId = linkedPortfolioProjectId?.trim();
  const isLinked = Boolean(linkedProjectId);

  return (
    <div
      className={`group flex flex-col gap-[24px] items-start relative w-full ${isLinked ? "cursor-pointer" : ""}`}
      role={isLinked ? "button" : undefined}
      tabIndex={isLinked ? 0 : undefined}
      aria-label={isLinked ? `Open linked project for ${title}` : undefined}
      title={isLinked ? "Open linked project" : undefined}
      onClick={() => {
        if (linkedProjectId) {
          onOpenLinkedProject?.(linkedProjectId);
        }
      }}
      onKeyDown={(event) => {
        if (!linkedProjectId) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenLinkedProject?.(linkedProjectId);
        }
      }}
    >
       <div className={`bg-[#f3f3f3] overflow-clip relative rounded-[2px] shrink-0 w-full flex items-center justify-center ${imageClassName}`}>
          <ImageWithFallback alt="" className="h-full w-full object-cover" src={imgBg} />
       </div>
       <div className="flex flex-col gap-[8px] items-start w-full">
          <div className="flex gap-[12px] items-center">
            <div className="bg-[#e2e2e2] px-[12px] py-[4px] rounded-[12px]">
                <p className="font-['Inter','Noto_Sans_JP','Noto_Sans_SC',sans-serif] font-bold text-[#474747] text-[10px] tracking-[1px] uppercase">{category}</p>
            </div>
            <p className="font-['Manrope',sans-serif] font-medium text-[#5e5e5e] text-[12px]">{id}</p>
          </div>
          <p className="font-['Manrope','Noto_Sans_JP','Noto_Sans_SC',sans-serif] font-bold text-[24px] text-black tracking-[-1px] leading-tight">{title}</p>
          <p className={`font-['OPPOSans','Noto_Sans_SC','Noto_Sans_JP',sans-serif] font-normal text-[15px] text-[rgba(26,28,28,0.7)] text-justify tracking-[1px] leading-[28px] pt-[4px] pb-[16px] ${descriptionClassName ?? ""}`}>{description}</p>
          <button
            type="button"
            tabIndex={-1}
            disabled={!isLinked}
            className={`mt-[8px] self-start border-b font-['Inter',sans-serif] font-bold text-[10px] tracking-[1px] uppercase transition-colors ${
              isLinked
                ? "cursor-pointer border-black text-[#1a1c1c]"
                : "cursor-not-allowed border-[#a8a8a8] text-[#a8a8a8]"
            }`}
            onClick={(event) => {
              event.stopPropagation();
              if (linkedProjectId) {
                onOpenLinkedProject?.(linkedProjectId);
              }
            }}
          >
            {actionLabel}
          </button>
       </div>
    </div>
  );
}

function getFallbackGroupCard(
  card: Partial<ResumeUxGroupCard> | undefined,
  index: number,
  fallbackImage: string,
): ResumeUxGroupCard & { image: string } {
  return {
    stableId: card?.stableId ?? `resume-ux-fallback-group-${index}`,
    idLabel: card?.idLabel ?? "",
    title: card?.title ?? "",
    description: card?.description ?? "",
    category: card?.category ?? "",
    image: card?.image || fallbackImage,
    actionLabel: card?.actionLabel || "VIEW PROTOTYPE",
    linkedPortfolioProjectId: card?.linkedPortfolioProjectId ?? "",
  };
}

function renderLargeCard(
  block: ResumeUxLargeCardBlock,
  id: string,
  onOpenLinkedProject?: (projectId: string) => void,
) {
  return (
    <ProjectCardLarge
      key={block.stableId}
      id={id}
      title={block.card.title ?? ""}
      description={block.card.description ?? ""}
      category={block.card.category ?? ""}
      tags={block.card.tags ?? ""}
      mediaUrl={block.card.mediaUrl}
      mediaType={block.card.mediaType}
      fallbackImage={imgBackground}
      linkedPortfolioProjectId={block.card.linkedPortfolioProjectId}
      onOpenLinkedProject={onOpenLinkedProject}
    />
  );
}

function renderCardGroup(
  block: ResumeUxCardGroupBlock,
  leftId: string,
  rightId: string,
  onOpenLinkedProject?: (projectId: string) => void,
) {
  const leftCard = getFallbackGroupCard(block.leftCard, 0, imgProject1);
  const rightCard = getFallbackGroupCard(block.rightCard, 1, imgProject2);

  return (
    <div key={block.stableId} className="flex flex-col gap-[56px] md:flex-row md:items-center md:justify-between md:gap-0 w-full">
      <div className="w-full md:w-[484px] md:pb-[96px]">
        <ProjectCardMedium
          id={leftId}
          title={leftCard.title}
          description={leftCard.description}
          category={leftCard.category}
          imgBg={leftCard.image}
          actionLabel={leftCard.actionLabel}
          imageClassName="aspect-[1.284] md:aspect-auto md:h-[377px]"
          descriptionClassName="md:max-w-[448px] md:pr-[24px]"
          linkedPortfolioProjectId={leftCard.linkedPortfolioProjectId}
          onOpenLinkedProject={onOpenLinkedProject}
        />
      </div>
      <div className="w-full md:w-[332px] md:pt-[128px]">
        <ProjectCardMedium
          id={rightId}
          title={rightCard.title}
          description={rightCard.description}
          category={rightCard.category}
          imgBg={rightCard.image}
          actionLabel={rightCard.actionLabel}
          imageClassName="aspect-[0.961] md:aspect-auto md:h-[345px]"
          linkedPortfolioProjectId={rightCard.linkedPortfolioProjectId}
          onOpenLinkedProject={onOpenLinkedProject}
        />
      </div>
    </div>
  );
}

function formatCardId(index: number) {
  return String(index).padStart(3, "0");
}

export function UxCase({
  content,
  onOpenLinkedProject,
}: {
  content: ResumeUxCaseContent;
  onOpenLinkedProject?: (projectId: string) => void;
}) {
  let visualCardIndex = 0;

  return (
    <div className="w-full flex flex-col items-center gap-[72px] bg-[#e6e6e6] py-[144px]">
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
        <Blockquote line1={content.quoteLine1} line2={content.quoteLine2} />
        <div className="flex flex-col font-['Manrope',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[10px] text-center tracking-[3px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">{content.timelineLabel}</p>
        </div>
      </div>

      <div className="w-full max-w-[1024px] flex flex-col gap-[72px] px-4 pt-[72px] md:px-[80px]">
        <SectionHeading content={content} />

        <div className="flex w-full flex-col gap-[96px]">
          {content.projectBlocks.map((block) => {
            if (block.type === "large-card") {
              visualCardIndex += 1;
              return renderLargeCard(block, formatCardId(visualCardIndex), onOpenLinkedProject);
            }

            visualCardIndex += 1;
            const leftId = formatCardId(visualCardIndex);
            visualCardIndex += 1;
            const rightId = formatCardId(visualCardIndex);
            return renderCardGroup(block, leftId, rightId, onOpenLinkedProject);
          })}
        </div>
      </div>
    </div>
  );
}
