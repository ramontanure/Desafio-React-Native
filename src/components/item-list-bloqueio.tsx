import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from '.';
import globalStyleCss from '../util/global-style.css';

type Props = {
  item: any;
  source: any;
  onPress(): void;
};

export default function ItemListBloqueio({item, onPress, source}: Props) {
  return (
    <View
      style={[
        globalStyleCss.scrollItem,
        {
          opacity: item.isBloqueado ? 0.5 : 1,
          flex: 1,
          padding: 0,
        },
      ]}>
      <Text
        style={[
          globalStyleCss.text,
          globalStyleCss.scrollItemText,
          {paddingHorizontal: 12},
        ]}>
        {item.nome}
      </Text>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        <Icon source={source} onPress={onPress} />
      </View>
    </View>
  );
}
