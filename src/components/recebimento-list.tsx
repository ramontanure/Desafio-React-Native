import React from 'react';
import {TipoRecebimento, ParamsRecebimento} from '../redux/dataset/types';
import {Recebimento} from '../redux/dataSale/types';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import {getTotalPorTipo, numberToMoney} from '../util/helpers';

interface Props {
  modosRecebimento: ParamsRecebimento[];
  recebimentos: Recebimento[];
  onPressItem(tipo: TipoRecebimento): void;
  toggleSelected(): void;
  isGrupoSelected: boolean;
}

interface State {
  selectedGroup: number;
}

export default class RecebimentoList extends React.Component<Props, State> {
  state: State = {
    selectedGroup: 0,
  };

  render() {
    let {modosRecebimento, recebimentos} = this.props;
    return (
      <ScrollView contentContainerStyle={{flexGrow: 0}} style={{flexGrow: 0}}>
        {!this.props.isGrupoSelected ? (
          <View>
            <Text
              style={[
                globalStyleCss.text,
                {
                  fontFamily: 'OpenSans-Bold',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                },
              ]}>
              GRUPOS
            </Text>
            {modosRecebimento.map(
              (
                modo: ParamsRecebimento,
                index: number,
                arr: ParamsRecebimento[],
              ) => {
                let valorTotal = modo.tipos.reduce(
                  (acc, current) =>
                    acc + getTotalPorTipo(recebimentos, current),
                  0,
                );
                return (
                  <TouchableOpacity
                    key={index}
                    style={[globalStyleCss.scrollItem]}
                    onPress={() => {
                      this.props.toggleSelected();
                      this.setState({
                        selectedGroup: index,
                      });
                    }}>
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: modo.color,
                        marginRight: 8,
                      }}
                    />
                    <Text
                      style={[
                        globalStyleCss.text,
                        globalStyleCss.scrollItemText,
                        {flex: 1},
                      ]}>
                      {modo.nome}
                    </Text>
                    {valorTotal > 0 && (
                      <Text style={globalStyleCss.scrollItemText}>
                        {numberToMoney(valorTotal)}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        ) : (
          <View>
            <Text
              onPress={() => this.props.toggleSelected()}
              style={[
                globalStyleCss.text,
                {
                  fontFamily: 'OpenSans-Bold',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                },
              ]}>
              GRUPOS / {modosRecebimento[this.state.selectedGroup].nome}
            </Text>
            {modosRecebimento[this.state.selectedGroup].tipos.map(
              (
                tipo: TipoRecebimento,
                index: number,
                arr: TipoRecebimento[],
              ) => {
                let valorTotal = getTotalPorTipo(recebimentos, tipo);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      globalStyleCss.scrollItem,
                      {
                        justifyContent: 'space-between',
                      },
                    ]}
                    onPress={() => this.props.onPressItem(tipo)}>
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: tipo.color,
                        marginRight: 8,
                      }}
                    />
                    <Text style={[globalStyleCss.scrollItemText, {flex: 1}]}>
                      {tipo.nome}
                    </Text>
                    {valorTotal > 0 && (
                      <Text style={globalStyleCss.scrollItemText}>
                        {numberToMoney(valorTotal)}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}
