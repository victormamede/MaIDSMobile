import React from 'react';
import LoginScreen from '../components/login/login_screen';
import getUserData from '../util/api/auth/get_user_data';
import { useUser } from '../util/contexts/user_context';
import { NoUserStackParams } from './navigator';
import { ImageProps, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Icon, useTheme } from '@ui-kitten/components';
import { useLang } from '../util/contexts/lang_context';
import { UserData } from '../util/api/user/user';
import Layout from '../components/layout';
import Logo from '../resources/logo.svg';

export default function Login({
  navigation,
}: StackScreenProps<NoUserStackParams, 'Login'>) {
  const userContext = useUser();
  const { getPhrase } = useLang();
  const theme = useTheme();

  const onLogin = async (
    token: string,
    logInFunc: (data: UserData, token: string) => void,
  ) => {
    const myUser = await getUserData(token);
    myUser && logInFunc(myUser, token);
  };

  return (
    <Layout>
      <View style={styles.backContainer}>
        <Logo width={150} height={150} color={theme['color-primary-default']} />
      </View>
      <View style={styles.footer}>
        <Button
          accessoryLeft={CogIcon}
          onPress={() => navigation.navigate('Settings')}
          appearance="ghost">
          {getPhrase('Settings')}
        </Button>
      </View>
      <View style={styles.frontContainer}>
        <LoginScreen
          userUpdated={(token) => onLogin(token, userContext.logIn)}
          updatePassword={(token) =>
            navigation.navigate('UpdatePassword', { token: token })
          }
        />
      </View>
    </Layout>
  );
}

const CogIcon = (props?: Partial<ImageProps>) => (
  <Icon name="settings" {...props} />
);

const styles = StyleSheet.create({
  backContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 30,
    flex: 1,
  },
  frontContainer: {
    flex: 1,
    paddingHorizontal: 30,
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  footer: {
    padding: 10,
    alignItems: 'flex-end',
  },
});
