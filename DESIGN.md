# Дизайн-система «Сладкий Град»

Источник истины: `src/index.css` (токены Tailwind 4 в `@theme`) и `src/data/flavors.js`.

## Шрифтовая пара

| Роль | Шрифт | CSS-токен | Подключение |
|---|---|---|---|
| Display / заголовки | **Unbounded Variable** | `--font-display` → класс `font-display` | `@fontsource-variable/unbounded` |
| Основной текст / UI | **Onest Variable** | `--font-sans` → класс `font-sans` (по умолчанию на `body`) | `@fontsource-variable/onest` |

Оба шрифта — variable, кириллические, подключены локально через npm-пакеты Fontsource (импорты в `src/main.jsx`). Фолбэки: `system-ui, sans-serif`.

Использование:
- `font-display` — h1/h2, крупные акценты (Hero, заголовки секций).
- `font-sans` — весь остальной текст, кнопки, подписи.

## Цвета

### Базовые токены страницы

| Токен | Hex | Назначение |
|---|---|---|
| `--color-paper` | `#f7f8f6` | Фон страницы |
| `--color-ink` | `#17191c` | Основной текст |
| `--color-ink-soft` | `#4b4f55` | Вторичный текст |
| `--color-line` | `#e3e6e2` | Разделители, бордеры |
| `--color-brand` | `#d91e36` | Фирменный акцент (кнопки, CTA, selection) |
| `--color-brand-deep` | `#b3122a` | Hover-состояние акцента |

Тема одна — светлая, акцент зафиксирован (brand crimson).

### Цвета вкусов

Каждый вкус несёт свой цвет; используется только там, где показан этот вкус.

| Вкус | Токен | Hex |
|---|---|---|
| Тархун | `--color-tarragon` | `#2fa84f` |
| Мохито | `--color-mojito` | `#57a83c` |
| Барбарис | `--color-barberry` | `#d91e36` |
| Груша | `--color-pear` | `#d99a06` |
| Апельсин | `--color-orange` | `#f26d1b` |
| Виноград | `--color-grape` | `#7c3a8e` |
| Питахайа | `--color-pitahaya` | `#e8457f` |
| Cola | `--color-cola` | `#b3231f` |
| Dolce (лайм Dolce) | `--color-dolce` | `#2b4bd8` |
| Gudis (вода) | `--color-gudis` | `#1287d4` |
| Alpine (фон секции Gudis) | `--color-alpine` | `#0b2f4a` |
| Alpine deep | `--color-alpine-deep` | `#071f33` |

### Производные градиенты

- Заголовок Hero «ярких»: `linear-gradient(100deg, tarragon → pear 35% → orange 60% → barberry)` с анимацией shimmer (`src/components/Hero.jsx`).
- Фон секции Gudis: `linear-gradient(168deg, #061826 0%, #0b2f4a 45%, #104061 100%)` + радиальные блики `rgba(18,135,212, …)` (`src/components/Gudis.jsx`).

### Прочее

- `--radius-card: 28px` — скругление карточек.
- `::selection` — фон `--color-brand`, белый текст.
- Glass-панели: `backdrop-filter: blur(16px) saturate(180%)` поверх `bg-white/35` (класс `.glass-panel`).

## Изображения бутылок

Готовые изображения бутылок с брызгами и без фона (WebP, 900×1600, прозрачный фон) собраны в `design/bottles/` — это те же файлы, что используются на сайте (`public/img/`). Фон главной страницы (`hero-bg`, `hero-bg-mobile`) сюда не входит.

| Файл (`design/bottles/`) | Где используется |
|---|---|
| `apelsin.webp` | Вкусы — Апельсин, 0,5 л стекло |
| `barberry.webp` | Вкусы — Барбарис, 0,5 л стекло |
| `grape.webp` | Вкусы — Виноград, 0,5 л стекло |
| `pear.webp` | Вкусы — Груша, 0,5 л стекло |
| `mojito-glass.webp` | Вкусы — Мохито (стакан), 0,5 л стекло |
| `pitahaya.webp` | Вкусы — Питахайа, 0,5 л стекло |
| `tarragon.webp` | Вкусы — Тархун, 0,5 л стекло |
| `cola.webp` | Хиты — Dolce Cola, 1 л |
| `mojito.webp` | Хиты — Mojito, 1 л |
| `orange.webp` | Хиты — Orange, 1 л |
| `lime.webp` | Хиты — Lime, 1 л |
| `gudis-1.webp` | Gudis — стекло, 0,5 л |
| `gudis-2.webp` | Gudis — ПЭТ, негазированная, 1 л |
| `gudis-3.webp` | Gudis — ПЭТ, газированная, 0,5 л |

Нюансы:
- Бутылки Gudis — рендеры на чёрном фоне (без альфа-канала): на сайте фон убирается через `mix-blend-screen` поверх тёмной секции.
- В `assets-src/img-backup/` лежат копии семи вкусовых изображений до оптимизации.
