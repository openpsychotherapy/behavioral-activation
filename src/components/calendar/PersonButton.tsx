import React, { useState } from 'react';
import { Menu, Button } from 'react-native-paper';
import Storage from 'storage';

interface Props {
  person: string;
  setPerson: (person: string) => void;
}

export const PersonButton = ({ person, setPerson }: Props) => {
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
          stödperson
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
