import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormSearchTags from '../Form/FormSearchTags';
import Form from '../Form/Form';

beforeEach(() => {
  //? using Form component as contains handler function for FormSearchTags - move these down into FormSearchTags component in refactor?
  render(<MemoryRouter><Form /></MemoryRouter>);
})

describe('Form Search Tags', () => {
  
  it('Should render a tag to tag list', () => {
    const testTag = 'testTag'
    fireEvent.change(screen.getByLabelText('custom__tag__input'), {
      target: { value: testTag }
    });
    fireEvent.click(screen.getByRole('button', { name: 'ADD TAG'}));
    expect(screen.getByText('#' + testTag)).toBeInTheDocument();
  });

  it('Should remove tag when clicked on', () => {
    const testTag = 'removableTag'
    fireEvent.change(screen.getByLabelText('custom__tag__input'), {
      target: { value: testTag }
    });
    fireEvent.click(screen.getByRole('button', { name: 'ADD TAG'}));
    const screenTag = screen.getByText('#' + testTag)
    fireEvent.click(screenTag);
    expect(screenTag).not.toBeInTheDocument();
  });

})