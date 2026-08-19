import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { hits } from "../data/flavors.js";

const ease = [0.16, 1, 0.3, 1];

// Pill-shaped product shots embedded directly in the headline.
function HeadlinePill({ src, position }) {
  return (
    <span
      aria-hidden
      className="mx-1.5 inline-block h-[0.74em] w-[1.8em] rounded-full bg-cover align-[-0.1em] md:mx-2.5"
      style={{ backgroundImage: `url(${src})`, backgroundPosition: position }}
    />
  );
}

function ImageCell({ hit, className, delay }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href="#contacts"
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease }}
      style={{ "--hit": hit.color }}
      className={`group relative block overflow-hidden rounded-[28px] bg-ink ${className}`}
    >
      {/* Ambient glow in the flavor's own color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(26rem 20rem at 50% 16%, color-mix(in srgb, ${hit.color} 38%, transparent), transparent 65%)`,
        }}
      />
      <img
        src={hit.img}
        alt={`Напиток ${hit.name}, 1 л`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
      <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2.5">
            <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              {hit.name}
            </h3>
            <span className="text-sm font-semibold text-white/65">1 л</span>
          </div>
          <p className="mt-1.5 max-w-[34ch] text-sm leading-relaxed text-white/85">{hit.text}</p>
        </div>
        <span className="mb-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-(--hit) group-hover:text-white">
          <ArrowUpRight size={20} weight="bold" />
        </span>
      </div>
    </motion.a>
  );
}

export default function HitsBento() {
  const reduce = useReducedMotion();
  const [cola, mojito, orange, lime] = hits;

  return (
    <section id="hits" className="py-24 md:py-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-5xl font-display text-3xl font-bold tracking-tight text-balance md:text-6xl"
        >
          Литровые хиты
          <HeadlinePill src="/img/orange.webp" position="center 30%" />
          Dolce
          <HeadlinePill src="/img/mojito.webp" position="center 44%" />
          кончаются первыми
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft"
        >
          Cola, Mojito, Orange и Lime в литровом ПЭТ: самые оборачиваемые позиции
          линейки Dolce.
        </motion.p>

        <div className="mt-10 grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[260px] md:mt-14 lg:grid-cols-6 lg:auto-rows-[280px]">
          <ImageCell hit={cola} delay={0} className="h-80 sm:h-auto sm:col-span-2 lg:col-span-4 lg:row-span-2" />
          <ImageCell hit={mojito} delay={0.08} className="h-80 sm:h-auto lg:col-span-2" />
          <ImageCell hit={orange} delay={0.16} className="h-80 sm:h-auto lg:col-span-2" />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="relative flex h-80 flex-col justify-between overflow-hidden rounded-[28px] bg-dolce p-7 sm:h-auto sm:col-span-2 lg:col-span-3"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(26rem 16rem at 85% 0%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(30rem 20rem at 0% 100%, rgba(11,47,74,0.5), transparent 60%)",
              }}
            />
            <span className="relative font-display text-5xl font-bold tracking-tight text-white md:text-6xl">
              1 л
            </span>
            <div className="relative">
              <p className="font-display text-2xl font-bold tracking-tight text-balance text-white md:text-[1.7rem]">
                Формат, который работает на полке
              </p>
              <p className="mt-3 max-w-[36ch] text-base leading-relaxed text-white/80">
                Заметен издалека и быстро оборачивается: берут для компаний,
                праздников и больших семейных ужинов.
              </p>
              <a
                href="#contacts"
                className="group/link mt-5 inline-flex items-center gap-2 text-base font-semibold text-white underline-offset-4 transition-all duration-300 hover:underline active:scale-[0.98]"
              >
                Оформить заказ
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>
          <ImageCell hit={lime} delay={0.32} className="h-80 sm:h-auto sm:col-span-2 lg:col-span-3" />
        </div>
      </div>
    </section>
  );
}
