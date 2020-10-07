import React from 'react';
import {View, Text} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import KebabMenu from './kebab-menu';

type Props = {
  item: any;
  index?: any;
  action?: JSX.Element | null;
};

export default function ItemListaInformation({
  item,
  index,
  action,
}: Props): JSX.Element {
  return (
    <View style={[globalStyleCss.scrollItem]} key={index}>
      <View style={{flex: 1}}>
        <Text
          style={[
            globalStyleCss.text,
            globalStyleCss.scrollItemText,
            {paddingBottom: 8},
          ]}>
          Código: {Number(item.NRNOTAFISCALCE)}
        </Text>
        <Text
          style={[
            globalStyleCss.text,
            globalStyleCss.scrollItemText,
            {paddingBottom: 8},
          ]}>
          Data: {item.DTVENDA}
        </Text>
        <Text style={[globalStyleCss.text, globalStyleCss.scrollItemText]}>
          Valor: R${item.VRTOTVENDA}
        </Text>
      </View>
      {action ? action : null}
    </View>
  );
}
