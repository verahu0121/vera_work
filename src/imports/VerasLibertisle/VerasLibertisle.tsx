import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import HoverIcon from "../Icon-1/Icon-20-426";
import aiProductSubnavThesisIcon from "../../assets/ai-product-page/subnav-thesis.svg?raw";
import aiProductSubnavConnectionIcon from "../../assets/ai-product-page/subnav-connection.svg?raw";
import aiProductSubnavMethodIcon from "../../assets/ai-product-page/subnav-method.svg?raw";
import type {
  ResumeInformationContact,
  ResumeInformationCopyright,
} from "../../app/data/resumeContent";

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for environments where Clipboard API is blocked
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (copyErr) {
      console.error("Fallback: Oops, unable to copy", copyErr);
    }
    document.body.removeChild(textArea);
  }
};
import ActiveIcon from "../Icon-2/Icon-24-618";
import svgPaths from "./svg-ofgadpgjl9";
import resumeSvgPaths from "../AsideSidebarNavigation-2/svg-bl31d4lqts";

function Paragraph({
  copyright,
}: {
  copyright?: ResumeInformationCopyright;
}) {
  const copyrightText =
    copyright?.text || "© 2026 The Digital Curator. Built for stability.";

  return (
    <div
      className="content-stretch flex gap-[20.5px] h-[42px] items-center justify-center leading-[0] pb-[1.5px] pt-[2.5px] relative shrink-0 text-[#6c6c6c]"
      data-name="Paragraph"
    >
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[20px]">Vera’s Libertisle</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center not-italic relative shrink-0 text-[11px] tracking-[1.1px] uppercase whitespace-nowrap">
        <p className="leading-[16.5px]">{copyrightText}</p>
      </div>
    </div>
  );
}

function FooterAction({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Link"
    >
      <button
        type="button"
        onClick={onClick}
        className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#6c6c6c] text-[11px] tracking-[1.1px] uppercase whitespace-nowrap cursor-pointer transition-colors hover:text-[#004e8d]"
      >
        <p className="leading-[16.5px]">{label}</p>
      </button>
    </div>
  );
}

function Container({
  onAdminDashboardClick,
  onLogoutClick,
}: {
  onAdminDashboardClick?: () => void;
  onLogoutClick?: () => void;
}) {
  return (
    <div
      className="content-stretch flex gap-[32px] h-[42px] items-center justify-center relative shrink-0"
      data-name="Container"
    >
      <FooterAction label="Admin Dashboard" onClick={onAdminDashboardClick} />
      <FooterAction label="Logout" onClick={onLogoutClick} />
    </div>
  );
}

export function Footer({
  onAdminDashboardClick,
  onLogoutClick,
  copyright,
}: {
  onAdminDashboardClick?: () => void;
  onLogoutClick?: () => void;
  copyright?: ResumeInformationCopyright;
}) {
  return (
    <div
      className="absolute bottom-0 content-stretch flex h-[138px] items-center justify-between left-[256px] px-[80px] py-[48px] right-0"
      data-name="Footer"
    >
      <Paragraph copyright={copyright} />
      <Container
        onAdminDashboardClick={onAdminDashboardClick}
        onLogoutClick={onLogoutClick}
      />
    </div>
  );
}

