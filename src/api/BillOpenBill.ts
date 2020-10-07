import {getUrl, Params, getFilter} from '.';
import fetchAPI from '.';

export const billOpen = (
  chave: string,
  comanda: string,
  vendedor?: string,
  cliente?: string,
  nrMesa?: string,
  consumidor?: string,
  dsConsumidor?: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/BillOpenBill`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('dsComanda', comanda),
            getFilter('CDCLIENTE', cliente),
            getFilter('CDCONSUMIDOR', consumidor),
            getFilter('nrMesa', nrMesa),
            getFilter('CDVENDEDOR', vendedor),
            getFilter('DSCONSUMIDOR', dsConsumidor),
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
