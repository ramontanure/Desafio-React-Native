import fetchAPI, {getUrl, getFilter} from '.';

export const abrirCaixa = (host: string, chave: string, VRMOVIVEND: number) => {
  return new Promise((resolve, reject) => {
    getUrl((result: string) => {
      const url = `${result}/RegisterOpen`;
      fetchAPI(url, {
        body: JSON.stringify({
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'paymentMenu',
            widgetName: 'paymentMenu',
          },
          filter: [
            getFilter('chave', chave),
            getFilter('VRMOVIVEND', VRMOVIVEND),
          ],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};
