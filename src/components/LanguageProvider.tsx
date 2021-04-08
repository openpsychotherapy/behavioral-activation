import React, { createContext, useContext } from "react";
import sv from "../language/sv.json";

import languages from '../language/';

import Storage from '../Storage'

const LanguageContext = createContext(sv);

/**
 * Provides the current language dictionary to its children.
 */
export const LanguageProvider: React.FC = ({children}) => {
  const [settings, modifySettings] = Storage.useSettings();
  const dict = languages[settings.language];

  return (
    <LanguageContext.Provider value={dict}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Function returning the text from the correct language dictionary.
 * @param entry keyvalue for the entry in the current language json file
 * @returns translation/value for the current language
 * 
 * @example
 * Get the welcome message for the current language
 * getTranslation("valuesHeaderEvaluation");
 * returns "Värdering" if swedish is the current language
 * ```
 * keyvalues can be found in the respective json, and new translations should
 * be added in every file (src/language).
 * 
 * TODO: Fix types and replace any
 * ```
 */
export const getTranslation = (entry: string) => useContext<any>(LanguageContext)[entry];