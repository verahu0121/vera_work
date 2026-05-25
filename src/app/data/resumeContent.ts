export type ResumeProfile = {
  portraitImage: string
  chineseName: string
  englishName: string
  roleSubtitle: string
  aboutLabel: string
  aboutTextEn: string
  aboutTextZh: string
}

export type ResumeExperienceProjectItem = {
  stableId: string
  title: string
  description: string
  linkedPortfolioProjectId?: string
}

export type ResumeExperienceProjectSet = {
  stableId: string
  experienceStableId: string
  items: ResumeExperienceProjectItem[]
}

export type ResumeExperienceItem = {
  stableId: string
  numberLabel: string
  company: string
  role: string
  period: string
}

export type ResumeExperienceGrid = {
  experiences: ResumeExperienceItem[]
  projectSets: ResumeExperienceProjectSet[]
}

export type ResumeEducationAward = {
  stableId: string
  date: string
  title: string
  description: string
  image: string
}

export type ResumeEducation = {
  quoteLine1: string
  quoteLine2: string
  graduatedLabel: string
  sectionTitle: string
  sectionSubtitle: string
  sectionNumber: string
  schoolPeriod: string
  schoolName: string
  major: string
  className: string
  degreeType: string
  degreeLevel: string
  awards: ResumeEducationAward[]
}

export type ResumeAiProjectCard = {
  stableId: string
  label: string
  title: string
  highlightText?: string
  meta: string
  image: string
}

export type ResumeAiRoleCard = {
  stableId: string
  breadcrumbs: string[]
  title: string
  description: string
  meta: string
}

export type ResumeAiContactCard = {
  brandTitle: string
  description: string
  buttonLabel: string
}

export type ResumeAiProjectGroup = {
  stableId: string
  roleLabel: string
  projectTitle: string
  highlightText?: string
  coverMeta: string
  coverImage: string
  linkedPortfolioProjectId?: string
  detailTabs: string[]
  detailTitle: string
  detailDescription: string
  detailFooterLabel: string
}

export type ResumeAiProducts = {
  quoteLine1: string
  quoteLine2: string
  timelineLabel: string
  sectionTitle: string
  sectionSubtitle: string
  sectionNumber: string
  projectGroups: ResumeAiProjectGroup[]
  ctaCard: ResumeAiContactCard
}

export type ResumeUxLargeCard = {
  stableId: string
  idLabel: string
  title: string
  description: string
  category: string
  tags: string
  mediaUrl: string
  mediaType: "image" | "video"
  linkedPortfolioProjectId?: string
}

export type ResumeUxGroupCard = {
  stableId: string
  idLabel: string
  title: string
  description: string
  category: string
  image: string
  actionLabel: string
  linkedPortfolioProjectId?: string
}

export type ResumeUxLargeCardBlock = {
  stableId: string
  type: "large-card"
  card: ResumeUxLargeCard
}

export type ResumeUxCardGroupBlock = {
  stableId: string
  type: "card-group"
  leftCard: ResumeUxGroupCard
  rightCard: ResumeUxGroupCard
}

export type ResumeUxProjectBlock = ResumeUxLargeCardBlock | ResumeUxCardGroupBlock

export type ResumeUxCase = {
  quoteLine1: string
  quoteLine2: string
  timelineLabel: string
  sectionTitle: string
  sectionSubtitle: string
  sectionNumber: string
  projectBlocks: ResumeUxProjectBlock[]
}

export const RESUME_INFORMATION_HOME_MODULE_KEYS = ["center", "left", "right"] as const

export type ResumeInformationHomeModuleKey = (typeof RESUME_INFORMATION_HOME_MODULE_KEYS)[number]

export type ResumeInformationItem = {
  stableId: string
  label: string
  value: string
}

export type ResumeInformationHomeModule = {
  key: ResumeInformationHomeModuleKey
  name: string
  information: string[]
  items: ResumeInformationItem[]
}

export type ResumeInformationContact = {
  wechat: string
  email: string
}

export type ResumeInformationCopyright = {
  text: string
}

