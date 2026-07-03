import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const componentSource = () => readFileSync(new URL("./AIProductContent.tsx", import.meta.url), "utf8");
const dataSource = () => readFileSync(new URL("../data/aiProductPage.ts", import.meta.url), "utf8");
const dividerSource = () => readFileSync(new URL("../../assets/ai-product-page/header-divider.svg", import.meta.url), "utf8");
const themeSource = () => readFileSync(new URL("../../styles/theme.css", import.meta.url), "utf8");
const assetHash = (assetPath: string) =>
  createHash("sha256").update(readFileSync(new URL(assetPath, import.meta.url))).digest("hex");

test("AI product statement section matches the Figma blockquote treatment", () => {
  const source = componentSource();
  const statementSource = source.slice(
    source.indexOf("function SectionStatement"),
    source.indexOf("function ViewLink"),
  );

  assert.ok(statementSource.includes("flex w-full flex-col items-start"));
  assert.ok(statementSource.includes("flex h-[32px] items-center justify-center gap-[8px] px-[4px]"));
  assert.ok(statementSource.includes("text-[#474747] opacity-50 whitespace-nowrap"));
  assert.ok(statementSource.includes("className=\"size-[4px] shrink-0\""));
  assert.ok(statementSource.includes("text-[#474747] opacity-75 whitespace-nowrap"));
  assert.ok(statementSource.includes("opacity-85"));
  assert.ok(statementSource.includes("whitespace-nowrap"));
  assert.ok(!statementSource.includes("gap-[12px]"));
  assert.ok(!statementSource.includes("h-[12px] w-[2px]"));
  assert.ok(!statementSource.includes("bg-[rgba(221,221,221,0.5)]"));
  assert.ok(!statementSource.includes("border-l-[2.4px]"));
  assert.ok(!statementSource.includes("pl-[24px]"));
  assert.ok(dividerSource().includes('viewBox="0 0 4 4"'));
});

test("AI product page shell matches the Figma overall layout frame", () => {
  const source = componentSource();
  const contentSource = source.slice(
    source.indexOf("export function AIProductContent"),
    source.indexOf("{selectedProjectId ? ("),
  );

  assert.ok(contentSource.includes("data-name=\"五版select cases\""));
  assert.ok(contentSource.includes("flex w-full flex-col items-center gap-[128px] bg-[#e6e6e6] py-[128px]"));
  assert.ok(!contentSource.includes("flex w-[1024px] max-w-full flex-col items-center gap-[128px]"));
  assert.ok(contentSource.includes("<HeaderSection />"));
  assert.ok(contentSource.includes("<main ref={thesisRef} className=\"flex w-[864px] max-w-full flex-col items-start gap-[96px] py-[24px]\">"));
  assert.ok(contentSource.includes("<section ref={abstractionRef} className=\"flex w-[864px] max-w-full flex-col items-start gap-[96px] py-[24px]\">"));
  assert.ok(contentSource.includes("<section ref={principlesRef} className=\"flex w-[864px] max-w-full flex-col items-start gap-[96px] py-[24px]\">"));
  assert.ok(!contentSource.includes("<div className=\"flex w-[864px] max-w-full flex-col items-center gap-[96px]\">"));
  assert.ok(contentSource.includes("font-['OPPOSans:Light',sans-serif] text-[24px] leading-[48px]"));
  assert.ok(contentSource.includes("<FooterNavigation"));
});

test("AI product abstraction statement copy matches the latest Figma text", () => {
  const data = dataSource();

  assert.ok(data.includes("label: \"两条路径如何连接\""));
  assert.ok(data.includes("title: \"从通用AI机制到垂直业务闭环\""));
  assert.ok(
    data.includes(
      "两个项目围绕同一产品化命题，分别探索两个递进问题：GEO项目关注新兴AI能力如何被组织为通用产品机制；宠物AI SaaS项目关注这些机制如何结合行业数据、经营任务与人机协作，形成垂直业务闭环。",
    ),
  );
  assert.ok(!data.includes("label: \"两类路径后的共同抽象\""));
  assert.ok(!data.includes("两个项目分别从平台机制和垂直业务出发"));
  assert.ok(!data.includes("AI能力如何从一个功能点，进入真实流程并形成可持续价值"));
});

