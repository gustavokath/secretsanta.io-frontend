import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import colors from '../../styles/colors';

const activeBackground = 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)';
const activeShadow = '0 4px 10px 0 rgba(0,0,0,.25)';

const useStepperStyles = makeStyles((theme: Theme) => createStyles({
  stepper: {
    backgroundColor: theme.palette.background.default,
  },
}));

const useStepperIconStyles = makeStyles(() => createStyles({
  root: {
    backgroundColor: colors.gray,
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: activeBackground,
    boxShadow: activeShadow,
  },
  completed: {
    backgroundImage: activeBackground,
  },
}));

const useStepperConnectionStyles = withStyles(() => createStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: activeBackground,
    },
  },
  completed: {
    '& $line': {
      backgroundImage: activeBackground,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: colors.gray,
    borderRadius: 1,
  },
}));

export { useStepperIconStyles, useStepperConnectionStyles, useStepperStyles };
