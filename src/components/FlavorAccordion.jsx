import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { flavors } from "../data/flavors.js";

const COUNT = flavors.length;
const DURATION = 650;
const AUTOPLAY_MS = 4000;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const ITEM_TRANSITION = ["transform", "filter", "opacity", "left", "bottom", "height"]
  .map((prop) => `${prop} ${DURATION}ms ${EASE}`)
  .join(", ");

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

// Per-flavor background: icy mountain air on top dissolving into the deep
// flavor tone at the bottom. Gradients cannot transition, so the layers
// crossfade (see the background stack in the render).
const ICE = "#eaf6f5";
function flavorGradient(color) {
  return `linear-gradient(180deg, color-mix(in oklab, ${color}, ${ICE} 62%) 0%, color-mix(in oklab, ${color}, ${ICE} 20%) 38%, ${color} 76%, color-mix(in oklab, ${color}, black 14%) 100%)`;
}

function roleOf(index, active) {
  if (index === active) return "center";
  if (index === (active + COUNT - 1) % COUNT) return "left";
  if (index === (active + 1) % COUNT) return "right";
  if (index === (active + 2) % COUNT) return "back";
  return "hidden";
}

function itemStyle(role, isMobile) {
  const base = {
    position: "absolute",
    aspectRatio: "0.6 / 1",
    transformOrigin: "bottom center",
    transition: ITEM_TRANSITION,
    willChange: "transform, filter, opacity",
  };
  switch (role) {
    case "center":
      return {
        ...base,
        left: "50%",
        bottom: isMobile ? "22%" : "0%",
        height: isMobile ? "60%" : "92%",
        transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.12})`,
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
      };
    case "left":
      return {
        ...base,
        left: isMobile ? "20%" : "30%",
        bottom: isMobile ? "32%" : "12%",
        height: isMobile ? "16%" : "28%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
      };
    case "right":
      return {
        ...base,
        left: isMobile ? "80%" : "70%",
        bottom: isMobile ? "32%" : "12%",
        height: isMobile ? "16%" : "28%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
      };
    case "back":
      return {
        ...base,
        left: "50%",
        bottom: isMobile ? "32%" : "12%",
        height: isMobile ? "13%" : "22%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(4px)",
        opacity: 1,
        zIndex: 5,
      };
    default:
      return {
        ...base,
        left: "50%",
        bottom: "12%",
        height: "22%",
        transform: "translateX(-50%) scale(0.6)",
        filter: "blur(8px)",
        opacity: 0,
        zIndex: 1,
        pointerEvents: "none",
      };
  }
}

export default function FlavorAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animatingRef = useRef(false);
  const touchStartX = useRef(null);
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 640,
  );

  useEffect(() => {
    flavors.forEach((f) => {
      const img = new Image();
      img.src = f.img;
    });
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Autoplay: advances on its own, pauses on hover / touch and for
  // prefers-reduced-motion. Re-created after every slide change, so a manual
  // arrow click also resets the timer.
  useEffect(() => {
    if (reduceMotion || isPaused) return;
    const id = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % COUNT);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [activeIndex, isPaused, reduceMotion]);

  // Pause autoplay while the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const navigate = (dir) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setActiveIndex((prev) => (dir === "next" ? (prev + 1) % COUNT : (prev + COUNT - 1) % COUNT));
    window.setTimeout(() => {
      animatingRef.current = false;
    }, DURATION);
  };

  // Arrow-key navigation while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.removeEventListener("keydown", onKey);
        if (entry.isIntersecting) window.addEventListener("keydown", onKey);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = flavors[activeIndex];

  const arrowButtonStyle = {
    transition: "transform 150ms, background-color 150ms",
  };

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: active.color,
        transition: `background-color ${DURATION}ms ${EASE}`,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        setIsPaused(true);
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        setIsPaused(false);
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 40) navigate(dx < 0 ? "next" : "prev");
      }}
    >
      <h2 className="sr-only">Стеклянная линейка: семь характеров одного города</h2>
      <div className="relative w-full" style={{ height: "100dvh", overflow: "hidden" }}>
        {/* Crossfading gradient backgrounds, one per flavor */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
          {flavors.map((f, i) => (
            <div
              key={f.id}
              className="absolute inset-0"
              style={{
                background: flavorGradient(f.color),
                opacity: i === activeIndex ? 1 : 0,
                transition: `opacity ${DURATION}ms ${EASE}`,
              }}
            />
          ))}
        </div>

        {/* Studio lighting: soft key light behind the bottle + edge vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "radial-gradient(ellipse 55% 48% at 50% 36%, rgba(255,255,255,0.22), transparent 65%), radial-gradient(ellipse 135% 100% at 50% 115%, rgba(0,0,0,0.16), transparent 55%), radial-gradient(ellipse 150% 120% at 50% 50%, transparent 58%, rgba(0,0,0,0.15) 100%)",
          }}
        />

        {/* Giant ghost flavor name behind the bottles */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
          style={{ top: "18%", zIndex: 2 }}
        >
          <div
            className="relative w-full"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 11.5vw, 190px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              textShadow: "0 10px 44px rgba(0,0,0,0.18)",
              height: "1em",
            }}
          >
            {flavors.map((f, i) => (
              <span
                key={f.id}
                className="absolute inset-x-0 text-center whitespace-nowrap"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transition: `opacity ${DURATION}ms ${EASE}`,
                }}
              >
                {f.name}
              </span>
            ))}
          </div>
        </div>

        {/* Carousel: side bottles are clickable, center bottle is the hero */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {flavors.map((f, i) => {
            const role = roleOf(i, activeIndex);
            const sideAction =
              role === "left"
                ? { label: "Предыдущий вкус", go: () => navigate("prev") }
                : role === "right"
                  ? { label: "Следующий вкус", go: () => navigate("next") }
                  : null;
            return (
              <div
                key={f.id}
                role={sideAction ? "button" : undefined}
                aria-label={sideAction?.label}
                onClick={sideAction?.go}
                style={{ ...itemStyle(role, isMobile), cursor: sideAction ? "pointer" : undefined }}
              >
                <img
                  src={f.img}
                  alt={`Лимонад ${f.name}`}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Floor shadow grounding the center bottle */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: "50%",
            bottom: isMobile ? "19%" : "-2%",
            width: isMobile ? "58%" : "30%",
            height: "8%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.34), transparent 70%)",
            filter: "blur(6px)",
            zIndex: 4,
          }}
        />

        {/* Bottom-left: flavor text + nav */}
        <div
          aria-live="polite"
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <p
            className="mb-2 font-display text-xl font-bold tracking-tight text-white sm:mb-3 sm:text-2xl"
          >
            {active.name}
          </p>
          <p className="mb-5 hidden max-w-[36ch] text-sm leading-relaxed text-white/80 sm:mb-6 sm:block">
            {active.text}
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Предыдущий вкус"
              onClick={() => navigate("prev")}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white hover:scale-[1.08] hover:bg-white/12 sm:h-16 sm:w-16"
              style={arrowButtonStyle}
            >
              <ArrowLeft size={26} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Следующий вкус"
              onClick={() => navigate("next")}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white hover:scale-[1.08] hover:bg-white/12 sm:h-16 sm:w-16"
              style={arrowButtonStyle}
            >
              <ArrowRight size={26} weight="bold" />
            </button>
          </div>
        </div>

        {/* Bottom-right link */}
        <a
          href="#contacts"
          className="absolute right-4 bottom-6 flex items-center gap-2 text-white no-underline sm:right-10 sm:bottom-20"
          style={{
            zIndex: 60,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.8vw, 40px)",
            fontWeight: 700,
            opacity: 0.95,
            letterSpacing: "0.01em",
            lineHeight: 1,
            textTransform: "uppercase",
            transition: "opacity 200ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.95")}
        >
          Заказать
          <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" weight="bold" />
        </a>

        {/* Grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            backgroundImage: GRAIN_BG,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            opacity: 0.4,
          }}
        />

        {/* Autoplay progress line along the bottom edge */}
        {!reduceMotion && (
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15"
            style={{ zIndex: 60 }}
          >
            <div
              key={activeIndex}
              className="h-full w-full origin-left bg-white/85"
              style={{
                animation: `flavor-progress ${AUTOPLAY_MS}ms linear forwards`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