export type ResumeInformation = {
  home: {
    modules: ResumeInformationHomeModule[]
  }
  contact: ResumeInformationContact
  copyright: ResumeInformationCopyright
}

export type ResumeContentData = {
  profile: ResumeProfile
  experienceGrid: ResumeExperienceGrid
  education: ResumeEducation
  aiProducts: ResumeAiProducts
  uxCase: ResumeUxCase
  information: ResumeInformation
}

export const DEFAULT_RESUME_CONTENT: ResumeContentData = {
  profile: {
    portraitImage: "",
    chineseName: "胡雨琪",
    englishName: "VERA",
    roleSubtitle: "AI Product Manager & Experience Designer",
    aboutLabel: "About Me",
    aboutTextEn:
      "As an AI Product Manager & Experience Designer, I don’t just build products or design interfaces. I translate complex intelligence into human-centered experiences, turning technical possibilities into real, gentle value for people.",
    aboutTextZh:
      "作为 AI 产品经理与体验设计师，我不只是构建产品、设计界面。我用产品逻辑梳理复杂的脉络，用体验设计打磨每一个细节，将ai能力转化为以人为中心、可感易用的产品，把技术的可能性，变成真正贴近人、服务人、温暖人的实用价值。",
  },
  experienceGrid: {
    experiences: [
      {
        stableId: "resume-exp-01",
        numberLabel: "01",
        company: "时代之门科技有限公司",
        role: "AI PRODUCT MANAGER",
        period: "2022 — PRESENT",
      },
      {
        stableId: "resume-exp-02",
        numberLabel: "02",
        company: "宁波中升估价",
        role: "PM & UX DESIGNER",
        period: "2020 — 2022",
      },
      {
        stableId: "resume-exp-03",
        numberLabel: "03",
        company: "杉杉商业集团",
        role: "DESIGN MANAGER",
        period: "2018 — 2020",
      },
    ],
    projectSets: [
      {
        stableId: "resume-project-set-01",
        experienceStableId: "resume-exp-01",
        items: [
          {
            stableId: "resume-exp-01-project-01",
            title: "AIEO 创作与分发综合平台",
            description:
              "整合主流大模型与内容渠道，搭建全端客户端及统一后台，打造一站式创作分发综合平台。",
            linkedPortfolioProjectId: "",
          },
          {
            stableId: "resume-exp-01-project-02",
            title: "鹤元家政2.0智能系统",
            description:
              "以 AI 智能体深度赋能 B 端家政，全链路提效降本，重塑家政服务体验与运营效率。",
            linkedPortfolioProjectId: "",
          },
          {
            stableId: "resume-exp-01-project-03",
            title: "GEA智能数据工程师项目",
            description:
              "前后共计 6 场工作坊高效对齐共识，攻坚跨 BU 协作痛点，输出可落地产品设计方案。",
            linkedPortfolioProjectId: "",
          },
        ],
      },
      {
        stableId: "resume-project-set-02",
        experienceStableId: "resume-exp-02",
        items: [
          {
            stableId: "resume-exp-02-project-01",
            title: "中升营销管理系统",
            description:
              "从 0-1 搭建 B 端营销管理系统，统筹全流程产品设计，实现营销链路数字化提效。",
            linkedPortfolioProjectId: "",
          },
          {
            stableId: "resume-exp-02-project-02",
            title: "中升官网2.0改版",
            description:
              "官方门户网页重构，以用户体验为核心，打造具备品牌化、高可用性的官方门户。",
            linkedPortfolioProjectId: "",
          },
          {
            stableId: "resume-exp-02-project-03",
            title: "中升SaaS系统重构",
            description:
              "主导 SaaS 系统 1.0→2.0 迭代升级，优化产品体验，赋能土地评估业务高效运转。",
            linkedPortfolioProjectId: "",
          },
        ],
      },
      {
        stableId: "resume-project-set-03",
        experienceStableId: "resume-exp-03",
        items: [
          {
            stableId: "resume-exp-03-project-01",
            title: "奥莱线上商城小程序",
            description:
              "奥莱商城小程序迭代项目，以用户体验为核心，提升购物流程流畅度与转化效率。",
            linkedPortfolioProjectId: "",
          },
          {
            stableId: "resume-exp-03-project-02",
            title: "杉杉BI数据分析平台",
            description:
              "BI 数据分析平台大版本迭代，优化提升整体视觉与交互体验，简化数据筛选操作流程，赋能高效数据决策。",
            linkedPortfolioProjectId: "",
          },
          {
            stableId: "resume-exp-03-project-03",
            title: "杉杉商业业务中台",
            description:
              "构建全链路业务中台，贯通人员、商品、营销、财务及订单体系，实现全域协同与高效管控。",
            linkedPortfolioProjectId: "",
          },
        ],
      },
    ],
  },
  education: {
    quoteLine1: "“ 学习不会止步于校园，",
    quoteLine2: "是对外界永怀好奇，是在自我精进中不断前行。”",
    graduatedLabel: "Graduated in 2020",
    sectionTitle: "education  教育经历",
    sectionSubtitle: "全日制本科  |  学士学位",
    sectionNumber: "03",
    schoolPeriod: "2016-2020",
    schoolName: "浙江理工大学",
    major: "工业设计",
    className: "卓越工程班",
    degreeType: "全日制本科",
    degreeLevel: "学士学位",
    awards: [
      {
        stableId: "resume-award-01",
        date: "2016年9月",
        title: "奖项名称1",
        description:
          "Focused on the convergence of traditional editorial principles and modern interface paradigms. Awarded for Excellence in Visual Communication.",
        image: "",
      },
      {
        stableId: "resume-award-02",
        date: "2017年10月",
        title: "奖项名称2",
        description:
          "Focused on the convergence of traditional editorial principles and modern interface paradigms. Awarded for Excellence in Visual Communication.",
        image: "",
      },
      {
        stableId: "resume-award-03",
        date: "2018年11月",
        title: "奖项名称3",
        description:
          "Focused on the convergence of traditional editorial principles and modern interface paradigms. Awarded for Excellence in Visual Communication.",
        image: "",
      },
    ],
  },
  aiProducts: {
    quoteLine1: "“ AI 产品的关键在于：",
    quoteLine2: "如何在智能时代，契合人类的思考与行为逻辑。”",
    timelineLabel: "as ai  product manager — from 2025 to 2026",
    sectionTitle: "AI Products  智能产品探索",
    sectionSubtitle: "ai产品经理 ｜ 时代之门（上海）科技有限公司",
    sectionNumber: "01",
    projectGroups: [
      {
        stableId: "resume-ai-group-01",
        roleLabel: "AI 产品经理",
        projectTitle: "AIEO ",
        highlightText: "创作与分发平台",
        coverMeta: "pc & 小程序客户端 + 后管平台 • 2026",
        coverImage: "",
        linkedPortfolioProjectId: "",
        detailTabs: ["who", "what", "why", "how"],
        detailTitle: "角色定位",
        detailDescription: "一句话描述角色定位",
        detailFooterLabel: "Algorithm • Beta",
      },
      {
        stableId: "resume-ai-group-02",
        roleLabel: "ai产品经理，视觉设计负责人",
        projectTitle: "鹤元家政2.0智能系统",
        coverMeta: "小程序客户端 + 业务中台 • 2025",
        coverImage: "",
        linkedPortfolioProjectId: "",
        detailTabs: ["who", "what", "why", "how"],
        detailTitle: "角色定位",
        detailDescription: "一句话描述角色定位",
        detailFooterLabel: "Algorithm • Beta",
      },
      {
        stableId: "resume-ai-group-03",
        roleLabel: "ai产品经理，视觉设计负责人",
        projectTitle: "时代之言智能体中心",
        coverMeta: "pc客户端 + 后管平台 • 2025",
        coverImage: "",
        linkedPortfolioProjectId: "",
        detailTabs: ["who", "what", "why", "how"],
        detailTitle: "角色定位",
        detailDescription: "一句话描述角色定位",
        detailFooterLabel: "Algorithm • Beta",
      },
    ],
    ctaCard: {
      brandTitle: "Vera’s  Libertisle",
      description: "更多项目，即刻前往Vera的产品创意岛~",
      buttonLabel: "Get In Touch",
    },
  },
  uxCase: {
    quoteLine1: "“ 设计不止于形与感，",
    quoteLine2: "更在于它如何作用于人类经验的长河。”",
    timelineLabel: "as ux designer — from 2021 to 2024",
    sectionTitle: "UX Case study  体验设计寻踪",
    sectionSubtitle: "产品&设计主管 ｜ 宁波中升估价 ｜ 杉杉商业集团",
    sectionNumber: "02",
    projectBlocks: [
      {
        stableId: "resume-ux-block-01",
        type: "large-card",
        card: {
          stableId: "resume-ux-large-01",
          idLabel: "001",
          title: "地方火电厂综合平台",
          description:
            "文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息字描述信。",
          category: "用户体验设计（主管）",
          tags: "PC端  |  SaaS平台  |  重业务",
          mediaUrl: "/_videos/v1/2c856339829e11d00a0f250acad03dd9bed6253e",
          mediaType: "video",
          linkedPortfolioProjectId: "",
        },
      },
      {
        stableId: "resume-ux-block-02",
        type: "large-card",
        card: {
          stableId: "resume-ux-large-02",
          idLabel: "001",
          title: "地方火电厂综合平台",
          description:
            "文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息字描述信。",
          category: "用户体验设计（主管）",
          tags: "PC端  |  SaaS平台  |  重业务",
          mediaUrl: "",
          mediaType: "image",
          linkedPortfolioProjectId: "",
        },
      },
      {
        stableId: "resume-ux-block-03",
        type: "card-group",
        leftCard: {
          stableId: "resume-ux-medium-01",
          idLabel: "002",
          title: "奥莱线上商城小程序",
          description:
            "文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息。",
          category: "用户体验设计（主管）",
          image: "",
          actionLabel: "VIEW PROTOTYPE",
          linkedPortfolioProjectId: "",
        },
        rightCard: {
          stableId: "resume-ux-medium-02",
          idLabel: "003",
          title: "中升营销管理系统",
          description:
            "文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字描述信息文字。",
          category: "产品经理 & UX设计",
          image: "",
          actionLabel: "VIEW PROTOTYPE",
          linkedPortfolioProjectId: "",
        },
      },
    ],
  },
  information: {
    home: {
      modules: [
        {
          key: "center",
          name: "居中模块",
          information: ["AI PRODUCT", "PRODUCT AI PRODUCT", "UX设计项目"],
          items: [
            {
              stableId: "information-center-item-01",
              label: "EMAIL",
              value: "-hello@vera-",
            },
            {
              stableId: "information-center-item-02",
              label: "BEHANCE",
              value: "-veradesign-",
            },
            {
              stableId: "information-center-item-03",
              label: "DRIBBBLE",
              value: "-vera.ux-",
            },
          ],
        },
        {
          key: "left",
          name: "左对齐模块",
          information: ["AI PRODUCT", "PRODUCT AI PRODUCT", "UX设计项目"],
          items: [],
        },
        {
          key: "right",
          name: "右对齐模块",
          information: ["AI PRODUCT", "PRODUCT AI PRODUCT", "UX设计项目"],
          items: [],
        },
      ],
    },
    contact: {
      wechat: "-vera0121-",
      email: "vera0121@126.com",
    },
    copyright: {
      text: "© 2026 The Digital Curator. Built for stability.",
    },
  },
}

