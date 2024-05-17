import type { Node, NodeTypes } from "reactflow";
import MessageNode from "./MessageNode";

export const initialNodes = [
  {
    id: "1",
    type: "message",
    position: { x: 0, y: 300 },
    data: { message: "Hello, world!" },
  },
  {
    id: "2",
    type: "message",
    position: { x: 300, y: 300 },
    data: { message: "Goodbye, world!" },
  },
  {
    id: "3",
    type: "message",
    position: { x: 300, y: 400 },
    data: { message: "Somethign someting ?" },
  },
  {
    id: "4",
    type: "message",
    position: { x: 600, y: 350 },
    data: { message: "Good mornign!//" },
  },
] satisfies Node[];

export const nodeTypes = {
  message: MessageNode,
} satisfies NodeTypes;
