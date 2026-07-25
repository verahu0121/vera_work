import assert from "node:assert/strict";
import test from "node:test";

import {
  AI_PRODUCT_PAGE_CONTENT,
  findFeaturedAiProductProject,
  hasAiProductDetail,
} from "./aiProductPage.ts";
import type { PortfolioProject } from "./portfolioProjects.ts";

function createProject(overrides: Partial<PortfolioProject>): PortfolioProject {
  return {
    id: overrides.id ?? "ai-test",
    category: overrides.category ?? "ai-product",
    status: overrides.status ?? "published",
    order: overrides.order ?? 1,
    title: overrides.title ?? "测试项目",
    englishTitle: overrides.englishTitle ?? "TEST PROJECT",
    date: overrides.date ?? "2026.01-2026.12",
    description: overrides.description ?? "测试项目描述",
    coverImage: overrides.coverImage ?? "",
    images: overrides.images ?? [],
    tags: overrides.tags ?? [],
    sections: overrides.sections ?? [],
    detailHero: overrides.detailHero,
    createdAt: overrides.createdAt ?? "2026-01-01T00:00:00.000Z",
    updatedAt: overrides.updatedAt ?? "2026-01-01T00:00:00.000Z",
  };
}

test("AI Product featured project helper matches the GEO project by title", () => {
  const geoProject = createProject({
    id: "ai-geo",
    title: "GEO共享创作平台",
    order: 2,
  });
  const petProject = createProject({
    id: "ai-pet",
    title: "宠物AI经营中枢 PetMind",
    order: 1,
  });

  const result = findFeaturedAiProductProject(
    AI_PRODUCT_PAGE_CONTENT.featuredProjects[0],
    [petProject, geoProject],
  );

  assert.equal(result?.id, "ai-geo");
});

test("AI Product featured project helper returns null when the target project is absent", () => {
  const unrelatedProject = createProject({
    id: "ai-other",
    title: "不相关 AI 项目",
  });

  const result = findFeaturedAiProductProject(
    AI_PRODUCT_PAGE_CONTENT.featuredProjects[1],
    [unrelatedProject],
  );

  assert.equal(result, null);
});

test("AI Product detail availability exposes implemented detail pages", () => {
  assert.equal(hasAiProductDetail("geo-platform"), true);
  assert.equal(hasAiProductDetail("pet-saas"), true);
});
