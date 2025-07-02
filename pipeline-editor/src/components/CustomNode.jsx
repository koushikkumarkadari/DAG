import { Handle, Position } from 'reactflow';
import '.././App.css'; // Adjust the path as necessary

function CustomNode({ data }) {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default CustomNode;