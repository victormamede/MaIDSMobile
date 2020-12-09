import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { EquipmentData } from '../../util/api/equipment/equipment';
import ScanCamera from './camera';
import SearchBar from './search_bar';

type Props = {
  onEquipmentSelected?: (equipment: EquipmentData) => void;
  style?: ViewStyle;
};

export default function ScanScreen({ onEquipmentSelected, style }: Props) {
  return (
    <View style={style}>
      <ScanCamera style={styles.camera} />
      <SearchBar
        onEquipmentSelected={onEquipmentSelected}
        style={styles.input}
      />
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'black',
  },
  spacer: {
    flex: 1,
  },
  input: {
    margin: 20,
  },
});
