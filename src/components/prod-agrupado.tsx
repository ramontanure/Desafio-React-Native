import * as React from 'react';
import {View, Text} from 'react-native';
import {capitalize, numberToMoney} from '../util/helpers';
import globalStyleCss from '../util/global-style.css';

interface Props {
  agrupamento: any[];
  isPosition?: boolean;
}

export default class ProdutosAgrupados extends React.Component<Props> {
  render() {
    const {agrupamento, isPosition} = this.props;
    return (
      <>
        {agrupamento.map((item, index) => {
          return (
            <View
              style={{
                borderBottomColor: '#e1e1e1',
              }}>
              <Text
                style={[
                  globalStyleCss.text,
                  {fontSize: 14, paddingVertical: 8, fontWeight: 'bold'},
                ]}>
                {!isPosition ? item.posicao : `Posição ${item.posicao}`}:
              </Text>
              {item.produtos.map((produto: any) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 8,
                    }}>
                    <Text
                      style={[
                        globalStyleCss.text,
                        {
                          paddingLeft: 4,
                          flex: 1,
                        },
                      ]}>
                      {parseFloat(produto.quantidade.replace(',', '.')).toFixed(
                        2,
                      )}
                      x{capitalize(produto.nome)}
                    </Text>
                    <Text style={globalStyleCss.text}>
                      {numberToMoney(
                        produto.preco *
                          parseFloat(produto.quantidade.replace(',', '.')),
                      )}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </>
    );
  }
}
