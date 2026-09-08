import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const assistantSource = () =>
  readFileSync("src/app/components/PetMindAssistantSection.tsx", "utf8");

const sourceBetween = (source: string, startMarker: string, endMarker: string) => {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);

  assert.ok(start >= 0, `missing source marker: ${startMarker}`);
  assert.ok(end > start, `missing source marker after ${startMarker}: ${endMarker}`);

  return source.slice(start, end);
};

const workflowCardOpeningForTitle = (source: string, title: string) => {
  const titleIndex = source.indexOf(`title="${title}"`);
  assert.ok(titleIndex >= 0, `missing workflow card title: ${title}`);

  const openingStart = source.lastIndexOf("<WorkflowCard", titleIndex);
  const openingEnd = source.indexOf(">", titleIndex);
  assert.ok(openingStart >= 0 && openingEnd > titleIndex, `missing opening tag for ${title}`);

  return source.slice(openingStart, openingEnd + 1);
};

const motionButtonOpeningForMarker = (source: string, marker: string) => {
  const markerIndex = source.indexOf(marker);
  assert.ok(markerIndex >= 0, `missing button marker: ${marker}`);

  const openingStart = source.lastIndexOf("<motion.button", markerIndex);
  const openingEnd = source.indexOf(">", openingStart);
  assert.ok(
    openingStart >= 0 && openingEnd > markerIndex,
    `${marker} must be rendered by a motion.button`,
  );

  return source.slice(openingStart, openingEnd + 1);
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

test("PetMind final AI-report hotspot advances directly to review-send without scrolling or focus transfer", () => {
  const assistant = assistantSource();
  const finalReport = sourceBetween(
    assistant,
    "function AiRecognitionFinalReport",
    "function EventStartRecordingPrototype",
  );
  const recording = sourceBetween(
    assistant,
    "function EventStartRecordingPrototype",
    "function EventStartPrototypePanel",
  );
  const recordingPanel = sourceBetween(
    assistant,
    "function RecordingPrototypePanel",
    "function StageTwo",
  );
  const bridge = sourceBetween(assistant, "function StageOneTwoBridge", "function StageThree");
  const stagePanel = sourceBetween(
    assistant,
    "function PetMindStagePanel",
    "function PetMindAssistantWorkflow",
  );
  const workflow = sourceBetween(
    assistant,
    "function PetMindAssistantWorkflow",
    "export function PetMindAssistantSection",
  );

  [finalReport, recording, recordingPanel, bridge, stagePanel, workflow].forEach((scope) => {
    assert.ok(scope.includes("onAdvanceToReviewSend"), "missing review-send callback link");
  });
  assert.ok(finalReport.includes("data-ai-report-next-flow-hotspot"));
  assert.ok(finalReport.includes("onClick={onAdvanceToReviewSend}"));

  const advanceHandler = sourceBetween(
    workflow,
    "const advanceToReviewSend =",
    "\n\n  return (",
  );
  assert.ok(advanceHandler.includes("setStage(2)"));
  ["scrollIntoView", "scrollTo", "requestAnimationFrame", ".focus("].forEach((forbidden) => {
    assert.equal(
      advanceHandler.includes(forbidden),
      false,
      `review-send advance must not use ${forbidden}`,
    );
  });
});

test("PetMind completed report receipt and supplement button are equivalent review-send entry points", () => {
  const assistant = assistantSource();
  const receiptCard = sourceBetween(
    assistant,
    "function AiReceiptReportCard",
    "function AiRecognitionFinalReport",
  );
  const recording = sourceBetween(
    assistant,
    "function EventStartRecordingPrototype",
    "function EventStartPrototypePanel",
  );
  const bridge = sourceBetween(assistant, "function StageOneTwoBridge", "function StageThree");
  const supplementEntry = motionButtonOpeningForMarker(recording, "data-ai-report-supplement");

  assert.ok(receiptCard.includes("data-ai-report-card-hotspot"));
  assert.ok(receiptCard.includes("onClick={onActivate}"));
  assert.ok(
    recording.includes(
      "onActivate={reportReady ? onAdvanceToReviewSend : undefined}",
    ),
  );
  assert.ok(supplementEntry.includes("onClick={onSupplementReport}"));
  assert.ok(
    supplementEntry.includes("disabled={!reportReady || !onSupplementReport}"),
  );
  assert.ok(bridge.includes("onSupplementReport={onAdvanceToReviewSend}"));
  assert.equal(bridge.includes('setReportPhase("final")'), false);
  ["scrollIntoView", "scrollTo", "requestAnimationFrame", ".focus("].forEach((forbidden) => {
    assert.equal(
      receiptCard.includes(forbidden) || recording.includes(forbidden),
      false,
      `completed-report entry points must not use ${forbidden}`,
    );
  });
});

test("PetMind review-send switches the shared first pair off and passport-write card on as one group", () => {
  const assistant = assistantSource();
  const stageThree = sourceBetween(assistant, "function StageThree", "function StageFour");

  assert.ok(
    assistant.includes('type ReviewSendGroup = "draft-review" | "passport-write";'),
  );
  const defaultGroupMatch = stageThree.match(
    /useState<ReviewSendGroup>\("([^"]+)"\)/,
  );
  assert.ok(defaultGroupMatch, "StageThree must initialize one ReviewSendGroup");

  const draftOpening = workflowCardOpeningForTitle(stageThree, "AI 报告草稿＋证据索引");
  const reviewOpening = workflowCardOpeningForTitle(stageThree, "员工复核 AI 识别结果");
  const draftActive = draftOpening.match(/active=\{([^}]+)\}/)?.[1]?.trim();
  const reviewActive = reviewOpening.match(/active=\{([^}]+)\}/)?.[1]?.trim();

  assert.ok(draftActive, "draft card must derive active state from the shared group");
  assert.equal(reviewActive, draftActive, "the first two cards must share one active expression");
  assert.match(
    stageThree,
    new RegExp(
      `const\\s+${draftActive}\\s*=\\s*\\w+\\s*===\\s*"${defaultGroupMatch[1]}"`,
    ),
  );

  const passportOpening = workflowCardOpeningForTitle(
    stageThree,
    "报告写入既有宠物护照",
  );
  const passportActive = passportOpening.match(/active=\{([^}]+)\}/)?.[1]?.trim();
  assert.ok(passportActive, "passport-write card must have a selected expression");
  assert.notEqual(
    passportActive,
    draftActive,
    "passport-write must be mutually exclusive with the shared first pair",
  );
  assert.match(
    stageThree,
    new RegExp(`const\\s+${passportActive}\\s*=\\s*\\w+\\s*===\\s*"passport-write"`),
  );
});

