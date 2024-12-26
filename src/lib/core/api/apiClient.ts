import { supabase } from '@/lib/supabase/client';

class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const apiClient = {
  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    try {
      const { data, error } = await supabase
        .from(path)
        .select('*')
        .match(params || {});

      if (error) throw new APIError(error.message, error.code);
      return data as T;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async post<T>(path: string, body: any): Promise<T> {
    try {
      const { data, error } = await supabase
        .from(path)
        .insert(body)
        .select()
        .single();

      if (error) throw new APIError(error.message, error.code);
      return data as T;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async put<T>(path: string, id: string, body: any): Promise<T> {
    try {
      const { data, error } = await supabase
        .from(path)
        .update(body)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new APIError(error.message, error.code);
      return data as T;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async delete(path: string, id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(path)
        .delete()
        .eq('id', id);

      if (error) throw new APIError(error.message, error.code);
    } catch (error) {
      throw this.handleError(error);
    }
  },

  private handleError(error: unknown): Error {
    if (error instanceof APIError) return error;
    
    return new APIError(
      error instanceof Error ? error.message : 'Une erreur est survenue',
      500
    );
  }
};