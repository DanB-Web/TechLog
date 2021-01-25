import React from 'react';
import NewReport from '../Components/NewReport/NewReport';
import { Form } from '../Form/Form';
import { MemoryRouter } from 'react-router-dom';
import { screen, getByLabelText, render, fireEvent, getByRole, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';



describe ('New Report', () => {

  beforeEach(() => {
    render(<MemoryRouter><NewReport/></MemoryRouter>);
  });

  it('Should render submit button on ‘new’ page', async () => {
    expect(screen.getByRole('button', {name: 'SUBMIT'})).toBeInTheDocument();
  });

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

  it('Should render a step to step list', () => {
    const testStep = 'testStep'
    fireEvent.change(screen.getByLabelText('Steps'), {
      target: { value: testStep }
    });
    fireEvent.click(screen.getByRole('button', { name: 'ADD STEP'}));
    fireEvent.change(screen.getByLabelText('Steps'), {
      target: { value: '' }
    });
    expect(screen.getByText(testStep)).toBeInTheDocument();
  });

  it('Should remove step from step list when clicked on', () => {
    const testStep = 'removableStep';
    fireEvent.change(screen.getByLabelText('Steps'), {
      target: { value: testStep }
    });
    fireEvent.click(screen.getByRole('button', { name: 'ADD STEP'}));
    fireEvent.change(screen.getByLabelText('Steps'), {
      target: { value: '' }
    });
    const screenStep = screen.getByText(testStep);
    fireEvent.click(screenStep);
    expect(screenStep).not.toBeInTheDocument();
  });


})
