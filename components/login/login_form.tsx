import React from 'react';
import { useForm } from 'react-hook-form';
import { ImageProps } from 'react-native';
import { useLang } from '../../util/contexts/lang_context';
import {
  Button,
  Card,
  Icon,
  Spinner,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import useControlledInput from '../util/form/controlled_input';

export type Inputs = {
  username: string;
  password: string;
};

type Props = {
  onSubmit: (data: Inputs) => void | Promise<void>;
  loading: boolean;
  errorMessage?: string;
};

export default function LoginForm({ onSubmit, loading, errorMessage }: Props) {
  const { control, handleSubmit, errors } = useForm<Inputs>();
  const { getPhrase } = useLang();
  const styles = useStyleSheet(themedStyles);

  const Input = useControlledInput(control);

  const usernameInput = (
    <Input
      label={getPhrase('Username')}
      name="username"
      rules={{ required: true }}
      defaultValue=""
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
      defaultValue=""
      error={errors.password}
      props={{
        accessoryLeft: passwordIcon,
        editable: !loading,
        secureTextEntry: true,
      }}
    />
  );

  return (
    <Card disabled={true}>
      {usernameInput}
      {passwordInput}

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <Button
        style={styles.button}
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
});
