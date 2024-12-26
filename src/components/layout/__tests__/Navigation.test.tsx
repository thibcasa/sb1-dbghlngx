import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainNav } from '../Navigation/MainNav';

describe('MainNav', () => {
  it('renders navigation items correctly', () => {
    render(<MainNav />);
    
    expect(screen.getByText('Tableau de bord')).toBeInTheDocument();
    expect(screen.getByText('Campagnes')).toBeInTheDocument();
    expect(screen.getByText('Leads')).toBeInTheDocument();
    expect(screen.getByText('Analyses')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(<MainNav />);
    
    const menuButton = screen.getByRole('button');
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    fireEvent.click(menuButton);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});