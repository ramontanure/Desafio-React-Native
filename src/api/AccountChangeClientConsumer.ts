import fetchAPI, {getFilter, getUrl, Params} from '.';

export const accountChangeClientConsumer = (
  chave: string,
  NRVENDAREST: string,
  NRCOMANDA: string,
  positions: any[],
  CDCLIENTE?: string,
  CDCONSUMIDOR?: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/AccountChangeClientConsumer`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('NRVENDAREST', NRVENDAREST),
            getFilter('NRCOMANDA', NRCOMANDA),
            getFilter('positions', positions || []),
            getFilter('CDCLIENTE', CDCLIENTE),
            getFilter('CDCONSUMIDOR', CDCONSUMIDOR),
            getFilter('fidelitySearch', true),
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
