# Виртуальный «Офис компании» — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить на лендинг «Сладкий Град» полноэкранную витрину виртуального офиса (9 разделов в 3 группах) с сценарными мини-демо на мок-данных.

**Architecture:** View-switch на состоянии React (`view: 'landing' | 'office'` в `App.jsx`), офис подгружается через `React.lazy`. Каркас `OfficeShell` (тёмный сайдбар + светлый контент) строится из реестра `modules.js`; все данные — в `src/data/office.js`. Глобального стора и роутера нет.

**Tech Stack:** Vite 6, React 19, Tailwind CSS 4 (токены из `src/index.css`: `paper`, `ink`, `ink-soft`, `line`, `brand`, `brand-deep`, `font-display`), `motion` (импорт из `motion/react`), `@phosphor-icons/react`.

**Тестирование:** тестового раннера в проекте нет и не добавляем (решение из спеки). Проверка каждой задачи — синтаксис-чек файла через `npx esbuild <file> > /dev/null` (esbuild уже есть в `node_modules` как зависимость Vite; без `--bundle` он только трансформирует и падает с ненулевым кодом при синтаксической ошибке). Финальная приёмка — `npm run build` + ручной smoke-прогон (Task 12).

**Коммиты:** в проекте нет git-репозитория. Task 0 инициализирует его — требует подтверждения пользователя. Если пользователь не подтвердил, все шаги «Commit» пропускаются.

**Spec:** `docs/superpowers/specs/2026-08-16-virtual-office-design.md`

---

### Task 0: Инициализация git (опционально, с подтверждения пользователя)

- [ ] **Step 1: Спросить у пользователя разрешение на `git init`**

Если «да»:

```bash
cd /Users/albina/grad
git init
git add -A
git commit -m "chore: baseline before virtual office"
```

Expected: создаётся репозиторий, baseline закоммичен.

Если «нет» — пропустить задачу и все последующие шаги «Commit».

---

### Task 1: Мок-данные `src/data/office.js`

**Files:**
- Create: `src/data/office.js`

- [ ] **Step 1: Создать файл с полным содержимым**