export function Frame6({
  isHovered,
  className = "absolute left-[111px] top-[-41px]",
}: {
  isHovered?: boolean;
  className?: string;
}) {
  return (
    <div className={`${className} size-[898px]`}>
      <div className="absolute inset-[-0.11%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 900 900"
        >
          <g id="Frame 1321318843">
            <g filter="url(#filter0_n_2_118)" id="Ellipse 65">
              <circle
                cx="450"
                cy="450"
                fill="url(#paint0_radial_2_118)"
                fillOpacity={isHovered ? 1 : 0.2}
                style={{
                  transition: "fill-opacity 0.5s ease-in-out",
                }}
                r="449"
              />
            </g>
            <g filter="url(#filter1_n_2_118)" id="Ellipse 66">
              <circle
                cx="450"
                cy="450"
                r="449"
                stroke="url(#paint1_linear_2_118)"
                strokeWidth="2"
              />
            </g>
            <g filter="url(#filter2_g_2_118)" id="Star 1">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 450 450"
                to="-360 450 450"
                dur="22s"
                repeatCount="indefinite"
              />
              <g transform="translate(148 118)">
                <g>
                  <animate
                    attributeName="opacity"
                    dur="22s"
                    repeatCount="indefinite"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="1;0;1;0;1"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    dur="22s"
                    repeatCount="indefinite"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="1;0.01;1;0.01;1"
                  />
                <path
                  d={svgPaths.p1c1ddb80}
                  fill="var(--fill-0, #96A1B6)"
                  transform="translate(-148 -118)"
                />
                <path
                  d={svgPaths.p1c1ddb80}
                  stroke="var(--stroke-0, #96A1B6)"
                  transform="translate(-148 -118)"
                />
                </g>
              </g>
            </g>
            <g filter="url(#filter3_g_2_118)" id="Star 3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 450 450"
                to="360 450 450"
                dur="22s"
                repeatCount="indefinite"
              />
              <g transform="translate(148 780)">
                <g>
                  <animate
                    attributeName="opacity"
                    dur="22s"
                    repeatCount="indefinite"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="1;0;1;0;1"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    dur="22s"
                    repeatCount="indefinite"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="1;0.01;1;0.01;1"
                  />
                <path
                  d={svgPaths.p34d95680}
                  fill="var(--fill-0, #96A1B6)"
                  transform="translate(-148 -780)"
                />
                <path
                  d={svgPaths.p34d95680}
                  stroke="var(--stroke-0, #96A1B6)"
                  transform="translate(-148 -780)"
                />
                </g>
              </g>
            </g>
            <g filter="url(#filter4_g_2_118)" id="Star 2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 450 450"
                to="360 450 450"
                dur="22s"
                repeatCount="indefinite"
              />
              <g transform="translate(751 118)">
                <g>
                  <animate
                    attributeName="opacity"
                    dur="22s"
                    repeatCount="indefinite"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="1;0;1;0;1"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    dur="22s"
                    repeatCount="indefinite"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="1;0.01;1;0.01;1"
                  />
                <path
                  d={svgPaths.p32ce2b80}
                  fill="var(--fill-0, #96A1B6)"
                  transform="translate(-751 -118)"
                />
                <path
                  d={svgPaths.p32ce2b80}
                  stroke="var(--stroke-0, #96A1B6)"
                  transform="translate(-751 -118)"
                />
                </g>
              </g>
            </g>
            <g filter="url(#filter5_g_2_118)" id="Star 4">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 450 450"
                to="-360 450 450"
                dur="22s"
                repeatCount="indefinite"
              />
              <g transform="translate(751 780)">
                <g>
                  <animate
                    attributeName="opacity"
                    dur="22s"
                    repeatCount="indefinite"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="1;0;1;0;1"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    dur="22s"
                    repeatCount="indefinite"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="1;0.01;1;0.01;1"
                  />
                <path
                  d={svgPaths.p45e7a80}
                  fill="var(--fill-0, #96A1B6)"
                  transform="translate(-751 -780)"
                />
                <path
                  d={svgPaths.p45e7a80}
                  stroke="var(--stroke-0, #96A1B6)"
                  transform="translate(-751 -780)"
                />
                </g>
              </g>
            </g>
            <g
              className="origin-center animate-spin"
              style={{
                animationDuration: "60s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                transformOrigin: "450px 450px",
              }}
            >
              <g filter="url(#filter6_g_2_118)" id="Ellipse 56">
                <path
                  d={svgPaths.pfe92200}
                  stroke="var(--stroke-0, #004E8D)"
                  strokeWidth="2"
                />
              </g>
              <g filter="url(#filter7_g_2_118)" id="Ellipse 57" opacity="0.6">
                <path
                  d={svgPaths.p1d09180}
                  stroke="var(--stroke-0, #004E8D)"
                  strokeWidth="2"
                />
              </g>
              <g filter="url(#filter8_g_2_118)" id="Ellipse 58" opacity="0.3">
                <path
                  d={svgPaths.p2a14bb00}
                  stroke="var(--stroke-0, #004E8D)"
                  strokeWidth="2"
                />
              </g>
              <g id="Ellipse 60">
                <circle
                  cx="0"
                  cy="0"
                  fill="var(--fill-0, #E6E6E6)"
                  r="6"
                  stroke="var(--stroke-0, #004E8D)"
                />
                <animateMotion
                  dur="12s"
                  repeatCount="indefinite"
                  path={svgPaths.pfe92200}
                />
              </g>
              <g id="Ellipse 62">
                <circle
                  cx="0"
                  cy="0"
                  fill="var(--fill-0, #E6E6E6)"
                  r="6"
                  stroke="var(--stroke-0, #004E8D)"
                />
                <animateMotion
                  dur="16s"
                  repeatCount="indefinite"
                  path={svgPaths.p1d09180}
                />
              </g>
              <g id="Ellipse 61">
                <circle
                  cx="0"
                  cy="0"
                  fill="var(--fill-0, #E6E6E6)"
                  r="6"
                  stroke="var(--stroke-0, #004E8D)"
                />
                <animateMotion
                  dur="14s"
                  repeatCount="indefinite"
                  path={svgPaths.p2a14bb00}
                />
              </g>
              <g id="Ellipse 63">
                <circle
                  cx="0"
                  cy="0"
                  fill="var(--fill-0, #E6E6E6)"
                  r="6"
                  stroke="var(--stroke-0, #004E8D)"
                />
                <animateMotion
                  dur="16s"
                  begin="-8s"
                  repeatCount="indefinite"
                  path={svgPaths.p1d09180}
                />
              </g>
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="898"
              id="filter0_n_2_118"
              width="898"
              x="1"
              y="1"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feTurbulence
                baseFrequency="0.25 0.25"
                numOctaves="3"
                result="noise"
                seed="7005"
                stitchTiles="stitch"
                type="fractalNoise"
              />
              <feColorMatrix
                in="noise"
                result="alphaNoise"
                type="luminanceToAlpha"
              />
              <feComponentTransfer
                in="alphaNoise"
                result="coloredNoise1"
              >
                <feFuncA
                  tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                  type="discrete"
                />
              </feComponentTransfer>
              <feComposite
                in="coloredNoise1"
                in2="shape"
                operator="in"
                result="noise1Clipped"
              />
              <feFlood
                floodColor="#C7D5EA"
                result="color1Flood"
              />
              <feComposite
                in="color1Flood"
                in2="noise1Clipped"
                operator="in"
                result="color1"
              />
              <feMerge result="effect1_noise_2_118">
                <feMergeNode in="shape" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="900"
              id="filter1_n_2_118"
              width="900"
              x="0"
              y="0"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feTurbulence
                baseFrequency="0.5 0.5"
                numOctaves="3"
                result="noise"
                seed="7005"
                stitchTiles="stitch"
                type="fractalNoise"
              />
              <feColorMatrix
                in="noise"
                result="alphaNoise"
                type="luminanceToAlpha"
              />
              <feComponentTransfer
                in="alphaNoise"
                result="coloredNoise1"
              >
                <feFuncA
                  tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                  type="discrete"
                />
              </feComponentTransfer>
              <feComposite
                in="coloredNoise1"
                in2="shape"
                operator="in"
                result="noise1Clipped"
              />
              <feFlood
                floodColor="#C7D5EA"
                result="color1Flood"
              />
              <feComposite
                in="color1Flood"
                in2="noise1Clipped"
                operator="in"
                result="color1"
              />
              <feMerge result="effect1_noise_2_118">
                <feMergeNode in="shape" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="900"
              id="filter2_g_2_118"
              width="900"
              x="0"
              y="0"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feTurbulence
                baseFrequency="0.25 0.25"
                numOctaves="3"
                seed="1010"
                type="fractalNoise"
              />
              <feDisplacementMap
                height="100%"
                in="shape"
                result="displacedImage"
                scale="8"
                width="100%"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feMerge result="effect1_texture_2_118">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="900"
              id="filter3_g_2_118"
              width="900"
              x="0"
              y="0"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feTurbulence
                baseFrequency="0.25 0.25"
                numOctaves="3"
                seed="1010"
                type="fractalNoise"
              />
              <feDisplacementMap
                height="100%"
                in="shape"
                result="displacedImage"
                scale="8"
                width="100%"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feMerge result="effect1_texture_2_118">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="900"
              id="filter4_g_2_118"
              width="900"
              x="0"
              y="0"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feTurbulence
                baseFrequency="0.25 0.25"
                numOctaves="3"
                seed="1010"
                type="fractalNoise"
              />
              <feDisplacementMap
                height="100%"
                in="shape"
                result="displacedImage"
                scale="8"
                width="100%"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feMerge result="effect1_texture_2_118">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="900"
              id="filter5_g_2_118"
              width="900"
              x="0"
              y="0"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feTurbulence
                baseFrequency="0.25 0.25"
                numOctaves="3"
                seed="1010"
                type="fractalNoise"
              />
              <feDisplacementMap
                height="100%"
                in="shape"
                result="displacedImage"
                scale="8"
                width="100%"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feMerge result="effect1_texture_2_118">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="492"
              id="filter6_g_2_118"
              width="202"
              x="349"
              y="204"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feTurbulence
                baseFrequency="0.083333335816860199 0.083333335816860199"
                numOctaves="3"
                seed="5031"
                type="fractalNoise"
              />
              <feDisplacementMap
                height="100%"
                in="shape"
                result="displacedImage"
                scale="12"
                width="100%"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feMerge result="effect1_texture_2_118">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="303.017"
              id="filter7_g_2_118"
              width="438.503"
              x="230.749"
              y="298.491"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feTurbulence
                baseFrequency="0.083333335816860199 0.083333335816860199"
                numOctaves="3"
                seed="5031"
                type="fractalNoise"
              />
              <feDisplacementMap
                height="100%"
                in="shape"
                result="displacedImage"
                scale="12"
                width="100%"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feMerge result="effect1_texture_2_118">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="303.017"
              id="filter8_g_2_118"
              width="438.503"
              x="230.749"
              y="298.491"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feTurbulence
                baseFrequency="0.083333335816860199 0.083333335816860199"
                numOctaves="3"
                seed="5031"
                type="fractalNoise"
              />
              <feDisplacementMap
                height="100%"
                in="shape"
                result="displacedImage"
                scale="12"
                width="100%"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feMerge result="effect1_texture_2_118">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(450 450) rotate(90) scale(449)"
              gradientUnits="userSpaceOnUse"
              id="paint0_radial_2_118"
              r="1"
            >
              <stop stopColor={isHovered ? "#7BA6D7" : "#004E8D"} />
              <stop
                offset="0.4"
                stopColor={isHovered ? "#7BA6D7" : "#004E8D"}
                stopOpacity={isHovered ? "0.22" : "0.3"}
              />
              <stop
                offset="1"
                stopColor={isHovered ? "#7BA6D7" : "#004E8D"}
                stopOpacity="0"
              />
            </radialGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear_2_118"
              x1="899"
              x2="1"
              y1="450"
              y2="450"
            >
              <stop stopColor="#B1B1B1" />
              <stop
                offset="1"
                stopColor="#B1B1B1"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ListItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="content-stretch flex gap-[24px] h-[14px] items-center relative shrink-0 w-full transition-opacity duration-300">
      <ul className="block font-['Manrope:Light',sans-serif] font-light relative shrink-0 text-[12px] tracking-[0.48px] uppercase">
        <li className="list-disc ms-[18px]">
          <span className="leading-[14px]">{label}</span>
        </li>
      </ul>
      <p className="font-['Manrope:Light',sans-serif] font-light not-italic relative shrink-0 text-[12px] tracking-[0.48px]">
        <span className="leading-[14px] text-[12px]">
          {value.split("0121").map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="text-[12px]">0121</span>
              )}
            </React.Fragment>
          ))}
        </span>
      </p>
    </div>
  );
}

