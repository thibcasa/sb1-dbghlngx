import React from 'react';
import { BarChart, Users, Calendar, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Active Campaigns"
          value="12"
          icon={<BarChart className="w-6 h-6" />}
          trend="+2 this week"
        />
        <DashboardCard
          title="Total Leads"
          value="48"
          icon={<Users className="w-6 h-6" />}
          trend="+15 this week"
        />
        <DashboardCard
          title="Scheduled Meetings"
          value="8"
          icon={<Calendar className="w-6 h-6" />}
          trend="5 tomorrow"
        />
        <DashboardCard
          title="Open Conversations"
          value="24"
          icon={<MessageSquare className="w-6 h-6" />}
          trend="12 unread"
        />
      </div>

      {/* Additional dashboard content will be added here */}
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

function DashboardCard({ title, value, icon, trend }: DashboardCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="text-blue-500">{icon}</div>
      </div>
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{trend}</p>
      </div>
    </div>
  );
}