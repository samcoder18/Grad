import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Сладкий Град это брендированное производство напитков сегодняшнего дня. Сочные рецептуры лимонадов, где главный ингредиент — вода Северного Кавказа. Мы создаём вкусы, которые дарят настроение, на природном источнике долголетия. Рассматриваем поставки по всей географии России и СНГ.";

const stats = [
  { value: "2023", label: "год основания" },
  { value: "7+", label: "вкусов в линейке" },
  { value: "50 ₽", label: "оптовая цена за бутылку от" },
];

export default function Manifesto() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".manifesto-word");
      // Storytelling: the manifesto reads itself aloud as you scroll through it.
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
      // Stats rise in one by one once they enter the viewport.
      gsap.fromTo(
        ".manifesto-stat",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".manifesto-stats",
            start: "top 85%",
            once: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 md:py-48">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-display text-[1.4rem] leading-[1.38] font-bold tracking-tight text-balance sm:text-4xl md:text-[3.4rem] md:leading-[1.28]">
          {TEXT.split(" ").map((word, i) => (
            <Fragment key={i}>
              {/* the space must live OUTSIDE the inline-block span,
                  otherwise it is collapsed and words glue together */}
              <span className="manifesto-word inline-block">{word}</span>{" "}
            </Fragment>
          ))}
        </p>

        <div className="manifesto-stats mt-12 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3 md:mt-20 md:pt-12">
          {stats.map((s) => (
            <div key={s.label} className="manifesto-stat">
              <span className="block font-display text-5xl font-bold tracking-tight text-brand md:text-7xl">
                {s.value}
              </span>
              <span className="mt-3 block text-base text-ink-soft">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
