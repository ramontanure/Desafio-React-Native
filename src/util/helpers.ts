import { ProdutoVenda, Posicao, OpcionalVenda } from '../redux/carrinho/types';
import {
  Adicional,
  Opcional,
  Grupo,
  Produto,
  TipoRecebimento,
} from '../redux/dataset/types';
import { Recebimento, Desconto } from '../redux/dataSale/types';
import { padStart } from 'lodash';
import { Print } from '../redux/ui/types';
import { HTTP_CODES, ERROR_CODE, MODOS, DESCONTOS } from './constants';
import { groupBy } from 'lodash';
import { ProdutoDelivery, RecebimentoDelivery } from '../redux/delivery/types';
import recebimento from '../containers/recebimento';
import { ProdutoConta } from '../containers/conta/types';

export const numberToMoney = (value: number): string =>
  `R$ ${value.toFixed(2).replace('.', ',')}`;

export const uniao = (str: string, arr: string[]) => {
  let retorno = [];
  if (arr.includes(str)) retorno = arr.filter(e => e != str);
  else retorno = arr.concat(str);
  return retorno;
};

export const formatDateToSITEF = (date: any) => {
  let pedacosData = date.split(' ')[0].split('-');
  return pedacosData[2] + pedacosData[1] + pedacosData[0];
};

export const capitalize = (str: string) => {
  let split = str.split(' ');
  return split
    .map(e => {
      return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
    })
    .reduce((a: string, b: string) => a.concat(' ' + b), '');
};

export const getPrecoProduto = (produto: ProdutoVenda): number => {
  let precoAdicionaisProdutosCombo = 0;
  if (produto.produtosVenda) {
    precoAdicionaisProdutosCombo = produto.produtosVenda
      .map(produto => getAdicionaisPreco(produto))
      .reduce((a, b) => a + b, 0);
    return (
      produto.preco * produto.quantidade +
      getAdicionaisPreco(produto) +
      precoAdicionaisProdutosCombo
    );
  }
};

export const getRawProd = (
  produto: Produto,
  NRCOMANDA: string,
  NRVENDAREST: string,
  DSCOMANDA: string,
): ProdutoVenda => {
  return {
    ...produto,
    selectedOpcionais: [],
    produtosVenda: [],
    valorTotal: 0,
    status: 'P',
    quantidade: 1,
    selectedAdicional: [],
    id: 0,
    NRCOMANDA,
    NRVENDAREST,
    DSCOMANDA,
  };
};

export const getPosicaoTotal = (posicao: Posicao): number => {
  return Number(
    posicao.produtos
      .filter(e => e.status == 'P')
      .reduce((accu, curr) => accu + curr.valorTotal, 0)
      .toFixed(2),
  );
};

export const getPedidoTotal = (produtos: ProdutoVenda[]): number => {
  return Number(
    produtos
      .reduce((acc: number, curr: ProdutoVenda) => acc + curr.valorTotal, 0)
      .toFixed(2),
  );
};

const getAdicionaisPreco = (produto: ProdutoVenda): number => {
  if (produto.selectedOpcionais) {
    return produto.selectedOpcionais
      .filter(e => e.preco)
      .reduce((acc: number, curr: OpcionalVenda) => {
        return acc + curr.preco * curr.quantidade;
      }, 0);
  }
  return 0;
};

export const selectOpcional = (
  opcional: OpcionalVenda,
  arr: OpcionalVenda[],
): OpcionalVenda[] => {
  if (!arr.map(e => e.nome).includes(opcional.nome)) {
    return [...arr, opcional];
  } else {
    return arr.filter(e => e.nome != opcional.nome);
  }
};

