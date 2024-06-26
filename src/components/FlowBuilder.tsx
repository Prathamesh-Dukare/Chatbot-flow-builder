import { useCallback, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  OnConnect,
  useReactFlow,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "../nodes";
import { initialEdges } from "../edges";
import { getNewNodeId, validateFlow, isDuplicateEdgeStart } from "../util";

import SidePanel from "./SidePanel";
import { toast } from "sonner";

export default function FlowBuilder() {
  const reactFlow = useReactFlow();

  // initial states for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState<Node | null>(null);

  // validate & Handle connections between nodes
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
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (typeof type === "undefined" || !type || type !== "message") {
      return;
    }
    const position = reactFlow.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // create a new node with the type and position
    const newNode: Node = {
      id: getNewNodeId(nodes),
      type,
      position,
      data: { message: `` },
    };

    setNodes((nodes) => nodes.concat(newNode));
    // update active node
    setActiveNode(newNode);
  };

  // Save flow handler
  const saveFlow = () => {
    const isFlowValid = validateFlow(nodes, edges);
    if (!isFlowValid) {
      toast.error("Cannot save flow");
      return;
    }

    // save flow
    console.log("flow_state", {
      nodes,
      edges,
    });
    toast.success("Flow saved");
  };

  return (
    <section>
      <nav className="bg-gray-200 relative flex justify-end px-10">
        <button
          onClick={saveFlow}
          className=" bg-white font-[500] px-3 py-1 my-2 text-blue-600 border rounded-md hover:bg-gray-100"
        >
          Save Changes
        </button>
      </nav>

      <main className="flow-container flex w-full">
        <div className="flow-1 h-[100vh] w-[75%]">
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
            {/* <MiniMap /> */}
            <Controls />
          </ReactFlow>
        </div>

        {/* Side Panel */}
        <SidePanel activeNode={activeNode} setActiveNode={setActiveNode} />
      </main>
    </section>
  );
}
