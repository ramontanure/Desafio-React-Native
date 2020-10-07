import {APIParams, getFilter, getUrl, Params} from '.';
import fetchAPI from '.';
import {ProdutoVenda} from '../redux/carrinho/types';

export const cartPricesRepository = (
  chave: string,
  products: ProdutoVenda[],
  CDCLIENTE: string,
  CDCONSUMIDOR: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/CartPricesRepository`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('products', products.map(product =>  getProdutoToAPI(product))),
            getFilter('CDCLIENTE', CDCLIENTE),
            getFilter('CDCONSUMIDOR', CDCONSUMIDOR),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'paymentMenu',
            widgetName: 'setConsumerPopUp',
          },
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  });
};

const getProdutoToAPI = (produto: ProdutoVenda, index?: number): any => {
    return {
      DSBUTTON: produto.nome,
      CAMPANHA: null,
      DTINIVGCAMPCG: null,
      DESCCOMPGANHE: null,
      QTPRODCOMVEN: produto.quantidade,
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
      IDTIPCOBRA: produto.IDTIPCOBRA,
      NRCOMANDA: produto.NRCOMANDA,
      NRVENDAREST: produto.NRVENDAREST,
      PRINTER: null,
      PRODUTOS: produto.produtosVenda?.map((p, i) => getProdutoToAPI(p, i)) || [],
      REFIL: false,
      UNIQUEID: produto.id,
      VOUCHER: null,
      IDTIPOCOMPPROD: produto.IDTIPOCOMPPROD
    };
  };