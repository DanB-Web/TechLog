import React from 'react'
import { render , screen, fireEvent} from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Tests', () => {
  it('Should allow user to add tags to search for', async () => {  
    const searchTagHandler = jest.fn((arg:string) => {});

    const {getByRole} = render(<SearchBar searchTagHandler={searchTagHandler}/>);
    expect(await screen.findByText(/ADD TAG/)).toBeInTheDocument();

    fireEvent.change(getByRole('textbox'), {target: {value: 'testTag'}})
    expect((getByRole('textbox') as HTMLInputElement).value).toBe('testTag');

    // simulate ADD TAG button click
    getByRole('button').click();
    expect(searchTagHandler).toHaveBeenCalledTimes(1);
    expect(searchTagHandler).toHaveBeenCalledWith('testTag');
    expect((getByRole('textbox') as HTMLInputElement).value).toBe('');

    fireEvent.change(getByRole('textbox'), {target: {value: 'testTag'}})
    expect((getByRole('textbox') as HTMLInputElement).value).toBe('testTag');

    // simulate enter key
    fireEvent.keyDown(getByRole('textbox'), 
      {  
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13
      })
    expect(searchTagHandler).toHaveBeenCalledTimes(2);
    expect(searchTagHandler).toHaveBeenCalledWith('testTag');
    expect((getByRole('textbox') as HTMLInputElement).value).toBe('');

  });
})