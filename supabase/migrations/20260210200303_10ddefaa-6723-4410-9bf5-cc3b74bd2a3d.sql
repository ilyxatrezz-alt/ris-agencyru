
-- Create payments table for multiple payments per finance record
CREATE TABLE public.crm_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  finance_id UUID NOT NULL REFERENCES public.crm_finances(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL DEFAULT 0,
  payment_date DATE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auth users can view payments" ON public.crm_payments FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can insert payments" ON public.crm_payments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can update payments" ON public.crm_payments FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can delete payments" ON public.crm_payments FOR DELETE USING (auth.uid() IS NOT NULL);
