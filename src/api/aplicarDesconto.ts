import {getUrl, Params, getFilter} from '.';
import fetchAPI from '.';

export const aplicarDesconto = (
  NRVENDAREST: string,
  NRCOMANDA: string,
  VRDESCONTO: number,
  TIPODESCONTO: string,
  NRPRODCOMVEN: string[],
  CDSUPERVISOR: string,
  CDGRPOCORDESC: string,
) => {
  return new Promise((resolve, reject) => {
    getUrl(result => {
      let url = `${result}/ChangeProductDiscount`;
      let options: Params = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          filter: [
            getFilter('NRVENDAREST', NRVENDAREST),
            getFilter('NRCOMANDA', NRCOMANDA),
            getFilter('VRDESCONTO', VRDESCONTO),
            getFilter('TIPODESCONTO', TIPODESCONTO),
            getFilter('NRPRODCOMVEN', NRPRODCOMVEN),
            getFilter('motivoDesconto', ''),
            getFilter('CDSUPERVISOR', CDSUPERVISOR),
            getFilter('CDGRPOCORDESC', CDGRPOCORDESC),
          ],
          page: 0,
          itemsPerPage: 100000,
          requestType: 'FilterData',
          origin: {
            containerName: 'parcialAccount',
            widgetName: 'discountPopup',
          },
        }),
      };

      fetchAPI(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  });
};
