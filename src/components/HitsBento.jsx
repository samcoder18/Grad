import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { openOrderModal } from "../lib/order-modal.js";
import { hits, hitsPackaging } from "../data/flavors.js";
import "./HitsBento.css";

const ease = [0.16, 1, 0.3, 1];

function ProductCard({ hit, index }) {
  const reduce = useReducedMotion();

  const moveLight = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--light-x", `${50 + x * 18}%`);
    event.currentTarget.style.setProperty("--tilt", `${x * 4}deg`);
    event.currentTarget.style.setProperty("--lift", `${-6 + y * 5}px`);
  };

  const resetLight = (event) => {
    event.currentTarget.style.removeProperty("--light-x");
    event.currentTarget.style.removeProperty("--tilt");
    event.currentTarget.style.removeProperty("--lift");
  };

  return (
    <motion.a
      href="#contacts"
      className={`dolce-card dolce-card--${hit.id}${index < 2 ? " dolce-card--featured" : ""}`}
      style={{ "--drink-color": hit.color }}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.09, ease }}
      onPointerMove={moveLight}
      onPointerLeave={resetLight}
      aria-label={`${hit.name} — ${hit.sizes.join(" и ")}, ПЭТ. Перейти к заказу`}
    >
      <div className="dolce-card__light" aria-hidden="true" />
      <div className="dolce-card__stage">
        <div className="dolce-card__shadow" aria-hidden="true" />
        <img
          className="dolce-card__bottle"
          src={hit.img}
          alt={`Бутылка ${hit.name}, 1 л`}
          width={hit.imageWidth}
          height={hit.imageHeight}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="dolce-card__footer">
        <div className="dolce-card__copy">
          <div className="dolce-card__title">
            <h3>{hit.name}</h3>
            <span className="dolce-card__volume">{hit.id === "cola" ? "1 и 2 л" : "1 л"}</span>
          </div>
          <p className="dolce-card__description">{hit.text}</p>
        </div>
        <span className="dolce-card__arrow" aria-hidden="true"><ArrowUpRight size={21} /></span>
      </div>
    </motion.a>
  );
}

export default function HitsBento() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  // Preserve the section's scroll reveal without pinning the preceding carousel.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.12"],
  });
  const clipBottom = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 0 ${clipBottom}% 0)`;

  return (
    <motion.section ref={sectionRef} id="hits" className="dolce-section site-section" style={reduce ? undefined : { clipPath }} aria-labelledby="dolce-title">
      <div className="dolce-container site-container">
        <div className="section-label-row"><p className="section-label">Линейка Дольче</p><span className="section-pill">В ПЭТ</span></div>
        <div className="dolce-intro">
          <motion.h2
            id="dolce-title"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
          >Dol4e.<br /><span>Больше вкуса.</span></motion.h2>
          <div className="dolce-intro__aside">
            <p>Пять характеров.<br />Для моментов, которые хочется разделить.</p>
          </div>
        </div>

        <div className="dolce-grid">
          {hits.map((hit, index) => <ProductCard key={hit.id} hit={hit} index={index} />)}
        </div>

        <motion.div
          className="dolce-supply"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="dolce-supply__intro">
            <p className="section-label">Для вашего бизнеса</p>
            <h3>Яркая линейка.<br />Большие возможности.</h3>
            <p>Подберём вкусы и объём поставки для вашего магазина, кафе или мероприятия.</p>
          </div>
          <div className="dolce-supply__packaging">
            <p className="dolce-supply__spec">{hitsPackaging.spec}</p>
            <dl>
              {hitsPackaging.pallets.map((pallet) => (
                <div key={pallet.label}>
                  <dt>{pallet.label}</dt>
                  <dd>{pallet.value.split(" · ").map((part, index) => <span key={part}>{part}{index === 0 ? " · " : ""}</span>)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <button type="button" onClick={openOrderModal} className="dolce-supply__order site-order-button">Оформить заказ <ArrowUpRight size={22} /></button>
        </motion.div>
      </div>
    </motion.section>
  );
}
