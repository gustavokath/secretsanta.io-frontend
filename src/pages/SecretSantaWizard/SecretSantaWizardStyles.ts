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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

const useErrorNotificationStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
  },
  actionButton: {
    color: theme.palette.error.contrastText,
  },
}));

export { useWizardStyles, useErrorNotificationStyles };
