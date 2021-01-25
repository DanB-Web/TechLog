import { render } from '@testing-library/react';

import Image from '../Image'

const src = 'test.jpg';

describe('Image component tests', () => {

  it('should render Image component', () => {
    const {getByRole} =  render(<Image image={src}/>);
    const img = getByRole('img');
    expect((img as HTMLImageElement).src).toBe(`http://localhost/${src}`)
  });

});
