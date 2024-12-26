import { useState } from 'react';
import { validateGenerationParams } from '../utils/contentValidation';
import type { GenerationParams } from '../types';

export function useContentValidation() {
  const [errors, setErrors] = useState<string[]>([]);

  const validateContent = (params: GenerationParams): boolean => {
    const validationErrors = validateGenerationParams(params);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  return { errors, validateContent };
}