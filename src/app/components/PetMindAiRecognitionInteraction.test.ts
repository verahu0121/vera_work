import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

test("PetMind AI recognition links the upper and lower workflow cards as two hoverable selectable groups", () => {
  const assistant = assistantSource();
  const aiStage = sourceBetween(assistant, "function WorkflowCard", "function StageOneTwoBridge");

  assert.ok(assistant.includes('type AiRecognitionGroup = "evidence" | "report";'));
  assert.ok(aiStage.includes("data-ai-recognition-group"));
  assert.ok(aiStage.includes("selectedGroup"));
  assert.ok(aiStage.includes("hoveredGroup"));
  assert.ok(aiStage.includes("setHoveredGroup"));
  assert.ok(aiStage.includes("onPointerEnter"));
  assert.ok(aiStage.includes("onPointerLeave"));
  assert.ok(aiStage.includes("onFocus"));
  assert.ok(aiStage.includes("onSelectGroup"));
  assert.ok(aiStage.includes('"evidence"'));
  assert.ok(aiStage.includes('"report"'));

  [
    "服务视频＋订单执行清单写入",
    "AI 提取关键画面与执行证据",
    "结构化服务事件",
    "AI 提取关键画面与执行证据生成报告",
  ].forEach((title) => assert.ok(aiStage.includes(title), `missing linked card ${title}`));
});

test("PetMind AI report generation card keeps the Figma risk title and full multiline configuration copy", () => {
  const assistant = assistantSource();
  const stage = sourceBetween(assistant, "function StageTwo", "function StageOneTwoBridge");
  const reportTitle = stage.indexOf('title="AI 提取关键画面与执行证据生成报告"');
  const report = stage.slice(stage.lastIndexOf("<WorkflowCard", reportTitle), stage.indexOf("</WorkflowCard>", reportTitle));
  assert.ok(report.includes('actors={["employee", "ai"]}'));
  assert.ok(report.includes('className="h-[150px]"'));
  assert.ok(report.includes('className="px-[16px] whitespace-nowrap"'));
  assert.ok(report.includes("grid-cols-2 gap-[8px] px-[8px]"));
  assert.ok(report.includes('title="预配置生效：商户服务配置"'));
  assert.ok(report.includes('title="预配置生效：平台风险边界"'));
  assert.equal(report.includes('title="预配置生效：观察与描述标准"'), false);
  assert.ok(report.includes("商户配置提供报告结构"));
  assert.ok(report.includes("限制文案不得直接判定未履约或输出医疗诊断"));
  assert.equal((report.match(/className=\{reportNoteClassName\}/g) ?? []).length, 2);
  assert.equal(/\bcompact\b/.test(report), false, "the single-line compact variant truncates the risk note");
  ["!gap-[4px]", "!pb-[6px]", "[&>p:first-child]:leading-[14px]", "[&>p:first-child]:whitespace-nowrap", "[&>p:last-child]:leading-[16px]"].forEach(
    (style) => assert.ok(stage.includes(style), style),
  );
});

test("PetMind lower AI-recognition group follows collapse receipt report then exposes two review-send entries", () => {
  const assistant = assistantSource();
  const bridge = sourceBetween(assistant, "function StageOneTwoBridge", "function StageThree");
  const panel = sourceBetween(assistant, "function RecordingPrototypePanel", "function StageTwo");
  const recording = sourceBetween(
    assistant,
    "function EventStartRecordingPrototype",
    "function EventStartPrototypePanel",
  );
  const receiptCard = sourceBetween(
    assistant,
    "function AiReceiptReportCard",
    "function AiRecognitionFinalReport",
  );

  assert.ok(
    assistant.includes(
      'type AiReportPhase = "recording" | "collapsing" | "receipt" | "report" | "final";',
    ),
  );
  assert.ok(
    assistant.includes(
      'const AI_REPORT_PHASE_SEQUENCE = ["collapsing", "receipt", "report"] as const;',
    ),
  );
  assert.ok(bridge.includes('useState<AiReportPhase>("recording")'));
  assert.ok(bridge.includes("setReportPhase(AI_REPORT_PHASE_SEQUENCE[0])"));
  assert.ok(bridge.includes("setReportPhase(AI_REPORT_PHASE_SEQUENCE[1])"));
  assert.ok(bridge.includes("setReportPhase(AI_REPORT_PHASE_SEQUENCE[2])"));
  assert.ok(recording.includes("data-ai-report-phase={reportPhase}"));
  assert.ok(recording.includes("data-ai-report-supplement"));
  assert.ok(receiptCard.includes("data-ai-report-card-hotspot"));
  assert.ok(recording.includes("onActivate={reportReady ? onAdvanceToReviewSend : undefined}"));
  assert.ok(bridge.includes("onSupplementReport"));
  assert.ok(bridge.includes("onSupplementReport={onAdvanceToReviewSend}"));
  assert.equal(bridge.includes('setReportPhase("final")'), false);
  assert.ok(assistant.includes("AI 提取关键画面与执行证据生成报告"));
});

