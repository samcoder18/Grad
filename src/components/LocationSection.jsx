import { motion, useReducedMotion } from "motion/react";
import { LocationMap } from "./ui/expand-map.jsx";

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

        <motion.div {...rise(0.25)}>
          <LocationMap />
        </motion.div>
      </div>
    </section>
  );
}
