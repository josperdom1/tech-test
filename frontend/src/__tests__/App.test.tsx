import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Nexplore TODO title', () => {
  render(<App />);
  const titleElement = screen.getByText('Nexplore TODO');
  expect(titleElement).toBeInTheDocument();
});
