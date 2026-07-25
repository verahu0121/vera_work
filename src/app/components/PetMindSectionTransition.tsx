import React from "react";

function PetMindNarrativeTransition({
  nodeId,
  textNodeId,
  children,
}: {
  nodeId: string;
  textNodeId: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="content-stretch flex h-[312px] items-center justify-center px-[48px] py-[84px] relative shrink-0 w-[864px]"
      data-node-id={nodeId}
    >
      <div
        className="[word-break:break-word] flex h-[144px] w-[768px] flex-col font-['OPPOSans:Light',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#474747] text-[24px] text-center tracking-[0px]"
        data-node-id={textNodeId}
        data-name="Conclusion Text"
      >
        {children}
      </div>
    </div>
  );
}

export function PetMindRelationshipToProductEntryTransition() {
  return (
    <PetMindNarrativeTransition nodeId="2655:30446" textNodeId="2655:30447">
      <p className="leading-[48px] mb-0">连续事件链回答了“什么数据值得积累”，但产品仍需一个明确的起点。</p>
      <p className="leading-[48px]">下一步，我将比较不同环节的信息密度、使用动机与经营价值，判断哪个环节适合作为第一切口。</p>
    </PetMindNarrativeTransition>
  );
}

export function PetMindProductEntryToNextTransition() {
  return (
    <PetMindNarrativeTransition nodeId="2664:30838" textNodeId="2664:30839">
      <p className="leading-[48px] mb-0">入口确定后，下一步要验证：</p>
      <p className="leading-[48px] mb-0">员工、宠主、商户与 AI 能否围绕一次服务完成接力，</p>
      <p className="leading-[48px]">并触发下一次预约。</p>
    </PetMindNarrativeTransition>
  );
}

export function PetMindGrowthLoopToNextTransition() {
  return (
    <PetMindNarrativeTransition nodeId="2765:22524" textNodeId="2765:22525">
      <p className="leading-[48px] mb-0">角色链路明确后，下一步的关键是将这套接力机制</p>
      <p className="leading-[48px]">落到具体产品交互中，形成可确认、可执行、可回写的 AI 工作流。</p>
    </PetMindNarrativeTransition>
  );
}
