import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useAddParticipantStyles = makeStyles((theme: Theme) => createStyles({
  addCard: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'dashed',
    borderColor: 'rgb(233,64,87)',
    borderWidth: '2px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      minHeight: '192px',
    },
  },
  addCardIcon: {
    color: 'rgb(233,64,87)',
  },
  addCardText: {
    marginTop: theme.spacing(1),
    color: 'rgb(233,64,87)',
    fontSize: '1.2rem',
  },
  ripple: {
    color: 'rgb(233,64,87)',
  },
}));

export default useAddParticipantStyles;
