import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ThemeService from '../../services/theme/ThemeService';
import useHeaderStyles from './HeaderStyles';

const Header = () => {
  const [t] = useTranslation();
  const styles = useHeaderStyles(ThemeService.currentUserTheme());

  return (
    <AppBar
      position="static"
    >
      <Toolbar className={styles.toolbar}>
        <IconButton
          edge="start"
          className={styles.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <FontAwesomeIcon icon="bars" />
        </IconButton>
        <Typography className={styles.title} variant="h5" noWrap>
          {t('app_title')}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
