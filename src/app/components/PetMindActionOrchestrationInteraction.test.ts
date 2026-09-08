import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const ASSISTANT_PATH = "src/app/components/PetMindAssistantSection.tsx";

const assistantSource = () => readFileSync(ASSISTANT_PATH, "utf8");

const sourceBetween = (source: string, startMarker: string, endMarker: string) => {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);

  assert.ok(start >= 0, `missing source marker: ${startMarker}`);
  assert.ok(end > start, `missing source marker after ${startMarker}: ${endMarker}`);

  return source.slice(start, end);
};

const functionSource = (source: string, functionName: string) => {
  const marker = `function ${functionName}`;
  const start = source.indexOf(marker);
  const followingMarkers = ["\nfunction ", "\nexport function "]
    .map((nextMarker) => source.indexOf(nextMarker, start + marker.length))
    .filter((index) => index > start);
  const end =
    followingMarkers.length > 0 ? Math.min(...followingMarkers) : source.length;

  assert.ok(start >= 0, `missing function: ${functionName}`);
  assert.ok(end > start, `missing function boundary after: ${functionName}`);

  return source.slice(start, end);
};

const openingTagForMarker = (source: string, marker: string) => {
  const markerIndex = source.indexOf(marker);
  assert.ok(markerIndex >= 0, `missing element marker: ${marker}`);

  const openingStart = source.lastIndexOf("<", markerIndex);
  const openingEnd = source.indexOf(">", markerIndex);
  assert.ok(
    openingStart >= 0 && openingEnd > markerIndex,
    `${marker} must be rendered on an opening tag`,
  );

  return source.slice(openingStart, openingEnd + 1);
};

const workflowCardOpeningForTitle = (source: string, title: string) => {
  const titleIndex = source.indexOf(`title="${title}"`);
  assert.ok(titleIndex >= 0, `missing workflow card title: ${title}`);

  const openingStart = source.lastIndexOf("<WorkflowCard", titleIndex);
  const openingEnd = source.indexOf(">", titleIndex);
  assert.ok(openingStart >= 0 && openingEnd > titleIndex, `missing opening tag for ${title}`);

  return source.slice(openingStart, openingEnd + 1);
};

const interactionHelperForCard = (
  opening: string,
  action: "owner" | "employee" | "merchant",
) => {
  const spread = opening.match(
    new RegExp(`\\{\\.\\.\\.(\\w+)\\("${action}"\\)\\}`),
  );

  assert.ok(spread, `${action} card must use the shared interaction helper`);
  return spread[1];
};

const assetKeyForPublicPath = (source: string, publicPath: string) => {
  const escapedPath = publicPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const mapping = source.match(
    new RegExp(`([A-Za-z0-9_]+):\\s*(?:\\n\\s*)?"${escapedPath}"`),
  );

  assert.ok(mapping, `missing ASSETS mapping for ${publicPath}`);
  return mapping[1];
};

const assertNoViewportSideEffects = (source: string, context: string) => {
  ["scrollIntoView", "scrollTo", "requestAnimationFrame", ".focus("].forEach(
    (forbidden) => {
      assert.equal(
        source.includes(forbidden),
        false,
        `${context} must not use ${forbidden}`,
      );
    },
  );
};

const braceDepthAt = (source: string, targetIndex: number) => {
  let depth = 0;

  for (let index = 0; index < targetIndex; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
  }

  return depth;
};

test("PetMind passport notification advances directly to action orchestration without viewport side effects", () => {
  const assistant = assistantSource();
  const passportPrototype = functionSource(assistant, "PassportWritePrototype");
  const reviewPrototype = functionSource(assistant, "ReviewSendPrototype");
  const stageThree = functionSource(assistant, "StageThree");
  const stagePanel = functionSource(assistant, "PetMindStagePanel");
  const workflow = functionSource(assistant, "PetMindAssistantWorkflow");

  const hotspot = openingTagForMarker(
    passportPrototype,
    "data-passport-island-hotspot",
  );
  assert.ok(hotspot.includes("onClick={onNotificationActivate}"));

  [reviewPrototype, stageThree, stagePanel, workflow].forEach((scope) => {
    assert.ok(
      scope.includes("onAdvanceToActionOrchestration"),
      "missing action-orchestration callback link",
    );
  });
  assert.ok(
    reviewPrototype.includes(
      "onNotificationActivate={onAdvanceToActionOrchestration}",
    ),
  );

  const advanceHandler = sourceBetween(
    workflow,
    "const advanceToActionOrchestration =",
    "\n\n  return (",
  );
  assert.ok(advanceHandler.includes("setStage(3)"));
  assertNoViewportSideEffects(
    advanceHandler,
    "action-orchestration advance",
  );
});

