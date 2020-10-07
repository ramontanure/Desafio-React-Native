import React from 'react';
import {ProdutoMin} from '../containers/parcial/types';
import {View, Text} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import {numberToMoney} from '../util/helpers';
import {capitalize} from 'lodash';

type Props = {
  produto: ProdutoMin;
  index: any;
};

export default function ProdComanda({produto, index}: Props): JSX.Element {
  return (
    <View style={{paddingVertical: 8}} key={index}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={[globalStyleCss.text, {fontFamily: 'OpenSans-Bold', flex: 1}]}>
          {parseFloat(produto.quantidade.replace(',', '.'))}x{' '}
          {capitalize(produto.nome)}
        </Text>
        <Text style={[globalStyleCss.text, {}]}>
          {numberToMoney(
            produto.preco * parseFloat(produto.quantidade.replace(',', '.')),
          )}
        </Text>
      </View>
      <Text style={[globalStyleCss.text, {paddingVertical: 4}]}>
        {produto.data}
      </Text>
      {produto.TXPRODCOMVEN && (
        <Text style={[globalStyleCss.text, {paddingVertical: 4}]}>
          {produto.TXPRODCOMVEN}
        </Text>
      )}
    </View>
  );
}
