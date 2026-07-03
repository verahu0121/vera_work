import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const appSource = () => readFileSync("src/app/App.tsx", "utf8");
const aiProductSource = () => readFileSync("src/app/components/AIProductContent.tsx", "utf8");
const fontsSource = () => readFileSync("src/styles/fonts.css", "utf8");
const themeSource = () => readFileSync("src/styles/theme.css", "utf8");
const overlaySource = () => {
  const path = "src/app/components/AIProjectDetailOverlay.tsx";
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};

test("AI product project cards open an app-level full-screen project detail layer", () => {
  const app = appSource();
  const aiProduct = aiProductSource();

  assert.ok(aiProduct.includes("onOpenProjectDetail?: (projectId: AiProductFeaturedProject[\"id\"]) => void;"));
  assert.ok(aiProduct.includes("onOpenProjectDetail?.(project.id)"));
  assert.ok(aiProduct.includes("hasAiProductDetail(project.id)"));
  assert.equal(aiProduct.includes("<ProjectDetailModal"), false);
  assert.ok(app.includes("selectedAiProjectDetailId"));
  assert.ok(app.includes("hasAiProductDetail(projectId)"));
  assert.ok(app.includes("onOpenProjectDetail={openAiProjectDetail}"));
  assert.ok(app.includes("<AIProjectDetailOverlay"));
});

test("AI project detail overlay matches the Figma shell and blocks the old page underneath", () => {
  const overlay = overlaySource();

  assert.ok(overlay.includes("fixed inset-0 z-[99999]"));
  assert.ok(overlay.includes("role=\"dialog\""));
  assert.ok(overlay.includes("aria-modal=\"true\""));
  assert.ok(overlay.includes("bg-[#e6e6e6]"));
  assert.ok(overlay.includes("w-[256px]"));
  assert.ok(overlay.includes("min-w-[256px]"));
  assert.ok(overlay.includes("bg-[#8a8a8a]"));
  assert.equal(overlay.includes("aria-label=\"AI PROJECT 01 content placeholder\""), false);
});

test("AI project detail nav maps the 00-05 Figma sections", () => {
  const overlay = overlaySource();

  [
    'id: "overview"',
    'num: "00"',
    'title: "项目概览"',
    'subtitle: "project overview"',
    'figmaNodeId: "706:12949"',
    'id: "opportunity"',
    'num: "01"',
    'title: "产品机会"',
    'subtitle: "project opportunity"',
    'figmaNodeId: "1789:13764"',
    'id: "strategy"',
    'num: "02"',
    'title: "产品策略"',
    'subtitle: "product strategy"',
    'figmaNodeId: "1789:14060"',
    'id: "architecture"',
    'num: "03"',
    'title: "MVP 架构"',
    'subtitle: "mvp architecture"',
    'figmaNodeId: "1789:14063"',
    'id: "closedLoop"',
    'num: "04"',
    'title: "闭环验证"',
    'subtitle: "Closed-loop"',
    'figmaNodeId: "1789:14196"',
    'id: "iteration"',
    'num: "05"',
    'title: "落地迭代"',
    'subtitle: "Iterative optimization"',
    'figmaNodeId: "1789:14299"',
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(overlay.includes("模块标题3"), false);
  assert.equal(overlay.includes("模块标题4"), false);
  assert.equal(overlay.includes("模块标题5"), false);
});

test("AI project detail nav number state does not paint a background", () => {
  const overlay = overlaySource();
  const navItemStart = overlay.indexOf("function AIProjectNavItem");
  const navItemEnd = overlay.indexOf("function PlaceholderPanel");
  const navItemSource = overlay.slice(navItemStart, navItemEnd);

  assert.ok(navItemStart > -1);
  assert.ok(navItemEnd > navItemStart);
  assert.equal(navItemSource.includes("bg-white/10"), false);
  assert.equal(navItemSource.includes("group-hover:bg-white/[0.06]"), false);
  assert.ok(navItemSource.includes('active ? "text-white/80" : "text-[#c6c6c6]/55"'));
});

test("AI project detail overlay renders the right-side Figma content sections", () => {
  const overlay = overlaySource();

  [
    'data-name="Section - Project List: Nebula Financial"',
    "GEO 共享创作平台",
    "AI PLATFORM",
    "0→1",
    "从企业营销需求到创作者内容履约",
    "01 · 为什么 GEO 内容需要“履约系统化”",
    "AI 搜索改变品牌内容目标",
    "02 · 从理想闭环到可落地 MVP",
    "03 · 双平台协同架构",
    "04 · MVP 功能范围与流程验证",
    "05 · 研发落地与上线迭代",
    "AI 工作流上线对齐",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });
});

test("AI project detail section headings match the shared Figma Section Divider design", () => {
  const overlay = overlaySource();
  const fonts = fontsSource();
  const theme = themeSource();
  const expectedHeadingAssets = [
    {
      sectionId: "opportunity",
      src: "/figma-assets/ai-project-section-title-opportunity.svg",
      sectionNodeId: "1836:16442",
      unionNodeId: "1836:16477",
      width: 338,
    },
    {
      sectionId: "strategy",
      src: "/figma-assets/ai-project-section-title-strategy.svg",
      sectionNodeId: "1837:16478",
      unionNodeId: "1837:16504",
      width: 491,
    },
    {
      sectionId: "architecture",
      src: "/figma-assets/ai-project-section-title-architecture.svg",
      sectionNodeId: "1837:16505",
      unionNodeId: "1837:16531",
      width: 483,
    },
    {
      sectionId: "closedLoop",
      src: "/figma-assets/ai-project-section-title-validation.svg",
      sectionNodeId: "1837:16532",
      unionNodeId: "1837:16566",
      width: 765,
    },
    {
      sectionId: "iteration",
      src: "/figma-assets/ai-project-section-title-iteration.svg",
      sectionNodeId: "1837:16567",
      unionNodeId: "1837:16608",
      width: 838,
    },
  ];

  assert.ok(fonts.includes("font-family: 'Alibaba PuHuiTi 2.0'"));
  assert.ok(fonts.includes("Alibaba PuHuiTi 2.0-Black.otf"));
  assert.ok(existsSync("public/fonts/Alibaba PuHuiTi 2.0-Black.otf"));
  assert.equal(fonts.includes("src: url('/fonts/Alibaba PuHuiTi 2.0-Bold.otf')"), false);
  assert.ok(theme.includes("Alibaba_PuHuiTi_2.0:115_Black"));
  assert.ok(overlay.includes('const AI_PROJECT_SECTION_TITLE_CARET_SRC = "/figma-assets/ai-project-section-title-caret.svg";'));
  assert.ok(overlay.includes("AI_PROJECT_SECTION_TITLE_ASSETS"));
  assert.ok(overlay.includes('data-name="Section Divider"'));
  assert.ok(overlay.includes("pt-[28px]"));
  assert.ok(overlay.includes("gap-[24px]"));
  assert.ok(overlay.includes("gap-[16px]"));
  assert.ok(overlay.includes("gap-[12px]"));
  assert.ok(overlay.includes("text-[36px]"));
  assert.ok(overlay.includes("leading-[30px]"));
  assert.ok(overlay.includes("text-[12px]"));
  assert.ok(overlay.includes("leading-[20px]"));
  assert.ok(overlay.includes('className="pointer-events-none absolute left-0 top-[8px] h-[32px]"'));
  assert.ok(overlay.includes("style={{ width: titleAsset.width }}"));
  expectedHeadingAssets.forEach(({ sectionId, src, sectionNodeId, unionNodeId, width }) => {
    assert.ok(overlay.includes(`${sectionId}: {`), `missing ${sectionId} heading asset`);
    assert.ok(overlay.includes(`src: "${src}"`), `missing ${src}`);
    assert.ok(overlay.includes(`sectionNodeId: "${sectionNodeId}"`), `missing ${sectionNodeId}`);
    assert.ok(overlay.includes(`unionNodeId: "${unionNodeId}"`), `missing ${unionNodeId}`);
    assert.ok(overlay.includes(`width: ${width}`), `missing width ${width}`);
    assert.ok(existsSync(`public${src}`), `missing local Figma SVG ${src}`);
  });
  assert.equal(overlay.includes("ai-project-section-eyebrow-outline"), false);
  assert.equal(overlay.includes("font-['Inter:Black"), false);
  assert.equal(theme.includes(".ai-project-section-eyebrow-outline"), false);
  assert.equal(overlay.includes("mt-[9px] h-[36px] w-[8px]"), false);
  assert.equal(overlay.includes("font-['OPPOSans:Bold',sans-serif] text-[36px] leading-[48px]"), false);
});

