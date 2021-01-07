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
import useKeyboard from '../util/helper/keyboard';

export default function Login({
  navigation,
}: StackScreenProps<NoUserStackParams, 'Login'>) {
  const userContext = useUser();
  const { getPhrase } = useLang();
  const isKeyboardShowing = useKeyboard();
  const theme = useTheme();

  const onLogin = async (
    token: string,
    logInFunc: (data: UserData, token: string) => void,
  ) => {
    const myUser = await getUserData(token);
    myUser && logInFunc(myUser, token);
  };

  const logoSize = isKeyboardShowing ? 75 : 150;

  return (
    <Layout>
      <View style={styles.topContainer}>
        <Logo
          width={logoSize}
          height={logoSize}
          color={theme['color-primary-default']}
        />
      </View>
      <View style={styles.bottomContainer}>
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
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  footer: {
    padding: 10,
    alignItems: 'flex-end',
  },
});
