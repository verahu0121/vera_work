import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const ASSISTANT_PATH = "src/app/components/PetMindAssistantSection.tsx";

const assistantSource = () => readFileSync(ASSISTANT_PATH, "utf8");

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
  let openingEnd = source.indexOf(">", markerIndex);
  while (openingEnd > markerIndex && source[openingEnd - 1] === "=") {
    openingEnd = source.indexOf(">", openingEnd + 1);
  }
  assert.ok(
    openingStart >= 0 && openingEnd > markerIndex,
    `${marker} must be rendered on an opening tag`,
  );

  return source.slice(openingStart, openingEnd + 1);
};

const componentOpeningForTitle = (
  source: string,
  component: "WorkflowCard" | "CompactBranchCard",
  title: string,
) => {
  const titleIndex = source.indexOf(`title="${title}"`);
  assert.ok(titleIndex >= 0, `missing ${component} title: ${title}`);

  const openingStart = source.lastIndexOf(`<${component}`, titleIndex);
  const openingEnd = source.indexOf(">", titleIndex);
  assert.ok(
    openingStart >= 0 && openingEnd > titleIndex,
    `missing ${component} opening tag for ${title}`,
  );

  return source.slice(openingStart, openingEnd + 1);
};

const literalArrayForConstant = (source: string, constantName: string) => {
  const match = source.match(
    new RegExp(
      `const\\s+${constantName}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`,
    ),
  );

  assert.ok(match, `missing readonly array constant: ${constantName}`);
  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
};

const numberArrayForConstant = (source: string, constantName: string) => {
  const match = source.match(
    new RegExp(
      `const\\s+${constantName}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`,
    ),
  );

  assert.ok(match, `missing readonly number array constant: ${constantName}`);
  return [...match[1].matchAll(/\b(\d+)\b/g)].map((item) => Number(item[1]));
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

const dependencyArrayContaining = (source: string, dependencies: string[]) =>
  (source.match(/\[[^\]]+\]/g) ?? []).some((candidate) =>
    dependencies.every((dependency) => candidate.includes(dependency)),
  );

const braceDepthAt = (source: string, targetIndex: number) => {
  let depth = 0;

  for (let index = 0; index < targetIndex; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
  }

  return depth;
};

const assertPhaseAdvance = (
  source: string,
  setter: string,
  phaseConstant: string,
  phases: string[],
  phaseIndex: number,
) => {
  assert.ok(
    source.includes(`${setter}(${phaseConstant}[${phaseIndex}])`) ||
      source.includes(`${setter}("${phases[phaseIndex]}")`),
    `missing advance to ${phases[phaseIndex]}`,
  );
};

const assertExactSharedTimeline = (
  source: string,
  switchConstant: string,
  expectedTimerCount: number,
) => {
  const timeoutAssignments = [
    ...source.matchAll(
      /const\s+([A-Za-z_$][\w$]*)\s*=\s*window\.setTimeout\(/g,
    ),
  ];
  const mappedTimeline = source.includes(`${switchConstant}.map`);

  assert.ok(
    mappedTimeline || timeoutAssignments.length === expectedTimerCount,
    `timeline must schedule exactly ${expectedTimerCount} transitions`,
  );
  if (mappedTimeline) {
    assert.equal(
      (source.match(/window\.setTimeout/g) ?? []).length,
      1,
      "the readonly switch-point map must be the only timeout scheduler",
    );
    assert.match(
      source,
      /return\s*\(\)\s*=>[\s\S]{0,220}(?:forEach|map)[\s\S]{0,140}window\.clearTimeout/,
      "every mapped timeout must be cleared",
    );
  } else {
    const depths = timeoutAssignments.map((assignment) =>
      braceDepthAt(source, assignment.index),
    );
    assert.ok(
      depths.every((depth) => depth === depths[0]),
      "all switch points must be scheduled from one shared starting point",
    );
    timeoutAssignments.forEach((assignment) => {
      assert.ok(
        source.includes(`window.clearTimeout(${assignment[1]})`),
        `cleanup must clear ${assignment[1]}`,
      );
    });
  }

  assert.equal(source.includes("window.setInterval"), false);
};

test("PetMind reach routing defaults to the owner-feedback view with the patrol and improved branch selected together", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const patrolOpening = componentOpeningForTitle(
    stageFive,
    "WorkflowCard",
    "回访任务巡查",
  );
  const improvedOpening = componentOpeningForTitle(
    stageFive,
    "CompactBranchCard",
    "宠主已反馈【已改善】",
  );

  assert.ok(
    assistant.includes(
      'type ReachRoutingView = "owner-feedback" | "observation-ended";',
    ),
  );
  assert.ok(
    assistant.includes(
      'type ReachRoutingRoute = "improved" | "unchanged" | "worsened" | "overdue";',
    ),
  );
  assert.match(stageFive, /useState<ReachRoutingView>\("owner-feedback"\)/);
  assert.match(stageFive, /useState<ReachRoutingRoute>\("improved"\)/);
  assert.match(patrolOpening, /\bactive(?:=\{[^}]+\})?/);
  assert.ok(improvedOpening.includes('{...routeInteraction("improved")}'));
});

test("PetMind patrol configuration matches the Figma two-line 64px notes without truncation", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const patrol = componentOpeningForTitle(stageFive, "WorkflowCard", "回访任务巡查");
  assert.ok(patrol.includes('className="h-[150px]"'));
  assert.ok(patrol.includes('bodyClassName="!gap-[8px] !pb-[8px] !pt-[10px]"'));
  const summary = openingTagForMarker(stageFive, "data-reach-routing-patrol-summary");
  assert.ok(summary.includes("whitespace-nowrap"));
  const notes = openingTagForMarker(stageFive, "data-reach-routing-patrol-notes");
  assert.ok(notes.includes("grid-cols-2 gap-[8px] px-[8px]"));
  for (const title of ["预配置生效：自动化规则", "预配置生效：平台风险边界"]) {
    const note = componentOpeningForTitle(stageFive, "ConfigNote", title);
    assert.ok(note.includes("active={patrolActive}"));
    assert.ok(note.includes("className={patrolNoteClassName}"));
    assert.equal(/\bcompact\b/.test(note), false, "do not use the 48px single-line compact variant");
  }
  ["!gap-[4px]", "!pb-[6px]", "[&>p:first-child]:leading-[14px]", "[&>p:first-child]:whitespace-nowrap", "[&>p:last-child]:leading-[16px]"].forEach(
    (style) => assert.ok(stageFive.includes(style), style),
  );
  assert.ok(stageFive.includes("决定回访时间、未回复后的提醒频率及默认任务分配。"));
  assert.ok(stageFive.includes("反馈加重或高风险时停止自动化建议，并强制升级人工处理。"));
});

test("PetMind reach routing tabs, half-width previews, and owner send hotspot use one synchronous view switch", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const tabOpening = openingTagForMarker(
    stageFive + panel,
    "data-reach-routing-tab={view}",
  );
  const previewOpening = openingTagForMarker(
    stageFive + panel,
    "data-reach-routing-preview-hotspot={view}",
  );
  const ownerSendOpening = openingTagForMarker(
    panel,
    "data-reach-routing-owner-send-hotspot",
  );

  assert.deepEqual(literalArrayForConstant(assistant, "REACH_ROUTING_VIEWS"), [
    "owner-feedback",
    "observation-ended",
  ]);
  assert.ok(tabOpening.includes("onClick={() => onSelectView(view)}"));
  assert.ok(previewOpening.includes("onClick={() => onSelectView(view)}"));
  assert.match(previewOpening, /(?:w-1\/2|w-\[50%\]|basis-1\/2)/);
  assert.ok(
    ownerSendOpening.includes(
      'onClick={() => onSelectView("observation-ended")}',
    ),
  );
  assert.ok(stageFive.includes("setReachRoutingView(nextView)"));
  assert.ok(stageFive.includes("onSelectView={selectReachRoutingView}"));
  assertNoViewportSideEffects(stageFive, "reach-routing selection");
  assertNoViewportSideEffects(panel, "reach-routing prototype selection");
});

