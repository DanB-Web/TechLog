import React from 'react'
import { render , screen, fireEvent} from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchTags Tests', () => {
  it('Should render the search item tag', async () => {  
    const searchTagHandler = jest.fn()

    const {getByRole} = render(<SearchBar searchTagHandler={searchTagHandler}/>);

    expect(await screen.findByText(/ADD TAG/)).toBeInTheDocument();

    getByRole('textbox').value = 'testTag' as any;
    // fireEvent(getByRole('textbox'), new InputEvent('input', {data: 'testTag'}));
    await screen.findByText(/testTag/)
    expect(getByRole('textbox').value).toBe('testTag');

    getByRole('button').click();
    expect(searchTagHandler).toHaveBeenCalledTimes(1);
    expect(searchTagHandler).toHaveBeenCalledWith('testTag');
    expect(getByRole('textbox').value).toBe('');

  });
})