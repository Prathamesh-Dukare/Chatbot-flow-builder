import { ReactFlowProvider } from "reactflow";
import FlowBuilder from "./FlowBuilder";

export default function App() {
  return (
    <>
      <ReactFlowProvider>
        <FlowBuilder />
      </ReactFlowProvider>
    </>
  );
}
