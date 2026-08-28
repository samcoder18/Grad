import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  X,
  ArrowUpRight,
  WhatsappLogo,
  CheckCircle,
  WarningCircle,
  CaretDown,
} from "@phosphor-icons/react";
import { ORDER_MODAL_EVENT } from "../lib/order-modal.js";
import { sendOrder } from "../lib/telegram.js";
import { contacts } from "../data/flavors.js";

const BUSINESS_TYPES = ["Дистрибьютор", "Розница", "HoReCa", "Мероприятие"];

const INITIAL_FORM = {
  name: "",
  phone: "",
  business: BUSINESS_TYPES[0],
  volume: "",
  city: "",
  consent: false,
};

const inputCls =
  "w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-brand";

const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export default function OrderModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const reduce = useReducedMotion();

  // Any CTA in the app fires this event to open the modal.
  useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setOpen(true);
    };
    window.addEventListener(ORDER_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(ORDER_MODAL_EVENT, onOpen);
  }, []);

  // Escape to close + lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const close = () => setOpen(false);

  const whatsappHref = `${contacts.whatsapp}?text=${encodeURIComponent(
    "Здравствуйте! Хочу заказать напитки Сладкий Град оптом.",
  )}`;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendOrder(form);
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("Не удалось отправить заявку:", err);
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-lg rounded-[28px] bg-white p-6 shadow-[0_40px_90px_-30px_rgba(23,25,28,0.45)] sm:p-8"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
            >
              <X size={18} weight="bold" />
            </button>

            {status === "success" ? (
              <div className="py-4 text-center">
                <CheckCircle
                  size={56}
                  weight="duotone"
                  className="mx-auto text-tarragon"
                  aria-hidden="true"
                />
                <h2
                  id="order-modal-title"
                  className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  Заявка отправлена
                </h2>
                <p className="mx-auto mt-3 max-w-[40ch] text-base leading-relaxed text-ink-soft">
                  Менеджер свяжется с вами в рабочее время, уточнит объём
                  и условия поставки.
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-brand-deep active:scale-[0.98]"
                  >
                    <WhatsappLogo size={20} weight="fill" />
                    Или напишите сразу в WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex items-center justify-center rounded-full border border-ink/15 px-6 py-3.5 text-base font-semibold text-ink transition-colors duration-300 hover:border-ink/30 active:scale-[0.98]"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2
                  id="order-modal-title"
                  className="pr-10 font-display text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  Оформить заказ
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Оставьте контакты — менеджер перезвонит, уточнит объём
                  и условия поставки.
                </p>

                {status === "error" && (
                  <div
                    role="alert"
                    className="mt-5 flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed text-ink"
                  >
                    <WarningCircle
                      size={20}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <p>
                      Не удалось отправить заявку. Попробуйте ещё раз или{" "}
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-brand underline underline-offset-4"
                      >
                        напишите нам в WhatsApp
                      </a>
                      .
                    </p>
                  </div>
                )}

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="order-name" className={labelCls}>
                      Имя *
                    </label>
                    <input
                      id="order-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Как к вам обращаться"
                      value={form.name}
                      onChange={set("name")}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label htmlFor="order-phone" className={labelCls}>
                      Телефон *
                    </label>
                    <input
                      id="order-phone"
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={set("phone")}
                      className={inputCls}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="order-business" className={labelCls}>
                        Тип бизнеса
                      </label>
                      <div className="relative">
                        <select
                          id="order-business"
                          value={form.business}
                          onChange={set("business")}
                          className={`${inputCls} appearance-none pr-10`}
                        >
                          {BUSINESS_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <CaretDown
                          size={16}
                          weight="bold"
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-soft"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="order-city" className={labelCls}>
                        Город *
                      </label>
                      <input
                        id="order-city"
                        type="text"
                        required
                        autoComplete="address-level2"
                        placeholder="Куда везём"
                        value={form.city}
                        onChange={set("city")}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="order-volume" className={labelCls}>
                      Интересующий объём
                    </label>
                    <input
                      id="order-volume"
                      type="text"
                      placeholder="Например: 500–1000 бутылок в месяц"
                      value={form.volume}
                      onChange={set("volume")}
                      className={inputCls}
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-ink-soft">
                    <input
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={set("consent")}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-brand"
                    />
                    <span>
                      Соглашаюсь с{" "}
                      <a
                        href="#privacy"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-ink underline underline-offset-4 transition-colors hover:text-brand"
                      >
                        политикой обработки персональных данных
                      </a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-brand-deep active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending" ? "Отправляем…" : "Отправить заявку"}
                    {status !== "sending" && (
                      <ArrowUpRight
                        size={18}
                        weight="bold"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </button>
                </form>

                <p className="mt-4 text-center text-sm text-ink-soft">
                  Или{" "}
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-ink underline underline-offset-4 transition-colors hover:text-brand"
                  >
                    напишите сразу в WhatsApp
                  </a>
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
