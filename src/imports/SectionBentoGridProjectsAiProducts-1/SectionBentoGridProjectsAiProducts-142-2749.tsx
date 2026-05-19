import svgPaths from "./svg-kcdktzsimo";
import imgFrame1321318862 from "./ece298d0ec2c16f10310d45724b276a6035cb503.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[30px] uppercase whitespace-nowrap">
        <p className="leading-[36px] whitespace-pre">{`education  教育经历`}</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] uppercase whitespace-nowrap">
        <p className="leading-[20px] whitespace-pre">{`全日制本科  |  学士学位`}</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-[303px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading />
        <Container1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c6c6c6] text-[36px] text-right w-[44px]">
          <p className="leading-[40px]">03</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[864px]" data-name="HorizontalBorder">
      <Container />
      <Container2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[22px]">工业设计</p>
      </div>
      <div className="h-[8px] relative shrink-0 w-px" data-name="｜">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 8">
          <path d="M1 0V8H0V0H1Z" fill="var(--fill-0, #1A1C1C)" id="ï½" opacity="0.5" />
        </svg>
      </div>
      <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[22px]">卓越工程班</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0">
      <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[20px] tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[28px]">浙江理工大学</p>
      </div>
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#777] text-[14px] tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[22px]">全日制本科</p>
      </div>
      <div className="h-[8px] relative shrink-0 w-px" data-name="｜">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 8">
          <path d="M1 0V8H0V0H1Z" fill="var(--fill-0, #777777)" id="ï½" opacity="0.5" />
        </svg>
      </div>
      <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#777] text-[14px] tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[22px]">学士学位</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[48px] items-baseline relative size-full">
        <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#777] text-[12px] whitespace-nowrap">
          <p className="leading-[16px]">2016-2020</p>
        </div>
        <Frame2 />
        <Frame1 />
      </div>
    </div>
  );
}

function Container3({ className }: { className?: string }) {
  return (
    <div className={className || "relative shrink-0"} data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="relative shrink-0 size-[8.75px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 8.75">
            <path d={svgPaths.pa49aac0} fill="var(--fill-0, #1A1C1C)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(198,198,198,0.1)] border-b-2 border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[33px] pt-[32px] px-[32px] relative size-full">
          <Paragraph />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[12px] w-full">
        <p className="leading-[16px]">2016年9月</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[20px] w-full">
        <p className="leading-[28px]">奖项名称1</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] pt-[10.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[14px] w-full">
        <p className="leading-[22.75px]">Focused on the convergence of traditional editorial principles and modern interface paradigms. Awarded for Excellence in Visual Communication.</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
      <Container5 />
      <Heading1 />
      <Container6 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative self-stretch shrink-0 w-[240px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1321318862} />
      <div className="relative size-full" />
    </div>
  );
}

function Item() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item 1">
      <div className="content-stretch flex items-start pl-[40px] pr-[16px] relative size-full">
        <Frame4 />
        <Frame5 />
        <div className="absolute bg-black left-0 rounded-[12px] size-[8px] top-[8px]" data-name="Background" />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[12px] w-full">
        <p className="leading-[16px]">2017年10月</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[20px] w-full">
        <p className="leading-[28px]">奖项名称2</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] pt-[10.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[14px] w-full">
        <p className="leading-[22.75px]">Focused on the convergence of traditional editorial principles and modern interface paradigms. Awarded for Excellence in Visual Communication.</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
      <Container7 />
      <Heading2 />
      <Container8 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative self-stretch shrink-0 w-[240px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1321318862} />
      <div className="relative size-full" />
    </div>
  );
}

function Item1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item 6">
      <div className="content-stretch flex items-start pl-[40px] pr-[16px] relative size-full">
        <Frame6 />
        <Frame7 />
        <div className="absolute bg-black left-0 rounded-[12px] size-[8px] top-[8px]" data-name="Background" />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[12px] w-full">
        <p className="leading-[16px]">2018年11月</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[20px] w-full">
        <p className="leading-[28px]">奖项名称3</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] pt-[10.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[14px] w-full">
        <p className="leading-[22.75px]">Focused on the convergence of traditional editorial principles and modern interface paradigms. Awarded for Excellence in Visual Communication.</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
      <Container9 />
      <Heading3 />
      <Container10 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative self-stretch shrink-0 w-[240px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1321318862} />
      <div className="relative size-full" />
    </div>
  );
}

function Item2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item 7">
      <div className="content-stretch flex items-start pl-[40px] pr-[16px] relative size-full">
        <Frame8 />
        <Frame9 />
        <div className="absolute bg-black left-0 rounded-[12px] size-[8px] top-[8px]" data-name="Background" />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,198,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[48px] items-start px-[32px] py-[54px] relative size-full">
        <Item />
        <Item1 />
        <Item2 />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-start relative shrink-0 w-[864px]">
      <HorizontalBorder1 />
      <Container4 />
    </div>
  );
}

export default function SectionBentoGridProjectsAiProducts() {
  return (
    <div className="content-stretch flex flex-col gap-[72px] items-center pb-[80px] pt-[72px] px-[80px] relative size-full" data-name="Section - Bento Grid Projects: AI Products">
      <HorizontalBorder />
      <Frame3 />
    </div>
  );
}