test("AI product featured project module uses the Figma path heading treatment", () => {
  const source = componentSource();
  const projectCardSource = source.slice(
    source.indexOf("function FeaturedProjectCard"),
    source.indexOf("function LabeledSubsection"),
  );
  assert.ok(projectCardSource.includes("gap-[20px]"));
  assert.ok(projectCardSource.includes("gap-[12px]"));
  assert.ok(projectCardSource.includes("pt-[8px]"));
  assert.ok(projectCardSource.includes("h-[26px]"));
  assert.ok(projectCardSource.includes("w-[6px]"));
  assert.ok(projectCardSource.includes("opacity-25"));
  assert.ok(projectCardSource.includes("text-[32px]"));
  assert.ok(projectCardSource.includes("leading-[48px]"));
  assert.ok(projectCardSource.includes("leading-[34px]"));
  assert.ok(source.includes("h-[128.35%]"));
  assert.ok(source.includes("left-[-4.99%]"));
  assert.ok(source.includes("top-[-15.41%]"));
  assert.ok(source.includes("w-[111.24%]"));
});

test("AI product project list card uses the Figma gradient border and shadow", () => {
  const source = componentSource();
  const projectCardSource = source.slice(
    source.indexOf("function FeaturedProjectCard"),
    source.indexOf("function LabeledSubsection"),
  );

  assert.ok(projectCardSource.includes("border border-transparent border-solid"));
  assert.ok(projectCardSource.includes("borderImageSlice: 1"));
  assert.ok(projectCardSource.includes("linear-gradient(180deg, rgba(173, 173, 173, 0.1), rgba(71, 71, 71, 0.1))"));
  assert.ok(projectCardSource.includes("relative"));
  assert.ok(projectCardSource.includes("shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)]"));
  assert.ok(!projectCardSource.includes("border-[#adadad]"));
  assert.ok(!projectCardSource.includes("overflow-hidden border"));
});

test("AI product project tag rail uses the exact static Figma background before hover", () => {
  const source = componentSource();
  const styles = themeSource();
  const projectCardSource = source.slice(
    source.indexOf("function FeaturedProjectCard"),
    source.indexOf("function LabeledSubsection"),
  );

  assert.ok(projectCardSource.includes("ai-product-project-card-tag-rail flex w-full items-start justify-between py-[16px] pl-[40px] pr-[32px]"));
  assert.ok(styles.includes(".ai-product-project-card-tag-rail"));
  assert.ok(styles.includes("background-color: #e6e6e6;"));
  assert.ok(!projectCardSource.includes("bg-[linear-gradient(90deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2))]"));
});

test("AI product project insight row uses the exact Figma column widths and padding", () => {
  const source = componentSource();
  const projectCardSource = source.slice(
    source.indexOf("function FeaturedProjectCard"),
    source.indexOf("function LabeledSubsection"),
  );

  assert.ok(projectCardSource.includes("gap-[64px] pb-[28px] pl-[48px] pr-[32px] pt-[24px]"));
  assert.ok(projectCardSource.includes("flex w-[400px] shrink-0 flex-col items-start"));
  assert.ok(projectCardSource.includes("w-[336px] font-['OPPOSans:Medium',sans-serif]"));
  assert.ok(projectCardSource.includes("min-w-full w-[min-content] font-['OPPOSans:Light',sans-serif]"));
  assert.ok(projectCardSource.includes("flex min-w-px flex-1 flex-col items-start"));
  assert.ok(!projectCardSource.includes("pb-[32px] pl-[48px] pr-[32px] pt-[24px]"));
  assert.ok(!projectCardSource.includes("w-[336px] shrink-0"));
});

