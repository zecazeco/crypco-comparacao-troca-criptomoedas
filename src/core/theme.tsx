import { DarkTheme } from 'react-native-paper';

export const theme = {
  ...DarkTheme,
  dark: false,
  colors: {
    ...DarkTheme.colors,
    primary: '#fafafa',
    accent: '#bdbdbd',
  },
};