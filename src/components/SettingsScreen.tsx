import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Button, Menu, Surface, Text } from 'react-native-paper';

import Storage from 'storage';
import { useTranslation } from 'language/LanguageProvider';

const NotificationSwitch = () => {
  const [settings, modifySettings] = Storage.useSettings();
  return  (
    <Switch
        trackColor={{false: 'gray', true: 'teal'}}
        thumbColor="white"
        ios_backgroundColor="gray"
        onValueChange={(value) => modifySettings.setNotifications(value)}
        value={settings.notifications}
      />
  );
}

const LanguagePicker = () => {
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
        anchor={<Button onPress={openMenu}>{dict.name}</Button>}>
        <Menu.Item onPress={() => {modifySettings.setLanguage("en"); closeMenu();}} title="English" />
        <Menu.Item onPress={() => {modifySettings.setLanguage("sv"); closeMenu();}} title="Svenska" />
      </Menu>
    </View>
  );
}

const LanguageScreen = () => {
  return (
    <View>
      <Surface style={styles.surface}>
        <Text>English</Text>
      </Surface>
      <Surface style={styles.surface}>
        <Text>Svenska</Text>
      </Surface>
    </View>
  );
}

export const SettingsScreen = () => {
  return (
    <View>
      <Surface style={styles.surface}>
        <Text>Language</Text>
        <LanguagePicker />
      </Surface>
      <Surface style={styles.surface}>
        <Text>Notifications</Text>
        <NotificationSwitch />
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
})
