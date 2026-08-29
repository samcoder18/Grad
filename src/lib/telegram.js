// Sends the order form straight to a Telegram chat via the Bot API, plus an
// optional voice message recorded in the browser (sendVoice below).
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

// Local timestamp for the message footer (Moscow time, the team is there).
const orderTimestamp = () =>
  new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export async function sendOrder({ name, phone, business, volume, city, hasVoice }) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error(
      "Telegram is not configured: set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in .env",
    );
  }

  const text = [
    "🍋 <b>Новая заявка — Сладкий Град</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(phone)}`,
    `🏢 <b>Тип бизнеса:</b> ${escapeHtml(business)}`,
    volume ? `📦 <b>Объём:</b> ${escapeHtml(volume)}` : null,
    `📍 <b>Город:</b> ${escapeHtml(city)}`,
    hasVoice ? "🎙 <b>Голосовое:</b> прикреплено ниже" : null,
    "",
    `<i>🕐 ${orderTimestamp()} (МСК)</i>`,
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

const EXT_BY_TYPE = {
  "audio/webm": "webm",
  "audio/ogg": "ogg",
  "audio/mp4": "m4a",
};

// Sends the recorded voice message as an audio file. Uses sendAudio (not
// sendVoice) because it accepts the containers browsers actually record
// (webm/opus in Chrome, ogg in Firefox, mp4 in Safari).
export async function sendVoice(blob, caption) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error(
      "Telegram is not configured: set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in .env",
    );
  }

  const baseType = (blob.type || "audio/webm").split(";")[0];
  const ext = EXT_BY_TYPE[baseType] || "webm";

  const data = new FormData();
  data.append("chat_id", CHAT_ID);
  data.append("audio", blob, `voice.${ext}`);
  data.append("caption", caption);
  data.append("title", "Голосовое к заявке — Сладкий Град");
  data.append("parse_mode", "HTML");

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendAudio`, {
    method: "POST",
    body: data,
  });

  if (!res.ok) {
    throw new Error(`Telegram API responded with ${res.status}`);
  }
}
