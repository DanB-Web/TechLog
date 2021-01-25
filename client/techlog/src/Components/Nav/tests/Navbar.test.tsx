import React from 'react'
import { render , screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import Authorised from '../../App/Authorised';


describe('SearchTags Tests', () => {
  beforeEach(async () => {
    cleanup()
  });

  it('Should render the Navbar', async () => {    
    render(
      <MemoryRouter >
        <Navbar 
          admin={true} 
          logout={()=> {}} 
          mode={'test'} 
          authorised={true} 
          toggleMode={()=> {}} 
        />
      </MemoryRouter>
    );
    expect(await screen.findByText(/New/)).toBeInTheDocument();
  });

  it('Should take user to New page on link press', async () => {
   
    const { getByTestId, debug } = render(
      <MemoryRouter>
        <Authorised/>
      </MemoryRouter>
    );
    const editButton = getByTestId('edit-button')
    fireEvent.click(editButton)
    //debug();
    await screen.findByText(/REPORT ID:/)
    const newButton = getByTestId('new-button')
    fireEvent.click(newButton)
    await screen.findByText(/Report Title/)
    
  })

  it('Should take user to Edit page on link press', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Authorised/>
      </MemoryRouter>
    );
    const editButton = getByTestId('edit-button')
    fireEvent.click(editButton)
    await screen.findByText(/REPORT ID:/)

  })

  it('Should take user to New page on link press', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Authorised/>
      </MemoryRouter>
    );
    const newButton = getByTestId('new-button')
    fireEvent.click(newButton)
    await screen.findByText(/Report Title/)
  })

  it('Should take user to New page on link press', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Authorised/>
      </MemoryRouter>
    );
    const logoutButton = getByTestId('logout-button')
    fireEvent.click(logoutButton)
    await screen.findByText(/Please log in.../)
  })
})