import React from 'react';
import {connect} from 'react-redux';
import {ApplicationState} from '../redux/store';
import SideComanda from './../containers/modos/comanda/sidebar/';
import SideMesa from './../containers/modos/mesa/sidebar';
import {NavigationScreenProp} from 'react-navigation';
import {MODOS} from '../util/constants';
import {View} from 'react-native';

interface Props {
  modo: string;
  navigation: NavigationScreenProp<any>;
}

class Sidebar extends React.Component<Props> {
  navigate = (route: string) => {
    this.props.navigation.toggleDrawer() &&
      this.props.navigation.navigate(route);
  };
  _renderSidebarModo = () => {
    const {modo, navigation} = this.props;
    if (modo == MODOS.BALCAO)
      return <SideBalcao navigation={navigation} navigate={this.navigate} />;
    else if (modo == MODOS.COMANDA)
      return <SideComanda navigation={navigation} navigate={this.navigate} />;
    else if (modo == MODOS.MESA)
      return <SideMesa navigate={this.navigate} navigation={navigation} />;
    else return <View />;
  };

  render() {
    return this._renderSidebarModo();
  }
}

export default connect(
  (state: ApplicationState) => ({modo: state.dataset.modo}),
  null,
)(Sidebar);
