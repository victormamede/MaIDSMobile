import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useLang } from '../../util/contexts/lang_context';

export default function NotFoundScreen() {
  const { getPhrase } = useLang();

  return (
    <View style={styles.container}>
      <Text>{getPhrase('User not found')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
