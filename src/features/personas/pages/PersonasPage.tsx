import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PersonaList } from '../components/PersonaList';
import { PersonaAnalytics } from '../components/PersonaAnalytics';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePersonas } from '../hooks/usePersonas';

export default function PersonasPage() {
  const navigate = useNavigate();
  const { personas, loading } = usePersonas();
  const [selectedPersona, setSelectedPersona] = React.useState<string | null>(null);

  return (
    <PageLayout
      title="Personas"
      description="Gérez et analysez vos personas cibles"
      actions={
        <Button onClick={() => navigate('/personas/create')}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau persona
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PersonaList
            personas={personas}
            selectedId={selectedPersona}
            onSelect={setSelectedPersona}
            loading={loading}
          />
        </div>
        <div className="lg:col-span-2">
          {selectedPersona ? (
            <PersonaAnalytics personaId={selectedPersona} />
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-gray-500">
                Sélectionnez un persona pour voir son analyse
              </h3>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}