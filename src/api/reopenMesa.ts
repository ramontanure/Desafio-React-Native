import fetchAPI, {getUrl, Params, getFilter} from '.';

const reopenMesa = (
  chave: string,
  mesa: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableReopen`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('mesa', mesa),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'table', widgetName: 'table'},
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default reopenMesa;