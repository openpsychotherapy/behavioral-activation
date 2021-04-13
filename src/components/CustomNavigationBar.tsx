import React from 'react';
import { Appbar } from 'react-native-paper';

import Storage from 'storage';

export const CustomNavigationBar = ({ navigation, previous }: any) => {
  const [settings, modifySettings] = Storage.useSettings();

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={settings.language} subtitle="" />
      {!previous || true ? <Appbar.Action icon="cog" onPress={() => {modifySettings.setLanguage(settings.language == 'sv' ? 'en' : 'sv')}} />: null}
    </Appbar.Header>
  );
}