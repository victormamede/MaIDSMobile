import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.spinnerContainer}>
      <Spinner size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
