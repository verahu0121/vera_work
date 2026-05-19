import svgPaths from "./svg-9lhe6139vs";
import imgAiVisual from "./8e4d38fb3b68dbaa2053c35cf8593579682102fb.png";
import imgAiVisual1 from "./9c03b298743328ce710cfeb31bb76290734b0619.png";
import imgAiVisual2 from "./0992d23084382dbdd94b84c7e501894e6cf58845.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[30px] uppercase whitespace-nowrap">
        <p className="leading-[36px] whitespace-pre">{`AI Products  智能产品探索`}</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] uppercase w-[337.58px]">
        <p className="leading-[20px]">ai产品经理 ｜ 时代之门（上海）科技有限公司</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-[391px]" data-name="Container">
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
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] relative shrink-0 text-[#c6c6c6] text-[36px] text-right w-[44px]">
          <p className="leading-[40px]">01</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-start justify-between max-w-[1024px] min-w-[864px] relative shrink-0 w-[864px]" data-name="HorizontalBorder">
      <Container />
      <Container2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[15px]">AI 产品经理</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Regular','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#292929] text-[30px] tracking-[-1px] w-full">
        <p className="font-['Manrope:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium">
          <span className="leading-[36px]">{`AIEO `}</span>
          <span className="leading-[36px] tracking-[-1px]">创作与分发平台</span>
        </p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Heading1 />
    </div>
  );
}

