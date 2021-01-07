import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageProps, ViewStyle } from 'react-native';
import { useLang } from '../../util/contexts/lang_context';
import {
  Button,
  Card,
  Icon,
  Spinner,
  Text,
  StyleService,
  useStyleSheet,
  CheckBox,
} from '@ui-kitten/components';
import useControlledInput from '../util/form/controlled_input';
import usePersistentState from '../../util/helper/persistent_state';

export type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};

type Props = {
  style?: ViewStyle;
  onSubmit: (data: Inputs) => void | Promise<void>;
  loading: boolean;
  errorMessage?: string;
  defaults?: {
    username?: string;
    password?: string;
  };
};

export default function LoginForm({
  onSubmit,
  loading,
  errorMessage,
  defaults,
  style,
}: Props) {
  const { control, handleSubmit, errors, setValue } = useForm<Inputs>();
  const [shouldRemember, rememberHandler] = usePersistentState(
    'remember-box',
    '0',
  );
  const { getPhrase } = useLang();
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    setValue('remember', shouldRemember === '1');
  }, [shouldRemember, setValue]);

  const Input = useControlledInput(control);

  const usernameInput = (
    <Input
      label={getPhrase('Username')}
      name="username"
      rules={{ required: true }}
      defaultValue={defaults?.username || ''}
      error={errors.username}
      props={{
        accessoryLeft: accountIcon,
        editable: !loading,
      }}
    />
  );
  const passwordInput = (
    <Input
      label={getPhrase('Password')}
      name="password"
      rules={{ required: true }}
      defaultValue={defaults?.password || ''}
      error={errors.password}
      props={{
        accessoryLeft: passwordIcon,
        editable: !loading,
        secureTextEntry: true,
      }}
    />
  );

  return (
    <Card disabled={true} style={style}>
      {usernameInput}
      {passwordInput}

      <Controller
        control={control}
        render={({ onChange, value }) => (
          <CheckBox
            style={styles.remember}
            onChange={(checkValue) => {
              rememberHandler(checkValue ? '1' : '0');
              onChange(checkValue);
            }}
            checked={value}>
            {getPhrase('Remember me')}
          </CheckBox>
        )}
        name="remember"
        defaultValue={shouldRemember === '1'}
      />

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <Button
        style={styles.button}
        status="danger"
        accessoryLeft={loading ? spinner : loginIcon}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}>
        {getPhrase('Login')}
      </Button>
    </Card>
  );
}

const accountIcon = (props?: Partial<ImageProps>) => (
  <Icon name="people-outline" {...props} />
);
const passwordIcon = (props?: Partial<ImageProps>) => (
  <Icon name="lock-outline" {...props} />
);
const loginIcon = (props?: Partial<ImageProps>) => (
  <Icon name="log-in-outline" {...props} />
);
const spinner = () => <Spinner size="small" />;

const themedStyles = StyleService.create({
  button: {
    margin: 20,
    marginHorizontal: 40,
  },
  errorMessage: {
    marginTop: 10,
    color: 'color-danger-default',
  },
  remember: {
    margin: 10,
    alignSelf: 'flex-end',
  },
});
