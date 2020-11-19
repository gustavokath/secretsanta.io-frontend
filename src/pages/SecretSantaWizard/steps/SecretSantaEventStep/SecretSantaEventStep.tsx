import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useFormFieldState } from 'form-field-state';
import ThemeService from '../../../../services/theme/ThemeService';
import { useStepsCommonStyle } from '../SecretSantaStepsCommonStyles';
import FieldValidator from '../../../../validators/SecretSantaFieldValidator';
import SecretSanta from '../../../../entities/SecretSanta';
import { StepAction } from '../../types/StepAction';

interface SecretSantaEventStepProps {
  eventName: string,
  eventDate: MaterialUiPickersDate,
  onStepChange: (updates: Partial<SecretSanta>, action: StepAction, error: boolean) => void
}

const SecretSantaEventStep = (props: SecretSantaEventStepProps) => {
  const { eventName, eventDate, onStepChange } = props;
  const [t] = useTranslation();
  const stepsCommonStyles = useStepsCommonStyle(ThemeService.currentUserTheme());
  const [eventField, setEventValue] = useFormFieldState(eventName, FieldValidator.validateEmptyField);
  const [selectedDate, setDateValue] = useState<MaterialUiPickersDate>(eventDate);

  const handleNext = () => {
    const { hasErrors } = eventField.validate();
    onStepChange({ name: eventField.value, date: selectedDate }, 'NEXT', hasErrors);
  };

  return (
    <>
      <div id="event-details">
        <Typography
          className={stepsCommonStyles.title}
        >
          {t('secret_santa.steps.event_details.title')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="event-name"
              label={t('secret_santa.steps.event_details.fields.event_name.field')}
              value={eventField.value}
              onChange={(e) => setEventValue(e.target.value)}
              error={eventField.hasErrors}
              helperText={eventField.errorMessage}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                fullWidth
                id="event-date"
                format={t('secret_santa.steps.event_details.fields.event_date.format')}
                value={selectedDate}
                onChange={(date: MaterialUiPickersDate) => setDateValue(date)}
                label={t('secret_santa.steps.event_details.fields.event_date.field')}
                invalidDateMessage={t('secret_santa.steps.event_details.fields.event_date.validations.invalid_date')}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </div>
      <div className={stepsCommonStyles.navigator}>
        <div />

        <Button variant="contained" color="primary" onClick={handleNext}>
          {t('secret_santa.steps.event_details.navigation.next')}
        </Button>
      </div>
    </>
  );
};

export default SecretSantaEventStep;