test("PetMind action orchestration restores the complete Figma task and configuration copy", () => {
  const stageFour = functionSource(assistantSource(), "StageFour");
  [
    "为每项任务明确：谁执行、做什么、何时触发、在哪里完成，以及何时结束或转交人工。",
    "提供建议服务周期、可推荐项目及商户可执行的服务窗口。",
    "应用“洗护后 24 小时回访”等预设时间、渠道与结束条件。",
    "反馈状态稳定／改善 → 本轮回访结束；",
    "反馈状态加重／出现异常 → 转员工跟进；",
    "逾期未反馈 → 再次提醒或转员工跟进；",
    "收到异常任务后（仅在加重、低可信或持续未回复时），人工回访并补充记录：",
    "回访并记录 → 任务结束；",
    "回访并认为需要专业判断 → 升级商户",
    "派发已处理 → 任务结束；",
    "派发无人处理 → 重新派单；",
  ].forEach((copy) => assert.ok(stageFour.includes(copy), `missing original copy: ${copy}`));
  assert.equal((stageFour.match(/<ActionTaskInstructions\b/g) ?? []).length, 3);
  assert.equal(stageFour.includes("<br"), false, "outcomes must use real numbered lists");
});

test("PetMind action outcomes keep the Figma 11px type, 20px line height and 4px paragraph spacing", () => {
  const assistant = assistantSource();
  const instructions = functionSource(assistant, "ActionTaskInstructions");
  const stageFour = functionSource(assistant, "StageFour");
  ["text-[11px]", "leading-[20px]", "px-[16px]", "<CardSummary active={active}", "list-decimal", "mt-[4px]", "pl-[16.5px]", "space-y-[4px]"].forEach(
    (style) => assert.ok(instructions.includes(style), style),
  );
  assert.equal(instructions.includes("opacity-60"), false, "inactive task outcomes retain full-opacity text");
  assert.equal(instructions.includes("text-[10px]"), false, "outcomes must not use a smaller secondary font");
  assert.equal(stageFour.includes("!pt-[6px]"), false, "cards use their original 10px top inset");
  [["宠主行动", 150], ["员工行动", 146], ["商户行动", 126]].forEach(([title, height]) => {
    assert.ok(workflowCardOpeningForTitle(stageFour, String(title)).includes(`h-[${height}px]`));
  });
});

test("PetMind action configuration uses transparent 72px columns and the exported Figma dividers", () => {
  const assistant = assistantSource();
  const stageFour = functionSource(assistant, "StageFour");
  const config = functionSource(assistant, "ConfigNote");
  assert.equal((stageFour.match(/<ConfigNote divided\b/g) ?? []).length, 2);
  assert.equal(stageFour.includes("<ConfigNote compact"), false);
  assert.ok(stageFour.includes('bodyClassName="!gap-0 !p-0"'));
  assert.ok(stageFour.includes("flex gap-[8px] items-start px-[8px] w-full"));
  assert.ok(config.includes('divided ? "bg-transparent text-[#151616]"'));
  assert.ok(config.includes("flex-1 gap-[4px] min-w-0 p-[10px]"));
  assert.ok(config.includes("leading-[16px] shrink-0 text-[10px] w-full"));
  for (const [direction, width, height] of [["horizontal", 380, 1], ["vertical", 1, 72]] as const) {
    const path = `/figma-assets/petmind-assistant-05-action-config-divider-${direction}.svg`;
    const asset = assetKeyForPublicPath(assistant, path);
    assert.ok(stageFour.includes(`src={ASSETS.${asset}}`));
    const svg = readFileSync(`public${path}`, "utf8");
    assert.ok(svg.includes(`width="${width}" height="${height}"`));
    assert.ok(svg.includes('opacity="0.5"'));
    assert.ok(svg.includes('fill="#D2D2D2"'));
  }
});

