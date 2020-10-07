import fetchAPI, {getUrl, Params, getFilter} from '.';

const agruparMesas = (chave: string, mesa: string, mesas: string[]) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableGroup`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('mesa', mesa),
            // Backend espera uma string que dentro dela contém o array de strings
            getFilter('listaMesas', JSON.stringify(mesas)),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'groupTable', widgetName: 'agrupar'},
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default agruparMesas;
