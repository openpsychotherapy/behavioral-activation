import { DefaultTheme, DarkTheme } from 'react-native-paper';

// Typescript custom theme declaration
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {}
    interface Theme {
      iconSizes: {
        small: number
        medium: number
        large: number
      }
      title: {
        fontSize: number
      }
      calendar: {
        dateViewSize: number
        dateViewMargin: number
      }
    }
  }
}

// Custom theme
export const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
  iconSizes: {
    small: 30,
    medium: 40,
    large: 60,
  },
  title: {
    fontSize: 24,
  },
  calendar: {
    dateViewSize: 60,
    dateViewMargin: 10,
  },
};