type LegacyResumeAiProducts = Partial<ResumeAiProducts> & {
  projectCards?: ResumeAiProjectCard[]
  roleCards?: ResumeAiRoleCard[]
  contactCard?: ResumeAiContactCard
}

type LegacyResumeUxLargeCard = {
  stableId?: string
  idLabel?: string
  title?: string
  description?: string
  category?: string
  tags?: string
  videoSrc?: string
  image?: string
  linkedPortfolioProjectId?: string
}

type LegacyResumeUxMediumCard = {
  stableId?: string
  idLabel?: string
  title?: string
  description?: string
  category?: string
  image?: string
  actionLabel?: string
  linkedPortfolioProjectId?: string
}

type LegacyResumeUxProjectBlock = Partial<ResumeUxProjectBlock> & {
  card?: Partial<ResumeUxLargeCard>
  leftCard?: Partial<ResumeUxGroupCard>
  rightCard?: Partial<ResumeUxGroupCard>
}

type LegacyResumeUxCase = Partial<ResumeUxCase> & {
  largeCards?: LegacyResumeUxLargeCard[]
  mediumCards?: LegacyResumeUxMediumCard[]
  projectBlocks?: LegacyResumeUxProjectBlock[]
}

type LegacyResumeInformation = Partial<ResumeInformation> & {
  home?: Partial<ResumeInformation["home"]>
  contact?: Partial<ResumeInformationContact>
  copyright?: Partial<ResumeInformationCopyright>
}

