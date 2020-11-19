import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ThemeService from '../../services/theme/ThemeService';
import useHeaderStyles from './HeaderStyles';
import { ReactComponent as Logo } from '../../assets/hat_color.svg';

const Header = () => {
  const [t] = useTranslation();
  const styles = useHeaderStyles(ThemeService.currentUserTheme());

  return (
    <AppBar
      position="static"
    >
      <Toolbar className={styles.toolbar}>
        <Logo className={styles.logo} />
        <Typography className={styles.title} variant="h5" noWrap>
          {t('app_title')}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
