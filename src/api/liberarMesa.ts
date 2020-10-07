import fetchAPI, {getUrl, Params, getFilter} from '.';

export const fecharConta = (
  host: string,
  chave: string,
  CDVENDEDOR: string,
  NRVENDAREST: string,
  NRCOMANDA: string,
  NRMESA: string,
  posicoes: PosicaoDataSet[],
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/CloseAccountOrder`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('CHAVE', chave),
            getFilter('CDVENDEDOR', CDVENDEDOR),
            getFilter('NRVENDAREST', NRVENDAREST),
            getFilter('NRCOMANDA', NRCOMANDA),
            getFilter('MESA', NRMESA),
            getFilter('POSICOES', posicoes),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'closeAccount',
            widgetName: 'closeAccount',
          },
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export interface PosicaoDataSet {
  NRLUGARMESA: number;
  CDCONSUMIDOR: string;
  MODOSDEPAGAMENTO: RecebimentoDataSet[];
  EMAIL: string;
}

interface RecebimentoDataSet {
  IDTIPMOV?: string | null;
  VRMOV: number;
  DSBANDEIRA?: string | null;
  IDTPTEF?: string | null;
  CDTIPORECE: string;
}
