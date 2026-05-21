import React from "react";
import svgPaths from "../../imports/Frame1321318855/svg-hs6sb32euz";
import imgFrame1321318862 from "figma:asset/ece298d0ec2c16f10310d45724b276a6035cb503.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { type ResumeEducation as ResumeEducationContent } from "../data/resumeContent";

function Blockquote({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="w-[864px] flex flex-col items-center relative" data-name="Blockquote">
      <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[30px] text-center whitespace-nowrap">
        <p className="leading-[40px] mb-0">{line1}</p>
        <p className="leading-[40px]">{line2}</p>
      </div>
    </div>
  );
}

function ContainerGraduated({ label }: { label: string }) {
  return (
    <div className="w-[864px] flex flex-col items-center relative" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[10px] text-center tracking-[3px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">{label}</p>
      </div>
    </div>
  );
}

function HorizontalBorderHeader({
  sectionTitle,
  sectionSubtitle,
  sectionNumber,
}: {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionNumber: string;
}) {
  return (
    <div className="flex items-start justify-between relative shrink-0 w-[864px]" data-name="HorizontalBorder">
      <div className="relative shrink-0 w-[303px]" data-name="Container">
        <div className="flex flex-col gap-[8px] items-start w-full">
          <div className="flex flex-col items-start w-full" data-name="Heading 2">
            <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[30px] uppercase whitespace-nowrap">
              <p className="leading-[36px] whitespace-pre">{sectionTitle}</p>
            </div>
          </div>
          <div className="flex flex-col items-start w-full" data-name="Container">
            <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] uppercase whitespace-nowrap">
              <p className="leading-[20px] whitespace-pre">{sectionSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0" data-name="Container">
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c6c6c6] text-[36px] text-right w-[44px]">
          <p className="leading-[40px]">{sectionNumber}</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorderUniversity({
  schoolPeriod,
  schoolName,
  major,
  className,
  degreeType,
  degreeLevel,
}: {
  schoolPeriod: string;
  schoolName: string;
  major: string;
  className: string;
  degreeType: string;
  degreeLevel: string;
}) {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(198,198,198,0.1)] border-b-2 border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <div className="flex items-center justify-between pb-[33px] pt-[32px] px-[32px] relative w-full">
        {/* Paragraph Info */}
        <div className="flex gap-[48px] items-baseline relative">
          <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#777] text-[12px] whitespace-nowrap">
            <p className="leading-[16px]">{schoolPeriod}</p>
          </div>
          <div className="flex gap-[24px] items-end relative shrink-0">
            <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[20px] tracking-[-0.5px] whitespace-nowrap">
              <p className="leading-[28px]">{schoolName}</p>
            </div>
            <div className="flex gap-[12px] items-center relative shrink-0">
              <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] tracking-[-0.5px] whitespace-nowrap">
                <p className="leading-[22px]">{major}</p>
              </div>
              <div className="h-[8px] relative shrink-0 w-px">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 8">
                  <path d="M1 0V8H0V0H1Z" fill="#1A1C1C" opacity="0.5" />
                </svg>
              </div>
              <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] tracking-[-0.5px] whitespace-nowrap">
                <p className="leading-[22px]">{className}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-[12px] items-center relative shrink-0">
            <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#777] text-[14px] tracking-[-0.5px] whitespace-nowrap">
              <p className="leading-[22px]">{degreeType}</p>
            </div>
            <div className="h-[8px] relative shrink-0 w-px">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 8">
                <path d="M1 0V8H0V0H1Z" fill="#777777" opacity="0.5" />
              </svg>
            </div>
            <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#777] text-[14px] tracking-[-0.5px] whitespace-nowrap">
              <p className="leading-[22px]">{degreeLevel}</p>
            </div>
          </div>
        </div>
        {/* Icon */}
        <div className="relative shrink-0 size-[8.75px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 8.75">
            <path d={svgPaths.pa49aac0} fill="#1A1C1C" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AwardItem({ date, title, desc, image }: { date: string, title: string, desc: string, image: string }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="flex items-start pl-[40px] pr-[16px] relative size-full">
        <div className="flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
          <div className="flex flex-col items-start relative shrink-0 w-full">
            <p className="font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold text-[#5e5e5e] text-[12px] leading-[16px]">{date}</p>
          </div>
          <div className="flex flex-col items-start pt-[4px] relative shrink-0 w-full">
            <p className="font-['OPPOSans:Bold',sans-serif] font-bold text-[#1a1c1c] text-[20px] leading-[28px]">{title}</p>
          </div>
          <div className="flex flex-col items-start max-w-[448px] pt-[10.75px] relative shrink-0 w-full">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1a1c1c] text-[14px] leading-[22.75px]">{desc}</p>
          </div>
        </div>
        <div className="relative shrink-0 w-[240px] h-[160px]">
          <ImageWithFallback alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={image || imgFrame1321318862} />
        </div>
        <div className="absolute bg-black left-0 rounded-[12px] size-[8px] top-[8px]" />
      </div>
    </div>
  );
}

export function Education({ content }: { content: ResumeEducationContent }) {
  return (
    <div className="bg-linear-to-b from-[#F2F2F2] to-[#E6E6E6] flex flex-col items-center pt-[144px] pb-[160px] w-full" data-name="EDUCATION">
      {/* Quote Section */}
      <div className="flex flex-col gap-[24px] items-center mb-[128px]">
        <Blockquote line1={content.quoteLine1} line2={content.quoteLine2} />
        <ContainerGraduated label={content.graduatedLabel} />
      </div>

      {/* Main Content Sections */}
      <div className="flex flex-col gap-[72px] items-center">
        <HorizontalBorderHeader
          sectionTitle={content.sectionTitle}
          sectionSubtitle={content.sectionSubtitle}
          sectionNumber={content.sectionNumber}
        />
        
        {/* Grey Box Container */}
        <div className="bg-[#f2f2f2] flex flex-col items-start relative shrink-0 w-[864px] border border-[rgba(198,198,198,0.1)]">
          <HorizontalBorderUniversity
            schoolPeriod={content.schoolPeriod}
            schoolName={content.schoolName}
            major={content.major}
            className={content.className}
            degreeType={content.degreeType}
            degreeLevel={content.degreeLevel}
          />
          <div className="flex flex-col gap-[48px] items-start px-[32px] py-[54px] w-full">
            {content.awards.map((award) => (
              <AwardItem 
                key={award.stableId}
                date={award.date} 
                title={award.title} 
                desc={award.description}
                image={award.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
