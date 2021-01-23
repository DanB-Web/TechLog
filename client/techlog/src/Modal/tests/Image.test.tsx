import { render, cleanup } from '@testing-library/react';

import Image from '../Image'

const src = 'test.jpg';

describe('Image component tests', () => {

  afterEach(cleanup);

  it('should render Image component', () => {
    const {getByRole} =  render(<Image image={src}/>);
    const img = getByRole('img');
    expect((img as HTMLImageElement).src).toBe(`http://localhost/${src}`)
  });

});
