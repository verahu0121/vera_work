export type ProjectCategory = "ai-product" | "ux-design";
export type ProjectStatus = "draft" | "published";

export interface ProjectSectionImage {
  id: string;
  key?: string;
  src: string;
  alt?: string;
}

export function getProjectSectionImageSrc(image: ProjectSectionImage) {
  if (image.key) {
    return `/api/admin/object-image?key=${encodeURIComponent(image.key)}`;
  }

  return image.src;
}

export interface ProjectSection {
  stableId?: string;
  id: string;
  title: string;
  subtitle: string;
  content?: string;
  image?: string;
  images?: ProjectSectionImage[];
}

export function getProjectSectionStableId(project: PortfolioProject, sectionIndex: number) {
  const section = project.sections[sectionIndex];
  if (!section) return `${project.id}-section-${sectionIndex + 1}`;

  return section.stableId || section.id || `${project.id}-section-${sectionIndex + 1}`;
}

export interface ProjectDetailHero {
  eyebrowText: string;
  backgroundColor: string;
  eyebrowColor: string;
  titleText: string;
  titleColor: string;
  subtitleText: string;
  subtitleColor: string;
}

export interface PortfolioProject {
  id: string;
  category: ProjectCategory;
  status: ProjectStatus;
  order: number;
  title: string;
  englishTitle: string;
  date: string;
  description: string;
  coverImage: string;
  images: string[];
  tags: string[];
  sections: ProjectSection[];
  detailHero?: ProjectDetailHero;
  createdAt: string;
  updatedAt: string;
}

export function getProjectDetailHero(project: PortfolioProject): ProjectDetailHero {
  return {
    eyebrowText: project.detailHero?.eyebrowText ?? `GALLERY / ${project.id.toUpperCase()}`,
    backgroundColor: project.detailHero?.backgroundColor ?? "#070621",
    eyebrowColor: project.detailHero?.eyebrowColor ?? "#e0e0e0",
    titleText: project.detailHero?.titleText ?? project.title,
    titleColor: project.detailHero?.titleColor ?? "#fd6d59",
    subtitleText: project.detailHero?.subtitleText ?? project.englishTitle,
    subtitleColor: project.detailHero?.subtitleColor ?? "#adadad",
  };
}

function getProjectListCode(project: PortfolioProject, displayIndex?: number) {
  const codePrefix = project.category === "ai-product" ? "AI" : "UX";
  const listPosition = typeof displayIndex === "number" ? displayIndex + 1 : project.order;
  const safePosition = Number.isFinite(listPosition) && listPosition > 0 ? Math.floor(listPosition) : 1;

  return `${codePrefix}-${String(safePosition).padStart(2, "0")}`;
}

export function getProjectListEyebrow(project: PortfolioProject, displayIndex?: number) {
  const startDate = project.date.split("-")[0]?.trim() || project.date.trim();

  return `PROJECT ${getProjectListCode(project, displayIndex)} / ${startDate}`;
}

export function getProjectSectionImages(project: PortfolioProject, sectionIndex: number): ProjectSectionImage[] {
  const section = project.sections[sectionIndex];
  if (!section) return [];

  const hasSectionBasedImages = project.sections.some(
    (currentSection) => (currentSection.images?.length ?? 0) > 0,
  );

  if (section.images && section.images.length > 0) {
    return section.images;
  }

  if (!hasSectionBasedImages && sectionIndex === 0 && project.images.length > 0) {
    return project.images.map((src, index) => ({
      id: `legacy-${project.id}-${index + 1}`,
      src,
      alt: `${project.title} ${index + 1}`,
    }));
  }

  return [];
}

export const PORTFOLIO_PROJECTS_STORAGE_KEY = "vera-portfolio-projects";