```js
// Mock data for the virtual office. Single source of truth for all modules.

export const leadership = [
  {
    id: "ceo",
    name: "Марина Соколова",
    role: "Генеральный директор",
    area: "Стратегия, ключевые партнёрства, развитие бренда",
    greeting: "Здравствуйте! Отвечу на вопросы о стратегии и партнёрстве.",
    fallback: "Спасибо за вопрос! Передам профильным коллегам и вернусь с ответом до конца дня.",
  },
  {
    id: "coo",
    name: "Дмитрий Градов",
    role: "Операционный директор",
    area: "Производство, логистика, качество продукции",
    greeting: "Привет! Спрашивайте про производство и поставки.",
    fallback: "Принял! Уточню у производства и отвечу.",
  },
  {
    id: "cbdo",
    name: "Алёна Кремлёва",
    role: "Коммерческий директор",
    area: "Продажи, партнёрская сеть, маркетинг",
    greeting: "Добрый день! Помогу с условиями сотрудничества.",
    fallback: "Записала! Подготовлю цифры и вернусь к вам.",
  },
];

export const departments = {
  sales: {
    id: "sales",
    name: "Отдел продаж",
    description: "Оптовые продажи, работа с дистрибьюторами и ключевыми клиентами.",
    kpis: [
      { label: "План месяца", value: "12,4 млн ₽" },
      { label: "Выполнение", value: "87%" },
      { label: "Активных сделок", value: "23" },
    ],
    staff: [
      { name: "Игорь Сластёнов", role: "Руководитель отдела" },
      { name: "Ольга Медовая", role: "Ключевой менеджер" },
      { name: "Тимур Вафельский", role: "Менеджер по опту" },
      { name: "Соня Карамель", role: "Менеджер по тендерам" },
    ],
    tasks: [
      { title: "Квартальное предложение для сети «Вкусно»", done: true },
      { title: "Повторный звонок дистрибьютору «Сласти-Опт»", done: true },
      { title: "Тендер: поставка в школы района", done: false },
      { title: "Апсейл мармелада партнёрам Юга", done: false },
    ],
    widget: {
      type: "funnel",
      title: "Воронка продаж",
      stages: [
        { label: "Лиды", value: 48 },
        { label: "Переговоры", value: 23 },
        { label: "Счёт выставлен", value: 11 },
        { label: "Оплата", value: 6 },
      ],
    },
  },
  finance: {
    id: "finance",
    name: "Финансовый отдел",
    description: "Бюджет, оплаты, финансовое планирование и отчётность.",
    kpis: [
      { label: "Оборот месяца", value: "14,1 млн ₽" },
      { label: "Дебиторская задолженность", value: "2,3 млн ₽" },
      { label: "Платежей сегодня", value: "17" },
    ],
    staff: [
      { name: "Анна Рублёва", role: "Финансовый директор" },
      { name: "Пётр Копейкин", role: "Старший бухгалтер" },
      { name: "Лев Счетов", role: "Финансовый аналитик" },
    ],
    tasks: [
      { title: "Сверка с «Сласти-Опт»", done: true },
      { title: "Платёжный календарь на сентябрь", done: true },
      { title: "Отчёт по маржинальности линейки Gudis", done: false },
      { title: "Закрытие месяца: акты и счета-фактуры", done: false },
    ],
    widget: {
      type: "payments",
      title: "График оплат",
      rows: [
        { label: "Сеть «Вкусно»", date: "18 авг", amount: "+1 240 000 ₽", incoming: true },
        { label: "Поставщик сахара «Юг»", date: "19 авг", amount: "−380 000 ₽", incoming: false },
        { label: "Кофейня «Брауни»", date: "21 авг", amount: "+96 000 ₽", incoming: true },
        { label: "Логистика «Атлас»", date: "22 авг", amount: "−74 500 ₽", incoming: false },
      ],
    },
  },
  finadmin: {
    id: "finadmin",
    name: "Финансово-административный отдел",
    description: "Документооборот, договоры, кадровое администрирование.",
    kpis: [
      { label: "Договоров в работе", value: "14" },
      { label: "На подписании", value: "5" },
      { label: "Просроченных", value: "0" },
    ],
    staff: [
      { name: "Вера Договорова", role: "Руководитель отдела" },
      { name: "Максим Печаткин", role: "Юрист" },
      { name: "Инна Архивова", role: "Делопроизводитель" },
    ],
    tasks: [
      { title: "Реестр договоров за июль", done: true },
      { title: "Шаблон допсоглашения v3", done: true },
      { title: "Архивация первичных документов Q2", done: false },
      { title: "Обновление доверенностей менеджеров", done: false },
    ],
    widget: {
      type: "documents",
      title: "Реестр документов",
      docs: [
        { name: "Договор поставки № 114/08", status: "pending" },
        { name: "Договор поставки № 109/07", status: "signed" },
        { name: "Допсоглашение № 12 к договору № 87/05", status: "signed" },
        { name: "Акт сверки «Сласти-Опт»", status: "draft" },
      ],
    },
  },
};

export const deals = [
  {
    id: "d1",
    company: "Сеть «Вкусно»",
    kind: "Заказчик",
    amount: "1 240 000 ₽",
    stage: 2,
    stages: ["Лид", "Переговоры", "Счёт выставлен", "Оплата", "Отгрузка"],
    messages: [
      { from: "them", text: "Добрый день! Интересует прайс на мармеладную линейку." },
      { from: "me", text: "Здравствуйте! Отправил прайс и условия на отсрочку платежа." },
      { from: "them", text: "Спасибо. Готовы обсудить объём 400 коробов в месяц." },
    ],
    suggestions: [
      "Предложить скидку 7% при объёме от 500 коробов",
      "Запросить реквизиты для счёта",
    ],
    replies: {
      "Предложить скидку 7% при объёме от 500 коробов": "Хорошо, берём 500. Выставляйте счёт.",
      "Запросить реквизиты для счёта": "Отправили реквизиты на почту, ждём счёт.",
    },
    fallback: "Принято, обсудим внутри и вернёмся с ответом.",
  },
  {
    id: "d2",
    company: "Дистрибьютор «Сласти-Опт»",
    kind: "Партнёр",
    amount: "2 100 000 ₽",
    stage: 3,
    stages: ["Лид", "Переговоры", "Счёт выставлен", "Оплата", "Отгрузка"],
    messages: [
      { from: "them", text: "Оплатили счёт № 87. Когда отгрузка?" },
      { from: "me", text: "Видим оплату! Резервируем партию, отгрузка в четверг." },
    ],
    suggestions: [
      "Отправить график отгрузок на сентябрь",
      "Обсудить маркетинговый бюджет Q4",
    ],
    replies: {
      "Отправить график отгрузок на сентябрь": "Получили, всё сходится. Спасибо!",
      "Обсудить маркетинговый бюджет Q4": "Готовы выделить 150 тыс. при плане 2,5 млн.",
    },
    fallback: "Хорошо, зафиксировали.",
  },
  {
    id: "d3",
    company: "Кофейня «Брауни»",
    kind: "Заказчик",
    amount: "96 000 ₽",
    stage: 1,
    stages: ["Лид", "Переговоры", "Счёт выставлен", "Оплата", "Отгрузка"],
    messages: [
      { from: "them", text: "Хотим поставить ваши конфеты к кофе. Есть мини-формат?" },
      { from: "me", text: "Да! Есть порционная линейка по 8 г, идеально к капучино." },
    ],
    suggestions: [
      "Отправить образцы порционной линейки",
      "Предложить стартовый набор для кофеен",
    ],
    replies: {
      "Отправить образцы порционной линейки": "Супер, ждём образцы к пятнице.",
      "Предложить стартовый набор для кофеен": "Интересно, пришлите состав набора и цену.",
    },
    fallback: "Ок, ждём деталей.",
  },
];

export const contracts = [
  {
    id: "c1",
    number: "№ 114/08",
    party: "Сеть «Вкусно»",
    subject: "Поставка кондитерских изделий, август–декабрь 2026",
    amount: "6 200 000 ₽",
    status: "pending",
  },
  {
    id: "c2",
    number: "№ 109/07",
    party: "Дистрибьютор «Сласти-Опт»",
    subject: "Дистрибьюторское соглашение, 2026–2027",
    amount: "3 800 000 ₽",
    status: "signed",
  },
  {
    id: "c3",
    number: "№ 115/08",
    party: "Кофейня «Брауни»",
    subject: "Разовая поставка порционной линейки",
    amount: "640 000 ₽",
    status: "draft",
  },
];

export const signSteps = [
  { id: "check", title: "Проверка сертификата", detail: "Сертификат ключа действителен до 12.03.2027" },
  { id: "sign", title: "Подписание документа", detail: "Формируется подпись ГОСТ Р 34.10-2012" },
  { id: "send", title: "Отправка контрагенту", detail: "Подписанный файл направлен контрагенту" },
];

export const MOCK_SIGNATURE_HASH = "5D3F A912 C0E8 44B7";

export const coldCallScript = [
  {
    client: "Алло, магазин «Продукты у дома», слушаю.",
    options: [
      { text: "Мы производим конфеты, хотите прайс?", quality: "ok", feedback: "Нормально, но это продажа «в лоб». Сначала — польза для клиента." },
      { text: "Здравствуйте! Мы «Сладкий Град» — помогаем магазинам у дома поднимать средний чек за счёт импульсной полки. Удобно минута?", quality: "best", feedback: "Отлично: конкретная польза для клиента и запрос разрешения говорить." },
      { text: "А вы уже продаёте конфеты? У нас дешевле.", quality: "bad", feedback: "Давление на цену и спор — клиент закроется сразу." },
    ],
  },
  {
    client: "Ну, у нас уже есть поставщик сладкого.",
    options: [
      { text: "Отлично, значит полка уже работает! Менять поставщика не просим — предлагаю тестовую партию вкусов, которых у него нет.", quality: "best", feedback: "Верно: возражение принято, конфликта нет, оффер снимает риск." },
      { text: "Понял. А что вам нравится в текущем поставщике?", quality: "ok", feedback: "Хороший уточняющий вопрос, но ценность нашего предложения так и не прозвучала." },
      { text: "Все так говорят, а потом берут у нас.", quality: "bad", feedback: "Звучит как спор и обесценивает позицию клиента." },
    ],
  },
  {
    client: "Сколько стоит? Если дорого — не интересно.",
    options: [
      { text: "Короб — от 240 ₽, но правильно считать по марже с полки. Покажу расчёт на ваших цифрах?", quality: "best", feedback: "Точно: перевод разговора с цены на маржу клиента + переход к следующему шагу." },
      { text: "Дешевле, чем у большинства конкурентов.", quality: "ok", feedback: "Нормально, но голословно: нет цифр и следующего шага." },
      { text: "Цена — не главное, просто берите!", quality: "bad", feedback: "Давление без аргументов разрушает доверие." },
    ],
  },
  {
    client: "Ладно, что дальше?",
    options: [
      { text: "Предлагаю пилот: 20 коробов, отсрочка 14 дней, возврат неликвида. Отправить коммерческое предложение в WhatsApp?", quality: "best", feedback: "Идеальное закрытие: конкретный пилот со снятием рисков и понятный следующий шаг." },
      { text: "Скину прайс, посмотрите на досуге.", quality: "ok", feedback: "Пассивное закрытие: сделка оставлена на произвол судьбы." },
      { text: "Я вам как-нибудь перезвоню.", quality: "bad", feedback: "Размытый следующий шаг почти всегда означает потерю сделки." },
    ],
  },
];

export const partners = [
  { id: "p1", name: "Сласти-Опт", region: "Москва и область", volume: "2,1 млн ₽/мес", status: "active" },
  { id: "p2", name: "Южный Батончик", region: "Краснодар и юг", volume: "1,1 млн ₽/мес", status: "active" },
  { id: "p3", name: "Волга-Свит", region: "Нижний Новгород и Поволжье", volume: "1,4 млн ₽/мес", status: "growth" },
  { id: "p4", name: "Сибирские Сласти", region: "Новосибирск и Сибирь", volume: "980 тыс ₽/мес", status: "growth" },
  { id: "p5", name: "Урал-Канди", region: "Екатеринбург и Урал", volume: "760 тыс ₽/мес", status: "pause" },
];

export const partnerStatuses = {
  active: { label: "Активный", tone: "green" },
  growth: { label: "Растёт", tone: "brand" },
  pause: { label: "Пауза", tone: "amber" },
};

export const tickets = [
  {
    id: "t1",
    client: "Анна, кофейня «Латте»",
    channel: "Мессенджер",
    topic: "Сроки поставки заказа № 4821",
    messages: [
      { from: "them", text: "Здравствуйте! Когда привезут заказ № 4821?" },
      { from: "me", text: "Добрый день! Проверяю статус, минуту." },
    ],
    suggestions: ["Подтвердить дату: 19 августа", "Предложить замену позиции"],
    replies: {
      "Подтвердить дату: 19 августа": "Спасибо, ждём!",
      "Предложить замену позиции": "Давайте замену, пришлите список.",
    },
    fallback: "Хорошо, спасибо!",
  },
  {
    id: "t2",
    client: "Сергей, магазин «У дома»",
    channel: "Почта",
    topic: "Претензия по браку партии № 4770",
    messages: [
      { from: "them", text: "В партии № 4770 нашли 6 коробов с повреждённой упаковкой." },
      { from: "me", text: "Сергей, приносим извинения! Оформляю замену." },
    ],
    suggestions: ["Отправить акт замены сегодня", "Предложить скидку 3% на следующий заказ"],
    replies: {
      "Отправить акт замены сегодня": "Получил акт, спасибо за скорость.",
      "Предложить скидку 3% на следующий заказ": "Принято, так и сделаем.",
    },
    fallback: "Спасибо за оперативность.",
  },
  {
    id: "t3",
    client: "Ольга, кофейня «Мокко»",
    channel: "Звонок",
    topic: "Подключение к программе лояльности",
    messages: [
      { from: "them", text: "Как подключиться к вашей программе лояльности?" },
      { from: "me", text: "Всё просто: договор и первый заказ от 50 коробов." },
    ],
    suggestions: ["Выслать памятку партнёра", "Записать на встречу с менеджером"],
    replies: {
      "Выслать памятку партнёра": "Получила, изучу и отвечу завтра.",
      "Записать на встречу с менеджером": "Удобно в четверг после 12:00.",
    },
    fallback: "Отлично, жду документы!",
  },
];
```

