import React from 'react';
import { TextProps } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useLang } from '../../util/contexts/lang_context';

interface Props extends TextProps {
  children: string;
}

export default function TranslatedText(props: Props) {
  const { getPhrase } = useLang();

  return <Text {...props}>{getPhrase(props.children)}</Text>;
}
