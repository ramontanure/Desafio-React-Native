import React from 'react';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';
import globalStyleCss from '../util/global-style.css';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  style?: any;
  placeholder?: string;
}

export default class InputMask extends React.Component<
  Props | TextInputMaskProps
> {
  render() {
    const {style, placeholder} = this.props;
    return (
      <TextInputMask
        selectTextOnFocus
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        type="money"
        {...this.props}
        style={[globalStyleCss.inputText, style]}
      />
    );
  }
}