function normalizeUxLargeCard(
  card: Partial<ResumeUxLargeCard> | undefined,
  fallback: ResumeUxLargeCard,
): ResumeUxLargeCard {
  return {
    stableId: card?.stableId ?? fallback.stableId,
    idLabel: card?.idLabel ?? fallback.idLabel,
    title: card?.title ?? fallback.title,
    description: card?.description ?? fallback.description,
    category: card?.category ?? fallback.category,
    tags: card?.tags ?? fallback.tags,
    mediaUrl: card?.mediaUrl ?? fallback.mediaUrl,
    mediaType: card?.mediaType === "video" ? "video" : "image",
    linkedPortfolioProjectId: card?.linkedPortfolioProjectId ?? fallback.linkedPortfolioProjectId ?? "",
  }
}

function normalizeUxGroupCard(
  card: Partial<ResumeUxGroupCard> | undefined,
  fallback: ResumeUxGroupCard,
): ResumeUxGroupCard {
  return {
    stableId: card?.stableId ?? fallback.stableId,
    idLabel: card?.idLabel ?? fallback.idLabel,
    title: card?.title ?? fallback.title,
    description: card?.description ?? fallback.description,
    category: card?.category ?? fallback.category,
    image: card?.image ?? fallback.image,
    actionLabel: card?.actionLabel ?? fallback.actionLabel,
    linkedPortfolioProjectId: card?.linkedPortfolioProjectId ?? fallback.linkedPortfolioProjectId ?? "",
  }
}

