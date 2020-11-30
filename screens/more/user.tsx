import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MoreStackParams } from '../more';
import UserScreen from '../../components/user/user_screen';
import Layout from '../../components/layout';
import { useLang } from '../../util/contexts/lang_context';

export default function MoreUser({
  navigation,
  route,
}: StackScreenProps<MoreStackParams, 'User'>) {
  const { id, onChanged } = route.params;
  const { getPhrase } = useLang();

  return (
    <Layout title={getPhrase('User')} goBack={navigation.goBack}>
      <UserScreen
        id={id}
        onSuccess={() => {
          navigation.pop();
          onChanged && onChanged();
        }}
      />
    </Layout>
  );
}
