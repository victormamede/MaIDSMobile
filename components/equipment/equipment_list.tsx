import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
} from 'react';
import { StyleSheet } from 'react-native';
import { useUser } from '../../util/contexts/user_context';
import createSearchList, { SearchListRef } from '../util/search_list';
import { useLang } from '../../util/contexts/lang_context';
import EquipmentFetcher, {
  EquipmentData,
} from '../../util/api/equipment/equipment';

type Props = {
  onPress?: (userId: number) => void;
};
export type EquipmentListRef = SearchListRef;

const EquipmentListRender: ForwardRefRenderFunction<EquipmentListRef, Props> = (
  { onPress },
  ref,
) => {
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
      description: equipment.brand || getPhrase('N/A'),
    })),
    [getEquipment],
  );

  return (
    <SearchList
      ref={ref}
      style={styles.container}
      onClickItem={(item) => onPress && onPress(item.id)}
      label={getPhrase('Search TAG')}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const EquipmentList = forwardRef(EquipmentListRender);
export default EquipmentList;
