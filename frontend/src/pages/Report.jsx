// Placeholder for React component/service
import React, { useEffect, useState } from "react";

function Report() {

  const [requirements, setRequirements] = useState([]);

  useEffect(() => {

    const data = localStorage.getItem("requirements");

    if (data) {
      setRequirements(JSON.parse(data));
    }

  }, []);

  const totalRequirements = requirements.length;

  const totalHighPriority = requirements.filter(
    (r) => r.priority === "High"
  ).length;

  const totalMediumPriority = requirements.filter(
    (r) => r.priority === "Medium"
  ).length;

  const totalLowPriority = requirements.filter(
    (r) => r.priority === "Low"
  ).length;

  const averageRSI =
    requirements.length > 0
      ? (
          requirements.reduce(
            (sum, req) =>
              sum + (req.stability_score || 80),
            0
          ) / requirements.length
        ).toFixed(2)
      : 0;

  const handlePrint = () => {
    window.print();
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Requirement Analysis Report</h1>

      <hr />

      <h2>Project Summary</h2>

      <table
        border="1"
        cellPadding="10"
        width="60%"
      >

        <tbody>

          <tr>

            <td>Total Requirements</td>

            <td>{totalRequirements}</td>

          </tr>

          <tr>

            <td>High Priority</td>

            <td>{totalHighPriority}</td>

          </tr>

          <tr>

            <td>Medium Priority</td>

            <td>{totalMediumPriority}</td>

          </tr>

          <tr>

            <td>Low Priority</td>

            <td>{totalLowPriority}</td>

          </tr>

          <tr>

            <td>Average Stability Index</td>

            <td>{averageRSI}</td>

          </tr>

          <tr>

            <td>Conflict Status</td>

            <td>No Critical Conflicts</td>

          </tr>

          <tr>

            <td>Overall Risk</td>

            <td>Medium</td>

          </tr>

        </tbody>

      </table>

      <br />

      <h2>Requirement Details</h2>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >

        <thead>

          <tr>

            <th>ID</th>

            <th>Description</th>

            <th>Module</th>

            <th>Priority</th>

            <th>Stability Index</th>

          </tr>

        </thead>

        <tbody>

          {requirements.map((req) => (

            <tr key={req.requirement_id}>

              <td>{req.requirement_id}</td>

              <td>{req.description}</td>

              <td>{req.module}</td>

              <td>{req.priority}</td>

              <td>{req.stability_score || 80}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <br />

      <button
        onClick={handlePrint}
      >
        Print Report
      </button>

    </div>

  );
}

export default Report;