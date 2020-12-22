import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import ScanCamera from './camera';
import SearchBar from './search_bar';

type Props = {
  onEquipmentSelected?: (id: number) => void;
  style?: ViewStyle;
  cameraActive?: boolean;
};

export default function ScanScreen({
  onEquipmentSelected,
  style,
  cameraActive,
}: Props) {
  return (
    <View style={style}>
      <ScanCamera
        style={styles.camera}
        active={cameraActive}
        onQRCodeRead={onEquipmentSelected}
      />
      <SearchBar
        onEquipmentSelected={(eq) =>
          onEquipmentSelected && onEquipmentSelected(eq.id)
        }
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
