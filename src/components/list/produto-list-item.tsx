import React from 'react';
import {Produto} from '../../redux/dataset/types';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import globalStyleCss from '../../util/global-style.css';
import {numberToMoney, capitalize, moneyToNumber} from '../../util/helpers';
import {NO_IMAGE} from '../../util/constants';
import Card from '../card';

interface Props {
  produtos: Produto[];
  onPressItem(item: Produto): void;
}

export default class ProdutoItem extends React.Component<Props> {
  render() {
    let {produtos, onPressItem} = this.props;
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
        <FlatList
          data={produtos}
          numColumns={2}
          renderItem={({item, index}) => (
            <Card
              isOpaque={item.isBloqueado}
              image={item.urlImg}
              onPress={() => onPressItem(item)}
              key={index}
              title={item.nome}
              subtitle={numberToMoney(item.preco)}
            />
          )}
        />
      </View>
    );
  }
}
