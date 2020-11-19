import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DefaultTestWrapper from '../../../../../test/DefaultTestWrapper';
import SecretSantaEventStep from '../SecretSantaEventStep';

describe('SecretSantaEventStep', () => {
  let component: React.ReactElement;

  beforeEach(() => {
    component = (
      <DefaultTestWrapper>
        <SecretSantaEventStep
          eventName={`Secret Santa ${new Date().getFullYear()}`}
          eventDate={new Date()}
          onStepChange={() => {}}
        />
      </DefaultTestWrapper>
    );

    render(component);
  });

  describe(('Check elements on screen'), () => {
    it('should diplay Title', () => {
      expect(screen.getByText('Event Details')).toBeVisible();
    });

    it('should diplay default event name', () => {
      const input = screen.getByLabelText('Event Name') as HTMLInputElement;
      expect(input.value).toBe(`Secret Santa ${new Date().getFullYear()}`);
    });
  });

  describe('Fields validations', () => {
    it('should show required field on empty event name', () => {
      const input = screen.getByLabelText('Event Name');
      fireEvent.change(input, { target: { value: '' } });
      const errorMessage = screen.getByText('Required Field');
      expect(errorMessage).toBeVisible();
    });

    it('should show invalid message on wrong event date', () => {
      const input = screen.getByLabelText('Event Date');
      fireEvent.change(input, { target: { value: '15/15/2020' } });
      const errorMessage = screen.getByText('Invalid Date');
      expect(errorMessage).toBeVisible();
    });
  });
});
