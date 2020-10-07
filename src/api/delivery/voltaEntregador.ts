import fetchAPI, {getUrl, Params, getFilter} from '..';

const voltaEntregador = (
  entregador: string,
  cdfilial: string,
  cdloja: string,
) => {
  return new Promise((resolve: any, reject: any) => {
    getUrl(result => {
      let url = `${result}/PedidosEntreguesRepository`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          page: 0,
          itemsPerPage: 100000,
          filter: [
            getFilter('CDLOJA', cdloja),
            getFilter('CDFILIAL', cdfilial),
            getFilter('ENTREGADOR', entregador),
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

export default voltaEntregador;
