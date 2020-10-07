import fetchAPI, {getUrl, Params, getFilter} from '.';

const separarMesas = (
  chave: string,
  nrcomanda: string,
  nrvendarest: string,
  mesas: string[],
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableSplit`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('NRCOMANDA', nrcomanda),
            getFilter('NRVENDAREST', nrvendarest),
            // Backend espera uma string que dentro dela contém o array de strings
            getFilter('listaMesas', JSON.stringify(mesas)),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'groupTable', widgetName: 'separar'},
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default separarMesas;
