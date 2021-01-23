import { MemoryRouter } from 'react-router-dom';
import { render,screen, cleanup, fireEvent } from '@testing-library/react';
import Login from '../Login';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as object,
  useHistory: () => ({
    push:  mockHistoryPush,
  }),
}));

const adminRights = jest.fn();

describe('Login component tests', () => {

  afterEach(cleanup);

  it('Should render App', async () => {
    render(
      <MemoryRouter >
        <Login adminRights={adminRights}/>
      </MemoryRouter>
    );
    expect(await screen.findByText(/Please log in.../)).toBeInTheDocument();
  })

  it('Should grant admin rights and redirect when login as admin', async () => {
    const {getByText} = render(
      <MemoryRouter>
        <Login adminRights={adminRights}/>
      </MemoryRouter>
    );
    getByText('ADMIN').click()
    expect(adminRights).toHaveBeenCalledTimes(1);
    expect(adminRights).toHaveBeenCalledWith(true);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/search');
  });

  it('Should grant only user rights and redirect when login as user', async () => {
    const {getByText} = render(
      <MemoryRouter>
        <Login adminRights={adminRights}/>
      </MemoryRouter>
    );
    getByText('USER').click()
    expect(adminRights).toHaveBeenCalledTimes(1);
    expect(adminRights).toHaveBeenCalledWith(false);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/search');
  });

});