test("PetMind action orchestration defaults to owner and exposes two truly disabled cards", () => {
  const assistant = assistantSource();
  const stageFour = functionSource(assistant, "StageFour");
  const workflowCard = functionSource(assistant, "WorkflowCard");
  const confirmedOpening = workflowCardOpeningForTitle(
    stageFour,
    "已确认服务事件＋已发送报告",
  );
  const orchestrationOpening = workflowCardOpeningForTitle(
    stageFour,
    "AI 将后续建议编排为可执行任务",
  );

  assert.match(
    stageFour,
    /useState<[^>]+>\("owner"\)/,
    "StageFour must initialize the owner action",
  );
  [confirmedOpening, orchestrationOpening].forEach((opening) => {
    assert.match(opening, /\bdisabled(?:=\{true\})?/);
    assert.equal(opening.includes("onSelect="), false);
  });

  assert.ok(workflowCard.includes("disabled = false"));
  assert.ok(workflowCard.includes("disabled?: boolean"));
  assert.ok(workflowCard.includes("aria-disabled={disabled || undefined}"));
  assert.ok(workflowCard.includes("cursor-not-allowed"));
  assert.match(workflowCard, /disabled\s*\?[^:]+:\s*onSelect/);
});

test("PetMind owner employee and merchant cards share one hover and click interaction model", () => {
  const assistant = assistantSource();
  const stageFour = functionSource(assistant, "StageFour");
  const ownerOpening = workflowCardOpeningForTitle(stageFour, "宠主行动");
  const employeeOpening = workflowCardOpeningForTitle(stageFour, "员工行动");
  const merchantOpening = workflowCardOpeningForTitle(stageFour, "商户行动");

  const ownerHelper = interactionHelperForCard(ownerOpening, "owner");
  assert.equal(
    interactionHelperForCard(employeeOpening, "employee"),
    ownerHelper,
  );
  assert.equal(
    interactionHelperForCard(merchantOpening, "merchant"),
    ownerHelper,
  );

  assert.match(stageFour, /useState<[^>]+\| null>\(null\)/);
  assert.ok(stageFour.includes("onPointerEnter"));
  assert.ok(stageFour.includes("onPointerLeave"));
  assert.ok(stageFour.includes("onFocus"));
  assert.ok(stageFour.includes("onBlur"));
  assert.ok(stageFour.includes("onSelect"));
  assert.ok(stageFour.includes("setSelectedAction"));
  assert.ok(stageFour.includes("setHoveredAction"));

  [ownerOpening, employeeOpening, merchantOpening].forEach((opening) => {
    assert.ok(opening.includes("active={"));
  });
});

test("PetMind action orchestration keeps one stable 320 by 692 phone across action and phase changes", () => {
  const assistant = assistantSource();
  const stageFour = functionSource(assistant, "StageFour");
  const prototype = functionSource(assistant, "ActionOrchestrationPrototype");

  assert.equal(
    (stageFour.match(/<ActionOrchestrationPrototype\b/g) ?? []).length,
    1,
  );
  assert.equal(
    (prototype.match(/data-action-orchestration-phone/g) ?? []).length,
    1,
  );
  assert.ok(prototype.includes("h-[692px]"));
  assert.ok(prototype.includes("w-[320px]"));

  [
    "key={selectedAction}",
    "key={action}",
    "key={phase}",
    "key={`${selectedAction}",
    "key={`${action}",
    "key={`${phase}",
  ].forEach((unstableKey) => {
    assert.equal(
      prototype.includes(unstableKey) || stageFour.includes(unstableKey),
      false,
      `action phone must not remount via ${unstableKey}`,
    );
  });
});

test("PetMind owner action holds the splash for 0.6 seconds before the 0.3 second dissolve", () => {
  const assistant = assistantSource();
  const ownerPrototype = functionSource(
    assistant,
    "ActionOrchestrationOwnerPrototype",
  );

  assert.ok(ownerPrototype.includes("data-action-owner-phase={phase}"));
  assert.ok(
    /duration:\s*0\.6/.test(ownerPrototype) ||
      /ACTION[^\n]*OWNER[^\n]*=\s*0\.6/.test(assistant),
    "owner splash must remain visible for 0.6 seconds",
  );
  assert.ok(
    /duration:\s*0\.3/.test(ownerPrototype) ||
      /ACTION[^\n]*OWNER[^\n]*=\s*0\.3/.test(assistant),
    "owner report transition must last 0.3 seconds",
  );
});

