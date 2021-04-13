import React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';

export const DatePicker = (props: any) => {
  const lang = useTranslation();
  const [settings, modifySettings] = Storage.useSettings();

  const [date, setDate] = React.useState<Date>(new Date());
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <View>
      <Button onPress={() => setOpen(true)} mode='text' icon='calendar' >{Intl.DateTimeFormat(settings.language).format(date)}</Button>
      <DatePickerModal
        mode='single'
        visible={open}
        onDismiss={onDismissSingle}
        onConfirm={onConfirmSingle}
        date={date}
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
