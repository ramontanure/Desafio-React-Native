import fetchAPI, {getUrl, getFilter} from '.';

const reprintSaleCoupon = (type: string, saleCode?: string) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/ReprintSaleCoupon`;
      fetchAPI(url, {
        body: JSON.stringify({
          filter: [
            getFilter('reprintType', type),
            getFilter('saleCode', saleCode),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'loginContainer', widgetName: 'loginWidget'},
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      })
        .then((response: any) => resolve(response))
        .catch((error: any) => reject(error));
    });
  });
};

export default reprintSaleCoupon;