function AiVisual() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="AI Visual">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[118.64%] left-[-7.96%] max-w-none top-[-9.23%] w-[116.15%]" src={imgAiVisual} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="content-stretch flex flex-col h-[273px] items-start justify-center overflow-clip relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-saturation pointer-events-none" />
      <AiVisual />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[32px] relative shrink-0 w-full" data-name="Margin">
      <Background />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">{`pc & 小程序客户端 + 后管平台 • 2026`}</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Container">
          <path d={svgPaths.p1e74ffc0} fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Project() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative" data-name="Project 1">
      <div className="content-stretch flex flex-col items-start p-[32px] relative size-full">
        <Container4 />
        <Margin />
        <Container6 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] tracking-[1px] uppercase w-[64px]">
        <p className="leading-[15px]">who</p>
      </div>
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[6px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[6px] relative w-[8px]">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.9282 4.5">
                <path d={svgPaths.p1709db80} fill="var(--fill-0, #6B6B6B)" id="Polygon 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button className="cursor-pointer flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px not-italic relative text-[#aeaeae] text-[10px] text-center tracking-[1px] uppercase">
        <p className="leading-[15px]">what</p>
      </button>
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[6px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[6px] relative w-[8px]">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.9282 4.5">
                <path d={svgPaths.p1709db80} fill="var(--fill-0, #AEAEAE)" id="Polygon 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button className="cursor-pointer flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px not-italic relative text-[#aeaeae] text-[10px] text-center tracking-[1px] uppercase">
        <p className="leading-[15px]">why</p>
      </button>
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[6px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[6px] relative w-[8px]">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.9282 4.5">
                <path d={svgPaths.p1709db80} fill="var(--fill-0, #AEAEAE)" id="Polygon 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button className="cursor-pointer flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aeaeae] text-[10px] text-right tracking-[1px] uppercase w-[64px]">
        <p className="leading-[15px]">how</p>
      </button>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[30px] uppercase whitespace-nowrap">
        <p className="leading-[36px]">角色定位</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[320px] px-[3.58px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Italic','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal h-[59px] italic justify-center leading-[0] relative shrink-0 text-[#4a4a4a] text-[18px] text-center w-[312.84px]">
        <p className="leading-[29.25px]">一句话描述角色定位</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px relative w-full" data-name="Container">
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] tracking-[1.2px] uppercase w-[134.31px]">
        <p className="leading-[16px]">Algorithm • Beta</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container13 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Project />
      <div className="bg-[#e6e6e6] flex-[1_0_0] h-[500px] min-w-px relative" data-name="project 1">
        <div className="content-stretch flex flex-col items-start justify-between p-[32px] relative size-full">
          <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-[368px]" data-name="Container">
            <Container9 />
            <Heading2 />
          </div>
          <Container10 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[10px] tracking-[1px] uppercase w-[64px]">
        <p className="leading-[15px]">who</p>
      </div>
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[6px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[6px] relative w-[8px]">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.9282 4.5">
                <path d={svgPaths.p1709db80} fill="var(--fill-0, #6B6B6B)" id="Polygon 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button className="cursor-pointer flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px not-italic relative text-[#aeaeae] text-[10px] text-center tracking-[1px] uppercase">
        <p className="leading-[15px]">what</p>
      </button>
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[6px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[6px] relative w-[8px]">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.9282 4.5">
                <path d={svgPaths.p1709db80} fill="var(--fill-0, #AEAEAE)" id="Polygon 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button className="cursor-pointer flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px not-italic relative text-[#aeaeae] text-[10px] text-center tracking-[1px] uppercase">
        <p className="leading-[15px]">why</p>
      </button>
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[6px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[6px] relative w-[8px]">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.9282 4.5">
                <path d={svgPaths.p1709db80} fill="var(--fill-0, #AEAEAE)" id="Polygon 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button className="cursor-pointer flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#aeaeae] text-[10px] text-right tracking-[1px] uppercase w-[64px]">
        <p className="leading-[15px]">how</p>
      </button>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b6b] text-[30px] uppercase whitespace-nowrap">
        <p className="leading-[36px]">角色定位</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[320px] px-[3.58px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Italic','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal h-[59px] italic justify-center leading-[0] relative shrink-0 text-[#4a4a4a] text-[18px] text-center w-[312.84px]">
        <p className="leading-[29.25px]">一句话描述角色定位</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px relative w-full" data-name="Container">
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] tracking-[1.2px] uppercase w-[134.31px]">
        <p className="leading-[16px]">Algorithm • Beta</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[15px]">ai产品经理，视觉设计负责人</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#292929] text-[30px] tracking-[-1px] w-full">
        <p className="leading-[36px]">鹤元家政2.0智能系统</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[32px] pb-[16px] right-[32px] top-[32px]" data-name="Container">
      <Container21 />
      <Heading4 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">小程序客户端 + 业务中台 • 2025</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Container">
          <path d={svgPaths.p1e74ffc0} fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[32px] right-[32px] top-[444px]" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function AiVisual1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="AI Visual">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[115.43%] left-[-6.7%] max-w-none top-[-7.51%] w-[113.29%]" src={imgAiVisual1} />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px overflow-clip relative w-full" data-name="Background">
      <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-saturation pointer-events-none" />
      <AiVisual1 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[115px_32px_56px_32px] items-start justify-center py-[32px]" data-name="Margin">
      <Background1 />
    </div>
  );
}

function Project1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[500px] min-w-px relative" data-name="Project 2">
      <Container20 />
      <Container22 />
      <Margin1 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#e6e6e6] flex-[1_0_0] h-[500px] min-w-px relative" data-name="project 2">
        <div className="content-stretch flex flex-col items-start justify-between p-[32px] relative size-full">
          <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-[368px]" data-name="Container">
            <Container15 />
            <Heading3 />
          </div>
          <Container16 />
          <Container18 />
        </div>
      </div>
      <Project1 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[15px]">ai产品经理，视觉设计负责人</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#292929] text-[30px] tracking-[-1px] w-full">
        <p className="leading-[36px]">时代之言智能体中心</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[32px] pb-[16px] right-[32px] top-[32px]" data-name="Container">
      <Container27 />
      <Heading5 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">pc客户端 + 后管平台 • 2025</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Container">
          <path d={svgPaths.p1e74ffc0} fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[32px] right-[32px] top-[444px]" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function AiVisual2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="AI Visual">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[101.9%] left-[0.23%] max-w-none top-[-0.87%] w-[99.77%]" src={imgAiVisual2} />
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px overflow-clip relative w-full" data-name="Background">
      <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-saturation pointer-events-none" />
      <AiVisual2 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[115px_32px_56px_32px] items-start justify-center py-[32px]" data-name="Margin">
      <Background2 />
    </div>
  );
}

function Project2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[500px] min-w-px relative" data-name="Project 1">
      <Container26 />
      <Container28 />
      <Margin2 />
    </div>
  );
}

function Group() {
  return (
    <div className="h-[44.764px] relative shrink-0 w-[55px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.9998 44.764">
        <g id="Group 1">
          <g id="Union">
            <path d={svgPaths.p2dfdf508} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pe935180} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p27f4a800} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2c957700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p144f200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p18b7a680} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p1897a580} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.p1c6e3bf0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p19d27a00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p25d76500} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p17b15200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p21fb5f0} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p2ca16500} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.p7b76020} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p21471ac0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3493bb00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1eac9500} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3a2e7380} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1a895700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1e891300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p27762800} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3d536af0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pf0e0f80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p7cb5380} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pd750e00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1a213980} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1df0c100} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p15c61000} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p308e2c00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1c991d00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3702f400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2aca6e00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p29779cf0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3684f380} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p10b9100} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.peb5f280} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p38f4d200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p37ae03c0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3c607f00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p232cd700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2ee11d40} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pff97780} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p332847c0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p15448300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p274da780} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p29182300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p13bd1d00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p22969880} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1f217180} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p18cbd040} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p22e7be00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p7e10000} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p187aee00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pc24f500} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pa05bf00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1a57b700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p23144f00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p312e3000} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2127d500} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p122d6d80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p27319400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3daa1f0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p22f65780} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2899f700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pa255300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2af9d600} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p12e19080} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1f82f700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p7e09100} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p14bf0900} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pb2d1700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3a2a6400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2d056f80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pe336bf2} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1ed1a180} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p280bf820} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p37a46880} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p27aa5e80} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.p25718580} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3ddc07f0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p20ef800} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p227e4f80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p293ccd00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p10e19d00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pbdc7500} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3bae8a00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2d1a0500} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p6afba80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pf741700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p29ab800} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p12064e80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p215ac480} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p20afb500} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3f802e80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2649d500} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p30915800} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2f3d0d80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2d7ef500} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p17da7b00} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.p17f1ea00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p11b87900} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pd53d200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p34cec700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2de16400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p22d11e00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p314e7840} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2b6cb680} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p122a8a80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1fa15200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p392f7740} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p28ccec00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p30038d80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p5d94a00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pa8a2980} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1df51972} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p25984900} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.paa76e00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p32ae1580} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p4067000} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2aca5d00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p5fed100} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p32702b00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1dbf0080} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p28ffa200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p16df2c80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p36abf480} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3f227e00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p12a1b7e0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.peb65680} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2c6bfb00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3e2c4d00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2337400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p271812c0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p21521180} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1659b080} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pd9b7f00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3bec6280} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3f7ffa00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p141a0880} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1c7fb4c0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2328dce0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pa199e31} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p260d7800} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p10bc2c00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p25b8f900} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p31286570} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1e699b00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p29f75000} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p279ab80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p57e1e00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p5594600} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3c41cf00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p28e10e80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p23c3bce0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3898f280} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p39ec4c0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p6fe2d70} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3fcfc00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3940a200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3f9dc680} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p277cf300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p117e1a00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p29714d40} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3de9a080} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p4730a00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3d217d00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1aad6900} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p194d7900} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p4a71e00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3edb04f0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pcf6d100} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p97d1f00} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.p1823d000} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3ec14200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pedfb200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1cb5400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p29087200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2c4c9280} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2f4e8400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p23667d80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p10658180} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p38cf8a00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2d816b00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p12364300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p12138f80} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p18de7b80} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.pabfd680} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p16db3d80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3a093380} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p20d60b80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p18678200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pd9d67c0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1837400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p73e5400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p14619200} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p10f63d00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p240f5a00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3edb4600} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1d706940} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pc752bc0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p38f95a40} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2c222180} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3683a780} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p216f5800} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3fda7ff0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2ffbd480} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p607a880} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p30f2ec80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p4c1d300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3cbe8600} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p380d4400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p198cc300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p5fc0980} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p18b77280} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p16e71580} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p43b4a0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p23bf0400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p284d2900} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p17f73300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2941a380} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1392cb00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p23bef400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p27f8efc0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3a86a480} fill="var(--fill-0, #E8E8E8)" />
          </g>
          <g id="Union_2">
            <path d={svgPaths.p58b000} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1f818540} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p2607cc00} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.p308fe100} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p139813c0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1a5e3ac0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pd05e72} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p34c09680} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.p28a6c380} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p16fb2580} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pb57a780} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p310b100} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3b397580} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3b1a8b70} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3ca2cd80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pcb9f5c0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p36736e00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2356e480} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p1d85d680} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.p3131a300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1cc5b380} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p26ede800} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p32896300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2471c600} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p24d4f600} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pdb27300} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1e2f1d00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pf4b7700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p14266500} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p31d6900} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p29d6a1c0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p31685b00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p2436da00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p22ac44f0} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p229b5970} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p167fd00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p358fe700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p312e0580} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p5e2a140} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1188c00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p124c2300} fill="var(--fill-0, #E8E8E8)" />
            <path clipRule="evenodd" d={svgPaths.p775e680} fill="var(--fill-0, #E8E8E8)" fillRule="evenodd" />
            <path d={svgPaths.p4647400} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p22536670} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3fb1e80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1d4f5680} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.pe22ddd6} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p19f60b00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p18b7aa00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3a06a980} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p39569700} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1a85ed00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p18266800} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p52ac00} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p327d8600} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p1a319600} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p3a3b0480} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p337bc880} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p12d6ae80} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p39169380} fill="var(--fill-0, #E8E8E8)" />
            <path d={svgPaths.p31f1b00} fill="var(--fill-0, #E8E8E8)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col h-[55px] items-center justify-center relative shrink-0">
      <Group />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0" data-name="Margin">
      <Frame1 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-center pl-[54.69px] pr-[54.7px] relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#e8e8e8] text-[30px] text-center whitespace-nowrap">
        <p className="leading-[36px] whitespace-pre">{`Vera’s  Libertisle`}</p>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0" data-name="Heading 3:margin">
      <Heading6 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[384px] pl-[14.88px] pr-[14.89px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">更多项目，即刻前往Vera的产品创意岛~</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[384px] pb-[32px] relative shrink-0" data-name="Margin">
      <Container31 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Heading3Margin />
      <Margin4 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#1a1c1c] flex-[1_0_0] min-w-px relative rounded-[2px] self-stretch" data-name="Background">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between px-[48px] py-[96px] relative size-full">
          <Margin3 />
          <Frame2 />
          <div className="bg-[#e8e8e8] content-stretch flex flex-col items-center justify-center px-[40px] py-[20px] relative rounded-[2px] shrink-0" data-name="Button">
            <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold h-[20px] justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[14px] text-center tracking-[1.4px] uppercase w-[112.41px]">
              <p className="leading-[20px]">Get In Touch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-start max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <Project2 />
      <Background3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1024px] min-w-[864px] relative shrink-0 w-[864px]">
      <Container3 />
      <Container14 />
      <Container25 />
    </div>
  );
}

export default function SectionBentoGridProjectsAiProducts() {
  return (
    <div className="content-stretch flex flex-col gap-[72px] items-center pb-[80px] pt-[72px] px-[80px] relative size-full" data-name="Section - Bento Grid Projects: AI Products">
      <HorizontalBorder />
      <Frame />
    </div>
  );
}