test("AI product capability flow matches the Figma abstraction module", () => {
  const source = componentSource();
  const data = dataSource();
  const capabilitySource = source.slice(
    source.indexOf("function CapabilityFlow"),
    source.indexOf("function BusinessLoop"),
  );

  assert.ok(capabilitySource.includes("flex w-full flex-col gap-[20px]"));
  assert.ok(capabilitySource.includes("flex gap-[12px] items-start"));
  assert.ok(capabilitySource.includes("flex h-[48px] items-center"));
  assert.ok(capabilitySource.includes("h-[26px] opacity-25"));
  assert.ok(capabilitySource.includes("w-[6px]"));
  assert.ok(capabilitySource.includes("text-[32px]"));
  assert.ok(capabilitySource.includes("leading-[48px]"));
  assert.ok(capabilitySource.includes("px-[4px]"));
  assert.ok(capabilitySource.includes("bg-[#e2e2e2]"));
  assert.ok(capabilitySource.includes("gap-[23px]"));
  assert.ok(capabilitySource.includes("px-[48px] py-[32px]"));
  assert.ok(capabilitySource.includes("opacity-65"));
  assert.ok(capabilitySource.includes("gap-[16px] items-center justify-center"));
  assert.ok(capabilitySource.includes("rounded-[8px]"));
  assert.ok(capabilitySource.includes("h-[40px]"));
  assert.ok(capabilitySource.includes("w-[108px]"));
  assert.ok(capabilitySource.includes("px-[12px] py-[8px]"));
  assert.ok(capabilitySource.includes("flowArrow"));
  assert.ok(!capabilitySource.includes("LabeledSubsection"));
  assert.ok(!capabilitySource.includes("justify-between bg-[rgba(221,221,221,0.45)]"));

  assert.ok(data.includes("“能力抽象”指的是：从GEO项目的具体功能中，提取一套可以迁移到其他行业的产品机制。"));
  assert.ok(data.includes("我从GEO项目中归纳出一套可迁移的AI产品机制："));
  assert.ok(data.includes("生成内容或建议"));
  assert.ok(data.includes("质量评估"));
  assert.ok(data.includes("人工审核与判断"));
  assert.ok(data.includes("执行与反馈"));
  assert.ok(data.includes("迁移的是通用产品机制，而不是复制具体功能和页面。"));
});

test("AI product flow connector uses the exact fixed Figma instance dimensions", () => {
  const source = componentSource();
  const connectorSource = source.slice(
    source.indexOf("function FlowConnector"),
    source.indexOf("function BusinessLoop"),
  );

  assert.ok(connectorSource.includes("h-[14px] w-[25px] shrink-0"));
  assert.ok(connectorSource.includes("gap-px items-center opacity-15"));
  assert.ok(connectorSource.includes("h-[6px] min-w-px flex-1 bg-[#5e5e5e]"));
  assert.ok(connectorSource.includes("relative h-[14px] w-[8px] shrink-0"));
  assert.ok(connectorSource.includes("absolute inset-[6.87%_5.19%_6.87%_0]"));
  assert.ok(connectorSource.includes("block max-w-none size-full"));
  assert.ok(!connectorSource.includes("flex min-w-px flex-1 gap-px"));
});

