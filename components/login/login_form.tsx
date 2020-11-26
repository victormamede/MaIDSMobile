import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ImageProps, View } from 'react-native';
import Text from '../util/translated_text';
import { useLang } from '../../util/contexts/lang_context';
import {
  Button,
  Card,
  Icon,
  Input,
  Spinner,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

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

  const usernameInput = (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <View>
          <Input
            label={getPhrase('Username')}
            onBlur={onBlur}
            onChangeText={onChange}
            accessoryLeft={accountIcon}
            value={value}
            editable={!loading}
            status={errors.username && 'danger'}
            caption={errors.username && getPhrase('required')}
          />
        </View>
      )}
      name="username"
      rules={{ required: true }}
      defaultValue=""
    />
  );
  const passwordInput = (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <View>
          <Input
            label={getPhrase('Password')}
            onBlur={onBlur}
            onChangeText={onChange}
            accessoryLeft={passwordIcon}
            value={value}
            editable={!loading}
            status={errors.password && 'danger'}
            caption={errors.password && getPhrase('required')}
            secureTextEntry
          />
        </View>
      )}
      name="password"
      rules={{ required: true }}
      defaultValue=""
    />
  );

  return (
    <Card>
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
