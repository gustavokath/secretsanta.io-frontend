import Cookies from 'js-cookie';
import ThemeCookie, { ThemeCookieTypes } from '../../data/cookies/ThemeCookie';
import * as Themes from '../../styles/themes';

const currentUserTheme = () => {
  const themeCookie = Cookies.get(ThemeCookie.name) as ThemeCookieTypes;
  if (themeCookie === 'dark') {
    return Themes.darkTheme;
  }
  return Themes.defaultTheme;
};

export default { currentUserTheme };
