export type EventStartStep = 0 | 1 | 2 | 3;

export type EventStartPhase = "passport" | "scanning" | "details" | "recording";

export type EventStartInteractionState = {
  phase: EventStartPhase;
  scanRunId: number;
};

export type EventStartInteractionAction =
  | { type: "ACTIVATE_STEP"; step: EventStartStep; reducedMotion: boolean }
  | { type: "ACTIVATE_PASSPORT_HOTSPOT"; reducedMotion: boolean }
  | { type: "SCAN_COMPLETE"; runId: number }
  | { type: "ACTIVATE_DETAILS" };

export const INITIAL_EVENT_START_INTERACTION: EventStartInteractionState = {
  phase: "passport",
  scanRunId: 0,
};

export const SCAN_SECONDS_PER_PASS = 1.6;

export const SCAN_PASS_SEGMENTS = [
  {
    durationSeconds: SCAN_SECONDS_PER_PASS,
    ease: "linear",
    gradientHeight: 190,
    lineY: 186,
    pass: 1,
    progress: 1,
  },
  {
    durationSeconds: SCAN_SECONDS_PER_PASS / 2,
    ease: "linear",
    gradientHeight: 94,
    lineY: 84,
    pass: 0.5,
    progress: 0.5,
  },
] as const;

export const SCAN_PASS_COUNT = SCAN_PASS_SEGMENTS.reduce((total, segment) => total + segment.pass, 0);

export function getLinkedEventSteps(step: EventStartStep): readonly EventStartStep[] {
  return step === 1 || step === 2 ? [1, 2] : [step];
}

export function getActiveEventSteps(phase: EventStartPhase): readonly EventStartStep[] {
  if (phase === "scanning" || phase === "details") return [1, 2];
  return phase === "recording" ? [3] : [0];
}

function enterScanGroup(
  state: EventStartInteractionState,
  reducedMotion: boolean,
): EventStartInteractionState {
  if (state.phase === "scanning" || state.phase === "details") return state;

  return {
    phase: reducedMotion ? "details" : "scanning",
    scanRunId: state.scanRunId + 1,
  };
}

export function eventStartInteractionReducer(
  state: EventStartInteractionState,
  action: EventStartInteractionAction,
): EventStartInteractionState {
  switch (action.type) {
    case "ACTIVATE_STEP":
      if (action.step === 1 || action.step === 2) {
        return enterScanGroup(state, action.reducedMotion);
      }

      return {
        phase: action.step === 0 ? "passport" : "recording",
        scanRunId: state.scanRunId,
      };
    case "ACTIVATE_PASSPORT_HOTSPOT":
      return enterScanGroup(state, action.reducedMotion);
    case "SCAN_COMPLETE":
      if (state.phase !== "scanning" || action.runId !== state.scanRunId) return state;
      return { ...state, phase: "details" };
    case "ACTIVATE_DETAILS":
      if (state.phase !== "details") return state;
      return { ...state, phase: "recording" };
    default:
      return state;
  }
}
