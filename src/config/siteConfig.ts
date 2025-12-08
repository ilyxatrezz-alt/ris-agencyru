// Конфигурация сайта - редактируемые данные
export const siteConfig = {
  // Контактные данные
  phone: "+7 (949) 882-33-51",
  phoneRaw: "+79498823351",
  email: "info@ris-agency.ru",
  telegram: "@ris_agency",
  telegramUrl: "https://t.me/ris_agency",
  
  // Данные компании
  company: {
    name: "РИС",
    fullName: "РИС — Реклама и Сайты",
    tagline: "Реклама и Сайты",
    description: "Превращаем рекламные бюджеты в прибыль. Работаем с 2014 года. Гарантия результата или возврат денег.",
    yearFounded: 2014,
  },
  
  // Юридические данные
  legal: {
    name: "ИП Кузьмин А.А.",
    inn: "165811695515",
    ogrnip: "314169024600232",
  },
  
  // Режим работы
  workingHours: {
    weekdays: "Пн-Пт: 9:00 - 21:00",
    weekend: "Сб-Вс: по договорённости",
    callTime: "с 9:00 до 21:00",
  },
  
  // Локация
  location: "Работаем по всей России",
  
  // Статистика
  stats: {
    adBudget: "500+ млн ₽",
    projects: "200+",
    clientsLoyalty: "70%",
    launchTime: "3 дня",
  },
};

export type SiteConfig = typeof siteConfig;
