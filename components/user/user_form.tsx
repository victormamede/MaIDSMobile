import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLang } from '../../util/contexts/lang_context';
import {
  Button,
  Card,
  Icon,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { UserData } from '../../util/api/user/user';
import RolesList from './roles/roles_list';
import useControlledInput from '../util/form/controlled_input';
import { ImageProps, View } from 'react-native';

type Props = {
  data?: UserData;
  onSubmit?: (data: UserData) => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  errorMessage?: string;
  loading?: boolean;
};

export default function UserForm({
  onSubmit,
  onDelete,
  data,
  errorMessage,
  loading,
}: Props) {
  const { control, handleSubmit, errors, reset } = useForm<UserData>();

  useEffect(() => {
    reset();
  }, [data, reset]);

  const { getPhrase } = useLang();
  const styles = useStyleSheet(themedStyles);

  const Input = useControlledInput(control);

  return (
    <Card disabled={true}>
      <View style={styles.buttonContainer}>
        <Input
          label={getPhrase('Username')}
          name="username"
          defaultValue={data?.username || ''}
          rules={{ required: true }}
          error={errors.username}
          props={{ disabled: loading, style: styles.input }}
        />
        <Button
          appearance="ghost"
          status="danger"
          style={styles.deleteButton}
          accessoryLeft={DeleteIcon}
          disabled={onDelete == null}
          onPress={onDelete}
        />
      </View>
      <Input
        label={getPhrase('Real name')}
        name="realName"
        defaultValue={data?.realName || ''}
        error={errors.realName}
        props={{ disabled: loading }}
      />
      <Input
        label={getPhrase('Registration number')}
        name="registrationNumber"
        defaultValue={data?.registrationNumber || 0}
        error={errors.registrationNumber}
        props={{ disabled: loading }}
        isNumeric
      />
      <Input
        label={getPhrase('Email')}
        name="email"
        defaultValue={data?.email || ''}
        error={errors.email}
        props={{ disabled: loading }}
      />
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <RolesList
            style={styles.roles}
            onChange={onChange}
            values={value}
            disabled={loading}
          />
        )}
        name="roles"
        defaultValue={data?.roles || []}
      />
      {errorMessage == null ? (
        <></>
      ) : (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      <Button
        style={styles.button}
        disabled={loading}
        onPress={onSubmit && handleSubmit(onSubmit)}>
        {getPhrase('Submit')}
      </Button>
    </Card>
  );
}

const DeleteIcon = (props?: Partial<ImageProps>) => (
  <Icon name="trash-2-outline" {...props} />
);

const themedStyles = StyleService.create({
  roles: {
    marginVertical: 10,
  },
  errorMessage: {
    marginTop: 10,
    color: 'color-danger-default',
  },
  button: {
    margin: 10,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
});
