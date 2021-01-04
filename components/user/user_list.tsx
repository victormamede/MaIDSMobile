import React, { useCallback } from 'react';
import { ImageProps, StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useUser } from '../../util/contexts/user_context';
import UserFetcher, { UserData } from '../../util/api/user/user';
import createSearchList from '../util/search_list';
import { useLang } from '../../util/contexts/lang_context';

type Props = {
  onPress?: (userId: number) => void;
};

export default function UserList({ onPress }: Props) {
  const currentUser = useUser();
  const { getPhrase } = useLang();

  const getUsers = useCallback(
    async (keyword: string) => {
      const fetcher = new UserFetcher(currentUser.fetcher);
      // TODO: filtering on the backend
      console.log('called');
      const data = await fetcher.getList();

      return data.filter((item) => item.username.includes(keyword));
    },
    [currentUser],
  );

  const SearchList = useCallback(
    createSearchList<UserData>(getUsers, (user) => ({
      title: user.username,
      description: user.realName,
      avatar: Avatar,
    })),
    [getUsers],
  );

  return (
    <SearchList
      style={styles.container}
      onClickItem={(item) => onPress && onPress(item.id)}
      label={getPhrase('Find user')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Avatar = (props?: Partial<ImageProps>) => (
  <Icon name="person-outline" {...props} />
);
