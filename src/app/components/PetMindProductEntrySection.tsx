import React from "react";

const ASSETS = {
  sectionDecor: "/figma-assets/petmind-entry-03-section-decor.svg",
  triangle: "/figma-assets/petmind-entry-03-triangle.svg",
  question: "/figma-assets/petmind-entry-03-question.svg",
  answer: "/figma-assets/petmind-entry-03-answer.svg",
} as const;

type EntryPathRow = {
  nodeId: string;
  heightClass: string;
  path: string;
  pathDetail?: string;
  advantage: string;
  issue: string;
  position: string;
  selected?: boolean;
};

const ENTRY_PATH_ROWS = [
  {
    nodeId: "2664:30827",
    heightClass: "h-[60px]",
    path: "完整门店经营系统",
    advantage: "能覆盖完整经营流程",
    issue: "市场成熟、替换成本高，容易陷入收银、库存、会员等功能竞争",
    position: "作为履约底座，不作为核心切口",
  },
  {
    nodeId: "2664:30828",
    heightClass: "h-[36px]",
    path: "独立 C 端 AI 助手",
    advantage: "情感价值和长期关系想象力强",
    issue: "冷启动阶段缺少真实、连续、可信的宠物数据",
    position: "作为关系承接端，不适合单独起步",
  },
  {
    nodeId: "2664:30829",
    heightClass: "h-[60px]",
    path: "GEO 获客入口",
    advantage: "有助于提升 AI 搜索场景中的门店可见度与新客触达",
    issue: "如果没有预约、履约和会员承接，容易停留在曝光层",
    position: "作为增长引擎，不作为最初入口",
  },
  {
    nodeId: "2664:30830",
    heightClass: "h-[56px]",
    path: "服务履约入口",
    pathDetail: "一次真实服务",
    advantage: "在履约中自然发生，包含真实状态与服务信息，价值可即时感知",
    issue: "需要降低现场记录成本，并连接后续行动",
    position: "作为产品的第一入口",
    selected: true,
  },
] as const satisfies readonly EntryPathRow[];

const TABLE_HEADERS = ["候选切入路径", "优势", "核心问题", "在 PetMind AI 中的定位"] as const;

function PetMindProductEntryDivider() {
  return (
    <div className="content-stretch flex h-[94px] gap-[24px] items-end pt-[28px] relative shrink-0 w-full" data-node-id="2664:30807" data-name="Section Divider">
      <div className="absolute h-[32px] left-0 top-[8px] w-[372px]" data-name="标题辅助装饰">
        <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={ASSETS.sectionDecor} />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start justify-end min-w-px opacity-80 relative">
        <div className="content-stretch flex gap-[12px] items-end relative shrink-0">
          <div className="[word-break:break-word] flex flex-col font-['Alibaba_PuHuiTi_2.0:115_Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#181818] text-[36px] whitespace-nowrap">
            <p className="leading-[30px]">03 · 从连续关系到产品入口</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="relative size-[18px]">
                <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={ASSETS.triangle} />
              </div>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-justify w-[min-content]">
          <p className="leading-[20px]">连续关系是长期目标，但产品需要一个自然发生、数据真实且价值可见的第一入口。</p>
        </div>
      </div>
    </div>
  );
}

function PetMindProductEntryPrompt({ kind }: { kind: "question" | "answer" }) {
  const isQuestion = kind === "question";

  return (
    <div
      className={`bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex flex-col gap-[16px] ${isQuestion ? "h-[121px]" : "h-[145px]"} items-start justify-center px-[24px] py-[20px] relative rounded-[8px] shrink-0 w-full`}
      data-node-id={isQuestion ? "2664:30808" : "2664:30831"}
      data-name="Quote Details"
    >
      <div className={`content-stretch flex gap-[8px] ${isQuestion ? "items-center" : "items-start w-full"} relative rounded-[4px] shrink-0`}>
        <div className="relative shrink-0 size-[24px]">
          <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={isQuestion ? ASSETS.question : ASSETS.answer} />
        </div>
        <div className={`[word-break:break-word] flex ${isQuestion ? "shrink-0" : "flex-[1_0_0] min-w-px"} flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative text-[#474747] text-[16px]`}>
          <p className="leading-[24px]">
            {isQuestion
              ? "发现“长期关系资产”这个机会后，PetMind AI 应该从哪里开始？"
              : "PetMind AI 应该从一次真实宠物服务开始。"}
          </p>
        </div>
      </div>
      <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" />
      {isQuestion ? (
        <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#474747] text-[12px] text-justify uppercase w-[min-content]">
          <p className="leading-[24px]">我比较了四条真实考虑过的候选路径，判断哪一条最适合作为产品起点。</p>
        </div>
      ) : (
        <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[12px] text-justify w-full">
          <p className="leading-[24px] mb-0">我最终选择服务履约作为入口，因为一次真实服务同时具备自然发生、数据真实、价值即时可见和能够触发下一步四个条件。</p>
          <p>
            <span className="leading-[24px]">PetMind AI 不从重做一套门店 SaaS、独立 C 端助手或单一获客工具开始，而是</span>
            <span className="[word-break:break-word] font-['OPPOSans:Medium',sans-serif] leading-[24px] not-italic">先让一次真实服务成为可被理解、被延续的最小事件单元</span>
            <span className="leading-[24px]">。</span>
          </p>
        </div>
      )}
    </div>
  );
}

