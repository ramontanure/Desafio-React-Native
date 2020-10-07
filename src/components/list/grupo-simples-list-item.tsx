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
import Lista from '../lista';

interface Props {
  grupos: Grupo[];
  onPressItem(index: any): void;
  index?: number;
}

export default class GrupoSimples extends React.Component<Props> {
  render() {
    let {grupos, onPressItem, index} = this.props;
    return (
      <Lista
        item={grupos}
        itemKeyLeft="nome"
        ball
        onPress={() => onPressItem(index)}
        itemKeyColor="color"
      />
    );
  }
}