test("AI product business loop matches the Figma four-restructure module", () => {
  const source = componentSource();
  const data = dataSource();
  const businessLoopSource = source.slice(
    source.indexOf("function BusinessLoop"),
    source.indexOf("function AiInteraction"),
  );

  assert.ok(source.includes("businessLoopDividerStroke"));
  assert.ok(source.includes("businessLoopDivider"));
  assert.ok(source.includes("businessLoopBullet"));
  assert.ok(source.includes("businessLoopCornerBack"));
  assert.ok(source.includes("businessLoopCornerFront"));
  assert.ok(businessLoopSource.includes("function BusinessLoopCard"));
  assert.ok(businessLoopSource.includes("function BusinessLoopLabel"));
  assert.ok(businessLoopSource.includes("function BusinessLoopChip"));
  assert.ok(businessLoopSource.includes("flex h-[1024px] w-full flex-col gap-[20px]"));
  assert.ok(businessLoopSource.includes("flex gap-[12px] items-start"));
  assert.ok(businessLoopSource.includes("flex h-[48px] items-center"));
  assert.ok(businessLoopSource.includes("h-[26px] opacity-25 w-[6px]"));
  assert.ok(businessLoopSource.includes("text-[32px]"));
  assert.ok(businessLoopSource.includes("leading-[48px]"));
  assert.ok(businessLoopSource.includes("flex h-[932px] w-full flex-col gap-[32px]"));
  assert.ok(businessLoopSource.includes("flex h-[422px] w-full gap-[32px]"));
  assert.ok(businessLoopSource.includes("h-[422px] min-w-px flex-1"));
  assert.ok(businessLoopSource.includes("pb-[12px]"));
  assert.ok(businessLoopSource.includes("bg-[rgba(221,221,221,0.5)]"));
  assert.ok(businessLoopSource.includes("bg-[rgba(255,255,255,0.25)]"));
  assert.ok(businessLoopSource.includes("h-[88px]"));
  assert.ok(businessLoopSource.includes("py-[20px]"));
  assert.ok(businessLoopSource.includes("text-[24px] text-center"));
  assert.ok(businessLoopSource.includes("relative h-[3px] w-full shrink-0"));
  assert.ok(!businessLoopSource.includes("relative h-[6px] w-full shrink-0"));
  assert.ok(businessLoopSource.includes("pb-[16px] pt-[20px] px-[48px]"));
  assert.ok(businessLoopSource.includes("px-[48px] py-[24px]"));
  assert.ok(businessLoopSource.includes("px-[48px] py-[16px]"));
  assert.ok(businessLoopSource.includes("absolute bottom-[-0.02px] h-[24px] right-0 w-[25px]"));
  assert.ok(businessLoopSource.includes("text-center uppercase w-full"));
  assert.ok(!businessLoopSource.includes("LabeledSubsection"));
  assert.ok(!businessLoopSource.includes("grid grid-cols-2 gap-[16px]"));
  assert.ok(!data.includes("业务价值循环"));

  assert.ok(data.includes("垂类落地需要完成的四次重构"));
  assert.ok(data.includes("同一套AI机制进入垂类后，需要围绕业务结果、结构化上下文、高频任务和人机协作重新组织。"));
  assert.ok(data.includes("业务价值闭环"));
  assert.ok(data.includes("AI指标 → 业务结果"));
  assert.ok(data.includes("用户临时输入 → 系统读取业务数据"));
  assert.ok(data.includes("用户寻找功能 → 系统主动提示下一步"));
  assert.ok(data.includes("简单人工修改 → 可解释、可审核的人机协作"));
  assert.ok(data.includes("这四次重构，让AI不再等待用户提出一个好问题"));
});

test("AI product AI interaction module matches the Figma dual image comparison", () => {
  const source = componentSource();
  const data = dataSource();
  const aiInteractionSource = source.slice(
    source.indexOf("function AiInteraction"),
    source.indexOf("function ProductLoop"),
  );

  assert.ok(source.includes("aiInteractionConversationalImage"));
  assert.ok(source.includes("aiInteractionTaskDrivenImage"));
  assert.ok(aiInteractionSource.includes("function AiInteractionCard"));
  assert.ok(aiInteractionSource.includes("flex h-[820px] w-full flex-col gap-[24px]"));
  assert.ok(aiInteractionSource.includes("flex gap-[12px] items-start"));
  assert.ok(aiInteractionSource.includes("flex h-[48px] items-center"));
  assert.ok(aiInteractionSource.includes("h-[26px] opacity-25 w-[6px]"));
  assert.ok(aiInteractionSource.includes("text-[32px]"));
  assert.ok(aiInteractionSource.includes("leading-[48px]"));
  assert.ok(aiInteractionSource.includes("px-[4px]"));
  assert.ok(aiInteractionSource.includes("flex h-[724px] w-full gap-[32px]"));
  assert.ok(aiInteractionSource.includes("flex h-full min-w-px flex-1 flex-col items-start justify-center gap-[10px]"));
  assert.ok(aiInteractionSource.includes("min-h-px w-[416px] flex-1"));
  assert.ok(aiInteractionSource.includes("rounded-tl-[36px] rounded-tr-[36px] rounded-bl-[24px] rounded-br-[24px]"));
  assert.ok(aiInteractionSource.includes("object-cover pointer-events-none"));
  assert.ok(aiInteractionSource.includes("text-center uppercase w-[min-content]"));
  assert.ok(!aiInteractionSource.includes("LabeledSubsection"));
  assert.ok(!aiInteractionSource.includes("rounded-[12px] border border-[rgba(94,94,94,0.12)]"));
  assert.ok(!aiInteractionSource.includes("card.messages.map"));
  assert.ok(!aiInteractionSource.includes("↘"));

  assert.ok(data.includes("差异不在于生成更多，而在于系统能否主动识别机会，并推动下一步行动。"));
  assert.ok(data.includes("用户需要先识别经营问题，并主动发起和推进任务。"));
  assert.ok(data.includes("系统主动识别机会，带入业务上下文、解释判断依据，并推动任务执行。"));
});

