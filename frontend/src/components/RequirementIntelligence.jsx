import React from "react";

function RequirementIntelligence({ intelligence }) {

    if (!intelligence || intelligence.length === 0) {
        return (
            <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0px 2px 12px rgba(0,0,0,0.1)" }}>
                <h2>🧠 AI Requirement Intelligence</h2>
                <p>Upload and analyze an SRS document to calculate AI intelligence ratings.</p>
            </div>
        );
    }

    const getRiskColor = (risk) => {
        switch (risk?.toLowerCase()) {
            case "critical": return "#E53935";
            case "high": return "#FB8C00";
            case "medium": return "#FDD835";
            default: return "#4CAF50";
        }
    };

    return (
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0px 2px 12px rgba(0,0,0,0.1)", marginTop: "30px" }}>
            <h2 style={{ marginBottom: "20px" }}>🧠 AI Requirement Intelligence Engine (ARIE)</h2>
            
            <table className="requirements-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ width: "25%" }}>Requirement</th>
                        <th style={{ width: "25%" }}>Intelligence Score</th>
                        <th style={{ width: "25%" }}>Overall Risk Rating</th>
                        <th>Suggested Action</th>
                    </tr>
                </thead>
                <tbody>
                    {intelligence.map((item, index) => {
                        const scorePct = Math.round(item.intelligence_score * 100);
                        const riskColor = getRiskColor(item.risk);
                        
                        let action = "Standard Monitoring";
                        if (item.risk === "Critical") action = "Immediate Refactor & Stakeholder Review";
                        else if (item.risk === "High") action = "Analyze Dependencies & Improve Consistency";
                        else if (item.risk === "Medium") action = "Standard Review Loops";

                        return (
                            <tr key={index} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                <td style={{ fontWeight: "bold" }}>{item.requirement_id}</td>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <span style={{ fontWeight: "600" }}>{scorePct}%</span>
                                        <progress value={item.intelligence_score} max="1" style={{ width: "80px", height: "8px" }} />
                                    </div>
                                </td>
                                <td>
                                    <span className="badge" style={{
                                        backgroundColor: `${riskColor}15`,
                                        color: riskColor,
                                        padding: "4px 10px",
                                        borderRadius: "20px",
                                        fontWeight: "700",
                                        fontSize: "0.85rem"
                                    }}>
                                        {item.risk}
                                    </span>
                                </td>
                                <td style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{action}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default RequirementIntelligence;
