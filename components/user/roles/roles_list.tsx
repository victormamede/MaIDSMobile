import React, { useEffect, useState } from 'react';
import { Role } from '../../../util/api/auth/roles';
import { CheckBox } from '@ui-kitten/components';
import { useLang } from '../../../util/contexts/lang_context';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  values?: Role[];
  onChange?: (values: Role[]) => void;
  disabled?: boolean;
};
export default function RolesList({
  values: _values,
  onChange,
  style,
  disabled,
}: Props) {
  const [values, valuesHandler] = useState<Role[]>(_values || []);
  const { getPhrase } = useLang();

  useEffect(() => {
    _values && valuesHandler(_values);
  }, [_values]);

  const checkBoxes = roles.map(({ role, label }, index) => {
    const onCheckBoxChange = (checked: boolean) => {
      const newValues = [...values];
      if (checked) {
        newValues.push(role);
      } else {
        newValues.splice(newValues.indexOf(role), 1);
      }

      valuesHandler(newValues);
      onChange && onChange(newValues);
    };

    return (
      <CheckBox
        style={styles.checkBox}
        key={index}
        checked={values.includes(role)}
        disabled={disabled}
        onChange={onCheckBoxChange}>
        {getPhrase(label)}
      </CheckBox>
    );
  });

  return <View style={style}>{checkBoxes}</View>;
}

type RoleProp = {
  role: Role;
  label: string;
};

const roles: RoleProp[] = [
  {
    role: 'ACCOUNTS',
    label: 'Accounts',
  },
  {
    role: 'EQUIPMENT',
    label: 'Equipment',
  },
];

const styles = StyleSheet.create({
  checkBox: {
    margin: 10,
  },
});
