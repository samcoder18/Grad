import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Phone, Plus } from "@phosphor-icons/react";
import { contacts } from "../data/flavors.js";

const ease = [0.16, 1, 0.3, 1];

// Ответы основаны на реальных документах: декларации ЕАЭС на воду Gudis
// и напитки «Сладкий Град», свидетельство на товарный знак № 1087731.
const faq = [
  {
    q: "Какой минимальный заказ?",
    a: "От одной упаковки: стекло 0,5 л — 12 бутылок, литровый ПЭТ — 9 бутылок. Для крупных поставок отгружаем паллетами: европоддон — 90 упаковок стекла (1 080 бутылок) или 75 упаковок ПЭТ (675 бутылок), большой поддон — 110 упаковок стекла (1 320 бутылок) или 100 упаковок ПЭТ (900 бутылок).",
  },
  {
    q: "Какие сроки отгрузки?",
    a: "Ходовые позиции всегда в наличии на складе во Владикавказе. Самовывоз — с 10:00 до 17:00, по договорённости загружаем фуры круглосуточно. По России и СНГ отправляем транспортными компаниями.",
  },
  {
    q: "Работаете с новыми клиентами?",
    a: "Да — с дистрибьюторами, магазинами, кафе и организаторами мероприятий. Начать можно с малой партии, от одной упаковки: проверите спрос на своей точке без риска и затем масштабируйте заказ.",
  },
  {
    q: "Можно забрать заказ самовывозом?",
    a: "Да. Склад во Владикавказе, Ставропольская улица, 6 — с 10:00 до 17:00. По договорённости загрузим фуру в любое время суток — для крупных машин работаем 24 часа.",
  },
  {
    q: "Какие документы даёте к поставке?",
    a: "Полный пакет для торговли: УПД, декларации соответствия ЕАЭС на всю продукцию (вода Gudis — по ТР ЕАЭС 044/2017, напитки — по ГОСТ 28188-2014 и ТР ТС 021/2011), протоколы испытаний аккредитованных лабораторий. Товарный знак зарегистрирован — свидетельство № 1087731.",
  },
  {
    q: "Возможен эксклюзив по региону?",
    a: "Обсуждаем индивидуально: при подтверждённых объёмах закупок готовы закрепить регион за партнёром. Позвоните — обсудим условия под вашу территорию.",
  },
  {
    q: "Можно попробовать продукцию перед заказом?",
    a: "Конечно. Пришлём дегустационные образцы с ближайшей отгрузкой или приезжайте на дегустацию на производство во Владикавказе — заодно покажем линию розлива.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function FaqItem({ item, index, isOpen, onToggle, reduce }) {
  const panelId = `faq-panel-${index}`;
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease }}
      className="border-b border-line"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-7"
      >
        <span
          className="hidden font-display text-sm font-bold text-ink/30 sm:block"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`flex-1 font-display text-lg font-bold tracking-tight text-balance transition-colors duration-300 md:text-2xl ${
            isOpen ? "text-brand" : "text-ink group-hover:text-brand"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "rotate-45 border-brand bg-brand text-white"
              : "border-line text-ink group-hover:border-brand group-hover:text-brand"
          }`}
        >
          <Plus size={20} weight="bold" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] pb-7 text-base leading-relaxed text-ink-soft sm:pl-[3.25rem] md:pl-[4.25rem]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function Faq() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-paper px-4 py-24 sm:px-6 md:py-36">
      {/* Расширенный сниппет в поисковой выдаче */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Левая колонка: заголовок + карточка поддержки (sticky на десктопе) */}
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease }}
            className="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase"
          >
            Вопросы и ответы
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl"
          >
            Всё, что нужно знать перед первым заказом
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft"
          >
            Собрали ответы на вопросы, которые оптовики задают чаще всего.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="relative mt-10 overflow-hidden rounded-[28px] bg-ink p-7 text-white md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(22rem 14rem at 90% 0%, rgba(217,30,54,0.28), transparent 60%)",
              }}
            />
            <p className="relative font-display text-xl font-bold tracking-tight md:text-2xl">
              Остался вопрос?
            </p>
            <p className="relative mt-2.5 max-w-[32ch] text-base leading-relaxed text-white/75">
              Позвоните — поможем с ассортиментом, условиями и логистикой под
              вашу точку.
            </p>
            <a
              href={contacts.phoneHref}
              className="group relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-ink transition-all duration-300 hover:bg-paper active:scale-[0.98]"
            >
              <Phone size={18} weight="bold" />
              {contacts.phone}
              <ArrowUpRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* Правая колонка: аккордеон */}
        <ul className="border-t border-line lg:col-span-7">
          {faq.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              reduce={reduce}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
