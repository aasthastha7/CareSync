import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { STAFF } from "../data/staff";
import { useAppContext } from "../context/AppContext";
import ThreeDButton from "../components/ui/ThreeDButton";

const STARTER_MESSAGES = [
  {
    id: "starter-1",
    sender: "caregiver" as const,
    text: "Eleanor is reporting slight dizziness after taking her BP meds. Vitals are stable.",
    time: "10:32 AM",
  },
  {
    id: "starter-2",
    sender: "colleague" as const,
    text: "Noted. Dr. Smith is on call. Have her sit upright and re-check her BP in 15 minutes.",
    time: "10:34 AM",
  },
];

const QUICK_REPLIES = ["Will re-check in 15m", "Request RN Call"];

export default function ChatScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { chatMessages, sendChatMessage } = useAppContext();

  const colleague = STAFF.find((s) => s.id === id);
  const extraMessages = chatMessages[id ?? ""] ?? [];

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [extraMessages.length]);

  if (!colleague) {
    return (
      <div className="mx-auto max-w-md px-4 py-8">
        <p className="text-gray-500">Colleague not found.</p>
        <button onClick={() => navigate("/alerts")} className="mt-4 text-sm text-blue-600 hover:underline">← Back</button>
      </div>
    );
  }

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || !id) return;
    sendChatMessage(id, trimmed);
    setInput("");
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-5rem)] max-w-md flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={() => navigate(`/staff/${id}`)} className="text-gray-500 hover:text-gray-700" aria-label="Back">←</button>
        <div className="flex-1">
          <h1 className="text-base font-semibold text-gray-800">{colleague.name}</h1>
          <p className="text-xs text-gray-500">{colleague.role}</p>
        </div>
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">🔒 HIPAA Secure Connection</span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        {/* Today divider */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-xs font-medium text-gray-400">Today</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {/* Starter messages */}
        {STARTER_MESSAGES.map((msg) => (
          <Bubble key={msg.id} sender={msg.sender} text={msg.text} time={msg.time} />
        ))}

        {/* Context messages */}
        {extraMessages.map((msg) => (
          <Bubble key={msg.id} sender={msg.sender} text={msg.text} time={msg.time} />
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="flex gap-2 border-t border-gray-200 bg-white px-4 py-2">
        {QUICK_REPLIES.map((qr) => (
          <button
            key={qr}
            onClick={() => handleSend(qr)}
            className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="flex gap-2 border-t border-gray-200 bg-white px-4 py-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(input); }}
          placeholder="Type a message…"
          className="flex-1 rounded-full border px-4 py-2 text-sm"
        />
        <ThreeDButton
          label="Send"
          onClick={() => handleSend(input)}
        />
      </div>
    </div>
  );
}

function Bubble({ sender, text, time }: { sender: "caregiver" | "colleague"; text: string; time: string }) {
  const isCaregiver = sender === "caregiver";
  return (
    <div className={`mb-3 flex ${isCaregiver ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${isCaregiver ? "bg-blue-600 text-white" : "bg-white text-gray-800 shadow"}`}>
        <p className="text-sm">{text}</p>
        <p className={`mt-1 text-right text-xs ${isCaregiver ? "text-blue-200" : "text-gray-400"}`}>{time}</p>
      </div>
    </div>
  );
}