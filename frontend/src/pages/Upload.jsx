// Placeholder for React component/service
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import { uploadSRS, analyzeSRS } from "../services/api";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an SRS document.");
      return;
    }

    try {
      setLoading(true);

      // Upload file
      const uploadResponse = await uploadSRS(selectedFile);

      const filename = uploadResponse.data.filename;

      // Analyze uploaded file
      const analysisResponse = await analyzeSRS(filename);

      setRequirements(analysisResponse.data.requirements);

      setMessage("Requirement extraction completed successfully.");

      // Save data for Dashboard
      localStorage.setItem(
        "requirements",
        JSON.stringify(analysisResponse.data.requirements)
      );

      // Navigate after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error(error);

      setMessage("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h2>Upload Software Requirement Specification</h2>

      <UploadBox onFileSelect={handleFileSelect} />

      <br />

      <button
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>

      <br />
      <br />

      <p>{message}</p>

      {requirements.length > 0 && (

        <div>

          <h3>Extracted Requirements</h3>

          <table border="1" cellPadding="10">

            <thead>

              <tr>

                <th>ID</th>

                <th>Description</th>

                <th>Module</th>

                <th>Priority</th>

              </tr>

            </thead>

            <tbody>

              {requirements.map((req) => (

                <tr key={req.requirement_id}>

                  <td>{req.requirement_id}</td>

                  <td>{req.description}</td>

                  <td>{req.module}</td>

                  <td>{req.priority}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default Upload;