import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  addEdge,
  Background,
  Controls as FlowControls,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre'; // Import dagre at the top
import CustomNode from './components/CustomNode';
import Controls from './components/Controls';
import { validateDAG } from './components/ValidationService';
import './App.css'; 
import NodeLabelModal from './components/NodeLabelModal';

const initialNodes = [];
const initialEdges = [];

const nodeTypes = { customNode: CustomNode };

// Create dagre graph instance
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isValidDag, setIsValidDag] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { fitView } = useReactFlow();

  // Add new node (open modal)
  const addNode = useCallback(() => {
    setModalOpen(true);
  }, []);
  
  const deleteSelected = useCallback(() => {
  const selectedNodes = nodes.filter((node) => node.selected);
  const selectedEdges = edges.filter((edge) => edge.selected);
  if (selectedNodes.length > 0 || selectedEdges.length > 0) {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          !edge.selected &&
          !selectedNodes.some(
            (node) => node.id === edge.source || node.id === edge.target
          )
      )
    );
    setTimeout(() => fitView({ duration: 500 }), 100);
    }
  }, [nodes, edges, fitView]);


  // Handle modal submit
  const handleModalSubmit = useCallback((label) => {
    if (!label.trim()) return;
    const id = `${+new Date()}`;
    const newNode = {
      id,
      type: 'customNode',
      data: { label },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setNodes((nds) => [...nds, newNode]);
    setModalOpen(false);
  }, []);

  // Handle new edge connections
  const onConnect = useCallback(
    (params) => {
      if (params.source === params.target) return; // Prevent self-loops
      setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds));
    },
    [setEdges]
  );

  // Validate DAG on nodes/edges change
  useEffect(() => {
    const result = validateDAG(nodes, edges);
    setIsValidDag(result);
  }, [nodes, edges]);

  // Auto-layout with dagre
  const applyAutoLayout = useCallback(() => {
    if (nodes.length === 0) return;

    // Configure the layout
    dagreGraph.setGraph({ 
      rankdir: 'LR',
      nodesep: 100,
      ranksep: 100,
      marginx: 50,
      marginy: 50
    });

    // Add nodes to dagre graph
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: 150, height: 50 });
    });

    // Add edges to dagre graph
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    // Run the layout
    dagre.layout(dagreGraph);

    // Apply the computed positions to nodes
    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - 75, // Center the node (width/2)
          y: nodeWithPosition.y - 25  // Center the node (height/2)
        },
      };
    });

    setNodes(layoutedNodes);
    
    // Fit view after layout
    window.requestAnimationFrame(() => {
      fitView({ padding: 0.1, duration: 200 });
    });
  }, [nodes, edges, fitView]);

  return (
    <div className="app">
      <NodeLabelModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
      <Controls addNode={addNode} applyAutoLayout={applyAutoLayout} deleteSelected={deleteSelected} />
      <div className="status">
        {isValidDag?.isValid ? (
          <span className="valid">Valid DAG</span>
        ) : (
          <span className="invalid">Invalid DAG: {isValidDag?.reason}</span>
        )}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        onNodesChange={changes => setNodes(nds => applyNodeChanges(changes, nds))}
        onEdgesChange={changes => setEdges(eds => applyEdgeChanges(changes, eds))}
      >
        <Background />
        <FlowControls />
      </ReactFlow>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}