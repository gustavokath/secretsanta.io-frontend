import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ParticipantForm from '../../../../components/Participant/ParticipantForm';
import SecretSanta from '../../../../entities/SecretSanta';
import ThemeService from '../../../../services/theme/ThemeService';
import { StepAction } from '../../types/StepAction';
import { useStepsCommonStyle, useMuiInputBase } from '../SecretSantaStepsCommonStyles';

interface SecretSantaConfirmationStepProps {
  onSubmit: (event: SecretSanta) => void
  onStepChange: (updates: Partial<SecretSanta>, action: StepAction, error: boolean) => void
  event: SecretSanta
}

const SecretSantaConfirmationStep = (props: SecretSantaConfirmationStepProps) => {
  const { onSubmit, onStepChange, event } = props;
  const [t] = useTranslation();
  const stepsCommonStyles = useStepsCommonStyle(ThemeService.currentUserTheme());
  useMuiInputBase(ThemeService.currentUserTheme());

  const handleNext = () => {
    onSubmit(event);
  };

  const handleBack = () => {
    onStepChange({}, 'BACK', false);
  };

  return (
    <>
      <div id="event-details">
        <Typography
          className={stepsCommonStyles.title}
        >
          {t('secret_santa.steps.confirmation.title')}
        </Typography>
      </div>

      <div>
        <Typography
          className={stepsCommonStyles.subtitle}
        >
          {t('secret_santa.steps.confirmation.subsections.details')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="event-name"
              label={t('secret_santa.steps.event_details.fields.event_name.field')}
              value={event.name}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                fullWidth
                disabled
                id="event-date"
                format={t('secret_santa.steps.event_details.fields.event_date.format')}
                value={event.date}
                onChange={() => {}}
                label={t('secret_santa.steps.event_details.fields.event_date.field')}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </div>

      <Typography
        className={stepsCommonStyles.subtitle}
      >
        {t('secret_santa.steps.confirmation.subsections.participants')}
      </Typography>

      <Grid container spacing={3}>
        { event.participants.map((participant) => (
          <Grid item xs={12} sm={12} md={4} key={participant.id}>
            <ParticipantForm
              key={participant.id}
              participant={participant}
              viewMode
              onEdit={handleBack}
            />
          </Grid>
        ))}
      </Grid>

      <div className={stepsCommonStyles.navigator}>
        <Button variant="contained" color="primary" onClick={handleBack}>
          {t('secret_santa.steps.confirmation.navigation.back')}
        </Button>

        <Button variant="contained" color="primary" onClick={handleNext}>
          {t('secret_santa.steps.confirmation.navigation.next')}
        </Button>
      </div>
    </>
  );
};

export default SecretSantaConfirmationStep;
