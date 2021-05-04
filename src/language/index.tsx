import en from 'language/en';
import sv from 'language/sv';

export type LanguageName = 'sv' | 'en';

type Language = typeof en;

type Languages = {
    [index in LanguageName]: Language;
};

export const languages: Languages = {
    'en': en,
    'sv': sv,
}

export default languages;