export const SEED_PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "ai-01",
    category: "ai-product",
    status: "published",
    order: 1,
    title: "火电厂智慧大屏",
    englishTitle: "SMART THERMAL POWER PLANT DASHBOARD",
    date: "2024.06-2026.04",
    description:
      "本项目通过数字孪生技术，实时监控火电厂的运行状态、能耗指标及安全预警。通过 3D 建模与实时数据流的结合，实现了从宏观全厂到微调设备的深度垂直化监管。",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    tags: ["AI", "DESIGN"],
    sections: [
      { id: "01", title: "背景与挑战", subtitle: "project background" },
      { id: "02", title: "设计思路", subtitle: "design concept" },
      { id: "03", title: "交互逻辑", subtitle: "interaction flow" },
      { id: "04", title: "视觉呈现", subtitle: "visual design" },
      { id: "05", title: "项目总结", subtitle: "conclusion" },
    ],
    detailHero: {
      eyebrowText: "GALLERY / AI-01",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "火电厂智慧大屏",
      titleColor: "#fd6d59",
      subtitleText: "SMART THERMAL POWER PLANT DASHBOARD",
      subtitleColor: "#adadad",
    },
    createdAt: "2026-05-19T00:00:00.000Z",
    updatedAt: "2026-05-19T00:00:00.000Z",
  },
  {
    id: "ai-02",
    category: "ai-product",
    status: "published",
    order: 2,
    title: "工业自动化机器人控制",
    englishTitle: "INDUSTRIAL AUTOMATION ROBOTICS CONTROL",
    date: "2024.01-2025.12",
    description:
      "专注于工业机械臂的协同控制界面设计，集成了路径规划、异常告警与远程操控功能。界面采用高对比度灰阶视觉体系，确保在复杂光照环境下依然具备出色的可读性。",
    coverImage:
      "https://images.unsplash.com/photo-1563968743333-044cef800494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1563968743333-044cef800494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1563968743333-044cef800494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    tags: ["AUTOMATION", "CONTROL"],
    sections: [
      { id: "01", title: "系统架构", subtitle: "system architecture" },
      { id: "02", title: "UI 规范", subtitle: "ui guidelines" },
      { id: "03", title: "动效逻辑", subtitle: "motion logic" },
      { id: "04", title: "成果展示", subtitle: "showcase" },
    ],
    detailHero: {
      eyebrowText: "GALLERY / AI-02",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "工业自动化机器人控制",
      titleColor: "#fd6d59",
      subtitleText: "INDUSTRIAL AUTOMATION ROBOTICS CONTROL",
      subtitleColor: "#adadad",
    },
    createdAt: "2026-05-19T00:00:00.000Z",
    updatedAt: "2026-05-19T00:00:00.000Z",
  },
  {
    id: "ai-03",
    category: "ai-product",
    status: "published",
    order: 3,
    title: "未来科技 UI 指标",
    englishTitle: "FUTURE TECH METRICS INTERFACE",
    date: "2023.08-2024.12",
    description:
      "探索性概念设计项目，研究在赛博朋克审美风格下的高维数据可视化方案。利用分层投影与动态光晕技术，构建出极具冲击力的沉浸式交互体验。",
    coverImage:
      "https://images.unsplash.com/photo-1705510144116-cc4d88838b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1705510144116-cc4d88838b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1705510144116-cc4d88838b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    tags: ["FUTURE", "METRICS"],
    sections: [
      { id: "01", title: "概念探索", subtitle: "concept exploration" },
      { id: "02", title: "风格定义", subtitle: "style definition" },
      { id: "03", title: "核心组件", subtitle: "core components" },
      { id: "04", title: "反馈机制", subtitle: "feedback loops" },
    ],
    detailHero: {
      eyebrowText: "GALLERY / AI-03",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "未来科技 UI 指标",
      titleColor: "#fd6d59",
      subtitleText: "FUTURE TECH METRICS INTERFACE",
      subtitleColor: "#adadad",
    },
    createdAt: "2026-05-19T00:00:00.000Z",
    updatedAt: "2026-05-19T00:00:00.000Z",
  },
  {
    id: "ux-01",
    category: "ux-design",
    status: "published",
    order: 1,
    title: "智能健康监测系统",
    englishTitle: "SMART HEALTH MONITORING SYSTEM",
    date: "2024.10-2026.04",
    description:
      "通过可穿戴设备采集生理数据，利用 AI 算法进行健康风险评估与个性化建议。界面设计聚焦于数据的直观呈现与情感化交互，旨在提升用户的健康管理体验。",
    coverImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    tags: ["UX", "STRATEGY"],
    sections: [
      { id: "01", title: "需求分析", subtitle: "user needs" },
      { id: "02", title: "信息架构", subtitle: "information architecture" },
      { id: "03", title: "原型设计", subtitle: "prototyping" },
      { id: "04", title: "视觉规范", subtitle: "visual system" },
      { id: "05", title: "可用性测试", subtitle: "usability testing" },
    ],
    detailHero: {
      eyebrowText: "GALLERY / UX-01",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "智能健康监测系统",
      titleColor: "#fd6d59",
      subtitleText: "SMART HEALTH MONITORING SYSTEM",
      subtitleColor: "#adadad",
    },
    createdAt: "2026-05-19T00:00:00.000Z",
    updatedAt: "2026-05-19T00:00:00.000Z",
  },
  {
    id: "ux-02",
    category: "ux-design",
    status: "published",
    order: 2,
    title: "全链路电商体验优化",
    englishTitle: "E-COMMERCE FULL-LINK EXPERIENCE OPTIMIZATION",
    date: "2024.03-2025.08",
    description:
      "针对现有电商平台在购物路径上的摩擦点进行深度优化。通过用户旅程地图分析，重构了从搜索到结算的关键交互环节，转化率提升了 35%。",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1557821552-17105176677c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    tags: ["UX", "RESEARCH"],
    sections: [
      { id: "01", title: "用户研究", subtitle: "user research" },
      { id: "02", title: "旅程地图", subtitle: "journey mapping" },
      { id: "03", title: "交互方案", subtitle: "interaction design" },
      { id: "04", title: "数据验证", subtitle: "data verification" },
    ],
    detailHero: {
      eyebrowText: "GALLERY / UX-02",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "全链路电商体验优化",
      titleColor: "#fd6d59",
      subtitleText: "E-COMMERCE FULL-LINK EXPERIENCE OPTIMIZATION",
      subtitleColor: "#adadad",
    },
    createdAt: "2026-05-19T00:00:00.000Z",
    updatedAt: "2026-05-19T00:00:00.000Z",
  },
  {
    id: "ux-03",
    category: "ux-design",
    status: "published",
    order: 3,
    title: "智能财务管理助手",
    englishTitle: "AI-DRIVEN PERSONAL FINANCE MANAGER",
    date: "2025.01-2025.12",
    description:
      "利用机器学习分析消费习惯，为用户提供智能预警与投资策略。设计上采用极简主义风格，通过多维图表展示财务状况，帮助用户实现财务自由。",
    coverImage:
      "https://images.unsplash.com/photo-1581492129911-5eb1fb620f67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1581492129911-5eb1fb620f67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1554224155-1696413565d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    tags: ["UX", "FINANCE"],
    sections: [
      { id: "01", title: "算法逻辑", subtitle: "algorithm logic" },
      { id: "02", title: "数据可视化", subtitle: "data visualization" },
      { id: "03", title: "情感交互", subtitle: "emotional design" },
    ],
    detailHero: {
      eyebrowText: "GALLERY / UX-03",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "智能财务管理助手",
      titleColor: "#fd6d59",
      subtitleText: "AI-DRIVEN PERSONAL FINANCE MANAGER",
      subtitleColor: "#adadad",
    },
    createdAt: "2026-05-19T00:00:00.000Z",
    updatedAt: "2026-05-19T00:00:00.000Z",
  },
  {
    id: "ux-04",
    category: "ux-design",
    status: "published",
    order: 4,
    title: "智慧城市交通调度系统",
    englishTitle: "SMART CITY MOBILITY DASHBOARD",
    date: "2025.06-2026.05",
    description:
      "整合公共交通、共享出行与实时路况数据，为城市管理者提供决策支持。界面强调高信息密度下的易读性，通过实时数字孪生技术还原交通流。",
    coverImage:
      "https://images.unsplash.com/photo-1610886109754-ba5f6a758193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1610886109754-ba5f6a758193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    tags: ["UX", "CITY"],
    sections: [
      { id: "01", title: "大数据集成", subtitle: "data integration" },
      { id: "02", title: "实时监控", subtitle: "real-time monitoring" },
      { id: "03", title: "多终端适配", subtitle: "multi-device adaptive" },
    ],
    detailHero: {
      eyebrowText: "GALLERY / UX-04",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "智慧城市交通调度系统",
      titleColor: "#fd6d59",
      subtitleText: "SMART CITY MOBILITY DASHBOARD",
      subtitleColor: "#adadad",
    },
    createdAt: "2026-05-19T00:00:00.000Z",
    updatedAt: "2026-05-19T00:00:00.000Z",
  },
  {
    id: "ux-05",
    category: "ux-design",
    status: "published",
    order: 5,
    title: "可持续时尚交易平台",
    englishTitle: "SUSTAINABLE FASHION MARKETPLACE",
    date: "2024.11-2025.09",
    description:
      "打造循环经济模式下的时尚社区，支持二手衣物回收与再创作。视觉语言传递环保理念，通过透明的供应链展示提升品牌信任度。",
    coverImage:
      "https://images.unsplash.com/photo-1609904163068-e73c5295b7c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1609904163068-e73c5295b7c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    tags: ["UX", "COMMUNITY"],
    sections: [
      { id: "01", title: "品牌叙事", subtitle: "brand storytelling" },
      { id: "02", title: "信任体系", subtitle: "trust system" },
      { id: "03", title: "社区建设", subtitle: "community building" },
    ],
    detailHero: {
      eyebrowText: "GALLERY / UX-05",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "可持续时尚交易平台",
      titleColor: "#fd6d59",
      subtitleText: "SUSTAINABLE FASHION MARKETPLACE",
      subtitleColor: "#adadad",
    },
    createdAt: "2026-05-19T00:00:00.000Z",
    updatedAt: "2026-05-19T00:00:00.000Z",
  },
];

export function sortPortfolioProjects(projects: PortfolioProject[]) {
  return [...projects].sort((a, b) => a.order - b.order);
}
