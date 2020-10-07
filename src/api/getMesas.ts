import fetchAPI, {Params, APIParams, getUrl, getFilter} from '.';

export const getMesas = (chave: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableRepository`;
      let options: Params = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          filter: [getFilter('chave', chave)],
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
