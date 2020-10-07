import fetchAPI, {getUrl, Params, getFilter} from '.';

export const openMesaOcupada = (
  chave: string,
  mesa: string,
  status: string,
  modo: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableActiveTable`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('mesa', mesa),
            getFilter('status', status),
            getFilter('modo', modo),
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
