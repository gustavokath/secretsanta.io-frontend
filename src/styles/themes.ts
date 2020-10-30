import { createMuiTheme } from '@material-ui/core';
import colors from './colors';

const defaultTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: '#303F9F',
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

export { defaultTheme, darkTheme };
