import { useState, useRef, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const BRAND = {
  navy:      "#1e3a6e",
  navyLight: "#254a8a",
  blue:      "#37a4fc",
  blueLight: "#e8f4ff",
  blueMid:   "#2b7fd4",
  white:     "#ffffff",
  gray50:    "#f7f9fc",
  gray100:   "#eef1f6",
  gray200:   "#dde3ed",
  gray400:   "#9aaabe",
  gray600:   "#5a6a82",
  gray800:   "#1e2d42",
};

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Welcome to the University of Dunaújváros virtual assistant. I'm here to help you with information about admissions, programmes, campus life, and scholarships. How can I assist you today?",
};

const SUGGESTED_QUESTIONS = [
  "What are the admission requirements?",
  "What programmes are available?",
  "How do I apply for a scholarship?",
  "Where is the campus located?",
  "What are the tuition fees for international students?",
  "Is student accommodation available on campus?",
  "What language are courses taught in?",
  "How do I contact the international office?",
  "What student clubs and organisations exist?",
  "Are there internship or industry placement opportunities?",
  "What is the application deadline?",
  "Does the university offer online or hybrid courses?",
];

function UnidunaShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V6L12 2z" fill="white" opacity="0.95"/>
      <path d="M9 12l2 2 4-4" stroke={BRAND.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 5v3M8.5 7l2 2M15.5 7l-2 2" stroke={BRAND.navy} strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M14 8L2 2l3 6-3 6 12-6z" fill="currentColor"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M5 4V2.5A.5.5 0 015.5 2h5a.5.5 0 01.5.5V4M6 7v5M10 7v5M3 4l1 9.5A.5.5 0 004.5 14h7a.5.5 0 00.5-.5L13 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 21h6M12 3a6 6 0 016 6c0 2.22-1.2 4.15-3 5.19V17a1 1 0 01-1 1H10a1 1 0 01-1-1v-2.81A6 6 0 0112 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BotAvatar() {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: "50%",
      background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.navyLight} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      boxShadow: `0 2px 8px rgba(30,58,110,0.25)`,
    }}>
      <UnidunaShield />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, padding: "2px 0 10px" }}>
      <BotAvatar />
      <div style={{
        display: "flex", gap: 5, padding: "12px 16px",
        background: BRAND.white,
        border: `1px solid ${BRAND.gray200}`,
        borderRadius: 18, borderBottomLeftRadius: 4,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: "50%",
            background: BRAND.blue,
            animation: "uniduna-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
            opacity: 0.7,
          }} />
        ))}
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      flexDirection: isUser ? "row-reverse" : "row",
      alignItems: "flex-end",
      gap: 10,
      marginBottom: 14,
    }}>
      {!isUser && <BotAvatar />}
      <div style={{
        maxWidth: "76%",
        display: "flex", flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
      }}>
        <div style={{
          padding: "11px 15px",
          borderRadius: 18,
          borderBottomRightRadius: isUser ? 4 : 18,
          borderBottomLeftRadius: isUser ? 18 : 4,
          background: isUser
            ? `linear-gradient(135deg, ${BRAND.blue} 0%, ${BRAND.blueMid} 100%)`
            : BRAND.white,
          border: isUser ? "none" : `1px solid ${BRAND.gray200}`,
          color: isUser ? BRAND.white : BRAND.gray800,
          fontSize: 13.5,
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
          boxShadow: isUser
            ? `0 2px 12px rgba(55,164,252,0.3)`
            : "0 1px 4px rgba(0,0,0,0.06)",
          letterSpacing: "0.01em",
        }}>
          {msg.content}
        </div>

        {msg.citations && msg.citations.length > 0 && (
          <div style={{ marginTop: 7, display: "flex", flexWrap: "wrap", gap: 5 }}>
            {msg.citations.map((c, i) => (
              <span key={i} style={{
                fontSize: 11,
                padding: "3px 9px",
                borderRadius: 20,
                background: BRAND.blueLight,
                color: BRAND.blueMid,
                border: `1px solid rgba(55,164,252,0.25)`,
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}>
                {c.split("/").pop()}
              </span>
            ))}
          </div>
        )}

        {msg.error && (
          <div style={{ marginTop: 4, fontSize: 11.5, color: "#c0392b", opacity: 0.85 }}>
            {msg.error}
          </div>
        )}
      </div>
    </div>
  );
}

