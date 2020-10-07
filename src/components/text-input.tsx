import React from 'react';
import {TextInputProps, TextInput, View, Text, ViewStyle} from 'react-native';
import globalStyleCss from '../util/global-style.css';

interface Props {
  error?: boolean;
  errorMessage?: string;
  style?: ViewStyle;
  children?: JSX.Element;
}

export default class InputText extends React.Component<TextInputProps & Props> {
  ref: TextInput | null = null;
  focus = () => this.ref && this.ref.focus();

  render() {
    return (
      <View style={{width: '100%'}}>
        <TextInput
          ref={ref => (this.ref = ref)}
          {...this.props}
          underlineColorAndroid="transparent"
          style={[globalStyleCss.inputText, this.props.style]}>
          {this.props.children}
        </TextInput>
        <Text
          style={[
            globalStyleCss.text,
            {
              fontFamily: 'OpenSans_Light',
              fontSize: 11,
              color: 'red',
              display: this.props.error ? 'flex' : 'none',
              textAlign: 'center',
            },
          ]}>
          {this.props.errorMessage}
        </Text>
      </View>
    );
  }
}
