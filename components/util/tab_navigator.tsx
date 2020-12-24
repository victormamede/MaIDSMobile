import React, { useState } from 'react';
import { Tab, TabView, TabViewProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const Navigator = (props: TabViewProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <TabView
      {...props}
      style={[styles.container, props.style]}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}>
      {props.children}
    </TabView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function createTabNavigator() {
  return { Tab, Navigator };
}
