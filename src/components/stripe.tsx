import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  numberToMoney,
  calcDescontoPreco,
  calcRestanteReceber,
} from '../util/helpers';
import globalStyleCss from '../util/global-style.css';
import {Desconto} from '../redux/dataSale/types';

interface Props {
  troco: number;
  faltante: number;
  total: number;
  desconto?: Desconto;
  valorPago: number;
  servico: number;
}

interface State {}

export default class ValoresRecebimento extends React.Component<Props> {
  state: State = {};

  render() {
    let {troco, valorPago, faltante, total, servico} = this.props;
    console.log(faltante);
    return (
      <View style={{paddingVertical: 8}}>
        <View style={globalStyleCss.scrollItem}>
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              {flex: 1, fontFamily: 'OpenSans-Bold', color: '#ccc'},
            ]}>
            TOTAL DA CONTA
          </Text>
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              {fontFamily: 'OpenSans-Bold', color: '#ccc'},
            ]}>
            {numberToMoney(total)}
          </Text>
        </View>
        <View style={globalStyleCss.scrollItem}>
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              {flex: 1, fontFamily: 'OpenSans-Bold', color: '#ccc'},
            ]}>
            VALOR PAGO
          </Text>
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              {fontFamily: 'OpenSans-Bold', color: '#ccc'},
            ]}>
            {numberToMoney(valorPago)}
          </Text>
        </View>
        <View style={globalStyleCss.scrollItem}>
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              {flex: 1, fontFamily: 'OpenSans-Bold', color: '#ccc'},
            ]}>
            TOTAL A PAGAR
          </Text>
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              {fontFamily: 'OpenSans-Bold', color: '#ccc'},
            ]}>
            {numberToMoney(faltante)}
          </Text>
        </View>
        <View style={[globalStyleCss.scrollItem, {borderBottomWidth: 0}]}>
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              {flex: 1, fontFamily: 'OpenSans-Bold', color: '#ccc'},
            ]}>
            TROCO
          </Text>
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              {fontFamily: 'OpenSans-Bold', color: '#ccc'},
            ]}>
            {numberToMoney(troco)}
          </Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  stripe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
});
