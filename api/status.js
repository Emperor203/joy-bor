// api/status.js — Tashkent Mathematical Engine & Real-time Bus Status
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Current Tashkent Time (UTC+5)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const tashkentTime = new Date(utc + (3600000 * 5));
  const hour = tashkentTime.getHours();
  const minute = tashkentTime.getMinutes();
  const timeDecimal = hour + minute / 60;

  // Time Coefficient K_time (Oppenheimer Time Formula)
  let kTime = 1.0;
  let periodName = "Kunduzgi / Дневной";
  if (timeDecimal >= 7.5 && timeDecimal <= 9.25) {
    kTime = 1.85; // Morning rush hour
    periodName = "Ertalabki tig'iz payt / Утренний час пик";
  } else if (timeDecimal >= 12.5 && timeDecimal <= 14.0) {
    kTime = 1.25; // Lunch time
    periodName = "Tushlik vaqti / Обеденное время";
  } else if (timeDecimal >= 17.5 && timeDecimal <= 19.5) {
    kTime = 1.95; // Evening peak (18:49)
    periodName = "Kechki tig'iz payt / Вечерний час пик";
  } else if (timeDecimal >= 21.0 || timeDecimal < 6.0) {
    kTime = 0.35; // Night time
    periodName = "Tungi sokinlik / Ночное время";
  }

  const routes = [
    { route: 28, base: 42, model: 'Yutong E12 (Электробус)', destinationUz: "Ipak Yo'li ➔ Chorsu", destinationRu: "Ипак Йули ➔ Чорсу" },
    { route: 51, base: 38, model: 'King Long XMQ6125', destinationUz: "Yunusobod 12 ➔ Toshkent vokzali", destinationRu: "Юнусабад 12 ➔ Вокзал Ташкент" },
    { route: 14, base: 30, model: 'MAN A22 CNG', destinationUz: "TTZ ➔ Toshkent MUM", destinationRu: "ТТЗ ➔ ЦУМ" },
    { route: 93, base: 40, model: 'Yutong E12 (Электробус)', destinationUz: "Qo'yliq 1 ➔ Chilonzor 25", destinationRu: "Куйлюк 1 ➔ Чиланзар 25" },
    { route: 24, base: 32, model: 'Mercedes-Benz Conecto', destinationUz: "Qoraqamish 2/4 ➔ Toshkent vokzali", destinationRu: "Каракамыш 2/4 ➔ Вокзал Ташкент" }
  ];

  const calculated = routes.map(r => {
    let occupancy = Math.min(99, Math.round(r.base * kTime));
    let level = occupancy > 75 ? 'high' : (occupancy > 45 ? 'med' : 'low');
    return {
      ...r,
      occupancy,
      level,
      freeSeats: Math.max(1, Math.round(30 * (1 - occupancy / 100))),
      etaMinutes: Math.floor(Math.random() * 5) + 2
    };
  });

  return res.status(200).json({
    status: 'ok',
    tashkentTime: tashkentTime.toLocaleTimeString('ru-RU'),
    period: periodName,
    kTime,
    buses: calculated
  });
}
