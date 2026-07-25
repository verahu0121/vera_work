import React from "react";

const ASSETS = {
  sectionDecor: "/figma-assets/petmind-growth-04-section-decor.svg",
  triangle: "/figma-assets/petmind-growth-04-triangle.svg",
  bullet: "/figma-assets/petmind-growth-04-bullet.svg",
  info: "/figma-assets/petmind-growth-04-info.svg",
  infoHover: "/figma-assets/petmind-growth-04-info-hover.svg",
  infoTooltipCaret: "/figma-assets/petmind-growth-04-info-tooltip-caret.svg",
  sourceArrow: "/figma-assets/petmind-growth-04-source-arrow.svg",
  booking: "/figma-assets/petmind-growth-04-booking.svg",
  sourceConnector: "/figma-assets/petmind-growth-04-source-connector.svg",
  roleStageCorner: "/figma-assets/petmind-growth-04-role-stage-corner.svg",
  ownerAvatar: "/figma-assets/petmind-growth-04-avatar-owner.png",
  employeeAvatar: "/figma-assets/petmind-growth-04-avatar-employee.png",
  merchantAvatar: "/figma-assets/petmind-growth-04-avatar-merchant.png",
  aiAvatar: "/figma-assets/petmind-growth-04-avatar-ai.png",
  roleSeparator: "/figma-assets/petmind-growth-04-role-separator.svg",
  employeeCore: "/figma-assets/petmind-growth-04-step-employee-core.svg",
  employeeConfirm: "/figma-assets/petmind-growth-04-step-employee-confirm.svg",
  ownerCore: "/figma-assets/petmind-growth-04-step-owner-core.svg",
  merchantQuality: "/figma-assets/petmind-growth-04-step-merchant-quality.svg",
  merchantCore: "/figma-assets/petmind-growth-04-step-merchant-core.svg",
  aiGenerate: "/figma-assets/petmind-growth-04-step-ai-generate.svg",
  eventBridge: "/figma-assets/petmind-growth-04-event-bridge.svg",
  eventGridLine: "/figma-assets/petmind-growth-04-event-grid-line.svg",
  eventActorsLeft: "/figma-assets/petmind-growth-04-event-actors-left.png",
  eventActorsRight: "/figma-assets/petmind-growth-04-event-actors-right.png",
  validationRecord: "/figma-assets/petmind-growth-04-validation-record.svg",
  validationAction: "/figma-assets/petmind-growth-04-validation-action.svg",
  validationRelation: "/figma-assets/petmind-growth-04-validation-relation.svg",
  validationBusiness: "/figma-assets/petmind-growth-04-validation-business.svg",
  validationArrow: "/figma-assets/petmind-growth-04-validation-arrow.svg",
  validationDividerWide: "/figma-assets/petmind-growth-04-validation-divider-wide.svg",
  validationDividerMediumTitle: "/figma-assets/petmind-growth-04-validation-divider-medium-title.svg",
  validationDividerMedium: "/figma-assets/petmind-growth-04-validation-divider-medium.svg",
  validationDividerRelationTitle: "/figma-assets/petmind-growth-04-validation-divider-relation-title.svg",
  validationDividerRelation: "/figma-assets/petmind-growth-04-validation-divider-relation.svg",
  validationDividerBusinessTitle: "/figma-assets/petmind-growth-04-validation-divider-business-title.svg",
  validationDividerBusiness: "/figma-assets/petmind-growth-04-validation-divider-business.svg",
} as const;

const MATRIX_COLUMN_WIDTHS = [100, 96, 90, 90, 116, 90, 96, 96, 90] as const;
const MATRIX_COLUMN_EDGES = [0, 100, 196, 286, 376, 492, 582, 678, 774, 864] as const;
const MATRIX_ROW_EDGES = [0, 64, 174, 284, 394, 530] as const;

type RoleTone = "owner" | "employee" | "merchant" | "ai";

const ROLE_TONES = {
  owner: {
    color: "#ff8db2",
    tint: "rgba(255,141,178,0.1)",
    avatar: ASSETS.ownerAvatar,
  },
  employee: {
    color: "#ffc48d",
    tint: "rgba(255,196,141,0.1)",
    avatar: ASSETS.employeeAvatar,
  },
  merchant: {
    color: "#a2b6e4",
    tint: "rgba(162,182,228,0.1)",
    avatar: ASSETS.merchantAvatar,
  },
  ai: {
    color: "#83c782",
    tint: "rgba(131,199,130,0.1)",
    avatar: ASSETS.aiAvatar,
  },
} as const;

type StageCell = {
  title: string;
  body?: string;
  label?: string;
  muted?: boolean;
  selected?: RoleTone;
  softAi?: boolean;
  titleIcon?: string;
  iconBeforeTitle?: boolean;
  compactBody?: boolean;
};

type RoleRow = {
  nodeId: string;
  tone: RoleTone;
  role: string;
  roleLines?: readonly string[];
  endpointLabel: string;
  endpointLines: readonly string[];
  height: number;
  stages: readonly StageCell[];
};

