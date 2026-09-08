import assert from "node:assert/strict";
import test from "node:test";

import {
  eventStartInteractionReducer,
  getActiveEventSteps,
  getLinkedEventSteps,
  INITIAL_EVENT_START_INTERACTION,
  SCAN_PASS_COUNT,
  SCAN_PASS_SEGMENTS,
} from "./PetMindEventStartInteraction";

test("PetMind event-start steps two and three share hover and selected grouping", () => {
  assert.deepEqual(getLinkedEventSteps(0), [0]);
  assert.deepEqual(getLinkedEventSteps(1), [1, 2]);
  assert.deepEqual(getLinkedEventSteps(2), [1, 2]);
  assert.deepEqual(getLinkedEventSteps(3), [3]);
  assert.deepEqual(getActiveEventSteps("scanning"), [1, 2]);
  assert.deepEqual(getActiveEventSteps("details"), [1, 2]);
});

test("PetMind passport hotspot enters the linked scan state", () => {
  const scanning = eventStartInteractionReducer(INITIAL_EVENT_START_INTERACTION, {
    type: "ACTIVATE_PASSPORT_HOTSPOT",
    reducedMotion: false,
  });

  assert.equal(scanning.phase, "scanning");
  assert.equal(scanning.scanRunId, 1);
  assert.deepEqual(getActiveEventSteps(scanning.phase), [1, 2]);
});

test("PetMind scan timeline is one full pass followed by one half pass", () => {
  assert.deepEqual(
    SCAN_PASS_SEGMENTS.map((segment) => segment.pass),
    [1, 0.5],
  );
  assert.equal(SCAN_PASS_COUNT, 1.5);
  assert.ok(SCAN_PASS_SEGMENTS.every((segment) => segment.ease === "linear"));
  assert.equal(SCAN_PASS_SEGMENTS[1].durationSeconds, SCAN_PASS_SEGMENTS[0].durationSeconds / 2);
  assert.deepEqual(
    SCAN_PASS_SEGMENTS.map(({ gradientHeight, lineY }) => ({ gradientHeight, lineY })),
    [
      { gradientHeight: 190, lineY: 186 },
      { gradientHeight: 94, lineY: 84 },
    ],
  );
});

test("PetMind ignores stale scan completion and details activation enters recording", () => {
  const scanning = eventStartInteractionReducer(INITIAL_EVENT_START_INTERACTION, {
    type: "ACTIVATE_PASSPORT_HOTSPOT",
    reducedMotion: false,
  });
  const stale = eventStartInteractionReducer(scanning, {
    type: "SCAN_COMPLETE",
    runId: scanning.scanRunId - 1,
  });

  assert.strictEqual(stale, scanning);

  const details = eventStartInteractionReducer(scanning, {
    type: "SCAN_COMPLETE",
    runId: scanning.scanRunId,
  });
  assert.equal(details.phase, "details");
  assert.deepEqual(getActiveEventSteps(details.phase), [1, 2]);

  const recording = eventStartInteractionReducer(details, { type: "ACTIVATE_DETAILS" });
  assert.equal(recording.phase, "recording");
  assert.deepEqual(getActiveEventSteps(recording.phase), [3]);
});

test("PetMind reduced motion skips directly to event details", () => {
  const details = eventStartInteractionReducer(INITIAL_EVENT_START_INTERACTION, {
    type: "ACTIVATE_PASSPORT_HOTSPOT",
    reducedMotion: true,
  });

  assert.equal(details.phase, "details");
  assert.deepEqual(getActiveEventSteps(details.phase), [1, 2]);
});
