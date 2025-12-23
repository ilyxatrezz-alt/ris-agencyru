import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProcessStep {
  id: string;
  step_number: string;
  title: string;
  description: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useProcessSteps() {
  return useQuery({
    queryKey: ["process-steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("process_steps")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as ProcessStep[];
    },
  });
}

export function useAdminProcessSteps() {
  return useQuery({
    queryKey: ["admin-process-steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("process_steps")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as ProcessStep[];
    },
  });
}

export function useProcessStepsMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: Omit<ProcessStep, "id" | "created_at" | "updated_at">) => {
      const { error } = await supabase.from("process_steps").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-process-steps"] });
      queryClient.invalidateQueries({ queryKey: ["process-steps"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ProcessStep> }) => {
      const { error } = await supabase.from("process_steps").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-process-steps"] });
      queryClient.invalidateQueries({ queryKey: ["process-steps"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("process_steps").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-process-steps"] });
      queryClient.invalidateQueries({ queryKey: ["process-steps"] });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (items: { id: string; order_index: number }[]) => {
      for (const item of items) {
        const { error } = await supabase
          .from("process_steps")
          .update({ order_index: item.order_index })
          .eq("id", item.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-process-steps"] });
      queryClient.invalidateQueries({ queryKey: ["process-steps"] });
    },
  });

  return { createMutation, updateMutation, deleteMutation, reorderMutation };
}
