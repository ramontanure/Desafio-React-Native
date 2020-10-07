import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import globalStyleCss from '../util/global-style.css';
import Icon from './icon';
import {Produto, Grupo, ProdutoComboInterface} from '../redux/dataset/types';
import {ProdutoVenda} from '../redux/carrinho/types';
import Quantidade from './quantidade';
import {
  isMaxGrupoCompleto,
  isMinGrupoCompleto,
  getPrecoProduto,
} from '../util/helpers';
import {Dispatch, bindActionCreators} from 'redux';
import {ApplicationState} from '../redux/store';
import {connect} from 'react-redux';
import {updateCurrentProduto, addProdutoCombo, changeDesconto} from '../redux';
import {Desconto} from '../redux/dataSale/types';
import {calcDescontoPreco} from './../util/helpers';

interface Props {
  item: Produto;
  currentProduto: ProdutoVenda;
  NRCOMANDA: string;
  NRVENDAREST: string;
  DSCOMANDA: string;
  onPress(item: any): void;
  isLast: boolean;
  updateCurrentProduto(produto: ProdutoVenda): void;
  changeDesconto(desconto: Desconto): void;
  addProdutoCombo(produto: ProdutoVenda): void;
}

class ComboItem extends React.Component<Props> {
  changeQtd = (sum: number, item: Produto) => {
    let {currentProduto, updateCurrentProduto} = this.props;
    let grupoProduto: Grupo | undefined = this.getGrupo();
    let produto = currentProduto.produtosVenda.find(e => e.nome == item.nome);
    if (
      (grupoProduto &&
        !isMaxGrupoCompleto(currentProduto, grupoProduto) &&
        sum == 1) ||
      (sum == -1 && produto && produto.quantidade > 1)
    ) {
      updateCurrentProduto({
        ...currentProduto,
        produtosVenda: currentProduto.produtosVenda.map(produto => {
          if (produto.nome == item.nome)
            return {...produto, quantidade: produto.quantidade + sum};
          else return produto;
        }),
      });
    } else if (sum == -1 && produto && produto.quantidade == 1) {
      updateCurrentProduto({
        ...currentProduto,
        produtosVenda: currentProduto.produtosVenda.filter(
          e => e.nome != item.nome,
        ),
      });
    }
  };

  getGrupo = () => {
    return this.props.currentProduto.grupos.find(
      e => e.nome == this.props.item.nomeGrupo,
    );
  };

  getImg = () => {
    let {currentProduto, item} = this.props;
    if (currentProduto.produtosVenda.find(e => e.codigo == item.codigo))
      return require('./../assets/radio-checked.png');
    else return require('./../assets/radio-unchecked.png');
  };

  grupo = this.getGrupo();

  getOpacity = (produtoInserido: any) => {
    let qtdGrp = this.props.currentProduto.produtosVenda
      .filter(e => e.nomeGrupo == this.grupo.nome)
      .reduce((acc: number, curr: ProdutoVenda) => acc + curr.quantidade, 0);
    return this.grupo.maximo == 1 ||
      qtdGrp < this.grupo.maximo ||
      produtoInserido
      ? 1
      : 0.5;
  };

  addOneProd = (item: ProdutoVenda) => {
    let {currentProduto} = this.props;
    if (this.grupo) {
      if (!isMaxGrupoCompleto(currentProduto, this.grupo)) {
        let produtoInserido = currentProduto.produtosVenda.find(
          e => e.nome == item.nome,
        );
        let grupoProduto: Grupo | undefined = this.getGrupo();
        if (produtoInserido) {
          this.props.updateCurrentProduto({
            ...currentProduto,
            produtosVenda: currentProduto.produtosVenda.filter(
              e => e.nome != item.nome,
            ),
          });
        } else {
          if (
            grupoProduto &&
            !isMaxGrupoCompleto(currentProduto, grupoProduto)
          ) {
            this.addProduto(item);
          }
        }
      }
    }
  };

  setDesconto = (produto: ProdutoVenda): Desconto => {
    return {
      valor: produto.valorDesconto,
      tipo: produto.tipoDesconto == 'P' ? 'PERCENTUAL' : 'VALOR',
    };
  };

  addProduto = (item: ProdutoVenda) => {
    let {currentProduto} = this.props;
    if (this.grupo) {
      if (!isMaxGrupoCompleto(currentProduto, this.grupo)) {
        let produtoVenda: ProdutoVenda = {
          ...item,
          observacaoManual: '',
          selectedOpcionais: [],
          quantidade: 1,
          NRCOMANDA: this.props.NRCOMANDA,
          NRVENDAREST: this.props.NRVENDAREST,
          DSCOMANDA: this.props.DSCOMANDA,
          segura: false,
          viagem: false,
        };
        if (produtoVenda.valorDesconto > 0) {
          produtoVenda = {
            ...produtoVenda,
            valorOriginal: produtoVenda.valorTotal,
            valorTotal:
              produtoVenda.valorTotal -
              calcDescontoPreco(
                this.setDesconto(produtoVenda),
                produtoVenda.valorTotal,
              ),
          };
          // this.props.changeDesconto(this.setDesconto(produtoVenda));
        }
        this.props.addProdutoCombo({
          ...produtoVenda,
          valorTotal: getPrecoProduto(produtoVenda),
        });
      }
    }
  };

  render() {
    let {item, onPress, currentProduto} = this.props;
    let produtoInserido = currentProduto.produtosVenda.find(
      e => e.nome == item.nome,
    );
    return (
      <TouchableOpacity
        style={[
          {opacity: item.isBloqueado ? 0.5 : 1},
          globalStyleCss.scrollItem,
          {borderBottomWidth: this.props.isLast ? 0 : 1},
        ]}
        onPress={() => {
          if (!item.isBloqueado) onPress(item);
        }}>
        <Text
          style={[
            globalStyleCss.text,
            globalStyleCss.scrollItemText,
            {flex: 1},
          ]}>
          {item.nome}
        </Text>
        {this.grupo && this.grupo.maximo > 1 ? (
          produtoInserido ? (
            <View style={{alignItems: 'flex-end', left: 16}}>
              <Quantidade
                borderless
                minusPress={() => this.changeQtd(-1, item)}
                plusPress={() => this.changeQtd(1, item)}
                value={produtoInserido.quantidade}
              />
            </View>
          ) : (
            <Icon
              source={require('../assets/add.png')}
              size={21}
              //@ts-ignore
              onPress={() => this.addProduto(item)}
            />
          )
        ) : (
          <Icon
            paddingLess
            size={21}
            style={{marginRight: 8}}
            source={this.getImg()}
            //@ts-ignore
            onPress={() => this.addOneProd(item)}
          />
        )}
      </TouchableOpacity>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    currentProduto: state.carrinho.currentProduto,
    NRCOMANDA: state.dataset.NRCOMANDA,
    NRVENDAREST: state.dataset.NRVENDAREST,
    DSCOMANDA: state.dataset.DSCOMANDA,
  }),
  (dispatch: Dispatch) =>
    bindActionCreators(
      {updateCurrentProduto, addProdutoCombo, changeDesconto},
      dispatch,
    ),
)(ComboItem);
