import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = "-5261931142";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TelegramRequest {
  formType: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  niche?: string;
  services?: string[];
  budget?: number;
  period?: string;
  total?: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: TelegramRequest = await req.json();
    console.log("Received form data:", data);

    // Build message based on form type
    let messageText = "";

    switch (data.formType) {
      case "contact":
        messageText = `🔥 <b>Новая заявка на аудит</b>\n\n` +
          `👤 <b>Имя:</b> ${data.name || "Не указано"}\n` +
          `📞 <b>Телефон:</b> ${data.phone || "Не указан"}\n` +
          `📧 <b>Email:</b> ${data.email || "Не указан"}\n` +
          `💬 <b>Сообщение:</b> ${data.message || "Нет сообщения"}`;
        break;

      case "quick":
        messageText = `⚡ <b>Быстрая заявка</b>\n\n` +
          `👤 <b>Имя:</b> ${data.name || "Не указано"}\n` +
          `📞 <b>Телефон:</b> ${data.phone || "Не указан"}\n` +
          `🏢 <b>Ниша:</b> ${data.niche || "Не указана"}`;
        break;

      case "brief":
        const briefData = data as any;
        messageText = `📋 <b>НОВЫЙ БРИФ НА САЙТ</b>\n\n` +
          `━━━━━━━━━━━━━━━━━━━\n` +
          `<b>👤 КОНТАКТЫ</b>\n` +
          `Имя: ${briefData.name || "—"}\n` +
          `Телефон: ${briefData.phone || "—"}\n` +
          `Telegram/WhatsApp: ${briefData.messenger || "—"}\n\n` +
          `<b>🏢 О КОМПАНИИ</b>\n` +
          `Название: ${briefData.company || "—"}\n` +
          `Сфера: ${briefData.niche || "—"}\n` +
          `Гео: ${briefData.geo || "—"}\n` +
          `Сайт сейчас: ${briefData.currentSite || "—"}\n` +
          `Продукты/услуги: ${briefData.products || "—"}\n` +
          `Конкуренты: ${briefData.competitors || "—"}\n\n` +
          `<b>🎯 ЗАДАЧА</b>\n` +
          `Тип сайта: ${briefData.siteType || "—"}\n` +
          `Цель сайта: ${briefData.goal || "—"}\n` +
          `Целевая аудитория: ${briefData.audience || "—"}\n\n` +
          `<b>🛠 ФУНКЦИОНАЛ</b>\n` +
          `${(briefData.features || []).map((f: string) => `• ${f}`).join("\n") || "—"}\n\n` +
          `<b>🎨 ДИЗАЙН</b>\n` +
          `Стиль: ${briefData.style || "—"}\n` +
          `Цвета: ${briefData.colors || "—"}\n` +
          `Сочетание: ${briefData.colorCombo || "—"}\n` +
          `Референсы: ${briefData.references || "—"}\n` +
          `Пожелания к дизайну: ${briefData.designWishes || "—"}\n\n` +
          `<b>📦 КОНТЕНТ</b>\n` +
          `Тексты: ${briefData.content || "—"}\n` +
          `Логотип/брендбук: ${briefData.branding || "—"}\n\n` +
          `<b>📎 ФАЙЛЫ — ЛОГОТИП</b>\n` +
          `${briefData.logoFiles || "—"}\n\n` +
          `<b>📎 ФАЙЛЫ — ФОТО ДЛЯ САЙТА</b>\n` +
          `${briefData.photoFiles || "—"}\n\n` +
          `<b>⏱ СРОКИ</b>\n` +
          `${briefData.deadline || "—"}\n\n` +
          `<b>⏭ ПРОПУЩЕННЫЕ ШАГИ</b> (клиент уже знаком)\n` +
          `${briefData.skippedSteps || "—"}\n\n` +
          `<b>💬 ДОПОЛНИТЕЛЬНО</b>\n` +
          `${briefData.additional || "—"}`;
        break;

      case "brief-farooq":
        const f = data as any;
        messageText = `🤖 <b>AI CONSULTING BRIEF — FAROOQ</b>\n\n` +
          `━━━━━━━━━━━━━━━━━━━\n` +
          `<b>👤 CONTACT</b>\n` +
          `Name: ${f.name || "—"}\n` +
          `Reach: ${f.contact || "—"}\n\n` +
          `<b>🧠 Q1 — What you help clients do</b>\n` +
          `Services: ${f.services || "—"}\n` +
          `Own words: ${f.servicesOther || "—"}\n\n` +
          `<b>💼 Q2 — How clients buy</b>\n` +
          `Process: ${f.salesProcess || "—"}\n` +
          `Sales manager: ${f.hasSalesManager || "—"}\n` +
          `Automation: ${f.hasAutomation || "—"}\n\n` +
          `<b>🌐 Q3 — Website</b>\n` +
          `Has website: ${f.hasWebsite || "—"}\n` +
          `URL: ${f.websiteUrl || "—"}\n` +
          `What it does: ${f.websiteRole || "—"}\n\n` +
          `<b>✨ Notes</b>\n${f.notes || "—"}`;
        break;

      case "calculator":
        const servicesText = data.services?.join(", ") || "Не выбраны";
        messageText = `💰 <b>Заявка с калькулятора</b>\n\n` +
          `📋 <b>Услуги:</b> ${servicesText}\n` +
          `🏢 <b>Ниша:</b> ${data.niche || "Не указана"}\n` +
          `💵 <b>Бюджет:</b> ${data.budget?.toLocaleString("ru-RU") || 0} ₽/мес\n` +
          `📅 <b>Период:</b> ${data.period || "3"} мес.\n` +
          `💎 <b>Итого:</b> ${data.total?.toLocaleString("ru-RU") || 0} ₽`;
        break;

      default:
        messageText = `📩 <b>Новая заявка</b>\n\n` +
          `${JSON.stringify(data, null, 2)}`;
    }

    messageText += `\n\n🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: "HTML",
      }),
    });

    const result = await response.json();
    console.log("Telegram API response:", result);

    if (!result.ok) {
      throw new Error(`Telegram API error: ${result.description}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-telegram function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