test("AI project opportunity section matches the Figma blockquote layout with the market comparison and remaining placeholders", () => {
  const overlay = overlaySource();

  [
    'const AI_PROJECT_OPPORTUNITY_METRIC_SPACER_SRC = "/figma-assets/ai-project-opportunity-metric-spacer.svg";',
    'const AI_PROJECT_OPPORTUNITY_CONCLUSION_SPACER_SRC = "/figma-assets/ai-project-opportunity-conclusion-spacer.svg";',
    'data-node-id="1789:13764"',
    'data-name="Section Container 01"',
    "px-[64px] py-[48px]",
    "gap-[84px]",
    'nodeId="1789:13766"',
    'nodeId="1789:13918"',
    'nodeId="1789:14010"',
    "市场变化",
    "AI 搜索改变品牌内容目标：从“被用户搜索到”，转向“被 AI 理解、引用和推荐”",
    "内容履约链路与断点",
    "在 GEO 场景下，内容不再是单一生产行为，而是一条跨角色的履约链路",
    "产品机会",
    "GEO 内容生产的核心问题，不是“写内容”，而是“如何让内容在完整履约链路中稳定流转”。",
    "链路中的关键角色与行为目标：",
    "在传统协作流程中的履约流程：",
    "结论:困境在于信息层之间的传递误差，导致协作链路断裂。",
    "当这一链路的所有角色，都在具有标准化信息链路的统一平台中，共同执行的履约闭环：",
    "产品机会不是 AI 写作工具，而是一个结构化协作平台",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.ok(overlay.includes("<MarketChangeQuoteDetails />"));

  assert.ok(overlay.includes("<FulfillmentRolesQuoteDetail />"));
  assert.ok(overlay.includes("<FulfillmentBreakpointsQuoteDetail />"));
  assert.ok(overlay.includes("<ProductOpportunityQuoteDetail />"));

  assert.ok(overlay.includes("bg-white"));
  assert.ok(overlay.includes("rounded-[8px]"));
  assert.ok(existsSync("public/figma-assets/ai-project-opportunity-metric-spacer.svg"));
  assert.ok(existsSync("public/figma-assets/ai-project-opportunity-conclusion-spacer.svg"));
  assert.equal(overlay.includes("<QuoteBlock title=\"市场变化\""), false);
  assert.equal(overlay.includes("<PlaceholderPanel height={268} />"), false);
});

test("AI project fulfillment breakpoint quote details replace the two placeholders with Figma modules", () => {
  const overlay = overlaySource();

  [
    'const AI_PROJECT_FULFILLMENT_LABEL_ACCENT_SRC = "/figma-assets/ai-project-fulfillment-label-accent.svg";',
    'const AI_PROJECT_FULFILLMENT_AGENCY_ICON_SRC = "/figma-assets/ai-project-fulfillment-agency-icon.svg";',
    'const AI_PROJECT_FULFILLMENT_ENTERPRISE_ICON_SRC = "/figma-assets/ai-project-fulfillment-enterprise-icon.svg";',
    'const AI_PROJECT_FULFILLMENT_CREATOR_ICON_SRC = "/figma-assets/ai-project-fulfillment-creator-icon.svg";',
    'const AI_PROJECT_FULFILLMENT_TAG_DOT_SRC = "/figma-assets/ai-project-fulfillment-tag-dot.svg";',
    'const AI_PROJECT_FULFILLMENT_FLOW_ARROW_SRC = "/figma-assets/ai-project-fulfillment-flow-arrow.svg";',
    'function FulfillmentRolesQuoteDetail()',
    'function FulfillmentBreakpointsQuoteDetail()',
    'data-node-id="1496:13025"',
    'data-node-id="1496:13103"',
    "代理商（代理多企业）",
    "入驻企业（单企业）",
    "创作者",
    "企业&品牌资料维护",
    "需求整理&派发&归档",
    "履约追踪&验收结算",
    "内容创作",
    "素材调用",
    "进度回传",
    "验收结算跟踪",
    "内容投放",
    "任务定义",
    "内容生产",
    "内容分发",
    "生命周期管理",
    "资料散落在文档、第三方聊天工具中",
    "无法形成标准化的统一任务包",
    "反复沟通，执行偏差大",
    "执行过程无可视化，结果质量难以控制",
    "结果回收慢，履约闭环不完整",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing fulfillment detail ${snippet}`);
  });

  assert.ok(overlay.includes("font-['OPPOSans:Medium']"), "breakpoint titles should use OPPOSans Medium");
  assert.equal(overlay.includes("font-['Alibaba_PuHuiTi_2.0:65_Medium']"), false);

  [
    "public/figma-assets/ai-project-fulfillment-label-accent.svg",
    "public/figma-assets/ai-project-fulfillment-agency-icon.svg",
    "public/figma-assets/ai-project-fulfillment-enterprise-icon.svg",
    "public/figma-assets/ai-project-fulfillment-creator-icon.svg",
    "public/figma-assets/ai-project-fulfillment-tag-dot.svg",
    "public/figma-assets/ai-project-fulfillment-flow-arrow.svg",
  ].forEach((assetPath) => {
    assert.ok(existsSync(assetPath), `missing fulfillment asset ${assetPath}`);
  });

  assert.equal(overlay.includes('<OpportunityPlaceholder nodeId="1789:13925" height={113} name="Quote Detail" />'), false);
  assert.equal(overlay.includes('<OpportunityPlaceholder nodeId="1789:13981" height={142} name="Quote Detail" />'), false);
});

test("AI project product opportunity quote detail replaces the placeholder with the Figma fulfillment loop", () => {
  const overlay = overlaySource();

  [
    'const AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC = "/figma-assets/ai-project-opportunity-person-icon.svg";',
    'const AI_PROJECT_OPPORTUNITY_ENTERPRISE_ICON_SRC = "/figma-assets/ai-project-opportunity-enterprise-icon.svg";',
    'const AI_PROJECT_OPPORTUNITY_ENTERPRISE_SOFT_ICON_SRC = "/figma-assets/ai-project-opportunity-enterprise-soft-icon.svg";',
    'const AI_PROJECT_OPPORTUNITY_CREATOR_ICON_SRC = "/figma-assets/ai-project-opportunity-creator-icon.svg";',
    'const AI_PROJECT_OPPORTUNITY_CREATOR_PLAIN_ICON_SRC = "/figma-assets/ai-project-opportunity-creator-plain-icon.svg";',
    'const AI_PROJECT_OPPORTUNITY_CREATOR_SOFT_ICON_SRC = "/figma-assets/ai-project-opportunity-creator-soft-icon.svg";',
    'const AI_PROJECT_OPPORTUNITY_ARROW_RIGHT_SRC = "/figma-assets/ai-project-opportunity-arrow-right.svg";',
    'const AI_PROJECT_OPPORTUNITY_ARROW_DOWN_SRC = "/figma-assets/ai-project-opportunity-arrow-down.svg";',
    'const AI_PROJECT_OPPORTUNITY_CREATION_ACCENT_SRC = "/figma-assets/ai-project-opportunity-creation-accent.svg";',
    'const AI_PROJECT_OPPORTUNITY_WORKFLOW_DOT_SRC = "/figma-assets/ai-project-opportunity-workflow-dot.svg";',
    'const AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_SRC = "/figma-assets/ai-project-opportunity-workflow-arrow.svg";',
    'const AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_BACK_SRC = "/figma-assets/ai-project-opportunity-workflow-arrow-back.svg";',
    'const AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_DOWN_SRC = "/figma-assets/ai-project-opportunity-workflow-arrow-down.svg";',
    'function OpportunityRoleIcon({ icon, overlapped }: { icon: string; overlapped: boolean })',
    'type OpportunityStepCardTone = "plain" | "soft" | "light";',
    'inset-[-9.38%]',
    'card.tone === "light" ? "bg-[#f1f1f1]"',
    'linear-gradient(270deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)',
    'function ProductOpportunityQuoteDetail()',
    'data-node-id="1491:12561"',
    "维护企业信息库",
    "沉淀品牌资料、产品素材、卖点信息等",
    "标准化任务包",
    "整理目标、关键词、内容边界、交付要求",
    "执行内容创作",
    "创作者接入关键词、素材、指令和文章创作工具",
    "跟踪履约进度&回传执行成果",
    "执行进度回传、修改协同、过程追踪",
    "验收&结算任务",
    "结果验收、结算确认、归档沉淀",
    "Creation",
    "Workflow",
    "接收任务需求包",
    "关键词拓展",
    "内容AI创作",
    "自检与优化",
    "跟踪验收结算",
    "任务进度回传",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing opportunity loop ${snippet}`);
  });

  [
    "icons: [AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC, AI_PROJECT_OPPORTUNITY_ENTERPRISE_SOFT_ICON_SRC],",
    "icons: [AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC, AI_PROJECT_OPPORTUNITY_ENTERPRISE_ICON_SRC, AI_PROJECT_OPPORTUNITY_CREATOR_PLAIN_ICON_SRC],",
    "icons: [AI_PROJECT_OPPORTUNITY_PERSON_ICON_SRC, AI_PROJECT_OPPORTUNITY_ENTERPRISE_SOFT_ICON_SRC, AI_PROJECT_OPPORTUNITY_CREATOR_SOFT_ICON_SRC],",
    'tone: "light",',
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing opportunity role icon variant ${snippet}`);
  });

  [
    "public/figma-assets/ai-project-opportunity-person-icon.svg",
    "public/figma-assets/ai-project-opportunity-enterprise-icon.svg",
    "public/figma-assets/ai-project-opportunity-enterprise-soft-icon.svg",
    "public/figma-assets/ai-project-opportunity-creator-icon.svg",
    "public/figma-assets/ai-project-opportunity-creator-plain-icon.svg",
    "public/figma-assets/ai-project-opportunity-creator-soft-icon.svg",
    "public/figma-assets/ai-project-opportunity-arrow-right.svg",
    "public/figma-assets/ai-project-opportunity-arrow-down.svg",
    "public/figma-assets/ai-project-opportunity-creation-accent.svg",
    "public/figma-assets/ai-project-opportunity-workflow-dot.svg",
    "public/figma-assets/ai-project-opportunity-workflow-arrow.svg",
    "public/figma-assets/ai-project-opportunity-workflow-arrow-back.svg",
    "public/figma-assets/ai-project-opportunity-workflow-arrow-down.svg",
  ].forEach((assetPath) => {
    assert.ok(existsSync(assetPath), `missing opportunity asset ${assetPath}`);
  });

  assert.ok(readFileSync("public/figma-assets/ai-project-opportunity-enterprise-icon.svg", "utf8").includes("#E9E9E9"));
  assert.ok(readFileSync("public/figma-assets/ai-project-opportunity-enterprise-soft-icon.svg", "utf8").includes("#EDEDED"));
  assert.ok(readFileSync("public/figma-assets/ai-project-opportunity-creator-plain-icon.svg", "utf8").includes("#E9E9E9"));
  assert.ok(readFileSync("public/figma-assets/ai-project-opportunity-creator-soft-icon.svg", "utf8").includes("#EDEDED"));
  assert.ok(readFileSync("public/figma-assets/ai-project-opportunity-creator-icon.svg", "utf8").includes("#F1F1F1"));

  assert.ok(overlay.includes("src={AI_PROJECT_OPPORTUNITY_WORKFLOW_ARROW_DOWN_SRC}"));
  assert.equal(overlay.includes('<OpportunityPlaceholder nodeId="1789:14767" height={268} name="Quote Detail" />'), false);
});

test("AI project market change quote details replaces the placeholder with the Figma SEO and GEO comparison", () => {
  const overlay = overlaySource();

  [
    'const AI_PROJECT_MARKET_SEO_IMAGE_SRC = "/figma-assets/ai-project-market-seo.png";',
    'const AI_PROJECT_MARKET_GEO_IMAGE_SRC = "/figma-assets/ai-project-market-geo.png";',
    'const AI_PROJECT_MARKET_TAB_CORNER_SRC = "/figma-assets/ai-project-market-tab-corner.svg";',
    'const AI_PROJECT_MARKET_TAB_CORNER_FLIPPED_SRC = "/figma-assets/ai-project-market-tab-corner-flipped.svg";',
    'const AI_PROJECT_MARKET_GOAL_ACCENT_SRC = "/figma-assets/ai-project-market-goal-accent.svg";',
    "function MarketChangePanelBorder()",
    'className="pointer-events-none absolute inset-0 z-[20] box-border rounded-[8px] border border-[#d2d2d2]"',
    'function MarketChangeQuoteDetails()',
    'data-node-id="780:12954"',
    'data-name="Quote Details"',
    '搜索时代 (SEO)',
    'AI问答时代 (GEO)',
    "内容",
    "搜索",
    "被动曝光",
    "理解",
    "引用",
    "AI主动推荐",
    "被用户搜索到",
    "关键词排名/搜索结果曝光",
    "被AI理解、引用和推荐",
    "进入AI回答/成为可信来源/获得推荐机会",
    "<MarketChangeQuoteDetails />",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing market change detail ${snippet}`);
  });

  const marketChangeSource = overlay.slice(
    overlay.indexOf("function MarketChangeQuoteDetails"),
    overlay.indexOf("function FulfillmentRoleIcon"),
  );
  assert.equal((marketChangeSource.match(/<MarketChangePanelBorder \/>/g) ?? []).length, 2);
  assert.equal(marketChangeSource.includes("rounded-[8px] border border-[#d2d2d2] bg-[#e2e2e2]"), false);

  [
    "public/figma-assets/ai-project-market-seo.png",
    "public/figma-assets/ai-project-market-geo.png",
    "public/figma-assets/ai-project-market-tab-corner.svg",
    "public/figma-assets/ai-project-market-tab-corner-flipped.svg",
    "public/figma-assets/ai-project-market-goal-accent.svg",
  ].forEach((assetPath) => {
    assert.ok(existsSync(assetPath), `missing market change asset ${assetPath}`);
  });

  assert.equal(overlay.includes('<OpportunityPlaceholder nodeId="1789:13768" height={317} name="Quote Details" />'), false);
});

