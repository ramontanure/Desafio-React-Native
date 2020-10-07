import fetchAPI, {getUrl, Params} from '.';

export const getFiliais = (search?: string) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/FiliaisLogin`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: getFilters(search),
          page: 0,
          itemsPerPage: 20,
          requestType: 'FilterData',
          origin: {containerName: 'loginContainer', widgetName: 'loginWidget'},
        }),
      };
      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => {
          reject(error);
        });
    });
  });
};

const getFilters = (search?: string) => {
  if (search) {
    return [
      {name: 'CDFILIAL|NMFILIAL', value: `%${search}%`, operator: 'LIKE_ALL'},
      {name: 'CDFILIAL|NMFILIAL', value: `%${search}%`, operator: 'LIKE_ALL'},
    ];
  } else return [];
};
