import React from 'react';
import { StyleSheet } from 'react-native';
import SettingsScreen from '../components/settings/settings_screen';
import { NoUserStackParams } from './navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';

type Props = {
  navigation: StackNavigationProp<NoUserStackParams, 'Login'>;
};

export default function Settings({ navigation }: Props) {
  return (
    <Layout style={styles.container}>
      <SettingsScreen onUpdate={() => navigation.goBack()} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
