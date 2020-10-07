import React from 'react';
import {Grupo} from '../../redux/dataset/types';
import {View} from 'react-native';
import GrupoSimples from './grupo-simples-list-item';
import GrupoItem from './grupo-list-item';

interface Props {
  grupos: Grupo[];
  onPressItem(index: any): void;
  layout: string;
  index: number;
}

export default class GrupoList extends React.Component<Props> {
  render() {
    let {layout, grupos, onPressItem} = this.props;
    return (
      <View>
        {layout == 'Simples' ? (
          <GrupoSimples
            grupos={grupos}
            onPressItem={onPressItem}
            index={this.props.index}
          />
        ) : (
          <GrupoItem grupos={grupos} onPressItem={onPressItem} />
        )}
      </View>
    );
  }
}
