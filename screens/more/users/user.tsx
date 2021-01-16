import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import UserScreen from '../../../components/user/user_screen';
import Layout from '../../../components/layout';
import { useLang } from '../../../util/contexts/lang_context';
import { UserStackParams } from './navigator';

export default function User({
  navigation,
  route,
}: StackScreenProps<UserStackParams, 'User'>) {
  const { id } = route.params;
  const { getPhrase } = useLang();

  return (
    <Layout title={getPhrase('User')} goBack={navigation.goBack}>
      <UserScreen id={id} onSuccess={navigation.pop} />
    </Layout>
  );
}
