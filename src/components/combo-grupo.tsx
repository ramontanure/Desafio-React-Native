import React from 'react';
import {View, Text, Image} from 'react-native';
import {Grupo} from '../redux/dataset/types';
import globalStyleCss from '../util/global-style.css';

interface Props {
  grupo: any;
  adicionados: number;
}

export default class TituloCombo extends React.Component<Props> {
  getMinMax = () => {
    let {
      grupo: {minimo, maximo},
      adicionados,
    } = this.props;
    if (minimo == 0) return `Até ${maximo}`;
    else if (minimo == 1 && maximo == 1) return `${adicionados} de ${maximo}`;
    else return `De ${minimo} até ${maximo}`;
  };

  render() {
    let {grupo, adicionados} = this.props;
    return (
      <View
        style={[
          {
            padding: 16,
            width: '100%',
            backgroundColor: 'e1e2e1',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, paddingRight: 4}}>
            <Text
              style={[
                globalStyleCss.text,
                globalStyleCss.scrollItemText,
                {fontFamily: 'OpenSans-Bold'},
              ]}>
              {grupo.nome}
            </Text>
            <Text
              style={[
                globalStyleCss.text,
                {fontSize: 12, fontFamily: 'OpenSans_Light'},
              ]}>
              {this.getMinMax()}
            </Text>
          </View>

          {grupo.minimo > 0 && (
            <View
              style={{
                padding: 8,
                borderRadius: 2,
                backgroundColor:
                  grupo.minimo > adicionados ? globalStyleCss : 'white',
                justifyContent: 'center',
              }}>
              {grupo.minimo > adicionados ? (
                <Text
                  style={[
                    globalStyleCss.text,
                    {
                      fontSize: 12,
                      fontFamily: 'OpenSans_Light',
                      color: 'white',
                      backgroundColor: '#333',
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                      borderRadius: 16,
                    },
                  ]}>
                  OBRIGATÓRIO
                </Text>
              ) : (
                false
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}
