import React from "react";

function Sidebar({ activePage, onChangePage, onLogout }) {
    return (
        <div className="sidebar">
            <h3>Navigation</h3>
            <ul>
                <li 
                    className={activePage === "upload" ? "active" : ""} 
                    onClick={() => onChangePage("upload")}
                >
                    📂 Upload SRS
                </li>
                <li 
                    className={activePage === "dashboard" ? "active" : ""} 
                    onClick={() => onChangePage("dashboard")}
                >
                    🏠 Dashboard
                </li>
                <li 
                    className={activePage === "requirements" ? "active" : ""} 
                    onClick={() => onChangePage("requirements")}
                >
                    📋 Requirements
                </li>
                <li 
                    className={activePage === "analytics" ? "active" : ""} 
                    onClick={() => onChangePage("analytics")}
                >
                    🧠 AI Analytics
                </li>
                <li 
                    className={activePage === "graph" ? "active" : ""} 
                    onClick={() => onChangePage("graph")}
                >
                    🔗 Dependency Graph
                </li>
                <li 
                    className={activePage === "reports" ? "active" : ""} 
                    onClick={() => onChangePage("reports")}
                >
                    📄 Reports
                </li>
                <li 
                    className={activePage === "history" ? "active" : ""} 
                    onClick={() => onChangePage("history")}
                >
                    📜 History
                </li>
                <li 
                    className={activePage === "compare" ? "active" : ""} 
                    onClick={() => onChangePage("compare")}
                >
                    ⚖️ Compare SRS
                </li>
                <li onClick={onLogout} style={{ color: "#ef4444", marginTop: "20px" }}>
                    🚪 Logout
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;