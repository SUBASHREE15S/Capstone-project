// Placeholder for React component/service
import React, { useEffect, useState } from "react";

function ImpactCard() {

    const [impact, setImpact] = useState({
        risk_score: 0,
        estimated_effort: "Low",
        affected_requirements: [],
        affected_modules: []
    });

    useEffect(() => {

        // Temporary dummy data
        // Later replace with API call

        setImpact({
            risk_score: 68,
            estimated_effort: "Medium",
            affected_requirements: [
                "R2",
                "R4",
                "R5"
            ],
            affected_modules: [
                "Authentication",
                "Dashboard"
            ]
        });

    }, []);

    return (

        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                marginBottom: "20px"
            }}
        >

            <h2>Impact Prediction</h2>

            <hr />

            <p>
                <strong>Risk Score :</strong>{" "}
                {impact.risk_score}%
            </p>

            <p>
                <strong>Estimated Effort :</strong>{" "}
                {impact.estimated_effort}
            </p>

            <p>
                <strong>Affected Requirements :</strong>{" "}
                {impact.affected_requirements.length}
            </p>

            <p>
                <strong>Affected Modules :</strong>{" "}
                {impact.affected_modules.length}
            </p>

            <br />

            <h3>Affected Requirement IDs</h3>

            <ul>

                {impact.affected_requirements.map((req) => (

                    <li key={req}>
                        {req}
                    </li>

                ))}

            </ul>

            <h3>Affected Modules</h3>

            <ul>

                {impact.affected_modules.map((module) => (

                    <li key={module}>
                        {module}
                    </li>

                ))}

            </ul>

        </div>

    );

}

export default ImpactCard;