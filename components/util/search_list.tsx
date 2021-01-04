import React, { useState } from 'react';
import { Divider, Input, List, ListItem } from '@ui-kitten/components';
import { useLang } from '../../util/contexts/lang_context';
import { ListRenderItem, View, ViewStyle } from 'react-native';

export default function createSearchList<ItemType>(
  fetchFunc: (keyword: string) => Promise<ItemType[]>,
  translateFunc: (item: ItemType) => { title: string; description: string },
) {
  type Props = {
    onClickItem?: (item: ItemType) => void;
    minCharacters?: number;
    style?: ViewStyle;
  };

  return function SearchList({ minCharacters, onClickItem, style }: Props) {
    const [keyword, keywordHandler] = useState('');
    const [items, itemHandler] = useState<ItemType[]>([]);
    const { getPhrase } = useLang();

    const findItems = (value: string) => {
      keywordHandler(value);

      const getData = async () => {
        if (minCharacters && value.length < minCharacters) {
          itemHandler([]);
          return;
        }

        const data = await fetchFunc(value);

        itemHandler(data);
      };
      getData();
    };

    const renderEquipmentItem: ListRenderItem<ItemType> = ({ item, index }) => {
      const itemDescriptor = translateFunc(item);

      return (
        <ListItem
          key={index}
          title={itemDescriptor.title}
          description={itemDescriptor.description}
          onPress={() => onClickItem && onClickItem(item)}
        />
      );
    };

    return (
      <View style={style}>
        <Input
          size="large"
          placeholder={getPhrase('Search TAG')}
          value={keyword}
          onChangeText={findItems}
        />
        <List
          data={items}
          ItemSeparatorComponent={Divider}
          renderItem={renderEquipmentItem}
        />
      </View>
    );
  };
}
