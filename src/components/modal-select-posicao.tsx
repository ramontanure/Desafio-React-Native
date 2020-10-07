import React from 'react';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import {ListaMultipla} from '.';
import {changePosicao, openModal} from '../redux';
import {ApplicationState} from '../redux/store';
import {Modal} from '../redux/ui/types';

interface Props {
  numeroDePosicoes: number;
  currentPosicao: number;
  changePosicao(n: number): void;
  openModal(modal: Modal): void;
}

class SelectPosicaoComp extends React.Component<Props> {
  
  render() {
    return (
      <ListaMultipla
        lista={[...Array(Number(this.props.numeroDePosicoes))].map((_, index) => ({
          nome: `Posição ${index + 1}`,
          posicao: index,
        }))}
        keyExtractor="nome"
        selectedItem={{
          nome: `Posição ${this.props.currentPosicao + 1}`,
        }}
        onSelectItem={({posicao}) => {
          this.props.openModal({visible: false});
          this.props.changePosicao(posicao);
        }}
      />
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  numeroDePosicoes: state.carrinho.numeroDePosicoes,
  currentPosicao: state.carrinho.currentPosicao,
});

const masDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changePosicao,
      openModal,
    },
    dispatch,
  );

const SelectPosicao = connect(
  mapStateToProps,
  masDispatchToProps,
)(SelectPosicaoComp);

export default SelectPosicao;
