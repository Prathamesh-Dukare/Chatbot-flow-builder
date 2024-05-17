import React from "react";
import { nodeTypes } from "../nodes";

export default function NodesHousing() {
  return (
    <div className="flex gap-3 flex-wrap">
      {Object.keys(nodeTypes).map((nodeType) => {
        return <NodeCard key={nodeType} nodeType={nodeType} />;
      })}
    </div>
  );
}

// * NodeCard component
function NodeCard({ nodeType }: { nodeType: string }) {
  // fired when dragging starts
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    // updating the data to be transferred so that we can recognize the type of node being dragged
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, nodeType)}
      className="node-item flex bg-white items-center flex-col gap-2 border rounded-md w-36 px-10 py-2 cursor-pointer hover:bg-gray-200"
    >
      <img
        className="w-6"
        src={`${nodeType.toLowerCase()}.png`}
        alt="message"
        draggable={false}
      />

      <p className="text-sm">
        {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
      </p>
    </div>
  );
}
