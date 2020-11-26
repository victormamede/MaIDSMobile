import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserList from '../../components/user/user_list';
import { Button, Layout } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { MoreStackParams } from '../more';
import { useLang } from '../../util/contexts/lang_context';

export default function UsersScreen({
  navigation,
}: StackScreenProps<MoreStackParams, 'Users'>) {
  const { getPhrase } = useLang();

  return (
    <Layout style={styles.container}>
      <View style={styles.container}>
        <UserList onPress={(id) => navigation.push('User', { id })} />
      </View>
      <Button onPress={() => navigation.push('User', { id: 0 })}>
        {getPhrase('New')}
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
