import { useState } from "react";
import { deals } from "../../data/office.js";
import { Card, PageTitle, StatusPill, ChatWidget } from "./ui.jsx";

export default function Deals() {
  const [activeId, setActiveId] = useState(deals[0].id);
  const deal = deals.find((d) => d.id === activeId);

  return (
    <div>
      <PageTitle
        title="Сделки"
        subtitle="Переговоры с партнёрами и заказчиками в одном окне"
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {deals.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveId(d.id)}
              aria-current={d.id === activeId ? "true" : undefined}
              className={`w-full rounded-[20px] border p-4 text-left transition-colors ${
                d.id === activeId
                  ? "border-brand bg-brand/5"
                  : "border-line bg-white hover:border-ink/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 text-sm font-semibold text-ink">{d.company}</span>
                <StatusPill tone={d.kind === "Партнёр" ? "brand" : "neutral"}>
                  {d.kind}
                </StatusPill>
              </div>
              <div className="mt-1 text-xs text-ink-soft">{d.amount}</div>
              <div className="mt-1 text-xs font-medium text-ink">
                {d.stages[d.stage]}
              </div>
            </button>
          ))}
        </div>

        <Card className="flex h-[480px] flex-col p-5 lg:h-[560px]">
          <div className="mb-5 flex items-start gap-1.5">
            {deal.stages.map((s, i) => (
              <div key={s} className="flex flex-1 flex-col gap-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    i <= deal.stage ? "bg-brand" : "bg-line"
                  }`}
                />
                <span
                  className={`text-[10px] leading-tight ${
                    i <= deal.stage ? "font-medium text-ink" : "text-ink-soft"
                  }`}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>

          <div className="min-h-0 flex-1">
            <ChatWidget
              key={deal.id}
              initialMessages={deal.messages}
              suggestions={deal.suggestions}
              replies={deal.replies}
              fallbackReply={deal.fallback}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
