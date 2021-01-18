import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WithUserStackParams } from './navigator';
import { useLang } from '../util/contexts/lang_context';
import Layout from '../components/layout';
import EquipmentScreen from '../components/equipment_view/equipment_screen';
import { ImageProps, StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/util/tab_navigator';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { Icon } from '@ui-kitten/components';

export default function Equipment({
  navigation,
  route,
}: StackScreenProps<WithUserStackParams, 'Equipment'>) {
  const { id } = route.params;
  const { getPhrase } = useLang();

  return (
    <Layout title={getPhrase('Equipment')} goBack={navigation.goBack}>
      <Navigator>
        <Navigator.Tab title={getPhrase('Info')} icon={BookIcon}>
          <EquipmentScreen id={id} />
        </Navigator.Tab>
        <Navigator.Tab title={getPhrase('Passwords')} icon={LockIcon}>
          <View style={styles.container}>
            <Text>{getPhrase('Passwords here')}</Text>
          </View>
        </Navigator.Tab>
      </Navigator>
    </Layout>
  );
}

const BookIcon: RenderProp<Partial<ImageProps>> = (props) => (
  <Icon {...props} name="book-open-outline" />
);
const LockIcon: RenderProp<Partial<ImageProps>> = (props) => (
  <Icon {...props} name="unlock-outline" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
