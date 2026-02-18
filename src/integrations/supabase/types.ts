export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      case_categories: {
        Row: {
          created_at: string
          description: string
          hero_description: string | null
          hero_title: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          order_index: number | null
          slug: string
          stats_cpl: string | null
          stats_leads: string | null
          stats_roi: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          hero_description?: string | null
          hero_title?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_index?: number | null
          slug: string
          stats_cpl?: string | null
          stats_leads?: string | null
          stats_roi?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          hero_description?: string | null
          hero_title?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_index?: number | null
          slug?: string
          stats_cpl?: string | null
          stats_leads?: string | null
          stats_roi?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_items: {
        Row: {
          category_id: string
          created_at: string
          id: string
          is_active: boolean | null
          order_index: number | null
          platform: string
          problem: string
          result_budget: string
          result_cpl: string
          result_leads: string
          result_period: string
          result_roi: string
          solution: string
          title: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          platform: string
          problem: string
          result_budget: string
          result_cpl: string
          result_leads: string
          result_period: string
          result_roi: string
          solution: string
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          platform?: string
          problem?: string
          result_budget?: string
          result_cpl?: string
          result_leads?: string
          result_period?: string
          result_roi?: string
          solution?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "case_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      case_screenshots: {
        Row: {
          category_id: string
          created_at: string
          id: string
          image_url: string
          is_active: boolean | null
          order_index: number | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean | null
          order_index?: number | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean | null
          order_index?: number | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_screenshots_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "case_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cases_slider_items: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_active: boolean | null
          link: string
          order_index: number | null
          stats_cpl: string | null
          stats_leads: string | null
          stats_roi: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          link: string
          order_index?: number | null
          stats_cpl?: string | null
          stats_leads?: string | null
          stats_roi?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          link?: string
          order_index?: number | null
          stats_cpl?: string | null
          stats_leads?: string | null
          stats_roi?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_agency_expenses: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          period: string | null
          title: string
        }
        Insert: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          period?: string | null
          title: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          period?: string | null
          title?: string
        }
        Relationships: []
      }
      crm_client_access: {
        Row: {
          client_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_client_access_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "crm_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_clients: {
        Row: {
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          services: Json | null
          status: string
          telegram: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          services?: Json | null
          status?: string
          telegram?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          services?: Json | null
          status?: string
          telegram?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      crm_contractors: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          finance_id: string
          id: string
          name: string
        }
        Insert: {
          amount?: number
          created_at?: string
          description?: string | null
          finance_id: string
          id?: string
          name: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          finance_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_contractors_finance_id_fkey"
            columns: ["finance_id"]
            isOneToOne: false
            referencedRelation: "crm_finances"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_expenses: {
        Row: {
          amount: number
          client_id: string
          created_at: string
          description: string | null
          finance_id: string | null
          id: string
          title: string
        }
        Insert: {
          amount?: number
          client_id: string
          created_at?: string
          description?: string | null
          finance_id?: string | null
          id?: string
          title: string
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string
          description?: string | null
          finance_id?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_expenses_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "crm_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_expenses_finance_id_fkey"
            columns: ["finance_id"]
            isOneToOne: false
            referencedRelation: "crm_finances"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_finances: {
        Row: {
          alexander_percent: number
          amount: number
          cash_out_percent: number | null
          client_id: string
          created_at: string
          id: string
          ilya_percent: number
          notes: string | null
          payment_date: string | null
          period: string
          updated_at: string
        }
        Insert: {
          alexander_percent?: number
          amount?: number
          cash_out_percent?: number | null
          client_id: string
          created_at?: string
          id?: string
          ilya_percent?: number
          notes?: string | null
          payment_date?: string | null
          period: string
          updated_at?: string
        }
        Update: {
          alexander_percent?: number
          amount?: number
          cash_out_percent?: number | null
          client_id?: string
          created_at?: string
          id?: string
          ilya_percent?: number
          notes?: string | null
          payment_date?: string | null
          period?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_finances_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "crm_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_payments: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          finance_id: string
          id: string
          payment_date: string
        }
        Insert: {
          amount?: number
          created_at?: string
          description?: string | null
          finance_id: string
          id?: string
          payment_date?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          finance_id?: string
          id?: string
          payment_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_payments_finance_id_fkey"
            columns: ["finance_id"]
            isOneToOne: false
            referencedRelation: "crm_finances"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_tasks: {
        Row: {
          assignee_id: string | null
          client_id: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          client_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          client_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "crm_team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "crm_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_team_members: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          created_at: string
          description: string
          id: string
          is_active: boolean | null
          order_index: number | null
          step_number: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          step_number: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          step_number?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author: string
          created_at: string
          id: string
          is_active: boolean | null
          order_index: number | null
          position: string
          rating: number | null
          text: string
          updated_at: string
        }
        Insert: {
          author: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          position: string
          rating?: number | null
          text: string
          updated_at?: string
        }
        Update: {
          author?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          position?: string
          rating?: number | null
          text?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          key: string
          label: string
          type: string
          updated_at: string
          value: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          key: string
          label: string
          type?: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          label?: string
          type?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      websites: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string
          is_active: boolean | null
          order_index: number | null
          project_type: string
          result_description: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url: string
          is_active?: boolean | null
          order_index?: number | null
          project_type: string
          result_description?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          is_active?: boolean | null
          order_index?: number | null
          project_type?: string
          result_description?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_client_access: {
        Args: { _client_id: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "sub_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "sub_admin"],
    },
  },
} as const
