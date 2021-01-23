import React from 'react'
import { render , screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('SearchTags Tests', () => {
  it('Should render the Navbar', async () => {    
   render(<Navbar />);
    expect(await screen.findByText(/DanB/)).toBeInTheDocument();
  });
})