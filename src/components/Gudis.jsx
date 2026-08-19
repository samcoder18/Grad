import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Drop, Sparkle } from "@phosphor-icons/react";
import { asset } from "../lib/asset.js";

gsap.registerPlugin(ScrollTrigger);

const variants = [
  {
    icon: Drop,
    title: "Негазированная",
    text: "Умеренная минерализация. Подходит для ежедневного потребления.",
  },
  {
    icon: Sparkle,
    title: "Газированная",
    text: "Бодрящая и лёгкая. Мягко улучшает пищеварение после еды.",
  },
];

const gallery = [
  {
    src: asset("img/gudis-1.webp"),
    alt: "Вода Гудис в стеклянной бутылке",
    caption: "Стекло, 0,4 л",
    wrap: "col-span-2",
    imgCls: "aspect-[4/5] object-contain p-4",
  },
  {
    src: asset("img/gudis-3.webp"),
    alt: "Газированная вода Гудис в ПЭТ-бутылке",
    caption: "ПЭТ, газированная",
    wrap: "",
    imgCls: "aspect-[3/4] object-contain p-2",
  },
  {
    src: asset("img/gudis-2.webp"),
    alt: "Негазированная вода Гудис в ПЭТ-бутылке",
    caption: "ПЭТ, негазированная",
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
      className="relative overflow-x-clip py-24 text-white md:py-48"
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
      <div className="gudis-layout relative mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-12">
        {/* Sticky split (desktop): the story column sticks below the nav
            while the taller gallery scrolls past it. */}
        <div className="gudis-pin lg:sticky lg:top-28 lg:col-span-5">
          <h2 className="gudis-reveal font-display text-3xl font-bold tracking-tight text-balance md:text-6xl">
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
                className="flex items-start gap-4 rounded-[24px] border border-white/12 bg-white/6 p-5 backdrop-blur-sm"
              >
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gudis/25 text-gudis">
                  <v.icon size={22} weight="bold" />
                </span>
                <span>
                  <span className="block text-lg font-semibold">{v.title}</span>
                  <span className="mt-1 block text-base leading-relaxed text-white/70">
                    {v.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <a
            href="#contacts"
            className="gudis-reveal group mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-alpine active:scale-[0.98]"
          >
            Оформить заказ
            <ArrowUpRight
              size={18}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
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
