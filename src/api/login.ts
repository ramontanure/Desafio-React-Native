import fetchAPI, {Params, getFilter, getUrl} from '.';
export async function login(
  filial: string,
  caixa: string,
  garcom: string,
  senha: string,
) {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = 'http://tablet.teknisa.com/matheusnogueira/caetano/odhenPOS/backend/service/index.php/OperatorRepository';
      let body = JSON.stringify({
        filter: [
          getFilter('filial', '0001'),
          getFilter('caixa', '018'),
          getFilter('operador', '999'),
          getFilter('senha', '1'),
          getFilter('version', '6.0.9'),
          getFilter('currentMode', 'M'),
        ],
        page: 0,
        itemsPerPage: 100000,
        requestType: 'FilterData',
        origin: {containerName: 'loginContainer', widgetName: 'loginWidget'},
      });
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      };
      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
}