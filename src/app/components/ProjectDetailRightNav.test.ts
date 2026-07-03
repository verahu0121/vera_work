import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { PROJECT_DETAIL_RIGHT_NAV_LAYOUT } from "./ProjectDetailRightNav";

const REQUIRED_HIDDEN_SCROLLBAR_CLASSES = [
  "scrollbar-hide",
  "[scrollbar-width:none]",
  "[&::-webkit-scrollbar]:hidden",
];

test("project detail right nav reserves a scrollable navigation viewport below the fixed back area", () => {
  assert.ok(PROJECT_DETAIL_RIGHT_NAV_LAYOUT.sidebarClassName.includes("min-h-0"));
  assert.ok(PROJECT_DETAIL_RIGHT_NAV_LAYOUT.backButtonClassName.includes("shrink-0"));
  assert.ok(PROJECT_DETAIL_RIGHT_NAV_LAYOUT.dividerClassName.includes("shrink-0"));
  assert.ok(PROJECT_DETAIL_RIGHT_NAV_LAYOUT.navViewportClassName.includes("min-h-0"));
  assert.ok(PROJECT_DETAIL_RIGHT_NAV_LAYOUT.navViewportClassName.includes("flex-1"));
});

test("project detail right nav can scroll without showing a native scrollbar", () => {
  const { navListClassName } = PROJECT_DETAIL_RIGHT_NAV_LAYOUT;

  assert.ok(navListClassName.includes("overflow-y-auto"));
  assert.ok(navListClassName.includes("overscroll-contain"));
  for (const requiredClassName of REQUIRED_HIDDEN_SCROLLBAR_CLASSES) {
    assert.ok(navListClassName.includes(requiredClassName));
  }
});

test("project detail right nav keeps active item visible without gradient scroll affordances", () => {
  assert.equal(Object.hasOwn(PROJECT_DETAIL_RIGHT_NAV_LAYOUT, "topFadeClassName"), false);
  assert.equal(Object.hasOwn(PROJECT_DETAIL_RIGHT_NAV_LAYOUT, "bottomFadeClassName"), false);
  assert.deepEqual(PROJECT_DETAIL_RIGHT_NAV_LAYOUT.activeItemScrollOptions, {
    block: "nearest",
    behavior: "smooth",
  });
});

test("project detail views reuse the shared right navigation component", () => {
  const modalSource = readFileSync("src/app/components/ProjectDetailModal.tsx", "utf8");
  const resumeDetailSource = readFileSync("src/app/components/ResumeProjectDetailView.tsx", "utf8");

  assert.ok(modalSource.includes("ProjectDetailRightNav"));
  assert.ok(resumeDetailSource.includes("ProjectDetailRightNav"));
  assert.equal(modalSource.includes("function RightNavLink"), false);
  assert.equal(resumeDetailSource.includes("function RightNavLink"), false);
});

test("project detail main scroll containers hide native scrollbars across browsers", () => {
  const modalSource = readFileSync("src/app/components/ProjectDetailModal.tsx", "utf8");
  const resumeDetailSource = readFileSync("src/app/components/ResumeProjectDetailView.tsx", "utf8");

  assert.ok(modalSource.includes('id="project-modal-content"'));
  assert.ok(resumeDetailSource.includes('id="resume-project-detail-content"'));

  for (const requiredClassName of REQUIRED_HIDDEN_SCROLLBAR_CLASSES) {
    assert.ok(modalSource.includes(requiredClassName));
    assert.ok(resumeDetailSource.includes(requiredClassName));
  }
});
