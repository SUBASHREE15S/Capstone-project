import React from "react";

function HealthCard({ health }) {

    if (!health) return null;

    let color = "#4CAF50";

    if (health.health_percentage < 40)
        color = "#E53935";
    else if (health.health_percentage < 60)
        color = "#FF9800";
    else if (health.health_percentage < 75)
        color = "#FFC107";

    return (

        <div
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                borderLeft: `6px solid ${color}`
            }}
        >

            <h2>🩺 Requirement Health Index</h2>

            <h1 style={{ color, fontSize: "2.8rem", fontWeight: "800", margin: "10px 0" }}>
                {health.health_percentage}%
            </h1>

            <h3 style={{ textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
                {health.status}
            </h3>

        </div>

    );

}

export default HealthCard;
