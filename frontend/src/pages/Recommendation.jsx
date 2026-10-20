// Placeholder for React component/service
import React, { useEffect, useState } from "react";
import { getRecommendation } from "../services/api";

function Recommendation() {

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    risk_score: 68,
    estimated_effort: "Medium",
    conflict_detected: true
  });

  useEffect(() => {

    async function loadRecommendations() {

      try {

        // Replace with actual backend call later
        /*
        const response = await getRecommendation({
          requirement_id: "R2",
          changed_requirement: "Login using Google OAuth",
          affected_modules: ["Authentication"],
          conflict_detected: true,
          risk_score: 68
        });

        setRecommendations(response.data);
        */

        // Temporary demo data
        setRecommendations([
          "Perform integration testing.",
          "Update authentication module.",
          "Modify login APIs.",
          "Validate user credentials.",
          "Review Requirement Stability Index.",
          "Update Software Requirement Specification (SRS).",
          "Notify QA team.",
          "Review Requirement Dependency Graph."
        ]);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    }

    loadRecommendations();

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h1>AI Recommendations</h1>

      <hr />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <div
          style={{
            background: "#1976D2",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px"
          }}
        >
          <h3>Risk Score</h3>
          <h2>{summary.risk_score}%</h2>
        </div>

        <div
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px"
          }}
        >
          <h3>Estimated Effort</h3>
          <h2>{summary.estimated_effort}</h2>
        </div>

        <div
          style={{
            background: summary.conflict_detected ? "#F44336" : "#4CAF50",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px"
          }}
        >
          <h3>Conflict Status</h3>
          <h2>
            {summary.conflict_detected ? "Detected" : "None"}
          </h2>
        </div>

      </div>

      <h2>Recommended Actions</h2>

      {
        loading ? (

          <p>Loading recommendations...</p>

        ) : (

          <ul>

            {recommendations.map((item, index) => (

              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  fontSize: "16px"
                }}
              >
                {item}
              </li>

            ))}

          </ul>

        )
      }

    </div>

  );

}

export default Recommendation;