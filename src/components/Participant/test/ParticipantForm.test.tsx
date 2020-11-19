import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import DefaultTestWrapper from '../../../test/DefaultTestWrapper';
import ParticipantForm from '../ParticipantForm';
import Participant, { ContactType } from '../../../entities/Participant';

describe('SecretSantaEventStep', () => {
  let component: React.ReactElement;

  describe('View mode with SMS', () => {
    const participant = new Participant('John Doe', ContactType.SMS, '+5551123456789', 'en');

    beforeEach(() => {
      component = (
        <DefaultTestWrapper>
          <ParticipantForm
            participant={participant}
            viewMode
          />
        </DefaultTestWrapper>
      );

      render(component);
    });

    it('should display participant name', () => {
      const input = screen.getByLabelText('Participant Name') as HTMLInputElement;
      expect(input.value).toBe(participant.name);
    });

    it('should display participant language', () => {
      const inputText = (screen.getByLabelText('Language').childNodes[0] as Text).data;
      expect(inputText).toBe('English');
    });

    it('should display participant contact method', () => {
      const inputText = (screen.getByLabelText('Notification Method').childNodes[0] as Text).data;
      expect(inputText).toBe(participant.contactMethod);
    });

    it('should display participant phone', () => {
      const input = screen.getByLabelText('Phone') as HTMLInputElement;
      expect(input.value).toBe(participant.contact);
    });

    it('should not display participant email', () => {
      expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
    });
  });

  describe('View mode with Email', () => {
    const participant = new Participant('John Doe', ContactType.EMAIL, 'email@secretsanta.app', 'en');

    beforeEach(() => {
      component = (
        <DefaultTestWrapper>
          <ParticipantForm
            participant={participant}
            viewMode
          />
        </DefaultTestWrapper>
      );

      render(component);
    });

    it('should display participant name', () => {
      const input = screen.getByLabelText('Participant Name') as HTMLInputElement;
      expect(input.value).toBe(participant.name);
    });

    it('should display participant language', () => {
      const inputText = (screen.getByLabelText('Language').childNodes[0] as Text).data;
      expect(inputText).toBe('English');
    });

    it('should display participant contact method', () => {
      const inputText = (screen.getByLabelText('Notification Method').childNodes[0] as Text).data;
      expect(inputText).toBe('Email');
    });

    it('should display participant email', () => {
      const input = screen.getAllByLabelText('Email')[1] as HTMLInputElement;
      expect(input.value).toBe(participant.contact);
    });

    it('should not display participant phone', () => {
      expect(screen.queryByLabelText('Phone')).not.toBeInTheDocument();
    });
  });

  describe('when in Edit Mode', () => {
    describe('when participant empty', () => {
      const participant = new Participant();
      beforeEach(() => {
        component = (
          <DefaultTestWrapper>
            <ParticipantForm
              participant={participant}
            />
          </DefaultTestWrapper>
        );

        render(component);
      });

      it('should have no name', () => {
        const input = screen.getByLabelText('Participant Name') as HTMLInputElement;
        expect(input.value).toBe('');
      });

      it('should have no selected language', () => {
        const inputText = (screen.getByLabelText('Language').childNodes[0] as Text).data;
        expect(inputText).toBe(undefined);
      });

      it('should have SMS as notification method', () => {
        const inputText = (screen.getByLabelText('Notification Method').childNodes[0] as Text).data;
        expect(inputText).toBe('SMS');
      });

      it('should have no phone', () => {
        const input = screen.getByLabelText('Phone') as HTMLInputElement;
        expect(input.value).toBe('');
      });

      describe('when change participant name', () => {
        it('should have new value', () => {
          const newName = 'John Doe';
          const input = screen.getByLabelText('Participant Name') as HTMLInputElement;
          fireEvent.change(input, { target: { value: newName } });
          expect(input.value).toBe(newName);
        });

        describe('when invalid participant value', () => {
          it('should show name valation message', () => {
            const newName = 'John Doe';
            const input = screen.getByLabelText('Participant Name') as HTMLInputElement;
            fireEvent.change(input, { target: { value: newName } });
            fireEvent.blur(input);
            fireEvent.change(input, { target: { value: '' } });
            fireEvent.blur(input);
            const errorMessage = screen.getByText('Required Field');

            expect(input.value).toBe('');
            expect(errorMessage).toBeVisible();
          });
        });
      });

      describe('when change language', () => {
        it('should have new language', () => {
          const select = screen.getByRole('button', { name: /Language/i });
          fireEvent.mouseDown(select);
          const selectList = within(screen.getByRole('listbox'));
          fireEvent.click(selectList.getByText('English'));
          expect(selectList.getByText('English')).toHaveAttribute('data-value', 'en');
        });
      });

      describe('when change notification method', () => {
        it('should have email as notification method when', () => {
          const select = screen.getByRole('button', { name: /Notification Method/i });
          fireEvent.mouseDown(select);
          const selectList = within(screen.getByRole('listbox'));
          fireEvent.click(selectList.getByText('Email'));
          expect(selectList.getByText('Email')).toHaveAttribute('data-value', 'EMAIL');
        });
      });

      describe('when change phone', () => {
        it('should have new phone value', () => {
          const newValue = '+55511234567890';
          const input = screen.getByLabelText('Phone') as HTMLInputElement;
          fireEvent.change(input, { target: { value: newValue } });
          expect(input.value).toBe(newValue);
        });

        describe('when missing country code', () => {
          it('should display country code validation error', () => {
            const input = screen.getByLabelText('Phone') as HTMLInputElement;
            fireEvent.change(input, { target: { value: '51123456789' } });
            fireEvent.blur(input);
            const errorMessage = screen.getByText('Add your country code (Ex: +1)');
            expect(errorMessage).toBeVisible();
          });
        });

        describe('when invalid phone', () => {
          it('should display validation error', () => {
            const input = screen.getByLabelText('Phone') as HTMLInputElement;
            fireEvent.change(input, { target: { value: '' } });
            fireEvent.blur(input);
            fireEvent.change(input, { target: { value: '+5551997' } });
            fireEvent.blur(input);
            const errorMessage = screen.getByText('Invalid Phone');
            expect(errorMessage).toBeVisible();
          });
        });
      });

      describe('when change Email', () => {
        beforeEach(() => {
          const input = screen.getByTestId(`contact-method-input-${participant.id}`);
          fireEvent.change(input, { target: { value: 'EMAIL' } });
        });

        it('should have new email value', async () => {
          const select = screen.getByTestId(`contact-method-input-${participant.id}`);
          fireEvent.change(select, { target: { value: 'EMAIL' } });
          const newValue = 'user@email.com';
          const input = screen.getAllByLabelText('Email')[1] as HTMLInputElement;
          fireEvent.change(input, { target: { value: newValue } });
          expect(input.value).toBe(newValue);
        });

        describe('when invalid email', () => {
          it('should display email validation error', () => {
            const select = screen.getByTestId(`contact-method-input-${participant.id}`);
            fireEvent.change(select, { target: { value: 'EMAIL' } });
            const input = screen.getAllByLabelText('Email')[1] as HTMLInputElement;
            fireEvent.change(input, { target: { value: 'mail' } });
            fireEvent.blur(input);
            const errorMessage = screen.getByText('Invalid Email');
            expect(errorMessage).toBeVisible();
          });
        });
      });
    });
  });
});
