import React from 'react';
import {View, TextInput} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import Icon from './icon';
import {NavigationScreenProp} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any>;
  text: string;
  clear(): void;
  onTextChanged(text: string): void;
}

export default class Search extends React.Component<Props> {
  render() {
    let {text, onTextChanged, clear} = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f9faf9',
        }}>
        <TextInput
          style={[
            {
              flex: 1,
              marginHorizontal: 16,
              borderBottomWidth: 0,
              backgroundColor: '#f9faf9',
              fontSize: 14,
            },
          ]}
          autoFocus
          placeholder="Pesquisar..."
          value={text}
          onChangeText={onTextChanged}
        />
        <Icon
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            this.props.navigation.getParam('from') == 'Pedidos'
              ? this.props.navigation.navigate('QR', {from: 'Pedidos'})
              : this.props.navigation.navigate('QR', {from: 'Pesquisa'});
          }}
          source={require('./../assets/qr-code.png')}
        />
        <Icon source={require('./../assets/close.png')} onPress={clear} />
      </View>
    );
  }
}
