import fetchAPI, {getUrl, getFilter, Params} from '.';
export const getPositionCode = (
  chave: string,
  NRVENDAREST: string,
  NRCOMANDA: string,
  position: number,
) => {
  return new Promise((resolve, reject) =>
    getUrl(result => {
      let url = `${result}/PositionCodeRepository`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('chave', chave),
            getFilter('NRVENDAREST', NRVENDAREST),
            getFilter('NRCOMANDA', NRCOMANDA),
            getFilter('position', position),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {containerName: 'menu', widgetName: 'positionCode'},
        }),
      };
      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    }),
  );
};
