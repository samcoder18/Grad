import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { List, X, ArrowUpRight, Buildings } from "@phosphor-icons/react";
import { asset } from "../lib/asset.js";

const links = [
  { href: "#flavors", label: "Вкусы" },
  { href: "#hits", label: "Хиты" },
  { href: "#gudis", label: "Гудис" },
  { href: "#about", label: "О компании" },
  { href: "#contacts", label: "Контакты" },
];

export default function Nav({ onEnterOffice }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Scroll morph: wide bar contracts into a floating pill.
  // The underdamped spring gives the elastic overshoot on scroll stops.
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, [0, 140], [0, 1], { clamp: true });
  const progress = useSpring(raw, { stiffness: 140, damping: 13, mass: 0.7 });
  const p = reduce ? raw : progress;

  const maxWidth = useTransform(p, [0, 1], [1280, 960]);
  const top = useTransform(p, [0, 1], [16, 28]);
  const radius = useTransform(p, [0, 1], [24, 999]);
  const boxShadow = useTransform(
    p,
    [0, 1],
    ["0 4px 20px rgba(23,25,28,0.06)", "0 18px 48px rgba(23,25,28,0.14)"],
  );
  const backgroundColor = useTransform(
    p,
    [0, 1],
    ["rgba(255,255,255,0.85)", "rgba(255,255,255,0.70)"],
  );

  return (
    <motion.header style={{ top }} className="fixed inset-x-0 z-50 px-4">
      <motion.nav
        style={{ maxWidth, borderRadius: radius, boxShadow, backgroundColor }}
        className="mx-auto flex h-16 items-center justify-between gap-4 border border-white/60 pl-6 pr-2 backdrop-blur-xl"
      >
        <a href="#top" className="flex items-center whitespace-nowrap">
          <img
            src={asset("img/logo-black.webp")}
            alt="Сладкий Град"
            className="h-11 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEnterOffice}
            className="group hidden items-center gap-1.5 rounded-full border border-ink/15 bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand hover:text-brand active:scale-[0.98] sm:inline-flex"
          >
            <Buildings size={16} weight="bold" aria-hidden="true" />
            Офис
          </button>
          <a
            href="#contacts"
            className="group hidden items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-deep active:scale-[0.98] sm:inline-flex"
          >
            Оформить заказ
            <ArrowUpRight
              size={16}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl rounded-[28px] border border-white/60 bg-white/90 p-4 shadow-[0_24px_60px_rgba(23,25,28,0.16)] backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-paper"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onEnterOffice();
                  }}
                  className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-base font-medium text-ink transition-colors hover:bg-paper"
                >
                  <Buildings size={18} aria-hidden="true" />
                  Виртуальный офис
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="#contacts"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3.5 text-base font-semibold text-white active:scale-[0.98]"
                >
                  Оформить заказ
                  <ArrowUpRight size={18} weight="bold" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
