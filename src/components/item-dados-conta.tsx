import React from 'react';
import {View, Text} from 'react-native';
import globalStyleCss from '../util/global-style.css';
export class ItemDadosConta extends React.Component<{
  nome: string;
  valor: string;
  bold?: boolean;
}> {
  render() {
    const {nome, valor, bold} = this.props;
    return (
      <View
        style={[
          globalStyleCss.text,
          {flexDirection: 'row', paddingVertical: 8},
        ]}>
        <Text
          style={[
            globalStyleCss.text,
            {flex: 1},
            bold && {fontFamily: 'OpenSans-Bold'},
          ]}>
          {nome}
        </Text>
        <Text
          style={[globalStyleCss.text, bold && {fontFamily: 'OpenSans-Bold'}]}>
          {valor}
        </Text>
      </View>
    );
  }
}
