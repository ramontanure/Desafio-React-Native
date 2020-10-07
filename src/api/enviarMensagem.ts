import fetchAPI, {getUrl, Params, getFilter} from '.';
export const enviarMensagem = (
  chave: string,
  NRCOMANDA: string,
  NRVENDAREST: string,
  nrImpressora: string[],
  text: string,
  historico: string,
  modo: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableSendMessage`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('NRCOMANDA', NRCOMANDA),
            getFilter('NRVENDAREST', NRVENDAREST),
            getFilter('nrImpressora', JSON.stringify(nrImpressora)),
            getFilter('mensagem', text),
            getFilter('historico', historico),
            getFilter('modo', modo),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: '"sendWaiterless"',
            widgetName: '"sendMessage"',
          },
        }),
      };
      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};
