import fetchAPI, {getUrl, Params, getFilter} from '.';

const addPositionTable = (
  chave: string,
  NRCOMANDA: string,
  NRVENDAREST: string,
  quantidade: number,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableSetPositions`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('nrcomanda', NRCOMANDA),
            getFilter('nrvendarest', NRVENDAREST),
            getFilter('quantidade', quantidade),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'loginContainer', widgetName: 'loginWidget'},
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default addPositionTable;