test("PetMind reach routing keeps the left and prototype titles synchronized from one view-copy map", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const combined = stageFive + panel;

  assert.ok(
    assistant.includes("const REACH_ROUTING_VIEW_COPY"),
    "reach-routing titles must have one shared source of truth",
  );
  assert.ok(
    (combined.match(/REACH_ROUTING_VIEW_COPY\[[^\]]+\]\.title/g) ?? []).length >=
      2,
    "both the left tab and phone title must read the shared title",
  );
  assert.ok(
    combined.includes("REACH_ROUTING_VIEW_COPY[") &&
      combined.includes(".subtitle"),
    "the prototype subtitle must follow the selected view",
  );
});

test("PetMind reach routing switches use the exact layered Figma colors for owner and employee states", () => {
  const assistant = assistantSource();
  const toggle = functionSource(assistant, "ReachRoutingToggleSwitch");

  assert.ok(
    assistant.includes(
      '"linear-gradient(270deg, rgb(255, 196, 141) 0%, rgba(255, 196, 141, 0) 100%), linear-gradient(90deg, rgb(255, 141, 178) 0%, rgb(255, 141, 178) 100%)"',
    ),
    "owner feedback must use the pink base with the orange right-side overlay",
  );
  assert.ok(
    assistant.includes(
      '"linear-gradient(270deg, rgb(255, 141, 178) 0%, rgba(255, 141, 178, 0) 100%), linear-gradient(90deg, rgb(255, 196, 141) 0%, rgb(255, 196, 141) 100%)"',
    ),
    "employee result must use the orange base with the pink right-side overlay",
  );
  assert.ok(
    toggle.includes(
      "backgroundImage: REACH_ROUTING_SWITCH_ACTIVE_BACKGROUND[tone]",
    ),
  );
  assert.equal(toggle.includes("#ffc48d 0%, #ff8db2 100%"), false);
  assert.equal(toggle.includes("#ff8db2 0%, #ffc48d 100%"), false);
});

test("PetMind reach routing view and observation changes use the Figma 0.3 second ease-out motion", () => {
  const assistant = assistantSource();
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const observation = functionSource(
    assistant,
    "ReachRoutingObservationPrototype",
  );

  assert.match(
    assistant,
    /const\s+REACH_ROUTING_TRANSITION_SECONDS\s*=\s*0\.3\s*;/,
  );
  assert.match(
    assistant,
    /const\s+REACH_ROUTING_EASING\s*=\s*"easeOut"\s*;/,
  );
  [panel, observation].forEach((scope) => {
    assert.ok(scope.includes("REACH_ROUTING_TRANSITION_SECONDS"));
    assert.ok(scope.includes("REACH_ROUTING_EASING"));
    assert.match(
      scope,
      /duration:\s*shouldReduceMotion\s*\?\s*0\s*:\s*REACH_ROUTING_TRANSITION_SECONDS/,
    );
  });
});

test("PetMind employee observation prototype follows the exact five Figma states and absolute switch points", () => {
  const assistant = assistantSource();
  const observation = functionSource(
    assistant,
    "ReachRoutingObservationPrototype",
  );

  assert.deepEqual(
    literalArrayForConstant(assistant, "REACH_ROUTING_OBSERVATION_PHASES"),
    ["initial", "owner-reply", "employee-reply", "owner-ack", "closed"],
  );
  assert.deepEqual(
    numberArrayForConstant(assistant, "REACH_ROUTING_OBSERVATION_SWITCH_MS"),
    [200, 1100, 2000, 2900],
  );
  assert.match(
    assistant,
    /type\s+ReachRoutingObservationPhase\s*=\s*\(typeof\s+REACH_ROUTING_OBSERVATION_PHASES\)\[number\]\s*;/,
  );
  assert.ok(observation.includes("data-reach-routing-observation-phase={phase}"));
  assert.ok(
    observation.includes("REACH_ROUTING_OBSERVATION_SWITCH_MS.map"),
    "all four absolute switch points must drive the automatic sequence",
  );
  assert.match(
    observation,
    /REACH_ROUTING_OBSERVATION_PHASES\[(?:index|phaseIndex)\s*\+\s*1\]/,
  );
});

test("PetMind observation-ended renders the six Figma message layers as resident images, including the two newly supplied replies", () => {
  const assistant = assistantSource();
  const observation = functionSource(
    assistant,
    "ReachRoutingObservationPrototype",
  );
  const layerAssets = [
    [
      "check-in",
      "reachRoutingNextFollowUpCheckIn",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-checkin.png",
    ],
    [
      "report-delivered",
      "reachRoutingNextFollowUpReportDelivered",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-report.png",
    ],
    [
      "question",
      "reachRoutingNextFollowUpQuestion",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-question.png",
    ],
    [
      "owner-reply",
      "reachRoutingObservationOwnerReply",
      "/figma-assets/petmind-assistant-05-reach-routing-observation-message-owner-reply.png",
    ],
    [
      "employee-reply",
      "reachRoutingObservationEmployeeReply",
      "/figma-assets/petmind-assistant-05-reach-routing-observation-message-employee-reply.png",
    ],
    [
      "owner-ack",
      "reachRoutingNextFollowUpOwnerAck",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-owner-ack.png",
    ],
  ] as const;

  layerAssets.forEach(([marker, assetName, assetPath]) => {
    assert.ok(
      assistant.includes(`${assetName}:\n    "${assetPath}"`),
      `missing exact supplied observation layer asset: ${assetName}`,
    );
    assert.equal(
      (observation.match(new RegExp(`data-reach-routing-observation-layer="${marker}"`, "g")) ?? [])
        .length,
      1,
      `the ${marker} layer must remain mounted exactly once inside the stable observation prototype`,
    );
    assert.ok(
      observation.includes(`src={ASSETS.${assetName}}`),
      `the ${marker} layer must render through its explicit ASSETS key`,
    );
  });

  [
    "恢复一点了，没有昨天红。第一张昨天到家的，第二张今天晚上的，估计是自己抓到的？我再看看的",
    "好的，那您再观察两三天哈，有问题随时联系我",
  ].forEach((reconstructedCopy) => {
    assert.equal(
      observation.includes(reconstructedCopy),
      false,
      `supplied observation copy must not be re-typeset: ${reconstructedCopy}`,
    );
  });

  assert.equal(
    observation.includes("<ReachRoutingObservationReportGroup"),
    false,
    "observation report copy must use the supplied resident PNG layer",
  );
  assert.equal(
    observation.includes("<ReachRoutingObservationQuestionGroup"),
    false,
    "observation thread copy must use the supplied resident PNG layers",
  );
});

test("PetMind employee observation sequence handles reduced motion and clears every scheduled transition", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const observation = functionSource(
    assistant,
    "ReachRoutingObservationPrototype",
  );

  assert.ok(stageFive.includes("useReducedMotion()"));
  assert.ok(stageFive.includes("shouldReduceMotion={shouldReduceMotion}"));
  assert.ok(panel.includes("shouldReduceMotion={shouldReduceMotion}"));
  assert.ok(observation.includes("window.setTimeout"));
  assert.ok(observation.includes("window.clearTimeout"));
  assert.match(
    observation,
    /if\s*\(shouldReduceMotion\)[\s\S]{0,240}(?:"closed"|REACH_ROUTING_OBSERVATION_PHASES\[REACH_ROUTING_OBSERVATION_PHASES\.length\s*-\s*1\])/,
  );
  assert.match(
    observation,
    /return\s*\(\)\s*=>[\s\S]{0,180}(?:forEach|map)[\s\S]{0,120}window\.clearTimeout/,
  );
  assert.ok(
    dependencyArrayContaining(observation, [
      "active",
      "resetToken",
      "shouldReduceMotion",
    ]),
    "observation timers must restart for activation, replay, and reduced motion",
  );
});