export default function UniversityChatbot() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestionsPanel(false);
      }
    }
    if (showSuggestionsPanel) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSuggestionsPanel]);

  function clearChat() {
    setMessages([WELCOME_MESSAGE]);
    setShowSuggestionsPanel(false);
    setShowClearConfirm(false);
    setInput("");
    inputRef.current?.focus();
  }

  async function sendMessage(question) {
    const text = (question || input).trim();
    if (!text || loading) return;

    setInput("");
    setShowSuggestionsPanel(false);
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.answer,
        citations: data.citations || [],
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm sorry, I was unable to retrieve a response at this time. Please try again or contact the university directly at international@uniduna.hu.",
        error: err.message,
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; width: 100%; }
        body { overflow: hidden; }

        @keyframes uniduna-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.7; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes uniduna-fadein {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes uniduna-slideup {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .uniduna-input:focus {
          outline: none;
          border-color: ${BRAND.blue} !important;
          box-shadow: 0 0 0 3px rgba(55,164,252,0.15) !important;
        }
        .uniduna-send:hover:not(:disabled) {
          background: ${BRAND.blueMid} !important;
          box-shadow: 0 3px 14px rgba(55,164,252,0.45) !important;
          transform: translateY(-1px);
        }
        .uniduna-send:disabled { opacity: 0.35; cursor: not-allowed; }
        .uniduna-send { transition: all 0.15s ease; }

        .uniduna-clear:hover { background: rgba(255,255,255,0.18) !important; }
        .uniduna-clear { transition: background 0.15s ease; }

        .uniduna-suggestion:hover {
          border-color: ${BRAND.blue} !important;
          background: ${BRAND.blueLight} !important;
          color: ${BRAND.navy} !important;
        }
        .uniduna-suggestion { transition: all 0.15s ease; cursor: pointer; }

        .uniduna-messages::-webkit-scrollbar { width: 5px; }
        .uniduna-messages::-webkit-scrollbar-track { background: transparent; }
        .uniduna-messages::-webkit-scrollbar-thumb { background: ${BRAND.gray200}; border-radius: 10px; }

        .uniduna-msg-row { animation: uniduna-fadein 0.2s ease; }

        .uniduna-confirm-btn:hover { opacity: 0.85; }
        .uniduna-confirm-btn { transition: opacity 0.15s; }

        /* Responsive suggestion grid */
        .suggestion-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
        }
        @media (max-width: 480px) {
          .suggestion-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{
        display: "flex", flexDirection: "column",
        height: "100dvh", width: "100%",
        background: `linear-gradient(160deg, #0f2144 0%, #1e3a6e 60%, #1a4f8a 100%)`,
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}>

        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.navyLight} 100%)`,
          padding: "0 clamp(16px, 4vw, 32px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          minHeight: "clamp(60px, 9vh, 80px)",
          position: "relative", overflow: "hidden",
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ position: "absolute", right: -40, top: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(55,164,252,0.1)" }} />
          <div style={{ position: "absolute", right: 60, top: 25, width: 70, height: 70, borderRadius: "50%", background: "rgba(55,164,252,0.07)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 14, zIndex: 1 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <UnidunaShield />
            </div>
            <div>
              <div style={{ fontSize: "clamp(13px, 2vw, 15px)", fontWeight: 700, color: BRAND.white, letterSpacing: "0.02em", lineHeight: 1.2 }}>
                University of Dunaújváros
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: "0.07em", textTransform: "uppercase", marginTop: 2, fontWeight: 500 }}>
                Virtual Assistant
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 1 }}>
            {/* Online badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20, padding: "5px 12px",
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
              <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>Online</span>
            </div>

            {/* Clear button */}
            {!showClearConfirm ? (
              <button
                className="uniduna-clear"
                onClick={() => setShowClearConfirm(true)}
                title="Clear conversation"
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.75)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <TrashIcon />
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.7)" }}>Clear chat?</span>
                <button
                  className="uniduna-confirm-btn"
                  onClick={clearChat}
                  style={{
                    padding: "4px 10px", borderRadius: 8, border: "none",
                    background: "#e74c3c", color: BRAND.white,
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Yes
                </button>
                <button
                  className="uniduna-confirm-btn"
                  onClick={() => setShowClearConfirm(false)}
                  style={{
                    padding: "4px 10px", borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.25)",
                    background: "transparent", color: "rgba(255,255,255,0.8)",
                    fontSize: 12, fontWeight: 500, cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="uniduna-messages" style={{
          flex: 1, overflowY: "auto",
          padding: "clamp(16px, 3vw, 28px) clamp(12px, 5vw, 40px) 12px",
          display: "flex", flexDirection: "column",
        }}>
          {messages.map((msg, i) => (
            <div key={i} className="uniduna-msg-row">
              <Message msg={msg} />
            </div>
          ))}
          {loading && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div style={{ position: "relative", flexShrink: 0 }} ref={suggestionsRef}>

          {/* Suggestions panel — pops up above input */}
          {showSuggestionsPanel && (
            <div style={{
              position: "absolute", bottom: "100%", left: 0, right: 0,
              background: BRAND.white,
              borderTop: `1px solid ${BRAND.gray200}`,
              borderBottom: `1px solid ${BRAND.gray200}`,
              padding: "14px clamp(12px, 5vw, 40px)",
              maxHeight: "40vh", overflowY: "auto",
              boxShadow: "0 -6px 24px rgba(0,0,0,0.08)",
              animation: "uniduna-slideup 0.18s ease",
            }}>
              <div style={{
                fontSize: 10.5, color: BRAND.gray400, marginBottom: 10,
                textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600,
              }}>
                Suggested questions
              </div>
              <div className="suggestion-grid">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    className="uniduna-suggestion"
                    onClick={() => sendMessage(q)}
                    style={{
                      textAlign: "left", fontSize: 12.5,
                      padding: "9px 13px", borderRadius: 10,
                      border: `1px solid ${BRAND.gray200}`,
                      background: BRAND.gray50,
                      color: BRAND.gray600,
                      fontFamily: "inherit",
                      lineHeight: 1.4,
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{
            background: BRAND.white,
            borderTop: `1px solid ${BRAND.gray200}`,
            padding: "clamp(10px, 2vh, 16px) clamp(12px, 5vw, 40px)",
            display: "flex", gap: 10, alignItems: "flex-end",
          }}>
            {/* Lightbulb toggle */}
            <button
              onClick={() => setShowSuggestionsPanel(p => !p)}
              title="Suggested questions"
              style={{
                width: 42, height: 42, borderRadius: 12, border: "none",
                background: showSuggestionsPanel ? BRAND.blueLight : BRAND.gray100,
                color: showSuggestionsPanel ? BRAND.blue : BRAND.gray400,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
                transition: "all 0.15s",
                boxShadow: showSuggestionsPanel ? `0 0 0 2px rgba(55,164,252,0.3)` : "none",
              }}
            >
              <LightbulbIcon />
            </button>

            <textarea
              ref={inputRef}
              className="uniduna-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your question here..."
              rows={1}
              style={{
                flex: 1, resize: "none",
                border: `1.5px solid ${BRAND.gray200}`,
                borderRadius: 12, padding: "10px 14px",
                fontSize: 13.5, lineHeight: 1.5,
                background: BRAND.gray50,
                color: BRAND.gray800,
                fontFamily: "inherit",
                maxHeight: 120, overflowY: "auto",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
            />
            <button
              className="uniduna-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              style={{
                width: 42, height: 42, borderRadius: 12,
                border: "none",
                background: input.trim()
                  ? `linear-gradient(135deg, ${BRAND.blue} 0%, ${BRAND.blueMid} 100%)`
                  : BRAND.gray100,
                color: input.trim() ? BRAND.white : BRAND.gray400,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
                boxShadow: input.trim() ? `0 2px 8px rgba(55,164,252,0.3)` : "none",
              }}
            >
              <SendIcon />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "7px 20px 10px",
          background: BRAND.white,
          display: "flex", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 11, color: BRAND.gray400 }}>
            Powered by{" "}
            <a href="https://www.uniduna.hu/en/" target="_blank" rel="noreferrer"
              style={{ color: BRAND.blue, textDecoration: "none", fontWeight: 500 }}>
              UNIDUNA
            </a>
            {" "}· AI responses may not always be accurate
          </span>
        </div>
      </div>
    </>
  );
}
