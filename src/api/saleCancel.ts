import fetchAPI, {getUrl, getFilter} from '.';
import {padStart} from 'lodash';

const saleCancel = (chave: string, cupom: string, supervisor: string) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/SaleCancelRepository`;
      fetchAPI(url, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('CODIGOCUPOM', cupom),
            getFilter('CDSUPERVISOR', supervisor),
          ],
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

export default saleCancel;
