import React from 'react';
import { useTranslation } from 'language/LanguageProvider';
import { Button, Portal, Dialog, Paragraph } from 'react-native-paper';

interface DeletePortalProps {
  showPortal: boolean;
  setShowPortal: (showPortal: boolean) => void;
  deleteElement: () => void;
}

export const DeletePortal = (props: DeletePortalProps) => {
  const [visible, setVisible] = [props.showPortal, props.setShowPortal];
  const hideDialog = () => setVisible(false);
  const lang = useTranslation();
  const deleteElement = () => {
    props.deleteElement();
    hideDialog();
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>{lang.valuesDialogText}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>
            {lang.valuesDialogNo}
          </Button>
          <Button onPress={deleteElement}>{lang.valuesDialogYes}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
