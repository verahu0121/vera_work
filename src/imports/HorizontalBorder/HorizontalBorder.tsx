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

export default function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-start justify-between relative size-full" data-name="HorizontalBorder">
      <Container />
      <Container2 />
    </div>
  );
}