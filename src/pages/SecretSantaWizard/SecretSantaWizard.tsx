import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeService from '../../services/theme/ThemeService';
import SecretSantaStepper from './SecretSantaStepper';
import useWizardStyles from './SecretSantaWizardStyles';

const SecretSantaWizard = () => {
  const [t] = useTranslation();
  const styles = useWizardStyles(ThemeService.currentUserTheme());
  const [currentStep, setCurrentStep] = useState(0);

  const StepsContent = (step: number) => {
    switch (step) {
      case 1: return (<div>1</div>);
      case 2: return (<div>2</div>);
      default: return (<div>0</div>);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const backStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const Navigator = () => (
    <div className={styles.navigator}>
      { currentStep === 0 ? (
        <div />
      ) : (
        <Button variant="outlined" onClick={backStep}>
          {t(`secret_santa.navigation.${currentStep}.back`)}
        </Button>
      )}

      { currentStep === 2 ? (
        <Button variant="contained" color="primary">
          {t('secret_santa.navigation.2.run')}
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={nextStep}>
          {t(`secret_santa.navigation.${currentStep}.next`)}
        </Button>
      )}
    </div>
  );

  return (
    <div id="wizard" className={styles.wizard}>
      <SecretSantaStepper currentStep={currentStep} />
      <div id="wizard-content" className={styles.wizardContent}>
        <Navigator />
        { StepsContent(currentStep) }
        <Navigator />
      </div>
    </div>
  );
};

export default SecretSantaWizard;
