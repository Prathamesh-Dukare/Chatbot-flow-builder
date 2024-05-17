import type { OnConnect } from "reactflow";
import { useCallback } from "react";
import { useReactFlow } from "reactflow";

import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges } from "./edges";

export default function FlowBuilder() {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const isDuplicateEdgeStart = (connection: any) => {
    return edges.some((edge) => {
      // console.log(edge.source, connection.source);
      return edge.source === connection.source;
    });
  };

  const onConnect: OnConnect = (connection) => {
    console.log("onConnect", connection);
    if (isDuplicateEdgeStart(connection)) {
      console.log("Duplicate edge start");
      return;
    }

    const edge = {
      id: `${connection.source}-${connection.target}`,
      ...connection,
    };
    setEdges((edges) => addEdge(edge, edges));
  };

  // * Drag and Drop functionality
  // fired on dragg start
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // fired while dragging
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // fired when drop
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // return if type is invalid
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      // console.log("position", position);

      const newNode = {
        id: "23",
        type,
        position,
        data: { message: `Enter the message...` },
      };

      setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <section>
      <nav className="bg-gray-200 relative flex justify-end px-10">
        <button className=" bg-white font-semibold px-3 py-1 my-2 text-purple-500 border rounded-md hover:bg-gray-100">
          Save Changes
        </button>
      </nav>

      <main className="flex w-full">
        <div
          className=""
          style={{
            height: "100vh",
            width: "70%",
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            {/* Plugins */}
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>

        {/* Side Panel */}

        <aside
          className=""
          style={{
            height: "100vh",
            width: "30%",
            borderLeft: "1px solid black",
            borderColor: "gray",
          }}
        >
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
      </main>
    </section>
  );
}
