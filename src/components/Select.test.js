import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Select from './Select.js';

afterEach(cleanup);

it('renders correctly', () => {
  const { asFragment } = render(
    <Select
      userType={'Adult'}
      isDisabled={false}
      ageNum={'18'}
      name={'adult'}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});



it('inserts text in label tag', () => {
  const { getByTestId } = render(
    <Select
      userType={'Adult'}
      isDisabled={false}
      ageNum={'18'}
      name={'adult'}
    />
  );

  expect(getByTestId('select-label-tag')).toHaveTextContent('Adult');
});
