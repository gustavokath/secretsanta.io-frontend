import '@testing-library/react';
import i18next from 'i18next';
import { FormFieldState } from 'form-field-state/dist/index';
import SecretSantaFieldValidator from '../SecretSantaFieldValidator';

const tSpy = jest.spyOn(i18next, 't');

describe('validateEmptyField', () => {
  test('when field value is undefined, hasErrors should be true', () => {
    const field = new FormFieldState<string>();
    const result = SecretSantaFieldValidator.validateEmptyField(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value is blank, hasErrors should be true', () => {
    const field = new FormFieldState<string>('');
    const result = SecretSantaFieldValidator.validateEmptyField(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value is blank, i18n should be called with field', () => {
    const field = new FormFieldState<string>('');
    SecretSantaFieldValidator.validateEmptyField(field);
    expect(tSpy).toBeCalledWith('secret_santa.validations.empty_field');
  });

  test('when field value is not blank, hasErrors should be false', () => {
    const field = new FormFieldState<string>('value');
    const result = SecretSantaFieldValidator.validateEmptyField(field);
    expect(result.hasErrors).toEqual(false);
  });

  test('when field value is not blank, errorMessage should be null', () => {
    const field = new FormFieldState<string>('value');
    const result = SecretSantaFieldValidator.validateEmptyField(field);
    expect(result.message).toBeNull();
  });
});

describe('validateEmail', () => {
  test('when field value is undefined, hasErrors should be true', () => {
    const field = new FormFieldState<string>();
    const result = SecretSantaFieldValidator.validateEmail(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value is blank, hasErrors should be true', () => {
    const field = new FormFieldState<string>('');
    const result = SecretSantaFieldValidator.validateEmail(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value is blank, i18n should be called with field', () => {
    const field = new FormFieldState<string>('');
    SecretSantaFieldValidator.validateEmail(field);
    expect(tSpy).toBeCalledWith('secret_santa.validations.invalid_email');
  });

  test('when field value is not an email, hasErrors should be true', () => {
    const field = new FormFieldState<string>('value');
    const result = SecretSantaFieldValidator.validateEmail(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value is not an email, i18n should be called with field', () => {
    const field = new FormFieldState<string>('value');
    SecretSantaFieldValidator.validateEmail(field);
    expect(tSpy).toBeCalledWith('secret_santa.validations.invalid_email');
  });

  test('when field value is an email, hasErrors should be false', () => {
    const field = new FormFieldState<string>('mail@email.com');
    const result = SecretSantaFieldValidator.validateEmail(field);
    expect(result.hasErrors).toEqual(false);
  });
});

describe('validatePhone', () => {
  test('when field value is undefined, hasErrors should be true', () => {
    const field = new FormFieldState<string>();
    const result = SecretSantaFieldValidator.validatePhone(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value is blank, hasErrors should be true', () => {
    const field = new FormFieldState<string>('');
    const result = SecretSantaFieldValidator.validatePhone(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value is blank, i18n should be called with field', () => {
    const field = new FormFieldState<string>('');
    SecretSantaFieldValidator.validatePhone(field);
    expect(tSpy).toBeCalledWith('secret_santa.validations.invalid_phone_country');
  });

  test('when field value is not a phone, hasErrors should be true', () => {
    const field = new FormFieldState<string>('value');
    const result = SecretSantaFieldValidator.validatePhone(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value is not a phone, i18n should be called invalid country code', () => {
    const field = new FormFieldState<string>('value');
    SecretSantaFieldValidator.validatePhone(field);
    expect(tSpy).toBeCalledWith('secret_santa.validations.invalid_phone_country');
  });

  test('when field value has not country code, hasErrors should be true', () => {
    const field = new FormFieldState<string>('1234567890');
    const result = SecretSantaFieldValidator.validatePhone(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value has not country code, i18n should be called invalid country code', () => {
    const field = new FormFieldState<string>('1234567890');
    SecretSantaFieldValidator.validatePhone(field);
    expect(tSpy).toBeCalledWith('secret_santa.validations.invalid_phone_country');
  });

  test('when field value has country code but invalid phone, hasErrors should be true', () => {
    const field = new FormFieldState<string>('+5551');
    const result = SecretSantaFieldValidator.validatePhone(field);
    expect(result.hasErrors).toEqual(true);
  });

  test('when field value  has country code but invalid phone, i18n should be called invalid phone', () => {
    const field = new FormFieldState<string>('+5551');
    SecretSantaFieldValidator.validatePhone(field);
    expect(tSpy).toBeCalledWith('secret_santa.validations.invalid_phone');
  });

  test('when field value is an email, hasErrors should be false', () => {
    const field = new FormFieldState<string>('+5551123456789');
    const result = SecretSantaFieldValidator.validatePhone(field);
    expect(result.hasErrors).toEqual(false);
  });
});
