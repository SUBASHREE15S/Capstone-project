// Placeholder for React component/service
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function StabilityChart({ requirements }) {

  const chartData = requirements.map((req) => ({
    requirement: req.requirement_id,
    stability:
      req.stability_score !== undefined
        ? req.stability_score
        : Math.floor(Math.random() * 30) + 70
  }));

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "20px"
      }}
    >
      <h2>Requirement Stability Index (RSI)</h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="requirement" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Bar
            dataKey="stability"
            fill="#4CAF50"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StabilityChart;