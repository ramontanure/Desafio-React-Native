import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import globalStyleCss, {COLOR} from '../util/global-style.css';
import {ProdutoVenda} from '../redux/carrinho/types';
import {numberToMoney, getComboPreco, calcDescontoPreco} from '../util/helpers';
import KebabMenu from './kebab-menu';
import {Icon} from '.';
import {Desconto} from '../redux/dataSale/types';

interface Props {
  produto: ProdutoVenda;
  lenght: number;
  onPress(): void;
  onPressRemove(): void;
  index: number;
  desconto: Desconto;
}

export default class ComboCarrinho extends React.Component<Props> {
  state = {
    isChildrenVisible: false,
    isClickAllowed: true,
  };

  onPressHandler = (func: any) => {
    if (this.state.isClickAllowed) {
      this.setState({isClickAllowed: false});
      func();
      setTimeout(() => {
        this.setState({isClickAllowed: true});
      }, 1000);
    }
  };

  render() {
    let {produto, onPress, index, lenght} = this.props;
    return (
      <View
        style={[
          globalStyleCss.scrollItem,
          {borderBottomWidth: index == lenght - 1 ? 0 : 1},
        ]}>
        <TouchableOpacity onPress={onPress}>
          <View style={{flex: 1, paddingRight: 8}}>
            <View style={{paddingVertical: 4}}>
              <Text
                style={[globalStyleCss.text, globalStyleCss.scrollItemText]}>
                {produto.quantidade.toFixed(2)}x {produto.nome}
              </Text>
            </View>
            {produto.produtosVenda.map(
              (produto: ProdutoVenda, index: number) => (
                <View key={index} style={{padding: 4, paddingLeft: 8}}>
                  <Text
                    style={[
                      globalStyleCss.text,
                      globalStyleCss.scrollItemText,
                    ]}>
                    {produto.quantidade.toFixed(2)}x {produto.nome}
                  </Text>
                </View>
              ),
            )}

            <View>
              <Text
                style={[globalStyleCss.text, globalStyleCss.scrollItemText]}>
                {numberToMoney(
                  getComboPreco(produto) -
                    calcDescontoPreco(
                      this.props.desconto,
                      getComboPreco(produto),
                    ),
                )}
              </Text>
            </View>
          </View>
          <Icon
            source={require('./../assets/lixeira.png')}
            onPress={this.props.onPressRemove}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
