import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function StabilityGauge({ value = 0.92 }) {
    const percentage = Math.round(value * 100);
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: 220, padding: "20px", background: "white", borderRadius: "16px", boxShadow: "var(--shadow-main)" }}>
            <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>DNA Health Meter</h4>
            <div style={{ width: 140, height: 140, marginTop: "10px" }}>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        pathColor: percentage >= 75 ? "#4CAF50" : percentage >= 50 ? "#FFC107" : "#E53935",
                        textColor: percentage >= 75 ? "#4CAF50" : percentage >= 50 ? "#FFC107" : "#E53935",
                        trailColor: "#f1f5f9",
                        strokeLinecap: "round"
                    })}
                />
            </div>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600", marginTop: "5px" }}>
                {percentage >= 75 ? "🧬 HEALTHY TRAITS" : percentage >= 50 ? "🧬 WARNING LEVEL" : "🧬 CRITICAL TRAITS"}
            </span>
        </div>
    );
}

export default StabilityGauge;
