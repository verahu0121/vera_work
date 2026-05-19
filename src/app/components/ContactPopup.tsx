import React from "react";
import { motion, AnimatePresence } from "motion/react";

const svgPaths = {
  // Corner decoration path from svg-o4bwqror5r.ts
  p239c8300: "M33 22.041C27.1702 22.522 22.523 27.1702 22.042 33H18.0322C18.5281 24.96 24.96 18.5271 33 18.0312V22.041Z",
  // Copy icon paths from svg-o4bwqror5r.ts
  p155adc00: "M1.12617 6.74648C1.12617 6.84625 1.16593 6.94193 1.23669 7.01248C1.30746 7.08302 1.40344 7.12266 1.50352 7.12266C1.60359 7.12266 1.69957 7.08302 1.77034 7.01248C1.8411 6.94193 1.88086 6.84625 1.88086 6.74648C1.88086 6.64672 1.8411 6.55104 1.77034 6.48049C1.69957 6.40995 1.60359 6.37031 1.50352 6.37031C1.40344 6.37031 1.30746 6.40995 1.23669 6.48049C1.16593 6.55104 1.12617 6.64672 1.12617 6.74648Z",
  p1b92be80: "M8.69648 5.28163L5.53828 5.25702C5.3707 5.25585 5.23359 5.41874 5.23359 5.6203C5.23359 5.82186 5.3707 5.9871 5.53828 5.98827L8.69648 6.01288C8.86406 6.01405 9.00117 5.85116 9.00117 5.6496C9.00117 5.44803 8.86406 5.2828 8.69648 5.28163ZM8.69648 6.76991L5.53828 6.7453C5.3707 6.74413 5.23359 6.90702 5.23359 7.10858C5.23359 7.31014 5.3707 7.47538 5.53828 7.47655L8.69648 7.50116C8.86406 7.5035 9.00117 7.33944 9.00117 7.13788C9.00117 6.93632 8.86406 6.77108 8.69648 6.76991Z",
  p366bd700: "M8.62617 0.748828H4.88672C4.06172 0.748828 3.38672 1.42383 3.38672 2.24883H2.62617C1.80117 2.24883 1.12617 2.92383 1.12617 3.74883V5.24883C1.125 5.45625 1.29492 5.62383 1.50352 5.62383C1.71211 5.62383 1.88086 5.45508 1.88086 5.24766V3.75C1.88086 3.3375 2.21836 3 2.63086 3H3.38672V8.24766C3.38672 9.07266 4.06172 9.74766 4.88672 9.74766H7.87617C7.875 10.1602 7.53867 10.4953 7.12617 10.4953H2.63086C2.21836 10.4953 1.88086 10.1578 1.88086 9.74531V8.24414C1.88086 8.03672 1.71211 7.86797 1.50352 7.86797C1.29492 7.86797 1.125 8.03672 1.125 8.24414V9.74766C1.125 10.5727 1.8 11.2477 2.625 11.2477H7.12617C7.95117 11.2477 8.62617 10.5727 8.62617 9.74766H9.38789C10.2129 9.74766 10.8879 9.07266 10.8879 8.24766V2.99883L8.62617 0.748828ZM8.62734 1.4918L10.1238 2.99531H9.375C8.9625 2.99531 8.625 2.65781 8.625 2.24531V1.4918H8.62734ZM9.37734 9.00352H4.87617C4.46367 9.00352 4.12617 8.66602 4.12617 8.25352V2.2418C4.12617 1.8293 4.46367 1.4918 4.87617 1.4918H7.86328V2.23828C7.86328 3.06328 8.53828 3.73828 9.36328 3.73828H10.1273V8.25352C10.1273 8.66602 9.78984 9.00352 9.37734 9.00352Z"
};

