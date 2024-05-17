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

import { initialNodes, nodeTypes } from "../nodes";
import { initialEdges } from "../edges";
import { GetNewNodeId, isDuplicateEdgeStart } from "../util";
import SidePanel from "./SidePanel";

export default function FlowBuilder() {
  const reactFlowInstance = useReactFlow();

  // Initial states for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Validate & Handle connections between nodes
  const onConnect: OnConnect = (connection) => {
    // Avoid duplicate edges starting from the same node
    if (isDuplicateEdgeStart(edges, connection)) {
      console.log("Duplicate edge start");
      return;
    }

    const edge = {
      id: `${connection.source}-${connection.target}`,
      ...connection,
    };
    setEdges((edges) => addEdge(edge, edges));
  };

  // * Handlers for Drag and Drop functionality
  // fired when dragging over
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // fired when dropping
  const onDrop =
    // useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      // console.log("position", position);

      // Create a new node with the type and position
      const newNode = {
        id: GetNewNodeId(nodes),
        type,
        position,
        data: { message: `Enter the message...` },
      };

      setNodes((nodes) => nodes.concat(newNode));
    };
  //   [reactFlowInstance]
  // );

  return (
    <section>
      <nav className="bg-gray-200 relative flex justify-end px-10">
        <button className=" bg-white font-semibold px-3 py-1 my-2 text-purple-500 border rounded-md hover:bg-gray-100">
          Save Changes
        </button>
      </nav>

      <main className="flex w-full">
        <div className="h-[100vh] w-[70%]">
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
        <SidePanel />
      </main>
    </section>
  );
}
