import React, { useMemo } from 'react';
import { View } from 'react-native';

import { CalendarEntry } from 'storage/types';
import Storage from 'storage';
import { CalendarList } from '../calendar/CalendarList';
import { ISODate, ISOTime } from 'utils';
import { ConfrimPortal } from './ConfirmPortal';
import { useTranslation } from 'language/LanguageProvider';

export const ActivityPlanning = ({ navigation }: any) => {

  const [calendar, modifyCalendar] = Storage.useCalendar();
  const [portalState, setPortalState] = React.useState({ show: false, onConfirm: () => {} });
  const lang = useTranslation();

  const onEntryClick = (entry: CalendarEntry) => {
    navigation.navigate("RegisterPlanningRate", { entry })
  }

  const today = ISODate(new Date());
  const time = ISOTime(new Date());

  const calendarFilter = (e: CalendarEntry): boolean => {
    return !e.isRegistered && (e.date < today || (e.date == today && e.start <= time))
  }

  return (
    <>
      <CalendarList
        calendar={useMemo(() => calendar.filter(calendarFilter), [calendar])}
        onEntryClick={onEntryClick}
        onLongPress={entry => setPortalState({
          show: true,
          onConfirm: () => modifyCalendar.replace(entry, { ...entry, isRegistered: true })
        })}
      />
      <ConfrimPortal
        showPortal={portalState.show}
        setShowPortal={b => setPortalState({ ...portalState, show: b })}
        onConfirm={portalState.onConfirm}
        text={lang.valuesDialogText}
      />
    </>
  );
}
