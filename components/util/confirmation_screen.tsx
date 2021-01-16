import React from 'react';
import { Button, Modal, Card, Text } from '@ui-kitten/components';
import { useLang } from '../../util/contexts/lang_context';
import { StyleSheet, ViewProps } from 'react-native';
import { RenderProp } from '@ui-kitten/components/devsupport';

type Props = {
  onConfirm: () => void;
  onReject: () => void;
  visible?: boolean;
  disabled?: boolean;
};

export default function ConfirmationScreen({
  onConfirm,
  onReject,
  visible,
  disabled,
}: Props) {
  const { getPhrase } = useLang();

  const Header: RenderProp<ViewProps> = (props) => (
    <Text {...props} category="h2">
      {getPhrase('Are you sure?')}
    </Text>
  );

  return (
    <Modal
      style={styles.modal}
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onReject}>
      <Card disabled={true} header={Header} status="danger">
        <Text style={styles.text}>
          {getPhrase(
            'This action cannot be undone, are you sure you want to do this?',
          )}
        </Text>

        <Button disabled={disabled} status="danger" onPress={onConfirm}>
          {getPhrase('Confirm')}
        </Button>
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    marginBottom: 20,
  },
  modal: {
    padding: 10,
  },
});
