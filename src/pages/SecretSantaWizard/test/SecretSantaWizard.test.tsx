import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DefaultTestWrapper from '../../../test/DefaultTestWrapper';
import SecretSantaWizard from '../index';

describe('SecretSantaWizard', () => {
  let component: React.ReactElement;

  beforeEach(() => {
    component = (
      <DefaultTestWrapper>
        <SecretSantaWizard />
      </DefaultTestWrapper>
    );

    render(component);
  });

  describe(('when current step is initial'), () => {
    it('should diplay all steps', () => {
      expect(screen.getAllByText('Event Details')[0]).toBeVisible();
      expect(screen.getByText('Participants')).toBeVisible();
      expect(screen.getByText('Confirmation')).toBeVisible();
    });

    it('should display step even details content', () => {
      expect(screen.getAllByText('Event Details')[1]).toBeVisible();
    });
  });

  describe('when click next button in step 0', () => {
    it('should diplay step 1', () => {
      fireEvent.click(screen.queryAllByText('Next')[0]);
      expect(screen.getAllByText('Participants')[1]).toBeVisible();
      expect(screen.getByText('Back')).toBeVisible();
      expect(screen.getByText('Proceed to Confirmation')).toBeVisible();
    });

    describe('when some field has errors', () => {
      beforeEach(() => {
        const input = screen.getByLabelText('Event Name');
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(screen.queryAllByText('Next')[0]);
      });

      it('should show error message', () => {
        expect(screen.getByText('There are some items that require attention')).toBeVisible();
      });

      it('should stay in step 0', () => {
        expect(screen.getAllByText('Event Details')[1]).toBeVisible();
      });

      it('should close error message', () => {
        expect(screen.getByText('There are some items that require attention')).toBeVisible();
        const button = screen.getAllByRole('button', { name: '' })[1];
        fireEvent.click(button);
        expect(screen.getByText('There are some items that require attention')).not.toBeVisible();
      });
    });
  });

  describe('when click next button in step 1', () => {
    it('should diplay step 2', () => {
      fireEvent.click(screen.queryAllByText('Next')[0]);
      fireEvent.click(screen.getAllByText('Proceed to Confirmation')[0]);
      expect(screen.getAllByText('Confirmation')[1]).toBeVisible();
      expect(screen.getByText('Back')).toBeVisible();
      expect(screen.getByText('Run Secret Santa')).toBeVisible();
    });
  });

  describe('when click back button in step 1', () => {
    it('should diplay step 0', () => {
      fireEvent.click(screen.queryAllByText('Next')[0]);
      expect(screen.getAllByText('Participants')[1]).toBeVisible();
      fireEvent.click(screen.getByText('Back'));
      expect(screen.getAllByText('Event Details')[1]).toBeVisible();
      expect(screen.getAllByText('Next')[0]).toBeVisible();
    });
  });

  describe('when click back button in step 2', () => {
    it('should diplay step 1', () => {
      fireEvent.click(screen.queryAllByText('Next')[0]);
      fireEvent.click(screen.getAllByText('Proceed to Confirmation')[0]);
      expect(screen.getAllByText('Confirmation')[1]).toBeVisible();
      fireEvent.click(screen.getAllByText('Back')[0]);
      expect(screen.getAllByText('Participants')[1]).toBeVisible();
      expect(screen.getByText('Back')).toBeVisible();
      expect(screen.getByText('Proceed to Confirmation')).toBeVisible();
    });
  });

  describe('when click run secret santa', () => {
    beforeEach(() => {
      fireEvent.click(screen.queryAllByText('Next')[0]);
      fireEvent.click(screen.getAllByText('Proceed to Confirmation')[0]);
      expect(screen.getAllByText('Confirmation')[1]).toBeVisible();
      expect(screen.getByText('Back')).toBeVisible();
      expect(screen.getByText('Run Secret Santa')).toBeVisible();
    });

    it('should diplay go to finish step when success', () => {
      const mockFetch = jest.fn().mockResolvedValue(() => jest.fn());
      global.fetch = mockFetch;

      fireEvent.click(screen.getAllByText('Run Secret Santa')[0]);
    });

    it('should diplay errorMessageWhenError', async () => {
      const mockFetch = jest.fn().mockRejectedValue(new Error());
      global.fetch = mockFetch;

      fireEvent.click(screen.getAllByText('Run Secret Santa')[0]);
      await waitFor(() => expect(mockFetch).toHaveBeenCalled());
      expect(screen.getByText('Fail to run Secret Santa')).toBeVisible();
    });
  });
});
