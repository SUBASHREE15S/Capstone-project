import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UploadSection from "../components/UploadSection";
import MetricCard from "../components/MetricCard";

import StabilityGauge from "../components/StabilityGauge";
import DependencyGraph from "../components/DependencyGraph";
import EvolutionChart from "../components/EvolutionChart";
import ConflictPropagation from "../components/ConflictPropagation";
import Explainability from "../components/Explainability";
import Recommendation from "../components/Recommendation";

import { analyzeRequirement } from "../services/api";

import "../styles/dashboard.css";

function Dashboard() {

    const [loading, setLoading] = useState(false);

    const [dashboard, setDashboard] = useState(null);

    const [error, setError] = useState("");

    async function handleAnalysis(filename) {

        try {

            setLoading(true);

            setError("");

            const result = await analyzeRequirement(filename);

            setDashboard(result);

        }

        catch (err) {

            console.log(err);

            setError("Unable to analyze the document.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="dashboard-layout">

            <Navbar />

            <Sidebar />

            <main className="dashboard-content">

                <h1>

                    AI Requirement Intelligence Dashboard

                </h1>

                <UploadSection

                    onAnalysis={handleAnalysis}

                />

                {

                    loading &&

                    <div className="loading">

                        Running AI Analysis...

                    </div>

                }

                {

                    error &&

                    <div className="error">

                        {error}

                    </div>

                }

                {
                    dashboard && (

                        <>

                            {/* ==============================
                                    AI SUMMARY
                            ============================== */}

                            <div className="summary-header">

                                <h2>AI Analysis Summary</h2>

                                <p>
                                    Analysis Version :
                                    <b> {dashboard.analysis_version}</b>
                                </p>

                                <p>
                                    Status :
                                    <b> {dashboard.analysis_status}</b>
                                </p>

                            </div>

                            {/* ==============================
                                    METRIC CARDS
                            ============================== */}

                            <div className="metric-grid">

                                <MetricCard
                                    title="Dynamic RSI"
                                    value={dashboard.dynamic_rsi}
                                />

                                <MetricCard
                                    title="Semantic Consistency"
                                    value={dashboard.semantic_consistency}
                                />

                                <MetricCard
                                    title="Dependency Confidence"
                                    value={dashboard.dependency_confidence}
                                />

                                <MetricCard
                                    title="Historical Drift"
                                    value={dashboard.historical_drift}
                                />

                                <MetricCard
                                    title="Future Prediction"
                                    value={dashboard.future_probability}
                                />

                                <MetricCard
                                    title="Conflict Severity"
                                    value={dashboard.conflict_severity}
                                />

                            </div>

                            {/* ==============================
                                  OVERVIEW
                            ============================== */}

                            <div className="overview-grid">

                                <div className="overview-card">

                                    <h3>Overall Risk</h3>

                                    <h2>

                                        {dashboard.overall_risk}

                                    </h2>

                                </div>

                                <div className="overview-card">

                                    <h3>AI Confidence</h3>

                                    <h2>

                                        {dashboard.ai_confidence}

                                    </h2>

                                </div>

                                <div className="overview-card">

                                    <h3>Requirements</h3>

                                    <h2>

                                        {dashboard.requirements_analyzed}

                                    </h2>

                                </div>

                                <div className="overview-card">

                                    <h3>Analysis Time</h3>

                                    <h2>

                                        {dashboard.analysis_time} sec

                    </h2>

                                </div>

                                <div className="overview-card">

                                    <h3>Graph Density</h3>

                                    <h2>

                                        {dashboard.graph_density}

                                    </h2>

                                </div>

                                <div className="overview-card">

                                    <h3>Total Dependencies</h3>

                                    <h2>

                                        {dashboard.total_edges}

                                    </h2>

                                </div>

                            </div>

                            {/* ==============================
                                  PART 3
                            ============================== */}

                        </>

                    )

                }

            </main>

        </div>

    );

}

export default Dashboard;