test("PetMind review-send workflow cards preserve fixed geometry while sharing hover and click groups", () => {
  const assistant = assistantSource();
  const stageThree = sourceBetween(assistant, "function StageThree", "function StageFour");
  const draftOpening = workflowCardOpeningForTitle(stageThree, "AI 报告草稿＋证据索引");
  const reviewOpening = workflowCardOpeningForTitle(stageThree, "员工复核 AI 识别结果");
  const passportOpening = workflowCardOpeningForTitle(
    stageThree,
    "报告写入既有宠物护照",
  );

  assert.ok(
    stageThree.includes("useState<ReviewSendGroup | null>(null)"),
    "StageThree must track one shared hover group",
  );
  assert.ok(stageThree.includes('onPointerEnter: () => setHoveredReviewSendGroup(group)'));
  assert.ok(stageThree.includes("onPointerLeave: () => setHoveredReviewSendGroup(null)"));
  assert.ok(stageThree.includes('onFocus: () => setHoveredReviewSendGroup(group)'));
  assert.ok(stageThree.includes("onBlur: () => setHoveredReviewSendGroup(null)"));
  assert.ok(stageThree.includes("onSelect:"), "cards must expose click selection");

  assert.ok(draftOpening.includes('h-[154px]'));
  assert.ok(reviewOpening.includes('h-[138px]'));
  assert.ok(passportOpening.includes('h-[92px]'));
  assert.ok(draftOpening.includes('reviewSendCardInteraction("draft-review")'));
  assert.ok(reviewOpening.includes('reviewSendCardInteraction("draft-review")'));
  assert.ok(passportOpening.includes('reviewSendCardInteraction("passport-write")'));
});

