import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Mail, Phone, Calendar, Tag } from 'lucide-react';
import type { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
}

export function ContactList({ contacts, onSelect }: ContactListProps) {
  return (
    <div className="space-y-4">
      {contacts.map(contact => (
        <Card 
          key={contact.id}
          className="hover:border-blue-200 cursor-pointer transition-colors"
          onClick={() => onSelect(contact)}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{contact.name}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="w-4 h-4 mr-2" />
                  {contact.email}
                </div>
                {contact.phone && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-2" />
                    {contact.phone}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <Badge variant={contact.status}>{contact.status}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(contact.lastContact).toLocaleDateString()}
              </div>
            </div>
          </div>

          {contact.tags.length > 0 && (
            <div className="mt-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {contact.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}