const ROLE_ROWS: readonly RoleRow[] = [
  {
    nodeId: "2765:22282",
    tone: "owner",
    role: "宠主",
    endpointLabel: "操作端",
    endpointLines: ["预约入口", "→宠物护照端"],
    height: 110,
    stages: [
      { title: "发起预约", body: "提交宠物、服务与时间信息", label: "外部渠道预约", compactBody: true },
      { title: "到店交付", body: "确认本次服务", muted: true },
      { title: "-", muted: true },
      { title: "接收AI服务报告", body: "接收通知\nAI 报告已生成", label: "报告链接", softAi: true, compactBody: true },
      {
        title: "核心界面",
        body: "查看服务报告\n认领宠物护照",
        label: "宠物护照端",
        selected: "owner",
        titleIcon: ASSETS.ownerCore,
        compactBody: true,
      },
      { title: "查看计划", body: "了解照护事项与后续安排" },
      { title: "接收自动回访", body: "接收回访请求\n反馈宠物状态" },
      { title: "提交一键复约", body: "到店接受下一次服务" },
    ],
  },
  {
    nodeId: "2765:22315",
    tone: "employee",
    role: "服务员工",
    endpointLabel: "操作端",
    endpointLines: ["员工操作端"],
    height: 110,
    stages: [
      { title: "接收任务", body: "查看预约与宠物信息" },
      { title: "完成服务", body: "执行洗护等服务流程", muted: true },
      {
        title: "核心界面",
        body: "上传宠物状态照片，反馈异常问题",
        selected: "employee",
        titleIcon: ASSETS.employeeCore,
      },
      {
        title: "核对事实并提交",
        body: "纠正误解\n确认提交",
        softAi: true,
        titleIcon: ASSETS.employeeConfirm,
        iconBeforeTitle: true,
      },
      { title: "-", muted: true },
      { title: "必要时确认", body: "针对AI生成的照护计划补充专业意见" },
      { title: "处理升级任务", body: "人工跟进异常反馈，记录处理结果" },
      { title: "承接新任务", body: "接收新任务，进入下一轮履约服务" },
    ],
  },
  {
    nodeId: "2765:22316",
    tone: "merchant",
    role: "商户管理者",
    endpointLabel: "操作端",
    endpointLines: ["商户管理端"],
    height: 110,
    stages: [
      { title: "接收预约", body: "配置并承接预约服务、时段与员工" },
      { title: "查看进度", body: "确认履约状态\n处理服务异常" },
      { title: "查看完整度", body: "避免现场信息漏记" },
      {
        title: "监控AI报告质量",
        body: "查看报告完成度，复核异常报告",
        softAi: true,
        titleIcon: ASSETS.merchantQuality,
        iconBeforeTitle: true,
      },
      { title: "-", muted: true },
      { title: "识别机会", body: "查看计划与\n服务建议" },
      {
        title: "核心界面",
        body: "查看自动触达、异常升级与处理进度",
        selected: "merchant",
        titleIcon: ASSETS.merchantCore,
      },
      { title: "跟踪复约转化", body: "查看预约、到店与交易" },
    ],
  },
  {
    nodeId: "2765:22333",
    tone: "ai",
    role: "AI · 系统 · 数据",
    roleLines: ["AI · 系统 ·", "数据"],
    endpointLabel: "",
    endpointLines: ["Agent中心", "自动化", "数据底座"],
    height: 136,
    stages: [
      { title: "建立临时关联", body: "建立本次预约的临时关联：\n宠主-宠物-商户" },
      { title: "建立服务事件", body: "关联订单、员工与宠物" },
      { title: "结构化记录", body: "整理现场上下文、检查缺项" },
      {
        title: "生成报告并发送",
        body: "AI 生成草稿；员工确认后系统发送",
        softAi: true,
        titleIcon: ASSETS.aiGenerate,
        iconBeforeTitle: true,
      },
      { title: "建立关系绑定", body: "完成宠主-宠物的长期身份绑定，事件归入宠物护照", compactBody: true },
      { title: "生成照护计划", body: "明确后续行动:\n观察事项、回访时间、服务窗口等" },
      { title: "自动触达与分流", body: "AI 生成内容，系统发送；\n理解反馈并升级异常" },
      { title: "写入新事件", body: "更新到店与交易，开启下一轮事件" },
    ],
  },
] as const;

const STAGE_HEADERS = [
  ["01", "首次预约"],
  ["02", "服务履约"],
  ["03", "现场记录"],
  ["04", "AI 服务报告"],
  ["05", "护照认领"],
  ["06", "照护计划"],
  ["07", "回访提醒"],
  ["08", "复约转化"],
] as const;

function PetMindGrowthDivider() {
  return (
    <div
      className="content-stretch flex h-[114px] items-end gap-[24px] pt-[28px] relative shrink-0 w-full"
      data-node-id="2765:22221"
      data-name="Section Divider"
    >
      <div className="absolute h-[32px] left-0 opacity-15 top-[8px] w-[256px]">
        <img alt="" aria-hidden="true" className="block size-full" draggable={false} src={ASSETS.sectionDecor} />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start justify-end min-w-px opacity-80 relative">
        <div className="content-stretch flex gap-[12px] items-end relative shrink-0">
          <p className="[word-break:break-word] font-['Alibaba_PuHuiTi_2.0:115_Black',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#181818] text-[36px] whitespace-nowrap">
            04 · 一次宠物服务，如何变成下一次收入
          </p>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="-scale-y-100 flex-none rotate-180">
              <img alt="" aria-hidden="true" className="block size-[18px]" draggable={false} src={ASSETS.triangle} />
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-justify w-[min-content]">
          PetMind AI 从真实服务履约切入，将一次履约沉淀为可持续连接的服务事件，并以一套新的 AI 原生 SaaS
          承载完整经营链路。本章展示的是目标态产品架构；首期 MVP 优先验证“现场记录—AI
          报告—护照认领—照护回访—复约转化”主链路。
        </p>
      </div>
    </div>
  );
}

