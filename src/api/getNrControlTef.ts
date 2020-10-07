import fetchAPI, {getUrl, Params, getFilter} from '.';

const getNrControlTef = (host: string, NSU: string) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      const url = `${result}/GetNrControlTef`;
      const options: Params = {
        body: JSON.stringify({
          filter: [getFilter('CDNSUHOSTTEF', NSU)],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'loginContainer', widgetName: 'loginWidget'},
        }),
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      };
      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default getNrControlTef;