function normalizeUxProjectBlocks(uxCase?: LegacyResumeUxCase): ResumeUxProjectBlock[] {
  const fallbackBlocks = DEFAULT_RESUME_CONTENT.uxCase.projectBlocks
  const incomingBlocks = uxCase?.projectBlocks
  const legacyLargeCards = uxCase?.largeCards ?? []
  const legacyMediumCards = uxCase?.mediumCards ?? []
  const getLegacyLargeLinkedProjectId = (stableId?: string) =>
    stableId
      ? legacyLargeCards.find((card) => card.stableId === stableId)?.linkedPortfolioProjectId
      : undefined
  const getLegacyMediumLinkedProjectId = (stableId?: string) =>
    stableId
      ? legacyMediumCards.find((card) => card.stableId === stableId)?.linkedPortfolioProjectId
      : undefined

  if (Array.isArray(incomingBlocks) && incomingBlocks.length > 0) {
    return incomingBlocks.map((block, index) => {
      const fallback =
        fallbackBlocks[index] ??
        fallbackBlocks[Math.min(index, Math.max(fallbackBlocks.length - 1, 0))]

      if (block.type === "card-group") {
        const groupFallback =
          fallback.type === "card-group"
            ? fallback
            : {
                stableId: `resume-ux-block-group-fallback-${index + 1}`,
                type: "card-group" as const,
                leftCard: {
                  stableId: `resume-ux-group-left-fallback-${index + 1}`,
                  idLabel: "",
                  title: "",
                  description: "",
                  category: "",
                  image: "",
                  actionLabel: "VIEW PROTOTYPE",
                  linkedPortfolioProjectId: "",
                },
                rightCard: {
                  stableId: `resume-ux-group-right-fallback-${index + 1}`,
                  idLabel: "",
                  title: "",
                  description: "",
                  category: "",
                  image: "",
                  actionLabel: "VIEW PROTOTYPE",
                  linkedPortfolioProjectId: "",
                },
              }

        return {
          stableId: block.stableId ?? groupFallback.stableId,
          type: "card-group" as const,
          leftCard: normalizeUxGroupCard(
            {
              ...block.leftCard,
              linkedPortfolioProjectId:
                block.leftCard?.linkedPortfolioProjectId ??
                getLegacyMediumLinkedProjectId(block.leftCard?.stableId),
            },
            groupFallback.leftCard,
          ),
          rightCard: normalizeUxGroupCard(
            {
              ...block.rightCard,
              linkedPortfolioProjectId:
                block.rightCard?.linkedPortfolioProjectId ??
                getLegacyMediumLinkedProjectId(block.rightCard?.stableId),
            },
            groupFallback.rightCard,
          ),
        }
      }

      const largeFallback =
        fallback.type === "large-card"
          ? fallback
          : {
              stableId: `resume-ux-block-large-fallback-${index + 1}`,
              type: "large-card" as const,
              card: {
                stableId: `resume-ux-large-fallback-${index + 1}`,
                idLabel: "",
                title: "",
                description: "",
                category: "",
                tags: "",
                mediaUrl: "",
                mediaType: "image" as const,
                linkedPortfolioProjectId: "",
              },
            }

      return {
        stableId: block.stableId ?? largeFallback.stableId,
        type: "large-card" as const,
        card: normalizeUxLargeCard(
          {
            ...block.card,
            linkedPortfolioProjectId:
              block.card?.linkedPortfolioProjectId ??
              getLegacyLargeLinkedProjectId(block.card?.stableId),
          },
          largeFallback.card,
        ),
      }
    })
  }

  const blocks: ResumeUxProjectBlock[] = []

  legacyLargeCards.forEach((card, index) => {
    const fallback =
      fallbackBlocks.find((block) => block.type === "large-card" && block.card.stableId === card.stableId) ??
      fallbackBlocks.find((block) => block.type === "large-card") ??
      {
        stableId: `resume-ux-block-large-fallback-${index + 1}`,
        type: "large-card" as const,
        card: {
          stableId: `resume-ux-large-fallback-${index + 1}`,
          idLabel: "",
          title: "",
          description: "",
          category: "",
          tags: "",
          mediaUrl: "",
          mediaType: "image" as const,
          linkedPortfolioProjectId: "",
        },
      }

    blocks.push({
      stableId: `resume-ux-block-large-legacy-${index + 1}`,
      type: "large-card",
      card: {
        stableId: card.stableId ?? fallback.card.stableId,
        idLabel: card.idLabel ?? fallback.card.idLabel,
        title: card.title ?? fallback.card.title,
        description: card.description ?? fallback.card.description,
        category: card.category ?? fallback.card.category,
        tags: card.tags ?? fallback.card.tags,
        mediaUrl: card.videoSrc ?? card.image ?? fallback.card.mediaUrl,
        mediaType: card.videoSrc ? "video" : "image",
        linkedPortfolioProjectId: card.linkedPortfolioProjectId ?? fallback.card.linkedPortfolioProjectId ?? "",
      },
    })
  })

  for (let index = 0; index < legacyMediumCards.length; index += 2) {
    const leftLegacyCard = legacyMediumCards[index]
    const rightLegacyCard = legacyMediumCards[index + 1]
    const fallbackGroup =
      fallbackBlocks.find((block) => block.type === "card-group") ??
      {
        stableId: `resume-ux-block-group-fallback-${index + 1}`,
        type: "card-group" as const,
        leftCard: {
          stableId: `resume-ux-group-left-fallback-${index + 1}`,
          idLabel: "",
          title: "",
          description: "",
          category: "",
          image: "",
          actionLabel: "VIEW PROTOTYPE",
          linkedPortfolioProjectId: "",
        },
        rightCard: {
          stableId: `resume-ux-group-right-fallback-${index + 1}`,
          idLabel: "",
          title: "",
          description: "",
          category: "",
          image: "",
          actionLabel: "VIEW PROTOTYPE",
          linkedPortfolioProjectId: "",
        },
      }

    blocks.push({
      stableId: `resume-ux-block-group-legacy-${Math.floor(index / 2) + 1}`,
      type: "card-group",
      leftCard: normalizeUxGroupCard(leftLegacyCard, fallbackGroup.leftCard),
      rightCard: normalizeUxGroupCard(rightLegacyCard, fallbackGroup.rightCard),
    })
  }

  return blocks.length > 0 ? blocks : fallbackBlocks
}

