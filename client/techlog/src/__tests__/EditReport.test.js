import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditReport from '../Components/EditReport/EditReport';

// describe('Edit report', () => {
  
//   beforeEach(() => {
//     render(<MemoryRouter><EditReport/></MemoryRouter>);
//   });

  //! Edit Report currently not retrieving reports when given ID, needs to be fixed before tests can be implemented

// })