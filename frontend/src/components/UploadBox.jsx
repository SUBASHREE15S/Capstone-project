// Placeholder for React component/service
import React, { useState } from "react";

function UploadBox({ onFileSelect }) {
  const [fileName, setFileName] = useState("");

  const allowedExtensions = [".pdf", ".docx", ".txt"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const extension = "." + file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      alert("Please upload only PDF, DOCX, or TXT files.");
      event.target.value = "";
      setFileName("");
      return;
    }

    setFileName(file.name);

    // Send selected file to parent component
    onFileSelect(file);
  };

  return (
    <div
      style={{
        border: "2px dashed #007bff",
        borderRadius: "10px",
        padding: "30px",
        width: "500px",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h3>Select SRS Document</h3>

      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFileChange}
      />

      <br />
      <br />

      {fileName && (
        <div
          style={{
            color: "green",
            fontWeight: "bold",
          }}
        >
          Selected File:
          <br />
          {fileName}
        </div>
      )}
    </div>
  );
}

export default UploadBox;