import en from 'language/en.json';
import sv from 'language/sv.json';

interface Languages{
    [index: string]: any;
}

const languages: Languages = {
    "sv": sv,
    "en": en,
}

export default languages;
