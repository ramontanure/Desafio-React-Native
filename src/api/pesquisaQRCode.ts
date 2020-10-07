import fetchAPI, {getUrl, getFilter} from '.';

const pesquisaQRCode = (data: string) => {
  return new Promise((resolve: any, reject: any) => {
    getUrl(result => {
      let url = `${result}/FilterProducts`;
      fetchAPI(url, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [getFilter('codigo', data)],
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

export default pesquisaQRCode;
