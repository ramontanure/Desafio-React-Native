import React from 'react';
import {numberToMoney, getTotalPedido, capitalize} from '../util/helpers';
import globalStyleCss from '../util/global-style.css';
import {View, Text} from 'react-native';
import Header from './header';
import {ProdutoDelivery} from '../redux/delivery/types';

interface Props {
  produtos: ProdutoDelivery[];
}

export default class ProdutosDelivery extends React.Component<Props> {
  render() {
    return (
      <View>
        <View style={{padding: 16}}>
          <Text
            style={[
              globalStyleCss.text,
              {
                fontSize: 14,
                fontFamily: 'OpenSans-Bold',
              },
            ]}>
            PRODUTOS
          </Text>
        </View>
        <View style={{padding: 16, paddingTop: 0, paddingBottom: 8}}>
          {this.props.produtos.map(produto => (
            <View
              style={{
                paddingBottom: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[globalStyleCss.text, globalStyleCss.scrollItemText]}>
                {parseFloat(produto.quantidade)}x {capitalize(produto.nome)}
              </Text>
              <Text style={[globalStyleCss.text]}>
                {numberToMoney(parseFloat(produto.preco))}
              </Text>
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={[globalStyleCss.text, {fontFamily: 'OpenSans'}]}>
              Total:
            </Text>
            <Text style={[globalStyleCss.text, {fontFamily: 'OpenSans'}]}>
              {numberToMoney(getTotalPedido(this.props.produtos))}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