function PetMindProductEntryBlockTitle() {
  return (
    <div className="content-stretch flex gap-[12px] h-[54px] items-start relative shrink-0 w-full" data-node-id="2664:30816" data-name="Quote Container">
      <div className="content-stretch flex h-[32px] items-center relative shrink-0" data-name="Divider Icon Container">
        <div className="bg-[#474747] h-[16px] opacity-25 relative shrink-0 w-[4px]" data-name="Divider Icon" />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center leading-[0] min-w-px not-italic relative text-[#414141]">
        <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center relative shrink-0 text-[20px] whitespace-nowrap">
          <p className="leading-[32px]">入口选择</p>
        </div>
        <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center min-w-full opacity-65 relative shrink-0 text-[12px] text-justify w-[min-content]">
          <p className="leading-[20px]">评估维度：信息密度 × 使用动机 × 经营价值</p>
        </div>
      </div>
    </div>
  );
}

function PetMindProductEntryTableHeader() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full shadow-[inset_0_-1px_0_#d2d2d2]" data-node-id="2664:30818">
      {TABLE_HEADERS.map((header, index) => (
        <div
          className={`bg-[#e0e0e0] content-stretch flex h-full items-center px-[12px] py-[6px] relative shrink-0 ${index < TABLE_HEADERS.length - 1 ? "shadow-[inset_-1px_0_0_#d2d2d2]" : ""} ${index === 0 ? "w-[124px]" : index === 1 ? "w-[224px]" : "flex-[1_0_0] min-w-px"}`}
          key={header}
        >
          <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Medium',sans-serif] leading-[20px] min-w-px not-italic relative text-[11px] text-[rgba(71,71,71,0.8)] text-justify">
            {header}
          </p>
        </div>
      ))}
    </div>
  );
}

function PetMindProductEntryTableRow({ row, rowIndex }: { row: EntryPathRow; rowIndex: number }) {
  const cells = [row.path, row.advantage, row.issue, row.position] as const;

  return (
    <div
      className={`content-stretch flex ${row.heightClass} items-start relative shrink-0 w-full ${rowIndex < ENTRY_PATH_ROWS.length - 1 ? "shadow-[inset_0_-1px_0_#d2d2d2]" : ""}`}
      data-node-id={row.nodeId}
      data-name="Section content item"
      style={row.selected ? { backgroundImage: "linear-gradient(90deg, rgba(104, 126, 184, 0.1) 0%, rgba(104, 126, 184, 0.1) 100%), linear-gradient(90deg, rgb(233, 233, 233) 0%, rgb(233, 233, 233) 100%)" } : undefined}
    >
      {cells.map((cell, cellIndex) => {
        const firstCell = cellIndex === 0;
        const lastCell = cellIndex === cells.length - 1;

        return (
          <div
            className={`content-stretch flex h-full items-center relative shrink-0 ${firstCell && row.selected ? "bg-[rgba(104,126,184,0.05)] p-[12px]" : "px-[12px] py-[6px]"} ${firstCell && !row.selected ? "bg-[rgba(224,224,224,0.5)]" : ""} ${!lastCell ? "shadow-[inset_-1px_0_0_#d2d2d2]" : ""} ${cellIndex === 0 ? "w-[124px]" : cellIndex === 1 ? "w-[224px]" : "flex-[1_0_0] min-w-px"}`}
            key={`${row.nodeId}-${cellIndex}`}
          >
            {firstCell && row.selected ? (
              <div className="[word-break:break-word] font-['OPPOSans:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[#474747] text-[11px] text-justify whitespace-nowrap">
                <p className="leading-[16px] mb-0">{cell}</p>
                <p className="font-['OPPOSans:Light',sans-serif] leading-[16px]">{row.pathDetail}</p>
              </div>
            ) : (
              <p className={`[word-break:break-word] flex-[1_0_0] ${firstCell ? "font-['OPPOSans:Medium',sans-serif] whitespace-nowrap" : lastCell && row.selected ? "font-['OPPOSans:Medium',sans-serif]" : "font-['OPPOSans:Regular',sans-serif]"} leading-[20px] min-w-px not-italic relative text-[11px] ${row.selected ? "text-[#474747]" : "text-[rgba(71,71,71,0.8)]"} text-justify`}>
                {cell}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PetMindProductEntryTable() {
  return (
    <div className="content-stretch flex h-[244px] flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="2664:30817" data-name="Section content container">
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[4px] z-10" />
      <PetMindProductEntryTableHeader />
      {ENTRY_PATH_ROWS.map((row, rowIndex) => (
        <PetMindProductEntryTableRow key={row.nodeId} row={row} rowIndex={rowIndex} />
      ))}
    </div>
  );
}

function PetMindProductEntryDecision() {
  return (
    <div className="content-stretch flex h-[318px] flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="2664:30815" data-name="Blockquote">
      <PetMindProductEntryBlockTitle />
      <PetMindProductEntryTable />
    </div>
  );
}

export function PetMindProductEntrySection({
  sectionId,
  sectionRef,
}: {
  sectionId: string;
  sectionRef: (node: HTMLElement | null) => void;
}) {
  return (
    <section
      ref={sectionRef}
      id={`petmind-detail-section-${sectionId}`}
      className="content-stretch flex h-[1026px] flex-col gap-[84px] items-start py-[48px] relative shrink-0 w-[864px]"
      data-node-id="2664:30806"
      data-section-id={sectionId}
      data-name="Section Container 7"
    >
      <PetMindProductEntryDivider />
      <PetMindProductEntryPrompt kind="question" />
      <PetMindProductEntryDecision />
      <PetMindProductEntryPrompt kind="answer" />
    </section>
  );
}
