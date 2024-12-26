import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Layout, ChevronDown } from 'lucide-react';
import { useRoutes } from '@/lib/core/routes/useRoutes';

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { routes } = useRoutes();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Layout className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI-CRM</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {Object.values(routes).map(route => {
              const Icon = route.icon;
              const isActive = location.pathname.startsWith(route.path);
              const hasChildren = route.children && Object.keys(route.children).length > 0;

              return (
                <div key={route.path} className="relative group">
                  <Link
                    to={route.path}
                    className={`
                      inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                      ${isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {route.title}
                    {hasChildren && (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </Link>

                  {/* Sous-menu */}
                  {hasChildren && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {Object.values(route.children).map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {Object.values(routes).map(route => {
              const Icon = route.icon;
              const isActive = location.pathname.startsWith(route.path);

              return (
                <div key={route.path}>
                  <Link
                    to={route.path}
                    className={`
                      flex items-center px-3 py-2 text-base font-medium border-l-4
                      ${isActive
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {route.title}
                  </Link>

                  {/* Sous-menu mobile */}
                  {route.children && isActive && (
                    <div className="pl-8 space-y-1">
                      {Object.values(route.children).map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block py-2 text-sm text-gray-500 hover:text-gray-700"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}