test("AI project strategy section matches the Figma layout with the interactive MVP strategy panel", () => {
  const overlay = overlaySource();

  [
    'const AI_PROJECT_STRATEGY_BULLET_SRC = "/figma-assets/ai-project-strategy-bullet.svg";',
    'data-node-id="1789:14060"',
    'data-name="Section Container 02"',
    "px-[64px] py-[48px]",
    "gap-[84px]",
    "02 · 从理想闭环到可落地 MVP",
    "在搭建「需求打包 → 任务派发 → 创作执行 → 进度回传」的最小流程 Demo 后",
    'const [activeStrategyTabId, setActiveStrategyTabId] = useState<AIProjectStrategyTabId>("strategy01");',
    "AI_PROJECT_STRATEGY_TABS",
    'data-node-id="1788:14286"',
    'data-name="MVP"',
    'tabGroupNodeId: "1788:13624"',
    'tabGroupNodeId: "1788:13966"',
    'tabGroupNodeId: "1788:14049"',
    "data-node-id={activeStrategyTab.tabGroupNodeId}",
    'data-name="Tab Group"',
    'gradientStop: "0.01%"',
    'gradientStop: "50%"',
    'gradientStop: "99.99%"',
    "AI_PROJECT_STRATEGY_TAB_GROUP_BACKGROUND",
    "--strategy-gradient-stop",
    "const strategyTabGroupStyle",
    "background: AI_PROJECT_STRATEGY_TAB_GROUP_BACKGROUND",
    'activeTabId: AIProjectStrategyTabId;',
    'const isFixedInactiveWidth = activeTabId === "strategy01" && tab.id === "strategy02";',
    'isActive ? "min-w-px flex-[1_0_0] justify-between" :',
    'isFixedInactiveWidth ? "w-[220px]" : ""',
    "pl-[32px] pr-[20px] py-[16px]",
    "transition-[--strategy-gradient-stop] duration-500 ease-[cubic-bezier(0.52,0.54,0.04,1)]",
    "aria-pressed={isActive}",
    "标准化 vs 多样化",
    "生成效率 vs 内容质量",
    "传统平台 vs AI 原生",
    "原型预览",
    "gap-[12px]",
    "产品策略01：模块化任务协议",
    "产品策略02：质量方法资产化",
    "产品策略03：AI 原生履约流",
    'contentHeightClass: "h-[560px]"',
    'leftColumnBackgroundClass: ""',
    'layoutClass: "shrink-0 h-[192px] gap-[4px] px-[24px] pb-[16px] pt-[24px]"',
    'layoutClass: "shrink-0 h-[144px] gap-[4px] px-[24px] pb-[16px] pt-[24px]"',
    'layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[24px]"',
    'layoutClass: "shrink-0 gap-[4px] px-[24px] pb-[20px] pt-[24px]"',
    'layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[18px]"',
    'layoutClass: "shrink-0 px-[24px] py-[12px]"',
    'layoutClass: "shrink-0 pl-[24px] pr-[20px] py-[12px]"',
    'leftTitlePaddingClass: "pl-[92px]"',
    "activeStrategyTab.leftColumnBackgroundClass",
    "activeStrategyTab.leftTitlePaddingClass",
    "block.layoutClass",
    "feature.layoutClass",
    "问题发现：统一表单无法覆盖不同 GEO 任务复杂度",
    "问题发现：AI 提升产量，但内容质量不可控",
    "因此，从而可以推断 GEO 内容生产的难点并不只是“写出来”",
    "问题发现：传统平台只能管理任务，不能降低链路摩擦",
    "系统功能落点",
    "企业信库 / 产品档案引用",
    "文库收藏",
    "AI需求解析",
    "创作brief生成",
    "质量自检",
    "进度回传",
    "bg-[#e2e2e2]",
    "border-[#d2d2d2]",
    "w-[864px]",
    "rounded-[8px]",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  [
    "public/figma-assets/ai-project-strategy-preview-divider.svg",
    "public/figma-assets/ai-project-strategy-preview-arrow.svg",
    "public/figma-assets/ai-project-strategy-top-divider.svg",
    "public/figma-assets/ai-project-strategy-section-divider.svg",
    "public/figma-assets/ai-project-strategy-bullet.svg",
    "public/figma-assets/ai-project-strategy-column-divider.svg",
    "public/figma-assets/ai-project-strategy-side-divider.svg",
    "public/figma-assets/ai-project-strategy-column-divider-ai.svg",
  ].forEach((assetPath) => {
    assert.ok(existsSync(assetPath), `missing ${assetPath}`);
  });

  assert.equal(overlay.includes("<PlaceholderPanel height={533} />"), false);
  assert.equal(overlay.includes('data-node-id="1789:14769"'), false);
  assert.equal(overlay.includes("inactiveWidth:"), false);
  assert.equal(overlay.includes("activeWidth:"), false);
  assert.equal(overlay.includes("const strategyTabWidth = isActive ? tab.activeWidth : tab.inactiveWidth;"), false);
  assert.equal(overlay.includes("style={{ width: strategyTabWidth }}"), false);
  assert.equal(overlay.includes("strategyTabHighlightStyle"), false);
  assert.equal(overlay.includes("pointer-events-none absolute inset-y-0"), false);
  assert.equal(overlay.includes("isActive ? \"justify-between bg-[#d2d2d2]\""), false);
  assert.equal(overlay.includes('contentHeightClass: "h-[476px]"'), false);
  assert.equal(overlay.includes('leftColumnBackgroundClass: "bg-[rgba(221,221,221,0.5)]"'), false);
  assert.equal(overlay.includes("bg-[rgba(221,221,221,0.5)]"), false);
  assert.equal(overlay.includes('layoutClass: "shrink-0 h-[192px] gap-[4px] px-[24px] pb-[16px] pt-[20px]"'), false);
  assert.equal(overlay.includes('layoutClass: "shrink-0 h-[144px] gap-[4px] px-[24px] pb-[16px] pt-[20px]"'), false);
  assert.equal(overlay.includes('layoutClass: "min-h-px flex-[1_0_0] gap-[4px] px-[24px] pb-[16px] pt-[20px]"'), false);
  assert.equal(overlay.includes("因此， GEO 内容生产"), false);
  assert.equal(overlay.includes("创作BRIEF生成"), false);
});

test("AI project strategy tab group animates the Figma gradient stop across the whole bar", () => {
  const overlay = overlaySource();
  const theme = themeSource();

  assert.ok(theme.includes("@property --strategy-gradient-stop"));
  assert.ok(theme.includes('syntax: "<percentage>"'));
  assert.ok(theme.includes("initial-value: 0.01%"));
  assert.ok(overlay.includes("linear-gradient(90deg, rgba(210, 210, 210, 0.25) 0%, #D2D2D2 var(--strategy-gradient-stop), rgba(210, 210, 210, 0.25) 100%), #E6E6E6"));
  assert.ok(overlay.includes("'--strategy-gradient-stop': activeStrategyTab.gradientStop"));
});

test("AI project strategy MVP switches tabs and lower content as one smart-animated variant", () => {
  const overlay = overlaySource();

  [
    'import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";',
    "const AI_PROJECT_STRATEGY_MVP_TRANSITION = { duration: 0.5, ease: [0.52, 0.54, 0.04, 1] } as const;",
    "const strategyPanelMotionTransition = shouldReduceMotion ? { duration: 0 } : AI_PROJECT_STRATEGY_MVP_TRANSITION;",
    "<LayoutGroup id=\"ai-project-strategy-mvp-tabs\">",
    "layout",
    "transition={strategyPanelMotionTransition}",
    'layoutId="ai-project-strategy-preview-control"',
    "function StrategyMvpContentFrame({",
    "<AnimatePresence initial={false}>",
    "const contentLayerKey = `${activeStrategyTab.id}-${strategyViewMode}`;",
    "type StrategyMvpContentLayer",
    "const previousContentLayerRef = useRef<StrategyMvpContentLayer>(currentContentLayer);",
    "const [exitingContentLayer, setExitingContentLayer] = useState<StrategyMvpContentLayer | null>(null);",
    "useLayoutEffect(() => {",
    "setExitingContentLayer({ ...previousContentLayer, exiting: true });",
    "const contentLayers = exitingContentLayer ? [exitingContentLayer, currentContentLayer] : [currentContentLayer];",
    "key={layer.key}",
    "absolute inset-0",
    "initial={{ opacity: layer.exiting ? 1 : 0 }}",
    "animate={{ opacity: layer.exiting ? 0 : 1 }}",
    "exit={{ opacity: 0 }}",
    "transition={strategyPanelMotionTransition}",
    'style={{ pointerEvents: layer.exiting ? "none" : "auto" }}',
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(overlay.includes("const isStrategyPreviewMode = layer.strategyViewMode === \"preview\";") && overlay.includes("function StrategyMvpContentFrame({"), true);
});

test("AI project strategy topbar labels are not scaled by layout animation", () => {
  const overlay = overlaySource();
  const strategyTabButtonSource = overlay.slice(
    overlay.indexOf("function StrategyTabButton"),
    overlay.indexOf("function StrategyHorizontalDivider"),
  );

  [
    "<motion.span",
    'layout="position"',
    "transition={strategyPanelMotionTransition}",
    "<motion.p",
  ].forEach((snippet) => {
    assert.ok(strategyTabButtonSource.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(strategyTabButtonSource.includes("<motion.button\n        layout\n"), false);
  assert.equal(strategyTabButtonSource.includes("<motion.div layout layoutId=\"ai-project-strategy-preview-control\""), false);
});

test("AI project strategy topbar uses the full quote container as the tab click target while preview toggle stays isolated", () => {
  const overlay = overlaySource();
  const strategyTabButtonSource = overlay.slice(
    overlay.indexOf("function StrategyTabButton"),
    overlay.indexOf("function StrategyHorizontalDivider"),
  );
  const quoteContainerOpening = strategyTabButtonSource.slice(
    strategyTabButtonSource.indexOf("<motion.div"),
    strategyTabButtonSource.indexOf('data-name="Quote Container"'),
  );

  [
    "onClick={onClick}",
    "onKeyDown={(event) => {",
    "if (event.target !== event.currentTarget) return;",
    "tabIndex={0}",
    'role="button"',
    "aria-pressed={isActive}",
    "cursor-pointer",
  ].forEach((snippet) => {
    assert.ok(quoteContainerOpening.includes(snippet), `missing full-container click target ${snippet}`);
  });

  assert.equal((strategyTabButtonSource.match(/onClick=\{onClick\}/g) ?? []).length, 1);
  assert.equal(strategyTabButtonSource.includes("<motion.button\n        layout=\"position\""), false);
  assert.ok(overlay.includes("event.stopPropagation();"));
});

test("AI project strategy preview toggle follows the updated Figma component interaction and preview-state content", () => {
  const overlay = overlaySource();

  [
    'import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";',
    'type AIProjectStrategyViewMode = "strategy" | "preview";',
    "const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_TRANSITION = { duration: 0.5, ease: [0.52, 0.54, 0.04, 1] } as const;",
    'const AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_OFF_LEADING_SRC = "/figma-assets/ai-project-strategy-preview-switch-handle-off-leading.svg";',
    'const AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_OFF_TRAILING_SRC = "/figma-assets/ai-project-strategy-preview-switch-handle-off-trailing.svg";',
    'const AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_ON_LEADING_SRC = "/figma-assets/ai-project-strategy-preview-switch-handle-on-leading.svg";',
    'const AI_PROJECT_STRATEGY_PREVIEW_SWITCH_HANDLE_ON_TRAILING_SRC = "/figma-assets/ai-project-strategy-preview-switch-handle-on-trailing.svg";',
    'type StrategyPreviewToggleState = "off" | "on";',
    "const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_TRACK_MOTION",
    "const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_AXIS_MOTION",
    "const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_MOTION",
    'off: { backgroundColor: "#dadada" }',
    'on: { backgroundColor: "#85b7fe" }',
    "off: { x: -15.6 }",
    "on: { x: 3.6 }",
    "off: { x: 2.55 }",
    "on: { x: 22.65 }",
    'function StrategyPreviewToggleButton({',
    'function StrategyPreviewPill({',
    "mode,",
    "onToggle,",
    'aria-pressed={mode === "preview"}',
    'aria-label={mode === "preview" ? "切换到策略内容" : "切换到预览内容"}',
    'data-node-id="1958:14441"',
    'data-preview-mode={mode}',
    'data-preview-toggle-state={toggleState}',
    "event.stopPropagation();",
    "onToggle();",
    'group/strategy-preview-toggle',
    "h-[24px]",
    "w-[44.1px]",
    "rounded-[16.8px]",
    "w-[56.1px]",
    "size-[15px]",
    "size-[18.9px]",
    'data-node-id={toggleState === "on" ? "1958:14455" : "1958:14448"}',
    "overflow-hidden",
    "rounded-[13.2px]",
    "bg-[#e2e2e2]",
    'const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_STROKE_BACKGROUND = "linear-gradient(180deg, #FFFFFF 0%, #C4C4C4 100%)";',
    'const AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_SHADOW = "0px 0.6px 1.2px -0.45px rgba(0,0,0,0.54), 0.45px 4.2px 4.05px 0.75px rgba(0,0,0,0.22)";',
    "style={{ boxShadow: AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_SHADOW }}",
    "style={{ background: AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_STROKE_BACKGROUND }}",
    "inset-[1px]",
    "rounded-[12.2px]",
    "<motion.button",
    "<motion.div",
    "animate={AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_TRACK_MOTION[toggleState]}",
    "animate={AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_AXIS_MOTION[toggleState]}",
    "animate={AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_MOTION[toggleState]}",
    "const shouldReduceMotion = useReducedMotion();",
    "const toggleMotionTransition = shouldReduceMotion ? { duration: 0 } : AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_TRANSITION;",
    "transition={toggleMotionTransition}",
    'mode === "preview" ? "on" : "off"',
    "const strategyViewMode = strategyViewModesByTab[activeStrategyTabId];",
    "setStrategyViewModesByTab((currentModes) => ({",
    "const isStrategyPreviewMode = layer.strategyViewMode === \"preview\";",
    '<StrategyPreviewContent activeTab={layer.activeStrategyTab} />',
    'data-node-id="1788:14294"',
    'data-name="从理想闭环到可落地 MVP-原型"',
    'data-preview-variant-node-id={activeTab.previewVariantNodeId}',
    'previewVariantNodeId: "1788:14295"',
    'previewVariantNodeId: "1788:14357"',
    'previewVariantNodeId: "1788:14419"',
    "w-[117px]",
    "企业信库",
    "step 01",
    "step 02",
    "step 03",
    "step 04",
    "需求打包",
    "远程填单",
    "打包状态",
    "bg-[rgba(255,255,255,0.25)]",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(overlay.includes("AI_PROJECT_STRATEGY_PREVIEW_TOGGLE_THUMB_INNER_SHADOW"), false);
  assert.equal(overlay.includes('data-name="按钮内阴影"'), false);

  const previewPillSource = overlay.slice(overlay.indexOf("function StrategyPreviewPill"), overlay.indexOf("function StrategyBullet"));
  const previewToggleSource = overlay.slice(overlay.indexOf("function StrategyPreviewToggleButton"), overlay.indexOf("function StrategyPreviewPill"));
  [
    "public/figma-assets/ai-project-strategy-preview-switch-handle-off-leading.svg",
    "public/figma-assets/ai-project-strategy-preview-switch-handle-off-trailing.svg",
    "public/figma-assets/ai-project-strategy-preview-switch-handle-on-leading.svg",
    "public/figma-assets/ai-project-strategy-preview-switch-handle-on-trailing.svg",
  ].forEach((assetPath) => {
    assert.ok(existsSync(assetPath), `missing ${assetPath}`);
  });
  assert.equal(previewPillSource.includes("opacity-0"), false);
  assert.equal(previewToggleSource.includes("onPointerEnter"), false);
  assert.equal(previewToggleSource.includes("onPointerLeave"), false);
  assert.equal(previewToggleSource.includes("onFocus"), false);
  assert.equal(previewToggleSource.includes("onBlur"), false);
  assert.equal(previewPillSource.includes('onPointerLeave={() => moveToVisualState("initial")}'), false);
  assert.equal(previewPillSource.includes("function moveToVisualState"), false);
  assert.equal(previewPillSource.includes("setTimeout"), false);
  assert.equal(previewPillSource.includes("hoverTimerRef"), false);
  assert.equal(previewPillSource.includes('data-node-id="1943:14839"'), false);
  assert.equal(previewPillSource.includes("left: 69"), false);
  assert.equal(previewPillSource.includes("left: 1, top: 1, width: 91"), false);
  assert.equal(previewToggleSource.includes("h-[48px]"), false);
  assert.equal(previewToggleSource.includes("w-[93px]"), false);
  assert.equal(previewToggleSource.includes("size-[40px]"), false);
  assert.equal(overlay.includes('"transition"'), false);
  assert.equal(overlay.includes("AI_PROJECT_STRATEGY_PREVIEW_MOTION_MS"), false);
});

test("AI project strategy preview mode is stored independently for each strategy tab", () => {
  const overlay = overlaySource();

  [
    "const DEFAULT_STRATEGY_VIEW_MODES: Record<AIProjectStrategyTabId, AIProjectStrategyViewMode> = {",
    'strategy01: "strategy",',
    'strategy02: "strategy",',
    'strategy03: "strategy",',
    "const [strategyViewModesByTab, setStrategyViewModesByTab] = useState<Record<AIProjectStrategyTabId, AIProjectStrategyViewMode>>(DEFAULT_STRATEGY_VIEW_MODES);",
    "const strategyViewMode = strategyViewModesByTab[activeStrategyTabId];",
    "setStrategyViewModesByTab((currentModes) => ({",
    "...currentModes,",
    '[activeStrategyTabId]: currentModes[activeStrategyTabId] === "strategy" ? "preview" : "strategy",',
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(overlay.includes('const [strategyViewMode, setStrategyViewMode] = useState<AIProjectStrategyViewMode>("strategy");'), false);
  assert.equal(overlay.includes('setStrategyViewMode((currentMode) => (currentMode === "strategy" ? "preview" : "strategy"))'), false);
});

test("AI project architecture section replaces the placeholder with the interactive dual-platform diagram", () => {
  const overlay = overlaySource();
  const theme = themeSource();
  const architectureSource = overlay.slice(
    overlay.indexOf("function ArchitectureSection"),
    overlay.indexOf("function ClosedLoopSection"),
  );
  const architectureDiagramSource = overlay.slice(
    overlay.indexOf("function ArchitectureDualPlatformDiagram"),
    overlay.indexOf("function ArchitectureSection"),
  );
  const architectureBulletSource = overlay.slice(
    overlay.indexOf("function ArchitectureBulletIcon"),
    overlay.indexOf("function ArchitectureFeatureChip"),
  );
  const architecturePanelSource = overlay.slice(
    overlay.indexOf("function ArchitecturePlatformPanel"),
    overlay.indexOf("function ArchitectureDataPill"),
  );
  const architectureDataLayerSource = overlay.slice(
    overlay.indexOf("function ArchitectureDataPill"),
    overlay.indexOf("function ArchitectureHotspot"),
  );

  [
    'const AI_PROJECT_ARCHITECTURE_METRIC_SPACER_SRC = "/figma-assets/ai-project-architecture-metric-spacer.svg";',
    'data-node-id="1789:14063"',
    'data-name="Section Container 03"',
    "px-[64px] py-[48px]",
    "gap-[84px]",
    "03 · 双平台协同架构",
    "基于 MVP 的最小履约闭环，我将平台拆解为「任务市场与履约平台」与「创作者执行工作台」两层系统",
    'data-node-id="1789:14065"',
    'data-name="Blockquote"',
    'data-node-id="1789:14066"',
    "在最小流程 Demo 中，我发现 GEO 内容履约同时包含两类目标：",
    "需求侧",
    "创作侧",
    "因此，我将这套流程拆成两个协同系统。",
    'data-node-id="1789:14771"',
    'data-name="Quote Detail"',
    "function ArchitectureDualPlatformDiagram",
    'data-node-id="1850:16609"',
    "ARCHITECTURE_PLATFORMS",
    "function ArchitectureRail",
    "function ArchitectureBulletIcon",
    "function ArchitecturePlatformPanel",
    "function ArchitectureDataLayer",
    "function ArchitectureFeatureChip",
    "ArchitectureHotspot",
    "ai-project-architecture-shell",
    "ai-project-architecture-rail",
    "ai-project-architecture-platform-surface",
    "ai-project-architecture-data-layer",
    "ai-project-architecture-feature-chip",
    "getHoverTargetProps",
    "data-architecture-active",
    "data-architecture-hover-target",
    '"task", "AITIME TASK hover state"',
    '"data", "数据层 hover state"',
    '"create", "AITIME CREATE hover state"',
    "onPointerEnter",
    "onPointerLeave",
    "onClick",
    "onFocus",
    "onBlur",
    "tabIndex: 0",
    'role: "group"',
    "AITIME TASK",
    "AITIME CREATE",
    "平台定义：任务市场与履约平台",
    "平台定义：创作者执行工作台",
    "同步 | 需求包内容",
    "信息同步流",
    "回传 | 任务数据包",
    "企业信库 (含产品档案）",
    "接单状态",
    "执行节点动态",
    "自检结果",
    "分发质量",
    "验收状态",
    "h-[343px]",
    "w-[864px]",
    "left-[12px]",
    "left-[312px]",
    "left-[324px]",
    "left-[528px]",
    "left-[852px]",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  [
    ".ai-project-architecture-shell",
    ".ai-project-architecture-rail",
    ".ai-project-architecture-platform-surface",
    ".ai-project-architecture-data-layer",
    ".ai-project-architecture-feature-chip",
    ".ai-project-architecture-rail-hover-gradient",
    ".ai-project-architecture-rail-data-gradient",
    '[data-architecture-hover-target="task"][data-architecture-active="true"] ~ .ai-project-architecture-platforms',
    '[data-architecture-hover-target="data"][data-architecture-active="true"] ~ .ai-project-architecture-platforms',
    '[data-architecture-hover-target="create"][data-architecture-active="true"] ~ .ai-project-architecture-platforms',
    '[data-architecture-hover-target]:focus-visible',
    "background-image: linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25));",
    "background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%);",
    "background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);",
    "background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(255, 255, 255, 0.024) 100%);",
    '[data-architecture-hover-target="task"][data-architecture-active="true"] ~ .ai-project-architecture-platforms [data-architecture-rail-hover-target~="task"] .ai-project-architecture-rail-hover-gradient',
    '[data-architecture-hover-target="data"][data-architecture-active="true"] ~ .ai-project-architecture-platforms [data-architecture-rail-hover-target~="data"] .ai-project-architecture-rail-data-gradient',
    '[data-architecture-hover-target="create"][data-architecture-active="true"] ~ .ai-project-architecture-platforms [data-architecture-rail-hover-target~="create"] .ai-project-architecture-rail-hover-gradient',
    "opacity: 0.05;",
  ].forEach((snippet) => {
    assert.ok(theme.includes(snippet), `missing theme ${snippet}`);
  });

  assert.ok(existsSync("public/figma-assets/ai-project-architecture-metric-spacer.svg"));
  assert.equal(architectureSource.includes('aria-hidden="true"'), false);
  assert.equal(overlay.includes("<PlaceholderPanel height={343} />"), false);
  assert.equal(overlay.includes("AI_PROJECT_ARCHITECTURE_DEFAULT_SRC"), false);
  assert.equal(overlay.includes("ARCHITECTURE_STATE_IMAGES"), false);
  assert.equal(overlay.includes("ArchitectureStateImageLayer"), false);
  assert.equal(overlay.includes("ai-project-architecture-hover-"), false);
  assert.ok(architectureDiagramSource.includes('<ArchitectureHotspot className="left-0 top-0 h-full w-[324px]"'));
  assert.ok(architectureDiagramSource.includes('<ArchitectureHotspot className="left-[324px] top-0 h-full w-[192px]"'));
  assert.ok(architectureDiagramSource.includes('<ArchitectureHotspot className="left-[516px] top-0 h-full w-[348px]"'));
  assert.ok(architectureDiagramSource.includes('<ArchitectureRail className="left-0 top-0" hoverTargets={["task"]} mirrored />'));
  assert.ok(architectureDiagramSource.includes('<ArchitectureRail className="left-[312px] top-0" hoverTargets={["task", "data"]} />'));
  assert.ok(architectureDiagramSource.includes('<ArchitectureRail className="left-[516px] top-0" hoverTargets={["data", "create"]} mirrored />'));
  assert.ok(architectureDiagramSource.includes('<ArchitectureRail className="left-[852px] top-0" hoverTargets={["create"]} />'));
  assert.ok(overlay.includes('data-architecture-rail-hover-target={railHoverTarget}'));
  assert.ok(overlay.includes('fillOpacity={0.1}'));
  assert.ok(overlay.includes('<stop offset="1" stopColor="#ffffff" stopOpacity={0.25} />'));
  assert.equal(overlay.includes("ai-project-architecture-rail-gradient-start"), false);
  assert.equal(overlay.includes("ai-project-architecture-rail-gradient-end"), false);
  assert.equal(theme.includes('[data-architecture-hover-target="task"][data-architecture-active="true"] ~ .ai-project-architecture-platforms .ai-project-architecture-rail,'), false);
  assert.equal(theme.includes('[data-architecture-hover-target="data"][data-architecture-active="true"] ~ .ai-project-architecture-platforms .ai-project-architecture-rail,'), false);
  assert.equal(theme.includes('[data-architecture-hover-target="create"][data-architecture-active="true"] ~ .ai-project-architecture-platforms .ai-project-architecture-rail,'), false);
  assert.ok(architectureBulletSource.includes("AI_PROJECT_ARCHITECTURE_METRIC_SPACER_SRC"));
  assert.ok(architectureBulletSource.includes("<ArchitectureBulletIcon />"));
  assert.ok(architectureBulletSource.includes("size-[8px]"));
  assert.ok(architectureBulletSource.includes("<svg"));
  assert.ok(architectureBulletSource.includes("data-architecture-description-row"));
  assert.ok(architectureBulletSource.includes("h-[24px]"));
  assert.ok(architectureBulletSource.includes("whitespace-nowrap"));
  assert.ok(architectureBulletSource.includes("overflow-visible"));
  assert.ok(architectureBulletSource.includes("tracking-[0px]"));
  assert.equal(architectureBulletSource.includes('opacity="0.25"'), false);
  assert.ok(architecturePanelSource.includes("absolute ${platform.className} h-[343px]"));
  assert.ok(architecturePanelSource.includes("pb-[12px]"));
  assert.ok(architecturePanelSource.includes("absolute left-0 top-0 flex h-[80px]"));
  assert.ok(architecturePanelSource.includes("px-[24px] py-[16px]"));
  assert.ok(architecturePanelSource.includes("absolute left-0 top-[80px] h-[3px]"));
  assert.ok(architecturePanelSource.includes("absolute left-0 top-[83px] h-[120px]"));
  assert.ok(architecturePanelSource.includes("absolute left-0 top-[203px] h-0"));
  assert.ok(architecturePanelSource.includes("border-[#5e5e5e]"));
  assert.equal(architecturePanelSource.includes("border-[#dedede]"), false);
  assert.ok(architecturePanelSource.includes("absolute left-0 top-[203px] h-[128px]"));
  assert.ok(architecturePanelSource.includes("absolute left-[24px] top-[24px] h-[24px]"));
  assert.ok(architecturePanelSource.includes("absolute left-[24px] top-[52px]"));
  assert.ok(architecturePanelSource.includes("w-[calc(100%-48px)]"));
  assert.equal(architecturePanelSource.includes("<span>核心业务：</span>"), false);
  assert.ok(architectureDataLayerSource.includes("absolute left-[324px] top-[40px] h-[263px] w-[192px]"));
  assert.ok(architectureDataLayerSource.includes("absolute left-[16px] top-[24px] h-[66px] w-[160px]"));
  assert.ok(architectureDataLayerSource.includes("absolute left-0 top-[119.5px] flex h-[24px] w-[192px]"));
  assert.ok(architectureDataLayerSource.includes("absolute left-[16px] top-[173px] h-[66px] w-[160px]"));
  assert.ok(architectureDataLayerSource.includes("h-[16px] w-[101px]"));
  assert.ok(architectureDataLayerSource.includes("h-[58px] w-[160px]"));
  assert.ok(architectureDataLayerSource.includes("border-[0.6px] border-dashed border-[#aeaeae]"));
  assert.ok(architectureDataLayerSource.includes("text-[10px] leading-[16px]"));
  assert.ok(architectureDataLayerSource.includes("text-[12px] leading-[16px]"));
  assert.equal(architectureDataLayerSource.includes("justify-between overflow-hidden bg-[#e2e2e2] py-[24px]"), false);
  assert.equal(architectureBulletSource.includes("border-y-[4px]"), false);
  assert.equal(architectureBulletSource.includes("border-l-[6px]"), false);
});

test("AI project closed-loop section matches the Figma layout with two placeholders", () => {
  const overlay = overlaySource();

  [
    'data-node-id="1789:14196"',
    'data-name="Section Container 04"',
    "px-[64px] py-[48px]",
    "gap-[84px]",
    "04 · MVP 功能范围与流程验证",
    "在明确双平台边界后，我进一步将 MVP 范围收敛到三条关键任务流中，用可点击 Demo 验证最小履约闭环是否成立。",
    'data-node-id="1789:14775"',
    'data-name="Section Details"',
    "h-[116px]",
    "w-[864px]",
    'data-node-id="1789:14280"',
    'data-name="Blockquote"',
    'data-node-id="1789:14281"',
    'data-name="Quote Container"',
    'data-node-id="1789:14283"',
    'data-name="Divider Icon"',
    'data-node-id="1789:14286"',
    "Flow 01：需求打包与任务派发",
    'metricNodeIds: ["1789:14288", "1789:14290"]',
    "bg-[#d0e1cc]",
    "text-[#57814d]",
    "size-[20px]",
    "rounded-[2px]",
    "验证企业/代理商能否把分散、不完整、不标准的营销需求，整理成创作者可以接单、理解、执行和验收的任务包。",
    'data-node-id="1789:14777"',
    'data-name="Quote Details"',
    "h-[596px]",
    "overflow-clip",
    "border border-solid border-[#d2d2d2]",
    "bg-[#e2e2e2]",
    "rounded-[8px]",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(overlay.includes("<PlaceholderPanel height={116} />"), false);
  assert.equal(overlay.includes("<PlaceholderPanel height={596} />"), false);
  assert.equal(overlay.includes("<QuoteBlock title=\"Flow 01：需求打包与任务派发\""), false);
  assert.equal(overlay.includes('data-node-id="1789:14777" data-name="Quote Details" aria-hidden="true" />'), false);
});

test("AI project closed-loop section replaces the first placeholder with the hoverable Figma flow states", () => {
  const overlay = overlaySource();
  const closedLoopSource = overlay.slice(
    overlay.indexOf("type ClosedLoopFlowId"),
    overlay.indexOf("function ClosedLoopSection"),
  );

  [
    'type ClosedLoopFlowId = "01" | "02" | "03"',
    "const CLOSED_LOOP_FLOW_STEPS",
    "const CLOSED_LOOP_FLOW_GROUPS",
    "function ClosedLoopFlowValidation",
    'selectedFlow: ClosedLoopFlowId;',
    'onSelectFlow: (flowId: ClosedLoopFlowId) => void;',
    'const [hoveredFlow, setHoveredFlow] = useState<ClosedLoopFlowId | null>(null);',
    "function getClosedLoopFlowVisualState",
    'aria-label="MVP 功能范围与流程验证关键任务流"',
    'data-node-id="2093:21988"',
    'data-node-id={flow.nodeId}',
    'data-name={`flow ${flow.id}`}',
    'data-flow-selected={selectedFlow === flow.id ? "true" : undefined}',
    'data-flow-hovered={hoveredFlow === flow.id ? "true" : undefined}',
    'onMouseEnter={() => setHoveredFlow(flow.id)}',
    'onClick={() => onSelectFlow(flow.id)}',
    'isArrowActive={selectedFlow === arrow.flowId}',
    "<ClosedLoopFlowArrow",
    "<ClosedLoopFlowStepCard",
    "需求打包",
    "任务派发",
    "任务同步",
    "创作执行",
    "进度回传",
  ].forEach((snippet) => {
    assert.ok(closedLoopSource.includes(snippet), `missing ${snippet}`);
  });

  assert.ok(closedLoopSource.includes('variant={getClosedLoopFlowVisualState(step.flowId, selectedFlow, hoveredFlow)}'));
  assert.ok(closedLoopSource.includes('flowId === hoveredFlow ? "hovered"'));
  assert.equal(closedLoopSource.includes("setActiveFlow"), false);
  assert.ok(overlay.includes("<ClosedLoopFlowValidation selectedFlow={selectedFlow} onSelectFlow={setSelectedFlow} />"));
  assert.equal(overlay.includes('data-node-id="1789:14775" data-name="Section Details" aria-hidden="true"'), false);
});

test("AI project closed-loop click selection updates the quote while hover only previews the flow", () => {
  const overlay = overlaySource();
  const closedLoopSource = overlay.slice(
    overlay.indexOf("type ClosedLoopFlowId"),
    overlay.indexOf("function ClosedLoopSection"),
  );
  const closedLoopSectionSource = overlay.slice(
    overlay.indexOf("function ClosedLoopSection"),
    overlay.indexOf("type AiWorkflowAlignmentItem"),
  );

  [
    "type ClosedLoopFlowCardVariant = \"selected\" | \"hovered\" | \"idle\"",
    "const CLOSED_LOOP_FLOW_QUOTES",
    "function ClosedLoopFlowQuote",
    "Flow 02：创作者执行与内容生产",
    "验证创作者接单后，能否基于同步过来的任务上下文、企业素材、关键词和创作指令完成内容生产。",
    "Flow 03：进度回传与履约监管",
    "验证创作者侧的执行状态能否回传到 AITIME TASK，让企业/代理商不进入创作者工作台，也能看到任务推进情况。",
  ].forEach((snippet) => {
    assert.ok(closedLoopSource.includes(snippet) || closedLoopSectionSource.includes(snippet), `missing ${snippet}`);
  });

  assert.ok(closedLoopSource.includes("variant: ClosedLoopFlowCardVariant;"));
  assert.ok(closedLoopSource.includes('variant === "selected"'));
  assert.ok(closedLoopSource.includes('variant === "hovered" ? "opacity-90" : "opacity-65"'));
  assert.ok(closedLoopSectionSource.includes('const [selectedFlow, setSelectedFlow] = useState<ClosedLoopFlowId>("01");'));
  assert.ok(closedLoopSectionSource.includes("<ClosedLoopFlowQuote flowId={selectedFlow} />"));
  assert.equal(closedLoopSectionSource.includes("<p className=\"leading-[32px]\">Flow 01：需求打包与任务派发</p>"), false);
});

test("AI project closed-loop flow uses Figma assets for the bottom platform strip and no extra white backdrop", () => {
  const overlay = overlaySource();
  const closedLoopSource = overlay.slice(
    overlay.indexOf("type ClosedLoopFlowId"),
    overlay.indexOf("function ClosedLoopSection"),
  );

  [
    'const AI_PROJECT_CLOSED_LOOP_ICON_TASK_SRC = "/figma-assets/ai-project-closed-loop-icon-task.svg";',
    'const AI_PROJECT_CLOSED_LOOP_ICON_CREATE_SRC = "/figma-assets/ai-project-closed-loop-icon-create.svg";',
    'const AI_PROJECT_CLOSED_LOOP_ICON_AI_SRC = "/figma-assets/ai-project-closed-loop-icon-ai.svg";',
    'const AI_PROJECT_CLOSED_LOOP_LABEL_ARROW_SRC = "/figma-assets/ai-project-closed-loop-label-arrow.svg";',
    'const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_01_ACTIVE_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-01-active.svg";',
    'const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_01_MUTED_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-01-muted.svg";',
    'const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02A_ACTIVE_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-02a-active.svg";',
    'const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02A_MUTED_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-02a-muted.svg";',
    'const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02B_ACTIVE_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-02b-active.svg";',
    'const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_02B_MUTED_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-02b-muted.svg";',
    'const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_03_ACTIVE_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-03-active.svg";',
    'const AI_PROJECT_CLOSED_LOOP_FLOW_ARROW_03_MUTED_SRC = "/figma-assets/ai-project-closed-loop-flow-arrow-03-muted.svg";',
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  [
    "function ClosedLoopPlatformLabel",
    "src={badgeStyle.src}",
    "src={AI_PROJECT_CLOSED_LOOP_LABEL_ARROW_SRC}",
    "src={isArrowActive ? arrow.activeSrc : arrow.mutedSrc}",
  ].forEach((snippet) => {
    assert.ok(closedLoopSource.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(closedLoopSource.includes('label: "a"'), false);
  assert.equal(closedLoopSource.includes('label: "i"'), false);
  assert.equal(closedLoopSource.includes('label: "×"'), false);
  assert.equal(closedLoopSource.includes("border-y-[6px] border-l-[7px]"), false);
  assert.equal(
    overlay.includes('className="relative h-[116px] w-[864px] max-w-full shrink-0 rounded-[8px] bg-white" data-node-id="1789:14775"'),
    false,
  );

  [
    "public/figma-assets/ai-project-closed-loop-icon-task.svg",
    "public/figma-assets/ai-project-closed-loop-icon-create.svg",
    "public/figma-assets/ai-project-closed-loop-icon-ai.svg",
    "public/figma-assets/ai-project-closed-loop-label-arrow.svg",
    "public/figma-assets/ai-project-closed-loop-flow-arrow-01-active.svg",
    "public/figma-assets/ai-project-closed-loop-flow-arrow-01-muted.svg",
    "public/figma-assets/ai-project-closed-loop-flow-arrow-02a-active.svg",
    "public/figma-assets/ai-project-closed-loop-flow-arrow-02a-muted.svg",
    "public/figma-assets/ai-project-closed-loop-flow-arrow-02b-active.svg",
    "public/figma-assets/ai-project-closed-loop-flow-arrow-02b-muted.svg",
    "public/figma-assets/ai-project-closed-loop-flow-arrow-03-active.svg",
    "public/figma-assets/ai-project-closed-loop-flow-arrow-03-muted.svg",
  ].forEach((assetPath) => {
    assert.ok(existsSync(assetPath), `missing ${assetPath}`);
  });
});

test("AI project iteration section replaces the second placeholder with the click-switched equal-height Figma workflow panel", () => {
  const overlay = overlaySource();
  const theme = themeSource();
  const secondIterationBlock = overlay.slice(
    overlay.indexOf('data-node-id="1789:14312"'),
    overlay.indexOf('data-node-id="1789:14324"'),
  );
  const workflowStart = overlay.indexOf("type AiWorkflowPhaseId");
  const workflowEnd = overlay.indexOf("function IterationSection");

  [
    'const AI_PROJECT_ITERATION_METRIC_SPACER_SRC = "/figma-assets/ai-project-iteration-metric-spacer.svg";',
    'const AI_PROJECT_ITERATION_WORKFLOW_ROW_ARROW_SRC = "/figma-assets/ai-project-iteration-workflow-row-arrow.svg";',
    'const AI_PROJECT_ITERATION_WORKFLOW_TITLE_DOT_SRC = "/figma-assets/ai-project-iteration-workflow-title-dot.svg";',
    'const AI_PROJECT_ITERATION_WORKFLOW_TABS_DIVIDER_SRC = "/figma-assets/ai-project-iteration-workflow-tabs-divider.svg";',
    'const AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_GREEN_SRC = "/figma-assets/ai-project-iteration-workflow-tag-arrow-green.svg";',
    'const AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_TEAL_SRC = "/figma-assets/ai-project-iteration-workflow-tag-arrow-teal.svg";',
    'const AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_BLUE_SRC = "/figma-assets/ai-project-iteration-workflow-tag-arrow-blue.svg";',
    'const AI_PROJECT_ITERATION_WORKFLOW_TAG_ARROW_PURPLE_SRC = "/figma-assets/ai-project-iteration-workflow-tag-arrow-purple.svg";',
    'data-node-id="1789:14299"',
    'data-name="Section Container 05"',
    "px-[64px] py-[48px]",
    "gap-[84px]",
    "05 · 研发落地与上线迭代",
    "在双平台架构和 MVP 主链路确认后，项目进入开发落地与上线准备阶段。",
    'data-node-id="1789:14301"',
    'data-name="Blockquote"',
    'data-node-id="1789:14302"',
    'data-name="Quote Container"',
    "AI 工作流上线对齐",
    "进入开发上线阶段后，我的工作重点转向 AI 工作流落地：将业务验收口径、AI 介入边界、研发实现规则和上线验证方式对齐到同一条履约链路中，确保系统不仅能跑通页面，也能被真实任务验证。",
    'data-node-id="1789:14779"',
    'data-name="Quote Details"',
    "h-[240px]",
    "w-[864px]",
    'data-node-id="1789:14308"',
    'data-name="Quote Item Container"',
    'data-node-id="1789:14309"',
    'data-name="Metric Spacer"',
    "最终沉淀为：AI 工作流节点说明、任务状态与同步规则、AI 输出确认机制、上线验收与迭代指标。",
    'data-node-id="1789:14312"',
    'data-node-id="1789:14313"',
    "迭代：从显性 AI 工具到无感 AI 工作流",
    "上线后的 AI 迭代不会继续堆叠独立的生成按钮，而是沿着 MVP 主链路逐步让 AI 更无感地嵌入需求打包、任务同步、创作执行和进度回传中。",
    "为了让这些 AI 能力真正进入开发，每个切口都需要定义触发时机、上下文来源、输出形式、人工确认机制、失败兜底方案和结果回传位置，确保 AI 能力不是单点功能，而是可以嵌入双平台协作链路的流程能力。",
    'data-node-id="1789:14781"',
    "<AiWorkflowIterationRoadmap />",
    'data-node-id="1789:14324"',
    'data-node-id="1789:14325"',
    "AI 不直接替用户完成高风险决策，而是在关键节点完成整理、提示、推荐、检查和摘要。涉及任务发布、创作者匹配、内容验收和结算判断的结果，仍需要人工确认后进入下一步流程。",
    "rounded-[8px]",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.ok(existsSync("public/figma-assets/ai-project-iteration-metric-spacer.svg"));
  assert.ok(existsSync("public/figma-assets/ai-project-iteration-workflow-row-arrow.svg"));
  assert.ok(existsSync("public/figma-assets/ai-project-iteration-workflow-title-dot.svg"));
  assert.ok(existsSync("public/figma-assets/ai-project-iteration-workflow-tabs-divider.svg"));
  assert.ok(existsSync("public/figma-assets/ai-project-iteration-workflow-tag-arrow-green.svg"));
  assert.ok(existsSync("public/figma-assets/ai-project-iteration-workflow-tag-arrow-teal.svg"));
  assert.ok(existsSync("public/figma-assets/ai-project-iteration-workflow-tag-arrow-blue.svg"));
  assert.ok(existsSync("public/figma-assets/ai-project-iteration-workflow-tag-arrow-purple.svg"));
  assert.ok(workflowStart >= 0, "missing workflow phase data");
  assert.ok(workflowEnd > workflowStart, "workflow phase data should live before IterationSection");

  const workflowSource = overlay.slice(workflowStart, workflowEnd);
  const cutout3Source = workflowSource.slice(
    workflowSource.indexOf('id: "cutout-03"'),
    workflowSource.indexOf('id: "cutout-04"'),
  );
  const cutout4Source = workflowSource.slice(
    workflowSource.indexOf('id: "cutout-04"'),
    workflowSource.indexOf('id: "cutout-05"'),
  );
  const cutout5Source = workflowSource.slice(
    workflowSource.indexOf('id: "cutout-05"'),
    workflowSource.indexOf('id: "cutout-06"'),
  );
  const cutout6Source = workflowSource.slice(
    workflowSource.indexOf('id: "cutout-06"'),
    workflowSource.indexOf('id: "cutout-07"'),
  );
  const cutout7Source = workflowSource.slice(
    workflowSource.indexOf('id: "cutout-07"'),
    workflowSource.indexOf('id: "cutout-08"'),
  );
  const cutout8Source = workflowSource.slice(
    workflowSource.indexOf('id: "cutout-08"'),
    workflowSource.indexOf('id: "cutout-09"'),
  );
  const cutout9Source = workflowSource.slice(
    workflowSource.indexOf('id: "cutout-09"'),
    workflowSource.indexOf('id: "cutout-10"'),
  );
  const cutout10Source = workflowSource.slice(
    workflowSource.indexOf('id: "cutout-10"'),
    workflowSource.indexOf('id: "cutout-11"'),
  );
  const cutout13Source = workflowSource.slice(
    workflowSource.indexOf('id: "cutout-13"'),
    workflowSource.indexOf("const AI_WORKFLOW_ITERATION_DEFAULT_CUTOUT_ID_BY_PHASE"),
  );

  [
    "type AiWorkflowPhaseId",
    "type AiWorkflowCutoutItem",
    "type AiWorkflowCutoutLayout",
    'type AiWorkflowKeyPointTableMode = "fill" | "hug"',
    "const AI_WORKFLOW_ITERATION_PANEL_HEIGHT = 637",
    "const AI_WORKFLOW_ITERATION_CONTENT_HEIGHT = 580",
    "const AI_WORKFLOW_ITERATION_EXPANDED_STANDARD_HEIGHT = 376",
    "const AI_WORKFLOW_ITERATION_EXPANDED_COMPACT_HEIGHT = 356",
    "const AI_WORKFLOW_ITERATION_BODY_STANDARD_HEIGHT = 308",
    "const AI_WORKFLOW_ITERATION_BODY_COMPACT_HEIGHT = 288",
    "const AI_WORKFLOW_ITERATION_COLLAPSED_STANDARD_HEIGHT = 68",
    "const AI_WORKFLOW_ITERATION_COLLAPSED_COMPACT_HEIGHT = 56",
    "const AI_WORKFLOW_ITERATION_PHASES",
    "function AiWorkflowIterationRoadmap",
    "function AiWorkflowPhaseTab",
    "function AiWorkflowCutoutItem",
    "headerNote?: string;",
    "valueClassName?: string;",
    "function AiWorkflowTagPill",
    "Phase 01｜低风险无感辅助",
    "Phase 02｜创作过程增强",
    "Phase 03｜履约智能化",
    "无感切口 01",
    "需求包无感预填",
    "缺失信息与风险无感提示",
    "创作者 BRIEF 自动生成",
    "进度自动摘要",
    "写入 AITIME TASK 的需求包草稿",
    "无感切口 05",
    "创作上下文主动浮出",
    "关键词方向推荐",
    "实时质量守护",
    "指令智能推荐",
    "相关产品卖点、可用素材、参考表达、禁用提醒、适合当前段落的指令或案例。",
    "无感切口 09",
    "任务风险预测",
    "创作者匹配建议",
    "内容质量评分",
    "结算异常识别",
    "返回修改",
    "分发效果回流",
    "基于真实任务数据的智能化延展",
    "履约延展",
    "layout: AI_WORKFLOW_ITERATION_STANDARD_CUTOUT_LAYOUT",
    "layout: AI_WORKFLOW_ITERATION_COMPACT_CUTOUT_LAYOUT",
    'keyPointTableMode: "fill"',
    'keyPointTableMode: "hug"',
    "activePhaseId",
    "activeCutoutIdByPhase",
    "setActivePhaseId",
    "setActiveCutoutIdByPhase",
    "style={{ height: AI_WORKFLOW_ITERATION_PANEL_HEIGHT }}",
    "style={{ height: AI_WORKFLOW_ITERATION_CONTENT_HEIGHT }}",
    "style={{ height: isExpanded ? cutout.layout.expandedHeight : cutout.layout.collapsedHeight }}",
    "style={{ height: cutout.layout.bodyHeight }}",
    'data-figma-expanded-height={cutout.layout.expandedHeight}',
    'data-figma-collapsed-height={cutout.layout.collapsedHeight}',
    "function AiWorkflowKeyPointTable({ rows, mode }: { rows: AiWorkflowCutoutRow[]; mode: AiWorkflowKeyPointTableMode })",
    'mode === "fill" ? "min-h-px flex-[1_0_0]" : "shrink-0"',
    "outline outline-1 outline-[#d2d2d2]",
    "shadow-[inset_-1px_0_0_0_#d2d2d2]",
    "const isLast = index === rows.length",
    '<span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-px bg-[#d2d2d2]" />',
    'isHeader ? "shrink-0" : mode === "fill" ? "min-h-px flex-[1_0_0]" : "shrink-0"',
    'isHeader || mode !== "fill" ? "self-stretch" : "h-full"',
    '${row.valueClassName ?? ""}',
    '<AiWorkflowKeyPointTable rows={cutout.rows} mode={cutout.keyPointTableMode ?? "hug"} />',
  ].forEach((snippet) => {
    assert.ok(workflowSource.includes(snippet), `missing workflow snippet ${snippet}`);
  });

  const phaseTabSource = overlay.slice(overlay.indexOf("function AiWorkflowPhaseTab"), overlay.indexOf("function AiWorkflowIterationRoadmap"));
  const cutoutItemSource = overlay.slice(overlay.indexOf("function AiWorkflowCutoutItem"), overlay.indexOf("function AiWorkflowPhaseTab"));
  const cutoutHeaderSource = overlay.slice(overlay.indexOf("function AiWorkflowCutoutHeader"), overlay.indexOf("function AiWorkflowKeyPointTable"));
  const keyPointTableSource = overlay.slice(overlay.indexOf("function AiWorkflowKeyPointTable"), overlay.indexOf("function AiWorkflowCutoutBody"));

  [
    "onClick={onActivate}",
    "ai-workflow-phase-tab",
    "hover:opacity-80",
    "focus-visible:opacity-80",
  ].forEach((snippet) => {
    assert.ok(phaseTabSource.includes(snippet), `missing phase tab snippet ${snippet}`);
  });

  [
    "onPointerEnter={onActivate}",
    "onFocus={onActivate}",
  ].forEach((snippet) => {
    assert.ok(cutoutItemSource.includes(snippet), `missing cutout hover/focus snippet ${snippet}`);
  });

  assert.equal(phaseTabSource.includes("onPointerEnter"), false);
  assert.equal(phaseTabSource.includes("onFocus"), false);
  [cutout5Source, cutout6Source, cutout7Source, cutout8Source].forEach((cutoutSource, index) => {
    assert.ok(cutoutSource.includes('keyPointTableMode: "fill"'), `cutout ${index + 5} should fill the table height like Figma`);
    assert.equal(cutoutSource.includes("keyPointTableStroke"), false, `cutout ${index + 5} should not use doubled cell borders`);
  });
  assert.equal(keyPointTableSource.includes("cellBorder"), false);
  assert.equal(keyPointTableSource.includes('border border-[#d2d2d2] border-solid'), false);
  assert.ok(cutout9Source.includes('valueClassName: "!text-[10.5px] whitespace-nowrap"'));
  assert.equal(cutout9Source.includes("tracking-"), false);
  assert.equal(cutout9Source.includes("letter-spacing"), false);
  assert.ok(cutout10Source.includes("任务详细信息、创作者历史接单信息、验收率、擅长领域、接单速度、当前负载。"));
  assert.equal(cutout10Source.includes("任务类型、行业、关键词、交付数量、截止时间"), false);
  assert.ok(cutout13Source.includes('headerNote: "基于真实任务数据的智能化延展 | 已经超出最小 MVP 主链路，是上线后的履约闭环延展。"'));
  assert.equal(cutout13Source.includes("note:"), false);
  assert.equal(cutout13Source.includes("此项迭代目标已经超出"), false);
  assert.ok(cutoutHeaderSource.includes("{cutout.headerNote ? ("));
  assert.ok(cutoutHeaderSource.includes("group/header"));
  assert.ok(cutoutHeaderSource.includes("opacity-0"));
  assert.ok(cutoutHeaderSource.includes("group-hover/header:opacity-100"));
  assert.ok(cutoutHeaderSource.includes("group-focus-visible/header:opacity-100"));
  assert.equal(cutoutHeaderSource.includes("group-focus-within/cutout:opacity-100"), false);
  assert.ok(cutout3Source.includes("创作者Brief,包括任务目标、写作方向、产品卖点、关键词要求、禁用表达、交付标准和注意事项"));
  assert.equal(cutout3Source.includes("关键词司要求"), false);
  assert.ok(cutout3Source.includes("回退到原始任务包展示,不影响创作者接单和执行; Brief区提示"));
  assert.ok(cutout3Source.includes("保存到AITIME CREATE的同步任务详情中, 并可将"));
  assert.equal(cutout3Source.includes("创作者 Brief，包括"), false);
  assert.equal(cutout3Source.includes("Brief 区提示"), false);
  assert.ok(cutout4Source.includes('{ label: "任务同步", tone: "teal" }'));
  assert.ok(cutout4Source.includes("面向代理商/企业的进度摘要, 例如："));
  assert.ok(cutout4Source.includes("展示在AITIMETASK的任务监管页、任务时间线和消息通知中。"));
  assert.equal(cutout4Source.includes("进度回传"), false);
  assert.equal(workflowSource.includes("退回修改"), false);
  assert.ok(theme.includes(".ai-workflow-phase-tab[aria-selected=\"false\"]:hover"), "missing phase tab hover stylesheet");
  assert.ok(theme.includes(".ai-workflow-phase-tab[aria-selected=\"false\"]:focus-visible"), "missing phase tab focus stylesheet");
  assert.ok(secondIterationBlock.includes("<AiWorkflowIterationRoadmap />"));
  assert.equal(secondIterationBlock.includes("h-[601px]"), false);
  assert.equal(secondIterationBlock.includes("bg-white"), false);
  assert.equal(secondIterationBlock.includes("aria-hidden"), false);
  assert.equal(overlay.includes("<PlaceholderPanel height={240} />"), false);
  assert.equal(overlay.includes("<PlaceholderPanel height={601} />"), false);
  assert.equal(overlay.includes("<QuoteBlock title=\"AI 工作流上线对齐\""), false);
  assert.equal(overlay.includes("<QuoteBlock title=\"迭代：从显性 AI 工具到无感 AI 工作流\""), false);
});

test("AI project iteration workflow alignment replaces the first placeholder with the Figma circle group", () => {
  const overlay = overlaySource();
  const theme = themeSource();
  const workflowSource = overlay.slice(
    overlay.indexOf("const AI_WORKFLOW_ALIGNMENT_ITEMS"),
    overlay.indexOf("function IterationSection"),
  );
  const firstIterationBlock = overlay.slice(
    overlay.indexOf('data-node-id="1789:14301"'),
    overlay.indexOf('data-node-id="1789:14308"'),
  );

  [
    "function AiWorkflowAlignmentDetails",
    'data-node-id="1637:12734"',
    'data-node-id={item.nodeId}',
    'nodeId: "1637:12731"',
    'nodeId: "1637:12732"',
    'nodeId: "1637:12735"',
    'nodeId: "1642:12850"',
    "业务 / 运营口径",
    "GEO 任务怎么定义？什么算合格内容？什么状态可以验收？异常任务怎么处理？",
    "AI 介入边界",
    "AI 在哪些节点介入？读取什么上下文？输出什么格式？哪些结果需要人工确认？失败时如何兜底？",
    "研发",
    "两个平台之间传什么数据？任务状态怎么流转？进度事件什么时候回传？AI 输出如何保存和复用？",
    "测试 / 上线验证",
    "哪些流程必须跑通？哪些 AI 结果需要人工确认？上线后观察哪些效率、质量和履约指标？",
    "<AiWorkflowAlignmentDetails />",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing workflow alignment detail ${snippet}`);
  });

  assert.ok(workflowSource.includes("rounded-[200px]"));
  assert.ok(workflowSource.includes("ai-project-workflow-card"));
  assert.ok(workflowSource.includes("h-[240px] w-[240px] flex-none"));
  assert.ok(workflowSource.includes("pt-[54px]"));
  assert.ok(workflowSource.includes("mr-[-32px]"));
  assert.ok(workflowSource.includes('paddingClassName: "px-[44px]"'));
  assert.equal(workflowSource.includes('paddingClassName: "px-[40px]"'), false);
  assert.equal(workflowSource.includes("aspect-[223/223]"), false);
  assert.equal(workflowSource.includes("border-[12px]"), false);
  assert.ok(workflowSource.includes("text-[18px]"));
  assert.ok(workflowSource.includes("leading-[28px]"));
  assert.ok(workflowSource.includes("font-['Alimama_ShuHeiTi:Bold']"));
  assert.ok(workflowSource.includes("opacity-[0.15]"));
  assert.ok(workflowSource.includes("ai-project-workflow-ghost-text"));
  assert.ok(workflowSource.includes("font-['OPPOSans:Bold']"));
  assert.equal(workflowSource.includes("font-['Manrope:Bold']"), false);
  assert.equal(workflowSource.includes("ai-project-outline-text"), false);
  assert.ok(theme.includes(".ai-project-workflow-card::before"));
  assert.ok(theme.includes("inset: -6px"));
  assert.ok(theme.includes("border: 12px solid #e6e6e6"));
  assert.ok(theme.includes("border-radius: 200px"));
  assert.ok(theme.includes(".ai-project-workflow-ghost-text"));
  assert.ok(theme.includes("-webkit-text-fill-color: transparent"));
  assert.ok(theme.includes("-webkit-text-stroke: 1px #474747"));
  assert.ok(firstIterationBlock.includes("<AiWorkflowAlignmentDetails />"));
  assert.equal(firstIterationBlock.includes('aria-hidden="true"'), false);
  assert.equal(firstIterationBlock.includes('className="relative h-[240px] w-[864px] max-w-full shrink-0 rounded-[8px] bg-white"'), false);
});

test("AI project overview matches the exact Figma overview node assets and layout", () => {
  const overlay = overlaySource();
  const fonts = fontsSource();
  const theme = themeSource();

  assert.ok(fonts.includes("font-family: 'Alimama ShuHeiTi'"));
  assert.ok(fonts.includes("Alimama_ShuHeiTi-Bold.otf"));
  assert.ok(overlay.includes('const AI_PROJECT_OVERVIEW_HEADING_SRC = "/figma-assets/ai-project-overview-heading.svg";'));
  assert.ok(overlay.includes('const AI_PROJECT_OVERVIEW_DIVIDER_SRC = "/figma-assets/ai-project-overview-divider.svg";'));
  assert.ok(overlay.includes('data-node-id="1789:13700"'));
  assert.ok(overlay.includes('data-node-id="1789:13703"'));
  assert.ok(overlay.includes('className="h-[72px] relative shrink-0 w-[585px]"'));
  assert.ok(overlay.includes("gap-[64px]"));
  assert.ok(overlay.includes("w-[864px]"));
  assert.ok(overlay.includes("gap-[48px]"));
  assert.ok(overlay.includes("w-[624px]"));
  assert.ok(overlay.includes("font-['Alimama_ShuHeiTi:Bold']"));
  assert.ok(overlay.includes("ai-project-outline-text"));
  assert.ok(overlay.includes('<p className="ai-project-outline-text leading-[31.965px]">{ghostLabel}</p>'));
  assert.ok(theme.includes(".ai-project-outline-text"));
  assert.ok(theme.includes("-webkit-text-fill-color: transparent"));
  assert.ok(theme.includes("-webkit-text-stroke: 1px rgba(71, 71, 71, 0.1)"));
  assert.ok(overlay.includes("Project Type"));
  assert.ok(overlay.includes("Project Status"));
  assert.ok(overlay.includes("Team Model"));
  assert.ok(overlay.includes("Lifecycle"));
  assert.ok(overlay.includes("my role"));
  assert.ok(overlay.includes("明确多角色与双平台边界"));
  assert.ok(overlay.includes("将业务链路转化为可开发版本"));
  assert.ok(overlay.includes("完成关键任务体验并推动研发实现"));
  assert.ok(overlay.includes("跑通主业务流程"));
  const roleDescriptionLine = overlay.split("\n").find((line) => line.includes('data-node-id="1789:13722"')) ?? "";
  assert.ok(roleDescriptionLine.includes("opacity-80"));
  assert.equal(overlay.includes("InfoChip"), false);
  assert.equal(overlay.includes("OverviewPhase"), false);
  assert.equal(overlay.includes("bg-white/30 p-[32px]"), false);
  assert.equal(overlay.includes("font-['Alimama_ShuHeiTi:Bold'] text-[#474747] opacity-10"), false);
});

test("AI project detail overlay keeps left nav and right content scroll in sync", () => {
  const overlay = overlaySource();

  assert.ok(overlay.includes("activeSectionId"));
  assert.ok(overlay.includes("contentRef"));
  assert.ok(overlay.includes("sectionRefs"));
  assert.ok(overlay.includes('scrollIntoView({ behavior: "smooth", block: "start" })'));
  assert.ok(overlay.includes('addEventListener("scroll"'));
  assert.ok(overlay.includes('aria-current={active ? "true" : undefined}'));
});
