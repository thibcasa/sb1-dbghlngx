import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type NewCampaign = Database['public']['Tables']['campaigns']['Insert'];

export const campaignService = {
  async createCampaign(campaign: NewCampaign) {
    const { data, error } = await supabase
      .from('campaigns')
      .insert(campaign)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCampaign(id: string, updates: Partial<Campaign>) {
    const { data, error } = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCampaigns() {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};