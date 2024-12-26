import React, { useState } from 'react';
import { Layout, Settings, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <Layout className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">AI-CRM</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/dashboard" active>Tableau de bord</NavLink>
              <NavLink href="/campaigns">Campagnes</NavLink>
              <NavLink href="/leads">Leads</NavLink>
              <NavLink href="/analytics">Analyses</NavLink>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
            
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-500" />
              ) : (
                <Menu className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink href="/dashboard" active>Tableau de bord</MobileNavLink>
            <MobileNavLink href="/campaigns">Campagnes</MobileNavLink>
            <MobileNavLink href="/leads">Leads</MobileNavLink>
            <MobileNavLink href="/analytics">Analyses</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className={`${
        active
          ? 'text-blue-600 border-blue-600'
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className={`${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
      } block px-3 py-2 rounded-md text-base font-medium`}
    >
      {children}
    </a>
  );
}