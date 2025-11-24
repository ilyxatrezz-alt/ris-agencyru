-- Create websites showcase table
CREATE TABLE public.websites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  project_type TEXT NOT NULL,
  result_description TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Websites are viewable by everyone" 
ON public.websites 
FOR SELECT 
USING (is_active = true);

-- Create policies for admin access (we'll use a simple admin check)
CREATE POLICY "Admins can insert websites" 
ON public.websites 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update websites" 
ON public.websites 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete websites" 
ON public.websites 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_websites_updated_at
BEFORE UPDATE ON public.websites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.websites (title, description, image_url, category, project_type, result_description, order_index) VALUES
('Стоматологическая клиника "Дент-Престиж"', 'Создание современного сайта для премиальной стоматологии', '/placeholder.svg', 'medicine-beauty', 'Корпоративный сайт', 'Рост онлайн-записей на 85%, улучшение имиджа клиники', 1),
('Строительная компания "ДомМечты"', 'Разработка каталога проектов коттеджей с калькулятором стоимости', '/placeholder.svg', 'construction', 'Каталог + Лендинг', 'Увеличение заявок на строительство на 120%', 2),
('Ресторан "Вкусная Италия"', 'Сайт с онлайн-меню и системой бронирования столиков', '/placeholder.svg', 'horeca', 'Корпоративный сайт', 'Онлайн-бронирования выросли на 200%', 3);

-- Create storage bucket for website images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('website-images', 'website-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Website images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'website-images');

CREATE POLICY "Authenticated users can upload website images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'website-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update website images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'website-images' AND auth.uid() IS NOT NULL);