import React from 'react';
import { View } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import Storage from 'storage';

import { useTranslation } from 'language/LanguageProvider';
import languages, { LanguageName } from 'language';

export const LanguageMenu = () => {
  const [settings, modifySettings] = Storage.useSettings()
  const dict = useTranslation();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{dict.languageName}</Button>}>
          {(Object.keys(languages) as LanguageName[]).map((language, index) => 
            <Menu.Item
              onPress={() => {
                modifySettings.setLanguage(language);
                closeMenu();
              }}
              title={languages[language].languageName}
              key={index}/>
          )}
      </Menu>
    </View>
  );
}
