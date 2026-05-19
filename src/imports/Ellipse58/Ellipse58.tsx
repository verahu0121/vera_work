import svgPaths from "./svg-ujrlvwow16";

export default function Ellipse() {
  return (
    <div className="relative size-full" style={{ containerType: "size" }}>
      <div className="absolute inset-[-1.25%_-3.16%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 202 492">
          <g filter="url(#filter0_g_17_27)" id="Ellipse 58" opacity="0.6">
            <path d={svgPaths.p1ae4cf00} stroke="var(--stroke-0, #98FFFC)" strokeWidth="2" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="492" id="filter0_g_17_27" width="202" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.083333335816860199 0.083333335816860199" numOctaves="3" seed="5031" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="12" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_17_27">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}