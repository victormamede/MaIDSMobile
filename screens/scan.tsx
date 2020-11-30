import React from 'react';
import { WithUserStackParams } from './navigator';
import { Button, Text } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { useLang } from '../util/contexts/lang_context';
import Layout from '../components/layout';
import { StyleSheet, View } from 'react-native';

export default function Scan({
  navigation,
}: StackScreenProps<WithUserStackParams, 'Scan'>) {
  const { getPhrase } = useLang();

  return (
    <Layout>
      <View style={styles.contentContainer}>
        <Text>Scan is supposed to go here</Text>
      </View>
      <Button onPress={() => navigation.navigate('More')}>
        {getPhrase('More')}
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
