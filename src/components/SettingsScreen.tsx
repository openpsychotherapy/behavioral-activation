import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

import { useTranslation } from 'language/LanguageProvider';
import { IconWithText } from 'settings/IconWithText';
import { LanguageMenu } from 'settings/LanguageMenu';
import { NotificationSwitch } from 'settings/NotificationSwitch';
import { IconCustomizer } from 'settings/IconCustomizer';

export const SettingsScreen = () => {
  const dict = useTranslation();
  return (
    <View>
      <Surface style={styles.surface}>
        <IconWithText icon='translate' text={dict['settingsSurfaceLanguage']} />
        <LanguageMenu />
      </Surface>
      {
      /**
       * Comment out when implemented
       * <Surface style={styles.surface}>
       *   <IconWithText icon='bell' text={dict['settingsSurfaceNotifications']} />
       *   <NotificationSwitch />
       * </Surface>
       */
      }
      <Surface style={styles.surface}>
        <IconWithText icon='apps' text={dict['settingsSurfaceIcons']} />
        <IconCustomizer />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    marginBottom: 0,
  }
});
