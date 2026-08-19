import { asset } from "../lib/asset.js";

export const flavors = [
  {
    id: "apelsin",
    name: "Апельсин",
    img: asset("img/apelsin.webp"),
    color: "var(--color-orange)",
    text: "Яркий цитрус, насыщенный аромат и приятная сладость. Любят и дети, и взрослые.",
  },
  {
    id: "barberry",
    name: "Барбарис",
    img: asset("img/barberry.webp"),
    color: "var(--color-barberry)",
    text: "Насыщенный восточный барбарис с лёгкой кислинкой. Один из самых популярных вкусов.",
  },
  {
    id: "grape",
    name: "Виноград",
    img: asset("img/grape.webp"),
    color: "var(--color-grape)",
    text: "Сочный вкус чёрного винограда с натуральной сладостью. Стабильный топ продаж.",
  },
  {
    id: "pear",
    name: "Груша",
    img: asset("img/pear.webp"),
    color: "var(--color-pear)",
    text: "Сладкий и мягкий вкус спелой груши. Идеально освежает в любой сезон.",
  },
  {
    id: "mojito",
    name: "Мохито",
    img: asset("img/mojito-glass.webp"),
    color: "var(--color-mojito)",
    text: "Свежий лайм, мята и приятная газированность. Летний хит круглый год.",
  },
  {
    id: "pitahaya",
    name: "Питахайа",
    img: asset("img/pitahaya.webp"),
    color: "var(--color-pitahaya)",
    text: "Экзотический вкус драконьего фрукта. Яркий выбор для тех, кто любит новинки.",
  },
  {
    id: "tarragon",
    name: "Тархун",
    img: asset("img/tarragon.webp"),
    color: "var(--color-tarragon)",
    text: "Классический тархун на натуральной основе. Узнаваемый аромат и зелёный цвет.",
  },
];

export const hits = [
  {
    id: "cola",
    name: "Dolce Cola",
    img: asset("img/cola.webp"),
    color: "var(--color-cola)",
    text: "Глубокий карамельный вкус с фирменной газированностью.",
  },
  {
    id: "mojito",
    name: "Mojito",
    img: asset("img/mojito.webp"),
    color: "var(--color-mojito)",
    text: "Мятно-лаймовый микс, один из самых продаваемых вкусов линейки.",
  },
  {
    id: "orange",
    name: "Orange",
    img: asset("img/orange.webp"),
    color: "var(--color-orange)",
    text: "Классический апельсин: яркий цитрус и насыщенный аромат.",
  },
  {
    id: "lime",
    name: "Lime",
    img: asset("img/lime.webp"),
    color: "var(--color-dolce)",
    text: "Кисло-сладкий лайм с бодрящей газировкой. Отлично утоляет жажду.",
  },
];

export const contacts = {
  phone: "+7 (993) 183-74-44",
  phoneHref: "tel:+79931837444",
  email: "gudis_goodies@mail.ru",
};
