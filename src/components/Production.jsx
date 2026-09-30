import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { asset } from "../lib/asset.js";
import "./Production.css";

const VOLUMES = [
  {
    id: "glass", material: "Стекло", size: "0,5", target: 800000,
    body: "M74 39 L74 74 C74 99 47 105 47 143 L47 311 Q47 330 66 332 L114 332 Q133 330 133 311 L133 143 C133 105 106 99 106 74 L106 39 Z",
    cap: { x: 70, y: 24, width: 40, height: 20, rx: 5 },
  },
  {
    id: "pet1", material: "ПЭТ", size: "1", target: 1200000,
    body: "M72 39 L72 65 C72 87 38 96 38 132 C38 174 43 184 43 207 C43 240 38 267 38 307 Q37 326 51 329 Q63 335 77 329 Q90 335 103 329 Q117 335 129 329 Q143 326 142 307 C142 267 137 240 137 207 C137 184 142 174 142 132 C142 96 108 87 108 65 L108 39 Z",
    cap: { x: 68, y: 21, width: 44, height: 23, rx: 6 },
  },
  {
    id: "pet2", material: "ПЭТ", size: "2", target: 600000,
    body: "M71 39 L71 61 C71 86 26 99 26 140 C26 170 31 189 31 215 C31 251 26 274 26 307 Q25 326 42 329 Q57 335 74 329 Q90 335 106 329 Q123 335 138 329 Q155 326 154 307 C154 274 149 251 149 215 C149 189 154 170 154 140 C154 99 109 86 109 61 L109 39 Z",
    cap: { x: 66, y: 19, width: 48, height: 25, rx: 6 },
  },
];
const BOTTLE_FINISH = {
  liquid: "#e3e8eb", light: "#ffffff", deep: "#8b989f",
  capColor: "#c5cdd2", capLight: "#ffffff", capDeep: "#828f98",
};
const QUARTERS = ["I", "II", "III", "IV"];
const formatNumber = (number) => Math.round(number).toLocaleString("ru-RU");

// A time-based estimate, not production telemetry. Bounds are recomputed to
// handle a new quarter even when the visitor leaves the page open overnight.
function currentQuarter() {
  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3);
  const start = new Date(now.getFullYear(), quarter * 3, 1);
  const end = new Date(now.getFullYear(), quarter * 3 + 3, 1);
  return {
    label: `${QUARTERS[quarter]} квартал ${now.getFullYear()}`,
    progress: Math.min(1, Math.max(0, (now - start) / (end - start))),
  };
}