export const bindObservacao = (
  observacoesProduto: [],
  observacoes: [],
): { opcionais: Opcional[]; adicionais: Adicional[] } => {
  let adicionais: Adicional[] = [];
  let opcionais: Opcional[] = [];
  observacoesProduto.forEach(obsProd => {
    return observacoes.forEach((obs: any) => {
      if (obsProd == obs.CDOCORR) {
        return opcionais.push({
          nome: obs.DSOCORR,
          codigo: obs.CDOCORR,
          preco: Number(obs.VRPRECITEM),
        });
      }
    });
  });
  return { opcionais, adicionais };
};

export const getComboPreco = (combo: ProdutoVenda) => {
  console.log(combo);
  if (combo.IDTIPCOBRA == 'M' || !combo.IDTIPCOBRA) {
    const quantidade = combo.produtosVenda.reduce(
      (acc: number, curr: ProdutoVenda) => {
        return acc + curr.quantidade;
      },
      0,
    );

    return (
      combo.produtosVenda.reduce((acc: number, curr: ProdutoVenda) => {
        let desconto = 0;
        if (curr.valorDesconto > 0) {
          desconto = calcDescontoPreco(
            getDesconto(curr),
            curr.preco / quantidade,
          );
          return curr.preco / quantidade + acc - desconto;
        }
        return curr.preco / quantidade + acc;
      }, 0) + getAdicionaisPreco(combo)
    );
  } else {
    return (
      combo.produtosVenda.reduce((acc: number, curr: ProdutoVenda) => {
        if (acc > curr.preco) return acc;
        else return curr.preco;
      }, 0) + getAdicionaisPreco(combo)
    );
  }
};

export const getDesconto = (produto: ProdutoVenda): Desconto | undefined => {
  if (produto.valorDesconto == 0) return undefined;
  return {
    tipo: produto.tipoDesconto == 'P' ? 'PERCENTUAL' : 'VALOR',
    valor: produto.valorDesconto,
  };
};

export const getTotalPorTipo = (
  recebimentos: Recebimento[],
  tipo: TipoRecebimento,
) => {
  return recebimentos
    .filter(e => e.tipo.codigo == tipo.codigo)
    .reduce((acc, curr) => acc + curr.valor, 0);
};

export const isMinGrupoCompleto = (combo: ProdutoVenda): Grupo | undefined => {
  let grupoIncompleto = combo.grupos.find((grupo: Grupo) => {
    let produtosGrupo = combo.produtosVenda.filter(
      produto => produto.nomeGrupo == grupo.nome,
    );
    let qtdGrp = produtosGrupo.reduce(
      (acc: number, produto: ProdutoVenda) => acc + produto.quantidade,
      0,
    );
    return qtdGrp < grupo.minimo;
  });
  return grupoIncompleto;
};

export const isMaxGrupoCompleto = (
  combo: ProdutoVenda,
  grupoSelecionado: Grupo,
) => {
  let produtosGrupoSelecionadoQtd: number = combo.produtosVenda
    .filter(produto => produto.nomeGrupo == grupoSelecionado.nome)
    .reduce(
      (acc: number, current: ProdutoVenda) => acc + current.quantidade,
      0,
    );
  return produtosGrupoSelecionadoQtd == grupoSelecionado.maximo;
};

export const getSSLParameters = (
  NRINSJURFILI: string,
  IDUTLSSL: string,
  IDCODSSL: string,
) => ({
  storeCNPJ: NRINSJURFILI,
  IDUTLSSL: IDUTLSSL,
  IDCODSSL: IDCODSSL || '',
});

export const getReprintTEFData = (
  nsu: string,
  date: string,
  transactionAuth: string,
  transactionVia: string,
) =>
  JSON.stringify({
    paymentNsu: nsu,
    transactionDate: date.replace('-', '').replace('-', ''),
    transactionAuth: transactionAuth ? '1' : transactionAuth,
    transactionVia: transactionVia ? '1' : transactionVia,
  });

export const calcDescontoPreco = (desconto?: Desconto, valorTotal?: number) => {
  if (!desconto) return 0;
  if (desconto.tipo == 'PERCENTUAL' && valorTotal) {
    return Number(((desconto.valor * valorTotal) / 100).toFixed(2));
  } else {
    return desconto.valor;
  }
};

