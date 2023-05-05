import { render } from '@testing-library/react';

import Input from './Input';
import React from 'react';

describe('Input', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Input
      type='text'
      label='LoginWrapper input'
      placeholder='Start input'
      onChangeText={(e) => console.log(e.target.value)}
    />);
    expect(baseElement).toBeTruthy();
  });
});
