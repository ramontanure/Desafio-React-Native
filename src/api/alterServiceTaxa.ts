import { getUrl, Params, getFilter } from '.';
import fetchAPI from '.';

export const alterServiceTaxa = (
    NRVENDAREST: string,
    NRCOMANDA: string,
    TOTALPRODS: number,
    VRACRESCIMO: number,
    TIPOGORJETA: string,
) => {
    return new Promise((resolve, reject) => {
        getUrl(result => {
            let url = `${result}/UpdateServiceTax`;
            let options: Params = {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    filter: [
                        getFilter('NRVENDAREST', NRVENDAREST),
                        getFilter('NRCOMANDA', NRCOMANDA),
                        getFilter('TOTALPRODS', TOTALPRODS),
                        getFilter('VRACRESCIMO', VRACRESCIMO),
                        getFilter('TIPOGORJETA', TIPOGORJETA),
                    ],
                    page: 0,
                    itemsPerPage: 100000,
                    requestType: 'FilterData',
                    origin: { containerName: 'loginContainer', widgetName: 'loginWidget' },
                }),
            };

            fetchAPI(url, options)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    });
};
