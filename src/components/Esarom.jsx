import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1];

const advantages = [
  {
    number: "01",
    title: "80 лет экспертизы",
    text: "esarom работает со вкусами с 1946 года и много десятилетий специализируется на решениях для безалкогольных напитков.",
  },
  {
    number: "02",
    title: "Стабильное качество",
    text: "Сертифицированные процессы, ответственный подбор ингредиентов и регулярные проверки помогают сохранять вкус от партии к партии.",
  },
  {
    number: "03",
    title: "Международный опыт",
    text: "Более 80% продукции компании идёт на экспорт — её вкусовые решения используют производители в разных странах мира.",
  },
];

export default function Esarom() {
  const reduce = useReducedMotion();

  return (
    <section
      id="esarom"
      aria-labelledby="esarom-title"
      className="site-section bg-paper"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="site-container relative overflow-hidden rounded-[28px] bg-ink px-6 py-8 text-white sm:px-9 sm:py-10 md:px-12 md:py-14 lg:px-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(38rem 26rem at 5% 0%, rgba(217,30,54,0.36), transparent 64%), radial-gradient(30rem 24rem at 100% 100%, rgba(242,109,27,0.20), transparent 68%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -bottom-10 font-display text-[5.5rem] leading-none font-bold tracking-[-0.08em] text-white/[0.035] select-none sm:text-[8rem] md:text-[11rem]"
        >
          esarom
        </div>

        <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/55 uppercase">
              Основа вкуса
            </p>
            <h2
              id="esarom-title"
              className="mt-4 max-w-[15ch] font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
            >
              В наших напитках — вкусовые основы{" "}
              <span className="inline-block rounded-[0.28em] bg-gradient-to-r from-brand to-orange px-[0.18em] pb-[0.04em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_14px_38px_-20px_rgba(242,109,27,0.95)]">
                esarom
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-[52ch] text-base leading-relaxed text-white/72 md:text-lg">
              Мы выбрали австрийского производителя ароматизаторов, экстрактов
              и комплексных составов для напитков — чтобы любимый вкус оставался
              узнаваемым в каждой бутылке.
            </p>
            <a
              href="https://www.esarom.com/ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex w-fit items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-orange"
            >
              О производителе esarom
              <ArrowUpRight
                size={17}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <ol className="relative mt-10 grid border-t border-white/15 sm:grid-cols-3 md:mt-12">
          {advantages.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: index * 0.1, ease }}
              className="border-b border-white/15 py-6 last:border-b-0 sm:border-r sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0 md:py-8"
            >
              <span className="font-display text-xs font-bold tracking-[0.14em] text-brand">
                {item.number}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold tracking-tight md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/62 md:text-base">
                {item.text}
              </p>
            </motion.li>
          ))}
        </ol>

        <p className="relative mt-5 text-xs leading-relaxed text-white/65">
          Факты о компании — по данным официального сайта esarom.
        </p>
      </motion.div>
    </section>
  );
}
