import { useState } from "react";

function AIAssistant({ requirements = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! I am your AI Requirements Assistant. Ask me anything about your project!" }
    ]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
        setInput("");

        // Simulate bot reply
        setTimeout(() => {
            let reply = "";
            const lower = userMsg.toLowerCase();

            if (lower.includes("rsi") || lower.includes("stability")) {
                reply = "Dynamic RSI (Requirement Stability Index) measures the likelihood of requirements remaining stable over time. Higher value indicates more stability, whereas a low value implies high volatility or risk.";
            } else if (lower.includes("conflict")) {
                reply = "Conflict severity tells us how much a newly proposed requirement directly contradicts or impacts other existing requirements. We calculate it by checking conflicting semantic scopes.";
            } else if (lower.includes("req-") || lower.includes("r-") || lower.includes("r1") || lower.includes("r2")) {
                const matchedId = userMsg.match(/(REQ-\d+|REQ\d+|R-\d+|R\d+)/i);
                if (matchedId) {
                    const idStr = matchedId[0].toUpperCase();
                    const reqObj = requirements.find(r => r.requirement_id.toUpperCase() === idStr);
                    if (reqObj) {
                        reply = `Requirement ${idStr} is: "${reqObj.description}" under Module "${reqObj.module}". It has a Priority classification of "${reqObj.priority}".`;
                    } else {
                        reply = `I couldn't find a requirement with ID "${idStr}" in the current database. Make sure you have uploaded the SRS document successfully.`;
                    }
                } else {
                    reply = "Which requirement would you like me to explain? Please specify its ID (e.g., REQ-001).";
                }
            } else {
                reply = "I'm here to help you analyze requirement dependencies, stability index parameters, conflict severities, and explain requirement IDs. Try asking: 'What is Dynamic RSI?' or 'Explain REQ-001'.";
            }

            setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
        }, 600);
    };

    return (
        <>
            <div className="ai-chat-bubble" onClick={() => setIsOpen(!isOpen)}>
                🤖
            </div>

            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <span>🤖 AI Assistant Chat</span>
                        <button style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.2rem" }} onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`ai-message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="ai-chat-input-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask me anything..."
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AIAssistant;
