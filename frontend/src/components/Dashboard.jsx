import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import UploadSection from "./UploadSection";
import MetricCard from "./MetricCard";

import DependencyGraph from "./DependencyGraph";
import EvolutionChart from "./EvolutionChart";
import StabilityGauge from "./StabilityGauge";
import ConflictPropagation from "./ConflictPropagation";
import Explainability from "./Explainability";
import Recommendation from "./Recommendation";
import RequirementsTable from "./RequirementsTable";
import AIAssistant from "./AIAssistant";
import RequirementDNA from "./RequirementDNA";
import InfluenceGraph from "./InfluenceGraph";
import InfluenceCard from "./InfluenceCard";
import HealthCard from "./HealthCard";
import HealthExplanation from "./HealthExplanation";
import RequirementIntelligence from "./RequirementIntelligence";
import RippleCard from "./RippleCard";
import RippleChart from "./RippleChart";
import RippleTable from "./RippleTable";
import History from "./History";
import CompareSRS from "./CompareSRS";

import { uploadDocument, analyzeRequirement, downloadReport, analyzeText, saveAnalysis } from "../services/api";

function Dashboard({ currentUser = "Software Engineer", onLogout, theme, onToggleTheme }) {
    const [activePage, setActivePage] = useState("upload"); // Default to upload page as requested

    const [analysis, setAnalysis] = useState({});
    const [graphNodes, setGraphNodes] = useState([]);
    const [graphEdges, setGraphEdges] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [conflicts, setConflicts] = useState([]);
    const [explanation, setExplanation] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [requirementDNA, setRequirementDNA] = useState([]);
    const [selectedDNA, setSelectedDNA] = useState(null);
    const [requirementInfluence, setRequirementInfluence] = useState([]);
    const [ripple, setRipple] = useState([]);
    const [rippleSummary, setRippleSummary] = useState({});
    const [rippleScore, setRippleScore] = useState(0);
    const [health, setHealth] = useState(null);
    const [healthExplanation, setHealthExplanation] = useState([]);
    const [requirementIntelligence, setRequirementIntelligence] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [saveStatus, setSaveStatus] = useState("");

    // Animated count state for KPIs
    const [rsiVal, setRsiVal] = useState(0);
    const [confidenceVal, setConfidenceVal] = useState(0);
    const [driftVal, setDriftVal] = useState(0);
    const [severityVal, setSeverityVal] = useState(0);

    const getRiskColor = (risk) => {
        switch (risk?.toLowerCase()) {
            case "critical": return "#ef4444";
            case "high": return "#f97316";
            case "medium": return "#3b82f6";
            case "low": return "#10b981";
            default: return "#94a3b8";
        }
    };

    // Calculate dynamic module distribution data for Pie Chart
    const moduleCounts = {};
    (analysis.requirements || []).forEach((req) => {
        moduleCounts[req.module] = (moduleCounts[req.module] || 0) + 1;
    });

    const pieData = Object.keys(moduleCounts).map((key) => ({
        name: key,
        value: moduleCounts[key]
    }));

    const COLORS = ["#3b82f6", "#f43f5e", "#10b981", "#f97316", "#a855f7", "#64748b"];

    // Dynamic Radar Data mapping
    const radarData = [
        { subject: "Consistency", value: Math.round((analysis.semantic_consistency || 0) * 100) },
        { subject: "Confidence", value: Math.round((analysis.dependency_confidence || 0) * 100) },
        { subject: "Drift", value: Math.round((analysis.historical_drift || 0) * 100) },
        { subject: "Severity", value: Math.round((analysis.conflict_severity || 0) * 100) },
        { subject: "Stability", value: Math.round((analysis.dynamic_rsi || 0) * 100) }
    ];

    async function handleAnalyze(formData) {
        try {
            // Upload
            const uploadResult = await uploadDocument(formData);
            const filename = uploadResult.filename;

            // Analyze
            const result = await analyzeRequirement(filename);

            setAnalysis(result);
            setGraphNodes(result.graph?.nodes || []);
            setGraphEdges(result.graph?.edges || []);
            setChartData(result.evolution || []);
            setConflicts(result.conflicts || []);
            setExplanation(result.explanation || []);
            setRecommendations(result.recommendations || []);
            setRequirementDNA(result.requirement_dna || []);
            setSelectedDNA(result.requirement_dna?.[0] || null);
            setRequirementInfluence(result.requirement_influence || []);
            setRipple(result.ripple || []);
            setRippleSummary(result.ripple_summary || {});
            setRippleScore(result.ripple_score || 0);
            setHealth(result.health || null);
            setHealthExplanation(result.health_explanation || []);
            setRequirementIntelligence(result.requirement_intelligence || []);
            setProjectName(filename ? filename.split(".")[0] : "Project Analysis");

            // Count Up Animations simulation
            let count = 0;
            const interval = setInterval(() => {
                count += 0.05;
                if (count >= 1.0) {
                    setRsiVal(result.dynamic_rsi || 0);
                    setConfidenceVal(result.dependency_confidence || 0);
                    setDriftVal(result.historical_drift || 0);
                    setSeverityVal(result.conflict_severity || 0);
                    clearInterval(interval);
                } else {
                    setRsiVal(parseFloat((count * (result.dynamic_rsi || 0)).toFixed(2)));
                    setConfidenceVal(parseFloat((count * (result.dependency_confidence || 0)).toFixed(2)));
                    setDriftVal(parseFloat((count * (result.historical_drift || 0)).toFixed(2)));
                    setSeverityVal(parseFloat((count * (result.conflict_severity || 0)).toFixed(2)));
                }
            }, 30);
        } catch (error) {
            console.error("Failed to upload or analyze document:", error);
        }
    }

    async function handleAnalyzeText(text) {
        try {
            const result = await analyzeText(text);

            setAnalysis(result);
            setGraphNodes(result.graph?.nodes || []);
            setGraphEdges(result.graph?.edges || []);
            setChartData(result.evolution || []);
            setConflicts(result.conflicts || []);
            setExplanation(result.explanation || []);
            setRecommendations(result.recommendations || []);
            setRequirementDNA(result.requirement_dna || []);
            setSelectedDNA(result.requirement_dna?.[0] || null);
            setRequirementInfluence(result.requirement_influence || []);
            setRipple(result.ripple || []);
            setRippleSummary(result.ripple_summary || {});
            setRippleScore(result.ripple_score || 0);
            setHealth(result.health || null);
            setHealthExplanation(result.health_explanation || []);
            setRequirementIntelligence(result.requirement_intelligence || []);
            setProjectName("Project Analysis");

            // Count Up Animations simulation
            let count = 0;
            const interval = setInterval(() => {
                count += 0.05;
                if (count >= 1.0) {
                    setRsiVal(result.dynamic_rsi || 0);
                    setConfidenceVal(result.dependency_confidence || 0);
                    setDriftVal(result.historical_drift || 0);
                    setSeverityVal(result.conflict_severity || 0);
                    clearInterval(interval);
                } else {
                    setRsiVal(parseFloat((count * (result.dynamic_rsi || 0)).toFixed(2)));
                    setConfidenceVal(parseFloat((count * (result.dependency_confidence || 0)).toFixed(2)));
                    setDriftVal(parseFloat((count * (result.historical_drift || 0)).toFixed(2)));
                    setSeverityVal(parseFloat((count * (result.conflict_severity || 0)).toFixed(2)));
                }
            }, 30);
        } catch (error) {
            console.error("Failed to analyze text:", error);
        }
    }

    const handleSaveAnalysis = async () => {
        try {
            setSaveStatus("Saving...");
            const response = await saveAnalysis({
                project_name: projectName,
                filename: analysis.filename || "Direct Input",
                health_percentage: health?.health_percentage || 0,
                risk_level: analysis.overall_risk || "Low",
                analysis_data: analysis
            });
            if (response.status === "success") {
                setSaveStatus("Saved successfully!");
                setTimeout(() => setSaveStatus(""), 3000);
            }
        } catch (error) {
            setSaveStatus("Failed to save.");
            console.error(error);
        }
    };

    const downloadCSV = () => {
        if (!analysis.requirements) return;
        const headers = ["Requirement ID", "Description", "Module", "Priority", "Actor"];
        const rows = analysis.requirements.map(r => [r.requirement_id, r.description, r.module, r.priority || "Low", r.actor || "User"]);
        
        let csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
            
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "requirements_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadJSON = () => {
        if (!analysis.requirements) return;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysis, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "requirements_report.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
    };

    return (
        <>
            <Navbar 
                currentUser={currentUser}
                onLogout={onLogout}
                theme={theme}
                onToggleTheme={onToggleTheme}
                onChangePage={setActivePage}
            />

            <div className="dashboard-layout">
                <Sidebar 
                    activePage={activePage} 
                    onChangePage={setActivePage} 
                    onLogout={onLogout} 
                />

                <div className="dashboard-content">
                    
                    {/* Render subpages based on activePage state */}

                    {activePage === "dashboard" && (
                        <div>
                            {/* Welcome Card */}
                            <div className="welcome-card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "15px" }}>
                                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                                    <div className="welcome-info">
                                        <h2>Welcome, {currentUser}</h2>
                                        <p>Requirement impact modeling and AI dependency mapping engine.</p>
                                    </div>
                                    <div className="welcome-meta">
                                        <div className="welcome-meta-item">
                                            <span>Today</span>
                                            <strong>{new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}</strong>
                                        </div>
                                        {analysis.analysis_version && (
                                            <div className="welcome-meta-item">
                                                <span>AI Confidence</span>
                                                <strong>{Math.round((analysis.ai_confidence || 0.77) * 100)}%</strong>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {analysis.requirements && (
                                    <div style={{ display: "flex", gap: "10px", width: "100%", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "15px" }}>
                                        <input 
                                            type="text" 
                                            placeholder="Enter Project Name to Save..." 
                                            className="search-input"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            style={{ maxWidth: "250px" }}
                                        />
                                        <button 
                                            className="btn-primary" 
                                            onClick={handleSaveAnalysis}
                                            disabled={!projectName.trim()}
                                            style={{ height: "40px", padding: "0 20px" }}
                                        >
                                            💾 Save to History
                                        </button>
                                        {saveStatus && <span style={{ color: "var(--color-success)", fontWeight: "600" }}>{saveStatus}</span>}
                                    </div>
                                )}
                            </div>

                            {analysis.analysis_version && (
                                <div style={{
                                    background: "var(--bg-secondary)",
                                    border: "1px solid var(--border-color)",
                                    borderRadius: "12px",
                                    padding: "16px 24px",
                                    marginBottom: "24px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <div>
                                        <span style={{ color: "var(--text-muted)", marginRight: "8px" }}>Analysis Version:</span>
                                        <span style={{ fontWeight: "bold", color: "var(--color-primary)" }}>{analysis.analysis_version}</span>
                                    </div>
                                    <div>
                                        <span style={{ color: "var(--text-muted)", marginRight: "8px" }}>Status:</span>
                                        <span style={{
                                            fontWeight: "bold",
                                            color: "var(--color-success)",
                                            background: "var(--glow-primary)",
                                            padding: "4px 10px",
                                            borderRadius: "16px",
                                            fontSize: "0.9em"
                                        }}>
                                            {analysis.analysis_status}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <h3 id="overview">AI Requirement DNA Pipeline Metrics</h3>
                            
                            {/* Row 1 */}
                            <div className="metric-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px" }}>
                                <MetricCard
                                    title="Dynamic RSI"
                                    value={analysis.dynamic_rsi !== undefined ? `${Math.round(rsiVal * 100)}%` : "--"}
                                    color="#10b981"
                                    icon="📈"
                                    progress={rsiVal * 100}
                                />
                                <MetricCard
                                    title="Dependency Confidence"
                                    value={analysis.dependency_confidence !== undefined ? `${Math.round(confidenceVal * 100)}%` : "--"}
                                    color="#3b82f6"
                                    icon="🔗"
                                    progress={confidenceVal * 100}
                                />
                                <MetricCard
                                    title="Historical Drift"
                                    value={analysis.historical_drift !== undefined ? `${Math.round(driftVal * 100)}%` : "--"}
                                    color="#8b5cf6"
                                    icon="🕰️"
                                    progress={driftVal * 100}
                                />
                                <MetricCard
                                    title="Conflict Severity"
                                    value={analysis.conflict_severity !== undefined ? `${Math.round(severityVal * 100)}%` : "--"}
                                    color="#ef4444"
                                    icon="⚠️"
                                    progress={severityVal * 100}
                                />
                                <MetricCard
                                    title="Semantic Consistency"
                                    value={analysis.semantic_consistency !== undefined ? `${Math.round(analysis.semantic_consistency * 100)}%` : "--"}
                                    color="#06b6d4"
                                    icon="📝"
                                    progress={analysis.semantic_consistency * 100}
                                />
                                <MetricCard
                                    title="Future Prediction"
                                    value={analysis.future_probability !== undefined ? `${Math.round(analysis.future_probability * 100)}%` : "--"}
                                    color="#f97316"
                                    icon="🔮"
                                    progress={analysis.future_probability * 100}
                                />
                            </div>

                            {/* Row 2 */}
                            <div className="metric-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px", marginTop: "24px" }}>
                                <MetricCard
                                    title="Requirement Health"
                                    value={health?.health_percentage !== undefined ? `${Math.round(health.health_percentage)}%` : "92%"}
                                    color="#10b981"
                                    icon="🩺"
                                    progress={health?.health_percentage !== undefined ? health.health_percentage : 92}
                                />
                                <MetricCard
                                    title="DNA Stability"
                                    value={analysis.volatility !== undefined ? `${Math.round(100 - (analysis.volatility * 100))}%` : "89%"}
                                    color="#3b82f6"
                                    icon="🧬"
                                    progress={analysis.volatility !== undefined ? (100 - (analysis.volatility * 100)) : 89}
                                />
                                <MetricCard
                                    title="Mutation Rate"
                                    value={analysis.historical_drift !== undefined ? `${Math.round(analysis.historical_drift * 100)}%` : "12%"}
                                    color="#f59e0b"
                                    icon="⚡"
                                    progress={analysis.historical_drift !== undefined ? (analysis.historical_drift * 100) : 12}
                                />
                                <MetricCard
                                    title="Influence Score"
                                    value={requirementInfluence && requirementInfluence.length > 0 ? `${Math.round(requirementInfluence[0].influence)}%` : "87%"}
                                    color="#8b5cf6"
                                    icon="📈"
                                    progress={requirementInfluence && requirementInfluence.length > 0 ? requirementInfluence[0].influence : 87}
                                />
                                <MetricCard
                                    title="Ripple Index"
                                    value={rippleScore !== undefined ? `${Math.round(rippleScore * 100)}%` : "34%"}
                                    color="#ef4444"
                                    icon="🌊"
                                    progress={rippleScore !== undefined ? (rippleScore * 100) : 34}
                                />
                                <MetricCard
                                    title="Evolution Confidence"
                                    value={analysis.future_probability !== undefined ? `${Math.round((1.0 - analysis.future_probability) * 100)}%` : "91%"}
                                    color="#14b8a6"
                                    icon="💡"
                                    progress={analysis.future_probability !== undefined ? (1.0 - analysis.future_probability) * 100 : 91}
                                />
                            </div>

                            {pieData.length > 0 && (
                                <div className="charts-grid" style={{ marginTop: "24px" }}>
                                    <div className="chart-card">
                                        <h3>Module Distribution</h3>
                                        <div style={{ height: "300px" }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={pieData}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={90}
                                                        paddingAngle={4}
                                                        dataKey="value"
                                                    >
                                                        {pieData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-main)" }} />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="chart-card">
                                        <h3>AI Metric Radar Representation</h3>
                                        <div style={{ height: "300px" }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                                    <PolarGrid stroke="var(--border-color)" />
                                                    <PolarAngleAxis dataKey="subject" stroke="var(--text-muted)" />
                                                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--border-color)" />
                                                    <Radar name="Metrics" dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} />
                                                    <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-main)" }} />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activePage === "upload" && (
                        <div>
                            <h2>Upload SRS Document</h2>
                            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                                Drag and drop your software requirements specification (SRS) in PDF, Word, or TXT format to parse it.
                            </p>
                            <UploadSection onAnalyze={handleAnalyze} onAnalyzeText={handleAnalyzeText} />
                        </div>
                    )}

                    {activePage === "requirements" && (
                        <div>
                            <h2>Requirements Matrix & AI DNA</h2>
                            <div className="requirements-professional-layout" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "30px", alignItems: "start", marginTop: "20px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <RequirementsTable 
                                        requirements={analysis.requirements || []} 
                                        requirementDNA={requirementDNA} 
                                        requirementInfluence={requirementInfluence}
                                        setSelectedDNA={setSelectedDNA}
                                    />
                                </div>
                                <div>
                                    <HealthCard health={health} />
                                    <HealthExplanation explanation={healthExplanation} />
                                    <InfluenceCard influence={requirementInfluence} />
                                    <RequirementDNA dna={selectedDNA} />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginTop: "30px" }}>
                                <div>
                                    <InfluenceGraph influence={requirementInfluence} />
                                </div>
                                <div>
                                    <RippleCard rippleScore={rippleScore} />
                                    <RippleChart summary={rippleSummary} />
                                </div>
                            </div>
                            
                            <div style={{ marginTop: "30px" }}>
                                <RippleTable ripple={ripple} />
                            </div>

                            <div style={{ marginTop: "30px" }}>
                                <RequirementIntelligence intelligence={requirementIntelligence} />
                            </div>
                            
                            <div style={{ marginTop: "40px" }}>
                                <h2>AI Recommendations</h2>
                                <Recommendation recommendations={recommendations} />
                            </div>
                        </div>
                    )}

                    {activePage === "analytics" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <h2>🧬 Requirement DNA & Mutation Analytics</h2>
                            
                            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "30px" }}>
                                <div style={{ background: "white", padding: "20px", borderRadius: "16px", boxShadow: "var(--shadow-main)" }}>
                                    <h3>📈 Requirement DNA Timeline (Evolution)</h3>
                                    <EvolutionChart data={chartData} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <StabilityGauge value={health?.health_percentage !== undefined ? health.health_percentage / 100 : 0.92} />
                                    
                                    {/* DNA Fingerprint */}
                                    <div style={{ padding: "20px", background: "white", borderRadius: "16px", boxShadow: "var(--shadow-main)", display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>🧬 Requirement DNA Fingerprint</h4>
                                        <div style={{ padding: "12px", background: "var(--bg-secondary)", borderRadius: "8px", fontFamily: "monospace", fontSize: "0.85rem", lineHeight: "1.6" }}>
                                            <div><strong>DNA ID:</strong> DNA-{analysis.requirements_analyzed ? `73A9F1C${analysis.requirements_analyzed}` : "73A9F1C6"}</div>
                                            <div><strong>Status:</strong> <span style={{ color: "#4CAF50", fontWeight: "bold" }}>Stable</span></div>
                                            <div><strong>Domain:</strong> Enterprise Inventory</div>
                                            <div><strong>Critical Path:</strong> Authentication ➔ Gateway</div>
                                            <div><strong>Risk Index:</strong> <span style={{ color: "#4CAF50", fontWeight: "bold" }}>Low</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
                                <div style={{ background: "white", padding: "20px", borderRadius: "16px", boxShadow: "var(--shadow-main)" }}>
                                    <h3>💥 Mutation Graph (Conflict Propagation)</h3>
                                    <ConflictPropagation conflicts={conflicts} />
                                </div>
                                <div style={{ background: "white", padding: "20px", borderRadius: "16px", boxShadow: "var(--shadow-main)" }}>
                                    <h3>🌊 Ripple Simulation</h3>
                                    <RippleChart summary={rippleSummary} />
                                    <RippleTable ripple={ripple} />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "30px" }}>
                                <div style={{ background: "white", padding: "20px", borderRadius: "16px", boxShadow: "var(--shadow-main)" }}>
                                    <h3>📈 Influence Ranking</h3>
                                    <InfluenceGraph influence={requirementInfluence} />
                                </div>
                                <div style={{ background: "white", padding: "20px", borderRadius: "16px", boxShadow: "var(--shadow-main)" }}>
                                    <h3>📉 Requirement Health Trend</h3>
                                    <Explainability explanation={explanation} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === "graph" && (
                        <div>
                            <h2>Interactive Dependency Graph</h2>
                            <DependencyGraph nodes={graphNodes} edges={graphEdges} />
                        </div>
                    )}

                    {activePage === "reports" && (
                        <div>
                            <h2>AI Report Hub</h2>
                            {analysis.analysis_version ? (
                                <div className="report-preview-box" style={{ marginTop: "20px" }}>
                                    <h3>AI Pipeline Intelligence Reports</h3>
                                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                        Preview and download analytical requirement profiles in PDF, CSV or structured JSON format.
                                    </p>
                                    
                                    <div className="report-actions-grid">
                                        <button className="btn-primary" onClick={downloadReport}>
                                            📄 Download PDF Report
                                        </button>
                                        <button className="btn-secondary" onClick={downloadCSV}>
                                            📊 Download CSV Data
                                        </button>
                                        <button className="btn-secondary" onClick={downloadJSON}>
                                            ⚙️ Download JSON Profile
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ color: "var(--text-muted)", padding: "40px 0", textAlign: "center" }}>
                                    Please upload and analyze an SRS document to generate downloadable report options.
                                </div>
                            )}
                        </div>
                    )}

                    {activePage === "history" && (
                        <div>
                            <History onLoadAnalysis={(data) => {
                                setAnalysis(data);
                                setGraphNodes(data.graph?.nodes || []);
                                setGraphEdges(data.graph?.edges || []);
                                setChartData(data.evolution || []);
                                setConflicts(data.conflicts || []);
                                setExplanation(data.explanation || []);
                                setRecommendations(data.recommendations || []);
                                setRequirementDNA(data.requirement_dna || []);
                                setSelectedDNA(data.requirement_dna?.[0] || null);
                                setRequirementInfluence(data.requirement_influence || []);
                                setRipple(data.ripple || []);
                                setRippleSummary(data.ripple_summary || {});
                                setRippleScore(data.ripple_score || 0);
                                setHealth(data.health || null);
                                setHealthExplanation(data.health_explanation || []);
                                setRequirementIntelligence(data.requirement_intelligence || []);
                                setActivePage("dashboard"); // Go back to dashboard to preview loaded report
                            }} />
                        </div>
                    )}

                    {activePage === "compare" && (
                        <div>
                            <CompareSRS />
                        </div>
                    )}

                </div>
            </div>

            {/* Floating AI Assistant Chat panel */}
            <AIAssistant requirements={analysis.requirements || []} />
        </>
    );
}

export default Dashboard;
