import { getUrl, Params, getFilter } from '.';

export const closeAccount = (
  chave: string,
  nrcomanda: string,
  nrvendarest: string,
  nrmesa: string,
  quantidade: number,
  modo: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableCloseAccount`;
      let options: Params = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('NRCOMANDA', nrcomanda),
            getFilter('NRVENDAREST', nrvendarest),
            getFilter('modo', modo),
            getFilter('consumacao', true),
            getFilter('servico', true),
            getFilter('couvert', false),
            getFilter('valorConsumacao', 0),
            getFilter('pessoas', quantidade),
            getFilter('CDSUPERVISOR', null),
            getFilter('NRMESA', nrmesa),
            getFilter('IMPRIMEPARCIAL', 'I'),
            getFilter('txporcentservico', null),
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
