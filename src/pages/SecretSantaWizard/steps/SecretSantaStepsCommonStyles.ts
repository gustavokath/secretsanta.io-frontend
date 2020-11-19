import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStepsCommonStyle = makeStyles((theme: Theme) => createStyles({
  title: {
    fontSize: '1.7rem',
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    fontSize: '1.4rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  navigator: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

const useMuiInputBase = makeStyles((theme: Theme) => createStyles({
  disabled: {
    color: theme.palette.grey[900],
  },
}), { name: 'MuiInputBase' });

export { useStepsCommonStyle, useMuiInputBase };
