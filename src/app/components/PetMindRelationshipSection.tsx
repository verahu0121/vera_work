import React from "react";

const ASSETS = {
  sectionDecor: "/figma-assets/petmind-relationship-02-section-decor.svg",
  triangle: "/figma-assets/petmind-relationship-02-triangle.svg",
  question: "/figma-assets/petmind-relationship-02-question.svg",
  signalObservation: "/figma-assets/petmind-relationship-02-signal-observation.svg",
  signalArrow: "/figma-assets/petmind-relationship-02-signal-arrow.svg",
  signalHypothesis: "/figma-assets/petmind-relationship-02-signal-hypothesis.svg",
  signalService: "/figma-assets/petmind-relationship-02-signal-service.svg",
  note: "/figma-assets/petmind-relationship-02-note.svg",
  moduleOrder: "/figma-assets/petmind-relationship-02-module-order.svg",
  moduleProduct: "/figma-assets/petmind-relationship-02-module-product.svg",
  moduleService: "/figma-assets/petmind-relationship-02-module-service.svg",
  moduleReservation: "/figma-assets/petmind-relationship-02-module-reservation.svg",
  moduleMembership: "/figma-assets/petmind-relationship-02-module-membership.svg",
  luna: "/figma-assets/petmind-relationship-02-luna.png",
  eventWash: "/figma-assets/petmind-relationship-02-event-wash.png",
  eventFeedback: "/figma-assets/petmind-relationship-02-event-feedback.png",
  eventMedical: "/figma-assets/petmind-relationship-02-event-medical.png",
  eventFollowup: "/figma-assets/petmind-relationship-02-event-followup.png",
  timelineWash: "/figma-assets/petmind-relationship-02-timeline-wash.svg",
  timelineFeedback: "/figma-assets/petmind-relationship-02-timeline-feedback.svg",
  timelineAi: "/figma-assets/petmind-relationship-02-timeline-ai.svg",
  timelineMedical: "/figma-assets/petmind-relationship-02-timeline-medical.svg",
  timelineFollowup: "/figma-assets/petmind-relationship-02-timeline-followup.svg",
  timelinePlan: "/figma-assets/petmind-relationship-02-timeline-plan.svg",
  aiJudgment: "/figma-assets/petmind-relationship-02-ai-judgment.svg",
  aiPlan: "/figma-assets/petmind-relationship-02-ai-plan.svg",
  decisionIntersect: "/figma-assets/petmind-relationship-02-decision-intersect.svg",
  decisionDivider: "/figma-assets/petmind-relationship-02-decision-divider.svg",
  eventDivider: "/figma-assets/petmind-relationship-02-event-divider.svg",
  comparisonNote: "/figma-assets/petmind-relationship-02-comparison-note.svg",
  answer: "/figma-assets/petmind-relationship-02-answer.svg",
} as const;

const SCATTERED_RECORDS = [
  {
    nodeId: "2655:30282",
    height: 51,
    module: "预约模块",
    icon: ASSETS.moduleReservation,
    date: "02.28",
    primary: "创建预约｜03.01 10:00 洗护",
    secondary: "状态：已接单",
  },
  {
    nodeId: "2655:30292",
    height: 50,
    module: "服务模块",
    icon: ASSETS.moduleService,
    date: "03.01",
    primary: "洗护已完成",
  },
  {
    nodeId: "2655:30301",
    height: 51,
    module: "商品模块",
    icon: ASSETS.moduleProduct,
    date: "03.01",
    primary: "护毛产品 x1",
    secondary: "¥48",
  },
  {
    nodeId: "2655:30311",
    height: 51,
    module: "订单模块",
    icon: ASSETS.moduleOrder,
    date: "03.01",
    primary: "洗护消费",
    secondary: "¥200",
  },
  {
    nodeId: "2655:30321",
    height: 51,
    module: "会员模块",
    icon: ASSETS.moduleMembership,
    date: "03.02",
    primary: "积分到账",
    secondary: "+248",
  },
] as const;

