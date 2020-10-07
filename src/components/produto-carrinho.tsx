import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import globalStyleCss, { COLOR } from '../util/global-style.css';
import { ProdutoVenda } from '../redux/carrinho/types';
import { numberToMoney, getPrecoProduto, getObsProd } from '../util/helpers';
import KebabMenu from './kebab-menu';
import { Icon } from '.';

interface Props {
  produto: ProdutoVenda;
  onPress(): void;
  onPressRemove(): void;
  hideBorder?: boolean;
  index: number;
  lenght: number;
}

interface State {
  isClickAllowed: boolean;
}

export default class ProdutoCarrinho extends React.Component<Props> {
  state: State = {
    isClickAllowed: true,
  };

  onPressHandler = (func: any) => {
    if (this.state.isClickAllowed) {
      this.setState({ isClickAllowed: false });
      func();
      setTimeout(() => {
        this.setState({ isClickAllowed: true });
      }, 1000);
    }
  };

  teste = () => { };

  render() {
    let { produto, onPress, index, lenght } = this.props;
    return (
      <View
        style={[
          globalStyleCss.scrollItem,
          {
            justifyContent: 'space-between',
            paddingTop: index == 0 ? 0 : 16,
            borderBottomWidth: index == lenght - 1 ? 0 : 1,
          },
        ]}>
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <View style={{ paddingVertical: 4 }}>
              <Text
                style={[globalStyleCss.text, globalStyleCss.scrollItemText]}>
                {produto.quantidade.toFixed(2)}x {produto.nome}
              </Text>
            </View>
            <View>
              {(produto.selectedOpcionais.length > 0 ||
                produto.observacaoManual.length > 0) && (
                  <Text style={[globalStyleCss.text, { paddingBottom: 4 }]}>
                    {getObsProd(
                      produto.selectedOpcionais,
                      produto.observacaoManual,
                    )}
                  </Text>
                )}
              <Text style={[globalStyleCss.text]}>
                {numberToMoney(getPrecoProduto(produto))}
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
