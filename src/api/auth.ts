import {APIParams, getUrl, Params, getFilter} from '.';
import fetchAPI from '.';
// @ts-ignore
import CookieManager from 'react-native-cookies';

export const auth = (email: string, senha: string) => {
  return new Promise((resolve, reject) => {
    getUrl(url => {
      if (!url) return reject('Host não cadastrado');
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [getFilter('email', email), getFilter('senha', senha)],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'loginContainer', widgetName: 'loginWidget'},
        }),
      };

      CookieManager.clearAll().then(() => {
        fetchAPI(`${url}/auth`, options)
          .then(response => resolve(response))
          .catch(error => reject(error));
      });
    });
  });
};
