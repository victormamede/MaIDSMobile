import React, { useRef, useState } from 'react';
import { EquipmentTypeData } from '../../../util/api/equipment/equipment_type';
import { Control, Controller, FieldError } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import TypeList, { TypeListRef } from './type_list';
import NewType from './new_type';
import { EquipmentData } from '../../../util/api/equipment/equipment';

type Props = {
  error?: FieldError;
  control: Control<EquipmentData>;
  defaultValue: EquipmentTypeData | null;
  setValue: (value: EquipmentTypeData | null) => void;
};

export default function TypeSelector(props: Props) {
  const [showForm, formHandler] = useState(false);
  const [loading, loadHandler] = useState(false);
  const ref = useRef<TypeListRef>(null);

  const onSuccess = async (data: EquipmentTypeData) => {
    formHandler(false);
    loadHandler(true);
    await ref.current?.refreshList();
    loadHandler(false);
    props.setValue(data);
  };

  return (
    <Controller
      control={props.control}
      render={({ onChange, value, onBlur }) => (
        <View>
          <TypeList
            onChange={(_value) => {
              if (_value) {
                formHandler(false);
              }
              onChange(_value);
            }}
            onNew={() => formHandler(true)}
            value={value}
            onBlur={onBlur}
            error={props.error}
            ref={ref}
          />
          {showForm && (
            <View>
              <NewType
                style={styles.typeContainer}
                onSuccess={onSuccess}
                disabled={loading}
              />
            </View>
          )}
        </View>
      )}
      name="type"
      rules={{ required: true }}
      defaultValue={props.defaultValue}
    />
  );
}

const styles = StyleSheet.create({
  typeContainer: {
    padding: 16,
  },
});
