import { useState, useEffect } from 'react';
import { contactService } from '../services/contactService';
import type { Contact, ContactFilters } from '@/features/contacts/types';

export function useContacts(initialFilters?: ContactFilters) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<ContactFilters>(initialFilters || {
    search: '',
    status: '',
    source: '',
    tag: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await contactService.getContacts(filters);
        setContacts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch contacts'));
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [filters]);

  const updateFilters = (newFilters: Partial<ContactFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    contacts,
    filters,
    updateFilters,
    loading,
    error
  };
}