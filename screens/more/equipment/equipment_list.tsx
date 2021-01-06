import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import EquipmentListComponent, {
  EquipmentListRef,
} from '../../../components/equipment/equipment_list';
import { Button } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { useLang } from '../../../util/contexts/lang_context';
import Layout from '../../../components/layout';
import { UserStackParams } from './navigator';
import { useFocusEffect } from '@react-navigation/native';

export default function EquipmentList({
  navigation,
}: StackScreenProps<UserStackParams, 'EquipmentList'>) {
  const { getPhrase } = useLang();
  const listRef = useRef<EquipmentListRef>(null);

  useFocusEffect(() => {
    listRef.current?.refresh && listRef.current?.refresh();
  });

  return (
    <Layout title={getPhrase('Equipment List')} goBack={navigation.goBack}>
      <View style={styles.container}>
        <EquipmentListComponent
          ref={listRef}
          onPress={(id) => navigation.push('Equipment', { id })}
        />
      </View>
      <Button onPress={() => navigation.push('Equipment', { id: 0 })}>
        {getPhrase('New')}
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
