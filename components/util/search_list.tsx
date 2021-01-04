import React, { useCallback, useEffect, useState } from 'react';
import { Divider, Input, List, ListItem } from '@ui-kitten/components';
import {
  ImageProps,
  ListRenderItem,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export default function createSearchList<ItemType>(
  fetchFunc: (keyword: string) => Promise<ItemType[]>,
  translateFunc: (
    item: ItemType,
  ) => {
    title: string;
    description: string;
    avatar?: (props?: Partial<ImageProps> | undefined) => JSX.Element;
  },
) {
  type Props = {
    onClickItem?: (item: ItemType) => void;
    minCharacters?: number;
    style?: ViewStyle;
    label: string;
  };

  const SearchList: React.FunctionComponent<Props> = ({
    minCharacters,
    onClickItem,
    style,
    label,
  }: Props) => {
    const [keyword, keywordHandler] = useState('');
    const [loading, loadHandler] = useState(false);
    const [items, itemHandler] = useState<ItemType[]>([]);

    const findItems = useCallback(
      (value: string) => {
        keywordHandler(value);

        const getData = async () => {
          if (minCharacters && value.length < minCharacters) {
            itemHandler([]);
            return;
          }
          loadHandler(true);
          const data = await fetchFunc(value);
          loadHandler(false);

          itemHandler(data);
        };
        getData();
      },
      [minCharacters],
    );

    useEffect(() => {
      findItems('');
    }, [findItems]);

    const renderEquipmentItem: ListRenderItem<ItemType> = ({ item, index }) => {
      const itemDescriptor = translateFunc(item);

      return (
        <ListItem
          key={index}
          title={itemDescriptor.title}
          accessoryLeft={itemDescriptor.avatar}
          description={itemDescriptor.description}
          onPress={() => onClickItem && onClickItem(item)}
        />
      );
    };

    return (
      <View style={style}>
        <Input
          style={styles.searchBar}
          size="large"
          placeholder={label}
          value={keyword}
          onChangeText={findItems}
        />
        <List
          data={items}
          ItemSeparatorComponent={Divider}
          renderItem={renderEquipmentItem}
          onRefresh={() => findItems(keyword)}
          refreshing={loading}
        />
      </View>
    );
  };

  return SearchList;
}

const styles = StyleSheet.create({
  searchBar: {
    margin: 8,
  },
});
