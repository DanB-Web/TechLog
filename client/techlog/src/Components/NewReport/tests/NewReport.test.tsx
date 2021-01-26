import { render, cleanup, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewReport from '../NewReport';
import rest from '../../../Utils/rest';
import userEvent from '@testing-library/user-event'

jest.mock('../../../Utils/rest')

const postReport = jest.fn();
rest.postReport = postReport;

const mockAlert =jest.fn();
global.alert = mockAlert;

const mockReport = {
  title : 'title',
  searchTags: ['Kystdesign', 'testCustomTag'],
  description: 'description1234',
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
    render(
      <MemoryRouter>
        <NewReport/>
      </MemoryRouter>
    );
    // SET TITLE
    userEvent.type(screen.getByTestId('title') , mockReport.title);
    // ADD A TAG
    screen.getByDisplayValue('ROV').click();
    screen.getByDisplayValue('ROV').click();
    screen.getByDisplayValue('Kystdesign').click();
    // ADD CUSTOM TAG
    userEvent.type(screen.getByTestId('custom-search-tag') , 'testCustomTag');
    screen.getByText(/ADD TAG/).click();
    // SET DESCRIPTION
    userEvent.type(screen.getByTestId('description') , mockReport.description);
    // SET A STEP
    userEvent.type(screen.getByTestId('step-input'), mockReport.steps[0]);
    screen.getByTestId('add-step').click();
    screen.getByTestId('step-0').click();
    userEvent.type(screen.getByTestId('step-input'), mockReport.steps[0]);
    screen.getByTestId('add-step').click();
    // SUMBIT FORM
    screen.getByTestId('submit-form').click();
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
