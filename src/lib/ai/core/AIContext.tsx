import React, { createContext, useContext, useState } from 'react';
import type { AIModelConfig } from './types';

interface AIContextType {
  models: Record<string, AIModelConfig>;
  updateModel: (type: string, config: Partial<AIModelConfig>) => void;
}

const AIContext = createContext<AIContextType | null>(null);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [models, setModels] = useState<Record<string, AIModelConfig>>({});

  const updateModel = (type: string, config: Partial<AIModelConfig>) => {
    setModels(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        ...config,
        lastUpdated: new Date()
      }
    }));
  };

  return (
    <AIContext.Provider value={{ models, updateModel }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}