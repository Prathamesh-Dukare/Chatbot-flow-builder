import type { OnConnect } from "reactflow";
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

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
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
  return (
    <section>
      <nav className="bg-gray-200 relative justify-end px-10">
        <button className=" bg-white font-semibold px-3 py-1 my-2 text-purple-500 border rounded-md hover:bg-gray-100">
          Save Changes
        </button>
      </nav>

      <main className="flex">
        <div className="h-[100vh] w-[100vw]">
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
      </main>
    </section>
  );
}
