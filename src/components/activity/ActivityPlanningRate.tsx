import React from 'react';
import { View } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';

import Slider from '@react-native-community/slider';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';
import { CalendarEntry, ActivitiesEntry } from 'storage/types';
import { ConfrimPortal } from './ConfirmPortal';

export const ActivityPlanningRate = ({ navigation, route }: any) => {

  const lang = useTranslation();
  const [importance, setImportance] = React.useState(5);
  const [enjoyment, setEnjoyment] = React.useState(5);
  const { iconSizes, colors } = useTheme();
  const [activities, modifyActivities] = Storage.useActivities();
  const [calendar, modifyCalendar] = Storage.useCalendar();
  const [portalState, setPortalState] = React.useState({ show: false, onConfirm: () => {} });

  const onConfirm = () => {
    //modify data
    const calendarEntry: CalendarEntry = route.params.entry;

    const entry: ActivitiesEntry = {
      text: calendarEntry.text,
      icon: calendarEntry.icon,
      person: calendarEntry.person,
      importance: importance,
      enjoyment: enjoyment,
    };

    const startHour = parseInt(calendarEntry.start.split(":")[0]);
    let [endHour, endMinute] = calendarEntry.end.split(":").map(n => parseInt(n));

    if (endMinute > 0) {
      endHour += 1;
    }
    if (endHour == 0) {
      endHour = 24;
    }

    const dayIndex = activities.findIndex(a => a.date == calendarEntry.date);
    const isAlreadyRegistered = dayIndex != 1 &&
      activities[dayIndex]
      .entries
      .slice(startHour, endHour)
      .some(entry => entry != null);

    const onCommit = () => {
      modifyActivities.addInterval(calendarEntry.date, startHour, endHour - 1, entry)
      modifyCalendar.replace(calendarEntry, { ...calendarEntry, isRegistered: true })
      navigation.navigate('RegisterPlanning');
    }

    if (isAlreadyRegistered) {
      setPortalState({ show: true, onConfirm: onCommit });
    } else {
      onCommit();
    }
  };

  const onCancel = () => navigation.navigate('RegisterPlanning');

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
        <View style={{ flexDirection: 'column', width: '80%' }}>

            {/*Importance slider */}
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 40}}>
              <View style={{flexDirection: 'column', width: '80%'}}>
                <View style={{ flexDirection: 'row' }}>
                  <Text>{lang.activityRegistratorImporanceLabel + ': '}</Text>
                  <Text>{importance}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text>0</Text>
                  <Slider
                    style={{flex: 1}} value={5} step={1}
                    minimumValue={0} maximumValue={10}
                    onValueChange={(value: number) => {setImportance(value)}}
                    minimumTrackTintColor={colors.accent} maximumTrackTintColor='#000000'
                  />
                  <Text>10</Text>
                </View>
              </View>
            </View>

            {/* Enjoyment slider */}
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 40}}>
              <View style={{flexDirection: 'column', width: '80%'}}>
                <View style={{ flexDirection: 'row' }}>
                  <Text>{lang.activityRegistratorEnjoymentLabel + ': '}</Text>
                  <Text>{enjoyment}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text>0</Text>
                  <Slider
                    style={{flex: 1}} value={5} step={1}
                    minimumValue={0} maximumValue={10}
                    onValueChange={(value: number) => {setEnjoyment(value)}}
                    minimumTrackTintColor={colors.accent} maximumTrackTintColor='#000000'
                  />
                <Text>10</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <IconButton icon='close' size={iconSizes.large} onPress={() => onCancel()} color={colors.cancel} />
        <IconButton icon='check' size={iconSizes.large} onPress={() => onConfirm()} color={colors.confirm} />
        <ConfrimPortal 
          onConfirm={portalState.onConfirm}
          showPortal={portalState.show}
          setShowPortal={b => setPortalState({ ...portalState, show: b })}
          text={lang.activitiesDialogConflict}
          yes={lang.activitiesDialogYes}
        />
      </View>
    </View>
  );
}
