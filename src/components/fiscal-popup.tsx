import React from 'react';
import {View} from 'react-native';
import {TextInput} from '.';
import InputMask from './text-input-mask';
import DatePicker from './date-picker';

class FiscalPopup extends React.Component<{text: string; onchageText: any}> {
  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput
          style={{marginBottom: 8}}
          placeholder="Informe um código"
          keyboardType="numeric"
          value={this.props.text}
          onChangeText={this.props.onchageText}
        />
      </View>
    );
  }
}

export default FiscalPopup;
