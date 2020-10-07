import {getUrl, Params, getFilter} from '.';
import fetchAPI from '.';

export const transferirPedido = (
  comandaRemetente: string,
  vendaRemetente: string,
  comandaDestino: string,
  vendaDestino: string,
  CDPRODUTOS: string[],
  NRPRODCOMVEN: string[],
  CDSUPERVISOR: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/UpdateComandaProducts`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('comandaAtual', comandaRemetente),
            getFilter('vendaRestComandaAtual', vendaRemetente),
            getFilter('comandaDestino', comandaDestino),
            getFilter('vendaRestDestino', vendaDestino),
            getFilter('CDPRODUTO', CDPRODUTOS),
            getFilter('NRPRODCOMVEN', NRPRODCOMVEN),
            getFilter('CDSUPERVISOR', CDSUPERVISOR),
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
