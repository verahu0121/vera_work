import svgPaths from "./svg-np5e8j71ru";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#1d1d1d] text-[18px] text-left uppercase w-full">
        <p className="leading-[28px]">Contact Me</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1d] text-[10px] text-left uppercase w-full">
        <p className="leading-[15px]">联系方式</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading />
        <Container1 />
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

function Frame4() {
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

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0">
      <p className="font-['Manrope:Light',sans-serif] font-light leading-[14px] relative shrink-0 text-[#838383] text-[12px] text-left tracking-[0.48px] uppercase w-[60px]">E-Mail</p>
      <Frame3 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#e6e6e6] content-stretch flex flex-col gap-[32px] items-start px-[48px] py-[32px] relative shrink-0">
      <Frame4 />
      <Frame6 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bottom-[115px] content-stretch flex flex-col h-[717px] items-start justify-end left-0 overflow-clip">
      <div className="bg-gradient-to-b flex-[1_0_0] from-[rgba(230,230,230,0)] min-h-px relative to-[#e6e6e6] w-full" />
      <Frame7 />
    </div>
  );
}

export default function Margin() {
  return (
    <button className="content-stretch cursor-pointer flex flex-col items-start pb-[48px] relative size-full" data-name="Margin">
      <Container />
      <Frame5 />
    </button>
  );
}