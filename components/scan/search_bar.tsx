import React, { useCallback, useMemo } from 'react';
import EquipmentFetcher, {
  EquipmentData,
} from '../../util/api/equipment/equipment';
import { useLang } from '../../util/contexts/lang_context';
import { useUser } from '../../util/contexts/user_context';
import { ViewStyle } from 'react-native';
import createSearchList from '../util/search_list';

type Props = {
  onEquipmentSelected?: (equipment: EquipmentData) => void;
  style?: ViewStyle;
};

export default function SearchBar({ onEquipmentSelected, style }: Props) {
  const { getPhrase } = useLang();
  const currentUser = useUser();

  const equipmentFetcher = useMemo(
    () => new EquipmentFetcher(currentUser.fetcher),
    [currentUser.fetcher],
  );

  const getData = async (value: string) => {
    const data = await equipmentFetcher.getList({ tag: value });

    return data;
  };

  const SearchList = useCallback(
    createSearchList<EquipmentData>(getData, (equipment) => ({
      title: equipment.tag,
      description: equipment.brand || getPhrase('N/A'),
    })),
    [],
  );

  return (
    <SearchList
      style={style}
      label={getPhrase('Search TAG')}
      onClickItem={onEquipmentSelected}
      minCharacters={3}
      clearOnSelect
    />
  );
}
