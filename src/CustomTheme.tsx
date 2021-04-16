import { DefaultTheme, DarkTheme } from 'react-native-paper';

// Typescript custom theme declaration
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      cancel: string,
      confirm: string
    }
    interface Theme {
      iconSizes: {
        small: number,
        medium: number,
        large: number,
        avatar: number
      }
    }
  }
}

// Custom theme
export const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    cancel: 'red',
    confirm: 'green'
  },
  iconSizes: {
    // IconButton
    small: 30,
    medium: 40,
    large: 60,
    
    avatar: 70
  }
};
