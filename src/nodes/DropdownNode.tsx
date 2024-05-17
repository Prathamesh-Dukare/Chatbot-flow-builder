import { Handle, NodeProps, Position } from "reactflow";
import CustomHandle from "./CustomHandle";

type DropDownNodeProps = {
  options?: string[];
};

export default function DropDownNode({ data }: NodeProps<DropDownNodeProps>) {
  return (
    <div className="msg-node border-2 shadow-xl bg-white min-w-60 rounded-md">
      <div className="block-title bg-[#b2f0e3] px-5">
        <p className="font-[500]">DropDown</p>
      </div>
      <div className="block-message px-5 py-2">
        {data.options?.map((option, index) => {
          return <p key={index}>{option}</p>;
        })}
      </div>

      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </div>
  );
}
