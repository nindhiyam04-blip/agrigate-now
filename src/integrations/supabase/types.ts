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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      crop_listings: {
        Row: {
          created_at: string
          description: string | null
          farmer_id: string
          harvest_date: string | null
          id: string
          image_urls: string[]
          location: string | null
          name: string
          name_ta: string | null
          price_per_unit: number
          quantity: number
          status: Database["public"]["Enums"]["listing_status"]
          unit: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          farmer_id: string
          harvest_date?: string | null
          id?: string
          image_urls?: string[]
          location?: string | null
          name: string
          name_ta?: string | null
          price_per_unit: number
          quantity: number
          status?: Database["public"]["Enums"]["listing_status"]
          unit?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          farmer_id?: string
          harvest_date?: string | null
          id?: string
          image_urls?: string[]
          location?: string | null
          name?: string
          name_ta?: string | null
          price_per_unit?: number
          quantity?: number
          status?: Database["public"]["Enums"]["listing_status"]
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crop_listings_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      dealers: {
        Row: {
          business_name: string
          created_at: string
          district: string | null
          id: string
          license_number: string | null
          market_name: string | null
          rating: number
          state: string | null
          subscription_plan: string
          updated_at: string
          user_id: string
          verified: boolean
        }
        Insert: {
          business_name?: string
          created_at?: string
          district?: string | null
          id?: string
          license_number?: string | null
          market_name?: string | null
          rating?: number
          state?: string | null
          subscription_plan?: string
          updated_at?: string
          user_id: string
          verified?: boolean
        }
        Update: {
          business_name?: string
          created_at?: string
          district?: string | null
          id?: string
          license_number?: string | null
          market_name?: string | null
          rating?: number
          state?: string | null
          subscription_plan?: string
          updated_at?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: []
      }
      drivers: {
        Row: {
          available: boolean
          capacity_tons: number | null
          created_at: string
          id: string
          license_number: string | null
          rating: number
          total_deliveries: number
          updated_at: string
          user_id: string
          vehicle_number: string | null
          vehicle_type: string
        }
        Insert: {
          available?: boolean
          capacity_tons?: number | null
          created_at?: string
          id?: string
          license_number?: string | null
          rating?: number
          total_deliveries?: number
          updated_at?: string
          user_id: string
          vehicle_number?: string | null
          vehicle_type?: string
        }
        Update: {
          available?: boolean
          capacity_tons?: number | null
          created_at?: string
          id?: string
          license_number?: string | null
          rating?: number
          total_deliveries?: number
          updated_at?: string
          user_id?: string
          vehicle_number?: string | null
          vehicle_type?: string
        }
        Relationships: []
      }
      farmers: {
        Row: {
          created_at: string
          district: string | null
          farm_name: string
          farm_size_acres: number | null
          id: string
          primary_crops: string[]
          rating: number
          state: string | null
          updated_at: string
          user_id: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          district?: string | null
          farm_name?: string
          farm_size_acres?: number | null
          id?: string
          primary_crops?: string[]
          rating?: number
          state?: string | null
          updated_at?: string
          user_id: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          district?: string | null
          farm_name?: string
          farm_size_acres?: number | null
          id?: string
          primary_crops?: string[]
          rating?: number
          state?: string | null
          updated_at?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          crop_name: string
          dealer_id: string
          delivery_status: Database["public"]["Enums"]["delivery_status"]
          distance_km: number | null
          driver_id: string | null
          driver_payout: number | null
          drop_location: string | null
          farmer_id: string
          id: string
          listing_id: string | null
          order_code: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          pickup_location: string | null
          quantity: number
          total_amount: number
          unit: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          crop_name: string
          dealer_id: string
          delivery_status?: Database["public"]["Enums"]["delivery_status"]
          distance_km?: number | null
          driver_id?: string | null
          driver_payout?: number | null
          drop_location?: string | null
          farmer_id: string
          id?: string
          listing_id?: string | null
          order_code?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          pickup_location?: string | null
          quantity: number
          total_amount: number
          unit?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          crop_name?: string
          dealer_id?: string
          delivery_status?: Database["public"]["Enums"]["delivery_status"]
          distance_km?: number | null
          driver_id?: string | null
          driver_payout?: number | null
          drop_location?: string | null
          farmer_id?: string
          id?: string
          listing_id?: string | null
          order_code?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          pickup_location?: string | null
          quantity?: number
          total_amount?: number
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "crop_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          language: string
          location: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id: string
          language?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          language?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
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
      app_role: "farmer" | "dealer" | "driver"
      delivery_status:
        | "preparing"
        | "assigned"
        | "in-transit"
        | "delivered"
        | "cancelled"
      listing_status: "available" | "reserved" | "sold" | "expired"
      payment_status: "pending" | "escrow" | "paid" | "refunded"
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
      app_role: ["farmer", "dealer", "driver"],
      delivery_status: [
        "preparing",
        "assigned",
        "in-transit",
        "delivered",
        "cancelled",
      ],
      listing_status: ["available", "reserved", "sold", "expired"],
      payment_status: ["pending", "escrow", "paid", "refunded"],
    },
  },
} as const
