CREATE TABLE public.project_anti_aging_tasks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_key text NOT NULL UNIQUE,
  completed boolean NOT NULL DEFAULT false,
  comment text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_anti_aging_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tasks"
  ON public.project_anti_aging_tasks FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tasks"
  ON public.project_anti_aging_tasks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update tasks"
  ON public.project_anti_aging_tasks FOR UPDATE
  USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_anti_aging_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_anti_aging_updated_at
  BEFORE UPDATE ON public.project_anti_aging_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_anti_aging_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.project_anti_aging_tasks;