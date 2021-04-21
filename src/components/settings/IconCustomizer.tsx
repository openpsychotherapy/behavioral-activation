import React from 'react';
import Storage from 'storage';
import { Button } from 'react-native-paper';
import { IconList } from '../IconList';

import { useTranslation } from 'language/LanguageProvider';

export const IconCustomizer = () => {
  const dict = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState<number|null>(null);
  const [icons, modifyIcons] = Storage.useIcons();

  const callback = (index: number, icon: string) => {
    if (selected == null) {
      setSelected(index);
    } else {
      modifyIcons.swap(selected, index);
      setSelected(null);
    }
  }

  const setVisible2 = (v: boolean) => {
    if (!v) {
      setSelected(null);
    }
    setVisible(v);
  }

  return (
    <>
      <Button onPress={() => setVisible(true)}>
        {dict["settingsSurfaceIconCustomize"]}
      </Button>
      <IconList
        startIndex={0}
        selectedIndex={selected}
        dividerAfterRow={4}
        pressCallback={callback}
        setVisible={setVisible2}
        visible={visible}
      />
    </>
  );
}
