import React, { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulazione risposta (senza API)
    let responseText = "Il nutrizionista ti risponderà al più presto!";
    if (input.toLowerCase().includes("zucchero")) {
      responseText = "Ricorda che nella tua dieta il consumo di zucchero è limitato.";
    } else if (input.toLowerCase().includes("colazione")) {
      responseText = "Per colazione puoi mangiare yogurt con cereali integrali.";
    } else if (input.toLowerCase().includes("spuntino")) {
      responseText = "Per lo spuntino ti consiglio della frutta secca o fresca.";
    }

    const botMessage = { role: "assistant", content: responseText };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 50 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "10px 15px",
          borderRadius: "50%",
          background: "#ffc107",
          border: "none",
          cursor: "pointer"
        }}
      >
        💬
      </button>

      {isOpen && (
        <div style={{
          width: 300,
          height: 400,
          background: "white",
          border: "1px solid #ccc",
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ flex: 1, overflowY: "auto", marginBottom: 10 }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ margin: "5px 0", textAlign: msg.role === "user" ? "right" : "left" }}>
                <span style={{
                  background: msg.role === "user" ? "#e0f7fa" : "#f1f8e9",
                  padding: "5px 10px",
                  borderRadius: 5,
                  display: "inline-block"
                }}>
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: 5 }}
              placeholder="Scrivi un messaggio..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} style={{ padding: "0 10px" }}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}
