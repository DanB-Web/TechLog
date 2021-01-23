import React from 'react'
import { render , screen} from '@testing-library/react';
import SearchItemTag from '../SearchItemTag';

describe('SearchTags Tests', () => {
  it('Should render the search item tag', async () => {    
   render(<SearchItemTag tag={'testTag'}/>);
    expect(await screen.findByText(/#testTag/)).toBeInTheDocument();
  });
})