test("AI product AI interaction screenshots use the latest provided assets", () => {
  assert.equal(
    assetHash("../../assets/ai-product-page/ai-interaction-conversational.png"),
    "99620828f27b246c4910c74a9b29453850c02970b56656d91c9501601dfd6479",
  );
  assert.equal(
    assetHash("../../assets/ai-product-page/ai-interaction-task-driven.png"),
    "7ff4dfbebc7dd729898365f0e4d479b4b8605e8589f2c01eee4af58750a6e63a",
  );
});

test("AI product product loop matches the Figma customer recall flow module", () => {
  const source = componentSource();
  const data = dataSource();
  const productLoopSource = source.slice(
    source.indexOf("function ProductLoop"),
    source.indexOf("function PrincipleCard"),
  );
  const stepCardSource = source.slice(
    source.indexOf("function ProductLoopStepCard"),
    source.indexOf("function ProductLoopConnector"),
  );

  assert.ok(source.includes("productLoopStepDivider"));
  assert.ok(!source.includes("productLoopFixedStepDivider"));
  assert.ok(source.includes("productLoopMediumStepDivider"));
  assert.ok(source.includes("productLoopNarrowStepDivider"));
  assert.ok(source.includes("productLoopSectionDivider"));
  assert.ok(source.includes("productLoopMetricSpacer"));
  assert.ok(source.includes("productLoopMetricSpacerAlt"));
  assert.ok(source.includes("productLoopFlowArrow"));
  assert.ok(productLoopSource.includes("function ProductLoopStepCard"));
  assert.ok(productLoopSource.includes("function ProductLoopConnector"));
  assert.ok(productLoopSource.includes("function ProductLoopVerticalConnector"));
  assert.ok(productLoopSource.includes("function ProductLoopMetricCard"));
  assert.ok(productLoopSource.includes("flex h-[625px] w-full flex-col gap-[20px]"));
  assert.ok(productLoopSource.includes("flex gap-[12px] items-start relative w-full"));
  assert.ok(productLoopSource.includes("h-[26px] opacity-25 w-[6px]"));
  assert.ok(productLoopSource.includes("text-[32px]"));
  assert.ok(productLoopSource.includes("leading-[48px]"));
  assert.ok(productLoopSource.includes("px-[4px]"));
  assert.ok(productLoopSource.includes("bg-[rgba(221,221,221,0.5)]"));
  assert.ok(productLoopSource.includes("flex h-[533px] w-full shrink-0 flex-col items-start bg-[rgba(221,221,221,0.5)]"));
  assert.ok(productLoopSource.includes("flex flex-col gap-[20px] items-end pb-[36px] pt-[28px] px-[48px]"));
  assert.ok(productLoopSource.includes("flex flex-col gap-[20px] items-start"));
  assert.ok(productLoopSource.includes("flex gap-[12px] items-center justify-center"));
  assert.ok(productLoopSource.includes("rounded-[8px] border border-[rgba(94,94,94,0.15)] border-solid"));
  assert.ok(productLoopSource.includes("h-[84px]"));
  assert.ok(source.includes("w-[220px] shrink-0"));
  assert.ok(source.includes("w-[208px] shrink-0"));
  assert.ok(stepCardSource.includes("items-center pl-[16px] py-[8px]"));
  assert.ok(stepCardSource.includes("list-disc ms-[21px]"));
  assert.ok(!stepCardSource.includes("items-center justify-center p-[8px]"));
  assert.ok(!stepCardSource.includes("mr-[8px]"));
  assert.ok(productLoopSource.includes("text-[14px] leading-[28px]"));
  assert.ok(productLoopSource.includes("px-[16px] py-[8px]"));
  assert.ok(stepCardSource.includes("flex w-full items-center px-[16px] py-[8px]"));
  assert.ok(!stepCardSource.includes("flex w-full items-center justify-center px-[16px] py-[8px]"));
  assert.ok(!productLoopSource.includes("px-[8px] py-[8px]"));
  assert.ok(productLoopSource.includes("text-[12px] leading-[24px]"));
  assert.ok(productLoopSource.includes("text-[12px] leading-[24px] text-[#474747] opacity-65 uppercase whitespace-nowrap"));
  assert.ok(productLoopSource.includes("pl-[93px]"));
  assert.ok(productLoopSource.includes("rotate-90"));
  assert.ok(productLoopSource.includes("-rotate-90"));
  assert.ok(productLoopSource.includes("border-dashed"));
  assert.ok(productLoopSource.includes("bg-[rgba(94,94,94,0.02)]"));
  assert.ok(productLoopSource.includes("bg-[rgba(94,94,94,0.04)]"));
  assert.ok(productLoopSource.includes("bg-[rgba(94,94,94,0.06)]"));
  assert.ok(productLoopSource.includes("text-center text-[#474747] opacity-65 uppercase whitespace-nowrap"));
  assert.ok(!productLoopSource.includes("LabeledSubsection"));
  assert.ok(!productLoopSource.includes("grid grid-cols-3"));
  assert.ok(!data.includes("客户行为数据"));

  assert.ok(data.includes("业务数据 → 机会 → 建议 → 审核 → 执行 → 结果"));
  assert.ok(data.includes("以客户召回场景为例："));
  assert.ok(data.includes("行业业务数据"));
  assert.ok(data.includes("识别经营机会"));
  assert.ok(data.includes("生成可解释建议"));
  assert.ok(data.includes("人工审核与确认"));
  assert.ok(data.includes("执行业务动作"));
  assert.ok(data.includes("结果回流与数据更新"));
  assert.ok(data.includes("更新客户状态与行为数据，优化下一轮机会识别和建议。"));
  assert.ok(data.includes("产品价值的计划验证指标："));
  assert.ok(data.includes("预约与复购转化"));
});

