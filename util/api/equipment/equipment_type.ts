import ApiFetcher, { ErrorMessage } from '../api_fetcher';
import { objectToUrlEncoded } from '../../helper/objects';

export type EquipmentTypeData = {
  id: number;
  description: string;
};

export type Body = {
  id: number;
  description: string;
};

export default class EquipmentTypeFetcher {
  constructor(private fetcher: ApiFetcher) {}

  public async getList(
    filters?: Partial<EquipmentTypeData>,
  ): Promise<EquipmentTypeData[]> {
    let filterString = '';
    if (filters != null) {
      filterString = objectToUrlEncoded(filters);
    }

    const { data } = await this.fetcher.get<Body[]>(
      '/equipment/type' + filterString,
    );

    return (data as Body[])
      .map(bodyToEquipmentTypeData)
      .sort((el1, el2) => (el1.description > el2.description ? 1 : -1));
  }

  public async getEquipmentTypeData(id: number): Promise<EquipmentTypeData> {
    const { status, data } = await this.fetcher.get<Body>(
      `/equipment/type/${id}`,
    );

    if (status !== 200) {
      throw new Error('Equipment type ID not valid');
    }

    return bodyToEquipmentTypeData(data as Body);
  }

  public async updateEquipmentType(
    id: number,
    body: Partial<EquipmentTypeData>,
  ) {
    const { data, status } = await this.fetcher.put<Body>(
      `/equipment/type/${id}`,
      equipmentTypeDataToBody(body),
    );

    if (status !== 200) {
      const errorMessage = data as ErrorMessage;

      throw new Error(errorMessage.message);
    }

    return bodyToEquipmentTypeData(data as Body);
  }

  public async createEquipmentType(body: EquipmentTypeData) {
    const { data, status } = await this.fetcher.post<Body>(
      '/equipment/type',
      equipmentTypeDataToBody(body),
    );

    if (status !== 201) {
      const errorMessage = data as ErrorMessage;

      throw new Error(errorMessage.message);
    }

    return bodyToEquipmentTypeData(data as Body);
  }

  public async deleteEquipmentType(body: EquipmentTypeData) {
    const { status } = await this.fetcher.delete(`/equipment/type/${body.id}`);

    return status === 200;
  }
}

const bodyToEquipmentTypeData: (body: Body) => EquipmentTypeData = (
  data: Body,
) => ({
  id: data.id,
  description: data.description,
});

const equipmentTypeDataToBody: (
  equipmentData: Partial<EquipmentTypeData>,
) => Partial<Body> = (data: Partial<EquipmentTypeData>) => ({
  id: data.id,
  description: data.description,
});
