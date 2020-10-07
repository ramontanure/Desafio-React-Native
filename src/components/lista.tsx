import React from 'react';
import {FlatList, Text} from 'react-native';
import ItemLista from './item-lista';
import {numberToMoney} from '../util/helpers';
import globalStyleCss from '../util/global-style.css';
import Card from './card';

interface Props {
  item: any;
  itemKeyLeft: string;
  onPress(item: any): any;
  title?: any;
  itemKeyRight?: any;
  itemKeyColor?: string;
  ball?: boolean;
  isPreco?: boolean;
  index?: number;
  isGrupo?: boolean;
  layout?: string;
}

export default class Lista extends React.Component<Props> {
  renderKeyRight = (item: any) => {
    const {isPreco, itemKeyRight} = this.props;
    if (isPreco) {
      return numberToMoney(parseFloat(item[itemKeyRight]));
    }
  };
  _renderData = (item: any, index: number) => {
    const {
      itemKeyLeft,
      itemKeyColor,
      ball,
      onPress,
      title,
      isGrupo,
      layout,
    } = this.props;
    if (layout == 'Simples') {
      return (
        <ItemLista
          style={{
            borderBottomWidth: index == this.props.item.length - 1 ? 0 : 1,
          }}
          ball={ball}
          keyLeft={item[itemKeyLeft]}
          keyRight={this.renderKeyRight(item)}
          keyColor={itemKeyColor ? item[itemKeyColor] : ''}
          onPress={isGrupo ? () => onPress(index) : () => onPress(item)}
          item={item}
        />
      );
    } else {
      return (
        <Card
          key={index}
          image={item.imageUrl}
          title={item.nome}
          onPress={isGrupo ? () => onPress(index) : () => onPress(item)}
        />
      );
    }
  };
  render() {
    const {item, title, layout} = this.props;
    return (
      <>
        {typeof title == 'string' ? (
          <Text
            onPress={() => this.setState({isGrupoSelected: false})}
            style={[
              globalStyleCss.text,
              {
                fontFamily: 'OpenSans-Bold',
                paddingHorizontal: 16,
                paddingVertical: 8,
              },
            ]}>
            {title}
          </Text>
        ) : (
          title
        )}
        <FlatList
          numColumns={layout != 'Simples' ? 2 : 1}
          key={layout}
          data={item}
          renderItem={({item, index}) => this._renderData(item, index)}
        />
      </>
    );
  }
}
