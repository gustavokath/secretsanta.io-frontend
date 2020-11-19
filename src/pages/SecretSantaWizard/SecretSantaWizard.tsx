import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ThemeService from '../../services/theme/ThemeService';
import SecretSantaStepper from './SecretSantaStepper';
import SecretSantaEventStep from './steps/SecretSantaEventStep';
import SecretSantaParticipantsStep from './steps/SecretSantaParticipantsStep';
import SecretSantaConfirmationStep from './steps/SecretSantaConfirmationStep';
import { StepAction } from './types/StepAction';
import { useWizardStyles, useErrorNotificationStyles } from './SecretSantaWizardStyles';
import SecretSanta from '../../entities/SecretSanta';

interface ErrorComponentState {
  hasErrors: boolean,
  message: string | undefined
}

const SecretSantaWizard = () => {
  const [t] = useTranslation();
  const styles = useWizardStyles(ThemeService.currentUserTheme());
  const notificationStyles = useErrorNotificationStyles(ThemeService.currentUserTheme());
  const [currentStep, setCurrentStep] = useState(0);
  const [event, setEventData] = useState(new SecretSanta(
    t('secret_santa.steps.event_details.fields.event_name.default_value', {
      year: new Date().getFullYear(),
    }),
  ));
  const [errorSnackbar, setErrorStates] = useState<ErrorComponentState>({ hasErrors: false, message: undefined });

  const updateEvent = (eventUpdates: Partial<SecretSanta>) => {
    setEventData({ ...event, ...eventUpdates });
  };

  const nextStep = () => {
    const MAX_STEP = 2;
    if (currentStep < MAX_STEP) {
      setCurrentStep(currentStep + 1);
    }
  };

  const backStep = () => {
    const MIN_STEP = 0;
    if (currentStep > MIN_STEP) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (updates: Partial<SecretSanta>, action: StepAction, error = false) => {
    const errorState = {
      hasErrors: error,
      message: t('secret_santa.error_messages.generic'),
    };

    updateEvent(updates);
    setErrorStates(errorState);

    if (!error) {
      if (action === 'NEXT') {
        nextStep();
      } else {
        backStep();
      }
    }
  };

  const StepsContent = (step: number) => {
    switch (step) {
      case 2: return (
        <SecretSantaConfirmationStep
          onSubmit={handleStepChange}
          onStepChange={handleStepChange}
          event={event}
        />
      );
      case 1: return (
        <SecretSantaParticipantsStep
          participants={event.participants}
          onStepChange={handleStepChange}
        />
      );
      default: return (
        <SecretSantaEventStep
          eventDate={event.date}
          eventName={event.name}
          onStepChange={handleStepChange}
        />
      );
    }
  };

  return (
    <div id="wizard" className={styles.wizard}>
      <SecretSantaStepper currentStep={currentStep} />
      <div id="wizard-content" className={styles.wizardContent}>
        { StepsContent(currentStep) }
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={errorSnackbar.hasErrors}
      >
        <SnackbarContent
          className={notificationStyles.root}
          message={errorSnackbar.message}
          action={(
            <IconButton name="close-error-button" onClick={() => setErrorStates({ ...errorSnackbar, hasErrors: false })}>
              <FontAwesomeIcon icon={faTimes} className={notificationStyles.actionButton} />
            </IconButton>
          )}
        />
      </Snackbar>
    </div>
  );
};

export default SecretSantaWizard;
