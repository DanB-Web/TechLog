import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Authorised from '../Components/App/Authorised';

describe('User Profile', () => {
  
  it('Should not allow User profile to edit reports', () => {
    render(<MemoryRouter><Authorised/></MemoryRouter>);
    const editLink = screen.getByText(/edit/i);
    const newLink = screen.getByText(/new/i);
    const logoutButton = screen.getByText(/log ?out/i);
    fireEvent.click(logoutButton)
    const userButton = screen.getByText(/user/i);
    fireEvent.click(userButton)
    expect(editLink).not.toBeInTheDocument();
    expect(newLink).toBeInTheDocument();
  })
  
  it('Should not allow User profile to delete reports', async () => {

    const dummyReports = [ 
      {
        title: 'Report 1',
        description: 'test test test',
        tags: ['tag1', 'tag2'],
        steps: ['step1', 'step2'],
        images: [],
        reportId: 12345678, 
        _id: '2345'
      },
    ];
    
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(dummyReports)
      })
    );

    await act(async () => {
      render(<MemoryRouter><Authorised/></MemoryRouter>);
    });

    // const reportTitle = screen.getByText('Report 1');
      const logoutButton = screen.getByText(/log ?out/i);
      fireEvent.click(logoutButton)
      const userButton = screen.getByText(/user/i);
      fireEvent.click(userButton)
    expect(screen.getByText(/search/i)).toBeInTheDocument();

    
  }) 

})