import {getUrl, Params, getFilter} from '.';
import fetchAPI from '.';

export const agruparComanda = (MAINBILL: any, toGroupBills: any) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/GroupBills`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('MAINBILL', MAINBILL),
            getFilter('toGroupBills', toGroupBills),
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
