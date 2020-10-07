import fetchAPI, {getUrl, Params, getFilter} from '.';

export const getAccountDetails = (
  chave: string,
  nrcomanda: string,
  nrvendarest: string,
  mesa: string | number[],
  modo: string,
  funcao?: string,
) => {
  console.log(mesa);
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/AccountGetAccountDetails`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('modo', modo || 'C'),
            getFilter('nrcomanda', nrcomanda),
            getFilter('nrvendarest', nrvendarest),
            getFilter('funcao', funcao || 'M'),
            getFilter('posicao', mesa),
            getFilter('updateDiscount', false),
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
