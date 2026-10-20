import React from "react";

function InfluenceCard({ influence }) {

    if (!influence || !influence.length)
        return null;

    const top = influence[0];

    return (

        <div

            style={{

                background: "#fff",

                padding: "20px",

                borderRadius: "10px",

                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",

                marginBottom: "20px"

            }}

        >

            <h2 style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "10px" }}>

                ⭐ Most Influential Requirement

            </h2>

            <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "var(--color-primary)", margin: "5px 0" }}>

                {top.requirement_id}

            </h1>

            <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>

                Influence: &nbsp;

                <span style={{ color: "#D32F2F" }}>{top.influence_score}%</span>

            </h3>

        </div>

    );

}

export default InfluenceCard;
