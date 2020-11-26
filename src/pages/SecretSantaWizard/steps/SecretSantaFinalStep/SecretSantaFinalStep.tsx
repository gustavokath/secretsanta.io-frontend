import { faGifts } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ThemeService from '../../../../services/theme/ThemeService';
import useFinalStepStyle from './SecretSantaFinalStepStyles';

interface PropTypes {
  onRestart: () => void
}

const SecretSantaFinalStep = (props: PropTypes) => {
  const { onRestart } = props;
  const [t] = useTranslation();
  const styles = useFinalStepStyle(ThemeService.currentUserTheme());

  return (
    <>
      <div id="event-details">
        <Grid container direction="column" alignItems="center">
          <Typography
            className={styles.title}
          >
            {t('secret_santa.steps.final.title')}
          </Typography>

          <FontAwesomeIcon size="7x" icon={faGifts} className={styles.icon} />

          <Typography
            className={styles.warn}
          >
            {t('secret_santa.steps.final.warn-message')}
          </Typography>

          <Typography
            className={styles.happy}
          >
            {t('secret_santa.steps.final.happy-message')}
          </Typography>

          <Button variant="contained" color="primary" onClick={onRestart}>
            {t('secret_santa.steps.final.button')}
          </Button>
        </Grid>
      </div>
    </>
  );
};

export default SecretSantaFinalStep;
