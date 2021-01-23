import React from 'react'
import { render } from '@testing-library/react';
import App from '../App';


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe('App component tests ', () => {
  it('Should render App', async () => {
    const { findByTestId } = render(<App/>);
    const app = await findByTestId('app');
    expect(app.className).toBe('App');
  })
});
