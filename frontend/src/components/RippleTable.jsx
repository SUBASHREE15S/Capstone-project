import React from "react";

function RippleTable({ ripple }) {

    if (!ripple || ripple.length === 0)
        return null;

    // Group items by level for the timeline visualization
    const levelsMap = {};
    ripple.forEach(item => {
        const lvl = item.level;
        if (!levelsMap[lvl]) {
            levelsMap[lvl] = [];
        }
        levelsMap[lvl].push(item);
    });

    const maxLevel = Math.max(...Object.keys(levelsMap).map(Number));

    return (
        <div style={{ marginTop: "30px", background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0px 2px 12px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginBottom: "20px" }}>🌊 Ripple Change Propagation Timeline</h2>
            
            {/* Timeline View */}
            <div className="ripple-timeline" style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", paddingLeft: "20px" }}>
                <div style={{
                    position: "absolute",
                    left: "5px",
                    top: "10px",
                    bottom: "10px",
                    width: "2px",
                    background: "linear-gradient(to bottom, var(--color-primary), var(--color-secondary))",
                    zIndex: 1
                }} />

                {Object.keys(levelsMap).sort((a, b) => Number(a) - Number(b)).map(level => (
                    <div key={level} style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative", zIndex: 2 }}>
                        {/* Dot marker */}
                        <div style={{
                            position: "absolute",
                            left: "-20px",
                            top: "6px",
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: level === "0" ? "#E53935" : "var(--color-primary)",
                            border: "2px solid white",
                            boxShadow: "0 0 8px rgba(0,0,0,0.2)"
                        }} />
                        
                        <div style={{ fontWeight: "bold", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                            Level {level} {level === "0" ? "(Initial Change Trigger)" : ""}
                        </div>
                        
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            {levelsMap[level].map((item, idx) => (
                                <div 
                                    key={idx} 
                                    style={{
                                        background: "var(--bg-primary)",
                                        border: "1px solid var(--border-color)",
                                        padding: "8px 14px",
                                        borderRadius: "20px",
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        color: "var(--text-main)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px"
                                    }}
                                >
                                    <span>{item.requirement}</span>
                                    {item.weight !== undefined && item.weight !== 1.0 && (
                                        <span style={{ fontSize: "0.85em", color: "var(--color-secondary)" }}>
                                            ({Math.round(item.weight * 100)}%)
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        {Number(level) < maxLevel && (
                            <div style={{ fontSize: "1.2rem", color: "var(--text-muted)", paddingLeft: "10px", marginTop: "5px" }}>⬇️</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Structured Table */}
            <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>Details</h3>
            <table
                className="requirements-table"
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left"
                }}
            >
                <thead>
                    <tr>
                        <th style={{ padding: "10px" }}>Requirement</th>
                        <th style={{ padding: "10px" }}>Ripple Level</th>
                        <th style={{ padding: "10px" }}>Weight Influence</th>
                    </tr>
                </thead>
                <tbody>
                    {ripple.map((item, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid var(--border-color)" }}>
                            <td style={{ padding: "10px", fontWeight: "bold" }}>{item.requirement}</td>
                            <td style={{ padding: "10px" }}>
                                <span className="badge" style={{
                                    background: item.level === 0 ? "rgba(229, 57, 53, 0.1)" : "rgba(33, 150, 243, 0.1)",
                                    color: item.level === 0 ? "#E53935" : "#2196F3",
                                    padding: "4px 8px",
                                    borderRadius: "4px"
                                }}>
                                    Level {item.level}
                                </span>
                            </td>
                            <td style={{ padding: "10px" }}>
                                {item.weight !== undefined ? `${Math.round(item.weight * 100)}%` : "--"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RippleTable;
