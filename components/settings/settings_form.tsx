import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Lang, useLang } from '../../util/contexts/lang_context';
import {
  Button,
  IndexPath,
  Select,
  SelectItem,
  Spinner,
} from '@ui-kitten/components';

export type RawInputs = {
  language: IndexPath;
};
export type Inputs = {
  language: Lang;
};

type Props = {
  currentValues: Inputs;
  onSubmit: (data: Inputs) => void | Promise<void>;
  loading?: boolean;
};

export default function SettingsForm({
  currentValues,
  onSubmit,
  loading,
}: Props) {
  const { control, handleSubmit, setValue } = useForm<RawInputs>();
  const { getPhrase } = useLang();

  const onFormSubmit = (values: RawInputs) =>
    onSubmit({
      language: langFromIndex(values.language).value,
    });

  useEffect(() => {
    setValue('language', indexFromLang(currentValues.language));
  }, [setValue, currentValues]);

  return (
    <View>
      <View style={styles.topic}>
        <Controller
          control={control}
          render={({ onChange, value }) => (
            <Select
              onSelect={onChange}
              selectedIndex={value}
              value={value && langFromIndex(value).label}
              label={getPhrase('Language')}>
              {languages.map((item, index) => (
                <SelectItem key={index} title={item.label} />
              ))}
            </Select>
          )}
          name="language"
          defaultValue=""
        />
      </View>

      <Button
        accessoryLeft={loading ? loadingIndicator : undefined}
        onPress={handleSubmit(onFormSubmit)}
        disabled={loading}>
        {getPhrase('Submit')}
      </Button>
    </View>
  );
}

const languages = [
  { label: 'English', value: Lang.EN },
  { label: 'Português', value: Lang.PT_BR },
];
const langFromIndex = (index: IndexPath) => languages[index.row];
const indexFromLang = (value: Lang) =>
  new IndexPath(languages.findIndex((item) => item.value === value));

const loadingIndicator = () => <Spinner size="small" />;

const styles = StyleSheet.create({
  topic: {
    marginVertical: 10,
  },
});
