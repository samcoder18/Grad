import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "../lib/asset.js";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Сладкий Град — это брендированное производство напитков сегодняшнего дня. Сочные рецептуры лимонадов, где главный ингредиент — вода Северного Кавказа. Мы создаём вкусы, которые дарят настроение, на природном источнике долголетия. Рассматриваем поставки по всей географии России и СНГ.";

const stats = [
  { value: "2023", label: "год основания" },
  { value: "9+", label: "вкусов в линейке" },
  {
    image: "img/germany-flag-3d.png",
    alt: "Объёмный флаг Германии",
    label: "Сиропы из Австрии",
  },
];

const statAlign = [
  "sm:items-start sm:text-left",
  "sm:items-center sm:text-center",
  "sm:items-end sm:text-right",
];

const statMediaAlign = [
  "sm:justify-start",
  "sm:justify-center",
  "sm:justify-end",
];

const PHOTO_SLOTS = [
  {
    src: "img/about-quality-control.webp",
    alt: "Контроль качества напитков на линии розлива",
    caption: "Контроль качества",
    className: "right-0 top-2 z-20 aspect-[3/4] w-[39%] rotate-3 rounded-[22px]",
    captionClassName: "right-1",
    objectPosition: "center",
  },
  {
    src: "img/about-warehouse.webp",
    alt: "Готовая продукция на складе",
    caption: "Склад",
    className: "left-0 top-10 z-10 aspect-[4/5] w-[68%] -rotate-2 rounded-[28px]",
    objectPosition: "center bottom",
  },
  {
    src: "img/about-production.webp",
    alt: "Упаковочная линия на производстве",
    caption: "Производство",
    className: "right-3 bottom-0 z-30 aspect-[4/3] w-[54%] -rotate-[2.5deg] rounded-[24px]",
    captionClassName: "right-1",
    objectPosition: "center",
  },
];

function PhotoSlot({ src, alt, caption, className, captionClassName = "left-1", objectPosition }) {
  return (
    <figure className={`manifesto-photo absolute ${className}`}>
      <figcaption
        className={`absolute bottom-full mb-2 whitespace-nowrap rounded-full bg-paper/90 px-2.5 py-1 text-xs font-semibold tracking-[0.04em] text-brand uppercase shadow-sm backdrop-blur-sm ${captionClassName}`}
      >
        {caption}
      </figcaption>
      <div className="h-full w-full overflow-hidden rounded-[inherit] border-4 border-white bg-white shadow-[0_28px_56px_-28px_rgba(23,25,28,0.45)]">
        <img
          src={asset(src)}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          loading="lazy"
        />
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
    <section id="about" ref={ref} className="site-section">
      <div className="site-container">
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
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`manifesto-stat flex flex-col items-start text-left ${statAlign[i]}`}
            >
              <div
                className={`flex h-24 w-full items-center justify-start md:h-32 ${statMediaAlign[i]}`}
              >
                {s.image ? (
                  <img
                    src={asset(s.image)}
                    alt={s.alt}
                    loading="lazy"
                    className="-ml-3 h-24 w-44 object-contain object-left drop-shadow-[0_18px_22px_rgba(23,25,28,0.20)] sm:ml-0 sm:object-center md:h-28 md:w-52"
                  />
                ) : (
                  <span className="block font-display text-5xl font-bold tracking-tight text-brand md:text-7xl">
                    {s.value}
                  </span>
                )}
              </div>
              <span className="mt-3 block text-base text-ink-soft">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
