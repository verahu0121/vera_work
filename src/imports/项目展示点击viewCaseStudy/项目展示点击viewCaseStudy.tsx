import svgPaths from "./svg-w9vfxpysji";
import imgRectangle18251 from "./ece298d0ec2c16f10310d45724b276a6035cb503.png";

function Heading() {
  return (
    <div className="content-stretch flex font-extrabold gap-[12px] items-center leading-[0] relative shrink-0 text-black w-full whitespace-nowrap" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold','Noto_Sans_JP:Black','Noto_Sans_SC:Black',sans-serif] justify-center relative shrink-0 text-[72px]">
        <p className="leading-[72px]">{`产业赛道 `}</p>
      </div>
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] justify-center relative shrink-0 text-[80px] tracking-[2px]">
        <p className="leading-[72px]">AI</p>
      </div>
      <div className="flex flex-col font-['Manrope:ExtraBold','Noto_Sans_JP:Black','Noto_Sans_SC:Black',sans-serif] justify-center relative shrink-0 text-[72px]">
        <p className="leading-[72px]">赋能</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[18px] w-full">
        <p className="leading-[32px]">以实践丰盈阅历，以成长奔赴热爱，在 AI 赛道慢慢沉淀，步步生辉。</p>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[768px] relative shrink-0 w-[768px]" data-name="Header Section">
      <Heading />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[12px] tracking-[2.4px] uppercase w-full">
        <p className="leading-[16px]">PROJECT 01 / 2026.04</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black w-full">
        <p className="leading-[40px]">项目名称01</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#ddd] relative rounded-[12px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[12px] py-[4px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">标签01</p>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#ddd] relative rounded-[12px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[12px] py-[4px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">标签02</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-start relative shrink-0 w-full" data-name="Container">
      <Background />
      <Background1 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.pce77c00} fill="var(--fill-0, #1A1C1C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pb-[5px] relative shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">VIEW CASE STUDY</p>
      </div>
      <Container4 />
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0" data-name="Link:margin">
      <Link />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="Container">
      <Container2 />
      <Heading1 />
      <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#1a1c1c] text-[16px] w-[min-content]">
        <p className="leading-[32px]">项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信字信息。</p>
      </div>
      <Margin />
      <LinkMargin />
    </div>
  );
}

function Background2() {
  return (
    <div className="h-[290px] overflow-clip relative rounded-[2px] shrink-0 w-[464px]" data-name="Background">
      <div className="absolute h-[290px] left-0 top-0 w-[464px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle18251} />
      </div>
    </div>
  );
}

function SectionProjectListNebulaFinancial() {
  return (
    <div className="content-stretch flex gap-[64px] items-start pb-[32px] relative shrink-0 w-full" data-name="Section - Project List: Nebula Financial">
      <Container1 />
      <Background2 />
    </div>
  );
}

function Background3() {
  return (
    <div className="h-[290px] overflow-clip relative rounded-[2px] shrink-0 w-[464px]" data-name="Background">
      <div className="absolute h-[290px] left-0 top-0 w-[464px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle18251} />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[12px] tracking-[2.4px] uppercase w-full">
        <p className="leading-[16px]">PROJECT 02 / 2026.04</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black w-full">
        <p className="leading-[40px]">项目名称02</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#ddd] relative rounded-[12px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[12px] py-[4px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">标签01</p>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#ddd] relative rounded-[12px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[12px] py-[4px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">标签02</p>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-start relative shrink-0 w-full" data-name="Container">
      <Background4 />
      <Background5 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.pce77c00} fill="var(--fill-0, #1A1C1C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pb-[5px] relative shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">VIEW CASE STUDY</p>
      </div>
      <Container8 />
    </div>
  );
}

function LinkMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0" data-name="Link:margin">
      <Link1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="Container">
      <Container6 />
      <Heading2 />
      <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#1a1c1c] text-[16px] w-[min-content]">
        <p className="leading-[32px]">项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信字信息。</p>
      </div>
      <Margin1 />
      <LinkMargin1 />
    </div>
  );
}

