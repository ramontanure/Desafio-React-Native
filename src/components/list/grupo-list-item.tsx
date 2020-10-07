import React from 'react';
import {Grupo} from '../../redux/dataset/types';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import globalStyleCss from '../../util/global-style.css';
import Card from '../card';
import {NO_IMAGE} from '../../util/constants';

interface Props {
  grupos: Grupo[];
  onPressItem(index: number): void;
}

export default class GrupoItem extends React.Component<Props> {
  render() {
    let {grupos, onPressItem} = this.props;
    return (
      <FlatList
        numColumns={2}
        data={grupos}
        renderItem={({item, index}) => (
          <Card
            key={index}
            image={item.imageUrl}
            title={item.nome}
            onPress={() => onPressItem(index)}
          />
        )}
      />
    );
  }
}