test("PetMind passport-write summary has equal 16px vertical insets matching Figma", () => {
  const stageThree = sourceBetween(assistantSource(), "function StageThree", "function StageFour");
  const passportOpening = workflowCardOpeningForTitle(stageThree, "报告写入既有宠物护照");
  assert.ok(passportOpening.includes('bodyClassName="!py-[16px]"'));
  assert.ok(passportOpening.includes('className="h-[92px]"'));
  const summary = openingTagForMarker(stageThree, "data-review-send-passport-summary");
  assert.ok(summary.includes("px-[16px] whitespace-nowrap"));
  assert.ok(stageThree.includes("Luna 主链不再经过“报告发出 → 护照认领”。"));
  assert.equal(stageThree.includes("Luna 主链不再经过“报告发出 → 护照认领”·"), false);
});

test("PetMind review-send card selection synchronously resets each group to its matching prototype", () => {
  const assistant = assistantSource();
  const stageThree = sourceBetween(assistant, "function StageThree", "function StageFour");

  assert.ok(stageThree.includes("setReviewSendGroup(group)"));
  assert.ok(
    stageThree.includes(
      'setReviewSendPhase(group === "draft-review" ? "sheet" : "passportWrite")',
    ),
  );
  ["scrollIntoView", "scrollTo", "requestAnimationFrame", ".focus("].forEach(
    (forbidden) => {
      assert.equal(
        stageThree.includes(forbidden),
        false,
        `review-send card selection must not use ${forbidden}`,
      );
    },
  );
});

test("PetMind review-send prototype follows the exact sheet-to-receipt phase order", () => {
  const assistant = assistantSource();
  const stageThree = sourceBetween(assistant, "function StageThree", "function StageFour");
  const reviewPrototype = sourceBetween(
    assistant,
    "function ReviewSendPrototype",
    "function StageThree",
  );

  assert.ok(
    assistant.includes(
      'type ReviewSendPhase = "sheet" | "album" | "albumSelected" | "reportComplete" | "receipt" | "passportWrite";',
    ),
  );
  assert.ok(
    assistant.includes(
      'const REVIEW_SEND_PHASE_SEQUENCE = ["sheet", "album", "albumSelected", "reportComplete", "receipt", "passportWrite"] as const;',
    ),
  );
  assert.ok(stageThree.includes('useState<ReviewSendPhase>("sheet")'));
  assert.ok(reviewPrototype.includes("data-review-send-phase={phase}"));

  REVIEW_SEND_PHASES.forEach((phase) => {
    assert.ok(reviewPrototype.includes(`"${phase}"`), `missing review-send phase ${phase}`);
  });
});

test("PetMind review-send action sheet rises from the phone bottom on entry", () => {
  const assistant = assistantSource();
  const actionSheet = sourceBetween(
    assistant,
    "function ReviewSendActionSheet",
    "function ReviewSendReceiptConfirmedCard",
  );

  assert.ok(actionSheet.includes("data-review-send-sheet-entrance"));
  assert.ok(actionSheet.includes('bg-[rgba(0,0,0,0.5)]'));
  assert.ok(actionSheet.includes('initial={shouldReduceMotion ? false : { y: 273 }}'));
  assert.ok(actionSheet.includes('animate={{ y: 0 }}'));
  assert.equal(actionSheet.includes('backgroundColor: "rgba(0,0,0,0)"'), false);
  assert.ok(actionSheet.includes('top-[47px]'));
});

