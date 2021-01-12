import ApiFetcher, { ErrorMessage } from '../api_fetcher';
import { EquipmentTypeData } from './equipment_type';
import { objectToUrlEncoded } from '../../helper/objects';

export type EquipmentData = {
  id: number;
  tag: string;
  type: EquipmentTypeData;
  brand: string | null;
  model: string | null;
  series: string | null;
};

export type EquipmentGetBody = {
  id: number;
  tag: string;
  type: EquipmentTypeData;
  brand: string | null;
  model: string | null;
  series: string | null;
};

export type EquipmentPostBody = {
  id: number;
  tag: string;
  type_id: number;
  brand: string | null;
  model: string | null;
  series: string | null;
};

export default class EquipmentFetcher {
  constructor(private fetcher: ApiFetcher) {}

  public async getList(
    filters?: Partial<EquipmentData>,
  ): Promise<EquipmentData[]> {
    let filterString = '';
    if (filters != null) {
      filterString = objectToUrlEncoded(filters);
    }

    const { data } = await this.fetcher.get<EquipmentGetBody[]>(
      '/equipment' + filterString,
    );

    return (data as EquipmentGetBody[])
      .map(bodyToEquipmentData)
      .sort((el1, el2) => (el1.tag > el2.tag ? 1 : -1));
  }

  public async getEquipmentData(id: number): Promise<EquipmentData> {
    const { status, data } = await this.fetcher.get<EquipmentGetBody>(
      `/equipment/${id}`,
    );

    if (status !== 200) {
      throw new Error('Equipment ID not valid');
    }

    return bodyToEquipmentData(data as EquipmentGetBody);
  }

  public async updateEquipment(id: number, body: Partial<EquipmentData>) {
    const { data, status } = await this.fetcher.put<EquipmentGetBody>(
      `/equipment/${id}`,
      equipmentDataToPostBody(body),
    );

    if (status !== 200) {
      const errorMessage = data as ErrorMessage;

      throw new Error(errorMessage.message);
    }

    return bodyToEquipmentData(data as EquipmentGetBody);
  }

  public async createEquipment(body: EquipmentData) {
    const { data, status } = await this.fetcher.post<EquipmentGetBody>(
      '/equipment',
      equipmentDataToPostBody(body),
    );

    if (status !== 201) {
      const errorMessage = data as ErrorMessage;

      throw new Error(errorMessage.message);
    }

    return bodyToEquipmentData(data as EquipmentGetBody);
  }

  public async deleteEquipment(body: EquipmentData) {
    const { status } = await this.fetcher.delete(`/equipment/${body.id}`);

    return status === 200;
  }
}

const bodyToEquipmentData: (body: EquipmentGetBody) => EquipmentData = (
  data: EquipmentGetBody,
) => ({
  id: data.id,
  tag: data.tag,
  type: data.type,
  brand: data.brand,
  model: data.model,
  series: data.series,
});

const equipmentDataToPostBody: (
  equipmentData: Partial<EquipmentData>,
) => Partial<EquipmentPostBody> = (data: Partial<EquipmentData>) => ({
  id: data.id,
  tag: data.tag,
  type_id: data.type?.id,
  brand: data.brand,
  model: data.model,
  series: data.series,
});