function normalizeAiProducts(aiProducts?: LegacyResumeAiProducts): ResumeAiProducts {
  if (!aiProducts) {
    return DEFAULT_RESUME_CONTENT.aiProducts
  }

  const defaultAiProducts = DEFAULT_RESUME_CONTENT.aiProducts
  const incomingGroups = aiProducts.projectGroups

  const projectGroups =
    Array.isArray(incomingGroups) && incomingGroups.length > 0
      ? incomingGroups.map((group, index) => {
          const fallback = defaultAiProducts.projectGroups[index] ?? defaultAiProducts.projectGroups[defaultAiProducts.projectGroups.length - 1]
          return {
            stableId: group.stableId || fallback.stableId || `resume-ai-group-${String(index + 1).padStart(2, "0")}`,
            roleLabel: group.roleLabel ?? fallback.roleLabel,
            projectTitle: group.projectTitle ?? fallback.projectTitle,
            highlightText: group.highlightText ?? fallback.highlightText ?? "",
            coverMeta: group.coverMeta ?? fallback.coverMeta,
            coverImage: group.coverImage ?? fallback.coverImage,
            linkedPortfolioProjectId: group.linkedPortfolioProjectId ?? fallback.linkedPortfolioProjectId ?? "",
            detailTabs:
              Array.isArray(group.detailTabs) && group.detailTabs.length > 0
                ? group.detailTabs
                : fallback.detailTabs,
            detailTitle: group.detailTitle ?? fallback.detailTitle,
            detailDescription: group.detailDescription ?? fallback.detailDescription,
            detailFooterLabel: group.detailFooterLabel ?? fallback.detailFooterLabel,
          }
        })
      : (aiProducts.projectCards ?? defaultAiProducts.projectGroups.map((group) => ({
          stableId: group.stableId,
          label: group.roleLabel,
          title: group.projectTitle,
          highlightText: group.highlightText,
          meta: group.coverMeta,
          image: group.coverImage,
        }))).map((card, index) => {
          const defaultGroup = defaultAiProducts.projectGroups[index] ?? defaultAiProducts.projectGroups[defaultAiProducts.projectGroups.length - 1]
          const roleCard =
            aiProducts.roleCards?.[index] ??
            aiProducts.roleCards?.[Math.min(index, Math.max((aiProducts.roleCards?.length ?? 1) - 1, 0))] ??
            {
              stableId: `resume-ai-role-fallback-${index + 1}`,
              breadcrumbs: defaultGroup.detailTabs,
              title: defaultGroup.detailTitle,
              description: defaultGroup.detailDescription,
              meta: defaultGroup.detailFooterLabel,
            }

          return {
            stableId: card.stableId || defaultGroup.stableId || `resume-ai-group-${String(index + 1).padStart(2, "0")}`,
            roleLabel: card.label ?? defaultGroup.roleLabel,
            projectTitle: card.title ?? defaultGroup.projectTitle,
            highlightText: card.highlightText ?? defaultGroup.highlightText ?? "",
            coverMeta: card.meta ?? defaultGroup.coverMeta,
            coverImage: card.image ?? defaultGroup.coverImage,
            linkedPortfolioProjectId: defaultGroup.linkedPortfolioProjectId ?? "",
            detailTabs:
              Array.isArray(roleCard.breadcrumbs) && roleCard.breadcrumbs.length > 0
                ? roleCard.breadcrumbs
                : defaultGroup.detailTabs,
            detailTitle: roleCard.title ?? defaultGroup.detailTitle,
            detailDescription: roleCard.description ?? defaultGroup.detailDescription,
            detailFooterLabel: roleCard.meta ?? defaultGroup.detailFooterLabel,
          }
        })

  return {
    quoteLine1: aiProducts.quoteLine1 ?? defaultAiProducts.quoteLine1,
    quoteLine2: aiProducts.quoteLine2 ?? defaultAiProducts.quoteLine2,
    timelineLabel: aiProducts.timelineLabel ?? defaultAiProducts.timelineLabel,
    sectionTitle: aiProducts.sectionTitle ?? defaultAiProducts.sectionTitle,
    sectionSubtitle: aiProducts.sectionSubtitle ?? defaultAiProducts.sectionSubtitle,
    sectionNumber: aiProducts.sectionNumber ?? defaultAiProducts.sectionNumber,
    projectGroups,
    ctaCard: {
      ...defaultAiProducts.ctaCard,
      ...(aiProducts.ctaCard ?? aiProducts.contactCard ?? {}),
    },
  }
}

