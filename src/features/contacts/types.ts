export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'new' | 'active' | 'inactive';
  source: string;
  tags: string[];
  customFields: Record<string, any>;
  lastContact: string;
  createdAt: string;
}

export interface ContactFilters {
  search: string;
  status: string;
  source: string;
  tag: string;
}

export interface Interaction {
  id: string;
  contactId: string;
  type: 'message' | 'call' | 'email' | 'meeting';
  title: string;
  notes?: string;
  timestamp: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: string[];
}