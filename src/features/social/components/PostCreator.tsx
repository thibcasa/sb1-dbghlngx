import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Image, Video, Type, Hash } from 'lucide-react';
import type { ContentType } from '@/lib/ai/content/types';

interface PostCreatorProps {
  onSubmit: (data: PostData) => Promise<void>;
}

interface PostData {
  type: ContentType;
  content: string;
  media?: File[];
  hashtags: string[];
  schedule?: Date;
}

export function PostCreator({ onSubmit }: PostCreatorProps) {
  const [postData, setPostData] = useState<PostData>({
    type: 'post',
    content: '',
    hashtags: [],
    media: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(postData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <Button
            type="button"
            variant={postData.type === 'post' ? 'primary' : 'outline'}
            onClick={() => setPostData(prev => ({ ...prev, type: 'post' }))}
          >
            <Type className="w-4 h-4 mr-2" />
            Post
          </Button>
          <Button
            type="button"
            variant={postData.type === 'story' ? 'primary' : 'outline'}
            onClick={() => setPostData(prev => ({ ...prev, type: 'story' }))}
          >
            <Image className="w-4 h-4 mr-2" />
            Story
          </Button>
          <Button
            type="button"
            variant={postData.type === 'reel' ? 'primary' : 'outline'}
            onClick={() => setPostData(prev => ({ ...prev, type: 'reel' }))}
          >
            <Video className="w-4 h-4 mr-2" />
            Reel
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenu
          </label>
          <textarea
            value={postData.content}
            onChange={e => setPostData(prev => ({ ...prev, content: e.target.value }))}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Écrivez votre contenu ici..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hashtags
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ajoutez des hashtags..."
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const value = e.currentTarget.value.trim();
                  if (value) {
                    setPostData(prev => ({
                      ...prev,
                      hashtags: [...prev.hashtags, value]
                    }));
                    e.currentTarget.value = '';
                  }
                }
              }}
            />
            <Hash className="w-5 h-5 text-gray-400" />
          </div>
          {postData.hashtags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {postData.hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Programmation
          </label>
          <input
            type="datetime-local"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={e => setPostData(prev => ({
              ...prev,
              schedule: e.target.value ? new Date(e.target.value) : undefined
            }))}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            {postData.schedule ? 'Programmer' : 'Publier'}
          </Button>
        </div>
      </form>
    </Card>
  );
}