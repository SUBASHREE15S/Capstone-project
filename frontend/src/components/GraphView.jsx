// Placeholder for React component/service
import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap
} from "reactflow";

import "reactflow/dist/style.css";

function GraphView({ requirements }) {

  // Create graph nodes
  const nodes = requirements.map((req, index) => ({
    id: req.requirement_id,
    data: {
      label: `${req.requirement_id}\n${req.module}`
    },
    position: {
      x: 200,
      y: index * 120
    }
  }));

  // Create graph edges
  const edges = [];

  for (let i = 0; i < requirements.length - 1; i++) {

    edges.push({
      id: `e${i}`,
      source: requirements[i].requirement_id,
      target: requirements[i + 1].requirement_id,
      animated: true,
      label: "depends on"
    });

  }

  return (

    <div
      style={{
        width: "100%",
        height: "600px",
        border: "1px solid gray",
        borderRadius: "10px"
      }}
    >

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >

        <MiniMap />

        <Controls />

        <Background />

      </ReactFlow>

    </div>

  );
}

export default GraphView;