function SectionProjectListNebulaFinancial1() {
  return (
    <div className="content-stretch flex gap-[64px] items-start pb-[32px] relative shrink-0 w-full" data-name="Section - Project List: Nebula Financial">
      <Background3 />
      <Container5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[12px] tracking-[2.4px] uppercase w-full">
        <p className="leading-[16px]">PROJECT 03 / 2026.04</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['OPPOSans:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black w-full">
        <p className="leading-[40px]">项目名称03</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#ddd] relative rounded-[12px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[12px] py-[4px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">标签01</p>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#ddd] relative rounded-[12px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[12px] py-[4px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">标签02</p>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-start relative shrink-0 w-full" data-name="Container">
      <Background6 />
      <Background7 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.pce77c00} fill="var(--fill-0, #1A1C1C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pb-[5px] relative shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">VIEW CASE STUDY</p>
      </div>
      <Container12 />
    </div>
  );
}

function LinkMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0" data-name="Link:margin">
      <Link2 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="Container">
      <Container10 />
      <Heading3 />
      <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#1a1c1c] text-[16px] w-[min-content]">
        <p className="leading-[32px]">项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信字信息。</p>
      </div>
      <Margin2 />
      <LinkMargin2 />
    </div>
  );
}

function Background8() {
  return (
    <div className="h-[290px] overflow-clip relative rounded-[2px] shrink-0 w-[464px]" data-name="Background">
      <div className="absolute h-[290px] left-0 top-0 w-[464px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle18251} />
      </div>
    </div>
  );
}

function SectionProjectListNebulaFinancial2() {
  return (
    <div className="content-stretch flex gap-[64px] items-start pb-[32px] relative shrink-0 w-full" data-name="Section - Project List: Nebula Financial">
      <Container9 />
      <Background8 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#b1b1b1] text-[18px] uppercase w-full">
        <p className="leading-[28px]">Vera’s Libertisle</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading4 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container13 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#1d1d1d] text-[18px] uppercase w-full">
        <p className="leading-[28px]">AI Product</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1d] text-[10px] uppercase w-full">
        <p className="leading-[15px]">ai产品项目</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading5 />
        <Container15 />
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p3fc91b00} fill="var(--fill-0, #1D1D1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ItemLink() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item → Link">
      <div aria-hidden="true" className="absolute border-[#1d1d1d] border-l-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[48px] py-[8px] relative size-full">
          <Container16 />
          <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#1d1d1d] text-[12px] uppercase w-[63.98px]">
            <p className="leading-[16px]">about me</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[13px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
        <g id="Container">
          <path d={svgPaths.p3e016000} fill="var(--fill-0, #969696)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ItemLink1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item → Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[48px] py-[8px] relative size-full">
          <Container17 />
          <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#969696] text-[12px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">AI Products</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container18() {
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
          <Container18 />
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

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#b1b1b1] text-[18px] uppercase w-full">
        <p className="leading-[28px]">UX Design</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b1b1b1] text-[10px] uppercase w-full">
        <p className="leading-[15px]">ux设计项目</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading6 />
        <Container20 />
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container19 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#b1b1b1] text-[18px] uppercase w-full">
        <p className="leading-[28px]">Resume</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b1b1b1] text-[10px] uppercase w-full">
        <p className="leading-[15px]">个人简历</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading7 />
        <Container22 />
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container21 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full">
      <Margin3 />
      <Margin4 />
      <Nav />
      <Margin5 />
      <Margin6 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#b1b1b1] text-[18px] uppercase w-full">
        <p className="leading-[28px]">Contact Me</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b1b1b1] text-[10px] uppercase w-full">
        <p className="leading-[15px]">联系方式</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[48px] relative size-full">
        <Heading8 />
        <Container24 />
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[48px] relative shrink-0 w-full" data-name="Margin">
      <Container23 />
    </div>
  );
}

