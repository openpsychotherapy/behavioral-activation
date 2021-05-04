import React from 'react';
import { Switch } from 'react-native-paper';

import Storage from 'storage';

export const NotificationSwitch = () => {
  const [settings, modifySettings] = Storage.useSettings();
  return  (
    <Switch
        trackColor={{false: 'gray', true: 'teal'}}
        thumbColor='white'
        ios_backgroundColor='gray'
        onValueChange={(value) => modifySettings.setNotifications(value)}
        value={settings.notifications}
      />
  );
}
