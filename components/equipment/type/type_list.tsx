import React, { useEffect, useState } from 'react';
import { useUser } from '../../../util/contexts/user_context';
import { useLang } from '../../../util/contexts/lang_context';
import EquipmentTypeFetcher, {
  EquipmentTypeData,
} from '../../../util/api/equipment/equipment_type';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { FieldError } from 'react-hook-form';

type Props = {
  onChange?: (type: EquipmentTypeData | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  value?: EquipmentTypeData;
  error?: FieldError;
};

export default function TypeList({
  onChange,
  onFocus,
  onBlur,
  value,
  error,
}: Props) {
  const [typeList, typeListHandler] = useState<EquipmentTypeData[]>([]);

  const currentUser = useUser();
  const { getPhrase } = useLang();

  useEffect(() => {
    const getList = async () => {
      const fetcher = new EquipmentTypeFetcher(currentUser.fetcher);
      const data = await fetcher.getList();

      typeListHandler(data);
    };

    getList();
  }, [currentUser.fetcher]);

  return (
    <Select
      label={getPhrase('Equipment Type')}
      value={value?.description}
      status={error && 'danger'}
      onFocus={onFocus}
      onBlur={onBlur}
      caption={error && getPhrase('Input is required')}
      onSelect={(item) =>
        onChange && onChange(typeList[(item as IndexPath).row])
      }
      selectedIndex={
        new IndexPath(typeList.findIndex((element) => element.id === value?.id))
      }>
      {typeList.map((item, index) => (
        <SelectItem key={index} title={item.description} />
      ))}
    </Select>
  );
}
