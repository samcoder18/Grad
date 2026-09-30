import { asset } from "../lib/asset.js";

export const flavors = [
  {
    id: "apelsin",
    name: "Апельсин",
    img: asset("img/apelsin.png"),
    imageHeight: 1671,
    color: "var(--color-orange)",
    text: "Яркий цитрус, насыщенный аромат и приятная сладость. Любят и дети, и взрослые.",
  },
  {
    id: "barberry",
    name: "Барбарис",
    img: asset("img/barberry.png"),
    imageHeight: 1671,
    color: "var(--color-barberry)",
    text: "Насыщенный восточный барбарис с лёгкой кислинкой. Один из самых популярных вкусов.",
  },
  {
    id: "grape",
    name: "Виноград",
    img: asset("img/grape.png"),
    imageHeight: 1671,
    color: "var(--color-grape)",
    text: "Сочный вкус чёрного винограда с натуральной сладостью. Стабильный топ продаж.",
  },
  {
    id: "pear",
    name: "Груша",
    img: asset("img/pear.png"),
    imageHeight: 1672,
    color: "var(--color-pear)",
    text: "Сладкий и мягкий вкус спелой груши. Идеально освежает в любой сезон.",
  },
  {
    id: "mojito",
    name: "Мохито",
    img: asset("img/mojito-glass.png"),
    imageHeight: 1672,
    color: "var(--color-mojito)",
    text: "Свежий лайм, мята и приятная газированность. Летний хит круглый год.",
  },
  {
    id: "tarragon",
    name: "Тархун",
    img: asset("img/tarragon.png"),
    imageHeight: 1671,
    color: "var(--color-tarragon)",
    text: "Классический тархун на натуральной основе. Узнаваемый аромат и зелёный цвет.",
  },
  {
    id: "cola-glass",
    name: "Dolce Ave",
    img: asset("img/cola-glass.png"),
    imageHeight: 1672,
    color: "var(--color-dolce)",
    text: "Кола с глубоким карамельным вкусом и выразительной газированностью.",
    packagingSpec: "0,45 л · стекло · 12 шт в упаковке",
  },
  {
    id: "feijoa",
    name: "Фейхоа",
    img: asset("img/feijoa.png"),
    imageHeight: 1672,
    color: "#9bbd28",
    text: "Экзотическая фейхоа с деликатной кислинкой и свежим фруктовым ароматом.",
  },
  {
    id: "red-apple",
    name: "Красное яблоко",
    displayName: ["Красное", "яблоко"],
    img: asset("img/red-apple.png"),
    imageHeight: 1671,
    color: "#d9523e",
    text: "Сочный вкус спелого красного яблока с лёгкой освежающей кислинкой.",
  },
];

export const hits = [
  {
    id: "cola",
    name: "Cola",
    img: asset("img/dolce-cola.png"),
    imageWidth: 1024,
    imageHeight: 1536,
    color: "#ec2438",
    tone: "Карамельный характер",
    text: "Глубокий карамельный вкус с фирменной газированностью.",
    sizes: ["1 л", "2 л"],
  },
  {
    id: "dolce-ave",
    name: "Dolce Ave",
    img: asset("img/dolce-dolce-ave.png"),
    imageWidth: 1086,
    imageHeight: 1448,
    color: "#4778ff",
    tone: "Яркая классика",
    text: "Кола с глубоким карамельным вкусом и выразительной газированностью.",
    sizes: ["1 л"],
  },
  {
    id: "mojito",
    name: "Mojito",
    img: asset("img/dolce-mojito.png"),
    imageWidth: 1024,
    imageHeight: 1536,
    color: "#66d78b",
    tone: "Мята и лайм",
    text: "Свежий мятно-лаймовый микс с приятной газированностью.",
    sizes: ["1 л"],
  },
  {
    id: "orange",
    name: "Orange",
    img: asset("img/dolce-orange.png"),
    imageWidth: 1086,
    imageHeight: 1448,
    color: "#ffa43b",
    tone: "Сочный цитрус",
    text: "Классический апельсин: яркий цитрус и насыщенный аромат.",
    sizes: ["1 л"],
  },
  {
    id: "lime",
    name: "Lime",
    img: asset("img/dolce-lime.png"),
    imageWidth: 1086,
    imageHeight: 1448,
    color: "#bbde60",
    tone: "Освежающий лайм",
    text: "Кисло-сладкий лайм с бодрящей газировкой.",
    sizes: ["1 л"],
  },
];

// Фасовка стеклянной линейки — одинакова для всех вкусов карусели.
export const glassPackaging = {
  spec: "0,5 л · стекло · 12 шт в упаковке",
  pallets: [
    { label: "Большой поддон", value: "110 упаковок · 1 320 бутылок" },
    { label: "Европоддон", value: "90 упаковок · 1 080 бутылок" },
  ],
};

// Фасовка литровых хитов Dol4e (бенто-блок).
export const hitsPackaging = {
  spec: "1 л · ПЭТ · 9 шт в упаковке",
  pallets: [
    { label: "Европоддон", value: "75 упаковок · 675 бутылок" },
    { label: "Большой поддон", value: "100 упаковок · 900 бутылок" },
  ],
};

export const contacts = {
  phone: "+7 (993) 183-74-44",
  phoneHref: "tel:+79931837444",
  email: "gudis_goodies@mail.ru",
  whatsapp: "https://wa.me/79931837444",
};

// Реквизиты совпадают с разделом «Оператор» в политике конфиденциальности.
export const legal = {
  name: "ИП Хубаев Алан Юрьевич",
  inn: "151307338935",
  ogrnip: "323150000014240",
  address: "362013, РСО-Алания, г. Владикавказ, ул. 5-я Промышленная, 2А",
};

// Документы для скачивания (public/docs/). Используются в футере и FAQ.
export const docs = [
  {
    href: asset("docs/deklaraciya-voda-gudis.pdf"),
    label: "Декларация соответствия — вода «Гудис»",
    file: "deklaraciya-voda-gudis.pdf",
  },
  {
    href: asset("docs/deklaraciya-napitki-dolche.pdf"),
    label: "Декларация соответствия — напитки «Сладкий Град»",
    file: "deklaraciya-napitki-dolche.pdf",
  },
  {
    href: asset("docs/egrip-list-zapisi.pdf"),
    label: "Лист записи ЕГРИП",
    file: "egrip-list-zapisi.pdf",
  },
  {
    href: asset("docs/svidetelstvo-tovarnyj-znak.pdf"),
    label: "Свидетельство на товарный знак",
    file: "svidetelstvo-tovarnyj-znak.pdf",
  },
];
