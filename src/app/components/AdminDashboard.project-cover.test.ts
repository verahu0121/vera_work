import assert from "node:assert/strict";
import test from "node:test";

import {
  PROJECT_COVER_IMAGE_EDITOR,
  isProjectCoverVideo,
} from "../data/projectCoverImageEditor";

test("project cover image editor uses the same aspect ratio as the public project list", () => {
  assert.equal(PROJECT_COVER_IMAGE_EDITOR.aspectRatio, "464 / 290");
});

test("project cover image editor reuses the stable project image upload endpoint", () => {
  assert.equal(PROJECT_COVER_IMAGE_EDITOR.uploadEndpoint, "/api/admin/upload-image");
  assert.equal(PROJECT_COVER_IMAGE_EDITOR.uploadSectionId, "cover");
});

test("project cover media editor labels and accepts image or video uploads", () => {
  assert.equal(PROJECT_COVER_IMAGE_EDITOR.label, "COVER IMAGE&VIDEO");
  assert.equal(PROJECT_COVER_IMAGE_EDITOR.accept, "image/*,video/*");
});

test("project cover media detects proxied video URLs", () => {
  assert.equal(
    isProjectCoverVideo(
      "/api/admin/object-image?key=projects%2Fai-01%2Fcover%2Fdemo-video.mp4",
    ),
    true,
  );
  assert.equal(isProjectCoverVideo("https://example.com/demo.webm?token=abc"), true);
  assert.equal(isProjectCoverVideo("/api/admin/object-image?key=projects%2Fai-01%2Fcover%2Fdemo.png"), false);
});