test("PetMind reach routing skips entry animation for all resident prototypes while preserving internal transitions", () => {
  const panel = functionSource(assistantSource(), "ReachRoutingPrototypePanel");
  const prototypeNames = [
    "owner",
    "observation",
    "owner-unchanged",
    "next-followup",
    "owner-worsened",
    "diagnosis",
    "overdue-merchant",
    "overdue-owner",
  ];

  prototypeNames.forEach((name) => {
    const opening = openingTagForMarker(
      panel,
      `data-reach-routing-${name}-prototype`,
    );
    assert.ok(opening.startsWith("<motion.div"));
    assert.ok(
      opening.includes("initial={false}"),
      `${name} must appear at its target geometry and opacity on entry`,
    );
    assert.ok(opening.includes("animate={{"));
    assert.ok(opening.includes("transition={transition}"));
    ["opacity:", "scale:", "x:", "y:"].forEach((property) => {
      assert.ok(opening.includes(property), `${name} must retain animated ${property}`);
    });
  });
  assert.ok(panel.includes("duration: shouldReduceMotion ? 0 : REACH_ROUTING_TRANSITION_SECONDS"));
  assert.ok(panel.includes("ease: REACH_ROUTING_EASING"));
});

test("PetMind reach routing keeps one stable phone and resident owner and employee prototype layers", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const observation = functionSource(
    assistant,
    "ReachRoutingObservationPrototype",
  );
  const phoneOpening = openingTagForMarker(
    panel,
    "data-reach-routing-phone",
  );

  assert.equal(
    (stageFive.match(/<ReachRoutingPrototypePanel\b/g) ?? []).length,
    1,
  );
  assert.equal((panel.match(/data-reach-routing-phone/g) ?? []).length, 1);
  assert.ok(phoneOpening.includes("h-[692px]"));
  assert.ok(phoneOpening.includes("w-[320px]"));
  assert.equal(
    (panel.match(/<ReachRoutingObservationPrototype\b/g) ?? []).length,
    1,
  );
  assert.ok(panel.includes("data-reach-routing-owner-prototype"));
  assert.ok(panel.includes("data-reach-routing-observation-prototype"));

  const stableScopes = [stageFive, panel, observation];
  [
    "key={view}",
    "key={phase}",
    "key={route}",
    "key={`${view}",
    "key={`${phase}",
    "key={`${route}",
    "<AnimatePresence",
    "mode=\"wait\"",
    "src={view ===",
    "src={phase ===",
    "opacity: view ===",
    "opacity: active ?",
  ].forEach((unstablePattern) => {
    assert.equal(
      stableScopes.some((scope) => scope.includes(unstablePattern)),
      false,
      `reach-routing phone must not remount or crossfade via ${unstablePattern}`,
    );
  });
  assert.doesNotMatch(
    panel,
    /view\s*===\s*"observation-ended"\s*&&\s*<ReachRoutingObservationPrototype/,
  );
});

test("PetMind owner-send hotspot is a repeating flicker without adding navigation side effects", () => {
  const assistant = assistantSource();
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const ownerSendOpening = openingTagForMarker(
    panel,
    "data-reach-routing-owner-send-hotspot",
  );

  assert.ok(ownerSendOpening.startsWith("<motion.button"));
  assert.ok(panel.includes("repeat: Infinity"));
  assert.match(panel, /opacity:\s*\[[^\]]{3,}\]/);
  assertNoViewportSideEffects(panel, "owner-send hotspot");
});

test("PetMind unchanged selection keeps patrol and unchanged selected while right-side view changes leave the route untouched", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const patrolOpening = componentOpeningForTitle(
    stageFive,
    "WorkflowCard",
    "回访任务巡查",
  );
  const unchangedOpening = componentOpeningForTitle(
    stageFive,
    "CompactBranchCard",
    "宠主已反馈【无变化】",
  );
  const selectViewStart = stageFive.indexOf("const selectReachRoutingView");
  const routeInteractionStart = stageFive.indexOf(
    "const routeInteraction",
    selectViewStart,
  );

  assert.match(patrolOpening, /\bactive(?:=\{[^}]+\})?/);
  assert.ok(unchangedOpening.includes('{...routeInteraction("unchanged")}'));
  assert.ok(selectViewStart >= 0 && routeInteractionStart > selectViewStart);

  const selectViewSource = stageFive.slice(
    selectViewStart,
    routeInteractionStart,
  );
  assert.equal(
    selectViewSource.includes("setSelectedRoute"),
    false,
    "phone-only switches must not change the selected left branch",
  );
  assert.equal(
    selectViewSource.includes("setHoveredRoute"),
    false,
    "phone-only switches must not change the selected or hovered left branch",
  );
  assert.ok(stageFive.includes("setSelectedRoute(route)"));
  assert.ok(
    (stageFive.includes('route === "unchanged"') &&
      stageFive.includes('"owner-unchanged"')) ||
      (stageFive.includes("[route]") &&
        assistant.includes('unchanged: "owner-unchanged"')),
    "selecting the unchanged branch must enter its owner prototype",
  );
});

test("PetMind unchanged routing exposes the owner-unchanged and next-followup pair with synchronized copy", () => {
  const assistant = assistantSource();
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const typeMatch = assistant.match(/type\s+ReachRoutingView\s*=\s*([^;]+);/);

  assert.ok(typeMatch, "missing ReachRoutingView union");
  [
    "owner-feedback",
    "observation-ended",
    "owner-unchanged",
    "next-followup",
  ].forEach((view) => {
    assert.ok(
      typeMatch[1].includes(`"${view}"`),
      `ReachRoutingView must include ${view}`,
    );
  });
  assert.ok(
    assistant.includes('"owner-unchanged": {') &&
      assistant.includes('title: "宠主反馈【无变化】"'),
    "the unchanged owner title must come from the shared copy map",
  );
  assert.ok(
    assistant.includes('"next-followup": {') &&
      assistant.includes('title: "安排下一次回访"'),
    "the employee title must come from the shared copy map",
  );
  assert.ok(panel.includes("REACH_ROUTING_VIEW_COPY[view].title"));
  assert.ok(panel.includes("REACH_ROUTING_VIEW_COPY[view].subtitle"));
  assert.ok(panel.includes("data-reach-routing-owner-unchanged-prototype"));
  assert.ok(panel.includes("data-reach-routing-next-followup-prototype"));
});

test("PetMind unchanged phone pair has title, half-preview, and owner-send entrances wired to the same synchronous selector", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const tabOpening = openingTagForMarker(panel, "data-reach-routing-tab={view}");
  const previewOpening = openingTagForMarker(
    panel,
    "data-reach-routing-preview-hotspot={view}",
  );
  const ownerSendOpening = openingTagForMarker(
    panel,
    "data-reach-routing-owner-send-hotspot",
  );

  assert.ok(tabOpening.includes("onClick={() => onSelectView(view)}"));
  assert.ok(previewOpening.includes("onClick={() => onSelectView(view)}"));
  assert.match(previewOpening, /(?:w-1\/2|w-\[50%\]|basis-1\/2)/);
  assert.ok(
    ownerSendOpening.includes('onSelectView("next-followup")') ||
      ownerSendOpening.includes("onSelectView(ownerNextView)") ||
      ownerSendOpening.includes("onSelectView(nextView)"),
    "the unchanged owner send hotspot must enter next-followup",
  );
  assert.ok(stageFive.includes("onSelectView={selectReachRoutingView}"));
  assertNoViewportSideEffects(stageFive, "unchanged branch selection");
  assertNoViewportSideEffects(panel, "unchanged prototype selection");
});

