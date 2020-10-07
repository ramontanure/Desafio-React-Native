import {getUrl, getFilter} from '.';

const getConsumidores = (host: string, busca: string) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      const url = `${result}/ParamsCustomerRepository`;
      fetch(url, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('CDCLIENTE', ''),
            getFilter('CDCONSUMINDOR', busca.trim()),
          ],
          page: 1,
          itemsPerPage: 30,
          requestType: 'FilterData',
          origin: {
            containerName: 'paymentMenu',
            widgetName: 'setConsumerPopUp',
          },
        }),
      })
        .then(response => {
          resolve(response.json());
        })
        .catch(error => {
          reject(error);
        });
    });
  });
};

export default getConsumidores;
