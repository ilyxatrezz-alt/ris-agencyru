
-- Settlements between partners (who received money, who confirmed they took their share)
CREATE TABLE public.crm_settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount NUMERIC NOT NULL DEFAULT 0,
  description TEXT,
  received_by TEXT NOT NULL CHECK (received_by IN ('alexander', 'ilya')),
  alexander_confirmed BOOLEAN NOT NULL DEFAULT false,
  ilya_confirmed BOOLEAN NOT NULL DEFAULT false,
  settlement_date DATE NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_settlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auth users can view settlements" ON public.crm_settlements FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can insert settlements" ON public.crm_settlements FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can update settlements" ON public.crm_settlements FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can delete settlements" ON public.crm_settlements FOR DELETE USING (auth.uid() IS NOT NULL);
