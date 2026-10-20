import React, { useState, useEffect } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

function DependencyGraph({ nodes = [], edges = [] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedModule, setSelectedModule] = useState("All");
    const [displayNodes, setDisplayNodes] = useState([]);
    const [displayEdges, setDisplayEdges] = useState([]);

    const modules = ["All", "Authentication", "Payment", "Dashboard", "Admin", "Profile", "General"];

    // Custom coloring maps
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    // Custom coloring maps based on influence score
    const getNodeStyle = (node) => {
        const influence = node.data?.influence || 0;
        let background = "#4CAF50"; // Default green

        if (influence > 90) {
            background = "#E53935"; // Red
        } else if (influence > 75) {
            background = "#FF9800"; // Orange
        } else if (influence > 50) {
            background = "#FBC02D"; // Yellow
        }

        return {
            background,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "0.85rem",
            fontWeight: "600",
            width: 220,
            boxShadow: "0 4px 6px rgba(0,0,0,0.15)"
        };
    };

    const getEdgeStyle = (weight) => {
        let stroke = "#94a3b8"; // Weak (Gray)
        let strokeWidth = 1.5;

        if (weight >= 0.90) {
            stroke = "#ef4444"; // Critical (Red)
            strokeWidth = 3;
        } else if (weight >= 0.80) {
            stroke = "#10b981"; // Strong (Green)
            strokeWidth = 2.5;
        } else if (weight >= 0.70) {
            stroke = "#eab308"; // Medium (Yellow)
            strokeWidth = 2.0;
        }

        return {
            stroke,
            strokeWidth
        };
    };

    const onNodeClick = (event, node) => {
        if (selectedNodeId === node.id) {
            setSelectedNodeId(null);
        } else {
            setSelectedNodeId(node.id);
        }
    };

    useEffect(() => {
        // Apply search & module filters
        let filteredNodes = nodes.map((node) => {
            const label = node.data?.label || "";
            const isMatch = searchQuery ? label.toLowerCase().includes(searchQuery.toLowerCase()) : false;
            
            // Generate node styling
            const style = getNodeStyle(node);
            
            if (selectedNodeId) {
                const isSelected = node.id === selectedNodeId;
                const isNeighbor = edges.some(edge => 
                    (edge.source === selectedNodeId && edge.target === node.id) ||
                    (edge.target === selectedNodeId && edge.source === node.id)
                );
                
                if (isSelected) {
                    style.border = "3px solid var(--color-primary)";
                    style.boxShadow = "0 0 20px var(--color-primary)";
                } else if (isNeighbor) {
                    style.border = "2px dashed var(--color-secondary)";
                    style.boxShadow = "0 0 10px var(--color-secondary)";
                } else {
                    style.opacity = 0.3;
                }
            } else if (isMatch) {
                // Highlight matched node
                style.border = "3px solid #facc15";
                style.boxShadow = "0 0 15px #facc15";
            }

            return {
                ...node,
                style
            };
        });

        if (selectedModule !== "All") {
            filteredNodes = filteredNodes.filter((node) => {
                const label = (node.data?.label || "").toLowerCase();
                if (selectedModule === "Authentication") return label.includes("auth") || label.includes("login") || label.includes("otp");
                if (selectedModule === "Payment") return label.includes("payment") || label.includes("invoice") || label.includes("bill");
                if (selectedModule === "Dashboard") return label.includes("dashboard") || label.includes("report") || label.includes("chart");
                if (selectedModule === "Admin") return label.includes("admin");
                if (selectedModule === "Profile") return label.includes("profile");
                return !label.includes("auth") && !label.includes("payment") && !label.includes("admin") && !label.includes("profile");
            });
        }

        const activeNodeIds = new Set(filteredNodes.map(n => n.id));
        
        // Filter edges to only link active nodes
        const filteredEdges = edges
            .filter(edge => activeNodeIds.has(edge.source) && activeNodeIds.has(edge.target))
            .map((edge) => {
                const weight = parseFloat(edge.label) || 0.8;
                return {
                    ...edge,
                    style: getEdgeStyle(weight)
                };
            });

        setDisplayNodes(filteredNodes);
        setDisplayEdges(filteredEdges);
    }, [nodes, edges, searchQuery, selectedModule, selectedNodeId]);

    return (
        <div id="graph" style={{ marginBottom: "30px" }}>
            <div className="toolbar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="🔍 Search Requirement ID / Desc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="filter-group">
                    {modules.map((m) => (
                        <button
                            key={m}
                            className={`filter-btn ${selectedModule === m ? "active" : ""}`}
                            onClick={() => setSelectedModule(m)}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            <div
                style={{
                    height: 520,
                    width: "100%",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative"
                }}
            >
                {displayNodes.length > 0 ? (
                    <ReactFlow
                        nodes={displayNodes}
                        edges={displayEdges}
                        onNodeClick={onNodeClick}
                        fitView
                    >
                        <Background color="var(--text-muted)" gap={16} />
                        <Controls style={{ background: "var(--bg-card)", color: "var(--text-main)" }} />
                        <MiniMap 
                            nodeColor={(node) => node.style?.background || "#10b981"}
                            maskColor="rgba(0,0,0,0.1)"
                        />
                    </ReactFlow>
                ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-muted)" }}>
                        No nodes matching filters.
                    </div>
                )}
            </div>
        </div>
    );
}

export default DependencyGraph;
