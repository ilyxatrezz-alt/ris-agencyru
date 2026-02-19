import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ── Team Members ──
export const useTeamMembers = () =>
  useQuery({
    queryKey: ["crm-team"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_team_members")
        .select("*")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return data;
    },
  });

// ── Clients ──
export const useClients = () =>
  useQuery({
    queryKey: ["crm-clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_clients")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useClient = (id: string) =>
  useQuery({
    queryKey: ["crm-client", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_clients")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

export const useCreateClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (client: {
      name: string;
      contact_person?: string;
      phone?: string;
      email?: string;
      telegram?: string;
      website?: string;
      notes?: string;
      status?: string;
      services?: Record<string, any>;
    }) => {
      const { data, error } = await supabase
        .from("crm_clients")
        .insert(client)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-clients"] }),
  });
};

export const useUpdateClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from("crm_clients").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-clients"] }),
  });
};

export const useDeleteClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("crm_clients").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-clients"] }),
  });
};

// ── Tasks ──
export const useAllTasks = () =>
  useQuery({
    queryKey: ["crm-all-tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_tasks")
        .select("*, crm_team_members(name), crm_clients(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useClientTasks = (clientId: string) =>
  useQuery({
    queryKey: ["crm-tasks", clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_tasks")
        .select("*, crm_team_members(name)")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!clientId,
  });

export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (task: {
      client_id: string;
      title: string;
      description?: string;
      assignee_id?: string;
      status?: string;
      priority?: string;
      due_date?: string;
    }) => {
      const { error } = await supabase.from("crm_tasks").insert(task);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["crm-tasks", vars.client_id] });
      qc.invalidateQueries({ queryKey: ["crm-all-tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; client_id: string; [key: string]: any }) => {
      const { error } = await supabase.from("crm_tasks").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["crm-tasks", vars.client_id] });
      qc.invalidateQueries({ queryKey: ["crm-all-tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, client_id }: { id: string; client_id: string }) => {
      const { error } = await supabase.from("crm_tasks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["crm-tasks", vars.client_id] }),
  });
};

// ── Finances ──
export const useAllFinances = () =>
  useQuery({
    queryKey: ["crm-all-finances"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_finances")
        .select("*, crm_clients(name), crm_payments(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useClientFinances = (clientId: string) =>
  useQuery({
    queryKey: ["crm-finances", clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_finances")
        .select("*, crm_contractors(*), crm_expenses(*), crm_payments(*)")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!clientId,
  });

export const useCreateFinance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (finance: {
      client_id: string;
      period: string;
      amount: number;
      alexander_percent: number;
      ilya_percent: number;
      cash_out_percent?: number;
      notes?: string;
      payment_date?: string;
    }) => {
      const { data, error } = await supabase.from("crm_finances").insert(finance).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["crm-finances", vars.client_id] }),
  });
};

export const useUpdateFinance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, client_id, ...updates }: { id: string; client_id: string; [key: string]: any }) => {
      const { error } = await supabase.from("crm_finances").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["crm-finances", vars.client_id] }),
  });
};

export const useDeleteFinance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, client_id }: { id: string; client_id: string }) => {
      const { error } = await supabase.from("crm_finances").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["crm-finances", vars.client_id] }),
  });
};

// ── Contractors ──
export const useCreateContractor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (c: { finance_id: string; name: string; amount: number; description?: string }) => {
      const { error } = await supabase.from("crm_contractors").insert(c);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-finances"] }),
  });
};

export const useDeleteContractor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("crm_contractors").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-finances"] }),
  });
};

// ── Payments ──
export const useCreatePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: { finance_id: string; amount: number; payment_date: string; description?: string }) => {
      const { error } = await supabase.from("crm_payments").insert(p);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-finances"] }),
  });
};

export const useDeletePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("crm_payments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-finances"] }),
  });
};

// ── Expenses ──
export const useClientExpenses = (clientId: string) =>
  useQuery({
    queryKey: ["crm-expenses", clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_expenses")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!clientId,
  });

export const useCreateExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (e: {
      client_id: string;
      finance_id?: string;
      title: string;
      amount: number;
      description?: string;
    }) => {
      const { error } = await supabase.from("crm_expenses").insert(e);
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["crm-expenses", vars.client_id] }),
  });
};

export const useDeleteExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, client_id }: { id: string; client_id: string }) => {
      const { error } = await supabase.from("crm_expenses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["crm-expenses", vars.client_id] }),
  });
};

