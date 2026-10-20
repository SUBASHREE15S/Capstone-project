import { useEffect, useState } from "react";

function SplashScreen({ onFinish }) {
    const [step, setStep] = useState(0);

    const steps = [
        "AI Requirement Intelligence System",
        "Loading AI Engine...",
        "Loading NLP Model...",
        "Loading Dependency Graph...",
        "Launching Dashboard..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => {
                if (prev >= steps.length - 1) {
                    clearInterval(interval);
                    setTimeout(onFinish, 600);
                    return prev;
                }
                return prev + 1;
            });
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#f8fafc",
            fontFamily: "'Outfit', sans-serif"
        }}>
            <div style={{
                textAlign: "center",
                maxWidth: "500px",
                padding: "20px"
            }}>
                <h1 style={{
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    marginBottom: "30px",
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    {steps[0]}
                </h1>
                
                <div style={{
                    minHeight: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px"
                }}>
                    {steps.slice(1, step + 1).map((msg, i) => (
                        <div key={i} style={{
                            fontSize: "1.05rem",
                            color: i === step - 1 ? "#60a5fa" : "#94a3b8",
                            fontWeight: i === step - 1 ? "600" : "400",
                            transition: "all 0.3s",
                            animation: "fadeIn 0.3s ease forwards"
                        }}>
                            {i === step - 1 ? "⚡ " : "✓ "} {msg}
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: "40px",
                    width: "200px",
                    height: "4px",
                    background: "#334155",
                    borderRadius: "2px",
                    overflow: "hidden",
                    margin: "40px auto 0 auto"
                }}>
                    <div style={{
                        width: `${(step / (steps.length - 1)) * 100}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                        transition: "width 0.4s ease"
                    }} />
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;
