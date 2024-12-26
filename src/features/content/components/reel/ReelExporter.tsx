import React from 'react';
import { Card } from '@/components/common/Card';
import { Download, Instagram, TikTok, Facebook } from 'lucide-react';
import type { GeneratedReel } from '@/lib/ai/content/types';

interface ReelExporterProps {
  reel: GeneratedReel;
  onExport: (platform: string, format: string) => void;
}

export function ReelExporter({ reel, onExport }: ReelExporterProps) {
  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'tiktok', name: 'TikTok', icon: TikTok },
    { id: 'facebook', name: 'Facebook', icon: Facebook }
  ];

  const formats = [
    { id: 'mp4', name: 'MP4', size: '1080x1920' },
    { id: 'mov', name: 'MOV', size: '1080x1920' },
    { id: 'webm', name: 'WebM', size: '1080x1920' }
  ];

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Exporter le réel</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plateforme
            </label>
            <div className="grid grid-cols-3 gap-4">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => onExport(platform.id, 'mp4')}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-blue-500"
                >
                  <platform.icon className="w-6 h-6" />
                  <span className="text-sm">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <div className="grid grid-cols-3 gap-4">
              {formats.map(format => (
                <button
                  key={format.id}
                  onClick={() => onExport('all', format.id)}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500"
                >
                  <div>
                    <p className="font-medium">{format.name}</p>
                    <p className="text-xs text-gray-500">{format.size}</p>
                  </div>
                  <Download className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}