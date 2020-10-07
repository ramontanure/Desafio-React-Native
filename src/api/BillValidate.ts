import {getUrl, Params, getFilter} from '.';
import fetchAPI from '.';

export const billValidate = (chave: string, comanda: string) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/BillValidateBill`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [getFilter('chave', chave), getFilter('dsComanda', comanda)],
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