export const calcRestanteReceber = (faltante: number, desconto: number) => {
  let restanteReceber = faltante - desconto;
  if (restanteReceber < 0) {
    return 0;
  } else return restanteReceber;
};

export const getCurrentFormatedDate = () =>
  `${new Date().getDate()}-${new Date().getMonth() +
  1}-${new Date().getFullYear()}`;

export const getFormatedDate = (data: string | Date) => {
  if (typeof data == 'string') {
    const dataSplit = data.split('-');
    let dia,
      mes,
      ano = '';
    if (dataSplit[0].length == 4) {
      dia = dataSplit[2];
      mes = dataSplit[1];
      ano = dataSplit[0];
    } else {
      dia = padStart(dataSplit[0], 2, '0');
      mes = padStart(dataSplit[1], 2, '0');
      ano = dataSplit[2];
    }
    return `${dia}${mes}${ano}`;
  } else {
    return (
      padStart(data.getDate().toString(), 2, '0') +
      padStart((data.getMonth() + 1).toString(), 2, '0') +
      data.getFullYear().toString()
    );
  }
};

export const getPrintObj = (
  text: string,
  type: 'QR' | 'TEXT',
  isOpcional?: boolean,
  isOpcionalText?: string,
  isBold?: boolean,
  fontSize?: number,
): Print => {
  return {
    type,
    text,
    fontSize: fontSize || 16,
    isBold: isBold || false,
    isOpcional,
    isOpcionalText,
  };
};

export const moneyToNumber = (money: string): number => {
  let value = Number(money.replace(/[R$]+/g, ''));
  return value ? value : Number(money.replace(/[R$.]+/g, '').replace(',', '.'));
};

export const isValidJson = (string: string): boolean => {
  try {
    JSON.parse(string);
  } catch (error) {
    return false;
  }
  return true;
};

export const getHttpError = (code: ERROR_CODE) => {
  return HTTP_CODES[code];
};

export const printBlankLinesCommand = () => {
  return '\n\r\n\r\n\r\n\r\n\r\n\r\n\r';
};

export const getNextPage = (modoHabilitado: any): string => {
  if (modoHabilitado == MODOS.BALCAO) return 'Cardapio';
  else if (modoHabilitado == MODOS.COMANDA) return 'Comanda';
  else if (modoHabilitado == MODOS.MESA) return 'Mesa';
  else if (modoHabilitado == MODOS.DELIVERY) return 'Pedidos';
  else return '';
};

export const groupArrayByKey = (arr: any[], key: string, key2: string) => {
  let temp = groupBy(arr, key);
  let retorno = [];
  for (const currentKey in temp) {
    let arr = temp[currentKey];
    retorno.push({
      [key]: currentKey,
      [key2]: arr,
    });
  }
  return retorno;
};

export const getObsProd = (obs: OpcionalVenda[], observacaoManual?: string) => {
  if (obs.length > 0) {
    const obsReturn = obs
      .map(e => e.nome)
      .reduce((acc, current, index) => {
        if (index != obs.length - 1) {
          return acc.concat(current) + '; ';
        } else {
          return acc.concat(current);
        }
      }, '');
    if (observacaoManual) {
      return obsReturn.concat('; ' + observacaoManual);
    } else return obsReturn;
  } else if (observacaoManual) return observacaoManual;
  else return null;
};

export const getBackRoute = (modo: string): string => {
  if (modo === MODOS.BALCAO) return 'Filial';
  else if (modo === MODOS.MESA) return 'Mesa';
  else if (modo === MODOS.COMANDA) return 'Comanda';
  else return '';
};

export const leftZero = (value: number) =>
  value < 10 ? '0' + value : value + '';
