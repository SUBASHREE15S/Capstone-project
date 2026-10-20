import { useState } from "react";

function Login({ onLogin, onForgotPassword }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Mock auth check
            if (username === "admin" && password === "admin") {
                onLogin(username);
            } else {
                setError("Invalid username or password (hint: admin/admin).");
            }
        }, 800);
    };

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Outfit', sans-serif"
        }}>
            <div style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(16px)",
                webkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "40px",
                width: "100%",
                maxWidth: "420px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                color: "#f8fafc",
                animation: "fadeIn 0.5s ease"
            }}>
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h2 style={{
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "6px"
                    }}>
                        AI Requirement Intelligence System
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Powered by Adaptive AI</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {error && (
                        <div style={{
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "1px solid #ef4444",
                            padding: "10px",
                            borderRadius: "8px",
                            color: "#fca5a5",
                            fontSize: "0.85rem",
                            textAlign: "center"
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{ fontSize: "0.85rem", color: "#cbd5e1", fontWeight: "500" }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter admin"
                            style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                padding: "12px",
                                color: "#fff",
                                outline: "none",
                                fontSize: "0.95rem"
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", position: "relative" }}>
                        <label style={{ fontSize: "0.85rem", color: "#cbd5e1", fontWeight: "500" }}>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin"
                            style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                padding: "12px 40px 12px 12px",
                                color: "#fff",
                                outline: "none",
                                fontSize: "0.95rem"
                            }}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "12px",
                                bottom: "12px",
                                cursor: "pointer",
                                fontSize: "1.1rem",
                                userSelect: "none"
                            }}
                        >
                            {showPassword ? "👁️" : "🙈"}
                        </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ accentColor: "#3b82f6" }}
                            />
                            Remember Me
                        </label>
                        <span onClick={onForgotPassword} style={{ color: "#60a5fa", cursor: "pointer" }}>Forgot Password?</span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            color: "#fff",
                            border: "none",
                            padding: "12px",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
