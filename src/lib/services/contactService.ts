import { supabase } from '../supabase/client';
import type { Contact, Interaction } from '@/features/contacts/types';

export const contactService = {
  async getContacts(filters?: any) {
    const query = supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.search) {
      query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    if (filters?.status) {
      query.eq('status', filters.status);
    }

    if (filters?.source) {
      query.eq('source', filters.source);
    }

    if (filters?.tag) {
      query.contains('tags', [filters.tag]);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Contact[];
  },

  async getContactInteractions(contactId: string) {
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .eq('contact_id', contactId)
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data as Interaction[];
  },

  async createContact(contact: Omit<Contact, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single();

    if (error) throw error;
    return data as Contact;
  },

  async updateContact(id: string, updates: Partial<Contact>) {
    const { data, error } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Contact;
  },

  async addInteraction(interaction: Omit<Interaction, 'id'>) {
    const { data, error } = await supabase
      .from('interactions')
      .insert(interaction)
      .select()
      .single();

    if (error) throw error;
    return data as Interaction;
  },

  async importContacts(contacts: any[]) {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contacts)
      .select();

    if (error) throw error;
    return data as Contact[];
  }
};