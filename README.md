# Behaviour Activation

## Code style

These are only guidelines, and may be ignored if appropriate.

* Use 2 spaces for indentation.
* Use UNIX line endings ([vscode](https://stackoverflow.com/a/48694365),
  [atom](https://stackoverflow.com/a/48686409)).
* Use `const` for constants and `let` for variables. Never use `var`.
* Use Hooks instead of classes.
* Avoid the `any` type whenever possible.
* Write documentation using [TSDoc](https://tsdoc.org/).
* Exported functions must have typing and documentation.

Defining functions

```TypeScript
// preferred
const f = (a: number, b: number): number => {
    return a + b;
}

// avoid
function f(a: number, b: number): number {
    return a + b;
}
```

## Language implementation
Format for keys:"navigationbarTypeText"

navigationbar: activities, values, calendar or info depending on location in the navigationbar.

Type: Header, Button, Slider, and other components.

Text: Short description of the text preferably one word.

Some examples:
```Typescript
"valuesHeaderEvaluation"
"activitiesButtonGradeDay"
"activitiesSliderGradeDay"
```
Keys related to time follows different format.

To get the translation for a weekday, you use the key weekdays and index the day you're looking for (0 is sunday, 6 is saturday).

To get the translation for a month, you use the key months and index the month you're looking for (0 is January, 11 is December).

Some examples:
```Typescript
dict.weekdays[0] // sunday
dict.weekdays[1] // monday
dict.months[0]   // january
dict.months[11]  // december
```
Get the word with the key "keyword" in the correct language using :
```Typescript
import { useTranslation } from 'language/LanguageProvider';

const dict = useTranslation();
dict.keyword; // or dict["keyword"]
```

## Building

### Preparation
Building the application requires you to have [Node](https://nodejs.org/en/) and [Expo CLI](https://expo.io/tools#cli) installed.
To get started simply clone the repo, open a terminal at project root and run `npm ci` to install all dependencies.
You can now choose to build either a development build or an archive.


### Development

To build an interactive development version of the application run `npm start` in the project root.
This will build and launch an interactive version of the application that is accessible as either
a website or an Android/iOS app through [Expo Go](https://expo.io/tools#client).

### Building archive

To build an Android package or iOS archive run either `expo build:android` or `expo build:ios` in the project root.
This will open a prompt where you will be required to login to an expo account that will be responsible for the build.

**Note:** If you're the publisher of the application remember that `expo build` will run `expo publish` automatically if the build succeeds.

When the build is done the package or archive will be available on your Expo account through the link given by Expo CLI.
For more build options please check out the Expo [documentation](https://docs.expo.io/distribution/building-standalone-apps/#3-start-the-build).


## Translation

Behaviour activation supports multiple languages and its easy to add additional languages.
Adding a new language consists of two steps:
1. Translations the actual app.
2. Tell the application that the language exists.

### Translating the application
The first step in order to translate the application is to make a **copy** of the English translation located at `src/language/en.tsx` and
name it in accordance to the ISO 639-1 standard (if you're unsure what language code to use you can find a list of them all over
[here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)). You can now open the file and change the occurrences of `en` at the start and end of the file to your
language code. You're now ready to start translating!

Each line contains a so called key-value pair. The "key" (left) represent where in the application the text is located and the "value" (right)
represents the text that is displayed. **Note:** The "keys" should always be the same and should not be changed.
To translate the application simply change the "value" within the two " (quotation marks) to the translated word/sentence. If you're unsure how
to translate a specific sentence check out the "key" for a clue of the context. It's also recommended to use the application itself to see where
values are located.

### Adding a new language to the application
To add a new language to the application we have to modify some of the code located in the `src/language/index.tsx`. If you're not a coder don't
be alarmed! We will go through everything you need change step by step.

1. Open the index file located at `src/language/index.tsx`.
2. Copy the the following line `import en from 'language/en';` and replace `en` with your language code and place it below the other `import` lines.
3. Add your language code to the line starting with `export type LanguageName = 'sv' ` by adding `| 'en'` replaced with your language code at the end of the line just before the `;` character. Example: `export type LanguageName = 'sv';` becomes `export type LanguageName = 'sv' | 'en;'`.
4. At last add `'en': en,` replaced with your language code just below the line `export const languages: Languages = {`.
5. You're done!

The language should now be available to the application. If you want to try it out yourself check out the Building section above on how to build a Development build.

To include the translation with the published version of the application push your changes to its own branch and create a pull request for others to review.
When the pull request has been approve a developer will merge your changes into the main branch and will be included with the next publishing build of the application.

Thank you for your contribution!
