import React, { useMemo, useState } from 'react';
import { ImageProps, StyleSheet, View, ViewStyle } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import {
  Barcode,
  GoogleVisionBarcodesDetectedEvent,
  RNCamera,
} from 'react-native-camera';
import EquipmentFetcher, {
  EquipmentData,
} from '../../util/api/equipment/equipment';
import { useUser } from '../../util/contexts/user_context';
import Locator, { QRCodePosition } from './locator';

type Props = {
  style?: ViewStyle;
  onQRCodeRead?: (equipment: EquipmentData) => void;
};

export default function ScanCamera({ onQRCodeRead, style }: Props) {
  const [flash, flashHandler] = useState(false);
  const [locator, locatorHandler] = useState<QRCodePosition | null>(null);
  const [frontCamera, cameraHandler] = useState(false);
  const currentUser = useUser();

  const equipmentFetcher = useMemo(
    () => new EquipmentFetcher(currentUser.fetcher),
    [currentUser.fetcher],
  );

  const checkBarcode = async (barcode: Barcode) => {
    const result = +barcode.data;

    if (isNaN(result)) {
      return;
    }

    locatorHandler(barcode.bounds);

    let equipment: EquipmentData | undefined;
    try {
      equipment = await equipmentFetcher.getEquipmentData(result);
    } catch (e) {}

    locatorHandler(null);
    return equipment;
  };

  const onQRCode = async (event: GoogleVisionBarcodesDetectedEvent) => {
    if (onQRCodeRead == null) {
      return;
    }

    event.barcodes.forEach(async (barcode) => {
      const value = await checkBarcode(barcode);

      if (value) {
        onQRCodeRead(value);
      }
    });
  };

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
        onGoogleVisionBarcodesDetected={onQRCode}
        style={styles.camera}>
        <Locator position={locator || undefined} />
      </RNCamera>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
