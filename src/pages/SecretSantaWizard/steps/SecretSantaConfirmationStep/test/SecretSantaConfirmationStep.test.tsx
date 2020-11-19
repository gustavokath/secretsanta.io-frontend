import React from 'react';
import { render, screen } from '@testing-library/react';
import DefaultTestWrapper from '../../../../../test/DefaultTestWrapper';
import SecretSantaConfirmationStep from '../SecretSantaConfirmationStep';
import SecretSanta from '../../../../../entities/SecretSanta';
import Participant, { ContactType } from '../../../../../entities/Participant';

describe('SecretSantaEventStep', () => {
  let component: React.ReactElement;
  const participants = [new Participant('Participant 1', ContactType.SMS, '+55511234567890', 'pt-BR'),
    new Participant('Participant 2', ContactType.EMAIL, '+11234567890', 'en'),
  ];
  const event = new SecretSanta('Event 1', new Date(), participants);
  const backFunction = () => jest.fn();

  beforeEach(() => {
    component = (
      <DefaultTestWrapper>
        <SecretSantaConfirmationStep
          onSubmit={() => {}}
          onStepChange={backFunction}
          event={event}
        />
      </DefaultTestWrapper>
    );

    render(component);
  });

  describe(('Check elements on screen'), () => {
    it('should diplay event title', () => {
      const input = screen.getByLabelText('Event Name') as HTMLInputElement;
      expect(input.value).toBe(event.name);
      expect(input.disabled).toBeTruthy();
    });

    it('should diplay event date', () => {
      const input = screen.getByLabelText('Event Date') as HTMLInputElement;
      expect(input.value).toBe(`${event.date.getMonth() + 1}/${event.date.getDate()}/${event.date.getFullYear()}`);
      expect(input.disabled).toBeTruthy();
    });

    it('should diplay participant 1 name', () => {
      const input = screen.getAllByLabelText('Participant Name')[0] as HTMLInputElement;
      expect(input.value).toBe(participants[0].name);
      expect(input.disabled).toBeTruthy();
    });

    it('should diplay participant 1 langauge', () => {
      const inputText = (screen.getAllByLabelText('Language')[0].childNodes[0] as Text).data;
      expect(inputText).toBe('Portuguese');
    });

    it('should diplay participant 1 notification', () => {
      const inputText = (screen.getAllByLabelText('Notification Method')[0].childNodes[0] as Text).data;
      expect(inputText).toBe('SMS');
    });

    it('should diplay participant 1 contact', () => {
      const input = screen.getAllByLabelText('Phone')[0] as HTMLInputElement;
      expect(input.value).toBe(participants[0].contact);
      expect(input.disabled).toBeTruthy();
    });

    it('should diplay participant 2 name', () => {
      const input = screen.getAllByLabelText('Participant Name')[1] as HTMLInputElement;
      expect(input.value).toBe(participants[1].name);
      expect(input.disabled).toBeTruthy();
    });

    it('should diplay participant 2 langauge', () => {
      const inputText = (screen.getAllByLabelText('Language')[1].childNodes[0] as Text).data;
      expect(inputText).toBe('English');
    });

    it('should diplay participant 2 notification', () => {
      const inputText = (screen.getAllByLabelText('Notification Method')[1].childNodes[0] as Text).data;
      expect(inputText).toBe('Email');
    });

    it('should diplay participant 2 contact', () => {
      const input = screen.getAllByLabelText('Email')[1] as HTMLInputElement;
      expect(input.value).toBe(participants[1].contact);
      expect(input.disabled).toBeTruthy();
    });
  });
});
