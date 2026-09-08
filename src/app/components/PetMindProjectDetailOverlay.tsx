import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { PetMindGrowthLoopSection } from "./PetMindGrowthLoopSection";
import { PetMindAssistantSection } from "./PetMindAssistantSection";
import { PetMindProductEntrySection } from "./PetMindProductEntrySection";
import { PetMindRelationshipSection as PetMindRelationshipSectionV2 } from "./PetMindRelationshipSection";
import {
  PetMindAssistantToNextTransition,
  PetMindGrowthLoopToNextTransition,
  PetMindProductEntryToNextTransition,
  PetMindRelationshipToProductEntryTransition,
} from "./PetMindSectionTransition";

const PET_MIND_NAV_ITEMS = [
  { id: "overview", num: "00", title: "项目概览", subtitle: "Research Foundation" },
  { id: "market", num: "01", title: "市场机会", subtitle: "Strategic Synthesis" },
  { id: "relationship", num: "02", title: "从交易到关系", subtitle: "Strategic Synthesis" },
  { id: "judgment", num: "03", title: "产品判断", subtitle: "Product Strategy" },
  { id: "growth", num: "04", title: "增长闭环", subtitle: "Product Positioning" },
  { id: "assistant", num: "05", title: "智能工作流", subtitle: "AI Workflow" },
  { id: "events", num: "06", title: "事件数据", subtitle: "Product Design" },
  { id: "local", num: "07", title: "本地获客", subtitle: "AI Capabilities" },
  { id: "trust", num: "08", title: "信任边界", subtitle: "Business Model" },
  { id: "system", num: "09", title: "系统架构", subtitle: "Business Model" },
  { id: "validation", num: "10", title: "场景验证", subtitle: "Business Model" },
  { id: "interfaces", num: "11", title: "关键界面", subtitle: "Business Model" },
  { id: "metrics", num: "12", title: "效果指标", subtitle: "Business Model" },
  { id: "review", num: "13", title: "项目回顾", subtitle: "Business Model" },
] as const;

const PET_MIND_OVERVIEW_TITLE_CN_SRC = "/figma-assets/petmind-overview-title-cn.svg";
const PET_MIND_OVERVIEW_TITLE_EN_SRC = "/figma-assets/petmind-overview-title-en.svg";
const PET_MIND_OVERVIEW_ROLE_TITLE_DIVIDER_SRC = "/figma-assets/petmind-overview-role-title-divider.svg";
const PET_MIND_OVERVIEW_GRID_VERTICAL_DIVIDER_SRC = "/figma-assets/petmind-overview-grid-divider-vertical.svg";
const PET_MIND_OVERVIEW_GRID_HORIZONTAL_DIVIDER_SRC = "/figma-assets/petmind-overview-grid-divider-horizontal.svg";
const PET_MIND_SECTION_TITLE_TRIANGLE_SRC = "/figma-assets/petmind-section-title-triangle.svg";

const PET_MIND_SECTION_TITLE_DECOR_ASSETS = {
  "01": {
    src: "/figma-assets/petmind-market-section-decor-01.svg",
    triangleSrc: "/figma-assets/petmind-market-section-triangle.svg",
    width: 372,
  },
  "02": {
    src: "/figma-assets/petmind-section-title-decor-02.svg",
    triangleSrc: PET_MIND_SECTION_TITLE_TRIANGLE_SRC,
    width: 372,
  },
} as const;

const PET_MIND_MARKET_ASSETS = {
  question: "/figma-assets/petmind-market-question.svg",
  insight: "/figma-assets/petmind-market-insight.svg",
  insightStrong: "/figma-assets/petmind-market-insight-strong.svg",
  answer: "/figma-assets/petmind-market-answer.svg",
  roleOwner: "/figma-assets/petmind-market-role-owner.png",
  roleStaff: "/figma-assets/petmind-market-role-staff.png",
  roleSystem: "/figma-assets/petmind-market-role-system.png",
} as const;

const PET_MIND_RELATIONSHIP_ASSETS = {
  intersect: "/figma-assets/petmind-relationship-intersect.svg",
  quoteTitle: "/figma-assets/petmind-relationship-quote-title.svg",
  arrowLeft: "/figma-assets/petmind-relationship-arrow-left.svg",
  arrowRight: "/figma-assets/petmind-relationship-arrow-right.svg",
  connector: "/figma-assets/petmind-relationship-connector.svg",
  scatteredPanel: "/figma-assets/petmind-relationship-scattered-panel.png",
  eventChainPanel: "/figma-assets/petmind-relationship-event-chain-panel.png",
  decisionIntersect: "/figma-assets/petmind-relationship-decision-intersect.svg",
  decisionDivider: "/figma-assets/petmind-relationship-decision-divider.svg",
} as const;

const PET_MIND_IMPACT_ASSETS = {
  pet: "/figma-assets/petmind-impact-pet.svg",
  owner: "/figma-assets/petmind-impact-owner.svg",
  merchant: "/figma-assets/petmind-impact-merchant.svg",
  platform: "/figma-assets/petmind-impact-platform.svg",
} as const;

const PET_MIND_FLYWHEEL_ASSETS = {
  metricInactive: "/figma-assets/petmind-flywheel-metric-inactive.svg",
  metricActive: "/figma-assets/petmind-flywheel-metric-active.svg",
  topConnector: "/figma-assets/petmind-flywheel-top-connector.svg",
  cardDividerVertical: "/figma-assets/petmind-flywheel-card-divider-vertical.svg",
  cardDividerHorizontal: "/figma-assets/petmind-flywheel-card-divider-horizontal.svg",
  arrow1137: "/figma-assets/petmind-flywheel-arrow-1137.svg",
  arrow1138: "/figma-assets/petmind-flywheel-arrow-1138.svg",
  arrow1139: "/figma-assets/petmind-flywheel-arrow-1139.svg",
  arrow1140: "/figma-assets/petmind-flywheel-arrow-1140.svg",
  arrow1141: "/figma-assets/petmind-flywheel-arrow-1141.svg",
  arrow1142: "/figma-assets/petmind-flywheel-arrow-1142.svg",
  metricSpacer: "/figma-assets/petmind-flywheel-metric-spacer.svg",
} as const;

const PET_MIND_OVERVIEW_TEXT =
  "它通过商户服务场景沉淀连续的人宠事件数据，用宠物护照承接 C 端关系资产，并通过 AI Agent 与 GEO 能力把数据转化为服务复购、本地获客和长期经营增长。";

const PET_MIND_ROLE_RESPONSIBILITIES = [
  ["市场与竞品研究", "产品机会定义", "多角色产品架构"],
  ["核心体验设计", "MVP 范围规划", "落地推进"],
] as const;

const PET_MIND_MARKET_COVERAGE_ROWS = [
  ["门店SaaS", "收银、库存、预约、会员、订单、基础营销", "提升管理与交易效率"],
  ["本地生活平台", "门店曝光、团购、评价、预约与到店转化", "带来新客和首次消费"],
  ["CRM／私域工具", "会员标签、消息触达、活动营销、定期提醒", "维持会员触达与促销转化"],
] as const;

const PET_MIND_MARKET_CHAIN_STEPS = [
  {
    number: "1",
    label: "服务预约",
    width: 80,
    actors: ["owner"],
    action: "发现门店，选择服务与时间，提交预约",
    tools: "本地生活平台、私域预约、预约系统",
  },
  {
    number: "2",
    label: "到店服务",
    width: 107,
    actors: ["owner", "staff"],
    action: "接待宠物，核销订单，完成服务",
    tools: "核销系统、订单系统、服务工单",
  },
  {
    number: "3",
    label: "信息记录",
    width: 107,
    actors: ["staff"],
    action: "拍摄照片，记录宠物状态、异常情况和服务结果",
    tools: "订单备注、宠物档案、员工相册",
  },
  {
    number: "4",
    label: "订单归档",
    width: 107,
    actors: ["system", "staff"],
    action: "确认服务完成并结算，系统保存订单及相关记录",
    tools: "订单系统、会员系统",
  },
  {
    number: "5",
    label: "历史调取",
    width: 98,
    actors: ["staff"],
    action: "定位宠物，打开历史订单，查找照片与备注",
    tools: "历史订单、宠物档案、聊天记录",
  },
  {
    number: "6",
    label: "状态判断",
    width: 87,
    actors: ["manager"],
    action: "对照多次记录，判断状态变化与新的关注点",
    tools: "历史订单、原始照片、文字备注（人工对照）",
  },
  {
    number: "7",
    label: "回访提醒",
    width: 115,
    actors: ["staff", "arrow", "owner"],
    action: "决定回访对象、时间和内容，配置并发送回访提醒",
    tools: "CRM、企微、短信、私域工具",
  },
  {
    number: "8",
    label: "再次预约",
    width: 115,
    actors: ["owner", "arrow", "staff"],
    action: "宠主响应提醒并提交预约，员工承接",
    tools: "消息触达、预约系统",
  },
] as const;

const PET_MIND_MARKET_BREAKPOINT_CARDS = [
  {
    nodeId: "2568:23969",
    width: 327,
    paddingClass: "p-[20px]",
    title: "断点01：需要使用历史信息时，员工能否快速找到并整理出来？",
    paragraphs: [
      "传统门店 SaaS 通常已经支持订单备注、宠物档案、服务照片和历史订单查询。但当员工需要再次使用这些信息时，往往仍要定位宠主或宠物、逐笔打开历史订单，再对照照片与文字记录。",
      "这套操作并非无法完成，而是在忙碌的门店经营中，很难在每次服务前后被持续执行。因此，大量记录最终成为“事后可以查询的档案”，而不是“当前服务可以直接使用的信息”。",
    ],
  },
  {
    nodeId: "2568:23989",
    width: 247,
    paddingClass: "px-[24px] py-[20px]",
    title: "断点02：找到记录后，能否快速判断宠物发生了什么变化？",
    paragraphs: [
      "即使员工找到历史记录，仍需要人工串联不同时点的照片、备注和服务情况，才能判断宠物发生了什么变化、本次服务应该关注什么。",
      "当记录方式不统一、服务员工发生变化或历史信息较多时，这种跨次比较会更依赖个人经验，难以形成稳定、可传递的服务判断。",
    ],
  },
  {
    nodeId: "2568:24009",
    width: 269,
    paddingClass: "p-[20px]",
    title: "断点03：形成判断后，能否低成本转化为具体的回访或提醒？",
    paragraphs: [
      "CRM 与私域工具已经具备回访、提醒和消息触达能力，但将一次服务中发现的状态转化为“应该回访谁、何时回访、回访什么”，通常仍需要店长或员工人工判断和配置。",
      "当服务记录与后续运营任务之间缺少顺畅连接时，回访容易依赖固定周期、通用模板或员工记忆，而不是来自最近一次服务的具体情况。",
    ],
  },
] as const;

