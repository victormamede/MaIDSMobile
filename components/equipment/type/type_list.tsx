import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useUser } from '../../../util/contexts/user_context';
import { useLang } from '../../../util/contexts/lang_context';
import EquipmentTypeFetcher, {
  EquipmentTypeData,
} from '../../../util/api/equipment/equipment_type';
import { FieldError } from 'react-hook-form';
import SimpleSelect from '../../util/form/simple_select';

type Props = {
  onChange?: (type: EquipmentTypeData | null) => void;
  onNew?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  value?: EquipmentTypeData;
  error?: FieldError;
};
export type TypeListRef = { refreshList: () => Promise<void> };

const TypeList: ForwardRefRenderFunction<TypeListRef, Props> = (
  { onChange, onFocus, onBlur, value, error, onNew },
  ref,
) => {
  const [typeList, typeListHandler] = useState<EquipmentTypeData[]>([]);

  const currentUser = useUser();
  const { getPhrase } = useLang();

  const getList = useCallback(async () => {
    const fetcher = new EquipmentTypeFetcher(currentUser.fetcher);
    const data = await fetcher.getList();
    data.sort((el1, el2) =>
      el1.description.toUpperCase() > el2.description.toUpperCase() ? 1 : -1,
    );

    typeListHandler(data);
  }, [currentUser.fetcher]);

  useImperativeHandle(ref, () => ({
    refreshList: getList,
  }));

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <SimpleSelect
      label={getPhrase('Equipment Type')}
      status={error && 'danger'}
      onFocus={onFocus}
      onBlur={onBlur}
      caption={error && getPhrase('Input is required')}
      items={typeList}
      labelFactory={(item) => ({ title: item.description })}
      placeholder={getPhrase('Select Type')}
      onChange={(selected) => {
        onChange &&
          onChange(
            selected == null
              ? null
              : typeList.find((item) => item.id === selected.id) || null,
          );
      }}
      selectIndex={value && typeList.findIndex((item) => item.id === value.id)}
      onNew={onNew}
      newLabel={getPhrase('New')}
    />
  );
};

export default forwardRef(TypeList);
