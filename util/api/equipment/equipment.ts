import ApiFetcher, { ErrorMessage } from '../api_fetcher';
import { objectToUrlEncoded } from '../../helper/objects';

export type EquipmentData = {
  id: number;
  tag: string;
  brand: string | null;
  model: string | null;
  series: string | null;
};

export type Body = {
  id: number;
  tag: string;
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

    const { data } = await this.fetcher.get<Body[]>(
      '/equipment' + filterString,
    );

    return (data as Body[])
      .map(bodyToEquipmentData)
      .sort((el1, el2) => (el1.tag > el2.tag ? 1 : -1));
  }

  public async getEquipmentData(id: number): Promise<EquipmentData> {
    const { status, data } = await this.fetcher.get<Body>(`/equipment/${id}`);

    if (status !== 200) {
      throw new Error('Equipment ID not valid');
    }

    return bodyToEquipmentData(data as Body);
  }

  public async updateEquipment(id: number, body: Partial<EquipmentData>) {
    const { data, status } = await this.fetcher.put<Body>(
      `/equipment/${id}`,
      equipmentDataToBody(body),
    );

    if (status !== 200) {
      const errorMessage = data as ErrorMessage;

      throw new Error(errorMessage.message);
    }

    return bodyToEquipmentData(data as Body);
  }

  public async createEquipment(body: EquipmentData) {
    const { data, status } = await this.fetcher.post<Body>(
      '/equipment',
      equipmentDataToBody(body),
    );

    if (status !== 201) {
      const errorMessage = data as ErrorMessage;

      throw new Error(errorMessage.message);
    }

    return bodyToEquipmentData(data as Body);
  }

  public async deleteEquipment(body: EquipmentData) {
    const { status } = await this.fetcher.delete(`/equipment/${body.id}`);

    return status === 200;
  }
}

const bodyToEquipmentData: (body: Body) => EquipmentData = (data: Body) => ({
  id: data.id,
  tag: data.tag,
  brand: data.brand,
  model: data.model,
  series: data.series,
});

const equipmentDataToBody: (
  equipmentData: Partial<EquipmentData>,
) => Partial<Body> = (data: Partial<EquipmentData>) => ({
  id: data.id,
  tag: data.tag,
  brand: data.brand,
  model: data.model,
  series: data.series,
});
