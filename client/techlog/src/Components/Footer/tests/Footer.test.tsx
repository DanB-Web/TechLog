import React from 'react'
import { render , screen } from '@testing-library/react';
import Footer from '../Footer';

describe('SearchTags Tests', () => {
  it('Should render the footer', async () => {    
   render(<Footer />);
    expect(await screen.findByText(/DanB/)).toBeInTheDocument();
  });
})