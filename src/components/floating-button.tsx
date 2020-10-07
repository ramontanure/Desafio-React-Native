import React from 'react';
import ActionButton from 'react-native-action-button';
import Icon from './icon';
import {NavigationScreenProp} from 'react-navigation';
import {COLOR} from '../util/global-style.css';
import {View} from 'react-native';
import PopUp from './modal';
import {ListaMultipla} from '.';
import {connect} from 'react-redux';
import {changePosicao} from '../redux';
import {ApplicationState} from '../redux/store';
import {Dispatch, bindActionCreators} from 'redux';

interface Props {
  navigation: NavigationScreenProp<any>;
  numeroDePosicoes: number;
  currentPosicao: number;
  changePosicao(posicao: number): void;
}

class Floating extends React.Component<Props> {
  state = {
    showPosicoes: false,
  };

  render() {
    return (
      <>
        <ActionButton
          offsetY={48 + 16}
          offsetX={16}
          buttonColor={COLOR.BASE}
          position="right">
          <ActionButton.Item
            title="Posições"
            onPress={() => this.setState({showPosicoes: true})}>
            <Icon
              source={require('../assets/person.png')}
              onPress={() => this.setState({showPosicoes: true})}
            />
          </ActionButton.Item>
          <ActionButton.Item
            title="Fechar Conta"
            onPress={() => this.setState({showPosicoes: true})}>
            <Icon
              source={require('../assets/money.png')}
              onPress={() => this.setState({showPosicoes: true})}
            />
          </ActionButton.Item>
          <ActionButton.Item
            title="Parcial Conta"
            onPress={() => this.setState({showPosicoes: true})}>
            <Icon
              source={require('../assets/bill.png')}
              onPress={() => this.props.navigation.navigate('Parcial')}
            />
          </ActionButton.Item>
        </ActionButton>
        <PopUp
          title="Selecionar posição"
          visible={this.state.showPosicoes}
          closeAction={() => this.setState({showPosicoes: false})}>
          <ListaMultipla
            lista={[...Array(this.props.numeroDePosicoes)].map((_, index) => ({
              nome: `Posição ${index + 1}`,
              posicao: index,
            }))}
            keyExtractor="nome"
            selectedItem={{nome: `Posição ${this.props.currentPosicao + 1}`}}
            onSelectItem={({posicao}) => {
              this.setState({showPosicoes: false});
              this.props.changePosicao(posicao);
            }}
          />
        </PopUp>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  numeroDePosicoes: state.carrinho.numeroDePosicoes,
  currentPosicao: state.carrinho.currentPosicao,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({changePosicao}, dispatch);

const FloatingConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Floating);
export default FloatingConnected;
