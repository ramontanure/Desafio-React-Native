import React from 'react';
import {numberToMoney} from '../util/helpers';
import {ScrollView, View, Text} from 'react-native';
import {ProdutoMin} from '../containers/conta/types';

interface Props {
  lista: ProdutoMin[];
}

export default class ListaProduto extends React.Component<Props> {
  renderItem = (e: any, index: number) => {
    return (
      <View key={index} style={{flexDirection: 'row', paddingVertical: 8}}>
        <Text style={{flex: 1}}>{e.nome}</Text>
        <Text>{numberToMoney(e.valorTotal)}</Text>
      </View>
    );
  };
  render() {
    let {lista} = this.props;
    return (
      <ScrollView contentContainerStyle={{padding: 8}}>
        {lista.map(this.renderItem)}
      </ScrollView>
    );
  }
}
