import React, { useEffect, useState } from 'react';
import { WithUserStackParams } from './navigator';
import { Button } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { useLang } from '../util/contexts/lang_context';
import Layout from '../components/layout';
import { StyleSheet, View } from 'react-native';
import EquipmentFetcher, {
  EquipmentData,
} from '../util/api/equipment/equipment';
import { useUser } from '../util/contexts/user_context';

export default function Scan({
  navigation,
}: StackScreenProps<WithUserStackParams, 'Scan'>) {
  const [equipment, equipmentHandler] = useState<EquipmentData[]>([]);
  const { getPhrase } = useLang();
  const currentUser = useUser();

  useEffect(() => {
    const getData = async () => {
      const equipmentFetcher = new EquipmentFetcher(currentUser.fetcher);
      const data = await equipmentFetcher.getList();

      equipmentHandler(data);
    };

    getData();
  }, [currentUser.fetcher]);

  return (
    <Layout>
      <View style={styles.contentContainer}>
        {equipment.map((eq, index) => (
          <Button
            onPress={() => navigation.navigate('Equipment', { id: eq.id })}
            key={index}>
            {eq.tag}
          </Button>
        ))}
      </View>
      <Button onPress={() => navigation.navigate('More')}>
        {getPhrase('More')}
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
