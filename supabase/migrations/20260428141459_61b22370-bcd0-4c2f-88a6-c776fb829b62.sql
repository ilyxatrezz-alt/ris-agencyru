CREATE TABLE public.project_manifest_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_key text NOT NULL UNIQUE,
  completed boolean NOT NULL DEFAULT false,
  comment text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_manifest_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view manifest tasks" ON public.project_manifest_tasks FOR SELECT USING (true);
CREATE POLICY "Anyone can insert manifest tasks" ON public.project_manifest_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update manifest tasks" ON public.project_manifest_tasks FOR UPDATE USING (true) WITH CHECK (true);

CREATE TRIGGER update_manifest_updated_at
  BEFORE UPDATE ON public.project_manifest_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_anti_aging_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.project_manifest_tasks;