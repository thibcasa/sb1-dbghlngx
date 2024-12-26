```typescript
export class SchedulingValidator {
  static validateScheduledTime(scheduledTime: Date): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const now = new Date();
    const minTime = new Date(now.getTime() + 15 * 60 * 1000); // +15 minutes
    const maxTime = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // +90 jours

    // Validation de base
    if (scheduledTime < minTime) {
      errors.push('La publication doit être programmée au moins 15 minutes à l\'avance');
    }

    if (scheduledTime > maxTime) {
      errors.push('La publication ne peut pas être programmée plus de 90 jours à l\'avance');
    }

    // Validation des horaires optimaux
    const hour = scheduledTime.getHours();
    if (hour < 8 || hour > 21) {
      warnings.push('L\'horaire choisi n\'est pas optimal pour l\'engagement');
    }

    // Validation des jours
    if (scheduledTime.getDay() === 0) { // Dimanche
      warnings.push('Le dimanche n\'est généralement pas optimal pour les publications');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```