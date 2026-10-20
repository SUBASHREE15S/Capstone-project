import React from "react";

function HealthExplanation({ explanation }) {

    if (!explanation)
        return null;

    return (

        <div
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                marginTop: "20px"
            }}
        >

            <h2 style={{ fontSize: "1.25rem", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>💡</span> AI Explanation & Insights
            </h2>

            <ul style={{ listStyleType: "none", padding: 0 }}>

                {

                    explanation.map((item, index) => (

                        <li 
                            key={index} 
                            style={{ 
                                padding: "8px 0", 
                                borderBottom: index < explanation.length - 1 ? "1px solid var(--border-color)" : "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                fontSize: "0.95rem"
                            }}
                        >
                            <span style={{ color: "var(--color-primary)" }}>•</span>
                            <span>{item}</span>
                        </li>

                    ))

                }

            </ul>

        </div>

    );

}

export default HealthExplanation;
