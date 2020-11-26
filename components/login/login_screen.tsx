import React, { useState } from 'react';
import LoginForm, { Inputs } from './login_form';
import { authenticate, AuthError } from '../../util/api/auth/authenticate';

type Props = {
  userUpdated: (token: string) => void;
};

enum LoginState {
  READY,
  LOGGING_IN,
  USER_NOT_FOUND,
  PASSWORD_INCORRECT,
  API_ERROR,
}

export default function LoginScreen({ userUpdated }: Props) {
  const [loginState, loginHandler] = useState<LoginState>(LoginState.READY);

  const onSubmit = async (data: Inputs) => {
    loginHandler(LoginState.LOGGING_IN);

    try {
      const token = await authenticate(data);
      userUpdated(token);
    } catch (e) {
      if (e.message === 'Could not authenticate') {
        if ((e as AuthError).found) {
          loginHandler(LoginState.PASSWORD_INCORRECT);
        } else {
          loginHandler(LoginState.USER_NOT_FOUND);
        }
      } else {
        loginHandler(LoginState.API_ERROR);
      }
    }
  };

  const errorMessage = getErrorMessage(loginState);
  return (
    <LoginForm
      onSubmit={onSubmit}
      loading={loginState === LoginState.LOGGING_IN}
      errorMessage={errorMessage}
    />
  );
}

function getErrorMessage(state: LoginState) {
  switch (state) {
    case LoginState.PASSWORD_INCORRECT:
      return 'Password is incorrect';
    case LoginState.USER_NOT_FOUND:
      return 'User not found';
    case LoginState.API_ERROR:
      return 'Something went wrong';
    default:
      return;
  }
}
