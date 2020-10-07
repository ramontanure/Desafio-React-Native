import fetchAPI, {getUrl, Params, getFilter} from '..';

const deletaProduto = (
  chave: string,
  nrcomanda: string,
  nrvendarest: string,
  modo: any,
  produto: string,
  motivo: any,
  idprodproduz: any,
  cdsupervisor: any,
  cdfilial: string,
) => {
  return new Promise((resolve: any, reject: any) => {
    getUrl(result => {
      let url = `${result}/CancelDeliveryProduct`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          page: 0,
          itemsPerPage: 100000,
          filter: [
            getFilter('chave', chave),
            getFilter('NRCOMANDA', nrcomanda),
            getFilter('NRVENDAREST', nrvendarest),
            getFilter('modo', modo),
            getFilter('produto', produto),
            getFilter('motivo', motivo),
            getFilter('IDPRODPRODUZ', idprodproduz),
            getFilter('CDSUPERVISOR', cdsupervisor),
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

export default deletaProduto;
