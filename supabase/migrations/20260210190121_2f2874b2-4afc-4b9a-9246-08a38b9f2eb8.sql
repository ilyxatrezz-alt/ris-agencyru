
-- Team members (Александр, Илья, etc.)
CREATE TABLE public.crm_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users can view team" ON public.crm_team_members FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can manage team" ON public.crm_team_members FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- Insert default team members
INSERT INTO public.crm_team_members (name) VALUES ('Александр'), ('Илья');

-- Clients
CREATE TABLE public.crm_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  phone text,
  email text,
  telegram text,
  website text,
  notes text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users can view clients" ON public.crm_clients FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can insert clients" ON public.crm_clients FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can update clients" ON public.crm_clients FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can delete clients" ON public.crm_clients FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_crm_clients_updated_at BEFORE UPDATE ON public.crm_clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Tasks per client
CREATE TABLE public.crm_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.crm_clients(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  assignee_id uuid REFERENCES public.crm_team_members(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'medium',
  due_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users can view tasks" ON public.crm_tasks FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can insert tasks" ON public.crm_tasks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can update tasks" ON public.crm_tasks FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can delete tasks" ON public.crm_tasks FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_crm_tasks_updated_at BEFORE UPDATE ON public.crm_tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Financial records per client per period
CREATE TABLE public.crm_finances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.crm_clients(id) ON DELETE CASCADE NOT NULL,
  period text NOT NULL,
  amount decimal NOT NULL DEFAULT 0,
  alexander_percent decimal NOT NULL DEFAULT 0,
  ilya_percent decimal NOT NULL DEFAULT 0,
  cash_out_percent decimal,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_finances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users can view finances" ON public.crm_finances FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can insert finances" ON public.crm_finances FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can update finances" ON public.crm_finances FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can delete finances" ON public.crm_finances FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_crm_finances_updated_at BEFORE UPDATE ON public.crm_finances FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Contractors per finance record
CREATE TABLE public.crm_contractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  finance_id uuid REFERENCES public.crm_finances(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  amount decimal NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_contractors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users can view contractors" ON public.crm_contractors FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can insert contractors" ON public.crm_contractors FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can update contractors" ON public.crm_contractors FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can delete contractors" ON public.crm_contractors FOR DELETE USING (auth.uid() IS NOT NULL);

-- Misc expenses per client
CREATE TABLE public.crm_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.crm_clients(id) ON DELETE CASCADE NOT NULL,
  finance_id uuid REFERENCES public.crm_finances(id) ON DELETE SET NULL,
  title text NOT NULL,
  amount decimal NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users can view expenses" ON public.crm_expenses FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can insert expenses" ON public.crm_expenses FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can update expenses" ON public.crm_expenses FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth users can delete expenses" ON public.crm_expenses FOR DELETE USING (auth.uid() IS NOT NULL);
