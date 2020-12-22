import { BarCodeReadEvent, Point } from 'react-native-camera';

// QRCodes data should follow the template: maidsappcode:{id}:{date_created}
export default class QRCodeParser {
  public async onEquipmentBarCode(event: BarCodeReadEvent) {
    // This only works for android, needs to be changed in the future
    if (!this.isInBounds(event.bounds as AndroidBounds)) {
      // TODO
    }

    try {
      return this.getId(event.data);
    } catch (e) {
      return;
    }
  }
  private isInBounds(bounds: AndroidBounds) {
    return true;
  }

  private getId(data: string) {
    const parts = data.split(':');

    const id = +parts[1];
    if (parts[0] !== 'maidsappcode' || isNaN(id)) {
      throw new Error('Wrong barcode format');
    }

    return id;
  }
}

type AndroidBounds = { width: number; height: number; origin: Point<string>[] };
