import {getUrl, Params, getFilter} from './';
export const SaveSangria = (sangrias: any[], imprimeSangria: boolean) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/SaveSangria`;
      let options: Params = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          filter: [
            getFilter('itensSangria', sangrias),
            getFilter('imprimeSangria', imprimeSangria),
          ],
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
