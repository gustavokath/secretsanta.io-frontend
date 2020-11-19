import { Button, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ParticipantForm from '../../../../components/Participant';
import AddParticipant from '../../../../components/AddParticipant';
import SecretSanta from '../../../../entities/SecretSanta';
import ThemeService from '../../../../services/theme/ThemeService';
import { StepAction } from '../../types/StepAction';
import { useStepsCommonStyle } from '../SecretSantaStepsCommonStyles';
import Participant from '../../../../entities/Participant';

interface SecretSantaParticipantsStepProps {
  participants?: Participant[]
  onStepChange: (updates: Partial<SecretSanta>, action: StepAction, error: boolean) => void
}

const SecretSantaParticipantsStep = (props: SecretSantaParticipantsStepProps) => {
  const { onStepChange, participants = [] } = props;
  const [t] = useTranslation();
  const stepsCommonStyles = useStepsCommonStyle(ThemeService.currentUserTheme());
  const [participantsState, setParticipants] = useState<Participant[]>(participants);

  const handleStepChange = (action: StepAction) => {
    onStepChange({ participants: participantsState }, action, false);
  };

  const handleNewParticipant = () => {
    setParticipants(participantsState.concat(new Participant()));
  };

  const handleDeleteParticipant = (deleteIndex: number) => {
    setParticipants(participantsState.filter((_, index) => index !== deleteIndex));
  };

  const handleParticipantUpdate = (updateIndex: number, updatedData: Partial<Participant>) => {
    const updateParticipants = participantsState.map((current, index) => {
      if (index === updateIndex) {
        return { ...current, ...updatedData };
      }
      return current;
    });

    setParticipants(updateParticipants);
  };

  return (
    <>
      <div id="event-details">
        <Typography
          className={stepsCommonStyles.title}
        >
          {t('secret_santa.steps.participants.title')}
        </Typography>

        <Grid container spacing={3}>
          { participantsState.map((participant, index) => (
            <Grid item xs={12} sm={12} md={4} key={participant.id}>
              <ParticipantForm
                key={participant.id}
                participant={participant}
                onDelete={() => handleDeleteParticipant(index)}
                onUpdate={(data: Partial<Participant>) => handleParticipantUpdate(index, data)}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={12} md={4}>
            <AddParticipant
              onClick={handleNewParticipant}
            />
          </Grid>
        </Grid>
      </div>
      <div className={stepsCommonStyles.navigator}>
        <Button variant="contained" color="primary" onClick={() => handleStepChange('BACK')}>
          {t('secret_santa.steps.participants.navigation.back')}
        </Button>

        <Button variant="contained" color="primary" onClick={() => handleStepChange('NEXT')}>
          {t('secret_santa.steps.participants.navigation.next')}
        </Button>
      </div>
    </>
  );
};

export default SecretSantaParticipantsStep;
