import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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
      expect(screen.getByText('Event Details')).toBeVisible();
      expect(screen.getByText('Participants')).toBeVisible();
      expect(screen.getByText('Confirmation')).toBeVisible();
    });

    it('should display step even details content', () => {
      expect(screen.getByText('0')).toBeVisible();
    });
  });

  describe('when click next button in step 0', () => {
    it('should diplay step 1', () => {
      fireEvent.click(screen.queryAllByText('Next')[0]);
      expect(screen.getByText('1')).toBeVisible();
      expect(screen.getAllByText('Back')[0]).toBeVisible();
      expect(screen.getAllByText('Back').length).toEqual(2);
      expect(screen.getAllByText('Proceed to Confirmation')[0]).toBeVisible();
      expect(screen.getAllByText('Proceed to Confirmation').length).toEqual(2);
    });
  });

  describe('when click next button in step 1', () => {
    it('should diplay step 2', () => {
      fireEvent.click(screen.queryAllByText('Next')[0]);
      fireEvent.click(screen.getAllByText('Proceed to Confirmation')[0]);
      expect(screen.getByText('2')).toBeVisible();
      expect(screen.getAllByText('Back')[0]).toBeVisible();
      expect(screen.getAllByText('Back').length).toEqual(2);
      expect(screen.getAllByText('Run Secret Santa')[0]).toBeVisible();
      expect(screen.getAllByText('Run Secret Santa').length).toEqual(2);
    });
  });

  describe('when click back button in step 1', () => {
    it('should diplay step 0', () => {
      fireEvent.click(screen.queryAllByText('Next')[0]);
      expect(screen.getByText('1')).toBeVisible();
      fireEvent.click(screen.getAllByText('Back')[0]);
      expect(screen.getByText('0')).toBeVisible();
      expect(screen.getAllByText('Next')[0]).toBeVisible();
      expect(screen.getAllByText('Next').length).toEqual(2);
    });
  });

  describe('when click back button in step 2', () => {
    it('should diplay step 1', () => {
      fireEvent.click(screen.queryAllByText('Next')[0]);
      fireEvent.click(screen.getAllByText('Proceed to Confirmation')[0]);
      expect(screen.getByText('2')).toBeVisible();
      fireEvent.click(screen.getAllByText('Back')[0]);
      expect(screen.getByText('1')).toBeVisible();
      expect(screen.getAllByText('Back')[0]).toBeVisible();
      expect(screen.getAllByText('Back').length).toEqual(2);
      expect(screen.getAllByText('Proceed to Confirmation')[0]).toBeVisible();
      expect(screen.getAllByText('Proceed to Confirmation').length).toEqual(2);
    });
  });
});