function PetMindGrowthBlockTitle({ children, nodeId }: { children: React.ReactNode; nodeId: string }) {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-node-id={nodeId}>
      <div className="content-stretch flex h-[32px] items-center relative shrink-0">
        <div className="bg-[#474747] h-[16px] opacity-25 relative shrink-0 w-[4px]" />
      </div>
      <p className="[word-break:break-word] font-['OPPOSans:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#414141] text-[20px] whitespace-nowrap">
        {children}
      </p>
    </div>
  );
}

function PetMindArchitectureCard({
  title,
  body,
  width,
  nodeId,
  titleNodeId,
  bodyNodeId,
  flexible = false,
}: {
  title: string;
  body: string;
  width: number;
  nodeId: string;
  titleNodeId: string;
  bodyNodeId: string;
  flexible?: boolean;
}) {
  return (
    <div
      className={`bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[20px] relative rounded-[8px] ${
        flexible ? "flex-[1_0_0] min-w-px" : "shrink-0"
      }`}
      data-node-id={nodeId}
      style={flexible ? undefined : { width }}
    >
      <div
        className="[word-break:break-word] flex flex-col font-['OPPOSans:Bold',sans-serif] justify-center leading-[0] not-italic origin-left relative shrink-0 scale-x-[0.96] text-[#474747] text-[12px] text-justify tracking-[0px] uppercase w-[104.166667%]"
        data-node-id={titleNodeId}
      >
        <p className="leading-[24px]">{title}</p>
      </div>
      <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" />
      <div
        className="[word-break:break-word] flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic opacity-80 origin-left relative shrink-0 scale-x-[0.96] text-[#474747] text-[12px] text-justify tracking-[0px] uppercase w-[104.166667%]"
        data-node-id={bodyNodeId}
      >
        <p className="leading-[24px]">{body}</p>
      </div>
    </div>
  );
}

function PetMindArchitectureBullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full">
      <img alt="" aria-hidden="true" className="block size-[24px] shrink-0" draggable={false} src={ASSETS.bullet} />
      <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Light',sans-serif] leading-[24px] min-w-px not-italic text-[#474747] text-[12px] tracking-[0px]">
        {children}
      </p>
    </div>
  );
}

function PetMindArchitectureDecisions() {
  return (
    <div className="content-stretch flex h-[373px] flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="2765:22222">
      <PetMindGrowthBlockTitle nodeId="2765:22223">为角色接力做出的三项架构取舍</PetMindGrowthBlockTitle>
      <div className="content-stretch flex h-[209px] gap-[20px] items-start relative shrink-0 w-full" data-node-id="2765:22224">
        <PetMindArchitectureCard
          bodyNodeId="2765:22228"
          nodeId="2765:22225"
          titleNodeId="2765:22226"
          width={264}
          title="员工 | 为什么使用轻量任务端，而不是管理后台？"
          body="员工的核心场景发生在服务现场，操作高频、时间短。员工端只保留任务确认、照片上传、状态记录、异常标记和 AI 事实核对，避免管理功能增加记录成本。"
        />
        <PetMindArchitectureCard
          bodyNodeId="2765:22232"
          nodeId="2765:22229"
          titleNodeId="2765:22230"
          width={264}
          title="商户 | 为什么需要独立经营视图，而不是员工端的高权限版本？"
          body="商户需要跨员工、跨订单查看服务配置、报告完成率、异常报告、回访任务与复购结果。这是一套经营管理视角，不能简单做成员工端的高权限版本。"
        />
        <PetMindArchitectureCard
          bodyNodeId="2765:22236"
          flexible
          nodeId="2765:22233"
          titleNodeId="2765:22234"
          width={296}
          title="宠主 | 为什么由宠物护照承接关系，而不是交易型会员中心？"
          body="宠主进入产品的理由不是管理门店会员，而是领取属于自己宠物的服务报告、状态变化和后续计划。宠物护照因此围绕同一只宠物组织长期关系，而不是围绕单次交易组织功能。"
        />
      </div>
      <PetMindArchitectureBullet>
        不同角色的使用场景、任务频率与权限边界不同，因此前端按照角色任务拆分；它们不是三套孤立产品，而是共同围绕同一只宠物读写连续服务事件。
      </PetMindArchitectureBullet>
      <PetMindArchitectureBullet>
        PetMind AI 不是在传统 SaaS 之外增加几个 AI
        功能，而是以宠物生命周期关系数据为底座，按照员工、宠主与商户的真实任务重新组织一套 AI 原生
        SaaS。各端承担不同动作，但共同围绕同一只宠物持续读写服务事件。
      </PetMindArchitectureBullet>
    </div>
  );
}

