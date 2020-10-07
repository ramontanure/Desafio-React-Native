import fetchAPI, {getUrl, Params, getFilter} from '.';

export const OperatorValidateSupervisor = (
  supervisor: string,
  senha: string,
  accessParam: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/OperatorValidateSupervisor`;
      let options: Params = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('supervisor', supervisor),
            getFilter('senha', senha),
            getFilter('accessParam', accessParam),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'SenhaSupervisor',
            widgetName: 'SenhaSupervisor',
          },
        }),
      };
      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};
