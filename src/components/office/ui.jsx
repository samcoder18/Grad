import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PaperPlaneRight } from "@phosphor-icons/react";

// Document/deal statuses shared by Department and Contracts.
export const DOC_STATUS = {
  draft: { label: "Черновик", tone: "neutral" },
  pending: { label: "На подписании", tone: "amber" },
  signed: { label: "Подписан", tone: "green" },
};

const tones = {
  neutral: "border-line bg-paper text-ink-soft",
  brand: "border-brand/20 bg-brand/10 text-brand",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
};

export function Avatar({ name, className = "" }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-ink font-display font-semibold text-white ${className}`}
    >
      {initials}
    </div>
  );
}

export function Card({ className = "", children }) {
  return (
    <div className={`rounded-[28px] border border-line bg-white ${className}`}>
      {children}
    </div>
  );
}

export function StatusPill({ tone = "neutral", children }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone] ?? tones.neutral}`}
    >
      {children}
    </span>
  );
}

export function PageTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
    </div>
  );
}

// Mock chat: suggestion click appends a "me" message and schedules an
// auto-reply. Parent resets state by remounting with a different `key`.
export function ChatWidget({ initialMessages = [], suggestions = [], replies = {}, fallbackReply }) {
  const [messages, setMessages] = useState(initialMessages);
  const [used, setUsed] = useState([]);
  const timer = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const send = (text) => {
    setMessages((m) => [...m, { from: "me", text }]);
    setUsed((u) => [...u, text]);
    const answer = replies[text] ?? fallbackReply;
    if (answer) {
      timer.current = window.setTimeout(() => {
        setMessages((m) => [...m, { from: "them", text: answer }]);
      }, 900);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div role="log" aria-live="polite" className="min-h-0 flex-1 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              msg.from === "me" ? "ml-auto bg-brand text-white" : "bg-paper text-ink"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions
            .filter((s) => !used.includes(s))
            .map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <PaperPlaneRight size={14} weight="bold" aria-hidden="true" />
                {s}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
