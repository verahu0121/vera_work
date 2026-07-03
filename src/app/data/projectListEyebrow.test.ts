import assert from "node:assert/strict";
import test from "node:test";

import {
  getProjectListEyebrow,
  type PortfolioProject,
} from "./portfolioProjects";

function createProject(overrides: Partial<PortfolioProject>): PortfolioProject {
  return {
    id: "project-1779677951996",
    category: "ai-product",
    status: "published",
    order: 1,
    title: "AI行业赋能｜徕木股份智能体中心",
    englishTitle: "NEW PROJECT TITLE",
    date: "2026.01-2026.12",
    description: "",
    coverImage: "",
    images: [],
    tags: [],
    sections: [],
    createdAt: "2026-05-25T02:59:11.994Z",
    updatedAt: "2026-05-28T02:50:25.858Z",
    ...overrides,
  };
}

test("project list eyebrow renumbers from the current rendered order instead of stale top label text", () => {
  const project = createProject({
    order: 1,
    detailHero: {
      eyebrowText: "PROJECT AI-03",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "新项目标题",
      titleColor: "#fd6d59",
      subtitleText: "NEW PROJECT TITLE",
      subtitleColor: "#adadad",
    },
  });

  assert.equal(getProjectListEyebrow(project, 0), "PROJECT AI-01 / 2026.01");
});

test("project list eyebrow keeps published list numbering consecutive after reordering", () => {
  const projects = [
    createProject({
      id: "project-1779677951996",
      order: 1,
      detailHero: {
        eyebrowText: "PROJECT AI-03",
        backgroundColor: "#070621",
        eyebrowColor: "#e0e0e0",
        titleText: "AI 行业赋能",
        titleColor: "#fd6d59",
        subtitleText: "AI PRODUCT",
        subtitleColor: "#adadad",
      },
    }),
    createProject({
      id: "ai-03",
      order: 2,
      date: "2023.08-2024.12",
      detailHero: {
        eyebrowText: "GALLERY / AI-02",
        backgroundColor: "#070621",
        eyebrowColor: "#e0e0e0",
        titleText: "GEO 创作分发平台",
        titleColor: "#fd6d59",
        subtitleText: "GEO PRODUCT",
        subtitleColor: "#adadad",
      },
    }),
    createProject({
      id: "ai-01",
      order: 3,
      date: "2026.02-2026.05",
      detailHero: {
        eyebrowText: "GALLERY / AI-01",
        backgroundColor: "#070621",
        eyebrowColor: "#e0e0e0",
        titleText: "家政业务中台",
        titleColor: "#fd6d59",
        subtitleText: "DOMESTIC AI PRO",
        subtitleColor: "#adadad",
      },
    }),
  ];

  assert.deepEqual(
    projects.map((project, index) => getProjectListEyebrow(project, index)),
    [
      "PROJECT AI-01 / 2026.01",
      "PROJECT AI-02 / 2023.08",
      "PROJECT AI-03 / 2026.02",
    ],
  );
});

test("project list eyebrow uses UX numbering for UX design projects", () => {
  const project = createProject({
    id: "ux-01",
    category: "ux-design",
    date: "2026.02-2026.05",
    detailHero: {
      eyebrowText: "GALLERY / UX-01",
      backgroundColor: "#070621",
      eyebrowColor: "#e0e0e0",
      titleText: "AI 垂类赋能｜家政行业",
      titleColor: "#fd6d59",
      subtitleText: "DOMESTIC AI PRO",
      subtitleColor: "#adadad",
    },
  });

  assert.equal(getProjectListEyebrow(project, 4), "PROJECT UX-05 / 2026.02");
});
