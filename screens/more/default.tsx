import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MoreStackParams } from '../more';
import { useUser } from '../../util/contexts/user_context';
import { useLang } from '../../util/contexts/lang_context';
import { ImageProps, StyleSheet, View } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import Layout from '../../components/layout';

export default function MoreDefault({
  navigation,
}: StackScreenProps<MoreStackParams, 'Default'>) {
  const user = useUser();
  const { getPhrase } = useLang();

  return (
    <Layout
      style={styles.container}
      title={getPhrase('More')}
      goBack={navigation.goBack}>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.item}
          disabled={!(user.user?.roles.includes('ACCOUNTS') || false)}
          onPress={() => navigation.push('User')}>
          {getPhrase('Users')}
        </Button>
      </View>
      <Button
        style={styles.item}
        status="danger"
        appearance="ghost"
        accessoryLeft={LogoutIcon}
        onPress={user.logOut}>
        {getPhrase('Logout')}
      </Button>
    </Layout>
  );
}

const LogoutIcon = (props?: Partial<ImageProps>) => (
  <Icon name="log-out-outline" {...props} />
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonsContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  item: {
    margin: 10,
  },
});
