import React, { Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import SecretSantaWizard from './pages/SecretSantaWizard';
import ThemeService from './services/theme/ThemeService';
import Header from './components/Header';
import './App.css';

const App = () => (
  <ThemeProvider theme={ThemeService.currentUserTheme()}>
    <Suspense fallback="loading">
      <Header />
      <SecretSantaWizard />
    </Suspense>
  </ThemeProvider>
);

export default App;
