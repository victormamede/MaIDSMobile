import React, { useState } from 'react';
import { ImageProps, StyleSheet, View, ViewStyle } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import { RNCamera } from 'react-native-camera';

type Props = {
  style?: ViewStyle;
};
export default function ScanCamera({ style }: Props) {
  const [flash, flashHandler] = useState(false);
  const [frontCamera, cameraHandler] = useState(false);

  return (
    <View style={style}>
      <RNCamera
        type={
          frontCamera
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        captureAudio={false}
        style={styles.camera}
      />
      <View style={styles.spacer} />
      <View style={styles.buttons}>
        <Button
          accessoryLeft={flash ? flashOff : flashOn}
          onPress={() => flashHandler(!flash)}
          appearance="ghost"
          size="large"
        />
        <Button
          accessoryLeft={flip}
          onPress={() => cameraHandler(!frontCamera)}
          appearance="ghost"
          size="large"
        />
      </View>
    </View>
  );
}

const flashOn = (props?: Partial<ImageProps>) => (
  <Icon name="flash-outline" {...props} />
);
const flashOff = (props?: Partial<ImageProps>) => (
  <Icon name="flash-off-outline" {...props} />
);
const flip = (props?: Partial<ImageProps>) => (
  <Icon name="flip-outline" {...props} />
);

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  spacer: {
    flex: 1,
  },
  buttons: {
    margin: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
});