test("AI product principles section matches the Figma method module", () => {
  const source = componentSource();
  const principlesSource = source.slice(
    source.indexOf("function PrincipleCard"),
    source.indexOf("function FooterNavigation"),
  );

  assert.ok(source.includes("principlesGeoImage"));
  assert.ok(source.includes("principlesPetImage"));
  assert.ok(source.includes("principlesVerticalDivider"));
  assert.ok(source.includes("principlesHorizontalDivider"));
  assert.ok(source.includes("principlesMediaDivider"));
  assert.ok(source.includes("PRINCIPLES_MEDIA_IMAGE_BY_ID"));
  assert.ok(source.includes("PRINCIPLES_MEDIA_IMAGE_CLASS_BY_ID"));
  assert.ok(source.includes("flex w-[864px] max-w-full flex-col items-start gap-[96px] py-[24px]"));
  assert.ok(principlesSource.includes("function PrinciplesGrid"));
  assert.ok(principlesSource.includes("function PrinciplesDividerVertical"));
  assert.ok(principlesSource.includes("function PrinciplesDividerHorizontal"));
  assert.ok(principlesSource.includes("size-[28px]"));
  assert.ok(principlesSource.includes("gap-[20px] items-start min-w-px pb-[20px] pt-[24px] px-[24px]"));
  assert.ok(!principlesSource.includes("gap-[20px] items-center min-w-px pb-[20px] pt-[24px] px-[24px]"));
  assert.ok(principlesSource.includes("translate-y-[2px]"));
  assert.ok(principlesSource.includes("font-['OPPOSans:Medium',sans-serif] text-[16px] leading-[28px]"));
  assert.ok(principlesSource.includes("font-['OPPOSans:Light',sans-serif] text-[14px] leading-[28px]"));
  assert.ok(principlesSource.includes("relative self-stretch shrink-0 w-0"));
  assert.ok(principlesSource.includes("absolute inset-[0_-0.5px]"));
  assert.ok(principlesSource.includes("relative h-0 w-full shrink-0"));
  assert.ok(principlesSource.includes("absolute inset-[-0.5px_0]"));
  assert.ok(principlesSource.includes("flex gap-[16px] items-start relative shrink-0 w-[864px]"));
  assert.ok(principlesSource.includes("relative h-[248px] w-[8px] shrink-0"));
  assert.ok(source.includes("h-[137.1%] left-[-5.02%] max-w-none top-[-21.37%] w-[110.03%]"));
  assert.ok(principlesSource.includes("text-center uppercase whitespace-nowrap"));
  assert.ok(principlesSource.includes("w-[336px]"));
  assert.ok(!principlesSource.includes("grid w-full grid-cols-2"));
  assert.ok(!principlesSource.includes("size-full object-cover\" src={FEATURED_IMAGE_BY_ID[project.id]}"));
});

