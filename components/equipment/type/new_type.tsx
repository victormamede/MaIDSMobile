import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLang } from '../../../util/contexts/lang_context';
import { Button, Icon } from '@ui-kitten/components';
import useControlledInput from '../../util/form/controlled_input';
import { ImageProps, StyleSheet, View, ViewStyle } from 'react-native';
import EquipmentTypeFetcher, {
  EquipmentTypeData,
} from '../../../util/api/equipment/equipment_type';
import { useUser } from '../../../util/contexts/user_context';
import { RenderProp } from '@ui-kitten/components/devsupport';

type Props = {
  onSuccess?: (data: EquipmentTypeData) => void | Promise<void>;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function NewType({ onSuccess, disabled, style }: Props) {
  const [loading, loadHandler] = useState(false);
  const { control, handleSubmit } = useForm<EquipmentTypeData>();
  const currentUser = useUser();

  const { getPhrase } = useLang();

  const Input = useControlledInput(control);

  const onSubmit: SubmitHandler<EquipmentTypeData> = async (data) => {
    loadHandler(true);

    try {
      const typeFetcher = new EquipmentTypeFetcher(currentUser.fetcher);
      const success = await typeFetcher.createEquipmentType(data);

      onSuccess && onSuccess(success);
    } catch (e) {
      loadHandler(false);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Input
        label={getPhrase('New Type')}
        name="description"
        defaultValue={''}
        props={{ style: styles.input, disabled: loading || disabled }}
      />
      <Button
        style={styles.addButton}
        appearance="ghost"
        accessoryLeft={PlusIcon}
        status="success"
        onPress={handleSubmit(onSubmit)}
        disabled={loading || disabled}
      />
    </View>
  );
}

const PlusIcon: RenderProp<Partial<ImageProps>> = (props) => (
  <Icon {...props} name="plus-square-outline" />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  input: { flex: 1 },
  addButton: {
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
});
