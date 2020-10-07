import React from 'react';
import {View, Text} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import {getStatus, getOrigem, capitalize} from '../util/helpers';
import {Loja, Pedido} from '../redux/delivery/types';

interface Props {
  currentLoja: Loja;
  pedido: Pedido;
}

export default class DetalheDelivery extends React.Component<Props> {
  render() {
    return (
      <View>
        <View style={{padding: 16, width: '100%', paddingTop: 6}}>
          <Text
            style={[
              globalStyleCss.text,
              {
                fontSize: 14,
                fontFamily: 'OpenSans-Bold',
              },
            ]}>
            DETALHES
          </Text>
        </View>
        <View style={{padding: 16, paddingTop: 0, paddingBottom: 8}}>
          <Text style={[globalStyleCss.text, {fontSize: 14}]}>
            Loja: {capitalize(this.props.currentLoja.nome)}
          </Text>
          <Text style={[globalStyleCss.text, {fontSize: 14, paddingTop: 8}]}>
            Status: {getStatus(this.props.pedido.status)}
          </Text>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={[globalStyleCss.text, {fontSize: 14, paddingTop: 8}]}>
              Endereço: {capitalize(this.props.pedido.endereco)} -{' '}
              {capitalize(this.props.pedido.bairro)}
            </Text>
          </View>
          <View>
            <Text style={[globalStyleCss.text, {fontSize: 14, paddingTop: 8}]}>
              Origem: {getOrigem(this.props.pedido.origem)}
            </Text>
            <Text style={[globalStyleCss.text, {fontSize: 14, paddingTop: 8}]}>
              Nome: {this.props.pedido.nome}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
