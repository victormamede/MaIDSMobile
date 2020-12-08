import ApiFetcher from '../api_fetcher';

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

  public async getList(): Promise<EquipmentData[]> {
    const { data } = await this.fetcher.get<Body[]>('/equipment');

    return (data as Body[])
      .map(bodyToEquipmentData)
      .sort((el1, el2) => (el1.tag > el2.tag ? 1 : -1));
  }

  public async getEquipmentData(id: number): Promise<EquipmentData> {
    const { data } = await this.fetcher.get<Body>(`/equipment/${id}`);

    return bodyToEquipmentData(data as Body);
  }
}

const bodyToEquipmentData = (data: Body) => ({
  id: data.id,
  tag: data.tag,
  brand: data.brand,
  model: data.model,
  series: data.series,
});
