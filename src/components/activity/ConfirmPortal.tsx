import React from 'react';
import { useTranslation } from 'language/LanguageProvider';
import { Button, Portal, Dialog, Paragraph } from 'react-native-paper';

interface ConfrimPortalProps {
  showPortal: boolean;
  setShowPortal: (showPortal: boolean) => void;
  onConfirm: () => void;
  text: string;
  yes?: string;
}

export const ConfrimPortal = (props: ConfrimPortalProps) => {
  const [visible, setVisible] = [props.showPortal, props.setShowPortal];
  const lang = useTranslation();

  const onCancel = () => setVisible(false);

  const onConfirm = () => {
    props.onConfirm();
    setVisible(false);
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Content>
          <Paragraph>{props.text}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>
            {lang.valuesDialogNo}
          </Button>
          <Button onPress={onConfirm}>
            {props.yes ?? lang.valuesDialogYes}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
