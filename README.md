# 🚌 JoyBor Tashkent (Toshkent avtobuslari yuklanishi)

**JoyBor** — Toshkent shahri jamoat transporti (avtobus va elektrobuslar) uchun bo'sh o'rinlar va to'lalik darajasini real vaqtda aniqlaydigan veb-xizmat.

> *"Joy bor!" — Toshkentliklar uchun eng kerakli so'z.*

---

## 🌟 Muammo / Проблема
Toshkentda tig'iz paytlarda (ayniqsa 07:30–09:00 va 17:30–19:30 oralig'ida) bekatga kelayotgan avtobusning ichi qanchalik to'laligini oldindan bilib bo'lmaydi. Odamlar to'lib-toshgan avtobusga zo'rg'a chiqishadi, vaholanki orqadan 5 daqiqa o'tib bo'sh avtobus kelayotgan bo'lishi mumkin.

## 🚀 Yechim / Решение
1. **Real vaqt xaritasi (OpenStreetMap):** Avtobuslarning harakati va joylashuvi.
2. **Yuklanish indikatori:**
   - 🟢 **Bo'sh (15–35%)** — o'tirishga joy ko'p.
   - 🟡 **O'rtacha (50–70%)** — tik turish qulay.
   - 🔴 **Tiqilinch (85–100%)** — eshik zo'rg'a yopilyapti.
3. **⚡ Aqlli Maslahat (Smart Advice):** «28-avtobus to'la (95%). Orqadan 6 daqiqada bo'sh avtobus (25%) kelyapti — kutishni tavsiya qilamiz!»
4. **👥 Kraudsorsing («Men avtobusdaman»):** Yo'lovchilar 1 marta bosish orqali holatni baholaydilar.
5. **🧮 Matematik model (Oppenheimer Formula):**
   $$\text{Yuklanish} = \text{Baza} \times K_{\text{vaqt}} \times K_{\text{hudud}} \times K_{\text{oraliq}}$$
   - **Vaqt ko'rsatkichi:** Ertalabki va kechki soatlar.
   - **Hudud ko'rsatkichi:** Chorsu, Amir Temur, Buyuk Ipak Yo'li kabi yirik tugunlar.
   - **Oraliq (Kechikish):** Avtobus tirbandlikda kechiksa, to'plangan odamlar hisobiga to'lalik keskin ortadi.

---

## 🛠 Texnologiyalar / Стек технологий
- **Frontend:** HTML5, Tailwind CSS, Leaflet.js, Lucide Icons
- **Xarita:** OpenStreetMap Tiles
- **Tillar:** O'zbekcha 🇺🇿 / Русский 🇷🇺

---

## 💻 Loyihani ishga tushirish / Запуск проекта

1. Repozitoriyni klonlash:
   ```bash
   git clone <REPO_URL>
   cd joybor-tashkent
   ```

2. Mahalliy serverda ochish:
   ```bash
   # Python orqali
   python -m http.server 4321
   ```
3. Brauzerda oching: `http://localhost:4321`

---
Made with ❤️ in Tashkent.
