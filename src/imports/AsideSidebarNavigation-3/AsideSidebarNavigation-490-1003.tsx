import svgPaths from "./svg-cjjevlllv6";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#b1b1b1] text-[18px] uppercase w-full">
        <p className="leading-[28px]">Vera’s Libertisle</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#b1b1b1] text-[18px] uppercase w-full">
        <p className="leading-[28px]">AI Product</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b1b1b1] text-[10px] uppercase w-full">
        <p className="leading-[15px]">ai产品项目</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading1 />
        <Container2 />
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#b1b1b1] text-[18px] uppercase w-full">
        <p className="leading-[28px]">UX Design</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b1b1b1] text-[10px] uppercase w-full">
        <p className="leading-[15px]">ux设计项目</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading2 />
        <Container4 />
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#1d1d1d] text-[18px] uppercase w-full">
        <p className="leading-[28px]">Resume</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1d] text-[10px] uppercase w-full">
        <p className="leading-[15px]">个人简历</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading3 />
        <Container6 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p3fc91b00} fill="var(--fill-0, #969696)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ItemLink() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item → Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[48px] py-[8px] relative size-full">
          <Container7 />
          <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#969696] text-[12px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">about me</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[13px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
        <g id="Container">
          <path d={svgPaths.p3e016000} fill="var(--fill-0, #1D1D1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ItemLink1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item → Link">
      <div aria-hidden="true" className="absolute border-[#1d1d1d] border-l-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[48px] py-[8px] relative size-full">
          <Container8 />
          <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1d1d1d] text-[12px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">AI Products</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p34b25680} fill="var(--fill-0, #969696)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ItemLink2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item → Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[48px] py-[8px] relative size-full">
          <Container9 />
          <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#969696] text-[12px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">UX Case</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="List">
      <ItemLink />
      <ItemLink1 />
      <ItemLink2 />
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[48px] relative shrink-0 w-full" data-name="Nav">
      <List />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full">
      <Margin />
      <Margin1 />
      <Margin2 />
      <Margin3 />
      <Nav />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#1d1d1d] text-[18px] text-left uppercase w-full">
        <p className="leading-[28px]">Contact Me</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1d] text-[10px] text-left uppercase w-full">
        <p className="leading-[15px]">联系方式</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading4 />
        <Container11 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Frame" opacity="0.5">
          <path d={svgPaths.pf0ef180} fill="var(--fill-0, #1D1D1D)" id="Vector" />
          <path d={svgPaths.p35e8f7c0} fill="var(--fill-0, #1D1D1D)" id="Vector_2" />
          <path d={svgPaths.p366bd700} fill="var(--fill-0, #1D1D1D)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[160px]">
      <p className="font-['OPPOSans:Regular',sans-serif] leading-[0] lowercase not-italic relative shrink-0 text-[#b1b1b1] text-[0px] text-left w-[124px]">
        <span className="leading-[14px] text-[#1d1d1d] text-[14px]">-vera</span>
        <span className="leading-[14px] text-[#1d1d1d] text-[13px]">0121</span>
        <span className="leading-[14px] text-[#1d1d1d] text-[14px]">-</span>
      </p>
      <Frame />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0">
      <p className="font-['Manrope:Light',sans-serif] font-light leading-[14px] relative shrink-0 text-[#838383] text-[12px] text-left tracking-[0.48px] uppercase w-[60px]">WeChat</p>
      <Frame2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Frame" opacity="0.5">
          <path d={svgPaths.pf0ef180} fill="var(--fill-0, #1D1D1D)" id="Vector" />
          <path d={svgPaths.p35e8f7c0} fill="var(--fill-0, #1D1D1D)" id="Vector_2" />
          <path d={svgPaths.p366bd700} fill="var(--fill-0, #1D1D1D)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[160px]">
      <p className="font-['OPPOSans:Regular',sans-serif] leading-[14px] lowercase not-italic relative shrink-0 text-[#1d1d1d] text-[14px] text-left w-[124px]">vera0121@126.com</p>
      <Frame1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0">
      <p className="font-['Manrope:Light',sans-serif] font-light leading-[14px] relative shrink-0 text-[#838383] text-[12px] text-left tracking-[0.48px] uppercase w-[60px]">E-Mail</p>
      <Frame3 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#e6e6e6] content-stretch flex flex-col gap-[32px] items-start px-[48px] py-[32px] relative shrink-0">
      <Frame5 />
      <Frame7 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bottom-[115px] content-stretch flex flex-col h-[717px] items-start justify-end left-0 overflow-clip">
      <div className="bg-gradient-to-b flex-[1_0_0] from-[rgba(230,230,230,0)] min-h-px relative to-[#e6e6e6] w-full" />
      <Frame8 />
    </div>
  );
}

export default function AsideSidebarNavigation() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[64px] relative size-full" data-name="Aside - Sidebar Navigation">
      <Frame4 />
      <button className="content-stretch cursor-pointer flex flex-col items-start pb-[48px] relative shrink-0 w-[256px]" data-name="Margin">
        <Container10 />
        <Frame6 />
      </button>
    </div>
  );
}