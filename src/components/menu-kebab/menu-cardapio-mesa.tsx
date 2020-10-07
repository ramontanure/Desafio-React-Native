import React from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import {Modal} from '../../redux/ui/types';
import {openModal} from '../../redux';
import {ListaMultipla} from '..';
import {ApplicationState} from '../../redux/store';
import {tableCancelOpen} from '../../api/tableCancelOpen';
import {toggleLoading, openConfirmation} from '../../redux/index';
import SelectPosicao from '../modal-select-posicao';
import {getPositionCode} from '../../api/getPositionCode';

interface Props {
  navigation: NavigationScreenProp<any>;
  chave: string;
  mesa: string;
  NRVENDAREST: string;
  NRCOMANDA: string;
  position: number;
  openModal(modal: Modal): void;
  toggleLoading(): void;
  openConfirmation(
    title: string,
    message?: string,
    onConfirm?: Function,
    onCancel?: Function,
  ): void;
  openControlePosicao(): void;
}

class FuncoesMesaComp extends React.Component<Props> {
  onPressItem = (item: any) => {
    switch (item.nome) {
      case 'Cancelar produto':
        this.onPressCancelarProduto();
        break;
      case 'Cancelar Abertura':
        this.onPressCancelarMesa();
        break;
      case 'Adicionar/Remover Posições':
        this.onPressPosicoes();
        break;
      case 'Alterar Posição':
        this.onPressAlterarPosicao();
        break;
      case 'Codigo de posição':
        this.onPressCodigoDePosicao();
        break;
      default:
        break;
    }
  };

  onPressCancelarMesa = () => {
    this.props.openModal({
      visible: false,
    });
    this.props.toggleLoading();
    tableCancelOpen(this.props.chave, this.props.mesa)
      .then((response: any) => {
        if (response.message) {
          this.props.openConfirmation(
            'Operação não permitida',
            'Já foram lançados produtos para esta mesa',
          );
        } else {
          this.props.openConfirmation('Sucesso', 'Cancelamento aprovado');
          this.props.navigation.navigate('Mesa');
        }
      })
      .catch(error => {
        this.props.openConfirmation('Ops', error);
      })
      .finally(this.props.toggleLoading);
  };
  onPressCancelarProduto = () => {
    this.props.navigation.navigate('CancelamentoProduto');
    this.props.openModal({
      visible: false,
    });
  };

  onPressAlterarPosicao = () => {
    this.props.openModal({
      visible: true,
      children: <SelectPosicao />,
      title: 'Selecione uma Posição',
    });
  };
  onPressCodigoDePosicao = () => {
    getPositionCode(
      this.props.chave,
      this.props.NRVENDAREST,
      this.props.NRCOMANDA,
      this.props.position,
    )
      .then((response: any) => {
        this.props.openConfirmation(
          'Código de Posição',
          response.messages[0].message,
        );
      })
      .finally(() => this.props.openModal({visible: false}));
  };

  onPressPosicoes = () => {
    this.props.openControlePosicao();
    this.props.openModal({visible: false});
  };

  render() {
    return (
      <ListaMultipla
        lista={[
          {
            nome: 'Alterar Posição',
          },
          {
            nome: 'Cancelar produto',
          },
          {
            nome: 'Codigo de posição',
          },
          // {
          //   nome: 'Transferências',
          // },
          // {
          //   nome: 'Dividir produtos',
          // },
          // {
          //   nome: 'Mensagem produção',
          // },
          {
            nome: 'Adicionar/Remover Posições',
          },
          {
            nome: 'Cancelar Abertura',
          },
          // {
          //   nome: 'Código de produção',
          // },
          // {
          //   nome: 'Agrupamentos',
          // },
          // {
          //   nome: 'Liberar produtos',
          // },
        ]}
        keyExtractor="nome"
        onSelectItem={this.onPressItem}
      />
    );
  }
}

const mapStateTopProps = (state: ApplicationState) => ({
  modo: state.dataset.modo,
  chave: state.dataset.chave,
  mesa: state.dataset.mesa,
  NRVENDAREST: state.dataset.NRVENDAREST,
  NRCOMANDA: state.dataset.NRCOMANDA,
  position: state.carrinho.numeroDePosicoes,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({openModal, toggleLoading, openConfirmation}, dispatch);

const MenuCardapioMesa = connect(
  mapStateTopProps,
  mapDispatchToProps,
)(FuncoesMesaComp);

export default MenuCardapioMesa;
