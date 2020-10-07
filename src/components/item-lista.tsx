import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import globalStyleCss from '../util/global-style.css';

interface Props {
  onPress(item?: any): any;
  keyLeft: any;
  ball?: boolean;
  style?: ViewStyle;
  keyRight?: any;
  keyColor?: string;
  item?: any;
  agrupamento?: string;
  isMesa?: boolean;
  getColor?: any;
  onLongPress?: any;
}

interface State { }

export default class ItemLista extends React.Component<Props> {
  state: State = {};

  render() {
    let {
      onPress,
      ball,
      keyRight,
      keyLeft,
      keyColor,
      item,
      style,
      agrupamento,
      isMesa,
      getColor,
      onLongPress,
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          globalStyleCss.scrollItem,
          style,
          { backgroundColor: isMesa ? getColor() : 'white' },
        ]}
        onLongPress={onLongPress}
        onPress={() => {
          item ? onPress(item) : onPress();
        }}>
        {ball == true && (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: keyColor,
              marginRight: 8,
            }}
          />
        )}
        {agrupamento ? (
          <Text
            style={[
              globalStyleCss.text,
              globalStyleCss.scrollItemText,
              { marginRight: 16, flex: 1 },
            ]}>
            {`${keyLeft} \t/\t ${agrupamento}`}
          </Text>
        ) : (
            <Text
              style={[
                globalStyleCss.text,
                globalStyleCss.scrollItemText,
                { marginRight: 16, flex: 1 },
              ]}>
              {keyLeft}
            </Text>
          )}
        {typeof keyRight == 'string' ? (
          <Text style={[globalStyleCss.text, { alignSelf: 'flex-end' }]}>
            {keyRight}
          </Text>
        ) : (
            keyRight
          )}
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingVertical: 8,
  },
});
