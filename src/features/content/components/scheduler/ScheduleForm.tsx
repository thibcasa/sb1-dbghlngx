```tsx
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface ScheduleFormProps {
  onSchedule: (scheduledTime: Date) => Promise<void>;
  disabled?: boolean;
}

export function ScheduleForm({ onSchedule, disabled }: ScheduleFormProps) {
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    const scheduledTime = new Date(`${date}T${time}`);
    onSchedule(scheduledTime);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heure
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={disabled || !date || !time}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Planifier
        </button>
      </div>
    </form>
  );
}
```