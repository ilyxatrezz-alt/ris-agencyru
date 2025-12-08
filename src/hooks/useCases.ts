import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CaseCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  image_url: string | null;
  stats_leads: string | null;
  stats_cpl: string | null;
  stats_roi: string | null;
  hero_title: string | null;
  hero_description: string | null;
  order_index: number | null;
  is_active: boolean | null;
}

export interface CaseItem {
  id: string;
  category_id: string;
  title: string;
  platform: string;
  problem: string;
  solution: string;
  result_budget: string;
  result_period: string;
  result_leads: string;
  result_cpl: string;
  result_roi: string;
  order_index: number | null;
  is_active: boolean | null;
}

export interface CaseScreenshot {
  id: string;
  category_id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  order_index: number | null;
  is_active: boolean | null;
}

// Categories
export const useCaseCategories = () => {
  return useQuery({
    queryKey: ["case-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_categories")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as CaseCategory[];
    },
  });
};

export const useCaseCategory = (slug: string) => {
  return useQuery({
    queryKey: ["case-category", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as CaseCategory | null;
    },
    enabled: !!slug,
  });
};

export const useUpdateCaseCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CaseCategory> }) => {
      const { error } = await supabase
        .from("case_categories")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-categories"] });
    },
  });
};

// Case Items
export const useCaseItems = (categoryId?: string) => {
  return useQuery({
    queryKey: ["case-items", categoryId],
    queryFn: async () => {
      let query = supabase
        .from("case_items")
        .select("*")
        .order("order_index", { ascending: true });
      
      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as CaseItem[];
    },
    enabled: categoryId ? !!categoryId : true,
  });
};

export const useCreateCaseItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<CaseItem, "id">) => {
      const { error } = await supabase.from("case_items").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-items"] });
    },
  });
};

export const useUpdateCaseItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CaseItem> }) => {
      const { error } = await supabase
        .from("case_items")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-items"] });
    },
  });
};

export const useDeleteCaseItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("case_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-items"] });
    },
  });
};

// Screenshots
export const useCaseScreenshots = (categoryId?: string) => {
  return useQuery({
    queryKey: ["case-screenshots", categoryId],
    queryFn: async () => {
      let query = supabase
        .from("case_screenshots")
        .select("*")
        .order("order_index", { ascending: true });
      
      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as CaseScreenshot[];
    },
    enabled: categoryId ? !!categoryId : true,
  });
};

export const useCreateCaseScreenshot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<CaseScreenshot, "id">) => {
      const { error } = await supabase.from("case_screenshots").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-screenshots"] });
    },
  });
};

export const useUpdateCaseScreenshot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CaseScreenshot> }) => {
      const { error } = await supabase
        .from("case_screenshots")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-screenshots"] });
    },
  });
};

export const useDeleteCaseScreenshot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("case_screenshots").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-screenshots"] });
    },
  });
};