const PET_MIND_RELATIONSHIP_FLYWHEEL_STEPS = [
  {
    number: "1",
    label: "事件沉淀",
    title: "真实事件持续积累",
    description: "服务过程产生的人宠事件，让平台形成连续数据资产。",
    borderColor: "#dededf",
    headerColor: "#dededf",
    numberColor: "#666666",
    numberOpacity: 1,
    bodyTint: "rgba(158, 158, 158, 0)",
    shadowColor: "rgba(158, 158, 158, 0.25)",
    nodeIds: { container: "2465:20851", header: "2465:20852", divider: "2465:20853", body: "2465:20854", title: "2465:20856", description: "2465:20857" },
  },
  {
    number: "2",
    label: "智能增强",
    title: "AI 理解不断深化",
    description: "连续事件让 AI 更懂宠物状态，并生成主动行动。",
    borderColor: "#dcdde0",
    headerColor: "#dcdde0",
    numberColor: "#676767",
    numberOpacity: 0.8,
    bodyTint: "rgba(104, 126, 184, 0.03)",
    shadowColor: "rgba(104, 126, 184, 0.2)",
    nodeIds: { container: "2465:20860", header: "2465:20861", divider: "2465:20862", body: "2465:20863", title: "2465:20865", description: "2465:20866" },
  },
  {
    number: "3",
    label: "体验提升",
    title: "主动照护形成留存",
    description: "从查询服务变成持续陪伴，提升宠主长期关系。",
    borderColor: "#dcdde0",
    headerColor: "#dcdde0",
    numberColor: "#676767",
    numberOpacity: 0.8,
    bodyTint: "rgba(104, 126, 184, 0.03)",
    shadowColor: "rgba(104, 126, 184, 0.2)",
    nodeIds: { container: "2465:20909", header: "2465:20910", divider: "2465:20911", body: "2465:20912", title: "2465:20914", description: "2465:20915" },
  },
  {
    number: "4",
    label: "关系沉淀",
    title: "宠主价值持续增长",
    description: "宠物护照沉淀长期记忆，推动复购和关系延续。",
    borderColor: "#d9dce1",
    headerColor: "#d9dce1",
    numberColor: "#687eb8",
    numberOpacity: 1,
    bodyTint: "rgba(104, 126, 184, 0.05)",
    shadowColor: "rgba(104, 126, 184, 0.3)",
    nodeIds: { container: "2465:20918", header: "2465:20919", divider: "2465:20920", body: "2465:20921", title: "2465:20922", description: "2465:20923" },
  },
  {
    number: "5",
    label: "经营增长",
    title: "商户获得经营收益",
    description: "AI 将数据转化为回访、复购和经营动作。",
    borderColor: "#d9dce1",
    headerColor: "#d9dce1",
    numberColor: "#687eb8",
    numberOpacity: 1,
    bodyTint: "rgba(104, 126, 184, 0.05)",
    shadowColor: "rgba(104, 126, 184, 0.3)",
    nodeIds: { container: "2465:20966", header: "2465:20967", divider: "2465:20968", body: "2465:20969", title: "2465:20970", description: "2465:20971" },
  },
  {
    number: "6",
    label: "生态扩张",
    title: "更多商户加入循环",
    description: "更多服务场景进入平台，持续产生新的事件数据。",
    borderColor: "#c3c9d9",
    headerColor: "#c3c9d9",
    numberColor: "#626b85",
    numberOpacity: 1,
    bodyTint: "rgba(104, 126, 184, 0.08)",
    shadowColor: "rgba(104, 126, 184, 0.45)",
    nodeIds: { container: "2465:20974", header: "2465:20975", divider: "2465:20976", body: "2465:20977", title: "2465:20979", description: "2465:20980" },
  },
] as const;

type PetMindNavItem = (typeof PET_MIND_NAV_ITEMS)[number];
type PetMindNavItemId = PetMindNavItem["id"];

type PetMindSectionAnchorProps = {
  sectionId: PetMindNavItemId;
  sectionRef: (node: HTMLElement | null) => void;
};

function PetMindOverviewHeading({
  title,
  ghostText = "OVERVIEW",
  frameNodeId,
  ghostNodeId,
  titleNodeId,
  widthClass,
  flexClass = "h-[44px] shrink-0",
}: {
  title: string;
  ghostText?: string;
  frameNodeId: string;
  ghostNodeId: string;
  titleNodeId: string;
  widthClass: string;
  flexClass?: string;
}) {
  return (
    <div
      className={`[word-break:break-word] content-stretch flex flex-col items-start leading-[0] pb-[4px] px-[2px] relative text-[20px] whitespace-nowrap ${flexClass} ${widthClass}`}
      data-node-id={frameNodeId}
      data-name="Frame 1321319049"
    >
      <div
        className="flex flex-col font-['Alimama_ShuHeiTi:Bold',sans-serif] justify-center mb-[-16px] not-italic opacity-10 relative shrink-0 text-transparent tracking-[4px] uppercase [-webkit-text-stroke:1px_#474747] [text-stroke:1px_#474747]"
        data-node-id={ghostNodeId}
      >
        <p className="leading-[31.965px]">{ghostText}</p>
      </div>
      <div
        className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center relative shrink-0 text-[#474747] tracking-[1.2px]"
        data-node-id={titleNodeId}
      >
        <p className="leading-[24px]">{title}</p>
      </div>
    </div>
  );
}

function PetMindOverviewGridVerticalDivider({ nodeId }: { nodeId: string }) {
  return (
    <div className="h-[36px] relative shrink-0 w-0" data-node-id={nodeId}>
      <div className="absolute inset-[0_-0.5px]">
        <img
          alt=""
          aria-hidden="true"
          className="block max-w-none size-full"
          draggable={false}
          src={PET_MIND_OVERVIEW_GRID_VERTICAL_DIVIDER_SRC}
        />
      </div>
    </div>
  );
}

function PetMindOverviewGridHorizontalDivider({ nodeId }: { nodeId: string }) {
  return (
    <div className="h-0 relative shrink-0 w-full" data-node-id={nodeId}>
      <div className="absolute inset-[-0.5px_0]">
        <img
          alt=""
          aria-hidden="true"
          className="block max-w-none size-full"
          draggable={false}
          src={PET_MIND_OVERVIEW_GRID_HORIZONTAL_DIVIDER_SRC}
        />
      </div>
    </div>
  );
}

function PetMindRoleGridCell({
  nodeId,
  textNodeId,
  children,
}: {
  nodeId: string;
  textNodeId: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col h-[36px] items-center justify-center min-w-px px-[12px] py-[6px] relative"
      data-node-id={nodeId}
      data-name="Background"
    >
      <div
        className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[12px] tracking-[1px] whitespace-nowrap"
        data-node-id={textNodeId}
      >
        <p className="leading-[16px]">{children}</p>
      </div>
    </div>
  );
}

function PetMindOverviewColumn() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative"
      data-node-id="2396:14326"
      data-name="Role Description Container"
    >
      <PetMindOverviewHeading
        frameNodeId="2396:14328"
        ghostNodeId="2396:14329"
        title="项目概述"
        titleNodeId="2396:14330"
        widthClass="w-full"
      />
      <div
        className="bg-[rgba(221,221,221,0.8)] content-stretch flex flex-col h-[84px] items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0 w-full"
        data-node-id="2396:14388"
        data-name="Background"
      >
        <div
          className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[12px] text-justify w-full"
          data-node-id="2396:14389"
        >
          <p className="leading-[24px]">{PET_MIND_OVERVIEW_TEXT}</p>
        </div>
      </div>
    </div>
  );
}

function PetMindScopeColumn() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative"
      data-node-id="2552:21932"
      data-name="Role Description Container"
    >
      <PetMindOverviewHeading
        frameNodeId="2552:21933"
        ghostNodeId="2552:21934"
        title="项目范围"
        titleNodeId="2552:21935"
        widthClass="w-full"
      />
      <div
        className="bg-[rgba(221,221,221,0.8)] content-stretch flex flex-col h-[84px] items-start justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0 w-full"
        data-node-id="2552:21936"
        data-name="Background"
      >
        <div
          className="[word-break:break-word] font-['OPPOSans:Regular',sans-serif] leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[12px] w-full"
          data-node-id="2552:21937"
        >
          <ul className="leading-[24px] list-disc list-inside">
            <li>产品触点：商户端、员工小程序、平台运营端、宠物护照</li>
            <li>智能能力：AI 服务报告、经营 Agent、生成式搜索优化（GEO）</li>
            <li>数据能力：人宠服务事件数据底座</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PetMindRoleColumn() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative self-stretch"
      data-node-id="2552:21853"
      data-name="Role Description Container"
    >
      <div className="content-stretch flex gap-[24px] items-end relative shrink-0 w-[232px]" data-node-id="2552:21854">
        <PetMindOverviewHeading
          frameNodeId="2552:21855"
          ghostNodeId="2552:21856"
          ghostText="my role"
          title="我的角色"
          titleNodeId="2552:21857"
          widthClass="w-[84px]"
        />
        <div className="h-[28px] relative shrink-0 w-[4px]" data-node-id="2552:21858" data-name="Background">
          <img
            alt=""
            aria-hidden="true"
            className="absolute block inset-0 max-w-none size-full"
            draggable={false}
            src={PET_MIND_OVERVIEW_ROLE_TITLE_DIVIDER_SRC}
          />
        </div>
        <div
          className="content-stretch flex flex-col items-start justify-center py-[6px] relative rounded-[4px] shrink-0 w-[96px]"
          data-node-id="2552:21860"
          data-name="Background"
        >
          <div
            className="[word-break:break-word] flex flex-col font-['OPPOSans:Medium',sans-serif] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[12px] whitespace-nowrap"
            data-node-id="2552:21861"
          >
            <p className="leading-[16px]">产品与体验负责人</p>
          </div>
        </div>
      </div>
      <div
        className="bg-[rgba(221,221,221,0.8)] content-stretch flex flex-col h-[72px] items-start relative rounded-[4px] shrink-0 w-full"
        data-node-id="2552:21862"
      >
        <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-node-id="2552:21966">
          <PetMindRoleGridCell nodeId="2552:21864" textNodeId="2552:21865">
            {PET_MIND_ROLE_RESPONSIBILITIES[0][0]}
          </PetMindRoleGridCell>
          <PetMindOverviewGridVerticalDivider nodeId="2552:21866" />
          <PetMindRoleGridCell nodeId="2552:21867" textNodeId="2552:21868">
            {PET_MIND_ROLE_RESPONSIBILITIES[0][1]}
          </PetMindRoleGridCell>
          <PetMindOverviewGridVerticalDivider nodeId="2552:21948" />
          <PetMindRoleGridCell nodeId="2552:21942" textNodeId="2552:21943">
            {PET_MIND_ROLE_RESPONSIBILITIES[0][2]}
          </PetMindRoleGridCell>
        </div>
        <PetMindOverviewGridHorizontalDivider nodeId="2552:21969" />
        <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-node-id="2552:21965">
          <PetMindRoleGridCell nodeId="2552:21945" textNodeId="2552:21946">
            {PET_MIND_ROLE_RESPONSIBILITIES[1][0]}
          </PetMindRoleGridCell>
          <PetMindOverviewGridVerticalDivider nodeId="2552:21956" />
          <PetMindRoleGridCell nodeId="2552:21953" textNodeId="2552:21954">
            {PET_MIND_ROLE_RESPONSIBILITIES[1][1]}
          </PetMindRoleGridCell>
          <PetMindOverviewGridVerticalDivider nodeId="2552:21974" />
          <PetMindRoleGridCell nodeId="2552:21971" textNodeId="2552:21972">
            {PET_MIND_ROLE_RESPONSIBILITIES[1][2]}
          </PetMindRoleGridCell>
        </div>
      </div>
    </div>
  );
}

