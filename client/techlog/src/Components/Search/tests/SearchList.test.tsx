import React from 'react'
import { render , screen, fireEvent} from '@testing-library/react';
import {IReport} from '../../../Utils/interfaces';
import rest from '../../../Utils/rest';
import SearchList from '../SearchList';

jest.mock('../../../Utils/rest');

rest.getReports = async () : Promise<IReport[]> =>  await Promise.resolve(
    [{
     title: 'Mocked report',
     description: 'Mocked description',
     steps: ['step1', 'step2'],
     tags: ['testTag'],
     images: ['pic1']
   }]
  );

describe('SearchList Tests', () => {
  it('Should render The Search List with a mock report', async () => {
    render(<SearchList admin={true} />)
    await screen.findByText(/Mocked report/)
  });

  it('Should show a tag when submited to the searchbar', async () => {
    const { getByTestId, getByRole, getByText } = render(<SearchList admin={true} />)
    await screen.findByText(/Mocked report/)
    fireEvent.change(getByRole('textbox'), {target: {value: 'testTag'}});
    getByText(/ADD TAG/).click();
    expect(getByTestId("search-tag-item")).toHaveTextContent('#testTag');
  });

  it('Should show the report if filtered by correct tag', async () => {
    const { getByRole, getByText } = render(<SearchList admin={true} />)
    await screen.findByText(/Mocked report/)
    fireEvent.change(getByRole('textbox'), {target: {value: 'testTag'}});
    getByText(/ADD TAG/).click();
    expect(await screen.findByText(/Mocked report/)).toBeInTheDocument()
  });

  it('Should show the report if filtered by incorrect tag', async () => {
    const { getByRole, getByText } = render(<SearchList admin={true} />)
    await screen.findByText(/Mocked report/)
    fireEvent.change(getByRole('textbox'), {target: {value: 'badTag_incorrect'}});
    getByText(/ADD TAG/).click();
    expect( await screen.queryByText(/Mocked report/)).toBeNull();
  });

});
