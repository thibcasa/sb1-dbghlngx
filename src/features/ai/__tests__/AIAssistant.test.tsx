import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AIAssistant } from '../components/AIAssistant';
import { useAIAssistant } from '../hooks/useAIAssistant';

vi.mock('../hooks/useAIAssistant');

describe('AIAssistant', () => {
  it('renders correctly', () => {
    vi.mocked(useAIAssistant).mockReturnValue({
      processQuery: vi.fn(),
      isProcessing: false,
      error: null
    });

    render(<AIAssistant />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles user queries', async () => {
    const mockProcessQuery = vi.fn().mockResolvedValue({
      message: 'Response',
      confidence: 0.9
    });

    vi.mocked(useAIAssistant).mockReturnValue({
      processQuery: mockProcessQuery,
      isProcessing: false,
      error: null
    });

    render(<AIAssistant />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test query' } });
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockProcessQuery).toHaveBeenCalledWith('Test query');
      expect(screen.getByText('Response')).toBeInTheDocument();
    });
  });
});