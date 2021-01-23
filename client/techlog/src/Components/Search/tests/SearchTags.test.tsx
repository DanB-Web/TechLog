import React from 'react'
import { render , screen} from '@testing-library/react';
import SearchTags from '../SearchTags';

describe('SearchTags Tests', () => {
  it('Should render the search tag', async () => {
    const { findByTestId } =  render(<SearchTags tag={'testTag'} deleteTagHandler={() => {}}/>);
    const searchTags = await findByTestId('search-tags');
    expect(searchTags.className).toBe('searchtag__frag');
    expect(await screen.findByText(/testTag/)).toBeInTheDocument();
  });
})