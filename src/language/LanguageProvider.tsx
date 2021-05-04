import React, { createContext, useContext } from "react";
import sv from "language/sv";

import languages from 'language';
import Storage from 'storage';

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
 * Function returning the current language dictionary.
 * 
 * Language is changed from the useSettings hook.
 * 
 * @example 
 * ```
 * const dict = useTranslation();
 * dict["valuesHeaderEvaluation"]; // "Värdering" if swedish is the current language.
 * ```
 * 
 * keyvalues can be found in the respective json, and new translations should
 * be added in every file (src/language/??.json).
 * 
 * @returns dictionary for the current language.
 */
export const useTranslation = () => {
  const dict = useContext<any>(LanguageContext);
  return dict;
};
