import React from 'react';
import { Control, Controller, FieldError, FieldName } from 'react-hook-form';
import { Input, InputProps } from '@ui-kitten/components';
import { useLang } from '../../../util/contexts/lang_context';

export default function useControlledInput<T>(
  control: Control<Record<string, T>>,
) {
  type Props = {
    label: string;
    name: FieldName<Record<string, T>>;
    defaultValue: any;
    isNumeric?: boolean;
    error?: FieldError;
    rules?: any;
    props?: InputProps;
  };

  const { getPhrase } = useLang();

  const ControlledInput = React.useMemo(
    () => ({
      label,
      name,
      defaultValue,
      props,
      isNumeric,
      error,
      rules,
    }: Props) => (
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            label={label}
            onBlur={onBlur}
            onChangeText={(newText) =>
              onChange(isNumeric ? +newText || 0 : newText)
            }
            value={value.toString()}
            keyboardType={isNumeric ? 'numeric' : 'default'}
            status={error && 'danger'}
            caption={error && getPhrase(getErrorString(error))}
            {...props}
          />
        )}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
      />
    ),
    [control, getPhrase],
  );

  return ControlledInput;
}

function getErrorString(
  error: FieldError,
  customMessages?: { [type: string]: string },
) {
  return (
    error.message ||
    (customMessages && customMessages[error.type]) ||
    errorMessages[error.type] ||
    ''
  );
}

const errorMessages: { [key: string]: string } = {
  max: 'Value too large',
  maxLength: 'Value too long',
  min: 'Value too low',
  minLength: 'Value too shot',
  pattern: 'Invalid value',
  required: 'Input is required',
  validate: 'Validation error',
};
