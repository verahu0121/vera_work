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
      <div className="content-stretch flex flex-col items-start px-[48px] relative w-full">
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
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#6c6c6c] text-[18px] uppercase w-full">
        <p className="leading-[28px]">AI Product</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6c6c6c] text-[10px] uppercase w-full">
        <p className="leading-[15px]">ai产品项目</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative w-full">
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
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#6c6c6c] text-[18px] uppercase w-full">
        <p className="leading-[28px]">UX Design</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6c6c6c] text-[10px] uppercase w-full">
        <p className="leading-[15px]">ux设计项目</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative w-full">
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
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#6c6c6c] text-[18px] uppercase w-full">
        <p className="leading-[28px]">Resume</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6c6c6c] text-[10px] uppercase w-full">
        <p className="leading-[15px]">个人简历</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative w-full">
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

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full">
      <Margin />
      <Margin1 />
      <Margin2 />
      <Margin3 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#6c6c6c] text-[18px] uppercase w-full">
        <p className="leading-[28px]">Contact Me</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6c6c6c] text-[10px] uppercase w-full">
        <p className="leading-[15px]">联系方式</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative w-full">
        <Heading4 />
        <Container8 />
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[48px] relative shrink-0 w-full" data-name="Margin">
      <Container7 />
    </div>
  );
}

export default function AsideSidebarNavigation() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(249,249,249,0.05)] content-stretch flex flex-col items-start pt-[64px] relative size-full" data-name="Aside - Sidebar Navigation">
      <Frame />
      <Margin4 />
    </div>
  );
}