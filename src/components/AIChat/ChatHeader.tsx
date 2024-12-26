import React from 'react';
import { Minimize2, Maximize2 } from 'lucide-react';

interface ChatHeaderProps {
  minimized: boolean;
  onToggleMinimize: () => void;
}

export default function ChatHeader({ minimized, onToggleMinimize }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">Assistant IA</h3>
      <button
        onClick={onToggleMinimize}
        className="p-1 hover:bg-gray-100 rounded"
      >
        {minimized ? (
          <Maximize2 className="w-4 h-4 text-gray-500" />
        ) : (
          <Minimize2 className="w-4 h-4 text-gray-500" />
        )}
      </button>
    </div>
  );
}