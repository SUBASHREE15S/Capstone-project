import React from "react";
import "./RequirementDNA.css";

function RequirementDNA({ dna }) {

    if (!dna) {

        return (

            <div className="dna-card">

                <h2>🧬 Requirement DNA</h2>

                <p>Select a requirement from the table to view its DNA profile.</p>

            </div>

        );

    }

    return (

        <div className="dna-card">

            <h2>🧬 Requirement DNA</h2>

            <h3>{dna.requirement_id}</h3>

            <p style={{ margin: "10px 0", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                {dna.description}
            </p>

            <DNAItem
                title="Semantic Score"
                value={dna.semantic_score}
            />

            <DNAItem
                title="Dependency Score"
                value={dna.dependency_score}
            />

            <DNAItem
                title="Conflict Score"
                value={dna.conflict_score}
            />

            <DNAItem
                title="Volatility"
                value={dna.volatility_score}
            />

            <DNAItem
                title="Complexity"
                value={dna.complexity_score}
            />

            <DNAItem
                title="Business Criticality"
                value={dna.business_criticality}
            />

            <div className="priority" style={{ marginTop: "20px", fontSize: "1.1rem" }}>

                Priority : &nbsp;

                <span className="badge" style={{
                    backgroundColor: dna.priority?.toLowerCase() === "high" ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)",
                    color: dna.priority?.toLowerCase() === "high" ? "#ef4444" : "#3b82f6",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "0.9em"
                }}>

                    {dna.priority}

                </span>

            </div>

        </div>

    );

}

function DNAItem({ title, value }) {

    return (

        <div className="dna-item" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0" }}>

            <span style={{ fontWeight: "500", width: "150px" }}>{title}</span>

            <progress

                value={value}

                max="1"
                
                style={{ flex: 1, margin: "0 15px", height: "12px", borderRadius: "6px", overflow: "hidden" }}

            />

            <span style={{ fontWeight: "600", width: "45px", textAlign: "right" }}>

                {(value * 100).toFixed(0)}%

            </span>

        </div>

    );

}

export default RequirementDNA;
