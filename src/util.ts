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

export { GetNewNodeId, isDuplicateEdgeStart };
