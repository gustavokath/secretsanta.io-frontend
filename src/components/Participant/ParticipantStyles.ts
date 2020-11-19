import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useParticipantStyles = makeStyles((theme: Theme) => createStyles({
  grid: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  card: {
    height: '100%',
  },
  cardToolbar: {
    display: 'flex',
    flexFlow: 'row-reverse',
  },
  root: {
    padding: theme.spacing(1),
    paddingBottom: 0,
  },
  '.MuiInputBase-input.Mui-disabled': {
    color: theme.palette.grey[300],
  },
}));

export default useParticipantStyles;
