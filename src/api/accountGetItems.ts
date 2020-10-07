import {getUrl, Params, getFilter} from '.';
import fetchAPI from '.';

export const getAccountItems = (
  chave: string,
  NRCOMANDA: string,
  NRVENDAREST: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      const url = `${result}/AccountGetAccountItems`;
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
            getFilter('posicao', ''),
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
