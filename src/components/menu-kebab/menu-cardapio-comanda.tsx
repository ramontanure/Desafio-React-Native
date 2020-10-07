import React from 'react';
import {ListaMultipla} from '..';
import {bindActionCreators, Dispatch} from 'redux';
import {toggleLoading, openConfirmation, openModal} from '../../redux/index';
import {ApplicationState} from '../../redux/store';
import {connect} from 'react-redux';
import {Modal} from '../../redux/ui/types';

interface MenuComandaProps {
  openGroupBills(modo: string): void;
  chave: any;
  openModal(modal: Modal): void;
  toggleLoading(): void;
  openConfirmation(
    title: string,
    message?: string,
    onConfirm?: Function,
    onCancel?: Function,
  ): void;
}
class FuncoesComanda extends React.Component<MenuComandaProps> {
  render() {
    return (
      <ListaMultipla
        lista={[
          {
            nome: 'Cancelar produto',
          },
          {
            nome: 'Alterar produto',
          },
          {
            nome: 'Alterar mesa',
          },
          {
            nome: 'Agrupar comanda',
          },
          {
            nome: 'Desagrupar comanda',
          },
          {
            nome: 'Transferir produtos',
          },
        ]}
        keyExtractor="nome"
        onSelectItem={item => {
          switch (item.nome) {
            case 'Agrupar comanda':
              this.props.openGroupBills('agrupamento');
              break;
            case 'Desagrupar comanda':
              this.props.openGroupBills('desagrupamento');
              break;
            default:
              break;
          }
        }}
      />
    );
  }
}
const mapStateTopProps = (state: ApplicationState) => ({
  chave: state.dataset.chave,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({toggleLoading, openConfirmation, openModal}, dispatch);

const MenuCardapioComanda = connect(
  mapStateTopProps,
  mapDispatchToProps,
)(FuncoesComanda);

export default MenuCardapioComanda;
