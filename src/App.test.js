import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('changes useState of Submitted to true, and renders user data', () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(getByTestId('app-button-submit'));
  expect(getByTestId('app-div-data')).toHaveTextContent('Submitted User Data');
});

describe('The user data that appears on Submit', () => {
  it('always renders at 360px wide', () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('app-button-submit'));
    expect(getByTestId('app-div-data')).toHaveStyle('width:360px');
  });
});

describe('Room 4 checkbox interaction', () => {
  test('If Room 4 is checked, Room 3 and Room 2 are also checked', () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('heading-input-tag-4'));
    expect(getByTestId('heading-input-tag-3')).toHaveProperty("checked", true);
    expect(getByTestId('heading-input-tag-2')).toHaveProperty("checked", true);
  });
});

describe('Room 3 checkbox interaction', () => {
  test('If Room 3 is checked, Room 2 is also checked', () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('heading-input-tag-3'));
    expect(getByTestId('heading-input-tag-2')).toHaveProperty("checked", true);
  });
});

describe('Room 2 checkbox interaction', () => {
  test('If Room 2 is unchecked, Room 3 and 4 are also unchecked', () => {
    const { getByTestId } = render(<App />);
    // User checks Room 4, which checks Rooms 2 and 3
    fireEvent.click(getByTestId('heading-input-tag-4'));
    // User checks Room 2, which unchecks Rooms 3 and 4
    fireEvent.click(getByTestId('heading-input-tag-2'));
    expect(getByTestId('heading-input-tag-3')).toHaveProperty("checked", false);
    expect(getByTestId('heading-input-tag-4')).toHaveProperty("checked", false);
  });
});
