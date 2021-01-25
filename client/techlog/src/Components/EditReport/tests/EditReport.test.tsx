import { render, cleanup, waitFor, screen, fireEvent } from '@testing-library/react';
import EditReport from '../EditReport';
import rest from '../../../Utils/rest';
import { IReport } from 'src/src/Utils/interfaces';
import { MemoryRouter } from 'react-router-dom';

const mockReport = {
  _id: '1234',
  title: 'Mocked report',
  description: 'Mocked description',
  steps: ['step1', 'step2'],
  tags: ['testTag']
}

jest.mock('../../../Utils/rest')

rest.getReport = async () : Promise<IReport> => await Promise.resolve(mockReport);

const mockEditReport = jest.fn()
rest.editReport = mockEditReport;

// Simulate path /edit
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as object,
  useLocation: () => ({
    pathname: '/edit',
  }),
}));

describe('EditReport Comopment tests', () => {

  afterEach(cleanup);

  it('should render EditReport Component', async () => {
    render(<EditReport editReport='1234'/>);
    expect(await screen.findByText(/FIND REPORT/)).toBeInTheDocument();
  });

  it('should edit report', async () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <EditReport editReport='1234'/>
      </MemoryRouter>
    );
    getByText(/PASTE ID/).click();
    getByText(/FIND REPORT/).click();
    await waitFor(() => getByText(/Report Title/));

    fireEvent.change(getByTestId('title') , {target : {value : 'Updated Title'}});
    getByTestId('submit-form').click();
    expect(mockEditReport).toHaveBeenCalledTimes(1);
    expect(mockEditReport).toHaveBeenCalledWith({...mockReport, title: 'Updated Title'});

  });



});
