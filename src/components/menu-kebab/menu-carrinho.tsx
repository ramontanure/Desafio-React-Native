import React from 'react';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import {ListaMultipla} from '..';
import {cleanCarrinho, openModal} from '../../redux';
import {NavigationScreenProp} from 'react-navigation';
import {ApplicationState} from '../../redux/store';
import {MODOS} from '../../util/constants';
import {Modal} from '../../redux/ui/types';

interface Props {
  navigation: NavigationScreenProp<any>;
  modo: string;
  cleanCarrinho(): void;
  openModal(modal: Modal): void;
}

class MenuCarrinhoComp extends React.Component<Props> {
  onPressItem = (item: any) => {
    switch (item.nome) {
      case 'Cancelar pedido':
        this.onPressCancelarPedido();
        break;
      default:
        break;
    }
    this.props.openModal({
      children: null,
      title: '',
      visible: false,
    });
  };

  onPressCancelarPedido = () => {
    this.props.cleanCarrinho();
    if (this.props.modo == MODOS.BALCAO)
      this.props.navigation.navigate('Cardapio');
    else if (this.props.modo == MODOS.COMANDA)
      this.props.navigation.navigate('Comanda');
    else if (this.props.modo == MODOS.MESA)
      this.props.navigation.navigate('Mesa');
  };

  render() {
    return (
      <ListaMultipla
        lista={[
          {
            nome: 'Cancelar pedido',
          },
        ]}
        keyExtractor="nome"
        onSelectItem={this.onPressItem}
      />
    );
  }
}

const mapStateTopProps = (state: ApplicationState) => ({
  modo: state.dataset.modo,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({cleanCarrinho, openModal}, dispatch);

const MenuCarrinho = connect(
  mapStateTopProps,
  mapDispatchToProps,
)(MenuCarrinhoComp);

export default MenuCarrinho;
