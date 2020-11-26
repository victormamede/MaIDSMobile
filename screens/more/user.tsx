import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MoreStackParams } from '../more';
import { useUser } from '../../util/contexts/user_context';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import UserFetcher, { UserData } from '../../util/api/user/user';
import UserForm from '../../components/user/user_form';
import LoadingScreen from '../../components/util/loading_screen';

export default function UserScreen({
  navigation,
  route,
}: StackScreenProps<MoreStackParams, 'User'>) {
  const { id } = route.params;
  const [user, userHandler] = useState<UserData | null>(null);
  const [loading, loadingHandler] = useState(true);
  const currentUser = useUser();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const fetcher = new UserFetcher(currentUser.fetcher);
        const data = await fetcher.userData(id);

        userHandler(data);
      } catch (e) {
        userHandler(null);
      } finally {
        loadingHandler(false);
      }
    };

    loadingHandler(true);

    if (id > 0) {
      getUserData();
    } else {
      loadingHandler(false);
    }
  }, [currentUser.fetcher, id]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <UserForm data={user || undefined} />
    </Layout>
  );
}
