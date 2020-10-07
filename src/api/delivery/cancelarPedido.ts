import fetchAPI, {getUrl, Params, getFilter} from '..';

const cancelarPedido = (
  nrcomanda: string,
  nrvendarest: string,
  idprodproduz: any,
  cdsupervisor: any,
  cdfilial: string,
  datasale: any,
  idstcomanda: any,
) => {
  return new Promise((resolve: any, reject: any) => {
    getUrl(result => {
      let url = `${result}/CancelDeliveryOrder`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          page: 0,
          itemsPerPage: 100000,
          filter: [
            getFilter('saleCode', new Date().getTime()),
            getFilter('DATASALE', datasale),
            getFilter('NRCOMANDA', nrcomanda),
            getFilter('NRVENDAREST', nrvendarest),
            getFilter('motivo', ['Cancelamento Delivery']),
            getFilter('CDSUPERVISOR', cdsupervisor),
            getFilter('IDPRODPRODUZ', 'S'),
            getFilter('CDFILIAL', cdfilial),
            getFilter('IDPRODPRODUZ', idprodproduz),
            getFilter('IDSTCOMANDA', idstcomanda),
            getFilter('DELIVERY', true),
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

export default cancelarPedido;
