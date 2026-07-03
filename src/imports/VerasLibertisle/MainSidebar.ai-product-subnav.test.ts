import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const sidebarSource = () => readFileSync(new URL("./VerasLibertisle.tsx", import.meta.url), "utf8");
const aiProductContentSource = () =>
  readFileSync(new URL("../../app/components/AIProductContent.tsx", import.meta.url), "utf8");

test("AI Product sidebar submenu matches the Figma labels and SVG assets", () => {
  const source = sidebarSource();

  assert.ok(source.includes("../../assets/ai-product-page/subnav-thesis.svg"));
  assert.ok(source.includes("../../assets/ai-product-page/subnav-connection.svg"));
  assert.ok(source.includes("../../assets/ai-product-page/subnav-method.svg"));
  assert.ok(source.includes("activeAiProductSubItem"));
  assert.ok(source.includes("onAiProductSubItemClick"));
  assert.ok(source.includes("label: \"共同命题\""));
  assert.ok(source.includes("label: \"路径连接\""));
  assert.ok(source.includes("label: \"AI 产品方法\""));
  assert.ok(source.includes("dangerouslySetInnerHTML"));
  assert.ok(source.includes("iconMarkup={item.iconMarkup}"));
  assert.ok(!source.includes("iconSrc={item.iconSrc}"));
  assert.ok(source.includes('const itemColor = isActive ? "#1D1D1D" : isHovered ? "#939393" : "#B1B1B1"'));
  assert.ok(!source.includes('const itemColor = isActive ? "#1D1D1D" : isHovered ? "#939393" : "#969696"'));
  assert.ok(source.includes("font-['OPPOSans:Medium',sans-serif] font-medium"));
  assert.ok(source.includes("font-['OPPOSans:Regular',sans-serif] font-normal"));
  assert.ok(!source.includes("font-['OPPOSans:Bold',sans-serif] font-bold"));
  assert.ok(!source.includes("WebkitMaskImage"));
  assert.ok(!source.includes("maskImage"));
  assert.ok(source.includes("new CustomEvent(\"ai-product-nav-click\""));
});

test("AI Product content exposes three scroll targets matching the sidebar submenu", () => {
  const source = aiProductContentSource();

  assert.ok(source.includes("type AiProductSectionId = \"共同命题\" | \"路径连接\" | \"AI 产品方法\""));
  assert.ok(source.includes("const thesisRef = useRef<HTMLDivElement>(null)"));
  assert.ok(source.includes("const abstractionRef = useRef<HTMLDivElement>(null)"));
  assert.ok(source.includes("const principlesRef = useRef<HTMLDivElement>(null)"));
  assert.ok(source.includes("window.addEventListener(\"ai-product-nav-click\""));
  assert.ok(source.includes("window.removeEventListener(\"ai-product-nav-click\""));
  assert.ok(source.includes("onActiveSectionChange?.(bestSection)"));
});
