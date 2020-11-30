import React from 'react';
import { NoUserStackParams } from './navigator';
import Layout from '../components/layout';
import NewPassword from '../components/login/new_password';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

export default function UpdatePassword({
  navigation,
  route,
}: StackScreenProps<NoUserStackParams, 'UpdatePassword'>) {
  const { token } = route.params;

  return (
    <Layout>
      <View style={styles.container}>
        <NewPassword
          token={token}
          onSuccess={() => navigation.navigate('Login')}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
