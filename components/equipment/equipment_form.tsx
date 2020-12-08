import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLang } from '../../util/contexts/lang_context';
import {
  Button,
  Card,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import useControlledInput from '../util/form/controlled_input';
import { EquipmentData } from '../../util/api/equipment/equipment';

type Props = {
  data?: EquipmentData;
  onSubmit?: (data: EquipmentData) => void | Promise<void>;
  errorMessage?: string;
  loading?: boolean;
};

export default function EquipmentForm({
  onSubmit,
  data,
  errorMessage,
  loading,
}: Props) {
  const { control, handleSubmit, errors, reset } = useForm<EquipmentData>();
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    reset();
  }, [data, reset]);

  const { getPhrase } = useLang();

  const Input = useControlledInput(control);

  return (
    <Card disabled={true}>
      <Input
        label={getPhrase('Tag')}
        name="username"
        defaultValue={data?.tag || ''}
        rules={{ required: true }}
        error={errors.tag}
        props={{ disabled: loading }}
      />
      <Input
        label={getPhrase('Brand')}
        name="brand"
        defaultValue={data?.brand || ''}
        rules={{ required: true }}
        error={errors.brand}
        props={{ disabled: loading }}
      />
      <Input
        label={getPhrase('Model')}
        name="model"
        defaultValue={data?.model || ''}
        rules={{ required: true }}
        error={errors.model}
        props={{ disabled: loading }}
      />
      <Input
        label={getPhrase('Serial number')}
        name="series"
        defaultValue={data?.series || ''}
        rules={{ required: true }}
        error={errors.series}
        props={{ disabled: loading }}
      />
      {errorMessage == null ? (
        <></>
      ) : (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      <Button disabled={loading} onPress={onSubmit && handleSubmit(onSubmit)}>
        {getPhrase('Submit')}
      </Button>
    </Card>
  );
}

const themedStyles = StyleService.create({
  errorMessage: {
    marginTop: 10,
    color: 'color-danger-default',
  },
});
