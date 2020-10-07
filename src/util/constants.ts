export const MODOS = {
  MESA: 'M',
  COMANDA: 'C',
  BALCAO: 'B',
  DELIVERY: 'D',
};

export const TIPOS_CAIXA = {
  COLETOR: 'C',
  RECEBEDOR: 'N',
};

export const TIPO_ABERTURA = {
  AUTOMATICA: 'N',
  MANUAL: 'S',
};

export const IMPRESSORAS = {
  GERTEC: '25',
};

export const TIPO_RECE = {
  DINHEIRO: '4',
  CREDITO: '1',
  DEBITO: '2',
  DEBITO_CONSUMIDOR: 'S',
  CARTEIRA_DIGITAL: 'H',
};

export const ESTADO_MESA = {
  CONTA: 'S',
  OCUPADA: 'O',
  RECEBIMENTO: 'R',
  DISPONIVEL: 'D',
};

export const SITEF_CODE = {
  CARTEIRA_DIGITAL: 122,
  ESTORNO_CARTEIRA_DIGITAL: 123,
  DEBITO: 2,
  ESTORNO_DEBITO: 211,
  CREDITO: 3,
  ESTORNO_CREDITO: 210,
};

export const HTTP_CODES = {
  400: 'Requisição inválida',
  401: 'Não autorizado',
  402: 'Pagamento necessário',
  403: 'Proibido',
  404: 'Servidor não encontrado',
  405: 'Método não permitido',
  406: 'Não Aceitável',
  407: 'Autenticação de proxy necessária',
  408: 'Tempo de requisição esgotou (Timeout)',
  409: 'Conflito geral',
  410: 'Gone',
  411: 'Comprimento necessário',
  412: 'Pré-condição falhou',
  413: 'Entidade de solicitação muito grande',
  414: 'Pedido-URI Too Long',
  415: 'Tipo de mídia não suportado',
  416: 'Solicitada de Faixa Não Satisfatória',
  417: 'Falha da expectativa',
  418: 'Eu sou um bule de chá',
  422: 'Entidade improcessável (WebDAV) (RFC 4918)',
  423: 'Fechado (WebDAV) (RFC 4918)',
  424: 'Falha de Dependência (WebDAV) (RFC 4918)',
  425: 'Coleção não ordenada (RFC 3648)',
  426: 'Upgrade Obrigatório (RFC 2817)',
  450: 'Bloqueado pelo Contro de Pais do Windows',
  500: 'Erro interno do servidor',
  501: 'Não implementado',
  502: 'Bad Gateway',
  503: 'Serviço indisponível',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  507: 'Insufficient Storage',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
};

export const NO_IMAGE =
  'https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png';

export type ERROR_CODE =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 422
  | 423
  | 424
  | 425
  | 426
  | 450
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 507
  | 509
  | 510;

export const MODO_PAGAMENTO = {
  REDE: '4',
  SITEF: '5',
  CIELO: '7',
};

export const WTF = [
  'CDPRODUTO',
  'IDIMPPRODUTO',
  'IDAPLICADESCPR',
  'IDPERVALORDES',
  'NMPRODUTO',
  'VRDESPRODPROMOC',
  'IDDESCACRPROMO',
  'VRPRECITEM',
  'OBSERVACOES',
  'IDPRODBLOQ',
  'IMPRESSORAS',
  'VRALIQCOFINS',
  'VRALIQPIS',
  'VRPEALIMPFIS',
  'CDIMPOSTO',
  'CDCSTICMS',
  'CDCSTPISCOF',
  'CDCFOPPFIS',
  'DSPRODVENDA',
  'DSADICPROD',
  'DSENDEIMGPROMO',
  'NRORDPROMOPR',
  'IDPRODPRESELEC',
  'NRQTDMINOBS',
  'CDPROTECLADO',
  'IDTIPOCOMPPROD',
  'HRINIVENPROD',
  'HRFIMVENPROD',
  'CDCLASFISC',
];

export const LAYOUT = {
  DETALHADO: 'Detalhado',
  SIMPLES: 'Simples',
};

export const DESCONTOS = {
  VALOR: 'V',
  PERCENTUAL: 'P',
};
