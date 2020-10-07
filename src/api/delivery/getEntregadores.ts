import fetchAPI, {getUrl, Params, getFilter} from '..';

const getEntregadores = (filial: string) => {
  return new Promise((resolve: any, reject: any) => {
    getUrl(result => {
      let url = `${result}/DeliveryServiceVendedoresRepository`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          page: 0,
          itemsPerPage: 100000,
          filter: [getFilter('filial', filial)],
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

export default getEntregadores;
