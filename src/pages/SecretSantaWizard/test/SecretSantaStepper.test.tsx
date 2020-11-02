import React from 'react';
import { render, screen } from '@testing-library/react';
import SecretSantaStepper from '../SecretSantaStepper';
import DefaultTestWrapper from '../../../test/DefaultTestWrapper';

describe('SecretSantaStepper', () => {
  let component: React.ReactElement;

  describe(('when current step is 0'), () => {
    beforeEach(() => {
      component = (
        <DefaultTestWrapper>
          <SecretSantaStepper currentStep={0} />
        </DefaultTestWrapper>
      );
    });

    it('should diplay Event Details step', () => {
      render(component);
      expect(screen.getByText('Event Details')).toBeVisible();
    });

    it('should diplay Participants step', () => {
      render(component);
      expect(screen.getByText('Participants')).toBeVisible();
    });

    it('should diplay Conformation step', () => {
      render(component);
      expect(screen.getByText('Confirmation')).toBeVisible();
    });
  });
});
