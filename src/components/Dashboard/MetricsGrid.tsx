import React from 'react';
import { Card } from '../common/Card';
import { BarChart, Users, Target, TrendingUp } from 'lucide-react';

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="text-blue-600">
            <Target className="w-6 h-6" />
          </div>
          <div className="text-sm font-medium text-gray-500">
            12/20
          </div>
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-2">Mandats</h3>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-500">+3 ce mois</p>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="text-green-600">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-2">Leads Actifs</h3>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-gray-900">48</p>
          <p className="text-sm text-gray-500">+15 cette semaine</p>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="text-purple-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-2">Conversion</h3>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-gray-900">8.5%</p>
          <p className="text-sm text-gray-500">+2.1% vs dernier mois</p>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="text-orange-600">
            <BarChart className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-2">Performance</h3>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-gray-900">92</p>
          <p className="text-sm text-gray-500">Score global</p>
        </div>
      </Card>
    </div>
  );
}