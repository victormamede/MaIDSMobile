import { BarCodeReadEvent, Point } from 'react-native-camera';

const CODE_PREFIX = process.env.CODE_PREFIX || 'maidsappcode';

// QRCodes data should follow the template: {code_prefix}:{id}:{date_created}
export default class QRCodeParser {
  public async onEquipmentBarCode(event: BarCodeReadEvent) {
    try {
      return this.getId(event.data);
    } catch (e) {
      return;
    }
  }

  private getId(data: string) {
    const parts = data.split(':');

    const id = +parts[1];
    if (parts[0] !== CODE_PREFIX || isNaN(id)) {
      throw new Error('Wrong barcode format');
    }

    return id;
  }
}

type AndroidBounds = { width: number; height: number; origin: Point<string>[] };
