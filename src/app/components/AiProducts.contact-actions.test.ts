import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTACT_CARD_ACTIONS,
  CONTACT_CARD_CANCEL_CLOSE_TRANSITION,
  CONTACT_CARD_INTERACTION,
  CONTACT_CARD_PULL_OUT_TRANSITION,
} from "./AiProducts.tsx";

test("contact card exposes the expanded menu actions in design order", () => {
  assert.deepEqual(
    CONTACT_CARD_ACTIONS.map((action) => action.label),
    ["AI PRODUCT", "UX DESIGN", "CANCEL"],
  );
  assert.deepEqual(
    CONTACT_CARD_ACTIONS.map((action) => action.kind),
    ["ai-product", "ux-design", "cancel"],
  );
});

test("contact card menu actions pull out upward from the cancel button position", () => {
  const aiProduct = CONTACT_CARD_ACTIONS.find((action) => action.kind === "ai-product");
  const uxDesign = CONTACT_CARD_ACTIONS.find((action) => action.kind === "ux-design");
  const cancel = CONTACT_CARD_ACTIONS.find((action) => action.kind === "cancel");

  assert.ok(aiProduct);
  assert.ok(uxDesign);
  assert.ok(cancel);
  assert.equal(aiProduct.collapsedTop, cancel.expandedTop);
  assert.equal(uxDesign.collapsedTop, cancel.expandedTop);
  assert.ok(aiProduct.expandedTop < uxDesign.expandedTop);
  assert.ok(uxDesign.expandedTop < cancel.expandedTop);
  assert.equal(CONTACT_CARD_PULL_OUT_TRANSITION.easing, "linear");
  assert.equal(CONTACT_CARD_PULL_OUT_TRANSITION.durationMs, 280);
});

test("contact card cancel closes the expanded menu with a fade out", () => {
  assert.equal(CONTACT_CARD_CANCEL_CLOSE_TRANSITION.mode, "fade");
  assert.equal(CONTACT_CARD_CANCEL_CLOSE_TRANSITION.durationMs, 180);
  assert.equal(CONTACT_CARD_CANCEL_CLOSE_TRANSITION.easing, "linear");
});

test("contact card opens on hover and closes when the pointer leaves", () => {
  assert.equal(CONTACT_CARD_INTERACTION.openTrigger, "hover");
  assert.equal(CONTACT_CARD_INTERACTION.autoCloseTrigger, "pointer-leave");
});
