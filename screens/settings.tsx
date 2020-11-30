import React from 'react';
import { StyleSheet } from 'react-native';
import SettingsScreen from '../components/settings/settings_screen';
import { NoUserStackParams } from './navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Layout from '../components/layout';
import { useLang } from '../util/contexts/lang_context';

type Props = {
  navigation: StackNavigationProp<NoUserStackParams, 'Login'>;
};

export default function Settings({ navigation }: Props) {
  const { getPhrase } = useLang();

  return (
    <Layout
      title={getPhrase('Settings')}
      goBack={navigation.goBack}
      style={styles.container}>
      <SettingsScreen onUpdate={() => navigation.goBack()} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
