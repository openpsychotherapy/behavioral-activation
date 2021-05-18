import en from 'language/en';
import sv from 'language/sv';
import ar from 'language/ar';

export type LanguageName = 'sv' | 'en'| 'ar';

export type Language = typeof en;

type Languages = {
    [index in LanguageName]: Language;
};

export const languages: Languages = {
    'en': en,
    'sv': sv,
    'ar': ar,
}

export default languages;
