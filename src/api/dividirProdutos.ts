import fetchAPI, {getUrl, Params, getFilter} from '.';

const dividirProduto = (
  chave: string,
  NRVENDAREST: string[],
  NRCOMANDA: string[],
  NRPRODCOMVEN: string[],
  NRLUGARMESA: number[],
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/SplitProductsRepository`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('CHAVE', chave),
            getFilter('NRVENDAREST', NRVENDAREST),
            getFilter('NRCOMANDA', NRCOMANDA),
            getFilter('NRPRODCOMVEN', NRPRODCOMVEN),
            getFilter('NRLUGARMESA', NRLUGARMESA),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'closeAccount',
            widgetName: 'closeAccount',
          },
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default dividirProduto;
