import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CasesSliderItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  link: string;
  description: string | null;
  stats_leads: string | null;
  stats_cpl: string | null;
  stats_roi: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useCasesSliderItems() {
  return useQuery({
    queryKey: ["cases-slider-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases_slider_items")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as CasesSliderItem[];
    },
  });
}

export function useAdminCasesSliderItems() {
  return useQuery({
    queryKey: ["admin-cases-slider-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases_slider_items")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as CasesSliderItem[];
    },
  });
}

export function useCasesSliderMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: Omit<CasesSliderItem, "id" | "created_at" | "updated_at">) => {
      const { error } = await supabase.from("cases_slider_items").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cases-slider-items"] });
      queryClient.invalidateQueries({ queryKey: ["cases-slider-items"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CasesSliderItem> }) => {
      const { error } = await supabase.from("cases_slider_items").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cases-slider-items"] });
      queryClient.invalidateQueries({ queryKey: ["cases-slider-items"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cases_slider_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cases-slider-items"] });
      queryClient.invalidateQueries({ queryKey: ["cases-slider-items"] });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (items: { id: string; order_index: number }[]) => {
      for (const item of items) {
        const { error } = await supabase
          .from("cases_slider_items")
          .update({ order_index: item.order_index })
          .eq("id", item.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cases-slider-items"] });
      queryClient.invalidateQueries({ queryKey: ["cases-slider-items"] });
    },
  });

  return { createMutation, updateMutation, deleteMutation, reorderMutation };
}
