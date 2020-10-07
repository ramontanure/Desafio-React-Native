import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  ViewStyle,
} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import {getStatus, numberToMoney} from '../util/helpers';
import style from '../containers/pedidos/style.css';

interface Props {
  list: any[];
  isRadio?: boolean;
  keyExtractor: string;
  onPress(item: any): void;
  selectedList: any[];
  numRow?: number;
  verificationKey?: string;
  keyExtractor2?: string;
  borderBottom?: boolean;
  isPedido?: boolean;
  style?: ViewStyle;
  onLongPress?: any;
}

export default class CheckList extends React.Component<Props> {
  getSource = (isSelected: boolean) => {
    let {isRadio} = this.props;
    if (isSelected) {
      if (!isRadio) return require('./../assets/check.png');
      else return require('./../assets/radio-checked.png');
    } else {
      if (!isRadio) return require('./../assets/check-blank.png');
      else return require('./../assets/radio-unchecked.png');
    }
  };

  getIsSelected = (item: any) => {
    const {keyExtractor, verificationKey, selectedList} = this.props;
    return (
      selectedList.findIndex(e => {
        if (verificationKey) {
          return (
            e[keyExtractor] == item[keyExtractor] &&
            e[verificationKey] == item[verificationKey]
          );
        } else {
          return e[keyExtractor] == item[keyExtractor];
        }
      }) != -1
    );
  };

  getKeyExtractor2 = (item: any) => {
    if (this.props.keyExtractor2 == 'IDSTCOMANDA')
      return getStatus(item[this.props.keyExtractor2]);
    else if (this.props.keyExtractor2 == 'total')
      return numberToMoney(parseFloat(item[this.props.keyExtractor2]));
    else return item[this.props.keyExtractor2];
  };

  render() {
    let {
      list,
      keyExtractor,
      onPress,
      isPedido,
      borderBottom,
      style,
      onLongPress,
    } = this.props;
    return (
      <View>
        <FlatList
          data={list}
          keyExtractor={(item, index) => index + ''}
          extraData={this.props}
          numColumns={this.props.numRow || 2}
          renderItem={({item, index}) => {
            let isSelected = this.getIsSelected(item);
            return (
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                  },
                  borderBottom ? style : {},
                ]}
                key={index}
                onLongPress={() => {
                  onLongPress ? onLongPress() : null;
                }}
                onPress={() => onPress(item)}>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    },
                    isPedido ? {marginVertical: 16} : {marginVertical: 8},
                  ]}>
                  <Image
                    style={{height: 22, width: 22}}
                    resizeMode="center"
                    source={this.getSource(isSelected)}
                  />
                  <Text
                    style={[
                      globalStyleCss.text,
                      {
                        fontSize: 14,
                        marginLeft: 8,
                        flexShrink: 1,
                        flex: 1,
                      },
                    ]}
                    numberOfLines={2}>
                    {item[keyExtractor]}
                  </Text>
                  {this.props.keyExtractor2 && (
                    <Text
                      style={[
                        globalStyleCss.text,
                        {
                          fontSize: 14,
                          marginLeft: 8,
                        },
                        isPedido ? {right: 16} : {},
                      ]}
                      numberOfLines={2}>
                      {this.getKeyExtractor2(item)}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
