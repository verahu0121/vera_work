import type { PortfolioProject } from "./portfolioProjects";

export type AiProductFeaturedProject = {
  id: "geo-platform" | "pet-saas";
  matchTitle: string;
  pathLabel: string;
  title: string;
  eyebrow: string;
  description: string[];
  tags: string[];
  insightTitle: string;
  insight: string;
  outputTitle: string;
  output: string;
  note?: string;
  imageAlt: string;
  imageSrc: string;
};

export type AiProductPrinciple = {
  number: string;
  strongText: string;
  lightText: string;
};

export type AiProductBusinessLoopCard = {
  title: string;
  tone: "muted" | "light";
  cornerVariant: "back" | "back-alt";
  geoBoundary: string;
  shift: string;
  saasRestructure: string;
  tags: string[];
};

export type AiProductAiInteractionCard = {
  id: "conversational" | "task-driven";
  imageAlt: string;
  caption: string;
};

export type AiProductLoopStep = {
  id: string;
  title: string;
  description: string;
  tone: "white-subtle" | "white-bright" | "gray-muted" | "gray-solid";
  width: "fluid" | "medium" | "narrow";
};

export type AiProductLoopMetric = {
  title: string;
  description: string;
  tone: "soft" | "medium" | "strong";
  width: "fluid" | "medium" | "narrow";
};

