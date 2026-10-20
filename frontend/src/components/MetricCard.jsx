import React from "react";

function MetricCard({ title, value, color, icon, progress }) {
    return (
        <div
            className="metric-card"
            style={{
                background: "rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.06)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.boxShadow = `0 12px 30px ${color}15`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
                e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.06)";
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: 0, color: "#64748b", fontSize: "0.82rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>{title}</h4>
                {icon && <span style={{ fontSize: "1.3rem" }}>{icon}</span>}
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <h2 style={{ margin: 0, fontSize: "1.7rem", fontWeight: "800", color: color }}>{value}</h2>
            </div>

            {progress !== undefined && (
                <div style={{ width: "100%", height: "5px", background: "rgba(0,0,0,0.05)", borderRadius: "3px", overflow: "hidden", marginTop: "5px" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: color, borderRadius: "3px", transition: "width 1s ease-out" }} />
                </div>
            )}
        </div>
    );
}

export default MetricCard;
