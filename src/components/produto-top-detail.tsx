import React from 'react';
import {View, Dimensions, Image, Text} from 'react-native';
import {ProdutoVenda} from '../redux/carrinho/types';
import {NO_IMAGE} from '../util/constants';
import globalStyleCss from '../util/global-style.css';
import {NavigationScreenProp} from 'react-navigation';
import {numberToMoney, calcDescontoPreco} from '../util/helpers';
import {ProdutoComboInterface} from '../redux/dataset/types';
import {Desconto} from '../redux/dataSale/types';

interface Props {
  produto: ProdutoVenda;
  navigation: NavigationScreenProp<any>;
  desconto?: Desconto;
}

class ProdutoTopDetail extends React.Component<Props> {
  showPrice = (price: any) => {
    let resultPrice = '';
    if (this.props.navigation.getParam('isChild')) {
      if (this.props.navigation.getParam('cobraFilho')) {
        resultPrice = price;
      }
    } else {
      resultPrice = price;
    }
    return resultPrice;
  };

  getDesconto = (produto: ProdutoComboInterface) => {
    if (produto.valorDesconto == 0) return 0;
    if (produto.tipoDesconto == 'P') {
      return (produto.preco * produto.valorDesconto) / 100;
    } else {
      return produto.valorDesconto;
    }
  };

  setDesconto = (produto: ProdutoVenda): Desconto => {
    return {
      valor: produto.valorDesconto,
      tipo: produto.tipoDesconto == 'P' ? 'PERCENTUAL' : 'VALOR',
    };
  };

  render() {
    const {produto} = this.props;
    return (
      <View
        style={{
          backgroundColor: 'white',
        }}>
        {produto.urlImg && (
          <Image
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.25,
            }}
            source={{uri: produto.urlImg || NO_IMAGE}}
            resizeMode="contain"
          />
        )}
        <View style={{padding: 16}}>
          <View>
            <Text
              style={[
                globalStyleCss.text,
                {
                  fontSize: 20,
                  marginBottom: 8,
                  flex: 1,
                  textAlign: 'center',
                },
              ]}>
              {produto.nome}
            </Text>
            {!!produto.descricao && (
              <Text
                style={[
                  globalStyleCss.text,
                  {fontSize: 14, marginBottom: 8, textAlign: 'center'},
                ]}>
                {produto.descricao}
              </Text>
            )}
            <Text
              style={[
                globalStyleCss.text,
                {fontSize: 18, marginBottom: 4, textAlign: 'center'},
              ]}>
              {this.showPrice(numberToMoney(produto.preco))}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ProdutoTopDetail;
