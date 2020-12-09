import React, { useMemo, useState } from 'react';
import { Divider, Input, List, ListItem } from '@ui-kitten/components';
import EquipmentFetcher, {
  EquipmentData,
} from '../../util/api/equipment/equipment';
import { useLang } from '../../util/contexts/lang_context';
import { useUser } from '../../util/contexts/user_context';
import { ListRenderItem, View, ViewStyle } from 'react-native';

type Props = {
  onEquipmentSelected?: (equipment: EquipmentData) => void;
  style?: ViewStyle;
};

export default function SearchBar({ onEquipmentSelected, style }: Props) {
  const [tag, tagHandler] = useState('');
  const [equipment, equipmentHandler] = useState<EquipmentData[]>([]);
  const { getPhrase } = useLang();
  const currentUser = useUser();

  const equipmentFetcher = useMemo(
    () => new EquipmentFetcher(currentUser.fetcher),
    [currentUser.fetcher],
  );

  const findTags = (value: string) => {
    tagHandler(value);

    const getData = async () => {
      if (value.length < 3) {
        equipmentHandler([]);
        return;
      }

      const data = await equipmentFetcher.getList({ tag: value });

      equipmentHandler(data);
    };
    getData();
  };

  const renderEquipmentItem: ListRenderItem<EquipmentData> = ({
    item,
    index,
  }) => (
    <ListItem
      key={index}
      title={item.tag}
      description={item.brand || getPhrase('N/A')}
      onPress={() => onEquipmentSelected && onEquipmentSelected(item)}
    />
  );

  return (
    <View style={style}>
      <Input
        size="large"
        placeholder={getPhrase('Search TAG')}
        value={tag}
        onChangeText={findTags}
      />
      <List
        data={equipment}
        ItemSeparatorComponent={Divider}
        renderItem={renderEquipmentItem}
      />
    </View>
  );
}
