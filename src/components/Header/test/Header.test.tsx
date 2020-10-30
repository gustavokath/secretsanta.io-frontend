import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import DefaultTestWrapper from '../../../test/DefaultTestWrapper';

describe('Header', () => {
  let component: React.ReactElement;

  describe(('when default behaviour'), () => {
    beforeEach(() => {
      component = (
        <DefaultTestWrapper>
          <Header />
        </DefaultTestWrapper>
      );
    });

    it('should diplay header with title', () => {
      render(component);
      expect(screen.getByText('Secret Santa')).toBeVisible();
    });
  });
});