function PetMindSourceStrip() {
  return (
    <div className="content-stretch flex h-[64px] gap-[20px] items-center relative shrink-0 w-full" data-node-id="2765:22248">
      <div className="flex flex-row items-center self-stretch shrink-0 w-[455px]" data-node-id="2765:22249">
        <div className="bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex h-full items-center relative rounded-[4px] shrink-0">
          <div
            className="group/geo content-stretch flex h-full items-center pl-[24px] pr-[16px] py-[12px] relative shrink-0"
            data-node-id="2765:22250"
          >
            <p className="font-['OPPOSans:Bold',sans-serif] leading-[24px] opacity-60 text-[#474747] text-[12px] whitespace-nowrap">
              生成式搜索优化 (GEO)
            </p>
            <span className="content-stretch flex items-center justify-center p-[8px] relative shrink-0">
              <span className="relative size-[12px] shrink-0">
                <img
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 block size-full opacity-100 group-hover/geo:opacity-0"
                  draggable={false}
                  src={ASSETS.info}
                />
                <img
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 block size-full opacity-0 group-hover/geo:opacity-100"
                  draggable={false}
                  src={ASSETS.infoHover}
                />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[28px] left-1/2 z-30 flex w-[172px] -translate-x-1/2 flex-col items-center opacity-0 backdrop-blur-[6px] group-hover/geo:opacity-100"
                data-node-id="2812:21280"
                style={{ willChange: "opacity, backdrop-filter" }}
              >
                <span
                  className="flex w-full items-center justify-center overflow-clip rounded-[4px] bg-[rgba(71,71,71,0.5)] px-[12px] py-[6px]"
                  data-node-id="2812:21271"
                  data-name="Quote Details"
                >
                  <span className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[16px] min-w-px text-[10px] text-justify text-white">
                    此处仅标识首次预约来源，GEO获客机制将在后文展开。
                  </span>
                </span>
                <span className="h-[7px] relative w-[14px] shrink-0" data-node-id="2812:21278">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-[0_0_11.83%_0] block size-full"
                    draggable={false}
                    src={ASSETS.infoTooltipCaret}
                  />
                </span>
              </span>
            </span>
          </div>
          <span className="font-['OPPOSans:Bold',sans-serif] leading-[24px] opacity-60 text-[#474747] text-[16px] whitespace-nowrap">
            +
          </span>
          <div className="content-stretch flex flex-col h-full items-start justify-center px-[24px] py-[12px] relative shrink-0" data-node-id="2765:22254">
            <p className="font-['OPPOSans:Bold',sans-serif] leading-[24px] opacity-60 text-[#474747] text-[12px] whitespace-nowrap">
              门店私域营销
            </p>
          </div>
          <span className="font-['OPPOSans:Bold',sans-serif] leading-[24px] opacity-60 text-[#474747] text-[16px] whitespace-nowrap">
            +
          </span>
          <div className="content-stretch flex flex-col h-full items-start justify-center px-[24px] py-[12px] relative shrink-0" data-node-id="2765:22257">
            <p className="font-['OPPOSans:Bold',sans-serif] leading-[24px] opacity-60 text-[#474747] text-[12px] whitespace-nowrap">
              本地生活平台
            </p>
          </div>
        </div>
      </div>
      <img alt="" aria-hidden="true" className="block h-[13.617px] w-[19.322px] shrink-0" draggable={false} src={ASSETS.sourceArrow} />
      <div
        className="bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex flex-[1_0_0] gap-[16px] h-full items-center justify-center min-w-px px-[24px] py-[20px] relative rounded-[4px]"
        data-node-id="2765:22262"
      >
        <img alt="" aria-hidden="true" className="block h-[12px] w-[14.351px] shrink-0" draggable={false} src={ASSETS.booking} />
        <p className="font-['OPPOSans:Bold',sans-serif] leading-[24px] text-[#474747] text-[16px] whitespace-nowrap">
          首次预约
        </p>
      </div>
    </div>
  );
}

function PetMindSourceConnector() {
  return (
    <div className="h-[64px] overflow-visible relative shrink-0 w-full" data-node-id="2765:22265">
      <img
        alt=""
        aria-hidden="true"
        className="absolute h-[69.333px] left-[143px] max-w-none top-0 w-[552.107px]"
        draggable={false}
        src={ASSETS.sourceConnector}
      />
    </div>
  );
}

function PetMindMatrixLines({
  height,
  horizontalEdges,
}: {
  height: number;
  horizontalEdges: readonly number[];
}) {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-20">
      {MATRIX_COLUMN_EDGES.slice(1, -1).map((edge) => (
        <div
          className="absolute bg-[#d2d2d2] top-0 w-px"
          key={`column-${edge}`}
          style={{ height, left: edge }}
        />
      ))}
      {horizontalEdges.slice(1).map((edge) => (
        <div
          className="absolute bg-[#d2d2d2] h-px left-0 w-full"
          key={`row-${edge}`}
          style={{ top: edge }}
        />
      ))}
    </div>
  );
}

function PetMindStageHeader() {
  return (
    <>
      <div className="bg-[#e0e0e0] h-[64px] overflow-hidden relative">
        <img alt="" aria-hidden="true" className="absolute inset-0 block h-[64.842px] w-[100.539px]" draggable={false} src={ASSETS.roleStageCorner} />
        <p className="absolute font-['OPPOSans:Medium',sans-serif] leading-[20px] left-[12px] text-[rgba(71,71,71,0.8)] text-[11px] top-[32px]">
          角色
        </p>
        <p className="absolute font-['OPPOSans:Medium',sans-serif] leading-[20px] left-[65px] text-[rgba(71,71,71,0.8)] text-[11px] top-[12px]">
          阶段
        </p>
      </div>
      {STAGE_HEADERS.map(([number, label], index) => (
        <div
          className="bg-[#e0e0e0] content-stretch flex h-[64px] flex-col gap-[4px] items-center justify-center pb-[8px] pt-[12px] px-[12px] relative text-[#474747] text-center"
          key={number}
        >
          <p className="font-['DINOT:Bold',sans-serif] leading-[10px] opacity-30 relative shrink-0 text-[12px] w-full">{number}</p>
          <p className="font-['OPPOSans:Medium',sans-serif] leading-[20px] opacity-80 relative shrink-0 text-[12px] whitespace-nowrap w-full">
            {label}
          </p>
        </div>
      ))}
    </>
  );
}

