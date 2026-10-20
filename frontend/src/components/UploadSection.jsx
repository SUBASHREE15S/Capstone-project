import { useState, useRef } from "react";

function UploadSection({ onAnalyze, onAnalyzeText }) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pipelineStep, setPipelineStep] = useState(0);
    const [rawText, setRawText] = useState("");
    const [isTextInput, setIsTextInput] = useState(false);
    
    const inputRef = useRef(null);

    const steps = [
        isTextInput ? "Reading Pasted Text Content" : "Reading PDF File",
        "Extracting Functional Requirements",
        "Building Dependency Graph",
        "Running AI Change Prediction Models",
        "Generating Intelligence Report"
    ];

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile) => {
        setFile(selectedFile);
    };

    const startAnalysis = () => {
        if (!file) return;

        setIsTextInput(false);
        setUploading(true);
        setProgress(0);
        setPipelineStep(0);

        // Simulate progress bar increase
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    startPipelineSteps();
                    return 100;
                }
                return prev + 10;
            });
        }, 150);
    };

    const startPipelineSteps = () => {
        let currentStep = 0;
        const stepInterval = setInterval(() => {
            currentStep += 1;
            setPipelineStep(currentStep);

            if (currentStep >= steps.length) {
                clearInterval(stepInterval);
                // Call actual parent analysis handler
                const formData = new FormData();
                formData.append("file", file);
                onAnalyze(formData).finally(() => {
                    setUploading(false);
                    setFile(null);
                });
            }
        }, 800);
    };

    const handleTextAnalysis = () => {
        if (!rawText.trim()) return;

        setIsTextInput(true);
        setUploading(true);
        setProgress(0);
        setPipelineStep(0);

        // Progress bar simulation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    startTextPipelineSteps();
                    return 100;
                }
                return prev + 20;
            });
        }, 100);
    };

    const startTextPipelineSteps = () => {
        let currentStep = 0;
        const stepInterval = setInterval(() => {
            currentStep += 1;
            setPipelineStep(currentStep);

            if (currentStep >= steps.length) {
                clearInterval(stepInterval);
                onAnalyzeText(rawText).finally(() => {
                    setUploading(false);
                    setRawText("");
                });
            }
        }, 500);
    };

    return (
        <div id="upload" style={{ marginBottom: "30px" }}>
            
            {!uploading && (
                <div
                    className={`upload-drag-area ${dragActive ? "active" : ""}`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.txt"
                    />
                    
                    <div className="upload-icon">📤</div>
                    
                    {file ? (
                        <div>
                            <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>Selected: {file.name}</p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                                Click "Start Analysis" below to process
                            </p>
                        </div>
                    ) : (
                        <div>
                            <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>Drag & Drop PDF Here</p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>or click to browse local files</p>
                        </div>
                    )}
                </div>
            )}

            {file && !uploading && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <button className="upload-btn" onClick={startAnalysis}>
                        ⚡ Start AI Analysis
                    </button>
                </div>
            )}

            {!uploading && (
                <>
                    <div style={{ display: "flex", alignItems: "center", margin: "30px 0" }}>
                        <hr style={{ flex: 1, borderColor: "var(--border-color)", opacity: 0.3 }} />
                        <span style={{ padding: "0 15px", color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: "600" }}>
                            OR PASTE SRS TEXT DIRECTLY
                        </span>
                        <hr style={{ flex: 1, borderColor: "var(--border-color)", opacity: 0.3 }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <textarea
                            rows={8}
                            placeholder="Type or paste your requirements here...&#10;e.g.&#10;REQ-001: Password shall contain 8 characters.&#10;REQ-002: Password shall contain 16 characters.&#10;REQ-003: OTP is mandatory.&#10;REQ-004: OTP is not required."
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "14px",
                                borderRadius: "8px",
                                border: "1px solid var(--border-color)",
                                background: "var(--bg-secondary)",
                                color: "var(--text-main)",
                                fontFamily: "monospace",
                                fontSize: "0.9rem",
                                resize: "vertical",
                                outline: "none",
                                transition: "border-color 0.2s"
                            }}
                        />
                        <button
                            className="upload-btn"
                            disabled={!rawText.trim()}
                            onClick={handleTextAnalysis}
                            style={{ alignSelf: "center", marginTop: "10px" }}
                        >
                            ⚡ Analyze Text Input
                        </button>
                    </div>
                </>
            )}

            {uploading && (
                <div className="pipeline-loader">
                    <h3>AI Engineering Pipeline Running</h3>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Processing...</span>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{progress}%</span>
                    </div>

                    {progress === 100 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                            {steps.map((stepMsg, i) => (
                                <div
                                    key={i}
                                    className={`pipeline-step ${
                                        pipelineStep === i ? "active" : pipelineStep > i ? "completed" : ""
                                    }`}
                                >
                                    <span className="step-icon">
                                        {pipelineStep > i ? "✓" : pipelineStep === i ? "⏳" : "○"}
                                    </span>
                                    {stepMsg}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UploadSection;
