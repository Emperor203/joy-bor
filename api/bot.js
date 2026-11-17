// api/bot.js — Telegram Bot Webhook & Anti-Spam Guard
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('JoyBor Telegram Bot Webhook is running 🚀');
  }

  const token = process.env.BOT_TOKEN;
  if (!token) {
    console.error('BOT_TOKEN is not configured in Vercel environment variables');
    return res.status(200).json({ ok: true, note: 'BOT_TOKEN_NOT_SET' });
  }

  const update = req.body;
  if (!update || !update.message) {
    return res.status(200).json({ ok: true });
  }

  const msg = update.message;
  const chatId = msg.chat.id;
  const text = (msg.text || '').trim();
  const userName = msg.from.first_name || 'Foydalanuvchi';

  // Anti-Spam Content Filter: block obvious spam links and ads
  const spamRegex = /(t\.me\/joinchat|https?:\/\/|casino|1xbet|kripto|крипта|ставки|подпишись)/i;
  if (spamRegex.test(text)) {
    console.warn(`Spam detected from user ${chatId}: ${text}`);
    return res.status(200).json({ ok: true, filtered: true });
  }

  const webAppUrl = process.env.WEBAPP_URL || 'https://joy-bor.vercel.app';

  if (text.startsWith('/start') || text.startsWith('/help')) {
    const welcomeText = 
`Assalomu alaykum, ${userName}! 🚌

*JoyBor Toshkent* — poytaxtimiz jamoat transporti bo'sh o'rinlari va avtobuslarning to'lalik darajasini ko'rsatuvchi xizmat.

👉 Avtobuslarning qayerda ekanligini va salonida bo'sh joy bor-yo'qligini bilish uchun pastdagi tugmani bosing!

---
Здравствуйте, ${userName}! 
Нажмите кнопку ниже, чтобы открыть интерактивный радар автобусов Ташкента.`;

    const replyMarkup = {
      inline_keyboard: [
        [
          {
            text: "🚌 JoyBor ilovasini ochish / Открыть карту",
            web_app: { url: webAppUrl }
          }
        ],
        [
          {
            text: "📍 Qanday ishlaydi? / Как это работает?",
            callback_data: "how_it_works"
          }
        ]
      ]
    };

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: welcomeText,
          parse_mode: 'Markdown',
          reply_markup: replyMarkup
        })
      });
    } catch (err) {
      console.error('Failed to send Telegram message:', err);
    }
  }

  return res.status(200).json({ ok: true });
}
