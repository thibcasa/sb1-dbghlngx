export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: {
          id: string
          name: string
          budget: number
          status: 'draft' | 'active' | 'paused' | 'completed'
          target_audience: Json
          channels: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          budget: number
          status?: 'draft' | 'active' | 'paused' | 'completed'
          target_audience: Json
          channels: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          budget?: number
          status?: 'draft' | 'active' | 'paused' | 'completed'
          target_audience?: Json
          channels?: Json
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          status: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost'
          source: string
          property_details: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          status?: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost'
          source: string
          property_details?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          status?: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost'
          source?: string
          property_details?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      interactions: {
        Row: {
          id: string
          lead_id: string
          type: 'email' | 'call' | 'message' | 'meeting'
          status: 'scheduled' | 'completed' | 'failed'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          type: 'email' | 'call' | 'message' | 'meeting'
          status?: 'scheduled' | 'completed' | 'failed'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          type?: 'email' | 'call' | 'message' | 'meeting'
          status?: 'scheduled' | 'completed' | 'failed'
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}