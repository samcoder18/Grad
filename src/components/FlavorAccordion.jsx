import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "@phosphor-icons/react";
import { flavors, glassPackaging } from "../data/flavors.js";
import { openOrderModal } from "../lib/order-modal.js";
import "./FlavorAccordion.css";

const COUNT = flavors.length;
const DURATION = 850;
const AUTOPLAY_MS = 4000;

function roleOf(index, active) {
  if (index === active) return "center";
  if (index === (active + COUNT - 1) % COUNT) return "left";
  if (index === (active + 1) % COUNT) return "right";
  return "hidden";
}

export default function FlavorAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [touching, setTouching] = useState(false);
  const sectionRef = useRef(null);
  const touchStart = useRef(null);
  const animationTimer = useRef(null);
  const reduceMotion = useReducedMotion();
  const isPaused = userPaused || hovered || focused || tabHidden || touching;
  const active = flavors[activeIndex];

  const selectFlavor = useCallback((index) => {
    if (animationTimer.current !== null) return;
    setActiveIndex(index);
    animationTimer.current = window.setTimeout(() => {
      animationTimer.current = null;
    }, DURATION);
  }, []);

  const navigate = useCallback((direction) => {
    if (animationTimer.current !== null) return;
    setActiveIndex((previous) => (previous + direction + COUNT) % COUNT);
    animationTimer.current = window.setTimeout(() => {
      animationTimer.current = null;
    }, DURATION);
  }, []);

  useEffect(() => () => window.clearTimeout(animationTimer.current), []);

  // The carousel advances on time alone; page scrolling never drives or pins it.
  useEffect(() => {
    if (reduceMotion || isPaused) return;
    const timer = window.setTimeout(() => navigate(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, reduceMotion, navigate]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.target.closest?.("input, textarea, select, [contenteditable=true]")) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        navigate(event.key === "ArrowRight" ? 1 : -1);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      window.removeEventListener("keydown", onKey);
      if (entry.isIntersecting) window.addEventListener("keydown", onKey);
    }, { threshold: 0.5 });
    if (sectionRef.current) observer.observe(sectionRef.current.querySelector(".flavor-art"));
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [navigate]);

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="flavor-showcase site-section"
      aria-label="Стеклянная линейка: девять характеров одного города"
      aria-roledescription="карусель"
      style={{ "--flavor-color": active.color }}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="site-container">
        <header className="flavor-header section-label-row">
          <h2 className="section-label" aria-label="Стеклянная линейка: девять характеров одного города">Коллекция лимонадов</h2>
          <span className="section-pill">В стекле</span>
        </header>

        <div className="flavor-cinema">
          <div className="flavor-atmosphere" aria-hidden="true">
            {flavors.map((flavor, index) => (
              <div key={flavor.id} className={`flavor-atmosphere__layer${index === activeIndex ? " is-active" : ""}`} style={{ "--scene-color": flavor.color }} />
            ))}
          </div>
          <div className="flavor-story" aria-live={isPaused || reduceMotion ? "polite" : "off"} aria-atomic="true">
            <h3 key={active.id}>{active.name}</h3>
          </div>
          <div
            className="flavor-art"
            onTouchStart={(event) => {
              setTouching(true);
              touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            }}
            onTouchEnd={(event) => {
              setTouching(false);
              if (!touchStart.current) return;
              const dx = event.changedTouches[0].clientX - touchStart.current.x;
              const dy = event.changedTouches[0].clientY - touchStart.current.y;
              touchStart.current = null;
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) navigate(dx < 0 ? 1 : -1);
            }}
            onTouchCancel={() => { setTouching(false); touchStart.current = null; }}
          >
            <div className="flavor-floor" aria-hidden="true" />
            {flavors.map((flavor, index) => {
              const role = roleOf(index, activeIndex);
              const isSide = role === "left" || role === "right";
              return (
                <div key={flavor.id} className={`flavor-bottle flavor-bottle--${role}`} aria-hidden={role !== "center"}>
                  <div className="flavor-bottle__float">
                    <img
                      src={flavor.img}
                      alt={role === "center" ? `Лимонад ${flavor.name} — бутылка с фруктами, льдом и брызгами` : ""}
                      width={941}
                      height={flavor.imageHeight}
                      draggable={false}
                      decoding="async"
                      loading={role === "hidden" ? "lazy" : "eager"}
                      fetchPriority={index === activeIndex ? "high" : "low"}
                    />
                  </div>
                  {isSide && <button type="button" tabIndex={-1} className="flavor-bottle__select" aria-label={`Выбрать вкус ${flavor.name}`} onClick={() => navigate(role === "left" ? -1 : 1)} />}
                </div>
              );
            })}
          </div>
          <div className="flavor-detail">
            <p className="flavor-description">{active.text}</p>
            <button className="flavor-order site-order-button" type="button" onClick={openOrderModal}>
              Оформить заказ <ArrowUpRight size={22} weight="bold" />
            </button>
          </div>
        </div>

        <footer className="flavor-footer">
          <div className="flavor-navigation">
            <div className="flavor-controls">
              <button type="button" className="flavor-arrow" aria-label="Предыдущий вкус" onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
              <span className="flavor-counter"><strong>{String(activeIndex + 1).padStart(2, "0")}</strong><span>/ {String(COUNT).padStart(2, "0")}</span></span>
              <button type="button" className="flavor-arrow" aria-label="Следующий вкус" onClick={() => navigate(1)}><ArrowRight size={24} /></button>
              {!reduceMotion && <button type="button" className="flavor-pause" aria-label={userPaused ? "Включить автопрокрутку" : "Приостановить автопрокрутку"} aria-pressed={userPaused} onClick={() => setUserPaused((previous) => !previous)}>
                {userPaused ? <Play size={20} weight="fill" /> : <Pause size={20} weight="fill" />}
              </button>}
            </div>
            <select className="flavor-choice" aria-label="Выбрать вкус" value="" onChange={(event) => selectFlavor(Number(event.target.value))}>
              <option value="" disabled>Другой вкус</option>
              {flavors.map((flavor, index) => <option key={flavor.id} value={index}>{flavor.name}</option>)}
            </select>
          </div>
          <div className="flavor-packaging">
            <p>{active.packagingSpec ?? glassPackaging.spec}</p>
            <dl>{glassPackaging.pallets.map((pallet) => (
              <div key={pallet.label}><dt>{pallet.label}</dt><dd>{pallet.value}</dd></div>
            ))}</dl>
          </div>
        </footer>
      </div>
    </section>
  );
}