function Bottle({ volume, progress }) {
  const id = useId().replace(/:/g, "");
  const paint = (name) => `url(#${id}-${name})`;
  const isPet = volume.id !== "glass";
  const side = volume.id === "pet2" ? 26 : volume.id === "pet1" ? 38 : 47;
  const liquidTop = 329 - progress * 264;
  return (
    <div className={`production-bottle production-bottle--${volume.id}`}>
      <svg viewBox="0 0 180 360" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`${id}-body`}><path d={volume.body} /></clipPath>
          <linearGradient id={`${id}-glass`} x1="0" x2="1">
            <stop offset="0" stopColor="#8b969e" stopOpacity=".32" />
            <stop offset=".08" stopColor="#fff" stopOpacity=".92" />
            <stop offset=".18" stopColor="#dce2e6" stopOpacity=".28" />
            <stop offset=".4" stopColor="#fff" stopOpacity=".12" />
            <stop offset=".73" stopColor="#fff" stopOpacity=".7" />
            <stop offset=".9" stopColor="#b4bdc3" stopOpacity=".22" />
            <stop offset="1" stopColor="#89949c" stopOpacity=".4" />
          </linearGradient>
          <linearGradient id={`${id}-liquid`} x1="0" x2="1">
            <stop stopColor={BOTTLE_FINISH.deep} />
            <stop offset=".13" stopColor={BOTTLE_FINISH.liquid} />
            <stop offset=".3" stopColor={BOTTLE_FINISH.light} />
            <stop offset=".52" stopColor={BOTTLE_FINISH.liquid} />
            <stop offset=".83" stopColor={BOTTLE_FINISH.liquid} />
            <stop offset="1" stopColor={BOTTLE_FINISH.deep} />
          </linearGradient>
          <linearGradient id={`${id}-depth`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#fff" stopOpacity=".12" />
            <stop offset=".65" stopColor={BOTTLE_FINISH.deep} stopOpacity="0" />
            <stop offset="1" stopColor={BOTTLE_FINISH.deep} stopOpacity=".18" />
          </linearGradient>
          <linearGradient id={`${id}-shine`} x1="0" x2="1">
            <stop stopColor="#fff" stopOpacity="0" />
            <stop offset=".45" stopColor="#fff" stopOpacity=".55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-cap`} x1="0" x2="1">
            <stop stopColor={BOTTLE_FINISH.capDeep} />
            <stop offset=".28" stopColor={BOTTLE_FINISH.capColor} />
            <stop offset=".45" stopColor={BOTTLE_FINISH.capLight} />
            <stop offset=".7" stopColor={BOTTLE_FINISH.capColor} />
            <stop offset="1" stopColor={BOTTLE_FINISH.capDeep} />
          </linearGradient>
          <linearGradient id={`${id}-edge`} x1="0" x2="1">
            <stop stopColor="#8f9ba3" stopOpacity=".5" />
            <stop offset=".35" stopColor="#fff" stopOpacity=".95" />
            <stop offset="1" stopColor="#8f9ba3" stopOpacity=".5" />
          </linearGradient>
          <linearGradient id={`${id}-label`} x1="0" x2="1">
            <stop stopColor="#d6dcdf" />
            <stop offset=".24" stopColor="#fff" />
            <stop offset=".53" stopColor="#fafbfc" />
            <stop offset=".82" stopColor="#edf0f2" />
            <stop offset="1" stopColor="#cbd3d8" />
          </linearGradient>
        </defs>
        <path d={volume.body} fill={paint("glass")} stroke={paint("edge")} strokeWidth="1.2" />
        <g clipPath={paint("body")}>
          <g className="production-liquid" style={{ "--liquid-top": `${liquidTop}px` }}>
            <rect x="20" y="0" width="140" height="340" fill={paint("liquid")} fillOpacity=".42" />
            <rect x="20" y="0" width="140" height="340" fill={paint("depth")} />
            <ellipse cx="90" cy="1" rx="73" ry="4.5" fill={BOTTLE_FINISH.light} fillOpacity=".7" />
            <ellipse cx="90" cy="2.5" rx="73" ry="3.3" fill={BOTTLE_FINISH.liquid} fillOpacity=".42" />
            {[[64, 54, 1.6], [109, 98, 2.2], [81, 151, 1.2], [119, 41, 1.1], [56, 199, 1.6], [99, 219, 1.3]].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#fff" fillOpacity=".24" />
            ))}
          </g>
          {/* The existing brand mark ties the bottle chart to the site's identity. */}
          <path d={`M${side} 177 Q90 182 ${180 - side} 177 L${180 - side} 266 Q90 272 ${side} 266 Z`} fill={paint("label")} stroke="#bcc5cb" strokeOpacity=".32" strokeWidth=".7" />
          <image href={asset("img/logo-black.webp")} x="61" y="188" width="58" height="48" opacity=".88" />
          <path d="M81 244 H99" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
          <text x="90" y="255" textAnchor="middle" fill="#68737c" fontSize="6.3" fontWeight="600" letterSpacing="1.3" fontFamily="var(--font-sans)">НАПИТКИ</text>
          {/* Reflections above the liquid keep the outer shell readable. */}
          <path d={`M${side + 12} 120 Q${side + 4} 208 ${side + 12} 310`} fill="none" stroke={paint("shine")} strokeWidth="15" strokeLinecap="round" />
          <path d={`M${174 - side} 128 L${174 - side} 299`} stroke="#fff" strokeOpacity=".32" strokeWidth="1.4" strokeLinecap="round" />
          <path d={`M${side + 5} 147 L${side + 5} 300`} stroke="#fff" strokeOpacity=".25" strokeWidth=".8" />
          <path d="M80 48 L80 78 Q77 98 64 108" stroke="#fff" strokeOpacity=".82" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M101 50 L101 72" stroke="#fff" strokeOpacity=".65" strokeWidth="1.5" strokeLinecap="round" />
          {isPet && [150, 284, 296].map((y) => (
            <g key={y}>
              <path d={`M${side} ${y} Q90 ${y + 9} ${180 - side} ${y}`} fill="none" stroke={BOTTLE_FINISH.deep} strokeOpacity=".13" strokeWidth="3" />
              <path d={`M${side} ${y - 2} Q90 ${y + 7} ${180 - side} ${y - 2}`} fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth=".8" />
            </g>
          ))}
          <ellipse cx="90" cy="325" rx={87 - side} ry="5" fill="none" stroke="#fff" strokeOpacity=".42" strokeWidth="2.5" />
          {isPet && [65, 90, 115].map((x) => (
            <path key={x} d={`M${x} 328 Q${x - 4} 317 ${x} 307`} fill="none" stroke={BOTTLE_FINISH.deep} strokeOpacity=".3" strokeWidth="2.5" />
          ))}
        </g>
        <path d={volume.body} fill="none" stroke={paint("edge")} strokeWidth="1.3" />
        <rect x={volume.cap.x + 2} y="44" width={volume.cap.width - 4} height="4" rx="1.8" fill={paint("cap")} opacity=".8" />
        <rect {...volume.cap} fill={paint("cap")} />
        {Array.from({ length: 11 }, (_, index) => {
          const x = volume.cap.x + 4 + index * (volume.cap.width - 8) / 10;
          return <path key={index} d={`M${x} ${volume.cap.y + 5} v${volume.cap.height - 8}`} stroke="#fff" strokeOpacity=".19" strokeWidth=".8" />;
        })}
        <path d={`M${volume.cap.x + 5} ${volume.cap.y + 2.5} H${volume.cap.x + volume.cap.width - 5}`} stroke="#fff" strokeOpacity=".48" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Production() {
  const ref = useRef(null);
  const [quarter, setQuarter] = useState(currentQuarter);
  const headingId = useId();

  useEffect(() => {
    const root = ref.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const formats = [...root.querySelectorAll(".production-format")];
    const revealed = new Set();
    const animations = [];
    const context = gsap.context(() => {}, ref);
    const reveal = (element) => {
      if (revealed.has(element)) return;
      revealed.add(element);
      element.classList.add("is-revealed");
      if (media.matches) return;
      context.add(() => {
        animations.push(gsap.fromTo(element,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out", clearProps: "opacity,transform" },
        ));
      });
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === root) {
          inView = entry.isIntersecting;
          if (inView) setQuarter(currentQuarter());
        } else if (entry.isIntersecting) {
          reveal(entry.target);
        }
      }
    }, { threshold: 0.2 });
    observer.observe(root);
    formats.forEach((element) => observer.observe(element));
    const onMotionChange = () => {
      if (media.matches) {
        animations.forEach((animation) => animation.progress(1));
        formats.forEach(reveal);
      }
    };
    if (media.matches) formats.forEach(reveal);
    media.addEventListener("change", onMotionChange);
    const interval = setInterval(() => {
      if (inView && !document.hidden) setQuarter(currentQuarter());
    }, 1000);
    return () => {
      clearInterval(interval);
      observer.disconnect();
      media.removeEventListener("change", onMotionChange);
      context.revert();
      formats.forEach((element) => element.classList.remove("is-revealed"));
    };
  }, []);

  return (
    <section id="production" ref={ref} aria-labelledby={headingId} className="production-section site-section">
      <div className="production-inner site-container">
        <div className="production-eyebrow-row section-label-row">
          <p className="production-eyebrow section-label">Производство в цифрах</p>
          <span className="production-period section-pill">{quarter.label}</span>
        </div>
        <div className="production-heading-row">
          <h2 id={headingId} className="production-heading">
            <span className="production-total">2,6 <span>млн</span></span>{" "}
            <span className="production-heading-unit">бутылок в квартал</span>
          </h2>
          <div className="production-intro">
            <h3 className="production-intro-title font-display text-xl font-bold tracking-tight md:text-2xl">Три формата.<br />Один масштаб.</h3>
            <p className="mt-3 text-base leading-relaxed text-ink-soft md:text-lg">Квартальный план производства напитков в стекле и ПЭТ.</p>
          </div>
        </div>
        <div className="production-formats">
          {VOLUMES.map((volume) => (
            <article key={volume.id} className="production-format" aria-label={`${volume.material} ${volume.size} л`}>
              <div className="production-format-top">
                <h3 className="production-capacity">{volume.size}<span> л</span></h3>
                <span className="production-format-name">{volume.material}</span>
              </div>
              <div className="production-stage">
                <div className="production-halo" aria-hidden="true" />
                <div className="production-shadow" aria-hidden="true" />
                <Bottle volume={volume} progress={quarter.progress} />
              </div>
              <div className="production-format-data">
                <span className="production-data-label">Расчётный объём, бутылок</span>
                <span className="production-count" aria-live="off">{formatNumber(volume.target * quarter.progress)}</span>
                <div className="production-plan"><span>План на квартал</span><strong>{formatNumber(volume.target)}</strong></div>
              </div>
            </article>
          ))}
        </div>
        <div className="production-footnote">
          <span className="production-footnote-symbol" aria-hidden="true">i</span>
          <p>Счётчики показывают расчётный объём с начала квартала при равномерном выполнении плана. Фактический выпуск может отличаться.</p>
        </div>
      </div>
    </section>
  );
}
