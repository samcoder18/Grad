import { useState } from "react";
import { CheckCircle, MapPin, PaperPlaneTilt } from "@phosphor-icons/react";
import { partners, partnerStatuses } from "../../data/office.js";
import { Card, PageTitle, StatusPill } from "./ui.jsx";

const emptyForm = { company: "", contact: "", region: "" };

export default function PartnerNetwork() {
  const [selectedId, setSelectedId] = useState(partners[0].id);
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const partner = partners.find((p) => p.id === selectedId);
  const formReady =
    form.company.trim() && form.contact.trim() && form.region.trim();

  const submit = (e) => {
    e.preventDefault();
    if (formReady) setSent(true);
  };

  const inputClass =
    "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-brand";

  return (
    <div>
      <PageTitle
        title="Партнёрская сеть"
        subtitle="Дистрибьюторы по регионам и заявка на подключение"
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {partners.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              aria-current={p.id === selectedId ? "true" : undefined}
              className={`w-full rounded-[20px] border p-4 text-left transition-colors ${
                p.id === selectedId
                  ? "border-brand bg-brand/5"
                  : "border-line bg-white hover:border-ink/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 text-sm font-semibold text-ink">{p.name}</span>
                <StatusPill tone={partnerStatuses[p.status].tone}>
                  {partnerStatuses[p.status].label}
                </StatusPill>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                <MapPin size={12} aria-hidden="true" />
                {p.region}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {partner.name}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
                  <MapPin size={14} aria-hidden="true" />
                  {partner.region}
                </div>
              </div>
              <StatusPill tone={partnerStatuses[partner.status].tone}>
                {partnerStatuses[partner.status].label}
              </StatusPill>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-paper p-4">
                <div className="font-display text-xl font-bold text-brand">
                  {partner.volume}
                </div>
                <div className="mt-1 text-xs text-ink-soft">объём закупок</div>
              </div>
              <div className="rounded-2xl bg-paper p-4">
                <div className="font-display text-xl font-bold text-brand">14 дн</div>
                <div className="mt-1 text-xs text-ink-soft">отсрочка платежа</div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-lg font-bold text-ink">
              Стать партнёром
            </h3>
            {sent ? (
              <div role="status" className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 font-semibold text-emerald-700">
                  <CheckCircle size={20} weight="fill" aria-hidden="true" />
                  Заявка принята
                </div>
                <p className="mt-1 text-sm text-emerald-700/80">
                  {form.company}, регион «{form.region}» — коммерческий директор
                  свяжется с вами в течение рабочего дня.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setSent(false);
                  }}
                  className="mt-3 text-xs font-semibold text-emerald-700 underline underline-offset-2"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-4 space-y-3">
                <input
                  className={inputClass}
                  placeholder="Название компании"
                  aria-label="Название компании"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
                <input
                  className={inputClass}
                  placeholder="Контактное лицо и телефон"
                  aria-label="Контактное лицо и телефон"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                />
                <input
                  className={inputClass}
                  placeholder="Регион присутствия"
                  aria-label="Регион присутствия"
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                />
                <button
                  type="submit"
                  disabled={!formReady}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <PaperPlaneTilt size={18} weight="bold" aria-hidden="true" />
                  Отправить заявку
                </button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
