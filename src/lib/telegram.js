// Sends the order form straight to a Telegram chat via the Bot API.
//
// Config lives in .env (see .env.example):
//   VITE_TELEGRAM_BOT_TOKEN — token from @BotFather
//   VITE_TELEGRAM_CHAT_ID   — chat where orders should land
//
// Note: the token ships in the client bundle by design (the site has no
// backend). Keep the bot private and revoke the token via @BotFather
// (/revoke) if it ever leaks.
const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function sendOrder({ name, phone, business, volume, city }) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error(
      "Telegram is not configured: set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in .env",
    );
  }

  const text = [
    "<b>Новая заявка — Сладкий Град</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Тип бизнеса:</b> ${escapeHtml(business)}`,
    volume ? `<b>Интересующий объём:</b> ${escapeHtml(volume)}` : null,
    `<b>Город:</b> ${escapeHtml(city)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    throw new Error(`Telegram API responded with ${res.status}`);
  }
}
