import {getUrl, Params, getFilter} from '.';
import fetchAPI from '.';

export const cancelarProduto = (
  chave: string,
  NRCOMANDA: string,
  NRVENDAREST: string,
  produto: any,
  motivo: any,
  produzido: boolean,
  mensagemPersonalizada: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/AccountCancelProduct`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('modo', 'C'),
            getFilter('nrcomanda', NRCOMANDA),
            getFilter('nrvendarest', NRVENDAREST),
            getFilter('produto', JSON.stringify(produto)),
            getFilter('motivo', null),
            getFilter('supervisor', ''),
            getFilter('IDPRODPRODUZ', produzido),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'loginContainer', widgetName: 'loginWidget'},
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};