test("PetMind unchanged outer pair uses the Figma 0.3 second ease-out transition for main and 50 percent preview geometry", () => {
  const assistant = assistantSource();
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const ownerOpening = openingTagForMarker(
    panel,
    "data-reach-routing-owner-unchanged-prototype",
  );
  const employeeOpening = openingTagForMarker(
    panel,
    "data-reach-routing-next-followup-prototype",
  );

  assert.match(
    assistant,
    /const\s+REACH_ROUTING_TRANSITION_SECONDS\s*=\s*0\.3\s*;/,
  );
  assert.match(
    assistant,
    /const\s+REACH_ROUTING_EASING\s*=\s*"easeOut"\s*;/,
  );
  [ownerOpening, employeeOpening].forEach((opening) => {
    assert.ok(opening.startsWith("<motion."));
    assert.ok(opening.includes("transition={transition}"));
  });
  assert.ok(panel.includes("ownerUnchangedIsMain ? 70 : -114"));
  assert.ok(panel.includes("nextFollowUpIsMain ? 70 : 414"));
  assert.ok(panel.includes("y: ownerUnchangedIsMain ? 12 : 185"));
  assert.ok(panel.includes("y: nextFollowUpIsMain ? 12 : 185"));
});

test("PetMind next-followup prototype follows all five Figma variants at 200, 1100, 2000, and 2900 milliseconds", () => {
  const assistant = assistantSource();
  const nextFollowUp = functionSource(
    assistant,
    "ReachRoutingNextFollowUpPrototype",
  );
  const phases = literalArrayForConstant(
    assistant,
    "REACH_ROUTING_NEXT_FOLLOWUP_PHASES",
  );

  assert.equal(phases.length, 5, "Figma 3997:29917 contains five variants");
  assert.deepEqual(
    numberArrayForConstant(
      assistant,
      "REACH_ROUTING_NEXT_FOLLOWUP_SWITCH_MS",
    ),
    [200, 1100, 2000, 2900],
  );
  assert.match(
    assistant,
    /type\s+ReachRoutingNextFollowUpPhase\s*=\s*\(typeof\s+REACH_ROUTING_NEXT_FOLLOWUP_PHASES\)\[number\]\s*;/,
  );
  assert.ok(
    nextFollowUp.includes("data-reach-routing-next-followup-phase={phase}"),
  );
  assert.ok(
    nextFollowUp.includes("REACH_ROUTING_NEXT_FOLLOWUP_SWITCH_MS.map"),
  );
  assert.match(
    nextFollowUp,
    /REACH_ROUTING_NEXT_FOLLOWUP_PHASES\[(?:index|phaseIndex)\s*\+\s*1\]/,
  );
  assert.ok(nextFollowUp.includes("REACH_ROUTING_TRANSITION_SECONDS"));
  assert.ok(nextFollowUp.includes("REACH_ROUTING_EASING"));
  assert.match(
    nextFollowUp,
    /duration:\s*shouldReduceMotion\s*\?\s*0\s*:\s*REACH_ROUTING_TRANSITION_SECONDS/,
  );
});

test("PetMind next-followup renders the six supplied Figma message layers as resident image nodes instead of reconstructed text", () => {
  const assistant = assistantSource();
  const nextFollowUp = functionSource(
    assistant,
    "ReachRoutingNextFollowUpPrototype",
  );
  const layerAssets = [
    [
      "check-in",
      "reachRoutingNextFollowUpCheckIn",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-checkin.png",
    ],
    [
      "report-delivered",
      "reachRoutingNextFollowUpReportDelivered",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-report.png",
    ],
    [
      "question",
      "reachRoutingNextFollowUpQuestion",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-question.png",
    ],
    [
      "owner-reply",
      "reachRoutingNextFollowUpOwnerReply",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-owner-photo.png",
    ],
    [
      "employee-reply",
      "reachRoutingNextFollowUpEmployeeReply",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-employee-advice.png",
    ],
    [
      "owner-ack",
      "reachRoutingNextFollowUpOwnerAck",
      "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-owner-ack.png",
    ],
  ] as const;

  layerAssets.forEach(([marker, assetName, assetPath]) => {
    assert.ok(
      assistant.includes(`${assetName}:\n    "${assetPath}"`),
      `missing exact supplied next-followup layer asset: ${assetName}`,
    );
    assert.ok(
      nextFollowUp.includes(`data-reach-routing-next-followup-layer="${marker}"`),
      `the ${marker} layer must remain mounted inside the stable prototype`,
    );
    assert.ok(
      nextFollowUp.includes(`src={ASSETS.${assetName}}`),
      `the ${marker} layer must render the supplied PNG`,
    );
  });

  assert.equal(
    nextFollowUp.includes("<ReachRoutingNextFollowUpQuestionGroup"),
    false,
    "next-followup message copy must not be reconstructed with text DOM",
  );
  assert.equal(
    nextFollowUp.includes("<ReachRoutingObservationReportGroup"),
    false,
    "the delivered report group must use the supplied transparent layer",
  );
  [
    "已完成到店签到",
    "Luna 家长，昨天洗澡发现的泛红区域有没有好点",
    "感觉没啥区别，估计还得看一两天",
    "好的，那您再观察下哈",
  ].forEach((reconstructedCopy) => {
    assert.equal(
      nextFollowUp.includes(reconstructedCopy),
      false,
      `supplied layer copy must not be re-typeset: ${reconstructedCopy}`,
    );
  });
});

test("PetMind next-followup sequence cleans timers, respects reduced motion, and keeps one resident phone without remount, crossfade, scroll, or focus", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const nextFollowUp = functionSource(
    assistant,
    "ReachRoutingNextFollowUpPrototype",
  );

  assert.ok(nextFollowUp.includes("window.setTimeout"));
  assert.ok(nextFollowUp.includes("window.clearTimeout"));
  assert.match(
    nextFollowUp,
    /if\s*\(shouldReduceMotion\)[\s\S]{0,260}REACH_ROUTING_NEXT_FOLLOWUP_PHASES\[REACH_ROUTING_NEXT_FOLLOWUP_PHASES\.length\s*-\s*1\]/,
  );
  assert.match(
    nextFollowUp,
    /return\s*\(\)\s*=>[\s\S]{0,180}(?:forEach|map)[\s\S]{0,120}window\.clearTimeout/,
  );
  assert.ok(
    dependencyArrayContaining(nextFollowUp, [
      "active",
      "resetToken",
      "shouldReduceMotion",
    ]),
    "next-followup timers must restart for activation, replay, and reduced motion",
  );
  assert.equal((panel.match(/data-reach-routing-phone/g) ?? []).length, 1);
  assert.equal(
    (panel.match(/data-reach-routing-owner-unchanged-prototype/g) ?? [])
      .length,
    1,
  );
  assert.equal(
    (panel.match(/data-reach-routing-next-followup-prototype/g) ?? []).length,
    1,
  );
  assert.equal(
    (panel.match(/<ReachRoutingNextFollowUpPrototype\b/g) ?? []).length,
    1,
  );

  const stableScopes = [stageFive, panel, nextFollowUp];
  [
    "key={view}",
    "key={phase}",
    "key={route}",
    "key={`${view}",
    "key={`${phase}",
    "key={`${route}",
    "<AnimatePresence",
    'mode="wait"',
    "src={view ===",
    "src={phase ===",
  ].forEach((unstablePattern) => {
    assert.equal(
      stableScopes.some((scope) => scope.includes(unstablePattern)),
      false,
      `unchanged routing must not remount or crossfade via ${unstablePattern}`,
    );
  });
  assertNoViewportSideEffects(stageFive, "unchanged StageFive state");
  assertNoViewportSideEffects(panel, "unchanged stable phone");
  assertNoViewportSideEffects(nextFollowUp, "next-followup automatic sequence");
});

