import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];
type NewLead = Database['public']['Tables']['leads']['Insert'];

export const leadService = {
  async createLead(lead: NewLead) {
    const { data, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateLeadStatus(id: string, status: Lead['status']) {
    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getLeads() {
    const { data, error } = await supabase
      .from('leads')
      .select('*, interactions(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};