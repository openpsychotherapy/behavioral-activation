import en from './en.json';
import sv from './sv.json';
//"valuesHeaderEvaluation"
//"activitiesButtonGradeDay"
//"activitiesSliderGradeDay"
//Format: "navigationbarTypeText"
//navigationbar: activities, values, calendar, info

//"january"
//"february"
//.
//.
//.
//"monday"
interface Languages{
    [index: string]: any;
}

const languages: Languages = {
    "sv" : sv,
    "en" : en,
}

export default languages;