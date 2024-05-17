import type { Node, NodeTypes } from "reactflow";
import MessageNode, { messageNodeType } from "./MessageNode";
import DropDownNode, { DropDownNodeType } from "./DropdownNode";

// Initial state of the nodes
export const initialNodes: (messageNodeType | DropDownNodeType)[] = [
  {
    id: "1",
    type: "message",
    position: { x: 0, y: 300 },
    data: { message: "Whats your name?" },
  },
  {
    id: "2",
    type: "message",
    position: { x: 300, y: 300 },
    data: { message: "Tell me your query" },
  },
  {
    id: "3",
    type: "message",
    position: { x: 300, y: 400 },
    data: { message: "Random ✨" },
  },
  {
    id: "4",
    type: "message",
    position: { x: 600, y: 350 },
    data: { message: "Assist me with your email" },
  },
  // {
  //   id: "5",
  //   type: "dropDown",
  //   position: { x: 600, y: 200 },
  //   data: { options: ["Option 1", "Option 2", "Option 3"] },
  // },
] satisfies Node[];

// Node types for the FlowBuilder
export const nodeTypes = {
  message: MessageNode,
  dropDown: DropDownNode,
} satisfies NodeTypes;
