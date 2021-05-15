import { DefaultTheme, DarkTheme} from 'react-native-paper';

// Typescript custom theme declaration
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      cancel: string,
      confirm: string,
      primary: string,
      accent: string,
      surface: string,
    }
    interface Theme {
      iconSizes: {
        small: number,
        medium: number,
        large: number,
        avatar: number
      }
      title: {
        fontSize: number
      }
      text: {
        textsize: number
      }
      roundnessNumber: {
        roundnessSize: number       
      }
      calendar: {
        dateViewSize: number
        dateViewMargin: number
      }
      gradingColors: string[]
    }
  }
}

// Custom theme
export const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    cancel: '#FF0000',
    confirm: '#10BC00',
    primary: '#6753D3',
    accent: '#1DB6EC',
    surface: '#E1E8ED',
  },
  iconSizes: {
    // IconButton
    small: 30,
    medium: 40,
    large: 60,
    avatar: 70
  },
  title: {
    fontSize: 24
  },
  text:{
    textSize: 20
  },
  roundnessNumber:{
    roundnessSize: 30
  },
  calendar: {
    dateViewSize: 60,
    dateViewMargin: 10
  },
  gradingColors: [
    '#FF0000', // red
    '#FF3A00',
    '#FF7300',
    '#FFAC00',
    '#FFC900',
    '#FFE500', // yellow
    '#E2E000',
    '#C4DB00',
    '#88D100',
    '#4CC700',
    '#10BC00', // green
    'white' // Empty
  ],

};
