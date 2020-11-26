import React, { useEffect, useState } from 'react';
import { ImageProps, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Divider, Icon, List, ListItem } from '@ui-kitten/components';
import { useUser } from '../../util/contexts/user_context';
import UserFetcher, { UserData } from '../../util/api/user/user';
import LoadingScreen from '../util/loading_screen';

export type Props = {
  onPress?: (userId: number) => void;
};

export default function UserList({ onPress }: Props) {
  const [users, usersHandler] = useState<UserData[]>([]);
  const [loading, loadingHandler] = useState(true);
  const currentUser = useUser();

  const getUsers = React.useCallback(async () => {
    loadingHandler(true);

    const fetcher = new UserFetcher(currentUser.fetcher);
    const data = await fetcher.list();

    usersHandler(data);
    loadingHandler(false);
  }, [currentUser]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const renderItem = ({ item, index }: ListRenderItemInfo<UserData>) => {
    const Avatar = (props?: Partial<ImageProps>) => (
      <Icon name="person-outline" {...props} />
    );
    return (
      <ListItem
        accessoryLeft={Avatar}
        key={index}
        title={item.username}
        description={item.realName}
        onPress={() => onPress && onPress(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <List
        data={users}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={getUsers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
