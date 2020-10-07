import fetchAPI, {getUrl, APIParams, Params} from '.';

const ultimasVendas = () => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/UltimasVendasDesc`;
      let options: Params = {
        body: JSON.stringify({
          filter: [],
          page: 1,
          itemsPerPage: 500,
          requestType: 'FilterData',
          origin: {
            containerName: 'generalFunctions',
            widgetName: 'reprintSaleCouponPopup',
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

export default ultimasVendas;
