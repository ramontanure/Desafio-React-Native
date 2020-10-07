import fetchAPI, {getUrl, Params, getFilter} from '..';

const getPedidosDelivery = (cdfilial: string, cdloja: string) => {
  return new Promise((resolve: any, reject: any) => {
    getUrl(result => {
      let url = `${result}/DeliveryRepository`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          page: 0,
          itemsPerPage: 100000,
          filter: [
            getFilter('CDLOJA', cdloja),
            getFilter('CDFILIAL', cdfilial),
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

export default getPedidosDelivery;
