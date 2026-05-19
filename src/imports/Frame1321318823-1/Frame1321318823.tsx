import svgPaths from "./svg-gwftmbd6ul";
import imgBackground from "./ece298d0ec2c16f10310d45724b276a6035cb503.png";
import imgAb6AXuCIxhHtMc9Ngi4Lh2TXhSha14JhZh5BCnF2TuoERjw73Otu9Ug3HcIGfFvpfFea7SdmQoe9W1IAv755Wln3IYxdSPatxKdx2LIVj2CeUDhaKsy0VtaD4Vb9FLqImuEVFjcxXLhK03Uad5WAwIZj5YTwCwAd9PlEcHlyVmvWzNf58FvEeIMwlCbqtDymWm5BKr22Boq9XWvgWLfompy8GnGYdfLdZhTrPrc8L43GXhFo4OOrotUgKdXqGpv7WlMwm5Qn9HX82 from "./5ca464b2982af38ac9a7ea1866701ae60a833af0.png";
import imgAb6AXuDz5AhEtvoheJJj7UqBSqaa22MBifdw96FxyH1Wp1R3YZuAdRzguAhEw5DFye2KTjPIIxlR26RUlawW2X3Z5DyBzCyeMThffhExBpACjR3Mi36K9DSs2DV6VSiEHpTtIzSDkx9I6A4PHv5REEwqSiQ7542Peo1BtQpGvVd2TKeZWm4LhMGxSlyfi9XbqcdnQG7ZPE8DEkQmNi9Jh2BB8YLqZb8Pd9Jig8KHo4MRb5T3QIChpbza3DIi6QvlTFdH5OFnyCaP from "./b57462095e3076343086f74b716392073cba5aec.png";

function Blockquote() {
  return (
    <div className="max-w-[768px] relative shrink-0 w-[768px]" data-name="Blockquote">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center max-w-[inherit] relative size-full">
        <div className="flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[30px] text-center whitespace-nowrap">
          <p className="leading-[40px] mb-0">“ 设计不止于形与感，</p>
          <p className="leading-[40px]">更在于它如何作用于人类经验的长河。”</p>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[10px] text-center tracking-[3px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">as ux designer — from 2021 to 2024</p>
        </div>
      </div>
    </div>
  );
}

function QuotePhilosophySection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Quote / Philosophy Section">
      <Blockquote />
      <Container />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1a1c1c] text-[30px] uppercase whitespace-nowrap">
        <p className="leading-[36px] whitespace-pre">{`UX Case study  体验设计寻踪`}</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">{`产品&设计主管 ｜ 宁波中升估价 ｜ 杉杉商业集团`}</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-[421px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading />
        <Container2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c6c6c6] text-[36px] text-right w-[44px]">
          <p className="leading-[40px]">02</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[864px]" data-name="HorizontalBorder">
      <Container1 />
      <Container3 />
    </div>
  );
}

function Background() {
  return (
    <div className="h-[370px] overflow-clip relative rounded-[2px] shrink-0 w-full" data-name="Background">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgBackground} />
      <div className="-translate-y-1/2 absolute h-[486px] left-0 top-1/2 w-[864px]" data-name="3310_1742206032_raw 1">
        <video autoPlay className="absolute max-w-none object-cover size-full" controlsList="nodownload" loop playsInline>
          <source src="/_videos/v1/2c856339829e11d00a0f250acad03dd9bed6253e" />
        </video>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e2e2e2] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">用户体验设计（主管）</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">001</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Container7 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black tracking-[-1px] whitespace-nowrap">
        <p className="leading-[36px]">地方火电厂综合平台</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-[rgba(26,28,28,0.7)] text-justify tracking-[1px] w-full">
        <p className="leading-[28px]">文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息字描述信。</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start max-w-[576px] min-w-px relative" data-name="Container">
      <Container6 />
      <Heading1 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-center tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">EXPLORE SYSTEM</p>
      </div>
    </div>
  );
}

function Container11() {
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

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button">
      <Container10 />
      <Container11 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0" data-name="Button:margin">
      <Button />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#777] text-[10px] text-right uppercase whitespace-nowrap">
        <p className="leading-[15px]">PC</p>
      </div>
      <div className="flex flex-col font-['OPPOSans:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-right uppercase whitespace-nowrap">
        <p className="leading-[16px] whitespace-pre">{`PC端  |  SaaS平台  |  重业务`}</p>
      </div>
      <ButtonMargin />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container9 />
    </div>
  );
}

function ArticleLuminaOsFeaturedLarge() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Article - Lumina OS: Featured Large">
      <Background />
      <Container4 />
    </div>
  );
}

