import {getUrl, Params, getFilter} from '.';
import fetchAPI from '.';

const transferirPedidoMesa = (
  chave: string,
  mesaDestino: string,
  NRCOMANDA: string,
  NRVENDAREST: string,
  produtos: any[],
  posicao: number,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableTransferItem`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('mesaDestino', mesaDestino),
            getFilter('NRCOMANDA', NRCOMANDA),
            getFilter('NRVENDAREST', NRVENDAREST),
            getFilter('produtos', JSON.stringify(produtos)),
            getFilter('posicao', posicao),
            getFilter('CDSUPERVISOR', null),
            getFilter('maxPosicoes', []),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'transfer', widgetName: 'product'},
        }),
      };

      console.log(options);
      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default transferirPedidoMesa;
