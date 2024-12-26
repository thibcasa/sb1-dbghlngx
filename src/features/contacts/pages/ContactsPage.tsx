import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { ContactList } from '../components/ContactList';
import { ContactFilters } from '../components/ContactFilters';
import { useContacts } from '@/lib/hooks/useContacts';

export default function ContactsPage() {
  const { contacts, filters, updateFilters, loading } = useContacts();

  return (
    <PageLayout
      title="Contacts"
      description="Gérez vos contacts et prospects"
      actions={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau contact
        </Button>
      }
    >
      <div className="space-y-6">
        <ContactFilters
          filters={filters}
          onChange={updateFilters}
        />
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <ContactList
            contacts={contacts}
            onSelect={(contact) => console.log('Selected:', contact)}
          />
        )}
      </div>
    </PageLayout>
  );
}