test("PetMind returning to the upper AI-recognition group resets the report prototype", () => {
  const assistant = assistantSource();
  const bridge = sourceBetween(assistant, "function StageOneTwoBridge", "function StageThree");

  assert.match(
    bridge,
    /group === "evidence"[\s\S]{0,360}setReportPhase\("recording"\)/,
  );
  assert.ok(bridge.includes("setAiRecognitionGroup(group)"));
  assert.ok(bridge.includes('recognitionView={stage === 1 ? aiRecognitionGroup : "evidence"}'));
  assert.ok(bridge.includes('reportPhase={stage === 1 ? reportPhase : "recording"}'));
});

test("PetMind AI report transition preserves the mounted phone and recording video nodes", () => {
  const assistant = assistantSource();
  const recording = sourceBetween(
    assistant,
    "function EventStartRecordingPrototype",
    "function EventStartPrototypePanel",
  );
  const panel = sourceBetween(assistant, "function RecordingPrototypePanel", "function StageTwo");
  const bridge = sourceBetween(assistant, "function StageOneTwoBridge", "function StageThree");

  assert.equal((recording.match(/<motion\.video\b/g) ?? []).length, 1);
  assert.ok(recording.includes("src={ASSETS.recordingVideoLoop}"));
  assert.ok(panel.includes("<EventStartRecordingPrototype"));
  assert.ok(panel.includes("recognitionView={recognitionView}"));
  assert.ok(panel.includes("reportPhase={reportPhase}"));
  assert.equal((panel.match(/<EventStartRecordingPrototype/g) ?? []).length, 1);

  [recording, panel, bridge].forEach((source) => {
    assert.equal(source.includes("key={aiRecognitionGroup}"), false);
    assert.equal(source.includes("key={reportPhase}"), false);
  });
  assert.equal(panel.includes('mode="wait"'), false);
  assert.equal(panel.includes('key="phone"'), false);
  assert.equal(recording.includes('key="video"'), false);
});

test("PetMind final-report hotspot uses the exact centered Figma stroke and scrolls with its content", () => {
  const assistant = assistantSource();
  const finalReport = sourceBetween(
    assistant,
    "function AiRecognitionFinalReport",
    "function EventStartRecordingPrototype",
  );

  assert.ok(finalReport.includes("data-ai-report-scroll-region"));
  assert.ok(finalReport.includes("overflow-y-auto"));
  assert.ok(finalReport.includes("overflow-x-hidden"));
  assert.ok(finalReport.includes("[scrollbar-width:none]"));
  assert.ok(finalReport.includes("[&::-webkit-scrollbar]:hidden"));
  assert.ok(finalReport.includes("data-ai-report-next-flow-hotspot"));
  assert.ok(
    finalReport.includes(
      "h-[43px] left-[14px] p-0 rounded-[4px] top-[232px] w-[271px]",
    ),
  );
  assert.ok(finalReport.includes("border-0"));
  assert.ok(
    finalReport.includes(
      'boxShadow: "0 0 0 4px #8cf97e, inset 0 0 0 4px #8cf97e"',
    ),
  );
});
