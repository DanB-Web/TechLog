import { render, cleanup, screen } from '@testing-library/react';

import Backdrop  from '../Backdrop'

const BackdropProps = {
  admin : true,
  id: '1234',
  title: 'Mock Report Title',
  tags: ['mock_tag'],
  description: 'mock description',
  steps: ['mock_step'],
  images: ['mock.jpg'],
  reportId: (id:string) => {},
  toggleModal: () => {},
  callReports: () => {},
}


describe('Backdrop  component tests', () => {

  afterEach(cleanup);

  it('should render Backdrop component with a Modal inside', () => {
    render(<div id ={'backdrop-hook'}/>);
    render(<Backdrop {...BackdropProps}/>)
    expect(screen.queryByText(/Mock Report Title/)).not.toBeNull();
  });

});
