import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Phone, EnvelopeSimple } from "@phosphor-icons/react";
import { openOrderModal } from "../lib/order-modal.js";
import { contacts } from "../data/flavors.js";
import { asset } from "../lib/asset.js";

export default function Cta() {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  // Fruit entrance: drops straight from the top edge of the device
  // screen, hits the bottom of the panel once with a squash, rebounds
  // a single time and lands in the bottom of the block. No decaying
  // bounce series, no idle drift afterwards. Triggered by the panel's
  // own visibility (useInView): a per-fruit whileInView would measure
  // the already-translated box, which sits above the viewport at the
  // start of the fall and can never intersect.
  const fall = {
    hidden: { y: "-130vh", opacity: 0, rotate: -10, scaleY: 1 },
    shown: (delay) => ({
      y: ["-130vh", "0vh", "-12vh", "0vh", "0vh"],
      opacity: [0, 1, 1, 1, 1],
      rotate: [-10, 0, 0, 0, 0],
      scaleY: [1, 0.85, 1.06, 0.93, 1],
      transition: {
        duration: 1.4,
        delay,
        times: [0, 0.5, 0.72, 0.88, 1],
        ease: ["easeIn", "easeOut", "easeIn", "easeOut"],
      },
    }),
  };

  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, amount: 0.3 });

  return (
    <section id="contacts" className="relative px-4 py-16 sm:px-6 md:py-24">
      <div ref={panelRef} className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-brand px-6 py-20 text-white md:px-16 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50rem 26rem at 90% 0%, rgba(255,255,255,0.16), transparent 55%), radial-gradient(44rem 24rem at 0% 100%, rgba(179,18,42,0.55), transparent 60%)",
          }}
        />

        <div className="relative">
          <motion.h2
            {...rise(0)}
            className="max-w-4xl font-display text-3xl font-bold tracking-tight text-balance md:text-6xl"
          >
            Привезём вам Сладкий Град
          </motion.h2>
          <motion.p
            {...rise(0.1)}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-white/85 md:text-xl"
          >
            Опт от 50 ₽ за бутылку. Расскажите о вашей задаче, и мы предложим
            условия для магазина, кафе или мероприятия.
          </motion.p>

          <motion.div {...rise(0.2)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={openOrderModal}
              className="group flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand transition-all duration-300 hover:bg-paper active:scale-[0.98] sm:inline-flex"
            >
              Оформить заказ
              <ArrowUpRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <a
              href={contacts.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-white active:scale-[0.98] sm:inline-flex"
            >
              <Phone size={18} weight="bold" />
              {contacts.phone}
            </a>
          </motion.div>

          <motion.a
            {...rise(0.3)}
            href={`mailto:${contacts.email}`}
            className="mt-8 inline-flex items-center gap-2 text-base text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            <EnvelopeSimple size={18} weight="bold" />
            {contacts.email}
          </motion.a>
        </div>
      </div>

      {/* 3D decorations overlay: matches the panel's geometry but is NOT
          clipped by its overflow-hidden, so the bolt can straddle the
          red/white seam and the fruits can dive in from above the screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-16 bottom-16 mx-auto max-w-7xl sm:inset-x-6 md:top-24 md:bottom-24"
      >
        {/* Bolt: enlarged, tilted harder, sitting on the top seam */}
        <div className="absolute -top-10 right-[2%] hidden rotate-[14deg] sm:block md:-top-14 md:right-[3%]">
          <img
            src={asset("img/deco-bolt.webp")}
            alt=""
            className="w-24 animate-float drop-shadow-[0_22px_28px_rgba(11,47,74,0.3)] md:w-36 lg:w-44"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
        {/* Cloud: hovers at the opposite top edge */}
        <img
          src={asset("img/deco-cloud.webp")}
          alt=""
          className="absolute top-[1%] left-[1%] hidden w-20 animate-float drop-shadow-[0_20px_28px_rgba(11,47,74,0.28)] sm:block md:w-24 lg:w-28"
          style={{ animationDelay: "1.2s" }}
        />
        {/* Fruits: drop from the top of the screen, bounce once, land
            along the bottom of the block */}
        <motion.div
          className="absolute bottom-[6%] left-[30%] hidden w-24 origin-bottom sm:block md:w-32 lg:w-40"
          variants={fall}
          custom={0.1}
          initial={reduce ? false : "hidden"}
          animate={panelInView ? "shown" : "hidden"}
        >
          <img
            src={asset("img/deco-orange.webp")}
            alt=""
            className="w-full drop-shadow-[0_18px_24px_rgba(11,47,74,0.28)]"
          />
        </motion.div>
        <motion.div
          className="absolute right-[24%] bottom-[3%] hidden w-20 origin-bottom sm:block md:w-28 lg:w-32"
          variants={fall}
          custom={0.35}
          initial={reduce ? false : "hidden"}
          animate={panelInView ? "shown" : "hidden"}
        >
          <img
            src={asset("img/deco-lemon.webp")}
            alt=""
            className="w-full drop-shadow-[0_16px_22px_rgba(11,47,74,0.26)]"
          />
        </motion.div>
        <motion.div
          className="absolute right-[6%] bottom-[9%] hidden w-16 origin-bottom sm:block md:w-20 lg:w-24"
          variants={fall}
          custom={0.6}
          initial={reduce ? false : "hidden"}
          animate={panelInView ? "shown" : "hidden"}
        >
          <img
            src={asset("img/deco-strawberry.webp")}
            alt=""
            className="w-full drop-shadow-[0_14px_20px_rgba(11,47,74,0.24)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
