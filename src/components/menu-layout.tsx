import React from 'react';
import Icon from './icon';
import {View, StyleSheet} from 'react-native';
import {ApplicationState} from '../redux/store';
import {connect} from 'react-redux';
import {LAYOUT} from '../util/constants';

interface Props {
  layout: string;
  trocaLayout(layout: string): void;
}

class MenuLayout extends React.Component<Props> {
  onPressDetalhado = () => {
    this.props.trocaLayout('Detalhado');
    this.setState({isDetalhadoPressed: true, isSimplesPressed: false});
  };

  onPressSimples = () => {
    this.props.trocaLayout('Simples');
    this.setState({isSimplesPressed: true, isDetalhadoPressed: false});
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          style={
            this.props.layout == LAYOUT.SIMPLES
              ? [style.buttonPressed]
              : [style.button]
          }
          source={require('../assets/menu-rounded.png')}
          onPress={this.onPressSimples}
        />
        <Icon
          style={
            this.props.layout == LAYOUT.DETALHADO
              ? [style.buttonPressed, {marginLeft: 4}]
              : [style.button, {marginLeft: 4}]
          }
          source={require('../assets/squared-menu.png')}
          onPress={this.onPressDetalhado}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  button: {
    alignContent: 'center',
    padding: 10,
    height: 40,
    width: 40,
    borderRadius: 100 / 2,
    marginLeft: 16,
  },
  buttonPressed: {
    backgroundColor: '#e1e1e1',
    alignContent: 'center',
    padding: 10,
    height: 40,
    width: 40,
    borderRadius: 100 / 2,
    marginLeft: 16,
  },
});

const mapStateToProps = (state: ApplicationState) => ({
  layout: state.ui.layout,
});

export default connect(mapStateToProps)(MenuLayout);