test("PetMind review-send album steps switch immediately without page crossfades", () => {
  const assistant = assistantSource();
  const reportPage = sourceBetween(
    assistant,
    "function ReviewSendReportPage",
    "function ReviewSendActionSheet",
  );
  const reviewPrototype = sourceBetween(
    assistant,
    "function ReviewSendPrototype",
    "function StageThree",
  );

  ["report", "album", "album-selected", "receipt", "sheet", "passport-write"].forEach((layer) => {
    assert.ok(
      reviewPrototype.includes(`data-review-send-layer="${layer}"`),
      `missing stable review-send layer ${layer}`,
    );
  });
  assert.equal(reviewPrototype.includes("transition={transition}"), false);
  assert.equal(reviewPrototype.includes("animate={{ opacity:"), false);
  assert.equal(reportPage.includes("transition={transition}"), false);
  assert.equal(reportPage.includes("animate={{ opacity:"), false);
  assert.ok(reviewPrototype.includes('display: albumVisible ? "block" : "none"'));
  assert.ok(
    reviewPrototype.includes(
      'display: albumSelectedVisible ? "block" : "none"',
    ),
  );
  assert.ok(reviewPrototype.includes('transition: "none"'));
  assert.ok(reviewPrototype.includes('animation: "none"'));
  assert.equal(reportPage.includes("opacity: complete"), false);
  assert.ok(
    reportPage.includes(
      "src={complete ? ASSETS.reviewSendReportContentConfirmed : ASSETS.aiRecognitionReportContent}",
    ),
  );
  assert.ok(reviewPrototype.includes("ASSETS.reviewSendPhotoPickerSelected"));
  assert.ok(reviewPrototype.includes("void image.decode().catch(() => undefined)"));
});

test("PetMind review-send confirm push enters passport-write without advancing the global stage", () => {
  const assistant = assistantSource();
  const stageThree = sourceBetween(assistant, "function StageThree", "function StageFour");
  const reviewPrototype = sourceBetween(
    assistant,
    "function ReviewSendPrototype",
    "function StageThree",
  );

  assert.ok(reviewPrototype.includes("onConfirmPush"));
  assert.ok(stageThree.includes('selectReviewSendGroup("passport-write")'));
  assert.ok(stageThree.includes("setReviewSendGroup(group)"));
  assert.ok(
    stageThree.includes(
      'setReviewSendPhase(group === "draft-review" ? "sheet" : "passportWrite")',
    ),
  );
  assert.equal(stageThree.includes("setStage("), false);
  ["scrollIntoView", "scrollTo", "requestAnimationFrame", ".focus("].forEach(
    (forbidden) => {
      assert.equal(
        stageThree.includes(forbidden),
        false,
        `passport-write advance must not use ${forbidden}`,
      );
    },
  );
});

test("PetMind passport-write keeps one mounted phone and switches its stable layer without a page crossfade", () => {
  const assistant = assistantSource();
  const stageThree = sourceBetween(assistant, "function StageThree", "function StageFour");
  const reviewPrototype = sourceBetween(
    assistant,
    "function ReviewSendPrototype",
    "function StageThree",
  );

  assert.equal((stageThree.match(/<ReviewSendPrototype\b/g) ?? []).length, 1);
  assert.ok(reviewPrototype.includes("data-review-send-phone"));
  assert.ok(reviewPrototype.includes('data-review-send-layer="passport-write"'));
  assert.ok(reviewPrototype.includes('display: passportWriteVisible ? "block" : "none"'));
  assert.equal(reviewPrototype.includes("animate={{ opacity:"), false);

  [
    "key={phase}",
    "key={reviewSendPhase}",
    "key={`${phase}",
    "key={`${reviewSendPhase}",
  ].forEach((unstableKey) => {
    assert.equal(
      reviewPrototype.includes(unstableKey),
      false,
      `review-send phone must not remount via ${unstableKey}`,
    );
  });
});

test("PetMind passport-write uses the supplied owner-home and paw-sticker resources", () => {
  const assistant = assistantSource();
  const ownerHome =
    "public/figma-assets/petmind-assistant-05-passport-owner-home.jpg";
  const pawSticker =
    "public/figma-assets/petmind-assistant-05-passport-paw-sticker.png";

  assert.ok(existsSync(ownerHome), `missing supplied owner-home asset: ${ownerHome}`);
  assert.ok(existsSync(pawSticker), `missing supplied paw-sticker asset: ${pawSticker}`);
  assert.ok(
    /reviewSendPassportOwnerHome:\s*\n?\s*"\/figma-assets\/petmind-assistant-05-passport-owner-home\.jpg"/.test(
      assistant,
    ),
  );
  assert.ok(
    /reviewSendPassportPawSticker:\s*\n?\s*"\/figma-assets\/petmind-assistant-05-passport-paw-sticker\.png"/.test(
      assistant,
    ),
  );
  assert.ok(assistant.includes("ASSETS.reviewSendPassportOwnerHome"));
  assert.ok(assistant.includes("ASSETS.reviewSendPassportPawSticker"));
});

