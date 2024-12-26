import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { LeadPipeline } from '../components/LeadPipeline';
import { LeadFilters } from '../components/LeadFilters';
import { useLeads } from '../hooks/useLeads';
import { useLeadScoring } from '../hooks/useLeadScoring';

export default function LeadsPage() {
  const { leads, updateLeadStatus, loading } = useLeads();
  const { scoreLeads } = useLeadScoring();

  const [filters, setFilters] = React.useState({
    status: '',
    source: '',
    score: ''
  });

  const filteredLeads = React.useMemo(() => {
    return leads.filter(lead => {
      if (filters.status && lead.status !== filters.status) return false;
      if (filters.source && lead.source !== filters.source) return false;
      if (filters.score) {
        const score = Number(filters.score);
        if (lead.score < score) return false;
      }
      return true;
    });
  }, [leads, filters]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    await updateLeadStatus(leadId, newStatus);
    // Recalculer le score après le changement de statut
    await scoreLeads([leadId]);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <PageLayout
      title="Gestion des leads"
      description="Qualifiez et suivez vos prospects"
      actions={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau lead
        </Button>
      }
    >
      <div className="space-y-6">
        <LeadFilters
          filters={filters}
          onChange={setFilters}
        />
        
        <LeadPipeline
          leads={filteredLeads}
          onStatusChange={handleStatusChange}
        />
      </div>
    </PageLayout>
  );
}