```typescript
import React from 'react';
import { Card } from '@/components/common/Card';
import { Calculator, HelpCircle, Trophy } from 'lucide-react';

interface InteractiveContentProps {
  content: any;
  onInteraction: (data: any) => void;
}

export function InteractiveContent({ content, onInteraction }: InteractiveContentProps) {
  const [formData, setFormData] = React.useState({});
  const [result, setResult] = React.useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.type === 'calculator') {
      const results = calculateResults(formData, content.calculations);
      setResult(results);
      onInteraction({ type: 'calculation', data: results });
    } else if (content.type === 'quiz') {
      const score = calculateQuizScore(formData, content.scoring);
      setResult(score);
      onInteraction({ type: 'quiz_completed', data: score });
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          {content.type === 'calculator' && <Calculator className="w-5 h-5 text-blue-500" />}
          {content.type === 'quiz' && <HelpCircle className="w-5 h-5 text-blue-500" />}
          {content.type === 'challenge' && <Trophy className="w-5 h-5 text-blue-500" />}
          <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {content.type === 'calculator' && (
            <>
              {content.fields.map((field: any) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required={field.required}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      [field.name]: parseFloat(e.target.value)
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              ))}
            </>
          )}

          {content.type === 'quiz' && (
            <>
              {content.questions.map((question: any, index: number) => (
                <div key={index} className="space-y-2">
                  <p className="font-medium text-gray-900">{question.text}</p>
                  <div className="space-y-2">
                    {question.options.map((option: string, optIndex: number) => (
                      <label key={optIndex} className="flex items-center gap-2">
                        <input
                          type={question.type === 'single' ? 'radio' : 'checkbox'}
                          name={`question_${index}`}
                          value={option}
                          onChange={e => setFormData(prev => ({
                            ...prev,
                            [`question_${index}`]: e.target.value
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {content.type === 'calculator' ? 'Calculer' : 'Valider'}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Résultats</h4>
            {Object.entries(result).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-500">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function calculateResults(data: any, calculations: any[]) {
  const results: Record<string, number> = {};
  const context = { ...data, interestRate: 0.02 }; // Taux d'intérêt fixe pour l'exemple

  calculations.forEach(calc => {
    // eslint-disable-next-line no-new-func
    const calculate = new Function(...Object.keys(context), `return ${calc.formula}`);
    results[calc.name] = calculate(...Object.values(context));
  });

  return results;
}

function calculateQuizScore(data: any, scoring: any) {
  // Implémenter la logique de scoring du quiz
  return {
    score: 85,
    recommendation: "Basé sur vos réponses, nous vous recommandons..."
  };
}
```