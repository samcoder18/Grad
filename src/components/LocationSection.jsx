import { motion, useReducedMotion } from "motion/react";
import { BeerBottle, Warehouse } from "@phosphor-icons/react";
import { LocationMap } from "./ui/expand-map.jsx";
import { contacts } from "../data/flavors.js";

const options = [
  {
    icon: Warehouse,
    title: "Самовывоз",
    text: "Заберите заказ со склада на Ставропольской, 6 — отгрузим в день оплаты.",
  },
  {
    icon: BeerBottle,
    title: "Дегустация",
    text: "Приезжайте попробовать всю линейку — подберём вкусы под вашу полку. Запись по телефону.",
    link: { href: contacts.phoneHref, label: contacts.phone },
  },
];

export default function LocationSection() {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="location" className="px-4 pb-20 sm:px-6 md:pb-28">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
        <div className="text-center">
          <motion.p
            {...rise(0)}
            className="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase"
          >
            Где мы находимся
          </motion.p>
          <motion.h2
            {...rise(0.1)}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl"
          >
            Производство во Владикавказе
          </motion.h2>
          <motion.p
            {...rise(0.2)}
            className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Ставропольская улица, 6, Владикавказ, Республика Северная Осетия —
            Алания
          </motion.p>
        </div>

        <motion.div
          {...rise(0.3)}
          className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {options.map((o) => (
            <div
              key={o.title}
              className="flex items-start gap-4 rounded-[24px] border border-line bg-white p-6 text-left"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <o.icon size={22} weight="bold" />
              </span>
              <div>
                <p className="text-lg font-semibold">{o.title}</p>
                <p className="mt-1 text-base leading-relaxed text-ink-soft">
                  {o.text}{" "}
                  {o.link && (
                    <a
                      href={o.link.href}
                      className="font-medium whitespace-nowrap text-ink underline-offset-4 transition-colors hover:text-brand hover:underline"
                    >
                      {o.link.label}
                    </a>
                  )}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div {...rise(0.4)}>
          <LocationMap />
        </motion.div>
      </div>
    </section>
  );
}
