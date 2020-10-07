import React from 'react';
import { View } from 'react-native';
import Icon from '../icon';
import { COLOR } from '../../util/global-style.css';
import { TIPOS_CAIXA, MODOS } from '../../util/constants';
import { Props } from './types';
import { Recebimento } from '../../redux/dataSale/types';
import { ProdutoVenda } from '../../redux/carrinho/types';

class BottomNavigation extends React.Component<Props> {
  render() {
    const {
      navigation: { navigate },
      IDCOLETOR,
      comecarPagamentos,
      produtos,
    } = this.props;
    const currentRoute = this.props.navigation.state.routes[
      this.props.navigation.state.index
    ].key;
    const isCardapioSelected =
      currentRoute == 'Cardapio' ||
      currentRoute == 'ProdutoDetail' ||
      currentRoute == 'Combo';
    const isCarrinhoSelected = currentRoute == 'Carrinho';
    const isRecebimentoSelected = currentRoute == 'Recebimento';
    const isMenuSelected = currentRoute == 'Usuario';
    const isContaSelected = currentRoute == 'Conta';
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e1e1e1',
          justifyContent: 'center',
        }}>
        <View style={{ flex: 1 }}>
          <Icon
            size={40}
            paddingLess
            style={{
              padding: 8,
              flex: 1,
            }}
            source={
              isCardapioSelected
                ? require('./../../assets/cardapio-colored.png')
                : require('../../assets/cardapio-black.png')
            }
            onPress={() => navigate('Cardapio')}
            text="CARDÁPIO"
            textStyle={{ color: isCardapioSelected ? COLOR.BASE : '#333' }}
          />
        </View>
        <View style={{ flex: 1 }}>
          {this.props.produtos.length > 0 && (
            <View
              style={{
                backgroundColor: COLOR.BASE,
                height: 8,
                width: 8,
                borderRadius: 4,
                position: 'absolute',
                top: 8,
                right: 16,
              }}
            />
          )}
          <Icon
            size={40}
            paddingLess
            textStyle={{ color: isCarrinhoSelected ? COLOR.BASE : '#333' }}
            style={{
              flex: 1,
              padding: 8,
            }}
            source={
              isCarrinhoSelected
                ? require('./../../assets/cart-colored.png')
                : require('../../assets/cart.png')
            }
            onPress={() => navigate('Carrinho')}
            text="CARRINHO"
          />
        </View>
        {/* {IDCOLETOR == TIPOS_CAIXA.RECEBEDOR &&
          this.props.modo != MODOS.BALCAO &&
          this.props.modo != MODOS.MESA &&
          this.props.modo != MODOS.COMANDA && (
            <View style={{ flex: 1 }}>
              <Icon
                size={40}
                paddingLess
                style={{
                  flex: 1,
                  padding: 8,
                }}
                textStyle={{
                  color: isRecebimentoSelected ? COLOR.BASE : '#333',
                }}
                source={
                  currentRoute == 'Recebimento'
                    ? require('./../../assets/money-colored.png')
                    : require('../../assets/money.png')
                }
                onPress={() => {
                  navigate('Recebimento');
                  comecarPagamentos(produtos);
                }}
                text="RECEBIMENTO"
              />
            </View>
          )} */}

        {IDCOLETOR == TIPOS_CAIXA.RECEBEDOR && (this.props.modo == MODOS.MESA || this.props.modo == MODOS.COMANDA) && (
          <View style={{ flex: 1 }}>
            <Icon
              size={40}
              paddingLess
              style={{
                flex: 1,
                padding: 8,
              }}
              textStyle={{
                color: isContaSelected ? COLOR.BASE : '#333',
              }}
              source={
                currentRoute == 'Conta'
                  ? require('./../../assets/money-colored.png')
                  : require('../../assets/money.png')
              }
              onPress={() => {
                navigate('Conta');
              }}
              text="CONTA"
            />
          </View>
        )}

        {this.props.modo == MODOS.BALCAO && (
          <View style={{ flex: 1 }}>
            <Icon
              size={40}
              style={{ padding: 8 }}
              paddingLess
              textStyle={{
                color: isRecebimentoSelected ? COLOR.BASE : '#333',
              }}
              source={
                isRecebimentoSelected
                  ? require('./../../assets/money-colored.png')
                  : require('../../assets/money.png')
              }
              onPress={() => {
                navigate('Recebimento');
                if (
                  !(
                    this.props.dataSale.faltante <
                    this.props.dataSale.valorTotal
                  )
                ) {
                  comecarPagamentos(produtos);
                }
              }}
              text="RECEBIMENTO"
            />
          </View>
        )}
        {IDCOLETOR == TIPOS_CAIXA.COLETOR && this.props.modo != MODOS.BALCAO && (
          <View style={{ flex: 1 }}>
            <Icon
              size={40}
              paddingLess
              style={{
                padding: 8,
              }}
              textStyle={{
                color: currentRoute == 'Parcial' ? COLOR.BASE : '#333',
              }}
              source={
                currentRoute == 'Parcial'
                  ? require('./../../assets/money-colored.png')
                  : require('../../assets/money.png')
              }
              onPress={() => {
                navigate('Parcial');
                comecarPagamentos(produtos);
              }}
              text="PARCIAL"
            />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Icon
            size={40}
            paddingLess
            style={{ padding: 8 }}
            textStyle={{
              color: isMenuSelected ? COLOR.BASE : '#333',
            }}
            source={
              isMenuSelected
                ? require('./../../assets/person-colored.png')
                : require('../../assets/person.png')
            }
            onPress={() => navigate('Usuario')}
            text="OPÇÕES"
          />
        </View>
      </View>
    );
  }
}

export default BottomNavigation;
