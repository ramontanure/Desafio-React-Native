import fetchAPI, {getUrl, Params, getFilter} from '..';

const imprimirNotaFiscal = (
  cdfilial: string,
  nrvendarest: string,
  datasale: any,
  idstcomanda: any,
  nrcomanda: string,
  modo: string,
) => {
  return new Promise((resolve: any, reject: any) => {
    getUrl(result => {
      let url = `${result}/PaymentPayAccount`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          page: 0,
          itemsPerPage: 100000,
          filter: [
            getFilter('DELIVERY', true),
            getFilter('CDFILIAL', cdfilial),
            getFilter('NRVENDAREST', nrvendarest),
            getFilter('saleCode', new Date().getTime()),
            getFilter('DATASALE', datasale),
            getFilter('IDSTCOMANDA', idstcomanda),
            getFilter('NRCOMANDA', nrcomanda),
            getFilter('IDMODULO', modo),
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

export default imprimirNotaFiscal;
