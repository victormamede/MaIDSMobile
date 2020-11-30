import 'react-native-gesture-handler';
import React from 'react';

//Design
import * as eva from '@eva-design/eva';
import { theme } from './theme';
import {
  ApplicationProvider as UIKittenProvider,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// Navigation
import Navigator from './screens/navigator';
import { NavigationContainer } from '@react-navigation/native';

// Language
import LangContextProvider from './components/lang_wrapper';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <UIKittenProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <NavigationContainer>
          <LangContextProvider>
            <Navigator />
          </LangContextProvider>
        </NavigationContainer>
      </UIKittenProvider>
    </>
  );
}
