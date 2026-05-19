import React from "react";
import svgPaths from "../../imports/SectionBentoGridProjectsAiProducts/svg-9lhe6139vs";

import imgAiVisual from "figma:asset/8e4d38fb3b68dbaa2053c35cf8593579682102fb.png";
import imgAiVisual1 from "figma:asset/9c03b298743328ce710cfeb31bb76290734b0619.png";
import imgAiVisual2 from "figma:asset/0992d23084382dbdd94b84c7e501894e6cf58845.png";

function Blockquote() {
  return (
    <div className="max-w-[768px] relative shrink-0 w-full md:w-[768px]" data-name="Blockquote">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center max-w-[inherit] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[20px] md:text-[30px] text-center">
          <p className="leading-[32px] md:leading-[40px] mb-0">“ AI 产品的关键在于：</p>
          <p className="leading-[32px] md:leading-[40px]">如何在智能时代，契合人类的思考与行为逻辑。”</p>
        </div>
      </div>
    </div>
  );
}

function ContainerHeaderLabel() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[10px] text-center tracking-[3px] uppercase whitespace-nowrap">
          <p className="leading-[15px] whitespace-pre">{`as ai  product manager — from 2025 to 2026`}</p>
        </div>
      </div>
    </div>
  );
}

function QuotePhilosophySection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Quote / Philosophy Section">
      <Blockquote />
      <ContainerHeaderLabel />
    </div>
  );
}

function HeadingMain() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[30px] uppercase whitespace-nowrap">
        <p className="leading-[36px] whitespace-pre">{`AI Products  智能产品探索`}</p>
      </div>
    </div>
  );
}

function CompanyLabel() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] uppercase w-[337.58px]">
        <p className="leading-[20px]">ai产品经理 ｜ 时代之门（上海）科技有限公司</p>
      </div>
    </div>
  );
}

function HeadingContainer() {
  return (
    <div className="relative shrink-0 w-[391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <HeadingMain />
        <CompanyLabel />
      </div>
    </div>
  );
}

function SectionNumber() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] relative shrink-0 text-[#c6c6c6] text-[36px] text-right w-[44px]">
          <p className="leading-[40px]">01</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full md:w-[864px]" data-name="HorizontalBorder">
      <HeadingContainer />
      <SectionNumber />
    </div>
  );
}

// Project Components
function ProjectTitleLabel({ label }: { label: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[15px]">{label}</p>
      </div>
    </div>
  );
}

function ProjectHeading({ title, highlight }: { title: string, highlight?: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#292929] text-[30px] tracking-[-1px] w-full">
        <p className="font-['Manrope:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium">
          <span className="leading-[36px]">{title}</span>
          {highlight && <span className="leading-[36px] tracking-[-1px]">{highlight}</span>}
        </p>
      </div>
    </div>
  );
}

function ProjectMeta({ text }: { text: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

function ProjectIcon() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <path d={svgPaths.p1e74ffc0} fill="var(--fill-0, black)" />
      </svg>
    </div>
  );
}

