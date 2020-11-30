import React, { useState } from 'react';
import LoginForm, { Inputs } from './login_form';
import { authenticate, AuthError } from '../../util/api/auth/authenticate';
import { useLang } from '../../util/contexts/lang_context';

type Props = {
  userUpdated: (token: string) => void;
  updatePassword: (token: string) => void;
};

export default function LoginScreen({ userUpdated, updatePassword }: Props) {
  const [loading, loadingHandler] = useState(false);
  const [errorMessage, errorMessageHandler] = useState<string | null>(null);
  const { getPhrase } = useLang();

  const onSubmit = async (data: Inputs) => {
    loadingHandler(true);

    try {
      const body = await authenticate(data);
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
      } else {
        errorMessageHandler('Something went wrong');
      }
    }

    loadingHandler(false);
  };

  return (
    <LoginForm
      onSubmit={onSubmit}
      loading={loading}
      errorMessage={errorMessage != null ? getPhrase(errorMessage) : undefined}
    />
  );
}
