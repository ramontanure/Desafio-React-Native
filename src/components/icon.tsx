import React from 'react';
import {
  TouchableOpacity,
  Image,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import globalStyleCss from '../util/global-style.css';

interface Props {
  source: any;
  onPress(): void;
  style?: ViewStyle[] | ViewStyle;
  text?: string;
  size?: number;
  textStyle?: TextStyle;
  paddingLess?: boolean;
}

export default class Icon extends React.Component<Props> {
  render() {
    let {onPress, source, text, size, textStyle, paddingLess} = this.props;
    return (
      <TouchableOpacity
        style={[
          {alignItems: 'center', padding: paddingLess ? 0 : 16},
          this.props.style,
        ]}
        onPress={onPress}>
        <Image
          style={{height: size || 20, width: size || 20}}
          resizeMode="center"
          source={source}
        />
        {text && (
          <Text
            style={[
              globalStyleCss.text,
              {
                fontSize: 10,
                textAlign: 'center',
                marginTop: 4,
              },
              textStyle,
            ]}>
            {text}
          </Text>
        )}
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
