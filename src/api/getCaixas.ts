import fetchAPI, {getUrl, Params, getFilter} from '.';

export const getCaixas = (CDFILIAL: string, caixaSearch?: string) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/CaixasLogin`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: getFilters(CDFILIAL, caixaSearch),
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

let a = [];

const getFilters = (CDFILIAL: string, caixaSearch?: string) => {
  if (caixaSearch) {
    return [
      {name: 'CDFILIAL', operator: '=', value: CDFILIAL},
      {
        name: 'CDCAIXA|NMCAIXA',
        value: `%${caixaSearch}%`,
        operator: 'LIKE_ALL',
      },
      {
        name: 'CDCAIXA|NMCAIXA',
        value: `%${caixaSearch}%`,
        operator: 'LIKE_ALL',
      },
    ];
  } else {
    return [getFilter('CDFILIAL', CDFILIAL)];
  }
};