export const AI_PRODUCT_PAGE_CONTENT = {
  title: "如何将 AI 能力产品化",
  intro:
    "从新兴AI能力的探索与定义，到垂直SaaS产品落地，我负责用户研究、产品策略与体验设计。",
  expertiseTags: ["AI Product Strategy", "Product Design", "UX Research"],
  thesis: {
    number: "01",
    label: "共同命题",
    title: "我的产品化路径：以真实业务流程为锚点",
    description:
      "AI产品的挑战，并不只是接入模型或增加生成能力，而是判断哪些能力值得被产品化，以及它们应当进入怎样的业务流程。",
  },
  featuredProjects: [
    {
      id: "geo-platform",
      matchTitle: "GEO共享创作平台",
      pathLabel: "路径一：定义通用产品机制",
      title: "从内容生产到AI搜索可见性",
      eyebrow: "PROJECT 01 / AI能力探索 · 平台产品",
      description: [
        "当品牌内容开始竞争被AI理解、引用与推荐的机会，如何构建一套连接品牌、创作者与GEO能力的协作平台？",
        "我从GEO机会研究出发，分析品牌方与创作者之间的供需关系，定义平台商业模式，并设计从任务创建、内容生产、GEO评估到效果追踪的产品闭环。",
      ],
      tags: ["机会研究", "商业模式", "平台机制", "MVP定义", "核心交互"],
      insightTitle: "关键判断",
      insight: "单点写作或检测工具无法形成持续价值，需要连接品牌、创作者、AI评估和效果反馈。",
      outputTitle: "关键产出",
      output: "定义品牌 - 创作者 - AI 三方协作机制，完成从任务创建到效果追踪的MVP原型与核心流程设计。",
      note: "*注：GEO（生成式引擎优化）：通过优化内容结构与表达，提高品牌内容被生成式搜索理解、引用与推荐的机会。",
      imageAlt: "GEO共享创作平台界面预览",
      imageSrc: "/src/assets/ai-product-geo-platform.png",
    },
    {
      id: "pet-saas",
      matchTitle: "宠物AI SaaS平台",
      pathLabel: "路径二：重构垂直业务闭环",
      title: "从记录工具到智能运营",
      eyebrow: "PROJECT 02 / 垂类AI · SaaS产品",
      description: [
        "当传统SaaS只能记录业务信息，AI如何进一步帮助宠物行业经营者判断并完成下一步行动？",
        "我从宠物行业的经营流程和商业模式出发，分析传统SaaS向AI SaaS演进时的产品变化，设计连接业务数据、AI能力与运营工作流的产品架构。",
      ],
      tags: ["垂类研究", "AI产品架构", "SaaS工作流", "AI交互", "可信机制"],
      insightTitle: "关键判断",
      insight: "AI不应停留在独立聊天入口，而应嵌入具体经营任务；对话只是完成任务的一种交互方式。",
      outputTitle: "关键产出",
      output: "设计“业务数据—机会识别—AI建议—人工确认与执行—效果反馈”的产品架构，并定义核心运营场景。",
      imageAlt: "宠物AI SaaS平台界面预览",
      imageSrc: "/src/assets/ai-product-pet-saas.png",
    },
  ] satisfies AiProductFeaturedProject[],
  abstraction: {
    number: "02",
    label: "两条路径如何连接",
    title: "从通用AI机制到垂直业务闭环",
    description:
      "两个项目围绕同一产品化命题，分别探索两个递进问题：GEO项目关注新兴AI能力如何被组织为通用产品机制；宠物AI SaaS项目关注这些机制如何结合行业数据、经营任务与人机协作，形成垂直业务闭环。",
  },
  capabilityFlow: {
    title: "GEO项目中的能力抽象",
    description: "“能力抽象”指的是：从GEO项目的具体功能中，提取一套可以迁移到其他行业的产品机制。",
    intro: "我从GEO项目中归纳出一套可迁移的AI产品机制：",
    steps: ["理解上下文", "生成内容或建议", "质量评估", "人工审核与判断", "执行与反馈"],
    conclusion: "迁移的是通用产品机制，而不是复制具体功能和页面。",
  },
  businessLoop: {
    title: "垂类落地需要完成的四次重构",
    description: "同一套AI机制进入垂类后，需要围绕业务结果、结构化上下文、高频任务和人机协作重新组织。",
    cards: [
      {
        title: "业务价值闭环",
        tone: "muted",
        cornerVariant: "back",
        geoBoundary: "内容质量与AI搜索可见性可以被评估，但仍无法直接说明内容是否带来线索、咨询或业务转化。",
        shift: "AI指标 → 业务结果",
        saasRestructure: "将AI建议连接到召回、触达、预约和到店等经营动作，并让执行结果回到系统。",
        tags: ["建议采纳率", "任务完成率", "预约&复购率"],
      },
      {
        title: "结构化业务上下文",
        tone: "light",
        cornerVariant: "back-alt",
        geoBoundary: "品牌Brief、关键词和Prompt能够支撑内容创作，却不足以支撑具体行业中的经营判断。",
        shift: "用户临时输入 → 系统读取业务数据",
        saasRestructure: "AI基于客户、宠物、服务、消费和门店信息识别机会，用户只需补充和确认关键信息。",
        tags: ["客户", "宠物", "服务", "消费", "门店"],
      },
      {
        title: "高频经营任务",
        tone: "light",
        cornerVariant: "back-alt",
        geoBoundary: "内容创作更接近项目制流程，用户需要主动进入工具，并决定怎样使用AI。",
        shift: "AI能力入口 → 经营任务入口",
        saasRestructure: "系统在日常经营流程中主动识别待跟进客户、服务周期和召回机会，并提供下一步行动。",
        tags: ["用户寻找功能 → 系统主动提示下一步"],
      },
      {
        title: "可信的人机协作",
        tone: "muted",
        cornerVariant: "back",
        geoBoundary: "内容场景中的错误通常意味着修改和返工，但垂直行业中的AI建议可能影响客户沟通与服务决策。",
        shift: "简单人工修改 → 可解释、可审核的人机协作",
        saasRestructure: "展示判断依据和数据来源，标记不确定信息,设置角色权限，并在关键动作前保留人工确认。",
        tags: ["依据", "确认", "权限", "回退"],
      },
    ] satisfies AiProductBusinessLoopCard[],
    conclusion: "这四次重构，让AI不再等待用户提出一个好问题，而是基于业务上下文主动识别机会，并将结果组织成可以被解释、确认和执行的经营任务。",
  },
  aiInteraction: {
    title: "通用对话AI vs 任务驱动AI",
    description: "差异不在于生成更多，而在于系统能否主动识别机会，并推动下一步行动。",
    cards: [
      {
        id: "conversational",
        imageAlt: "通用对话AI示例界面",
        caption: "用户需要先识别经营问题，并主动发起和推进任务。",
      },
      {
        id: "task-driven",
        imageAlt: "任务驱动AI示例界面",
        caption: "系统主动识别机会，带入业务上下文、解释判断依据，并推动任务执行。",
      },
    ] satisfies AiProductAiInteractionCard[],
  },
  productLoop: {
    title: "重构后的产品闭环",
    description: "业务数据 → 机会 → 建议 → 审核 → 执行 → 结果",
    intro: "以客户召回场景为例：",
    topSteps: [
      {
        id: "industry-data",
        title: "行业业务数据",
        description: "客户、宠物、服务、消费和门店信息",
        tone: "white-subtle",
        width: "fluid",
      },
      {
        id: "opportunity",
        title: "识别经营机会",
        description: "流失风险、服务周期、待跟进客户",
        tone: "gray-muted",
        width: "medium",
      },
      {
        id: "explainable-suggestion",
        title: "生成可解释建议",
        description: "推荐原因、运营策略、沟通内容",
        tone: "gray-solid",
        width: "narrow",
      },
    ] satisfies AiProductLoopStep[],
    feedback: "更新客户状态与行为数据，优化下一轮机会识别和建议。",
    bottomSteps: [
      {
        id: "result-update",
        title: "结果回流与数据更新",
        description: "客户响应、到店、复购",
        tone: "white-bright",
        width: "fluid",
      },
      {
        id: "business-action",
        title: "执行业务动作",
        description: "触达、预约、回访、服务",
        tone: "white-subtle",
        width: "medium",
      },
      {
        id: "human-review",
        title: "人工审核与确认",
        description: "修改、拒绝、分配、审批",
        tone: "gray-muted",
        width: "narrow",
      },
    ] satisfies AiProductLoopStep[],
    metricsLabel: "产品价值的计划验证指标：",
    metrics: [
      {
        title: "建议采纳率",
        description: "验证 AI 建议是否有用",
        tone: "soft",
        width: "fluid",
      },
      {
        title: "任务完成率",
        description: "验证建议是否真正进入业务流程",
        tone: "medium",
        width: "medium",
      },
      {
        title: "预约与复购转化",
        description: "验证产品是否最终创造业务价值",
        tone: "strong",
        width: "narrow",
      },
    ] satisfies AiProductLoopMetric[],
  },
  principlesSection: {
    number: "03",
    label: "个人AI产品方法",
    title: "两个项目形成的AI产品化原则",
    description: "基于这两条路径，我归纳出四条AI产品化原则。",
  },
  principles: [
    { number: "01", strongText: "从用户任务出发，", lightText: "而非从模型能力出发。" },
    { number: "02", strongText: "让AI输出成为下一步行动，", lightText: "而非只是可阅读的结果。" },
    { number: "03", strongText: "将人工判断设计进系统，", lightText: "让解释、审核与回退成为产品的一部分" },
    { number: "04", strongText: "以真实业务结果完成反馈闭环，", lightText: "而非只依赖模型评分。" },
  ] satisfies AiProductPrinciple[],
  closing: ["我关注的不只是AI能够生成什么，", "更关注它如何进入真实流程，帮助用户完成任务并创造持续价值。"],
  footerLinks: [
    { number: "01", label: "UX Design", helper: "前往UX设计项目", view: "ux-design" },
    { number: "02", label: "MY Resume", helper: "前往 个人简历页", view: "resume" },
  ],
} as const;

function normalizeTitle(title: string) {
  return title.replace(/\s+/g, "").toLowerCase();
}

export const AI_PRODUCT_DETAIL_PROJECT_IDS = ["geo-platform"] as const;

export function hasAiProductDetail(projectId: AiProductFeaturedProject["id"]) {
  return AI_PRODUCT_DETAIL_PROJECT_IDS.some((availableProjectId) => availableProjectId === projectId);
}

export function findFeaturedAiProductProject(
  featuredProject: Pick<AiProductFeaturedProject, "matchTitle">,
  projects: PortfolioProject[],
) {
  const normalizedTargetTitle = normalizeTitle(featuredProject.matchTitle);

  return (
    projects.find((project) => normalizeTitle(project.title).includes(normalizedTargetTitle)) ??
    null
  );
}
