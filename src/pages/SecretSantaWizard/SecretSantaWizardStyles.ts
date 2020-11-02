import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useWizardStyles = makeStyles((theme: Theme) => createStyles({
  wizard: {
    marginTop: theme.spacing(1),
    margin: 'auto',
  },
  wizardContent: {
    maxWidth: '1280px',
    margin: 'auto',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  navigator: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default useWizardStyles;
