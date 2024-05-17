import { useEffect } from "react";
import NodesHousing from "./NodesHousing";
import NodeEditor from "./NodeEditor";
import {
  Viewport,
  useOnSelectionChange,
  useOnViewportChange,
  useReactFlow,
} from "reactflow";
import { isValidUniqueSelection } from "../util";

export default function SidePanel({ activeNode, setActiveNode }: any) {
  const reactFlow = useReactFlow();

  // This will get triggered on selection change of item (node, edge) on the viewport
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      // console.log("sidepan", {
      //   nodes,
      //   edges,
      // });

      if (!isValidUniqueSelection({ nodes, edges })) {
        return;
      } else {
        setActiveNode(nodes[0]);
      }
    },
  });

  /* 
This will get triggered on change of viewport selection,
 we can use this to identify if user has clicked on the viewport to deselect the node
*/
  useOnViewportChange({
    onStart: (viewport: Viewport) => {
      console.log(viewport, "has changed");
      // setIsEditorActive(false);
      setActiveNode(null);
    },
  });

  useEffect(() => {
    reactFlow.setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === activeNode?.id) {
          return activeNode;
        }
        return node;
      });
    });
  }, [activeNode]);

  return (
    <aside className="flow-2 h-[100vh] w-[30%] border-l border-gray-300 px-5">
      <h1 className="mx-auto font-semibold text-lg text-center py-5 mb-10 relative right-2">
        {activeNode ? "Edit Node" : "Nodes"}
      </h1>

      {activeNode ? (
        <NodeEditor activeNode={activeNode} setActiveNode={setActiveNode} />
      ) : (
        <NodesHousing />
      )}
    </aside>
  );
}
