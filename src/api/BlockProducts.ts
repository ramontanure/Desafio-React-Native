import fetchAPI, {getUrl, Params} from '.';

const blockProducts = (CDPRODUTOS: string[]) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/BlockProducts`;
      let options: Params = {
        body: JSON.stringify({
          filter: [
            {
              name: 'CDPRODUTO',
              value: CDPRODUTOS,
              operator: '=',
            },
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'generalFunctions',
            widgetName: 'BlockProductPopup',
          },
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default blockProducts;
