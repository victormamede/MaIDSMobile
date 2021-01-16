import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import UserListComponent, {
  UserListRef,
} from '../../../components/user/user_list';
import { Button } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { useLang } from '../../../util/contexts/lang_context';
import Layout from '../../../components/layout';
import { UserStackParams } from './navigator';
import { useFocusEffect } from '@react-navigation/native';

export default function UserList({
  navigation,
}: StackScreenProps<UserStackParams, 'Users'>) {
  const { getPhrase } = useLang();
  const listRef = useRef<UserListRef>(null);

  useFocusEffect(() => {
    listRef.current?.refresh && listRef.current?.refresh();
  });

  return (
    <Layout title={getPhrase('User List')} goBack={navigation.goBack}>
      <View style={styles.container}>
        <UserListComponent
          ref={listRef}
          onPress={(id) => navigation.push('User', { id })}
        />
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
