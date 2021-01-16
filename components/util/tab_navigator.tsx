import React, { useState } from 'react';
import { Tab, TabView, TabViewProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

function Navigator(props: TabViewProps) {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Navigator.Tab = Tab;

export default Navigator;
