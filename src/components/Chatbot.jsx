
import React, { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    const botMessage = { role: "assistant", content: data.response };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: "10px 15px", borderRadius: "50%", background: "#ffc107", border: "none", cursor: "pointer" }}
      >
        💬
      </button>

      {isOpen && (
        <div style={{ width: 300, height: 400, background: "white", border: "1px solid #ccc", borderRadius: 10, padding: 10, marginTop: 10, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto", marginBottom: 10 }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ margin: "5px 0", textAlign: msg.role === "user" ? "right" : "left" }}>
                <span style={{ background: msg.role === "user" ? "#e0f7fa" : "#f1f8e9", padding: "5px 10px", borderRadius: 5 }}>{msg.content}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: 5 }}
              placeholder="Scrivi un messaggio..."
            />
            <button onClick={handleSend} style={{ padding: "0 10px" }}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}
