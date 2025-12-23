-- Добавляем колонки для статистики в cases_slider_items
ALTER TABLE public.cases_slider_items 
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS stats_leads TEXT DEFAULT '—',
ADD COLUMN IF NOT EXISTS stats_cpl TEXT DEFAULT '—',
ADD COLUMN IF NOT EXISTS stats_roi TEXT DEFAULT '—';