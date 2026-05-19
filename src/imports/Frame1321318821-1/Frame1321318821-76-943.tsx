import svgPaths from "./svg-r6y69e80f9";
import imgVeraPortrait from "./c2a725be084d36e42b2de03b1df60b14cc7638a2.png";

function VeraPortrait() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Vera portrait">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-16.67%] max-w-none top-0 w-[133.33%]" src={imgVeraPortrait} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#eee] content-stretch flex flex-col h-[384px] items-start justify-center overflow-clip relative shrink-0 w-[288px]" data-name="Background">
      <VeraPortrait />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex gap-[8px] items-start leading-[0] relative shrink-0 text-[48px] text-black w-full whitespace-nowrap" data-name="Heading 2">
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[48px]">胡雨琪</p>
      </div>
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[48px]">·</p>
      </div>
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center relative shrink-0">
        <p className="leading-[48px]">VERA</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[18px] tracking-[1.8px] uppercase w-full">
        <p className="leading-[28px]">{`AI Product Manager & Experience Designer`}</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Heading />
      <Container1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[11px] tracking-[3.3px] uppercase w-full">
        <p className="leading-[16.5px]">About Me</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] text-justify w-full">
        <p className="leading-[24px]">{`As an AI Product Manager & Experience Designer, I don’t just build products or design interfaces. I translate complex intelligence into human-centered experiences, turning technical possibilities into real, gentle value for people.`}</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[14px] text-justify uppercase w-full">
        <p className="leading-[24px]">作为 AI 产品经理与体验设计师，我不只是构建产品、设计界面。我用产品逻辑梳理复杂的脉络，用体验设计打磨每一个细节，将ai能力转化为以人为中心、可感易用的产品，把技术的可能性，变成真正贴近人、服务人、温暖人的实用价值。</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[14.8px] items-start pt-[39px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start justify-between py-[16px] relative size-full">
        <Frame />
        <Container2 />
      </div>
    </div>
  );
}

function ProfileHeaderSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Profile Header Section">
      <div className="content-stretch flex gap-[64px] items-start px-[80px] relative w-full">
        <Background />
        <Container />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[11px] tracking-[3.3px] uppercase w-full">
        <p className="leading-[16.5px]">Experience</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-baseline justify-between leading-[0] relative w-full whitespace-nowrap">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0 text-[#1a1c1c] text-[14px]">
          <p className="leading-[20px]">时代之门科技有限公司</p>
        </div>
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#5e5e5e] text-[10px] text-right uppercase">
          <p className="leading-[15px]">2025 — Present</p>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[11px] tracking-[0.55px] uppercase w-full">
          <p className="leading-[16.5px]">AI Product manager</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px pb-[25px] relative" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(198,198,198,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <Paragraph />
      <Container7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[16px] items-start pb-[36px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#969696] text-[24px] w-[32px]">
        <p className="leading-[32px]">01</p>
      </div>
      <HorizontalBorder />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-baseline justify-between leading-[0] relative text-[#969696] w-full whitespace-nowrap">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0 text-[14px] text-left">
          <p className="leading-[20px]">宁波中升估价</p>
        </div>
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[10px] text-right uppercase">
          <p className="leading-[15px]">2024 — 2025</p>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a8a8a8] text-[11px] text-left tracking-[0.55px] uppercase w-full">
          <p className="leading-[16.5px]">{`PM & uX designer`}</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px pb-[25px] relative" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(198,198,198,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <Paragraph1 />
      <Container9 />
    </div>
  );
}

function Container8() {
  return (
    <button className="content-stretch cursor-pointer flex gap-[16px] items-start pb-[36px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#c6c6c6] text-[24px] text-left w-[32px]">
        <p className="leading-[32px]">02</p>
      </div>
      <HorizontalBorder1 />
    </button>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="content-stretch flex items-baseline justify-between leading-[0] relative text-[#969696] w-full whitespace-nowrap">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0 text-[14px] text-left">
          <p className="leading-[20px]">杉杉商业集团</p>
        </div>
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[10px] text-right uppercase">
          <p className="leading-[15px]">2023 — 2024</p>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a8a8a8] text-[11px] text-left tracking-[0.55px] uppercase w-full">
        <p className="leading-[16.5px]">Design Manager</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px pb-[24px] relative" data-name="Container">
      <Paragraph2 />
      <Container12 />
    </div>
  );
}

function Container10() {
  return (
    <button className="content-stretch cursor-pointer flex gap-[16px] items-start pb-[36px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#c6c6c6] text-[24px] text-left w-[32px]">
        <p className="leading-[32px]">03</p>
      </div>
      <Container11 />
    </button>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container8 />
      <Container10 />
    </div>
  );
}

function SpecialtiesSection() {
  return (
    <div className="bg-[#ededed] flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Specialties Section">
      <div className="content-stretch flex flex-col gap-[32px] items-start pb-[24px] pt-[48px] px-[48px] relative size-full">
        <Heading3 />
        <Container5 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[11px] tracking-[3.3px] uppercase w-full">
        <p className="leading-[16.5px]">Project</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[14px] tracking-[-0.35px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">AIEO 创作与分发综合平台</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0 size-[11.314px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-45">
          <div className="relative size-[8px]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <path d={svgPaths.p16e5fb80} fill="var(--fill-0, black)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] h-[39px] justify-center leading-[0] not-italic relative shrink-0 text-[#565656] text-[12px] text-justify w-full">
        <p className="leading-[20px]">整合主流大模型与内容渠道，搭建全端客户端及统一后台，打造一站式创作分发综合平台</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container15 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[14px] tracking-[-0.35px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">鹤元家政2.0智能系统</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0 size-[11.314px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-45">
          <div className="relative size-[8px]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <path d={svgPaths.p16e5fb80} fill="var(--fill-0, black)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] h-[39px] justify-center leading-[0] not-italic relative shrink-0 text-[#565656] text-[12px] text-justify w-full">
        <p className="leading-[20px]">以 AI 智能体深度赋能 B 端家政，全链路提效降本，重塑家政服务体验与运营效率。</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Container17 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[14px] tracking-[-0.35px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">GEA智能数据工程师项目</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#565656] text-[12px] text-justify w-full">
        <p className="leading-[20px]">前后共计 6 场工作坊高效对齐共识，攻坚跨 BU 协作痛点，输出可落地产品设计方案。</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Container19 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container16 />
      <Container18 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Container13 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="relative shrink-0 size-[8px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #1A1C1C)" id="Ellipse 53" r="4" />
        </svg>
      </div>
      <button className="block cursor-pointer relative shrink-0 size-[8px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #D9D9D9)" id="Ellipse 54" r="4" />
        </svg>
      </button>
      <div className="relative shrink-0 size-[8px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #D9D9D9)" id="Ellipse 54" r="4" />
        </svg>
      </div>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[72px] items-start py-[72px] relative size-full">
      <ProfileHeaderSection />
      <div className="content-stretch flex gap-[12px] h-[426px] items-start px-[80px] relative shrink-0 w-[1024px]" data-name="Bento Grid">
        <SpecialtiesSection />
        <div className="bg-[#f3f3f3] flex-[1_0_0] h-[426px] min-h-px min-w-px relative" data-name="Experience Section">
          <div className="content-stretch flex flex-col gap-[32px] items-start pb-[24px] pt-[48px] px-[48px] relative size-full">
            <Heading4 />
            <Frame2 />
            <Heading7 />
          </div>
        </div>
      </div>
    </div>
  );
}