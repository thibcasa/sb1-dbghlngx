import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/common/Card';
import { BarChart, Users, Target, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { LeadPipeline } from '@/features/leads/components/LeadPipeline';
import { ActivityFeed } from '@/features/activity/components/ActivityFeed';

const mockLeads = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '06 12 34 56 78',
    status: 'new',
    source: 'website',
    lastContact: new Date()
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie@example.com',
    phone: '06 98 76 54 32',
    status: 'contacted',
    source: 'facebook',
    lastContact: new Date()
  }
];

export default function DashboardPage() {
  return (
    <PageLayout
      title="Tableau de bord"
      description="Vue d'ensemble de votre activité"
    >
      <div className="space-y-6">
        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Mandats"
            value="12"
            trend="+3 ce mois"
            icon={<Target className="w-6 h-6 text-blue-500" />}
          />
          <MetricCard
            title="Leads Actifs"
            value="48"
            trend="+15 cette semaine"
            icon={<Users className="w-6 h-6 text-green-500" />}
          />
          <MetricCard
            title="Taux de Conversion"
            value="8.5%"
            trend="+2.1% vs dernier mois"
            icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
          />
          <MetricCard
            title="Rendez-vous"
            value="8"
            trend="5 cette semaine"
            icon={<Calendar className="w-6 h-6 text-orange-500" />}
          />
        </div>

        {/* Pipeline et Activité */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Pipeline des Leads</h2>
              <LeadPipeline 
                leads={mockLeads}
                onStatusChange={(id, status) => console.log(id, status)}
              />
            </Card>
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Performance des Campagnes</h2>
              <BarChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Graphique des performances
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Messages Récents</h2>
              <MessageSquare className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nouveau message de lead</p>
                    <p className="text-sm text-gray-500">Il y a {i + 1} heures</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}

function MetricCard({ title, value, trend, icon }: { 
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{trend}</p>
      </div>
    </Card>
  );
}