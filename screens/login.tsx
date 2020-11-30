import React from 'react';
import LoginScreen from '../components/login/login_screen';
import getUserData from '../util/api/auth/get_user_data';
import { useUser } from '../util/contexts/user_context';
import { NoUserStackParams } from './navigator';
import { ImageProps, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Icon } from '@ui-kitten/components';
import { useLang } from '../util/contexts/lang_context';
import { UserData } from '../util/api/user/user';
import Layout from '../components/layout';

export default function Login({
  navigation,
}: StackScreenProps<NoUserStackParams, 'Login'>) {
  const userContext = useUser();
  const { getPhrase } = useLang();

  const onLogin = async (
    token: string,
    logInFunc: (data: UserData, token: string) => void,
  ) => {
    const myUser = await getUserData(token);
    myUser && logInFunc(myUser, token);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <LoginScreen
          userUpdated={(token) => onLogin(token, userContext.logIn)}
          updatePassword={(token) =>
            navigation.navigate('UpdatePassword', { token: token })
          }
        />
      </View>
      <View style={styles.footer}>
        <Button
          accessoryLeft={CogIcon}
          onPress={() => navigation.navigate('Settings')}
          appearance="ghost">
          {getPhrase('Settings')}
        </Button>
      </View>
    </Layout>
  );
}

const CogIcon = (props?: Partial<ImageProps>) => (
  <Icon name="settings" {...props} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  footer: {
    padding: 10,
    alignSelf: 'flex-end',
  },
});
