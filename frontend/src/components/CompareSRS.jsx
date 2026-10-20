import React, { useState } from "react";
import { uploadDocument, compareSRS } from "../services/api";

function CompareSRS() {
    const [oldFile, setOldFile] = useState(null);
    const [newFile, setNewFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleOldFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setOldFile(e.target.files[0]);
        }
    };

    const handleNewFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewFile(e.target.files[0]);
        }
    };

    const handleCompare = async () => {
        if (!oldFile || !newFile) {
            setError("Please select both Old SRS and New SRS documents.");
            return;
        }

        try {
            setUploading(true);
            setError("");
            setResult(null);

            // Upload Old File
            const oldFormData = new FormData();
            oldFormData.append("file", oldFile);
            const oldUpload = await uploadDocument(oldFormData);

            // Upload New File
            const newFormData = new FormData();
            newFormData.append("file", newFile);
            const newUpload = await uploadDocument(newFormData);

            // Perform Comparison
            const comparison = await compareSRS(oldUpload.filename, newUpload.filename);
            setResult(comparison);
        } catch (err) {
            setError("Comparison failed. Make sure both files are valid PDF, Word or Text documents.");
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const getDiffColor = (val) => {
        if (val > 0) return "#4CAF50"; // Green for improvement/increase
        if (val < 0) return "#E53935"; // Red for decline/decrease
        return "var(--text-muted)";
    };

    return (
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0px 2px 12px rgba(0,0,0,0.1)" }}>
            <h2>⚖️ AI SRS Version & Change Comparison</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "25px" }}>
                Upload an older version of your Software Requirements Specification (SRS) alongside a newer revision to track differences, evolutionary trends, health modifications, and dependency changes.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }}>
                {/* Old File Upload */}
                <div style={{ border: "2px dashed var(--border-color)", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                    <h3 style={{ marginBottom: "10px", color: "var(--text-muted)" }}>📁 File 1: Old SRS Revision</h3>
                    <input 
                        type="file" 
                        onChange={handleOldFileChange} 
                        accept=".pdf,.docx,.txt"
                        style={{ display: "block", margin: "15px auto" }}
                    />
                    {oldFile && <p style={{ fontWeight: "600", color: "var(--color-primary)" }}>✓ {oldFile.name}</p>}
                </div>

                {/* New File Upload */}
                <div style={{ border: "2px dashed var(--border-color)", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                    <h3 style={{ marginBottom: "10px", color: "var(--text-muted)" }}>📁 File 2: New SRS Revision</h3>
                    <input 
                        type="file" 
                        onChange={handleNewFileChange} 
                        accept=".pdf,.docx,.txt"
                        style={{ display: "block", margin: "15px auto" }}
                    />
                    {newFile && <p style={{ fontWeight: "600", color: "var(--color-primary)" }}>✓ {newFile.name}</p>}
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <button 
                    className="upload-btn" 
                    onClick={handleCompare}
                    disabled={uploading || !oldFile || !newFile}
                    style={{ padding: "12px 30px", fontSize: "1rem" }}
                >
                    {uploading ? "Analyzing & Comparing..." : "⚡ Run AI SRS Comparison"}
                </button>
                {error && <p style={{ color: "#E53935", fontWeight: "bold", marginTop: "10px" }}>{error}</p>}
            </div>

            {/* Results Display */}
            {result && (
                <div style={{ marginTop: "40px" }} className="fade-in">
                    <h3 style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "10px", marginBottom: "25px" }}>📊 Comparison Analysis Report</h3>

                    {/* Metric Differences */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "35px" }}>
                        {/* Health Difference */}
                        <div style={{ padding: "20px", background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
                            <h4>🩺 Overall Health Difference</h4>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "10px" }}>
                                <span style={{ fontSize: "2rem", fontWeight: "800", color: getDiffColor(result.health_difference) }}>
                                    {result.health_difference > 0 ? "+" : ""}{result.health_difference}%
                                </span>
                                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                    ({result.old_health}% ➔ {result.new_health}%)
                                </span>
                            </div>
                        </div>

                        {/* Prediction Difference */}
                        <div style={{ padding: "20px", background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
                            <h4>📈 Future Prediction Trend Difference</h4>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "10px" }}>
                                <span style={{ fontSize: "2rem", fontWeight: "800", color: getDiffColor(result.prediction_difference) }}>
                                    {result.prediction_difference > 0 ? "+" : ""}{result.prediction_difference}%
                                </span>
                                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                    ({result.old_prediction}% ➔ {result.new_prediction}%)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Added Requirements */}
                    <div style={{ marginBottom: "30px" }}>
                        <h4 style={{ color: "#4CAF50", marginBottom: "10px" }}>🟢 Added Requirements ({result.added_requirements.length})</h4>
                        {result.added_requirements.length === 0 ? (
                            <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No requirements were added.</p>
                        ) : (
                            <table className="requirements-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: "20%" }}>Requirement ID</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.added_requirements.map(r => (
                                        <tr key={r.requirement_id}>
                                            <td style={{ fontWeight: "bold" }}>{r.requirement_id}</td>
                                            <td>{r.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Removed Requirements */}
                    <div style={{ marginBottom: "30px" }}>
                        <h4 style={{ color: "#E53935", marginBottom: "10px" }}>🔴 Removed Requirements ({result.removed_requirements.length})</h4>
                        {result.removed_requirements.length === 0 ? (
                            <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No requirements were removed.</p>
                        ) : (
                            <table className="requirements-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: "20%" }}>Requirement ID</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.removed_requirements.map(r => (
                                        <tr key={r.requirement_id}>
                                            <td style={{ fontWeight: "bold" }}>{r.requirement_id}</td>
                                            <td>{r.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Modified Requirements */}
                    <div style={{ marginBottom: "30px" }}>
                        <h4 style={{ color: "#FB8C00", marginBottom: "10px" }}>🟠 Modified Requirements ({result.modified_requirements.length})</h4>
                        {result.modified_requirements.length === 0 ? (
                            <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No requirements were modified.</p>
                        ) : (
                            <table className="requirements-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: "15%" }}>Requirement ID</th>
                                        <th style={{ width: "42.5%" }}>Old Description</th>
                                        <th style={{ width: "42.5%" }}>New Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.modified_requirements.map(r => (
                                        <tr key={r.requirement_id}>
                                            <td style={{ fontWeight: "bold" }}>{r.requirement_id}</td>
                                            <td style={{ color: "var(--text-muted)", textDecoration: "line-through" }}>{r.old_description}</td>
                                            <td style={{ color: "var(--text-main)", fontWeight: "500" }}>{r.new_description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* New Dependencies */}
                    <div style={{ marginBottom: "30px" }}>
                        <h4 style={{ color: "var(--color-primary)", marginBottom: "10px" }}>🔗 New Dependencies Detected ({result.new_dependencies.length})</h4>
                        {result.new_dependencies.length === 0 ? (
                            <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No new dependencies were added.</p>
                        ) : (
                            <table className="requirements-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th>Source Requirement</th>
                                        <th style={{ width: "15%" }}>Relationship</th>
                                        <th>Target Requirement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.new_dependencies.map((d, idx) => (
                                        <tr key={idx}>
                                            <td style={{ fontWeight: "bold" }}>{d.source}</td>
                                            <td style={{ color: "var(--color-primary)", fontWeight: "600" }}>➔ Depends On ➔</td>
                                            <td style={{ fontWeight: "bold" }}>{d.target}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompareSRS;
