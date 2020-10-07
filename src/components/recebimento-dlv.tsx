import React from 'react';
import {View, Text} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import {RecebimentoDelivery} from '../redux/delivery/types';
import {
  getTotalRecebimento,
  getTroco,
  numberToMoney,
  capitalize,
} from '../util/helpers';

export interface Props {
  recebimentos: RecebimentoDelivery[];
}
export default class RecebimentosDelivery extends React.Component<Props> {
  render() {
    return (
      <View>
        <View style={{padding: 16}}>
          <Text
            style={[
              globalStyleCss.text,
              {fontSize: 14, fontFamily: 'OpenSans-Bold'},
            ]}>
            RECEBIMENTOS
          </Text>
        </View>
        <View
          style={{
            padding: 12,
            paddingVertical: 0,
          }}>
          {this.props.recebimentos.map(recebimento => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 8,
              }}>
              <Text style={[globalStyleCss.text]}>
                {capitalize(recebimento.nome)}
              </Text>
              <Text style={[globalStyleCss.text]}>
                {numberToMoney(parseFloat(recebimento.valor))}
              </Text>
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 8,
              paddingLeft: 4,
            }}>
            <Text style={[globalStyleCss.text]}>Troco: </Text>
            <Text style={[globalStyleCss.text]}>
              {numberToMoney(
                getTroco(
                  this.props.recebimentos,
                  getTotalRecebimento(this.props.recebimentos),
                ),
              )}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 8,
              paddingLeft: 4,
            }}>
            <Text style={[globalStyleCss.text]}>Total: </Text>
            <Text style={[globalStyleCss.text]}>
              {numberToMoney(getTotalRecebimento(this.props.recebimentos))}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
