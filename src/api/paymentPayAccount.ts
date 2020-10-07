import fetchAPI, {getUrl, getFilter, Params} from '.';
import {ProdutoVenda} from '../redux/carrinho/types';
import {Opcional, Produto} from '../redux/dataset/types';
import {Recebimento, Desconto} from '../redux/dataSale/types';
import {ProdutoMin} from '../containers/parcial/types';
import {MODOS} from '../util/constants';
import {calcDescontoPreco, getDesconto} from '../util/helpers';
import ProdutosAgrupados from '../components/prod-agrupado';

const paymentPay = async (
  TOTALVENDA: number,
  VALORPAGO: number,
  TROCO: number,
  cliente: any,
  consumidor: any,
  NRVENDAREST: string,
  NRCOMANDA: string,
  CDVENDEDOR: string,
  chave: string,
  produtos: ProdutoVenda[] | ProdutoMin[],
  recebimentos: Recebimento[],
  email: string,
  cpf: string,
  desconto: Desconto | undefined,
  NRMESA: string,
  posicao: number[],
  idmodo: string,
  txServico: number,
  posicoes?: number[],
) => {
  return new Promise((resolve, reject) => {
    let produtoTotal = produtos.reduce(
      (total: number, curr: ProdutoVenda | ProdutoMin) =>
        total + curr.preco * getTypeOf(curr),
      0,
    );

    if (MODOS.COMANDA) produtoTotal = TOTALVENDA - txServico;

    const DATASALE = getDatasale(
      TOTALVENDA,
      desconto,
      VALORPAGO,
      TROCO,
      produtoTotal,
      txServico,
    );

    getUrl(result => {
      console.log(DATASALE);
      console.log(produtoVendaToFilter(produtos, desconto));
      let url = `${result}/PaymentPayAccount`;
      let options: Params = {
        body: JSON.stringify({
          filter: [
            getFilter('TIPORECE', recebimentoToFilter(recebimentos)),
            getFilter(
              'ITEMVENDA',
              idmodo == MODOS.MESA
                ? []
                : produtoVendaToFilter(produtos, desconto),
            ),
            getFilter('ITVENDADES', itemVendaDesconto(produtos) || ''),
            getFilter('DATASALE', DATASALE),
            getFilter('CDCLIENTE', cliente ? cliente.CDCLIENTE : null),
            getFilter('NMRAZSOCCLIE', cliente ? cliente.NMRAZSOCCLIE : null),
            getFilter('CREDITOPESSOAL', ''),
            getFilter('CDFAMILIASALD', ''),
            getFilter(
              'NMCONSUMIDOR',
              consumidor ? consumidor.NMCONSUMIDOR : null,
            ),
            getFilter(
              'CDCONSUMIDOR',
              consumidor ? consumidor.CDCONSUMIDOR : null,
            ),
            getFilter('NRVENDAREST', NRVENDAREST),
            getFilter('NRCOMANDA', NRCOMANDA),
            getFilter('VRRECARGA', ''),
            getFilter('chave', chave),
            getFilter(
              'NRLUGARMESA',
              idmodo == MODOS.MESA
                ? posicao
                : [...Array(posicoes)].map((_, i) => i + 1),
            ),
            getFilter('NRMESA', NRMESA),
            getFilter('CDVENDEDOR', CDVENDEDOR),
            getFilter('numeroProdutos', produtos.length),
            getFilter('desconto', {
              CDSUPERVISOR: '',
              logDesconto: '',
            }),
            getFilter('saleCode', new Date().getTime()),
            getFilter('NRPESMESAVEN', posicoes),
            getFilter('NMRAZSOCCLIE', ''),
            getFilter('NMFANVEN', null),
            getFilter('NRINSCRCONS', cpf),
            getFilter('NOMECONS', ''),
            getFilter('DELIVERY', false),
            getFilter('EMAIL', email),
            getFilter('servico', {
              CDSUPERVISOR: '',
              logServico: '',
            }),
            getFilter('FIDELITYVALUE', null),
            getFilter('IDMODULO', idmodo),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'paymentMenu',
            widgetName: 'paymentMenu',
          },
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

const getTypeOf = (curr: ProdutoMin | ProdutoVenda): number => {
  if (typeof curr.quantidade == 'string') {
    return parseFloat(curr.quantidade.replace(',', '.'));
  } else {
    return curr.quantidade;
  }
};

const itemVendaDesconto = (produtos: ProdutoVenda[]) => {
  return produtos.map(produto => ({
    CDOCORR: [],
    CDPRODUTO: produto.codigo,
    NRVENDA: null,
    QTPRODITCOMVENDES: produto.quantidade,
    VRACRCOMVEN: 0,
    VRDESCCOMVEN: 0,
    VRPRECCOMVEN: produto.preco,
  }));
};

const produtoVendaToFilter = (
  produtos: ProdutoVenda[],
  desconto: Desconto,
): any => {
  return produtos.map((produto: ProdutoVenda, index: number) => {
    return {
      ID: index + 1,
      IDENTIFYKEY: produto.id + 1,
      UNIQUEID: produto.id + 1,
      GRUPO: produto.nomeGrupo,
      CDPRODUTO: produto.codigo,
      DSBUTTON: produto.nome,
      DSBUTTONSHOW: produto.nome,
      POSITION: 'posição 1',
      POS: 1,
      PRECO: `${produto.preco}`,
      PRITEM: produto.preco,
      PRITOTITEM: produto.cobraFilho
        ? produto.produtosVenda.reduce(
            (acc: number, curr: ProdutoVenda) =>
              acc +
              curr.preco * curr.quantidade -
              calcDescontoPreco(
                getDesconto(curr),
                curr.preco * curr.quantidade,
              ),
            0,
          )
        : produto.valorTotal,
      VRPRECITEMCL: 0,
      REALSUBSIDY: 0,
      VRDESITVEND: produto.valorDesconto,
      VRACRITVEND: 0,
      CDOCORR: produto.selectedOpcionais.map(opcional => opcional.codigo),
      IDIMPPRODUTO: produto.IDIMPPRODUTO,
      IDTIPOCOMPPROD: produto.IDTIPOCOMPPROD,
      IDTIPCOBRA: null,
      IDPESAPROD: 'N',
      OBSERVATIONS: produto.opcionais,
      IMPRESSORAS: [],
      ATRASOPROD: 'N',
      TOGO: 'N',
      holdText: '',
      toGoText: '',
      PRODUTOS: produto.produtosVenda.map(
        (produtoFilho: ProdutoVenda, index: number) =>
          produtoFilhoToFilter(produtoFilho, index),
      ),
      refilSet: false,
      NRQTDMINOBS: 0,
      NRCOMANDA: null,
      NRVENDAREST: null,
      DSCOMANDA: '',
      AGRUPAMENTO: '',
      QTPRODCOMVEN: produto.quantidade,
      TXPRODCOMVEN: porqueEuTenhoQueFormatarTextoDeImpressao(produto),
    };
  });
};

const produtoFilhoToFilter = (produto: ProdutoVenda, index: number) => {
  return {
    ID: index + 1,
    // CDGRUPO: "0000000007",
    CDPRODUTO: produto.codigo,
    IDIMPPRODUTO: produto.IDIMPPRODUTO,
    NMGRUPO: produto.nomeGrupo,
    DSBUTTON: produto.nome,
    IDAPLICADESCPR: 'T',
    IDPERVALORDES: 'P',
    VRDESPRODPROMOC: calcDescontoPreco(getDesconto(produto), produto.preco),
    PRECO: produto.preco,
    STRPRICE: '',
    QTPRODCOMVEN: produto.quantidade,
    STRDESCONTO:
      produto.valorDesconto > 0
        ? produto.tipoDesconto === 'P'
          ? `-${produto.valorDesconto}%`
          : `-${produto.valorDesconto}`
        : '',
    PRITEM: produto.preco,
    VRPRECITEMCL: 0,
    REALSUBSIDY: 0,
    VRDESITVEND: calcDescontoPreco(getDesconto(produto), produto.preco),
    VRACRITVEND: 0,
    PRICE:
      produto.preco - calcDescontoPreco(getDesconto(produto), produto.preco),
    REALPRICE:
      produto.preco - calcDescontoPreco(getDesconto(produto), produto.preco),
    TOTPRICE: produto.valorTotal,
    DISCOUNT: calcDescontoPreco(getDesconto(produto), produto.preco),
    ADDITION: 0,
    ATRASOPROD: 'N',
    holdText: '',
    TOGO: 'N',
    toGoText: '',
    PRODUTOS: [],
    CDOCORR: produto.selectedOpcionais.map(e => e.codigo),
    DSOCORR_CUSTOM: produto.observacaoManual,
    OBSERVATIONS: produto.opcionais.map(e => e.codigo),
    IMPRESSORA: null,
    CDGRUPMUTEX: null,
    TXPRODCOMVEN: porqueEuTenhoQueFormatarTextoDeImpressao(produto),
  };
};

const porqueEuTenhoQueFormatarTextoDeImpressao = (produto: ProdutoVenda) => {
  return produto.selectedOpcionais
    .map((opcional: Opcional, index: number) => {
      if (index == produto.selectedOpcionais.length + 1) {
        return opcional.nome;
      } else {
        return `${opcional.nome}; `;
      }
    })
    .reduce((acc: string, current: string) => acc.concat(current), '')
    .concat(` ${produto.observacaoManual || ''}`);
};

const recebimentoToFilter = (recebimentos: Recebimento[]) => {
  return recebimentos.map((recebimento: Recebimento) => {
    return {
      CDTIPORECE: recebimento.tipo.codigo,
      IDTIPORECE: recebimento.tipo.tipoRece,
      DSBUTTON: recebimento.tipo.nome,
      VRMOVIVEND: recebimento.valor,
      DTHRINCOMVEN: '02/05/2019 16:24:43',
      IDTPTEF: '5',
      CDBANCARTCR: recebimento.CDBANCARTCR,
      STLPRIVIA: recebimento.STLPRIVIA,
      STLSEGVIA: recebimento.STLSEGVIA,
      PAYMENTCONFIRMATION: recebimento.PAYMENTCONFIRMATION,
      REMOVEALLINTEGRATIONS: recebimento.REMOVEALLINTEGRATIONS,
      AUTHKEY: null,
      NRCONTROLTEF: recebimento.NRCONTROLTEF,
      DSENDIPSITEF: recebimento.DSENDIPSITEF,
      CDLOJATEF: recebimento.CDLOJATEF,
      CDTERTEF: recebimento.CDTERTEF,
      TRANSACTIONDATE: recebimento.TRANSACTIONDATE,
      NRCARTBANCO: recebimento.NRCARTBANCO || '',
      CDNSUHOSTTEF: recebimento.CDNSUHOSTTEF,
    };
  });
};

const getDatasale = (
  TOTALVENDA: number,
  desconto: Desconto,
  VALORPAGO: number,
  TROCO: number,
  produtos: number,
  txServico: number,
) => ({
  TOTALVENDA: TOTALVENDA - calcDescontoPreco(desconto, TOTALVENDA),
  FALTANTE: 0,
  VALORPAGO,
  FIDELITYVALUE: 0,
  FIDELITYDISCOUNT: 0,
  TROCO,
  TOTAL: produtos,
  VRTXSEVENDA: txServico ? txServico : 0,
  TOTALSUBSIDY: 0,
  REALSUBSIDY: 0,
  VRCOUVERT: 0,
  VRDESCONTO: calcDescontoPreco(desconto, TOTALVENDA),
  PCTDESCONTO: desconto
    ? desconto.tipo == 'PERCENTUAL'
      ? desconto.valor
      : 0
    : 0,
  TIPODESCONTO: desconto && desconto.tipo == 'VALOR' ? 'V' : 'P',
});

const getDescontoFilter = (desconto?: Desconto) => {
  if (desconto) {
    return {
      CDSUPERVISOR: desconto.CDOPERADOR,
      logDesconto: desconto.tipo == 'PERCENTUAL' ? 'P' : 'V',
      motivoDesconto: desconto.observacaoManual || '',
      CDGRPOCORDESC: desconto.motivo,
    };
  } else return '';
};

export default paymentPay;
