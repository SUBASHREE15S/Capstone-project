import React from "react";

function Navbar({ currentUser = "Software Engineer", onLogout, theme, onToggleTheme, onChangePage }) {
    return (
        <nav className="navbar">
            <h2>AI Requirement Intelligence System</h2>
            
            <div className="navbar-actions">
                <button className="navbar-btn" onClick={() => onChangePage("upload")}>
                    📂 Upload SRS
                </button>
                <button className="navbar-btn" onClick={() => onChangePage("dashboard")}>
                    🏠 Dashboard
                </button>
                <button className="navbar-btn" onClick={() => onChangePage("analytics")}>
                    🧠 Analytics
                </button>
                <button className="navbar-btn" onClick={() => onChangePage("reports")}>
                    📄 Reports
                </button>

                <div 
                    className="theme-switch" 
                    onClick={onToggleTheme} 
                    title="Toggle Dark/Light Mode"
                >
                    {theme === "dark" ? "☀️" : "🌙"}
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    borderLeft: "1px solid var(--border-color)",
                    paddingLeft: "16px"
                }}>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                        User: <strong>{currentUser}</strong>
                    </span>
                    <button 
                        onClick={onLogout}
                        style={{
                            background: "rgba(239, 68, 68, 0.1)",
                            color: "#ef4444",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: "600"
                        }}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;