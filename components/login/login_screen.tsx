import React, { useState } from 'react';
import LoginForm, { Inputs } from './login_form';
import { authenticate, AuthError } from '../../util/api/auth/authenticate';
import { useLang } from '../../util/contexts/lang_context';
import usePersistentState from '../../util/helper/persistent_state';
import { ViewStyle } from 'react-native';

type Props = {
  userUpdated: (token: string) => void;
  updatePassword: (token: string) => void;
  style?: ViewStyle;
};

export default function LoginScreen({
  userUpdated,
  updatePassword,
  style,
}: Props) {
  const [loading, loadingHandler] = useState(false);
  const [errorMessage, errorMessageHandler] = useState<string | null>(null);
  const [defaults, defaultsHandler] = usePersistentState('remember-user', ':');
  const { getPhrase } = useLang();

  const onSubmit = async (data: Inputs) => {
    loadingHandler(true);

    try {
      const body = await authenticate(data);

      if (data.remember) {
        defaultsHandler(`${data.username}:${data.password}`);
      } else {
        defaultsHandler(':');
      }

      if (body.should_update_password) {
        updatePassword(body['auth-token']);
      } else {
        userUpdated(body['auth-token']);
      }
    } catch (e) {
      if (e.message === 'Could not authenticate') {
        if ((e as AuthError).found) {
          errorMessageHandler('Password is incorrect');
        } else {
          errorMessageHandler('User not found');
        }
      } else if (e.message === 'Network request failed') {
        errorMessageHandler('Could not connect to the server');
      } else {
        errorMessageHandler('Something went wrong');
      }
    }

    loadingHandler(false);
  };

  const [defaultUsername, defaultPassword] = defaults.split(':');

  return (
    <LoginForm
      style={style}
      onSubmit={onSubmit}
      loading={loading}
      defaults={{ username: defaultUsername, password: defaultPassword }}
      errorMessage={errorMessage != null ? getPhrase(errorMessage) : undefined}
    />
  );
}
