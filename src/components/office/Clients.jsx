import { useState } from "react";
import { VideoCamera } from "@phosphor-icons/react";
import { tickets } from "../../data/office.js";
import { Card, PageTitle, StatusPill, ChatWidget } from "./ui.jsx";

export default function Clients() {
  const [activeId, setActiveId] = useState(tickets[0].id);
  const [joined, setJoined] = useState(false);
  const ticket = tickets.find((t) => t.id === activeId);

  return (
    <div>
      <PageTitle
        title="Клиенты"
        subtitle="Удалённое взаимодействие: обращения из всех каналов и видеовстречи"
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {tickets.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              aria-current={t.id === activeId ? "true" : undefined}
              className={`w-full rounded-[20px] border p-4 text-left transition-colors ${
                t.id === activeId
                  ? "border-brand bg-brand/5"
                  : "border-line bg-white hover:border-ink/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 text-sm font-semibold text-ink">{t.client}</span>
                <StatusPill tone="neutral">{t.channel}</StatusPill>
              </div>
              <div className="mt-1 text-xs text-ink-soft">{t.topic}</div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="flex h-[420px] flex-col p-5 lg:h-[480px]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-sm font-semibold text-ink">
                {ticket.topic}
              </h3>
              <StatusPill tone="brand">{ticket.channel}</StatusPill>
            </div>
            <div className="min-h-0 flex-1">
              <ChatWidget
                key={ticket.id}
                initialMessages={ticket.messages}
                suggestions={ticket.suggestions}
                replies={ticket.replies}
                fallbackReply={ticket.fallback}
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
                  <VideoCamera size={22} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">
                    Видеовстреча с клиентом
                  </div>
                  <div className="text-xs text-ink-soft">
                    Комната: sg-meet.ru/{ticket.id}-demo
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setJoined((v) => !v)}
                aria-pressed={joined}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  joined
                    ? "border border-line bg-white text-ink hover:border-brand hover:text-brand"
                    : "bg-brand text-white hover:bg-brand-deep"
                }`}
              >
                {joined ? "Покинуть (демо)" : "Присоединиться"}
              </button>
            </div>
            {joined && (
              <div className="mt-4 flex aspect-video items-center justify-center rounded-2xl bg-ink text-sm font-medium text-white/70">
                Демо-режим: видеопоток не подключён
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
