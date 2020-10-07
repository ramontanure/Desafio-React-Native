import fetchAPI, { getUrl, Params, getFilter } from '.';

export const openTable = (chave: string, mesa: string, quantidade: number, cliente?: string, consumidor?: string, vendedor?: string,) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableOpen`;
      let options: Params = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('mesa', mesa),
            getFilter('quantidade', quantidade),
            getFilter('cdCliente', cliente || null),
            getFilter('cdConsumidor', consumidor || null),
            getFilter('cdVendedor', vendedor || null),
            getFilter('posicoes', []),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: { containerName: 'loginContainer', widgetName: 'loginWidget' },
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};
