import assert from "node:assert/strict";
import test from "node:test";

import { PROJECT_EDITOR_BASIC_INFORMATION_CONTROLS } from "../data/adminProjectEditorForm";

test("project editor select controls share the same explicit height as text inputs", () => {
  const { controlHeightClassName, selectClassName, textInputClassName } =
    PROJECT_EDITOR_BASIC_INFORMATION_CONTROLS;

  assert.ok(selectClassName.includes(controlHeightClassName));
  assert.ok(textInputClassName.includes(controlHeightClassName));
});

test("project editor select controls use the same rounded corners as text inputs", () => {
  const { selectClassName, textInputClassName } =
    PROJECT_EDITOR_BASIC_INFORMATION_CONTROLS;
  const titleInputRadiusClassName = "rounded-[24px]";

  assert.ok(selectClassName.includes(titleInputRadiusClassName));
  assert.ok(textInputClassName.includes(titleInputRadiusClassName));
  assert.ok(selectClassName.includes("appearance-none"));
});
