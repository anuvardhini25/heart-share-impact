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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      donations: {
        Row: {
          amount: number
          created_at: string
          donor_user_id: string
          help_request_id: string | null
          id: string
          payment_method: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          donor_user_id: string
          help_request_id?: string | null
          id?: string
          payment_method?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          donor_user_id?: string
          help_request_id?: string | null
          id?: string
          payment_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_help_request_id_fkey"
            columns: ["help_request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_alerts: {
        Row: {
          active: boolean | null
          created_at: string
          id: string
          message: string | null
          ngo_id: string | null
          severity: string | null
          title: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id?: string
          message?: string | null
          ngo_id?: string | null
          severity?: string | null
          title: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: string
          message?: string | null
          ngo_id?: string | null
          severity?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_alerts_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      help_requests: {
        Row: {
          amount: number | null
          beneficiary_user_id: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          ngo_id: string | null
          raised: number | null
          status: Database["public"]["Enums"]["request_status"]
          title: string
          type: Database["public"]["Enums"]["help_type"]
          updated_at: string
          urgency: Database["public"]["Enums"]["urgency_level"]
        }
        Insert: {
          amount?: number | null
          beneficiary_user_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          ngo_id?: string | null
          raised?: number | null
          status?: Database["public"]["Enums"]["request_status"]
          title: string
          type: Database["public"]["Enums"]["help_type"]
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Update: {
          amount?: number | null
          beneficiary_user_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          ngo_id?: string | null
          raised?: number | null
          status?: Database["public"]["Enums"]["request_status"]
          title?: string
          type?: Database["public"]["Enums"]["help_type"]
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Relationships: [
          {
            foreignKeyName: "help_requests_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      impact_stories: {
        Row: {
          beneficiaries_count: number | null
          created_at: string
          description: string | null
          donations_total: number | null
          id: string
          image_url: string | null
          ngo_id: string | null
          title: string
        }
        Insert: {
          beneficiaries_count?: number | null
          created_at?: string
          description?: string | null
          donations_total?: number | null
          id?: string
          image_url?: string | null
          ngo_id?: string | null
          title: string
        }
        Update: {
          beneficiaries_count?: number | null
          created_at?: string
          description?: string | null
          donations_total?: number | null
          id?: string
          image_url?: string | null
          ngo_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "impact_stories_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          category: string
          created_at: string
          id: string
          item_name: string
          ngo_id: string
          quantity: number | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          item_name: string
          ngo_id: string
          quantity?: number | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          item_name?: string
          ngo_id?: string
          quantity?: number | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      ngos: {
        Row: {
          admin_user_id: string
          causes: string[] | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          image_url: string | null
          location: string | null
          mission: string | null
          name: string
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          admin_user_id: string
          causes?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          location?: string | null
          mission?: string | null
          name: string
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          admin_user_id?: string
          causes?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          location?: string | null
          mission?: string | null
          name?: string
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteer_activities: {
        Row: {
          created_at: string
          description: string | null
          duration: string | null
          id: string
          location: string | null
          ngo_id: string | null
          skills_needed: string[] | null
          slots: number | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          ngo_id?: string | null
          skills_needed?: string[] | null
          slots?: number | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          ngo_id?: string | null
          skills_needed?: string[] | null
          slots?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_activities_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteers: {
        Row: {
          availability: string | null
          created_at: string
          hours_logged: number | null
          id: string
          interests: string[] | null
          location: string | null
          skills: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          availability?: string | null
          created_at?: string
          hours_logged?: number | null
          id?: string
          interests?: string[] | null
          location?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          availability?: string | null
          created_at?: string
          hours_logged?: number | null
          id?: string
          interests?: string[] | null
          location?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "donor" | "ngo_admin" | "volunteer" | "beneficiary"
      help_type: "Food" | "Education" | "Medical" | "Shelter"
      request_status:
        | "pending"
        | "verified"
        | "rejected"
        | "funded"
        | "delivered"
        | "impact_proof"
      urgency_level: "Critical" | "High" | "Medium" | "Low"
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
      app_role: ["donor", "ngo_admin", "volunteer", "beneficiary"],
      help_type: ["Food", "Education", "Medical", "Shelter"],
      request_status: [
        "pending",
        "verified",
        "rejected",
        "funded",
        "delivered",
        "impact_proof",
      ],
      urgency_level: ["Critical", "High", "Medium", "Low"],
    },
  },
} as const
