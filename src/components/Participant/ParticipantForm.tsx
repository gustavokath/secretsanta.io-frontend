import { FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormFieldState, useFormFieldState } from 'form-field-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import useParticipantStyles from './ParticipantStyles';
import ThemeService from '../../services/theme/ThemeService';
import Participant, { ContactType } from '../../entities/Participant';
import SecretSantaFieldValidator from '../../validators/SecretSantaFieldValidator';
import useFirstRender from '../../hooks/UseFirstRender';

interface ParticipantFormProps {
  participant: Participant;
  onDelete?: () => void;
  onUpdate?: (updateValues: Partial<Participant>) => void
  onEdit?: () => void
  viewMode?: boolean
}

const ParticipantForm = (props: ParticipantFormProps) => {
  const { participant, onDelete = () => {}, onUpdate = () => {}, viewMode = false, onEdit = () => {} } = props;
  const [t] = useTranslation();
  const firstRender = useFirstRender();
  const [nameField, setNameValue] = useFormFieldState(participant.name, SecretSantaFieldValidator.validateEmptyField);
  const [methodField, setContactMethod] = useFormFieldState(participant.contactMethod);
  const [emailField, setEmailValue] = useFormFieldState(participant.contactMethod === ContactType.EMAIL ? participant.contact : '',
    SecretSantaFieldValidator.validateEmail);
  const [phoneField, setPhoneValue] = useFormFieldState(participant.contactMethod === ContactType.SMS ? participant.contact : '',
    SecretSantaFieldValidator.validatePhone);
  const [languageField, setLanguageValue] = useFormFieldState(participant.language);
  const styles = useParticipantStyles(ThemeService.currentUserTheme());

  useEffect(() => {
    if (!firstRender && !viewMode) {
      setNameValue(participant.name);
      setContactMethod(participant.contactMethod);
      setLanguageValue(participant.language);
      if (participant.contactMethod === ContactType.SMS) {
        setPhoneValue(participant.contact);
      } else {
        setEmailValue(participant.contact);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participant, firstRender, viewMode]);

  const handleFieldChange = (field: FormFieldState<any>, updateValues: Partial<Participant>) => {
    if (!field.hasErrors) {
      onUpdate(updateValues);
    }
  };

  return (
    <Paper elevation={5} className={styles.card}>
      <div className={styles.cardToolbar}>
        { viewMode ? (
          <IconButton onClick={onEdit} className={styles.root} data-testid="edit-participant">
            <FontAwesomeIcon icon={faPencilAlt} size="xs" />
          </IconButton>
        ) : (
          <IconButton onClick={onDelete} className={styles.root} data-testid="delete-participant">
            <FontAwesomeIcon icon={faTimes} size="xs" />
          </IconButton>
        )}
      </div>
      <Grid container direction="column" className={styles.grid}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id={`participant-name-field-${participant.id}`}
            label={t('secret_santa.steps.participants.fields.participant_name')}
            defaultValue={nameField.value}
            onChange={(e) => { if (nameField.hasErrors) setNameValue(e.target.value); }}
            onBlur={(e) => {
              setNameValue(e.target.value);
              handleFieldChange(nameField, { name: e.target.value });
            }}
            error={nameField.hasErrors}
            helperText={nameField.errorMessage}
            disabled={viewMode}
            data-testid={`participant-name-field-${participant.id}`}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id={`contact-language-label-${participant.id}`}>{t('secret_santa.steps.participants.fields.language')}</InputLabel>
                <Select
                  labelId={`contact-language-label-${participant.id}`}
                  id={`contact-language-select-${participant.id}`}
                  value={languageField.value || ''}
                  onChange={(e) => {
                    setLanguageValue(e.target.value as string);
                    handleFieldChange(languageField, { language: e.target.value as string });
                  }}
                  disabled={viewMode}
                  data-testid={`contact-language-select-${participant.id}`}
                >
                  <MenuItem value="en">{t('secret_santa.langauges.en')}</MenuItem>
                  <MenuItem value="pt-BR">{t('secret_santa.langauges.pt-BR')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id={`contact-method-label-${participant.id}`}>{t('secret_santa.steps.participants.fields.contact_method')}</InputLabel>
                <Select
                  labelId={`contact-method-label-${participant.id}`}
                  id={`contact-method-select-${participant.id}`}
                  value={methodField.value || ''}
                  onChange={(e) => {
                    setContactMethod(e.target.value as ContactType);
                    handleFieldChange(methodField, { contactMethod: e.target.value as ContactType });
                  }}
                  disabled={viewMode}
                  data-testid={`contact-method-select-${participant.id}`}
                  inputProps={{ 'data-testid': `contact-method-input-${participant.id}` }}
                >
                  <MenuItem value={ContactType.SMS}>{t('secret_santa.steps.participants.fields.contact_sms')}</MenuItem>
                  <MenuItem value={ContactType.EMAIL}>{t('secret_santa.steps.participants.fields.contact_email')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {methodField.value === ContactType.EMAIL ? (
            <TextField
              fullWidth
              id={`contact-telefone-${participant.id}`}
              label={t('secret_santa.steps.participants.fields.contact_email')}
              defaultValue={emailField.value}
              onChange={(e) => { if (emailField.hasErrors) setEmailValue(e.target.value); }}
              onBlur={(e) => {
                setEmailValue(e.target.value);
                handleFieldChange(emailField, { contact: e.target.value });
              }}
              error={emailField.hasErrors}
              helperText={emailField.errorMessage}
              disabled={viewMode}
              data-testid={`contact-phone-${participant.id}`}
            />
          ) : (
            <TextField
              fullWidth
              id={`contact-email-${participant.id}`}
              label={t('secret_santa.steps.participants.fields.contact_phone')}
              defaultValue={phoneField.value}
              onChange={(e) => { if (phoneField.hasErrors) setPhoneValue(e.target.value); }}
              onBlur={(e) => {
                setPhoneValue(e.target.value);
                handleFieldChange(phoneField, { contact: e.target.value });
              }}
              error={phoneField.hasErrors}
              helperText={phoneField.errorMessage}
              placeholder={t('secret_santa.steps.participants.fields.contact_phone_placeholder')}
              disabled={viewMode}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ParticipantForm;
