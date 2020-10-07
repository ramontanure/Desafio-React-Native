import {getUrl, Params} from './';
export const getRecebimento = () => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TipoRecebimento`;
      let options: Params = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          filter: [],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'loginContainer', widgetName: 'loginWidget'},
        }),
      };

      fetch(url, options)
        .then(response => resolve(response.json()))
        .catch(error => reject(error));
    });
  });
};
