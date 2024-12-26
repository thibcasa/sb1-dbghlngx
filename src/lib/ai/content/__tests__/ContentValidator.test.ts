```typescript
import { describe, it, expect } from 'vitest';
import { ContentValidator } from '../validators/ContentValidator';
import type { GeneratedContent } from '../types';

describe('ContentValidator', () => {
  const validContent: GeneratedContent = {
    id: '1',
    type: 'post',
    title: 'Test de contenu valide',
    body: 'Ceci est un contenu de test complet et valide.',
    hashtags: ['test', 'validation'],
    metadata: {
      objective: 'Test de validation',
      targetAudience: { type: 'test' },
      estimatedEngagement: 0.8
    }
  };

  describe('validate', () => {
    it('accepts valid content', () => {
      const result = ContentValidator.validate(validContent);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('requires a title', () => {
      const content = { ...validContent, title: '' };
      const result = ContentValidator.validate(content);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Le titre est requis');
    });

    it('warns about short titles', () => {
      const content = { ...validContent, title: 'Court' };
      const result = ContentValidator.validate(content);
      expect(result.warnings).toContain('Le titre est très court');
    });

    it('validates content length by type', () => {
      const longContent = { 
        ...validContent,
        type: 'story',
        body: 'a'.repeat(150)
      };
      const result = ContentValidator.validate(longContent);
      expect(result.errors).toContain('Le contenu dépasse la limite de 100 caractères');
    });

    it('validates hashtag count', () => {
      const content = {
        ...validContent,
        type: 'story',
        hashtags: Array(15).fill('test')
      };
      const result = ContentValidator.validate(content);
      expect(result.warnings).toContain('Nombre de hashtags élevé (15/10)');
    });
  });
});
```