// ── Dashboard Stats ──
export const useCrmStats = () =>
  useQuery({
    queryKey: ["crm-stats"],
    queryFn: async () => {
      const [clients, tasks, finances, expenses, contractors, agencyExp, payments] = await Promise.all([
        supabase.from("crm_clients").select("id, status"),
        supabase.from("crm_tasks").select("id, status"),
        supabase.from("crm_finances").select("alexander_percent, ilya_percent, cash_out_percent, id"),
        supabase.from("crm_expenses").select("amount"),
        supabase.from("crm_contractors").select("amount, finance_id"),
        supabase.from("crm_agency_expenses").select("amount"),
        supabase.from("crm_payments").select("amount, finance_id"),
      ]);
      if (clients.error) throw clients.error;
      if (tasks.error) throw tasks.error;
      if (finances.error) throw finances.error;
      if (expenses.error) throw expenses.error;
      if (contractors.error) throw contractors.error;
      if (agencyExp.error) throw agencyExp.error;
      if (payments.error) throw payments.error;

      // Build finance totals from payments
      const finTotals: Record<string, number> = {};
      payments.data.forEach((p) => {
        finTotals[p.finance_id] = (finTotals[p.finance_id] || 0) + Number(p.amount);
      });

      const totalRevenue = Object.values(finTotals).reduce((s, v) => s + v, 0);
      const totalExpenses = expenses.data.reduce((s, e) => s + Number(e.amount), 0);
      const totalContractors = contractors.data.reduce((s, c) => s + Number(c.amount), 0);
      const totalCashOut = finances.data.reduce((s, f) => {
        const fTotal = finTotals[f.id] || 0;
        return s + (f.cash_out_percent ? (fTotal * Number(f.cash_out_percent)) / 100 : 0);
      }, 0);
      const totalAgencyExp = agencyExp.data.reduce((s, e) => s + Number(e.amount), 0);
      const netProfit = totalRevenue - totalExpenses - totalContractors - totalCashOut - totalAgencyExp;

      const activeClients = clients.data.filter((c) => c.status === "active").length;
      const pendingTasks = tasks.data.filter((t) => t.status === "pending" || t.status === "in_progress").length;

      let alexanderTotal = 0;
      let ilyaTotal = 0;
      if (totalRevenue > 0 && netProfit > 0) {
        const alexanderWeightedPercent = finances.data.reduce((s, f) => {
          const fTotal = finTotals[f.id] || 0;
          return s + Number(f.alexander_percent) * (fTotal / totalRevenue);
        }, 0);
        const ilyaWeightedPercent = finances.data.reduce((s, f) => {
          const fTotal = finTotals[f.id] || 0;
          return s + Number(f.ilya_percent) * (fTotal / totalRevenue);
        }, 0);
        if (alexanderWeightedPercent + ilyaWeightedPercent > 0) {
          alexanderTotal = (netProfit * alexanderWeightedPercent) / (alexanderWeightedPercent + ilyaWeightedPercent);
          ilyaTotal = (netProfit * ilyaWeightedPercent) / (alexanderWeightedPercent + ilyaWeightedPercent);
        }
      }

      return {
        totalClients: clients.data.length,
        activeClients,
        totalTasks: tasks.data.length,
        pendingTasks,
        totalRevenue,
        alexanderTotal,
        ilyaTotal,
        netProfit,
        totalExpenses,
        totalContractors,
        totalCashOut,
        totalAgencyExp,
      };
    },
  });

// ── Agency Expenses ──
export const useAgencyExpenses = () =>
  useQuery({
    queryKey: ["crm-agency-expenses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_agency_expenses")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useCreateAgencyExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (e: { title: string; amount: number; description?: string; period?: string }) => {
      const { error } = await supabase.from("crm_agency_expenses").insert(e);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-agency-expenses"] }),
  });
};

export const useDeleteAgencyExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("crm_agency_expenses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-agency-expenses"] }),
  });
};

// ── Settlements ──
export const useSettlements = () =>
  useQuery({
    queryKey: ["crm-settlements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_settlements")
        .select("*")
        .order("settlement_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useCreateSettlement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (s: { amount: number; description?: string; received_by: string; settlement_date: string }) => {
      const { error } = await supabase.from("crm_settlements").insert(s);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-settlements"] }),
  });
};

export const useUpdateSettlement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from("crm_settlements").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-settlements"] }),
  });
};

export const useDeleteSettlement = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("crm_settlements").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["crm-settlements"] }),
  });
};
