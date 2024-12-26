import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { supabase } from '@/lib/supabase/client';

vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              response: {
                message: 'Test response',
                confidence: 0.9
              }
            }
          }))
        }))
      }))
    }))
  }
}));

describe('useAIAssistant', () => {
  it('processes queries successfully', async () => {
    const { result } = renderHook(() => useAIAssistant());

    let response;
    await act(async () => {
      response = await result.current.processQuery('Test query');
    });

    expect(response).toEqual({
      message: 'Test response',
      confidence: 0.9
    });
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles errors appropriately', async () => {
    vi.mocked(supabase.from).mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const { result } = renderHook(() => useAIAssistant());

    await act(async () => {
      try {
        await result.current.processQuery('Test query');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(result.current.error).toBeInstanceOf(Error);
      }
    });
  });
});