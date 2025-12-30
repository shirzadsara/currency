import axios from 'axios';
import cron from 'node-cron';
import prisma from '../db';

// فقط ارزهای مدنظر
const EXCHANGE_API_URL = 'https://open.er-api.com/v6/latest/USD';
const ALLOWED_SYMBOLS = [
  "USD",
  "EUR",
  "GBP",
  "OMR",
  "AUD",
  "AED",
  "TRY",
  "CNY",
  "CAD",
];
const USD_TO_IRR = 1380000;   //هر دلار ... ریال
// دریافت قیمت‌ها از API
async function fetchPrices() {
  const { data } = await axios.get(EXCHANGE_API_URL);
  console.log('API data fetched'); 
  return data.rates;
}
//داده رو از api میگیره و در دیتابیس قرار میدهد.
async function updateCurrencyPrices() {
  try {
    const rates = await fetchPrices();
    const now = new Date(); // ← زمان دقیق

    for (const [symbol, price] of Object.entries(rates)) {
      if (!ALLOWED_SYMBOLS.includes(symbol)) continue; //فقط بعضی از ارزها رو نمایش بده

      const priceInIRR =Math.floor( USD_TO_IRR / Number(price)); //تبدیل ب ریال

      await prisma.currencyPrice.create({
        data: {
          symbol,
          price: priceInIRR,
          date: now,
        },
      });
      console.log(`✅ ${symbol} saved at ${now.toISOString()}`);
    }
  } catch (err) {
    console.error('❌ Currency error:', err);
  }
}


// اجرای خودکار هر ساعت
cron.schedule('0 * * * *', async () => {
  console.log('⏱ Updating currency prices...');
  await updateCurrencyPrices();
});

// اجرای اولیه
(async () => {
  await updateCurrencyPrices();
})();
