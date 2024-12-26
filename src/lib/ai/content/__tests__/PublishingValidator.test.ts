```typescript
import { describe, it, expect } from 'vitest';
import { PublishingValidator } from '../validators/PublishingValidator';
import type { GeneratedContent } from '../types';

describe('PublishingValidator', () => {
  const validContent: GeneratedContent = {
    id: '1',
    type: 'post',
    title: 'Test Post',
    body: 'Valid test content',
    hashtags: ['test'],
    metadata: {
      objective: 'Testing',
      targetAudience: { type: 'test' },
      estimatedEngagement: 0.8
    }
  };

  describe('validateForPlatform', () => {
    it('validates content for Instagram', () => {
      const result = PublishingValidator.validateForPlatform(validContent, 'instagram');
      expect(result.isValid).toBe(true);
    });

    it('checks content length limits', () => {
      const longContent = {
        ...validContent,
        body: 'a'.repeat(3000)
      };
      const result = PublishingValidator.validateForPlatform(longContent, 'instagram');
      expect(result.errors).toContain('Contenu trop long pour instagram (max: 2200)');
    });

    it('validates hashtag limits', () => {
      const manyHashtags = {
        ...validContent,
        hashtags: Array(35).fill('test')
      };
      const result = PublishingValidator.validateForPlatform(manyHashtags, 'instagram');
      expect(result.warnings).toContain('Trop de hashtags pour instagram (max: 30)');
    });

    it('validates content format compatibility', () => {
      const reelContent = {
        ...validContent,
        type: 'reel'
      };
      const result = PublishingValidator.validateForPlatform(reelContent, 'tiktok');
      expect(result.isValid).toBe(true);
    });

    it('rejects incompatible formats', () => {
      const storyContent = {
        ...validContent,
        type: 'story'
      };
      const result = PublishingValidator.validateForPlatform(storyContent, 'tiktok');
      expect(result.errors).toContain('Format story non supporté sur tiktok');
    });
  });
});
```