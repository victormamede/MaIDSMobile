import React, { useEffect } from 'react';
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
import { UserData } from '../../util/api/user/user';

type Props = {
  data?: UserData;
  onSubmit?: (data: UserData) => void | Promise<void>;
};

export default function UserForm({ onSubmit, data }: Props) {
  const { control, handleSubmit, errors, setValue } = useForm<UserData>();
  const { getPhrase } = useLang();

  return (
    <Card>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View>
            <Input
              label={getPhrase('Username')}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name="username"
        defaultValue={data?.username || ''}
      />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View>
            <Input
              label={getPhrase('Real name')}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name="realName"
        defaultValue={data?.realName || ''}
      />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View>
            <Input
              label={getPhrase('Registration number')}
              onBlur={onBlur}
              onChangeText={(_value) => onChange(+_value)}
              value={value.toString()}
              keyboardType="numeric"
            />
          </View>
        )}
        name="registrationNumber"
        defaultValue={data?.registrationNumber || 0}
      />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View>
            <Input
              label={getPhrase('Email')}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name="email"
        defaultValue={data?.email || ''}
      />
    </Card>
  );
}
