import React from "react";
import svgPaths from "../../imports/Frame1321318823-1/svg-gwftmbd6ul";
import imgBackground from "figma:asset/ece298d0ec2c16f10310d45724b276a6035cb503.png";
import imgProject1 from "figma:asset/5ca464b2982af38ac9a7ea1866701ae60a833af0.png";
import imgProject2 from "figma:asset/b57462095e3076343086f74b716392073cba5aec.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function Blockquote() {
  return (
    <div className="max-w-[768px] relative shrink-0 w-full" data-name="Blockquote">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center max-w-[inherit] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[30px] text-center">
          <p className="leading-[40px] mb-0 whitespace-nowrap">“ 设计不止于形与感，</p>
          <p className="leading-[40px] whitespace-nowrap">更在于它如何作用于人类经验的长河。”</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full mb-[48px]" data-name="HorizontalBorder">
      <div className="flex flex-col gap-[8px] items-start relative">
        <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[30px] uppercase whitespace-nowrap">
          <p className="leading-[36px]">UX Case study  体验设计寻踪</p>
        </div>
        <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">
          <p className="leading-[20px]">产品&设计主管 ｜ 宁波中升估价 ｜ 杉杉商业集团</p>
        </div>
      </div>
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c6c6c6] text-[36px] text-right">
        <p className="leading-[40px]">02</p>
      </div>
    </div>
  );
}

function ProjectCardLarge({ title, description, category, tags, videoSrc, imgBg, id }: { title: string, description: string, category: string, tags: string, videoSrc?: string, imgBg?: string, id: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative w-full mb-[96px]">
      <div className="h-[370px] overflow-clip relative rounded-[2px] shrink-0 w-full bg-[#111]">
        {videoSrc ? (
            <video autoPlay className="absolute inset-0 max-w-none object-cover size-full" loop muted playsInline>
              <source src={videoSrc} />
            </video>
        ) : (
            <ImageWithFallback alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgBg} />
        )}
      </div>
      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
        <div className="flex flex-col gap-[12px] items-start max-w-[576px]">
          <div className="flex gap-[12px] items-center">
            <div className="bg-[#e2e2e2] px-[12px] py-[4px] rounded-[12px]">
                <p className="font-bold text-[#474747] text-[10px] tracking-[1px] uppercase">{category}</p>
            </div>
            <p className="font-['Manrope:Medium'] font-medium text-[#5e5e5e] text-[12px]">{id}</p>
          </div>
          <p className="font-bold text-[30px] text-black tracking-[-1px]">{title}</p>
          <p className="font-['OPPOSans:Regular'] text-[15px] text-[rgba(26,28,28,0.7)] text-justify tracking-[1px] leading-[28px]">{description}</p>
        </div>
        <div className="flex flex-col gap-[8px] items-end">
          <p className="font-bold text-[#777] text-[10px] uppercase">PC</p>
          <p className="font-['OPPOSans:Medium'] text-[#1a1c1c] text-[12px] text-right uppercase">{tags}</p>
          <div className="mt-[16px] flex gap-[8px] items-center cursor-pointer group">
            <p className="font-bold text-[#1a1c1c] text-[12px] tracking-[1.2px] uppercase group-hover:underline">EXPLORE SYSTEM</p>
            <div className="size-[9px]">
                <svg viewBox="0 0 10 10" fill="none">
                    <path d={svgPaths.pce77c00} fill="#1A1C1C" />
                </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCardMedium({ title, description, category, imgBg, id }: { title: string, description: string, category: string, imgBg: string, id: string }) {
  return (
    <div className="flex flex-col gap-[24px] items-start relative w-full mb-[96px]">
       <div className="bg-[#f3f3f3] overflow-clip relative rounded-[2px] shrink-0 w-full aspect-[4/3] flex items-center justify-center">
          <ImageWithFallback alt="" className="h-full w-full object-cover grayscale mix-blend-saturation hover:mix-blend-normal transition-all" src={imgBg} />
       </div>
       <div className="flex flex-col gap-[8px] items-start w-full">
          <div className="flex gap-[12px] items-center">
            <div className="bg-[#e2e2e2] px-[12px] py-[4px] rounded-[12px]">
                <p className="font-bold text-[#474747] text-[10px] tracking-[1px] uppercase">{category}</p>
            </div>
            <p className="font-['Manrope:Medium'] font-medium text-[#5e5e5e] text-[12px]">{id}</p>
          </div>
          <p className="font-bold text-[24px] text-black tracking-[-1px] leading-tight">{title}</p>
          <p className="font-['OPPOSans:Regular'] text-[14px] text-[rgba(26,28,28,0.7)] text-justify tracking-[0.5px] leading-[24px]">{description}</p>
          <button className="border-b border-black font-bold text-[#1a1c1c] text-[10px] tracking-[1px] uppercase mt-[8px] self-start cursor-pointer">VIEW PROTOTYPE</button>
       </div>
    </div>
  );
}

export function UxCase() {
  return (
    <div className="w-full flex flex-col items-center bg-[#E6E6E6]">
      <div className="w-full py-[128px] mb-[128px] flex flex-col items-center">
        <Blockquote />
        <div className="mt-[24px] flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#939393] text-[10px] text-center tracking-[3px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">as ux designer — from 2021 to 2024</p>
        </div>
      </div>

      <div className="w-[864px] flex flex-col">
        <SectionHeading />
        
        <ProjectCardLarge 
          id="001"
          title="地方火电厂综合平台"
          description="文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息字描述信。"
          category="用户体验设计（主管）"
          tags="PC端  |  SaaS平台  |  重业务"
          videoSrc="/_videos/v1/2c856339829e11d00a0f250acad03dd9bed6253e"
        />

        <ProjectCardLarge 
          id="001"
          title="地方火电厂综合平台"
          description="文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息字描述信。"
          category="用户体验设计（主管）"
          tags="PC端  |  SaaS平台  |  重业务"
          imgBg={imgBackground}
        />

        <div className="flex gap-[48px] items-start w-full mb-[128px]">
            <div className="flex-[7]">
                <ProjectCardMedium 
                    id="002"
                    title="奥莱线上商城小程序"
                    description="文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息。"
                    category="用户体验设计（主管）"
                    imgBg={imgProject1}
                />
            </div>
            <div className="flex-[5] pt-[128px]">
                <ProjectCardMedium 
                    id="003"
                    title="中升营销管理系统"
                    description="文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字。"
                    category="产品经理 & UX设计"
                    imgBg={imgProject2}
                />
            </div>
        </div>
      </div>
    </div>
  );
}
