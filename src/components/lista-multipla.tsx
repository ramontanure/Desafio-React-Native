import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Animated} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface Props {
  lista: any[];
  noResultText?: string;
  keyExtractor: string;
  onSelectItem(item: any): void;
  selectedItem?: any;
}

export default class ListaMultipla extends React.Component<Props> {
  renderItem = (e: any, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!e.notNull) this.props.onSelectItem(e);
        }}
        key={index}
        style={{marginVertical: 8}}>
        <Text
          style={[
            globalStyleCss.text,
            {
              fontSize: 16,
              fontFamily:
                this.props.selectedItem &&
                e[this.props.keyExtractor] ==
                  this.props.selectedItem[this.props.keyExtractor]
                  ? 'OpenSans-Bold'
                  : 'OpenSans',
            },
          ]}>
          {e[this.props.keyExtractor]}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    let {lista} = this.props;
    return (
      <ScrollView contentContainerStyle={{padding: 8}}>
        {lista.map((e: any, index: number) => this.renderItem(e, index))}
      </ScrollView>
    );
  }
}
