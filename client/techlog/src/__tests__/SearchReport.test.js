import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchList from '../Components/Search/SearchList';
import mockReports from '../test_mocks/mockReports'

describe('Search Reports', () => {

  //* trying to clone data afresh before each
  // beforeEach(() => {
  //   let mockReports = mockReports.map(el => JSON.parse(JSON.stringify(el)))
  // })
  
  it('should render dummy data to item list', async () => {
    
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockReports)
      })
    );

    await act(async () => {
      render(<MemoryRouter><SearchList/></MemoryRouter>);
    });

    expect(screen.getByText(mockReports[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockReports[1].title)).toBeInTheDocument();
  });

  it('Should render input search tag to tag list', async () => {
    const emptyReports = [];

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(emptyReports)
      })
    );

    await act(async () => {
      render(<MemoryRouter><SearchList/></MemoryRouter>);
    });

    const testTag = 'testTag';
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: testTag }
    });
    fireEvent.click(screen.getByRole('button', {name: 'ADD TAG'}));
    expect(screen.getByText('#' + testTag)).toBeInTheDocument();
    
  });


  it('Should remove a tag when clicked on', async () => {

    jest.spyOn(window, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockReports)
      })
    );

    await act(async () => {
      render(<MemoryRouter><SearchList/></MemoryRouter>);
    });

    const testTag = 'testTag';
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: testTag }
    });
    fireEvent.click(screen.getByRole('button', {name: 'ADD TAG'}));
    const renderedTag = screen.getByText(/testTag/i);
    fireEvent.click(renderedTag);
    expect(renderedTag).not.toBeInTheDocument();
    
  });

  it ('Should filter out the displayed search items by tag', async () => {
    
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockReports)
      })
    );

    await act(async () => {
      render(<MemoryRouter><SearchList/></MemoryRouter>);
    });
    // check if both on page
    const reportTitle1 = screen.getByText('First Report');
    const reportTitle2 = screen.getByText('Second Report');
    expect(reportTitle1).toBeInTheDocument();
    expect(reportTitle2).toBeInTheDocument();
    // put in a search tag
    const searchTag = 'tag1';
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: searchTag }
    });
    fireEvent.click(screen.getByRole('button', {name: 'ADD TAG'}));
    // check tagged one on page
    expect(reportTitle1).toBeInTheDocument();
    // check non-tagged one not on page
    expect(reportTitle2).not.toBeInTheDocument();
  })
 
});
 