const TIMELINE_EVENTS = [
  {
    nodeId: "2619:27136",
    date: "03.01",
    rowHeight: 46,
    cardHeight: 42,
    cardTop: 0,
    marker: ASSETS.timelineWash,
    markerColor: "#a0a0a0",
    title: "洗护事件",
    role: "美容师记录",
    description: "完成洗护，发现毛发干燥，皮肤有轻微异常。",
    media: ASSETS.eventWash,
  },
  {
    nodeId: "2619:27137",
    date: "03.05",
    rowHeight: 50,
    cardHeight: 42,
    cardTop: 4,
    marker: ASSETS.timelineFeedback,
    markerColor: "#989ba3",
    title: "宠主反馈",
    role: "宠物主",
    description: "仍有抓挠、掉毛，皮肤状态未改善。",
    media: ASSETS.eventFeedback,
  },
  {
    nodeId: "2619:27138",
    date: "03.06",
    rowHeight: 60,
    cardHeight: 52,
    cardTop: 4,
    marker: ASSETS.timelineAi,
    markerColor: "#8e95a8",
    title: "AI 判断",
    role: "AI Agent",
    description: "关联历史记录，判断可能存在皮肤问题，建议观察并预约检查。",
    media: ASSETS.aiJudgment,
    isAi: true,
  },
  {
    nodeId: "2619:27158",
    date: "03.07",
    rowHeight: 50,
    cardHeight: 42,
    cardTop: 4,
    marker: ASSETS.timelineMedical,
    markerColor: "#828ead",
    title: "医疗检查",
    role: "医师诊疗记录",
    description: "医院检查确认：为真菌感染。",
    media: ASSETS.eventMedical,
  },
  {
    nodeId: "2619:27179",
    date: "03.24",
    rowHeight: 50,
    cardHeight: 42,
    cardTop: 4,
    marker: ASSETS.timelineFollowup,
    markerColor: "#7586b3",
    title: "复诊检查",
    role: "医师诊疗记录",
    description: "复查结果：已痊愈。",
    media: ASSETS.eventFollowup,
  },
  {
    nodeId: "2619:27200",
    date: "下一步",
    rowHeight: 46,
    cardHeight: 42,
    cardTop: 4,
    marker: ASSETS.timelinePlan,
    markerColor: "#e08c62",
    title: "AI护理计划",
    role: "AI Agent",
    description: "调整洗护周期、推荐护理产品，并设置 30 日后复查提醒。",
    media: ASSETS.aiPlan,
    isAi: true,
  },
] as const;

function PetMindRelationshipSectionDivider() {
  return (
    <div
      className="content-stretch flex h-[94px] items-end gap-[24px] pt-[28px] relative shrink-0 w-full"
      data-node-id="2655:30229"
      data-name="Section Divider"
    >
      <div className="absolute h-[32px] left-0 top-[8px] w-[372px]" data-name="标题辅助装饰">
        <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={ASSETS.sectionDecor} />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start justify-end min-w-px opacity-80 relative">
        <div className="content-stretch flex gap-[12px] items-end relative shrink-0">
          <div className="[word-break:break-word] flex flex-col font-['Alibaba_PuHuiTi_2.0:115_Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#181818] text-[36px] whitespace-nowrap">
            <p className="leading-[30px]">02 · 从交易，走向长期关系资产</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="relative size-[18px]">
                <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={ASSETS.triangle} />
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-justify w-[min-content]">
          当交易记录已被充分沉淀，下一层价值来自围绕同一只宠物持续连接、可理解并可触发行动的服务事件。
        </p>
      </div>
    </div>
  );
}

