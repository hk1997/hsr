import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Resources from './Resources';

describe('Resources Component', () => {
  it('renders the main heading', () => {
    render(<Resources />);
    expect(screen.getByText('Developer Resources')).toBeInTheDocument();
  });

  it('renders the Claude Artifact card with correct content', () => {
    render(<Resources />);
    expect(screen.getByText('Claude Artifact Plugin')).toBeInTheDocument();
    expect(screen.getByText(/Access our custom Claude artifact tool/i)).toBeInTheDocument();
  });

  it('contains the correct external link with safe target attributes', () => {
    render(<Resources />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://claude.ai/public/artifacts/008c7e10-a54e-4c00-901c-7047c6267038');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
