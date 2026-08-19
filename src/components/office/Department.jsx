import { useState } from "react";
import { CheckCircle, Circle } from "@phosphor-icons/react";
import { departments } from "../../data/office.js";
import { Avatar, Card, PageTitle, StatusPill, DOC_STATUS } from "./ui.jsx";

function Funnel({ stages }) {
  const max = Math.max(...stages.map((s) => s.value), 1);
  return (
    <div className="space-y-3">
      {stages.map((s) => (
        <div key={s.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-ink">{s.label}</span>
            <span className="font-semibold text-ink-soft">{s.value}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-paper">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${Math.max(8, (s.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Payments({ rows }) {
  return (
    <ul className="divide-y divide-line">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-ink">{r.label}</div>
            <div className="text-xs text-ink-soft">{r.date}</div>
          </div>
          <span
            className={`whitespace-nowrap text-sm font-semibold ${
              r.incoming ? "text-emerald-600" : "text-ink"
            }`}
          >
            {r.amount}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Documents({ docs }) {
  return (
    <ul className="divide-y divide-line">
      {docs.map((d) => (
        <li key={d.name} className="flex items-center justify-between gap-3 py-3">
          <span className="min-w-0 truncate text-sm font-medium text-ink">{d.name}</span>
          <StatusPill tone={DOC_STATUS[d.status].tone}>
            {DOC_STATUS[d.status].label}
          </StatusPill>
        </li>
      ))}
    </ul>
  );
}

const widgets = { funnel: Funnel, payments: Payments, documents: Documents };

export default function Department({ departmentId }) {
  const dept = departments[departmentId];
  const Widget = widgets[dept.widget.type];
  // Tasks are mount-scoped: the shell remounts this module on switch (key={activeId}).
  const [doneTasks, setDoneTasks] = useState(() => new Set(dept.tasks.flatMap((t, i) => (t.done ? [i] : []))));

  const toggleTask = (i) => {
    setDoneTasks((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div>
      <PageTitle title={dept.name} subtitle={dept.description} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {dept.kpis.map((kpi) => (
          <Card key={kpi.label} className="p-5">
            <div className="font-display text-2xl font-bold text-brand">{kpi.value}</div>
            <div className="mt-1 text-xs font-medium text-ink-soft">{kpi.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-display text-sm font-semibold text-ink">Команда</h3>
          <ul className="space-y-3">
            {dept.staff.map((person) => (
              <li key={person.name} className="flex items-center gap-3">
                <Avatar name={person.name} className="h-10 w-10 text-xs" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-ink">{person.name}</div>
                  <div className="text-xs text-ink-soft">{person.role}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-display text-sm font-semibold text-ink">Задачи недели</h3>
          <ul className="space-y-1">
            {dept.tasks.map((task, i) => {
              const done = doneTasks.has(i);
              return (
                <li key={task.title}>
                  <button
                    type="button"
                    onClick={() => toggleTask(i)}
                    aria-pressed={done}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-paper"
                  >
                    {done ? (
                      <CheckCircle size={20} weight="fill" aria-hidden="true" className="shrink-0 text-brand" />
                    ) : (
                      <Circle size={20} aria-hidden="true" className="shrink-0 text-ink-soft" />
                    )}
                    <span
                      className={`text-sm ${
                        done
                          ? "text-ink-soft line-through"
                          : "font-medium text-ink"
                      }`}
                    >
                      {task.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card className="mt-4 p-5">
        <h3 className="mb-4 font-display text-sm font-semibold text-ink">
          {dept.widget.title}
        </h3>
        <Widget {...dept.widget} />
      </Card>
    </div>
  );
}
