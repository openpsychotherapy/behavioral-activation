import en from 'language/en.json';
import sv from 'language/sv.json';

interface Languages{
    [index: string]: any;
}

export const languages: Languages = {
    "en": en,
    "sv": sv,
}

export default languages;
