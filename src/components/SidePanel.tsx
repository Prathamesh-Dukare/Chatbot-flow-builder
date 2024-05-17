import React from "react";

export default function SidePanel() {
  // fired when dragging starts
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="h-[100vh] w-[30%] border-l border-gray-300">
      <h1>Panel</h1>

      <div
        draggable
        onDragStart={(event) => onDragStart(event, "message")}
        className="node-item flex bg-white items-center flex-col gap-2 border rounded-md w-fit px-10 py-2 cursor-grab"
      >
        <img
          className="w-6"
          src="chat-icon.png"
          alt="message"
          draggable={false}
        />
        <p className="text-sm">Message</p>
      </div>
    </aside>
  );
}