function PetMindRelationshipPrompt({ kind }: { kind: "question" | "answer" }) {
  const question = kind === "question";

  return (
    <div
      className={`bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex flex-col gap-[16px] ${question ? "h-[121px]" : "h-[145px]"} items-start justify-center px-[24px] py-[20px] relative rounded-[8px] shrink-0 w-full`}
      data-node-id={question ? "2655:30230" : "2655:30439"}
      data-name="Quote Details"
    >
      <div className={`content-stretch flex gap-[8px] ${question ? "items-center" : "items-start w-full"} relative rounded-[4px] shrink-0`}>
        <div className="relative shrink-0 size-[24px]">
          <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={question ? ASSETS.question : ASSETS.answer} />
        </div>
        <p className={`[word-break:break-word] ${question ? "shrink-0 whitespace-nowrap" : "flex-[1_0_0] min-w-px"} font-['OPPOSans:Bold',sans-serif] leading-[24px] not-italic relative text-[#474747] text-[16px]`}>
          {question
            ? "当预约、订单和服务记录都已存在，为什么系统仍难以理解同一只宠物，并判断下一步？"
            : "真正形成理解的，不是更多记录，而是事件足够连续。"}
        </p>
      </div>
      <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" />
      {question ? (
        <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#474747] text-[12px] text-justify w-[min-content]">
          我以 Luna 的真实服务过程为例，对比记录“按经营模块分别沉淀”与“围绕同一只宠物持续连接”时，系统能够形成的不同理解。
        </p>
      ) : (
        <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#474747] text-[12px] text-justify w-full">
          当跨模块、跨角色的记录围绕 Luna 按时间连接，系统才能从“历史可查”走向“上下文可理解”，并据此判断下一步。PetMind AI 要积累的核心资产，不是更多孤立记录，而是
          <span className="font-['OPPOSans:Medium',sans-serif]">单只宠物足够连续的事件数据</span>。
        </p>
      )}
    </div>
  );
}

