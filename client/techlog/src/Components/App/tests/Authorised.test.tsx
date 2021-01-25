import React from 'react'
import { fireEvent, render } from '@testing-library/react';
import Authorised from '../Authorised';

describe('Authorised Tests', () => {

  it('Should render the Authorised component', async () => {
   render(<Authorised />);
  });

  it('Should toggle theme change on moon/sun button press', async () => {
    const { getByTestId } = render(<Authorised/>);
    expect(getByTestId('moon-icon')).toBeTruthy();
    fireEvent.click(getByTestId('toggle-theme'));
    expect(getByTestId('sun-icon')).toBeTruthy();
    fireEvent.click(getByTestId('toggle-theme'));
    expect(getByTestId('moon-icon')).toBeTruthy();
  })
})


