
-- Agency-wide expenses (not tied to a client)
CREATE TABLE public.crm_agency_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  description text,
  period text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_agency_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auth users can view agency expenses" ON public.crm_agency_expenses FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can insert agency expenses" ON public.crm_agency_expenses FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can update agency expenses" ON public.crm_agency_expenses FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can delete agency expenses" ON public.crm_agency_expenses FOR DELETE USING (auth.uid() IS NOT NULL);
