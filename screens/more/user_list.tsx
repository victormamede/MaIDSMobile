import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import UserList, { UserListRefProps } from '../../components/user/user_list';
import { Button } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { MoreStackParams } from '../more';
import { useLang } from '../../util/contexts/lang_context';
import Layout from '../../components/layout';
import { useFocusEffect } from '@react-navigation/native';

export default function MoreUserList({
  navigation,
}: StackScreenProps<MoreStackParams, 'Users'>) {
  const { getPhrase } = useLang();
  const listRef = useRef<UserListRefProps>(null);

  useFocusEffect(
    useCallback(() => {
      listRef.current?.refresh();
    }, [listRef]),
  );

  return (
    <Layout title={getPhrase('User List')} goBack={navigation.goBack}>
      <View style={styles.container}>
        <UserList
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
