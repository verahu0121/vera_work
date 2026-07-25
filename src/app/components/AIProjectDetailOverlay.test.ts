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
const petMindOverlaySource = () => {
  const path = "src/app/components/PetMindProjectDetailOverlay.tsx";
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};
const petMindRelationshipSource = () => {
  const path = "src/app/components/PetMindRelationshipSection.tsx";
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};
const petMindProductEntrySource = () => {
  const path = "src/app/components/PetMindProductEntrySection.tsx";
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};
const petMindGrowthLoopSource = () => {
  const path = "src/app/components/PetMindGrowthLoopSection.tsx";
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};
const petMindSectionTransitionSource = () => {
  const path = "src/app/components/PetMindSectionTransition.tsx";
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};
const pngDimensions = (path: string) => {
  const png = readFileSync(path);
  return { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
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
  assert.ok(app.includes("<PetMindProjectDetailOverlay"));
});

test("PetMind project detail uses its own full-screen placeholder overlay", () => {
  const app = appSource();
  const overlay = petMindOverlaySource();

  assert.ok(app.includes('selectedAiProjectDetailId === "pet-saas"'));
  assert.ok(overlay.includes("fixed inset-0 z-[99999]"));
  assert.ok(overlay.includes("role=\"dialog\""));
  assert.ok(overlay.includes("aria-modal=\"true\""));
  assert.ok(overlay.includes("宠物AI经营中枢 PetMind"));
  assert.ok(overlay.includes("Research Foundation"));
  assert.ok(overlay.includes("市场机会"));
  assert.ok(overlay.includes("关键界面"));
  assert.ok(overlay.includes("效果指标"));
  assert.ok(overlay.includes("项目回顾"));
  assert.ok(overlay.includes("PetMind 项目内容占位"));
  assert.equal(overlay.includes("GEO 共享创作平台"), false);
});

test("PetMind project detail renders the Figma 2286 overview section at the top of the right content", () => {
  const overlay = petMindOverlaySource();

  [
    'data-node-id="2286:23645"',
    'data-name="Section - Project List: Nebula Financial"',
    "宠物 AI 经营中枢",
    "PetMind",
    "一个面向宠物服务商家的 AI 经营中枢",
    "项目概述",
    "它通过商户服务场景沉淀连续的人宠事件数据，用宠物护照承接 C 端关系资产，并通过 AI Agent 与 GEO 能力把数据转化为服务复购、本地获客和长期经营增长。",
    "项目范围",
    "产品触点：商户端、员工小程序、平台运营端、宠物护照",
    "智能能力：AI 服务报告、经营 Agent、生成式搜索优化（GEO）",
    "数据能力：人宠服务事件数据底座",
    "我的角色",
    "产品与体验负责人",
    "市场与竞品研究",
    "产品机会定义",
    "多角色产品架构",
    "核心体验设计",
    "MVP 范围规划",
    "落地推进",
    "项目状态",
    "26.05 市场研究 → 26.06 产品细化 → ",
    "26.07 MVP构建（当前）",
    " → 26.08 门店试点（计划于2026年8月底完成首版上线并启动门店试点）",
    "rounded-bl-[48px]",
    "rounded-br-[48px]",
    "pt-[128px]",
    "pb-[84px]",
    "w-[864px]",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });
});

