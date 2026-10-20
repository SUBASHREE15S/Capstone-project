import { useState } from "react";

function ForgotPassword({ onBack }) {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setMessage("Password reset instructions sent to your email!");
        }, 1000);
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
                    <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "8px" }}>Forgot Password</h2>
                    <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Enter your email to receive recovery instructions.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {message && (
                        <div style={{
                            background: "rgba(16, 185, 129, 0.15)",
                            border: "1px solid #10b981",
                            padding: "10px",
                            borderRadius: "8px",
                            color: "#a7f3d0",
                            fontSize: "0.85rem",
                            textAlign: "center"
                        }}>
                            {message}
                        </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
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
                        {loading ? "Sending..." : "Reset Password"}
                    </button>

                    <span onClick={onBack} style={{ textAlign: "center", color: "#60a5fa", cursor: "pointer", fontSize: "0.9rem" }}>
                        Back to Login
                    </span>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