const LIST_DATA = [
  [
    { label: "WeChat", value: "-vera0121-" },
    { label: "WeChat", value: "-vera0121-" },
    { label: "WeChat", value: "-vera0121-" },
    { label: "WeChat", value: "-vera0121-" },
  ],
  [
    { label: "Email", value: "-hello@vera-" },
    { label: "Behance", value: "-veradesign-" },
    { label: "Dribbble", value: "-vera.ux-" },
  ],
  [
    { label: "Twitter", value: "-@vera_ui-" },
    { label: "Instagram", value: "-@verart-" },
  ],
];

export type Frame5ListItemData = {
  label: string;
  value: string;
};

export function Frame5({
  activeIndex = 0,
  items,
}: {
  activeIndex?: number;
  items?: Frame5ListItemData[];
}) {
  const data = items ?? LIST_DATA[activeIndex] ?? LIST_DATA[0];
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[33px] items-start leading-[0] left-[1057px] text-[#1d1d1d] top-[calc(50%+0.5px)] w-[183px] whitespace-nowrap">
      {data.map((item, idx) => (
        <ListItem
          key={`${activeIndex}-${idx}`}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
}

export function Icon({
  isHovered,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
  hoverTextLines = ["CONTACT", "ME"],
  className = "absolute left-[500px] top-[348px]",
}: {
  isHovered?: boolean;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  hoverTextLines?: string[];
  className?: string;
}) {
  return (
    <div
      className={`${className} size-[120px] z-30 cursor-pointer`}
      data-name="icon"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 120 120"
      >
          <g id="icon">
            <rect
              fill="url(#paint0_radial_2_115)"
              height="119"
              rx="59.5"
              width="119"
              x="0.5"
              y="0.5"
            />
            <rect
              height="119"
              rx="59.5"
              stroke="url(#paint1_radial_2_115)"
              strokeDasharray="2 4"
              width="119"
              x="0.5"
              y="0.5"
            />
            <g id="Vector">
              <path
                d={svgPaths.p3263a500}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3509db10}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3f9c3000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1c3f2280}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2a561040}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p226a4e00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p328be100}
                fill="var(--fill-0, #004E8D)"
                fillRule="evenodd"
              />
              <path
                d={svgPaths.p26c9c400}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3add4540}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3705b800}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p6eab000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p208d7f00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p33b5af0}
                fill="var(--fill-0, #004E8D)"
                fillRule="evenodd"
              />
              <path
                d={svgPaths.p31981c80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p64b500}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3bd8ef00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p302ad000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p219e9380}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3bc00900}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p22cf9b00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3ed0aeb0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p27d0c000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p15d91a00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3bb33900}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p8e44640}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1d038e00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1a275300}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p32650600}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pa8a5400}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1eb213c0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p16b50ef0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p237846c0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2a177400}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p26a90580}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2bd61880}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p275fed80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p27463ff1}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1c50a800}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1558ab80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p366e0b00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p24354f80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pf2b54e0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p172d7280}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1c4a4c80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p30fe37f0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1f258f00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pda486f1}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1e10b000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p938d5a0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p247f4700}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3b006a40}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1b511c00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p13aaf000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p359c15f0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p201c5700}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3cb39200}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pd89ce00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pb4bc5c0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p37b5b180}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p383b3df0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p26d8580}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2ee3ef80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p10f38480}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pfa3ca00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p140d0300}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pee58600}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2cc43f00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2fd28780}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2970c8b0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2c4bce00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p115b2200}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2f8f7e00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1de08880}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3fe1ea00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pa11f670}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2994dd80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p204d6240}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p3153ff00}
                fill="var(--fill-0, #004E8D)"
                fillRule="evenodd"
              />
              <path
                d={svgPaths.p318c3f00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2b8edb00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p4ab4000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3e8ab980}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p172394a0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p386e3f80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pb683900}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pc356500}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p216729f0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p160ba700}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p350e1e00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3969ea00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pe6cad00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3e8bd3f0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p17025a80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p459a980}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3430780}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p34e3eb30}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p191be100}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2f606b00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p23354a00}
                fill="var(--fill-0, #004E8D)"
                fillRule="evenodd"
              />
              <path
                d={svgPaths.p378a000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1f264800}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1ff72a80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p18ff0d00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p33e9a500}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2ee32370}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p136f6090}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3422f000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3eda2070}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2ae86100}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p17d59000}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p128ad300}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3cd8fb80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p31e481f2}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p21c6e180}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pfe94d00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2c97ef00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1ec1fe80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p1a9c83f0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p11896f70}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3729c680}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p20b9c00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p23d152f0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p12f4280}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p31cc8700}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p27fe5700}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p2ad0cc00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3d9b7480}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p3d803700}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p220da4e0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p13eb9f00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p17be1300}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p20bc7c00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p92db300}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p38cb8680}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pde1efc0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p23803380}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p31878cc0}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p34bc2200}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pbe00c00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p120cf300}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p8a1ee00}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.p30e52d80}
                fill="var(--fill-0, #004E8D)"
              />
              <path
                d={svgPaths.pf962500}
                fill="var(--fill-0, #004E8D)"
              />
            </g>
          </g>
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(60 60) rotate(90) scale(60)"
              gradientUnits="userSpaceOnUse"
              id="paint0_radial_2_115"
              r="1"
            >
              <stop stopColor="#004E8D" stopOpacity="0.2" />
              <stop
                offset="0.4"
                stopColor="#004E8D"
                stopOpacity="0.06"
              />
              <stop
                offset="1"
                stopColor="#004E8D"
                stopOpacity="0"
              />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(60 60) rotate(90) scale(60)"
              gradientUnits="userSpaceOnUse"
              id="paint1_radial_2_115"
              r="1"
            >
              <stop
                offset="0.614939"
                stopColor="#7BA6D7"
                stopOpacity="0"
              />
              <stop offset="1" stopColor="#7BA6D7" />
            </radialGradient>
          </defs>
      </svg>
      <AnimatePresence initial={false}>
        {(isActive || isHovered) && (
          <motion.div
            key={isActive ? "active-icon" : "hover-icon"}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {isActive ? <ActiveIcon /> : <HoverIcon textLines={hoverTextLines} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components for Sidebar

function NavItem({
  title,
  subtitle,
  isActive,
  isResumeView,
  onClick,
  useCustomCursor = false,
}: {
  title: string;
  subtitle?: string;
  isActive: boolean;
  isResumeView: boolean;
  onClick: () => void;
  useCustomCursor?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  let textColor = isResumeView ? "#B1B1B1" : "#96A1B6";
  if (isActive)
    textColor = isResumeView ? "#1D1D1D" : "#004997";
  else if (isHovered)
    textColor = isResumeView ? "#939393" : "#6F88AF";

  const cursorStyle =
    useCustomCursor || (title === "Contact Me" && isResumeView)
      ? `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7' cy='7' r='6.5' fill='%231A1C1C' stroke='%23E6E6E6'/%3E%3C/svg%3E") 7 7, pointer`
      : "pointer";

  return (
    <div
      className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full group"
      style={{ cursor: cursorStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="content-stretch flex flex-col items-start px-[48px] relative w-full">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <div
            className="flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[18px] uppercase w-full transition-colors duration-300"
            style={{ color: textColor }}
          >
            <p className="leading-[28px]">{title}</p>
          </div>
        </div>
        {subtitle && (
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div
              className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] uppercase w-full transition-colors duration-300"
              style={{ color: textColor }}
            >
              <p className="leading-[15px]">{subtitle}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResumeSubItem({
  iconPath,
  label,
  isActive,
  onClick,
}: {
  iconPath: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative shrink-0 w-full group cursor-pointer"
      data-name="Item → Link"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {isActive && (
        <div
          aria-hidden="true"
          className="absolute border-[#1d1d1d] border-l-2 border-solid inset-0 pointer-events-none"
        />
      )}
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[48px] py-[8px] relative w-full">
          <div className="relative shrink-0 size-[12px]">
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12 12"
            >
              <path
                d={
                  label === "education"
                    ? "M6 0.875C6.23044 0.874982 6.46723 0.925859 6.65625 1.03418L11.1797 3.62402L11.2783 3.6875C11.4955 3.8476 11.6249 4.08005 11.625 4.34277C11.625 4.60531 11.4949 4.83842 11.2773 4.99805L11.1787 5.06152L10.9209 5.20801C10.9448 5.20487 10.9688 5.20118 10.9932 5.20117C11.1447 5.20118 11.2902 5.26236 11.3965 5.37109C11.5027 5.47973 11.5615 5.62692 11.5615 5.7793V9.37109L11.5508 9.4834C11.5291 9.59408 11.4752 9.69687 11.3955 9.77832C11.2893 9.88678 11.1445 9.94824 10.9932 9.94824C10.8417 9.94823 10.6971 9.88691 10.5908 9.77832C10.4847 9.66976 10.4258 9.5225 10.4258 9.37012V5.7793C10.4258 5.64801 10.4707 5.52204 10.5508 5.41992L9.98145 5.74707V9.15039C9.98145 9.15931 9.97983 9.17337 9.97852 9.18945L9.97949 9.19043C9.95442 9.86163 9.40274 10.3444 8.66895 10.6543C7.92777 10.9672 6.95711 11.125 6.00098 11.125C5.05517 11.125 4.09616 10.971 3.3584 10.665C2.6279 10.362 2.07351 9.89045 2.02539 9.23438C2.0214 9.20667 2.01853 9.17743 2.01855 9.14941V5.74609L0.821289 5.05957C0.545176 4.9029 0.375071 4.64251 0.375 4.34277C0.375 4.04284 0.545031 3.78207 0.821289 3.62402L5.34473 1.03418C5.53309 0.926157 5.76962 0.875065 6 0.875ZM3.15527 9.0957C3.1567 9.11167 3.15815 9.12758 3.1582 9.14355C3.15829 9.151 3.16223 9.17311 3.18848 9.20996C3.21413 9.24592 3.25625 9.28851 3.31738 9.33594C3.43977 9.43087 3.62651 9.53397 3.875 9.62891C4.37117 9.81841 5.09711 9.96973 6.00098 9.96973C6.90526 9.96972 7.63086 9.81839 8.12695 9.62891C8.37552 9.53396 8.56224 9.43088 8.68457 9.33594C8.74569 9.28849 8.78788 9.24591 8.81348 9.20996C8.83966 9.17314 8.84368 9.15098 8.84375 9.14355V9.13867L8.84473 9.12695V6.39746L6.65527 7.65234C6.46847 7.75943 6.23555 7.81543 6 7.81543H5.875V7.80762C5.68324 7.79117 5.49843 7.7389 5.34473 7.65137L3.15527 6.39648V9.0957ZM5.99512 2.02539C5.96124 2.02399 5.9269 2.02929 5.89551 2.04297L1.87988 4.3418L5.89551 6.64062C5.9273 6.65417 5.96172 6.66134 5.99609 6.66016H6C6.03186 6.66016 6.05736 6.6565 6.0752 6.65234C6.09441 6.64786 6.10107 6.64353 6.09766 6.64551L10.1201 4.3418L6.10254 2.04199C6.07133 2.02921 6.03734 2.02326 6.00391 2.02441L5.99512 2.02539Z"
                    : iconPath
                }
                clipRule="evenodd"
                fillRule="evenodd"
                fill={
                  isActive
                    ? "#1D1D1D"
                    : isHovered
                      ? "#939393"
                      : "#B1B1B1"
                }
                className="transition-colors duration-300"
              />
            </svg>
          </div>
          <div
            className={`flex flex-col h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] uppercase transition-colors duration-300 ${isActive ? "font-['Manrope:Bold',sans-serif] font-bold text-[#1d1d1d]" : isHovered ? "font-['Manrope:Medium',sans-serif] font-medium text-[#939393]" : "font-['Manrope:Medium',sans-serif] font-medium text-[#B1B1B1]"}`}
          >
            <p className="leading-[16px]">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const AI_PRODUCT_SUB_NAV_ITEMS = [
  {
    label: "共同命题",
    iconMarkup: aiProductSubnavThesisIcon,
    iconHeight: 12,
  },
  {
    label: "路径连接",
    iconMarkup: aiProductSubnavConnectionIcon,
    iconHeight: 13,
  },
  {
    label: "AI 产品方法",
    iconMarkup: aiProductSubnavMethodIcon,
    iconHeight: 12,
  },
] as const;

type AiProductSubItemLabel = (typeof AI_PRODUCT_SUB_NAV_ITEMS)[number]["label"];

const colorizeAiProductSubnavIcon = (svgMarkup: string, color: string) =>
  svgMarkup.replace(
    /fill="(?:#(?:969696|1D1D1D)|var\(--fill-0, #[0-9A-Fa-f]{6}\))"/g,
    `fill="${color}"`,
  );

function AiProductSubItem({
  iconMarkup,
  iconHeight,
  label,
  isActive,
  onClick,
}: {
  iconMarkup: string;
  iconHeight: number;
  label: AiProductSubItemLabel;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const itemColor = isActive ? "#1D1D1D" : isHovered ? "#939393" : "#B1B1B1";
  const activeIconMarkup = colorizeAiProductSubnavIcon(iconMarkup, itemColor);

  return (
    <div
      className="relative shrink-0 w-full group cursor-pointer"
      data-name="Item → Link"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {isActive && (
        <div
          aria-hidden="true"
          className="absolute border-[#1d1d1d] border-l-2 border-solid inset-0 pointer-events-none"
        />
      )}
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[48px] py-[8px] relative w-full">
          <div
            className="relative shrink-0 w-[12px]"
            style={{ height: `${iconHeight}px` }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 block size-full [&_svg]:block [&_svg]:size-full"
              dangerouslySetInnerHTML={{ __html: activeIconMarkup }}
            />
          </div>
          <div
            className={`flex flex-col h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] uppercase transition-colors duration-300 ${
              isActive
                ? "font-['OPPOSans:Medium',sans-serif] font-medium"
                : "font-['OPPOSans:Regular',sans-serif] font-normal"
            }`}
            style={{ color: itemColor }}
          >
            <p className="leading-[16px]">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MainSidebar({
  currentView,
  onViewChange,
  isContactActive,
  onContactClick,
  onHomeClick,
  activeResumeSubItem,
  onResumeSubItemClick,
  activeAiProductSubItem,
  onAiProductSubItemClick,
  contact,
}: {
  currentView: "home" | "resume" | "ai-product" | "ux-design";
  onViewChange?: (
    view: "home" | "resume" | "ai-product" | "ux-design",
  ) => void;
  isContactActive?: boolean;
  onContactClick?: () => void | Promise<void>;
  onHomeClick?: () => void;
  activeResumeSubItem?: string;
  onResumeSubItemClick?: (item: string) => void;
  activeAiProductSubItem?: AiProductSubItemLabel;
  onAiProductSubItemClick?: (item: AiProductSubItemLabel) => void;
  contact?: ResumeInformationContact;
}) {
  const isResumeView = currentView === "resume";
  const isAIProductView = currentView === "ai-product";
  const isUXDesignView = currentView === "ux-design";
  const isLightMode = true;
  const [showContactPopup, setShowContactPopup] =
    useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contactContent = contact ?? {
    wechat: "-vera0121-",
    email: "vera0121@126.com",
  };

  const handleCopyContact = (text: string, message: string) => {
    copyToClipboard(text);
    toast.custom(
      () => (
        <div className="bg-[#e6e6e6] relative rounded-[24px]">
          <div className="content-stretch flex gap-[10px] items-center px-[24px] py-[10px] relative rounded-[inherit]">
            <div className="relative shrink-0 size-[12px]">
              <svg
                className="absolute block inset-0 size-full"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  clipRule="evenodd"
                  d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM8.4182 4.1818C8.59393 4.35754 8.59393 4.64246 8.4182 4.8182L5.4182 7.8182C5.24246 7.99393 4.95754 7.99393 4.7818 7.8182L3.5818 6.6182C3.40607 6.44246 3.40607 6.15754 3.5818 5.9818C3.75754 5.80607 4.04246 5.80607 4.2182 5.9818L5.1 6.8636L6.4409 5.5227L7.7818 4.1818C7.95754 4.00607 8.24246 4.00607 8.4182 4.1818Z"
                  fill="#5E5E5E"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] uppercase whitespace-nowrap">
              <p className="leading-[20px]">{message}</p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute border border-[#b1b1b1] border-solid inset-0 pointer-events-none rounded-[24px]"
          />
        </div>
      ),
      { duration: 2000 },
    );
  };

  const handleCopyContactKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    text: string,
    message: string,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleCopyContact(text, message);
  };

  useEffect(() => {
    if (!isLightMode || !showContactPopup) {
      return;
    }

    const handleDocumentMouseMove = (event: MouseEvent) => {
      const sidebarRect = sidebarRef.current?.getBoundingClientRect();
      if (!sidebarRect) {
        return;
      }

      const isInsideSidebar =
        event.clientX >= sidebarRect.left &&
        event.clientX <= sidebarRect.right &&
        event.clientY >= sidebarRect.top &&
        event.clientY <= sidebarRect.bottom;

      if (!isInsideSidebar) {
        setShowContactPopup(false);
      }
    };

    document.addEventListener("mousemove", handleDocumentMouseMove);
    return () => {
      document.removeEventListener(
        "mousemove",
        handleDocumentMouseMove,
      );
    };
  }, [isLightMode, showContactPopup]);

  const handleViewChange = (
    view: "home" | "resume" | "ai-product" | "ux-design",
  ) => {
    if (
      view !== "resume" &&
      view !== "ai-product" &&
      view !== "ux-design"
    ) {
      setShowContactPopup(false);
    }
    if (typeof onViewChange === "function") {
      onViewChange(view);
    }
  };

  const handleContactClick = async () => {
    await onContactClick?.();

    if (isLightMode) {
      setShowContactPopup(!showContactPopup);
    } else {
      // Non-light mode uses the parent-level popup state.
    }
  };

  const handleSidebarMouseLeave = () => {
    if (isLightMode && showContactPopup) {
      setShowContactPopup(false);
    }
  };

  const handleHomeClick = () => {
    setShowContactPopup(false);
    if (currentView !== "home") {
      onHomeClick?.();
    }
  };

  return (
    <div
      ref={sidebarRef}
      className="content-stretch flex flex-col h-full items-start left-0 pt-[64px] top-0 w-[256px] relative z-20"
      data-name="Aside - Sidebar Navigation"
      onMouseLeave={handleSidebarMouseLeave}
    >
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full">
        <NavItem
          title="Vera's Libertisle"
          isActive={currentView === "home" && !isContactActive}
          isResumeView={isLightMode}
          onClick={handleHomeClick}
        />
        <NavItem
          title="AI Product"
          subtitle="ai产品项目"
          isActive={isAIProductView}
          isResumeView={isLightMode}
          onClick={() => handleViewChange("ai-product")}
        />
        {isAIProductView && (
          <div className="content-stretch flex flex-col gap-[24px] items-start pb-[48px] relative shrink-0 w-full animate-in fade-in slide-in-from-top-4 duration-500">
            {AI_PRODUCT_SUB_NAV_ITEMS.map((item) => (
              <AiProductSubItem
                key={item.label}
                label={item.label}
                iconMarkup={item.iconMarkup}
                iconHeight={item.iconHeight}
                isActive={activeAiProductSubItem === item.label}
                onClick={() => {
                  onAiProductSubItemClick?.(item.label);
                  window.dispatchEvent(
                    new CustomEvent("ai-product-nav-click", {
                      detail: { tab: item.label },
                    }),
                  );
                }}
              />
            ))}
          </div>
        )}
        <NavItem
          title="UX Design"
          subtitle="ux设计项目"
          isActive={isUXDesignView}
          isResumeView={isLightMode}
          onClick={() => handleViewChange("ux-design")}
        />
        <NavItem
          title="Resume"
          subtitle="个人简历"
          isActive={isResumeView}
          isResumeView={isLightMode}
          onClick={() => handleViewChange("resume")}
        />

        {isResumeView && (
          <div className="content-stretch flex flex-col gap-[24px] items-start pb-[40px] relative shrink-0 w-full animate-in fade-in slide-in-from-top-4 duration-500">
            <ResumeSubItem
              label="about me"
              iconPath={resumeSvgPaths.p3fc91b00}
              isActive={activeResumeSubItem === "about me"}
              onClick={() => {
                onResumeSubItemClick?.("about me");
                window.dispatchEvent(
                  new CustomEvent("resume-nav-click", {
                    detail: { tab: "about me" },
                  }),
                );
              }}
            />
            <ResumeSubItem
              label="AI Products"
              iconPath={resumeSvgPaths.p3e016000}
              isActive={activeResumeSubItem === "AI Products"}
              onClick={() => {
                onResumeSubItemClick?.("AI Products");
                window.dispatchEvent(
                  new CustomEvent("resume-nav-click", {
                    detail: { tab: "AI Products" },
                  }),
                );
              }}
            />
            <ResumeSubItem
              label="UX Case"
              iconPath={resumeSvgPaths.p34b25680}
              isActive={activeResumeSubItem === "UX Case"}
              onClick={() => {
                onResumeSubItemClick?.("UX Case");
                window.dispatchEvent(
                  new CustomEvent("resume-nav-click", {
                    detail: { tab: "UX Case" },
                  }),
                );
              }}
            />
            <ResumeSubItem
              label="education"
              iconPath={resumeSvgPaths.p3fc91b00}
              isActive={activeResumeSubItem === "education"}
              onClick={() => {
                onResumeSubItemClick?.("education");
                window.dispatchEvent(
                  new CustomEvent("resume-nav-click", {
                    detail: { tab: "education" },
                  }),
                );
              }}
            />
          </div>
        )}
      </div>

      <div className="content-stretch flex flex-col items-start pb-[48px] relative shrink-0 w-full">
        <div className="relative w-full">
          <AnimatePresence>
            {isLightMode && showContactPopup && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-[115px] left-0 w-full overflow-clip z-30 pointer-events-auto flex flex-col items-start justify-end"
                style={{ height: "717px" }}
              >
                <div
                  className="bg-linear-to-b from-[rgba(230,230,230,0)] to-[#e6e6e6] flex-1 min-h-px w-full cursor-pointer"
                  onClick={() => setShowContactPopup(false)}
                />
                <div className="bg-[#e6e6e6] flex flex-col gap-[32px] items-start px-[48px] py-[32px] relative w-full">
                  {/* WeChat Section */}
                  <div className="flex flex-col gap-[16px] items-start justify-center relative w-full">
                    <p className="font-['Manrope:Light',sans-serif] font-light leading-[14px] text-[#838383] text-[12px] tracking-[0.48px] uppercase">
                      WECHAT
                    </p>
                    <div
                      className="flex items-center justify-between w-[160px] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        if (
                          (event.target as HTMLElement).closest(
                            "[data-contact-copy-icon]",
                          )
                        ) {
                          return;
                        }
                        handleCopyContact(
                          contactContent.wechat,
                          "微信号已复制",
                        );
                      }}
                      onKeyDown={(event) =>
                        handleCopyContactKeyDown(
                          event,
                          contactContent.wechat,
                          "微信号已复制",
                        )
                      }
                    >
                      <p className="font-['OPPOSans:Regular',sans-serif] leading-[14px] lowercase text-[#1d1d1d] text-[14px]">
                        {contactContent.wechat}
                      </p>
                      <div
                        data-contact-copy-icon
                        className="size-[12px] opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
                        onClick={() => {
                          copyToClipboard(contactContent.wechat);
                          toast.custom(
                            () => (
                              <div className="bg-[#e6e6e6] relative rounded-[24px]">
                                <div className="content-stretch flex gap-[10px] items-center px-[24px] py-[10px] relative rounded-[inherit]">
                                  <div className="relative shrink-0 size-[12px]">
                                    <svg
                                      className="absolute block inset-0 size-full"
                                      fill="none"
                                      viewBox="0 0 12 12"
                                    >
                                      <path
                                        clipRule="evenodd"
                                        d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM8.4182 4.1818C8.59393 4.35754 8.59393 4.64246 8.4182 4.8182L5.4182 7.8182C5.24246 7.99393 4.95754 7.99393 4.7818 7.8182L3.5818 6.6182C3.40607 6.44246 3.40607 6.15754 3.5818 5.9818C3.75754 5.80607 4.04246 5.80607 4.2182 5.9818L5.1 6.8636L6.4409 5.5227L7.7818 4.1818C7.95754 4.00607 8.24246 4.00607 8.4182 4.1818Z"
                                        fill="#5E5E5E"
                                        fillRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                  <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] uppercase whitespace-nowrap">
                                    <p className="leading-[20px]">
                                      微信号已复制
                                    </p>
                                  </div>
                                </div>
                                <div
                                  aria-hidden="true"
                                  className="absolute border border-[#b1b1b1] border-solid inset-0 pointer-events-none rounded-[24px]"
                                />
                              </div>
                            ),
                            { duration: 2000 },
                          );
                        }}
                      >
                        <svg
                          className="size-full"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M1.12695 6.74647C1.12695 6.84624 1.16671 6.94192 1.23747 7.01247C1.30824 7.08301 1.40422 7.12264 1.5043 7.12264C1.60437 7.12264 1.70035 7.08301 1.77112 7.01247C1.84188 6.94192 1.88164 6.84624 1.88164 6.74647C1.88164 6.64671 1.84188 6.55102 1.77112 6.48048C1.70035 6.40993 1.60437 6.3703 1.5043 6.3703C1.40422 6.3703 1.30824 6.40993 1.23747 6.48048C1.16671 6.55102 1.12695 6.64671 1.12695 6.74647Z"
                            fill="#1D1D1D"
                          />
                          <path
                            d="M8.69727 5.28163L5.53906 5.25703C5.37148 5.25585 5.23438 5.41874 5.23438 5.62031C5.23438 5.82187 5.37148 5.9871 5.53906 5.98828L8.69727 6.01288C8.86484 6.01406 9.00195 5.85117 9.00195 5.6496C9.00195 5.44804 8.86484 5.28281 8.69727 5.28163ZM8.69727 6.76992L5.53906 6.74531C5.37148 6.74413 5.23438 6.90702 5.23438 7.10859C5.23438 7.31015 5.37148 7.47538 5.53906 7.47656L8.69727 7.50117C8.86484 7.50351 9.00195 7.33945 9.00195 7.13788C9.00195 6.93632 8.86484 6.77109 8.69727 6.76992Z"
                            fill="#1D1D1D"
                          />
                          <path
                            d="M8.62617 0.748828H4.88672C4.06172 0.748828 3.38672 1.42383 3.38672 2.24883H2.62617C1.80117 2.24883 1.12617 2.92383 1.12617 3.74883V5.24883C1.125 5.45625 1.29492 5.62383 1.50352 5.62383C1.71211 5.62383 1.88086 5.45508 1.88086 5.24766V3.75C1.88086 3.3375 2.21836 3 2.63086 3H3.38672V8.24766C3.38672 9.07266 4.06172 9.74766 4.88672 9.74766H7.87617C7.875 10.1602 7.53867 10.4953 7.12617 10.4953H2.63086C2.21836 10.4953 1.88086 10.1578 1.88086 9.74531V8.24414C1.88086 8.03672 1.71211 7.86797 1.50352 7.86797C1.29492 7.86797 1.125 8.03672 1.125 8.24414V9.74766C1.125 10.5727 1.8 11.2477 2.625 11.2477H7.12617C7.95117 11.2477 8.62617 10.5727 8.62617 9.74766H9.38789C10.2129 9.74766 10.8879 9.07266 10.8879 8.24766V2.99883L8.62617 0.748828ZM8.62734 1.4918L10.1238 2.99531H9.375C8.9625 2.99531 8.625 2.65781 8.625 2.24531V1.4918H8.62734ZM9.37734 9.00352H4.87617C4.46367 9.00352 4.12617 8.66602 4.12617 8.25352V2.2418C4.12617 1.8293 4.46367 1.4918 4.87617 1.4918H7.86328V2.23828C7.86328 3.06328 8.53828 3.73828 9.36328 3.73828H10.1273V8.25352C10.1273 8.66602 9.78984 9.00352 9.37734 9.00352Z"
                            fill="#1D1D1D"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Email Section */}
                  <div className="flex flex-col gap-[16px] items-start justify-center relative w-full">
                    <p className="font-['Manrope:Light',sans-serif] font-light leading-[14px] text-[#838383] text-[12px] tracking-[0.48px] uppercase">
                      E-MAIL
                    </p>
                    <div
                      className="flex items-center justify-between w-[160px] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        if (
                          (event.target as HTMLElement).closest(
                            "[data-contact-copy-icon]",
                          )
                        ) {
                          return;
                        }
                        handleCopyContact(
                          contactContent.email,
                          "邮箱号已复制",
                        );
                      }}
                      onKeyDown={(event) =>
                        handleCopyContactKeyDown(
                          event,
                          contactContent.email,
                          "邮箱号已复制",
                        )
                      }
                    >
                      <p className="font-['OPPOSans:Regular',sans-serif] leading-[14px] lowercase text-[#1d1d1d] text-[14px]">
                        {contactContent.email}
                      </p>
                      <div
                        data-contact-copy-icon
                        className="size-[12px] opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
                        onClick={() => {
                          copyToClipboard(contactContent.email);
                          toast.custom(
                            () => (
                              <div className="bg-[#e6e6e6] relative rounded-[24px]">
                                <div className="content-stretch flex gap-[10px] items-center px-[24px] py-[10px] relative rounded-[inherit]">
                                  <div className="relative shrink-0 size-[12px]">
                                    <svg
                                      className="absolute block inset-0 size-full"
                                      fill="none"
                                      viewBox="0 0 12 12"
                                    >
                                      <path
                                        clipRule="evenodd"
                                        d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM8.4182 4.1818C8.59393 4.35754 8.59393 4.64246 8.4182 4.8182L5.4182 7.8182C5.24246 7.99393 4.95754 7.99393 4.7818 7.8182L3.5818 6.6182C3.40607 6.44246 3.40607 6.15754 3.5818 5.9818C3.75754 5.80607 4.04246 5.80607 4.2182 5.9818L5.1 6.8636L6.4409 5.5227L7.7818 4.1818C7.95754 4.00607 8.24246 4.00607 8.4182 4.1818Z"
                                        fill="#5E5E5E"
                                        fillRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                  <div className="flex flex-col font-['OPPOSans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] uppercase whitespace-nowrap">
                                    <p className="leading-[20px]">
                                      邮箱号已复制
                                    </p>
                                  </div>
                                </div>
                                <div
                                  aria-hidden="true"
                                  className="absolute border border-[#b1b1b1] border-solid inset-0 pointer-events-none rounded-[24px]"
                                />
                              </div>
                            ),
                            { duration: 2000 },
                          );
                        }}
                      >
                        <svg
                          className="size-full"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M1.12695 6.74647C1.12695 6.84624 1.16671 6.94192 1.23747 7.01247C1.30824 7.08301 1.40422 7.12264 1.5043 7.12264C1.60437 7.12264 1.70035 7.08301 1.77112 7.01247C1.84188 6.94192 1.88164 6.84624 1.88164 6.74647C1.88164 6.64671 1.84188 6.55102 1.77112 6.48048C1.70035 6.40993 1.60437 6.3703 1.5043 6.3703C1.40422 6.3703 1.30824 6.40993 1.23747 6.48048C1.16671 6.55102 1.12695 6.64671 1.12695 6.74647Z"
                            fill="#1D1D1D"
                          />
                          <path
                            d="M8.69727 5.28163L5.53906 5.25703C5.37148 5.25585 5.23438 5.41874 5.23438 5.62031C5.23438 5.82187 5.37148 5.9871 5.53906 5.98828L8.69727 6.01288C8.86484 6.01406 9.00195 5.85117 9.00195 5.6496C9.00195 5.44804 8.86484 5.28281 8.69727 5.28163ZM8.69727 6.76992L5.53906 6.74531C5.37148 6.74413 5.23438 6.90702 5.23438 7.10859C5.23438 7.31015 5.37148 7.47538 5.53906 7.47656L8.69727 7.50117C8.86484 7.50351 9.00195 7.33945 9.00195 7.13788C9.00195 6.93632 8.86484 6.77109 8.69727 6.76992Z"
                            fill="#1D1D1D"
                          />
                          <path
                            d="M8.62617 0.748828H4.88672C4.06172 0.748828 3.38672 1.42383 3.38672 2.24883H2.62617C1.80117 2.24883 1.12617 2.92383 1.12617 3.74883V5.24883C1.125 5.45625 1.29492 5.62383 1.50352 5.62383C1.71211 5.62383 1.88086 5.45508 1.88086 5.24766V3.75C1.88086 3.3375 2.21836 3 2.63086 3H3.38672V8.24766C3.38672 9.07266 4.06172 9.74766 4.88672 9.74766H7.87617C7.875 10.1602 7.53867 10.4953 7.12617 10.4953H2.63086C2.21836 10.4953 1.88086 10.1578 1.88086 9.74531V8.24414C1.88086 8.03672 1.71211 7.86797 1.50352 7.86797C1.29492 7.86797 1.125 8.03672 1.125 8.24414V9.74766C1.125 10.5727 1.8 11.2477 2.625 11.2477H7.12617C7.95117 11.2477 8.62617 10.5727 8.62617 9.74766H9.38789C10.2129 9.74766 10.8879 9.07266 10.8879 8.24766V2.99883L8.62617 0.748828ZM8.62734 1.4918L10.1238 2.99531H9.375C8.9625 2.99531 8.625 2.65781 8.625 2.24531V1.4918H8.62734ZM9.37734 9.00352H4.87617C4.46367 9.00352 4.12617 8.66602 4.12617 8.25352V2.2418C4.12617 1.8293 4.46367 1.4918 4.87617 1.4918H7.86328V2.23828C7.86328 3.06328 8.53828 3.73828 9.36328 3.73828H10.1273V8.25352C10.1273 8.66602 9.78984 9.00352 9.37734 9.00352Z"
                            fill="#1D1D1D"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <NavItem
            title="Contact Me"
            subtitle="联系方式"
            isActive={
              (!isLightMode && isContactActive) ||
              (isLightMode && showContactPopup)
            }
            isResumeView={isLightMode}
            onClick={handleContactClick}
          />
        </div>
      </div>
    </div>
  );
}

export default function VerasLibertisle() {
  return null; // This file now exports components for App.tsx
}
