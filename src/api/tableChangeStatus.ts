import fetchAPI, {getUrl, Params, getFilter} from '.';

const tableChangeStatus = (
  chave: string,
  nrvendarest: string,
  nrcomanda: string,
  status: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/TableChangeStatus`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('NRVENDAREST', nrvendarest),
            getFilter('NRCOMANDA', nrcomanda),
            getFilter('STATUS', status),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'table', widgetName: 'table'},
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default tableChangeStatus;
