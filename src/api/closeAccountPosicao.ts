import {getUrl, Params, getFilter} from '.';

export const closeAccount = (
  chave: string,
  nrcomanda: string,
  nrvendarest: string,
  quantidade: number,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableCloseAccount`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('NRCOMANDA', nrcomanda),
            getFilter('NRVENDAREST', nrvendarest),
            getFilter('modo', 'M'),
            getFilter('consumacao', true),
            getFilter('servico', true),
            getFilter('couvert', true),
            getFilter('valorConsumacao', 0),
            getFilter('pessoas', quantidade),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'closeAccount',
            widgetName: 'closeAccount',
          },
        }),
      };

      fetch(url, options)
        .then(response => resolve(response.json()))
        .catch(error => reject(error));
    });
  });
};
