import React, { useState } from 'react';
import { Menu, Button } from 'react-native-paper';
import Storage from 'storage';
import { useTranslation } from 'language/LanguageProvider';

interface Props {
  person: string;
  setPerson: (person: string) => void;
}

export const PersonButton = ({ person, setPerson }: Props) => {
  const lang = useTranslation();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [people, modifyPeople] = Storage.usePeople();

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button
          icon='plus'
          onPress={openMenu}
          mode='outlined'
          style={{ borderRadius: 30 }}
        >
          {lang.calendarRegistratorPersonLabel}
        </Button>
      }
    >
        {people.map((p, index) =>
          <Menu.Item
            onPress={() => { setPerson(p); closeMenu(); }}
            title={p}
            key={index}
          />
        )}
    </Menu>
  )
}
