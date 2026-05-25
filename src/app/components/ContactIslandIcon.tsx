import svgPaths from "../../imports/SectionBentoGridProjectsAiProducts/svg-9lhe6139vs";

const ICON_PATH_NAMES = [
  "p2dfdf508", "pe935180", "p27f4a800", "p2c957700", "p144f200", "p18b7a680", "p1897a580", "p1c6e3bf0",
  "p19d27a00", "p25d76500", "p17b15200", "p21fb5f0", "p2ca16500", "p7b76020", "p21471ac0", "p3493bb00",
  "p1eac9500", "p3a2e7380", "p1a895700", "p1e891300", "p27762800", "p3d536af0", "pf0e0f80", "p7cb5380",
  "pd750e00", "p1a213980", "p1df0c100", "p15c61000", "p308e2c00", "p1c991d00", "p3702f400", "p2aca6e00",
  "p29779cf0", "p3684f380", "p10b9100", "peb5f280", "p38f4d200", "p37ae03c0", "p3c607f00", "p232cd700",
  "p2ee11d40", "pff97780", "p332847c0", "p15448300", "p274da780", "p29182300", "p13bd1d00", "p22969880",
  "p1f217180", "p18cbd040", "p22e7be00", "p7e10000", "p187aee00", "pc24f500", "pa05bf00", "p1a57b700",
  "p23144f00", "p312e3000", "p2127d500", "p122d6d80", "p27319400", "p3daa1f0", "p22f65780", "p2899f700",
  "pa255300", "p2af9d600", "p12e19080", "p1f82f700", "p7e09100", "p14bf0900", "pb2d1700", "p3a2a6400",
  "p2d056f80", "pe336bf2", "p1ed1a180", "p280bf820", "p37a46880", "p27aa5e80", "p25718580", "p3ddc07f0",
  "p20ef800", "p227e4f80", "p293ccd00", "p10e19d00", "pbdc7500", "p3bae8a00", "p2d1a0500", "p6afba80",
  "pf741700", "p29ab800", "p12064e80", "p215ac480", "p20afb500", "p3f802e80", "p2649d500", "p30915800",
  "p2f3d0d80", "p2d7ef500", "p17da7b00", "p17f1ea00", "p11b87900", "pd53d200", "p34cec700", "p2de16400",
  "p22d11e00", "p314e7840", "p2b6cb680", "p122a8a80", "p1fa15200", "p392f7740", "p28ccec00", "p30038d80",
  "p5d94a00", "pa8a2980", "p1df51972", "p25984900", "paa76e00", "p32ae1580", "p4067000", "p2aca5d00",
  "p5fed100", "p32702b00", "p1dbf0080", "p28ffa200", "p16df2c80", "p36abf480", "p3f227e00", "p12a1b7e0",
  "peb65680", "p2c6bfb00", "p3e2c4d00", "p2337400", "p271812c0", "p21521180", "p1659b080", "pd9b7f00",
  "p3bec6280", "p3f7ffa00", "p141a0880", "p1c7fb4c0", "p2328dce0", "pa199e31", "p260d7800", "p10bc2c00",
  "p25b8f900", "p31286570", "p1e699b00", "p29f75000", "p279ab80", "p57e1e00", "p5594600", "p3c41cf00",
  "p28e10e80", "p23c3bce0", "p3898f280", "p39ec4c0", "p6fe2d70", "p3fcfc00", "p3940a200", "p3f9dc680",
  "p277cf300", "p117e1a00", "p29714d40", "p3de9a080", "p4730a00", "p3d217d00", "p1aad6900", "p194d7900",
  "p4a71e00", "p3edb04f0", "pcf6d100", "p97d1f00", "p1823d000", "p3ec14200", "pedfb200", "p1cb5400",
  "p29087200", "p2c4c9280", "p2f4e8400", "p23667d80", "p10658180", "p38cf8a00", "p2d816b00", "p12364300",
  "p12138f80", "p18de7b80", "pabfd680", "p16db3d80", "p3a093380", "p20d60b80", "p18678200", "pd9d67c0",
  "p1837400", "p73e5400", "p14619200", "p10f63d00", "p240f5a00", "p3edb4600", "p1d706940", "pc752bc0",
  "p38f95a40", "p2c222180", "p3683a780", "p216f5800", "p3fda7ff0", "p2ffbd480", "p607a880", "p30f2ec80",
  "p4c1d300", "p3cbe8600", "p380d4400", "p198cc300", "p5fc0980", "p18b77280", "p16e71580", "p43b4a0",
  "p23bf0400", "p284d2900", "p17f73300", "p2941a380", "p1392cb00", "p23bef400", "p27f8efc0", "p3a86a480",
  "p58b000", "p1f818540", "p2607cc00", "p308fe100", "p139813c0", "p1a5e3ac0", "pd05e72", "p34c09680",
  "p28a6c380", "p16fb2580", "pb57a780", "p310b100", "p3b397580", "p3b1a8b70", "p3ca2cd80", "pcb9f5c0",
  "p36736e00", "p2356e480", "p1d85d680", "p3131a300", "p1cc5b380", "p26ede800", "p32896300", "p2471c600",
  "p24d4f600", "pdb27300", "p1e2f1d00", "pf4b7700", "p14266500", "p31d6900", "p29d6a1c0", "p31685b00",
  "p2436da00", "p22ac44f0", "p229b5970", "p167fd00", "p358fe700", "p312e0580", "p5e2a140", "p1188c00",
  "p124c2300", "p775e680", "p4647400", "p22536670", "p3fb1e80", "p1d4f5680", "pe22ddd6", "p19f60b00",
  "p18b7aa00", "p3a06a980", "p39569700", "p1a85ed00", "p18266800", "p52ac00", "p327d8600", "p1a319600",
  "p3a3b0480", "p337bc880", "p12d6ae80", "p39169380", "p31f1b00",
] as const satisfies readonly (keyof typeof svgPaths)[];

const CLIPPED_PATH_NAMES = new Set<keyof typeof svgPaths>([
  "p1897a580",
  "p2ca16500",
  "p27aa5e80",
  "p17da7b00",
  "p97d1f00",
  "p18de7b80",
  "p2607cc00",
  "p34c09680",
  "p1d85d680",
  "p775e680",
]);

export function ContactIslandIcon() {
  return (
    <div className="h-[44.764px] relative shrink-0 w-[55px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.9998 44.764">
        <g id="Group 1">
          <g id="Union">
            {ICON_PATH_NAMES.map((pathName) => {
              const usesEvenOdd = CLIPPED_PATH_NAMES.has(pathName);

              return (
                <path
                  key={pathName}
                  clipRule={usesEvenOdd ? "evenodd" : undefined}
                  d={svgPaths[pathName]}
                  fill="var(--fill-0, #E8E8E8)"
                  fillRule={usesEvenOdd ? "evenodd" : undefined}
                />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