function PetMindRoleAvatar({ tone }: { tone: RoleTone }) {
  const roleTone = ROLE_TONES[tone];

  return (
    <img
      alt=""
      aria-hidden="true"
      className="block rounded-full size-[13px] shrink-0 object-cover"
      draggable={false}
      src={roleTone.avatar}
      style={{ border: `1px solid ${roleTone.color}` }}
    />
  );
}

function PetMindRoleHeading({ row }: { row: RoleRow }) {
  if (row.tone !== "ai") {
    return (
      <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
        <PetMindRoleAvatar tone={row.tone} />
        <p className="font-['OPPOSans:Bold',sans-serif] leading-[20px] text-[rgba(71,71,71,0.8)] text-[12px] whitespace-nowrap">
          {row.role}
        </p>
      </div>
    );
  }

  return (
    <div className="content-stretch flex gap-[3px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex items-center relative shrink-0 size-[16px]">
        <PetMindRoleAvatar tone="ai" />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          <p className="font-['OPPOSans:Bold',sans-serif] leading-[16px] text-[rgba(71,71,71,0.8)] text-[12px] whitespace-nowrap">AI</p>
          <img alt="" aria-hidden="true" className="block h-[1.86px] w-[1.872px] shrink-0" draggable={false} src={ASSETS.roleSeparator} />
          <p className="font-['OPPOSans:Bold',sans-serif] leading-[16px] text-[rgba(71,71,71,0.8)] text-[12px] whitespace-nowrap">系统</p>
          <img alt="" aria-hidden="true" className="block h-[1.86px] w-[1.872px] shrink-0" draggable={false} src={ASSETS.roleSeparator} />
        </div>
        <p className="font-['OPPOSans:Bold',sans-serif] leading-[16px] text-[rgba(71,71,71,0.8)] text-[12px] whitespace-nowrap">数据</p>
      </div>
    </div>
  );
}

