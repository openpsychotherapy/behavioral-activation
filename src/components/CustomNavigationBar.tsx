import { useRoute } from '@react-navigation/core';
import { StackHeaderProps } from '@react-navigation/stack';
import { useTranslation } from 'language/LanguageProvider';
import React from 'react';
import { Appbar } from 'react-native-paper';

export const CustomNavigationBar = ({ navigation, previous }: StackHeaderProps) => {
  const route = useRoute();
  const lang = useTranslation();
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={lang.routeNames[route.name] ?? route.name} subtitle='' />
      {!previous ? <Appbar.Action icon='cog' onPress={() => navigation.navigate('Settings')} />: null}
    </Appbar.Header>
  );
}