function Background2() {
  return (
    <div className="h-[370px] relative rounded-[2px] shrink-0 w-full" data-name="Background">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgBackground} />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#e2e2e2] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">用户体验设计（主管）</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">001</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <Container15 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black tracking-[-1px] whitespace-nowrap">
        <p className="leading-[36px]">地方火电厂综合平台</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-[rgba(26,28,28,0.7)] text-justify tracking-[1px] w-full">
        <p className="leading-[28px]">文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息字描述信。</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start max-w-[576px] min-w-px relative" data-name="Container">
      <Container14 />
      <Heading2 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-center tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">EXPLORE SYSTEM</p>
      </div>
    </div>
  );
}

function Container19() {
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

function Button1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button">
      <Container18 />
      <Container19 />
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0" data-name="Button:margin">
      <Button1 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#777] text-[10px] text-right uppercase whitespace-nowrap">
        <p className="leading-[15px]">PC</p>
      </div>
      <div className="flex flex-col font-['OPPOSans:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-right uppercase whitespace-nowrap">
        <p className="leading-[16px] whitespace-pre">{`PC端  |  SaaS平台  |  重业务`}</p>
      </div>
      <ButtonMargin1 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container17 />
    </div>
  );
}

function ArticleLuminaOsFeaturedLarge1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Article - Lumina OS: Featured Large">
      <Background2 />
      <Container12 />
    </div>
  );
}

function Ab6AXuCIxhHtMc9Ngi4Lh2TXhSha14JhZh5BCnF2TuoERjw73Otu9Ug3HcIGfFvpfFea7SdmQoe9W1IAv755Wln3IYxdSPatxKdx2LIVj2CeUDhaKsy0VtaD4Vb9FLqImuEVFjcxXLhK03Uad5WAwIZj5YTwCwAd9PlEcHlyVmvWzNf58FvEeIMwlCbqtDymWm5BKr22Boq9XWvgWLfompy8GnGYdfLdZhTrPrc8L43GXhFo4OOrotUgKdXqGpv7WlMwm5Qn9HX() {
  return (
    <div className="h-[376.98px] relative shrink-0 w-full" data-name="AB6AXuCIxhHTMc9NGI4Lh2tXHSha-14jhZH5BCnF2TuoERjw73Otu9ug3HcIGfFVPF_Fea7SdmQOE9w1iAv755WLN3IYxdSPatxKDX2lIVj2ceUDhaKSY0VTA_D4Vb9FLq-imu-eVFjcxXLhK03UAD5WAwIZj5yTwCwAd9PlEcHLY_vmvWzNf58FVEeIMwlCbqtDYMWm5bKr22BOQ9xWvgWLfompy8gnGYdfLdZHTrPRC8L43gXhFO4oOrot_ugKDXqGpv7WlMwm5QN9hX82">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[133.34%] left-0 max-w-none top-[-16.67%] w-full" src={imgAb6AXuCIxhHtMc9Ngi4Lh2TXhSha14JhZh5BCnF2TuoERjw73Otu9Ug3HcIGfFvpfFea7SdmQoe9W1IAv755Wln3IYxdSPatxKdx2LIVj2CeUDhaKsy0VtaD4Vb9FLqImuEVFjcxXLhK03Uad5WAwIZj5YTwCwAd9PlEcHlyVmvWzNf58FvEeIMwlCbqtDymWm5BKr22Boq9XWvgWLfompy8GnGYdfLdZhTrPrc8L43GXhFo4OOrotUgKdXqGpv7WlMwm5Qn9HX82} />
        </div>
        <div className="absolute bg-[rgba(255,255,255,0.8)] inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[2px] shrink-0 w-full" data-name="Background">
      <Ab6AXuCIxhHtMc9Ngi4Lh2TXhSha14JhZh5BCnF2TuoERjw73Otu9Ug3HcIGfFvpfFea7SdmQoe9W1IAv755Wln3IYxdSPatxKdx2LIVj2CeUDhaKsy0VtaD4Vb9FLqImuEVFjcxXLhK03Uad5WAwIZj5YTwCwAd9PlEcHlyVmvWzNf58FvEeIMwlCbqtDymWm5BKr22Boq9XWvgWLfompy8GnGYdfLdZhTrPrc8L43GXhFo4OOrotUgKdXqGpv7WlMwm5Qn9HX />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#e2e2e2] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">用户体验设计（主管）</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">002</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Background5 />
      <Container22 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[-1px] whitespace-nowrap">
        <p className="leading-[32px]">奥莱线上商城小程序</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] pb-[16px] pr-[24px] pt-[4px] relative shrink-0 w-[448px]" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-[rgba(26,28,28,0.7)] text-justify tracking-[1px] w-full">
        <p className="leading-[28px]">文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息。</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[5px] relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[10px] text-center tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">VIEW PROTOTYPE</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Heading3 />
      <Container23 />
      <Button2 />
    </div>
  );
}

function ArticleEchoSyntaxMediumLeft() {
  return (
    <div className="content-stretch flex flex-col gap-[24.01px] items-start pb-[96.34px] relative shrink-0 w-[484px]" data-name="Article - Echo Syntax: Medium Left">
      <Background4 />
      <Container20 />
    </div>
  );
}

