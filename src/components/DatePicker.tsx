import React from 'react';
import { View } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';


/**
 * A date picker component that is opened with a press of a button.
 *
 * @example
 * ```
 * const [date, setDate] = React.useState(new Date());
 * 
 * return (
 *   <DatePicker date={date} setDate={setDate} />
 * );
 * 
 * ```
 * 
 * @param date - End time value as a Date object (eg a hook)
 * @param setDate -End time set function (eg a hook)
 * 
 * @param style - Optional styling of the button
 * @param containerStyle - Optional styling of the view container
 * 
 * @returns The TimePicker component
 *
 */
export const DatePicker = (props: {date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>, style?: {}, containerStyle?: {}}) => {
  const lang = useTranslation();
  const [settings, modifySettings] = Storage.useSettings();
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      props.setDate(params.date);
    },
    [setOpen, props.setDate]
  );
  
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', ...props.containerStyle}}>
      <Button mode='outlined' style={{padding: 5, ...props.style}} onPress={() => setOpen(true)} >{Intl.DateTimeFormat(settings.language).format(props.date)}</Button>
      <List.Icon icon='calendar' />
      
      <DatePickerModal
        mode='single'
        visible={open}
        onDismiss={onDismissSingle}
        onConfirm={onConfirmSingle}
        date={props.date}
        label={lang.datePickerLabel}
        saveLabel={lang.datePickerSaveLabel}
        startLabel={lang.datePickerStartLabel}    // Unused
        endLabel={lang.datePickerEndLabel}        // Unused
        moreLabel={lang.datePickerMoreLabel}      // Unused
        emptyLabel={lang.datePickerEmptyLabel}    // Unused
        animationType='slide'
        locale={settings.language}
      />
    </View>
  );
};
