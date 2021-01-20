import React, { useCallback, useEffect } from 'react';
import { Card, Modal, Spinner, Text } from '@ui-kitten/components';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useLang } from '../util/contexts/lang_context';
import { useUser } from '../util/contexts/user_context';

type Props = {
  onConnectionReestablish?: () => void;
  cardStyle?: ViewStyle;
};

export default function ConnectionLoss({
  cardStyle,
  onConnectionReestablish,
}: Props) {
  const { getPhrase } = useLang();
  const user = useUser();

  const retry = useCallback(
    async (onFinish: () => void) => {
      const result = await user.fetcher.testConnection();

      if (result) {
        onConnectionReestablish && onConnectionReestablish();
      } else {
        onFinish();
      }
    },
    [onConnectionReestablish, user.fetcher],
  );

  useEffect(() => {
    const waitAndRetry = async () => {
      await waitFunc(5000);

      retry(waitAndRetry);
    };

    waitAndRetry();
  }, [retry]);

  return (
    <Modal visible={true} backdropStyle={styles.backdrop}>
      <Card style={cardStyle} disabled={true}>
        <Text>
          {getPhrase(
            'Connection lost! Please wait while we try to reestablish the connection',
          )}
        </Text>
        <View style={styles.spinner}>
          <Spinner size="giant" />
        </View>
        <Text>{getPhrase('Retrying...')}</Text>
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
});

const waitFunc = async (milliseconds: number) => {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
};
