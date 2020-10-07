import React from 'react';

import {TouchableOpacity, Text} from 'react-native';
import globalStyleCss from '../util/global-style.css';

interface Props {
  name: string;
  onPress(): void;
  isLast?: boolean;
}
export default class UsuarioItem extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity
        style={[
          globalStyleCss.scrollItem,
          {borderBottomWidth: this.props.isLast ? 0 : 1},
        ]}
        onPress={this.props.onPress}>
        <Text style={[globalStyleCss.text, globalStyleCss.scrollItemText]}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}
