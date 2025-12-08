import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  type: string;
  category: string;
  label: string;
  description: string | null;
}

interface SettingsMap {
  [key: string]: string;
}

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("category", { ascending: true });
      
      if (error) throw error;
      return data as SiteSetting[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useSiteSettingsMap = () => {
  const { data, isLoading, error } = useSiteSettings();
  
  const settingsMap: SettingsMap = {};
  if (data) {
    data.forEach((setting) => {
      settingsMap[setting.key] = setting.value || "";
    });
  }
  
  return { settings: settingsMap, isLoading, error };
};

export const useSettingsByCategory = (category: string) => {
  const { data, isLoading } = useSiteSettings();
  
  const filtered = data?.filter((s) => s.category === category) || [];
  
  return { settings: filtered, isLoading };
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from("site_settings")
        .update({ value })
        .eq("key", key);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
};

export const useUpdateMultipleSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: { key: string; value: string }[]) => {
      const promises = updates.map(({ key, value }) =>
        supabase.from("site_settings").update({ value }).eq("key", key)
      );
      
      const results = await Promise.all(promises);
      const errors = results.filter((r) => r.error);
      
      if (errors.length > 0) {
        throw new Error("Failed to update some settings");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
};

// Helper function to get a single setting value
export const getSetting = (settings: SettingsMap, key: string, fallback: string = ""): string => {
  return settings[key] || fallback;
};
