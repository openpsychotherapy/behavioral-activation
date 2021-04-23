import React from 'react';
import { Appbar } from 'react-native-paper';

export const CustomNavigationBar = ({ navigation, previous }: any) => {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="" subtitle="" />
      {!previous ? <Appbar.Action icon="cog" onPress={() => navigation.navigate("Settings")} />: null}
    </Appbar.Header>
  );
}
