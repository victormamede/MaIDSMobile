import React from 'react';
import { Text } from '@ui-kitten/components';
import { EquipmentData } from '../../util/api/equipment/equipment';
import { StyleSheet, View } from 'react-native';
import { useLang } from '../../util/contexts/lang_context';

type Props = {
  data: EquipmentData;
};

export default function EquipmentDataView({ data }: Props) {
  const { getPhrase } = useLang();

  return (
    <View style={styles.container}>
      <Text category="h1">{data.tag}</Text>
      <Text>{data.type.description}</Text>
      <Text>{`${getPhrase('Brand')}: ${data.brand || getPhrase('N/A')}`}</Text>
      <Text>{`${getPhrase('Model')}: ${data.model || getPhrase('N/A')}`}</Text>
      <Text>{`${getPhrase('Serial number')}: ${
        data.series || getPhrase('N/A')
      }`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
