import { Button, Card, Input, Text } from '@ui-kitten/components';
import { RenderProp } from '@ui-kitten/components/devsupport';
import React, { useState } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { updatePassword } from '../../util/api/auth/authenticate';
import { useLang } from '../../util/contexts/lang_context';

type Props = {
  token: string;
  onSuccess?: () => void;
};

export default function NewPassword({ token, onSuccess }: Props) {
  const [loading, loadHandler] = useState(false);
  const [newPassword, passwordHandler] = useState('');
  const [confirmationPassword, confirmationPasswordHandler] = useState('');
  const { getPhrase } = useLang();

  const Header: RenderProp<ViewProps> = (props) => (
    <Text {...props} category="h4">
      {getPhrase('Update your password')}
    </Text>
  );

  const passwordMatch = newPassword === confirmationPassword;
  const passwordTooShort = newPassword.length < 5;

  const isValid = passwordMatch && !passwordTooShort;

  const onSubmit = async () => {
    if (!isValid) {
      return;
    }

    loadHandler(true);

    const success = await updatePassword(token, newPassword);

    if (success) {
      onSuccess && onSuccess();
    } else {
      loadHandler(false);
    }
  };

  return (
    <Card header={Header} disabled={true} style={styles.card}>
      <Text style={styles.item}>
        {getPhrase(
          "Looks like you haven't chosen your password yet, please update it before proceeding",
        )}
      </Text>
      <Input
        label={getPhrase('Password')}
        style={styles.item}
        disabled={loading}
        value={newPassword}
        status={!passwordTooShort ? '' : 'danger'}
        caption={!passwordTooShort ? '' : getPhrase('Password is too short')}
        onChangeText={passwordHandler}
        secureTextEntry
      />
      <Input
        label={getPhrase('Password confirmation')}
        style={styles.item}
        disabled={loading}
        value={confirmationPassword}
        status={passwordMatch ? '' : 'danger'}
        caption={passwordMatch ? '' : getPhrase("Passwords don't match")}
        onChangeText={confirmationPasswordHandler}
        secureTextEntry
      />
      <Button disabled={loading} onPress={onSubmit}>
        {getPhrase('Submit')}
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    alignSelf: 'stretch',
  },
  item: {
    marginBottom: 20,
  },
  modal: {
    padding: 10,
  },
});
