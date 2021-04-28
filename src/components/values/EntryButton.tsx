import Storage from 'storage';
import React, { useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { DeletePortal } from './DeletePortal';

export const EntryButton = (props: any) => {
    const [values, modifyValues] = Storage.useValues();
    const [showPortal, setShowPortal] = useState(false);
  
    const deleteElement = () => {
      modifyValues.deleteEntry(props.category, props.topic, props.entry);
    }
  
    return (
      <Button
        theme={{ roundness: 30 }}
        style={{ marginBottom: 20 }}
        contentStyle={{ height: 50 }}
        compact={true}
        mode='outlined'
        onPress={() => {}}
        onLongPress={() => setShowPortal(true)}
        icon={props.icon}
      >
        <Text>{props.name}</Text>
        <DeletePortal deleteElement={deleteElement} showPortal={showPortal} setShowPortal={setShowPortal}/>
      </Button>
    )
  }