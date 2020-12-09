import React from 'react';
import { WithUserStackParams } from './navigator';
import { Button } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { useLang } from '../util/contexts/lang_context';
import Layout from '../components/layout';
import ScanScreen from '../components/scan/scan_screen';
import { StyleSheet } from 'react-native';

export default function Scan({
  navigation,
}: StackScreenProps<WithUserStackParams, 'Scan'>) {
  const { getPhrase } = useLang();

  return (
    <Layout>
      <ScanScreen
        style={styles.scan}
        onEquipmentSelected={(eq) =>
          navigation.navigate('Equipment', { id: eq.id })
        }
      />
      <Button
        onPress={() => navigation.navigate('More')}
        size="large"
        appearance="ghost">
        {getPhrase('More')}
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scan: {
    flex: 1,
  },
});
