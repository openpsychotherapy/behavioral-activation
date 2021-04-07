import React, { createContext, useContext } from "react";
import sv from "../language/sv.json";

import languages from '../language/';

import Storage from '../Storage'

const LanguageContext = createContext(sv);

export const LanguageProvider: React.FC = ({children}) => {
  const [settings, modifySettings] = Storage.useSettings();
  const dict = languages[settings.language];

  return (
    <LanguageContext.Provider value={dict}>
      {children}
    </LanguageContext.Provider>
  );
};

//TODO: Replace any
export const getTranslation = (entry: string) => useContext<any>(LanguageContext)[entry];