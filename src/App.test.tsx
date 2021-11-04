import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';

it('renders poster link text', () => {
  render(<App/>);
  expect(screen.getByText('View Poster')).toBeInTheDocument();
});
it('renders correct poster link', () => {
  render(<App/>);
  expect(screen.getByText('View Poster').closest('a')).toHaveAttribute('href',"/whatgoeswhere/posters/St. Michael's Hospital.pdf");
});