function normalizeInformation(information?: LegacyResumeInformation): ResumeInformation {
  const defaultInformation = DEFAULT_RESUME_CONTENT.information

  return {
    home: {
      modules: RESUME_INFORMATION_HOME_MODULE_KEYS.map((key, index) => {
        const fallback = defaultInformation.home.modules[index]
        const incomingModule = information?.home?.modules?.find((module) => module?.key === key)

        return {
          key,
          name: incomingModule?.name ?? fallback.name,
          information: Array.from({ length: 3 }, (_, itemIndex) =>
            incomingModule?.information?.[itemIndex] ?? fallback.information[itemIndex] ?? "",
          ),
          items: Array.isArray(incomingModule?.items)
            ? incomingModule.items.slice(0, 5).map((item, itemIndex) => ({
                stableId: item.stableId || `information-${key}-item-${String(itemIndex + 1).padStart(2, "0")}`,
                label: item.label ?? "",
                value: item.value ?? "",
              }))
            : fallback.items,
        }
      }),
    },
    contact: {
      wechat: information?.contact?.wechat ?? defaultInformation.contact.wechat,
      email: information?.contact?.email ?? defaultInformation.contact.email,
    },
    copyright: {
      text: information?.copyright?.text ?? defaultInformation.copyright.text,
    },
  }
}

