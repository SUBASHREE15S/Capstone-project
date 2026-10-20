import React from "react";
import "./ConflictPropagation.css";

function getBadge(priority) {
  switch (priority?.toLowerCase()) {
    case "immediate":
      return "badge critical";

    case "high":
      return "badge high";

    case "medium":
      return "badge medium";

    default:
      return "badge low";
  }
}

function getProgressColor(value) {
  if (value >= 80) return "#ef4444";
  if (value >= 60) return "#f59e0b";
  return "#22c55e";
}

function ConflictPropagation({ conflicts = [] }) {
  const safeConflicts = conflicts || [];
  return (
    <div className="conflict-container">

      <div className="section-title">

        Conflict Propagation Analysis

      </div>

      <table className="conflict-table">

        <thead>

          <tr>

            <th>Changed Requirement</th>

            <th>Affected Requirement</th>

            <th>Propagation</th>

            <th>Impact Score</th>

            <th>Priority</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {safeConflicts.length === 0 ? (

            <tr>

              <td colSpan="6" style={{ textAlign: "center" }}>
                No propagation detected
              </td>

            </tr>

          ) : (

            safeConflicts.map((item, index) => (

              <tr key={index}>

                <td>{item.source_requirement}</td>

                <td>{item.affected_requirement}</td>

                <td>

                  <div className="progress">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${item.probability}%`,
                        background: getProgressColor(item.probability),
                      }}
                    />

                  </div>

                  {item.probability}%

                </td>

                <td>{item.impact_score}</td>

                <td>

                  <span className={getBadge(item.priority)}>
                    {item.priority}
                  </span>

                </td>

                <td>

                  {item.probability >= 80 && (
                    <span className="status critical">
                      Critical
                    </span>
                  )}

                  {item.probability >= 60 &&
                    item.probability < 80 && (
                      <span className="status warning">
                        Warning
                      </span>
                    )}

                  {item.probability < 60 && (
                    <span className="status safe">
                      Safe
                    </span>
                  )}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ConflictPropagation;
