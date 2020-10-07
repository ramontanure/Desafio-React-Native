import React, {Component} from 'react';
import {View} from 'react-native';
import InputText from './text-input';
import {ListaMultipla} from '.';
import {Loja} from '../redux/delivery/types';

interface Props {
  lojas: Loja[];
  onItemSelect(item: any): void;
  onTextChange(text: string): void;
  selectItem: Loja;
}

export default class HeaderSearch extends React.Component<Props> {
  render() {
    return (
      <View>
        <View style={{flex: 1}}>
          <InputText
            onChangeText={this.props.onTextChange}
            placeholder="Pesquisa"
          />
        </View>
        <ListaMultipla
          keyExtractor="nome"
          lista={this.props.lojas}
          onSelectItem={this.props.onItemSelect}
          selectedItem={this.props.selectItem}
        />
      </View>
    );
  }
}
