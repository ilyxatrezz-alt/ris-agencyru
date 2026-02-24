import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify caller is super_admin
    const authHeader = req.headers.get("authorization");
    if (!authHeader) throw new Error("Unauthorized");

    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await callerClient.auth.getUser();
    if (!caller) throw new Error("Unauthorized");

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check caller is super_admin
    const { data: callerRole } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "super_admin")
      .maybeSingle();

    if (!callerRole) throw new Error("Forbidden: not a super admin");

    const { action, email, password, user_id, name } = await req.json();

    if (action === "create") {
      // Create user via admin API
      const { data: newUser, error: createErr } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (createErr) throw createErr;

      // Add sub_admin role
      const { error: roleErr } = await adminClient
        .from("user_roles")
        .insert({ user_id: newUser.user.id, role: "sub_admin" });
      if (roleErr) throw roleErr;

      // Auto-add to crm_team_members
      const displayName = name || email.split("@")[0];
      await adminClient
        .from("crm_team_members")
        .insert({ name: displayName, is_active: true });

      return new Response(JSON.stringify({ success: true, user_id: newUser.user.id, email }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (action === "remove") {
      // Remove role and access
      await adminClient.from("user_roles").delete().eq("user_id", user_id).eq("role", "sub_admin");
      await adminClient.from("crm_client_access").delete().eq("user_id", user_id);
      // Delete the user entirely
      await adminClient.auth.admin.deleteUser(user_id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (action === "list") {
      // List all users with sub_admin role
      const { data: roles } = await adminClient
        .from("user_roles")
        .select("user_id")
        .eq("role", "sub_admin");

      const subAdmins = [];
      for (const r of roles || []) {
        const { data: { user } } = await adminClient.auth.admin.getUserById(r.user_id);
        const { data: access } = await adminClient
          .from("crm_client_access")
          .select("client_id")
          .eq("user_id", r.user_id);

        subAdmins.push({
          user_id: r.user_id,
          email: user?.email || "Unknown",
          client_ids: (access || []).map((a: any) => a.client_id),
        });
      }

      return new Response(JSON.stringify({ subAdmins }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    throw new Error("Unknown action");
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
