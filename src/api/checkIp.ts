import {APIParams, getUrl, Params} from '.';
import fetchAPI from '.';

export const checkIp = (apiParam: APIParams) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/UtilitiesTest`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [],
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
