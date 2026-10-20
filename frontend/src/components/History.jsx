import React, { useEffect, useState } from "react";
import { getSavedAnalyses } from "../services/api";

function History({ onLoadAnalysis }) {
    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedForComparison, setSelectedForComparison] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            setLoading(true);
            const data = await getSavedAnalyses();
            setAnalyses(data);
        } catch (err) {
            setError("Failed to load history.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCompare = (analysis) => {
        if (selectedForComparison.some(a => a.id === analysis.id)) {
            setSelectedForComparison(selectedForComparison.filter(a => a.id !== analysis.id));
        } else {
            if (selectedForComparison.length >= 2) {
                // Limit to 2 for side-by-side comparison
                setSelectedForComparison([selectedForComparison[1], analysis]);
            } else {
                setSelectedForComparison([...selectedForComparison, analysis]);
            }
        }
    };

    return (
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0px 2px 12px rgba(0,0,0,0.1)" }}>
            <h2>📜 Saved Requirements Analyses History</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                Select reports to open them in the dashboard, or check up to two reports to compare their metrics side-by-side.
            </p>

            {loading && <div style={{ color: "var(--color-primary)", fontWeight: "bold" }}>Loading history...</div>}
            {error && <div style={{ color: "#E53935", fontWeight: "bold" }}>{error}</div>}

            {!loading && analyses.length === 0 && (
                <div style={{ color: "var(--text-muted)", textAlign: "center", padding: "40px" }}>
                    No saved analyses found. Upload and save an analysis first.
                </div>
            )}

            {analyses.length > 0 && (
                <table className="requirements-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "8%" }}>Compare</th>
                            <th>Project Name</th>
                            <th>File Name</th>
                            <th>Date</th>
                            <th>Overall Health</th>
                            <th>Overall Risk</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analyses.map((a) => {
                            const isSelected = selectedForComparison.some(item => item.id === a.id);
                            const healthColor = a.health_percentage >= 75 ? "#4CAF50" : a.health_percentage >= 50 ? "#FFC107" : "#E53935";
                            const riskColor = a.risk_level?.toLowerCase() === "low" ? "#4CAF50" : a.risk_level?.toLowerCase() === "medium" ? "#FB8C00" : "#E53935";

                            return (
                                <tr key={a.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                    <td style={{ textAlign: "center" }}>
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleSelectCompare(a)}
                                            style={{ width: "18px", height: "18px", cursor: "pointer" }}
                                        />
                                    </td>
                                    <td style={{ fontWeight: "bold" }}>{a.project_name}</td>
                                    <td style={{ color: "var(--text-muted)" }}>{a.filename || "Raw Text Input"}</td>
                                    <td>{a.created_at ? new Date(a.created_at).toLocaleString() : "--"}</td>
                                    <td>
                                        <span style={{ color: healthColor, fontWeight: "bold" }}>
                                            {Math.round(a.health_percentage)}%
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge" style={{
                                            backgroundColor: `${riskColor}15`,
                                            color: riskColor,
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            fontWeight: "700"
                                        }}>
                                            {a.risk_level || "Low"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="filter-btn active"
                                            onClick={() => onLoadAnalysis(a.analysis_data)}
                                            style={{ padding: "6px 12px", fontSize: "0.85rem" }}
                                        >
                                            📂 Load Report
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {/* Comparison Panel */}
            {selectedForComparison.length === 2 && (
                <div style={{ marginTop: "40px", padding: "24px", background: "var(--bg-primary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                    <h3 style={{ marginBottom: "20px", color: "var(--color-primary)" }}>⚖️ Side-by-Side Analysis Comparison</h3>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        {selectedForComparison.map((a, idx) => (
                            <div key={a.id} style={{ background: "white", padding: "16px", borderRadius: "8px", boxShadow: "var(--shadow-main)" }}>
                                <h4 style={{ fontSize: "1.2rem", color: "var(--text-main)", marginBottom: "12px" }}>
                                    Project {idx + 1}: <strong>{a.project_name}</strong>
                                </h4>
                                <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <li><strong>Health Index:</strong> {Math.round(a.health_percentage)}%</li>
                                    <li><strong>Risk Level:</strong> {a.risk_level}</li>
                                    <li><strong>Total Requirements:</strong> {a.analysis_data.requirements_analyzed || 0}</li>
                                    <li><strong>Dynamic RSI:</strong> {a.analysis_data.dynamic_rsi !== undefined ? `${Math.round(a.analysis_data.dynamic_rsi * 100)}%` : "--"}</li>
                                    <li><strong>Semantic Consistency:</strong> {a.analysis_data.semantic_consistency !== undefined ? `${Math.round(a.analysis_data.semantic_consistency * 100)}%` : "--"}</li>
                                    <li><strong>Dependency Confidence:</strong> {a.analysis_data.dependency_confidence !== undefined ? `${Math.round(a.analysis_data.dependency_confidence * 100)}%` : "--"}</li>
                                    <li><strong>Conflict Severity:</strong> {a.analysis_data.conflict_severity !== undefined ? `${Math.round(a.analysis_data.conflict_severity * 100)}%` : "--"}</li>
                                    <li><strong>Historical Drift:</strong> {a.analysis_data.historical_drift !== undefined ? `${Math.round(a.analysis_data.historical_drift * 100)}%` : "--"}</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default History;
