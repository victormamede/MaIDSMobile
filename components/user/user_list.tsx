import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
} from 'react';
import { ImageProps, StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useUser } from '../../util/contexts/user_context';
import UserFetcher, { UserData } from '../../util/api/user/user';
import createSearchList, { SearchListRef } from '../util/search_list';
import { useLang } from '../../util/contexts/lang_context';

type Props = {
  onPress?: (userId: number) => void;
};
export type UserListRef = SearchListRef;

const UserListRender: ForwardRefRenderFunction<UserListRef, Props> = (
  { onPress },
  ref,
) => {
  const currentUser = useUser();
  const { getPhrase } = useLang();

  const getUsers = useCallback(
    async (keyword: string) => {
      const fetcher = new UserFetcher(currentUser.fetcher);
      const data = await fetcher.getList({ username: keyword });

      return data;
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
      ref={ref}
      style={styles.container}
      onClickItem={(item) => onPress && onPress(item.id)}
      label={getPhrase('Find user')}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Avatar = (props?: Partial<ImageProps>) => (
  <Icon name="person-outline" {...props} />
);

const UserList = forwardRef(UserListRender);
export default UserList;
