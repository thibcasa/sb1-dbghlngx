import React from 'react';
import { NavItem } from './NavItem';
import type { MobileMenuProps } from './types';

export function MobileMenu({ isOpen, items, activeRoute }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="pt-2 pb-3 space-y-1 bg-white border-b">
        {items.map(item => (
          <div key={item.path} className="px-3">
            <NavItem {...item} isActive={activeRoute === item.path} />
          </div>
        ))}
      </div>
    </div>
  );
}