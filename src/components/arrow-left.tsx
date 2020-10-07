import React from 'react';
import Icon from './icon';
import {NavigationScreenProp} from 'react-navigation';
import {MODOS} from '../util/constants';
import {ApplicationState} from '../redux/store';
import {Dispatch, bindActionCreators} from 'redux';
import {
  cleanCarrinho,
  cleanDataSale,
  clearDataset,
  openConfirmation,
} from '../redux';
import {connect} from 'react-redux';

interface Props {
  navigation: NavigationScreenProp<any>;
  cleanCarrinho(): void;
  cleanDataSale(): void;
  clearDataset(): void;
  modo: string;
  openConfirmation(
    title: string,
    message?: string,
    onConfirm?: Function,
    onCancel?: Function,
  ): void;
}

class ArrowLeftComp extends React.Component<Props> {
  state = {
    confirm: false,
  };
  onPressArrowLeft = () => {
    switch (this.props.modo) {
      case MODOS.BALCAO:
        this.props.openConfirmation(
          'Deseja Continuar?',
          'Ao sair você perderá todas as informações do caixa.',
          this.onConfirm,
          this.onCancel,
        );
        break;
      case MODOS.COMANDA:
        this.props.navigation.navigate('Comanda');
        break;
      case MODOS.MESA:
        this.props.navigation.navigate('Mesa');
        break;
    }
  };
  onConfirm = () => {
    const isConfirm = !this.state.confirm;
    this.props.cleanCarrinho();
    this.props.cleanDataSale();
    this.props.clearDataset();
    if (isConfirm) this.props.navigation.navigate('Filial');
  };

  onCancel = () => {};
  render() {
    return (
      <Icon
        source={require('../assets/arrow-left.png')}
        onPress={this.onPressArrowLeft}
      />
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    modo: state.dataset.modo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {cleanCarrinho, cleanDataSale, clearDataset, openConfirmation},
    dispatch,
  );
};

const ArrowLeft = connect(mapStateToProps, mapDispatchToProps)(ArrowLeftComp);

export default ArrowLeft;
