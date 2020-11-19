import { ButtonBase } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import useAddParticipantStyles from './AddParticipantStyles';
import ThemeService from '../../services/theme/ThemeService';

interface AddParticipantProps {
  onClick: () => void
}

const AddParticipant = (props: AddParticipantProps) => {
  const { onClick } = props;
  const [t] = useTranslation();
  const styles = useAddParticipantStyles(ThemeService.currentUserTheme());

  return (
    <ButtonBase
      className={styles.addCard}
      TouchRippleProps={{ className: styles.ripple }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faPlusCircle} size="3x" className={styles.addCardIcon} />
      <span className={styles.addCardText}>
        {t('secret_santa.steps.participants.add_participant')}
      </span>
    </ButtonBase>
  );
};

export default AddParticipant;