test("AI product footer navigation matches the Figma handoff links module", () => {
  const source = componentSource();
  const data = dataSource();
  const styles = themeSource();
  const footerSource = source.slice(
    source.indexOf("function FooterNavigation"),
    source.indexOf("export function AIProductContent"),
  );

  assert.ok(source.includes("footerArrow"));
  assert.ok(footerSource.includes("ai-product-footer-nav flex h-[250px]"));
  assert.ok(footerSource.includes("pt-[64px]"));
  assert.ok(footerSource.includes("ai-product-footer-row flex h-[93px]"));
  assert.ok(!footerSource.includes("border-t border-dashed border-[rgba(94,94,94,0.25)]"));
  assert.ok(!footerSource.includes("border-b border-[rgba(198,198,198,0.1)]"));
  assert.ok(!footerSource.includes("border-[rgba(198,198,198,0.35)]"));
  assert.ok(footerSource.includes("px-[16px] pb-[33px] pt-[32px]"));
  assert.ok(footerSource.includes("size-[28px]"));
  assert.ok(footerSource.includes("gap-[24px]"));
  assert.ok(footerSource.includes("text-[18px] leading-[20px] tracking-[1px]"));
  assert.ok(footerSource.includes("text-[20px] leading-[28px]"));
  assert.ok(footerSource.includes("gap-[47.99px]"));
  assert.ok(footerSource.includes("text-[12px] leading-[16px] tracking-[1.2px]"));
  assert.ok(footerSource.includes("size-[8.75px]"));
  assert.ok(!footerSource.includes("transition-opacity"));
  assert.ok(!footerSource.includes("hover:opacity-65"));
  assert.ok(styles.includes(".ai-product-footer-nav::before"));
  assert.ok(styles.includes("border-top: 1px dashed rgba(94, 94, 94, 0.25);"));
  assert.ok(styles.includes(".ai-product-footer-row::after"));
  assert.ok(styles.includes("border-bottom: 1px solid rgba(198, 198, 198, 0.1);"));

  assert.ok(data.includes("前往UX设计项目"));
  assert.ok(data.includes("前往 个人简历页"));
});

test("AI product project card implements the Figma hover variant", () => {
  const source = componentSource();
  const styles = themeSource();
  const projectCardSource = source.slice(
    source.indexOf("function FeaturedProjectCard"),
    source.indexOf("function LabeledSubsection"),
  );
  const projectCardStyles = styles.slice(
    styles.indexOf(".ai-product-project-card-frame"),
    styles.indexOf(".ai-workflow-phase-tab"),
  );

  assert.ok(projectCardSource.includes("ai-product-project-card-frame"));
  assert.ok(projectCardSource.includes("ai-product-project-card-shadow"));
  assert.ok(projectCardSource.includes("ai-product-project-card-surface"));
  assert.ok(projectCardSource.includes("ai-product-project-card-tag-rail"));

  assert.ok(styles.includes(".ai-product-project-card-frame"));
  assert.ok(styles.includes("height: 452px;"));
  assert.ok(styles.includes(`.ai-product-project-card-surface {
    background-color: #e2e2e2;
    box-sizing: border-box;
    height: 452px;
    overflow: clip;`));
  assert.ok(styles.includes(".ai-product-project-card-frame:hover .ai-product-project-card-shadow"));
  assert.ok(styles.includes("transition: transform 200ms ease-out;"));
  assert.ok(styles.includes("transform: translate(-2px, 2px);"));
  assert.ok(styles.includes(".ai-product-project-card-frame:hover .ai-product-project-card-surface"));
  assert.ok(styles.includes("transition: transform 200ms ease-out, background-color 200ms ease-out;"));
  assert.ok(styles.includes("transform: translate(2px, -2px);"));
  assert.ok(styles.includes("background-color: #e9e9e9;"));
  assert.ok(styles.includes("transition: background-color 200ms ease-out;"));
  assert.ok(styles.includes("background-color: #eeeeee;"));
  assert.ok(!projectCardStyles.includes("background-image:"));
  assert.ok(!styles.includes("180ms"));
  assert.ok(!styles.includes("cubic-bezier(0.22, 1, 0.36, 1)"));
  assert.ok(styles.includes("@media (prefers-reduced-motion: reduce)"));
});