- [ ] **Step 2: Синтаксис-чек**

Run: `npx esbuild src/data/office.js > /dev/null`
Expected: exit 0, без вывода.

- [ ] **Step 3: Commit (если инициализирован git)**

```bash
git add src/data/office.js
git commit -m "feat(office): add mock data for virtual office"
```

---

### Task 2: Общие UI-компоненты `src/components/office/ui.jsx`

**Files:**
- Create: `src/components/office/ui.jsx`

- [ ] **Step 1: Создать файл с полным содержимым**

```jsx
import { useState } from "react";
import { motion } from "motion/react";
import { PaperPlaneRight } from "@phosphor-icons/react";

// Document/deal statuses shared by Department and Contracts.
export const DOC_STATUS = {
  draft: { label: "Черновик", tone: "neutral" },
  pending: { label: "На подписании", tone: "amber" },
  signed: { label: "Подписан", tone: "green" },
};

export function Avatar({ name, className = "" }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-ink font-display font-semibold text-white ${className}`}
    >
      {initials}
    </div>
  );
}

export function Card({ className = "", children }) {
  return (
    <div className={`rounded-[28px] border border-line bg-white ${className}`}>
      {children}
    </div>
  );
}

export function StatusPill({ tone = "neutral", children }) {
  const tones = {
    neutral: "border-line bg-paper text-ink-soft",
    brand: "border-brand/20 bg-brand/10 text-brand",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function PageTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
    </div>
  );
}

