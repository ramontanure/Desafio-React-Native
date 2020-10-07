import React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import Icon from './icon';
import globalStyleCss from '../util/global-style.css';

interface Props {
  title: any;
  Action1?: any;
  Action2?: any;
  hideBorder?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  titleTextStyle?: TextStyle;
}

export default class Header extends React.Component<Props> {
  render() {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 4,
          },
          this.props.style,
        ]}>
        {this.props.Action1 ? this.props.Action1 : <Void />}
        {typeof this.props.title === 'string' ? (
          <Text
            style={[
              globalStyleCss.textTitle,
              {flex: 1, textAlign: 'center'},
              this.props.titleStyle,
              this.props.titleTextStyle,
            ]}
            numberOfLines={1}>
            {this.props.title}
          </Text>
        ) : (
          this.props.title
        )}
        {this.props.Action2 ? this.props.Action2 : <Void />}
      </View>
    );
  }
}

const Void = () => {
  return <View style={{width: 52, height: 52}} />;
};
