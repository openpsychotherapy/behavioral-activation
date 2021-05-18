import Storage from 'storage';
import React, { useState } from 'react';
import { ValuesTopic } from 'storage/types';
import { Button, Text, useTheme } from 'react-native-paper';
import { DeletePortal } from './DeletePortal';

interface CategoryButtonProps {
  categoryString: string;
  topic: ValuesTopic;
  onPress: () => void;
}

export const CategoryButton = (props: CategoryButtonProps) => {
  const [values, modifyValues] = Storage.useValues();
  const [people, modifyPeople] = Storage.usePeople();
  const [showPortal, setShowPortal] = useState(false);
  const { colors, roundedCorner } = useTheme();
  const deleteElement = () => {
    if (props.categoryString == 'people') {
      modifyPeople.deletePerson(props.topic.name);
    } else {
      modifyValues.deleteTopic(props.categoryString, props.topic.name);
    }
  }

  return (
    <Button
      theme={{ roundness: roundedCorner.roundness }}
      style={{ marginBottom: 20 }}
      contentStyle={{ height: 50 }}
      compact={true}
      mode='contained'
      onLongPress={() => setShowPortal(true)}
      onPress={props.onPress}
      color={colors.surface}
    >
      <Text>{props.topic.name}</Text>
      <DeletePortal deleteElement={deleteElement} showPortal={showPortal} setShowPortal={setShowPortal} />
    </Button>
  );
}
