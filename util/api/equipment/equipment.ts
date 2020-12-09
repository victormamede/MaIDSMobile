import ApiFetcher from '../api_fetcher';
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

    if (status === 200) {
      return bodyToEquipmentData(data as Body);
    } else {
      throw new Error('Equipment not found');
    }
  }
}

const bodyToEquipmentData = (data: Body) => ({
  id: data.id,
  tag: data.tag,
  brand: data.brand,
  model: data.model,
  series: data.series,
});