export const getOrigem = (origem: string): string => {
  switch (origem) {
    case 'DLV_IFO':
      return 'IFOOD';
    case 'DLV_CAL':
      return 'CALL';
    case 'DLV_PJA':
      return 'PEDJA';
    case 'DLV_SIT':
      return 'SITE';
    case 'DLV_INT':
      return 'INTEG';
    case 'DLV_APP':
      return 'APP';
    case 'DLV_FOS':
    case 'DLV_FNC':
    case 'DLV_SAT':
      return 'FOS';
    case 'DLV_TAA':
      return 'TAA';
    case 'TGO_APP':
      return 'TGAPP';
    case 'BGR_APP':
      return 'BGAPP';
    case 'TGO_TAA':
      return 'TGTAA';
    case 'BGR_TAA':
      return 'BGTAA';
    case 'DLV_ABF':
      return 'ABRAFOOD';
    case 'DLV_SPO':
      return 'SPOON';
    case 'DLV_ADR':
      return 'ANDROID';
    case 'DLV_IOS':
      return 'IOS';
    case 'DLV_ONY':
      return 'ONYO';
    case 'DLV_WZP':
      return 'WPP';
    case 'DLV_YAN':
      return 'YANDEH';
    case 'DLV_UBER':
      return 'UBER';
    case 'DLV_RAP':
      return 'RAPPI';
  }
};

export const getStatus = (status: string) => {
  switch (status) {
    case '1':
      return 'Pendente';
    case '2':
      return 'Em Produção';
    case '3':
      return 'Produzido';
    case '4':
      return 'Cancelado';
    case '5':
      return 'p/ Entregar';
    case '6':
      return 'To Go';
    case 'P':
      return 'Impresso';
    case 'X':
      return 'Finalizado';
  }
};

export const getTotalPedido = (produtos: ProdutoDelivery[]) => {
  let total = 0;
  produtos.forEach((produto: ProdutoDelivery) => {
    total += parseFloat(produto.precoTotal);
  });

  return total;
};

export const getTroco = (
  recebimentos: RecebimentoDelivery[],
  total: number,
) => {
  let pago = 0;
  recebimentos.forEach((recebimento: RecebimentoDelivery) => {
    pago += parseFloat(recebimento.valor);
  });
  return pago - total;
};

export const getTotalRecebimento = (recebimentos: RecebimentoDelivery[]) => {
  let total = 0;
  recebimentos.forEach((recebimento: RecebimentoDelivery) => {
    total += parseFloat(recebimento.valor);
  });
  return total;
};

export const cpfValidation = (cpf: string) => {
  if (
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  ) {
    return false;
  }
  let numero: number = 0;
  let caracter: string = '';
  let numeros: string = '0123456789';
  let j: number = 10;
  let somatorio: number = 0;
  let resto: number = 0;
  let digito1: number = 0;
  let digito2: number = 0;
  let cpfAux: string = '';
  cpfAux = cpf.substring(0, 9);
  for (let i: number = 0; i < 9; i++) {
    caracter = cpfAux.charAt(i);
    if (numeros.search(caracter) == -1) {
      return false;
    }
    numero = Number(caracter);
    somatorio = somatorio + numero * j;
    j--;
  }
  resto = somatorio % 11;
  digito1 = 11 - resto;
  if (digito1 > 9) {
    digito1 = 0;
  }
  j = 11;
  somatorio = 0;
  cpfAux = cpfAux + digito1;
  for (let i: number = 0; i < 10; i++) {
    caracter = cpfAux.charAt(i);
    numero = Number(caracter);
    somatorio = somatorio + numero * j;
    j--;
  }
  resto = somatorio % 11;
  digito2 = 11 - resto;
  if (digito2 > 9) {
    digito2 = 0;
  }
  cpfAux = cpfAux + digito2;
  if (cpf != cpfAux) {
    return false;
  } else {
    return true;
  }
};

export const cnpjValidation = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  )
    return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  let i = 0;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
};