function CornerIcon({ className, transform }: { className?: string, transform?: string }) {
  return (
    <div className={`absolute size-[33px] ${className}`}>
      <div style={{ transform }} className="size-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
          <path d={svgPaths.p239c8300} fill="#03FFF7" />
        </svg>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <div className="relative shrink-0 size-[12px] opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <path d={svgPaths.p155adc00} fill="#6D6D6D" />
        <path d={svgPaths.p1b92be80} fill="#6D6D6D" />
        <path d={svgPaths.p366bd700} fill="#6D6D6D" />
      </svg>
    </div>
  );
}

export function ContactPopup({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="absolute h-[244px] right-[100px] rounded-[32px] top-[286px] w-[324px] z-50 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '8px 8px 24px 0px rgba(3, 255, 247, 0.10), inset 4px 4px 8px 0px rgba(3, 255, 247, 0.20)'
          }}
        >
          {/* Background and Blur with specific requested styles */}
          <div 
            aria-hidden="true" 
            className="absolute inset-0 pointer-events-none rounded-[32px] border border-[#00A6A1] bg-[rgba(21,20,25,0.50)] backdrop-blur-[24px]" 
          />
          
          <div className="overflow-clip relative rounded-[inherit] size-full">
            {/* Corner Icons with exact transforms from Frame1321318831.tsx */}
            <CornerIcon className="left-0 top-0" />
            <CornerIcon className="left-0 bottom-0" transform="scaleY(-1)" />
            <CornerIcon className="right-0 bottom-0" transform="rotate(180deg)" />
            <CornerIcon className="right-0 top-0" transform="scaleY(-1) rotate(180deg)" />

            {/* Content Body */}
            <div className="absolute content-stretch flex flex-col h-full items-start justify-center left-0 top-0 w-full">
              
              {/* WeChat Row */}
              <div className="h-[64px] relative shrink-0 w-full">
                <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-end pb-[24px] pl-[48px] pr-[24px] pt-[12px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-center min-h-px min-w-px relative">
                      <p className="font-['Manrope:Light',sans-serif] font-light leading-[14px] relative shrink-0 text-[#b1b1b1] text-[12px] tracking-[0.48px] uppercase w-[60px]">WECHAT</p>
                      <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                        <p className="font-['OPPOSans:Regular',sans-serif] leading-[14px] lowercase not-italic relative shrink-0 text-[#b1b1b1] text-[0px] w-[124px]">
                          <span className="leading-[14px] text-[14px]">-vera</span>
                          <span className="leading-[14px] text-[13px]">0121</span>
                          <span className="leading-[14px] text-[14px]">-</span>
                        </p>
                        <CopyIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line 1 */}
              <div className="h-px relative shrink-0 w-full">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 1">
                  <path d="M324 0V1H0V0H324Z" fill="#B1B1B1" opacity="0.2" />
                </svg>
              </div>

              {/* Email Row */}
              <div className="h-[64px] relative shrink-0 w-full">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex gap-[24px] items-center pl-[48px] pr-[24px] py-[12px] relative size-full">
                    <p className="font-['Manrope:Light',sans-serif] font-light leading-[14px] relative shrink-0 text-[#b1b1b1] text-[12px] tracking-[0.48px] uppercase w-[60px]">E-MAIL</p>
                    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                      <p className="font-['OPPOSans:Regular',sans-serif] leading-[14px] lowercase not-italic relative shrink-0 text-[#b1b1b1] text-[14px] w-[124px]">vera0121@126.com</p>
                      <CopyIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/* Line 2 */}
              <div className="h-px relative shrink-0 w-full">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 1">
                  <path d="M324 0V1H0V0H324Z" fill="#B1B1B1" opacity="0.2" />
                </svg>
              </div>

              {/* Location Row */}
              <div className="h-[64px] relative shrink-0 w-full">
                <div className="overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start pb-[12px] pl-[48px] pr-[24px] pt-[24px] relative size-full">
                    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
                      <p className="font-['Manrope:Light',sans-serif] font-light leading-[14px] relative shrink-0 text-[#b1b1b1] text-[12px] tracking-[0.48px] uppercase w-[60px]">LOCATION</p>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                        <p className="font-['OPPOSans:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#b1b1b1] text-[14px] w-[124px]">Shanghai, China</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}