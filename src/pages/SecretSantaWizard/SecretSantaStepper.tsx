import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserFriends, faEye, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Step, StepConnector, StepIconProps, StepLabel, Stepper } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useStepperConnectionStyles, useStepperIconStyles, useStepperStyles } from './SecretSantaStepperStyles';
import ThemeService from '../../services/theme/ThemeService';

interface SecretSantaStepperProps {
  currentStep: number
}

const SecretSantaStepper = (props: SecretSantaStepperProps) => {
  const { currentStep } = props;
  const [t] = useTranslation();
  const style = useStepperStyles(ThemeService.currentUserTheme);

  const StepperIcon = (iconProps: StepIconProps) => {
    const iconStyles = useStepperIconStyles();
    const { active, completed, icon } = iconProps;

    const icons = [faEdit, faUserFriends, faEye];

    return (
      <div
        className={clsx(iconStyles.root, {
          [iconStyles.active]: active,
          [iconStyles.completed]: completed,
        })}
      >
        { completed ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={icons[(icon as number) - 1]} />}

      </div>
    );
  };

  const StepperConnector = useStepperConnectionStyles(StepConnector);

  return (
    <Stepper className={style.stepper} alternativeLabel activeStep={currentStep} connector={<StepperConnector />}>
      <Step key="event_details">
        <StepLabel StepIconComponent={StepperIcon}>{t('secret_santa.steps.event_details.title')}</StepLabel>
      </Step>
      <Step key="participants">
        <StepLabel StepIconComponent={StepperIcon}>{t('secret_santa.steps.participants.title')}</StepLabel>
      </Step>
      <Step key="confirmation">
        <StepLabel StepIconComponent={StepperIcon}>{t('secret_santa.steps.confirmation.title')}</StepLabel>
      </Step>
    </Stepper>
  );
};

export default SecretSantaStepper;
