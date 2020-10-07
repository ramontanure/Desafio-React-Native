import fetchAPI, {getUrl, Params, getFilter} from '.';

export const tableCancelOpen = (chave: string, mesa: string) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableCancelOpen`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [getFilter('chave', chave), getFilter('mesa', mesa)],
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