test("PetMind overview matches the exact Figma 2286 and 2396 layout details", () => {
  const overlay = petMindOverlaySource();
  const overviewStart = overlay.indexOf("function PetMindOverviewHeading");
  const overviewEnd = overlay.indexOf("function PetMindSectionTitleDecor", overviewStart);
  const overview = overlay.slice(overviewStart, overviewEnd);

  [
    'data-node-id="2286:23648"',
    'data-node-id="2286:23649"',
    'data-node-id="2286:23653"',
    'data-node-id="2396:14351"',
    'frameNodeId="2396:14328"',
    'data-node-id="2396:14388"',
    'data-node-id="2552:21976"',
    'data-node-id="2552:21932"',
    'data-node-id="2552:21936"',
    'data-node-id="2552:21821"',
    'data-node-id="2552:21854"',
    'data-node-id="2552:21858"',
    'data-node-id="2552:21862"',
    'data-node-id="2552:21906"',
    'data-node-id="2552:21939"',
    "items-end",
    "h-[72px]",
    "w-[515px]",
    "h-[48px]",
    "w-[235.569px]",
    "gap-[48px]",
    "gap-[24px]",
    "h-[44px]",
    "w-[232px]",
    "h-[140px]",
    "h-[128px]",
    "h-[84px]",
    "h-[72px]",
    "h-[36px]",
    "bg-[rgba(221,221,221,0.8)]",
    "px-[12px] py-[6px]",
    "font-['Manrope:ExtraBold',sans-serif]",
    "text-[20px]",
    "leading-[24px]",
    "tracking-[1.2px]",
    "font-['Alimama_ShuHeiTi:Bold',sans-serif]",
    "opacity-10",
    "text-transparent",
    "mb-[-16px]",
    "tracking-[4px]",
    "font-['OPPOSans:Regular',sans-serif]",
    "text-justify",
    "PET_MIND_OVERVIEW_ROLE_TITLE_DIVIDER_SRC",
    "PET_MIND_OVERVIEW_GRID_VERTICAL_DIVIDER_SRC",
    "PET_MIND_OVERVIEW_GRID_HORIZONTAL_DIVIDER_SRC",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(overview.includes("mb-[12px]"), false);
  assert.equal(overview.includes("min-h-[184px]"), false);
  assert.equal(overview.includes("min-h-[576px]"), false);
  assert.equal(overview.includes("bg-[#181818]"), false);
  assert.equal(overview.includes("PET_MIND_PROJECT_SCOPE"), false);
  assert.equal(overview.includes("PET_MIND_ROLE_SCOPE"), false);
  assert.ok(existsSync("public/figma-assets/petmind-overview-title-cn.svg"));
  assert.ok(existsSync("public/figma-assets/petmind-overview-title-en.svg"));
  assert.ok(existsSync("public/figma-assets/petmind-overview-role-title-divider.svg"));
  assert.ok(existsSync("public/figma-assets/petmind-overview-grid-divider-vertical.svg"));
  assert.ok(existsSync("public/figma-assets/petmind-overview-grid-divider-horizontal.svg"));
});

test("PetMind updated scope, role grid, and status preserve the Figma typography", () => {
  const overlay = petMindOverlaySource();
  const overviewStart = overlay.indexOf("function PetMindOverviewHeading");
  const overviewEnd = overlay.indexOf("function PetMindSectionTitleDecor", overviewStart);
  const overview = overlay.slice(overviewStart, overviewEnd);

  assert.ok(overviewStart > -1);
  assert.ok(overviewEnd > overviewStart);
  assert.ok(overview.includes("font-['OPPOSans:Regular',sans-serif]"));
  assert.ok(overview.includes("font-['OPPOSans:Medium',sans-serif]"));
  assert.ok(overview.includes("opacity-80"));
  assert.ok(overview.includes("text-[#474747]"));
  assert.ok(overview.includes("text-[12px]"));
  assert.ok(overview.includes('className="leading-[24px] list-disc list-inside"'));
  assert.ok(overview.includes("tracking-[1px]"));
  assert.ok(overview.includes('className="leading-[16px]"'));
  assert.ok(overview.includes('className="leading-[28px]"'));
});

test("PetMind project detail appends the updated Figma 01 market opportunity research module", () => {
  const overlay = petMindOverlaySource();
  const marketStart = overlay.indexOf("function PetMindMarketPromptCard");
  const marketEnd = overlay.indexOf("function PetMindRelationshipQuoteCard", marketStart);
  const market = overlay.slice(marketStart, marketEnd);

  [
    "<PetMindOverviewSection",
    "<PetMindMarketOpportunitySection",
    'data-node-id="2285:23469"',
    'data-name="Section Container 01"',
    'data-node-id="2396:14435"',
    'data-name="Section Divider"',
    "gap-[84px]",
    "py-[48px]",
    "01 · 在成熟 SaaS 之外，寻找新增长",
    "门店 SaaS、本地生活平台与私域工具已经覆盖经营、交易和触达，但服务信息从留存到再次使用，再到转化为后续行动，仍需要大量人工衔接。",
    "当门店 SaaS、本地生活平台和私域工具已经广泛存在，PetMind AI 的产品机会究竟在哪里？",
    "在提出新产品方案之前，我首先需要确认：市场缺少的究竟是更多功能，还是现有工具尚未连接的经营环节。",
    "现有工具已经解决了什么",
    "工具类型",
    "已覆盖的主要能力",
    "为商户解决的问题",
    "门店SaaS",
    "本地生活平台",
    "CRM／私域工具",
    "宠物门店的基础经营能力已经被广泛覆盖",
    "把一笔订单拉长看，断点发生在哪里",
    "判断依据：具体竞品功能梳理、产品实操及门店经营访谈／观察。",
    "服务预约",
    "到店服务",
    "信息记录",
    "订单归档",
    "历史调取",
    "状态判断",
    "回访提醒",
    "再次预约",
    "调取与整理成本",
    "理解与比较成本",
    "配置与执行成本",
    "断点01：需要使用历史信息时，员工能否快速找到并整理出来？",
    "断点02：找到记录后，能否快速判断宠物发生了什么变化？",
    "断点03：形成判断后，能否低成本转化为具体的回访或提醒？",
    "问题并非信息没有被记录，而是“留存—调取—理解—行动”之间仍依赖大量人工操作。",
    "机会不在增加更多功能，而在让服务信息进入下一次行动",
    "PET_MIND_SECTION_TITLE_DECOR_ASSETS",
    "PET_MIND_MARKET_ASSETS",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.ok(overlay.indexOf("<PetMindOverviewSection") < overlay.indexOf("<PetMindMarketOpportunitySection"));
  assert.ok(marketStart > -1);
  assert.ok(marketEnd > marketStart);
  assert.equal(market.includes("activeMarketRowIndex"), false);
  assert.equal(market.includes("旧机会"), false);
  assert.equal(market.includes("新机会"), false);
  assert.equal(overlay.includes("flex min-w-[992px] flex-col items-center gap-"), false);
  [
    "petmind-market-section-decor-01.svg",
    "petmind-market-section-triangle.svg",
    "petmind-market-question.svg",
    "petmind-market-insight.svg",
    "petmind-market-insight-strong.svg",
    "petmind-market-answer.svg",
    "petmind-market-role-owner.png",
    "petmind-market-role-staff.png",
    "petmind-market-role-system.png",
  ].forEach((asset) => {
    assert.ok(existsSync(`public/figma-assets/${asset}`), `missing ${asset}`);
  });
});

test("PetMind market opportunity section divider keeps the exact Figma title geometry and caret transform", () => {
  const overlay = petMindOverlaySource();
  const dividerStart = overlay.indexOf("function PetMindSectionTitleDecor");
  const dividerEnd = overlay.indexOf("function PetMindMarketPromptCard");
  const dividerSource = overlay.slice(dividerStart, dividerEnd);

  assert.ok(dividerStart > -1);
  assert.ok(dividerEnd > dividerStart);
  [
    'data-node-id="2396:14467"',
    'data-node-id="2285:23475"',
    'data-node-id="2285:23476"',
    'className="-scale-y-100 flex-none rotate-180"',
    'className="relative size-[18px]"',
    "PET_MIND_SECTION_TITLE_DECOR_ASSETS[sectionNumber].triangleSrc",
    "min-w-full",
    "w-[min-content]",
    "mb-0",
  ].forEach((snippet) => {
    assert.ok(dividerSource.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(dividerSource.includes('data-node-id="2396:14439"'), false);
  assert.equal(dividerSource.includes('data-node-id="2285:23477"'), false);
  assert.equal(dividerSource.includes('relative shrink-0 w-full" data-node-id="2285:23473"'), false);
});

test("PetMind updated market opportunity matches the Figma research-table geometry", () => {
  const overlay = petMindOverlaySource();
  const marketStart = overlay.indexOf("function PetMindMarketPromptCard");
  const marketEnd = overlay.indexOf("function PetMindRelationshipQuoteCard", marketStart);
  const market = overlay.slice(marketStart, marketEnd);
  const coverageStart = market.indexOf("function PetMindMarketCoverageTable");
  const coverageEnd = market.indexOf("function PetMindMarketInsight", coverageStart);
  const coverage = market.slice(coverageStart, coverageEnd);
  const capabilityStart = market.indexOf("function PetMindMarketStepBadge");
  const capabilityEnd = market.indexOf("function PetMindMarketBreakpointCards", capabilityStart);
  const capability = market.slice(capabilityStart, capabilityEnd);

  [
    '"2553:22197"',
    'data-node-id="2553:22205"',
    'data-node-id="2553:22207"',
    'data-node-id="2553:22283"',
    'data-node-id="2553:22522"',
    'data-node-id="2568:23968"',
    '"2571:24298"',
    "h-[145px]",
    "h-[168px]",
    "h-[354px]",
    "h-[301px]",
    "w-[48px]",
    "w-[164px]",
    "w-[400px]",
    "h-[40px]",
    "h-[78px]",
    "h-[42px]",
    "tracking-[-0.48px]",
    "font-['DINOT:Bold',sans-serif]",
    "PET_MIND_MARKET_COVERAGE_ROWS",
    "PET_MIND_MARKET_CHAIN_STEPS",
    "PET_MIND_MARKET_BREAKPOINT_CARDS",
  ].forEach((snippet) => {
    assert.ok(market.includes(snippet), `missing ${snippet}`);
  });

  assert.ok(marketStart > -1);
  assert.ok(marketEnd > marketStart);
  assert.ok(coverageStart > -1);
  assert.ok(coverageEnd > coverageStart);
  assert.ok(capabilityStart > -1);
  assert.ok(capabilityEnd > capabilityStart);
  assert.ok(coverage.includes('absolute border border-[#d2d2d2] border-solid inset-0'));
  assert.ok(coverage.includes('border-r border-[#d2d2d2] border-solid'));
  assert.ok(coverage.includes('border-b border-[#d2d2d2] border-solid'));
  assert.equal(coverage.includes('className={`bg-[#e0e0e0] border border-[#d2d2d2]'), false);
  assert.equal(coverage.includes('className={`border border-[#d2d2d2] border-solid content-stretch flex flex-col h-[44px]'), false);
  assert.ok(capability.includes('h-[6px] items-center justify-center leading-[6px]'));
  assert.ok(capability.includes('text-center translate-y-px w-full'));
  assert.ok(capability.includes('shadow-[inset_-1px_0_0_#d2d2d2]'));
  assert.ok(capability.includes('shadow-[inset_0_-1px_0_#d2d2d2]'));
  assert.equal(
    (capability.match(/border border-\[#d2d2d2\] border-solid/g) ?? []).length,
    1,
    "only the capability table perimeter may use a four-sided border",
  );
  assert.equal(market.includes("onMouseEnter"), false);
  assert.equal(market.includes("tabIndex={0}"), false);
});

test("PetMind inserts the updated Figma 2591 transition layer between market opportunity and relationship", () => {
  const overlay = petMindOverlaySource();
  const transitionStart = overlay.indexOf("function PetMindMarketToRelationshipTransition");
  const transitionEnd = overlay.indexOf("function PetMindRelationshipQuoteCard", transitionStart);
  const transition = overlay.slice(transitionStart, transitionEnd);

  [
    'data-node-id="2591:25254"',
    'data-name="Frame 1321319434"',
    'data-node-id="2591:25255"',
    'data-name="Conclusion Text"',
    "h-[264px]",
    "w-[864px]",
    "px-[48px]",
    "py-[84px]",
    "w-[768px]",
    "font-['OPPOSans:Light',sans-serif]",
    "text-[24px]",
    "leading-[48px]",
    "tracking-[0px]",
    "text-[#474747]",
    "text-center",
    "下一步，我从一只金渐层猫咪 Luna 的真实服务过程出发，",
    "<br />",
    "将观察单位从“一笔订单”转向“同一只宠物”。",
  ].forEach((snippet) => {
    assert.ok(transition.includes(snippet), `missing ${snippet}`);
  });

  const marketRender = overlay.indexOf('<PetMindMarketOpportunitySection sectionId="market"');
  const transitionRender = overlay.indexOf("<PetMindMarketToRelationshipTransition />");
  const relationshipRender = overlay.indexOf('<PetMindRelationshipSectionV2 sectionId="relationship"');

  assert.ok(transitionStart > -1);
  assert.ok(transitionEnd > transitionStart);
  assert.ok(marketRender < transitionRender);
  assert.ok(transitionRender < relationshipRender);
});

test("PetMind project detail appends the expanded Figma 02 relationship-data module after market opportunity", () => {
  const overlay = petMindOverlaySource();

  [
    "<PetMindMarketOpportunitySection",
    "<PetMindRelationshipSection",
    'data-node-id="2465:20740"',
    'data-name="Section Container 7"',
    'data-node-id="2399:26310"',
    'data-name="Quote Details"',
    "02 · 从交易，走向长期关系资产",
    "宠物行业真正有价值的不是传统 SaaS 沉淀的经营交易数据，而是连续的、可理解的、可行动的人宠事件链数据。",
    "机会观察",
    "AI 陪伴和 AI 助手产品让用户产生依赖",
    "判断迁移",
    "宠主不是单纯在“养动物”，而是在维系一种家庭关系、陪伴关系和情绪关系。",
    "沉淀了长期对话、偏好、共同记忆、被理解的感觉",
    "事件性数据影响情感连结",
    "PET_MIND_RELATIONSHIP_ASSETS",
    "petmind-section-title-decor-02.svg",
    "petmind-relationship-intersect.svg",
    "petmind-relationship-quote-title.svg",
    "petmind-relationship-arrow-left.svg",
    "petmind-relationship-arrow-right.svg",
    "petmind-relationship-connector.svg",
    "w-[281px]",
    "w-[467px]",
    "left-[194px]",
    "left-[549px]",
    "left-[444px]",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  assert.ok(overlay.indexOf("<PetMindMarketOpportunitySection") < overlay.indexOf("<PetMindRelationshipSection"));
  [
    "petmind-section-title-decor-02.svg",
    "petmind-relationship-intersect.svg",
    "petmind-relationship-quote-title.svg",
    "petmind-relationship-arrow-left.svg",
    "petmind-relationship-arrow-right.svg",
    "petmind-relationship-connector.svg",
  ].forEach((asset) => {
    assert.ok(existsSync(`public/figma-assets/${asset}`), `missing ${asset}`);
  });
});

test("PetMind relationship section renders the expanded Figma event-chain data story", () => {
  const overlay = petMindOverlaySource();

  [
    "02 · 从交易，走向长期关系资产",
    "连续的、可理解的、可行动的人宠事件链数据",
    "散点数据",
    "人宠事件链数据",
    "传统宠物SaaS能收集到不少数据",
    "当不同端产生的数据持续汇聚到同一只宠物上",
    "散点&事件链数据 对角色的影响",
    "事件链驱动的人宠关系增长飞轮",
    "真实事件持续积累",
    "AI 理解不断深化",
    "主动照护形成留存",
    "宠主价值持续增长",
    "商户获得经营收益",
    "更多商户加入循环",
    "PetMind AI 的核心资产不是“商户数据量大”",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });
});

test("PetMind relationship data comparison uses the exact Figma 2465:20766 resources", () => {
  const overlay = petMindOverlaySource();

  [
    'data-node-id="2465:20766"',
    "petmind-relationship-scattered-panel.png",
    "petmind-relationship-event-chain-panel.png",
    "petmind-relationship-decision-intersect.svg",
    "petmind-relationship-decision-divider.svg",
    "text-[20px]",
    "leading-[32px]",
    "text-[12px]",
    "leading-[20px]",
    "w-[365px]",
    "w-[475px]",
    "h-[402px]",
    "h-[72px]",
    "w-[254px]",
    'textWrapper: "2465:20778"',
    "absolute border border-[#d2d2d2] border-solid inset-0",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  const comparisonStart = overlay.indexOf('data-node-id="2465:20766"');
  const comparisonEnd = overlay.indexOf("function PetMindRelationshipImpactMatrix", comparisonStart);
  const comparison = overlay.slice(comparisonStart, comparisonEnd);
  assert.equal(comparison.includes('bg-[#e2e2e2] border border-[#d2d2d2]'), false);

  assert.equal(overlay.includes("PetMindEventChainMockup"), false);
  assert.equal(overlay.includes("PET_MIND_SCATTERED_DATA_PANEL_SRC"), false);
  [
    "petmind-relationship-scattered-panel.png",
    "petmind-relationship-event-chain-panel.png",
    "petmind-relationship-decision-intersect.svg",
    "petmind-relationship-decision-divider.svg",
  ].forEach((asset) => {
    assert.ok(existsSync(`public/figma-assets/${asset}`), `missing ${asset}`);
  });
});

test("PetMind role impact matrix matches the exact Figma 2465:20792 table and assets", () => {
  const overlay = petMindOverlaySource();
  const matrixStart = overlay.indexOf('data-node-id="2465:20792"');
  const matrixEnd = overlay.indexOf("function PetMindFlywheelCard", matrixStart);
  const matrix = overlay.slice(matrixStart, matrixEnd);

  [
    'data-node-id="2465:20792"',
    'data-node-id="2465:20795"',
    "petmind-impact-pet.svg",
    "petmind-impact-owner.svg",
    "petmind-impact-merchant.svg",
    "petmind-impact-platform.svg",
    "w-[76px]",
    "w-[202px]",
    "w-[168px]",
    "w-[204px]",
    "h-[220px]",
    "h-[36px]",
    "h-[92px]",
    "p-[6px]",
    "pl-[4px]",
    "pr-[12px]",
    "py-[16px]",
    "text-[12px]",
    "text-[rgba(71,71,71,0.8)]",
    "tracking-[0px]",
    'style={{ letterSpacing: "0px" }}',
    "list-disc",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });

  [
    "petmind-impact-pet.svg",
    "petmind-impact-owner.svg",
    "petmind-impact-merchant.svg",
    "petmind-impact-platform.svg",
  ].forEach((asset) => {
    assert.ok(existsSync(`public/figma-assets/${asset}`), `missing ${asset}`);
  });

  assert.ok(matrix.includes("shadow-[inset_0_-1px_0_#d2d2d2]"), "missing non-sizing horizontal grid rules");
  assert.ok(matrix.includes("shadow-[inset_-1px_0_0_#d2d2d2]"), "missing non-sizing vertical grid rules");
  assert.equal(matrix.includes('border-b border-[#d2d2d2]'), false, "horizontal dividers must not reduce row height");
  assert.equal(matrix.includes('border-r border-[#d2d2d2]'), false, "vertical dividers must not reduce text width");
  assert.equal(
    (matrix.match(/border border-\[#d2d2d2\] border-solid/g) ?? []).length,
    1,
    "only the table perimeter may use a four-sided border",
  );
});

test("PetMind relationship flywheel matches the exact Figma 2465:20837 geometry and assets", () => {
  const overlay = petMindOverlaySource();
  const flywheelStart = overlay.indexOf("function PetMindFlywheelCard");
  const flywheelEnd = overlay.indexOf("function PetMindRelationshipSection", flywheelStart);
  const flywheel = overlay.slice(flywheelStart, flywheelEnd);

  [
    'data-node-id="2465:20837"',
    'data-node-id="2465:20840"',
    'data-node-id="2465:20849"',
    'nodeId="2465:20850"',
    'nodeId="2465:20885"',
    'nodeId="2465:20900"',
    'nodeId="2465:20933"',
    'nodeId="2465:20948"',
    'data-node-id="2465:20981"',
    "PET_MIND_FLYWHEEL_ASSETS.topConnector",
    "PET_MIND_FLYWHEEL_ASSETS.metricInactive",
    "PET_MIND_FLYWHEEL_ASSETS.metricActive",
    "PET_MIND_FLYWHEEL_ASSETS.cardDividerVertical",
    "PET_MIND_FLYWHEEL_ASSETS.cardDividerHorizontal",
    "PET_MIND_FLYWHEEL_ASSETS.arrow1137",
    "PET_MIND_FLYWHEEL_ASSETS.arrow1138",
    "PET_MIND_FLYWHEEL_ASSETS.arrow1141",
    "PET_MIND_FLYWHEEL_ASSETS.arrow1142",
    "PET_MIND_FLYWHEEL_ASSETS.metricSpacer",
    "h-[535px]",
    "h-[64px]",
    "h-[471px]",
    "p-[32px]",
    "gap-[4px]",
    "h-[109px]",
    "h-[32px]",
    "w-[184px]",
    "w-[171px]",
    "tracking-[0.48px]",
    "tracking-[1.44px]",
    "text-[10px]",
    "text-[12px]",
    "leading-[18px]",
    "leading-[24px]",
  ].forEach((snippet) => {
    assert.ok(flywheel.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(flywheel.includes("ChevronRight"), false);
  assert.equal(flywheel.includes("ChevronDown"), false);
  [
    "petmind-flywheel-top-connector.svg",
    "petmind-flywheel-metric-inactive.svg",
    "petmind-flywheel-metric-active.svg",
    "petmind-flywheel-card-divider-vertical.svg",
    "petmind-flywheel-card-divider-horizontal.svg",
    "petmind-flywheel-arrow-1137.svg",
    "petmind-flywheel-arrow-1138.svg",
    "petmind-flywheel-arrow-1139.svg",
    "petmind-flywheel-arrow-1140.svg",
    "petmind-flywheel-arrow-1141.svg",
    "petmind-flywheel-arrow-1142.svg",
    "petmind-flywheel-metric-spacer.svg",
  ].forEach((asset) => {
    assert.ok(existsSync(`public/figma-assets/${asset}`), `missing ${asset}`);
  });
});

test("PetMind renders the replacement Figma 2655 relationship module after the transition", () => {
  const overlay = petMindOverlaySource();
  const relationship = petMindRelationshipSource();

  [
    'data-node-id="2655:30228"',
    'data-name="Section Container 6"',
    "h-[1597px]",
    "w-[864px]",
    "gap-[84px]",
    "py-[48px]",
    'data-node-id="2655:30229"',
    '"2655:30230"',
    'data-node-id="2655:30237"',
    'data-node-id="2655:30267"',
    '"2655:30439"',
  ].forEach((snippet) => {
    assert.ok(relationship.includes(snippet), `missing ${snippet}`);
  });

  const sectionRender = relationship.slice(relationship.indexOf("export function PetMindRelationshipSection"));
  const divider = sectionRender.indexOf("<PetMindRelationshipSectionDivider />");
  const question = sectionRender.indexOf('<PetMindRelationshipPrompt kind="question" />');
  const signal = sectionRender.indexOf("<PetMindCrossIndustrySignals />");
  const comparison = sectionRender.indexOf("<PetMindRelationshipComparison />");
  const answer = sectionRender.indexOf('<PetMindRelationshipPrompt kind="answer" />');

  assert.ok(divider < question);
  assert.ok(question < signal);
  assert.ok(signal < comparison);
  assert.ok(comparison < answer);
  assert.ok(overlay.includes('import { PetMindRelationshipSection as PetMindRelationshipSectionV2 }'));
  assert.ok(overlay.indexOf("<PetMindMarketToRelationshipTransition />") < overlay.indexOf('<PetMindRelationshipSectionV2 sectionId="relationship"'));
});

test("PetMind replacement relationship story matches the Figma 2655 content and geometry", () => {
  const relationship = petMindRelationshipSource();

  [
    "02 · 从交易，走向长期关系资产",
    "当交易记录已被充分沉淀，下一层价值来自围绕同一只宠物持续连接、可理解并可触发行动的服务事件。",
    "当预约、订单和服务记录都已存在，为什么系统仍难以理解同一只宠物，并判断下一步？",
    "跨行业信号",
    "部分 AI 陪伴产品用户在长期互动后形成明显的情感依恋",
    "长期记忆与持续上下文可能增强被理解感",
    "同一只宠物的服务信息，能否跨越多次服务保持连续？",
    "Luna：散点记录",
    "围绕经营模块｜分别沉淀为可查询记录",
    "Luna：连续事件链",
    "围绕同一只宠物｜按时间连接为连续事件",
    "创建预约｜03.01 10:00 洗护",
    "完成洗护，发现毛发干燥，皮肤有轻微异常。",
    "关联历史记录，判断可能存在皮肤问题，建议观察并预约检查。",
    "调整洗护周期、推荐护理产品，并设置 30 日后复查提醒。",
    "连续事件让系统能够回答三个问题",
    "真正形成理解的，不是更多记录，而是事件足够连续。",
    "单只宠物足够连续的事件数据",
    "h-[121px]",
    "h-[212px]",
    "h-[593px]",
    "h-[145px]",
    "w-[316px]",
    "w-[208px]",
    "w-[400px]",
    "h-[549px]",
    "h-[475px]",
    "h-[402px]",
    "h-[72px]",
    "w-[440px]",
    'data-node-id="2619:27120"',
    'data-node-id="2619:27135"',
    "py-[16px]",
    "px-[12px]",
    "ASSETS.aiJudgment",
    "ASSETS.aiPlan",
    'data-name="Date Badge"',
    "h-[14px]",
    "w-[31px]",
    'data-name="Date Badge Text"',
    "w-[23px]",
    "[transform:translateY(0.5px)]",
    "text-[36px]",
    "leading-[30px]",
    "text-[12px]",
    "leading-[24px]",
    "bg-[#e2e2e2]",
    "border-[#d2d2d2]",
  ].forEach((snippet) => {
    assert.ok(relationship.includes(snippet), `missing ${snippet}`);
  });

  assert.equal(relationship.includes("PetMindRelationshipImpactMatrix"), false);
  assert.equal(relationship.includes("PetMindRelationshipFlywheel"), false);
});

test("PetMind replacement relationship module uses every supplied Figma resource", () => {
  const relationship = petMindRelationshipSource();
  const assets = [
    "petmind-relationship-02-section-decor.svg",
    "petmind-relationship-02-triangle.svg",
    "petmind-relationship-02-question.svg",
    "petmind-relationship-02-signal-observation.svg",
    "petmind-relationship-02-signal-arrow.svg",
    "petmind-relationship-02-signal-hypothesis.svg",
    "petmind-relationship-02-signal-service.svg",
    "petmind-relationship-02-note.svg",
    "petmind-relationship-02-module-order.svg",
    "petmind-relationship-02-module-product.svg",
    "petmind-relationship-02-module-service.svg",
    "petmind-relationship-02-module-reservation.svg",
    "petmind-relationship-02-module-membership.svg",
    "petmind-relationship-02-luna.png",
    "petmind-relationship-02-event-wash.png",
    "petmind-relationship-02-event-feedback.png",
    "petmind-relationship-02-event-medical.png",
    "petmind-relationship-02-event-followup.png",
    "petmind-relationship-02-timeline-wash.svg",
    "petmind-relationship-02-timeline-feedback.svg",
    "petmind-relationship-02-timeline-ai.svg",
    "petmind-relationship-02-timeline-medical.svg",
    "petmind-relationship-02-timeline-followup.svg",
    "petmind-relationship-02-timeline-plan.svg",
    "petmind-relationship-02-ai-judgment.svg",
    "petmind-relationship-02-ai-plan.svg",
    "petmind-relationship-02-decision-intersect.svg",
    "petmind-relationship-02-decision-divider.svg",
    "petmind-relationship-02-event-divider.svg",
    "petmind-relationship-02-comparison-note.svg",
    "petmind-relationship-02-answer.svg",
  ];

  assets.forEach((asset) => {
    assert.ok(relationship.includes(`/figma-assets/${asset}`), `unused ${asset}`);
    assert.ok(existsSync(`public/figma-assets/${asset}`), `missing ${asset}`);
  });
});

test("PetMind appends the Figma 2664 product-entry module after relationship", () => {
  const overlay = petMindOverlaySource();
  const productEntry = petMindProductEntrySource();

  assert.ok(overlay.includes('import { PetMindProductEntrySection }'));
  assert.ok(overlay.includes('<PetMindProductEntrySection sectionId="judgment" sectionRef={registerPetMindSection("judgment")} />'));
  assert.ok(
    overlay.indexOf('<PetMindRelationshipSectionV2 sectionId="relationship"') <
      overlay.indexOf('<PetMindProductEntrySection sectionId="judgment"'),
  );
  assert.ok(productEntry.includes('data-node-id="2664:30806"'));
  assert.ok(productEntry.includes('data-section-id={sectionId}'));
});

test("PetMind inserts the exact Figma transitions after sections 02, 03, and 04", () => {
  const overlay = petMindOverlaySource();
  const transitions = petMindSectionTransitionSource();
  const relationship = overlay.indexOf('<PetMindRelationshipSectionV2 sectionId="relationship"');
  const relationshipTransition = overlay.indexOf("<PetMindRelationshipToProductEntryTransition />");
  const productEntry = overlay.indexOf('<PetMindProductEntrySection sectionId="judgment"');
  const productEntryTransition = overlay.indexOf("<PetMindProductEntryToNextTransition />");
  const growthLoop = overlay.indexOf('<PetMindGrowthLoopSection sectionId="growth"');
  const growthLoopTransition = overlay.indexOf("<PetMindGrowthLoopToNextTransition />");

  assert.ok(overlay.includes('from "./PetMindSectionTransition"'));
  assert.ok(relationship < relationshipTransition);
  assert.ok(relationshipTransition < productEntry);
  assert.ok(productEntry < productEntryTransition);
  assert.ok(productEntryTransition < growthLoop);
  assert.ok(growthLoop < growthLoopTransition);

  [
    'nodeId="2655:30446"',
    'textNodeId="2655:30447"',
    'nodeId="2664:30838"',
    'textNodeId="2664:30839"',
    'nodeId="2765:22524"',
    'textNodeId="2765:22525"',
    "h-[312px]",
    "w-[864px]",
    "h-[144px]",
    "w-[768px]",
    "px-[48px]",
    "py-[84px]",
    "font-['OPPOSans:Light',sans-serif]",
    "text-[24px]",
    "leading-[48px]",
    "text-[#474747]",
    "text-center",
    "tracking-[0px]",
    "连续事件链回答了“什么数据值得积累”，但产品仍需一个明确的起点。",
    "下一步，我将比较不同环节的信息密度、使用动机与经营价值，判断哪个环节适合作为第一切口。",
    "入口确定后，下一步要验证：",
    "员工、宠主、商户与 AI 能否围绕一次服务完成接力，",
    "并触发下一次预约。",
    "角色链路明确后，下一步的关键是将这套接力机制",
    "落到具体产品交互中，形成可确认、可执行、可回写的 AI 工作流。",
  ].forEach((snippet) => {
    assert.ok(transitions.includes(snippet), `missing ${snippet}`);
  });
});

test("PetMind product-entry module strictly matches the Figma 2664 content and geometry", () => {
  const productEntry = petMindProductEntrySource();

  [
    "03 · 从连续关系到产品入口",
    "连续关系是长期目标，但产品需要一个自然发生、数据真实且价值可见的第一入口。",
    "发现“长期关系资产”这个机会后，PetMind AI 应该从哪里开始？",
    "我比较了四条真实考虑过的候选路径，判断哪一条最适合作为产品起点。",
    "入口选择",
    "评估维度：信息密度 × 使用动机 × 经营价值",
    "完整门店经营系统",
    "独立 C 端 AI 助手",
    "GEO 获客入口",
    "服务履约入口",
    "一次真实服务",
    "作为产品的第一入口",
    "PetMind AI 应该从一次真实宠物服务开始。",
    "先让一次真实服务成为可被理解、被延续的最小事件单元",
    "h-[1026px]",
    "h-[94px]",
    "h-[121px]",
    "h-[318px]",
    "h-[145px]",
    "h-[244px]",
    "h-[32px]",
    "h-[60px]",
    "h-[36px]",
    "h-[56px]",
    "w-[864px]",
    "w-[124px]",
    "w-[224px]",
    "gap-[84px]",
    "py-[48px]",
    "text-[36px]",
    "leading-[30px]",
    "text-[11px]",
    "leading-[20px]",
    "shadow-[inset_0_-1px_0_#d2d2d2]",
    "shadow-[inset_-1px_0_0_#d2d2d2]",
  ].forEach((snippet) => {
    assert.ok(productEntry.includes(snippet), `missing ${snippet}`);
  });

  ["2664:30807", "2664:30808", "2664:30815", "2664:30817", "2664:30827", "2664:30828", "2664:30829", "2664:30830", "2664:30831"].forEach((nodeId) => {
    assert.ok(productEntry.includes(nodeId), `missing node ${nodeId}`);
  });
});

test("PetMind product-entry module uses the exact Figma 2664 resources and single-width table rules", () => {
  const productEntry = petMindProductEntrySource();
  const tableStart = productEntry.indexOf("function PetMindProductEntryTableHeader");
  const tableEnd = productEntry.indexOf("function PetMindProductEntryDecision", tableStart);
  const table = productEntry.slice(tableStart, tableEnd);
  const assets = [
    "petmind-entry-03-section-decor.svg",
    "petmind-entry-03-triangle.svg",
    "petmind-entry-03-question.svg",
    "petmind-entry-03-answer.svg",
  ];

  assets.forEach((asset) => {
    assert.ok(productEntry.includes(`/figma-assets/${asset}`), `unused ${asset}`);
    assert.ok(existsSync(`public/figma-assets/${asset}`), `missing ${asset}`);
  });

  assert.equal((table.match(/border border-\[#d2d2d2\] border-solid/g) ?? []).length, 1);
  assert.equal(table.includes('border-r border-[#d2d2d2]'), false);
  assert.equal(table.includes('border-b border-[#d2d2d2]'), false);
});

test("PetMind appends the exact Figma 2765 growth-loop module after section 03", () => {
  const overlay = petMindOverlaySource();
  const growth = petMindGrowthLoopSource();

  assert.ok(overlay.includes('import { PetMindGrowthLoopSection } from "./PetMindGrowthLoopSection";'));
  assert.ok(
    overlay.includes(
      '<PetMindGrowthLoopSection sectionId="growth" sectionRef={registerPetMindSection("growth")} />',
    ),
  );
  assert.ok(
    overlay.indexOf("<PetMindProductEntryToNextTransition />") <
      overlay.indexOf("<PetMindGrowthLoopSection"),
  );

  [
    'data-node-id="2765:22220"',
    'data-node-id="2765:22221"',
    'data-node-id="2765:22222"',
    'data-node-id="2765:22245"',
    'data-node-id="2765:22268"',
    'data-node-id="2765:22368"',
    'data-node-id="2765:22394"',
    "h-[1867px]",
    "h-[114px]",
    "h-[373px]",
    "h-[1116px]",
    "h-[640px]",
    "h-[288px]",
    "gap-[84px]",
    "py-[48px]",
    "04 · 一次宠物服务，如何变成下一次收入",
    "为角色接力做出的三项架构取舍",
    "同一条链路下的角色接力",
    "新服务事件",
    "验证关口",
    "商业价值可兑现：提醒→复约转化",
  ].forEach((snippet) => {
    assert.ok(growth.includes(snippet), `missing growth-loop detail ${snippet}`);
  });
});

test("PetMind growth-loop uses the supplied Figma resources and one-layer matrix rules", () => {
  const growth = petMindGrowthLoopSource();
  const assets = [
    "petmind-growth-04-section-decor.svg",
    "petmind-growth-04-triangle.svg",
    "petmind-growth-04-bullet.svg",
    "petmind-growth-04-info.svg",
    "petmind-growth-04-info-hover.svg",
    "petmind-growth-04-info-tooltip-caret.svg",
    "petmind-growth-04-source-arrow.svg",
    "petmind-growth-04-booking.svg",
    "petmind-growth-04-source-connector.svg",
    "petmind-growth-04-role-stage-corner.svg",
    "petmind-growth-04-avatar-owner.png",
    "petmind-growth-04-avatar-employee.png",
    "petmind-growth-04-avatar-merchant.png",
    "petmind-growth-04-avatar-ai.png",
    "petmind-growth-04-role-separator.svg",
    "petmind-growth-04-step-employee-core.svg",
    "petmind-growth-04-step-employee-confirm.svg",
    "petmind-growth-04-step-owner-core.svg",
    "petmind-growth-04-step-merchant-quality.svg",
    "petmind-growth-04-step-merchant-core.svg",
    "petmind-growth-04-step-ai-generate.svg",
    "petmind-growth-04-event-bridge.svg",
    "petmind-growth-04-event-grid-line.svg",
    "petmind-growth-04-event-actors-left.png",
    "petmind-growth-04-event-actors-right.png",
    "petmind-growth-04-validation-record.svg",
    "petmind-growth-04-validation-action.svg",
    "petmind-growth-04-validation-relation.svg",
    "petmind-growth-04-validation-business.svg",
    "petmind-growth-04-validation-arrow.svg",
    "petmind-growth-04-validation-divider-wide.svg",
    "petmind-growth-04-validation-divider-medium-title.svg",
    "petmind-growth-04-validation-divider-medium.svg",
    "petmind-growth-04-validation-divider-relation-title.svg",
    "petmind-growth-04-validation-divider-relation.svg",
    "petmind-growth-04-validation-divider-business-title.svg",
    "petmind-growth-04-validation-divider-business.svg",
  ];

  assets.forEach((asset) => {
    assert.ok(growth.includes(`/figma-assets/${asset}`), `unused ${asset}`);
    assert.ok(existsSync(`public/figma-assets/${asset}`), `missing ${asset}`);
  });

  assert.ok(growth.includes("const MATRIX_COLUMN_WIDTHS = [100, 96, 90, 90, 116, 90, 96, 96, 90]"));
  assert.ok(growth.includes("const MATRIX_COLUMN_EDGES = [0, 100, 196, 286, 376, 492, 582, 678, 774, 864]"));
  assert.ok(growth.includes("gridTemplateRows: \"64px 110px 110px 110px 136px\""));
  assert.ok(growth.includes("bg-[#d2d2d2] top-0 w-px"));
  assert.ok(growth.includes("function PetMindRoleAvatar"));
  assert.ok(growth.includes("rounded-full size-[13px] shrink-0 object-cover"));
  assert.ok(growth.includes("ASSETS.roleSeparator"));
  assert.ok(growth.includes("content-stretch flex h-[20px] items-center"));
  assert.ok(growth.includes('"rgba(255,255,255,0.25)"'));
  assert.ok(growth.includes('"rgba(255,255,255,0.1)"'));
  assert.ok(growth.includes("rgba(131,199,130,0.05)"));
  assert.ok(growth.includes("rgba(0,0,0,0.01)"));
  assert.ok(growth.includes('data-node-id={nodeId}'));
  assert.ok(growth.includes("scale-x-[0.96]"));
  assert.ok(growth.includes("text-justify tracking-[0px] uppercase w-[104.166667%]"));
  assert.equal(growth.includes("h-[48px] leading-[24px]"), false);
  assert.ok(growth.includes('data-node-id="2765:22249"'));
  assert.ok(growth.includes("pl-[24px] pr-[16px] py-[12px]"));
  assert.ok(growth.includes("group/geo"));
  assert.ok(growth.includes("group-hover/geo:opacity-0"));
  assert.ok(growth.includes("group-hover/geo:opacity-100"));
  assert.equal(growth.includes("group-hover/geo:visible"), false);
  assert.equal(growth.includes("transition-opacity duration-150 group-hover/geo"), false);
  assert.ok(growth.includes('style={{ willChange: "opacity, backdrop-filter" }}'));
  assert.ok(growth.includes("bottom-[28px]"));
  assert.ok(growth.includes("w-[172px]"));
  assert.ok(growth.includes("backdrop-blur-[6px]"));
  assert.ok(growth.includes("此处仅标识首次预约来源，GEO获客机制将在后文展开。"));
  assert.ok(growth.includes('data-node-id="2765:22262"'));
  assert.ok(growth.includes("h-full items-center justify-center min-w-px px-[24px] py-[20px]"));
  assert.ok(
    growth.includes(
      `font-['OPPOSans:Bold',sans-serif] leading-[24px] text-[#474747] text-[16px] whitespace-nowrap">
          首次预约`,
    ),
  );
  assert.ok(growth.includes("ASSETS.eventActorsLeft"));
  assert.ok(growth.includes("ASSETS.eventActorsRight"));
  assert.deepEqual(pngDimensions("public/figma-assets/petmind-growth-04-event-actors-left.png"), { width: 116, height: 68 });
  assert.deepEqual(pngDimensions("public/figma-assets/petmind-growth-04-event-actors-right.png"), { width: 116, height: 68 });
  assert.ok(growth.includes("function PetMindValidationBlank"));
  assert.ok(growth.includes('data-node-id="2765:22403"'));
  assert.ok(growth.includes('label: "服务员工"'));
  assert.ok(growth.includes('{ role: "ai", label: "系统" }'));
  assert.equal(growth.includes("function PetMindEventAvatar"), false);
  assert.ok(growth.includes("MATRIX_COLUMN_EDGES.slice(1, -1)"));
  assert.ok(growth.includes("horizontalEdges.slice(1)"));
  assert.ok(growth.includes("absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none z-30"));
  assert.ok(growth.includes("function PetMindValidationGridLines"));
  assert.ok(growth.includes("const fullHeightEdges = [100, 196, 582]"));
  assert.ok(growth.includes("const topRowEdges = [492, 774]"));
  assert.ok(growth.includes("const bottomRowEdges = [292, 382, 644]"));
  ["width={296}", "width={192}", "width={200}", "width={62}"].forEach((width) => {
    assert.ok(growth.includes(width), `missing updated validation width ${width}`);
  });
  assert.ok(growth.includes("ASSETS.validationDividerRelationTitle"));
  assert.ok(growth.includes("ASSETS.validationDividerRelation"));
  assert.equal(growth.includes("border border-transparent border-solid content-stretch flex h-full"), false);
  assert.ok(growth.includes('className="content-stretch flex h-full flex-col items-start relative shrink-0"'));
  assert.equal(
    growth.includes("border border-[#d2d2d2] border-solid content-stretch flex h-full flex-col"),
    false,
  );
  assert.equal(growth.includes("border-collapse"), false);
});

test("PetMind left navigation is bound to the rendered right-side sections", () => {
  const overlay = petMindOverlaySource();

  [
    "useRef",
    "contentRef",
    "sectionRefs",
    "registerPetMindSection",
    "scrollToPetMindSection",
    "section.scrollIntoView({ behavior: \"smooth\", block: \"start\" })",
    "content.addEventListener(\"scroll\", handleScroll, { passive: true })",
    "content.removeEventListener(\"scroll\", handleScroll)",
    "id={`petmind-detail-section-${sectionId}`}",
    "data-section-id={sectionId}",
    "sectionRef={registerPetMindSection(\"overview\")}",
    "sectionRef={registerPetMindSection(\"market\")}",
    "sectionRef={registerPetMindSection(\"relationship\")}",
    "sectionRef={registerPetMindSection(\"judgment\")}",
    "sectionRef={registerPetMindSection(\"growth\")}",
    "onClick={() => scrollToPetMindSection(item.id)}",
    "ref={contentRef}",
    "scroll-smooth",
  ].forEach((snippet) => {
    assert.ok(overlay.includes(snippet), `missing ${snippet}`);
  });
});

test("GEO detail overlay routes PetMind away before rendering GEO content", () => {
  const overlay = overlaySource();

  assert.ok(overlay.includes('projectId === "pet-saas"'));
  assert.ok(overlay.includes("<PetMindProjectDetailOverlay onClose={onClose} />"));
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
