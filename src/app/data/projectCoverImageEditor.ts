export const PROJECT_COVER_IMAGE_EDITOR = {
  aspectRatio: "464 / 290",
  label: "COVER IMAGE&VIDEO",
  accept: "image/*,video/*",
  uploadEndpoint: "/api/admin/upload-image",
  uploadSectionId: "cover",
} as const;

const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov", "m4v", "ogv", "ogg"]);

function getCoverMediaPath(src: string) {
  if (!src) return "";

  try {
    const decodedSrc = decodeURIComponent(src);
    const url = new URL(decodedSrc, "http://localhost");
    return url.searchParams.get("key") ?? url.pathname;
  } catch {
    return src;
  }
}

export function isProjectCoverVideo(src: string) {
  const mediaPath = getCoverMediaPath(src).toLowerCase();
  const extension = mediaPath.match(/\.([a-z0-9]+)$/)?.[1] ?? "";
  return VIDEO_EXTENSIONS.has(extension);
}