test("PetMind passport notification uses the merged Figma image as a phone-level island sibling", () => {
  const assistant = assistantSource();
  const passportPrototype = sourceBetween(
    assistant,
    "function PassportWritePrototype",
    "function ReviewSendPrototype",
  );
  const notificationAsset =
    "public/figma-assets/petmind-assistant-05-passport-notification-container-4x.png";

  assert.ok(
    existsSync(notificationAsset),
    `missing merged notification asset: ${notificationAsset}`,
  );
  assert.ok(
    /reviewSendPassportNotificationContainer:\s*\n?\s*"\/figma-assets\/petmind-assistant-05-passport-notification-container-4x\.png"/.test(
      assistant,
    ),
  );
  assert.ok(
    passportPrototype.includes(
      '</motion.div>\n      <motion.img\n        alt=""',
    ),
    "notification image must be a sibling after the Dynamic Island rather than clipped inside it",
  );

  const notificationMarker = passportPrototype.indexOf(
    "src={ASSETS.reviewSendPassportNotificationContainer}",
  );
  assert.ok(notificationMarker >= 0, "notification image must directly use its merged asset");
  const notificationOpeningStart = passportPrototype.lastIndexOf(
    "<motion.img",
    notificationMarker,
  );
  const notificationOpening = passportPrototype.slice(
    notificationOpeningStart,
    passportPrototype.indexOf(">", notificationMarker) + 1,
  );
  ["left-[19.71px]", "top-[19px]", "w-[280px]", "h-[56px]"].forEach(
    (token) => {
      assert.ok(
        notificationOpening.includes(token),
        `notification image missing phone-space geometry ${token}`,
      );
    },
  );
});

test("PetMind passport final sticker stays inside the island at the exact 56-square position", () => {
  const assistant = assistantSource();
  const passportPrototype = sourceBetween(
    assistant,
    "function PassportWritePrototype",
    "function ReviewSendPrototype",
  );
  const stickerAssetIndex = passportPrototype.indexOf(
    "src={ASSETS.reviewSendPassportPawSticker}",
  );
  assert.ok(stickerAssetIndex >= 0, "missing passport paw sticker in the island");
  const stickerMotionStart = passportPrototype.lastIndexOf(
    "<motion.div",
    stickerAssetIndex,
  );
  const stickerMotion = passportPrototype.slice(stickerMotionStart, stickerAssetIndex);

  assert.ok(stickerMotion.includes("height: notificationVisible ? 56 : 20"));
  assert.ok(stickerMotion.includes("left: wideVisible ? 11 : 5"));
  assert.ok(stickerMotion.includes("top: notificationVisible ? 11 : 5"));
  assert.ok(stickerMotion.includes("width: notificationVisible ? 56 : 20"));

  const islandMarker = passportPrototype.indexOf(
    "data-passport-island-phase={islandPhase}",
  );
  assert.ok(
    islandMarker >= 0 && stickerMotionStart > islandMarker,
    "paw sticker must remain a descendant of the Dynamic Island",
  );
});

