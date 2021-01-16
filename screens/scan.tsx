import React from 'react';
import { WithUserStackParams } from './navigator';
import { Button, Icon } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import Layout from '../components/layout';
import ScanScreen from '../components/scan/scan_screen';
import { ImageProps, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function Scan({
  navigation,
}: StackScreenProps<WithUserStackParams, 'Scan'>) {
  const focused = useIsFocused();

  return (
    <Layout>
      <ScanScreen
        cameraActive={focused}
        style={styles.scan}
        onEquipmentSelected={(id) => navigation.push('Equipment', { id })}
      />
      <Button
        style={styles.more}
        accessoryLeft={moreIcon}
        onPress={() => navigation.navigate('More')}
        appearance="ghost"
        status="basic"
        size="large"
      />
    </Layout>
  );
}

const moreIcon = (props?: Partial<ImageProps>) => (
  <Icon name="more-horizontal-outline" {...props} />
);

const styles = StyleSheet.create({
  scan: {
    flex: 1,
  },
  more: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
