```typescript
import { supabase } from '@/lib/supabase/client';
import type { Content, ContentTemplate } from '../types';

export const contentService = {
  async createContent(content: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('contents')
      .insert(content)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateContent(id: string, content: Partial<Content>) {
    const { data, error } = await supabase
      .from('contents')
      .update(content)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getContents() {
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getTemplates() {
    const { data, error } = await supabase
      .from('content_templates')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  }
};
```