function AsideSidebarNavigation() {
  return (
    <div className="absolute content-stretch flex flex-col h-[832px] items-start left-0 pt-[64px] top-0 w-[256px]" data-name="Aside - Sidebar Navigation">
      <Frame />
      <Margin7 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start leading-[0] pt-[8px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
          <p className="leading-[24px]">火电厂智慧大屏</p>
        </div>
        <div className="capitalize flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-end min-w-full relative shrink-0 text-[12px] text-[rgba(255,255,255,0.3)] w-[min-content]">
          <p className="leading-[16px]">2024.06-2-26.04</p>
        </div>
      </div>
    </div>
  );
}

function AwardItem1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[36px] items-start min-h-px relative w-full" data-name="Award Item 8">
      <Frame5 />
      <div className="bg-[rgba(255,255,255,0.1)] h-px relative shrink-0 w-full" />
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-justify w-full">
        <p className="leading-[32px]">项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信息项目简介文字信字信息项目简介文字信字信息。</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-[40px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame 1321318875">
          <rect fill="var(--fill-0, white)" fillOpacity="0.19" height="40" rx="4" width="40" />
          <path d={svgPaths.p2bb1a100} fill="var(--fill-0, white)" fillOpacity="0.7" id="â" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[56px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Frame8 />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 size-[40px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame 1321318875">
          <rect fill="var(--fill-0, white)" fillOpacity="0.19" height="40" rx="4" width="40" />
          <path d={svgPaths.p31adbb00} fill="var(--fill-0, white)" fillOpacity="0.7" id="â" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[56px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Frame9 />
      </div>
    </div>
  );
}

function AwardItem() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Award Item 7">
      <Frame6 />
      <div className="flex flex-[1_0_0] flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[16px] text-[rgba(255,255,255,0.5)] text-center tracking-[4px]">
        <p className="leading-[24px]">1/3</p>
      </div>
      <Frame7 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="backdrop-blur-[24px] bg-[rgba(0,0,0,0.01)] flex-[1_0_0] h-full max-w-[320px] min-w-[256px] relative">
      <div className="max-w-[inherit] min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] min-w-[inherit] px-[32px] py-[72px] relative size-full">
          <AwardItem1 />
          <AwardItem />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DINOT:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e0e0e0] text-[10px] tracking-[3px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">GALLERY / 001</p>
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:ExtraBold','Noto_Sans_JP:Black','Noto_Sans_SC:Black',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#fd6d59] text-[64px] tracking-[-3.6px] whitespace-nowrap">
        <p className="leading-[84px]">火电厂智慧大屏</p>
      </div>
    </div>
  );
}

function HeaderSection1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Header Section">
      <Container25 />
      <Heading9 />
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#adadad] text-[14px] tracking-[2px] uppercase w-full">
        <p className="leading-[28px]">project English name</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#070621] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[48px] py-[96px] relative size-full">
        <HeaderSection1 />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#e6e6e6] content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-[768px] overflow-clip relative">
      <Frame10 />
      <div className="aspect-[768/653.25] relative shrink-0 w-full" data-name="项目概述1@3x 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle18251} />
      </div>
      <div className="aspect-[768/615.1875] relative shrink-0 w-full" data-name="项目概述2@3x 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle18251} />
      </div>
      <div className="aspect-[768/497.25] relative shrink-0 w-full" data-name="项目概述3@3x 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle18251} />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 size-[40px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame 1321318875">
          <rect fill="var(--fill-0, white)" fillOpacity="0.19" height="40" rx="4" width="40" />
          <path d={svgPaths.p2bb1a100} fill="var(--fill-0, white)" fillOpacity="0.7" id="â" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[56px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Frame12 />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start leading-[0] not-italic py-[8px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
          <p className="leading-[24px]">返回</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center min-w-full relative shrink-0 text-[12px] text-[rgba(255,255,255,0.3)] tracking-[-0.35px] uppercase w-[min-content]">
          <p className="leading-[16px]">go back</p>
        </div>
      </div>
    </div>
  );
}

function AwardItem2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Award Item 7">
      <div className="content-stretch flex items-start pr-[32px] relative size-full">
        <Frame11 />
        <Frame13 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[56px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['DINOT:Bold',sans-serif] justify-center leading-[0] left-1/2 not-italic text-[21px] text-[rgba(255,255,255,0.8)] text-center top-[calc(50%+0.5px)] w-[24.5px]">
          <p className="leading-[24.5px]">01</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start leading-[0] not-italic py-[8px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center relative shrink-0 text-[16px] text-white whitespace-nowrap">
          <p className="leading-[24px]">模块标题1</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center min-w-full relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] tracking-[-0.35px] w-[min-content]">
          <p className="leading-[16px]">project overview</p>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[56px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['DINOT:Bold',sans-serif] justify-center leading-[0] left-1/2 not-italic text-[21px] text-[rgba(198,198,198,0.4)] text-center top-[calc(50%+0.5px)] w-[24.5px]">
          <p className="leading-[24.5px]">02</p>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start leading-[0] not-italic py-[8px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
          <p className="leading-[24px]">模块标题2</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center min-w-full relative shrink-0 text-[12px] text-[rgba(255,255,255,0.3)] tracking-[-0.35px] w-[min-content]">
          <p className="leading-[16px]">project overview</p>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[56px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['DINOT:Bold',sans-serif] justify-center leading-[0] left-1/2 not-italic text-[21px] text-[rgba(198,198,198,0.4)] text-center top-[calc(50%+0.5px)] w-[24.5px]">
          <p className="leading-[24.5px]">03</p>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start leading-[0] not-italic py-[8px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
          <p className="leading-[24px]">模块标题3</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center min-w-full relative shrink-0 text-[12px] text-[rgba(255,255,255,0.3)] tracking-[-0.35px] w-[min-content]">
          <p className="leading-[16px]">project overview</p>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[56px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['DINOT:Bold',sans-serif] justify-center leading-[0] left-1/2 not-italic text-[21px] text-[rgba(198,198,198,0.4)] text-center top-[calc(50%+0.5px)] w-[24.5px]">
          <p className="leading-[24.5px]">04</p>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start leading-[0] not-italic py-[8px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
          <p className="leading-[24px]">模块标题4</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center min-w-full relative shrink-0 text-[12px] text-[rgba(255,255,255,0.3)] tracking-[-0.35px] w-[min-content]">
          <p className="leading-[16px]">project overview</p>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[56px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['DINOT:Bold',sans-serif] justify-center leading-[0] left-1/2 not-italic text-[21px] text-[rgba(198,198,198,0.4)] text-center top-[calc(50%+0.5px)] w-[24.5px]">
          <p className="leading-[24.5px]">05</p>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start leading-[0] not-italic py-[8px] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
          <p className="leading-[24px]">模块标题5</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center min-w-full relative shrink-0 text-[12px] text-[rgba(255,255,255,0.3)] tracking-[-0.35px] w-[min-content]">
          <p className="leading-[16px]">project overview</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="backdrop-blur-[24px] bg-[rgba(0,0,0,0.01)] flex-[1_0_0] h-full max-w-[320px] min-w-[256px] relative">
      <div className="max-w-[inherit] min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[36px] items-start max-w-[inherit] min-w-[inherit] px-[32px] py-[72px] relative size-full">
          <AwardItem2 />
          <div className="bg-[rgba(255,255,255,0.1)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Award Item 8">
            <Frame14 />
            <Frame15 />
          </div>
          <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Award Item 3">
            <Frame16 />
            <Frame17 />
          </div>
          <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Award Item 4">
            <Frame18 />
            <Frame19 />
          </div>
          <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Award Item 5">
            <Frame20 />
            <Frame21 />
          </div>
          <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Award Item 6">
            <Frame22 />
            <Frame23 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.49)] content-stretch flex h-[832px] items-start left-0 top-0 w-[1280px]">
      <Frame4 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

export default function viewCaseStudy() {
  return (
    <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start pl-[256px] relative size-full" data-name="项目展示-点击view case study">
      <div className="bg-[#e6e6e6] content-stretch flex flex-col gap-[96px] h-[832px] items-start overflow-clip px-[80px] py-[96px] relative shrink-0 w-[1024px]" data-name="select cases">
        <HeaderSection />
        <SectionProjectListNebulaFinancial />
        <div className="bg-[rgba(198,198,198,0.4)] h-px relative shrink-0 w-full" data-name="Spacer Tonal Shift" />
        <SectionProjectListNebulaFinancial1 />
        <div className="bg-[rgba(198,198,198,0.4)] h-px relative shrink-0 w-full" data-name="Spacer Tonal Shift" />
        <SectionProjectListNebulaFinancial2 />
      </div>
      <AsideSidebarNavigation />
      <Frame1 />
    </div>
  );
}