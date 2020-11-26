import React from 'react';
import { WithUserStackParams } from './navigator';
import { Button, Layout, Text } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { useLang } from '../util/contexts/lang_context';

export default function ScanScreen({
  navigation,
}: StackScreenProps<WithUserStackParams, 'Scan'>) {
  const { getPhrase } = useLang();

  return (
    <Layout>
      <Text>Scan is supposed to go here</Text>
      <Button onPress={() => navigation.navigate('More')}>
        {getPhrase('More')}
      </Button>
    </Layout>
  );
}
