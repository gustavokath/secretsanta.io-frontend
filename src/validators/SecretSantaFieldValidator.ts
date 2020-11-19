import i18next from 'i18next';
import { FormFieldState, FormFieldError } from 'form-field-state';

const validateEmptyField = (field: FormFieldState<string>): FormFieldError => {
  let hasErrors = false;
  let message = null;

  if (!field.value || field.value === '') {
    hasErrors = true;
    message = i18next.t('secret_santa.validations.empty_field');
  }

  return {
    hasErrors,
    message,
  };
};

const validateEmail = (field: FormFieldState<string>) : FormFieldError => {
  let hasErrors = false;
  let message = null;
  const EMAIL_REGEX = /\S+@\S+\.\S+/;

  if (!field.value || !EMAIL_REGEX.test(field.value)) {
    hasErrors = true;
    message = i18next.t('secret_santa.validations.invalid_email');
  }

  return {
    hasErrors, message,
  };
};

const validatePhone = (field: FormFieldState<string>) : FormFieldError => {
  let hasErrors = false;
  let message = null;
  const PHONE_COUNTRY_REGEX = /^\+\d{1,2}/;
  const PHONE_REGEX = /^\+\d{11,20}\d+$/;

  if (!field.value || !PHONE_COUNTRY_REGEX.test(field.value)) {
    hasErrors = true;
    message = i18next.t('secret_santa.validations.invalid_phone_country');
  } else if (!PHONE_REGEX.test(field.value)) {
    hasErrors = true;
    message = i18next.t('secret_santa.validations.invalid_phone');
  }

  return {
    hasErrors, message,
  };
};

export default { validateEmptyField, validateEmail, validatePhone };
