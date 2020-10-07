import React from 'react';
import { View, Text } from 'react-native';
import { Recebimento } from '../redux/dataSale/types';
import globalStyleCss from '../util/global-style.css';
import { numberToMoney } from '../util/helpers';
import { TIPO_RECE } from '../util/constants';
import recebimento from '../containers/recebimento';
import KebabMenu from './kebab-menu';

interface Props {
  index: number;
  recebimentos: Recebimento[];
  recebimento: Recebimento;
  onPressRemover(recebimento: Recebimento): void;
}

export default class RecebimentoListItem extends React.Component<Props> {
  state = {};

  onPressKebabItem = (recebimento: Recebimento) => {
    this.props.onPressRemover(recebimento);
  };

  render() {
    let { index, recebimentos, recebimento } = this.props;
    let recebeMessage =
      recebimento.tipo.tipoRece == TIPO_RECE.CREDITO ||
        recebimento.tipo.tipoRece == TIPO_RECE.DEBITO
        ? 'Estonar recebimento'
        : 'Remover recebimento';
    return (
      <View
        style={[globalStyleCss.scrollItem, { justifyContent: 'space-between' }]}
        key={index}>
        <View>
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              { marginBottom: 4 },
            ]}>
            {recebimento.tipo.nome}
          </Text>
          <Text style={[globalStyleCss.text, globalStyleCss.scrollItemText]}>
            {numberToMoney(recebimento.valor)}
          </Text>
        </View>
        <KebabMenu
          actions={[
            {
              name: recebeMessage,
              onPress: () => this.onPressKebabItem(recebimento),
            },
          ]}
        />
      </View>
    );
  }
}
