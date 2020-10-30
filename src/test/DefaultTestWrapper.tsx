/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import * as Themes from '../styles/themes';
import './i18n';

interface PropTypes {
  children: any
}

const DefaultTestWrapper: React.FunctionComponent<PropTypes> = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={Themes.defaultTheme}>
      <Suspense fallback="loading">
        <CssBaseline />
        {children}
      </Suspense>
    </ThemeProvider>
  );
};

export default DefaultTestWrapper;
