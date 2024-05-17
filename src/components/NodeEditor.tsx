import { useEffect, useState } from "react";
import { Node } from "reactflow";

type NodeEditorProps = {
  activeNode: Node | null;
  setActiveNode: React.Dispatch<React.SetStateAction<Node | null>>;
};

/* This component will be used to edit the properties of the selected node
 Regardless of node type, we will able to edit it
 */
export default function NodeEditor({
  activeNode,
  setActiveNode,
}: NodeEditorProps) {
  return (
    <div className="border rounded-sm py-3 px-2">
      {activeNode && (
        <MessageEditor activeNode={activeNode} setActiveNode={setActiveNode} />
      )}
      {/* ... same for others in future*/}
    </div>
  );
}

function MessageEditor({ activeNode, setActiveNode }: any) {
  const [message, setMessage] = useState<string>(activeNode.data.message);

  // update activeNode on change of message
  const handleActiveNodeChange = (message: string) => {
    if (!activeNode) {
      return;
    }
    const updatedNodeObj = {
      ...activeNode,
      data: {
        ...activeNode.data,
        message,
      },
    };
    setActiveNode(updatedNodeObj);
  };

  useEffect(() => {
    setMessage(activeNode.data.message);
  }, [activeNode.data.message]);

  return (
    <div>
      <form className="flex flex-col gap-4">
        <label htmlFor="message-input">Message Text</label>
        <textarea
          className="outline-none border rounded-md p-1 focus:border-purple-500"
          id="message-input"
          placeholder="Enter message"
          value={message}
          onChange={(event) => {
            handleActiveNodeChange(event.target.value); // for node in reactflow
          }}
        />
      </form>
    </div>
  );
}

// function DropDownEditor() {
//   return <div>Dropown editor</div>;
// }