function Ab6AXuDz5AhEtvoheJJj7UqBSqaa22MBifdw96FxyH1Wp1R3YZuAdRzguAhEw5DFye2KTjPIIxlR26RUlawW2X3Z5DyBzCyeMThffhExBpACjR3Mi36K9DSs2DV6VSiEHpTtIzSDkx9I6A4PHv5REEwqSiQ7542Peo1BtQpGvVd2TKeZWm4LhMGxSlyfi9XbqcdnQG7ZPE8DEkQmNi9Jh2BB8YLqZb8Pd9Jig8KHo4MRb5T3QIChpbza3DIi6QvlTFdH5OFnyCaP() {
  return (
    <div className="h-[345.33px] relative shrink-0 w-full" data-name="AB6AXuDZ5AHEtvoheJJj7uqBSqaa22MBifdw96FxyH1wp1r3yZUAdRzguAh-Ew5dFYE2KTj_pIIxlR26_RUlawW2X3z5DYBzCyeMThffhExBpACjR3Mi36k9dSs2_dV6vSiEHpTtIzS_Dkx9I6a4pHV5rEEwqSiQ7542Peo1btQPGvVD2tKeZWm4lhMGxSlyfi9XbqcdnQ_g7zP-E8DEkQmNI9Jh2-bB8yLqZB8PD9JIG8kHO4mRB5t3qIChpbza3dII6QvlTFdH5oFNYCaP">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAb6AXuDz5AhEtvoheJJj7UqBSqaa22MBifdw96FxyH1Wp1R3YZuAdRzguAhEw5DFye2KTjPIIxlR26RUlawW2X3Z5DyBzCyeMThffhExBpACjR3Mi36K9DSs2DV6VSiEHpTtIzSDkx9I6A4PHv5REEwqSiQ7542Peo1BtQpGvVd2TKeZWm4LhMGxSlyfi9XbqcdnQG7ZPE8DEkQmNi9Jh2BB8YLqZb8Pd9Jig8KHo4MRb5T3QIChpbza3DIi6QvlTFdH5OFnyCaP} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[2px] shrink-0 w-full" data-name="Background">
      <Ab6AXuDz5AhEtvoheJJj7UqBSqaa22MBifdw96FxyH1Wp1R3YZuAdRzguAhEw5DFye2KTjPIIxlR26RUlawW2X3Z5DyBzCyeMThffhExBpACjR3Mi36K9DSs2DV6VSiEHpTtIzSDkx9I6A4PHv5REEwqSiQ7542Peo1BtQpGvVd2TKeZWm4LhMGxSlyfi9XbqcdnQG7ZPE8DEkQmNi9Jh2BB8YLqZb8Pd9Jig8KHo4MRb5T3QIChpbza3DIi6QvlTFdH5OFnyCaP />
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#e2e2e2] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold','Noto_Sans_SC:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">{`产品经理 & UX设计`}</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#5e5e5e] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">003</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Background7 />
      <Container26 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Manrope:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[-1px] whitespace-nowrap">
        <p className="leading-[32px]">中升营销管理系统</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] pb-[16px] pt-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-[rgba(26,28,28,0.7)] text-justify tracking-[1px] w-full">
        <p className="leading-[28px]">文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字。</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[5px] relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[10px] text-center tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">VIEW PROTOTYPE</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Heading4 />
      <Container27 />
      <Button3 />
    </div>
  );
}

function ArticlePrismCoreMediumRightAsymmetric() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Article - Prism Core: Medium Right (Asymmetric)">
      <Background6 />
      <Container24 />
    </div>
  );
}

function ArticlePrismCoreMediumRightAsymmetricMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[128px] relative shrink-0 w-[332px]" data-name="Article - Prism Core: Medium Right (Asymmetric):margin">
      <ArticlePrismCoreMediumRightAsymmetric />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[864px]">
      <ArticleEchoSyntaxMediumLeft />
      <ArticlePrismCoreMediumRightAsymmetricMargin />
    </div>
  );
}

function ProductGridAsymmetricBento() {
  return (
    <div className="content-stretch flex flex-col gap-[96px] items-start relative shrink-0 w-[864px]" data-name="Product Grid (Asymmetric Bento)">
      <ArticleLuminaOsFeaturedLarge />
      <ArticleLuminaOsFeaturedLarge1 />
      <Frame1 />
    </div>
  );
}

function SectionBentoGridProjectsAiProducts() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section - Bento Grid Projects: AI Products">
      <div className="content-stretch flex flex-col gap-[72px] items-start pt-[72px] px-[80px] relative size-full">
        <HorizontalBorder />
        <ProductGridAsymmetricBento />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[#e6e6e6] content-stretch flex flex-col gap-[72px] items-start pb-[72px] pt-[144px] relative size-full">
      <QuotePhilosophySection />
      <SectionBentoGridProjectsAiProducts />
    </div>
  );
}