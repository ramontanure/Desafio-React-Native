import React from 'react';
import {Produto} from '../../redux/dataset/types';
import Lista from '../lista';

interface Props {
  produtos: Produto[];
  onPressItem(item: any): void;
}

export default class ProdutoSimples extends React.Component<Props> {
  render() {
    let {produtos, onPressItem} = this.props;
    return (
      <Lista
        item={produtos}
        itemKeyLeft="nome"
        ball
        onPress={onPressItem}
        itemKeyColor="color"
        itemKeyRight="preco"
        isPreco
      />
    );
  }
}