// Mock chat: suggestion click appends a "me" message and schedules an
// auto-reply. Parent resets state by remounting with a different `key`.
export function ChatWidget({ initialMessages, suggestions = [], replies = {}, fallbackReply }) {
  const [messages, setMessages] = useState(initialMessages);
  const [used, setUsed] = useState([]);

  const send = (text) => {
    setMessages((m) => [...m, { from: "me", text }]);
    setUsed((u) => [...u, text]);
    const answer = replies[text] ?? fallbackReply;
    if (answer) {
      window.setTimeout(() => {
        setMessages((m) => [...m, { from: "them", text: answer }]);
      }, 900);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              msg.from === "me" ? "ml-auto bg-brand text-white" : "bg-paper text-ink"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions
            .filter((s) => !used.includes(s))
            .map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <PaperPlaneRight size={14} weight="bold" />
                {s}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Синтаксис-чек**

Run: `npx esbuild src/components/office/ui.jsx > /dev/null`
Expected: exit 0, без вывода.

- [ ] **Step 3: Commit (если инициализирован git)**

```bash
git add src/components/office/ui.jsx
git commit -m "feat(office): add shared ui components"
```

---

### Task 3: Модуль «Руководство» `src/components/office/Leadership.jsx`

**Files:**
- Create: `src/components/office/Leadership.jsx`

- [ ] **Step 1: Создать файл с полным содержимым**

```jsx
import { useState } from "react";
import { ChatCircle } from "@phosphor-icons/react";
import { leadership, departments } from "../../data/office.js";
import { Avatar, Card, PageTitle, ChatWidget } from "./ui.jsx";

export default function Leadership() {
  const [chatWith, setChatWith] = useState(null);

  const people =
    leadership.length +
    Object.values(departments).reduce((n, d) => n + d.staff.length, 0);
  const units = 1 + Object.keys(departments).length;

  return (
    <div>
      <PageTitle
        title="Руководство"
        subtitle="Команда, которая отвечает за стратегию и операционную работу"
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="font-display text-3xl font-bold text-brand">{units}</div>
          <div className="mt-1 text-xs font-medium text-ink-soft">подразделения</div>
        </Card>
        <Card className="p-5">
          <div className="font-display text-3xl font-bold text-brand">{people}</div>
          <div className="mt-1 text-xs font-medium text-ink-soft">сотрудников</div>
        </Card>
        <Card className="p-5 max-sm:col-span-2">
          <div className="font-display text-3xl font-bold text-brand">24/7</div>
          <div className="mt-1 text-xs font-medium text-ink-soft">офис онлайн</div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {leadership.map((person) => (
          <Card key={person.id} className="flex flex-col p-5">
            <Avatar name={person.name} className="h-14 w-14 text-lg" />
            <h3 className="mt-4 font-display text-base font-semibold text-ink">
              {person.name}
            </h3>
            <div className="mt-0.5 text-sm font-medium text-brand">{person.role}</div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
              {person.area}
            </p>
            <button
              type="button"
              onClick={() => setChatWith(chatWith === person.id ? null : person.id)}
              className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <ChatCircle size={16} weight="bold" />
              {chatWith === person.id ? "Скрыть чат" : "Написать"}
            </button>
            {chatWith === person.id && (
              <div className="mt-4 border-t border-line pt-4">
                <ChatWidget
                  key={person.id}
                  initialMessages={[{ from: "them", text: person.greeting }]}
                  suggestions={[
                    "Расскажите о партнёрской программе",
                    "Как стать поставщиком?",
                  ]}
                  fallbackReply={person.fallback}
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Синтаксис-чек**

Run: `npx esbuild src/components/office/Leadership.jsx > /dev/null`
Expected: exit 0.

- [ ] **Step 3: Commit (если инициализирован git)**

```bash
git add src/components/office/Leadership.jsx
git commit -m "feat(office): add Leadership module"
```

---

### Task 4: Модуль «Отдел» `src/components/office/Department.jsx`

**Files:**
- Create: `src/components/office/Department.jsx`

Компонент используется тремя записями реестра (Task 10) с пропом `departmentId`: `"sales"`, `"finance"`, `"finadmin"`.

- [ ] **Step 1: Создать файл с полным содержимым**

```jsx
import { useState } from "react";
import { CheckCircle, Circle } from "@phosphor-icons/react";
import { departments } from "../../data/office.js";
import { Avatar, Card, PageTitle, StatusPill, DOC_STATUS } from "./ui.jsx";

function Funnel({ stages }) {
  const max = stages[0].value;
  return (
    <div className="space-y-3">
      {stages.map((s) => (
        <div key={s.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-ink">{s.label}</span>
            <span className="font-semibold text-ink-soft">{s.value}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-paper">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${Math.max(8, (s.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Payments({ rows }) {
  return (
    <ul className="divide-y divide-line">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-ink">{r.label}</div>
            <div className="text-xs text-ink-soft">{r.date}</div>
          </div>
          <span
            className={`whitespace-nowrap text-sm font-semibold ${
              r.incoming ? "text-emerald-600" : "text-ink"
            }`}
          >
            {r.amount}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Documents({ docs }) {
  return (
    <ul className="divide-y divide-line">
      {docs.map((d) => (
        <li key={d.name} className="flex items-center justify-between gap-3 py-3">
          <span className="min-w-0 truncate text-sm font-medium text-ink">{d.name}</span>
          <StatusPill tone={DOC_STATUS[d.status].tone}>
            {DOC_STATUS[d.status].label}
          </StatusPill>
        </li>
      ))}
    </ul>
  );
}

const widgets = { funnel: Funnel, payments: Payments, documents: Documents };

export default function Department({ departmentId }) {
  const dept = departments[departmentId];
  const Widget = widgets[dept.widget.type];
  const [doneTasks, setDoneTasks] = useState(
    () => new Set(dept.tasks.map((t, i) => (t.done ? i : -1)).filter((i) => i >= 0)),
  );

  const toggleTask = (i) => {
    setDoneTasks((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div>
      <PageTitle title={dept.name} subtitle={dept.description} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {dept.kpis.map((kpi) => (
          <Card key={kpi.label} className="p-5">
            <div className="font-display text-2xl font-bold text-brand">{kpi.value}</div>
            <div className="mt-1 text-xs font-medium text-ink-soft">{kpi.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-display text-sm font-semibold text-ink">Команда</h3>
          <ul className="space-y-3">
            {dept.staff.map((person) => (
              <li key={person.name} className="flex items-center gap-3">
                <Avatar name={person.name} className="h-10 w-10 text-xs" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-ink">{person.name}</div>
                  <div className="text-xs text-ink-soft">{person.role}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-display text-sm font-semibold text-ink">Задачи недели</h3>
          <ul className="space-y-1">
            {dept.tasks.map((task, i) => (
              <li key={task.title}>
                <button
                  type="button"
                  onClick={() => toggleTask(i)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-paper"
                >
                  {doneTasks.has(i) ? (
                    <CheckCircle size={20} weight="fill" className="shrink-0 text-brand" />
                  ) : (
                    <Circle size={20} className="shrink-0 text-ink-soft" />
                  )}
                  <span
                    className={`text-sm ${
                      doneTasks.has(i)
                        ? "text-ink-soft line-through"
                        : "font-medium text-ink"
                    }`}
                  >
                    {task.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-4 p-5">
        <h3 className="mb-4 font-display text-sm font-semibold text-ink">
          {dept.widget.title}
        </h3>
        <Widget {...dept.widget} />
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Синтаксис-чек**

Run: `npx esbuild src/components/office/Department.jsx > /dev/null`
Expected: exit 0.

- [ ] **Step 3: Commit (если инициализирован git)**

```bash
git add src/components/office/Department.jsx
git commit -m "feat(office): add Department module with per-dept widgets"
```

---

### Task 5: Модуль «Сделки» `src/components/office/Deals.jsx`

**Files:**
- Create: `src/components/office/Deals.jsx`

- [ ] **Step 1: Создать файл с полным содержимым**

```jsx
import { useState } from "react";
import { deals } from "../../data/office.js";
import { Card, PageTitle, StatusPill, ChatWidget } from "./ui.jsx";

export default function Deals() {
  const [activeId, setActiveId] = useState(deals[0].id);
  const deal = deals.find((d) => d.id === activeId);

  return (
    <div>
      <PageTitle
        title="Сделки"
        subtitle="Переговоры с партнёрами и заказчиками в одном окне"
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {deals.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveId(d.id)}
              className={`w-full rounded-[20px] border p-4 text-left transition-colors ${
                d.id === activeId
                  ? "border-brand bg-brand/5"
                  : "border-line bg-white hover:border-ink/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-ink">{d.company}</span>
                <StatusPill tone={d.kind === "Партнёр" ? "brand" : "neutral"}>
                  {d.kind}
                </StatusPill>
              </div>
              <div className="mt-1 text-xs text-ink-soft">{d.amount}</div>
              <div className="mt-1 text-xs font-medium text-ink">
                {d.stages[d.stage]}
              </div>
            </button>
          ))}
        </div>

        <Card className="flex min-h-[480px] flex-col p-5">
          <div className="mb-5 flex items-start gap-1.5">
            {deal.stages.map((s, i) => (
              <div key={s} className="flex flex-1 flex-col gap-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    i <= deal.stage ? "bg-brand" : "bg-line"
                  }`}
                />
                <span
                  className={`text-[10px] leading-tight ${
                    i <= deal.stage ? "font-medium text-ink" : "text-ink-soft"
                  }`}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>

          <div className="flex-1">
            <ChatWidget
              key={deal.id}
              initialMessages={deal.messages}
              suggestions={deal.suggestions}
              replies={deal.replies}
              fallbackReply={deal.fallback}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Синтаксис-чек**

Run: `npx esbuild src/components/office/Deals.jsx > /dev/null`
Expected: exit 0.

- [ ] **Step 3: Commit (если инициализирован git)**

```bash
git add src/components/office/Deals.jsx
git commit -m "feat(office): add Deals module with mock negotiation chat"
```

---

### Task 6: Модуль «Договоры по ЭЦП» `src/components/office/Contracts.jsx`

**Files:**
- Create: `src/components/office/Contracts.jsx`

- [ ] **Step 1: Создать файл с полным содержимым**

```jsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, Circle, FileText, PenNib } from "@phosphor-icons/react";
import { contracts, signSteps, MOCK_SIGNATURE_HASH } from "../../data/office.js";
import { Card, PageTitle, StatusPill, DOC_STATUS } from "./ui.jsx";

export default function Contracts() {
  const [activeId, setActiveId] = useState(contracts[0].id);
  const [signedIds, setSignedIds] = useState([]);
  // flow.step: -1 idle, 0..2 running step index, 3 = done.
  // contractId pins the flow to the contract it was started for.
  const [flow, setFlow] = useState({ step: -1, contractId: null });

  const contract = contracts.find((c) => c.id === activeId);
  const isSigned = contract.status === "signed" || signedIds.includes(contract.id);

  // Reset the flow when switching contracts.
  useEffect(() => {
    setFlow({ step: -1, contractId: null });
  }, [activeId]);

  // Advance the signing flow on a timer.
  useEffect(() => {
    if (flow.step < 0 || flow.step >= signSteps.length) return;
    const t = window.setTimeout(
      () => setFlow((f) => ({ ...f, step: f.step + 1 })),
      1400,
    );
    return () => window.clearTimeout(t);
  }, [flow.step]);

  // Mark the contract signed when the flow completes.
  useEffect(() => {
    if (flow.step === signSteps.length && flow.contractId) {
      setSignedIds((ids) =>
        ids.includes(flow.contractId) ? ids : [...ids, flow.contractId],
      );
    }
  }, [flow]);

  return (
    <div>
      <PageTitle
        title="Договоры по ЭЦП"
        subtitle="Подписание документов электронной подписью без бумаг и курьеров"
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {contracts.map((c) => {
            const cSigned = c.status === "signed" || signedIds.includes(c.id);
            const cStatus = cSigned ? "signed" : c.status;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={`w-full rounded-[20px] border p-4 text-left transition-colors ${
                  c.id === activeId
                    ? "border-brand bg-brand/5"
                    : "border-line bg-white hover:border-ink/20"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">
                    Договор {c.number}
                  </span>
                  <StatusPill tone={DOC_STATUS[cStatus].tone}>
                    {DOC_STATUS[cStatus].label}
                  </StatusPill>
                </div>
                <div className="mt-1 text-xs text-ink-soft">{c.party}</div>
                <div className="mt-1 text-xs font-medium text-ink">{c.amount}</div>
              </button>
            );
          })}
        </div>

        <Card className="flex min-h-[480px] flex-col p-5">
          {/* PDF stub */}
          <div className="rounded-2xl border border-line bg-paper p-5">
            <div className="flex items-center gap-2 text-ink-soft">
              <FileText size={18} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Договор {contract.number}
              </span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold text-ink">
              {contract.party}
            </h3>
            <p className="mt-1 text-sm text-ink-soft">{contract.subject}</p>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded bg-line/70" />
              <div className="h-2 w-11/12 rounded bg-line/70" />
              <div className="h-2 w-4/5 rounded bg-line/70" />
            </div>
            <div className="mt-4 text-sm font-semibold text-ink">
              Сумма: {contract.amount}
            </div>

            {isSigned && (
              <motion.div
                initial={{ opacity: 0, scale: 1.6, rotate: -18 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="mt-4 inline-flex rounded-xl border-[3px] border-brand px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-brand"
              >
                Подписан · ЭЦП
              </motion.div>
            )}
            {isSigned && (
              <div className="mt-2 font-mono text-xs text-ink-soft">
                Подпись: {MOCK_SIGNATURE_HASH}
              </div>
            )}
          </div>

          {/* Signing flow */}
          <div className="mt-5 flex-1">
            {!isSigned && flow.step === -1 && (
              <button
                type="button"
                onClick={() => setFlow({ step: 0, contractId: activeId })}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep active:scale-[0.98]"
              >
                <PenNib size={18} weight="bold" />
                Подписать по ЭЦП
              </button>
            )}

            {flow.step >= 0 && (
              <ul className="space-y-3">
                {signSteps.map((s, i) => {
                  const done = flow.step > i || flow.step === signSteps.length;
                  const running = flow.step === i;
                  return (
                    <li key={s.id} className="flex items-start gap-3">
                      {done ? (
                        <CheckCircle
                          size={22}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-brand"
                        />
                      ) : running ? (
                        <span className="mt-0.5 h-[22px] w-[22px] shrink-0 animate-spin rounded-full border-2 border-line border-t-brand" />
                      ) : (
                        <Circle size={22} className="mt-0.5 shrink-0 text-line" />
                      )}
                      <div>
                        <div
                          className={`text-sm font-semibold ${
                            done || running ? "text-ink" : "text-ink-soft"
                          }`}
                        >
                          {s.title}
                        </div>
                        {(done || running) && (
                          <div className="text-xs text-ink-soft">{s.detail}</div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Синтаксис-чек**

Run: `npx esbuild src/components/office/Contracts.jsx > /dev/null`
Expected: exit 0.

- [ ] **Step 3: Commit (если инициализирован git)**

```bash
git add src/components/office/Contracts.jsx
git commit -m "feat(office): add Contracts module with EDS signing flow"
```

---

### Task 7: Модуль «Ассистент холодных переговоров» `src/components/office/ColdCallAssistant.jsx`

**Files:**
- Create: `src/components/office/ColdCallAssistant.jsx`

- [ ] **Step 1: Создать файл с полным содержимым**

```jsx
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowClockwise,
  Lightbulb,
  PhoneCall,
  Trophy,
} from "@phosphor-icons/react";
import { coldCallScript } from "../../data/office.js";
import { Card, PageTitle, StatusPill } from "./ui.jsx";

const qualityMeta = {
  best: { label: "Лучший ответ", tone: "green" },
  ok: { label: "Можно лучше", tone: "amber" },
  bad: { label: "Ошибка", tone: "brand" },
};

export default function ColdCallAssistant() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null); // option index at current step
  const [log, setLog] = useState([]); // chosen qualities

  const done = step >= coldCallScript.length;
  const current = coldCallScript[step];
  const bestCount = log.filter((q) => q === "best").length;

  const choose = (i) => {
    if (picked !== null) return;
    setPicked(i);
  };

  const next = () => {
    setLog((l) => [...l, current.options[picked].quality]);
    setStep((s) => s + 1);
    setPicked(null);
  };

  const reset = () => {
    setStep(0);
    setPicked(null);
    setLog([]);
  };

  const verdict =
    bestCount === coldCallScript.length
      ? "Идеальный звонок — клиент готов к пилоту."
      : bestCount >= 2
        ? "Хороший звонок — пара реплик и сделка была бы в кармане."
        : "Есть что подтянуть — пройдите сценарий ещё раз.";

  return (
    <div>
      <PageTitle
        title="Ассистент холодных переговоров"
        subtitle="Тренажёр: отработайте звонок — ассистент разберёт каждый ответ"
      />

      <Card className="mx-auto max-w-2xl p-6">
        {!done ? (
          <>
            <div className="mb-5 flex items-center justify-between">
              <StatusPill tone="brand">
                <span className="inline-flex items-center gap-1.5">
                  <PhoneCall size={14} weight="bold" />
                  Шаг {step + 1} из {coldCallScript.length}
                </span>
              </StatusPill>
              <div className="flex gap-1">
                {coldCallScript.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-6 rounded-full ${
                      i < step ? "bg-brand" : i === step ? "bg-brand/40" : "bg-line"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-paper px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                Клиент
              </div>
              <p className="mt-1 text-sm font-medium text-ink">{current.client}</p>
            </div>

            <div className="mt-4 space-y-2">
              {current.options.map((option, i) => {
                const isPicked = picked === i;
                const revealed = picked !== null;
                const meta = qualityMeta[option.quality];
                return (
                  <button
                    key={option.text}
                    type="button"
                    onClick={() => choose(i)}
                    disabled={revealed}
                    className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      isPicked
                        ? "border-brand bg-brand/5 font-medium text-ink"
                        : revealed
                          ? "border-line bg-white text-ink-soft opacity-60"
                          : "border-line bg-white text-ink hover:border-brand"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>{option.text}</span>
                      {isPicked && (
                        <StatusPill tone={meta.tone}>{meta.label}</StatusPill>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 rounded-2xl border border-line bg-paper px-4 py-3"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand">
                  <Lightbulb size={14} weight="bold" />
                  Разбор ассистента
                </div>
                <p className="mt-1 text-sm text-ink">
                  {current.options[picked].feedback}
                </p>
                <button
                  type="button"
                  onClick={next}
                  className="mt-3 rounded-full bg-brand px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-deep"
                >
                  {step + 1 === coldCallScript.length ? "К итогам" : "Дальше"}
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Trophy size={30} weight="fill" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-ink">
              Звонок завершён
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Лучших ответов: {bestCount} из {coldCallScript.length}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm font-medium text-ink">
              {verdict}
            </p>
            <div className="mt-4 flex justify-center gap-1.5">
              {log.map((q, i) => (
                <StatusPill key={i} tone={qualityMeta[q].tone}>
                  Шаг {i + 1}
                </StatusPill>
              ))}
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <ArrowClockwise size={18} weight="bold" />
              Пройти ещё раз
            </button>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Синтаксис-чек**

Run: `npx esbuild src/components/office/ColdCallAssistant.jsx > /dev/null`
Expected: exit 0.

- [ ] **Step 3: Commit (если инициализирован git)**

```bash
git add src/components/office/ColdCallAssistant.jsx
git commit -m "feat(office): add cold-call assistant trainer"
```

---

### Task 8: Модуль «Партнёрская сеть» `src/components/office/PartnerNetwork.jsx`

**Files:**
- Create: `src/components/office/PartnerNetwork.jsx`

- [ ] **Step 1: Создать файл с полным содержимым**

```jsx
import { useState } from "react";
import { CheckCircle, MapPin, PaperPlaneTilt } from "@phosphor-icons/react";
import { partners, partnerStatuses } from "../../data/office.js";
import { Card, PageTitle, StatusPill } from "./ui.jsx";

const emptyForm = { company: "", contact: "", region: "" };

export default function PartnerNetwork() {
  const [selectedId, setSelectedId] = useState(partners[0].id);
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const partner = partners.find((p) => p.id === selectedId);
  const formReady =
    form.company.trim() && form.contact.trim() && form.region.trim();

  const submit = (e) => {
    e.preventDefault();
    if (formReady) setSent(true);
  };

  const inputClass =
    "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-brand";

  return (
    <div>
      <PageTitle
        title="Партнёрская сеть"
        subtitle="Дистрибьюторы по регионам и заявка на подключение"
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {partners.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              className={`w-full rounded-[20px] border p-4 text-left transition-colors ${
                p.id === selectedId
                  ? "border-brand bg-brand/5"
                  : "border-line bg-white hover:border-ink/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-ink">{p.name}</span>
                <StatusPill tone={partnerStatuses[p.status].tone}>
                  {partnerStatuses[p.status].label}
                </StatusPill>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                <MapPin size={12} />
                {p.region}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {partner.name}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
                  <MapPin size={14} />
                  {partner.region}
                </div>
              </div>
              <StatusPill tone={partnerStatuses[partner.status].tone}>
                {partnerStatuses[partner.status].label}
              </StatusPill>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-paper p-4">
                <div className="font-display text-xl font-bold text-brand">
                  {partner.volume}
                </div>
                <div className="mt-1 text-xs text-ink-soft">объём закупок</div>
              </div>
              <div className="rounded-2xl bg-paper p-4">
                <div className="font-display text-xl font-bold text-brand">14 дн</div>
                <div className="mt-1 text-xs text-ink-soft">отсрочка платежа</div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-lg font-bold text-ink">
              Стать партнёром
            </h3>
            {sent ? (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 font-semibold text-emerald-700">
                  <CheckCircle size={20} weight="fill" />
                  Заявка принята
                </div>
                <p className="mt-1 text-sm text-emerald-700/80">
                  {form.company}, регион «{form.region}» — коммерческий директор
                  свяжется с вами в течение рабочего дня.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setSent(false);
                  }}
                  className="mt-3 text-xs font-semibold text-emerald-700 underline underline-offset-2"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-4 space-y-3">
                <input
                  className={inputClass}
                  placeholder="Название компании"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
                <input
                  className={inputClass}
                  placeholder="Контактное лицо и телефон"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                />
                <input
                  className={inputClass}
                  placeholder="Регион присутствия"
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                />
                <button
                  type="submit"
                  disabled={!formReady}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <PaperPlaneTilt size={18} weight="bold" />
                  Отправить заявку
                </button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Синтаксис-чек**

Run: `npx esbuild src/components/office/PartnerNetwork.jsx > /dev/null`
Expected: exit 0.

- [ ] **Step 3: Commit (если инициализирован git)**

```bash
git add src/components/office/PartnerNetwork.jsx
git commit -m "feat(office): add PartnerNetwork module with application form"
```

---

### Task 9: Модуль «Клиенты» `src/components/office/Clients.jsx`

**Files:**
- Create: `src/components/office/Clients.jsx`

- [ ] **Step 1: Создать файл с полным содержимым**

```jsx
import { useState } from "react";
import { VideoCamera } from "@phosphor-icons/react";
import { tickets } from "../../data/office.js";
import { Card, PageTitle, StatusPill, ChatWidget } from "./ui.jsx";

export default function Clients() {
  const [activeId, setActiveId] = useState(tickets[0].id);
  const [joined, setJoined] = useState(false);
  const ticket = tickets.find((t) => t.id === activeId);

  return (
    <div>
      <PageTitle
        title="Клиенты"
        subtitle="Удалённое взаимодействие: обращения из всех каналов и видеовстречи"
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {tickets.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`w-full rounded-[20px] border p-4 text-left transition-colors ${
                t.id === activeId
                  ? "border-brand bg-brand/5"
                  : "border-line bg-white hover:border-ink/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-ink">{t.client}</span>
                <StatusPill tone="neutral">{t.channel}</StatusPill>
              </div>
              <div className="mt-1 text-xs text-ink-soft">{t.topic}</div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="flex min-h-[380px] flex-col p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-sm font-semibold text-ink">
                {ticket.topic}
              </h3>
              <StatusPill tone="brand">{ticket.channel}</StatusPill>
            </div>
            <div className="flex-1">
              <ChatWidget
                key={ticket.id}
                initialMessages={ticket.messages}
                suggestions={ticket.suggestions}
                replies={ticket.replies}
                fallbackReply={ticket.fallback}
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
                  <VideoCamera size={22} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">
                    Видеовстреча с клиентом
                  </div>
                  <div className="text-xs text-ink-soft">
                    Комната: sg-meet.ru/{ticket.id}-demo
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setJoined((v) => !v)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  joined
                    ? "border border-line bg-white text-ink hover:border-brand hover:text-brand"
                    : "bg-brand text-white hover:bg-brand-deep"
                }`}
              >
                {joined ? "Покинуть (демо)" : "Присоединиться"}
              </button>
            </div>
            {joined && (
              <div className="mt-4 flex aspect-video items-center justify-center rounded-2xl bg-ink text-sm font-medium text-white/70">
                Демо-режим: видеопоток не подключён
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Синтаксис-чек**

Run: `npx esbuild src/components/office/Clients.jsx > /dev/null`
Expected: exit 0.

- [ ] **Step 3: Commit (если инициализирован git)**

```bash
git add src/components/office/Clients.jsx
git commit -m "feat(office): add Clients module with tickets and video stub"
```

---

### Task 10: Реестр модулей и каркас `OfficeShell`

**Files:**
- Create: `src/components/office/modules.js`
- Create: `src/components/office/OfficeShell.jsx`

- [ ] **Step 1: Создать `src/components/office/modules.js`**

```js
import {
  Crown,
  ChartLineUp,
  Bank,
  Folders,
  Handshake,
  PenNib,
  PhoneCall,
  Network,
  Headset,
} from "@phosphor-icons/react";
import Leadership from "./Leadership.jsx";
import Department from "./Department.jsx";
import Deals from "./Deals.jsx";
import Contracts from "./Contracts.jsx";
import ColdCallAssistant from "./ColdCallAssistant.jsx";
import PartnerNetwork from "./PartnerNetwork.jsx";
import Clients from "./Clients.jsx";

export const MODULE_GROUPS = [
  { id: "company", title: "Компания" },
  { id: "deals", title: "Сделки" },
  { id: "growth", title: "Развитие" },
];

export const MODULES = [
  { id: "leadership", group: "company", title: "Руководство", icon: Crown, component: Leadership },
  { id: "sales", group: "company", title: "Отдел продаж", icon: ChartLineUp, component: Department, props: { departmentId: "sales" } },
  { id: "finance", group: "company", title: "Финансовый отдел", icon: Bank, component: Department, props: { departmentId: "finance" } },
  { id: "finadmin", group: "company", title: "Финансово-адм. отдел", icon: Folders, component: Department, props: { departmentId: "finadmin" } },
  { id: "deals", group: "deals", title: "Сделки", icon: Handshake, component: Deals },
  { id: "contracts", group: "deals", title: "Договоры по ЭЦП", icon: PenNib, component: Contracts },
  { id: "assistant", group: "growth", title: "Ассистент переговоров", icon: PhoneCall, component: ColdCallAssistant },
  { id: "partners", group: "growth", title: "Партнёрская сеть", icon: Network, component: PartnerNetwork },
  { id: "clients", group: "growth", title: "Клиенты", icon: Headset, component: Clients },
];
```

- [ ] **Step 2: Создать `src/components/office/OfficeShell.jsx`**

```jsx
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Bell } from "@phosphor-icons/react";
import { MODULE_GROUPS, MODULES } from "./modules.js";
import { Avatar } from "./ui.jsx";

const ease = [0.16, 1, 0.3, 1];

export default function OfficeShell({ onExit }) {
  const [activeId, setActiveId] = useState("leadership");
  const active = MODULES.find((m) => m.id === activeId);
  const ActiveComponent = active.component;
  const activeGroup = MODULE_GROUPS.find((g) => g.id === active.group);

  return (
    <div className="flex min-h-screen bg-paper">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-ink text-white md:flex">
        <div className="flex items-center gap-3 px-6 pb-6 pt-7">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-display text-sm font-bold">
            СГ
          </div>
          <div>
            <div className="font-display text-sm font-bold leading-tight">
              Сладкий Град
            </div>
            <div className="text-xs text-white/50">Виртуальный офис</div>
          </div>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-4">
          {MODULE_GROUPS.map((group) => (
            <div key={group.id}>
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                {group.title}
              </div>
              <ul className="space-y-1">
                {MODULES.filter((m) => m.group === group.id).map((m) => {
                  const Icon = m.icon;
                  const isActive = m.id === activeId;
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(m.id)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-brand text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon size={18} weight={isActive ? "fill" : "regular"} />
                        {m.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={onExit}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={18} />
            На сайт
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-paper/80 px-5 py-4 backdrop-blur md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              aria-label="Вернуться на сайт"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink md:hidden"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                {activeGroup.title}
              </div>
              <h1 className="truncate font-display text-lg font-bold text-ink">
                {active.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Уведомления"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand" />
            </button>
            <div className="flex items-center gap-2.5">
              <Avatar name="Вы Менеджер" className="h-10 w-10 text-xs" />
              <div className="hidden text-sm sm:block">
                <div className="font-semibold leading-tight text-ink">Вы</div>
                <div className="text-xs text-ink-soft">менеджер</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 py-6 pb-24 md:px-8 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease }}
            >
              <ActiveComponent {...(active.props ?? {})} />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom nav (mobile) */}
        <nav className="fixed inset-x-0 bottom-0 z-20 flex gap-1 overflow-x-auto border-t border-white/10 bg-ink px-2 py-2 md:hidden">
          {MODULES.map((m) => {
            const Icon = m.icon;
            const isActive = m.id === activeId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveId(m.id)}
                aria-label={m.title}
                className={`flex min-w-[64px] shrink-0 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium transition-colors ${
                  isActive ? "bg-brand text-white" : "text-white/60"
                }`}
              >
                <Icon size={18} />
                <span className="max-w-[72px] truncate">{m.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Синтаксис-чек**

Run:
```bash
npx esbuild src/components/office/modules.js > /dev/null
npx esbuild src/components/office/OfficeShell.jsx > /dev/null
```
Expected: exit 0 для обоих.

- [ ] **Step 4: Commit (если инициализирован git)**

```bash
git add src/components/office/modules.js src/components/office/OfficeShell.jsx
git commit -m "feat(office): add module registry and OfficeShell layout"
```

---

### Task 11: Интеграция в `App.jsx` и `Nav.jsx`

**Files:**
- Modify: `src/App.jsx` (полная замена содержимого)
- Modify: `src/components/Nav.jsx` (точечные правки)

- [ ] **Step 1: Заменить содержимое `src/App.jsx`**

```jsx
import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import FlavorAccordion from "./components/FlavorAccordion.jsx";
import HitsBento from "./components/HitsBento.jsx";
import Manifesto from "./components/Manifesto.jsx";
import Gudis from "./components/Gudis.jsx";
import Cta from "./components/Cta.jsx";
import Footer from "./components/Footer.jsx";

const OfficeShell = lazy(() => import("./components/office/OfficeShell.jsx"));

const ease = [0.16, 1, 0.3, 1];

function OfficeFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-brand" />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");

  // Reset scroll on every view switch.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease }}
          >
            <Nav onEnterOffice={() => setView("office")} />
            <Hero />
            <Marquee />
            <FlavorAccordion />
            <HitsBento />
            <Manifesto />
            <Gudis />
            <Cta />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="office"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <Suspense fallback={<OfficeFallback />}>
              <OfficeShell onExit={() => setView("landing")} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
```

- [ ] **Step 2: Правки `src/components/Nav.jsx`**

2a. Импорт иконки — заменить строку 10:

```jsx
import { List, X, ArrowUpRight, Buildings } from "@phosphor-icons/react";
```

2b. Сигнатура — заменить строку 20:

```jsx
export default function Nav({ onEnterOffice }) {
```

2c. Кнопка «Офис» на десктопе — вставить перед ссылкой «Заказать оптом» (внутри `<div className="flex items-center gap-2">`, строка 68):

```jsx
          <button
            type="button"
            onClick={onEnterOffice}
            className="group hidden items-center gap-1.5 rounded-full border border-ink/15 bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand hover:text-brand active:scale-[0.98] sm:inline-flex"
          >
            <Buildings size={16} weight="bold" />
            Офис
          </button>
```

2d. Пункт «Виртуальный офис» в мобильном меню — вставить после закрывающего `</ul>` списка ссылок внутри мобильной панели (перед `<li className="pt-2">` вставка не нужна; добавить новый `<li>` сразу после `{links.map(...)}` списка, т.е. перед `<li className="pt-2">`):

```jsx
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onEnterOffice();
                  }}
                  className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-base font-medium text-ink transition-colors hover:bg-paper"
                >
                  <Buildings size={18} />
                  Виртуальный офис
                </button>
              </li>
```

- [ ] **Step 3: Полная сборка**

Run: `npm run build`
Expected: сборка завершается без ошибок (`✓ built in ...`), в выводе появляется отдельный чанк для `OfficeShell` (code splitting через `lazy`).

- [ ] **Step 4: Commit (если инициализирован git)**

```bash
git add src/App.jsx src/components/Nav.jsx
git commit -m "feat(office): wire virtual office view into App and Nav"
```

---

### Task 12: Smoke-прогон (ручная приёмка)

**Files:** — (только проверка, код не меняется)

- [ ] **Step 1: Запустить dev-сервер**

Run: `npm run dev` (в фоне)
Expected: `Local: http://localhost:5173/`

- [ ] **Step 2: Пройти чек-лист в браузере**

- [ ] Переход: кнопка «Офис» в Nav (десктоп и мобильное меню) открывает офис с анимацией; «← На сайт» возвращает лендинг.
- [ ] Сайдбар: 9 пунктов в 3 группах («Компания» — 4, «Сделки» — 2, «Развитие» — 3); активный пункт подсвечен.
- [ ] Руководство: 3 карточки, «Написать» открывает чат, предложенный ответ добавляется и приходит автоответ через ~1 с.
- [ ] Отделы (все 3): KPI, команда, задачи кликаются (зачёркиваются), у продаж — воронка, у финансов — график оплат, у фин.-адм. — реестр документов.
- [ ] Сделки: переключение сделок меняет чат и таймлайн; ответы работают.
- [ ] Договоры по ЭЦП: «Подписать по ЭЦП» запускает 3 шага со спиннером, финал — штамп «Подписан · ЭЦП» и хэш; статус в списке меняется на «Подписан»; подписанный договор не предлагает кнопку.
- [ ] Ассистент: выбор ответа блокирует остальные, показывает разбор и кнопку «Дальше»; после 4 шагов — сводка с вердиктом и «Пройти ещё раз».
- [ ] Партнёрская сеть: выбор партнёра меняет карточку; форма не сабмитится пустой; после отправки — экран «Заявка принята».
- [ ] Клиенты: переключение обращений меняет чат; «Присоединиться» показывает демо-заглушку видео.
- [ ] Мобильная раскладка (≤ 767px, через device toolbar): сайдбар скрыт, внизу — нижняя навигация с иконками, контент в одну колонку, кнопка «←» в топбаре.
- [ ] Консоль браузера: нет ошибок (warnings от React допустимы, ошибок быть не должно).

- [ ] **Step 3: Остановить dev-сервер, финальный commit (если инициализирован git)**

```bash
git add -A
git commit -m "feat(office): virtual office complete"
```
