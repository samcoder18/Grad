import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react";
import { asset } from "../lib/asset.js";

const ease = [0.16, 1, 0.3, 1];

function Magnetic({ children, className, strength = 0.3 }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.4 });
  const ref = useRef(null);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function Word({ word, className = "", style, whole = false }) {
  // `whole` renders the word as one motion element: required for bg-clip-text
  // gradients, which break when child spans create compositing layers.
  if (whole) {
    return (
      <motion.span
        aria-hidden
        className={`inline-block whitespace-nowrap will-change-transform ${className}`}
        style={style}
        variants={{
          hidden: { opacity: 0, y: "0.55em" },
          shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
        }}
      >
        {word}
      </motion.span>
    );
  }
  return (
    <span className={`inline-block whitespace-nowrap ${className}`} style={style}>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: "0.55em" },
            shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

// backgroundSize is enlarged so the shimmer sweep has travel room;
// the sweep itself is the animate-shimmer keyframe from index.css.
const gradientWord = {
  className: "bg-clip-text text-transparent animate-shimmer",
  style: {
    backgroundImage:
      "linear-gradient(100deg, var(--color-tarragon), var(--color-pear) 35%, var(--color-orange) 60%, var(--color-barberry))",
    backgroundSize: "220% auto",
  },
};

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Scroll-driven depth: the photo drifts down slower than the page,
  // the panel lifts and dissolves. Scales up slightly to keep edges covered.
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Panel parallax/fade is desktop-only: on mobile the panel lives below
  // the image in normal flow and must stay fully visible.
  const parallax = !reduce && isDesktop;

  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden">
      {/* image in normal flow: always fully visible, never cropped */}
      <motion.div
        className="origin-center"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
      >
        <motion.img
          src={asset("img/hero-bg.webp")}
          alt="Бутылки лимонадов Мохито и Виноград на альпийском лугу"
          className="block h-auto w-full"
          fetchPriority="high"
          initial={reduce ? false : { scale: 1.08, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease }}
        />
      </motion.div>

      {/* text overlays the image on desktop, stacks below it on mobile */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:absolute lg:inset-0 lg:flex lg:items-start lg:py-0 lg:pt-[20vh]"
        style={parallax ? { y: panelY, opacity: panelOpacity } : undefined}
      >
        <motion.div
          className="glass-panel max-w-lg rounded-card border border-white/40 bg-white/35 p-6 sm:p-8"
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          {reduce ? (
            <h1 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.04] font-bold tracking-tight text-balance">
              Город{" "}
              <span className={gradientWord.className} style={gradientWord.style}>
                ярких
              </span>{" "}
              вкусов
            </h1>
          ) : (
            <motion.h1
              aria-label="Город ярких вкусов"
              initial="hidden"
              animate="shown"
              variants={{
                hidden: {},
                shown: { staggerChildren: 0.035, delayChildren: 0.15 },
              }}
              className="font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.04] font-bold tracking-tight text-balance"
            >
              <Word word="Город" />{" "}
              <Word word="ярких" whole className={gradientWord.className} style={gradientWord.style} />{" "}
              <Word word="вкусов" />
            </motion.h1>
          )}

          <motion.p
            {...rise(0.55)}
            className="mt-4 max-w-[42ch] text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Вода и лимонады с вершин Кавказа. Производим с 2023 года
            и привозим по всему СНГ.
          </motion.p>

          <motion.div {...rise(0.7)} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Magnetic className="block sm:inline-block">
              <a
                href="#contacts"
                className="group flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep active:scale-[0.98] sm:inline-flex"
              >
                Оформить заказ
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
            <Magnetic className="block sm:inline-block" strength={0.22}>
              <a
                href="#flavors"
                className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/50 px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-colors duration-300 hover:border-ink/30 active:scale-[0.98] sm:inline-flex"
              >
                Смотреть вкусы
                <ArrowDown
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