test("PetMind owner report uses the 320 by 508 Figma viewport and a 1539px scroll document", () => {
  const assistant = assistantSource();
  const ownerPrototype = functionSource(
    assistant,
    "ActionOrchestrationOwnerPrototype",
  );
  const reportContent = functionSource(assistant, "ActionOwnerReportContent");
  const scrollViewport = openingTagForMarker(
    ownerPrototype,
    "data-action-owner-report-scroll",
  );

  [
    "h-[508px]",
    "w-[320px]",
    "top-[94px]",
    "overflow-x-hidden",
    "overflow-y-auto",
    "overscroll-contain",
    "[scrollbar-width:none]",
    "[&::-webkit-scrollbar]:hidden",
  ].forEach((token) => {
    assert.ok(
      scrollViewport.includes(token),
      `owner report viewport missing ${token}`,
    );
  });

  const figmaContentHeight =
    240 + 40 + 12 + 329 + 12 + 448 + 12 + 292 + 12 + 130 + 12;
  assert.equal(figmaContentHeight, 1539);
  const contentRoot = openingTagForMarker(
    reportContent,
    "data-action-owner-info-container",
  );
  assert.ok(contentRoot.includes("pt-[240px]"));
  assert.ok(contentRoot.includes("pb-[12px]"));
  assert.ok(contentRoot.includes("gap-[12px]"));
  assert.ok(reportContent.includes("leading-[40px]"));
  [
    ["data-action-owner-main-container", "h-[329px]"],
    ["data-action-owner-complete-info", "h-[448px]"],
    ["data-action-owner-exception-info", "h-[292px]"],
    ["data-action-owner-recommendations", "h-[130px]"],
  ].forEach(([marker, height]) => {
    assert.ok(
      openingTagForMarker(reportContent, marker).includes(height),
      `${marker} must retain ${height} so the natural scroll document stays 1539px`,
    );
  });
});

test("PetMind owner report reproduces the Figma title overview and disclaimer verbatim", () => {
  const assistant = assistantSource();
  const reportContent = functionSource(assistant, "ActionOwnerReportContent");
  const exactCopy = [
    "Luna · 洗护报告",
    "服务对象",
    "Luna",
    "执行专员",
    "晓华",
    "报告时间",
    "2026/07/28 14:32",
    "执行时间",
    "2026/07/28 13:00-14:23",
    "执行套餐",
    "3-5kg 猫咪 基础健康洗护套餐",
    "执行增项",
    "刷牙护理  |  修屁股  |  剃小脚",
    "报告概述",
    "本次基础洗护已完成。服务过程中观察到 Luna 腹部轻微泛红，并出现持续抓挠。建议您对Luna持续观察状态，如3天内未好转，请尽早咨询宠物医生。",
    "报告仅作为本次洗护服务观察记录报告，并非医疗诊断，如有诊断需求，请联系宠物医生。",
  ] as const;

  exactCopy.forEach((copy) => {
    assert.ok(reportContent.includes(copy), `missing exact Figma copy: ${copy}`);
  });
  [
    "Luna · 金渐层 · 3岁半",
    "本次基础洗护已完成，8 项服务均已写入 Luna 护照。",
    "2026/07/28 13:00–14:23",
  ].forEach((staleCopy) => {
    assert.equal(
      reportContent.includes(staleCopy),
      false,
      `remove non-Figma copy: ${staleCopy}`,
    );
  });
});

