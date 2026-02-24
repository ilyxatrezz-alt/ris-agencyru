import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useUserRole = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user-role", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      if (error) throw error;
      if (!data?.length) return null;
      return data[0].role as "super_admin" | "sub_admin";
    },
    enabled: !!user,
  });
};

export const useIsSuperAdmin = () => {
  const { data: role, isLoading } = useUserRole();
  return { isSuperAdmin: role === "super_admin", isSubAdmin: role === "sub_admin", role, isLoading };
};

// Get client IDs current user has access to (for sub-admins)
export const useMyClientAccess = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-client-access", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("crm_client_access")
        .select("client_id")
        .eq("user_id", user.id);
      if (error) throw error;
      return data.map((d) => d.client_id);
    },
    enabled: !!user,
  });
};

interface SubAdmin {
  user_id: string;
  email: string;
  name: string;
  client_ids: string[];
}

export const useSubAdmins = () =>
  useQuery({
    queryKey: ["sub-admins"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("manage-sub-admins", {
        body: { action: "list" },
      });
      if (error) throw error;
      return (data?.subAdmins || []) as SubAdmin[];
    },
  });

export const useCreateSubAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, password, name }: { email: string; password: string; name: string }) => {
      const { data, error } = await supabase.functions.invoke("manage-sub-admins", {
        body: { action: "create", email, password, name },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sub-admins"] }),
  });
};

export const useRemoveSubAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke("manage-sub-admins", {
        body: { action: "remove", user_id: userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sub-admins"] }),
  });
};

export const useUpdateSubAdminName = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, name }: { userId: string; name: string }) => {
      const { data, error } = await supabase.functions.invoke("manage-sub-admins", {
        body: { action: "update_name", user_id: userId, name },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sub-admins"] }),
  });
};

export const useToggleClientAccess = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, clientId, grant }: { userId: string; clientId: string; grant: boolean }) => {
      if (grant) {
        const { error } = await supabase
          .from("crm_client_access")
          .insert({ user_id: userId, client_id: clientId });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("crm_client_access")
          .delete()
          .eq("user_id", userId)
          .eq("client_id", clientId);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sub-admins"] });
      qc.invalidateQueries({ queryKey: ["my-client-access"] });
    },
  });
};
