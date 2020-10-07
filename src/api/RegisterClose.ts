import fetchAPI, {getUrl, getFilter} from '.';

const RegisterClose = (host: string, chave: string, tipoRece: any) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/RegisterClose`;
      fetchAPI(url, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [getFilter('chave', chave), getFilter('TIPORECE', tipoRece)],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'loginContainer', widgetName: 'loginWidget'},
        }),
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default RegisterClose;
