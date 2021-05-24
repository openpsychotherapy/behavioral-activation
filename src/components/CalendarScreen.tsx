import React, { useEffect } from 'react';
import { View } from 'react-native';
import { FAB, Snackbar } from 'react-native-paper';
import { IconList } from './activity/IconList';

import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { CalendarList } from './calendar/CalendarList';

import Storage from 'storage';
import { SettingsScreen } from './SettingsScreen';
import { CalendarRegistrator } from './calendar/CalendarRegistrator';

import { useTranslation } from 'language/LanguageProvider';
import { RouteProp } from '@react-navigation/core';
import { CalendarEntry } from 'storage/types';

export type CalendarStackParamList = {
  Calendar: { activityRegistered: boolean };
  CalendarRegistration: { entry?: CalendarEntry, icon: string };
  Settings: {};
};

type ViewContentRouteProp = RouteProp<
  CalendarStackParamList,
  'Calendar'
>;
type ViewContentNavigationProp = StackNavigationProp<
  CalendarStackParamList,
  'Calendar'
>;

const CalendarStack = createStackNavigator<CalendarStackParamList>();

type Props = {
  route: ViewContentRouteProp;
  navigation: ViewContentNavigationProp;
};

const ViewContent = ({ route, navigation }: Props) => {
  const [calendar, modifyCalendar] = Storage.useCalendar();
  const [iconListVisible, setIconListVisible] = React.useState(false);
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const dict = useTranslation();

  const openIconMenu = () => setIconListVisible(true);

  useEffect(() => {
    if (route.params?.activityRegistered) {
      setSnackBarVisible(true);
      navigation.setParams({ activityRegistered: false });
    }
  }, [route.params]);

  const callback = (index: number, icon: string) => {
    setIconListVisible(false);
    navigation.navigate('CalendarRegistration', { icon: icon });
  }

  const onEntryClick = (entry: CalendarEntry) => {
    navigation.navigate('CalendarRegistration', { entry, icon: entry.icon });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CalendarList calendar={calendar} onEntryClick={onEntryClick} />

      <IconList
        startIndex={0}
        dividerAfterRow={4}
        pressCallback={callback}
        setVisible={setIconListVisible}
        visible={iconListVisible}
      />

      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon='plus'
        onPress={openIconMenu}
      />

      <Snackbar visible={snackBarVisible} onDismiss={()=>{setSnackBarVisible(false)}} duration={4000} >
        {dict.activiesSnackBarAdded}
      </Snackbar>
    </View>
  );
}

export const CalendarScreen = () => {
  return (
    <CalendarStack.Navigator initialRouteName='Calendar' headerMode='float'
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <CalendarStack.Screen name='Calendar' component={ViewContent} />
      <CalendarStack.Screen name='CalendarRegistration' component={CalendarRegistrator} />
      <CalendarStack.Screen name='Settings' component={SettingsScreen} />
    </CalendarStack.Navigator>
  );
}
