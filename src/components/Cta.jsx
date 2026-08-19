import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Phone, EnvelopeSimple } from "@phosphor-icons/react";
import { contacts } from "../data/flavors.js";

export default function Cta() {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="contacts" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-brand px-6 py-20 text-white md:px-16 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50rem 26rem at 90% 0%, rgba(255,255,255,0.16), transparent 55%), radial-gradient(44rem 24rem at 0% 100%, rgba(179,18,42,0.55), transparent 60%)",
          }}
        />
        <div className="relative">
          <motion.h2
            {...rise(0)}
            className="max-w-4xl font-display text-3xl font-bold tracking-tight text-balance md:text-6xl"
          >
            Привезём вам Сладкий Град
          </motion.h2>
          <motion.p
            {...rise(0.1)}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-white/85 md:text-xl"
          >
            Опт от 50 ₽ за бутылку. Расскажите о вашей задаче, и мы предложим
            условия для магазина, кафе или мероприятия.
          </motion.p>

          <motion.div {...rise(0.2)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href={`mailto:${contacts.email}`}
              className="group flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand transition-all duration-300 hover:bg-paper active:scale-[0.98] sm:inline-flex"
            >
              Оформить заказ
              <ArrowUpRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={contacts.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-white active:scale-[0.98] sm:inline-flex"
            >
              <Phone size={18} weight="bold" />
              {contacts.phone}
            </a>
          </motion.div>

          <motion.a
            {...rise(0.3)}
            href={`mailto:${contacts.email}`}
            className="mt-8 inline-flex items-center gap-2 text-base text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            <EnvelopeSimple size={18} weight="bold" />
            {contacts.email}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
