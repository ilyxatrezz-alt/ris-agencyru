-- Create case_categories table
CREATE TABLE public.case_categories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    stats_leads TEXT,
    stats_cpl TEXT,
    stats_roi TEXT,
    hero_title TEXT,
    hero_description TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create case_items table for individual cases
CREATE TABLE public.case_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES public.case_categories(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    platform TEXT NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    result_budget TEXT NOT NULL,
    result_period TEXT NOT NULL,
    result_leads TEXT NOT NULL,
    result_cpl TEXT NOT NULL,
    result_roi TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create case_screenshots table
CREATE TABLE public.case_screenshots (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES public.case_categories(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.case_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_screenshots ENABLE ROW LEVEL SECURITY;

-- RLS policies for case_categories
CREATE POLICY "Case categories are viewable by everyone" 
ON public.case_categories FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert case categories" 
ON public.case_categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update case categories" 
ON public.case_categories FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete case categories" 
ON public.case_categories FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS policies for case_items
CREATE POLICY "Case items are viewable by everyone" 
ON public.case_items FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert case items" 
ON public.case_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update case items" 
ON public.case_items FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete case items" 
ON public.case_items FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS policies for case_screenshots
CREATE POLICY "Case screenshots are viewable by everyone" 
ON public.case_screenshots FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert case screenshots" 
ON public.case_screenshots FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update case screenshots" 
ON public.case_screenshots FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete case screenshots" 
ON public.case_screenshots FOR DELETE USING (auth.uid() IS NOT NULL);

-- Add triggers for updated_at
CREATE TRIGGER update_case_categories_updated_at
BEFORE UPDATE ON public.case_categories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_items_updated_at
BEFORE UPDATE ON public.case_items
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_screenshots_updated_at
BEFORE UPDATE ON public.case_screenshots
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();