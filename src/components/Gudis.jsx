import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Drop, Sparkle } from "@phosphor-icons/react";
import { openOrderModal } from "../lib/order-modal.js";
import { asset } from "../lib/asset.js";

gsap.registerPlugin(ScrollTrigger);

const variants = [
  {
    icon: Sparkle,
    title: "Газированная",
    text: "Бодрящая и лёгкая. Мягко улучшает пищеварение после еды.",
    formats: ["0,5 л · стекло", "1 л · ПЭТ"],
  },
  {
    icon: Drop,
    title: "Негазированная",
    text: "Умеренная минерализация. Подходит для ежедневного потребления.",
    formats: ["0,5 л · ПЭТ"],
  },
];

const composition = {
  subtitle: "Гидрокарбонатная магниево-кальциевая, столовая питьевая",
  groups: [
    {
      label: "Анионы, мг/дм³",
      rows: [
        ["Гидрокарбонаты HCO₃", "<300"],
        ["Сульфаты SO₄", "<250"],
        ["Хлориды Cl", "<50"],
      ],
    },
    {
      label: "Катионы, мг/дм³",
      rows: [
        ["Натрий + калий Na+K", "<100"],
        ["Магний Mg", "<110"],
        ["Кальций Ca", "<250"],
      ],
    },
  ],
  summary: ["Общая минерализация — 0,2–0,5 г/л", "Общая жёсткость — <3,4 мг/л"],
  source: "Источник «ФаныкДон», Кобанское ущелье, Пригородный р-н, РСО-Алания",
};

const gallery = [
  {
    src: asset("img/gudis-1.webp"),
    alt: "Газированная вода Гудис в стеклянной бутылке",
    caption: "Стекло, газированная, 0,5 л",
    wrap: "col-span-2",
    imgCls: "aspect-[4/5] object-contain p-4",
  },
  {
    src: asset("img/gudis-3.webp"),
    alt: "Газированная вода Гудис в ПЭТ-бутылке",
    caption: "ПЭТ, газированная, 1 л",
    wrap: "",
    imgCls: "aspect-[3/4] object-contain p-2",
  },
  {
    src: asset("img/gudis-2.webp"),
    alt: "Негазированная вода Гудис в ПЭТ-бутылке",
    caption: "ПЭТ, негазированная, 0,5 л",
    wrap: "md:mt-16",
    imgCls: "aspect-[3/4] object-contain p-2",
  },
];

export default function Gudis() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 0px)", () => {
      // Hierarchy: the story column rises in once when the chapter enters.
      gsap.fromTo(
        ".gudis-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gudis-pin", start: "top 78%", once: true },
        },
      );
      // Storytelling: bottles grow to full size while entering the viewport,
      // then sink and fade as they leave past the top.
      gsap.utils.toArray(".gudis-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 0.82, opacity: 0.25 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top 92%", end: "top 38%", scrub: true },
          },
        );
        gsap.to(img, {
          scale: 0.9,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: img, start: "bottom 22%", end: "bottom -18%", scrub: true },
        });
      });
    });
    // Webfont and lazy images above this section shift document offsets after
    // mount; recalculate scrub trigger positions once they settle.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="gudis"
      ref={ref}
      className="site-section relative overflow-x-clip text-white"
      style={{
        background: "linear-gradient(168deg, #061826 0%, #0b2f4a 45%, #104061 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46rem 34rem at 72% 16%, rgba(18,135,212,0.30), transparent 62%), radial-gradient(38rem 28rem at 10% 84%, rgba(18,135,212,0.16), transparent 60%), radial-gradient(30rem 22rem at 42% 56%, rgba(84,180,235,0.10), transparent 60%)",
        }}
      />
      <div className="gudis-layout site-container relative grid items-start gap-14 lg:grid-cols-12">
        {/* Sticky split (desktop): the story column sticks below the nav
            while the taller gallery scrolls past it. */}
        <div className="gudis-pin min-w-0 lg:sticky lg:top-28 lg:col-span-5">
          <h2 className="gudis-reveal font-display text-3xl font-bold tracking-tight text-balance md:text-6xl lg:text-[clamp(2rem,3.3vw,2.875rem)]">
            <span className="text-gudis">Gudis</span>:
            <br />
            вода Центрального Кавказа
          </h2>
          <p className="gudis-reveal mt-6 max-w-[48ch] text-lg leading-relaxed text-white/75">
            Природная минеральная вода из горного источника. Мягкий вкус и
            заряд на каждый день.
          </p>
          <ul className="gudis-reveal mt-10 flex flex-col gap-4">
            {variants.map((v) => (
              <li
                key={v.title}
                className="flex flex-col items-start gap-4 rounded-[24px] sm:flex-row border border-white/12 bg-white/6 p-5 backdrop-blur-sm"
              >
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gudis/25 text-gudis">
                  <v.icon size={22} weight="bold" />
                </span>
                <span>
                  <span className="block text-lg font-semibold">{v.title}</span>
                  <span className="mt-1 block text-base leading-relaxed text-white/70">
                    {v.text}
                  </span>
                  <span className="mt-2.5 flex flex-wrap gap-1.5">
                    {v.formats.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-gudis/40 bg-gudis/15 px-2.5 py-1 text-xs font-semibold text-gudis"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {f}
                      </span>
                    ))}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          {/* Состав газированной воды — с этикетки */}
          <div className="gudis-reveal mt-6 rounded-[24px] border border-white/12 bg-white/6 p-5 backdrop-blur-sm">
            <p className="text-lg font-semibold">Состав газированной воды</p>
            <p className="mt-1 text-sm leading-relaxed text-white/60">{composition.subtitle}</p>
            <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-1">
              {composition.groups.map((g) => (
                <div key={g.label}>
                  <p className="text-xs font-semibold tracking-wide text-gudis uppercase">
                    {g.label}
                  </p>
                  <ul
                    className="mt-1.5 space-y-1 text-sm leading-snug text-white/85"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {g.rows.map(([name, value]) => (
                      <li key={name} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <span className="text-white/60">{name}</span>
                        <span className="text-right font-semibold whitespace-nowrap">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ul className="mt-4 space-y-1 border-t border-white/12 pt-3 text-sm text-white/75">
              {composition.summary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-white/50">{composition.source}</p>
          </div>
          <button
            type="button"
            onClick={openOrderModal}
            className="gudis-reveal group mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-alpine active:scale-[0.98]"
          >
            Оформить заказ
            <ArrowUpRight
              size={18}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        <div className="relative lg:col-span-7">
          <div className="grid grid-cols-2 items-start gap-4 md:gap-6">
            {gallery.map((item) => (
              <figure key={item.src} className={item.wrap}>
                {/* No card box: mix-blend-screen drops the renders' black
                    background, so the bottles float inside the alpine gradient. */}
                <div className="group">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className={`gudis-img w-full mix-blend-screen will-change-transform transition-transform duration-700 ease-out group-hover:scale-105 ${item.imgCls}`}
                  />
                </div>
                <figcaption className="mt-3 text-sm text-white/55">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
