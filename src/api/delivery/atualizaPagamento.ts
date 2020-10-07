import fetchAPI, {getUrl, Params, getFilter} from '..';

const atualizaPagamento = (
  cdfilial: string,
  recebimentos: string,
  nrvendarest: string,
) => {
  return new Promise((resolve: any, reject: any) => {
    getUrl(result => {
      let url = `${result}/Movcaixadlv`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          page: 0,
          itemsPerPage: 100000,
          filter: [
            getFilter('CDFILIAL', cdfilial),
            getFilter('RECEBIMENTOS', recebimentos),
            getFilter('NRVENDAREST', nrvendarest),
          ],
          requestType: 'FilterData',
          origin: {
            containerName: 'pedidoContainer',
            widgetName: 'pedidoWidget',
          },
        }),
      };
      fetchAPI(url, options)
        .then((response: any) => resolve(response))
        .catch((error: any) => reject(error));
    });
  });
};

export default atualizaPagamento;
