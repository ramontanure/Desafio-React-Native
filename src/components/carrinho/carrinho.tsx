import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {ProdutoVenda} from '../../redux/carrinho/types';
import ComboCarrinho from '../combo-carrinho';
import ProdutoCarrinho from '../produto-carrinho';
import {Desconto} from '../../redux/dataSale/types';

interface Props {
  produtos: ProdutoVenda[];
  onPressProduto(p: ProdutoVenda, b: boolean): void;
  onPressRemoveProduto(produto: ProdutoVenda): void;
  desconto: Desconto;
}

export default class CarrinhoNormal extends React.Component<Props> {
  render() {
    const {produtos} = this.props;
    return (
      <View style={{flex: 1}}>
        <FlatList
          keyExtractor={item => item.id + ''}
          contentContainerStyle={{flexGrow: 0}}
          data={produtos}
          renderItem={({item, index}) => {
            if (item.produtosVenda.length > 0) {
              return (
                <ComboCarrinho
                  desconto={this.props.desconto}
                  index={index}
                  lenght={produtos.length}
                  produto={item}
                  onPress={() => this.props.onPressProduto(item, true)}
                  onPressRemove={() => this.props.onPressRemoveProduto(item)}
                />
              );
            } else {
              return (
                <ProdutoCarrinho
                  lenght={produtos.length}
                  index={index}
                  onPress={() => this.props.onPressProduto(item, false)}
                  onPressRemove={() => this.props.onPressRemoveProduto(item)}
                  key={index}
                  produto={item}
                />
              );
            }
          }}
        />
      </View>
    );
  }
}
