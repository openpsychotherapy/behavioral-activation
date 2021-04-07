import en from './en.json';
import sv from './sv.json';

interface Languages{
    [index: string]: any;
}

const languages: Languages = {
    "sv" : sv,
    "en" : en,
}

export default languages;