test("PetMind worsened branch selects the owner feedback and manual task group without selecting patrol", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const worsenedOpening = componentOpeningForTitle(
    stageFive,
    "CompactBranchCard",
    "宠主已反馈【加重】",
  );
  const manualOpening = componentOpeningForTitle(
    stageFive,
    "WorkflowCard",
    "人工任务执行",
  );
  const patrolOpening = componentOpeningForTitle(
    stageFive,
    "WorkflowCard",
    "回访任务巡查",
  );

  assert.deepEqual(
    literalArrayForConstant(assistant, "REACH_ROUTING_WORSENED_VIEWS"),
    ["owner-worsened", "diagnosis-task"],
  );
  assert.ok(worsenedOpening.includes('{...routeInteraction("worsened")}'));
  assert.ok(manualOpening.includes('{...routeInteraction("worsened")}'));
  assert.ok(patrolOpening.includes("active={patrolActive}"));
  assert.ok(stageFive.includes('const patrolActive = selectedRoute !== "worsened"'));
  assert.ok(
    assistant.includes('worsened: "owner-worsened"'),
    "the worsened branch must enter the owner prototype",
  );
});

test("PetMind worsened right panel keeps both prototypes resident and switches titles and half previews synchronously", () => {
  const assistant = assistantSource();
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");

  [
    "owner-worsened",
    "diagnosis-task",
  ].forEach((view) => {
    assert.ok(
      assistant.includes(`\"${view}\": {`),
      `missing shared copy for ${view}`,
    );
  });
  assert.ok(panel.includes("REACH_ROUTING_ROUTE_VIEWS[selectedRoute]"));
  assert.ok(panel.includes("data-reach-routing-owner-worsened-prototype"));
  assert.ok(panel.includes("data-reach-routing-diagnosis-prototype"));
  assert.equal(
    (panel.match(/<ReachRoutingWorsenedOwnerPrototype\b/g) ?? []).length,
    1,
  );
  assert.equal(
    (panel.match(/<ReachRoutingDiagnosisTaskPrototype\b/g) ?? []).length,
    1,
  );
  assert.ok(panel.includes("ownerWorsenedIsMain ? 70 : -114"));
  assert.ok(panel.includes("diagnosisTaskIsMain ? 70 : 414"));
  assert.ok(panel.includes("REACH_ROUTING_VIEW_COPY[view].side"));
  assert.ok(panel.includes("onClick={() => onSelectView(view)}"));
  assertNoViewportSideEffects(panel, "worsened prototype switching");
});

test("PetMind worsened owner prototype uses the five Figma states, supplied resident layers, and exact hotspots", () => {
  const assistant = assistantSource();
  const worsened = functionSource(
    assistant,
    "ReachRoutingWorsenedOwnerPrototype",
  );

  assert.deepEqual(
    literalArrayForConstant(assistant, "REACH_ROUTING_WORSENED_PHASES"),
    ["draft", "sent", "slots", "selected", "appointment"],
  );
  [
    "reachRoutingWorsenedBackgroundDraft",
    "reachRoutingWorsenedBackgroundThread",
    "reachRoutingWorsenedOwnerBase",
    "reachRoutingWorsenedReport",
    "reachRoutingWorsenedFollowUp",
    "reachRoutingWorsenedOwnerReply",
    "reachRoutingWorsenedAiAdvice",
    "reachRoutingWorsenedSlotsInitial",
    "reachRoutingWorsenedSlotsActive",
    "reachRoutingWorsenedDoctorInitial",
    "reachRoutingWorsenedDoctorActive",
    "reachRoutingWorsenedSlotConfirmed",
    "reachRoutingWorsenedAppointment",
  ].forEach((asset) => {
    assert.ok(worsened.includes(`src={ASSETS.${asset}}`), `missing ${asset}`);
  });
  assert.ok(worsened.includes('top-[82px]'));
  assert.ok(worsened.includes('phase === "draft" ? 410 : 532'));
  assert.ok(worsened.includes('rounded-t-[18px]'));
  [
    "top-[20px]",
    "top-[185px]",
    "top-[201px]",
    "top-[309px]",
    "top-[325px]",
    "top-[414px]",
    "top-[543px]",
    "top-[642px]",
    "top-[865px]",
    "top-[961px]",
    "top-[1012px]",
  ].forEach((position) => {
    assert.ok(worsened.includes(position), `missing ${position}`);
  });
  assert.ok(worsened.includes("7月28日 14:03"));
  assert.ok(worsened.includes("7月29日 13:24"));
  assert.ok(!worsened.includes("rgba(78, 57, 43, 0.96)"));
  assert.ok(!worsened.includes("reachRoutingOwnerReplyImproved"));
  assert.ok(!worsened.includes("left-[-240px]"));
  assert.ok(worsened.includes("[0, -7, -425, -476, -620]"));
  assert.ok(worsened.includes("data-reach-routing-worsened-send-hotspot"));
  assert.ok(worsened.includes("left-[270.449px]"));
  assert.ok(worsened.includes("top-[629.449px]"));
  assert.ok(worsened.includes("h-[30.6px]"));
  assert.ok(worsened.includes("w-[30.6px]"));
  assert.ok(worsened.includes("radius={28.8}"));
  assert.ok(worsened.includes("data-reach-routing-worsened-slot-hotspot"));
  assert.ok(worsened.includes("left-[46.05px]"));
  assert.ok(worsened.includes("top-[67px]"));
  assert.ok(worsened.includes("h-[27px]"));
  assert.ok(worsened.includes("w-[102px]"));
  assert.ok(worsened.includes("radius={8}"));
  assert.ok(worsened.includes('color="#fff"'));
  assert.ok(worsened.includes("maxOpacity={0.5}"));
  assert.ok(worsened.includes("minOpacity={0.125}"));
  assert.ok(worsened.includes("reducedOpacity={0.5}"));
  assert.ok(worsened.includes("stroke={2}"));
  assert.ok(worsened.includes("<ActionHotspotPulse"));
  assertNoViewportSideEffects(worsened, "worsened owner flow");
});

