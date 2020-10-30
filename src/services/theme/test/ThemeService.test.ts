import '@testing-library/react';
import Cookies from 'js-cookie';
import ThemeService from '../ThemeService';
import * as Themes from '../../../styles/themes';

jest.mock('js-cookie', () => jest.fn());

describe('currentUserTheme', () => {
  test('when theme cookie is dark mode, should return dark theme', () => {
    (Cookies.get as jest.Mock) = jest.fn(() => 'dark');
    expect(ThemeService.currentUserTheme()).toEqual(Themes.darkTheme);
  });

  test('when theme cookie is light mode, should return light theme', () => {
    (Cookies.get as jest.Mock) = jest.fn(() => 'light');
    expect(ThemeService.currentUserTheme()).toEqual(Themes.defaultTheme);
  });

  test('when theme no cookie, should return light theme', () => {
    Cookies.get = jest.fn(() => undefined);
    expect(ThemeService.currentUserTheme()).toEqual(Themes.defaultTheme);
  });
});