function PetMindRelationshipQuoteHeader({
  title,
  description,
  nodeId,
}: {
  title: string;
  description?: string;
  nodeId: string;
}) {
  return (
    <div className={`content-stretch flex gap-[12px] ${description ? "h-[54px] items-start" : "h-[32px] items-center"} relative shrink-0 w-full`} data-node-id={nodeId} data-name="Quote Container">
      <div className="content-stretch flex h-[32px] items-center relative shrink-0">
        <div className="bg-[#474747] h-[16px] opacity-25 relative shrink-0 w-[4px]" />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-w-px relative text-[#414141]">
        <p className="[word-break:break-word] font-['OPPOSans:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[20px] whitespace-nowrap">{title}</p>
        {description && (
          <p className="[word-break:break-word] font-['OPPOSans:Regular',sans-serif] leading-[20px] min-w-full not-italic opacity-65 relative shrink-0 text-[12px] text-justify w-[min-content]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function PetMindSignalCard({
  nodeId,
  title,
  children,
  widthClass,
  background,
  backgroundWidth,
  strong = false,
}: {
  nodeId: string;
  title: string;
  children: React.ReactNode;
  widthClass: string;
  background: string;
  backgroundWidth: number;
  strong?: boolean;
}) {
  return (
    <div
      className={`${strong ? "bg-[#e9e9e9]" : "bg-[#e2e2e2]"} border border-[#d2d2d2] border-solid content-stretch flex flex-col h-[116px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 ${widthClass}`}
      data-node-id={nodeId}
      data-name="交互"
    >
      <div className="absolute h-[32px] left-[-1px] top-[-1px]" style={{ width: backgroundWidth }}>
        <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={background} />
      </div>
      <div className={`bg-[rgba(0,0,0,${strong ? "0.01" : "0.02"})] content-stretch flex h-[32px] items-center px-[24px] py-[8px] relative shrink-0 w-full`}>
        <p className={`font-['OPPOSans:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 ${strong ? "text-[#7f7f7f]" : "text-[#8f8f8f]"} text-[11px] whitespace-nowrap`}>{title}</p>
      </div>
      <div className="content-stretch flex h-[84px] items-center justify-center px-[24px] py-[12px] relative shrink-0 w-full">
        <div className={`[word-break:break-word] flex-[1_0_0] ${strong ? "font-['OPPOSans:Regular',sans-serif]" : "font-['OPPOSans:Light',sans-serif]"} leading-[20px] min-w-px not-italic relative text-[#474747] text-[12px] text-justify`}>
          {children}
        </div>
      </div>
    </div>
  );
}

function PetMindCrossIndustrySignals() {
  return (
    <div className="content-stretch flex h-[212px] flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="2655:30237" data-name="Blockquote">
      <PetMindRelationshipQuoteHeader nodeId="2655:30238" title="跨行业信号" />
      <div className="content-stretch flex h-[116px] gap-[16px] items-center relative shrink-0 w-full" data-node-id="2655:30239">
        <PetMindSignalCard background={ASSETS.signalObservation} backgroundWidth={156} nodeId="2655:30240" title="跨行业观察" widthClass="w-[316px]">
          部分 AI 陪伴产品用户在长期互动后形成明显的情感依恋，甚至自述产生依赖；“被记住”“被理解”和不愿中断关系，是相关讨论中反复出现的体验。
        </PetMindSignalCard>
        <img alt="" aria-hidden="true" className="h-[14px] relative shrink-0 w-[20px]" draggable={false} src={ASSETS.signalArrow} />
        <PetMindSignalCard background={ASSETS.signalHypothesis} backgroundWidth={208} nodeId="2655:30248" title="可迁移假设" widthClass="w-[208px]">
          这提示我：长期记忆与持续上下文可能增强被理解感，并进一步影响持续使用。
        </PetMindSignalCard>
        <img alt="" aria-hidden="true" className="h-[14px] relative shrink-0 w-[20px]" draggable={false} src={ASSETS.signalArrow} />
        <PetMindSignalCard background={ASSETS.signalService} backgroundWidth={235} nodeId="2655:30256" strong title="带回宠物服务" widthClass="flex-[1_0_0] min-w-px">
          <span>将这一信号带回宠物服务，我开始追问：</span>
          <span className="font-['OPPOSans:Bold',sans-serif]">同一只宠物的服务信息，能否跨越多次服务保持连续？</span>
        </PetMindSignalCard>
      </div>
      <div className="content-stretch flex h-[24px] gap-[4px] items-start relative shrink-0 w-full" data-node-id="2655:30263">
        <img alt="" aria-hidden="true" className="relative shrink-0 size-[24px]" draggable={false} src={ASSETS.note} />
        <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Light',sans-serif] leading-[24px] min-w-px not-italic relative text-[#474747] text-[12px] text-justify uppercase">
          信号来源：社媒用户自述与产品社区讨论，仅作为定性观察，不代表普遍性或因果结论。
        </p>
      </div>
    </div>
  );
}

function PetMindLunaProfile({ nodeId, roundedImage = false }: { nodeId?: string; roundedImage?: boolean }) {
  return (
    <div className="content-stretch flex h-[36px] gap-[12px] items-center overflow-clip relative rounded-[8px] shrink-0 w-full shadow-[inset_0px_0px_0px_0.6px_#d2d2d2]" data-node-id={nodeId}>
      <div className={`h-full overflow-hidden relative ${roundedImage ? "rounded-[8px]" : "rounded-[4px]"} shrink-0 w-[36px]`}>
        <img alt="Luna" className="absolute h-[176.76%] left-[-21.25%] max-w-none top-[0.23%] w-[132.57%]" draggable={false} src={ASSETS.luna} />
      </div>
      <div className="content-stretch flex font-['OPPOSans:Bold',sans-serif] gap-[8px] items-center leading-[16px] not-italic relative shrink-0 text-[#474747] text-[11px] whitespace-nowrap">
        <span>Luna</span>
        <span>|</span>
        <span>2岁</span>
        <span className="ml-[-4px]">金渐层</span>
      </div>
    </div>
  );
}

function PetMindScatteredRecord({ record }: { record: (typeof SCATTERED_RECORDS)[number] }) {
  return (
    <div
      className="bg-[#e2e2e2] content-stretch flex items-center overflow-clip relative rounded-[4px] shrink-0 w-full shadow-[inset_0px_0px_0px_0.6px_#d2d2d2]"
      data-node-id={record.nodeId}
      style={{ height: record.height }}
    >
      <div className="bg-[#d9d9d9] h-full relative rounded-[4px] shrink-0 w-[52px]">
        <img alt="" aria-hidden="true" className="-translate-x-1/2 absolute left-1/2 size-[20px] top-[9.5px]" draggable={false} src={record.icon} />
        <p className="-translate-x-1/2 absolute bottom-[3px] font-['OPPOSans:Medium',sans-serif] leading-[18px] left-1/2 not-italic text-[#474747] text-[8px] text-center whitespace-nowrap">{record.module}</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-w-px px-[20px] relative">
        <div
          className="bg-[#515151] content-stretch flex h-[14px] items-center justify-center relative rounded-[2px] shrink-0 w-[31px]"
          data-name="Date Badge"
        >
          <p
            className="font-['DINOT:Bold',sans-serif] leading-[9px] not-italic relative shrink-0 text-[#e2e2e2] text-[9px] text-center [transform:translateY(0.5px)] whitespace-nowrap w-[23px]"
            data-name="Date Badge Text"
          >
            {record.date}
          </p>
        </div>
        <div className="content-stretch flex font-['OPPOSans:Regular',sans-serif] gap-[8px] items-center leading-[14px] not-italic relative shrink-0 text-[#474747] text-[9px] whitespace-nowrap">
          <span>{record.primary}</span>
          {record.secondary && <span>{record.secondary}</span>}
        </div>
      </div>
    </div>
  );
}

function PetMindDecisionFooter({ children, nodeId }: { children: React.ReactNode; nodeId: string }) {
  return (
    <div className="bg-[rgba(255,255,255,0.25)] content-stretch flex h-[72px] items-center px-[16px] relative shrink-0 w-full" data-node-id={nodeId}>
      <div className="absolute h-[72px] left-0 top-0 w-[254px]">
        <div className="absolute inset-[-1.39%_-0.71%_-1.39%_-0.39%]">
          <img alt="" aria-hidden="true" className="block max-w-none size-full" draggable={false} src={ASSETS.decisionIntersect} />
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px relative">
        <p className="font-['OPPOSans:Regular',sans-serif] leading-[13px] not-italic relative shrink-0 text-[#9f9f9f] text-[11px] text-center whitespace-nowrap">判<br />断</p>
        <div className="flex h-[40px] items-center relative shrink-0 w-px">
          <img alt="" aria-hidden="true" className="h-[24px] relative shrink-0 w-px" draggable={false} src={ASSETS.decisionDivider} />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#474747] text-[11px] text-justify">{children}</p>
      </div>
    </div>
  );
}

function PetMindScatteredColumn() {
  return (
    <div className="content-stretch flex h-[549px] flex-col gap-[20px] items-start relative shrink-0 w-[400px]" data-node-id="2655:30269">
      <PetMindRelationshipQuoteHeader description="围绕经营模块｜分别沉淀为可查询记录" nodeId="2655:30270" title="Luna：散点记录" />
      <div className="bg-[#e2e2e2] content-stretch flex h-[475px] flex-col items-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-node-id="2655:30271">
        <div className="bg-[#e9e9e9] content-stretch flex h-[402px] flex-col gap-[16px] items-start p-[24px] relative shrink-0 w-full">
          <PetMindLunaProfile />
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px relative w-full">
            {SCATTERED_RECORDS.map((record) => <PetMindScatteredRecord key={record.nodeId} record={record} />)}
          </div>
        </div>
        <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" />
        <PetMindDecisionFooter nodeId="2655:30332">每条记录都可以查询，但系统仍需要人工拼接，才能理解 Luna 完整经历了什么。</PetMindDecisionFooter>
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[8px] z-[2]" />
      </div>
    </div>
  );
}

function PetMindTimelineEvent({ event }: { event: (typeof TIMELINE_EVENTS)[number] }) {
  const next = event.date === "下一步";

  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id={event.nodeId} style={{ height: event.rowHeight }}>
      <p className={`${next ? "font-['OPPOSans:Bold',sans-serif] text-[8px] text-center tracking-[-0.56px]" : "font-['DINOT:Bold',sans-serif] text-[9px]"} leading-[14px] not-italic relative shrink-0 text-[#474747] w-[23px] whitespace-nowrap`}>{event.date}</p>
      <div className="content-stretch flex h-full flex-col items-center relative shrink-0 w-[20px]">
        <div className="bg-[#d2d2d2] flex-[1_0_0] mb-[-1px] min-h-px relative w-[1.5px]" />
        <div className="border-[#d2d2d2] border-[1.5px] border-solid content-stretch flex items-center justify-center mb-[-1px] relative rounded-[12px] shrink-0 size-[20px]" style={{ backgroundColor: event.markerColor }}>
          <img alt="" aria-hidden="true" className="relative shrink-0 size-[20px]" draggable={false} src={event.marker} />
        </div>
        <div className="bg-[#d2d2d2] flex-[1_0_0] min-h-px relative w-[1.5px]" />
      </div>
      <div className="flex-[1_0_0] h-full min-w-px relative">
        <div
          className="bg-[#e2e2e2] content-stretch flex items-center overflow-clip absolute left-0 rounded-[8px] w-full shadow-[inset_0px_0px_0px_0.6px_#d2d2d2]"
          style={{ height: event.cardHeight, top: event.cardTop }}
        >
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-start justify-center min-w-px px-[12px] relative">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
              <p className="font-['OPPOSans:Bold',sans-serif] leading-[8px] not-italic relative shrink-0 text-[#474747] text-[9px] whitespace-nowrap">{event.title}</p>
              <img alt="" aria-hidden="true" className="h-[6px] relative shrink-0 w-px" draggable={false} src={ASSETS.eventDivider} />
              <p className="font-['OPPOSans:Medium',sans-serif] leading-[12px] not-italic opacity-60 relative shrink-0 text-[#474747] text-[8px] text-center whitespace-nowrap">{event.role}</p>
            </div>
            <p className="[word-break:break-word] font-['OPPOSans:Regular',sans-serif] leading-[12px] min-w-full not-italic relative shrink-0 text-[#474747] text-[8px] w-[min-content]">{event.description}</p>
          </div>
          <div className="content-stretch flex h-full flex-col items-start justify-center p-[4px] relative shrink-0 w-[42px]">
            <img alt="" className={`${event.isAi ? "size-[34px]" : "object-cover rounded-[6px] size-[34px]"} relative shrink-0`} draggable={false} src={event.media} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PetMindEventChainColumn() {
  return (
    <div className="content-stretch flex h-[549px] flex-col gap-[20px] items-start relative shrink-0 w-[440px]" data-node-id="2655:30340">
      <PetMindRelationshipQuoteHeader description="围绕同一只宠物｜按时间连接为连续事件" nodeId="2655:30341" title="Luna：连续事件链" />
      <div className="bg-[#e2e2e2] content-stretch flex h-[475px] flex-col items-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-node-id="2655:30342">
        <div className="bg-[#e9e9e9] content-stretch flex h-[402px] flex-col items-start p-[24px] relative shrink-0 w-full" data-node-id="2619:27120">
          <div className="content-stretch flex h-[354px] flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-node-id="2619:27121">
            <PetMindLunaProfile nodeId="2619:27122" roundedImage />
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px py-[16px] relative w-full" data-node-id="2619:27135">
              {TIMELINE_EVENTS.map((event) => <PetMindTimelineEvent event={event} key={event.nodeId} />)}
            </div>
          </div>
        </div>
        <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" />
        <PetMindDecisionFooter nodeId="2655:30428">当服务、反馈与诊疗记录围绕 Luna 持续接入，系统才能形成可持续理解的事件链。</PetMindDecisionFooter>
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[8px] z-[2]" />
      </div>
    </div>
  );
}

function PetMindRelationshipComparison() {
  return (
    <div className="content-stretch flex h-[593px] flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="2655:30267">
      <div className="content-stretch flex h-[549px] gap-[24px] items-center relative shrink-0 w-full" data-node-id="2655:30268">
        <PetMindScatteredColumn />
        <PetMindEventChainColumn />
      </div>
      <div className="content-stretch flex h-[24px] gap-[4px] items-start relative shrink-0 w-full" data-node-id="2655:30435">
        <img alt="" aria-hidden="true" className="relative shrink-0 size-[24px]" draggable={false} src={ASSETS.comparisonNote} />
        <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Light',sans-serif] leading-[24px] min-w-px not-italic relative text-[#474747] text-[12px] uppercase">
          连续事件让系统能够回答三个问题：<span className="font-['OPPOSans:Medium',sans-serif]">过去发生了什么？现在是什么状态？下一步应该做什么？</span>
        </p>
      </div>
    </div>
  );
}

export function PetMindRelationshipSection({
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
      className="content-stretch flex h-[1597px] flex-col gap-[84px] items-start py-[48px] relative shrink-0 w-[864px]"
      data-node-id="2655:30228"
      data-section-id={sectionId}
      data-name="Section Container 6"
    >
      <PetMindRelationshipSectionDivider />
      <PetMindRelationshipPrompt kind="question" />
      <PetMindCrossIndustrySignals />
      <PetMindRelationshipComparison />
      <PetMindRelationshipPrompt kind="answer" />
    </section>
  );
}
