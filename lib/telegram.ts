import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(text: string) {
  if (!token || !chatId) return;
  const bot = new TelegramBot(token);
  await bot.sendMessage(chatId, text);
}
