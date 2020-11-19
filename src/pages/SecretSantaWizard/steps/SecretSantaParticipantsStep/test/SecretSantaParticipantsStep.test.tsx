import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DefaultTestWrapper from '../../../../../test/DefaultTestWrapper';
import SecretSantaParticipantsStep from '../SecretSantaParticipantsStep';
import Participant, { ContactType } from '../../../../../entities/Participant';

describe('SecretSantaEventStep', () => {
  let component: React.ReactElement;

  describe('when participants are provided', () => {
    const participants = [new Participant('Participant 1', ContactType.SMS, '+55511234567890', 'pt-BR'),
      new Participant('Participant 2', ContactType.EMAIL, '+11234567890', 'en'),
    ];

    beforeEach(() => {
      component = (
        <DefaultTestWrapper>
          <SecretSantaParticipantsStep
            onStepChange={() => { }}
            participants={participants}
          />
        </DefaultTestWrapper>
      );

      render(component);
    });

    describe(('Check elements prepulated'), () => {
      it('should diplay participant 1 name', () => {
        const input = screen.getAllByLabelText('Participant Name')[0] as HTMLInputElement;
        expect(input.value).toBe(participants[0].name);
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
      });

      it('should diplay participant 2 name', () => {
        const input = screen.getAllByLabelText('Participant Name')[1] as HTMLInputElement;
        expect(input.value).toBe(participants[1].name);
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
      });
    });

    describe('Add new participant', () => {
      beforeEach(() => {
        const button = screen.getByRole('button', { name: /Add Participant/ }) as HTMLButtonElement;
        fireEvent.click(button);
      });

      it('should add new participant', () => {
        expect(screen.getAllByLabelText('Participant Name').length).toBe(3);
      });

      it('update new participant name value', () => {
        const input = screen.getAllByLabelText('Participant Name')[2] as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'John Doe' } });
        fireEvent.blur(input);
        expect(screen.getAllByLabelText('Participant Name').length).toBe(3);
        expect(input.value).toBe('John Doe');
      });
    });

    describe('Remove participant', () => {
      it('should remove participant on click delete', () => {
        const button = screen.queryAllByTestId('delete-participant')[0] as HTMLButtonElement;
        fireEvent.click(button);
        expect(screen.getAllByLabelText('Participant Name').length).toBe(1);
        const input = screen.getByLabelText('Participant Name') as HTMLInputElement;
        expect(input.value).toBe(participants[1].name);
      });
    });
  });

  describe('when no participant is provided', () => {
    beforeEach(() => {
      component = (
        <DefaultTestWrapper>
          <SecretSantaParticipantsStep
            onStepChange={() => { }}
          />
        </DefaultTestWrapper>
      );

      render(component);
    });

    it('should have default provider provider', () => {
      expect(screen.queryAllByLabelText('Participant Name').length).toBe(0);
    });
  });
});
