-- Таблица для хранения настроек сайта
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  type TEXT NOT NULL DEFAULT 'text', -- text, number, image, json
  category TEXT NOT NULL DEFAULT 'general', -- contacts, company, stats, content
  label TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Site settings are viewable by everyone" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Only authenticated users can modify
CREATE POLICY "Authenticated users can update settings" 
ON public.site_settings 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert settings" 
ON public.site_settings 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (key, value, type, category, label, description) VALUES
-- Контакты
('phone', '+7 (949) 882-33-51', 'text', 'contacts', 'Телефон', 'Основной номер телефона'),
('phone_raw', '+79498823351', 'text', 'contacts', 'Телефон (для ссылок)', 'Телефон без форматирования'),
('email', 'info@ris-agency.ru', 'text', 'contacts', 'Email', 'Основной email'),
('telegram', '@ris_agency', 'text', 'contacts', 'Telegram', 'Имя в Telegram'),
('telegram_url', 'https://t.me/ris_agency', 'text', 'contacts', 'Telegram URL', 'Ссылка на Telegram'),
('location', 'Работаем по всей России', 'text', 'contacts', 'Локация', 'Географическое расположение'),
('working_hours_weekdays', 'Пн-Пт: 9:00 - 21:00', 'text', 'contacts', 'Режим работы (будни)', 'Часы работы в будни'),
('working_hours_weekend', 'Сб-Вс: по договорённости', 'text', 'contacts', 'Режим работы (выходные)', 'Часы работы в выходные'),

-- Компания
('company_name', 'РИС', 'text', 'company', 'Название', 'Краткое название компании'),
('company_full_name', 'РИС — Реклама и Сайты', 'text', 'company', 'Полное название', 'Полное название компании'),
('company_tagline', 'Реклама и Сайты', 'text', 'company', 'Слоган', 'Подзаголовок/слоган'),
('company_description', 'Превращаем рекламные бюджеты в прибыль. Работаем с 2014 года. Гарантия результата или возврат денег.', 'text', 'company', 'Описание', 'Краткое описание компании'),
('company_year_founded', '2014', 'number', 'company', 'Год основания', 'Год основания компании'),

-- Юридические данные
('legal_name', 'ИП Кузьмин А.А.', 'text', 'legal', 'Наименование ИП', 'Юридическое наименование'),
('legal_inn', '165811695515', 'text', 'legal', 'ИНН', 'ИНН предпринимателя'),
('legal_ogrnip', '314169024600232', 'text', 'legal', 'ОГРНИП', 'ОГРНИП предпринимателя'),

-- Статистика
('stats_ad_budget', '500+ млн ₽', 'text', 'stats', 'Рекламные бюджеты', 'Общая сумма управляемых бюджетов'),
('stats_projects', '200+', 'text', 'stats', 'Проектов', 'Количество успешных проектов'),
('stats_clients_loyalty', '70%', 'text', 'stats', 'Лояльность клиентов', 'Процент клиентов с нами 3+ года'),
('stats_launch_time', '3 дня', 'text', 'stats', 'Время запуска', 'Время до запуска рекламы'),

-- Тексты Hero
('hero_title_1', 'Превращаем', 'text', 'hero', 'Заголовок 1', 'Первое слово главного заголовка'),
('hero_title_2', 'рекламу', 'text', 'hero', 'Заголовок 2', 'Выделенное слово заголовка'),
('hero_title_3', 'прибыль', 'text', 'hero', 'Заголовок 3', 'Последнее выделенное слово'),
('hero_subtitle', 'Создаём сайты и запускаем рекламу, которая окупается. Комплексный digital-маркетинг с гарантией результата.', 'text', 'hero', 'Подзаголовок', 'Описание под заголовком'),
('hero_badge', 'С 2014 года • 500+ млн ₽ рекламных бюджетов', 'text', 'hero', 'Бейдж', 'Текст в бейдже сверху'),
('hero_cta_primary', 'Получить аудит бесплатно', 'text', 'hero', 'Кнопка CTA', 'Текст основной кнопки'),
('hero_cta_secondary', 'Смотреть кейсы', 'text', 'hero', 'Вторичная кнопка', 'Текст второй кнопки'),

-- Тексты About
('about_title', 'О нашем агентстве', 'text', 'about', 'Заголовок страницы О нас', 'Главный заголовок страницы'),
('about_description', 'Мы — команда digital-экспертов с 10-летним опытом в интернет-маркетинге', 'text', 'about', 'Описание', 'Подзаголовок страницы О нас'),

-- Тексты Services
('services_title', 'Наши услуги', 'text', 'services', 'Заголовок страницы Услуги', 'Главный заголовок страницы'),
('services_description', 'Комплексный digital-маркетинг для роста вашего бизнеса', 'text', 'services', 'Описание', 'Подзаголовок страницы Услуги'),

-- Тексты Contacts
('contacts_title', 'Свяжитесь с нами', 'text', 'contacts_page', 'Заголовок страницы Контакты', 'Главный заголовок страницы'),
('contacts_description', 'Готовы обсудить ваш проект? Ответим за 15 минут и предложим решение, которое принесёт результат.', 'text', 'contacts_page', 'Описание', 'Подзаголовок страницы Контакты');

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage policies
CREATE POLICY "Site images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can upload site images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'site-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update site images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'site-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete site images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'site-images' AND auth.uid() IS NOT NULL);