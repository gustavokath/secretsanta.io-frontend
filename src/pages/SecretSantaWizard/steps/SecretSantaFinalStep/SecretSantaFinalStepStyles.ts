import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useFinalStepStyle = makeStyles((theme: Theme) => createStyles({
  title: {
    fontSize: '1.7rem',
    marginBottom: theme.spacing(2),
  },
  warn: {
    fontSize: '1.4rem',
    marginBottom: theme.spacing(2),
  },
  happy: {
    fontSize: '1.7rem',
    marginBottom: theme.spacing(2),
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

export default useFinalStepStyle;