test("PetMind diagnosis task inserts the Luna row after 0.6 seconds with Figma 0.3 second ease-out motion and then stops", () => {
  const assistant = assistantSource();
  const diagnosis = functionSource(
    assistant,
    "ReachRoutingDiagnosisTaskPrototype",
  );

  assert.match(
    assistant,
    /const\s+REACH_ROUTING_DIAGNOSIS_INSERT_DELAY_MS\s*=\s*600\s*;/,
  );
  assert.ok(diagnosis.includes("REACH_ROUTING_DIAGNOSIS_INSERT_DELAY_MS"));
  assert.ok(diagnosis.includes("REACH_ROUTING_TRANSITION_SECONDS"));
  assert.ok(diagnosis.includes("REACH_ROUTING_EASING"));
  assert.ok(diagnosis.includes("window.setTimeout"));
  assert.ok(diagnosis.includes("window.clearTimeout"));
  assert.ok(diagnosis.includes("data-reach-routing-diagnosis-state"));
  assert.ok(diagnosis.includes("data-reach-routing-diagnosis-new-row"));
  assert.ok(diagnosis.includes("data-reach-routing-diagnosis-new-indicator"));
  assert.ok(diagnosis.includes("data-reach-routing-diagnosis-total-count"));
  assert.ok(diagnosis.includes("data-reach-routing-diagnosis-day-count"));
  assert.ok(diagnosis.includes("ASSETS.reachRoutingDiagnosisDayCount"));
  assert.ok(diagnosis.includes("ASSETS.reachRoutingDiagnosisNewIndicator"));
  assert.ok(diagnosis.includes("data-reach-routing-diagnosis-divider"));
  assert.ok(diagnosis.includes("ASSETS.reachRoutingDiagnosisDivider"));
  assert.ok(diagnosis.includes("data-reach-routing-diagnosis-existing-list"));
  assert.ok(diagnosis.includes("top-[278px]"));
  assert.ok(diagnosis.includes("inserted ? 91 : 0"));
  assert.ok(diagnosis.includes("inserted ? 231 : 322"));
  assert.ok(diagnosis.includes("top: index * 65"));
  assert.ok(diagnosis.includes("top-[352px]"));
  assert.ok(diagnosis.includes("left-[18px]"));
  assert.ok(diagnosis.includes("w-[284px]"));
  assert.ok(diagnosis.includes("left-[119.5px]"));
  assert.ok(diagnosis.includes("top-[171.5px]"));
  assert.ok(diagnosis.includes("h-[16px]"));
  assert.ok(diagnosis.includes("left-[-3px]"));
  assert.ok(diagnosis.includes("top-[-3px]"));
  assert.ok(diagnosis.includes("h-[13px]"));
  assert.ok(diagnosis.includes("w-[22.6px]"));
  assert.equal(diagnosis.includes("owner-unchanged"), false);
  assert.equal((diagnosis.match(/window\.setTimeout/g) ?? []).length, 1);
  assertNoViewportSideEffects(diagnosis, "diagnosis insertion flow");
});

test("PetMind overdue selection activates overdue and manual execution without leaving patrol selected", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const overdueOpening = componentOpeningForTitle(
    stageFive,
    "CompactBranchCard",
    "宠主【逾期未反馈】",
  );
  const manualOpening = componentOpeningForTitle(
    stageFive,
    "WorkflowCard",
    "人工任务执行",
  );
  const patrolOpening = componentOpeningForTitle(
    stageFive,
    "WorkflowCard",
    "回访任务巡查",
  );

  assert.deepEqual(
    literalArrayForConstant(assistant, "REACH_ROUTING_OVERDUE_VIEWS"),
    ["merchant-wakeup", "owner-repurchase"],
  );
  assert.ok(overdueOpening.includes('{...routeInteraction("overdue")}'));
  assert.ok(patrolOpening.includes("active={patrolActive}"));
  assert.ok(manualOpening.includes("active={manualTaskActive}"));
  assert.match(
    stageFive,
    /const\s+patrolActive\s*=\s*selectedRoute\s*!==\s*"worsened"\s*&&\s*selectedRoute\s*!==\s*"overdue"\s*;/,
  );
  assert.match(
    stageFive,
    /const\s+manualTaskActive\s*=\s*selectedRoute\s*===\s*"worsened"\s*\|\|\s*selectedRoute\s*===\s*"overdue"\s*;/,
  );
  assert.ok(
    assistant.includes("overdue: REACH_ROUTING_OVERDUE_VIEWS"),
    "overdue must own a dedicated right-side pair",
  );
  assert.ok(
    assistant.includes('overdue: "merchant-wakeup"'),
    "selecting overdue must enter merchant wakeup by default",
  );
});

test("PetMind overdue tabs and 50 percent side preview switch to owner repurchase without changing the left selection", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const tabOpening = openingTagForMarker(
    panel,
    "data-reach-routing-tab={view}",
  );
  const previewOpening = openingTagForMarker(
    panel,
    "data-reach-routing-preview-hotspot={view}",
  );
  const selectViewStart = stageFive.indexOf("const selectReachRoutingView");
  const routeInteractionStart = stageFive.indexOf(
    "const routeInteraction",
    selectViewStart,
  );

  assert.ok(
    /"merchant-wakeup":\s*\{[\s\S]{0,260}title:\s*"商户端｜用户唤醒"[\s\S]{0,260}side:\s*"merchant"/.test(
      assistant,
    ),
    "merchant wakeup must have merchant copy and actor ownership",
  );
  assert.ok(
    /"owner-repurchase":\s*\{[\s\S]{0,260}title:\s*"宠主端｜复购邀约"[\s\S]{0,260}side:\s*"owner"/.test(
      assistant,
    ),
    "owner repurchase must have owner copy and actor ownership",
  );
  assert.ok(panel.includes("REACH_ROUTING_ROUTE_VIEWS[selectedRoute]"));
  assert.ok(tabOpening.includes("onClick={() => onSelectView(view)}"));
  assert.ok(previewOpening.includes("onClick={() => onSelectView(view)}"));
  assert.match(previewOpening, /(?:w-1\/2|w-\[50%\]|basis-1\/2)/);
  assert.ok(selectViewStart >= 0 && routeInteractionStart > selectViewStart);

  const selectViewSource = stageFive.slice(
    selectViewStart,
    routeInteractionStart,
  );
  assert.equal(selectViewSource.includes("setSelectedRoute"), false);
  assert.equal(selectViewSource.includes("setHoveredRoute"), false);
  assert.ok(stageFive.includes("onSelectView={selectReachRoutingView}"));
});

test("PetMind overdue keeps merchant and owner prototypes and every supplied image layer resident without remounts or fades", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const merchant = functionSource(
    assistant,
    "ReachRoutingOverdueMerchantPrototype",
  );
  const owner = functionSource(
    assistant,
    "ReachRoutingOverdueOwnerPrototype",
  );
  const merchantAssets = [
    [
      "reachRoutingOverdueMerchantInitial",
      "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-initial.jpg",
    ],
    [
      "reachRoutingOverdueMerchantPreview",
      "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-preview.jpg",
    ],
    [
      "reachRoutingOverdueMerchantUpdated",
      "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-updated.jpg",
    ],
  ] as const;
  const ownerAssets = [
    [
      "reachRoutingOverdueOwnerSidebarInitial",
      "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-sidebar-initial.jpg",
    ],
    [
      "reachRoutingOverdueOwnerSidebarUnread1",
      "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-sidebar-unread-1.jpg",
    ],
    [
      "reachRoutingOverdueOwnerSidebarUnread2",
      "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-sidebar-unread-2.jpg",
    ],
    [
      "reachRoutingOverdueOwnerChatBackground",
      "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-background.jpg",
    ],
    ...Array.from({ length: 6 }, (_, index) => [
      `reachRoutingOverdueOwnerChatOverlay${index + 1}`,
      `/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-overlay-${index + 1}.png`,
    ] as const),
  ] as const;

  assert.equal(
    (panel.match(/data-reach-routing-overdue-merchant-prototype/g) ?? [])
      .length,
    1,
  );
  assert.equal(
    (panel.match(/data-reach-routing-overdue-owner-prototype/g) ?? []).length,
    1,
  );
  assert.equal(
    (panel.match(/<ReachRoutingOverdueMerchantPrototype\b/g) ?? []).length,
    1,
  );
  assert.equal(
    (panel.match(/<ReachRoutingOverdueOwnerPrototype\b/g) ?? []).length,
    1,
  );

  const residentAssetGroups: Array<
    [string, ReadonlyArray<readonly [string, string]>]
  > = [
    [merchant, merchantAssets],
    [owner, ownerAssets],
  ];
  residentAssetGroups.forEach(([scope, assets]) => {
    assets.forEach(([asset, publicPath]) => {
      assert.ok(
        assistant.includes(`${asset}:\n    "${publicPath}"`) ||
          assistant.includes(`${asset}: "${publicPath}"`),
        `missing exact overdue ASSETS mapping for ${asset}`,
      );
      assert.ok(
        existsSync(`public${publicPath}`),
        `missing supplied overdue asset: ${publicPath}`,
      );
      assert.equal(
        (scope.match(new RegExp(`src=\\{ASSETS\\.${asset}\\}`, "g")) ?? [])
          .length,
        1,
        `${asset} must stay mounted exactly once`,
      );
    });
  });

  const stableScopes = [stageFive, panel, merchant, owner];
  [
    "key={view}",
    "key={phase}",
    "key={route}",
    "key={`${view}",
    "key={`${phase}",
    "key={`${route}",
    "<AnimatePresence",
    'mode="wait"',
    "src={view ===",
    "src={phase ===",
    "src={selectedView ===",
  ].forEach((unstablePattern) => {
    assert.equal(
      stableScopes.some((scope) => scope.includes(unstablePattern)),
      false,
      `overdue routing must not remount or swap image sources via ${unstablePattern}`,
    );
  });
  [merchant, owner].forEach((scope) => {
    assert.equal(
      /phase\s*===\s*"[^"]+"\s*(?:&&|\?)\s*\(?\s*<(?:motion\.)?img/.test(
        scope,
      ),
      false,
      "phase image nodes must remain resident",
    );
    assert.equal(/opacity:\s*phase/.test(scope), false);
  });
  for (const asset of [
    "reachRoutingOverdueMerchantInitial",
    "reachRoutingOverdueMerchantPreview",
    "reachRoutingOverdueMerchantUpdated",
  ]) {
    const screen = openingTagForMarker(merchant, `src={ASSETS.${asset}}`);
    assert.equal(/\bopacity\s*:/.test(screen), false);
    assert.ok(screen.includes("display:"), "full screens switch instantly");
  }
  assert.ok(owner.includes("data-overdue-owner-message-track"));
  assert.ok(owner.includes("data-overdue-owner-chat-content"));
});

