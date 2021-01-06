import React, { useEffect, useMemo, useReducer, useState } from 'react';
import UserFetcher, { UserData } from '../../util/api/user/user';
import { useUser } from '../../util/contexts/user_context';
import UserForm from './user_form';
import { differentEntries } from '../../util/helper/objects';
import LoadingScreen from '../util/loading_screen';
import ConfirmationScreen from '../util/confirmation_screen';
import NotFoundScreen from '../util/not_found_screen';
import { StyleSheet } from 'react-native';

type Props = {
  id: number;
  onSuccess?: () => void;
};

type State = {
  user: UserData | null;
  userFound: boolean;
  started: boolean;
  loading: boolean;
  error?: string;
};

type Action =
  | {
      type: 'setLoading';
      value: boolean;
    }
  | {
      type: 'setUser';
      user: UserData | null;
    }
  | {
      type: '404';
    }
  | {
      type: 'error';
      message: string;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setLoading':
      return { ...state, loading: action.value };
    case 'setUser':
      return {
        ...state,
        user: action.user,
        userFound: true,
        started: true,
        loading: false,
      };
    case '404':
      return {
        ...state,
        user: null,
        userFound: false,
        started: true,
        loading: false,
      };
    case 'error':
      return { ...state, error: action.message };
  }
}
const defaultState: State = {
  user: null,
  userFound: false,
  started: false,
  loading: true,
};

export default function UserScreen({ id, onSuccess }: Props) {
  const [{ user, userFound, started, loading, error }, dispatch] = useReducer(
    reducer,
    defaultState,
  );
  const [confirmDelete, confirmDeleteHandler] = useState(false);
  const currentUser = useUser();

  const fetcher = useMemo(() => new UserFetcher(currentUser.fetcher), [
    currentUser.fetcher,
  ]);

  useEffect(() => {
    const getUserData = async () => {
      if (id === 0) {
        dispatch({ type: 'setUser', user: null });
        return;
      }

      try {
        const data = await fetcher.getUserData(id);

        dispatch({ type: 'setUser', user: data });
      } catch (e) {
        dispatch({ type: '404' });
      }
    };

    getUserData();
  }, [fetcher, id]);

  if (!started) {
    return <LoadingScreen />;
  }
  if (!userFound) {
    return <NotFoundScreen />;
  }

  async function tryAndExec<T>(func: () => T | Promise<T>) {
    dispatch({ type: 'setLoading', value: true });

    try {
      const value = await func();
      dispatch({ type: 'setLoading', value: false });
      onSuccess && onSuccess();
      return value;
    } catch (e) {
      dispatch({ type: 'error', message: e.message });
      dispatch({ type: 'setLoading', value: false });
    }
  }

  const updateUser = async (props: UserData) => {
    if (user == null) {
      return;
    }

    const changed = differentEntries(user, props);
    tryAndExec(async () => await fetcher.updateUser(user.id, changed));
  };

  const createUser = async (props: UserData) => {
    if (user != null) {
      return;
    }

    tryAndExec(async () => await fetcher.createUser(props));
  };

  const deleteUser = async () => {
    if (user == null) {
      return;
    }
    confirmDeleteHandler(false);
    tryAndExec(async () => await fetcher.deleteUser(user));
  };

  return (
    <>
      <ConfirmationScreen
        disabled={loading}
        visible={confirmDelete}
        onConfirm={deleteUser}
        onReject={() => confirmDeleteHandler(false)}
      />
      <UserForm
        style={styles.form}
        data={user || undefined}
        onSubmit={user == null ? createUser : updateUser}
        onDelete={user != null ? () => confirmDeleteHandler(true) : undefined}
        loading={loading}
        errorMessage={error || undefined}
      />
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
});
