import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import DefaultTestWrapper from './test/DefaultTestWrapper';

describe('App', () => {
  let component: React.ReactElement;

  beforeEach(() => {
    component = (
      <DefaultTestWrapper>
        <App />
      </DefaultTestWrapper>
    );
  });

  it('renders home page and shows header', () => {
    render(component);
    expect(screen.getByText('Secret Santa')).toBeVisible();
  });
});
