import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLang } from '../../util/contexts/lang_context';
import {
  Button,
  Icon,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import useControlledInput from '../util/form/controlled_input';
import { EquipmentData } from '../../util/api/equipment/equipment';
import { ImageProps, ScrollView, View, ViewStyle } from 'react-native';
import TypeSelector from './type/type_selector';

type Props = {
  data?: EquipmentData;
  onSubmit?: (data: EquipmentData) => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  errorMessage?: string;
  loading?: boolean;
  style?: ViewStyle;
};

export default function EquipmentForm({
  onSubmit,
  onDelete,
  data,
  errorMessage,
  loading,
  style,
}: Props) {
  const {
    control,
    handleSubmit,
    errors,
    reset,
    setValue,
  } = useForm<EquipmentData>();
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    reset();
  }, [data, reset]);

  const { getPhrase } = useLang();

  const Input = useControlledInput(control);

  return (
    <ScrollView>
      <View style={style}>
        <View style={styles.buttonContainer}>
          <Input
            label={getPhrase('Tag')}
            name="tag"
            defaultValue={data?.tag || ''}
            rules={{ required: true }}
            error={errors.tag}
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
        <TypeSelector
          control={control}
          error={errors.type}
          defaultValue={data?.type || null}
          setValue={(value) => setValue('type', value)}
        />
        <Input
          label={getPhrase('Brand')}
          name="brand"
          defaultValue={data?.brand || ''}
          error={errors.brand}
          props={{ disabled: loading }}
        />
        <Input
          label={getPhrase('Model')}
          name="model"
          defaultValue={data?.model || ''}
          error={errors.model}
          props={{ disabled: loading }}
        />
        <Input
          label={getPhrase('Serial number')}
          name="series"
          defaultValue={data?.series || ''}
          error={errors.series}
          props={{ disabled: loading }}
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
      </View>
    </ScrollView>
  );
}

const DeleteIcon = (props?: Partial<ImageProps>) => (
  <Icon name="trash-2-outline" {...props} />
);

const themedStyles = StyleService.create({
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
