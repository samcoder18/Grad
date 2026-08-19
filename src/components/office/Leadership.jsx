import { useState } from "react";
import { ChatCircle } from "@phosphor-icons/react";
import { leadership, departments } from "../../data/office.js";
import { Avatar, Card, PageTitle, ChatWidget } from "./ui.jsx";

const SUGGESTIONS = [
  "Расскажите о партнёрской программе",
  "Как стать поставщиком?",
];

export default function Leadership() {
  const [chatWith, setChatWith] = useState(null);

  const people =
    leadership.length +
    Object.values(departments).reduce((n, d) => n + d.staff.length, 0);
  const units = 1 + Object.keys(departments).length;

  return (
    <div>
      <PageTitle
        title="Руководство"
        subtitle="Команда, которая отвечает за стратегию и операционную работу"
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="font-display text-3xl font-bold text-brand">{units}</div>
          <div className="mt-1 text-xs font-medium text-ink-soft">подразделения</div>
        </Card>
        <Card className="p-5">
          <div className="font-display text-3xl font-bold text-brand">{people}</div>
          <div className="mt-1 text-xs font-medium text-ink-soft">сотрудников</div>
        </Card>
        <Card className="p-5 max-sm:col-span-2">
          <div className="font-display text-3xl font-bold text-brand">24/7</div>
          <div className="mt-1 text-xs font-medium text-ink-soft">офис онлайн</div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {leadership.map((person) => (
          <Card key={person.id} className="flex flex-col p-5">
            <Avatar name={person.name} className="h-14 w-14 text-lg" />
            <h3 className="mt-4 font-display text-base font-semibold text-ink">
              {person.name}
            </h3>
            <div className="mt-0.5 text-sm font-medium text-brand">{person.role}</div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
              {person.area}
            </p>
            <button
              type="button"
              onClick={() => setChatWith(chatWith === person.id ? null : person.id)}
              aria-expanded={chatWith === person.id}
              className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <ChatCircle size={16} weight="bold" aria-hidden="true" />
              {chatWith === person.id ? "Скрыть чат" : "Написать"}
            </button>
            {chatWith === person.id && (
              <div className="mt-4 border-t border-line pt-4">
                <ChatWidget
                  key={person.id}
                  initialMessages={[{ from: "them", text: person.greeting }]}
                  suggestions={SUGGESTIONS}
                  fallbackReply={person.fallback}
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
