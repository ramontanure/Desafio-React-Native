import fetchAPI, { getUrl, Params, getFilter } from '.';
import _ from 'lodash';
import { ProdutoVenda } from '../redux/carrinho/types';
import { getObsProd } from '../util/helpers';

export const enviarPedido = (
  chave: string,
  produtos: ProdutoVenda[],
  NRCOMANDA: string,
  NRVENDAREST: string,
  CDVENDEDOR: string,
  modo: string,
) => {
  return new Promise((resolve: any, reject: any) => {
    getUrl(result => {
      let url = `${result}/AccountOrder`;
      let produtosAPI = _.flatMap(produtosToAPI(produtos));
      let pedido = JSON.stringify(produtosAPI);
      let options: Params = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('mode', modo),
            getFilter('multiplasComandas', false),
            getFilter('nrvendarest', NRVENDAREST),
            getFilter('pedidos', pedido),
            getFilter('orderCode', `${new Date().getTime()}K${chave}`),
            getFilter('vendedorAut', CDVENDEDOR),
            getFilter('saleProdPass', null),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: { containerName: 'loginContainer', widgetName: 'loginWidget' },
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

const produtosToAPI = (produtos: ProdutoVenda[]) => {
  return produtos
    .filter(e => e.status == 'P')
    .map((p, i) => getProdutoToAPI(p, i));
};

const getProdutoToAPI = (produto: ProdutoVenda, index: number): any => {
  console.log(produto);
  const obs = getObsProd(produto.selectedOpcionais, produto.observacaoManual);
  return {
    DSBUTTON: produto.nome,
    QTPRODCOMVEN: produto.quantidade,
    CAMPANHA: null,
    DTINIVGCAMPCG: null,
    DESCCOMPGANHE: null,
    NMPROMOCAO: produto.nome,
    VRPRECCOMVEN: produto.valorTotal,
    NRLUGARMESA: produto.posicao + 1,
    ID: index + 1,
    DSOCORR_CUSTOM: produto.observacaoManual,
    CDOCORR: produto.selectedOpcionais.map(element => element.codigo),
    ATRASOPROD: produto.segura ? 'Y' : 'N',
    CDPRODUTO: produto.codigo,
    CUSTOMOBS: produto.observacaoManual || '',
    DATA: null,
    IMPRESSORA: [],
    IDIMPPRODUTO: produto.IDIMPPRODUTO,
    TOGO: produto.viagem ? 'Y' : 'N',
    IDTIPCOBRA: produto.IDTIPCOBRA || null,
    NRCOMANDA: produto.NRCOMANDA,
    NRVENDAREST: produto.NRVENDAREST,
    PRINTER: null,
    PRODUTOS: produto.produtosVenda?.map((p, i) => getProdutoToAPI(p, i)) || [],
    REFIL: false,
    TXPRODCOMVEN: obs,
    UNIQUEID: produto.id,
    VOUCHER: null,
    CAMPANHA: null,
    DTINIVGCAMPCG: null,
    DESCCOMPGANHE: null,
  };
};