test("PetMind owner report carries all eight Figma completion rows in the 448px section", () => {
  const assistant = assistantSource();
  const reportContent = functionSource(assistant, "ActionOwnerReportContent");
  const steps = sourceBetween(reportContent, "const steps = [", "] as const;");
  const completionSection = openingTagForMarker(
    reportContent,
    "data-action-owner-complete-info",
  );
  const rows = [
    ["基础洗护套餐 1/5", "毛发梳理", "已完成 | 无备注"],
    ["基础洗护套餐 2/5", "全身冲洗", "已完成 | 无备注"],
    ["基础洗护套餐 3/5", "耳部清洁", "已完成 | 无备注"],
    ["基础洗护套餐 4/5", "拉毛吹干", "已完成 | 有皮肤异常反馈"],
    ["基础洗护套餐 5/5", "基础修剪", "已完成 | 无备注"],
    ["洗护服务增项 1/3", "刷牙护理", "已完成 | 无备注"],
    ["洗护服务增项 2/3", "修屁股", "已完成 | 无备注"],
    ["洗护服务增项 3/3", "剃小脚", "已完成 | 无备注"],
  ] as const;

  assert.ok(reportContent.includes("洗护完成情况"));
  assert.ok(completionSection.includes("h-[448px]"));
  rows.flat().forEach((copy) => {
    assert.ok(steps.includes(copy), `missing completion row copy: ${copy}`);
  });
  assert.equal(
    (steps.match(/^\s*\[\s*"/gm) ?? []).length,
    8,
    "the completion data must contain exactly eight rows",
  );
});

test("PetMind owner report includes the exact Figma exception record and recommendations", () => {
  const assistant = assistantSource();
  const reportContent = functionSource(assistant, "ActionOwnerReportContent");
  const exceptionSection = openingTagForMarker(
    reportContent,
    "data-action-owner-exception-info",
  );
  const recommendationSection = openingTagForMarker(
    reportContent,
    "data-action-owner-recommendations",
  );
  const exactCopy = [
    "特殊异常记录 01",
    "异常位置",
    "腹部",
    "异常程度",
    "轻微",
    "发现环节",
    "拉毛吹干",
    "历史关联",
    "抓挠事件 06/29",
    "视觉表现",
    "局部泛红",
    "行为表现",
    "持续抓挠",
    "现场处理",
    "避开敏感部位清洗，敏感部位清水处理。",
    "执行建议",
    "建议宠主持续观察，如严重及时就医。",
    "智喵建议",
    "[智喵]  持续一周观察记录皮肤状态",
    "[门店]  专员洗护后回访服务",
  ] as const;

  assert.ok(exceptionSection.includes("h-[292px]"));
  assert.ok(recommendationSection.includes("h-[130px]"));
  exactCopy.forEach((copy) => {
    assert.ok(reportContent.includes(copy), `missing Figma detail: ${copy}`);
  });
});

test("PetMind owner report reuses all twelve Figma-exported content resources", () => {
  const assistant = assistantSource();
  const reportContent = functionSource(assistant, "ActionOwnerReportContent");
  const ownerSwitch = functionSource(assistant, "ActionOwnerSwitch");
  const ownerScope = `${reportContent}\n${ownerSwitch}`;
  const stepResources = [
    "petmind-assistant-05-action-orchestration-owner-step-hair-combing.png",
    "petmind-assistant-05-action-orchestration-owner-step-full-body-rinse.png",
    "petmind-assistant-05-action-orchestration-owner-step-ear-cleaning.png",
    "petmind-assistant-05-action-orchestration-owner-step-blow-dry.png",
    "petmind-assistant-05-action-orchestration-owner-step-basic-trim.png",
    "petmind-assistant-05-action-orchestration-owner-step-teeth-brushing.png",
    "petmind-assistant-05-action-orchestration-owner-step-butt-trim.png",
    "petmind-assistant-05-action-orchestration-owner-step-paw-trim.png",
  ] as const;
  const svgResources = [
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-report-divider.svg",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-thumbnail-play.svg",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-switch-handle-left.svg",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-switch-handle-right.svg",
  ] as const;

  stepResources.forEach((fileName) => {
    const publicPath = `/figma-assets/${fileName}`;
    assert.ok(existsSync(`public${publicPath}`), `missing Figma step asset: ${fileName}`);
    assert.ok(assistant.includes(`"${publicPath}"`), `${fileName} must stay in ASSETS`);
  });
  assert.ok(reportContent.includes("ASSETS.actionOwnerSteps"));
  assert.match(
    reportContent,
    /const playbackIndexes = \[0, 1, 2, 3, 6, 7\] as const;/,
    "Figma play overlays belong only to the first four and final two evidence thumbnails",
  );
  assert.ok(
    reportContent.includes("playbackIndexSet.has(index)"),
    "thumbnail play overlays must be driven by the six Figma evidence indexes",
  );

  svgResources.forEach((publicPath) => {
    const disk = `public${publicPath}`;
    assert.ok(existsSync(disk), `missing Figma SVG: ${disk}`);
    assert.match(readFileSync(disk, "utf8"), /<svg\b/);
    const assetKey = assetKeyForPublicPath(assistant, publicPath);
    assert.ok(ownerScope.includes(`ASSETS.${assetKey}`), `${assetKey} must be reused`);
  });
});

test("PetMind employee action follows four image-backed phases and three exact hotspots", () => {
  const assistant = assistantSource();
  const employeePrototype = functionSource(
    assistant,
    "ActionOrchestrationEmployeePrototype",
  );

  assert.ok(employeePrototype.includes("data-action-employee-phase={phase}"));
  ["list", "message", "compose", "sent"].forEach((phase) => {
    assert.ok(employeePrototype.includes(`"${phase}"`), `missing employee phase ${phase}`);
  });

  const listHotspot = openingTagForMarker(
    employeePrototype,
    "data-action-employee-list-hotspot",
  );
  ["left-[3px]", "top-[124px]", "w-[314px]", "h-[61px]"].forEach(
    (token) => assert.ok(listHotspot.includes(token), `list hotspot missing ${token}`),
  );

  const followUpHotspot = openingTagForMarker(
    employeePrototype,
    "data-action-employee-follow-up-hotspot",
  );
  ["left-[239px]", "top-[580px]", "w-[66px]", "h-[33px]"].forEach(
    (token) =>
      assert.ok(followUpHotspot.includes(token), `follow-up hotspot missing ${token}`),
  );

  const sendHotspot = openingTagForMarker(
    employeePrototype,
    "data-action-employee-send-hotspot",
  );
  [
    "left-[270.45px]",
    "top-[629.45px]",
    "w-[30.6px]",
    "h-[30.6px]",
  ].forEach((token) =>
    assert.ok(sendHotspot.includes(token), `send hotspot missing ${token}`),
  );

  [listHotspot, followUpHotspot, sendHotspot].forEach((hotspot) => {
    assert.ok(hotspot.includes("onClick="));
  });
});

test("PetMind merchant action follows dashboard preview updated phases and two hotspots", () => {
  const assistant = assistantSource();
  const merchantPrototype = functionSource(
    assistant,
    "ActionOrchestrationMerchantPrototype",
  );

  assert.ok(merchantPrototype.includes("data-action-merchant-phase={phase}"));
  ["dashboard", "preview", "updated"].forEach((phase) => {
    assert.ok(merchantPrototype.includes(`"${phase}"`), `missing merchant phase ${phase}`);
  });

  const reorderHotspot = openingTagForMarker(
    merchantPrototype,
    "data-action-merchant-reorder-hotspot",
  );
  const confirmHotspot = openingTagForMarker(
    merchantPrototype,
    "data-action-merchant-confirm-hotspot",
  );
  [reorderHotspot, confirmHotspot].forEach((hotspot) => {
    assert.ok(hotspot.includes("onClick="));
  });
});

test("PetMind merchant completion advances at 200ms and 1300ms from one shared timeline", () => {
  const assistant = assistantSource();
  const completion = functionSource(
    assistant,
    "ActionMerchantCompletionContainer",
  );

  assert.match(
    assistant,
    /const ACTION_MERCHANT_COMPLETION_EXECUTED_DELAY_MS = 200;/,
  );
  assert.match(
    assistant,
    /const ACTION_MERCHANT_COMPLETION_NEXT_DELAY_MS = 1300;/,
  );
  assert.match(
    assistant,
    /const ACTION_MERCHANT_COMPLETION_SMART_ANIMATE_SECONDS = 0\.3;/,
  );
  assert.match(completion, /useState<MerchantCompletionPhase>\("conflict"\)/);
  assert.ok(completion.includes('setCompletionPhase("executed")'));
  assert.ok(completion.includes('setCompletionPhase("next-task")'));

  const timeoutAssignments = [
    ...completion.matchAll(
      /const\s+([A-Za-z_$][\w$]*)\s*=\s*window\.setTimeout\(/g,
    ),
  ];
  assert.equal(
    timeoutAssignments.length,
    2,
    "completion must schedule exactly two timers from the same starting point",
  );
  assert.equal(
    braceDepthAt(completion, timeoutAssignments[0].index),
    braceDepthAt(completion, timeoutAssignments[1].index),
    "the 1300ms next-task timer must run from the original confirmation, not after the 200ms timer",
  );
  assert.ok(
    completion.includes("ACTION_MERCHANT_COMPLETION_EXECUTED_DELAY_MS"),
  );
  assert.ok(completion.includes("ACTION_MERCHANT_COMPLETION_NEXT_DELAY_MS"));

  assert.match(
    completion,
    /const smartAnimateTransition = \{[\s\S]*?duration:\s*ACTION_MERCHANT_COMPLETION_SMART_ANIMATE_SECONDS,[\s\S]*?ease:\s*"easeOut"/,
    "both state changes must share the exact 0.3s easeOut transition",
  );
  assert.ok(
    (completion.match(/transition=\{smartAnimateTransition\}/g) ?? []).length >= 2,
    "the executed morph and next-task slide must both use the shared smart-animation transition",
  );
});

test("PetMind merchant completion cancels both timers and resolves reduced motion immediately", () => {
  const assistant = assistantSource();
  const completion = functionSource(
    assistant,
    "ActionMerchantCompletionContainer",
  );
  const timeoutAssignments = [
    ...completion.matchAll(
      /const\s+([A-Za-z_$][\w$]*)\s*=\s*window\.setTimeout\(/g,
    ),
  ];

  assert.ok(completion.includes("shouldReduceMotion"));
  assert.match(
    completion,
    /if\s*\(shouldReduceMotion\)\s*\{[\s\S]*?setCompletionPhase\("next-task"\);?[\s\S]*?return;?[\s\S]*?\}/,
    "reduced motion must skip both timed intermediate states",
  );
  assert.ok(
    completion.indexOf("if (shouldReduceMotion)") <
      completion.indexOf("window.setTimeout("),
    "the reduced-motion branch must run before timers are scheduled",
  );
  assert.equal(timeoutAssignments.length, 2);
  timeoutAssignments.forEach((assignment) => {
    assert.ok(
      completion.includes(`window.clearTimeout(${assignment[1]})`),
      `cleanup must clear ${assignment[1]}`,
    );
  });
  assert.match(
    completion,
    /\[[^\]]*active[^\]]*resetToken[^\]]*shouldReduceMotion[^\]]*\]/,
    "completion timeline must restart and clean up when activation, reset, or reduced-motion preference changes",
  );
});

test("PetMind merchant completion uses all seven exported Figma SVG resources", () => {
  const assistant = assistantSource();
  const completion = functionSource(
    assistant,
    "ActionMerchantCompletionContainer",
  );
  const merchantPrototype = functionSource(
    assistant,
    "ActionOrchestrationMerchantPrototype",
  );
  const merchantScope = `${completion}\n${merchantPrototype}`;
  const resources = [
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-executed-check.svg",
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-line.svg",
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-1-active.svg",
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-1-complete.svg",
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-1-executed.svg",
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-2-active.svg",
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-inactive.svg",
  ] as const;

  resources.forEach((publicPath) => {
    const disk = `public${publicPath}`;
    assert.ok(existsSync(disk), `missing Figma SVG resource: ${disk}`);
    assert.match(
      readFileSync(disk, "utf8"),
      /<svg\b/,
      `${disk} must remain an SVG resource`,
    );
    const assetKey = assetKeyForPublicPath(assistant, publicPath);
    assert.ok(
      merchantScope.includes(`ASSETS.${assetKey}`),
      `${publicPath} must be rendered by the merchant completion flow`,
    );
  });
});

test("PetMind merchant keeps initial updated preview and completion layers mounted without crossfades or remount keys", () => {
  const assistant = assistantSource();
  const completion = functionSource(
    assistant,
    "ActionMerchantCompletionContainer",
  );
  const merchantPrototype = functionSource(
    assistant,
    "ActionOrchestrationMerchantPrototype",
  );

  ["initial", "updated", "preview", "completion"].forEach((layer) => {
    assert.equal(
      (merchantPrototype.match(
        new RegExp(`data-action-merchant-layer=[{\"']+${layer}`, "g"),
      ) ?? []).length,
      1,
      `${layer} must have exactly one stable resident layer`,
    );
    const opening = openingTagForMarker(
      merchantPrototype,
      `data-action-merchant-layer=\"${layer}\"`,
    );
    assert.ok(
      opening.includes("style={{") && opening.includes("display:"),
      `${layer} must stay mounted and switch with display rather than conditional JSX`,
    );
  });

  assert.ok(
    merchantPrototype.includes("src={ASSETS.actionMerchantDashboardInitial}"),
  );
  assert.ok(
    merchantPrototype.includes("src={ASSETS.actionMerchantDashboardUpdated}"),
  );
  assert.equal(
    /src=\{[^}\n]*(?:phase|completionPhase)[^}\n]*\}/.test(merchantPrototype),
    false,
    "merchant images must not swap a mounted image's src by phase",
  );
  [
    'phase === "preview" &&',
    'phase === "updated" &&',
    'phase === "preview" ? <',
    'phase === "updated" ? <',
  ].forEach((conditionalMount) => {
    assert.equal(
      merchantPrototype.includes(conditionalMount),
      false,
      `merchant layers must not conditionally mount via ${conditionalMount}`,
    );
  });

  assert.equal(
    /(?:initial|animate|exit)=\{\{[^}]*opacity|opacity\s*:\s*(?:phase|completionPhase)/s.test(
      merchantPrototype,
    ),
    false,
    "merchant page layers must not use opacity crossfades",
  );
  const merchantScope = `${merchantPrototype}\n${completion}`;
  [
    "key={phase}",
    "key={completionPhase}",
    "key={`${phase}",
    "key={`${completionPhase}",
  ].forEach((unstableKey) => {
    assert.equal(
      merchantScope.includes(unstableKey),
      false,
      `merchant layers must not remount via ${unstableKey}`,
    );
  });
});

test("PetMind action orchestration maps and uses every supplied owner employee and merchant resource", () => {
  const assistant = assistantSource();
  const ownerPrototype = functionSource(
    assistant,
    "ActionOrchestrationOwnerPrototype",
  );
  const employeePrototype = functionSource(
    assistant,
    "ActionOrchestrationEmployeePrototype",
  );
  const merchantPrototype = functionSource(
    assistant,
    "ActionOrchestrationMerchantPrototype",
  );

  const resources = [
    {
      disk: "public/figma-assets/petmind-assistant-05-action-orchestration-owner-passport-splash.jpg",
      publicPath:
        "/figma-assets/petmind-assistant-05-action-orchestration-owner-passport-splash.jpg",
      scope: ownerPrototype,
    },
    {
      disk: "public/figma-assets/petmind-assistant-05-action-orchestration-owner-report-background.png",
      publicPath:
        "/figma-assets/petmind-assistant-05-action-orchestration-owner-report-background.png",
      scope: ownerPrototype,
    },
    {
      disk: "public/figma-assets/action-orchestration-employee-notification-list.png",
      publicPath:
        "/figma-assets/action-orchestration-employee-notification-list.png",
      scope: employeePrototype,
    },
    {
      disk: "public/figma-assets/action-orchestration-employee-follow-up-message.jpg",
      publicPath:
        "/figma-assets/action-orchestration-employee-follow-up-message.jpg",
      scope: employeePrototype,
    },
    {
      disk: "public/figma-assets/action-orchestration-employee-follow-up-compose.jpg",
      publicPath:
        "/figma-assets/action-orchestration-employee-follow-up-compose.jpg",
      scope: employeePrototype,
    },
    {
      disk: "public/figma-assets/action-orchestration-employee-follow-up-sent.jpg",
      publicPath:
        "/figma-assets/action-orchestration-employee-follow-up-sent.jpg",
      scope: employeePrototype,
    },
    {
      disk: "public/figma-assets/petmind-assistant-05-action-orchestration-merchant-reassign-dashboard-initial.jpg",
      publicPath:
        "/figma-assets/petmind-assistant-05-action-orchestration-merchant-reassign-dashboard-initial.jpg",
      scope: merchantPrototype,
    },
    {
      disk: "public/figma-assets/petmind-assistant-05-action-orchestration-merchant-reassign-result-preview.png",
      publicPath:
        "/figma-assets/petmind-assistant-05-action-orchestration-merchant-reassign-result-preview.png",
      scope: merchantPrototype,
    },
    {
      disk: "public/figma-assets/petmind-assistant-05-action-orchestration-merchant-reassign-dashboard-updated.jpg",
      publicPath:
        "/figma-assets/petmind-assistant-05-action-orchestration-merchant-reassign-dashboard-updated.jpg",
      scope: merchantPrototype,
    },
  ] as const;

  resources.forEach(({ disk, publicPath, scope }) => {
    assert.ok(existsSync(disk), `missing supplied action resource: ${disk}`);
    const assetKey = assetKeyForPublicPath(assistant, publicPath);
    assert.ok(
      scope.includes(`ASSETS.${assetKey}`),
      `${publicPath} must be used by its matching action prototype`,
    );
  });
});
