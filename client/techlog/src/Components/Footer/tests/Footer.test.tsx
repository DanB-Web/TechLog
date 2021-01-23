import React from 'react'
import { render , screen } from '@testing-library/react';
import Footer from '../Footer';

describe('SearchTags Tests', () => {
  it('Should render the search item tag', async () => {    
   render(<Footer />);
    expect(await screen.findByText(/#testTag/)).toBeInTheDocument();
  });
})