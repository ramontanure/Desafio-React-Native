import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {ProdutoVenda} from '../../redux/carrinho/types';
import {groupArrayByKey} from '../../util/helpers';
import {MODOS} from '../../util/constants';
import globalStyleCss from '../../util/global-style.css';
import ComboCarrinho from '../combo-carrinho';
import {ProdutoCarrinho} from '..';

interface Props {
  produtos: ProdutoVenda[];
  modo: string;
  onPressProduto(p: ProdutoVenda, b: boolean): void;
  onPressRemoveProduto(produto: ProdutoVenda): void;
}

export default class CarrinhoAgrupado extends React.Component<Props> {
  render() {
    const {produtos, modo} = this.props;
    const agrupado = groupArrayByKey(
      produtos,
      modo == MODOS.MESA ? 'posicao' : 'DSCOMANDA',
      'produtos',
    );
    return (
      <ScrollView>
        {agrupado.map((grupo: any, index: number) => (
          <View
            style={{
              paddingVertical: 8,
              paddingTop: index == 0 ? 0 : 8,
            }}
            key={index}>
            <View style={{paddingHorizontal: 16}}>
              <Text
                style={[globalStyleCss.text, {fontFamily: 'OpenSans-Bold'}]}>
                {modo == MODOS.MESA ? 'POSIÇÃO: ' : 'COMANDA: '}{' '}
                {modo == MODOS.MESA
                  ? Number(grupo.posicao) + 1
                  : grupo.DSCOMANDA}
              </Text>
            </View>
            {grupo.produtos.map((produto: ProdutoVenda, index: number) => {
              if (produto.produtosVenda.length > 0) {
                return (
                  <ComboCarrinho
                    produto={produto}
                    onPress={() => this.props.onPressProduto(produto, true)}
                    onPressRemove={() =>
                      this.props.onPressRemoveProduto(produto)
                    }
                  />
                );
              } else {
                return (
                  <ProdutoCarrinho
                    onPress={() => this.props.onPressProduto(produto, false)}
                    onPressRemove={() =>
                      this.props.onPressRemoveProduto(produto)
                    }
                    key={index}
                    produto={produto}
                  />
                );
              }
            })}
          </View>
        ))}
      </ScrollView>
    );
  }
}
