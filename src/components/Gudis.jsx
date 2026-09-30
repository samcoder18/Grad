import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import { openOrderModal } from "../lib/order-modal.js";
import { asset } from "../lib/asset.js";
import "./Gudis.css";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "glass",
    src: asset("img/gudis-glass.png"),
    alt: "Gudis — негазированная минеральная вода в стеклянной бутылке, 0,5 л",
    format: "0,5 л · стекло",
    type: "Негазированная",
  },
  {
    id: "pet-large",
    src: asset("img/gudis-pet-1l.png"),
    alt: "Гудис — газированная минеральная вода в ПЭТ-бутылке, 1 л",
    format: "1 л · ПЭТ",
    type: "Газированная",
  },
  {
    id: "pet-small",
    src: asset("img/gudis-pet-05l.png"),
    alt: "Gudis — газированная минеральная вода в ПЭТ-бутылке, 0,5 л",
    format: "0,5 л · ПЭТ",
    type: "Газированная",
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
};

export default function Gudis() {
  const ref = useRef(null);

  useEffect(() => {
    const section = ref.current;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        section.querySelectorAll(".gudis-reveal"),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: section.querySelector(".gudis-intro"), start: "top 78%", once: true },
        },
      );
      // Keep the existing scroll-driven bottle entrance and exit. Animate the
      // inner image so its effect does not move the figure's label or layout.
      section.querySelectorAll(".gudis-img").forEach((img) => {
        const stage = img.closest(".gudis-product__stage");
        gsap.fromTo(img, { scale: 0.82, opacity: 0.25 }, {
          scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: stage, start: "top 92%", end: "top 38%", scrub: true },
        });
        gsap.to(img, {
          scale: 0.9, opacity: 0.15, ease: "none",
          scrollTrigger: { trigger: stage, start: "bottom 22%", end: "bottom -18%", scrub: true },
        });
      });
    });
    let disposed = false;
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      disposed = true;
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section id="gudis" ref={ref} className="gudis-section site-section" aria-labelledby="gudis-title">
      <div className="site-container">
        <header className="section-label-row">
          <p className="section-label">Природная минеральная вода</p>
          <span className="section-pill">Северный Кавказ</span>
        </header>

        <div className="gudis-intro">
          <h2 id="gudis-title" className="gudis-reveal">Gudis.<br /><span>Вода Центрального Кавказа</span></h2>
          <p className="gudis-reveal">Из горного источника — к вашему столу. Природная минеральная вода с мягким вкусом на каждый день.</p>
        </div>

        <div className="gudis-showcase">
          <div className="gudis-showcase__light" aria-hidden="true" />
          <div className="gudis-products">
            {products.map((product) => (
              <figure key={product.id} className={`gudis-product gudis-product--${product.id}`}>
                <div className="gudis-product__stage">
                  <div className="gudis-product__shadow" aria-hidden="true" />
                  <img className="gudis-img" src={product.src} alt={product.alt} width={1086} height={1448} loading="lazy" decoding="async" draggable={false} />
                </div>
                <figcaption>
                  <h3>{product.format}</h3>
                  <p>{product.type}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="gudis-showcase__footer">
            <p>Для красивой сервировки.<br />Для простых моментов.</p>
            <button type="button" onClick={openOrderModal} className="site-order-button">Оформить заказ <ArrowUpRight size={22} weight="bold" /></button>
          </div>
        </div>

        <div className="gudis-composition">
          <div className="gudis-composition__intro">
            <h3>Состав газированной воды</h3>
            <p>{composition.subtitle}</p>
            <div className="gudis-mineralization">
              <span>0,2–0,5 <span>г/л</span></span>
              <p>Общая минерализация</p>
            </div>
          </div>
          <div className="gudis-composition__tables">
            {composition.groups.map((group) => (
              <div key={group.label} className="gudis-minerals">
                <h4>{group.label}</h4>
                <dl>{group.rows.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
              </div>
            ))}
            <p className="gudis-hardness">Общая жёсткость <strong>&lt;3,4 мг/л</strong></p>
          </div>
          <p className="gudis-source">Источник «ФаныкДон» · Кобанское ущелье, Пригородный район, Северная Осетия — Алания.</p>
        </div>
      </div>
    </section>
  );
}
