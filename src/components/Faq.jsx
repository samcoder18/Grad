import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone, Plus, WhatsappLogo } from "@phosphor-icons/react";
import { contacts, docs } from "../data/flavors.js";

const ease = [0.16, 1, 0.3, 1];

const [docVoda, docNapitki, docEgrip, docTm] = docs;

// Ответы основаны на реальных документах: декларации ЕАЭС на воду Gudis
// и напитки «Сладкий Град», свидетельство на товарный знак № 1087731.
// Ответ `a` — строка или массив сегментов: строки — текст,
// объекты { t, href, file } — кликабельные ссылки на документы.
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
    q: "Как оформить заказ?",
    a: "Оставьте заявку через форму на сайте, позвоните или напишите в WhatsApp. Уточним ассортимент и объёмы, вышлем актуальный прайс и условия оплаты, согласуем дату отгрузки.",
  },
  {
    q: "Можно забрать заказ самовывозом?",
    a: "Да. Склад во Владикавказе, Ставропольская улица, 6 — с 10:00 до 17:00. По договорённости загрузим фуру в любое время суток — для крупных машин работаем 24 часа.",
  },
  {
    q: "Где производится продукция?",
    a: "На собственном производстве во Владикавказе: площадки на улице 5-я Промышленная, 2А и Ставропольской, 6. Вода Gudis разливается из природного источника Фанык-Дон в Кобанском ущелье РСО-Алания.",
  },
  {
    q: "Кто производит стеклянные бутылки и как контролируется их качество?",
    a: [
      "Бутылки для нашей продукции производит стекольный завод «Красное Эхо» — один из лидеров российского рынка бесцветной стеклотары с историей с 1875 года. Завод выпускает упаковку объёмом от 50 до 2 000 мл на двух производственных площадках мощностью до 1 млрд условных единиц в год и ежедневно производит, упаковывает и отгружает более 2,5 млн единиц. Производство оснащено современными печами SORG, стеклоформующими машинами ISS10 Sklostroj и Heye SpeedLine, линиями транспортировки и упаковки Zecchetti, а также контрольными автоматами Tiama. Безопасность продукции подтверждена сертификатом BRC с оценкой AA, а система менеджмента ежегодно проходит внешний аудит. Завод самостоятельно изготавливает формокомплекты: качество контролируется после каждой операции, каждая партия чугунных и бронзовых заготовок проходит проверку химического состава, микроструктуры и испытание образцов. Оборудование Mitutoyo обеспечивает точность измерений до 0,0001 мм и проверку плоскости и профиля деталей. На каждый формокомплект выдаются паспорт и сертификат на литьё с результатами физико-химического анализа, данными о микроструктуре и сравнением заданных и фактических геометрических размеров. Подробнее — ",
      {
        t: "о заводе и производстве стеклотары",
        href: "https://red-echo.ru/about/",
      },
      " и ",
      {
        t: "о контроле качества формокомплектов",
        href: "https://red-echo.ru/formokomplekty/kachestvo/",
      },
      ".",
    ],
  },
  {
    q: "Кто производит сиропы и вкусовые основы для напитков?",
    a: [
      "Сиропы и вкусовые основы для наших напитков производит австрийская компания esarom. С 1946 года она разрабатывает ароматизаторы, экстракты, комплексные составы и другие ингредиенты для пищевой промышленности и производства напитков. Сертифицированные процессы, тщательный подбор сырья и регулярные проверки помогают сохранять стабильный вкус от партии к партии. Более 80% продукции esarom поставляется на экспорт, а её решения используют производители напитков в разных странах. Подробнее — ",
      {
        t: "на официальном сайте esarom",
        href: "https://www.esarom.com/ru/",
      },
      ".",
    ],
  },
  {
    q: "Какие документы даёте к поставке?",
    a: [
      "Полный пакет для торговли: УПД, ",
      { t: "декларация соответствия на воду Gudis", ...docVoda },
      " (ТР ЕАЭС 044/2017), ",
      { t: "декларация на напитки «Сладкий Град»", ...docNapitki },
      " (ГОСТ 28188-2014, ТР ТС 021/2011), протоколы испытаний аккредитованных лабораторий. Товарный знак зарегистрирован — ",
      { t: "свидетельство № 1087731", ...docTm },
      ". Реквизиты производителя — в ",
      { t: "листе записи ЕГРИП", ...docEgrip },
      ".",
    ],
  },
  {
    q: "Какой срок годности у продукции?",
    a: "Напитки — 360 суток при температуре от 0 до +25 °C. Вода Gudis — 12 месяцев со дня розлива при температуре от 5 до 20 °C и влажности не более 85%. Условия указаны в декларациях соответствия.",
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

// Плоский текст ответа (для JSON-LD сегменты-ссылки подставляются своим текстом).
const answerText = (a) =>
  Array.isArray(a) ? a.map((s) => (typeof s === "string" ? s : s.t)).join("") : a;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: answerText(item.a) },
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
          className={`min-w-0 flex-1 font-display text-lg font-bold tracking-tight text-balance transition-colors duration-300 md:text-2xl ${
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
              {Array.isArray(item.a)
                ? item.a.map((s, i) =>
                    typeof s === "string" ? (
                      s
                    ) : (
                      <a
                        key={i}
                        href={s.href}
                        download={s.file}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                      >
                        {s.t}
                      </a>
                    ),
                  )
                : item.a}
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
    <section id="faq" className="site-section bg-paper">
      {/* Расширенный сниппет в поисковой выдаче */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-container grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Левая колонка: заголовок + карточка поддержки (sticky на десктопе) */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-5">
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
            <div className="relative mt-6 flex flex-wrap items-center gap-3">
              <a
                href={contacts.phoneHref}
                className="group inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white px-4 py-3.5 text-base font-semibold text-ink transition-all duration-300 hover:bg-paper active:scale-[0.98]"
              >
                <Phone size={18} weight="bold" />
                {contacts.phone}
              </a>
              <a
                href={contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в WhatsApp"
                className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-ink transition-all duration-300 hover:bg-paper active:scale-[0.98]"
              >
                <WhatsappLogo size={22} weight="bold" />
              </a>
            </div>
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
