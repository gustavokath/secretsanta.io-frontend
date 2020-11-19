import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useHeaderStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  logo: {
    height: '70px',
    marginRight: '1rem',
  },
}));

export default useHeaderStyles;
