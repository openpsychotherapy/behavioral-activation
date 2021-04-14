import React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';

export const DatePicker = (props: {date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>}) => {


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
  
  // TODO: Remove fontSize styling
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Button style={{flex: 1, flexGrow: 1}} labelStyle={{fontSize: 20}} onPress={() => setOpen(true)} icon='calendar' >{Intl.DateTimeFormat(settings.language).format(props.date)}</Button>
      <DatePickerModal
        mode='single'
        visible={open}
        onDismiss={onDismissSingle}
        onConfirm={onConfirmSingle}
        date={props.date}
        label={lang.datePickerLabel}
        startLabel={lang.datePickerStartLabel}
        endLabel={lang.datePickerEndLabel}
        moreLabel={lang.datePickerMoreLabel}
        saveLabel={lang.datePickerSaveLabel}
        emptyLabel={lang.datePickerEmptyLabel}
        animationType='slide'
        locale={settings.language}
      />
    </View>
  );
};
