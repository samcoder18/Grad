import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Factory } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Сладкий Град — это брендированное производство напитков сегодняшнего дня. Сочные рецептуры лимонадов, где главный ингредиент — вода Северного Кавказа. Мы создаём вкусы, которые дарят настроение, на природном источнике долголетия. Рассматриваем поставки по всей географии России и СНГ.";

const stats = [
  { value: "2023", label: "год основания" },
  { value: "7+", label: "вкусов в линейке" },
  { value: "50 ₽", label: "оптовая цена от, за бутылку" },
];

// Placeholder frames for production photos. To swap in real photos later:
// replace the dashed <figure> content with an <img> and keep the positioning classes.
const PHOTO_SLOTS = [
  {
    caption: "Цех розлива",
    className: "left-0 top-8 z-10 aspect-[3/4] w-[64%] -rotate-2 rounded-[28px]",
  },
  {
    caption: "Линия упаковки",
    className: "right-0 top-0 z-20 aspect-square w-[42%] rotate-3 rounded-[22px]",
  },
  {
    caption: "Контроль качества",
    className: "right-3 bottom-0 z-30 aspect-[4/3] w-[54%] -rotate-[2.5deg] rounded-[24px]",
  },
];

function PhotoSlot({ caption, className }) {
  return (
    <figure
      aria-label={`Фото с производства: ${caption}`}
      className={`manifesto-photo absolute border border-dashed border-ink/25 bg-white/70 shadow-[0_28px_56px_-28px_rgba(23,25,28,0.3)] backdrop-blur-sm ${className}`}
    >
      <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-ink-soft">
        <Factory size={34} weight="duotone" className="text-brand" aria-hidden="true" />
        <figcaption className="text-sm font-medium leading-tight">{caption}</figcaption>
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft/70">
          фото с производства
        </span>
      </div>
    </figure>
  );
}

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
      // Photo collage slides up frame by frame as it enters the viewport.
      gsap.fromTo(
        ".manifesto-photo",
        { opacity: 0, y: 48, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.14,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".manifesto-collage",
            start: "top 82%",
            once: true,
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
        <div className="grid items-center gap-16 md:gap-20 lg:grid-cols-[1.1fr_1fr]">
          <p className="font-display text-[1.4rem] leading-[1.38] font-bold tracking-tight text-balance sm:text-4xl md:text-[3.4rem] md:leading-[1.28] lg:text-[2.9rem]">
            {TEXT.split(" ").map((word, i) => (
              <Fragment key={i}>
                {/* the space must live OUTSIDE the inline-block span,
                    otherwise it is collapsed and words glue together */}
                <span className="manifesto-word inline-block">{word}</span>{" "}
              </Fragment>
            ))}
          </p>

          <div
            className="manifesto-collage relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md lg:max-w-none"
            aria-label="Фотографии с производства"
          >
            {PHOTO_SLOTS.map((slot) => (
              <PhotoSlot key={slot.caption} {...slot} />
            ))}
          </div>
        </div>

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
