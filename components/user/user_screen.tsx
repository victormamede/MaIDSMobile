import React, { useEffect, useState } from 'react';
import UserFetcher, { UserData } from '../../util/api/user/user';
import { useUser } from '../../util/contexts/user_context';
import UserForm from './user_form';
import { differentEntries } from '../../util/helper/objects';
import LoadingScreen from '../util/loading_screen';
import ConfirmationScreen from './util/confirmation_screen';

type Props = {
  id: number;
  onSuccess?: () => void;
};

export default function UserScreen({ id, onSuccess }: Props) {
  const [user, userHandler] = useState<UserData | null>(null);
  const [confirmDelete, confirmDeleteHandler] = useState(false);
  const [starting, startHandler] = useState(true);
  const [loading, loadingHandler] = useState(false);
  const [error, errorHandler] = useState(null);
  const currentUser = useUser();

  useEffect(() => {
    const getUserData = async () => {
      if (!(id > 0)) {
        userHandler(null);
        startHandler(false);
        return;
      }

      try {
        const fetcher = new UserFetcher(currentUser.fetcher);
        const data = await fetcher.getUserData(id);

        userHandler(data);
      } catch (e) {
        userHandler(null);
      } finally {
        startHandler(false);
      }
    };

    startHandler(true);
    getUserData();
  }, [currentUser.fetcher, id]);

  if (starting) {
    return <LoadingScreen />;
  }

  const updateUser = async (props: UserData) => {
    if (user == null) {
      return;
    }
    loadingHandler(true);

    const changed = differentEntries(user, props);
    const fetcher = new UserFetcher(currentUser.fetcher);

    try {
      await fetcher.updateUser(user.id, changed);
      onSuccess && onSuccess();
    } catch (e) {
      errorHandler(e.message);
      loadingHandler(false);
    }
  };

  const createUser = async (props: UserData) => {
    if (user != null) {
      return;
    }
    loadingHandler(true);

    const fetcher = new UserFetcher(currentUser.fetcher);

    try {
      await fetcher.createUser(props);
      onSuccess && onSuccess();
    } catch (e) {
      errorHandler(e.message);
      loadingHandler(false);
    }
  };

  const deleteUser = async () => {
    if (user == null) {
      return;
    }
    confirmDeleteHandler(false);
    loadingHandler(true);

    const fetcher = new UserFetcher(currentUser.fetcher);

    try {
      await fetcher.deleteUser(user);
      onSuccess && onSuccess();
    } catch (e) {
      errorHandler(e.message);
      loadingHandler(false);
    }
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
        data={user || undefined}
        onSubmit={user == null ? createUser : updateUser}
        onDelete={user != null ? () => confirmDeleteHandler(true) : undefined}
        loading={loading}
        errorMessage={error || undefined}
      />
    </>
  );
}
