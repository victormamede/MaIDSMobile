import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useUser } from '../../util/contexts/user_context';
import createSearchList from '../util/search_list';
import { useLang } from '../../util/contexts/lang_context';
import EquipmentFetcher, {
  EquipmentData,
} from '../../util/api/equipment/equipment';

type Props = {
  onPress?: (userId: number) => void;
};

export default function EquipmentList({ onPress }: Props) {
  const currentUser = useUser();
  const { getPhrase } = useLang();

  const getEquipment = useCallback(
    async (keyword: string) => {
      const fetcher = new EquipmentFetcher(currentUser.fetcher);
      const data = await fetcher.getList({ tag: keyword });

      return data;
    },
    [currentUser],
  );

  const SearchList = useCallback(
    createSearchList<EquipmentData>(getEquipment, (equipment) => ({
      title: equipment.tag,
      description: equipment.model || getPhrase('N/A'),
    })),
    [getEquipment],
  );

  return (
    <SearchList
      style={styles.container}
      onClickItem={(item) => onPress && onPress(item.id)}
      label={getPhrase('Find TAG')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
