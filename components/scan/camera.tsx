import React, { useState } from 'react';
import { ImageProps, View, ViewStyle } from 'react-native';
import {
  Button,
  Icon,
  Spinner,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import QRCodeParser from '../../util/api/scan/qr_code_parser';

type Props = {
  style?: ViewStyle;
  onQRCodeRead?: (id: number) => void;
  active?: boolean;
};

const qrParser = new QRCodeParser();

export default function ScanCamera({ onQRCodeRead, style, active }: Props) {
  const [flash, flashHandler] = useState(false);
  const [frontCamera, cameraHandler] = useState(false);
  const [isReading, isReadingHandler] = useState(false);
  const styles = useStyleSheet(themedStyles);

  const onQRCode = async (event: BarCodeReadEvent) => {
    if (onQRCodeRead == null) {
      return;
    }
    if (isReading) {
      return;
    }

    isReadingHandler(true);
    const equipment = await qrParser.onEquipmentBarCode(event);

    if (equipment) {
      onQRCodeRead(equipment);
    }

    isReadingHandler(false);
  };

  const camera = (
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
      onBarCodeRead={onQRCode}
      barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      style={styles.camera}>
      <View style={styles.rectangleContainer}>
        {isReading ? (
          <Spinner size="giant" />
        ) : (
          <View style={styles.rectangle} />
        )}
      </View>
    </RNCamera>
  );

  return (
    <View style={style}>
      {active && camera}
      <View style={styles.spacer} />
      <View style={styles.buttons}>
        <Button
          accessoryLeft={flash ? flashOff : flashOn}
          onPress={() => flashHandler(!flash)}
          appearance="ghost"
          size="large"
          status="basic"
        />
        <Button
          accessoryLeft={flip}
          onPress={() => cameraHandler(!frontCamera)}
          appearance="ghost"
          size="large"
          status="basic"
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

const themedStyles = StyleService.create({
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
    alignSelf: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 6,
    backgroundColor: 'transparent',
    borderColor: 'color-success-default',
    borderRadius: 32,
  },
});
