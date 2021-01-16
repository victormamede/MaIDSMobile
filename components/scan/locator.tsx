import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Point, Size } from 'react-native-camera';

export type QRCodePosition = {
  origin: Point<number>;
  size: Size<number>;
};

type Props = {
  position?: QRCodePosition;
};

export default function Locator({ position }: Props) {
  if (position == null) {
    return <></>;
  }

  const length = Math.max(position.size.height, position.size.width);
  const style = {
    left: position.origin.x,
    top: position.origin.y,
    width: length,
    height: length,
  };

  return <View style={[styles.view, style]} />;
}

const styles = StyleSheet.create({
  main: {},
  view: {
    backgroundColor: 'rgba(100, 255, 150, 0.7)',
    position: 'relative',
    justifyContent: 'center',
    padding: 0,
  },
});