test("PetMind overdue merchant completion card stays left of the mascot at the Figma right anchor", () => {
  const merchant = functionSource(
    assistantSource(),
    "ReachRoutingOverdueMerchantPrototype",
  );
  const completionCard = openingTagForMarker(
    merchant,
    "data-reach-routing-overdue-merchant-completion-card",
  );

  ["right-[122px]", "top-[129px]", "w-[190px]", "h-[126px]"].forEach(
    (position) => assert.ok(completionCard.includes(position), position),
  );
  assert.equal(completionCard.includes("left-[122px]"), false);
});

test("PetMind overdue merchant runs 200ms, 300ms Smart Animate, 800ms, 300ms Smart Animate and then stops", () => {
  const assistant = assistantSource();
  const merchant = functionSource(
    assistant,
    "ReachRoutingOverdueMerchantPrototype",
  );
  const outerPhases = literalArrayForConstant(
    assistant,
    "REACH_ROUTING_OVERDUE_MERCHANT_PHASES",
  );
  const completionPhases = literalArrayForConstant(
    assistant,
    "REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES",
  );
  const switchPoints = numberArrayForConstant(
    assistant,
    "REACH_ROUTING_OVERDUE_MERCHANT_SWITCH_MS",
  );
  const dashboardHotspot = openingTagForMarker(
    merchant,
    "data-reach-routing-overdue-merchant-dashboard-hotspot",
  );
  const previewHotspot = openingTagForMarker(
    merchant,
    "data-reach-routing-overdue-merchant-preview-hotspot",
  );

  assert.equal(
    outerPhases.length,
    3,
    "merchant wakeup has dashboard, preview, and updated full-screen variants",
  );
  assert.equal(
    completionPhases.length,
    3,
    "the updated dashboard card has initial, executed, and next-task variants",
  );
  [dashboardHotspot, previewHotspot].forEach((hotspot) => {
    assert.ok(hotspot.includes("onClick="));
  });
  assertPhaseAdvance(
    merchant,
    "setPhase",
    "REACH_ROUTING_OVERDUE_MERCHANT_PHASES",
    outerPhases,
    1,
  );
  assertPhaseAdvance(
    merchant,
    "setPhase",
    "REACH_ROUTING_OVERDUE_MERCHANT_PHASES",
    outerPhases,
    2,
  );
  assert.deepEqual(switchPoints, [200, 1300]);
  assert.equal(
    switchPoints[1] - switchPoints[0] - 300,
    800,
    "the second transition starts after the first 300ms transition and an 800ms hold",
  );
  assert.match(
    assistant,
    /const\s+REACH_ROUTING_TRANSITION_SECONDS\s*=\s*0\.3\s*;/,
  );
  assert.match(
    assistant,
    /const\s+REACH_ROUTING_EASING\s*=\s*"easeOut"\s*;/,
  );
  assert.ok(
    merchant.includes("data-reach-routing-overdue-merchant-phase={phase}"),
  );
  assert.ok(
    merchant.includes(
      "data-reach-routing-overdue-merchant-completion-phase={completionPhase}",
    ),
  );
  assertPhaseAdvance(
    merchant,
    "setCompletionPhase",
    "REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES",
    completionPhases,
    1,
  );
  assertPhaseAdvance(
    merchant,
    "setCompletionPhase",
    "REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES",
    completionPhases,
    2,
  );
  assertExactSharedTimeline(
    merchant,
    "REACH_ROUTING_OVERDUE_MERCHANT_SWITCH_MS",
    2,
  );
  assert.ok(merchant.includes("REACH_ROUTING_TRANSITION_SECONDS"));
  assert.ok(merchant.includes("REACH_ROUTING_EASING"));
  assert.match(
    merchant,
    /const\s+(?:completionSmart|smart)AnimateTransition\s*=\s*\{[\s\S]*?duration:\s*shouldReduceMotion\s*\?\s*0\s*:\s*REACH_ROUTING_TRANSITION_SECONDS,[\s\S]*?ease:\s*REACH_ROUTING_EASING/,
  );
  assert.ok(
    (
      merchant.match(
        /transition=\{(?:completionSmart|smart)AnimateTransition\}/g,
      ) ?? []
    ).length >= 2,
    "both merchant changes must share the Smart Animate transition",
  );
  assert.doesNotMatch(
    merchant,
    /if\s*\(shouldReduceMotion\)\s*\{[\s\S]*?setCompletionPhase/,
    "reduced motion must keep the executed state and timeline, not skip to the final card",
  );
  assert.ok(
    dependencyArrayContaining(merchant, [
      "active",
      "phase",
      "resetToken",
      "shouldReduceMotion",
    ]),
    "merchant timeline must restart only on activation, replay, or reduced motion",
  );
});

test("PetMind overdue merchant Smart Animate interpolates the card contents, button fill and progress icons", () => {
  const merchant = functionSource(assistantSource(), "ReachRoutingOverdueMerchantPrototype");
  const description = openingTagForMarker(merchant, "data-overdue-completion-description");
  const action = openingTagForMarker(merchant, "data-overdue-completion-action");
  assert.ok(description.startsWith("<motion.p"));
  assert.ok(description.includes("opacity: showsOpportunity ? 1 : 0.5"));
  assert.ok(action.includes("backgroundColor:"));
  assert.ok(action.includes("borderColor:"));
  assert.ok(action.includes("width: showsOpportunity ? 76 : 159"));
  for (const marker of [
    "data-overdue-completion-manual-label",
    "data-overdue-completion-executed-label",
    "data-overdue-completion-smart-action",
  ]) {
    const element = openingTagForMarker(merchant, marker);
    assert.ok(element.startsWith("<motion.span"));
    assert.ok(element.includes("opacity:"));
    assert.equal(element.includes("display:"), false);
  }
  for (const asset of [
    "ProgressStep1Active", "ProgressStep1Executed", "ProgressStep1Complete",
    "ProgressStepInactive", "ProgressStep2Active",
  ]) {
    const icon = openingTagForMarker(merchant, `src={ASSETS.reachRoutingOverdueMerchant${asset}}`);
    assert.ok(icon.startsWith("<motion.img"), asset);
    assert.ok(icon.includes("opacity:"), asset);
    assert.equal(icon.includes("display:"), false, asset);
  }
  assert.ok(merchant.includes('className="h-[82px] w-[173px]"'), "only the outer Figma component clips the moving cards");
});

test("PetMind overdue owner follows the current Figma 500ms waits and 300ms Smart Animate transitions", () => {
  const assistant = assistantSource();
  const owner = functionSource(
    assistant,
    "ReachRoutingOverdueOwnerPrototype",
  );
  const phases = literalArrayForConstant(
    assistant,
    "REACH_ROUTING_OVERDUE_OWNER_PHASES",
  );
  const switchPoints = numberArrayForConstant(
    assistant,
    "REACH_ROUTING_OVERDUE_OWNER_SWITCH_MS",
  );
  const messageHotspot = openingTagForMarker(
    owner,
    "data-reach-routing-overdue-owner-message-hotspot",
  );

  assert.equal(phases.length, 4, "owner repurchase has exactly four variants");
  assert.deepEqual(switchPoints, [500, 1300]);
  assert.equal(
    switchPoints[1] - switchPoints[0] - 300,
    500,
    "the second 500ms wait starts after the first Smart Animate finishes",
  );
  assert.ok(owner.includes("data-reach-routing-overdue-owner-phase={phase}"));
  assertPhaseAdvance(
    owner,
    "setPhase",
    "REACH_ROUTING_OVERDUE_OWNER_PHASES",
    phases,
    1,
  );
  assertPhaseAdvance(
    owner,
    "setPhase",
    "REACH_ROUTING_OVERDUE_OWNER_PHASES",
    phases,
    2,
  );
  assertExactSharedTimeline(
    owner,
    "REACH_ROUTING_OVERDUE_OWNER_SWITCH_MS",
    2,
  );
  assert.ok(messageHotspot.includes("onClick="));
  assert.ok(
    owner.includes(
      `setPhase(REACH_ROUTING_OVERDUE_OWNER_PHASES[3])`,
    ) || owner.includes(`setPhase("${phases[3]}")`),
    "only the message click may enter the final chat variant",
  );
  assert.match(
    owner,
    /const\s+ownerSmartAnimateTransition\s*=\s*\{[\s\S]*?duration:\s*shouldReduceMotion\s*\|\|\s*phase\s*===\s*REACH_ROUTING_OVERDUE_OWNER_PHASES\[0\]\s*\?\s*0\s*:\s*REACH_ROUTING_TRANSITION_SECONDS,[\s\S]*?ease:\s*REACH_ROUTING_EASING/,
  );
  assert.ok(
    (owner.match(/transition=\{ownerSmartAnimateTransition\}/g) ?? []).length >=
      2,
    "automatic message motion and clicked chat motion use the same 300ms easeOut",
  );
  assert.doesNotMatch(
    owner,
    /if\s*\(shouldReduceMotion\)\s*\{[\s\S]*?setPhase/,
    "reduced motion must preserve both notification states",
  );
  assert.ok(
    dependencyArrayContaining(owner, [
      "active",
      "resetToken",
      "shouldReduceMotion",
    ]),
  );
});

test("PetMind worsened branch summary stays on one line with the original Figma punctuation and typography", () => {
  const assistant = assistantSource();
  const branch = functionSource(assistant, "CompactBranchCard");
  const summary = openingTagForMarker(branch, "{children}");
  assert.ok(summary.includes("text-[11px]"));
  assert.ok(summary.includes("leading-[20px]"));
  assert.ok(summary.includes("whitespace-nowrap"));
  assert.ok(branch.includes("pb-[8px] pt-[10px] px-[16px]"));
  const stage = functionSource(assistant, "StageFive");
  assert.ok(stage.includes("停止 AI 建议,创建员工人工任务"));
  assert.equal(stage.includes("停止 AI 建议，创建员工人工任务"), false);
});

test("PetMind repurchase keeps Figma message groups, clipping, preview stroke and exact clickable row", () => {
  const owner = functionSource(assistantSource(), "ReachRoutingOverdueOwnerPrototype");
  const phone = openingTagForMarker(owner, "data-reach-routing-overdue-owner-phase");
  assert.ok(phone.includes("overflow-clip"), "focusing the preview must not scroll the phone");
  const previewHotspot = openingTagForMarker(owner, "data-reach-routing-overdue-owner-message-hotspot");
  assert.ok(previewHotspot.includes("w-[67px]"), "only the visible preview is focusable");
  const hotspot = openingTagForMarker(owner, "data-overdue-owner-row-hotspot");
  for (const value of ["left-[5.05078125px]", "top-[350px]", "w-[242px]", "h-[46px]"]) {
    assert.ok(hotspot.includes(value), value);
  }
  assert.ok(owner.includes("insetOnly"), "the 4px hotspot stroke stays inside the Figma bounds");
  const sidebar = openingTagForMarker(owner, "data-overdue-owner-sidebar");
  assert.equal(sidebar.includes("x:"), false, "the sidebar must not slide left");
  const panel = openingTagForMarker(owner, "data-overdue-owner-chat-panel");
  assert.ok(panel.includes("x: showsConversation ? 0 : 253"));
  assert.ok(owner.includes("border-[0.8px]"));
  const track = openingTagForMarker(owner, "data-overdue-owner-message-track");
  assert.ok(track.includes("top-[-158px]"));
  assert.ok(track.includes("y: showsCompleteMessages ? -468 : showsUnreadOne ? -154 : 0"));
  assert.ok(owner.includes("7月28日 14:03"));
  assert.ok(owner.includes("7月29日 13:24"));
  for (const value of ["top-[165px]", "top-[289px]", "top-[659px]", "top-[707px]", "h-[125px]"]) {
    assert.ok(owner.includes(value), value);
  }
  assert.ok(openingTagForMarker(owner, "data-overdue-owner-new-messages").includes("gap-0"));
  assert.equal(owner.includes('style={{ display: showsUnreadTwo ? "block" : "none" }}\n        />'), false,
    "the sidebar image must not disappear at the start of the final slide");
});

test("PetMind repurchase uses the supplied replacement sidebar 2 and 3 image bytes", () => {
  for (const [filename, hash] of [
    ["unread-1", "eb9d82f2c6f738cf37d036cb8b3cef71ffbf023365c8bdad367c19fd58689b3b"],
    ["unread-2", "096e61767671381fd69deaefb4333f987cc3ec82f88b4bb32a06fea07df9555e"],
  ]) {
    const bytes = readFileSync(`public/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-sidebar-${filename}.jpg`);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), hash);
  }
});

test("PetMind overdue selection and both automatic sequences never scroll or move page focus", () => {
  const assistant = assistantSource();
  const stageFive = functionSource(assistant, "StageFive");
  const panel = functionSource(assistant, "ReachRoutingPrototypePanel");
  const merchant = functionSource(
    assistant,
    "ReachRoutingOverdueMerchantPrototype",
  );
  const owner = functionSource(
    assistant,
    "ReachRoutingOverdueOwnerPrototype",
  );

  [stageFive, panel, merchant, owner].forEach((scope, index) => {
    assertNoViewportSideEffects(scope, `overdue interaction scope ${index + 1}`);
    ["scrollBy", "autoFocus"].forEach((forbidden) => {
      assert.equal(scope.includes(forbidden), false);
    });
  });
});
