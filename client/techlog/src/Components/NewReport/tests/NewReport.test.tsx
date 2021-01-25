import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewReport from '../NewReport';
import rest from '../../../Utils/rest';

jest.mock('../../../Utils/rest')

const postReport = jest.fn();
rest.postReport = postReport;

const mockAlert =jest.fn();
global.alert = mockAlert;

const mockReport = {
  title : 'title',
  searchTags: ['kyst'],
  description: 'descrption',
  steps: ['step'],
  filterPics : []
  }

//to force form submit
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as object,
  useLocation: () => ({
    pathname: '/new',
  }),

}));

describe('NewReport component tests', () => {

  afterEach(cleanup);

  it('should render NewReport component', () => {
    render(
      <MemoryRouter>
        <NewReport/>
      </MemoryRouter>
     );
  });

  it('should submit a a new report', async () => {
    const { getByTestId, getByDisplayValue } = render(
      <MemoryRouter>
        <NewReport/>
      </MemoryRouter>
     );

     // SET TITLE
    fireEvent.change(getByTestId('title') , {target : {value : mockReport.title}});
    // ADD A TAG
    getByDisplayValue('kyst').click()
    // SET DESCRIPTION
    fireEvent.change(getByTestId('description') , {target : {value : mockReport.description}});
    // SET A STEP
    fireEvent.change(getByTestId('step-input') , {target : {value : mockReport.steps[0]}});
    getByTestId('add-step').click();
    // SUMBIT FORM
     getByTestId('submit-form').click();
    // wait until kyst is unckecked again to avoid warning
    await waitFor(() => getByDisplayValue('kyst'));
    expect(postReport).toHaveBeenCalledTimes(1);
    expect(postReport).toHaveBeenCalledWith(...Object.values(mockReport));
  });

  it('should raise an alert if form is invalid', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NewReport/>
      </MemoryRouter>
     );
    // try to submit an empty form
    getByTestId('submit-form').click();
    expect(mockAlert).toHaveBeenCalledTimes(1);
  });
});
