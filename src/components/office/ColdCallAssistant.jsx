import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowClockwise,
  Lightbulb,
  PhoneCall,
  Trophy,
} from "@phosphor-icons/react";
import { coldCallScript } from "../../data/office.js";
import { Card, PageTitle, StatusPill } from "./ui.jsx";

const qualityMeta = {
  best: { label: "Лучший ответ", tone: "green" },
  ok: { label: "Можно лучше", tone: "amber" },
  bad: { label: "Ошибка", tone: "brand" },
};

export default function ColdCallAssistant() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null); // option index at current step
  const [log, setLog] = useState([]); // chosen qualities
  const reduce = useReducedMotion();

  const done = step >= coldCallScript.length;
  const current = coldCallScript[step];
  const bestCount = log.filter((q) => q === "best").length;

  const choose = (i) => {
    if (picked !== null) return;
    setPicked(i);
  };

  const next = () => {
    setLog((l) => [...l, current.options[picked].quality]);
    setStep((s) => s + 1);
    setPicked(null);
  };

  const reset = () => {
    setStep(0);
    setPicked(null);
    setLog([]);
  };

  const verdict =
    bestCount === coldCallScript.length
      ? "Идеальный звонок — клиент готов к пилоту."
      : bestCount >= 2
        ? "Хороший звонок — пара реплик и сделка была бы в кармане."
        : "Есть что подтянуть — пройдите сценарий ещё раз.";

  return (
    <div>
      <PageTitle
        title="Ассистент холодных переговоров"
        subtitle="Тренажёр: отработайте звонок — ассистент разберёт каждый ответ"
      />

      <Card className="mx-auto max-w-2xl p-6">
        {!done ? (
          <>
            <div className="mb-5 flex items-center justify-between">
              <StatusPill tone="brand">
                <span className="inline-flex items-center gap-1.5">
                  <PhoneCall size={14} weight="bold" aria-hidden="true" />
                  Шаг {step + 1} из {coldCallScript.length}
                </span>
              </StatusPill>
              <div className="flex gap-1">
                {coldCallScript.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-6 rounded-full ${
                      i < step ? "bg-brand" : i === step ? "bg-brand/40" : "bg-line"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-paper px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                Клиент
              </div>
              <p className="mt-1 text-sm font-medium text-ink">{current.client}</p>
            </div>

            <div className="mt-4 space-y-2">
              {current.options.map((option, i) => {
                const isPicked = picked === i;
                const revealed = picked !== null;
                const meta = qualityMeta[option.quality];
                return (
                  <button
                    key={option.text}
                    type="button"
                    onClick={() => choose(i)}
                    disabled={revealed}
                    className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      isPicked
                        ? "border-brand bg-brand/5 font-medium text-ink"
                        : revealed
                          ? "border-line bg-white text-ink-soft opacity-60"
                          : "border-line bg-white text-ink hover:border-brand"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>{option.text}</span>
                      {isPicked && (
                        <StatusPill tone={meta.tone}>{meta.label}</StatusPill>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                aria-live="polite"
                className="mt-4 rounded-2xl border border-line bg-paper px-4 py-3"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand">
                  <Lightbulb size={14} weight="bold" aria-hidden="true" />
                  Разбор ассистента
                </div>
                <p className="mt-1 text-sm text-ink">
                  {current.options[picked].feedback}
                </p>
                <button
                  type="button"
                  onClick={next}
                  className="mt-3 rounded-full bg-brand px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-deep"
                >
                  {step + 1 === coldCallScript.length ? "К итогам" : "Дальше"}
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Trophy size={30} weight="fill" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-ink">
              Звонок завершён
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Лучших ответов: {bestCount} из {coldCallScript.length}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm font-medium text-ink">
              {verdict}
            </p>
            <div className="mt-4 flex justify-center gap-1.5">
              {log.map((q, i) => (
                <StatusPill key={i} tone={qualityMeta[q].tone}>
                  Шаг {i + 1}
                </StatusPill>
              ))}
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <ArrowClockwise size={18} weight="bold" aria-hidden="true" />
              Пройти ещё раз
            </button>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