test("PetMind passport camera reuses all three Figma resources at compact, wide, and notification x positions", () => {
  const assistant = assistantSource();
  const passportPrototype = sourceBetween(
    assistant,
    "function PassportWritePrototype",
    "function ReviewSendPrototype",
  );

  assert.ok(
    passportPrototype.includes(
      'islandPhase === "notification" ? 174 : islandPhase === "wide" ? 184 : 74',
    ),
    "camera local x must be compact 74, wide 184, and notification 174",
  );
  assert.ok(passportPrototype.includes("animate={{ left: cameraLeft }}"));

  [
    [
      "reviewSendPassportCameraLens1",
      "/figma-assets/petmind-assistant-05-passport-camera-lens1.svg",
      "public/figma-assets/petmind-assistant-05-passport-camera-lens1.svg",
    ],
    [
      "reviewSendPassportCameraLens",
      "/figma-assets/petmind-assistant-05-passport-camera-lens.png",
      "public/figma-assets/petmind-assistant-05-passport-camera-lens.png",
    ],
    [
      "reviewSendPassportCameraLine",
      "/figma-assets/petmind-assistant-05-passport-camera-line.svg",
      "public/figma-assets/petmind-assistant-05-passport-camera-line.svg",
    ],
  ].forEach(([assetKey, publicPath, diskPath]) => {
    assert.ok(existsSync(diskPath), `missing Figma camera resource: ${diskPath}`);
    assert.ok(
      assistant.includes(`${assetKey}:`) && assistant.includes(`"${publicPath}"`),
      `missing camera asset mapping for ${assetKey}`,
    );
    assert.ok(
      passportPrototype.includes(`src={ASSETS.${assetKey}}`),
      `camera must directly use ${assetKey}`,
    );
  });
});

test("PetMind passport Dynamic Island follows compact, wide, then notification timing and cleans up", () => {
  const assistant = assistantSource();
  const passportPrototype = sourceBetween(
    assistant,
    "function PassportWritePrototype",
    "function ReviewSendPrototype",
  );

  assert.ok(
    assistant.includes(
      'type PassportIslandPhase = "compact" | "wide" | "notification";',
    ),
  );
  assert.ok(
    assistant.includes(
      'const PASSPORT_ISLAND_PHASE_SEQUENCE = ["compact", "wide", "notification"] as const;',
    ),
  );
  assert.match(assistant, /PASSPORT_ISLAND_WIDE_START_MS\s*=\s*400/);
  assert.match(assistant, /PASSPORT_ISLAND_NOTIFICATION_START_MS\s*=\s*701/);
  assert.ok(passportPrototype.includes("data-passport-island-phase={islandPhase}"));
  assert.ok(passportPrototype.includes('setIslandPhase("wide")'));
  assert.ok(passportPrototype.includes('setIslandPhase("notification")'));
  assert.ok(passportPrototype.includes("PASSPORT_ISLAND_WIDE_START_MS"));
  assert.ok(passportPrototype.includes("PASSPORT_ISLAND_NOTIFICATION_START_MS"));
  assert.match(passportPrototype, /duration:\s*0\.3[^}]*ease:\s*["']easeOut["']/s);
  assert.match(passportPrototype, /duration:\s*0\.2[^}]*ease:\s*["']easeOut["']/s);
  assert.ok(passportPrototype.includes("clearTimeout("));
});

test("PetMind reduced motion resolves the passport Dynamic Island directly to its notification state", () => {
  const assistant = assistantSource();
  const passportPrototype = sourceBetween(
    assistant,
    "function PassportWritePrototype",
    "function ReviewSendPrototype",
  );

  assert.match(
    passportPrototype,
    /if\s*\(shouldReduceMotion\)[\s\S]*?setIslandPhase\("notification"\)[\s\S]*?return/,
  );
});

test("PetMind final passport notification exposes the full 300 by 78 hotspot and stops before report navigation", () => {
  const assistant = assistantSource();
  const passportPrototype = sourceBetween(
    assistant,
    "function PassportWritePrototype",
    "function ReviewSendPrototype",
  );
  const hotspot = openingTagForMarker(
    passportPrototype,
    "data-passport-island-hotspot",
  );

  ["left-[10px]", "top-[8px]", "w-[300px]", "h-[78px]"].forEach((token) => {
    assert.ok(hotspot.includes(token), `passport notification hotspot missing ${token}`);
  });
  ["href=", "setStage(", "onPhaseChange(", "window.location"].forEach((navigation) => {
    assert.equal(
      hotspot.includes(navigation),
      false,
      `passport notification must stop before report navigation: ${navigation}`,
    );
  });
});

const REVIEW_SEND_PHASES = [
  "sheet",
  "album",
  "albumSelected",
  "reportComplete",
  "receipt",
  "passportWrite",
] as const;