function PetMindStatusColumn() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative self-stretch"
      data-node-id="2552:21906"
      data-name="Role Description Container"
    >
      <PetMindOverviewHeading
        frameNodeId="2552:21907"
        ghostNodeId="2552:21908"
        ghostText="SCOPE"
        title="项目状态"
        titleNodeId="2552:21909"
        widthClass="w-full"
      />
      <div
        className="bg-[rgba(221,221,221,0.8)] content-stretch flex flex-col h-[72px] items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0 w-full"
        data-node-id="2552:21939"
        data-name="Background"
      >
        <div
          className="[word-break:break-word] font-['OPPOSans:Regular',sans-serif] leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[12px] text-justify w-full"
          data-node-id="2552:21940"
        >
          <p className="leading-[28px]">
            <span>26.05 市场研究 → 26.06 产品细化 → </span>
            <span className="font-['OPPOSans:Medium',sans-serif] not-italic opacity-100">26.07 MVP构建（当前）</span>
            <span> → 26.08 门店试点（计划于2026年8月底完成首版上线并启动门店试点）</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function PetMindOverviewTitle() {
  return (
    <header className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="2286:23647" data-name="Header Container">
      <h1 className="sr-only">宠物 AI 经营中枢 · PetMind</h1>
      <div
        aria-hidden="true"
        className="content-stretch flex gap-[32px] h-[72px] items-end relative shrink-0"
        data-node-id="2286:23648"
        data-name="Frame 1321319229"
      >
        <div className="h-[72px] relative shrink-0 w-[515px]" data-node-id="2286:23649" data-name="Frame 1321319230">
          <img alt="" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_OVERVIEW_TITLE_CN_SRC} />
        </div>
        <div className="h-[48px] relative shrink-0 w-[235.569px]" data-node-id="2286:23653" data-name="Frame 1321319231">
          <img alt="" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_OVERVIEW_TITLE_EN_SRC} />
        </div>
      </div>
      <div
        className="[word-break:break-word] flex flex-col font-['Manrope:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#474747] text-[16px] tracking-[2px] whitespace-nowrap"
        data-node-id="2286:23657"
        data-name="Subheader Text"
      >
        <p className="leading-[32px]">一个面向宠物服务商家的 AI 经营中枢</p>
      </div>
    </header>
  );
}

function PetMindOverviewMeta() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="2552:21976">
      <div className="content-stretch flex gap-[48px] h-[140px] items-center relative shrink-0 w-full" data-node-id="2396:14351" data-name="Frame 1321319250">
        <PetMindOverviewColumn />
        <PetMindScopeColumn />
      </div>
      <div className="content-stretch flex gap-[48px] h-[128px] items-center relative shrink-0 w-full" data-node-id="2552:21821">
        <PetMindRoleColumn />
        <PetMindStatusColumn />
      </div>
    </div>
  );
}

function PetMindOverviewSection({ sectionId, sectionRef }: PetMindSectionAnchorProps) {
  return (
    <section
      ref={sectionRef}
      id={`petmind-detail-section-${sectionId}`}
      className="content-stretch flex w-full shrink-0 flex-col items-center overflow-hidden rounded-bl-[48px] rounded-br-[48px] px-[64px] pb-[84px] pt-[128px]"
      data-node-id="2286:23645"
      data-section-id={sectionId}
      data-name="Section - Project List: Nebula Financial"
      style={{ backgroundImage: "linear-gradient(180deg, #e6e6e6 50%, #e2e2e2 100%)" }}
    >
      <div className="content-stretch flex flex-col gap-[64px] items-start max-w-[864px] relative shrink-0 w-[864px]" data-node-id="2286:23646" data-name="Header Section">
        <PetMindOverviewTitle />
        <PetMindOverviewMeta />
      </div>
    </section>
  );
}

function PetMindSectionTitleDecor({ sectionNumber }: { sectionNumber: keyof typeof PET_MIND_SECTION_TITLE_DECOR_ASSETS }) {
  const asset = PET_MIND_SECTION_TITLE_DECOR_ASSETS[sectionNumber];

  return (
    <div
      className="absolute h-[32px] left-0 top-[8px]"
      data-node-id="2396:14467"
      data-name="标题辅助装饰"
      style={{ width: asset.width }}
    >
      <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={asset.src} />
    </div>
  );
}

