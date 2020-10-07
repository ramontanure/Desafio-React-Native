import React from 'react';
import {ListaMultipla} from '.';

class FuncoesMesa extends React.Component {
  render() {
    return (
      <ListaMultipla
        lista={[
          {
            nome: 'Parcial da conta',
          },
          {
            nome: 'Fechar conta',
          },
          {
            nome: 'Cancelar produto',
          },
          {
            nome: 'Transferências',
          },
          {
            nome: 'Dividir produtos',
          },
          {
            nome: 'Mensagem produção',
          },
          {
            nome: 'Posições',
          },
          {
            nome: 'Cancelar Abertura',
          },
          {
            nome: 'Código de produção',
          },
          {
            nome: 'Agrupamentos',
          },
          {
            nome: 'Libberar produtos',
          },
        ]}
        keyExtractor="nome"
        onSelectItem={() => {}}
      />
    );
  }
}

export default FuncoesMesa;
