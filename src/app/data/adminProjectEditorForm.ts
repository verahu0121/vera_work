const baseFieldClassName =
  "h-[48px] rounded-[24px] border border-black/8 bg-white text-[14px] outline-none focus:border-[#03c9c3]/50";

export const PROJECT_EDITOR_BASIC_INFORMATION_CONTROLS = {
  controlHeightClassName: "h-[48px]",
  textInputClassName: `${baseFieldClassName} px-4`,
  selectClassName: `${baseFieldClassName} w-full appearance-none pl-4 pr-10 disabled:pointer-events-none`,
} as const;
