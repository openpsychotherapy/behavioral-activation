import { Platform } from 'react-native'
const isAndroid = Platform.OS === 'android';

// This is required because of the component from: https://github.com/web-ridge/react-native-paper-dates
// This also adds the following dependencies:
// * react-native-localize
// * @formatjs/intl-pluralrules
// * @formatjs/intl-getcanonicallocales
// * @formatjs/intl-listformat
// * @formatjs/intl-displaynames
// * @formatjs/intl-locale
// * @formatjs/intl-datetimeformat
// * @formatjs/intl-numberformat
// * @formatjs/intl-relativetimeformat

// This could possible be change to be using ES6 synatax but then the
//  conditional android check won't function.

// One of these libraries also started to point out and exising possible issue
//  regarding several require cycles, one being: 
//  src\storage\context.tsx -> src\storage\calendar.tsx -> src\storage\context.tsx

if(isAndroid) {

  require('@formatjs/intl-getcanonicallocales/polyfill');
  require('@formatjs/intl-locale/polyfill');

  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-listformat/polyfill');
  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/add-golden-tz.js');
  
  // SV
  require('@formatjs/intl-pluralrules/locale-data/sv.js');
  require('@formatjs/intl-displaynames/locale-data/sv.js');
  require('@formatjs/intl-listformat/locale-data/sv.js');
  require('@formatjs/intl-numberformat/locale-data/sv.js');
  require('@formatjs/intl-relativetimeformat/locale-data/sv.js');
  require('@formatjs/intl-datetimeformat/locale-data/sv.js');

  // EN
  require('@formatjs/intl-pluralrules/locale-data/en.js');
  require('@formatjs/intl-displaynames/locale-data/en.js');
  require('@formatjs/intl-listformat/locale-data/en.js');
  require('@formatjs/intl-numberformat/locale-data/en.js');
  require('@formatjs/intl-relativetimeformat/locale-data/en.js');
  require('@formatjs/intl-datetimeformat/locale-data/en.js');

  // TODO: Figure out why TS is mad
  // if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
  //   Intl.DateTimeFormat.__setDefaultTimeZone( // <-- "Never" type causes problems
  require("expo-localization").timezone // <-- Is required on Android
  //   );
  // }
}