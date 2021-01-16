import React, { useEffect, useState } from 'react';
import {
  IndexPath,
  Select,
  SelectItem,
  SelectProps,
} from '@ui-kitten/components';
import { ImageProps } from 'react-native';
import { RenderProp } from '@ui-kitten/components/devsupport';

type Label = {
  title: string;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
};

export default function SimpleSelect<T>(
  props: SelectProps & {
    onChange?: (value: T | null) => void;
    items: T[];
    labelFactory: (item: T) => Label;
    selectIndex?: number;
    onNew?: () => void;
    newLabel?: string;
  },
) {
  const [selectedItemIndex, selectHandler] = useState(-1);
  const { onChange, items, labelFactory, selectIndex, newLabel, onNew } = props;

  useEffect(() => {
    selectHandler(selectIndex == null ? -1 : selectIndex);
  }, [selectIndex]);

  const selectedItem =
    selectedItemIndex >= 0 ? items[selectedItemIndex] : undefined;

  let selectLabel: string | undefined;
  if (selectedItemIndex === items.length) {
    selectLabel = newLabel;
  } else {
    selectLabel = selectedItem && labelFactory(selectedItem).title;
  }

  return (
    <Select
      {...props}
      value={selectLabel}
      onSelect={(row) => {
        const selected = (row as IndexPath).row;
        selectHandler(selected);

        if (selected === items.length) {
          onNew && onNew();
          onChange && onChange(null);
        } else {
          onChange && onChange(items[selected]);
        }
      }}>
      {[
        ...items.map((item, index) => {
          const label = labelFactory(item);
          return (
            <SelectItem
              key={index}
              title={label.title}
              accessoryLeft={label.accessoryLeft}
            />
          );
        }),
        onNew != null ? (
          <SelectItem key={items.length} title={newLabel || ''} />
        ) : (
          <></>
        ),
      ]}
    </Select>
  );
}