function PetMindSectionDivider({
  sectionNumber,
  title,
  paragraphs,
}: {
  sectionNumber: keyof typeof PET_MIND_SECTION_TITLE_DECOR_ASSETS;
  title: string;
  paragraphs: readonly string[];
}) {
  return (
    <div className="content-stretch flex gap-[24px] items-end pt-[28px] relative shrink-0 w-full" data-node-id="2396:14435" data-name="Section Divider">
      <PetMindSectionTitleDecor sectionNumber={sectionNumber} />
      <div
        className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start justify-end min-w-px opacity-80 relative"
        data-node-id="2285:23472"
        data-name="Frame 1321319343"
      >
        <div className="content-stretch flex gap-[12px] items-end relative shrink-0" data-node-id="2285:23473" data-name="Title Container">
          <div
            className="[word-break:break-word] flex flex-col font-['Alibaba_PuHuiTi_2.0:115_Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#181818] text-[36px] uppercase whitespace-nowrap"
            data-node-id="2285:23474"
            data-name="Section Title"
          >
            <p className="leading-[30px] whitespace-pre">{title}</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0" data-node-id="2285:23475" data-name="Rectangle 676">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="relative size-[18px]">
                <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_SECTION_TITLE_DECOR_ASSETS[sectionNumber].triangleSrc} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="[word-break:break-word] flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-justify w-[min-content]"
          data-node-id="2285:23476"
          data-name="Section Description"
        >
          {paragraphs.map((paragraph, index) => (
            <p className={`leading-[20px] ${index < paragraphs.length - 1 ? "mb-0" : ""}`} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function PetMindMarketPromptCard({ kind }: { kind: "question" | "answer" }) {
  const isQuestion = kind === "question";

  return (
    <div
      className="bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex flex-col gap-[16px] h-[145px] items-start justify-center px-[24px] py-[20px] relative rounded-[8px] shrink-0 w-full"
      data-node-id={isQuestion ? "2553:22197" : "2571:24298"}
      data-name="Quote Details"
    >
      <div
        className={`content-stretch flex gap-[8px] ${isQuestion ? "items-center" : "items-start w-full"} relative rounded-[4px] shrink-0`}
        data-node-id={isQuestion ? "2553:22198" : "2571:24299"}
      >
        <div className="relative shrink-0 size-[24px]" data-node-id={isQuestion ? "2553:22199" : "2571:24300"}>
          <img
            alt=""
            aria-hidden="true"
            className="absolute block inset-0 max-w-none size-full"
            draggable={false}
            src={isQuestion ? PET_MIND_MARKET_ASSETS.question : PET_MIND_MARKET_ASSETS.answer}
          />
        </div>
        <div
          className={`[word-break:break-word] flex ${isQuestion ? "shrink-0" : "flex-[1_0_0] min-w-px"} flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative text-[#474747] text-[16px]`}
          data-node-id={isQuestion ? "2553:22201" : "2571:24302"}
        >
          <p className="leading-[24px]">
            {isQuestion
              ? "当门店 SaaS、本地生活平台和私域工具已经广泛存在，PetMind AI 的产品机会究竟在哪里？"
              : "机会不在增加更多功能，而在让服务信息进入下一次行动"}
          </p>
        </div>
      </div>
      <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" data-node-id={isQuestion ? "2553:22202" : "2571:24303"} />
      <div
        className={`[word-break:break-word] flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[12px] text-justify w-full ${isQuestion ? "uppercase" : ""}`}
        data-node-id={isQuestion ? "2553:22203" : "2571:24304"}
      >
        <p className="leading-[24px]">
          {isQuestion
            ? "在提出新产品方案之前，我首先需要确认：市场缺少的究竟是更多功能，还是现有工具尚未连接的经营环节。因此，我从门店管理、首次获客与持续运营三个方向梳理现有能力，并沿着一次完整服务链路，观察服务信息如何被记录、调取、理解并转化为后续行动。"
            : "PetMind AI 的切入点，是降低服务信息从“留存”到“调取—理解—行动”的成本，让一次服务产生的信息继续参与下一次照护与经营。只有当信息能够跨越多次服务被持续使用，多笔订单才会形成围绕同一只宠物的连续关系。"}
        </p>
      </div>
    </div>
  );
}

function PetMindMarketBlockTitle({ title, subtitle, nodeId }: { title: string; subtitle?: string; nodeId: string }) {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id={nodeId} data-name="Quote Container">
      <div className="content-stretch flex h-[32px] items-center relative shrink-0" data-name="Divider Icon Container">
        <div className="bg-[#474747] h-[16px] opacity-25 relative shrink-0 w-[4px]" data-name="Divider Icon" />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-w-px relative">
        <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#414141] text-[20px] whitespace-nowrap">
          <p className="leading-[32px]">{title}</p>
        </div>
        {subtitle ? (
          <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic opacity-65 relative shrink-0 text-[#414141] text-[12px] text-justify w-[min-content]">
            <p className="leading-[20px]">{subtitle}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PetMindMarketCoverageTable() {
  return (
    <div
      className="content-stretch flex flex-col h-[168px] items-start overflow-clip relative rounded-[4px] shrink-0 w-full"
      data-node-id="2553:22207"
      data-name="Section content container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[4px] z-10"
      />
      <div
        className="border-b border-[#d2d2d2] border-solid content-stretch flex h-[36px] items-start relative shrink-0 w-full"
        data-node-id="2553:22208"
      >
        {["工具类型", "已覆盖的主要能力", "为商户解决的问题"].map((heading, index) => (
          <div
            className={`bg-[#e0e0e0] content-stretch flex h-[36px] items-center px-[24px] py-[6px] relative shrink-0 ${index < 2 ? "border-r border-[#d2d2d2] border-solid" : ""} ${index === 0 ? "w-[164px]" : index === 1 ? "w-[400px]" : "flex-[1_0_0] min-w-px"}`}
            data-node-id={["2553:22210", "2553:22260", "2553:22222"][index]}
            key={heading}
          >
            <p className="[word-break:break-word] font-['OPPOSans:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(71,71,71,0.8)] text-justify whitespace-nowrap">
              {heading}
            </p>
          </div>
        ))}
      </div>
      {PET_MIND_MARKET_COVERAGE_ROWS.map((row, rowIndex) => (
        <div
          className={`content-stretch flex h-[44px] items-start relative shrink-0 w-full ${rowIndex < PET_MIND_MARKET_COVERAGE_ROWS.length - 1 ? "border-b border-[#d2d2d2] border-solid" : ""}`}
          data-node-id={["2553:22265", "2553:22266", "2553:22274"][rowIndex]}
          data-name="Section content item"
          key={row[0]}
        >
          {row.map((cell, cellIndex) => (
            <div
              className={`content-stretch flex flex-col h-[44px] items-start justify-center px-[24px] py-[12px] relative shrink-0 ${cellIndex < 2 ? "border-r border-[#d2d2d2] border-solid" : ""} ${cellIndex === 0 ? "w-[164px]" : cellIndex === 1 ? "w-[400px]" : "flex-[1_0_0] min-w-px"}`}
              key={cell}
            >
              <p
                className={`[word-break:break-word] ${cellIndex === 0 ? "font-['OPPOSans:Medium',sans-serif] shrink-0 whitespace-nowrap" : "flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] min-w-px"} leading-[20px] not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify`}
              >
                {cell}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PetMindMarketInsight({ children, strong = false, nodeId }: { children: React.ReactNode; strong?: boolean; nodeId: string }) {
  return (
    <div className={`content-stretch flex ${strong ? "gap-[12px]" : "gap-[4px]"} items-start relative shrink-0 w-full`} data-node-id={nodeId} data-name="Quote Item Container">
      <div className="relative shrink-0 size-[24px]" data-name="Metric Spacer">
        <img
          alt=""
          aria-hidden="true"
          className="absolute block inset-0 max-w-none size-full"
          draggable={false}
          src={strong ? PET_MIND_MARKET_ASSETS.insightStrong : PET_MIND_MARKET_ASSETS.insight}
        />
      </div>
      <div
        className={`[word-break:break-word] flex flex-[1_0_0] flex-col ${strong ? "font-['OPPOSans:Medium',sans-serif]" : "font-['OPPOSans:Light',sans-serif]"} justify-center leading-[0] min-w-px not-italic relative text-[#474747] text-[12px] uppercase`}
      >
        <p className="leading-[24px]">{children}</p>
      </div>
    </div>
  );
}

function PetMindMarketExistingToolsBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[864px]" data-node-id="2553:22205" data-name="Blockquote">
      <PetMindMarketBlockTitle nodeId="2553:22206" title="现有工具已经解决了什么" />
      <PetMindMarketCoverageTable />
      <PetMindMarketInsight nodeId="2553:22250">宠物门店的基础经营能力已经被广泛覆盖，新的产品机会不在于重新做一套收银、预约或会员系统。</PetMindMarketInsight>
    </div>
  );
}

function PetMindMarketStepBadge({ number }: { number: string }) {
  return (
    <div className="bg-[#474747] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[10px]">
      <p className="[word-break:break-word] flex font-['DINOT:Bold',sans-serif] h-[6px] items-center justify-center leading-[6px] not-italic relative shrink-0 text-[#e6e6e6] text-[8px] text-center translate-y-px w-full">{number}</p>
    </div>
  );
}

type PetMindMarketActor = (typeof PET_MIND_MARKET_CHAIN_STEPS)[number]["actors"][number];

function PetMindMarketActorToken({ actor }: { actor: Exclude<PetMindMarketActor, "arrow"> }) {
  const actorConfig = {
    owner: { background: "bg-[#ff8db2] border-[#ff8db2]", label: "宠主", src: PET_MIND_MARKET_ASSETS.roleOwner },
    staff: { background: "bg-[#ffc48d] border-[#ffc48d]", label: "员工", src: PET_MIND_MARKET_ASSETS.roleStaff },
    system: { background: "bg-[#a2b6e4] border-[#a2b6e4]", label: "系统", src: PET_MIND_MARKET_ASSETS.roleSystem },
    manager: { background: "bg-[#ffc48d] border-[#ffc48d]", label: "店长／员工", src: PET_MIND_MARKET_ASSETS.roleStaff },
  } as const;
  const config = actorConfig[actor];

  return (
    <>
      <div className={`${config.background} border border-solid overflow-hidden relative rounded-[10px] shrink-0 size-[13px]`}>
        <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={config.src} />
      </div>
      <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[13px]">{config.label}</p>
      </div>
    </>
  );
}

function PetMindMarketRolePill({ actors }: { actors: readonly PetMindMarketActor[] }) {
  return (
    <div className="bg-[rgba(255,255,255,0.25)] content-stretch flex gap-[4px] h-[16px] items-center pl-[1.5px] pr-[5px] relative rounded-[10px] shrink-0">
      {actors.map((actor, index) =>
        actor === "arrow" ? (
          <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[11px] text-center whitespace-nowrap" key={`${actor}-${index}`}>
            <p className="leading-[18px]">→</p>
          </div>
        ) : (
          <PetMindMarketActorToken actor={actor} key={`${actor}-${index}`} />
        ),
      )}
    </div>
  );
}

function PetMindMarketTableLabel({ children, multiline = false }: { children: React.ReactNode; multiline?: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] relative self-stretch shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[48px]">
      <div className="[word-break:break-word] font-['OPPOSans:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[11px] text-[rgba(71,71,71,0.8)] text-center whitespace-nowrap">
        {multiline ? children : <p className="leading-[20px]">{children}</p>}
      </div>
    </div>
  );
}

function PetMindMarketCapabilityMap() {
  return (
    <div
      className="content-stretch flex flex-col h-[354px] items-start overflow-clip relative shrink-0 w-full"
      data-node-id="2553:22522"
      data-name="Section content container"
    >
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none z-10" />
      <div
        className="bg-[rgba(224,224,224,0.5)] content-stretch flex h-[76px] items-start relative shadow-[inset_0_-1px_0_#d2d2d2] shrink-0 w-full"
        data-node-id="2568:23935"
        data-name="Section content item"
      >
        <div className="bg-[rgba(224,224,224,0.5)] content-stretch flex flex-col items-center justify-center px-[12px] py-[15px] relative self-stretch shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[48px]">
          <div className="[word-break:break-word] font-['OPPOSans:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[11px] text-[rgba(71,71,71,0.8)] text-center whitespace-nowrap">
            <p className="leading-[20px] mb-0">现有</p>
            <p className="leading-[20px]">能力</p>
          </div>
        </div>
        <div className="flex-[1_0_0] h-[76px] min-w-px relative" data-node-id="2568:23938">
          <div aria-hidden="true" className="absolute bg-[#d2d2d2] h-px left-0 pointer-events-none top-[48px] w-[499px]" />
          <div className="absolute bg-[rgba(0,0,0,0.03)] bottom-0 content-stretch flex h-[76px] items-center justify-center left-[499px] pb-[8px] pt-[12px] px-[12px] w-[87px]" data-node-id="2575:24371">
            <div aria-hidden="true" className="absolute bg-[#d2d2d2] inset-y-0 left-0 pointer-events-none w-px" />
            <div aria-hidden="true" className="absolute bg-[#d2d2d2] inset-y-0 pointer-events-none right-0 w-px" />
            <p className="[word-break:break-word] font-['OPPOSans:Regular',sans-serif] leading-[16px] not-italic opacity-40 relative shrink-0 text-[#474747] text-[11px] text-center whitespace-nowrap">人工判断</p>
          </div>
          <div className="[word-break:break-word] absolute bg-[rgba(255,255,255,0.1)] bottom-0 content-stretch flex gap-[12px] items-start leading-[12px] left-[40px] not-italic px-[12px] py-[8px] text-[#474747] text-[10px] text-center w-[459px] whitespace-nowrap" data-node-id="2575:24367">
            <div aria-hidden="true" className="absolute bg-[#d2d2d2] inset-y-0 left-0 pointer-events-none w-px" />
            <p className="font-['OPPOSans:Medium',sans-serif] opacity-80 relative shrink-0">门店 SaaS</p>
            <p className="font-['OPPOSans:Regular',sans-serif] opacity-80 relative shrink-0">服务预约 → 到店服务 → 信息记录 → 订单归档 → 历史查询</p>
          </div>
          <div className="[word-break:break-word] absolute bg-[rgba(255,255,255,0.1)] bottom-0 content-stretch flex gap-[12px] items-start leading-[12px] not-italic px-[12px] py-[8px] right-0 text-[#474747] text-[10px] text-center w-[230px] whitespace-nowrap" data-node-id="2575:24383">
            <div aria-hidden="true" className="absolute bg-[#d2d2d2] h-px inset-x-0 pointer-events-none top-0" />
            <p className="font-['OPPOSans:Medium',sans-serif] opacity-80 relative shrink-0">CRM／私域工具</p>
            <p className="font-['OPPOSans:Regular',sans-serif] opacity-80 relative shrink-0">回访提醒 → 再次预约</p>
          </div>
          <div className="[word-break:break-word] absolute bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col gap-[8px] items-start leading-[12px] left-0 not-italic px-[12px] py-[8px] text-[#474747] text-[10px] text-center top-0 w-[187px] whitespace-nowrap" data-node-id="2575:24379">
            <div aria-hidden="true" className="absolute bg-[#d2d2d2] inset-y-0 pointer-events-none right-0 w-px" />
            <p className="font-['OPPOSans:Medium',sans-serif] opacity-80 relative shrink-0">本地生活平台</p>
            <p className="font-['OPPOSans:Regular',sans-serif] opacity-80 relative shrink-0">发现门店 → 服务预约 → 到店转化</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex h-[40px] items-start relative shadow-[inset_0_-1px_0_#d2d2d2] shrink-0 w-full" data-node-id="2553:22523">
        <PetMindMarketTableLabel>链路</PetMindMarketTableLabel>
        {PET_MIND_MARKET_CHAIN_STEPS.map((step, index) => (
          <div
            className={`content-stretch flex gap-[6px] h-[40px] items-center justify-center pb-[8px] pt-[12px] px-[12px] relative shrink-0 ${index < PET_MIND_MARKET_CHAIN_STEPS.length - 1 ? "shadow-[inset_-1px_0_0_#d2d2d2]" : ""}`}
            key={step.number}
            style={{ width: step.width }}
          >
            <PetMindMarketStepBadge number={step.number} />
            <p className="[word-break:break-word] font-['OPPOSans:Medium',sans-serif] leading-[16px] not-italic opacity-80 relative shrink-0 text-[#474747] text-[12px] text-center whitespace-nowrap">{step.label}</p>
          </div>
        ))}
      </div>
      <div className="content-stretch flex h-[40px] items-start relative shadow-[inset_0_-1px_0_#d2d2d2] shrink-0 w-full" data-node-id="2559:23172">
        <PetMindMarketTableLabel>角色</PetMindMarketTableLabel>
        {PET_MIND_MARKET_CHAIN_STEPS.map((step, index) => (
          <div
            className={`content-stretch flex flex-col h-[40px] items-center justify-center p-[12px] relative shrink-0 ${index < PET_MIND_MARKET_CHAIN_STEPS.length - 1 ? "shadow-[inset_-1px_0_0_#d2d2d2]" : ""}`}
            key={step.number}
            style={{ width: step.width }}
          >
            <PetMindMarketRolePill actors={step.actors} />
          </div>
        ))}
      </div>
      <div className="content-stretch flex h-[78px] items-start relative shadow-[inset_0_-1px_0_#d2d2d2] shrink-0 w-full" data-node-id="2567:23741">
        <PetMindMarketTableLabel>动作</PetMindMarketTableLabel>
        {PET_MIND_MARKET_CHAIN_STEPS.map((step, index) => (
          <div
            className={`content-stretch flex flex-col h-[78px] items-center px-[8px] py-[12px] relative shrink-0 ${index < PET_MIND_MARKET_CHAIN_STEPS.length - 1 ? "shadow-[inset_-1px_0_0_#d2d2d2]" : ""}`}
            key={step.number}
            style={{ width: step.width }}
          >
            <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[10px] text-center w-full">
              <p className="leading-[18px]">{step.action}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="content-stretch flex h-[78px] items-start relative shadow-[inset_0_-1px_0_#d2d2d2] shrink-0 w-full" data-node-id="2568:23908">
        <PetMindMarketTableLabel multiline>
          <p className="leading-[16px] mb-0">工具</p>
          <p className="leading-[16px]">触点</p>
        </PetMindMarketTableLabel>
        {PET_MIND_MARKET_CHAIN_STEPS.map((step, index) => (
          <div
            className={`content-stretch flex flex-col h-[78px] items-center px-[8px] py-[12px] relative shrink-0 ${index < PET_MIND_MARKET_CHAIN_STEPS.length - 1 ? "shadow-[inset_-1px_0_0_#d2d2d2]" : ""}`}
            key={step.number}
            style={{ width: step.width }}
          >
            <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[10px] text-center w-full">
              <p className="leading-[18px]">{step.tools}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="content-stretch flex h-[42px] items-start relative shrink-0 w-full" data-node-id="2568:23871">
        <PetMindMarketTableLabel>断点</PetMindMarketTableLabel>
        {[80, 107, 107].map((width, index) => (
          <div className="content-stretch flex flex-col h-[42px] items-center justify-center p-[12px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0" key={width + index} style={{ width }}>
            <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic opacity-40 relative shrink-0 text-[#474747] text-[10px] text-center w-full">
              <p className="leading-[18px]">已有能力</p>
            </div>
          </div>
        ))}
        {[
          ["4", "5", "调取与整理成本"],
          ["5", "6", "理解与比较成本"],
          ["6", "7", "配置与执行成本"],
        ].map(([from, to, label]) => (
          <div className="bg-[#dbdbdb] content-stretch flex flex-[1_0_0] gap-[6px] h-[42px] items-center justify-center min-w-px p-[12px] relative shadow-[inset_-1px_0_0_#d2d2d2]" key={label}>
            <div className="content-stretch flex gap-px items-center relative shrink-0">
              <PetMindMarketStepBadge number={from} />
              <p className="[word-break:break-word] font-['OPPOSans:Regular',sans-serif] leading-[18px] not-italic opacity-80 relative shrink-0 text-[#474747] text-[11px] text-center whitespace-nowrap">→</p>
              <PetMindMarketStepBadge number={to} />
            </div>
            <p className="[word-break:break-word] font-['OPPOSans:Medium',sans-serif] leading-[16px] not-italic opacity-80 relative shrink-0 text-[#474747] text-[11px] text-center whitespace-nowrap">{label}</p>
          </div>
        ))}
        <div className="content-stretch flex flex-col h-[42px] items-center justify-center p-[12px] relative shrink-0 w-[115px]">
          <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic opacity-40 relative shrink-0 text-[#474747] text-[10px] text-center w-full">
            <p className="leading-[18px]">已有能力</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PetMindMarketBreakpointCards() {
  return (
    <div className="content-stretch flex gap-[12px] h-[301px] items-start relative shrink-0 w-full" data-node-id="2568:23968">
      {PET_MIND_MARKET_BREAKPOINT_CARDS.map((card) => (
        <div
          className={`bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex flex-col gap-[12px] h-[301px] items-start relative rounded-[8px] shrink-0 ${card.paddingClass}`}
          data-node-id={card.nodeId}
          data-name="Quote Details"
          key={card.title}
          style={{ width: card.width }}
        >
          <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Bold',sans-serif] h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[12px] text-justify tracking-[-0.48px] uppercase w-full">
            <p className="leading-[24px]">{card.title}</p>
          </div>
          <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" />
          {card.paragraphs.map((paragraph) => (
            <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] h-[88px] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[#474747] text-[12px] text-justify uppercase w-full" key={paragraph}>
              <p className="leading-[22px]">{paragraph}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PetMindMarketBreakpointsBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[864px]" data-node-id="2553:22283" data-name="Blockquote">
      <PetMindMarketBlockTitle
        nodeId="2553:22284"
        subtitle="判断依据：具体竞品功能梳理、产品实操及门店经营访谈／观察。"
        title="把一笔订单拉长看，断点发生在哪里"
      />
      <PetMindMarketCapabilityMap />
      <PetMindMarketBreakpointCards />
      <PetMindMarketInsight nodeId="2592:25272" strong>
        问题并非信息没有被记录，而是“留存—调取—理解—行动”之间仍依赖大量人工操作。宠物可以作为档案对象存在，但门店的日常工作流仍主要由预约、订单和会员运营驱动。多次服务记录虽然可以被查询，却不一定会在下一次服务或运营动作中被主动汇集和使用。
      </PetMindMarketInsight>
    </div>
  );
}

function PetMindMarketOpportunitySection({ sectionId, sectionRef }: PetMindSectionAnchorProps) {
  return (
    <section
      ref={sectionRef}
      id={`petmind-detail-section-${sectionId}`}
      className="content-stretch flex flex-col gap-[84px] items-start max-w-[864px] py-[48px] relative shrink-0 w-full"
      data-node-id="2285:23469"
      data-section-id={sectionId}
      data-name="Section Container 01"
    >
      <PetMindSectionDivider
        paragraphs={["门店 SaaS、本地生活平台与私域工具已经覆盖经营、交易和触达，但服务信息从留存到再次使用，再到转化为后续行动，仍需要大量人工衔接。"]}
        sectionNumber="01"
        title="01 · 在成熟 SaaS 之外，寻找新增长"
      />
      <PetMindMarketPromptCard kind="question" />
      <PetMindMarketExistingToolsBlock />
      <PetMindMarketBreakpointsBlock />
      <PetMindMarketPromptCard kind="answer" />
    </section>
  );
}

function PetMindMarketToRelationshipTransition() {
  return (
    <div
      className="content-stretch flex h-[264px] items-center justify-center px-[48px] py-[84px] relative shrink-0 w-[864px]"
      data-node-id="2591:25254"
      data-name="Frame 1321319434"
    >
      <p
        className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[48px] not-italic relative shrink-0 text-[#474747] text-[24px] text-center tracking-[0px] w-[768px]"
        data-node-id="2591:25255"
        data-name="Conclusion Text"
      >
        下一步，我从一只金渐层猫咪 Luna 的真实服务过程出发，
        <br />
        将观察单位从“一笔订单”转向“同一只宠物”。
      </p>
    </div>
  );
}

function PetMindRelationshipQuoteCard({
  widthClass,
  label,
  quote,
  nodeId,
  containerNodeId,
  intersectNodeId,
  itemNodeId,
  labelNodeId,
  dividerNodeId,
  quoteNodeId,
}: {
  widthClass: string;
  label: string;
  quote: string;
  nodeId: string;
  containerNodeId: string;
  intersectNodeId: string;
  itemNodeId: string;
  labelNodeId: string;
  dividerNodeId: string;
  quoteNodeId: string;
}) {
  return (
    <div
      className={`bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex flex-col items-center overflow-clip relative rounded-[8px] shrink-0 ${widthClass}`}
      data-node-id={nodeId}
      data-name="交互"
    >
      <div className={`bg-[rgba(255,255,255,0.15)] h-[48px] overflow-clip relative shrink-0 ${widthClass}`} data-node-id={containerNodeId} data-name="Text Container">
        <div className="absolute h-[47px] left-px top-0 w-[145px]" data-node-id={intersectNodeId} data-name="Intersect">
          <div className="absolute inset-[-2.13%_-1%_-2.13%_-0.69%]">
            <img alt="" aria-hidden="true" className="block max-w-none size-full" draggable={false} src={PET_MIND_RELATIONSHIP_ASSETS.intersect} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[8px] items-center left-0 px-[16px] top-[16px]" data-node-id={itemNodeId} data-name="Quote Item">
          <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9f9f9f] text-[11px] whitespace-nowrap" data-node-id={labelNodeId}>
            <p className="leading-[16px]">{label}</p>
          </div>
          <div className="h-[8px] relative shrink-0 w-px" data-node-id={dividerNodeId} data-name="Quote Title">
            <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_RELATIONSHIP_ASSETS.quoteTitle} />
          </div>
          <div className="content-stretch flex items-end relative shrink-0" data-name="Quote">
            <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[11px] whitespace-nowrap" data-node-id={quoteNodeId}>
              <p className="leading-[16px]">{quote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PetMindRelationshipDetails() {
  return (
    <div
      className="bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex flex-col items-start justify-center py-[24px] relative rounded-[8px] shrink-0 w-full"
      data-node-id="2399:26310"
      data-name="Quote Details"
    >
      <div className="content-stretch flex items-center justify-between px-[24px] relative shrink-0 w-full" data-node-id="2399:26311" data-name="Quote Container">
        <PetMindRelationshipQuoteCard
          containerNodeId="2399:26313"
          dividerNodeId="2399:26317"
          intersectNodeId="2399:26314"
          itemNodeId="2399:26315"
          label="机会观察"
          labelNodeId="2399:26316"
          nodeId="2399:26312"
          quote="AI 陪伴和 AI 助手产品让用户产生依赖"
          quoteNodeId="2399:26319"
          widthClass="w-[281px]"
        />
        <PetMindRelationshipQuoteCard
          containerNodeId="2399:26321"
          dividerNodeId="2399:26325"
          intersectNodeId="2399:26322"
          itemNodeId="2399:26323"
          label="判断迁移"
          labelNodeId="2399:26324"
          nodeId="2399:26320"
          quote="宠主不是单纯在“养动物”，而是在维系一种家庭关系、陪伴关系和情绪关系。"
          quoteNodeId="2399:26327"
          widthClass="w-[467px]"
        />
      </div>
      <div className="h-[48px] relative shrink-0 w-full" data-node-id="2399:26328" data-name="Text Container">
        <div
          className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] left-[194px] not-italic text-[#474747] text-[11px] top-[40px] whitespace-nowrap"
          data-node-id="2399:26329"
        >
          <p className="leading-[16px]">沉淀了长期对话、偏好、共同记忆、被理解的感觉</p>
        </div>
        <div
          className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] left-[549px] not-italic text-[#474747] text-[11px] top-[40px] whitespace-nowrap"
          data-node-id="2399:26330"
        >
          <p className="leading-[16px]">事件性数据影响情感连结</p>
        </div>
        <div className="absolute h-[31px] left-[134px] top-[10px] w-[52px]" data-node-id="2399:26331">
          <div className="absolute inset-[0_0_-7.45%_-4.44%]">
            <img alt="" aria-hidden="true" className="block max-w-none size-full" draggable={false} src={PET_MIND_RELATIONSHIP_ASSETS.arrowLeft} />
          </div>
        </div>
        <div className="absolute flex h-[31px] items-center justify-center right-[134px] top-[10px] w-[52px]" data-node-id="2399:26332">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="h-[31px] relative w-[52px]">
              <div className="absolute inset-[0_0_-7.45%_-4.44%]">
                <img alt="" aria-hidden="true" className="block max-w-none size-full" draggable={false} src={PET_MIND_RELATIONSHIP_ASSETS.arrowRight} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-0 items-center justify-center left-[444px] top-[41px] w-[97px]" data-node-id="2399:26333">
          <div className="flex-none rotate-180">
            <div className="h-0 relative w-[97px]">
              <div className="absolute inset-[-2.31px_0]">
                <img alt="" aria-hidden="true" className="block max-w-none size-full" draggable={false} src={PET_MIND_RELATIONSHIP_ASSETS.connector} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
  const hasDescription = Boolean(description);

  return (
    <div className={`content-stretch flex gap-[12px] relative shrink-0 w-full ${hasDescription ? "h-[54px] items-start" : "h-[32px] items-center"}`} data-node-id={nodeId} data-name="Quote Container">
      <div className="flex h-[32px] items-center relative shrink-0" data-name="Divider Icon Container">
        <div className="bg-[#474747] h-[16px] opacity-25 relative shrink-0 w-[4px]" data-name="Divider Icon" />
      </div>
      <div className={`[word-break:break-word] flex flex-col gap-[2px] justify-center leading-[0] min-w-0 not-italic relative ${hasDescription ? "flex-[1_0_0] text-[#414141]" : "shrink-0 text-[#474747]"}`}>
        <p className={`font-['OPPOSans:Bold',sans-serif] whitespace-nowrap ${hasDescription ? "leading-[32px] text-[20px]" : "leading-[20px] text-[14px]"}`}>{title}</p>
        {description && <p className="font-['OPPOSans:Regular',sans-serif] leading-[20px] min-w-full opacity-65 text-[12px] text-justify w-[min-content]">{description}</p>}
      </div>
    </div>
  );
}

function PetMindDataComparisonColumn({
  title,
  summary,
  decision,
  widthClass,
  frameName,
  imageAlt,
  imageSrc,
  nodeIds,
}: {
  title: string;
  summary: string;
  decision: string;
  widthClass: string;
  frameName: string;
  imageAlt: string;
  imageSrc: string;
  nodeIds: {
    frame: string;
    header: string;
    panel: string;
    image: string;
    imageDivider: string;
    decision: string;
    intersect: string;
    decisionContent: string;
    label: string;
    dividerWrapper: string;
    divider: string;
    textWrapper?: string;
    text: string;
  };
}) {
  const decisionText = (
    <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#474747] text-[11px] text-justify" data-node-id={nodeIds.text}>
      <p className="leading-[20px]">{decision}</p>
    </div>
  );

  return (
    <div className={`content-stretch flex flex-col gap-[20px] h-[549px] items-start justify-center relative shrink-0 ${widthClass}`} data-node-id={nodeIds.frame} data-name={frameName}>
      <PetMindRelationshipQuoteHeader description={summary} nodeId={nodeIds.header} title={title} />
      <div className="bg-[#e2e2e2] content-stretch flex flex-col h-[475px] items-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-node-id={nodeIds.panel} data-name="交互">
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[8px] z-[2]" />
        <div className="h-[402px] relative shrink-0 w-full" data-node-id={nodeIds.image}>
          <img alt={imageAlt} className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" draggable={false} src={imageSrc} />
        </div>
        <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" data-node-id={nodeIds.imageDivider} />
        <div className={`bg-[rgba(255,255,255,0.25)] content-stretch flex ${nodeIds.textWrapper ? "gap-[16px]" : "gap-[12px]"} h-[72px] items-center px-[16px] relative shrink-0 w-full`} data-node-id={nodeIds.decision}>
          <div className="absolute h-[72px] left-0 top-0 w-[254px]" data-node-id={nodeIds.intersect} data-name="Intersect">
            <div className="absolute inset-[-1.39%_-0.71%_-1.39%_-0.39%]">
              <img alt="" aria-hidden="true" className="block max-w-none size-full" draggable={false} src={PET_MIND_RELATIONSHIP_ASSETS.decisionIntersect} />
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px relative" data-node-id={nodeIds.decisionContent}>
            <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9f9f9f] text-[11px] text-center whitespace-nowrap" data-node-id={nodeIds.label}>
              <p className="leading-[13px] mb-0">产</p>
              <p className="leading-[13px] mb-0">品</p>
              <p className="leading-[13px] mb-0">判</p>
              <p className="leading-[13px]">断</p>
            </div>
            <div className="flex h-full items-center justify-center relative shrink-0" data-node-id={nodeIds.dividerWrapper}>
              <div className="h-[24px] relative shrink-0 w-px" data-node-id={nodeIds.divider} data-name="Quote Title">
                <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_RELATIONSHIP_ASSETS.decisionDivider} />
              </div>
            </div>
            {nodeIds.textWrapper ? (
              <div className="content-stretch flex flex-[1_0_0] items-end min-w-px relative" data-node-id={nodeIds.textWrapper}>
                {decisionText}
              </div>
            ) : decisionText}
          </div>
        </div>
      </div>
    </div>
  );
}

function PetMindRelationshipDataComparison() {
  return (
    <div className="content-stretch flex gap-[24px] h-[549px] items-center relative shrink-0 w-full" data-node-id="2465:20766" data-name="Quote Details">
      <PetMindDataComparisonColumn
        decision="传统宠物SaaS能收集到不少数据，但这些数据主要服务经营流程，往往分散在订单、服务、商品和会员模块中，难以真正理解同一只宠物的连续状态，也无法主动指导下一步行动。"
        frameName="Frame 1321319317"
        imageAlt="散点数据界面"
        imageSrc={PET_MIND_RELATIONSHIP_ASSETS.scatteredPanel}
        nodeIds={{
          frame: "2465:20767",
          header: "2465:20768",
          panel: "2465:20769",
          image: "2465:20770",
          imageDivider: "2465:20771",
          decision: "2465:20772",
          intersect: "2465:20773",
          decisionContent: "2465:20774",
          label: "2465:20775",
          dividerWrapper: "2465:20776",
          divider: "2465:20777",
          textWrapper: "2465:20778",
          text: "2465:20779",
        }}
        summary="传统 SaaS 数据 | 按模块沉淀的经营记录。"
        title="散点数据"
        widthClass="w-[365px]"
      />
      <PetMindDataComparisonColumn
        decision="当不同端产生的数据持续汇聚到同一只宠物上，系统才能从分散记录升级为事件链数据，让AI理解它经历了什么、现在怎么样，以及下一步该做什么，从而实现真正的主动照护与长期经营。"
        frameName="Frame 1321319318"
        imageAlt="人宠事件链数据界面"
        imageSrc={PET_MIND_RELATIONSHIP_ASSETS.eventChainPanel}
        nodeIds={{
          frame: "2465:20780",
          header: "2465:20781",
          panel: "2465:20782",
          image: "2465:20783",
          imageDivider: "2465:20784",
          decision: "2465:20785",
          intersect: "2465:20786",
          decisionContent: "2465:20787",
          label: "2465:20788",
          dividerWrapper: "2465:20789",
          divider: "2465:20790",
          text: "2465:20791",
        }}
        summary="跨端汇聚的连续事件 | 来自商家端+员工端+宠物护照+Al数据中心"
        title="人宠事件链数据"
        widthClass="w-[475px]"
      />
    </div>
  );
}

function PetMindRelationshipImpactMatrix() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="2465:20792" data-name="Blockquote" style={{ letterSpacing: "0px" }}>
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="2465:20793" data-name="Quote Container">
        <div className="content-stretch flex h-[32px] items-center relative shrink-0" data-name="Divider Icon Container">
          <div className="bg-[#474747] h-[16px] opacity-25 relative shrink-0 w-[4px]" data-name="Divider Icon" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-w-px relative">
          <div className="[word-break:break-word] flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#414141] text-[20px] tracking-[0px] whitespace-nowrap">
            <p className="leading-[32px]">散点&事件链数据 对角色的影响</p>
          </div>
        </div>
      </div>

      <div className="content-stretch flex flex-col h-[220px] items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-node-id="2465:20794" data-name="Section content container">
        <div className="content-stretch flex h-[36px] items-start relative shadow-[inset_0_-1px_0_#d2d2d2] shrink-0 w-full" data-node-id="2465:20795">
          <div className="bg-[#e0e0e0] h-[36px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[76px]" data-node-id="2465:20796" />
          <div className="bg-[#e0e0e0] content-stretch flex gap-[8px] h-[36px] items-center p-[6px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[202px]" data-node-id="2465:20797">
            <div className="bg-[#414141] h-full opacity-20 relative rounded-[4px] shrink-0 w-[24px]" data-node-id="2465:20798">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-1/2 top-1/2 w-[14px]" data-node-id="2465:20799" data-name="Union">
                <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_IMPACT_ASSETS.pet} />
              </div>
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Bold',sans-serif] leading-[20px] min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20800">对宠物</p>
          </div>
          <div className="bg-[#e0e0e0] content-stretch flex gap-[8px] h-[36px] items-center p-[6px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[168px]" data-node-id="2465:20801">
            <div className="relative shrink-0 size-[24px]" data-node-id="2465:20802">
              <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_IMPACT_ASSETS.owner} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Bold',sans-serif] leading-[20px] min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20804">对宠主</p>
          </div>
          <div className="bg-[#e0e0e0] content-stretch flex gap-[8px] h-[36px] items-center p-[6px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[204px]" data-node-id="2465:20805">
            <div className="relative shrink-0 size-[24px]" data-node-id="2465:20806">
              <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_IMPACT_ASSETS.merchant} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Bold',sans-serif] leading-[20px] min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20808">对商家</p>
          </div>
          <div className="bg-[#e0e0e0] content-stretch flex flex-[1_0_0] gap-[8px] h-[36px] items-center min-w-px p-[6px] relative" data-node-id="2465:20809">
            <div className="relative shrink-0 size-[24px]" data-node-id="2465:20810">
              <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_IMPACT_ASSETS.platform} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Bold',sans-serif] leading-[20px] min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20812">对平台</p>
          </div>
        </div>

        <div className="content-stretch flex h-[92px] items-start relative shadow-[inset_0_-1px_0_#d2d2d2] shrink-0 w-full" data-node-id="2465:20813" data-name="Section content item">
          <div className="[word-break:break-word] content-stretch flex flex-col h-full items-start leading-[20px] not-italic px-[8px] py-[16px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px] w-[76px] whitespace-nowrap" data-node-id="2465:20814">
            <p className="font-['OPPOSans:Medium',sans-serif] relative shrink-0" data-node-id="2465:20815">散点数据</p>
            <p className="font-['OPPOSans:Light',sans-serif] relative shrink-0" data-node-id="2465:20816">传统SaaS</p>
          </div>
          <div className="content-stretch flex h-full items-start pl-[4px] pr-[12px] py-[16px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[202px]" data-node-id="2465:20817">
            <ul className="[word-break:break-word] block flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[0] list-disc min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20818">
              <li className="mb-0 ms-[18px]"><span className="leading-[20px]">知道它做过哪些服务、摄入过什么商品</span></li>
              <li className="ms-[18px]"><span className="leading-[20px]">当前状态、变化和最新需求未知</span></li>
            </ul>
          </div>
          <div className="content-stretch flex h-full items-start pl-[4px] pr-[12px] py-[16px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[168px]" data-node-id="2465:20819">
            <ul className="[word-break:break-word] block flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[0] list-disc min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20820">
              <li className="mb-0 ms-[18px]"><span className="leading-[20px]">只能看到历史消费和诊疗记录</span></li>
              <li className="ms-[18px]"><span className="leading-[20px]">缺少主动提醒与专业建议</span></li>
            </ul>
          </div>
          <div className="content-stretch flex h-full items-start pl-[4px] pr-[12px] py-[16px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[204px]" data-node-id="2465:20821">
            <ul className="[word-break:break-word] block flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[0] list-disc min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20822">
              <li className="mb-0 ms-[18px]"><span className="leading-[20px]">关注交易订单</span></li>
              <li className="ms-[18px]"><span className="leading-[20px]">难以洞察客户需求，缺乏复购和客户生命周期运营能力。</span></li>
            </ul>
          </div>
          <div className="content-stretch flex flex-[1_0_0] h-full items-start min-w-px pl-[4px] pr-[12px] py-[16px] relative" data-node-id="2465:20823">
            <ul className="[word-break:break-word] block flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[0] list-disc min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20824">
              <li className="mb-0 ms-[18px]"><span className="leading-[20px]">看到交易规模、GMV、用户增长</span></li>
              <li className="ms-[18px]"><span className="leading-[20px]">数据围绕交易，壁垒较低</span></li>
            </ul>
          </div>
        </div>

        <div className="content-stretch flex h-[92px] items-start relative shrink-0 w-full" data-node-id="2465:20825" data-name="Section content item">
          <div className="[word-break:break-word] content-stretch flex flex-col h-full items-start leading-[20px] not-italic px-[8px] py-[16px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px] w-[76px] whitespace-nowrap" data-node-id="2465:20826">
            <p className="font-['OPPOSans:Medium',sans-serif] relative shrink-0" data-node-id="2465:20827">事件链数据</p>
            <p className="font-['OPPOSans:Light',sans-serif] relative shrink-0" data-node-id="2465:20828">PetMind AI</p>
          </div>
          <div className="content-stretch flex h-full items-start pl-[4px] pr-[12px] py-[16px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[202px]" data-node-id="2465:20829">
            <ul className="[word-break:break-word] block flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[0] list-disc min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20830">
              <li className="mb-0 ms-[18px]"><span className="leading-[20px]">理解它的健康、行为、护理变化</span></li>
              <li className="ms-[18px]"><span className="leading-[20px]">提前发现问题，获得个性化照护</span></li>
            </ul>
          </div>
          <div className="content-stretch flex h-full items-start pl-[4px] pr-[12px] py-[16px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[168px]" data-node-id="2465:20831">
            <ul className="[word-break:break-word] block flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[0] list-disc min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20832">
              <li className="mb-0 ms-[18px]"><span className="leading-[20px]">获得主动提醒、专业建议和照护计划；</span></li>
              <li className="ms-[18px]"><span className="leading-[20px]">平台成为“照护伙伴”</span></li>
            </ul>
          </div>
          <div className="content-stretch flex h-full items-start pl-[4px] pr-[12px] py-[16px] relative shadow-[inset_-1px_0_0_#d2d2d2] shrink-0 w-[204px]" data-node-id="2465:20833">
            <ul className="[word-break:break-word] block flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[0] list-disc min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20834">
              <li className="mb-0 ms-[18px]"><span className="leading-[20px]">服务更专业，回访更及时，复购率更高；</span></li>
              <li className="ms-[18px]"><span className="leading-[20px]">经营客户关系，而非一次性交易</span></li>
            </ul>
          </div>
          <div className="content-stretch flex flex-[1_0_0] h-full items-start min-w-px pl-[4px] pr-[12px] py-[16px] relative" data-node-id="2465:20835">
            <ul className="[word-break:break-word] block flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[0] list-disc min-w-px not-italic relative text-[12px] text-[rgba(71,71,71,0.8)] text-justify tracking-[0px]" data-node-id="2465:20836">
              <li className="mb-0 ms-[18px]"><span className="leading-[20px]">沉淀人宠关系资产，数据壁垒更高</span></li>
              <li className="ms-[18px]"><span className="leading-[20px]">AI 更精准，生态价值持续增强</span></li>
            </ul>
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute border border-[#d2d2d2] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function PetMindFlywheelCard({
  step,
}: {
  step: (typeof PET_MIND_RELATIONSHIP_FLYWHEEL_STEPS)[number];
}) {
  return (
    <div
      className="content-stretch flex flex-col h-[109px] items-start overflow-clip relative rounded-[8px] w-full"
      data-node-id={step.nodeIds.container}
      data-name="Container"
      style={{ boxShadow: `4px 4px 0 0 ${step.shadowColor}` }}
    >
      <div
        className="content-stretch flex gap-[12px] h-[36px] items-center overflow-clip relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full"
        data-node-id={step.nodeIds.header}
        data-name="Icon Container"
        style={{ backgroundColor: step.headerColor }}
      >
        <div className="content-stretch flex h-full items-center relative shrink-0">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[36px]">
            <p
              className="font-['DINOT:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-justify tracking-[1.44px] whitespace-nowrap"
              style={{ color: step.numberColor, opacity: step.numberOpacity }}
            >
              {step.number}
            </p>
          </div>
          <div className="h-full relative shrink-0 w-px" data-name="Vector 1130 (Stroke)">
            <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_FLYWHEEL_ASSETS.cardDividerVertical} />
          </div>
        </div>
        <p className="font-['OPPOSans:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#474747] text-[12px] text-justify tracking-[0.48px] whitespace-nowrap">
          {step.label}
        </p>
      </div>
      <div className="h-px relative shrink-0 w-full" data-node-id={step.nodeIds.divider} data-name="Vector 1130 (Stroke)">
        <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_FLYWHEEL_ASSETS.cardDividerHorizontal} />
      </div>
      <div
        className="[word-break:break-word] content-stretch flex flex-col h-[72px] items-start leading-[18px] not-italic overflow-clip pb-[8px] pt-[10px] px-[12px] relative shrink-0 text-[10px] text-[rgba(71,71,71,0.8)] text-justify w-full"
        data-node-id={step.nodeIds.body}
        data-name="交互"
        style={{ backgroundImage: `linear-gradient(90deg, ${step.bodyTint} 0%, ${step.bodyTint} 100%), linear-gradient(90deg, #e6e6e6 0%, #e6e6e6 100%)` }}
      >
        <p className="font-['OPPOSans:Bold',sans-serif] relative shrink-0 w-full" data-node-id={step.nodeIds.title}>{step.title}</p>
        <p className="font-['OPPOSans:Regular',sans-serif] relative shrink-0 w-full" data-node-id={step.nodeIds.description}>{step.description}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[8px] z-[2]" style={{ borderColor: step.borderColor }} />
    </div>
  );
}

function PetMindFlywheelArrow({
  asset,
  nodeId,
  vertical = false,
}: {
  asset: string;
  nodeId: string;
  vertical?: boolean;
}) {
  return (
    <div className={`h-[12px] relative shrink-0 w-[7px] ${vertical ? "rotate-90" : ""}`} data-node-id={nodeId}>
      <div className="absolute inset-[9.77%_7.67%_9.77%_0]">
        <img alt="" aria-hidden="true" className="block max-w-none size-full" draggable={false} src={asset} />
      </div>
    </div>
  );
}

function PetMindFlywheelCardRow({
  arrowAsset,
  arrowNodeId,
  arrowSlotIndex,
  nodeId,
  slots,
}: {
  arrowAsset: string;
  arrowNodeId: string;
  arrowSlotIndex: number;
  nodeId: string;
  slots: ReadonlyArray<(typeof PET_MIND_RELATIONSHIP_FLYWHEEL_STEPS)[number] | null>;
}) {
  return (
    <div className="content-stretch flex gap-[8px] h-[109px] items-start relative shrink-0 w-full" data-node-id={nodeId}>
      {slots.map((step, index) => (
        <React.Fragment key={`${nodeId}-${index}`}>
          <div className="flex-[1_0_0] h-[109px] min-w-px relative">
            {step && <PetMindFlywheelCard step={step} />}
          </div>
          {index < slots.length - 1 && (
            <div className="content-stretch flex h-[109px] items-start justify-center pt-[12px] relative shrink-0 w-[25px]">
              {index === arrowSlotIndex && <PetMindFlywheelArrow asset={arrowAsset} nodeId={arrowNodeId} />}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function PetMindFlywheelTurnRow({
  arrowAsset,
  arrowNodeId,
  activeSlotIndex,
  nodeId,
}: {
  arrowAsset: string;
  arrowNodeId: string;
  activeSlotIndex: number;
  nodeId: string;
}) {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0 w-full" data-node-id={nodeId}>
      {[0, 1, 2, 3].map((slotIndex) => (
        <React.Fragment key={`${nodeId}-${slotIndex}`}>
          <div className="flex flex-[1_0_0] h-[25px] items-center justify-center min-w-px relative">
            {slotIndex === activeSlotIndex && <PetMindFlywheelArrow asset={arrowAsset} nodeId={arrowNodeId} vertical />}
          </div>
          {slotIndex < 3 && <div aria-hidden="true" className="h-full relative shrink-0 w-[25px]" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function PetMindFlywheelMetric({
  active = false,
  label,
  nodeId,
  widthClass,
}: {
  active?: boolean;
  label: string;
  nodeId: string;
  widthClass: string;
}) {
  return (
    <div className={`content-stretch flex gap-[12px] items-center justify-center px-[20px] relative shrink-0 ${widthClass}`} data-node-id={nodeId}>
      <div className="relative shrink-0 size-[32px]" data-name="Frame 427319631">
        <img
          alt=""
          aria-hidden="true"
          className="absolute block inset-0 max-w-none size-full"
          draggable={false}
          src={active ? PET_MIND_FLYWHEEL_ASSETS.metricActive : PET_MIND_FLYWHEEL_ASSETS.metricInactive}
        />
      </div>
      <p className={`font-['OPPOSans:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-justify tracking-[0.48px] whitespace-nowrap ${active ? "text-[#687eb8]" : "text-[#474747]"}`}>
        {label}
      </p>
    </div>
  );
}

function PetMindFlywheelTopConnector({ nodeId }: { nodeId: string }) {
  return (
    <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id={nodeId}>
      <div className="absolute inset-[-2.89px_0_-2.89px_-1.73%]">
        <img alt="" aria-hidden="true" className="block max-w-none size-full" draggable={false} src={PET_MIND_FLYWHEEL_ASSETS.topConnector} />
      </div>
    </div>
  );
}

function PetMindRelationshipFlywheel() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="2465:20837" data-name="Blockquote">
      <PetMindRelationshipQuoteHeader nodeId="2465:20838" title="事件链驱动的人宠关系增长飞轮" />
      <div className="content-stretch flex flex-col h-[535px] items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-node-id="2465:20839" data-name="Frame 1321319345">
        <div
          className="content-stretch flex gap-[4px] h-[64px] items-center py-[16px] relative rounded-[8px] shrink-0 w-full"
          data-node-id="2465:20840"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(160,160,160,0.1) 0%, rgba(104,126,184,0.1) 100%), linear-gradient(90deg, #e6e6e6 0%, #e6e6e6 100%)" }}
        >
          <PetMindFlywheelMetric label="更多真实服务发生" nodeId="2465:20841" widthClass="w-[184px]" />
          <PetMindFlywheelTopConnector nodeId="2465:20842" />
          <PetMindFlywheelMetric label="更多关系被理解" nodeId="2465:20843" widthClass="w-[171px]" />
          <PetMindFlywheelTopConnector nodeId="2465:20844" />
          <PetMindFlywheelMetric active label="更强经营价值产生" nodeId="2465:20845" widthClass="w-[184px]" />
          <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[8px] z-[2]" />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] h-[471px] items-start p-[32px] relative shrink-0 w-full" data-node-id="2465:20849" data-name="Frame 1321319343">
          <PetMindFlywheelCardRow
            arrowAsset={PET_MIND_FLYWHEEL_ASSETS.arrow1137}
            arrowNodeId="2465:20859"
            arrowSlotIndex={0}
            nodeId="2465:20850"
            slots={[PET_MIND_RELATIONSHIP_FLYWHEEL_STEPS[0], PET_MIND_RELATIONSHIP_FLYWHEEL_STEPS[1], null, null]}
          />
          <PetMindFlywheelTurnRow activeSlotIndex={1} arrowAsset={PET_MIND_FLYWHEEL_ASSETS.arrow1137} arrowNodeId="2465:20891" nodeId="2465:20885" />
          <PetMindFlywheelCardRow
            arrowAsset={PET_MIND_FLYWHEEL_ASSETS.arrow1138}
            arrowNodeId="2465:20917"
            arrowSlotIndex={1}
            nodeId="2465:20900"
            slots={[null, PET_MIND_RELATIONSHIP_FLYWHEEL_STEPS[2], PET_MIND_RELATIONSHIP_FLYWHEEL_STEPS[3], null]}
          />
          <PetMindFlywheelTurnRow activeSlotIndex={2} arrowAsset={PET_MIND_FLYWHEEL_ASSETS.arrow1141} arrowNodeId="2465:20943" nodeId="2465:20933" />
          <PetMindFlywheelCardRow
            arrowAsset={PET_MIND_FLYWHEEL_ASSETS.arrow1142}
            arrowNodeId="2465:20973"
            arrowSlotIndex={2}
            nodeId="2465:20948"
            slots={[null, null, PET_MIND_RELATIONSHIP_FLYWHEEL_STEPS[4], PET_MIND_RELATIONSHIP_FLYWHEEL_STEPS[5]]}
          />
        </div>
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[8px] z-[3]" />
      </div>
      <div className="content-stretch flex gap-[4px] h-[48px] items-start relative shrink-0 w-full" data-node-id="2465:20981" data-name="Quote Item Container">
        <div className="relative shrink-0 size-[24px]" data-node-id="2465:20982" data-name="Metric Spacer">
          <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={PET_MIND_FLYWHEEL_ASSETS.metricSpacer} />
        </div>
        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#474747] text-[12px] uppercase" data-node-id="2465:20984">
          <p className="leading-[24px]">PetMind AI 的核心资产不是“商户数据量大”，而是“每只宠物的数据足够连续”。单个宠物的数据越连续，单个用户体验越强；大量宠物数据结构化后，平台级 AI 价值再进一步放大。</p>
        </div>
      </div>
    </div>
  );
}

function PetMindRelationshipSection({ sectionId, sectionRef }: PetMindSectionAnchorProps) {
  return (
    <section
      ref={sectionRef}
      id={`petmind-detail-section-${sectionId}`}
      className="content-stretch flex flex-col gap-[84px] items-start max-w-[864px] py-[48px] relative shrink-0 w-[864px]"
      data-node-id="2465:20740"
      data-section-id={sectionId}
      data-name="Section Container 7"
    >
      <PetMindSectionDivider
        paragraphs={["宠物行业真正有价值的不是传统 SaaS 沉淀的经营交易数据，而是连续的、可理解的、可行动的人宠事件链数据。"]}
        sectionNumber="02"
        title="02 · 从交易，走向长期关系资产"
      />
      <PetMindRelationshipDetails />
      <PetMindRelationshipDataComparison />
      <PetMindRelationshipImpactMatrix />
      <PetMindRelationshipFlywheel />
    </section>
  );
}

function PetMindNavItemButton({
  item,
  active,
  onClick,
}: {
  item: PetMindNavItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      aria-current={active ? "true" : undefined}
      className={`group flex w-full cursor-pointer items-start rounded-[7px] text-left transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-white/45 ${
        active ? "opacity-100" : "opacity-45 hover:opacity-80"
      }`}
    >
      <span className="relative flex size-[56px] shrink-0 items-center justify-center rounded-[7px]">
        <span
          className={`font-['DINOT:Bold',sans-serif] text-center text-[21px] leading-[24.5px] ${
            active ? "text-white/80" : "text-[#c6c6c6]/55"
          }`}
        >
          {item.num}
        </span>
      </span>
      <span className="flex min-w-px flex-1 flex-col items-start py-[8px] leading-none">
        <span
          className={`font-['OPPOSans:Bold',sans-serif] text-[16px] leading-[24px] ${
            active ? "text-white" : "text-white/50"
          }`}
        >
          {item.title}
        </span>
        <span
          className={`font-['Inter:Regular',sans-serif] text-[12px] leading-[16px] ${
            active ? "text-white/50" : "text-white/30"
          }`}
        >
          {item.subtitle}
        </span>
      </span>
    </button>
  );
}

export function PetMindProjectDetailOverlay({ onClose }: { onClose: () => void }) {
  const [activeNavItemId, setActiveNavItemId] = useState<PetMindNavItemId>("overview");
  const contentRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Partial<Record<PetMindNavItemId, HTMLElement | null>>>({});

  const registerPetMindSection = (sectionId: PetMindNavItemId) => (node: HTMLElement | null) => {
    sectionRefs.current[sectionId] = node;
  };

  const scrollToPetMindSection = (sectionId: PetMindNavItemId) => {
    const section = sectionRefs.current[sectionId];

    if (!section) {
      setActiveNavItemId(sectionId);
      return;
    }

    setActiveNavItemId(sectionId);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const sectionTopInContent = (section: HTMLElement) =>
      section.getBoundingClientRect().top - content.getBoundingClientRect().top + content.scrollTop;

    const handleScroll = () => {
      const activationLine = content.scrollTop + content.clientHeight * 0.35;
      let nextActiveSectionId: PetMindNavItemId = "overview";

      for (const item of PET_MIND_NAV_ITEMS) {
        const section = sectionRefs.current[item.id];

        if (!section) {
          continue;
        }

        if (sectionTopInContent(section) <= activationLine) {
          nextActiveSectionId = item.id;
        }
      }

      setActiveNavItemId(nextActiveSectionId);
    };

    handleScroll();
    content.addEventListener("scroll", handleScroll, { passive: true });
    return () => content.removeEventListener("scroll", handleScroll);
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex bg-[#e6e6e6]"
      role="dialog"
      aria-modal="true"
      aria-label="宠物AI经营中枢 PetMind"
      data-name="PetMind Detail Placeholder Overlay"
    >
      <aside
        className="flex h-full w-[256px] min-w-[256px] max-w-[320px] shrink-0 flex-col gap-[32px] overflow-hidden bg-[#8a8a8a] px-[32px] pb-[32px] pt-[72px] backdrop-blur-[24px]"
        data-name="Navigation Section"
      >
        <button
          type="button"
          onClick={onClose}
          onMouseDown={(event) => event.preventDefault()}
          className="group flex w-full items-start gap-[4px] rounded-[7px] pr-[32px] text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/45"
        >
          <span className="relative flex size-[56px] shrink-0 items-center justify-center rounded-[7px]">
            <span className="flex size-[40px] items-center justify-center rounded-[2px] bg-white/15 text-white/70 transition-colors group-hover:bg-white/25 group-hover:text-white">
              <ArrowLeft size={18} strokeWidth={1.8} />
            </span>
          </span>
          <span className="flex min-w-px flex-1 flex-col items-start py-[8px] leading-none">
            <span className="font-['OPPOSans:Bold',sans-serif] text-[16px] leading-[24px] text-white/50 transition-colors group-hover:text-white/80">
              返回
            </span>
            <span className="font-['Inter:Regular',sans-serif] text-[12px] uppercase leading-[16px] tracking-[2px] text-white/30">
              go back
            </span>
          </span>
        </button>

        <div className="h-px w-full shrink-0 bg-white/10" />

        <nav
          className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain scrollbar-hide [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="PetMind project navigation"
        >
          <div className="flex w-full flex-col items-start gap-[28px]">
            {PET_MIND_NAV_ITEMS.map((item) => (
              <PetMindNavItemButton
                key={item.id}
                item={item}
                active={activeNavItemId === item.id}
                onClick={() => scrollToPetMindSection(item.id)}
              />
            ))}
          </div>
        </nav>
      </aside>

      <main
        ref={contentRef}
        className="min-w-0 flex-1 overflow-y-auto overflow-x-auto bg-[#e6e6e6] overscroll-contain scroll-smooth scrollbar-hide [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="PetMind 项目内容占位"
        data-name="project 3"
      >
        <div className="flex min-w-[992px] flex-col items-center bg-[#e6e6e6] pb-[128px]">
          <PetMindOverviewSection sectionId="overview" sectionRef={registerPetMindSection("overview")} />
          <PetMindMarketOpportunitySection sectionId="market" sectionRef={registerPetMindSection("market")} />
          <PetMindMarketToRelationshipTransition />
          <PetMindRelationshipSectionV2 sectionId="relationship" sectionRef={registerPetMindSection("relationship")} />
          <PetMindRelationshipToProductEntryTransition />
          <PetMindProductEntrySection sectionId="judgment" sectionRef={registerPetMindSection("judgment")} />
          <PetMindProductEntryToNextTransition />
          <PetMindGrowthLoopSection sectionId="growth" sectionRef={registerPetMindSection("growth")} />
          <PetMindGrowthLoopToNextTransition />
          <PetMindAssistantSection sectionId="assistant" sectionRef={registerPetMindSection("assistant")} />
          <PetMindAssistantToNextTransition />
        </div>
      </main>
    </div>,
    document.body,
  );
}