export function normalizeResumeContent(content?: Partial<ResumeContentData> | null): ResumeContentData {
  const nextContent = content ?? {}

  return {
    ...DEFAULT_RESUME_CONTENT,
    ...nextContent,
    profile: {
      ...DEFAULT_RESUME_CONTENT.profile,
      ...(nextContent.profile ?? {}),
    },
    experienceGrid: {
      ...DEFAULT_RESUME_CONTENT.experienceGrid,
      ...(nextContent.experienceGrid ?? {}),
      experiences:
        nextContent.experienceGrid?.experiences ?? DEFAULT_RESUME_CONTENT.experienceGrid.experiences,
      projectSets:
        nextContent.experienceGrid?.projectSets ?? DEFAULT_RESUME_CONTENT.experienceGrid.projectSets,
    },
    education: {
      ...DEFAULT_RESUME_CONTENT.education,
      ...(nextContent.education ?? {}),
      awards: nextContent.education?.awards ?? DEFAULT_RESUME_CONTENT.education.awards,
    },
    aiProducts: normalizeAiProducts(nextContent.aiProducts as LegacyResumeAiProducts | undefined),
    uxCase: {
      ...DEFAULT_RESUME_CONTENT.uxCase,
      ...(nextContent.uxCase ?? {}),
      projectBlocks: normalizeUxProjectBlocks(nextContent.uxCase as LegacyResumeUxCase | undefined),
    },
    information: normalizeInformation(nextContent.information as LegacyResumeInformation | undefined),
  }
}
