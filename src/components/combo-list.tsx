import React from 'react';
import {Produto, Grupo} from '../redux/dataset/types';
import {View, ScrollView, FlatList} from 'react-native';
import TituloCombo from './combo-grupo';
import ComboItem from './combo-item';
import {ProdutoVenda} from '../redux/carrinho/types';
import ProdutoTopDetail from './produto-top-detail';

interface Props {
  grupos: Grupo[];
  onPressItem(item: Produto): void;
  adicionados: ProdutoVenda[];
  navigation: any;
  currentProduto: any;
}

interface State {}

export default class ComboList extends React.Component<Props> {
  state: State = {};

  scrollToGrupo = (grupo: Grupo) => {
    let index = this.props.grupos.findIndex(e => e.nome == grupo.nome);
    if (this.flatRef) {
      this.flatRef.scrollToIndex({index: index, animated: true});
    }
  };

  flatRef: FlatList<Grupo> | null = null;

  render() {
    let {grupos, onPressItem, adicionados} = this.props;
    return (
      <FlatList
        ListHeaderComponent={
          <ProdutoTopDetail
            produto={this.props.currentProduto}
            navigation={this.props.navigation}
          />
        }
        ref={ref => (this.flatRef = ref)}
        data={grupos}
        extraData={this.props}
        renderItem={({item: grupo, index}) => {
          let adicionadosGrupo = adicionados.filter(
            e => e.nomeGrupo == grupo.nome,
          );
          return (
            <View key={index}>
              <TituloCombo
                adicionados={adicionadosGrupo ? adicionadosGrupo.length : 0}
                grupo={grupo}
              />
              <View>
                {grupo.produtos.map((produto: Produto, index: number) => {
                  return (
                    <ComboItem
                      isLast={index == grupo.produtos.length - 1}
                      onPress={onPressItem}
                      item={produto}
                      key={index}
                    />
                  );
                })}
              </View>
            </View>
          );
        }}
      />
    );
  }
}