// Sub-grid components
function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx === 0 ? (
            <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] tracking-[1px] uppercase w-[64px]">
              <p className="leading-[15px]">{item}</p>
            </div>
          ) : (
            <button className="cursor-pointer flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px not-italic relative text-[#aeaeae] text-[10px] text-center tracking-[1px] uppercase last:flex-none last:text-right last:w-[64px]">
              <p className="leading-[15px]">{item}</p>
            </button>
          )}
          {idx < items.length - 1 && (
            <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[6px]">
              <div className="-rotate-90 -scale-y-100 flex-none">
                <div className="h-[6px] relative w-[8px]">
                  <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.9282 4.5">
                      <path d={svgPaths.p1709db80} fill={idx === 0 ? "#6B6B6B" : "#AEAEAE"} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function RoleHeading({ title }: { title: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[30px] uppercase whitespace-nowrap">
        <p className="leading-[36px]">{title}</p>
      </div>
    </div>
  );
}

function RoleDescription({ text }: { text: string }) {
  return (
    <div className="content-stretch flex flex-col items-center justify-center min-h-px relative w-full" data-name="Container">
        <div className="content-stretch flex flex-col items-center max-w-[320px] px-[3.58px] relative shrink-0">
            <div className="flex flex-col font-['Inter:Italic','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal h-[59px] italic justify-center leading-[0] relative shrink-0 text-[#4a4a4a] text-[18px] text-center w-[312.84px]">
                <p className="leading-[29.25px]">{text}</p>
            </div>
        </div>
    </div>
  );
}

function RoleMeta({ text }: { text: string }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] tracking-[1.2px] uppercase w-[134.31px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

// Project Card Types
function ProjectCardWhite({ label, title, highlight, meta, imgSrc }: { label: string, title: string, highlight?: string, meta: string, imgSrc: string }) {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative" data-name="Project Card White">
      <div className="content-stretch flex flex-col items-start p-[32px] relative size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-full">
          <ProjectTitleLabel label={label} />
          <ProjectHeading title={title} highlight={highlight} />
        </div>
        <div className="content-stretch flex flex-col items-start justify-center py-[32px] relative shrink-0 w-full">
          <div className="content-stretch flex flex-col h-[273px] items-start justify-center overflow-clip relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-saturation pointer-events-none opacity-0" />
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[118.64%] left-[-7.96%] max-w-none top-[-9.23%] w-[116.15%] object-cover" src={imgSrc} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          <ProjectMeta text={meta} />
          <ProjectIcon />
        </div>
      </div>
    </div>
  );
}

function RoleCardGray({ breadcrumbs, title, description, meta }: { breadcrumbs: string[], title: string, description: string, meta: string }) {
  return (
    <div className="bg-[#E6E6E6] flex-[1_0_0] h-[500px] min-w-px relative" data-name="Role Card Gray">
      <div className="content-stretch flex flex-col items-start justify-between p-[32px] relative size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-[368px]">
          <Breadcrumbs items={breadcrumbs} />
          <RoleHeading title={title} />
        </div>
        <RoleDescription text={description} />
        <RoleMeta text={meta} />
      </div>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="bg-[#1a1c1c] flex-[1_0_0] h-[500px] min-w-px relative rounded-[2px]" data-name="Contact Card">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between px-[48px] py-[96px] relative size-full">
          {/* Icon Group */}
          <div className="content-stretch flex flex-col h-[55px] items-center justify-center relative shrink-0 pb-[24px]">
             <div className="h-[44.764px] relative shrink-0 w-[55px]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55 45">
                    <path d={svgPaths.p2dfdf508} fill="#E8E8E8" />
                    <path d={svgPaths.pe935180} fill="#E8E8E8" />
                    <path d={svgPaths.p27f4a800} fill="#E8E8E8" />
                    <path d={svgPaths.p2c957700} fill="#E8E8E8" />
                    <path d={svgPaths.p144f200} fill="#E8E8E8" />
                    <path d={svgPaths.p18b7a680} fill="#E8E8E8" />
                    <path clipRule="evenodd" d={svgPaths.p1897a580} fill="#E8E8E8" fillRule="evenodd" />
                    <path d={svgPaths.p1c6e3bf0} fill="#E8E8E8" />
                    <path d={svgPaths.p19d27a00} fill="#E8E8E8" />
                    <path d={svgPaths.p25d76500} fill="#E8E8E8" />
                    <path d={svgPaths.p17b15200} fill="#E8E8E8" />
                    <path d={svgPaths.p21fb5f0} fill="#E8E8E8" />
                    <path clipRule="evenodd" d={svgPaths.p2ca16500} fill="#E8E8E8" fillRule="evenodd" />
                    <path d={svgPaths.p7b76020} fill="#E8E8E8" />
                </svg>
             </div>
          </div>
          {/* Text Group */}
          <div className="content-stretch flex flex-col items-center relative shrink-0">
            <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0">
                <div className="content-stretch flex flex-col items-center pl-[54.69px] pr-[54.7px] relative shrink-0">
                    <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#e8e8e8] text-[30px] text-center whitespace-nowrap">
                        <p className="leading-[36px] whitespace-pre">{`Vera’s  Libertisle`}</p>
                    </div>
                </div>
            </div>
            <div className="content-stretch flex flex-col items-start max-w-[384px] pb-[32px] relative shrink-0">
                <div className="content-stretch flex flex-col items-center max-w-[384px] pl-[14.88px] pr-[14.89px] relative shrink-0">
                    <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[16px] text-center whitespace-nowrap">
                        <p className="leading-[24px]">更多项目，即刻前往Vera的产品创意岛~</p>
                    </div>
                </div>
            </div>
          </div>
          {/* Button */}
          <button className="bg-[#e8e8e8] content-stretch flex flex-col items-center justify-center px-[40px] py-[20px] relative rounded-[2px] shrink-0 hover:bg-white transition-colors cursor-pointer" data-name="Button">
            <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold h-[20px] justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] text-center tracking-[1.4px] uppercase w-[112.41px]">
              <p className="leading-[20px]">Get In Touch</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function GridContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full md:w-[864px]" data-name="Grid Container">
      {/* Row 1 */}
      <div className="content-stretch flex flex-col md:flex-row items-start relative shrink-0 w-full">
        <ProjectCardWhite 
          label="AI 产品经理" 
          title="AIEO " 
          highlight="创作与分发平台" 
          meta="pc & 小程序客户端 + 后管平台 • 2026" 
          imgSrc={imgAiVisual} 
        />
        <RoleCardGray 
          breadcrumbs={["who", "what", "why", "how"]} 
          title="角色定位" 
          description="一句话描述角色定位" 
          meta="Algorithm • Beta" 
        />
      </div>
      {/* Row 2 */}
      <div className="content-stretch flex flex-col md:flex-row items-start relative shrink-0 w-full">
        <RoleCardGray 
          breadcrumbs={["who", "what", "why", "how"]} 
          title="角色定位" 
          description="一句话描述角色定位" 
          meta="Algorithm • Beta" 
        />
        <div className="bg-white flex-[1_0_0] h-[500px] min-w-px relative" data-name="Project Card White">
           <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[32px] pb-[16px] right-[32px] top-[32px] z-10">
              <ProjectTitleLabel label="ai产品经理，视觉设计负责人" />
              <ProjectHeading title="鹤元家政2.0智能系统" />
           </div>
           <div className="absolute content-stretch flex items-center justify-between left-[32px] right-[32px] bottom-[24px] z-10">
              <ProjectMeta text="小程序客户端 + 业务中台 • 2025" />
              <ProjectIcon />
           </div>
           <div className="absolute content-stretch flex flex-col inset-[115px_32px_56px_32px] items-start justify-center py-[32px]">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px overflow-clip relative w-full">
                <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-saturation pointer-events-none opacity-0" />
                <div className="flex-[1_0_0] min-h-px relative w-full">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute h-[115.43%] left-[-6.7%] max-w-none top-[-7.51%] w-[113.29%] object-cover" src={imgAiVisual1} />
                    </div>
                </div>
              </div>
           </div>
        </div>
      </div>
      {/* Row 3 */}
      <div className="content-stretch flex flex-col md:flex-row items-start relative shrink-0 w-full">
        <div className="bg-white flex-[1_0_0] h-[500px] min-w-px relative" data-name="Project Card White">
            <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[32px] pb-[16px] right-[32px] top-[32px] z-10">
              <ProjectTitleLabel label="ai产品经理，视觉设计负责人" />
              <ProjectHeading title="时代之言智能体中心" />
           </div>
           <div className="absolute content-stretch flex items-center justify-between left-[32px] right-[32px] bottom-[24px] z-10">
              <ProjectMeta text="pc客户端 + 后管平台 • 2025" />
              <ProjectIcon />
           </div>
           <div className="absolute content-stretch flex flex-col inset-[115px_32px_56px_32px] items-start justify-center py-[32px]">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px overflow-clip relative w-full">
                <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-saturation pointer-events-none opacity-0" />
                <div className="flex-[1_0_0] min-h-px relative w-full">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute h-[101.9%] left-[0.23%] max-w-none top-[-0.87%] w-[99.77%] object-cover" src={imgAiVisual2} />
                    </div>
                </div>
              </div>
           </div>
        </div>
        <ContactCard />
      </div>
    </div>
  );
}

export function AiProducts() {
  return (
    <div className="bg-[#F2F2F2] content-stretch flex flex-col gap-[72px] items-start pt-[144px] relative w-full" data-name="AI Products">
      <QuotePhilosophySection />
      <div className="relative shrink-0 w-full" data-name="Section - Bento Grid Projects: AI Products">
        <div className="content-stretch flex flex-col gap-[72px] items-center pb-[80px] pt-[72px] px-4 md:px-[80px] relative w-full">
          <HorizontalBorder />
          <GridContainer />
        </div>
      </div>
    </div>
  );
}
