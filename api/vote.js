// api/vote.js — Anti-Spam Crowdsource Vote Handler
const ipRateLimits = new Map();
const COOLDOWN_MS = 45000; // 45 seconds anti-spam

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get Client IP for Rate Limiting
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : (req.socket?.remoteAddress || 'unknown-ip');
  
  const now = Date.now();
  const lastTime = ipRateLimits.get(ip) || 0;

  if (now - lastTime < COOLDOWN_MS) {
    const remainingSec = Math.ceil((COOLDOWN_MS - (now - lastTime)) / 1000);
    return res.status(429).json({
      error: 'Too many requests / Spamdan himoya',
      messageUz: `Iltimos, ${remainingSec} soniya kuting!`,
      messageRu: `Пожалуйста, подождите ${remainingSec} сек!`,
      retryAfter: remainingSec
    });
  }

  const { route, level, userId } = req.body || {};
  if (!route || !['low', 'med', 'high'].includes(level)) {
    return res.status(400).json({ error: 'Invalid parameters / Noto\'g\'ri parametrlar' });
  }

  // Record vote timestamp for this IP
  ipRateLimits.set(ip, now);

  // Clean old rate limits memory
  if (ipRateLimits.size > 5000) {
    for (const [key, ts] of ipRateLimits.entries()) {
      if (now - ts > COOLDOWN_MS) ipRateLimits.delete(key);
    }
  }

  return res.status(200).json({
    status: 'success',
    route,
    level,
    bonusPoints: 15,
    messageUz: "Rahmat! Bahoingiz qabul qilindi (+15 ball)",
    messageRu: "Спасибо! Ваша оценка принята (+15 баллов)"
  });
}
