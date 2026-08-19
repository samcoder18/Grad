import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, Circle, FileText, PenNib } from "@phosphor-icons/react";
import { contracts, signSteps, MOCK_SIGNATURE_HASH } from "../../data/office.js";
import { Card, PageTitle, StatusPill, DOC_STATUS } from "./ui.jsx";

export default function Contracts() {
  const [activeId, setActiveId] = useState(contracts[0].id);
  const [signedIds, setSignedIds] = useState([]);
  // flow.step: -1 idle, 0..2 running step index, 3 = done.
  // contractId pins the flow to the contract it was started for.
  const [flow, setFlow] = useState({ step: -1, contractId: null });
  const reduce = useReducedMotion();

  const contract = contracts.find((c) => c.id === activeId);
  const isSigned = contract.status === "signed" || signedIds.includes(contract.id);

  // Reset the flow when switching contracts.
  useEffect(() => {
    setFlow({ step: -1, contractId: null });
  }, [activeId]);

  // Advance the signing flow on a timer.
  useEffect(() => {
    if (flow.step < 0 || flow.step >= signSteps.length) return;
    const t = window.setTimeout(
      () => setFlow((f) => ({ ...f, step: f.step + 1 })),
      1400,
    );
    return () => window.clearTimeout(t);
  }, [flow.step]);

  // Mark the contract signed when the flow completes.
  useEffect(() => {
    if (flow.step === signSteps.length && flow.contractId) {
      setSignedIds((ids) =>
        ids.includes(flow.contractId) ? ids : [...ids, flow.contractId],
      );
    }
  }, [flow.step, flow.contractId]);

  return (
    <div>
      <PageTitle
        title="Договоры по ЭЦП"
        subtitle="Подписание документов электронной подписью без бумаг и курьеров"
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {contracts.map((c) => {
            const cSigned = c.status === "signed" || signedIds.includes(c.id);
            const cStatus = cSigned ? "signed" : c.status;
            return (
              <button
                key={c.id}
                type="button"
                aria-current={c.id === activeId ? "true" : undefined}
                onClick={() => setActiveId(c.id)}
                className={`w-full rounded-[20px] border p-4 text-left transition-colors ${
                  c.id === activeId
                    ? "border-brand bg-brand/5"
                    : "border-line bg-white hover:border-ink/20"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">
                    Договор {c.number}
                  </span>
                  <StatusPill tone={DOC_STATUS[cStatus].tone}>
                    {DOC_STATUS[cStatus].label}
                  </StatusPill>
                </div>
                <div className="mt-1 text-xs text-ink-soft">{c.party}</div>
                <div className="mt-1 text-xs font-medium text-ink">{c.amount}</div>
              </button>
            );
          })}
        </div>

        <Card className="flex min-h-[480px] flex-col p-5">
          {/* PDF stub */}
          <div className="rounded-2xl border border-line bg-paper p-5">
            <div className="flex items-center gap-2 text-ink-soft">
              <FileText size={18} aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Договор {contract.number}
              </span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold text-ink">
              {contract.party}
            </h3>
            <p className="mt-1 text-sm text-ink-soft">{contract.subject}</p>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded bg-line/70" />
              <div className="h-2 w-11/12 rounded bg-line/70" />
              <div className="h-2 w-4/5 rounded bg-line/70" />
            </div>
            <div className="mt-4 text-sm font-semibold text-ink">
              Сумма: {contract.amount}
            </div>

            {isSigned && (
              <>
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 1.6, rotate: -18 }}
                  animate={{ opacity: 1, scale: 1, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="mt-4 inline-flex rounded-xl border-[3px] border-brand px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-brand"
                >
                  Подписан · ЭЦП
                </motion.div>
                <div className="mt-2 font-mono text-xs text-ink-soft">
                  Подпись: {MOCK_SIGNATURE_HASH}
                </div>
              </>
            )}
          </div>

          {/* Signing flow */}
          <div className="mt-5 flex-1">
            {!isSigned && flow.step === -1 && (
              <button
                type="button"
                onClick={() => setFlow({ step: 0, contractId: activeId })}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep active:scale-[0.98]"
              >
                <PenNib size={18} weight="bold" aria-hidden="true" />
                Подписать по ЭЦП
              </button>
            )}

            {flow.step >= 0 && (
              <ul className="space-y-3" aria-live="polite">
                {signSteps.map((s, i) => {
                  const done = flow.step > i || flow.step === signSteps.length;
                  const running = flow.step === i;
                  return (
                    <li key={s.id} className="flex items-start gap-3">
                      {done ? (
                        <CheckCircle
                          size={22}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                      ) : running ? (
                        <span className="mt-0.5 h-[22px] w-[22px] shrink-0 animate-spin rounded-full border-2 border-line border-t-brand" />
                      ) : (
                        <Circle
                          size={22}
                          className="mt-0.5 shrink-0 text-line"
                          aria-hidden="true"
                        />
                      )}
                      <div>
                        <div
                          className={`text-sm font-semibold ${
                            done || running ? "text-ink" : "text-ink-soft"
                          }`}
                        >
                          {s.title}
                        </div>
                        {(done || running) && (
                          <div className="text-xs text-ink-soft">{s.detail}</div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
