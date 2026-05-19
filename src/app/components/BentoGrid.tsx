import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ExperienceItem {
  id: string;
  number: string;
  company: string;
  role: string;
  period: string;
}

interface ProjectItem {
  title: string;
  description: string;
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  { id: "01", number: "01", company: "时代之门科技有限公司", role: "AI PRODUCT MANAGER", period: "2022 — PRESENT" },
  { id: "02", number: "02", company: "宁波中升估价", role: "PM & UX DESIGNER", period: "2020 — 2022" },
  { id: "03", number: "03", company: "杉杉商业集团", role: "DESIGN MANAGER", period: "2018 — 2020" },
];

const PROJECT_SETS: ProjectItem[][] = [
  [
    { title: "AIEO 创作与分发综合平台", description: "整合主流大模型与内容渠道，搭建全端客户端及统一后台，打造一站式创作分发综合平台。" },
    { title: "鹤元家政2.0智能系统", description: "以 AI 智能体深度赋能 B 端家政，全链路提效降本，重塑家政服务体验与运营效率。" },
    { title: "GEA智能数据工程师项目", description: "前后共计 6 场工作坊高效对齐共识，攻坚跨 BU 协作痛点，输出可落地产品设计方案。" },
  ],
  [
    { title: "中升营销管理系统", description: "从 0-1 搭建 B 端营销管理系统，统筹全流程产品设计，实现营销链路数字化提效。" },
    { title: "中升官网2.0改版", description: "官方门户网页重构，以用户体验为核心，打造具备品牌化、高可用性的官方门户。" },
    { title: "中升SaaS系统重构", description: "主导 SaaS 系统 1.0→2.0 迭代升级，优化产品体验，赋能土地评估业务高效运转。" },
  ],
  [
    { title: "奥莱线上商城小程序", description: "奥莱商城小程序迭代项目，以用户体验为核心，提升购物流程流畅度与转化效率。" },
    { title: "杉杉BI数据分析平台", description: "BI 数据分析平台大版本迭代，优化提升整体视觉与交互体验，简化数据筛选操作流程，赋能高效数据决策。" },
    { title: "杉杉商业业务中台", description: "构建全链路业务中台，贯通人员、商品、营销、财务及订单体系，实现全域协同与高效管控。" },
  ],
];

export function BentoGrid() {
  const [activeSet, setActiveSet] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[426px] items-stretch justify-center max-w-[864px] mx-auto relative w-full overflow-hidden rounded-[2px] border border-[rgba(198,198,198,0.1)]">
      {/* Experience Section */}
      <div className="bg-[#ededed] flex-1 min-w-[320px] lg:min-w-[426px] h-full relative" data-name="Experience">
        <div className="flex flex-col gap-[32px] pt-[48px] px-[48px] pb-[24px] h-full">
          {/* Label Header */}
          <div className="shrink-0">
            <p className="font-['Manrope:Regular',sans-serif] text-[11px] tracking-[3.3px] uppercase text-[#5e5e5e] leading-[16.5px]">
              Experience
            </p>
          </div>
          {/* Experience List */}
          <div className="flex flex-col items-start relative w-full">
            {EXPERIENCE_DATA.map((item, idx) => {
              const isActive = activeSet === idx;
              return (
                <div 
                  key={item.id} 
                  onClick={() => setActiveSet(idx)}
                  className="flex gap-[16px] items-start pb-[36px] relative shrink-0 w-full cursor-pointer group"
                >
                  <div className={`flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[24px] w-[32px] transition-colors duration-300 ${isActive ? 'text-[#969696]' : 'text-[#c6c6c6]'}`}>
                    <p className="leading-[32px]">{item.number}</p>
                  </div>
                  <div className="flex flex-1 flex-col gap-[4px] items-start pb-[25px] relative">
                    {idx < EXPERIENCE_DATA.length - 1 && (
                      <div aria-hidden="true" className="absolute border-b border-solid border-[rgba(198,198,198,0.2)] inset-0 pointer-events-none" />
                    )}
                    <div className="relative shrink-0 w-full">
                      <div className="flex items-baseline justify-between relative w-full whitespace-nowrap">
                        <div className={`flex flex-col font-['OPPOSans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[14px] transition-colors duration-300 ${isActive ? 'text-[#1a1c1c]' : 'text-[#969696]'}`}>
                          <p className="leading-[20px]">{item.company}</p>
                        </div>
                        <div className={`flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[10px] text-right uppercase transition-colors duration-300 ${isActive ? 'text-[#5e5e5e]' : 'text-[#969696]'}`}>
                          <p className="leading-[15px]">{item.period}</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative shrink-0 w-full">
                      <div className="flex flex-col items-start relative w-full">
                        <div className={`flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[11px] tracking-[0.55px] uppercase w-full transition-colors duration-300 ${isActive ? 'text-[#474747]' : 'text-[#a8a8a8]'}`}>
                          <p className="leading-[16.5px]">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Section */}
      <div className="bg-[#f2f2f2] flex-1 min-w-[320px] lg:min-w-[426px] h-full relative" data-name="Project">
        <div className="flex flex-col gap-[32px] pt-[48px] px-[48px] pb-[24px] h-full">
          {/* Label Header */}
          <div className="shrink-0">
            <p className="font-['Manrope:Regular',sans-serif] text-[11px] tracking-[3.3px] uppercase text-[#5e5e5e] leading-[16.5px]">
              Project
            </p>
          </div>
          {/* Project List */}
          <div className="flex flex-col gap-[24px] items-start relative w-full flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSet}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-[32px] w-full"
              >
                {PROJECT_SETS[activeSet].map((proj, i) => (
                  <div key={i} className="flex flex-col gap-[5px] items-start relative shrink-0 w-full group cursor-pointer">
                    <div className="flex items-center justify-between relative shrink-0 w-full">
                      <div className="flex flex-col font-['OPPOSans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[#1a1c1c] text-[14px] tracking-[-0.35px] uppercase whitespace-nowrap group-hover:translate-x-1 transition-transform">
                        <p className="leading-[20px]">{proj.title}</p>
                      </div>
                      <div className="relative shrink-0 size-[20px] group-hover:translate-x-1 transition-transform">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                          <path d="M14.5034 6.5L13.8114 7.19204L16.0973 9.47792L11.5255 9.47792L11 10.0034L11.5255 10.5289H16.0836L13.8045 12.808L14.4966 13.5L18 9.99657L14.5034 6.5Z" fill="#1A1C1C" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] min-h-[39px] justify-center relative shrink-0 text-[#565656] text-[12px] text-justify w-full">
                        <p className="leading-[20px]">{proj.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Pagination dots */}
          <div className="mt-auto flex gap-[12px] items-center justify-center relative w-full pb-[8px]">
            {PROJECT_SETS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSet(idx)}
                className="block cursor-pointer relative shrink-0 size-[8px] outline-none group"
              >
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" fill={activeSet === idx ? "#1A1C1C" : "#D9D9D9"} className="transition-colors duration-300 group-hover:fill-[#1A1C1C]" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
