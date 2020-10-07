import fetchAPI, {getUrl, Params, getFilter} from '.';

export const getParamsCustomerRepository = (
  CDCLIENTE?: string,
  CONSUMIDOR?: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/ParamsCustomerRepository`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('CDCLIENTE', CDCLIENTE),
            getFilter('CONSUMIDOR', CONSUMIDOR),
          ],
          page: 1,
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
