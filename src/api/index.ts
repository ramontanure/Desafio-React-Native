import {isValidJson, getHttpError} from '../util/helpers';
import AsyncStorage from '@react-native-community/async-storage';
export * from './login';
export * from './getMesas';
export * from './getFiliais';
export * from './openMesa';

export interface APIParams {
  ip: string;
  porta?: string;
}

export interface Params {
  method: 'POST' | 'GET';
  body: string;
  headers: {
    'Content-Type': 'application/json';
  };
}

export const getUrl = (cb: (host: string) => void) => {
  AsyncStorage.getItem('host', (error, result: any) => {
    cb(result);
  });
  // Saas GRSA
  // https://odhenpos.grsa.com.br/odhenPOS/backend/service/index.php'
  // Saas Teste Teknisa
  //  https://odhenpos.teknisa.cloud/backend/index.php'
};

export const getFilter = (name: string, value: any) => ({
  name,
  value,
  operator: '=',
});

const fetchAPI = (url: string, options: Params) => {
  return new Promise((resolve, reject) => {
    // let timeout = setTimeout(() => {
    //   reject('Tempo de resposta esgotado, tente novamente.');
    // }, 120000);
    fetch(url, options)
      .then(response => {
        // clearTimeout(timeout);
        if (!response.ok) {
          if (response.status != 500) {
            // @ts-ignore
            throw getHttpError(response.status);
          }
        }
        return response.text();
      })
      .then((stringResponse: string) => {
        if (!isValidJson(stringResponse)) {
          throw stringResponse;
        }
        let parsedResponse = JSON.parse(stringResponse);
        if (parsedResponse.error) {
          throw parsedResponse.error;
        }
        let error = {status: false, message: ''};
        if (parsedResponse.dataset) {
          Object.keys(parsedResponse.dataset).forEach(function(prop) {
            if (parsedResponse.dataset[prop].error) {
              error.status = parsedResponse.dataset[prop].error;
              error.message = parsedResponse.dataset[prop].message;
            }
          });
        } else {
          Object.keys(parsedResponse).forEach(function(prop) {
            if (parsedResponse.error) {
              error.status = parsedResponse.dataset[prop].error;
              error.message = parsedResponse.dataset[prop].message;
            } else {
              error.message = parsedResponse[prop][0].message;
              error.status = true;
            }
          });
        }
        if (error.status) {
          reject(error.message);
        } else {
          resolve(parsedResponse);
        }
      })
      .catch(error => {
        if (error.message) {
          reject(error.message);
        } else {
          reject(error);
        }
      });
  });
};

export default fetchAPI;
