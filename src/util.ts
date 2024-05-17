import { Edge, Node } from "reactflow";

function GetNewNodeId(nodes: Node[]): string {
  const lastId = Math.max(...nodes.map((node) => parseInt(node.id)));
  return (lastId + 1).toString();
}

function isDuplicateEdgeStart(edges: Edge[], connection: any): boolean {
  return edges.some((edge) => {
    // console.log(edge.source, connection.source);
    return edge.source === connection.source;
  });
}

// Check if user has selected a single node so that we can handle the edition of the node in editor
function isValidUniqueSelection(selection: { nodes: Node[]; edges: Edge[] }) {
  return selection.nodes.length === 1 && selection.edges.length === 0;
}

export { GetNewNodeId, isDuplicateEdgeStart, isValidUniqueSelection };
