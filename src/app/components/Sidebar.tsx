import React from "react";
import { NavLink, useLocation } from "react-router";
import { motion } from "motion/react";
import svgPaths from "../../imports/AsideSidebarNavigation-1/svg-8bseuz370s";
import svgPathsResume from "../../imports/Frame1321318823-1/svg-gwftmbd6ul";

interface SidebarProps {
  isContactActive: boolean;
  onContactClick: () => void;
  onHomeClick: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const svgPathEducation = "M6 0.875C6.23044 0.874982 6.46723 0.925859 6.65625 1.03418L11.1797 3.62402L11.2783 3.6875C11.4955 3.8476 11.6249 4.08005 11.625 4.34277C11.625 4.60531 11.4949 4.83842 11.2773 4.99805L11.1787 5.06152L10.9209 5.20801C10.9448 5.20487 10.9688 5.20118 10.9932 5.20117C11.1447 5.20118 11.2902 5.26236 11.3965 5.37109C11.5027 5.47973 11.5615 5.62692 11.5615 5.7793V9.37109L11.5508 9.4834C11.5291 9.59408 11.4752 9.69687 11.3955 9.77832C11.2893 9.88678 11.1445 9.94824 10.9932 9.94824C10.8417 9.94823 10.6971 9.88691 10.5908 9.77832C10.4847 9.66976 10.4258 9.5225 10.4258 9.37012V5.7793C10.4258 5.64801 10.4707 5.52204 10.5508 5.41992L9.98145 5.74707V9.15039C9.98145 9.15931 9.97983 9.17337 9.97852 9.18945L9.97949 9.19043C9.95442 9.86163 9.40274 10.3444 8.66895 10.6543C7.92777 10.9672 6.95711 11.125 6.00098 11.125C5.05517 11.125 4.09616 10.971 3.3584 10.665C2.6279 10.362 2.07351 9.89045 2.02539 9.23438C2.0214 9.20667 2.01853 9.17743 2.01855 9.14941V5.74609L0.821289 5.05957C0.545176 4.9029 0.375071 4.64251 0.375 4.34277C0.375 4.04284 0.545031 3.78207 0.821289 3.62402L5.34473 1.03418C5.53309 0.926157 5.76962 0.875065 6 0.875ZM3.15527 9.0957C3.1567 9.11167 3.15815 9.12758 3.1582 9.14355C3.15829 9.151 3.16223 9.17311 3.18848 9.20996C3.21413 9.24592 3.25625 9.28851 3.31738 9.33594C3.43977 9.43087 3.62651 9.53397 3.875 9.62891C4.37117 9.81841 5.09711 9.96973 6.00098 9.96973C6.90526 9.96972 7.63086 9.81839 8.12695 9.62891C8.37552 9.53396 8.56224 9.43088 8.68457 9.33594C8.74569 9.28849 8.78788 9.24591 8.81348 9.20996C8.83966 9.17314 8.84368 9.15098 8.84375 9.14355V9.13867L8.84473 9.12695V6.39746L6.65527 7.65234C6.46847 7.75943 6.23555 7.81543 6 7.81543H5.875V7.80762C5.68324 7.79117 5.49843 7.7389 5.34473 7.65137L3.15527 6.39648V9.0957ZM5.99512 2.02539C5.96124 2.02399 5.9269 2.02929 5.89551 2.04297L1.87988 4.3418L5.89551 6.64062C5.9273 6.65417 5.96172 6.66134 5.99609 6.66016H6C6.03186 6.66016 6.05736 6.6565 6.0752 6.65234C6.09441 6.64786 6.10107 6.64353 6.09766 6.64551L10.1201 4.3418L6.10254 2.04199C6.07133 2.02921 6.03734 2.02326 6.00391 2.02441L5.99512 2.02539Z";

export function Sidebar({ isContactActive, onContactClick, onHomeClick, activeSection, onSectionChange }: SidebarProps) {
  const location = useLocation();
  const isResumePage = location.pathname === "/resume";

  const getTextColor = (isActive: boolean) => {
    return isActive ? "text-[#1D1D1D]" : "text-[#B1B1B1] hover:text-[#939393]";
  };

  const menuItems = [
    { label: "Vera’s Libertisle", path: "/", subLabel: "" },
    { label: "AI Product", path: "/ai-product", subLabel: "ai产品项目" },
    { label: "UX Design", path: "/ux-design", subLabel: "ux设计项目" },
    { 
      label: "Resume", 
      path: "/resume", 
      subLabel: "个人简历",
      hasSubMenu: true 
    },
  ];

  return (
    <div 
      className={`w-[256px] h-full absolute top-0 left-0 z-40 transition-colors duration-500 overflow-y-auto overflow-x-hidden pt-[64px] flex flex-col ${isResumePage ? "bg-[#F9F9F9]" : "bg-[rgba(249,249,249,0.05)] backdrop-blur-[4px] border-r border-white/5"}`}
    >
      <div className="flex-1 flex flex-col items-start w-full">
        {menuItems.map((item) => (
          <div key={item.path} className="w-full mb-[40px] last:mb-0">
            <NavLink
              to={item.path}
              onClick={item.path === "/" ? onHomeClick : undefined}
              className={({ isActive }) => `block px-[48px] group transition-colors duration-300 ${getTextColor(isActive)}`}
            >
              <div className="flex flex-col items-start w-full" data-name="Heading 1">
                <div className={`font-['Manrope:ExtraBold',sans-serif] font-extrabold text-[18px] uppercase leading-[28px]`}>
                  <p>{item.label}</p>
                </div>
                {item.subLabel && (
                  <div className={`font-['OPPOSans:Regular',sans-serif] text-[10px] uppercase leading-[15px]`}>
                    <p>{item.subLabel}</p>
                  </div>
                )}
              </div>
            </NavLink>

            {/* Submenu under Resume */}
            {item.hasSubMenu && isResumePage && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="w-full mt-[24px]"
              >
                <div className="flex flex-col gap-[24px]">
                  <SubMenuItem 
                    label="about me" 
                    iconPath={svgPaths.p6d5e700} 
                    isSelected={activeSection === "about me"} 
                    viewBox="0 0 9.33333 9.33333"
                    onClick={() => onSectionChange("about me")}
                  />
                  <SubMenuItem 
                    label="AI Products" 
                    iconPath={svgPaths.p36900d80} 
                    isSelected={activeSection === "AI Products"} 
                    viewBox="0 0 10.5 11.6667"
                    onClick={() => onSectionChange("AI Products")}
                  />
                  <SubMenuItem 
                    label="UX Case" 
                    iconPath={svgPathsResume.pce77c00} 
                    isSelected={activeSection === "UX Case"} 
                    viewBox="0 0 9.33333 9.33333"
                    onClick={() => onSectionChange("UX Case")}
                  />
                  <SubMenuItem 
                    label="education" 
                    iconPath={svgPathEducation} 
                    isSelected={activeSection === "education"} 
                    viewBox="0 0 12 12"
                    onClick={() => onSectionChange("education")}
                  />
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Me Section */}
      <div className="pb-[48px] pt-[40px] px-[48px] w-full mt-auto">
        <button 
          onClick={onContactClick}
          style={{ cursor: `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7' cy='7' r='6.5' fill='%231A1C1C' stroke='%23E6E6E6'/%3E%3C/svg%3E") 7 7, pointer` }}
          className={`flex flex-col items-start w-full group transition-colors duration-300 ${isContactActive ? "text-[#1D1D1D]" : "text-[#B1B1B1] hover:text-[#939393]"}`}
        >
          <div className="font-['Manrope:ExtraBold',sans-serif] font-extrabold text-[18px] uppercase leading-[28px]">
            <p>Contact Me</p>
          </div>
          <div className="font-['OPPOSans:Regular',sans-serif] text-[10px] uppercase leading-[15px]">
            <p>联系方式</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function SubMenuItem({ label, iconPath, isSelected, viewBox, onClick }: { label: string, iconPath: string, isSelected: boolean, viewBox: string, onClick: () => void }) {
  return (
    <div className="relative w-full group cursor-pointer" data-name="Item → Link" onClick={onClick}>
      {isSelected && (
        <div aria-hidden="true" className="absolute border-[#1D1D1D] border-l-2 border-solid inset-0 pointer-events-none" />
      )}
      <div className="flex flex-row items-center w-full h-[32px]">
        <div className={`flex gap-[12px] items-center pl-[49px] w-full transition-colors duration-300 ${isSelected ? "text-[#1D1D1D]" : "text-[#969696] hover:text-[#1D1D1D]"}`}>
          <div className="size-[12px] flex items-center justify-center shrink-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={viewBox}>
              <path d={iconPath} fill="currentColor" />
            </svg>
          </div>
          <div className={`font-['Inter','Noto_Sans_SC',sans-serif] ${isSelected ? "font-bold" : "font-medium"} text-[12px] uppercase whitespace-nowrap`}>
            <p className="leading-[16px]">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