function PetMindRoleLabel({ row }: { row: RoleRow }) {
  const tone = ROLE_TONES[row.tone];
  const isAi = row.tone === "ai";

  return (
    <div
      className={`bg-[rgba(224,224,224,0.5)] content-stretch flex h-full flex-col gap-[8px] items-start pb-[12px] px-[12px] relative ${
        isAi ? "pt-[18px]" : "pt-[16px]"
      } ${row.tone === "owner" ? "justify-center" : ""}`}
    >
      <PetMindRoleHeading row={row} />
      {isAi ? (
        <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
          {row.endpointLines.map((line) => (
            <div
              className="content-stretch flex h-[20px] items-center overflow-hidden pl-[10px] pr-[4px] relative shrink-0 w-full"
              key={line}
              style={{ backgroundColor: tone.tint, borderLeft: `2px solid ${tone.color}` }}
            >
              <p className="font-['OPPOSans:Regular',sans-serif] leading-[16px] text-[#474747] text-[10px] whitespace-nowrap">{line}</p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`content-stretch flex flex-col gap-[4px] items-start justify-center overflow-hidden pb-[2px] pl-[10px] pr-[4px] pt-[4px] relative w-full ${
            row.tone === "owner" ? "shrink-0" : "flex-[1_0_0] min-h-px"
          }`}
          style={{ backgroundColor: tone.tint, borderLeft: `2px solid ${tone.color}` }}
        >
          <p className="font-['OPPOSans:Regular',sans-serif] leading-[12px] opacity-50 text-[#474747] text-[10px] whitespace-nowrap">
            {row.endpointLabel}
          </p>
          <div className="font-['OPPOSans:Regular',sans-serif] leading-[16px] text-[#474747] text-[10px] whitespace-nowrap">
            {row.endpointLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PetMindStageTitle({ cell, rowTone }: { cell: StageCell; rowTone: RoleTone }) {
  const isAiRow = rowTone === "ai";
  const isInactive = cell.muted || cell.title === "-";
  const backgroundColor = isAiRow
    ? cell.softAi
      ? undefined
      : "rgba(255,255,255,0.1)"
    : !isInactive && !cell.softAi
      ? "rgba(255,255,255,0.25)"
      : undefined;
  const backgroundImage = cell.softAi
    ? isAiRow
      ? "linear-gradient(90deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)"
      : "linear-gradient(90deg, rgba(131,199,130,0.05) 0%, rgba(131,199,130,0.05) 100%), linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.25) 100%)"
    : undefined;

  return (
    <div
      className="content-stretch flex h-[32px] gap-[4px] items-center justify-center px-[8px] py-[6px] relative shrink-0 w-full"
      style={{ backgroundColor, backgroundImage }}
    >
      {cell.titleIcon && cell.iconBeforeTitle && (
        <img alt="" aria-hidden="true" className="block size-[12px] shrink-0" draggable={false} src={cell.titleIcon} />
      )}
      <p
        className={`font-['OPPOSans:Medium',sans-serif] leading-[20px] relative shrink-0 text-[12px] text-center whitespace-nowrap ${
          isAiRow ? "text-[#4e604e]" : "text-[#474747]"
        } ${
          cell.muted ? "opacity-60" : "opacity-80"
        }`}
      >
        {cell.title}
      </p>
      {cell.titleIcon && !cell.iconBeforeTitle && (
        <img alt="" aria-hidden="true" className="block size-[12px] shrink-0" draggable={false} src={cell.titleIcon} />
      )}
    </div>
  );
}

function PetMindStageCell({ cell, rowTone }: { cell: StageCell; rowTone: RoleTone }) {
  const selectedTone = cell.selected ? ROLE_TONES[cell.selected] : undefined;
  const softAiBackground = cell.softAi
    ? "linear-gradient(90deg, rgba(131, 199, 130, 0.02) 0%, rgba(131, 199, 130, 0.02) 100%), linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)"
    : undefined;
  const aiBackground =
    rowTone === "ai"
      ? "linear-gradient(90deg, rgba(131,199,130,0.05) 0%, rgba(131,199,130,0.05) 100%)"
      : undefined;

  return (
    <div
      className="content-stretch flex h-full flex-col items-start overflow-hidden relative"
      style={{
        backgroundColor: selectedTone?.tint,
        backgroundImage: selectedTone ? undefined : softAiBackground ?? aiBackground,
        boxShadow: selectedTone ? `inset 0 -3px 0 ${selectedTone.color}` : undefined,
      }}
    >
      <PetMindStageTitle cell={cell} rowTone={rowTone} />
      {cell.title !== "-" && <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" />}
      {cell.title === "-" ? (
        <div className="flex-[1_0_0] min-h-px w-full" />
      ) : (
        <div
          className={`content-stretch flex flex-[1_0_0] flex-col items-center min-h-px px-[12px] relative w-full ${
            cell.label ? "justify-between pb-[12px] pt-[8px]" : "justify-center py-[12px]"
          }`}
        >
          {cell.body && (
            <p
              className={`[word-break:break-word] font-['OPPOSans:Light',sans-serif] not-italic relative shrink-0 text-[#1a1c1c] text-[11px] text-center whitespace-pre-line w-full ${
                cell.compactBody ? "leading-[16px]" : "leading-[20px]"
              }`}
            >
              {cell.body}
            </p>
          )}
          {cell.label && (
            <div
              className="content-stretch flex h-[22px] items-center justify-center overflow-hidden pl-[2px] relative shrink-0 w-full"
              style={{ backgroundColor: ROLE_TONES[rowTone].tint, borderLeft: `2px solid ${ROLE_TONES[rowTone].color}` }}
            >
              <p className="font-['OPPOSans:Regular',sans-serif] leading-[16px] text-[#474747] text-[10px] whitespace-nowrap">{cell.label}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PetMindRoleMatrixRows() {
  return (
    <>
      {ROLE_ROWS.map((row) => (
        <React.Fragment key={row.nodeId}>
          <PetMindRoleLabel row={row} />
          {row.stages.map((cell, index) => (
            <PetMindStageCell cell={cell} key={`${row.nodeId}-${index}`} rowTone={row.tone} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
}

function PetMindEventBridge() {
  return (
    <div className="absolute h-[110px] left-0 top-[530px] w-full" data-node-id="2765:22368">
      <img alt="" aria-hidden="true" className="absolute h-[56px] left-[235px] top-0 w-[590px]" draggable={false} src={ASSETS.eventBridge} />
      {MATRIX_COLUMN_EDGES.slice(1, -1).map((edge) => (
        <img
          alt=""
          aria-hidden="true"
          className="absolute h-[110px] top-0 w-px"
          draggable={false}
          key={edge}
          src={ASSETS.eventGridLine}
          style={{ left: edge }}
        />
      ))}
      <div className="absolute bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex gap-[12px] h-[40px] items-center justify-center left-[408px] px-[24px] rounded-[4px] top-[35px] w-[244px]">
        <img
          alt=""
          aria-hidden="true"
          className="block h-[17px] max-w-none shrink-0 w-[29px]"
          draggable={false}
          src={ASSETS.eventActorsLeft}
        />
        <p className="font-['OPPOSans:Bold',sans-serif] leading-[24px] opacity-60 text-[#474747] text-[12px] whitespace-nowrap">新服务事件</p>
        <img
          alt=""
          aria-hidden="true"
          className="block h-[17px] max-w-none shrink-0 w-[29px]"
          draggable={false}
          src={ASSETS.eventActorsRight}
        />
      </div>
    </div>
  );
}

function PetMindRoleMatrix() {
  return (
    <div className="h-[640px] overflow-hidden relative rounded-t-[4px] shrink-0 w-full" data-node-id="2765:22268">
      <div
        className="absolute grid h-[530px] left-0 top-0 w-full"
        style={{
          gridTemplateColumns: MATRIX_COLUMN_WIDTHS.map((width) => `${width}px`).join(" "),
          gridTemplateRows: "64px 110px 110px 110px 136px",
        }}
      >
        <PetMindStageHeader />
        <PetMindRoleMatrixRows />
      </div>
      <PetMindMatrixLines height={530} horizontalEdges={MATRIX_ROW_EDGES} />
      <PetMindEventBridge />
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none z-30" />
    </div>
  );
}

type ValidationActor = {
  role: RoleTone;
  label: string;
};

function PetMindValidationActors({
  groups,
  connector = "text",
  gap = 2,
}: {
  groups: readonly (readonly ValidationActor[])[];
  connector?: "asset" | "text";
  gap?: number;
}) {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0 w-full" style={{ gap }}>
      {groups.map((group, groupIndex) => (
        <React.Fragment key={`group-${groupIndex}`}>
          {groupIndex > 0 &&
            (connector === "asset" ? (
              <img
                alt=""
                aria-hidden="true"
                className="block h-[2.574px] w-[13.228px] shrink-0"
                draggable={false}
                src={ASSETS.validationArrow}
              />
            ) : (
              <span className="font-['OPPOSans:Light',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[11px] whitespace-nowrap">
                →
              </span>
            ))}
          <div className="bg-[rgba(255,255,255,0.25)] content-stretch flex gap-[4px] h-[16px] items-center pl-[1.5px] pr-[5px] relative rounded-[10px] shrink-0">
            {group.map((actor, actorIndex) => (
              <React.Fragment key={`${actor.role}-${actorIndex}`}>
                <img
                  alt=""
                  aria-hidden="true"
                  className="block rounded-full size-[13px] object-cover"
                  draggable={false}
                  src={ROLE_TONES[actor.role].avatar}
                />
                <span className="font-['OPPOSans:Regular',sans-serif] leading-[13px] opacity-80 text-[#474747] text-[10px] whitespace-nowrap">
                  {actor.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function PetMindValidationDivider({ src }: { src: string }) {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <div className="absolute inset-[-0.5px_0]">
        <img alt="" aria-hidden="true" className="block max-w-none size-full" draggable={false} src={src} />
      </div>
    </div>
  );
}

function PetMindValidationGate({
  width,
  icon,
  title,
  stages,
  actorGroups,
  actorConnector,
  actorGap,
  question,
  titleDivider,
  contentDivider,
  nodeId,
  questionPadding = true,
}: {
  width: number;
  icon: string;
  title: string;
  stages: readonly string[];
  actorGroups: readonly (readonly ValidationActor[])[];
  actorConnector?: "asset" | "text";
  actorGap?: number;
  question: string;
  titleDivider: string;
  contentDivider: string;
  nodeId: string;
  questionPadding?: boolean;
}) {
  return (
    <div
      className="content-stretch flex h-full flex-col items-start relative shrink-0"
      data-node-id={nodeId}
      style={{ width }}
    >
      <div className="bg-[rgba(255,255,255,0.25)] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[6px] relative shrink-0 w-full">
        <img alt="" aria-hidden="true" className="block h-[14px] w-[16px] shrink-0" draggable={false} src={icon} />
        <p className="font-['OPPOSans:Medium',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[12px] text-center whitespace-nowrap">{title}</p>
      </div>
      <PetMindValidationDivider src={titleDivider} />
      <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px relative w-full">
        <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0 text-[#474747] text-center w-full">
          {stages.map((stage, index) => (
            <React.Fragment key={stage}>
              {index > 0 && (
                <span className="font-['OPPOSans:Light',sans-serif] leading-[20px] opacity-80 text-[11px] whitespace-nowrap">→</span>
              )}
              <span className="flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[20px] min-w-px opacity-80 text-[10px] whitespace-nowrap">
                {stage}
              </span>
            </React.Fragment>
          ))}
        </div>
        <PetMindValidationDivider src={contentDivider} />
        <PetMindValidationActors connector={actorConnector} gap={actorGap} groups={actorGroups} />
        <PetMindValidationDivider src={contentDivider} />
        <div
          className={`bg-[#dbdbdb] content-stretch flex flex-[1_0_0] items-center justify-center min-h-px px-[8px] relative w-full ${
            questionPadding ? "py-[4px]" : ""
          }`}
        >
          <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Regular',sans-serif] leading-[20px] min-w-px opacity-80 text-[#474747] text-[11px] text-center">
            {question}
          </p>
        </div>
      </div>
    </div>
  );
}

function PetMindValidationBlank({ width, flexible = false }: { width: number; flexible?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-row items-center self-stretch ${flexible ? "flex-[1_0_0] min-w-px" : "shrink-0"}`}
      style={flexible ? undefined : { width }}
    />
  );
}

function PetMindValidationGridLines() {
  const fullHeightEdges = [100, 196, 582] as const;
  const topRowEdges = [492, 774] as const;
  const bottomRowEdges = [292, 382, 644] as const;

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-20">
      <div className="absolute border border-[#d2d2d2] border-solid inset-0" />
      {fullHeightEdges.map((edge) => (
        <div className="absolute bg-[#d2d2d2] h-full top-0 w-px" key={`full-${edge}`} style={{ left: edge }} />
      ))}
      {topRowEdges.map((edge) => (
        <div className="absolute bg-[#d2d2d2] h-[144px] top-0 w-px" key={`top-${edge}`} style={{ left: edge }} />
      ))}
      {bottomRowEdges.map((edge) => (
        <div className="absolute bg-[#d2d2d2] h-[144px] top-[144px] w-px" key={`bottom-${edge}`} style={{ left: edge }} />
      ))}
      <div className="absolute bg-[#d2d2d2] h-px left-[100px] right-0 top-[144px]" />
    </div>
  );
}

function PetMindValidationGates() {
  return (
    <div className="content-stretch flex h-[288px] isolate items-start relative shrink-0 w-full" data-node-id="2765:22394">
      <div
        className="bg-[rgba(224,224,224,0.5)] content-stretch flex flex-col items-start justify-center px-[12px] py-[16px] relative self-stretch shrink-0 w-[100px]"
        data-node-id="2765:22395"
      >
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="2765:22396">
          <p className="font-['OPPOSans:Bold',sans-serif] leading-[20px] text-[rgba(71,71,71,0.8)] text-[12px] whitespace-nowrap">验证关口</p>
          <div className="bg-[rgba(71,71,71,0.05)] border-[rgba(71,71,71,0.5)] border-l-2 border-solid content-stretch flex flex-col gap-[4px] items-start justify-center overflow-hidden pl-[12px] pr-[4px] py-[6px] text-[#474747] text-[10px] w-full">
            <p className="font-['OPPOSans:Regular',sans-serif] leading-[12px] opacity-50 whitespace-nowrap">包含信息</p>
            <p className="font-['OPPOSans:Regular',sans-serif] leading-[16px] whitespace-nowrap">阶段范围</p>
            <p className="font-['OPPOSans:Regular',sans-serif] leading-[16px] whitespace-nowrap">角色交接</p>
            <p className="font-['OPPOSans:Regular',sans-serif] leading-[16px] whitespace-nowrap">验证问题</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[764px]" data-node-id="2765:22403">
        <div className="content-stretch flex h-[144px] items-center relative shrink-0 w-full" data-node-id="2765:22404">
          <PetMindValidationBlank width={96} />
          <PetMindValidationGate
            actorConnector="asset"
            actorGap={12}
            actorGroups={[
              [{ role: "employee", label: "服务员工" }],
              [{ role: "ai", label: "AI/系统/数据" }],
            ]}
            contentDivider={ASSETS.validationDividerWide}
            icon={ASSETS.validationRecord}
            nodeId="2765:22406"
            question="验证：员工是否愿意持续记录，并稳定生成报告？"
            questionPadding={false}
            stages={["02 服务履约", "03 现场记录", "04 AI报告生成"]}
            title="记录可持续"
            titleDivider={ASSETS.validationDividerWide}
            width={296}
          />
          <PetMindValidationBlank width={90} />
          <PetMindValidationGate
            actorGroups={[
              [{ role: "ai", label: "AI/系统/数据" }],
              [
                { role: "owner", label: "宠主" },
                { role: "merchant", label: "商户" },
              ],
            ]}
            contentDivider={ASSETS.validationDividerMedium}
            icon={ASSETS.validationAction}
            nodeId="2765:22434"
            question="验证：AI 建议是否相关，能否触发宠主回应和商户跟进？"
            stages={["06 照护计划", "07 回访互动"]}
            title="AI 建议可行动：计划→互动"
            titleDivider={ASSETS.validationDividerMediumTitle}
            width={192}
          />
          <PetMindValidationBlank width={90} />
        </div>
        <div className="content-stretch flex h-[144px] items-center relative shrink-0 w-full" data-node-id="2765:22463">
          <PetMindValidationBlank width={96} />
          <PetMindValidationBlank width={96} />
          <PetMindValidationBlank width={90} />
          <PetMindValidationGate
            actorGroups={[
              [
                { role: "employee", label: "员工" },
                { role: "ai", label: "AI/系统/数据" },
              ],
              [{ role: "owner", label: "宠主" }],
            ]}
            contentDivider={ASSETS.validationDividerRelation}
            icon={ASSETS.validationRelation}
            nodeId="2765:22467"
            question="验证：报告是否有足够价值，让宠主愿意查看并认领？"
            stages={["04 报告送达", "05 护照认领"]}
            title="关系可承接：报告→认领"
            titleDivider={ASSETS.validationDividerRelationTitle}
            width={200}
          />
          <PetMindValidationBlank width={62} />
          <PetMindValidationGate
            actorGroups={[
              [
                { role: "ai", label: "系统" },
                { role: "merchant", label: "商户" },
              ],
              [{ role: "owner", label: "宠主" }],
            ]}
            contentDivider={ASSETS.validationDividerBusiness}
            icon={ASSETS.validationBusiness}
            nodeId="2765:22496"
            question="验证：提醒和回访能否有效推动宠主完成再次预约？"
            stages={["07 提醒触达", "08 赴约转化"]}
            title="商业价值可兑现：提醒→复约转化"
            titleDivider={ASSETS.validationDividerBusinessTitle}
            width={220}
          />
        </div>
      </div>
      <PetMindValidationGridLines />
    </div>
  );
}

function PetMindRoleRelay() {
  return (
    <div className="content-stretch flex h-[1116px] flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="2765:22245">
      <PetMindGrowthBlockTitle nodeId="2765:22246">同一条链路下的角色接力</PetMindGrowthBlockTitle>
      <div className="content-stretch flex h-[1064px] flex-col items-start relative shrink-0 w-full" data-node-id="2765:22247">
        <PetMindSourceStrip />
        <PetMindSourceConnector />
        <div className="content-stretch flex h-[936px] flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="2765:22267">
          <PetMindRoleMatrix />
          <PetMindValidationGates />
        </div>
      </div>
    </div>
  );
}

export function PetMindGrowthLoopSection({
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
      className="content-stretch flex h-[1867px] flex-col gap-[84px] items-start py-[48px] relative shrink-0 w-[864px]"
      data-node-id="2765:22220"
      data-section-id={sectionId}
      data-name="Section Container 8"
    >
      <PetMindGrowthDivider />
      <PetMindArchitectureDecisions />
      <PetMindRoleRelay />
    </section>
  );
}
