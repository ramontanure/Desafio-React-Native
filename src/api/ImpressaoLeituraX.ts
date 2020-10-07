import fetchAPI, {getUrl, Params} from '.';

const getImpressaoX = (host: string) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/ImpressaoLeituraX`;
      let options: Params = {
        body: JSON.stringify({
          filter: [],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'generalFunctions',
            widgetName: 'generalFunctions',
          },
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      };
      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};

export default getImpressaoX;
